#!/usr/bin/env node
/**
 * Builds src/lib/image-data.json: for every remote image referenced by the
 * content, its real dimensions and a blurred thumbnail small enough to inline.
 *
 * This runs here, on a machine with a network, rather than during the build —
 * the Nix build is sandboxed and offline, so anything that reached for an image
 * there would silently come back empty (which is exactly what the old
 * build-time size probe did, shipping production without width/height).
 * Committing the result keeps the build hermetic and reproducible.
 *
 * Run it after adding an image: `pnpm run images`. It only fetches URLs it has
 * no entry for; `--force` re-fetches everything.
 */
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import sharp from 'sharp';

const CONTENT = new URL('../src/content/', import.meta.url);
const CACHE = new URL('../src/lib/image-data.json', import.meta.url);

// Wide enough to keep the shape of the subject, small enough that the base64
// costs less than the request an external placeholder would have made.
const LQIP_WIDTH = 24;

/** Every markdown file under src/content, at any depth. */
async function contentFiles(dir) {
	const entries = await readdir(dir, { withFileTypes: true });
	const files = await Promise.all(
		entries.map((entry) => {
			const path = join(entry.parentPath, entry.name);
			if (entry.isDirectory()) return contentFiles(path);
			return entry.name.endsWith('.md') ? [path] : [];
		})
	);
	return files.flat();
}

/** Remote images a page pulls in: markdown bodies, and the coverUrl in frontmatter. */
function imageUrls(source) {
	const found = [
		...source.matchAll(/!\[[^\]]*\]\(\s*(\S+?)\s*(?:"[^"]*")?\)/g),
		...source.matchAll(/^coverUrl:\s*['"]?(\S+?)['"]?\s*$/gm)
	].map((match) => match[1]);

	return found.filter((url) => url.startsWith('http'));
}

/** Dimensions plus an inlineable blurred preview, or null if the image can't be read. */
async function describe(url) {
	const response = await fetch(url);
	if (!response.ok) throw new Error(`HTTP ${response.status}`);
	const bytes = Buffer.from(await response.arrayBuffer());

	// An animated source is read as its first frame; a preview only needs the one.
	const image = sharp(bytes);
	const { width, height } = await image.metadata();

	const lqip = await image
		.resize({ width: LQIP_WIDTH })
		// Blurring before the encode rather than in CSS: the browser then has nothing to
		// do but scale it up, and a blur filter would have caught the real image too.
		.blur(1.5)
		.webp({ quality: 40, alphaQuality: 40 })
		.toBuffer();

	return {
		width,
		height,
		lqip: `data:image/webp;base64,${lqip.toString('base64')}`
	};
}

const force = process.argv.includes('--force');

const cached = await readFile(CACHE, 'utf8')
	.then(JSON.parse)
	.catch(() => ({}));

const urls = (
	await Promise.all(
		(await contentFiles(CONTENT)).map(async (file) => imageUrls(await readFile(file, 'utf8')))
	)
).flat();

// Rebuilt from the URLs in use, so an image dropped from a post drops out of here too.
const data = {};
let failed = 0;

for (const url of [...new Set(urls)].sort()) {
	if (!force && cached[url]) {
		data[url] = cached[url];
		continue;
	}

	try {
		data[url] = await describe(url);
		console.log(`  + ${url}`);
	} catch (error) {
		// Keep whatever was known before: a flaky host shouldn't strip an image of the
		// dimensions it already had, and the build reads this file as-is.
		if (cached[url]) data[url] = cached[url];
		failed++;
		console.warn(`  ! ${url} — ${error.message}`);
	}
}

await writeFile(CACHE, JSON.stringify(data, null, '\t') + '\n');

const kept = Object.keys(data).length;
console.log(
	`image-data: ${kept} image${kept === 1 ? '' : 's'}${failed ? `, ${failed} failed` : ''}`
);

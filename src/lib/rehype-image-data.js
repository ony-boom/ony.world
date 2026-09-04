import { readFileSync } from 'node:fs';

/**
 * What `scripts/image-data.js` recorded about every remote image in the content.
 * Read from disk rather than imported: this module is pulled in by svelte.config.js,
 * which plain Node loads without Vite's JSON handling. $lib/blur-up.ts reads the same
 * file the other way round, for the images Svelte components render themselves.
 */
const imageData = JSON.parse(readFileSync(new URL('./image-data.json', import.meta.url), 'utf8'));

/**
 * rehype plugin: hand every image in a markdown body what the cache knows about it —
 * its intrinsic size, so the browser holds the space open instead of reflowing when
 * the bytes land, and the blurred preview it stands on while they are in flight.
 * $lib/blur-up.ts drives the reveal from one to the other.
 *
 * It also makes sure every image carries an `alt`. Markdown written as `![](src)` —
 * what the CMS produces when no description is typed — has an empty alt that the
 * stringifier drops, leaving the attribute absent and Svelte warning about it.
 * Empty is the honest value: it marks the image decorative so screen readers skip
 * it, rather than inventing a description.
 *
 * @returns {(tree: any) => void}
 */
export function rehypeImageData() {
	return (tree) => {
		visitImages(tree, (node) => {
			if (node.properties.alt == null) node.properties.alt = '';

			const data = imageData[String(node.properties.src).trim()];
			if (!data) return;

			node.properties.width ??= data.width;
			node.properties.height ??= data.height;
			node.properties['data-blur-up'] = '';
			// Inline rather than a class: the preview is per-image data, not styling.
			node.properties.style = `background-image:url(${data.lqip})`;
		});
	};
}

/**
 * @param {any} node
 * @param {(img: any) => void} visit
 */
function visitImages(node, visit) {
	if (node.type === 'element' && node.tagName === 'img' && node.properties?.src) visit(node);
	node.children?.forEach((/** @type {any} */ child) => visitImages(child, visit));
}

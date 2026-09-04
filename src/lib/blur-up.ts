import imageData from './image-data.json';
import { imageAttrs } from './image-attrs.js';

/** Named for the file, not `ImageData` — that one is the DOM's canvas pixel buffer. */
type ImageEntry = { width: number; height: number; lqip: string };

/** Matched in two places below, so it lives in one. Mirrored by app.css. */
const BLUR_UP = 'img[data-blur-up]';

/**
 * The size and blurred preview `scripts/image-data.js` recorded for a remote image,
 * as attributes to spread onto an <img>. Nothing for an image the cache has never
 * seen — it just renders without the effect. $lib/rehype-image-data.js does the same
 * for images that come out of markdown.
 */
export function blurUp(src: string) {
	const data: ImageEntry | undefined = (imageData as Record<string, ImageEntry>)[src];
	return data ? imageAttrs(data) : {};
}

/**
 * Marks images that are still downloading, so CSS can blur them until they aren't.
 *
 * The attribute is added here rather than rendered into the HTML on purpose: without
 * scripting nothing would ever take it off again, and an image blurred forever is
 * worse than one that simply appears. An image already decoded by the time this runs
 * is left alone too — there is nothing to reveal, and a blur that only starts once
 * the picture is on screen reads as a glitch.
 */
export function initBlurUp() {
	const mark = (img: HTMLImageElement) => {
		// Already painted, or already being watched — a re-inserted node arrives here twice.
		if (img.complete || img.dataset.loading !== undefined) return;
		img.dataset.loading = '';

		// decode() rather than the load event: load fires before the picture is paintable,
		// so the blur would lift a frame early. A broken image rejects; either way the mark
		// comes off, because an image that will never arrive must not stay blurred.
		img
			.decode()
			.catch(() => {})
			.finally(() => delete img.dataset.loading);
	};

	const sweep = (root: ParentNode) => {
		if (root instanceof HTMLImageElement && root.matches(BLUR_UP)) mark(root);
		root.querySelectorAll<HTMLImageElement>(BLUR_UP).forEach(mark);
	};

	sweep(document);

	// Client-side navigation swaps in images this never got to see at mount.
	const observer = new MutationObserver((records) => {
		for (const record of records) {
			for (const node of record.addedNodes) {
				if (node instanceof Element) sweep(node);
			}
		}
	});
	observer.observe(document.body, { childList: true, subtree: true });

	return () => observer.disconnect();
}

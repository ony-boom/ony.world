import imageData from './image-data.json';

type ImageData = { width: number; height: number; lqip: string };

/**
 * The size and blurred preview `scripts/image-data.js` recorded for a remote image,
 * as attributes to spread onto an <img>. Nothing for an image the cache has never
 * seen — it just renders without the effect. $lib/rehype-image-data.js does the same
 * for images that come out of markdown.
 */
export function blurUp(src?: string) {
	const data: ImageData | undefined = (imageData as Record<string, ImageData>)[src?.trim() ?? ''];
	if (!data) return {};

	return {
		width: data.width,
		height: data.height,
		'data-blur-up': '',
		style: `background-image:url(${data.lqip})`
	};
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
		if (img.complete) return;
		img.dataset.loading = '';
		img.addEventListener('load', () => delete img.dataset.loading, { once: true });
		img.addEventListener('error', () => delete img.dataset.loading, { once: true });
	};

	const sweep = (root: ParentNode) => {
		if (root instanceof HTMLImageElement && root.dataset.blurUp !== undefined) mark(root);
		root.querySelectorAll?.<HTMLImageElement>('img[data-blur-up]').forEach(mark);
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

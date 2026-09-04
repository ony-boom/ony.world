/**
 * @typedef {{ width: number, height: number, lqip: string }} ImageEntry
 */

/**
 * The <img> attributes that drive the blur-up, for one entry of image-data.json.
 *
 * One definition on purpose: $lib/rehype-image-data.js puts these on images that come
 * out of markdown, $lib/blur-up.ts on the ones Svelte components render, and app.css
 * keys off the `data-blur-up` marker. Written twice, a rename would quietly leave one
 * of the two paths without the effect.
 *
 * Plain JS rather than TS: svelte.config.js pulls the rehype side in under plain Node,
 * which has no TypeScript loader.
 *
 * @param {ImageEntry} data
 */
export function imageAttrs(data) {
	return {
		width: data.width,
		height: data.height,
		'data-blur-up': '',
		// Inline rather than a class: the preview is per-image data, not styling.
		style: `background-image:url(${data.lqip})`
	};
}

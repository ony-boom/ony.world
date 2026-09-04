/**
 * rehype plugin: give a markdown image that has something to say a visible caption.
 *
 * `![a description](src)` renders as a lone <img> wrapped in a <p>, so the description is
 * only ever announced, never shown. Where a paragraph holds nothing but that image, the
 * paragraph becomes a <figure> and the description is repeated beneath it — the shape
 * <Cover> already uses for the image above the post, and app.css styles them together.
 *
 * A <figure> cannot live inside a <p>, which is why this replaces the paragraph rather
 * than wrapping the image where it stands.
 *
 * $lib/rehype-image-data.js gives an undescribed image `alt=""` to mark it decorative;
 * those are left alone, since there is nothing to caption.
 *
 * @returns {(tree: any) => void}
 */
export function rehypeImageFigure() {
	return (tree) => captionImages(tree);
}

/** @param {any} node */
function captionImages(node) {
	if (!Array.isArray(node.children)) return;

	node.children = node.children.map((/** @type {any} */ child) => {
		captionImages(child);

		const image = describedImage(child);
		return image ? figure(image) : child;
	});
}

/**
 * The image a paragraph holds, if that is the whole of the paragraph and it carries a
 * description. Whitespace between the tags is not content, so it does not count.
 *
 * @param {any} node
 */
function describedImage(node) {
	if (node.type !== 'element' || node.tagName !== 'p') return null;

	const content = (node.children ?? []).filter(
		(/** @type {any} */ child) => child.type !== 'text' || child.value.trim() !== ''
	);

	const [only] = content;
	if (content.length !== 1) return null;
	if (only.type !== 'element' || only.tagName !== 'img') return null;

	return only.properties?.alt ? only : null;
}

/** @param {any} image */
function figure(image) {
	return {
		type: 'element',
		tagName: 'figure',
		properties: {},
		children: [
			image,
			{
				type: 'element',
				tagName: 'figcaption',
				// The alt says these same words; a screen reader reading both would say the
				// description twice. Same reasoning as the caption in cover.svelte.
				properties: { 'aria-hidden': 'true' },
				children: [{ type: 'text', value: image.properties.alt }]
			}
		]
	};
}

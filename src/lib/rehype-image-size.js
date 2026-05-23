import probe from 'probe-image-size';

/**
 * rehype plugin: probe remote images at build time and set their
 * `width`/`height`, so the browser can reserve space and avoid layout
 * shift (CLS). Images that already declare a size, or that can't be probed
 * (host blocks it, not an image, offline…), are left untouched.
 *
 * @returns {(tree: any) => Promise<void>}
 */
export function rehypeImageSize() {
	return async (tree) => {
		/** @type {any[]} */
		const images = [];
		collect(tree, images);

		await Promise.all(
			images.map(async (node) => {
				const { src, width, height } = node.properties;
				if (width != null || height != null) return;
				if (typeof src !== 'string' || !src.startsWith('http')) return;

				try {
					const size = await probe(src);
					node.properties.width = size.width;
					node.properties.height = size.height;
				} catch {
					console.warn(`[rehype-image-size] could not probe image: ${src}`);
				}
			})
		);
	};
}

/**
 * @param {any} node
 * @param {any[]} acc
 */
function collect(node, acc) {
	if (node.type === 'element' && node.tagName === 'img' && node.properties?.src) {
		acc.push(node);
	}
	node.children?.forEach((/** @type {any} */ child) => collect(child, acc));
}

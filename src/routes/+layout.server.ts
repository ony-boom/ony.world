import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ route, url }) => {
	let pageImage = '';

	if (!route.id) {
		return {
			pageImage
		};
	}

	pageImage = new URL(`/og-image-generator?path=${route.id}`, url.href).toString();

	return {
		pageImage
	};
};

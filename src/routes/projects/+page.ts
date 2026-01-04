import { loadContent } from '$lib/content';
import { makeOgImageLink } from '$lib/og-image-generator/utils';
import type { PageLoad } from './$types';

export const _metadata: App.PageMetadata = {
	pageTitle: 'Projects',
	pageTitlePrefix: "Ony's",
	pageDescription: 'Stuff that I made... (finished/unfinished)'
};

export const load: PageLoad = async ({ url }) => {
	const projects = await loadContent('projects');

	return {
		projects,
		pageImage: makeOgImageLink(url),
		..._metadata
	};
};

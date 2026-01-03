import { loadContent } from '$lib/content';
import type { PageLoad } from './$types';
import { makeOgImageLink } from '$lib/og-image-generator';

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

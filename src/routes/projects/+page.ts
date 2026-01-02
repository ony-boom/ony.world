import { loadContent } from '$lib/content';
import type { PageLoad } from './$types';

export const _pageMetadata: App.PageMetadata = {
	pageTitle: 'Projects',
	pageTitlePrefix: "Ony's",
	pageDescription: 'Stuff that I made... (finished/unfinished)'
};

export const load: PageLoad = async () => {
	const projects = await loadContent('projects');

	return {
		projects,
		..._pageMetadata
	};
};

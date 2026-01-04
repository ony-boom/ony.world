import { loadContent } from '$lib/content';
import type { PageLoad } from './$types';

export const _metadata: App.PageMetadata = {
	pageTitle: 'Posts',
	pageDescription: 'All my notes and experiments'
};

export const load: PageLoad = async () => {
	const posts = await loadContent('posts');

	return {
		posts,
		pageTitlePrefix: "Ony's",
		..._metadata
	};
};

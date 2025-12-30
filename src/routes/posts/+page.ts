import { loadContent } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const posts = await loadContent('posts');

	return {
		posts,
		pageTitle: 'Posts',
		pageDescription: "All my notes and experiments"
	};
};

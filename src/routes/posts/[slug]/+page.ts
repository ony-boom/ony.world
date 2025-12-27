import type { PageLoad } from './$types';
import { loadContentBySlug } from '$lib/content';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;
	const post = await loadContentBySlug('posts', slug);

	if (!post) {
		throw error(404);
	}

	return {
		...post,
		pageTitle: post.metadata.title
	};
};

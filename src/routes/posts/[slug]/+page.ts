import type { PageLoad } from './$types';
import { loadContentBySlug } from '$lib/content';
import { error } from '@sveltejs/kit';
import { makeOgImageLink } from '$lib/og-image-generator';

export const _metadata = async (slug: string) => {
	const post = await loadContentBySlug('posts', slug);

	if (!post) {
		throw error(404);
	}

	return {
		...post,
		pageDescription: post.metadata.description,
		pageTitle: post.metadata.title,
		pageTitlePrefix: "Ony's Blog |",
		pageType: 'article'
	};
};

export const load: PageLoad = async ({ params, url }) => {
	return {
		...(await _metadata(params.slug)),
		pageImage: makeOgImageLink(url)
	};
};
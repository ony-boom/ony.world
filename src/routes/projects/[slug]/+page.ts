import type { PageLoad } from './$types';
import { loadContentBySlug } from '$lib/content';
import { error } from '@sveltejs/kit';
import { makeOgImageLink } from '$lib/og-image-generator/utils';

export const _metadata = async (slug: string) => {
	const post = await loadContentBySlug('projects', slug);

	if (!post) {
		error(404);
	}

	return {
		...post,
		pageDescription: post.metadata.description,
		pageTitle: post.metadata.title,
		pageTitlePrefix: "Ony's Projects |",
		pageType: 'article'
	};
};

export const load: PageLoad = async ({ params, url }) => {
	return {
		...(await _metadata(params.slug)),
		pageImage: makeOgImageLink(url)
	};
};

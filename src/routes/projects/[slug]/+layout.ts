import type { LayoutLoad } from './$types';
import { loadContentBySlug } from '$lib/content';
import { error } from '@sveltejs/kit';

export const load: LayoutLoad = async ({ params }) => {
	const { slug } = params;
	const projects = await loadContentBySlug('projects', slug);

	if (!projects) {
		throw error(404);
	}

	return {
		...projects,
		pageDescription: projects.metadata.description,
		pageTitle: projects.metadata.title,
		pageType: 'article',
		pageTitlePrefix: "Ony's Projects |"
	};
};

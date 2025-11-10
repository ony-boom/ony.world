import type { PageLoad } from './$types';
import { loadContentBySlug } from '$lib/content';
import { error } from '@sveltejs/kit';

export const load: PageLoad = async ({ params }) => {
	const { slug } = params;
	const projects = await loadContentBySlug('projects', slug);

	if (!projects) {
		throw error(404);
	}

	return {
		...projects,
		availableLanguages: projects.availableLanguages
	};
};

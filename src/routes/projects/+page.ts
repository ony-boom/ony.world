import { loadContent } from '$lib/content';
import { getLocale } from '$lib/paraglide/runtime';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const projects = await loadContent('projects', getLocale());

	return {
		projects
	};
};

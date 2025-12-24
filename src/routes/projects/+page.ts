import { loadContent } from '$lib/content';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const projects = await loadContent('projects');

	return {
		projects
	};
};

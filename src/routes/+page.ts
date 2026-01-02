import type { PageLoad } from './$types';

export const _pageMetadata: App.PageMetadata = {
	pageTitle: 'Ony - Software developer',
	pageDescription: "Hello, I'm Ony, and I make software"
};

export const load: PageLoad = () => {
	return _pageMetadata;
};

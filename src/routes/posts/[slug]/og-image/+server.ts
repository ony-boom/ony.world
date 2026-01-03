import { createOgImageHandler } from '$lib/og-image-generator';
import { _metadata } from '../+page';

export const prerender = true;

export const GET = createOgImageHandler(async ({ params }) => {
	const metadata = await _metadata(params.slug!);
	return {
		pageDescription: metadata.pageDescription,
		pageTitle: metadata.pageTitle
	};
});

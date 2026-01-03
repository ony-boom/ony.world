import { ImageResponse } from '@ethercorps/sveltekit-og';
import OgImage from '$components/og-image.svelte';
import { CustomFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import type { RequestHandler, RequestEvent } from '@sveltejs/kit';
import SentientFont from '../lib/assets/fonts/Sentient-Bold.ttf?arraybuffer';

type OgImageMetadata = {
	pageDescription?: string;
	pageTitle?: string;
	extra?: string;
};

type OgImageMetadataFunctionLoader = () => Promise<OgImageMetadata> | OgImageMetadata;

const sentientFont = new CustomFont(
	'Sentient',
	() => {
		return SentientFont;
	},
	{
		weight: 700,
		style: 'normal'
	}
);

export const makeOgImageLink = (url: URL) => {
	return new URL(`${url.pathname}/og-image`, url.href).toString();
};

export const generateOgImage = async (meta: OgImageMetadata | OgImageMetadataFunctionLoader) => {
	const metadata = typeof meta === 'function' ? await meta() : meta;
	return new ImageResponse(
		OgImage,
		{
			width: 1200,
			height: 630,
			fonts: await resolveFonts([sentientFont])
		},
		metadata
	);
};

export const createOgImageHandler = (
	metadataLoader:
		| OgImageMetadata
		| ((event: RequestEvent) => Promise<OgImageMetadata> | OgImageMetadata)
): RequestHandler => {
	return async (event) => {
		try {
			const metadata =
				typeof metadataLoader === 'function' ? await metadataLoader(event) : metadataLoader;
			return generateOgImage(metadata);
		} catch (error) {
			console.error('Error generating OG image:', error);
			return new Response('Failed to generate OG image', {
				status: 500,
				statusText: 'Failed to generate OG image'
			});
		}
	};
};

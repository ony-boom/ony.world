import type { RequestHandler, RequestEvent } from '@sveltejs/kit';
import { generateOgImageFromMetadata, type OgImageMetadata } from './og-image';

type OgImageMetadataFunctionLoader = () => Promise<OgImageMetadata> | OgImageMetadata;

export const ogImageResponse = async (meta: OgImageMetadata | OgImageMetadataFunctionLoader) => {
	const metadata = typeof meta === 'function' ? await meta() : meta;
	const image = await generateOgImageFromMetadata(metadata);

	return new Response(new Uint8Array(image), {
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, max-age=31536000, immutable',
			'Content-Length': image.length.toString()
		}
	});
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
			return ogImageResponse(metadata);
		} catch (error) {
			console.error('Error generating OG image:', error);
			return new Response('Failed to generate OG image', {
				status: 500,
				statusText: 'Failed to generate OG image'
			});
		}
	};
};

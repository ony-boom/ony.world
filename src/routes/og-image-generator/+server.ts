import { ImageResponse } from '@ethercorps/sveltekit-og';
import { error, type RequestHandler } from '@sveltejs/kit';
import OgImage from '$components/og-image.svelte';
import { CustomFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import path from 'node:path';
import fs from 'node:fs/promises';

const sentientFont = new CustomFont(
	'Sentient',
	async () => {
		const fontFilePath = path.resolve(
			import.meta.dirname,
			'..',
			'..',
			'lib',
			'assets',
			'fonts',
			'Sentient-Bold.ttf'
		);
		const fontFile = await fs.readFile(fontFilePath);
		return fontFile.buffer;
	},

	{
		weight: 700,
		style: 'normal'
	}
);

export const GET: RequestHandler = async ({ url }) => {
	let requestedPath = url.searchParams.get('path');

	if (!requestedPath) {
		return error(404);
	}

	requestedPath = requestedPath.replace(/^\//, '').replace(/\/$/, '');

	const pageTitle = url.searchParams.get('title');
	const pageDescription = url.searchParams.get('description');
	const extra = url.searchParams.get('extra')?.replace(' |', '');
	const resolvedFontOptions = await resolveFonts([sentientFont]);

	const ogImageParams = {
		width: 1200,
		height: 630,
		fonts: resolvedFontOptions
	};

	return new ImageResponse(OgImage, ogImageParams, {
		pageTitle,
		pageDescription,
		extra
	});
};

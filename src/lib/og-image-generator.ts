import { ImageResponse } from '@ethercorps/sveltekit-og';
import OgImage from '$components/og-image.svelte';
import { CustomFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import path from 'node:path';
import fs from 'node:fs/promises';

const sentientFont = new CustomFont(
	'Sentient',
	async () => {
		const fontFilePath = path.resolve(
			import.meta.dirname,
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

export const generateOgImage = async (meta: {
	pageDescription?: string;
	pageTitle?: string;
	extra?: string;
}) => {
	const { pageDescription, pageTitle, extra } = meta;
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

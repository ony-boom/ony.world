import { ImageResponse } from '@ethercorps/sveltekit-og';
import OgImage from '$components/og-image.svelte';
import { CustomFont, resolveFonts } from '@ethercorps/sveltekit-og/fonts';
import path from 'node:path';
import fs from 'node:fs/promises';
import { prerender } from '$app/server';
import * as v from 'valibot';

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

export const generateOgImage = prerender(
	v.object({
		pageDescription: v.optional(v.string()),
		pageTitle: v.optional(v.string()),
		extra: v.optional(v.string())
	}),
	async (meta) => {
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
	}
);

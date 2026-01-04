import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import SentientFont from '../assets/fonts/Sentient-Bold.ttf?arraybuffer';
import OgImage from '$components/og-image.svelte';
import { svelteComponentToHTML } from './utils';

export type OgImageMetadata = {
	pageDescription?: string;
	pageTitle?: string;
	extra?: string;
};

type OgImageMetadataProps = OgImageMetadata & {
	width?: number;
	height?: number;
};

const generateOgImageSVG = async ({
	width = 1200,
	height = 630,
	...props
}: OgImageMetadataProps) => {
	return satori(svelteComponentToHTML(OgImage, props), {
		width,
		height,
		fonts: [
			{
				name: 'Sentient',
				data: SentientFont,
				weight: 700,
				style: 'normal'
			}
		]
	});
};

export const generateOgImageFromMetadata = async (props: OgImageMetadataProps) => {
	const ogImageSVG = await generateOgImageSVG(props);
	const resvg = new Resvg(ogImageSVG);
	return resvg.render().asPng();
};

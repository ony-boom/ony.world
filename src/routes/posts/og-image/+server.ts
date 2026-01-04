import { createOgImageHandler } from '$lib/og-image-generator';
import { _metadata } from '../+page';

export const prerender = true;

export const GET = createOgImageHandler(_metadata);

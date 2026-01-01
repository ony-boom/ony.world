import { ImageResponse } from '@ethercorps/sveltekit-og';
import { error, type RequestHandler } from '@sveltejs/kit';
import type { Component } from 'svelte';

const ogComponents = import.meta.glob('../**/og-image.svelte', { eager: false });

export const GET: RequestHandler = async ({ url }) => {
	let requestedPath = url.searchParams.get('path');

	if (!requestedPath) {
		return error(404);
	}

	requestedPath = requestedPath.replace(/^\//, '').replace(/\/$/, '');

	const importKey = `..${requestedPath}/og-image.svelte`;
	const loader = ogComponents[importKey];

	if (!loader) {
		return error(404);
	}

	// const OgComponent = ((await loader()) as any).default as Component;
	//
	//  console.log(OgComponent);
	//
	//
	return new ImageResponse(
		`
    <div style="display: flex; flex-direction: column; justify-content: center; align-items: center; width: 100%; height: 100%; background-color: #101011;">
	<h1 style="color: gray; font-size: 80px; margin: 0;">@ethercorps/sveltekit-og</h1>
	<p style="color: gray; font-size: 36px; margin-top: 20px;">Your Raw HTML Open Graph Image!</p>
</div>
  `,
		{
			width: 1200,
			height: 630
		}
	);
};

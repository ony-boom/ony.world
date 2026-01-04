import type { Component } from 'svelte';
import { render } from 'svelte/server';
import { html } from 'satori-html';

export const makeOgImageLink = (url: URL) => {
	return `${url.origin}${url.pathname}/og-image`;
};

export function svelteComponentToHTML<T extends Record<string, any> = {}>(
	component: Component<T>,
	props: T
) {
	const { body, head } = render(component, { props });
	return html(body + head);
}

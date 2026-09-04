import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSlug from 'rehype-slug';
import { rehypeImageData } from './src/lib/rehype-image-data.js';

const mdsvexExtentions = ['.svx', '.md'];
const highlighter = await createHighlighter({
	langs: ['javascript', 'typescript', 'tsx', 'jsx', 'nix', 'css'],
	themes: ['vitesse-light', 'vitesse-dark']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: mdsvexExtentions,
			rehypePlugins: [
				rehypeSlug,
				rehypeImageData,
				[
					rehypeExternalLinks,
					{
						target: '_blank',
						rel: ['noopener', 'noreferrer']
					}
				]
			],
			highlight: {
				highlighter: async (code, lang = 'text') => {
					return escapeSvelte(
						highlighter.codeToHtml(code, {
							lang,
							themes: {
								dark: 'vitesse-dark',
								light: 'vitesse-light'
							},
							tabindex: null,
							// Token colours only. The theme's own ground is a flat #ffffff, the one
							// thing on the page outside the accent ramp — a hard white block on a
							// tinted page. app.css gives <pre> the site's surface instead.
							rootStyle: false,
							defaultColor: 'light-dark()'
						})
					);
				}
			}
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			origin: 'https://ony.world'
		},
		alias: {
			$components: './src/components',
			$content: './src/content'
		}
	},
	extensions: ['.svelte', ...mdsvexExtentions]
};

export default config;

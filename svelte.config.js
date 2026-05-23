import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import rehypeExternalLinks from 'rehype-external-links';
import { rehypeImageSize } from './src/lib/rehype-image-size.js';

const mdsvexExtentions = ['.svx', '.md'];
const highlighter = await createHighlighter({
	langs: ['javascript', 'typescript', 'tsx', 'jsx', 'nix', 'css'],
	themes: ['one-light', 'kanagawa-dragon']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: mdsvexExtentions,
			rehypePlugins: [
				rehypeImageSize,
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
								dark: 'kanagawa-dragon',
								light: 'one-light'
							},
							tabindex: null,
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

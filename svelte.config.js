import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import rehypeExternalLinks from 'rehype-external-links';

/** @type {import("shiki").BundledTheme} */
const highlightTheme = 'kanagawa-dragon';

const mdsvexExtentions = ['.svx', '.md'];
const highlighter = await createHighlighter({
	langs: ['javascript', 'typescript', 'tsx', 'jsx'],
	themes: [highlightTheme]
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: mdsvexExtentions,
			rehypePlugins: [
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
							theme: highlightTheme,
							tabindex: null
						})
					);
				}
			}
		})
	],
	kit: {
		adapter: adapter({
			pages: 'build',
			assets: 'build',
			precompress: false,
			strict: false
		}),
		alias: {
			$components: './src/components',
			$content: './src/content'
		}
	},
	extensions: ['.svelte', ...mdsvexExtentions]
};

export default config;

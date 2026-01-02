import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';
import rehypeExternalLinks from 'rehype-external-links';

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
							defaultColor: 'light-dark()'
						})
					);
				}
			}
		})
	],
	kit: {
		adapter: adapter(),
		experimental: {
			remoteFunctions: true
		},
		alias: {
			$components: './src/components',
			$content: './src/content'
		}
	},
	compilerOptions: {
		experimental: {
			async: true
		}
	},
	extensions: ['.svelte', ...mdsvexExtentions]
};

export default config;

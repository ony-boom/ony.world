import { mdsvex } from 'mdsvex';
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { escapeSvelte } from 'mdsvex';
import { createHighlighter } from 'shiki';

const mdsvexExtentions = ['.svx', '.md'];
const highlighter = await createHighlighter({
	langs: ['javascript', 'typescript', 'tsx', 'jsx'],
	themes: ['vesper']
});

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: mdsvexExtentions,
			highlight: {
				highlighter: async (code, lang = 'text') => {
					return escapeSvelte(
						highlighter.codeToHtml(code, {
							lang,
              theme: 'vesper',
              tabindex: null,
						})
					);
				}
			}
		})
	],
	kit: {
		adapter: adapter(),
		alias: {
			$components: './src/components'
		}
	},
	extensions: ['.svelte', ...mdsvexExtentions]
};

export default config;

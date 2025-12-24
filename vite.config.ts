import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	preview: {
		allowedHosts: ['maki.tempel-goblin.ts.net']
	},
	plugins: [tailwindcss(), sveltekit()]
});

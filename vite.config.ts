import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { sveltekitOG } from '@ethercorps/sveltekit-og/plugin';
import arraybuffer from "vite-plugin-arraybuffer";
export default defineConfig({
	preview: {
		allowedHosts: ['maki.tempel-goblin.ts.net']
	},
	plugins: [arraybuffer(), tailwindcss(), sveltekit(), sveltekitOG()]
});

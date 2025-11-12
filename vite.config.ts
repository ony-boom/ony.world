import tailwindcss from '@tailwindcss/vite';
import { paraglideVitePlugin } from '@inlang/paraglide-js';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [
		tailwindcss(),
		sveltekit(),
		paraglideVitePlugin({
			project: './project.inlang',
			outdir: './src/lib/paraglide'
		})
	],
	server: {
		proxy: {
			'/videos': {
				target: 'https://file.ony.world/videos/ony.world',
				changeOrigin: true,
				secure: false,
				rewrite: (path) => path.replace(/^\/videos/, '')
			}
		}
	}
});

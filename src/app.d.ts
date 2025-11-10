// See https://svelte.dev/docs/kit/types#app.d.ts

import type { Locale } from '$lib/paraglide/runtime';
import type { Component } from 'svelte';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		//

		interface MdsvexFile {
			default: import('svelte/internal').SvelteComponent;
			metadata: Record<string, string>;
		}

		type MdsvexResolver = () => Promise<MdsvexFile>;

		interface BlogPost {
			Component: Component;
			availableLanguages?: Locale[];
			metadata: {
				path: string;
				slug: string;
				title: string;
				description: string;
				date: string;
				published: boolean;
				coverUrl?: string;
				coverType?: 'image' | 'video';
			};
		}
	}
}

export {};

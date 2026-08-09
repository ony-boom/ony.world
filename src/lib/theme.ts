import { browser } from '$app/environment';
import { writable } from 'svelte/store';

export type Theme = 'light' | 'dark';

export const mode: Theme = (function () {
	if (!browser) return 'light';
	return window.theme;
})();

export const theme = writable(mode);

export function initThemeToggle() {
	if (!browser) return;

	const unsubscribe = theme.subscribe((value) => {
		window.updateTheme(value);
	});

	// theme-init.js settles this at load; here we catch the OS flipping mid-session.
	// Going through the store rather than window.updateTheme keeps the toggle's icon
	// in step with the theme it just switched to.
	const query = window.matchMedia('(prefers-color-scheme: dark)');
	const follow = (e: MediaQueryListEvent) => theme.set(e.matches ? 'dark' : 'light');
	query.addEventListener('change', follow);

	return () => {
		unsubscribe();
		query.removeEventListener('change', follow);
	};
}

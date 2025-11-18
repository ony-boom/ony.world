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

	theme.subscribe((value) => {
		window.updateTheme(value);
	});
}

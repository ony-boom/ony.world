import { browser } from '$app/environment';
import { applyTheme, argbFromHex, themeFromSourceColor } from '@material/material-color-utilities';
import { writable } from 'svelte/store';

const BASE = '#fec5bb';

export type Theme = 'light' | 'dark';

const colorScheme = themeFromSourceColor(argbFromHex(BASE));
export const mode: Theme = (function () {
	if (!browser) return 'light';
	return window.theme;
})();

export const theme = writable(mode);

export function applyColorVariables() {
	if (!browser) return;

	theme.subscribe((value) => {
		window.updateTheme(value);
		applyTheme(colorScheme, { dark: value === 'dark', target: document.documentElement });
	});
}

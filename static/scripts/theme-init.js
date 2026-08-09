const THEME_KEY = 'theme';
const SYSTEM_KEY = 'theme-system';

const query = window.matchMedia('(prefers-color-scheme: dark)');

function systemTheme() {
	return query.matches ? 'dark' : 'light';
}

// Every write re-stamps what the OS says right now, so SYSTEM_KEY always holds the
// OS preference as of the last time this site looked at it.
function updateTheme(newTheme) {
	document.documentElement.style.setProperty('color-scheme', newTheme);
	localStorage.setItem(THEME_KEY, newTheme);
	localStorage.setItem(SYSTEM_KEY, systemTheme());
}

// The OS preference outranks the stored theme: if it no longer matches the value we
// stamped, it changed while we weren't looking, so it wins. Between OS changes the
// stored theme stands, which is what keeps a deliberate toggle alive across reloads.
const system = systemTheme();
const stored = localStorage.getItem(THEME_KEY);
const theme = stored && localStorage.getItem(SYSTEM_KEY) === system ? stored : system;

updateTheme(theme);

window.theme = theme;
window.updateTheme = updateTheme;

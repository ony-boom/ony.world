const THEME_KEY = 'theme';

const theme =
	localStorage.getItem(THEME_KEY) ??
	(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

function updateTheme(newTheme) {
  document.documentElement.style.setProperty('color-scheme', newTheme);
  localStorage.setItem(THEME_KEY, newTheme);
}

// Prevent FOUC
document.addEventListener('DOMContentLoaded', () => {
	setTimeout(() => {
		document.body.classList.remove('opacity-0');
	}, 250);
});

updateTheme(theme);


window.theme = theme;
window.updateTheme = updateTheme;

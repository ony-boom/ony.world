<script lang="ts">
	import { browser } from '$app/environment';
	import Icon from '@iconify/svelte';

	type Theme = 'light' | 'dark';

	function prefersDarkColorScheme() {
		return browser && window.matchMedia?.('(prefers-color-scheme: dark)').matches;
	}

	function getInitialTheme(): Theme {
		if (!browser) return 'light';
		const stored = localStorage.getItem('theme') as Theme | null;
		return stored ?? (prefersDarkColorScheme() ? 'dark' : 'light');
	}

	let currentTheme = $state<Theme>(getInitialTheme());

	function switchTheme() {
		currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
	}

	$effect(() => {
		if (browser) {
			document.documentElement.style.setProperty('color-scheme', currentTheme);
			localStorage.setItem('theme', currentTheme);
		}
	});
</script>

<button class="hover:bg-muted/5" onclick={switchTheme}>
	<Icon font-size={20} icon="material-symbols:contrast" />
</button>

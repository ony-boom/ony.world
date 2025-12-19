<script lang="ts">
	import { theme } from '$lib/theme';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { children, ...props }: SvelteHTMLElements['button'] = $props();

	function switchTheme() {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	}
</script>

<button class={[props.class]} onclick={switchTheme}>
	{$theme}
</button>

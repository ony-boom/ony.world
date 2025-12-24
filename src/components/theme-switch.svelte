<script lang="ts">
	import { theme } from '$lib/theme';
	import { Eclipse } from '@lucide/svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { children, ...props }: SvelteHTMLElements['button'] = $props();

	function switchTheme() {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	}
</script>

<button
	class={[
		props.class,
		'cursor-pointer bg-transparent text-muted-fg hover:bg-muted/10 hover:text-primary'
	]}
	onclick={switchTheme}
>
	<Eclipse size={12} />
</button>

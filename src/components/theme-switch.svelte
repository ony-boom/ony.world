<script lang="ts">
	import Icon from '@iconify/svelte';
	import { theme } from '$lib/theme';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { ...props }: SvelteHTMLElements['button'] = $props();

	function switchTheme() {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	}

	const current = $derived($theme ?? 'dark');
	const next = $derived(current === 'dark' ? 'light' : 'dark');
</script>

<button
	id="theme-toggle"
	type="button"
	aria-label={`Switch to ${next} theme`}
	title={`Switch to ${next} theme`}
	class={['p-1! text-muted-fg no-underline transition-colors hover:text-fg', props.class]}
	onclick={switchTheme}
>
	<Icon icon="tabler:moon-filled" width="18" height="18" aria-hidden="true" />
</button>

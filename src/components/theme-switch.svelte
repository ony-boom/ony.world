<script lang="ts">
	import Icon from '@iconify/svelte';
	import { theme } from '$lib/theme';
	import { scale } from 'svelte/transition';
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
	class={[
		'grid size-9 place-items-center text-muted-fg no-underline transition duration-150 hover:text-fg active:scale-95',
		props.class
	]}
	onclick={switchTheme}
>
	{#key current}
		<span
			class="col-start-1 row-start-1"
			in:scale={{ duration: 200, start: 0.6, opacity: 0 }}
			out:scale={{ duration: 200, start: 0.6, opacity: 0 }}
		>
			<Icon
				icon={current === 'dark' ? 'tabler:sun-filled' : 'tabler:moon-filled'}
				width="18"
				height="18"
				aria-hidden="true"
			/>
		</span>
	{/key}
</button>

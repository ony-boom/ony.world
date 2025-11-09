<script lang="ts">
	import { browser } from '$app/environment';
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { children, ...props }: SvelteHTMLElements['button'] = $props();

	function goBack() {
		if (browser) {
			window.history.back();
		}
	}
</script>

{#if page.url.pathname !== '/'}
	<button onclick={goBack} {...props} class={['link cursor-pointer', props.class]}>
		<Icon icon="material-symbols:arrow-back" />
		<span> back </span>
	</button>
{/if}

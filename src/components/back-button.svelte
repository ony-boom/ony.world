<script lang="ts">
	import { page } from '$app/state';
	import Icon from '@iconify/svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import Text from './text.svelte';

	let props: Omit<SvelteHTMLElements['a'], 'href'> = $props();

	let backPath = $derived.by(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);
		if (parts.length > 1) {
			parts.pop();
			return '/' + parts.join('/');
		}
		return '/';
	});

	let isHome = $derived(page.url.pathname === '/');
</script>

<a
	{...props}
	href={backPath}
	class={['flex cursor-pointer items-center gap-1', isHome && 'hidden', props.class]}
>
	<!-- {#if isHome} -->
	<!-- <span class="text-lg"> ~ </span> -->
	<!-- {:else} -->
	<Icon icon="lucide:arrow-left" />
	<Text as="span" tradKey="back" />
	<!-- {/if} -->
</a>

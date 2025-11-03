<script lang="ts" generics="Tag extends keyof HTMLElementTagNameMap">
	import { m } from '$lib/paraglide/messages';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = {
		as?: Tag;
		tradKey: keyof typeof m;
		asHtml?: boolean;
	} & Partial<SvelteHTMLElements[Tag]>;

	let { as, tradKey, asHtml = false, ...resProps }: Props = $props();

	let text = $state('');

	$effect(() => {
		text = m[tradKey]();
	});
</script>

<svelte:element this={as ?? 'p'} {...resProps}>
	{#if asHtml}
		{@html text}
	{:else}
		{text}
	{/if}
</svelte:element>

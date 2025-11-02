<script lang="ts">
	import { m } from '$lib/paraglide/messages';

	type Props<ElementName extends keyof HTMLElementTagNameMap = 'p'> = {
		as?: ElementName;
		tradKey: keyof typeof m;
		asHtml?: boolean;
	} & Partial<HTMLElementTagNameMap[ElementName]>;

	let { as = 'p', tradKey, asHtml = false, ...resProps }: Props = $props();

	let text = $state('');

	$effect(() => {
		text = m[tradKey]();
	});
</script>

<svelte:element this={as} {...resProps as any}>
	{#if asHtml}
		{@html text}
	{:else}
		{text}
	{/if}
</svelte:element>

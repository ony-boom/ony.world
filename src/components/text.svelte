<script lang="ts" module>
	type Tags = keyof HTMLElementTagNameMap;
	type TextTags = Extract<
		Tags,
		'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'li' | 'blockquote'
	>;
</script>

<script lang="ts" generics="Tag extends TextTags">
	import { m } from '$lib/paraglide/messages';
	import type { HTMLAttributes } from 'svelte/elements';

	type Props = {
		as?: Tag;
		tradKey: keyof typeof m;
		asHtml?: boolean;
	} & HTMLAttributes<HTMLElement>;

	let { as = 'p' as Tag, tradKey, asHtml = false, ...resProps }: Props = $props();

	let text = $state('');

	$effect(() => {
		// text does not update unless I do this, gotta find a better way
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

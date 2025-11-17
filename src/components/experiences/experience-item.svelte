<script lang="ts">
	import type { Experience } from '$content/experiences';
	import { formatDate } from '$lib/date';
	import type { SvelteHTMLElements } from 'svelte/elements';
	import Text from '$components/text.svelte';
	import { onMount } from 'svelte';

	type Props = Experience & SvelteHTMLElements['li'];

	let { dates, title, place, description, ...props }: Props = $props();

	const isNow = dates === 'now';

	let nowDate = $state(new Date());

	onMount(() => {
		nowDate = new Date();
	});
</script>

<li {...props} class={['ms-4']}>
	<div
		class={[
			'absolute mt-[7px] -ml-[22.6px] h-3 w-3 rounded-full border border-bg',
			isNow ? 'bg-primary' : 'bg-dim'
		]}
	></div>

	{#if isNow}
		<time class="mb-1 text-xs text-primary">
			<Text as="span" tradKey="exp_nowLabel" />
			<span class="capitalize">({formatDate(nowDate, { showDay: true })})</span>
		</time>
	{:else}
		<time class="mb-1 text-xs text-dim capitalize">
			{dates.from.getFullYear()} - {formatDate(dates.to, { showDay: false })}
		</time>
	{/if}

	<h3 class="mb-1 font-semibold text-muted">
		{title}
		{#if place}
			- <a target="_blank" href={place.link}>{place.name}</a>
		{/if}
	</h3>
	<p class="text-base text-dim">
		{description}
	</p>
</li>

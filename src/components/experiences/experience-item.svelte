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

<li {...props} class={['ms-6']}>
	<div class={['absolute mt-4 -ml-6 h-px w-4', isNow ? 'bg-primary' : 'bg-muted']}></div>

	{#if isNow}
		<time class="mb-1 text-xs text-primary">
			<Text as="span" tradKey="exp_nowLabel" />
			<span class="capitalize">({formatDate(nowDate, { showDay: true })})</span>
		</time>
	{:else}
		<time class="mb-1 text-xs text-muted-fg capitalize">
			{dates.from.getFullYear()} - {formatDate(dates.to, { showDay: false })}
		</time>
	{/if}

	<h3 class={["mb-1"]}>
		{title}
		{#if place}
			- <a target="_blank" href={place.link}>{place.name}</a>
		{/if}
	</h3>
	<p class="text-base text-muted-fg">
		{description}
	</p>
</li>

<script lang="ts">
	import { formatDate } from '$lib/date';
	import { initTargetFlash } from '$lib/target-flash';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { title, date } = $derived({
		date: formatDate(data.metadata.date),
		title: data.metadata.title
	});
	const Post = $derived(data.Component);

	onMount(() => initTargetFlash());
</script>

<h1 class="mb-1 text-xl font-semibold">
	{title}
</h1>
<time class="text-sm text-muted-fg capitalize">{date}</time>

<article class="mt-8 space-y-4">
	<Post />
</article>

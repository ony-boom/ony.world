<script lang="ts">
	import { formatDate } from '$lib/date';
	import Cover from '$components/cover.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { title, date } = $derived({
		date: formatDate(data.metadata.date),
		title: data.metadata.title
	});
	const Post = $derived(data.Component);
</script>

<h1 class="mb-1 text-xl font-semibold">
	{title}
</h1>
<time class="text-sm text-muted-fg capitalize">{date}</time>

<Cover src={data.metadata.coverUrl} alt={data.metadata.coverAlt ?? ''} />

<article class="mt-8 space-y-3.5">
	<Post />
</article>

<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { title, date } = data.metadata;
	const { Component: Post } = data;

	const formattedDate = formatDate(date);
</script>

<h1 class="text-lg">
	{title}
</h1>
<time class="text-sm capitalize text-muted-fg">{formattedDate}</time>

<article class="mt-6 space-y-4">
	<Post />
</article>

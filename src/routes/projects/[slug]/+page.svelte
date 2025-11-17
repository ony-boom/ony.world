<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { title, date } = data.metadata;
	const { Component } = data;

	const formattedDate = formatDate(date);
</script>

<h1 class="text-lg">
	{title}
</h1>
<span class="text-sm text-muted">{formattedDate}</span>

<article class="mt-6 space-y-4">
	<Component />
</article>

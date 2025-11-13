<script lang="ts">
	import { formatDate } from '$lib/date';
	import { getLocale } from '$lib/paraglide/runtime';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
	const { title, date } = data.metadata;
	const { Component } = data;

	const formattedDate = formatDate(date, getLocale());
</script>

<h1 class="text-lg">
	{title}
</h1>
<span class="text-border text-sm">{formattedDate}</span>

<article class="mt-6 space-y-4">
	<Component />
</article>

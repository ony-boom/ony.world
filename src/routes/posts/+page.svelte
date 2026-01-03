<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ul class="mt-4 list-none space-y-4">
	{#each data.posts as post}
		{@const { metadata } = post}
		<li>
			<a
				href={`/posts/${metadata.slug}`}
				class="group flex items-baseline justify-between gap-4 no-underline"
			>
				<span class="link font-medium">
					{metadata.title}
				</span>

				<hr
					class="h-px flex-1 border-dotted border-muted transition-colors group-hover:border-fg"
				/>

				<time class="shrink-0 text-muted transition-colors group-hover:text-fg">
					{formatDate(metadata.date)}
				</time>
			</a>
		</li>
	{:else}
		<p>¯\_(ツ)_/¯</p>
	{/each}
</ul>

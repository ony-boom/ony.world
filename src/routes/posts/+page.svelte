<script lang="ts">
	import { formatDate } from '$lib/date';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ul class="mt-4 list-none space-y-4">
	{#each data.posts as post}
		{@const { metadata } = post}

		<li title={metadata.title}>
			<a
				href="/posts/{metadata.slug}"
				class="group flex flex-col-reverse gap-2 no-underline sm:flex-row sm:items-baseline sm:gap-4"
			>
				<span class="link font-medium">
					{metadata.title}
				</span>
				<hr
					class="hidden h-px flex-1 border-dotted border-muted transition-colors group-hover:border-fg sm:block"
				/>
				<time
					class="shrink-0 text-sm text-muted transition-colors group-hover:text-fg sm:text-base"
				>
					{formatDate(metadata.date)}
				</time>
			</a>
		</li>
	{:else}
		<p>¯\_(ツ)_/¯</p>
	{/each}
</ul>

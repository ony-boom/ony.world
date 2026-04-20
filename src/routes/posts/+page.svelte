<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ul class="mt-4 list-none space-y-4">
	{#each data.posts as post}
		{@const { metadata } = post}

		<li>
			<a
				href="/posts/{metadata.slug}"
				class="group grid grid-cols-[5rem_1fr] items-baseline gap-5 no-underline"
				title={metadata.title}
			>
				<time
					datetime={metadata.date}
					class="text-right text-sm text-muted-fg tabular-nums transition-colors group-hover:text-fg"
				>
					{new Date(metadata.date).toLocaleString('en-US', {
						month: 'short',
						year: 'numeric'
					})}
				</time>
				<span
					class="text-fg underline decoration-muted decoration-[1px] underline-offset-[3px] transition-colors group-hover:decoration-fg"
				>
					{metadata.title}
				</span>
			</a>
		</li>
	{:else}
		<p>¯\_(ツ)_/¯</p>
	{/each}
</ul>

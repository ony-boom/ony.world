<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ul class="mt-4 list-none space-y-6">
	{#each data.projects as project}
		{@const { metadata } = project}
		<li class="grid grid-cols-[5rem_1fr] items-baseline gap-5">
			<time
				datetime={metadata.date}
				class="text-right text-sm text-muted-fg tabular-nums"
			>
				{new Date(metadata.date).toLocaleString('en-US', {
					month: 'short',
					year: 'numeric'
				})}
			</time>
			<div>
				<a href={`/projects/${metadata.slug}`}>
					{metadata.title}
				</a>
				<p class="mt-1 text-sm text-muted-fg">
					{metadata.description}
				</p>
			</div>
		</li>
	{:else}
		<p>¯\_(ツ)_/¯</p>
	{/each}
</ul>

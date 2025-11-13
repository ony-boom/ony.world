<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ul class="mt-4 list-none p-0">
	{#each data.projects as project}
		{@const { metadata } = project}
		<li class="space-y-2">
			<div class="flex items-center justify-between">
				<span>
					<a href={`/projects/${metadata.slug}`}>
						{metadata.title}
					</a>
				</span>
			</div>

			<p class="text-border">
				{metadata.description}
			</p>

			{#if metadata.coverUrl}
				{#if metadata.coverType === 'image'}
					<img src={metadata.coverUrl} alt={metadata.title} />
				{:else}
					<video autoplay loop muted>
						<source src={metadata.coverUrl} type="video/mp4" />
					</video>
				{/if}
			{/if}
		</li>
	{:else}
		<p>¯\_(ツ)_/¯</p>
	{/each}
</ul>

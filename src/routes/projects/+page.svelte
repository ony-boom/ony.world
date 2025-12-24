<script lang="ts">
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<ul class="mt-4 list-none space-y-4">
	{#each data.projects as project}
		{@const { metadata } = project}
		<li>
			<a class="font-medium" href={`/projects/${metadata.slug}`}>
				{metadata.title}
			</a>

			<p class="text-muted-fg">
				{metadata.description}
			</p>
		</li>
	{:else}
		<p>¯\_(ツ)_/¯</p>
	{/each}
</ul>

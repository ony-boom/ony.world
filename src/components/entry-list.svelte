<script lang="ts">
	let {
		entries,
		base,
		showDescription = false,
		class: className
	}: {
		entries: App.BlogPost[];
		base: string;
		showDescription?: boolean;
		class?: string;
	} = $props();

	function formatDate(date: string) {
		return new Date(date).toLocaleString('en-US', {
			month: 'short',
			year: 'numeric'
		});
	}
</script>

<ul class={['list-none', className]}>
	{#each entries as { metadata } (metadata.slug)}
		<li>
			<a
				href="{base}/{metadata.slug}"
				class="group grid grid-cols-[5rem_1fr] items-baseline gap-2 no-underline md:gap-4"
				title={metadata.title}
			>
				<time
					datetime={metadata.date}
					class="text-sm text-fg/65 tabular-nums transition-colors group-hover:text-fg md:text-right"
				>
					{formatDate(metadata.date)}
				</time>
				<div class="min-w-0">
					<span
						class="text-fg underline decoration-muted decoration-1 underline-offset-[3px] transition-colors group-hover:decoration-fg"
					>
						{metadata.title}
					</span>
					{#if showDescription && metadata.description}
						<p class="mt-1 text-sm text-muted-fg">{metadata.description}</p>
					{/if}
				</div>
			</a>
		</li>
	{:else}
		<p>¯\_(ツ)_/¯</p>
	{/each}
</ul>

<script lang="ts">
	import { page } from '$app/state';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let {
		pageTitle,
		...props
	}: Omit<SvelteHTMLElements['nav'], 'aria-label'> & {
		pageTitle?: string;
	} = $props();

	let breadcrumbs = $derived.by(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);
		const crumbs = [{ label: '~', path: '/' }];

		let currentPath = '';
		for (let i = 0; i < parts.length; i++) {
			const part = parts[i];
			const isLast = i === parts.length - 1;

			let label = part
				.replace(/[-_]/g, ' ')
				.split(' ')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join(' ');

			if (isLast && pageTitle) {
				label = pageTitle;
			}

			currentPath += '/' + part;
			crumbs.push({ label, path: currentPath });
		}

		return crumbs;
	});
</script>

<nav {...props} aria-label="Breadcrumb" class={['flex items-center gap-1 text-sm', props.class]}>
	{#each breadcrumbs as crumb, i}
		{#if i < breadcrumbs.length - 1}
			<a href={crumb.path} class="ghost-link">
				{crumb.label}
			</a>
			<span class="text-muted-fg">/</span>
		{:else}
			<span class="font-medium text-muted-fg max-w-36 md:max-w-64 truncate" title={crumb.label}>
				{crumb.label}
			</span>
		{/if}
	{/each}
</nav>

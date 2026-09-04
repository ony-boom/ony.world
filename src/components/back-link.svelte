<script lang="ts">
	import Icon from '@iconify/svelte';
	import { page } from '$app/state';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let props: Omit<SvelteHTMLElements['nav'], 'aria-label'> = $props();

	// One level up: a post -> "Posts", a list -> "Home".
	const parent = $derived.by(() => {
		const parts = page.url.pathname.split('/').filter(Boolean);
		parts.pop();
		if (parts.length === 0) return { label: 'Home', path: '/' };
		const seg = parts[parts.length - 1];
		const label = seg
			.replace(/[-_]/g, ' ')
			.split(' ')
			.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
			.join(' ');
		return { label, path: '/' + parts.join('/') };
	});
</script>

<nav {...props} aria-label="Breadcrumb" class={['text-sm', props.class]}>
	<a href={parent.path} class="ghost-link group inline-flex items-center gap-1.5 no-underline">
		<Icon
			icon="tabler:arrow-narrow-left"
			width="18"
			height="18"
			class="shrink-0 transition-transform group-hover:-translate-x-0.5"
			aria-hidden="true"
		/>
		<span class="truncate">{parent.label}</span>
	</a>
</nav>

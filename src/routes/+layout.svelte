<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.ico';

	import { dev } from '$app/environment';
	import { initThemeToggle } from '$lib/theme';
	import { onMount } from 'svelte';
	import SideNav from '$components/side-nav.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const pageTitle = $derived(page.data?.pageTitle);
	const pageTitlePrefix = $derived(page.data?.pageTitlePrefix);
	const pageDescription = $derived(page.data?.pageDescription);
	const pageType = $derived(page.data?.pageType ?? 'website');
	const pageImage = $derived(page.data?.pageImage ?? '');

	const pageUrl = $derived(page.url.href);

	onMount(async () => {
		initThemeToggle();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>
		{pageTitlePrefix ? `${pageTitlePrefix}` : ''}
			{pageTitle}
	</title>
	<meta name="description" content={pageDescription} />

	{#if !dev}
		<script
			defer
			src="https://umami.ony.world/script.js"
			data-website-id="90b3ae53-99b3-4f30-a940-49a210c8504b"
		></script>
	{/if}

	<!-- og tag -->
	<meta property="og:title" content={pageTitle} />
	<meta property="og:description" content={pageDescription} />
	<meta property="og:image" content={pageImage} />
	<meta property="og:type" content={pageType} />
	<meta property="og:url" content={pageUrl} />
</svelte:head>

<main
	class="mx-auto grid max-w-3xl gap-8 px-6 pt-10 pb-16 sm:py-20 md:grid-cols-[7rem_1fr] md:gap-10 md:py-32"
>
	<aside
		aria-label="Primary"
		class="flex flex-row items-center justify-between gap-4 border-border md:sticky md:top-16 md:flex-col md:items-end md:gap-4 md:self-start md:border-r md:pr-6"
	>
		<SideNav />
		<ThemeSwitch />
	</aside>
	<div class="min-w-0">
		{@render children()}
	</div>
</main>

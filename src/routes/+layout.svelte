<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.ico';

	import { dev } from '$app/environment';
	import { initThemeToggle } from '$lib/theme';
	import { onMount } from 'svelte';
	import Breadcrumbs from '$components/breadcrumbs.svelte';
	import { page } from '$app/state';
	import ThemeSwitch from '$components/theme-switch.svelte';

	let { children } = $props();

	const pageTitle = $derived(page.data?.pageTitle);
	const pageTitlePrefix = $derived(page.data?.pageTitlePrefix);
	const pageDescription = $derived(page.data?.pageDescription);
	const pageType = $derived(page.data?.pageType ?? 'website');
	const pageImage = $derived(
		page.data?.pageImage ? new URL(page.data.pageImage, page.url.href).toString() : ''
	);

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

<main class="space-y-8 py-12 sm:py-20 md:py-32">
	<header class="sticky top-0 z-10 bg-bg/90 backdrop-blur-md">
		<div class="container flex items-center justify-between py-4">
			<Breadcrumbs {pageTitle} />
			<ThemeSwitch class="text-sm" />
		</div>
	</header>
	<div class="container">
		{@render children()}
	</div>
</main>

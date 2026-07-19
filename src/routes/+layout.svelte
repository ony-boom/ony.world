<script lang="ts">
	import '../app.css';

	import favicon from '$lib/assets/favicon.ico';

	import { dev } from '$app/environment';
	import { initThemeToggle } from '$lib/theme';
	import { onMount } from 'svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';
	import BackLink from '$components/back-link.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const isHome = $derived(page.url.pathname === '/');
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

<div class="mx-auto flex min-h-svh max-w-2xl flex-col px-6 py-10 sm:py-14">
	<!-- justify-end so the toggle stays pinned right whether or not a breadcrumb renders. -->
	<div class="flex items-center justify-end gap-3">
		{#if !isHome}
			<BackLink class="mr-auto min-w-0" />
		{/if}
		<ThemeSwitch class="shrink-0" />
	</div>
	<main class="mt-8 min-w-0 flex-1 sm:mt-10">
		{@render children()}
	</main>
</div>

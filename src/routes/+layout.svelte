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

	onMount(() => {
		initThemeToggle();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>
		{pageTitlePrefix ? `${pageTitlePrefix} | ` : ''}
		{pageTitle ?? "Ony ∙ Software developer"}
	</title>
	<meta name="description" content={pageDescription ?? "Hello, I'm Ony, and I make software"} />

	<link href="https://api.fontshare.com/v2/css?f[]=sentient@1&display=swap" rel="stylesheet" />
	{#if !dev}
		<script
			defer
			src="https://umami.ony.world/script.js"
			data-website-id="90b3ae53-99b3-4f30-a940-49a210c8504b"
		></script>
	{/if}
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

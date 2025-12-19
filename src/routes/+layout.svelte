<script lang="ts">
	import '@fontsource-variable/inter';

	import '../app.css';

	import favicon from '$lib/assets/favicon.ico';
	import { m } from '$lib/paraglide/messages';
	import LanguageSwitcher from '$components/language-switcher.svelte';
	// import ThemeSwitch from '$components/theme-switch.svelte';

	import { dev } from '$app/environment';
	import BackButton from '$components/back-button.svelte';
	import { page } from '$app/state';
	import { initThemeToggle } from '$lib/theme';
	import { onMount } from 'svelte';

	let { children } = $props();

	const isProjectsPage = $derived(page.route.id === '/projects/[slug]');
	const availableLanguages = $derived(isProjectsPage ? page.data?.availableLanguages : undefined);

	onMount(() => {
		initThemeToggle();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>Ony &bull; Software developer</title>
	<meta name="description" content={m.description()} />

	{#if !dev}
		<script
			defer
			src="https://umami.ony.world/script.js"
			data-website-id="90b3ae53-99b3-4f30-a940-49a210c8504b"
		></script>
	{/if}
</svelte:head>

<main class="space-y-8 md:space-y-12">
	<header class="sticky top-0 z-10 bg-bg/70 backdrop-blur-lg">
		<nav class="container flex items-center justify-between px-6 py-3 text-sm lg:px-0">
			<div>
				<BackButton class="hover:text-fg" />
			</div>
			<div class="flex items-center gap-2 text-muted-fg">
				<LanguageSwitcher class="hover:text-fg" {availableLanguages} />
				<!-- <ThemeSwitch class="hover:text-fg" /> -->
			</div>
		</nav>
	</header>
	<div class="container px-6 pb-8 lg:px-0">
		{@render children()}
	</div>
</main>

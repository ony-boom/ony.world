<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import { m } from '$lib/paraglide/messages';
	import LanguageSwitcher from '$components/language-switcher.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';

	import { dev } from '$app/environment';
	import BackButton from '$components/back-button.svelte';
	import { page } from '$app/state';

	let { children } = $props();

	const isProjectsPage = $derived(page.route.id === '/projects/[slug]');
	const availableLanguages = $derived(isProjectsPage ? page.data?.availableLanguages : undefined);
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="" />
	<link
		href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
		rel="stylesheet"
	/>

	{#if !dev}
		<script
			defer
			src="https://umami.ony.world/script.js"
			data-website-id="90b3ae53-99b3-4f30-a940-49a210c8504b"
		></script>
	{/if}

	<title>Ony &bull; Software developer</title>
	<meta name="description" content={m.description()} />
</svelte:head>

<main class="space-y-2">
	<header class="sticky top-0 bg-bg py-4">
		<nav class="container flex items-center justify-between text-sm text-muted">
			<div>
				<BackButton class="hover:text-fg" />
			</div>
			<div class="flex items-center gap-4">
				<LanguageSwitcher {availableLanguages} />
				<ThemeSwitch />
			</div>
		</nav>
	</header>
	<div class="container">
		{@render children()}
	</div>
</main>

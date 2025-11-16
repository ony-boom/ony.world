<script lang="ts">
	import '@fontsource-variable/inter/wght.css';

	import '../app.css';

	import favicon from '$lib/assets/favicon.ico';
	import { m } from '$lib/paraglide/messages';
	import LanguageSwitcher from '$components/language-switcher.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';

	import { dev } from '$app/environment';
	import BackButton from '$components/back-button.svelte';
	import { page } from '$app/state';
	import { applyColorVariables } from '$lib/theme';

	let { children } = $props();

	const isProjectsPage = $derived(page.route.id === '/projects/[slug]');
	const availableLanguages = $derived(isProjectsPage ? page.data?.availableLanguages : undefined);

	$effect(() => {
		applyColorVariables();
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

<main class="space-y-6">
	<header class="sticky top-0 bg-bg py-4">
		<nav class="container flex items-center justify-between text-sm text-muted">
			<div>
				<BackButton class="hover:text-fg" />
			</div>
			<div class="flex items-center gap-4">
				<LanguageSwitcher class="hover:text-fg" {availableLanguages} />
				<ThemeSwitch class="hover:text-fg" />
			</div>
		</nav>
	</header>
	<div class="container pb-8">
		{@render children()}
	</div>
</main>

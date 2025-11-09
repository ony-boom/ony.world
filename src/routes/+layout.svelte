<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import { m } from '$lib/paraglide/messages';
	import LanguageSwitcher from '$components/language-switcher.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';

	import { dev } from '$app/environment';
	import BackButton from '$components/back-button.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link href="https://api.fontshare.com/v2/css?f[]=general-sans@1&display=swap" rel="stylesheet" />

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
	<header class="sticky top-0 py-4">
		<nav class="container flex items-center justify-between text-sm text-muted">
			<div>
				<BackButton class="hover:text-fg" />
			</div>
			<div class="flex items-center gap-4">
				<LanguageSwitcher />
				<ThemeSwitch />
			</div>
		</nav>
	</header>
	<div class="container">
		{@render children()}
	</div>
</main>

<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';
	import { m } from '$lib/paraglide/messages';
	import LanguageSwitcher from '$components/language-switcher.svelte';
	import ThemeSwitch from '$components/theme-switch.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />

	<link href="https://api.fontshare.com/v2/css?f[]=general-sans@1&display=swap" rel="stylesheet" />

	<script
		defer
		src="https://umami.ony.world/script.js"
		data-website-id="90b3ae53-99b3-4f30-a940-49a210c8504b"
	></script>

	<title>Ony &bull; Software developer</title>
	<meta name="description" content={m.description()} />
</svelte:head>

<main class="px-4">
	<header class="sticky top-0 py-4">
		<nav class="container mx-auto flex items-center justify-end gap-4 text-sm text-muted">
			<LanguageSwitcher />
			<ThemeSwitch />
		</nav>
	</header>
	{@render children()}
</main>

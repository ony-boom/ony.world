<script lang="ts">
	import { browser } from '$app/environment';
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime';

	const localesMap: Record<(typeof locales)[number], string> = {
		en: 'English',
		fr: 'Français'
	};

	let selected = $state(getLocale());

	function onChange() {
		if (browser) {
			setLocale(selected);
		}
	}
</script>

<select
	onchange={onChange}
	class="min-w-20"
	name="lang-switcher"
	id="lang-switcher"
	bind:value={selected}
>
	{#each Object.entries(localesMap) as locale}
		<option value={locale[0]}>{locale[1]}</option>
	{/each}
</select>

<script lang="ts">
	import { browser } from '$app/environment';
	import { locales, getLocale, setLocale } from '$lib/paraglide/runtime';

	const localesMap: Record<(typeof locales)[number], string> = {
		en: 'English',
		fr: 'Français'
	};

	let selected = getLocale();

	function onChange() {
		if (browser) {
			setLocale(selected);
		}
	}
</script>

<select
	bind:value={selected}
	onchange={onChange}
	class="min-w-20"
	name="lang-switcher"
	id="lang-switcher"
>
	{#each Object.entries(localesMap) as localeEntry}
		{@const locale = localeEntry[0]}
		{@const localelabel = localeEntry[1]}

		<option value={locale}>{localelabel}</option>
	{/each}
</select>

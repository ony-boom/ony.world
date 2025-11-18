<script lang="ts">
	import { locales, getLocale, setLocale, type Locale } from '$lib/paraglide/runtime';
	import type { SvelteHTMLElements } from 'svelte/elements';

	type Props = {
		availableLanguages?: Locale[];
	} & SvelteHTMLElements['select'];

	let { availableLanguages = [...locales], ...props }: Props = $props();

	const localesMap: Record<(typeof locales)[number], string> = {
		en: 'English',
		fr: 'Français'
	};

	let value = $state(getLocale());

	$effect(() => {
		if (availableLanguages.includes(value)) {
			setLocale(value);
			return;
		}

		const firstAvailable = availableLanguages[0];
		if (firstAvailable) {
			value = firstAvailable;
			setLocale(firstAvailable);
		}
	});
</script>

<select
	{...props}
	bind:value
	class={['min-w-20', props.class]}
	name="lang-switcher"
	id="lang-switcher"
>
	{#each Object.entries(localesMap) as localeEntry}
		{@const locale = localeEntry[0]}
		{@const localelabel = localeEntry[1]}
		{@const isAvailable = availableLanguages.includes(locale as Locale)}

		<option
			value={locale}
			disabled={!isAvailable}
			class:opacity-50={!isAvailable}
			class:cursor-not-allowed={!isAvailable}
			title={!isAvailable ? 'Not available for this content' : undefined}
		>
			{localelabel}
		</option>
	{/each}
</select>

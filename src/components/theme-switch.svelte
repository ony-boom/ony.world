<script lang="ts">
	import { theme } from '$lib/theme';
	import Icon from '@iconify/svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { children, ...props }: SvelteHTMLElements['button'] = $props();

	function switchTheme() {
		theme.set($theme === 'dark' ? 'light' : 'dark');
	}
</script>

<button class={[props.class]} onclick={switchTheme}>
	<Icon font-size={18} icon="lucide:sun-moon" />
</button>

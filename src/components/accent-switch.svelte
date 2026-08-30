<script lang="ts">
	import { accent, nextAccent } from '$lib/accent';
	import { canMorph } from '$lib/view-transition';
	import { tick } from 'svelte';
	import type { SvelteHTMLElements } from 'svelte/elements';

	let { ...props }: SvelteHTMLElements['button'] = $props();

	const next = $derived(nextAccent($accent));

	function cycle() {
		// Every colour on the page moves at once, so let the root cross-fade carry it
		// rather than transitioning a hundred properties individually.
		if (!canMorph()) {
			accent.set(next);
			return;
		}

		document.startViewTransition(() => {
			accent.set(next);
			return tick();
		});
	}
</script>

<button
	type="button"
	aria-label={`Switch to ${next} accent`}
	title={`Switch to ${next} accent`}
	class={['icon-button', props.class]}
	onclick={cycle}
>
	<!-- The one round thing on the site: a colour chip reads as a swatch, not a UI box. -->
	<span class="size-3.5 rounded-full bg-accent transition-colors duration-150"></span>
</button>

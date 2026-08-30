<script lang="ts">
	import Icon from '@iconify/svelte';
	import { canMorph } from '$lib/view-transition';
	import { onMount, tick } from 'svelte';

	// A view-transition-name has to be unique while a transition runs, so the thumbnail
	// wears it only long enough to be snapshotted, then hands it to the full-size copy.
	const NAME = 'lightbox-media';

	let dialog = $state<HTMLDialogElement | null>(null);
	let media = $state<HTMLImageElement | null>(null);
	let src = $state('');
	let alt = $state('');

	// The thumbnail this was opened from, so closing can morph back into it.
	let source: HTMLImageElement | null = null;
	let busy = false;
	// While a view transition drives the motion the CSS transitions must stand down, or the
	// dialog gets snapshotted mid-fade and the morph animates out of a transparent frame.
	let morphing = $state(false);

	async function paint(open: boolean) {
		await tick();
		if (open) {
			dialog?.showModal();
			// Snapshot an empty box and the morph starts from nothing; the bytes are already
			// cached from the thumbnail, so this resolves immediately in practice.
			await media?.decode().catch(() => {});
		} else {
			dialog?.close();
		}
	}

	/** Hand NAME from one element to the other across the paint, in either direction. */
	async function morph(from: HTMLElement, to: HTMLElement, open: boolean) {
		morphing = true;
		await tick();
		from.style.viewTransitionName = NAME;
		const transition = document.startViewTransition(async () => {
			from.style.viewTransitionName = '';
			await paint(open);
			to.style.viewTransitionName = NAME;
		});

		try {
			await transition.finished;
		} finally {
			// Leaving the name on would collide with the next transition.
			to.style.viewTransitionName = '';
			morphing = false;
		}
	}

	async function open(img: HTMLImageElement) {
		if (busy || dialog?.open) return;
		busy = true;
		source = img;
		src = img.currentSrc || img.src;
		alt = img.alt;

		// media only exists once src has rendered the dialog, so paint first when not morphing.
		if (canMorph()) {
			await tick();
			if (media) await morph(img, media, true);
		} else {
			await paint(true);
		}
		busy = false;
	}

	async function close() {
		if (busy || !dialog?.open) return;
		busy = true;
		const back = source;

		if (canMorph() && media && back?.isConnected) await morph(media, back, false);
		else await paint(false);

		source = null;
		busy = false;
	}

	onMount(() => {
		const onClick = (event: MouseEvent) => {
			if (event.defaultPrevented || event.button !== 0) return;
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

			const img = event.target;
			if (!(img instanceof HTMLImageElement)) return;
			// Post and project media only, and never an image that is already a link.
			if (!img.closest('article, figure') || img.closest('a')) return;

			event.preventDefault();
			open(img);
		};

		document.addEventListener('click', onClick);
		return () => document.removeEventListener('click', onClick);
	});
</script>

<!-- Nothing until the first image is opened: an always-mounted <img src=""> makes some
     browsers re-request the page, and the icon would load on pages with no images at all. -->
{#if src}
	<dialog
		bind:this={dialog}
		data-lightbox
		data-morph={morphing ? '' : undefined}
		class="fixed inset-0 m-0 h-full max-h-none w-full max-w-none bg-transparent p-4 sm:p-8"
		aria-label="Expanded image"
		onclick={(event) => event.target === dialog && close()}
		oncancel={(event) => {
			// Escape closes the dialog outright; take it over so the exit animates too.
			event.preventDefault();
			close();
		}}
	>
		<img bind:this={media} {src} {alt} class="max-h-full max-w-full object-contain" />

		<button
			type="button"
			aria-label="Close image"
			title="Close image"
			class="icon-button absolute top-3 right-3"
			onclick={close}
		>
			<Icon icon="tabler:x" width="18" height="18" aria-hidden="true" />
		</button>
	</dialog>
{/if}

<style>
	/* Closed state, which doubles as the exit target. The discrete properties need
	   allow-discrete or display/overlay would snap and the exit would never be seen. */
	dialog {
		opacity: 0;
		transition:
			opacity 200ms ease-in,
			overlay 200ms ease-in allow-discrete,
			display 200ms ease-in allow-discrete;
	}

	dialog[open] {
		/* Display lives here, not in a utility class: a display value that applies while the
		   dialog is closed overrides the UA stylesheet and leaves an invisible sheet over the
		   page, swallowing every click. */
		display: flex;
		align-items: center;
		justify-content: center;
		opacity: 1;
		transition-timing-function: ease-out;
	}

	/* Must follow the [open] rule: same specificity, and the entry state loses otherwise. */
	@starting-style {
		dialog[open] {
			opacity: 0;
		}
	}

	dialog::backdrop {
		background-color: transparent;
		transition:
			background-color 200ms ease-in,
			overlay 200ms ease-in allow-discrete,
			display 200ms ease-in allow-discrete;
	}

	dialog[open]::backdrop {
		/* The page's own ground, so the dim follows the accent hue. color-mix, not Tailwind's
		   --alpha(): a component <style> block doesn't go through that pipeline. */
		background-color: color-mix(in oklab, var(--bg) 94%, transparent);
		transition-timing-function: ease-out;
	}

	/* A nesting selector can't stand in for a pseudo-element, so this can't be nested. */
	@starting-style {
		dialog[open]::backdrop {
			background-color: transparent;
		}
	}

	/* View transitions own the motion here; a competing CSS fade corrupts the snapshot. */
	dialog[data-morph],
	dialog[data-morph]::backdrop {
		transition: none;
	}

	dialog img {
		cursor: zoom-out;
	}

	@media (prefers-reduced-motion: reduce) {
		dialog,
		dialog::backdrop {
			transition: none;
		}
	}
</style>

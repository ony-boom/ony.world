<script lang="ts">
	import { ACCENTS, accent, type Accent } from '$lib/accent';
	import { canMorph } from '$lib/view-transition';
	import { tick, type Snippet } from 'svelte';

	// Wraps the control it hangs off (the theme switch): hovering that is what opens the
	// palette, so the two have to share a box.
	let { children, class: className }: { children: Snippet; class?: string } = $props();

	// A view transition drops :hover for its duration, and the browser only works it out
	// again on the next pointer move — so on its own, picking an accent folds the palette
	// away under the pointer that just picked it. Held open until that move, when :hover
	// is true again for wherever the pointer really is and can take over.
	let held = $state(false);

	function release() {
		addEventListener('pointermove', () => (held = false), { once: true });
	}

	function choose(next: Accent) {
		if (next === $accent) return;

		// Every colour on the page moves at once, so let the root cross-fade carry it
		// rather than transitioning a hundred properties individually.
		if (!canMorph()) {
			accent.set(next);
			return;
		}

		held = true;
		document
			.startViewTransition(() => {
				accent.set(next);
				return tick();
			})
			.finished.finally(release);
	}
</script>

<div class={['appearance flex items-center', held && 'held', className]}>
	<div class="palette flex items-center" role="group" aria-label="Accent colour">
		{#each ACCENTS as name, i (name)}
			<!-- data-accent re-derives the accent tokens on the swatch itself (app.css), so
			     each one shows its own colour — and its focus ring — whatever the page is in. -->
			<button
				type="button"
				data-accent={name}
				aria-label={`${name} accent`}
				aria-pressed={$accent === name}
				title={name}
				class="swatch icon-button"
				style:--i={ACCENTS.length - 1 - i}
				onclick={() => choose(name)}
			>
				<!-- A colour chip reads as a swatch, not a UI box. The site radius makes it a circle. -->
				<span class="size-3 rounded-(--radius) bg-accent"></span>
			</button>
		{/each}
	</div>

	{@render children()}
</div>

<style>
	/* Current accent: a ring in its own colour, held off the chip by a sliver of the pill. */
	.swatch[aria-pressed='true'] span {
		box-shadow:
			0 0 0 1.5px var(--surface),
			0 0 0 3px var(--accent);
	}

	/* The pill: one surface behind the swatches and the theme button, so the palette reads
	   as the button's own hover opening up rather than a row appearing beside it. A
	   pseudo-element, so it adds no box to the markup; isolation keeps its -1 inside this
	   component instead of behind the page. */
	.appearance {
		position: relative;
		isolation: isolate;

		/* Even spacing is built from halves: every button is the same width, its content
		   centred, so the space either side of a chip or the icon is (item − content) / 2,
		   and two neighbours make one full gap. The pill's own padding is one more half, so
		   its ends match the gaps between. A 12px chip whose ring reaches 18px and an 18px
		   icon in 28px leave 5px a side: 10px of air around every item, ends included.
		   Buttons run the pill's full height, which keeps the hit area tall while the
		   row stays tight. */
		--item: 1.75rem;
		--pad: 0.3125rem;
		padding: 0 var(--pad);
	}

	/* Swatches and the theme button alike. Scoped CSS outranks the size-9 that
	   .icon-button brings from the components layer. */
	.appearance :global(button) {
		width: var(--item);
		height: calc(2 * var(--radius));
	}

	.appearance::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: -1;
		pointer-events: none;
		border: 1px solid var(--border);
		/* The buttons make it 2 × --radius tall: this is the pill --radius was taken from,
		   and why its ends come out fully round. */
		border-radius: var(--radius);
		background: var(--surface);
	}

	/* Hidden only where hover exists. Touch has no hover to open it with, so there the
	   palette simply stays out — which is also the state any device without this media
	   query falls back to. */
	@media (hover: hover) {
		/* The box ignores the pointer and only the buttons take it, so the palette opens
		   off the theme button itself, not off the empty space it will unfold into. */
		.appearance,
		.palette {
			pointer-events: none;
		}

		.appearance > :global(button) {
			pointer-events: auto;
		}

		/* At rest the pill is folded down to the theme button and its padding, invisible, so
		   hovering shows it arriving behind the button and then widening to take in the
		   swatches. The edge moves, not a clip or a scale, so the border and the round ends
		   hold their shape the whole way. Same timing as the swatches, so the two leave
		   together. */
		.appearance::before {
			left: calc(100% - var(--item) - 2 * var(--pad));
			opacity: 0;
			transition:
				left 120ms ease-in 150ms,
				opacity 120ms ease-in 150ms;
		}

		/* Leads the swatches slightly, and outlasts the first of them, so each chip lands
		   on ground that is already there. */
		.appearance:is(:hover, .held)::before {
			left: 0;
			opacity: 1;
			transition:
				left 220ms cubic-bezier(0.22, 1, 0.36, 1),
				opacity 120ms ease-out;
		}

		/* Exit: ease-in, quicker than the entrance, all together. The delay is a grace
		   period, so a pointer that slips off on its way to a swatch doesn't fold it away. */
		.appearance .swatch {
			opacity: 0;
			transform: translateX(0.5rem) scale(0.6);
			pointer-events: none;
			transition:
				opacity 120ms ease-in 150ms,
				transform 120ms ease-in 150ms;
		}

		/* Entrance: ease-out, fanning out from the theme button — --i counts from the swatch
		   nearest it — at 30ms a step, under the 50ms where a stagger starts to drag. */
		.appearance:is(:hover, .held) .swatch {
			opacity: 1;
			transform: none;
			pointer-events: auto;
			transition:
				opacity 180ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 30ms),
				transform 180ms cubic-bezier(0.22, 1, 0.36, 1) calc(var(--i) * 30ms);
		}

		/* Keyboard: the hidden swatches stay in the tab order, and tabbing onto one opens
		   the palette at once — no fan-out to wait through. :focus-visible, not
		   :focus-within, so a mouse click doesn't pin it open after the pointer leaves. */
		.appearance:has(:focus-visible) .swatch {
			opacity: 1;
			transform: none;
			pointer-events: auto;
			transition: none;
		}

		.appearance:has(:focus-visible)::before {
			left: 0;
			opacity: 1;
			transition: none;
		}
	}

	@media (hover: hover) and (prefers-reduced-motion: reduce) {
		.appearance .swatch,
		.appearance:is(:hover, .held) .swatch {
			transform: none;
		}

		/* The pill still opens, but by fading in at full width rather than sliding. */
		.appearance::before,
		.appearance:is(:hover, .held)::before {
			left: 0;
			transition-property: opacity;
		}
	}
</style>

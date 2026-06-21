<script lang="ts">
	import { onMount } from 'svelte';

	const TZ = 'Indian/Antananarivo';
	const HOME = 'Antananarivo';

	// Null until mounted so SSR doesn't bake a wrong (build-time) clock and cause a flash.
	let now = $state<Date | null>(null);
	let showVisitor = $state(false);

	onMount(() => {
		now = new Date();
		const id = setInterval(() => (now = new Date()), 10_000);
		return () => clearInterval(id);
	});

	function hour24(d: Date, timeZone?: string) {
		return Number(
			new Intl.DateTimeFormat('en-US', { timeZone, hour: 'numeric', hour12: false }).format(d)
		);
	}
	function clock(d: Date, timeZone?: string) {
		return new Intl.DateTimeFormat('en-US', {
			timeZone,
			hour: 'numeric',
			minute: '2-digit',
			hour12: true
		}).format(d);
	}

	const tz = $derived(showVisitor ? undefined : TZ);
	const label = $derived(showVisitor ? 'Your time' : HOME);
	const time = $derived(now ? clock(now, tz) : '');
	const isNight = $derived.by(() => {
		if (!now) return true;
		const h = hour24(now, tz);
		return h < 6 || h >= 18;
	});
	// Hours Antananarivo is ahead (+) / behind (−) the visitor, for the "your time" view.
	const diff = $derived.by(() => {
		if (!now) return 0;
		let d = hour24(now, TZ) - now.getHours();
		if (d > 12) d -= 24;
		if (d < -12) d += 24;
		return d;
	});
	const offset = $derived(
		diff === 0 ? `${HOME} same time` : `${HOME} ${diff > 0 ? '+' : '−'}${Math.abs(diff)}h`
	);
</script>

{#if !now}
	<div class="h-10" aria-hidden="true"></div>
{:else}
	<button
		type="button"
		onclick={() => (showVisitor = !showVisitor)}
		aria-label={showVisitor ? `Show ${HOME} time` : 'Show your local time'}
		class="np-in group inline-flex h-10 cursor-pointer items-center gap-3 p-0 text-left"
	>
		<span
			class="grid size-10 shrink-0 place-items-center text-2xl leading-none transition-transform group-hover:scale-110"
			aria-hidden="true"
		>
			{isNight ? '🌙' : '☀️'}
		</span>
		<span class="min-w-0">
			<span class="block text-xs text-muted-fg">{label}</span>
			<span class="block leading-tight">
				{time}
				{#if showVisitor}<span class="text-muted-fg">· {offset}</span>{/if}
			</span>
		</span>
	</button>
{/if}

<style>
	.np-in {
		animation: np-in 0.28s cubic-bezier(0.22, 1, 0.36, 1) backwards;
	}
	@keyframes np-in {
		from {
			opacity: 0;
			transform: translateY(4px);
		}
	}
	@media (prefers-reduced-motion: reduce) {
		.np-in {
			animation: none;
		}
	}
</style>

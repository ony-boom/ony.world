<script module>
	let played = false;
</script>

<script>
	import Footer from '$components/footer.svelte';
	import NowPlaying from '$components/now-playing.svelte';
	import { experience } from '$lib/experience';
	import { onMount } from 'svelte';

	const CURRENTLY = {
		lines: ['Learning about decentralized social networks, and experimenting with them.']
	};

	const reveal = !played;

	onMount(() => {
		played = true;
	});
</script>

<section class:reveal>
	<p>
		Hi, I'm <strong>Ony</strong>. I
		<a href="/projects">build software</a>.
	</p>

	<p>
		I work remotely as a web and mobile developer. I'm always open to new projects, so feel free to
		<a href="mailto:onyrakoto27@gmail.com">reach out</a>. I mostly work with TypeScript/JavaScript
		and Go.
	</p>

	<p>
		Recently <a href="/posts">I started writing</a> more about things I learn and my experience, mostly
		because the site felt a bit empty to be honest.
	</p>
</section>

<section class:reveal-late={reveal} style="--delay: 0.16s" class="mt-16">
	<h2 class="mb-5 text-sm text-muted-fg">Currently</h2>
	<ul class="space-y-2">
		{#each CURRENTLY.lines as line}
			<li class="leading-relaxed">{line}</li>
		{/each}
	</ul>

	<!-- The one line here that writes itself. Sits with the hand-written ones because
	     it answers the same question. -->
	<NowPlaying class="mt-6" />
</section>

<section class:reveal-late={reveal} style="--delay: 0.2s" class="mt-16">
	<h2 class="mb-5 text-sm text-muted-fg">Experience</h2>
	<ul class="space-y-7">
		{#each experience as job}
			{@const range = job.from ? `${job.from} – ${job.to}` : job.to}
			{@const meta = job.location ? `${range} · ${job.location}` : range}
			<li class="sm:grid sm:grid-cols-[6rem_1fr] sm:items-baseline sm:gap-x-6">
				<!-- desktop: dates in the left column -->
				<span class="hidden text-sm whitespace-nowrap text-muted-fg tabular-nums sm:block">
					{range}
				</span>
				<div class="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5">
					<span>
						{job.role}
						<span class="text-muted-fg">·</span>
						{#if job.url}
							<a href={job.url} target="_blank" rel="noreferrer">{job.company}</a>
						{:else}
							{job.company}
						{/if}
					</span>
					{#if job.location}
						<span class="hidden text-sm text-muted-fg sm:block">{job.location}</span>
					{/if}
				</div>
				<!-- mobile: dates + location on a muted line below the role -->
				<div class="mt-1 text-sm text-muted-fg tabular-nums sm:hidden">
					{meta}
				</div>
			</li>
		{/each}
	</ul>
</section>

<Footer class={['mt-16', reveal && 'reveal']} />

<style>
	/* ponytail: CSS-only staggered fade-up, no JS/observer. Reduced-motion safe. */
	.reveal > :global(*),
	.reveal-late,
	:global(.reveal:is(footer)) {
		animation: reveal-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards;
	}

	.reveal > :global(p:nth-child(1)) {
		animation-delay: 0.04s;
	}
	.reveal > :global(p:nth-child(2)) {
		animation-delay: 0.08s;
	}
	.reveal > :global(p:nth-child(3)) {
		animation-delay: 0.12s;
	}
	/* Several blocks share .reveal-late, so each sets its own step to keep the cascade. */
	.reveal-late {
		animation-delay: var(--delay, 0.16s);
	}
	:global(.reveal:is(footer)) {
		animation-delay: 0.28s;
	}

	@keyframes reveal-up {
		from {
			opacity: 0;
			transform: translateY(0.5rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal > :global(*),
		.reveal-late,
		:global(.reveal:is(footer)) {
			animation: none;
		}
	}
</style>

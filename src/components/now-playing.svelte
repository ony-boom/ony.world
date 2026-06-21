<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { onMount } from 'svelte';

	type Track = {
		name: string;
		artist: string;
		url: string;
		image?: string;
		nowPlaying: boolean;
	};

	const KEY = env.PUBLIC_LASTFM_API_KEY;
	const USER = env.PUBLIC_LASTFM_USER;

	// 'loading' shows a skeleton; 'hidden' renders nothing (no env, error, or no scrobbles).
	let status = $state<'loading' | 'ready' | 'hidden'>('loading');
	let track = $state<Track | null>(null);

	async function load() {
		const url = new URL('https://ws.audioscrobbler.com/2.0/');
		url.search = new URLSearchParams({
			method: 'user.getrecenttracks',
			user: USER,
			api_key: KEY,
			format: 'json',
			limit: '1'
		}).toString();

		const res = await fetch(url);
		if (!res.ok) throw new Error(`Last.fm ${res.status}`);
		const data = await res.json();

		const raw = data?.recenttracks?.track;
		const t = Array.isArray(raw) ? raw[0] : raw;
		if (!t) {
			status = 'hidden';
			return;
		}

		const image = (t.image ?? []).findLast?.((i: { '#text': string }) => i['#text'])?.['#text'];
		track = {
			name: t.name,
			artist: t.artist?.['#text'] ?? t.artist,
			url: t.url,
			image: image || undefined,
			nowPlaying: t['@attr']?.nowplaying === 'true'
		};
		status = 'ready';
	}

	onMount(() => {
		if (!KEY || !USER) {
			status = 'hidden';
			return;
		}
		load().catch(() => (status = 'hidden'));
		// Refresh so "now playing" stays roughly live without hammering the API.
		const id = setInterval(() => load().catch(() => {}), 45_000);
		return () => clearInterval(id);
	});
</script>

{#if status === 'loading'}
	<!-- Reserve the exact row height so loading -> loaded doesn't shift layout; no skeleton. -->
	<div class="h-10" aria-hidden="true"></div>
{:else if status === 'ready' && track}
	<a
		href={track.url}
		target="_blank"
		rel="noreferrer"
		class="np-in group flex h-10 items-center gap-3 no-underline"
	>
		{#if track.image}
			<img
				src={track.image}
				alt=""
				width="40"
				height="40"
				loading="lazy"
				class="mx-0 size-10 shrink-0 rounded object-cover"
			/>
		{:else}
			<span
				class="grid size-10 shrink-0 place-items-center text-3xl leading-none"
				aria-hidden="true"
			>
				🎵
			</span>
		{/if}

		<div class="min-w-0">
			<div class="text-xs text-muted-fg">
				{track.nowPlaying ? 'Now playing' : 'Last played'}
			</div>
			<div class="truncate leading-tight">
				<span class="text-fg decoration-muted underline-offset-[3px] group-hover:underline">
					{track.name}
				</span>
				<span class="text-muted-fg transition-colors group-hover:text-fg">· {track.artist}</span>
			</div>
		</div>
	</a>
{/if}

<style>
	/* Entrance when the track mounts after fetch: ease-out, <300ms, reduced-motion safe. */
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

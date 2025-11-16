<script lang="ts">
	import Text from '$components/text.svelte';
	import { m } from '$lib/paraglide/messages';

	const LINKS = [
		{
			name: 'Email',
			url: 'mailto:ony@ony.world'
		},
		{
			name: 'Github',
			url: 'https://github.com/ony-boom'
		},
		{
			name: 'Linkedin',
			url: 'https://www.linkedin.com/in/ony-boom/'
		},
		{
			name: 'X (Twitter)',
			url: 'https://x.com/ony_lovasoa'
		}
	];
</script>

<div class="space-y-1">
	<h1 class="text-lg">Ony Lovasoa</h1>
	<p class="text-muted">{m.jobTitle()} &bull; Antananarivo, Madagascar</p>
</div>

<div class="mt-6 space-y-6">
	<section>
		<Text tradKey="index_intro" asHtml />
		<Text tradKey="index_cta" asHtml />
	</section>

	<section class="space-y-2">
		<h2>Experiences</h2>
		<ol class="space-y-4 border-s border-border">
			<li class="ms-4">
				<div
					class="absolute mt-2 -ml-[22.6px] h-3 w-3 rounded-full border border-bg bg-primary"
				></div>
				<time class="mb-1 text-xs text-primary">Today (16 Nov 2025)</time>
				<h3 class="mb-1 font-semibold text-muted">
					On a career break recharging and recalibrating
				</h3>
				<p class="mb-6 text-base text-dim">
					After road-tripping and hiking around Canada, I'm now back and resparking my curiosity by
					exploring new personal projects, through building and experimenting with AI.
				</p>
			</li>
		</ol>
	</section>

	<section class="space-y-2">
		<Text tradKey="index_internalLinksTitle" as="h2" />

		<ul class="pl-1">
			<li>
				<a href="/projects">Projects</a>
			</li>

			<li class="pointer-events-none text-dim">
				<!-- TODO: Replace href link with /posts when available -->
				<a class="line-through" href="/">Blog</a>
				<em>(<Text as="span" tradKey="commingSoon" />)</em>
			</li>
		</ul>
	</section>

	<section class="space-y-2">
		<Text tradKey="index_linksTitle" as="h2" />
		<ul class="pl-1">
			{#each LINKS as link}
				<li>
					<a href={link.url} target={link.url.startsWith('/') ? '_self' : '_blank'}>{link.name}</a>
				</li>
			{/each}
		</ul>
	</section>
</div>

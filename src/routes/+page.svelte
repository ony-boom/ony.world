<script lang="ts">
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

<div class="container mx-auto">
	<div class="space-y-1">
		<h1 class="text-xl">Ony Lovasoa</h1>
		<p class="text-muted">{m.jobTitle()} &bull; Antananarivo, Madagascar</p>
	</div>

	<div class="mt-8 space-y-8">
		<section>
			<p>{@html m.index_intro()}</p>
			<p>{@html m.index_cta()}</p>
		</section>

		<section class="space-y-2">
			<h2>{m.index_linksTitle()}</h2>

			<ul class="space-y-1">
				{#each LINKS as link}
					<li>
						<a href={link.url} target={link.url.startsWith('/') ? '_self' : '_blank'}>{link.name}</a
						>
					</li>
				{/each}
			</ul>
		</section>
	</div>
</div>

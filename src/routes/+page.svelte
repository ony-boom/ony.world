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

<div class="container mx-auto mt-8">
	<div class="space-y-1">
		<h1 class="text-xl">Ony Lovasoa</h1>
		<p class="text-muted">{m.jobTitle()} &bull; Antananarivo, Madagascar</p>
	</div>

	<div class="mt-8 space-y-8">
		<section>
			<Text tradKey="index_intro" asHtml />
			<Text tradKey="index_cta" asHtml />
		</section>

		<section class="space-y-2">
			<Text tradKey="index_linksTitle" as="h2" />
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

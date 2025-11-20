<script lang="ts">
	import ExperienceList from '$components/experiences/experience-list.svelte';
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
	<h1 class="text-lg">Ony</h1>
	<p class="text-muted-fg">{m.jobTitle()} &bull; Antananarivo, Madagascar</p>
</div>

<div class="mt-6 space-y-8">
	<section>
		<Text tradKey="index_intro" asHtml />
		<Text tradKey="index_cta" asHtml />
	</section>

	<section class="space-y-3">
		<Text tradKey="index_expTitle" as="h2" />
		<ExperienceList />
	</section>

	<section class="space-y-3">
		<Text tradKey="index_internalLinksTitle" as="h2" />

		<ul class="list-inside list-disc">
			<li>
				<a href="/projects">Projects</a>
			</li>

			<li class="pointer-events-none text-muted-fg">
				<!-- TODO: Replace href link with /posts when available -->
				<a class="line-through" href="/">Blog</a>
				<em>(<Text as="span" tradKey="commingSoon" />)</em>
			</li>
		</ul>
	</section>

	<section class="space-y-3">
		<Text tradKey="index_linksTitle" as="h2" />
		<ul class="flex gap-4">
			{#each LINKS as link}
				<li>
					<a href={link.url} target={link.url.startsWith('/') ? '_self' : '_blank'}>{link.name}</a>
				</li>
			{/each}
		</ul>
	</section>
</div>

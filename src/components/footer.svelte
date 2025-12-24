<script lang="ts">
	import type { SvelteHTMLElements } from 'svelte/elements';

	let props: SvelteHTMLElements['footer'] = $props();

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

<footer {...props} class={[props.class]}>
	<ul class="flex gap-4 border-t border-border py-4">
		{#each LINKS as link}
			<li class="text-sm">
				<a class="ghost-link" href={link.url} target={link.url.startsWith('/') ? '_self' : '_blank'}
					>{link.name}</a
				>
			</li>
		{/each}
	</ul>
</footer>

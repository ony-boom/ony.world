<script lang="ts">
	import { page } from '$app/state';

	const items = [
		{ label: 'About', href: '/' },
		{ label: 'Posts', href: '/posts' },
		{ label: 'Projects', href: '/projects' }
	];

	const pathname = $derived(page.url.pathname);

	function isActive(href: string) {
		if (href === '/') return pathname === '/';
		return pathname === href || pathname.startsWith(href + '/');
	}
</script>

<ul class="flex flex-row gap-5 text-sm md:flex-col md:items-end md:gap-1.5 md:text-right">
	{#each items as item}
		{@const active = isActive(item.href)}
		<li>
			<a
				href={item.href}
				class={[
					'no-underline transition-colors',
					active ? 'text-fg' : 'text-muted-fg hover:text-fg'
				]}
				aria-current={active ? 'page' : undefined}
			>
				{item.label}
			</a>
		</li>
	{/each}
</ul>

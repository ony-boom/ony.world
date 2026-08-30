<script lang="ts">
	let {
		src,
		alt = '',
		class: className
	}: { src?: string; alt?: string; class?: string } = $props();

	// The explicit coverType field is gone, and the CMS file widget hands us nothing but a
	// URL — so the extension is the only signal for which element to render.
	const url = $derived(src?.trim() ?? '');
	const isVideo = $derived(/\.(mp4|webm|ogv|mov|m4v)$/i.test(url));
	const caption = $derived(alt.trim());

	// One ratio for every cover, whatever the source orientation: a portrait left at its
	// own ratio runs too tall to sit above the post. Cropped from the centre, and the
	// fixed box means no shift when the image lands.
	const fit = 'aspect-video w-full bg-surface object-cover';
</script>

{#if url}
	<figure class={['mt-8', className]}>
		{#if isVideo}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video
				class={fit}
				{src}
				aria-label={caption || undefined}
				autoplay
				loop
				muted
				playsinline
				preload="metadata"
			></video>
		{:else}
			<img class={fit} {src} {alt} decoding="async" fetchpriority="high" />
		{/if}
		{#if caption}
			<!-- Same text as the alt/aria-label above, so hide this copy from AT rather than
			     have it announced twice. -->
			<figcaption class="mt-2 text-right text-xs text-muted-fg" aria-hidden="true">
				{caption}
			</figcaption>
		{/if}
	</figure>
{/if}

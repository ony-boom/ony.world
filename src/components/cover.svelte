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

	// Covers come in both orientations, so nothing is cropped: landscape is bound by the
	// column (bleeding past the text), portrait by the height cap, and both keep their
	// own ratio. w-auto/h-auto is what lets whichever bound bites first win.
	const fit = 'mx-auto block h-auto max-h-[min(70svh,32rem)] w-auto max-w-full';
</script>

{#if url}
	<!-- -mx-6 cancels the layout's px-6 so a landscape plate bleeds past the text column. -->
	<figure class={['-mx-6 mt-8', className]}>
		{#if isVideo}
			<!-- svelte-ignore a11y_media_has_caption -->
			<video class={fit} {src} autoplay loop muted playsinline preload="metadata"></video>
		{:else}
			<img class={fit} {src} {alt} decoding="async" fetchpriority="high" />
		{/if}
	</figure>
{/if}

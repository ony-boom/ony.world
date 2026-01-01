<svelte:options css="injected" />

<script lang="ts">
	let { children } = $props();
</script>

<div class="container">
	{@render children()}
</div>

<style>
	.container {
		width: 100%;
		height: 100%;
	}
</style>

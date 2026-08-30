<svelte:options css="injected" />

<script>
	let props = $props();
</script>

<div class="base">
	{#if props.extra && props.extra !== 'undefined'}
		<p class="extra">~ / {props.extra}</p>
	{/if}
	<h1>{props.pageTitle}</h1>
	<p>{props.pageDescription}</p>
</div>

<style>
	* {
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.base {
		width: 100%;
		height: 100%;
		font-family: 'Instrument Sans', sans-serif;
		font-size: 32px;

		padding: 64px 128px;

		display: flex;
		flex-direction: column;
		justify-content: center;

		color: #f5f5f5;
		background-color: #0f0f0f;

		h1 {
			color: #f5f5f5;
			margin-bottom: 4px;
		}

		.extra {
			font-size: 18px;
			color: #f5f5f573;
			margin-bottom: 28px;
		}
	}
</style>

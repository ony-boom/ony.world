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
		font-family: 'Sentient', serif;

		font-size: 32px;
		font-family: serif;

		padding: 64px 128px;

		display: flex;
		flex-direction: column;
		justify-content: center;

		color: #fcf5ee;
		background-color: #121212;

		h1 {
			color: #e6af7f;
      margin-bottom: 4px;
		}

		.extra {
			font-size: 18px;
			color: #fcf5ee80;
			margin-bottom: 28px;
		}
	}
</style>

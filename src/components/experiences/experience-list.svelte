<script lang="ts">
	import { experiences } from '$content/experiences';
	import ExperienceItem from './experience-item.svelte';
</script>

<ol class="ms-2 space-y-6 border-s border-border">
	{#each experiences as exp}
		<ExperienceItem {...exp} />
	{/each}
</ol>

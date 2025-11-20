<script lang="ts">
	import { experiences } from '$content/experiences';
	import ExperienceItem from './experience-item.svelte';
</script>

<ol class="space-y-4">
	{#each experiences as exp}
		<ExperienceItem {...exp} />
	{/each}
</ol>

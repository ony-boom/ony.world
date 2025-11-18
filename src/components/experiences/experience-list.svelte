<script lang="ts">
	import { experiences } from '$content/experiences';
	import ExperienceItem from './experience-item.svelte';
</script>

<ol class="space-y-6 border-s border-muted">
	{#each experiences as exp}
		<ExperienceItem {...exp} />
	{/each}
</ol>

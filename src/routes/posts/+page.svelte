<script lang="ts">
	import EntryList from '$components/entry-list.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<EntryList entries={data.posts} base="/posts" class="space-y-7" />

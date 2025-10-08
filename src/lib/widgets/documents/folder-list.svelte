<script>
	let { folders } = $props();
	import Folder from './folder.svelte';
	const visibleFolders = $derived(Object.entries(folders).filter(([folder]) => folder !== 'null'));
</script>

{#each visibleFolders as [folder, catalogItems]}
	<div class="overflow-hidden first:mt-2 first:rounded-t-2xl last:rounded-b-2xl">
		<Folder name={folder} items={catalogItems} />
	</div>
{/each}

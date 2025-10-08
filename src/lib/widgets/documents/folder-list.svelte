<script>
    let { folders } = $props();
    import Folder from "./folder.svelte";
    const visibleFolders = Object.entries(folders).filter(([folder]) => folder !== 'null');
</script>
{#each visibleFolders as [folder, catalogItems]}
    <div class="first:mt-2 overflow-hidden first:rounded-t-2xl last:rounded-b-2xl">
        <Folder name={folder} items={catalogItems} />
    </div>
{/each}
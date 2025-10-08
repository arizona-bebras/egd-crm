<script>
    let { folders } = $props();
    import Folder from "./folder.svelte";
</script>
{#each folders as [name, items]}
    <Folder name={name} items={items} />
{/each}
<script>
    import Catalog from "$lib/components/ui/catalog/catalog.svelte";
    let { catalogs } = $props();
</script>
<ul>
    {#each catalogs as catalog}
        <Catalog title={catalog.title}/>
    {/each}
</ul>
<script>
    import CatalogItem from "$lib/components/ui/catalog/item/catalog-item.svelte";
    let { catalogItems } = $props();
</script>
<ul>
    {#each catalogItems as catalogItem}
        <CatalogItem number={catalogItem.number} title={catalogItem.title} filePath={catalogItem.filePath}/>
    {/each}
</ul>
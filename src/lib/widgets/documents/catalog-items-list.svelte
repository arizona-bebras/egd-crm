<script>
    let { items } = $props();
    $inspect(items)
    import CatalogItem from "$lib/features/documents/category-item.svelte";
</script>
{#each items as item, i}
    <div class="overflow-hidden {i === 0 ? 'rounded-t-3xl' : ''}{i === items.length - 1 ? 'rounded-b-3xl' : ''}">
        <CatalogItem title={item.title} redirect_link={item.redirect_link} document_link={item.document_link} />
    </div>
{/each}
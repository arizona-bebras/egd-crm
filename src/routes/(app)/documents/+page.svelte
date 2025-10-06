<script lang="ts">
    import CatalogList from "$lib/widgets/catalog/catalogList.svelte";
    let { data } = $props()
    console.log($state.snapshot(data))
</script>

<CatalogList catalogs={data.documents}/>

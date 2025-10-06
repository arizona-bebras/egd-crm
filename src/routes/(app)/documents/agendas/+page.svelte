<script lang="ts">
    import * as Select from "$lib/components/ui/select/index.js";
    import CatalogItemsList from "$lib/widgets/catalog/catalog-items-list.svelte";
    let { data } = $props()
    console.log($state.snapshot(data))
</script>
<div class="container">
    <Select.Root type="single">
    <Select.Trigger class="w-[180px]"></Select.Trigger>
    <Select.Content>
    <Select.Item value="light">Заседание 1</Select.Item>
    <Select.Item value="dark">Заседание 2</Select.Item>
    <Select.Item value="system">Заседание 3</Select.Item>
    </Select.Content>
    </Select.Root>
    <CatalogItemsList catalogItems={ data.catalogItems }/>
</div>
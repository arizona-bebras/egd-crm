<script>
    let { name, items } = $props();
    import { ChevronRight, ChevronDown } from "@lucide/svelte";
    import CatalogList from "./catalog-items-list.svelte";
    let open = $state(false);
</script>
<button class="flex flex-row items-center justify-between p-4 bg-secondary/50 border-1 border-primary cursor-pointer" onclick={() => { open = !open }}>
    <div class="text-xl font-medium text-accent">
        {name}
    </div>
    {#if !open}
        <ChevronRight />
    {:else}
        <ChevronDown />
    {/if}
</button>
{#if open}
    <CatalogList items={items} />
{/if}
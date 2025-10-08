<script>
    let { name, items } = $props();
    import { ChevronRight, ChevronDown } from "@lucide/svelte";
    import CatalogList from "./catalog-items-list.svelte";
    import { slide } from 'svelte/transition';
    let open = $state(false);
</script>
<button class="flex flex-row items-center w-full justify-between p-4 bg-primary/50 border-1 border-secondary/ cursor-pointer" onclick={() => { open = !open }}>
    <div class="text-xl font-medium text-accent">
        {name}
    </div>
    <div transition:slide>
        {#if !open}
            <ChevronRight />
        {:else}
            <ChevronDown />
        {/if}
    </div>
</button>
{#if open}
    <div transition:slide>
        <CatalogList items={items} />
    </div>
{/if}
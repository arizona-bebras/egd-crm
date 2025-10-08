<script lang="ts">
    import CatalogList from "$lib/widgets/documents/catalog-items-list.svelte";
    import FolderList from "$lib/widgets/documents/folder-list.svelte";
    import { ChevronRight } from "@lucide/svelte";
    import { createQuery } from '@tanstack/svelte-query';
    import { supabase } from '$lib/supabaseClient';
    import { goto } from '$app/navigation'
    let { data } = $props()
    const catalogItems = createQuery(() => ({
		queryKey: ['catalog_items', data.route],
		queryFn: async () => await supabase.rpc('catalog_items_by_route_name', {
            p_route_name: data.route
        }),
	}));
</script>
<div class="sticky top-0">
    <p class="bg-primary py-4.5 text-center text-[16px] font-semibold mb-4">Документы</p>
</div>
<div class="flex flex-row items-center max-w-xl mb-4">
    <a class="text-2xl font-medium cursor-pointer" onclick={() => goto('../documents')}>Категории</a>
    <ChevronRight class="text-accent h-6 w-6" />
    <p class="text-2xl text-accent font-semibold">{data.route}</p>
</div>
{#if catalogItems.isSuccess}
	<CatalogList items={catalogItems.data.data} />
    <div class="flex flex-row items-center max-w-xl my-4">
        <p class="text-2xl font-medium">Папки</p>
    </div>
{/if}
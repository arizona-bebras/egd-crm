<script lang="ts">
	import CatalogList from '$lib/widgets/documents/catalog-items-list.svelte';
	import FolderList from '$lib/widgets/documents/folder-list.svelte';
	import { ChevronLeft, ChevronRight } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import { Button } from '$lib/components/ui/button/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import { groupBy } from '$lib/groupBy.js';
	import { goto } from '$app/navigation';
	let { data } = $props();
	const catalog = createQuery(() => ({
		queryKey: ['catalog', data.route],
		queryFn: () => supabase.from('catalogs').select('title').eq('route_name', data.route).single(),
		select: (q) => q.data,
	}));
	const catalogItems = createQuery(() => ({
		queryKey: ['catalog_items', data.route],
		queryFn: () =>
			supabase.rpc('catalog_items_by_route_name', {
				p_route_name: data.route,
			}),
		select: (q) => q.data,
	}));
	console.log(catalogItems)
</script>

<header
	class="bg-primary border-border relative box-content flex place-items-center border-b p-2.5 shadow-sm"
>
	<Button
		onclick={() => {
			history.back();
		}}
		class="bg-accent/70!"
	>
		<ChevronLeft class="size-6" />
	</Button>
	<p class="flex-1 text-center text-xl font-bold">
		{#if catalog.isSuccess}
			{catalog.data.title}
		{:else}
			<Skeleton class="ml-3 h-4 w-30" />
		{/if}
	</p>
</header>
<div class="mb-4 flex max-w-xl flex-row items-center p-2">
	<a class="cursor-pointer text-xl font-medium" href="/documents">Категории</a>
	<ChevronRight class="text-accent h-6 w-6" />
	<p class="text-accent text-xl font-semibold">
		{#if catalog.isSuccess}
			{catalog.data.title}
		{:else}
			<Skeleton class="ml-3 h-4 w-30" />
		{/if}
	</p>
</div>
{#if catalogItems.isSuccess}
	{@const groupedCatalogItems = groupBy(catalogItems.data, (x) => x.folder)}
	{console.log(groupedCatalogItems)}
	<CatalogList items={groupedCatalogItems[null]} />
	<div class="my-4 flex max-w-xl flex-col p-2">
		<p class="text-2xl font-medium mb-3">Папки</p>
		<!-- {#each Object.entries(groupedCatalogItems) as [folder, catalogItems]}
			{#if folder != 'null'}
				<div class="my-2">
					<p class="text-accent text-xl font-bold">{folder}</p>
					<CatalogList items={catalogItems} />
				</div>
			{/if}
		{/each} -->
		<FolderList folders={groupedCatalogItems} />
	</div>
{:else}
	{goto('./404')}
{/if}

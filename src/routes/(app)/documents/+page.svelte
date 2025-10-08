<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import type { Database } from '$lib/database.types';
	import CategoryCard from '$lib/widgets/documents/document-category.svelte';
	import DocumentCategory from '$lib/widgets/documents/document-category.svelte';
	import DocumentCatalogCard from '$lib/widgets/documents/document-catalog-card.svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Button } from '$lib/components/ui/button';
	import { Search } from '@lucide/svelte';

	const catalogs = createQuery<{
		category: string;
		catalogs: Database['public']['Tables']['catalogs'];
	}>(() => ({
		queryKey: ['catalogs'],
		// @ts-ignore
		queryFn: () => supabase.rpc('get_catalogs_grouped_by_category'),
	}));
</script>

<header
	class="bg-primary border-border sticky top-0 box-content flex flex-row-reverse place-items-center border-b p-2.5 shadow-sm"
>
	<Button size="icon" href="/search" class="bg-accent/30! absolute">
		<Search class="stroke-accent/80 size-6" />
	</Button>
	<p class="flex-1 text-center text-xl font-bold">Документы</p>
</header>
<div class="bg-secondary min-h-[calc(100vh-10rem)] px-6 py-4">
	{#if catalogs.isSuccess}
		{#each (await catalogs.promise)?.data as group (group.category)}
			<!-- <CategoryCard category={group.category} records={group.catalogs} /> -->
			<DocumentCategory category={group.category}>
				{#each group.catalogs as catalog}
					<DocumentCatalogCard route="documents/{catalog.route_name}" title={catalog.title} />
				{/each}
			</DocumentCategory>
		{/each}
	{:else}
		{#each [1, 2, 3]}
			<!-- <CategoryCard category={group.category} records={group.catalogs} /> -->
			<div class="my-2 space-y-2">
				<Skeleton class="h-4 w-35" />
				<div class="flex flex-1 flex-wrap gap-1">
					<Skeleton class="h-30 w-35" />
					<Skeleton class="h-30 w-35" />
					<Skeleton class="h-30 w-35" />
				</div>
			</div>
		{/each}
	{/if}
</div>

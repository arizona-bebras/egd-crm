<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import CreateCategory from '$lib/widgets/documents/CreateCategory.svelte';
	import type { Database } from '$lib/database.types';
	let { data } = $props();

	const catalogs = createQuery<{
		category: string;
		catalogs: Database['public']['Tables']['catalogs'];
	}>(() => ({
		queryKey: ['catalogs'],
		queryFn: async () => await supabase.rpc('get_catalogs_grouped_by_category'),
	}));
</script>

{#if catalogs.isSuccess}
	<div class="sticky top-0">
		<p class="bg-primary py-4.5 text-center text-[16px] font-semibold">Документы</p>
	</div>
	<div class="bg-secondary px-6 py-4">
		{#each catalogs.data.data as group (group.category)}
			<CreateCategory category={group.category} records={group.catalogs} />
		{/each}
	</div>
{/if}

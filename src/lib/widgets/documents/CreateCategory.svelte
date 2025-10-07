<script lang="ts">
	import { Computer } from '@lucide/svelte';
	import type { Database } from '$lib/database.types';
	let {
		category,
		records,
	}: { category: string; records: Database['public']['Tables']['catalogs']['Row'][] } = $props();
	$inspect(records);
</script>

<div>
	<p class="text-accent mb-[12px] text-[16px] font-semibold">{category}</p>
	<div class="mb-4 grid grid-cols-2 gap-2.5">
		{#each records as record (record)}
			<div
				class="bg-primary flex flex-col items-center justify-center rounded-[12px] border-2 border-[#000000]/20"
			>
				<Computer class="mt-3 mb-2 size-15" />
				<p class="mb-3 text-center font-medium">{record.title}</p>
			</div>
		{/each}
	</div>
</div>

<script>
	let { items } = $props();
	import CatalogItem from '$lib/features/documents/category-item.svelte';
</script>

<div class="px-2">
	{#each items as item}
		<div class="overflow-hidden first:rounded-t-2xl last:rounded-b-2xl ">
			<CatalogItem {...item} />
		</div>
	{/each}
</div>

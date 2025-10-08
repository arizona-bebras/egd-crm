<script>
	let { items } = $props();
	import CatalogItem from '$lib/features/documents/category-item.svelte';
</script>

<div class={items[0].folder == null ? "px-2": ''}>
	{#each items as item}
		<div class="overflow-hidden {items[0].folder == null ? "first:rounded-t-2xl last:rounded-b-2xl" : ''}">
			<CatalogItem {...item} />
		</div>
	{/each}
</div>

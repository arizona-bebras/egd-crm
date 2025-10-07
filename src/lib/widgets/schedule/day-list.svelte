<script lang="ts">
	import Day from './day.svelte';
	import SvelteVirtualList from '@humanspeak/svelte-virtual-list';

	let { currentDate } = $props();
	let listRef: SvelteVirtualList;
	let data = $state([currentDate]);

	for (let i = 1; i < 30; i++) {
		const newDay = new Date(currentDate);
		newDay.setDate(newDay.getDate() + i);
		data.push(newDay.toISOString().split('T')[0]);
	}
	for (let i = 1; i < 30; i++) {
		const newDay = new Date(currentDate);
		newDay.setDate(newDay.getDate() - i);
		data.unshift(newDay.toISOString().split('T')[0]);
	}

	const items = Array.from({ length: 58 }, (_, i) => ({
		id: i,
		day: data[i],
	}));

	$effect(() => {
		listRef?.scroll({ index: 17, smoothScroll: true, align: 'top' });
	});
</script>

<div class="h-[650px]">
	<SvelteVirtualList {items} bind:this={listRef} bufferSize={30}>
		{#snippet renderItem(item)}
			<Day date={item.day} />
		{/snippet}
	</SvelteVirtualList>
</div>
<!-- 
<div class="list">
    <VirtualList width="100%" height={500} itemCount={data.length} itemSize={400}>
        {#snippet item({ style, index })}
            <div {style}>
                <Day date={data[index]} />
            </div>
        {/snippet}
    </VirtualList>
</div> -->

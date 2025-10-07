<script lang="ts">
	import { onMount } from 'svelte';
	import Day from './day.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';
    import SvelteVirtualList from '@humanspeak/svelte-virtual-list';

    // let { currentDate } = $props()
    let listRef;

	let data = ['2025-10-07'];

    function getDays(days: string[]) {
        for (let i = 1; i < 100; i++) {
            const newDay = new Date('2025-10-07');
            newDay.setDate(newDay.getDate() + i);
            data.push(newDay.toISOString().split('T')[0]);
        }
        for (let i = 1; i < 100; i++) {
            const newDay = new Date('2025-10-07');
            newDay.setDate(newDay.getDate() - i);
            data.unshift(newDay.toISOString().split('T')[0]);
        }
    }

    getDays(data)

    const items = Array.from({ length: 200 }, (_, i) => ({
        id: i,
        day: data[i]
    }))


    onMount(() => {
	 	listRef.scroll({ index: 73, smoothScroll: true, align: 'bottom' });
	 });


</script>

<div class="list h-[600px]">
    <SvelteVirtualList {items} bind:this={listRef} mode="topToBottom">
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
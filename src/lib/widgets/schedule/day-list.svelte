<script lang="ts">
	import Day from './day.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';

    let { currentDate } = $props()

	let data = ['2025-01-01'];

    function getDays(days: string[]) {
        for (let i = 0; i < 500; i++) {
            const newDay = new Date(data[data.length-1]);
            newDay.setDate(newDay.getDate() + 1);
            data.push(newDay.toISOString().split('T')[0]);
        }
    }

    getDays(data)


</script>

<VirtualList width="100%" height={300} itemCount={data.length} itemSize={400}>
	{#snippet item({ style, index })}
		<div {style}>
			<!-- {@debug index} -->
			<Day date={data[index]} />
		</div>
	{/snippet}
</VirtualList>

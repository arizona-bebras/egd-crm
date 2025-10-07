<script>
	import Day from './day.svelte';
	import VirtualList from 'svelte-tiny-virtual-list';

	let data = ['2025-12-15', '2025-12-16', '2025-12-17', '2025-12-18', '2025-12-19', '2025-12-20'];
</script>

<VirtualList width="100%" height={300} itemCount={data.length} itemSize={400}>
	{#snippet item({ style, index })}
		<div {style}>
			{@debug index}
			<Day date={data[index]} />
		</div>
	{/snippet}
</VirtualList>

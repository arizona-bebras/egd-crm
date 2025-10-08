<script lang="ts">
	import Day from './day.svelte';

	let { currentDate } = $props();
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
		const targetElement = document.getElementById(currentDate);

		targetElement?.scrollIntoView({
		});
	});
</script>

<div class="h-fit">
	<div class="max-h-full px-2">
		{#each items as item}
			<div id={item.day}>
				<Day date={item.day} />
			</div>
		{/each}
	</div>
</div>

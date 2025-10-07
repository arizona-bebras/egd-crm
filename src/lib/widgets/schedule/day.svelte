<script lang="ts">
	import Event from '$lib/features/schedule/event/event.svelte';
	import { supabase } from '$lib/supabaseClient';
	let { date } = $props();
	const startOfDay = new Date(date + 'T00:00:00.000Z').toISOString();
	const endOfDay = new Date(date + 'T23:59:59.999Z').toISOString();
	let daySchedulePromise = await getDaySchedule();
	async function getDaySchedule() {
		const { data, error } = await supabase
			.from('events')
			.select('*')
			.gte('start_time', startOfDay)
			.lte('start_time', endOfDay);
		console.log(data);
		return data!;
	}
</script>

<div class="text-accent">{date}</div>
{#each await getDaySchedule() as event}
	<div class="mb-2">
		<Event
			title={event.title}
			startTime={event.start_time}
			endTime={event.end_time}
			venue={event.venue}
		/>
	</div>
{/each}

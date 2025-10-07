<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import DayList from '$lib/widgets/schedule/day-list.svelte';

	let { data } = $props();

	let value = today(getLocalTimeZone());
	const tomorrow = value.add({ days: 1 });

	const countEventPerDay = createQuery(() => ({
		queryKey: ['events'],
		queryFn: async () => supabase.rpc('events_by_date'),
	}));
</script>

{#if !countEventPerDay.isLoading}
	<Calendar
		type="single"
		bind:value
		class="rounded-md border shadow-sm "
		captionLayout="dropdown"
		countEventPerDay={countEventPerDay.data.data}
	/>
{/if}
<p>schedule page</p>

	<DayList />

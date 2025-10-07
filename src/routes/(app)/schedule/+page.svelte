<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import DayList from '$lib/widgets/schedule/day-list.svelte';
	import { LoaderCircle } from '@lucide/svelte';

	let currentDate = $state(today(getLocalTimeZone()));

	const countEventPerDay = createQuery(() => ({
		queryKey: ['events'],
		queryFn: async () => supabase.rpc('events_by_date'),
	}));
</script>

{#if countEventPerDay.isSuccess}
	<Calendar
		type="single"
		bind:value={currentDate}
		class="rounded-md border shadow-sm "
		captionLayout="dropdown"
		countEventPerDay={countEventPerDay.data.data}
	/>
{:else}
	<LoaderCircle class="m-auto size-20 animate-spin" />
{/if}

<DayList />

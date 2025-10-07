<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Event from '$lib/features/schedule/event/event.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { createQuery } from '@tanstack/svelte-query';
	let { date } = $props();
	const startOfDay = new Date(date + 'T00:00:00.000Z').toISOString();
	const endOfDay = new Date(date + 'T23:59:59.999Z').toISOString();
	const dayScheduleQuery = $derived(
		createQuery(() => ({
			queryKey: ['schedule', 'day', date],
			queryFn: async () =>
				await supabase
					.from('events')
					.select('*')
					.gte('start_time', startOfDay)
					.lte('start_time', endOfDay),
			staleTime: 60_000,
		})),
	);
</script>

<svelte:boundary>
	<div class="text-accent mb-2 text-lg font-semibold">{date}</div>
	{#if dayScheduleQuery.isSuccess}
		{#each dayScheduleQuery.data!.data ?? [] as event}
			<div class="mb-2">
				<Event
					title={event.title}
					startTime={event.start_time}
					endTime={event.end_time}
					venue={event.venue}
					type={'appointment'}
				/>
			</div>
		{/each}
	{/if}
	{#snippet pending()}
		<Skeleton class="h-20 w-full" />
	{/snippet}
</svelte:boundary>

<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Event from '$lib/features/schedule/event/event.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { createQuery } from '@tanstack/svelte-query';
	const weekMap = {
		0: 'Воскресенье',
		1: 'Понедельник',
		2: 'Вторник',
		3: 'Среда',
		4: 'Четверг',
		5: 'Пятница',
		6: 'Суббота',
	};
	const monthMap = {
		0: 'Январь',
		1: 'Февраль',
		2: 'Март',
		3: 'Апрель',
		4: 'Май',
		5: 'Июнь',
		6: 'Июль',
		7: 'Август',
		8: 'Сентябрь',
		9: 'Октябрь',
		10: 'Ноябрь',
		11: 'Декабрь',
	};
	let { date } = $props();
	const startOfDay = new Date(date + 'T00:00:00.000Z').toISOString();
	const endOfDay = new Date(date + 'T23:59:59.999Z').toISOString();
	const dayOfWeek = new Date(date + 'T23:59:59.999Z').getDay();
	const day = new Date(date + 'T23:59:59.999Z').getDate();
	const month = new Date(date + 'T23:59:59.999Z').getMonth();
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
	<div class="text-accent mb-2 text-lg font-semibold">
		{weekMap[dayOfWeek]}, {day}
		{monthMap[month]}
	</div>
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

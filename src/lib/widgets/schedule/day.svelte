<script lang="ts">
	import { Skeleton } from '$lib/components/ui/skeleton';
	import Event from '$lib/features/schedule/event/event.svelte';
	import { supabase } from '$lib/supabaseClient';
	import { capitalize } from '$lib/utils/capitalize';
	import { createQuery } from '@tanstack/svelte-query';
	import dayjs from 'dayjs';
	const weekMap: Record<number, string> = {
		0: 'Воскресенье',
		1: 'Понедельник',
		2: 'Вторник',
		3: 'Среда',
		4: 'Четверг',
		5: 'Пятница',
		6: 'Суббота',
	};
	const monthMap: Record<number, string> = {
		0: 'Января',
		1: 'Февраля',
		2: 'Марта',
		3: 'Апреля',
		4: 'Мая',
		5: 'Июня',
		6: 'Июля',
		7: 'Августв',
		8: 'Сентября',
		9: 'Октября',
		10: 'Ноября',
		11: 'Декабря',
	};
	let { date } = $props();

	let dateObj = $derived(dayjs(date));
	const startOfDay = $derived(dateObj.startOf('day'));
	const endOfDay = $derived(dateObj.endOf('day'));

	const dayScheduleQuery = createQuery(() => ({
		queryKey: ['schedule', 'day', date],
		queryFn: async () =>
			await supabase
				.from('events')
				.select('*')
				.gte('start_time', startOfDay)
				.lte('start_time', endOfDay),
		staleTime: 60_000,
	}));
</script>

{#if (dayScheduleQuery.data?.data ?? []).length > 0}
	<div class="text-accent mb-2 text-lg font-semibold">
		{capitalize(dateObj.format('dddd'))},
		{dateObj.format('D MMMM')}
	</div>
{/if}
{#each dayScheduleQuery.data?.data ?? [] as event}
	<div class="mb-2">
		<Event
			title={event.title}
			startTime={event.start_time}
			endTime={event.end_time}
			venue={event.venue}
			type="appointment"
		/>
	</div>
{/each}

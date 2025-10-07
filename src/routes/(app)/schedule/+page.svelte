<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import DayList from '$lib/widgets/schedule/day-list.svelte';
	import { LoaderCircle, Search } from '@lucide/svelte';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { Button } from '$lib/components/ui/button';

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
	<div
		class="bg-secondary flex h-15 w-full items-center justify-between gap-6 border-b border-[#212121]/20 p-2 px-4 text-sm font-medium"
	>
		<Skeleton class="my-2 h-full w-full" />
		<Skeleton class="my-2 h-full w-full" />
		<Skeleton class="my-2 h-full w-full" />
	</div>
{/if}
{#key currentDate}
	{#if currentDate}
		<DayList {currentDate} />
	{/if}
{/key}
<Button href="/search" class="bg-accent absolute right-4 bottom-24 rounded-2xl">
	<Search class="stroke-white" /> Поиск
</Button>

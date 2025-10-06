<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from '$lib/components/ui/calendar/index.js';
	import { createQuery } from '@tanstack/svelte-query';

	let value = today(getLocalTimeZone());
	const tomorrow = value.add({ days: 1 });

	const query = createQuery(() => ({
		queryKey: ['events'],
		queryFn: async () => supabase.from('events'),
	}));
	$inspect(query);
</script>

<Calendar
	type="single"
	maxValue={tomorrow}
	bind:value
	class="rounded-md border shadow-sm"
	captionLayout="dropdown"
/>

<p>schedule page</p>

<script lang="ts">
	import { Dot } from '@lucide/svelte';

	let { title, startTime, endTime, venue, type } = $props();

	const formatTime = (date: Date) => {
		return date.toLocaleTimeString('ru-RU', {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const timeRange = `${formatTime(new Date(startTime))} - ${formatTime(new Date(endTime))}`;

	const containerClasses =
		type === 'meeting'
			? 'bg-accent text-[#DEDEDE]'
			: 'bg-accent/15 text-[#212121] border-2 border-accent/30';

	const titleClasses = type !== 'appointment' ? 'text-accent' : '';

	const textClasses = type !== 'appointment' ? 'text-[#212121]' : '';
</script>

<div class="flex flex-col rounded-2xl p-4 transition-all duration-200 {containerClasses}">
	<div class="text-lg font-semibold {titleClasses}">
		{title}
	</div>

	<div class="flex items-center text-sm {textClasses}">
		<span class="text-lg font-medium">{timeRange}</span>
		<Dot class="h-8 w-8" />
		<span class="text-lg font-medium">{venue}</span>
	</div>
</div>

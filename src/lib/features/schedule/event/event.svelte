<script lang="ts">
	import { Dot, Minus } from '@lucide/svelte';
	import dayjs from 'dayjs';

	let { title, startTime, endTime, venue, type } = $props();

	const timeRange = `$ - $`;

	const containerClasses =
		type === 'global'
			? 'bg-accent/95 text-[#DEDEDE]'
			: 'bg-accent/15 text-[#212121] border-2 border-accent/30';

	const titleClasses = type === 'global' ? '' : 'text-accent';

	const textClasses = type === 'global' ? '' : 'text-[#212121]';
</script>

<div class="flex flex-col rounded-2xl p-4 transition-all duration-200 {containerClasses}">
	<div class="text-lg font-semibold {titleClasses}">
		{title}
	</div>

	<div class="flex items-center text-sm {textClasses}">
		<span class="text-lg font-medium">
			{dayjs(startTime).format('HH:MM')}
			-
			{dayjs(endTime).format('HH:MM')}
		</span>
		<Dot class="size-6" />
		<span class="max-w-1/2 overflow-clip text-base font-medium text-ellipsis whitespace-nowrap">
			{venue}
		</span>
	</div>
</div>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type Icon as IconType } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { slide } from 'svelte/transition';
	import { cn } from '$lib/utils';

	let { routeId, label, icon }: { routeId: string; label: string; icon?: typeof IconType } =
		$props();

	let active = $derived(page.route.id === routeId);

	const Icon = icon;
</script>

<Button class="flex-col h-18" variant="ghost" onclick={() => goto(routeId)}>
	<div
		class={cn(
			'transition-all flex place-items-center place-content-center rounded-xl h-2 py-3 px-4',
			active ? 'bg-blue-200' : ''
		)}
	>
		<Icon
			class={cn(
				'size-5 transition-all rounded-md',
				active ? 'stroke-blue-600 stroke-2.5' : 'stroke-slate-600 stroke-2'
			)}
		/>
	</div>
	<p class={cn('transition-all', active ? 'font-bold' : '')}>
		{label}
	</p>
</Button>

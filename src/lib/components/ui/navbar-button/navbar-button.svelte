<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type Icon as IconType } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	let { routeId, label, icon }: { routeId: string; label: string; icon?: typeof IconType } =
		$props();

	let active = $derived(page.route.id === routeId);

	const Icon = icon;
</script>

<Button class="h-18 flex-col" variant="ghost" onclick={() => goto(routeId)}>
	<div
		class={cn(
			'flex h-2 place-content-center place-items-center rounded-xl px-4 py-3 transition-all duration-50',
			active ? 'bg-blue-200' : '',
		)}
	>
		<Icon
			class={cn(
				'size-5 rounded-md transition-all duration-100',
				active ? 'stroke-2.5 stroke-blue-600' : 'stroke-slate-600 stroke-2',
			)}
		/>
	</div>
	<p class={cn('transition-all duration-100', active ? 'font-bold' : '')}>
		{label}
	</p>
</Button>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { type Icon as IconType } from '@lucide/svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { cn } from '$lib/utils';

	let { href, label, icon }: { href: string; label: string; icon?: typeof IconType } = $props();

	let active = $derived(page.route.id?.includes(href));
	const Icon = icon;
</script>

<Button
	class="hover:bg-primary h-18 flex-col font-normal"
	variant="ghost"
	onclick={() => goto(href)}
>
	<div
		class={cn(
			'flex h-2 place-content-center place-items-center rounded-xl px-4 py-3 transition-all duration-50',
		)}
	>
		<Icon
			class={cn(
				'size-5 rounded-md stroke-2 transition-all duration-100',
				active ? 'stroke-accent' : 'stroke-black',
			)}
		/>
	</div>
	<p class={cn('transition-all duration-100', active ? 'text-accent font-medium' : '')}>
		{label}
	</p>
</Button>

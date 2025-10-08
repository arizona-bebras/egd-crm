<script>
	import { ChevronRight, ChevronRightIcon, Search } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import { Button } from '$lib/components/ui/button/index.js';
	import Skeleton from '$lib/components/ui/skeleton/skeleton.svelte';
	import * as Item from '$lib/components/ui/item';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import ContactItem from '$lib/widgets/contact-list/contact-item.svelte';
	import { groupBy } from '$lib/utils/groupBy.js';

	let { data } = $props();
	const event = createQuery(() => ({
		queryKey: ['event', data.route],
		queryFn: () =>
			supabase
				.from('events')
				.select(
					`
					title,
					event_agendas(id, title),
					event_participants(
						visit,
						profiles(user_id, name, role_name, photo_path)
					)`,
				)
				.eq('id', data.route)
				.single(),
		select: (q) => q.data,
	}));
	const totalParticipated = $derived(event.data?.event_participants?.length ?? 0);
	const actuallyParticipated = $derived(
		event.data?.event_participants?.filter((x) => x.visit).length,
	);
	$inspect(totalParticipated, actuallyParticipated);
</script>

<header
	class="bg-primary border-border sticky top-0 box-content flex flex-row-reverse place-items-center border-b p-2.5 shadow-sm"
>
	<Button size="icon" href="/search" class="bg-accent/30!">
		<Search class="stroke-accent/80 size-6" />
	</Button>
	<p class="flex-1 text-center text-xl font-black">Заседание</p>
</header>
<div class="space-y-4 px-4 pt-8">
	{#if event.isSuccess}
		<p class="text-accent font-medium">
			{event.data.title}
		</p>
		<p class="text-accent font-medium">Вопросы заседания</p>
		<div class="border-border flex flex-col gap-y-2 rounded-2xl border bg-[#F6F6f6]/80 p-1">
			{#each event.data.event_agendas as eventAgenda}
				<Item.Root variant="outline" class="border-0! bg-[#F6F6f6]/80" size="sm">
					{#snippet child({ props })}
						<a href="" {...props}>
							<Item.Content>
								<Item.Title>{eventAgenda.title}</Item.Title>
								<Item.Description class="text-accent font-medium"
									>{eventAgenda.description}</Item.Description
								>
							</Item.Content>
							<Item.Actions>
								<Button size="icon">
									<ChevronRightIcon class="stroke-accent size-6" />
								</Button>
							</Item.Actions>
						</a>
					{/snippet}
				</Item.Root>
				<hr class="mx-8 last:hidden" />
			{/each}
		</div>
		<div class="flex w-full flex-col gap-y-1">
			<p class="text-accent font-medium">Статистика</p>
			<Progress class="my-2 h-4" value={(actuallyParticipated / totalParticipated) * 100} />
			<div class="flex w-full place-content-between">
				<div class="flex-col place-items-center">
					<p class="font-medium">Приглашено</p>
					<p class="text-accent font-bold">{totalParticipated}</p>
				</div>
				<div class="flex-col place-items-center">
					<p class="font-medium">Явились</p>
					<p class="text-accent font-bold">{actuallyParticipated}</p>
				</div>
				<div class="flex-col place-items-center">
					<p class="font-medium">Не явились</p>
					<p class="text-accent font-bold">{totalParticipated - actuallyParticipated}</p>
				</div>
			</div>
		</div>
		{#each Object.entries(groupBy(event.data.event_participants, (x) => x.visit)) as [k, participants]}
			<p class="text-accent font-bold">
				{#if !k || k === 'null'}
					Не явились
				{:else if k}
					Явились
				{/if}
			</p>
			{#each participants as participant}
				<ContactItem {...participant.profiles}></ContactItem>
			{/each}
		{/each}
	{:else}
		<Skeleton class="h-6 w-40" />
		{#each [1, 2, 3, 4]}
			<Skeleton class="h-12 w-[70%]" />
		{/each}
		<Skeleton class="mt-4 h-6 w-40" />
		<Skeleton class="h-6 w-full" />
		<div class="my-4 flex gap-x-8">
			<Skeleton class="h-6 w-full" />
			<Skeleton class="h-6 w-full" />
			<Skeleton class="h-6 w-full" />
		</div>
		{#each Array(8)}
			<Skeleton class="h-12 w-full" />
		{/each}
	{/if}
</div>

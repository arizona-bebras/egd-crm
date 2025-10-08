<script lang="ts">
	import { page } from '$app/state';
	import { createQuery } from '@tanstack/svelte-query';
	import { Button } from '$lib/components/ui/button';
	import { Search } from '@lucide/svelte';
	import { supabase } from '$lib/supabaseClient';

	let userId = page.params.id;

	const userQuery = createQuery(() => ({
		queryKey: ['profile'],
		queryFn: async () => await supabase.from('profiles').select().eq('user_id', userId),
	}));

	const userSubdivision = createQuery(() => ({
		queryKey: ['subdivision'],
		queryFn: async () =>
			await supabase.supabase.from('commissions_members').select(`
    commission(id, name),
  `),
	}));

	let userInfo = $state(null);
	$effect(() => {
		if (userQuery.isSuccess) {
			userInfo = userQuery.data.data[0];
		}
	});

	let subdivisions = ['Да', '123', '425'];
</script>

{#if userInfo != null}
	{console.log(userInfo)}
	{console.log(``)}
	<div>
		<header
			class="bg-primary border-border sticky top-0 z-10 box-content flex flex-row-reverse place-items-center border-b p-2.5 shadow-sm"
		>
			<Button size="icon" href="/search" class="bg-accent/30!">
				<Search class="stroke-accent/80 size-6" />
			</Button>
			<p class="flex-1 text-center text-xl font-bold">Профиль</p>
		</header>
	</div>
	<div class="mt-5 flex flex-col items-center justify-center border-b-2">
		<img
			src="https://media1.thrillophilia.com/filestore/n2ib9inwzcilxpg3aumbigvq4jus_IMG_World_Dubai_Fun_38a0986c1a.jpg?w=400&dpr=2"
			class="mb-2 size-30 rounded-full"
		/>
		<p class="font-medium">{userInfo.name}</p>
		<p class="text-accent mb-5 font-semibold">{userInfo.role}</p>
	</div>
	<div class="p-4">
		{#each subdivisions as subdivision (subdivision)}
			{#if subdivision == subdivisions[0]}
				<div class="rounded-t-[10px] border-x border-t p-3">
					<p class="text-accent text-[14px] font-medium">Подразделение</p>
					<p class="">{subdivision}</p>
				</div>
			{:else if subdivision == subdivisions[subdivisions.length - 1]}
				<p class="rounded-b-[10px] border-x border-b p-3">{subdivision}</p>
			{:else}
				<p class="border p-3">{subdivision}</p>
			{/if}
		{/each}
	</div>
{/if}

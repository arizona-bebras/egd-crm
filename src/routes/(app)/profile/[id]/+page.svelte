<script lang="ts">
	import { page } from '$app/state';
	import { createQuery } from '@tanstack/svelte-query';
	import { Button } from '$lib/components/ui/button';
	import { ChevronLeft, ChevronRightIcon, LoaderCircle, Search } from '@lucide/svelte';
	import { supabase } from '$lib/supabaseClient';
	import * as Avatar from '$lib/components/ui/avatar';
	import * as Item from '$lib/components/ui/item';

	let userId = page.params.id;

	const userQuery = createQuery(() => ({
		queryKey: ['profile'],
		queryFn: () =>
			supabase
				.from('profiles')
				.select(
					`
            *,
            commissions_members(
                commission(*)
            )
        `,
				)
				.eq('user_id', userId)
				.single(),
		select: (q) => q.data,
	}));

	let userInfo = $derived(userQuery.data);
	console.log(userInfo)
	const avatarQuery = createQuery(() => ({
		queryKey: ['avatar', userId, userInfo?.photo_path, 'full'],
		enabled: () => !!userInfo?.photo_path,
		queryFn: () => {
			if (userInfo?.photo_path) {
				return supabase.storage.from('photos').getPublicUrl(userInfo?.photo_path, {
					transform: {
						quality: 80,
						resize: 'cover',
						width: 128,
						height: 128,
					},
				});
			} else return null;
		},
		select: (q) => q?.data.publicUrl,
	}));

	let subdivisions = ['Да', '123', '425'];
</script>

{#if userInfo && !userQuery.isFetching}
	{console.log(userInfo)}
	<header
		class="bg-primary border-border sticky top-0 z-10 box-content flex flex-row-reverse place-items-center border-b p-2.5 shadow-sm"
	>
		<Button size="icon" href="/search" class="bg-accent/30!">
			<Search class="stroke-accent/80 size-6" />
		</Button>
		<p class="flex-1 text-center text-xl font-bold">Профиль</p>
		<Button
			onclick={() => {
				history.back();
			}}
			class="bg-accent/70!"
		>
			<ChevronLeft class="size-6" />
		</Button>
	</header>
	<div class="mt-5 flex flex-col items-center justify-center border-b-2">
		<Avatar.Root class="border-border m-2 size-32 rounded-full border shadow-md">
			{#if avatarQuery.isSuccess && avatarQuery.data}
				<Avatar.Image
					class="rounded-md"
					loading="lazy"
					src={avatarQuery.data}
					alt={userInfo.name}
				/>
			{/if}
			<Avatar.Fallback class="rounded-md">
				{userInfo.name.split(' ')[0]?.at(0)}
				{userInfo.name.split(' ')[1]?.at(0)}
			</Avatar.Fallback>
		</Avatar.Root>
		<p class="font-medium">{userInfo.name}</p>
		<p class="text-accent mb-5 font-semibold">{userInfo.role_name ?? 'Депутат'}, {userInfo.fraction_short_name}</p>
	</div>
	<div class="space-y-4 p-4">
		<div class="border-border flex flex-col gap-y-2 rounded-2xl border bg-[#F6F6f6]/80 p-1">
			<p class="text-accent pt-2 pl-2 font-bold">Подразделение</p>
			{#each userInfo.commissions_members as { commission }}
				<Item.Root variant="outline" class="border-0! bg-[#F6F6f6]/80" size="sm">
					{#snippet child({ props })}
						<div {...props}>
							<Item.Content>
								<Item.Title>{commission.name}</Item.Title>
							</Item.Content>
						</div>
					{/snippet}
				</Item.Root>
				<hr class="mx-8 last:hidden" />
			{/each}
		</div>
		{#if [userInfo.role_name, userInfo.user_email, userInfo.user_phone].some((x) => !!x)}
			<div class="border-border flex flex-col gap-y-2 rounded-2xl border bg-[#F6F6f6]/80 p-1">
				{#if userInfo.role_name}
					<div class="">
						<p class="text-accent pt-2 pl-2 text-sm font-bold">Должность</p>
						<Item.Root variant="outline" class="border-0! bg-[#F6F6f6]/80" size="sm">
							{#snippet child({ props })}
								<div {...props}>
									<Item.Content>
										<Item.Title>{userInfo.role_name}</Item.Title>
									</Item.Content>
								</div>
							{/snippet}
						</Item.Root>
					</div>
					<hr class="mx-8 last:hidden" />
				{/if}
				{#if userInfo.user_email}
					<div class="">
						<p class="text-accent pt-2 pl-2 text-sm font-bold">Почта</p>
						<Item.Root variant="outline" class="border-0! bg-[#F6F6f6]/80" size="sm">
							{#snippet child({ props })}
								<a href="mailto:{userInfo.user_email}" {...props}>
									<Item.Content>
										<Item.Title class="text-blue-500 underline">{userInfo.user_email}</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
					</div>
					<hr class="mx-8 last:hidden" />
				{/if}
				{#if userInfo.user_phone}
					<div class="">
						<p class="text-accent pt-2 pl-2 text-sm font-bold">Телефон</p>
						<Item.Root variant="outline" class="border-0! bg-[#F6F6f6]/80" size="sm">
							{#snippet child({ props })}
								<a href="tel:{userInfo.user_phone}" {...props}>
									<Item.Content>
										<Item.Title class="text-blue-500 underline">{userInfo.user_phone}</Item.Title>
									</Item.Content>
								</a>
							{/snippet}
						</Item.Root>
					</div>
					<hr class="mx-8 last:hidden" />
				{/if}
			</div>
		{/if}
	</div>
{:else}
	<LoaderCircle class="m-auto h-[calc(100%-5rem)] w-40 animate-spin" />
{/if}

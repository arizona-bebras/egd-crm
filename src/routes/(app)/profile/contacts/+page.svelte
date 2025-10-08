<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { supabase } from '$lib/supabaseClient';
	import ContactItem from '$lib/widgets/contact-list/contact-item.svelte';
	import DocumentCatalogCard from '$lib/widgets/documents/document-catalog-card.svelte';
	import { ChevronLeft, LogOut, Search } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { Debounced } from 'runed';

	let searchInput = $state('');
	let searchQuery = new Debounced(() => searchInput, 500);
	const allProfiles = createQuery(() => ({
		queryKey: ['profiles', 'all'],
		queryFn: () => supabase.from('profiles').select(),
	}));
	const profilesSearch = createQuery(() => ({
		queryKey: ['profiles', searchQuery.current],
		enabled: () => searchQuery.current.length > 3,
		queryFn: () => supabase.rpc('search_profiles', { prefix: searchQuery.current }),
	}));
</script>

<section class="min-h-[calc(100vh-9rem)] pb-18">
	<header
		class="bg-primary border-border relative box-content flex place-items-center border-b p-2.5 shadow-sm"
	>
		<Button size="icon" href="/search" class="bg-accent/30!">
			<Search class="stroke-accent/80 size-6" />
		</Button>
		<p class="w-full flex-1 text-center text-xl font-bold">Контакты</p>
		<Button
			onclick={async () => {
				await supabase.auth.signOut();
			}}
			size="icon"
			class="bg-accent/40!"
		>
			<LogOut class="stroke-accent/80 size-6" />
		</Button>
	</header>

	<div class="px-6 py-8">
		<div
			class="ring-ring bg-primary mb-6 flex place-items-center gap-x-1 rounded-2xl border border-black/25 transition focus-within:ring-2"
		>
			<Search class="stroke-accent/75 my-auto ml-2" />
			<Input
				placeholder="Введите запрос"
				class="bg-primary rounded-2xl border-0! shadow-none ring-0! outline-0!"
				bind:value={searchInput}
			/>
		</div>

		{#if searchQuery.current.length > 3}
			<div class="mt-4">
				<span class="text-accent font-bold">Результаты поиска</span>
				<div class="flex flex-col gap-y-1">
					<svelte:boundary>
						{#each (await profilesSearch.promise).data ?? [] as profile (profile.user_id)}
							<ContactItem {...profile} />
						{:else}
							<span class="text-accent">Ничего не найдено</span>
						{/each}
						{#snippet pending()}
							{#each Array(8)}
								<Skeleton class="mb-2 h-10 w-full" />
							{/each}
						{/snippet}
					</svelte:boundary>
				</div>
			</div>
		{:else}
			<div class="mt-4">
				<span class="text-accent font-bold">Законодательное собрание Екатеринбурга</span>
				<div class="mt-4 flex flex-col gap-y-1">
					<svelte:boundary>
						{#each (await allProfiles.promise).data ?? [] as profile (profile.user_id)}
							<ContactItem {...profile} />
						{/each}
						{#snippet pending()}
							{#each Array(8)}
								<Skeleton class="mb-2 h-10 w-full" />
							{/each}
						{/snippet}
					</svelte:boundary>
				</div>
			</div>
		{/if}
	</div>
</section>

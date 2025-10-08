<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Skeleton } from '$lib/components/ui/skeleton';
	import { supabase } from '$lib/supabaseClient';
	import ContactItem from '$lib/widgets/contact-list/contact-item.svelte';
	import DocumentCatalogCard from '$lib/widgets/documents/document-catalog-card.svelte';
	import CategoryItem from '$lib/features/documents/category-item.svelte';
	import { ChevronLeft, Search } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { Debounced } from 'runed';

	let searchInput = $state('');
	let searchQuery = new Debounced(() => searchInput, 500);

	const catalogsSearch = createQuery(() => ({
		queryKey: ['catalogs', searchQuery.current],
		enabled: () => searchQuery.current.length > 3,
		queryFn: () => supabase.rpc('search_catalogs', { prefix: searchQuery.current }),
	}));
	const catalogItemsSearch = createQuery(() => ({
		queryKey: ['profiles', searchQuery.current],
		enabled: () => searchQuery.current.length > 3,
		queryFn: () => supabase.rpc('search_catalog_items_by_title', { prefix: searchQuery.current }),
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
		<Button
			onclick={() => {
				history.back();
			}}
			class="bg-accent/70!"
		>
			<ChevronLeft class="size-6" />
		</Button>
		<p class="flex-1 text-center text-xl font-bold">Поиск</p>
	</header>

	<div class="px-6 py-8">
		<div
			class="ring-ring bg-primary flex place-items-center gap-x-1 rounded-2xl border border-black/25 transition focus-within:ring-2"
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
				<span class="text-accent font-bold mt-3">Контакты</span>
				<div class="flex flex-col gap-y-1">
					<svelte:boundary>
						{#each (await profilesSearch.promise).data ?? [] as profile (profile.user_id)}
							<ContactItem {...profile} />
						{:else}
							<span class="text-accent">Ничего не найдено</span>
						{/each}
						{#snippet pending()}
							<Skeleton class="h-10 w-full" />
							<Skeleton class="h-10 w-full" />
						{/snippet}
					</svelte:boundary>
				</div>
			</div>
			<div class="mt-4">
				<span class="text-accent font-bold">Каталоги</span>
				<div class="flex flex-1 flex-wrap">
					<svelte:boundary>
						<div class="mb-4 grid grid-cols-2 gap-2.5 mt-3">
							{#each (await catalogsSearch.promise).data ?? [] as catalog (catalog.id)}
								<DocumentCatalogCard title={catalog.title} />
							{:else}
								<span class="text-accent">Ничего не найдено</span>
							{/each}
						</div>
						{#snippet pending()}
							<Skeleton class="m-2 aspect-square w-[calc(50%-2rem)]" />
							<Skeleton class="m-2 aspect-square w-[calc(50%-2rem)]" />
						{/snippet}
					</svelte:boundary>
				</div>
			</div>
			<div class="mt-4">
				<span class="text-accent font-bold">Разделы каталога</span>
				<div class="flex flex-1 flex-wrap">
					<svelte:boundary>
						<div class="mb-4 grid grid-cols-1 gap-2.5 mt-3">
							{#each (await catalogItemsSearch.promise).data ?? [] as catalog}
								<CategoryItem title={catalog.title} redirect_link={catalog.redirect_link} document_link={catalog.document_link}/>
							{:else}
								<span class="text-accent">Ничего не найдено</span>
							{/each}
						</div>
						{#snippet pending()}
							<Skeleton class="m-2 aspect-square w-[calc(50%-2rem)]" />
							<Skeleton class="m-2 aspect-square w-[calc(50%-2rem)]" />
						{/snippet}
					</svelte:boundary>
				</div>
			</div>
		{/if}
	</div>
</section>

<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import LogoutForm from '$lib/features/logout-form/logout-form.svelte';
	import { supabase } from '$lib/supabaseClient';
	import ContactItem from '$lib/widgets/contact-list/contact-item.svelte';
	import { LoaderCircle, Search } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';

	const profilesQuery = createQuery(() => ({
		queryKey: ['profiles'],
		queryFn: () => supabase.from('profiles').select('*'),
	}));
</script>

<section class="min-h-[calc(100vh-9rem)] pb-18">
	<header
		class="bg-primary border-border sticky top-0 z-10 box-content flex flex-row-reverse place-items-center border-b p-2.5 shadow-sm"
	>
		<Button size="icon" href="/search" class="bg-accent/30! absolute">
			<Search class="stroke-accent/80 size-6" />
		</Button>
		<p class="flex-1 text-center text-xl font-bold">Профиль</p>
	</header>

	<svelte:boundary>
		{#each (await profilesQuery.promise).data ?? [] as profile}
			<ContactItem {...profile}></ContactItem>
		{/each}
		{#snippet pending()}
			<LoaderCircle class="m-auto size-20 animate-spin" />
		{/snippet}
	</svelte:boundary>
</section>

<LogoutForm />

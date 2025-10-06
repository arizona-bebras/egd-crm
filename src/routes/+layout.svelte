<script lang="ts">
	import { UserState, userStateCtx } from '$lib/state/userState.svelte';
	import '../app.css';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	const queryClient = new QueryClient();

    userStateCtx.set(new UserState());

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	<main class="sm:bg-slate-100/70">
		<div
			class="flex h-screen max-w-full flex-col border-slate-300 bg-white shadow-xs sm:mx-auto sm:max-w-xl sm:border"
		>
			{@render children?.()}
		</div>
	</main>
</QueryClientProvider>

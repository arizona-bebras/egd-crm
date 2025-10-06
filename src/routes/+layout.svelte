<script lang="ts">
	import '../app.css';
	import { ClipboardClock, FileText, ShieldCheck, User } from '@lucide/svelte';
	import NavbarButton from '$lib/components/ui/navbar-button/navbar-button.svelte';
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';

	const queryClient = new QueryClient();

	let { children } = $props();
</script>

<QueryClientProvider client={queryClient}>
	<main class="sm:bg-slate-100/70">
		<div
			class="flex h-screen max-w-full flex-col border border-slate-300 bg-white shadow-xs sm:mx-auto sm:max-w-xl"
		>
			<div class="overflow-y-scroll">
				{@render children()}
			</div>
			<div class="relative flex w-full flex-col">
				<div
					class="fixed bottom-0 grid h-fit w-full max-w-[40rem] grid-cols-3 items-center justify-center gap-5 bg-blue-100 sm:max-w-xl"
				>
					<NavbarButton routeId="/schedule" icon={ClipboardClock} label="Расписание" />
					<NavbarButton routeId="/documents" icon={FileText} label="Документы" />
					<NavbarButton routeId="/profile" icon={User} label="Профиль" />
				</div>
			</div>
		</div>
	</main>
</QueryClientProvider>

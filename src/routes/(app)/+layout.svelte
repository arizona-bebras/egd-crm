<script lang="ts">
	import { ClipboardClock, FileText, ShieldCheck, User } from '@lucide/svelte';
	import NavbarButton from '$lib/components/ui/navbar-button/navbar-button.svelte';

	let { children } = $props();
</script>

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

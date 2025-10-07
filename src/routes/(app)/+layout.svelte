<script lang="ts">
	import { ClipboardClock, FileText, ShieldCheck, User } from '@lucide/svelte';
	import NavbarButton from '$lib/components/ui/navbar-button/navbar-button.svelte';

	let { children } = $props();
</script>

<div class="overflow-y-scroll bg-background pb-18">
	{@render children()}
	<div class="h-[72px] w-full"></div>
</div>
<div class="relative flex w-full flex-col">
	<div
		class="bg-primary fixed bottom-0 grid h-fit w-full max-w-[32rem] grid-cols-3 items-center justify-center gap-5 sm:max-w-lg"
	>
		<NavbarButton href="/documents" icon={FileText} label="Документы" />
		<NavbarButton href="/schedule" icon={ClipboardClock} label="Расписание" />
		<NavbarButton href="/profile" icon={User} label="Профиль" />
	</div>
</div>

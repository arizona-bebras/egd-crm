<script lang="ts">
	import { ClipboardClock, FileText, ShieldCheck, User } from '@lucide/svelte';
	import NavbarButton from '$lib/components/ui/navbar-button/navbar-button.svelte';
	import '@saurl/tauri-plugin-safe-area-insets-css-api';

	let { children } = $props();
</script>

<div
	class="bg-background h-screen pt-[var(--safe-area-inset-top)] pb-[var(--safe-area-inset-bottom)]"
>
	<div class="relative h-full">
		<div class="bg-background h-full overflow-y-scroll pb-18">
			{@render children()}
			<div class="h-[72px] w-full"></div>
		</div>
		<div class="relative flex w-full flex-col">
			<div
				class="bg-primary border-border absolute bottom-0 grid h-fit w-full max-w-[32rem] grid-cols-3 items-center justify-center gap-5 border-t sm:max-w-lg"
			>
				<NavbarButton href="/documents" icon={FileText} label="Документы" />
				<NavbarButton href="/schedule" icon={ClipboardClock} label="Расписание" />
				<NavbarButton href="/profile/contacts" icon={User} label="Контакты" />
			</div>
		</div>
	</div>
</div>

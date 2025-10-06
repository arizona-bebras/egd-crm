<script lang="ts">
	import '../app.css';
	import { Button } from '$lib/components/ui/button';
	import { ClipboardClock, FileText, ShieldCheck } from '@lucide/svelte';
	import { goto } from '$app/navigation';

	let { children } = $props();
</script>

<div class="w-screen max-w-full h-screen flex flex-col">
	{@render children()}
	<div
		class="w-full h-25 bg-gray-400 grid grid-cols-3 gap-5 items-center justify-center fixed bottom-0"
	>
		<Button class="flex flex-col py-10" onclick={() => goto('schedule')}>
			<ClipboardClock />
			Расписание
		</Button>
		<Button class="flex flex-col py-10" onclick={() => goto('documents')}>
			<FileText />
			Документы
		</Button>
		<Button class="flex flex-col py-10" onclick={() => goto('ksiva')}>
			<ShieldCheck />
			Ксива
		</Button>
	</div>
</div>

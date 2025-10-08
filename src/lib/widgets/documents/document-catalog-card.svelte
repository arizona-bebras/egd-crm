<script lang="ts">
	import { Computer, FileText } from '@lucide/svelte';

	let { title, route } = $props();
</script>

<a href={route}>
	<div
		class="bg-primary flex h-30 flex-col items-center justify-center rounded-[12px] border-2 border-[#000000]/20 p-2"
	>
		<FileText class="size-15" />
		<div class="flex h-9.75 items-center justify-center">
			<p class="text-center text-[13px] font-medium">{title}</p>
		</div>
	</div>
</a>

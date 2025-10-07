<script lang="ts">
	import { Computer } from '@lucide/svelte';

	let { title } = $props();
</script>

<a href="#/">
	<div
		class="bg-primary flex flex-col items-center justify-center rounded-[12px] border-2 border-[#000000]/20"
	>
		<Computer class="mt-3 mb-2 size-15" />
		<p class="mb-3 text-center font-medium">{title}</p>
	</div>
</a>

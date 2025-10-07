<script lang="ts">
	import type { Snippet } from 'svelte';
	let { category, children }: { category: string; children?: Snippet<[]> } = $props();
</script>

<div>
	<p class="text-accent mb-[12px] text-[16px] font-semibold">{category}</p>
	<div class="mb-4 grid grid-cols-2 gap-2.5">
		{@render children?.()}
	</div>
</div>

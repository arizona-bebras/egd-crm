<script lang="ts">
	import { Download } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import Button from '../button/button.svelte';
	import { Skeleton } from '../skeleton';
	let { link } = $props();
	const file = createQuery(() => ({
		queryKey: ['file', link],
		queryFn: () => supabase.storage.from('photos').getPublicUrl(link),
		select: (q) => q.data,
	}));
	let filename = $derived(file.data?.publicUrl?.split('/')?.at(-1) ?? 'file');

	function downloadFile(fileUrl: string, fileName: string) {
		const link = document.createElement('a');

		link.href = fileUrl;

		link.download = fileName;

		document.body.appendChild(link);

		link.click();
		document.body.removeChild(link);
	}
</script>

{#if file.isSuccess}
	<Button size="icon" onclick={() => downloadFile(file.data.publicUrl, filename)}>
		<Download class="stroke-accent size-6" />
	</Button>
{:else}
	<Skeleton class="size-9" />
{/if}

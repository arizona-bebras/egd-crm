<script>
	import { Download } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
	import Button from '../button/button.svelte';
	import { Skeleton } from '../skeleton';
	let { link } = $props();
	const file = createQuery(() => ({
		queryKey: ['file', link],
		queryFn: () => supabase.storage.from('photos').getPublicUrl(link),
	}));
</script>

{#if file.isSuccess}
	<Button size="icon" href={file.data.data.publicUrl}>
		<Download />
	</Button>
{:else}
	<Skeleton class="size-9" />
{/if}

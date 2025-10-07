<script>
    import { Download } from "@lucide/svelte";
    import { createQuery } from "@tanstack/svelte-query";
    import { supabase } from "$lib/supabaseClient";
    let { link } = $props();
    const file = createQuery(() => ({
		queryKey: ['file', link ],
		queryFn: async () => await supabase.storage
            .from('photos')
            .getPublicUrl(link),
	}));
</script>
{#if file.isSuccess}
    <a href="{file.data.data.publicUrl}">
        <Download />
    </a>
{/if}
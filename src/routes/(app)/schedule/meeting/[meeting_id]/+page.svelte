<script>
	import { ChevronRight } from '@lucide/svelte';
	import { createQuery } from '@tanstack/svelte-query';
	import { supabase } from '$lib/supabaseClient';
    let { data } = $props();
    const event = createQuery(() => ({
		queryKey: ['catalog', data.route],
		queryFn: () => supabase.from('events').select('').eq('id', data.route),
	}));
</script>
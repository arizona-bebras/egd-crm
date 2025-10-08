<script lang="ts">
	import { page } from "$app/state";
	import { createQuery } from "@tanstack/svelte-query";

    let userId = page.params.id;

    const userQuery = createQuery(() => ({ 
        queryKey: ['profile']
     }))
</script>
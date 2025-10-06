<script>
	import { Button } from '$lib/components/ui/button';
	import { supabase } from '$lib/supabaseClient';
</script>

<Button
	onclick={() => {
		supabase.auth.signOut();
	}}
>
	Выйти
</Button>

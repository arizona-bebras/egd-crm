<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabaseClient';

	async function signin() {
		await supabase.auth.signInWithPassword({ email: 'user@egd.ru', password: '123' });
        goto('/')
	}
</script>

<button onclick={signin}>Login</button>

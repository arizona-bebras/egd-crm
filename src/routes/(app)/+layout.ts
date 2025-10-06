import { redirect } from '@sveltejs/kit';
import { supabase } from '$lib/supabaseClient';
import type { LayoutLoad } from './$types';

// Tauri doesn't have a Node.js server to do proper SSR
// so we use adapter-static with a fallback to index.html to put the site in SPA mode
// See: https://svelte.dev/docs/kit/single-page-apps
// See: https://v2.tauri.app/start/frontend/sveltekit/ for more info
export const ssr = false;
export const prerender = true;

export const load: LayoutLoad = async ({ depends }) => {
	depends('auth:session');
	const { data } = await supabase.auth.getUser();
	if (!data.user) {
		return redirect(303, '/auth/login');
	}
};

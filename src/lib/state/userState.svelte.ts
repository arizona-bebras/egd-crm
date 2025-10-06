import { invalidate } from '$app/navigation';
import { supabase } from '$lib/supabaseClient';
import type { User } from '@supabase/supabase-js';
import { Context } from 'runed';

export class UserState {
	user: User | null = $state(null);

	constructor() {
		$inspect(this.user);
		supabase.auth.onAuthStateChange((event, sess) => {
			console.log(event);
			if ((event === 'SIGNED_IN' || event === 'USER_UPDATED') && sess) {
				this.user = sess!.user;
                invalidate('auth:session');
			} else if (event === 'SIGNED_OUT') {
                this.user = null;
                invalidate('auth:session');
			}
		});
	}
}

export const userStateCtx = new Context<UserState>('userState');

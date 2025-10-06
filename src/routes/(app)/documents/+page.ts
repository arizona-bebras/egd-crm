import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const { data, error } = await supabase
		.from('catalogs')
		.select()
		.eq('catalog-id', '32bb799d-b006-470a-b82f-a9731a9f15a9');
	return {
		documents: data ?? [],
	};
};

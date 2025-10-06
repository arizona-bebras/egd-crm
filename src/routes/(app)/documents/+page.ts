import { supabase } from "$lib/supabaseClient";
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const { data, error } = await supabase
        .from('catalog-items')
        .select()
        .eq('catalog-id', '');
    return {
        documents: data ?? []
    };
};
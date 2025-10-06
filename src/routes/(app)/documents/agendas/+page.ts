import { supabase } from '$lib/supabaseClient';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
    const { data, error } = await supabase
        .from('catalog_items')
        .select()
        .eq('catalog_id', '32bb799d-b006-470a-b82f-a9731a9f15a9');
    console.log( { data: data })
    for (const item of data) {
        const { data: files, error } = await supabase
            .from('documents')
            .select()
            .eq('catalog_item_id', item.id);
        console.log({ files: files });
        item.filePath = files[0].file_path
}
    return {
        catalogItems: data ?? [],
    };
};
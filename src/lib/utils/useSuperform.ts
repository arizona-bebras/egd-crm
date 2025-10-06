import { get } from 'svelte/store';
import { zod, type Infer } from 'sveltekit-superforms/adapters';
import { defaults, superForm, type FormOptions } from 'sveltekit-superforms/client';
import z from 'zod';

export function useSuperForm<T extends z.ZodObject>(
	schema: T,
	options?: FormOptions<Infer<T, 'zod'>, unknown, Record<string, unknown>> & {
		defaults?: Infer<T, 'zod'>;
		afterSubmit?: (data: z.infer<T>) => void | Promise<void>;
	},
) {
	const form = superForm(defaults(zod(schema), { defaults: options?.defaults }), {
		SPA: true,
		validators: zod(schema),
		clearOnSubmit: 'none',
		dataType: 'json',
		async onSubmit(input) {
			const { data, success, error } = schema.safeParse(get(form.form));
			if (!success) {
				logger.debug('form errors:', error);
				return;
			}
			await options?.afterSubmit?.(data);
		},
		...options,
	});

	return {
		...form,
		form: form,
		formData: form.form,
	};
}

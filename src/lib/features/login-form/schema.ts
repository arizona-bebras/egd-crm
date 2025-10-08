import { z } from 'zod';

export const loginSchema = z.object({
	email: z.string().email({ message: 'Неверный формат email' }),
	password: z
		.string()
		.min(2, { message: 'Длина пароля должна быть более 1 символа' })
		.max(50, { message: 'Длина пароля должна быть не более 50 символов' }),
});

export type LoginSchema = typeof loginSchema;

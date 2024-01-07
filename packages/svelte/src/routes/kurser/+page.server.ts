import { error } from '@sveltejs/kit';
import { z } from 'zod';

const _ErrorSchema = z.object({
	status: z.literal('error'),
	message: z.string()
});

const _SuccessSchema = z.object({
	status: z.literal('success'),
	courses: z.array(
		z.object({
			title: z.string(),
			description: z.string({
				description: 'HTML'
			}),
			url: z.string().url(),
			past: z.boolean()
		})
	)
});

const _ResponseSchema = z.discriminatedUnion('status', [_ErrorSchema, _SuccessSchema]);

export async function load(event) {
	const response = await event.fetch('/api/events?include_past=true');
	const json = await response.json();

	const result = _ResponseSchema.safeParse(json);

	if (!result.success) {
		return error(500, result.error.message);
	}

	return result.data;
}

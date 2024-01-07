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
			description: z.string(),
			url: z.string().url(),
			past: z.boolean()
		})
	)
});

const _ResponseSchema = z.discriminatedUnion('status', [_ErrorSchema, _SuccessSchema]);

export async function load(event) {
	const response = await event.fetch('/api/events?include_past=true');
	const json = await response.json();
	const result = _ResponseSchema.parse(json);

	console.log(result);

	return result;
}

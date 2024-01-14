import { CoursesSchema } from '$lib/schemas/CoursesSchema.js';
import { error } from '@sveltejs/kit';

export async function load(event) {
	const response = await event.fetch('/api/events');
	const json = await response.json();
	const result = CoursesSchema.safeParse(json);

	if (!result.success) {
		return error(500, result.error.message);
	}

	return result.data;
}

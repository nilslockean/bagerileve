import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import { Scope, fetchCourses } from '$lib/fienta.js';

const _UrlSearchParamsSchema = z.object({
	scope: z.nativeEnum(Scope).catch(Scope.Upcoming)
});

export async function GET(req) {
	const searchParams = _UrlSearchParamsSchema.safeParse({
		scope: req.url.searchParams.get('scope')
	});

	if (searchParams.success === false) {
		error(400, searchParams.error.message);
	}

	return json(await fetchCourses(searchParams.data.scope));
}

import { type Courses } from '$lib/schemas/CoursesSchema.js';
import { error, json } from '@sveltejs/kit';
import { z } from 'zod';
import { env } from '$env/dynamic/private';

const _UrlSearchParamsSchema = z.object({
	scope: z.enum(['future', 'past', 'all']).catch('future')
});

const _FientaSuccessResponseSchema = z.object({
	success: z.object({
		code: z.number()
		// user_message: z.string(),
		// internal_message: z.string()
	}),
	time: z.object({
		timestamp: z.number(),
		// date: z.string(),
		// time: z.string(),
		full_datetime: z.string()
		// timezone: z.string(),
		// timezone_short: z.string(),
		// gmt: z.string()
	}),
	data: z.array(
		z.object({
			// id: z.number(),
			// organizer_id: z.number(),
			starts_at: z.string(),
			ends_at: z.string(),
			sale_status: z.enum(['onSale', 'salesEnded', 'salesNotStarted', 'soldOut']),
			is_published: z.boolean(),
			is_public: z.boolean(),
			// image_url: z.string().url(),
			// accent_color: z.string(),
			url: z.string().url(),
			buy_tickets_url: z.string().url(),
			translations: z.object({
				sv: z.object({
					title: z.string(),
					description: z.string({
						description: 'HTML'
					}),
					duration_string: z.string(),
					notes_about_time: z.string().nullable()
					// venue: z.string(),
					// online_location: z.string().nullable(),
					// address: z.object({
					// 	street: z.string(),
					// 	city: z.string(),
					// 	county: z.string(),
					// 	postal_code: z.string(),
					// 	country_code: z.string()
					// }),
					// organizer: z.object({
					// 	name: z.string(),
					// 	phone: z.string(),
					// 	email: z.string().email()
					// })
				})
			})
		})
	)
});

const _FientaErrorResponseSchema = z.object({
	errors: z.array(
		z.object({
			code: z.string(),
			user_message: z.string(),
			internal_message: z.string()
		})
	)
});

const _FientaResponseSchema = z.union([_FientaSuccessResponseSchema, _FientaErrorResponseSchema]);

export async function GET(req) {
	const searchParams = _UrlSearchParamsSchema.safeParse({
		scope: req.url.searchParams.get('scope')
	});

	if (searchParams.success === false) {
		error(400, searchParams.error.message);
	}

	const fienta = new URL('https://fienta.com/api/v1/events');
	fienta.searchParams.set('organizer', '11554');

	const { scope } = searchParams.data;
	if (scope === 'all' || scope === 'past') {
		fienta.searchParams.set('starts_from', '1970-01-01 01:00:00');
	}

	const headers = new Headers();
	headers.append('Authorization', `Bearer ${env.FIENTA_API_KEY}`);

	const response = await fetch(fienta, {
		method: 'GET',
		headers
	});

	const data = await response.json();
	const result = _FientaResponseSchema.parse(data);

	if ('errors' in result) {
		return json({
			status: 'error',
			message: result.errors[0].user_message
		} satisfies Courses);
	}

	const now = new Date(result.time.full_datetime).getTime();

	const courses = result.data
		.filter((course) => {
			if (!course.is_published && env.NODE_ENV === 'production') {
				return false;
			}

			if (scope !== 'past') {
				return true;
			}

			const starts = new Date(course.starts_at).getTime();
			return starts < now;
		})
		.map((course) => {
			const { title, description } = course.translations.sv;

			return {
				title: course.is_published ? title : `Utkast: ${title}`,
				description,
				starts_at: course.starts_at,
				url: course.url
			};
		});

	return json({
		status: 'success',
		courses
	} satisfies Courses);
}

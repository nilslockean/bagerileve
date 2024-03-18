import { env } from '$env/dynamic/private';
import { FientaResponseSchema } from './schemas/FientaResponseSchema';
import { type Courses } from '$lib/schemas/CoursesSchema.js';
import { prettyCourseDates } from './stringUtils';

export enum Scope {
	Upcoming = 'upcoming',
	Past = 'past',
	All = 'all'
}

export async function fetchCourses(scope = Scope.Upcoming): Promise<Courses> {
	const fienta = new URL('https://fienta.com/api/v1/events');
	fienta.searchParams.set('organizer', '11554');

	if (scope === Scope.All || scope === Scope.Past) {
		fienta.searchParams.set('starts_from', '1970-01-01 01:00:00');
	}

	const headers = new Headers();
	headers.append('Authorization', `Bearer ${env.FIENTA_API_KEY}`);

	const response = await fetch(fienta, {
		method: 'GET',
		headers
	});

	const data = await response.json();
	const result = FientaResponseSchema.parse(data);

	if ('errors' in result) {
		return {
			status: 'error',
			message: result.errors[0].user_message
		};
	}

	const now = new Date(result.time.full_datetime).getTime();

	const courses = result.data
		.filter((course) => {
			// Display previews in development and staging
			if (!course.is_published && env.NODE_ENV === 'production') {
				return false;
			}

			// Never display private courses
			if (!course.is_public) {
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
			const dates = prettyCourseDates(new Date(course.starts_at), new Date(course.ends_at));

			return {
				url: course.url,
				draft: !course.is_published,
				title,
				description,
				// starts_at: course.starts_at,
				// ends_at: course.ends_at,
				dates
			};
		});

	return {
		status: 'success',
		courses
	};
}

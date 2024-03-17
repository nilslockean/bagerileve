import { fetchCourses } from '$lib/fienta';

export async function load() {
	const courses = await fetchCourses();

	return {
		courses
	};
}

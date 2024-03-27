import { fetchFaq } from '$lib/sanity';

export async function load() {
	const faq = await fetchFaq();

	return { faq };
}

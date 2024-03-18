import { FaqSchema } from '$lib/schemas/FAQSchema';
import { sanityClient } from '../../config';

export async function load() {
	const groqJson = await sanityClient.fetch(`*[_type == "faq"]{question, answer}`);
	const faq = FaqSchema.parse(groqJson);

	return { faq };
}

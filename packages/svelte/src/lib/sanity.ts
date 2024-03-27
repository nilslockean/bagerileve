import { sanityClient } from '../config';
import { FaqSchema, type Faq } from './schemas/FAQSchema';
import { OpeningHoursSchema, type OpeningHours } from './schemas/OpeningHoursSchema';

export async function fetchOpeningHours(): Promise<OpeningHours> {
	const groqJson = await sanityClient.fetch(
		`*[_type == "opening-hours" && setId.current == "default"]{title, hours, irregular}`
	);
	const openingHours = OpeningHoursSchema.parse(groqJson);

	// Filter out any irregular opening hours that are in the past
	if (openingHours.irregular) {
		const now = new Date();

		openingHours.irregular = openingHours.irregular.filter((irregular) => {
			return new Date(irregular.date) >= now;
		});
	}

	return openingHours;
}

export async function fetchFaq(): Promise<Faq> {
	const groqJson = await sanityClient.fetch(`*[_type == "faq"]{question, answer}`);
	const faq = FaqSchema.parse(groqJson);

	return faq;
}

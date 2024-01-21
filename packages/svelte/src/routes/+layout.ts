import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { createClient } from '@sanity/client';
import { OpeningHoursSchema, type OpeningHours } from '$lib/schemas/OpeningHoursSchema';

const _POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY;

const _sanityClient = createClient({
	projectId: 'mz20cm4o',
	dataset: 'production',
	apiVersion: '2024-01-21',
	useCdn: false
});

type _LayoutData = {
	navigation: Array<{
		path: string;
		title: string;
	}>;
	openingHours: OpeningHours;
};

export const load = async (): Promise<_LayoutData> => {
	const groqJson = await _sanityClient.fetch(
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

	if (browser) {
		posthog.init(_POSTHOG_API_KEY, {
			api_host: 'https://eu.posthog.com',
			capture_pageview: false,
			capture_pageleave: false
		});
	}

	return {
		navigation: [
			// { path: '/', title: 'Hem' },
			{ path: '/sortiment', title: 'Sortiment' },
			{ path: '/kurser', title: 'Kurser' },
			{ path: '/bestallning', title: 'Beställning' },
			{ path: '/om', title: 'Om' },
			{ path: '/kontakt', title: 'Kontakt' }
		],
		openingHours
	};
};

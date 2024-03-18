import posthog from 'posthog-js';
import { browser } from '$app/environment';
import { OpeningHoursSchema, type OpeningHours } from '$lib/schemas/OpeningHoursSchema';
import config, { sanityClient } from '../config';

const _POSTHOG_API_KEY = import.meta.env.VITE_POSTHOG_API_KEY;

type _LayoutData = {
	navigation: Array<{
		path: string;
		title: string;
	}>;
	colophonNavigation: Array<{
		path: string;
		title: string;
	}>;
	openingHours: OpeningHours;
};

export const load = async (): Promise<_LayoutData> => {
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

	if (browser) {
		posthog.init(_POSTHOG_API_KEY, {
			api_host: 'https://eu.posthog.com',
			capture_pageview: false,
			capture_pageleave: false
		});
	}

	const mainNavigation = config.navigation.filter((item) => item.header);
	const colophonNavigation = config.navigation.filter((item) => item.footer);

	return {
		navigation: mainNavigation,
		colophonNavigation,
		openingHours
	};
};

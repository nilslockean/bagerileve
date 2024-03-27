import { browser } from '$app/environment';
import config from '../config';
import { initPosthog } from '$lib/posthog';
import { fetchOpeningHours } from '$lib/sanity';

export const load = async () => {
	const openingHours = await fetchOpeningHours();

	if (browser) {
		initPosthog();
	}

	const mainNavigation = config.navigation.filter((item) => item.header);
	const colophonNavigation = config.navigation.filter((item) => item.footer);

	return {
		navigation: mainNavigation,
		colophonNavigation,
		openingHours
	};
};

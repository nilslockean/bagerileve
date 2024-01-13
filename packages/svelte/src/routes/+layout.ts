import posthog from 'posthog-js';
import { browser } from '$app/environment';

type _LayoutData = {
	navigation: Array<{
		path: string;
		title: string;
	}>;
};

export const load = (): _LayoutData => {
	const API_KEY = 'phc_FpOtrZTQsFj3URscXo70ak6KyVRM1kAe5t8zqmS0r9r'; // import.meta.env.VITE_POSTHOG_API_KEY;

	if (browser) {
		console.log('init posthog', API_KEY, posthog);
		posthog.init(API_KEY, {
			api_host: 'https://eu.posthog.com',
			capture_pageview: false,
			capture_pageleave: false
		});

		// posthog.capture('my event', { property: 'value' });
	}

	return {
		navigation: [
			{ path: '/', title: 'Hem' },
			{ path: '/sortiment', title: 'Sortiment' },
			{ path: '/kurser', title: 'Kurser' },
			{ path: '/bestallning', title: 'Beställning' },
			{ path: '/om', title: 'Om' },
			{ path: '/kontakt', title: 'Kontakt' }
		]
	};
};

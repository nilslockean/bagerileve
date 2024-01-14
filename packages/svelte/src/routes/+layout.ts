import posthog from 'posthog-js';
import { browser } from '$app/environment';

type _LayoutData = {
	navigation: Array<{
		path: string;
		title: string;
	}>;
};

export const load = (): _LayoutData => {
	const API_KEY = import.meta.env.VITE_POSTHOG_API_KEY;

	if (browser) {
		posthog.init(API_KEY, {
			api_host: 'https://eu.posthog.com',
			capture_pageview: false,
			capture_pageleave: false
		});
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

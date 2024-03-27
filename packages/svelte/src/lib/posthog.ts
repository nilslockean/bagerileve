import { page } from '$app/stores';
import posthog from 'posthog-js';

const POSTHOG_API_KEY = 'phc_ueebAQwInPcjah4s2QNDDU679mxLn7u3dfcp1eIXDyt';

export function initPosthog() {
	posthog.init(POSTHOG_API_KEY, {
		api_host: 'https://eu.posthog.com',
		capture_pageview: false,
		capture_pageleave: false
	});
}

// Integrate with SvelteKit client-side router to track page views and page leaves in PostHog.
// https://posthog.com/tutorials/svelte-analytics
export function initPosthogCsr() {
	let currentPath = '';

	const unsubscribePage = page.subscribe(($page) => {
		if (currentPath && currentPath !== $page.url.pathname) {
			posthog.capture('$pageleave');
		}

		currentPath = $page.url.pathname;
		posthog.capture('$pageview');
	});

	const handleBeforeUnload = () => {
		posthog.capture('$pageleave');
	};

	window.addEventListener('beforeunload', handleBeforeUnload);

	return () => {
		unsubscribePage();
		window.removeEventListener('beforeunload', handleBeforeUnload);
	};
}

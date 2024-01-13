import { page } from '$app/stores';
import posthog from 'posthog-js';

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

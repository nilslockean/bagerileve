import { expect, test } from '@playwright/test';
import config from '../src/config';

test('index page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('all pages have meta descriptions', async ({ page }) => {
	const allPages = ['/', ...config.navigation.map((item) => item.path)];
	for (const pagePath of allPages) {
		console.log('Looking for meta description on', pagePath);
		await page.goto(pagePath);
		const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
		expect(metaDescription).toBeTruthy();
	}
});

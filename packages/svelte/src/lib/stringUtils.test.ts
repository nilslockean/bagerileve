import { test, expect, describe } from 'vitest';
import { prettyCourseDates } from './stringUtils';

describe('prettyCourseDates', () => {
	test('starts and ends on different days', () => {
		const start = new Date('2024-11-04T16:30:00+02:00');
		const end = new Date('2024-11-05T17:00:00+02:00');
		expect(prettyCourseDates(start, end)).toBe('Måndag 4 november - tisdag 5 november');
	});

	test('start and end date identical', () => {
		const start = new Date('2024-11-04T16:30:00+02:00');
		const end = start;

		expect(prettyCourseDates(start, end)).toBe('Måndag 4 november kl. 16:30');
	});

	test('no end date', () => {
		const start = new Date('2024-11-04T16:30:00+02:00');

		expect(prettyCourseDates(start)).toBe('Måndag 4 november kl. 16:30');
	});

	test('starts and ends on same day but different times', () => {
		const start = new Date('2024-11-04T16:30:00+02:00');
		const end = new Date('2024-11-04T17:00:00+02:00');
		expect(prettyCourseDates(start, end)).toBe('Måndag 4 november kl. 16:30 - 17:00');
	});
});

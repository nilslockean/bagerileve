import { z } from 'zod';

export const CourseSchema = z.object({
	title: z.string(),
	description: z.string({
		description: 'HTML'
	}),
	url: z.string().url(),
	// starts_at: z.string().datetime({ offset: true }),
	// ends_at: z.string().datetime({ offset: true }),
	dates: z.string(), // Lördag 17 juni - söndag 18 juni
	draft: z.boolean()
});

export type Course = z.infer<typeof CourseSchema>;

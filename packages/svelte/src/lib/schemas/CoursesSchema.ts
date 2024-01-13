import { z } from 'zod';

const _ErrorSchema = z.object({
	status: z.literal('error'),
	message: z.string()
});

const _SuccessSchema = z.object({
	status: z.literal('success'),
	courses: z.array(
		z.object({
			title: z.string(),
			description: z.string({
				description: 'HTML'
			}),
			url: z.string().url(),
			past: z.boolean()
		})
	)
});

export const CoursesSchema = z.discriminatedUnion('status', [_ErrorSchema, _SuccessSchema]);

export type Courses = z.infer<typeof CoursesSchema>;

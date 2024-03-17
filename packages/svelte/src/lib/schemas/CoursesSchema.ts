import { z } from 'zod';
import { CourseSchema } from './CourseSchema';

const _ErrorSchema = z.object({
	status: z.literal('error'),
	message: z.string()
});

const _SuccessSchema = z.object({
	status: z.literal('success'),
	courses: z.array(CourseSchema)
});

export const CoursesSchema = z.discriminatedUnion('status', [_ErrorSchema, _SuccessSchema]);

export type Courses = z.infer<typeof CoursesSchema>;

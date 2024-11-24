import { z } from "zod";
import { CourseSchema } from "./Course";
import { CourseErrorSchema } from "./CourseResult";

const _SuccessSchema = z.object({
  status: z.literal("success"),
  courses: z.array(CourseSchema),
});

export const CoursesResultSchema = z.discriminatedUnion("status", [
  CourseErrorSchema,
  _SuccessSchema,
]);

export type CoursesResult = z.infer<typeof CoursesResultSchema>;

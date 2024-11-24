import { z } from "zod";
import { CourseSchema } from "./Course";

const _ErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});

const _SuccessSchema = z.object({
  status: z.literal("success"),
  courses: z.array(CourseSchema),
});

export const CoursesResultSchema = z.discriminatedUnion("status", [
  _ErrorSchema,
  _SuccessSchema,
]);

export type CoursesResult = z.infer<typeof CoursesResultSchema>;

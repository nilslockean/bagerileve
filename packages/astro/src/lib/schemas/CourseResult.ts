import { z } from "zod";
import { CourseSchema } from "./Course";

export const CourseErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});
export type CourseError = z.infer<typeof CourseErrorSchema>;

const _SuccessSchema = z.object({
  status: z.literal("success"),
  course: CourseSchema,
});

export const CourseResultSchema = z.discriminatedUnion("status", [
  CourseErrorSchema,
  _SuccessSchema,
]);

export type CourseResult = z.infer<typeof CourseResultSchema>;

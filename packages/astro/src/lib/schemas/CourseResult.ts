import { z } from "zod";
import { CourseSchema } from "./Course";

const _ErrorSchema = z.object({
  status: z.literal("error"),
  message: z.string(),
});

const _SuccessSchema = z.object({
  status: z.literal("success"),
  courses: CourseSchema,
});

export const CourseResultSchema = z.discriminatedUnion("status", [
  _ErrorSchema,
  _SuccessSchema,
]);

export type CourseResult = z.infer<typeof CourseResultSchema>;

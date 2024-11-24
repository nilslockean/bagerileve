import { z } from "zod";

export const ErrorResponseSchema = z.object({
  errors: z.array(
    z.object({
      code: z.union([z.number(), z.string()]),
      user_message: z.string(),
      internal_message: z.string(),
    })
  ),
});
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

function composeSuccessSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.object({
    success: z.object({
      code: z.number(),
      // user_message: z.string(),
      // internal_message: z.string()
    }),
    time: z.object({
      timestamp: z.number(),
      // date: z.string(),
      // time: z.string(),
      full_datetime: z.string(),
      // timezone: z.string(),
      // timezone_short: z.string(),
      // gmt: z.string()
    }),
    data: dataSchema,
  });
}

export function composeResponseSchema<T extends z.ZodTypeAny>(dataSchema: T) {
  return z.union([composeSuccessSchema(dataSchema), ErrorResponseSchema]);
}

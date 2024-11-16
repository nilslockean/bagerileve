import { z } from "zod";

export const OpeningHoursSchema = z
  .array(
    z.object({
      title: z.string(),
      hours: z.array(z.object({ day: z.string(), time: z.string() })),
      irregular: z
        .array(
          z.object({
            name: z.string().optional(),
            date: z.string(),
            time: z.string(),
          })
        )
        .optional(),
    })
  )
  .length(1)
  .transform((data) => data[0]);

export type OpeningHours = z.infer<typeof OpeningHoursSchema>;

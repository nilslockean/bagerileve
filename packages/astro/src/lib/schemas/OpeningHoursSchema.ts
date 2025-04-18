import { z } from "zod";

export const OpeningHoursSchema = z
  .array(
    z.object({
      title: z.string(),
      hours: z.array(
        z.object({
          day: z.string(),
          time: z.string().optional().nullable(),
          closed: z.boolean().optional(),
        })
      ),
      irregular: z
        .array(
          z.object({
            name: z.string().optional().nullable(),
            date: z.string(),
            time: z.string().optional().nullable(),
            closed: z.boolean().optional(),
            formattedDate: z.string().optional().nullable(),
          })
        )
        .optional(),
    })
  )
  .length(1)
  .transform((data) => data[0]);

export type OpeningHours = z.infer<typeof OpeningHoursSchema>;

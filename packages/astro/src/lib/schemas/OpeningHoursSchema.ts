import { z } from "zod";

const WeekdaySchema = z.object({
  day: z.number(),
  time: z.string().optional().nullable(),
  closed: z.boolean().optional(),
});

export const OpeningHoursSchema = z
  .array(
    z.object({
      title: z.string(),
      days: z.object({
        mon: WeekdaySchema,
        tue: WeekdaySchema,
        wed: WeekdaySchema,
        thu: WeekdaySchema,
        fri: WeekdaySchema,
        sat: WeekdaySchema,
        sun: WeekdaySchema,
      }),
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

import { z } from "zod";

export const FaqSchema = z.array(
  z.object({
    question: z.string(),
    answer: z.array(z.any()),
  })
);

export type Faq = z.infer<typeof FaqSchema>;

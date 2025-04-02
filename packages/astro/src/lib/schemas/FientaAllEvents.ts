import { z } from "zod";
import { FientaEventDetailsSchema } from "./FientaEventDetails";
import { composeResponseSchema } from "./FientaResponseSchema";

export const FientaAllEventsResponseSchema = composeResponseSchema(
  z.array(FientaEventDetailsSchema)
);
export type FientaAllEventsResponse = z.infer<
  typeof FientaAllEventsResponseSchema
>;

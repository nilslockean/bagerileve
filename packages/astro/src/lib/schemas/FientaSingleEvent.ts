import { z } from "zod";
import { FientaEventDetailsSchema } from "./FientaEventDetails";
import { composeResponseSchema } from "./FientaResponseSchema";

export const FientaSingleEventResponseSchema = composeResponseSchema(
  z.array(FientaEventDetailsSchema)
);

export type FientaSingleEventResponse = z.infer<
  typeof FientaSingleEventResponseSchema
>;

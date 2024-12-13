import { SanityAPI } from "./api/SanityAPI";
import { sanityClient } from "sanity:client";

// Export a new instance of the SanityAPI class with the sanityClient as a parameter.
// Won't work in test environment.
export const sanityAPI = new SanityAPI(sanityClient);

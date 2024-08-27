import { loadEnv } from "vite";

const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV || "production",
  process.cwd(),
  ""
);

export function sanityAsset(
  filename: string,
  projectId = SANITY_PROJECT_ID,
  dataset = SANITY_DATASET
): string {
  return `https://cdn.sanity.io/files/${projectId}/${dataset}/${filename}`;
}

import { defineConfig } from "astro/config";
import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { loadEnv } from "vite";

// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  "",
);

// https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    tailwind(),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-21",
      useCdn: false,
    }),
  ],
});

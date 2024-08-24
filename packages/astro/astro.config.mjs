import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import netlify from "@astrojs/netlify";
import mdx from "@astrojs/mdx";

// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter: netlify(),
  integrations: [
    svelte(),
    tailwind({
      applyBaseStyles: false,
    }),
    sanity({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-21",
      useCdn: false,
    }),
    mdx(),
  ],
});

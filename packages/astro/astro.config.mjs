import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";
import netlify from "@astrojs/netlify";
import node from "@astrojs/node";
import cloudflare from "@astrojs/cloudflare";

// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { SANITY_PROJECT_ID, SANITY_DATASET, ADAPTER } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

let adapter = node({
  mode: "standalone",
});
if (ADAPTER === "netlify") {
  adapter = netlify();
}
if (ADAPTER === "cloudflare") {
  adapter = cloudflare({
    platformProxy: {
      enabled: true,
    },
  });
}

// https://astro.build/config
export default defineConfig({
  output: "hybrid",
  adapter,
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

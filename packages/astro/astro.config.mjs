import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";

// https://docs.astro.build/en/guides/configuring-astro/#environment-variables
const { SANITY_PROJECT_ID, SANITY_DATASET } = loadEnv(
  process.env.NODE_ENV,
  process.cwd(),
  ""
);

// https://astro.build/config
export default defineConfig({
  site: "https://bagerileve.se",
  output: "hybrid",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "passthrough",
  }),
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
    sitemap({
      filter: (page) => !page.includes("/partials/"),
    }),
  ],
  redirects: {
    "/om": "/",
    "/kurs": "/kurser",
  },
  experimental: {
    env: {
      schema: {
        SANITY_PROJECT_ID: envField.string({
          context: "server",
          access: "public",
        }),
        SANITY_DATASET: envField.string({
          context: "server",
          access: "public",
        }),
        FIENTA_API_KEY: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
});

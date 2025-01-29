import svelte from "@astrojs/svelte";
import tailwind from "@astrojs/tailwind";
import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import { SANITY_PROJECT_ID, SANITY_DATASET } from "@bagerileve/shared";

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
  experimental: {
    env: {
      schema: {
        BEHOLD_FEED_ID: envField.string({
          context: "server",
          access: "public",
          optional: true,
        }),
        FIENTA_API_KEY: envField.string({
          context: "server",
          access: "secret",
        }),
        ENABLE_WEGLOT: envField.boolean({
          context: "server",
          access: "public",
          optional: true,
          default: false,
        }),
        ENABLE_VIEW_TRANSITIONS: envField.boolean({
          context: "server",
          access: "public",
          optional: true,
          default: false,
        }),
        ENABLE_POSTHOG: envField.boolean({
          context: "server",
          access: "public",
          optional: true,
          default: true,
        }),
        POSTHOG_PROJECT_API_KEY: envField.string({
          context: "server",
          access: "public",
          optional: true,
          default: "phc_FpOtrZTQsFj3URscXo70ak6KyVRM1kAe5t8zqmS0r9r",
        }),
      },
    },
  },
});

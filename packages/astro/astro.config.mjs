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
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "passthrough",
  }),
  integrations: [
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
      WEGLOT_API_KEY: envField.string({
        context: "server",
        access: "public",
        optional: true,
        default: "wg_137e3716c0aa4f3c19e9f429cfbb510b2",
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
  experimental: {},
});

import sanity from "@sanity/astro";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

console.log("META ENV", {
  PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
});

// https://astro.build/config
export default defineConfig({
  site: "https://bagerileve.se",
  adapter: cloudflare({
    platformProxy: {
      enabled: true,
    },
    imageService: "passthrough",
  }),
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sanity({
      projectId: "mz20cm4o",
      dataset: import.meta.env.MODE === "production" ? "production" : "preview",
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
      PICKUP_DATE_MIN_OFFSET: envField.number({
        context: "server",
        access: "public",
        optional: false,
        default: 2,
      }),
      PICKUP_DATE_MAX_OFFSET: envField.number({
        context: "server",
        access: "public",
        optional: false,
        default: 30,
      }),
      MODE: envField.string({
        context: "server",
        access: "public",
        optional: false,
        default: import.meta.env.MODE,
      }),
    },
  },
  experimental: {},
});

import sanity from "@sanity/astro";
import mdx from "@astrojs/mdx";
import cloudflare from "@astrojs/cloudflare";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import "dotenv/config";

const SANITY_DATASET =
  process.env.SANITY_DATASET ?? import.meta.env.SANITY_DATASET ?? "production";
const SANITY_TOKEN =
  process.env.SANITY_TOKEN ?? import.meta.env.SANITY_TOKEN ?? "";
const MAILERSEND_API_KEY =
  process.env.MAILERSEND_API_KEY ?? import.meta.env.MAILERSEND_API_KEY;

console.log("META ENV", {
  PROD: import.meta.env.PROD,
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  NODE_ENV: process.env.NODE_ENV,
  SANITY_DATASET,
  SANITY_TOKEN,
  MAILERSEND_API_KEY,
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
      dataset: SANITY_DATASET,
      apiVersion: "2024-01-21",
      useCdn: false,
      token: SANITY_TOKEN,
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
      ENABLE_STOREFRONT: envField.boolean({
        context: "server",
        access: "public",
        optional: false,
        default: false,
      }),
      MAILERSEND_API_KEY: envField.string({
        context: "server",
        access: "secret",
        optional: false,
        default: MAILERSEND_API_KEY,
      }),
      ORDER_ADMIN_PRINTER_EMAIL: envField.string({
        context: "server",
        access: "public",
        optional: true,
        default: "cbty732mccw842@hpeprint.com",
      }),
    },
  },
  experimental: {},
});

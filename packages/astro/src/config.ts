import { NavArea } from "@lib/enums/NavArea";
import type { Navigation } from "@lib/types/Navigation";
import type { NavLink } from "@lib/types/NavLink";

export enum SiteLanguage {
  SV = "sv",
  EN = "en",
}

export enum Slug {
  HOME = "home",
  // ASSORTMENT = "sortiment",
  COURSES = "kurser",
  ORDER = "bestallning",
  // ABOUT = "om",
  CONTACT = "kontakt",
  PRIVACY_POLICY = "gdpr",
  // BOOKING_TERMS = "villkor",
  ADMIN = "admin",
  CART = "kundvagn",
  CHECKOUT = "kassa",
}

type SiteConfig = {
  siteTitle: string;
  siteUrl: string;
  r2BaseUrl: string;
  siteDomain: string;
  navigation: Navigation;
  contact: {
    legalName: string;
    email: string;
    phone: string;
    address: {
      street: string;
      zip: string;
      city: string;
      googleMaps: string;
      appleMaps: string;
    };
    orgNumber: string;
  };
};

export const PageMap: Record<Slug, NavLink> = Object.freeze({
  // [Slug.ASSORTMENT]: { label: "Sortiment", path: "/sortiment" },
  [Slug.HOME]: { label: "Hem", path: "/", className: "hidden lg:inline" },
  [Slug.COURSES]: { label: "Kurser", path: "/kurser" },
  [Slug.ORDER]: { label: "Beställning", path: "/bestall" },
  // [Slug.ABOUT]: { label: "Om", path: "/om" },
  [Slug.CONTACT]: { label: "Kontakt", path: "/kontakt" },
  [Slug.PRIVACY_POLICY]: {
    label: "Integritetspolicy",
    path: "/integritetspolicy",
  },
  // [Slug.BOOKING_TERMS]: {
  //   label: "Bokningsvillkor",
  //   path: "/bokningsvillkor",
  // },
  [Slug.ADMIN]: {
    label: "Logga in",
    path: "https://leve.sanity.studio/production",
  },
  [Slug.CART]: {
    label: "Kundvagn",
    path: "/kundvagn",
  },
  [Slug.CHECKOUT]: {
    label: "Kassa",
    path: "/kassa",
  },
});

const config: SiteConfig = {
  siteTitle: "Bageri Leve",
  navigation: [
    {
      link: PageMap[Slug.HOME],
      areas: [NavArea.HEADER, NavArea.FOOTER],
    },
    { link: PageMap[Slug.COURSES], areas: [NavArea.HEADER, NavArea.FOOTER] },
    { link: PageMap[Slug.ORDER], areas: [NavArea.HEADER, NavArea.FOOTER] },
    { link: PageMap[Slug.CONTACT], areas: [NavArea.HEADER, NavArea.FOOTER] },
    { link: PageMap[Slug.PRIVACY_POLICY], areas: [NavArea.COLOPHON] },
    { link: PageMap[Slug.ADMIN], areas: [NavArea.COLOPHON] },
  ],
  siteUrl: "https://bagerileve.se",
  siteDomain: "bagerileve.se",
  r2BaseUrl: "https://r2.bagerileve.se",
  contact: {
    legalName: "Leve bageri och konditori AB",
    email: "hej@bagerileve.se",
    phone: "040-97 93 31",
    address: {
      street: "Östra Rönneholmsvägen 6",
      zip: "211 47",
      city: "Malmö",
      googleMaps: "https://maps.app.goo.gl/bKviQyXD7xwvJLmH6",
      appleMaps:
        "https://maps.apple.com/?address=Östra%20Rönneholmsvägen%206,%20211%2047%20Malmö,%20Sweden&auid=1128191008389929499&ll=55.596641,12.999685&lsp=9902&q=Bageri%20Leve",
    },
    orgNumber: "559097-6030",
  },
};

// Shop URL helper functions
export const SHOP_BASE_PATH = PageMap.bestallning.path;

export function getShopUrl() {
  return SHOP_BASE_PATH;
}

export function getCartUrl() {
  return PageMap.kundvagn.path;
}

export function getCheckoutUrl() {
  return PageMap.kassa.path;
}

export function getProductUrl(slug: string) {
  return `${SHOP_BASE_PATH}/${slug}`;
}

export function getThankYouUrl() {
  return `${SHOP_BASE_PATH}/tack`;
}

export default config;

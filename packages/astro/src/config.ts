import { NavArea } from "@lib/enums/NavArea";
import type { Navigation } from "@lib/types/Navigation";
import type { NavLink } from "@lib/types/NavLink";

export enum Slug {
  HOME = "home",
  // ASSORTMENT = "sortiment",
  COURSES = "kurser",
  ORDER = "bestallning",
  // ABOUT = "om",
  CONTACT = "kontakt",
  PRIVACY_POLICY = "gdpr",
  // BOOKING_TERMS = "villkor",
}

type SiteConfig = {
  siteTitle: string;
  navigation: Navigation;
};

export const PageMap: Record<Slug, NavLink> = Object.freeze({
  // [Slug.ASSORTMENT]: { label: "Sortiment", path: "/sortiment" },
  [Slug.HOME]: { label: "Hem", path: "/" },
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
});

const config: SiteConfig = {
  siteTitle: "Bageri Leve",
  navigation: [
    { link: PageMap[Slug.HOME], areas: [NavArea.HEADER, NavArea.FOOTER] },
    // { link: PageMap[Slug.ASSORTMENT], areas: [NavArea.HEADER, NavArea.FOOTER] },
    { link: PageMap[Slug.COURSES], areas: [NavArea.HEADER, NavArea.FOOTER] },
    { link: PageMap[Slug.ORDER], areas: [NavArea.HEADER, NavArea.FOOTER] },
    // { link: PageMap[Slug.ABOUT], areas: [NavArea.HEADER, NavArea.FOOTER] },
    { link: PageMap[Slug.CONTACT], areas: [NavArea.HEADER, NavArea.FOOTER] },
    { link: PageMap[Slug.PRIVACY_POLICY], areas: [NavArea.COLOPHON] },
    // { link: PageMap[Slug.BOOKING_TERMS], areas: [NavArea.COLOPHON] },
  ],
};

export default config;

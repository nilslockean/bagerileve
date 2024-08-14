import { NavArea } from "@lib/enums/NavArea";
import type { NavLink } from "@lib/types/NavLink";

export enum Slug {
  ASSORTMENT = "sortiment",
  COURSES = "kurser",
  ORDER = "bestallning",
  ABOUT = "om",
  CONTACT = "kontakt",
  PRIVACY_POLICY = "gdpr",
  BOOKING_TERMS = "villkor",
}

type SiteConfig = {
  siteTitle: string;
  navigation: Array<{
    link: NavLink;
    areas: NavArea[];
  }>;
};

export const PageMap: Record<Slug, NavLink> =
  Object.freeze({
    [Slug.ASSORTMENT]: { label: "Sortiment", path: "/sortiment" },
    [Slug.COURSES]: { label: "Kurser", path: "/kurser" },
    [Slug.ORDER]: { label: "Beställning", path: "/bestall" },
    [Slug.ABOUT]: { label: "Om", path: "/om" },
    [Slug.CONTACT]: { label: "Kontakt", path: "/kontakt" },
    [Slug.PRIVACY_POLICY]: {
      label: "Integritetspolicy",
      path: "/integritetspolicy",
    },
    [Slug.BOOKING_TERMS]: {
      label: "Bokningsvillkor",
      path: "/bokningsvillkor",
    },
  });

const config: SiteConfig = {
  siteTitle: "Bageri Leve",
  navigation: [
    { link: PageMap[Slug.ASSORTMENT], areas: [NavArea.HEADER] },
    { link: PageMap[Slug.COURSES], areas: [NavArea.HEADER] },
    { link: PageMap[Slug.ORDER], areas: [NavArea.HEADER] },
    { link: PageMap[Slug.ABOUT], areas: [NavArea.HEADER] },
    { link: PageMap[Slug.CONTACT], areas: [NavArea.HEADER] },
    { link: PageMap[Slug.PRIVACY_POLICY], areas: [NavArea.FOOTER] },
    { link: PageMap[Slug.BOOKING_TERMS], areas: [NavArea.FOOTER] },
  ],
};

export default config;

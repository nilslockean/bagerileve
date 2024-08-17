import type { NavArea } from "./enums/NavArea";
import type { Navigation } from "./types/Navigation";

export function getNavLinks(
  area: NavArea,
  navigation: Navigation,
  currentPath?: string
) {
  return navigation
    .filter(({ areas }) => areas.includes(area))
    .map(({ link }) => {
      const current = currentPath === link.path;
      return { ...link, current };
    });
}

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
      const regExp = new RegExp("^" + link.path + "/?$");
      const current = regExp.test(currentPath || "");
      return { ...link, current };
    });
}

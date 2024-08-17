import type { NavArea } from "@lib/enums/NavArea";
import type { NavLink } from "./NavLink";

export type Navigation = Array<{
  link: NavLink;
  areas: NavArea[];
}>;

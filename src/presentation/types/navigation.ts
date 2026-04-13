import type { LucideIcon } from "lucide-react";

export interface NavLink {
  href: string;
  label: string;
}

export interface NavLinkWithIcon extends NavLink {
  icon: LucideIcon;
}

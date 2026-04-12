import { FileText, Users, Settings } from "lucide-react";
import type { NavLinkWithIcon } from "@/presentation/types/navigation";

export function getInternalNavItems(lang: string): NavLinkWithIcon[] {
  return [
    { icon: FileText, label: "Templates", href: `/${lang}/templates` },
    { icon: Users, label: "Users", href: "#" },
    { icon: Settings, label: "Settings", href: `/${lang}/settings` },
  ];
}

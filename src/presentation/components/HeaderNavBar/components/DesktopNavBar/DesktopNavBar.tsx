import Link from "next/link";
import type { NavLink } from "@/presentation/types/navigation";
import { Button } from "../../../ui/button";

interface Props {
  links: NavLink[];
}

export const DesktopNavBar = ({ links }: Props) => {
  return (
    <div
      data-testid="desktop-navbar-container"
      className="hidden md:flex items-center gap-4"
    >
      {links.map(({ href, label }) => (
        <Button key={href} variant={"link"} className="p-1">
          <Link href={href}>{label}</Link>
        </Button>
      ))}
    </div>
  );
};

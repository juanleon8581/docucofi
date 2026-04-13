"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import type { NavLink } from "@/presentation/types/navigation";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

interface Props {
  links: NavLink[];
}

export const BurgerMenu = ({ links }: Props) => {
  return (
    <div data-testid="burger-menu-container" className="flex md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant={"ghost"}
            size={"icon"}
            data-testid="burger-menu-trigger"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" data-testid="burger-menu-content">
          {links.map(({ href, label }) => (
            <DropdownMenuItem key={href} asChild>
              <Link href={href}>{label}</Link>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

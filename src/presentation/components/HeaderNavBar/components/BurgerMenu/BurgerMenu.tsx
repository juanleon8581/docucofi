import { Locale } from "@/infrastructure/i18n/config";
import { Menu } from "lucide-react";
import { NavLink } from "../../HeaderNavBar";
import { LocalizedLink } from "../../../LocalizedLink/LocalizedLink";
import { Button } from "../../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../../ui/dropdown-menu";

interface Props {
  lang: Locale;
  links: NavLink[];
}

export const BurgerMenu = ({ lang, links }: Props) => {
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
              <LocalizedLink href={href} locale={lang}>
                {label}
              </LocalizedLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

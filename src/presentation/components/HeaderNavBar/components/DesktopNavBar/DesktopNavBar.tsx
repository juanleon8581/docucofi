import { Locale } from "@/infrastructure/i18n/config";
import { LocalizedLink } from "../../../LocalizedLink/LocalizedLink";
import { Button } from "../../../ui/button";
import { NavLink } from "../../HeaderNavBar";

interface Props {
  lang: Locale;
  links: NavLink[];
}

export const DesktopNavBar = ({ lang, links }: Props) => {
  return (
    <div
      data-testid="desktop-navbar-container"
      className="hidden md:flex items-center gap-4"
    >
      {links.map(({ href, label }) => (
        <Button key={href} variant={"link"} className="p-1">
          <LocalizedLink href={href} locale={lang}>
            {label}
          </LocalizedLink>
        </Button>
      ))}
    </div>
  );
};

import { Locale } from "@/infrastructure/i18n/config";
import { BurgerMenu } from "./components/BurgerMenu/BurgerMenu";
import { DesktopNavBar } from "./components/DesktopNavBar/DesktopNavBar";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { Logo } from "../Logo/Logo";

interface Props {
  lang: Locale;
}

export interface NavLink {
  href: string;
  label: string;
}

const NAV_LINKS: NavLink[] = [
  { href: "/register", label: "Register" },
  { href: "/login", label: "Login" },
];

export const HeaderNavBar = ({ lang }: Props) => {
  return (
    <div
      data-testid="header-navbar-container"
      className="flex items-center justify-between p-8 border-b border-muted-foreground"
    >
      <Logo dataTestId="header-navbar-logo" />
      <div
        data-testid="header-navbar-actions"
        className="flex items-center gap-2 md:gap-4"
      >
        <LanguageSwitcher currentLocale={lang} />
        <DesktopNavBar lang={lang} links={NAV_LINKS} />
        <BurgerMenu lang={lang} links={NAV_LINKS} />
      </div>
    </div>
  );
};

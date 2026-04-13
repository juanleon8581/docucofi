import type { Locale } from "@/infrastructure/i18n/config";
import type { NavLink } from "@/presentation/types/navigation";
import { BurgerMenu } from "./components/BurgerMenu/BurgerMenu";
import { DesktopNavBar } from "./components/DesktopNavBar/DesktopNavBar";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { Logo } from "../Logo/Logo";

interface Props {
  lang: Locale;
}

export const HeaderNavBar = ({ lang }: Props) => {
  const NAV_LINKS: NavLink[] = [
    { href: `/${lang}/register`, label: "Register" },
    { href: `/${lang}/login`, label: "Login" },
  ];

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
        <DesktopNavBar links={NAV_LINKS} />
        <BurgerMenu links={NAV_LINKS} />
      </div>
    </div>
  );
};

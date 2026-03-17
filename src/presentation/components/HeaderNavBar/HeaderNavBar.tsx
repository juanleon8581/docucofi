import { Locale } from "@/infrastructure/i18n/config";
import { LanguageSwitcher } from "../LanguageSwitcher/LanguageSwitcher";
import { Logo } from "../Logo/Logo";
import { Button } from "../ui/button";
import { LocalizedLink } from "../LocalizedLink/LocalizedLink";

interface Props {
  lang: Locale;
}

export const HeaderNavBar = ({ lang }: Props) => {
  return (
    <div
      data-testid="header-navbar-container"
      className="flex items-center justify-between p-8"
    >
      <Logo dataTestId="header-navbar-logo" />
      <div
        data-testid="header-navbar-nav-buttons-container"
        className="flex items-center gap-4"
      >
        <Button variant={"link"}>
          <LocalizedLink href="/login" locale={lang}>
            Login
          </LocalizedLink>
        </Button>
        <Button variant={"link"}>
          <LocalizedLink href="/register" locale={lang}>
            Register
          </LocalizedLink>
        </Button>
        <LanguageSwitcher currentLocale={lang as Locale} />
      </div>
    </div>
  );
};

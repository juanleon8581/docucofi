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
      className="flex items-center justify-between p-8 border-b border-muted-foreground"
    >
      <Logo dataTestId="header-navbar-logo" />
      <div
        data-testid="header-navbar-nav-buttons-container"
        className="flex items-center gap-1 md:gap-4"
      >
        <LanguageSwitcher currentLocale={lang as Locale} />

        <Button variant={"link"} className="p-1">
          <LocalizedLink href="/register" locale={lang}>
            Register
          </LocalizedLink>
        </Button>
        <Button variant={"link"} className="p-1">
          <LocalizedLink href="/login" locale={lang}>
            Login
          </LocalizedLink>
        </Button>
      </div>
    </div>
  );
};

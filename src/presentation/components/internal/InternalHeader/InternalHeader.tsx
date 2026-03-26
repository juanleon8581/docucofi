import { Locale } from "@/infrastructure/i18n/config";
import { LanguageSwitcher } from "../../LanguageSwitcher/LanguageSwitcher";
import { Logo } from "../../Logo/Logo";
import { UserAvatar } from "../../UserAvatar/UserAvatar";

interface Props {
  user: {
    fullName?: string;
    email: string;
    avatarUrl?: string;
  };
  lang: Locale;
}

export function InternalHeader({ user, lang }: Readonly<Props>) {
  return (
    <header
      data-testid="internal-header-container"
      className="flex items-center justify-between p-4 border-b border-muted-foreground"
    >
      <Logo dataTestId="internal-header-logo" />
      <div
        data-testid="internal-header-actions"
        className="flex items-center gap-4"
      >
        <LanguageSwitcher currentLocale={lang} />
        <UserAvatar
          email={user.email}
          fullName={user.fullName}
          avatarUrl={user.avatarUrl}
        />
      </div>
    </header>
  );
}

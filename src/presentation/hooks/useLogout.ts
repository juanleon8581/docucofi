import { useParams } from "next/navigation";
import { useTransition } from "react";
import { type Locale } from "@/infrastructure/i18n/config";
import { type SignOutScope } from "@/domain/repositories/IAuthRepository";
import { logoutAction } from "@/app/[lang]/(internal)/actions";

export function useLogout() {
  const { lang } = useParams<{ lang: string }>();
  const [isPending, startTransition] = useTransition();

  const logout = (scope?: SignOutScope) => {
    startTransition(async () => {
      await logoutAction(lang as Locale, scope);
    });
  };

  return { logout, isPending };
}

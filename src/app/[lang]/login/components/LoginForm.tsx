"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/presentation/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/components/ui/form";
import { Input } from "@/presentation/components/ui/input";
import { ValidationAdapter } from "@/infrastructure/adapters/ZodAdapter";
import {
  createLoginSchema,
  LoginFormValues,
  ValidationTranslations,
} from "@/infrastructure/validations/authSchemas";
import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";
import type { Dictionary } from "@/infrastructure/i18n/dictionaries";
import { Locale } from "@/infrastructure/i18n/config";
import { LocalizedLink } from "@/presentation/components/LocalizedLink/LocalizedLink";

type LoginTranslations = Dictionary["login"] & Dictionary["common"];

interface Props {
  onSubmit?: (
    data: LoginFormValues,
    locale: Locale,
  ) => Promise<{ error?: string } | void> | void;
  translations: LoginTranslations;
  validationTranslations: ValidationTranslations;
  lang: Locale;
}

export const LoginForm = ({
  onSubmit,
  translations: t,
  validationTranslations,
  lang,
}: Props) => {
  const form = useForm<LoginFormValues>({
    resolver: ValidationAdapter.getResolver<LoginFormValues>(
      createLoginSchema(validationTranslations),
    ),
    defaultValues: { email: "", password: "" },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    if (onSubmit) {
      const result = await onSubmit(data, lang);
      if (result?.error) {
        errorToast(t.errorTitle, result.error);
        return;
      }
      successToast(t.successTitle, t.successMessage);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={t.placeholders.email} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder={t.placeholders.password}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90"
          >
            {t.submitButton}
          </Button>
        </form>
      </Form>
      <div className="flex flex-col space-y-4 text-center text-sm">
        <LocalizedLink
          href="/forgot-password"
          locale={lang}
          className="text-muted-foreground hover:underline"
        >
          {t.forgotPassword}
        </LocalizedLink>
        <div className="text-muted-foreground">
          {t.noAccount}{" "}
          <LocalizedLink
            href="/register"
            locale={lang}
            className="font-medium text-primary hover:underline"
          >
            {t.register}
          </LocalizedLink>
        </div>
      </div>
    </div>
  );
};

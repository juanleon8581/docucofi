"use client";

import { useForm } from "react-hook-form";
import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";
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
  createForgotPasswordSchema,
  ForgotPasswordFormValues,
  ValidationTranslations,
} from "@/infrastructure/validations/authSchemas";
import { type Locale } from "@/infrastructure/i18n/config";
import type { Dictionary } from "@/infrastructure/i18n/dictionaries";
import { LocalizedLink } from "@/presentation/components/LocalizedLink/LocalizedLink";

type ForgotPasswordTranslations = Dictionary["forgotPassword"] &
  Dictionary["common"];

interface Props {
  onSubmit?: (
    data: ForgotPasswordFormValues,
  ) => Promise<{ error?: string; success?: boolean }> | void;
  translations: ForgotPasswordTranslations;
  validationTranslations: ValidationTranslations;
  lang: Locale;
}

export const ForgotPasswordForm = ({
  onSubmit,
  translations: t,
  validationTranslations,
  lang,
}: Props) => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: ValidationAdapter.getResolver<ForgotPasswordFormValues>(
      createForgotPasswordSchema(validationTranslations),
    ),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormValues) => {
    if (onSubmit) {
      const result = await onSubmit(data);
      if (result?.error) {
        errorToast(t.errorTitle, result.error);
        return;
      }
      successToast(t.successTitle, t.successMessage);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col gap-3 mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">{t.title}</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          {t.subtitle}
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.email}</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder={t.placeholders.email}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            {t.submitButton}
          </Button>
        </form>
      </Form>

      <div className="mt-8 text-center text-sm">
        <LocalizedLink
          href="/login"
          locale={lang}
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          {t.login}
        </LocalizedLink>
      </div>
    </div>
  );
};

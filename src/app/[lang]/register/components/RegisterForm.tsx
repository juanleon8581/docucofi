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
import { Checkbox } from "@/presentation/components/ui/checkbox";
import { ValidationAdapter } from "@/infrastructure/adapters/ZodAdapter";
import {
  createRegisterSchema,
  RegisterFormValues,
  ValidationTranslations,
} from "@/infrastructure/validations/authSchemas";

import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";
import { Dictionary } from "@/infrastructure/i18n/dictionaries";
import { Locale } from "@/infrastructure/i18n/config";
import { LocalizedLink } from "@/presentation/components/LocalizedLink/LocalizedLink";

type RegisterTranslations = Dictionary["register"] & Dictionary["common"];

interface Props {
  onSubmit?: (
    data: RegisterFormValues,
    locale: Locale,
  ) => Promise<{ error?: string } | void> | void;
  translations: RegisterTranslations;
  validationTranslations: ValidationTranslations;
  lang: Locale;
}

export const RegisterForm = ({
  onSubmit,
  translations: t,
  validationTranslations,
  lang,
}: Props) => {
  const form = useForm<RegisterFormValues>({
    resolver: ValidationAdapter.getResolver<RegisterFormValues>(
      createRegisterSchema(validationTranslations),
    ),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      acceptTerms: false,
    },
  });

  const handleSubmit = async (data: RegisterFormValues) => {
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
    <div className="w-full max-w-[600px] flex flex-col relative">
      <div className="flex flex-col gap-2 mb-8">
        <h2 className="text-slate-900 dark:text-white text-3xl font-black leading-tight tracking-tight">
          {t.title}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">
          {t.subtitle}
        </p>
      </div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col sm:flex-row gap-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t.fullNameLabel}</FormLabel>
                  <FormControl>
                    <Input placeholder={t.fullNamePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t.emailLabel}</FormLabel>
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
          </div>
          <div className="flex flex-col sm:flex-row gap-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t.passwordLabel}</FormLabel>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>{t.confirmPasswordLabel}</FormLabel>
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
          </div>
          <FormField
            control={form.control}
            name="acceptTerms"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center gap-x-3 space-y-0 pt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal text-slate-600 dark:text-slate-300">
                    {t.acceptTerms}
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-4">
            <Button
              type="submit"
              className="w-full h-12 bg-black hover:bg-black/90 dark:bg-zinc-800 dark:hover:bg-zinc-700 dark:text-zinc-50 text-white font-medium"
            >
              {t.submitButton}
            </Button>
          </div>
        </form>
      </Form>
      <div className="mt-8 text-center">
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {t.hasAccount}
          <LocalizedLink
            locale={lang}
            href="/login"
            className="text-primary dark:text-white font-semibold hover:underline underline-offset-4 transition-all ml-2"
          >
            {t.login}
          </LocalizedLink>
        </p>
      </div>
    </div>
  );
};

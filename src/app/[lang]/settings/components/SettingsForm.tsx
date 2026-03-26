"use client";

import { useRouter } from "next/navigation";
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
  createUpdateProfileSchema,
  UpdateProfileFormValues,
  ProfileValidationTranslations,
} from "@/infrastructure/validations/profileSchemas";
import {
  successToast,
  errorToast,
} from "@/presentation/components/Toaster/controller/toast.controller";
import type { Dictionary } from "@/infrastructure/i18n/dictionaries";
import { Locale } from "@/infrastructure/i18n/config";

type SettingsTranslations = Dictionary["settings"];

interface Props {
  onSubmit?: (
    data: UpdateProfileFormValues,
    locale: Locale,
  ) => Promise<{ error?: string } | void> | void;
  translations: SettingsTranslations;
  validationTranslations: ProfileValidationTranslations;
  lang: Locale;
  defaultValues?: Partial<UpdateProfileFormValues>;
}

export const SettingsForm = ({
  onSubmit,
  translations: t,
  validationTranslations,
  lang,
  defaultValues,
}: Props) => {
  const router = useRouter();

  const form = useForm<UpdateProfileFormValues>({
    resolver: ValidationAdapter.getResolver<UpdateProfileFormValues>(
      createUpdateProfileSchema(validationTranslations),
    ),
    defaultValues: {
      fullName: defaultValues?.fullName ?? "",
      city: defaultValues?.city ?? "",
      company: defaultValues?.company ?? "",
      companyNit: defaultValues?.companyNit ?? "",
      phone: defaultValues?.phone ?? "",
      dni: defaultValues?.dni ?? "",
    },
  });

  const handleSubmit = async (data: UpdateProfileFormValues) => {
    if (onSubmit) {
      const result = await onSubmit(data, lang);
      if (result?.error) {
        errorToast(t.errorTitle, result.error);
        return;
      }
      successToast(t.successTitle, t.successMessage);
      router.refresh();
    }
  };

  return (
    <div className="w-full max-w-lg space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-sm text-muted-foreground">{t.subtitle}</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
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
            name="city"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.cityLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.cityPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.companyLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.companyPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyNit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.companyNitLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.companyNitPlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.phoneLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.phonePlaceholder} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dni"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t.dniLabel}</FormLabel>
                <FormControl>
                  <Input placeholder={t.dniPlaceholder} {...field} />
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
    </div>
  );
};

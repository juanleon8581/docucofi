"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
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
  forgotPasswordSchema,
  ForgotPasswordFormValues,
} from "@/infrastructure/validations/authSchemas";

export const ForgotPasswordForm = ({
  onSubmit,
}: {
  onSubmit?: (
    data: ForgotPasswordFormValues,
  ) => void | Promise<void> | Promise<{ success: boolean }>;
}) => {
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ForgotPasswordFormValues>({
    resolver:
      ValidationAdapter.getResolver<ForgotPasswordFormValues>(
        forgotPasswordSchema,
      ),
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = async (data: ForgotPasswordFormValues) => {
    if (onSubmit) {
      await onSubmit(data);
      setIsSuccess(true);
    }
  };

  return (
    <div className="w-full max-w-[400px]">
      <div className="flex flex-col gap-3 mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
          Recuperar contraseña
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Introduce tu email y te enviaremos las instrucciones para restablecer
          tu contraseña
        </p>
      </div>

      {isSuccess && (
        <div className="mb-8 p-4 rounded-lg bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-900/30 flex items-start gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5"
          >
            <path
              fillRule="evenodd"
              d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
              clipRule="evenodd"
            />
          </svg>
          <div className="flex flex-col text-left">
            <h3 className="text-sm font-semibold text-green-800 dark:text-green-300">
              Éxito
            </h3>
            <p className="text-sm text-green-700 dark:text-green-400/80">
              Se ha enviado el correo con las instrucciones.
            </p>
          </div>
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2 text-left">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    Email
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="nombre@empresa.com"
                      className="w-full rounded-lg h-12 border-slate-200 dark:border-slate-700"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button
            type="submit"
            className="w-full flex items-center justify-center rounded-lg bg-primary dark:bg-white text-white dark:text-primary px-4 h-12 text-sm font-semibold shadow-sm hover:bg-primary/90 dark:hover:bg-slate-100 transition-colors"
          >
            Enviar instrucciones
          </Button>
        </form>
      </Form>
      <div className="mt-12 text-center">
        <a
          href="/login"
          className="text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-primary dark:hover:text-white transition-colors"
        >
          Inicia sesión
        </a>
      </div>
    </div>
  );
};

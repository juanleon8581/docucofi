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
  loginSchema,
  LoginFormValues,
} from "@/infrastructure/validations/authSchemas";

export const LoginForm = ({
  onSubmit,
}: {
  onSubmit?: (data: LoginFormValues) => void | Promise<void>;
}) => {
  const form = useForm<LoginFormValues>({
    resolver: ValidationAdapter.getResolver<LoginFormValues>(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (data: LoginFormValues) => {
    if (onSubmit) {
      await onSubmit(data);
    }
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-2xl font-bold tracking-tight">
          Bienvenido de nuevo
        </h1>
        <p className="text-sm text-muted-foreground">
          Ingresa tus credenciales para acceder
        </p>
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
                  <Input placeholder="usuario@ejemplo.com" {...field} />
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
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-black text-white hover:bg-black/90"
          >
            Entrar
          </Button>
        </form>
      </Form>
      <div className="flex flex-col space-y-4 text-center text-sm">
        <a
          href="/forgot-password"
          className="text-muted-foreground hover:underline"
        >
          ¿Olvidaste tu contraseña?
        </a>
        <div className="text-muted-foreground">
          ¿No tienes una cuenta?{" "}
          <a
            href="/register"
            className="font-medium text-primary hover:underline"
          >
            Regístrate
          </a>
        </div>
      </div>
    </div>
  );
};

import { Metadata } from "next";
import { LoginForm } from "./components/LoginForm";
import { loginAction } from "./actions";

export const metadata: Metadata = {
  title: "Iniciar Sesión | CofiAuth",
  description: "Inicia sesión en tu cuenta de CofiAuth para acceder al panel.",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* 
        Branding Side 
        - Hidden on mobile/tablet (hidden)
        - Visible on desktop (lg:block lg:w-1/2) 
      */}
      <div className="relative flex-col bg-zinc-900 p-10 text-white dark:border-r border-zinc-800 hidden lg:flex lg:w-1/2">
        <div className="absolute inset-0 bg-zinc-900" />

        {/* Replace with your actual Logo if available */}
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          CofiAuth System
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This boilerplate has saved me countless hours of setup and
              helped my team deliver features faster than ever before. Highly
              recommended for agile projects.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis, Lead Engineer</footer>
          </blockquote>
        </div>
      </div>

      {/* 
        Form Side
        - Full width on mobile/tablet (w-full)
        - Half width on desktop (lg:w-1/2)
      */}
      <div className="flex w-full flex-col items-center justify-center p-8 lg:p-12 lg:w-1/2">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:max-w-md">
          <LoginForm onSubmit={loginAction} />
        </div>
      </div>
    </div>
  );
}

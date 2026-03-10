import { Metadata } from "next";
import { ForgotPasswordForm } from "./components/ForgotPasswordForm";
import { forgotPasswordAction } from "./actions";

export const metadata: Metadata = {
  title: "Recuperar Contraseña | CofiAuth",
  description: "Restablece la contraseña de tu cuenta de CofiAuth.",
};

export default function ForgotPasswordPage() {
  return (
    <div className="bg-white dark:bg-background-dark text-slate-900 dark:text-slate-100 min-h-screen flex overflow-hidden antialiased">
      {/* 
        Branding Side 
        - Hidden on mobile/tablet (hidden)
        - Visible on desktop (lg:flex lg:w-1/2) 
      */}
      <div className="hidden lg:flex w-1/2 bg-background-light dark:bg-slate-900/50 flex-col items-center justify-center p-12 relative border-r border-slate-100 dark:border-slate-800">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center gap-3 mb-8 text-primary dark:text-white">
            <div className="size-10">
              <svg
                className="w-full h-full text-primary dark:text-white"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
                <path
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold tracking-tight">CofiAuth</h1>
          </div>
          <p className="text-xl font-medium text-slate-600 dark:text-slate-400 leading-relaxed">
            La solución moderna y segura para la gestión de accesos de tu equipo
          </p>
        </div>
      </div>

      {/* 
        Form Side
        - Full width on mobile/tablet (w-full)
        - Half width on desktop (lg:w-1/2)
      */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 sm:p-12 md:p-24 bg-white dark:bg-background-dark relative">
        <ForgotPasswordForm onSubmit={forgotPasswordAction} />

        {/* Mobile Header Graphic */}
        <div className="absolute top-8 left-8 lg:hidden">
          <div className="flex items-center gap-2 text-primary dark:text-white">
            <div className="size-6">
              <svg
                className="w-full h-full text-primary dark:text-white"
                fill="none"
                viewBox="0 0 48 48"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  d="M24 18.4228L42 11.475V34.3663C42 34.7796 41.7457 35.1504 41.3601 35.2992L24 42V18.4228Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
                <path
                  clipRule="evenodd"
                  d="M24 8.18819L33.4123 11.574L24 15.2071L14.5877 11.574L24 8.18819ZM9 15.8487L21 20.4805V37.6263L9 32.9945V15.8487ZM27 37.6263V20.4805L39 15.8487V32.9945L27 37.6263ZM25.354 2.29885C24.4788 1.98402 23.5212 1.98402 22.646 2.29885L4.98454 8.65208C3.7939 9.08038 3 10.2097 3 11.475V34.3663C3 36.0196 4.01719 37.5026 5.55962 38.098L22.9197 44.7987C23.6149 45.0671 24.3851 45.0671 25.0803 44.7987L42.4404 38.098C43.9828 37.5026 45 36.0196 45 34.3663V11.475C45 10.2097 44.2061 9.08038 43.0155 8.65208L25.354 2.29885Z"
                  fill="currentColor"
                  fillRule="evenodd"
                ></path>
              </svg>
            </div>
            <span className="font-bold tracking-tight">CofiAuth</span>
          </div>
        </div>
      </div>
    </div>
  );
}

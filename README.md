# 🔐 CofiCode Auth — Authentication Starter Template

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth-3ECF8E?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss)
![Vitest](https://img.shields.io/badge/Vitest-Testing-6E9F18?style=for-the-badge&logo=vitest)

**A production-ready authentication template built with Clean Architecture, i18n support, and a complete UI kit — ready to clone and ship.**

</div>

---

## ✨ Features Out of the Box

| Feature                    | Description                                                                |
| -------------------------- | -------------------------------------------------------------------------- |
| 🔑 **Auth Screens**        | Login, Register, and Forgot Password pages — fully wired                   |
| 🌍 **i18n (EN / ES)**      | URL-based locale routing (`/en/login`, `/es/login`) with language switcher |
| 🧱 **Clean Architecture**  | Domain → Infrastructure → Presentation layers with strict separation       |
| ✅ **Form Validation**     | React Hook Form + Zod schemas with error messages via domain messages      |
| 🔔 **Toast Notifications** | Sonner-powered toasts for success and error feedback on all auth flows     |
| 🎨 **UI Components**       | shadcn/ui + Radix UI + Lucide Icons pre-configured                         |
| 🛡️ **Middleware**          | Next.js middleware for locale detection and routing (`proxy.ts`)           |
| 🧪 **Testing**             | Vitest + Testing Library setup with coverage reporting                     |
| 📦 **PNPM**                | Fast, disk-efficient package management with workspace support             |

---

## 🏗️ Architecture Overview

This template follows **Clean Architecture** principles, ensuring the business logic is completely decoupled from frameworks and external services.

```
src/
├── app/                        # Next.js App Router (entry points)
│   └── [lang]/                 # Locale-dynamic routing
│       ├── login/
│       ├── register/
│       └── forgot-password/
│
├── domain/                     # 🧠 Core Business Logic (no framework deps)
│   ├── entities/               # Domain entities
│   ├── dtos/                   # Data Transfer Objects (Login, Register...)
│   ├── interfaces/             # Contracts (IAuthResponse, ...)
│   ├── repositories/           # Abstract repository interfaces
│   ├── useCases/               # Application use cases (AuthUseCase)
│   ├── errors/                 # Domain-specific errors (ValidationError...)
│   └── messages/               # Centralized validation/error string constants
│
├── infrastructure/             # 🔌 Adapters & External Integrations
│   ├── repositories/           # Concrete repository implementations (Supabase)
│   ├── services/               # External service wrappers
│   ├── adapters/               # Framework adapters
│   ├── mappers/                # Data mappers (external ↔ domain)
│   ├── validations/            # Zod validation schemas
│   ├── http/                   # Server Actions
│   └── i18n/                   # i18n config, dictionaries, utils
│
├── presentation/               # 🖼️ UI Components & Hooks
│   ├── components/             # Reusable components (Logo, LanguageSwitcher, ui/...)
│   ├── hooks/                  # Custom React hooks
│   ├── stores/                 # State management
│   ├── lib/                    # Utility functions (cn, ...)
│   └── styles/                 # Global CSS
│
└── test/                       # Shared test utilities and setup
```

### Dependency Rule

```
app  →  presentation  →  infrastructure  →  domain
                                         ↑
                               (no outward deps)
```

> The **domain layer** has zero dependencies on Next.js, Supabase, or any UI library. This makes use cases fully testable and portable.

---

## 🛠️ Tech Stack

### Core

| Technology                                    | Version | Purpose                                          |
| --------------------------------------------- | ------- | ------------------------------------------------ |
| [Next.js](https://nextjs.org/)                | 16      | React framework with App Router & Server Actions |
| [React](https://react.dev/)                   | 19      | UI runtime                                       |
| [TypeScript](https://www.typescriptlang.org/) | 5       | Type safety across all layers                    |

### Backend & Auth

| Technology                                                                | Version | Purpose                                             |
| ------------------------------------------------------------------------- | ------- | --------------------------------------------------- |
| [Supabase JS](https://supabase.com/docs/reference/javascript)             | ^2.98   | Auth provider (sign in, sign up, sign out, session) |
| [@supabase/ssr](https://supabase.com/docs/guides/auth/server-side/nextjs) | ^0.9    | Cookie-based SSR session management                 |

### UI & Styling

| Technology                                                | Version | Purpose                      |
| --------------------------------------------------------- | ------- | ---------------------------- |
| [Tailwind CSS](https://tailwindcss.com/)                  | v4      | Utility-first styling        |
| [shadcn/ui](https://ui.shadcn.com/)                       | ^3.8    | Accessible component library |
| [Radix UI](https://www.radix-ui.com/)                     | ^1.4    | Headless primitives          |
| [Lucide React](https://lucide.dev/)                       | ^0.577  | Icon set                     |
| [Sonner](https://sonner.emilkowal.ski/)                   | ^2.0    | Toast notifications          |
| [next-themes](https://github.com/pacocoursey/next-themes) | ^0.4    | Dark/light theme support     |

### Forms & Validation

| Technology                                                          | Purpose                          |
| ------------------------------------------------------------------- | -------------------------------- |
| [React Hook Form](https://react-hook-form.com/)                     | Performant form state management |
| [Zod](https://zod.dev/)                                             | Schema-based runtime validation  |
| [@hookform/resolvers](https://github.com/react-hook-form/resolvers) | RHF + Zod integration            |

### Internationalization

| Technology                                           | Purpose                      |
| ---------------------------------------------------- | ---------------------------- |
| [@formatjs/intl-localematcher](https://formatjs.io/) | Locale negotiation logic     |
| [negotiator](https://github.com/jshttp/negotiator)   | HTTP Accept-Language parsing |

### Testing

| Technology                                               | Purpose                     |
| -------------------------------------------------------- | --------------------------- |
| [Vitest](https://vitest.dev/)                            | Unit test runner            |
| [@testing-library/react](https://testing-library.com/)   | Component testing utilities |
| [@vitest/coverage-v8](https://vitest.dev/guide/coverage) | Code coverage reporting     |

---

## ⚙️ Setup & Configuration

### 1. Prerequisites

- Node.js >= 20
- [PNPM](https://pnpm.io/) >= 9

```bash
npm install -g pnpm
```

### 2. Clone & Install

```bash
git clone https://github.com/your-org/coficode-auth.git my-app
cd my-app
pnpm install
```

### 3. Environment Variables

Copy the example file and fill in your Supabase credentials:

```bash
cp .env.example .env
```

```env
# .env
NEXT_PUBLIC_SUPABASE_URL="https://<your-project>.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<your-publishable-key>"
```

> 🔑 Get these values from your [Supabase project dashboard](https://supabase.com/dashboard) under **Project Settings → API**.

### 4. Supabase Auth Configuration

In your Supabase dashboard, ensure the following are enabled:

- ✅ **Email/Password** provider (Authentication → Providers)
- ✅ **Site URL** set to `http://localhost:3000` (Authentication → URL Configuration)
- ✅ **Redirect URLs** include `http://localhost:3000/**`

### 5. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) — you'll be redirected to `/es` (default locale).

| Route                 | Description            |
| --------------------- | ---------------------- |
| `/es/login`           | Login page (Spanish)   |
| `/en/login`           | Login page (English)   |
| `/es/register`        | Registration page      |
| `/es/forgot-password` | Password recovery page |

---

## 🧪 Testing

```bash
# Run all unit tests
pnpm test

# Watch mode
pnpm test:watch

# Coverage report
pnpm test:coverage
```

Coverage reports are generated in the `/coverage` directory.

---

## 📦 Available Scripts

| Script               | Description                    |
| -------------------- | ------------------------------ |
| `pnpm dev`           | Start development server       |
| `pnpm build`         | Build production bundle        |
| `pnpm start`         | Start production server        |
| `pnpm lint`          | Run ESLint checks              |
| `pnpm test`          | Run unit tests                 |
| `pnpm test:watch`    | Run tests in watch mode        |
| `pnpm test:coverage` | Run tests with coverage report |

---

## 🌍 Adding a New Language

1. Add the locale to `src/infrastructure/i18n/config.ts`:

```ts
export const i18nConfig = {
  defaultLocale: "es",
  locales: ["es", "en", "fr"], // ← add here
} as const;
```

2. Create the dictionary file at `src/infrastructure/i18n/dictionaries/fr.json` following the structure of existing dictionaries.

3. The middleware and `LanguageSwitcher` component will pick it up automatically.

---

## 🚀 Deployment

This project is optimized for deployment on [Vercel](https://vercel.com).

1. Push the repository to GitHub.
2. Import the project in Vercel.
3. Set the environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
4. Deploy.

For other platforms (Railway, Render, Fly.io), ensure the Node.js version is >= 20 and the build command is `pnpm build`.

---

## 🔧 Extending the Template

### Add a New Use Case

1. Create the DTO in `src/domain/dtos/`
2. Add the method signature to `src/domain/repositories/IAuthRepository.ts`
3. Implement it in `src/infrastructure/repositories/`
4. Orchestrate it in `src/domain/useCases/AuthUseCase.ts`
5. Expose it via a Server Action in `src/infrastructure/http/`

### Add a New UI Component

```bash
pnpm dlx shadcn@latest add <component-name>
```

Components are added to `src/presentation/components/ui/`.

---

## 📄 License

MIT — Free to use, modify, and distribute.

---

<div align="center">
  Made with ❤️ by <strong>CofiCode</strong>
</div>

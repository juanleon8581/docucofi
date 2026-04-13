# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev            # Start development server (http://localhost:3000)
pnpm build          # Build production bundle
pnpm lint           # Run ESLint
pnpm test           # Run all tests (vitest run)
pnpm test:watch     # Run tests in watch mode
pnpm test:coverage  # Run tests with coverage (100% threshold enforced)
```

Run a single test file:
```bash
pnpm vitest run src/domain/useCases/__tests__/AuthUseCase.test.ts
```

## Stack

| Categoría | Tecnología |
|-----------|------------|
| Framework | Next.js 16 (App Router, SSR, RSC) |
| Lenguaje | TypeScript strict |
| UI | React 19 |
| Estilos | Tailwind CSS v4 via `@tailwindcss/postcss` |
| Componentes | shadcn/ui (new-york, neutral, lucide) |
| Formularios | react-hook-form + @hookform/resolvers |
| Validación | Zod v4 |
| Estado global | Zustand |
| Theming | next-themes (dark mode via class) |
| Toasts | Sonner |
| PDF | @react-pdf/renderer |
| Auth/DB | Supabase (`@supabase/ssr`) |
| Package manager | pnpm |
| Path alias | `@` → `src/` |

## Architecture

This project follows **Clean Architecture** with strict layer separation:

```
domain → infrastructure → presentation → app
```

```
src/
├── domain/           # Entities, interfaces, use cases, DTOs, domain errors
├── infrastructure/   # Adapters: Supabase, Zod schemas, i18n config + dictionaries
├── presentation/     # React components and hooks (shadcn/ui + Tailwind v4)
├── app/[lang]/       # Next.js App Router pages (i18n-based routing)
│   └── route/
│       ├── page.tsx
│       ├── actions.ts   # Server Actions (boundary between UI and infra)
│       └── components/
├── proxy.ts          # Next.js middleware: locale detection + redirects
└── test/
    └── vitest.setup.ts
```

### Components organization

Feature-based structure under `presentation/components/`:

```
components/
└── MiFeature/
    ├── MiFeature.tsx
    ├── hooks/
    └── __test__/
        └── MiFeature.test.tsx
```

### Key patterns

**Server Components by default** — only add `'use client'` when hooks, browser events, or local state are needed.

**Server Actions** (`src/app/[lang]/*/actions.ts`) are the boundary between UI and infrastructure. They instantiate `SupabaseAuthAdapter` directly (not through `AuthUseCase`) — see `loginAction` for the pattern.

**i18n** is URL-based (`/en/...`, `/es/...`). `src/proxy.ts` handles locale detection and redirects. Default locale is `es`. To add a locale: update `src/infrastructure/i18n/config.ts` and add a dictionary JSON under `src/infrastructure/i18n/dictionaries/`.

**Dependency injection**: `AuthUseCase` takes an `AuthRepository` interface in its constructor — pass a `SupabaseAuthAdapter` instance. Tests mock the repository interface.

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL="https://<project>.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<publishable-key>"
```

Copy from `.env.example`.

## Testing

**Stack:** Vitest + jsdom + @testing-library/react + @testing-library/jest-dom + @vitest/coverage-v8

Coverage is enforced at **100%** for `src/domain/` and `src/infrastructure/`. Excluded from coverage:
- `src/app/**` and `src/presentation/**`
- Supabase client factory files
- `src/infrastructure/i18n/dictionaries/index.ts`
- Domain interfaces/repositories and `src/proxy.ts`

See `vitest.config.ts` for the full exclusion list.

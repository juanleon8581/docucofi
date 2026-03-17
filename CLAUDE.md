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

## Architecture

This project follows **Clean Architecture** with strict layer separation:

```
domain → infrastructure → presentation → app
```

- **`src/domain/`** — Pure business logic, zero framework dependencies. Contains entities, DTOs, repository interfaces (`IAuthRepository`), use cases (`AuthUseCase`), domain errors, and validation/auth message constants.
- **`src/infrastructure/`** — Framework adapters and external integrations. `SupabaseAuthAdapter` implements `IAuthRepository`. Zod validation schemas live here (not in domain). Also contains i18n config and dictionaries.
- **`src/presentation/`** — React components and hooks. UI components use shadcn/ui + Tailwind v4.
- **`src/app/[lang]/`** — Next.js App Router pages. Each route has `page.tsx`, `actions.ts` (Server Actions), and a `components/` subfolder.

### Key patterns

**Server Actions** (`src/app/[lang]/*/actions.ts`) are the boundary between the UI and infrastructure. They instantiate `SupabaseAuthAdapter` directly (not through `AuthUseCase`) — see `loginAction` for the pattern.

**i18n** is URL-based (`/en/...`, `/es/...`). `src/proxy.ts` is the Next.js middleware that handles locale detection and redirects. Default locale is `es`. To add a locale: update `src/infrastructure/i18n/config.ts` and add a dictionary JSON under `src/infrastructure/i18n/dictionaries/`.

**Dependency injection**: `AuthUseCase` takes an `AuthRepository` interface in its constructor — pass a `SupabaseAuthAdapter` instance. Tests mock the repository interface.

### Environment variables

```env
NEXT_PUBLIC_SUPABASE_URL="https://<project>.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<publishable-key>"
```

Copy from `.env.example`.

### Testing notes

Coverage is enforced at 100% for `src/domain/` and `src/infrastructure/` (excluding Supabase client factory files and `src/presentation/`). Tests use jsdom + Testing Library. Vitest config is at `vitest.config.ts`.

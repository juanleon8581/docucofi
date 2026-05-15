# DocuCofi

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20DB-3ECF8E?style=for-the-badge&logo=supabase)
![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?style=for-the-badge&logo=tailwindcss)

**Generate legal and administrative documents in seconds using ready-to-use templates.**

</div>

---

## What is DocuCofi

DocuCofi is a web app that simplifies formal document generation for freelancers and small teams. Instead of opening a word processor, hunting for a generic model, and manually adjusting it every time — users pick a template, fill in the fields, and get a ready-to-download document.

The initial focus is documents commonly used in Colombia (invoices, service receipts, contracts), with multi-language support built in from the start.

---

## What's available today

| Feature | Status |
|---|---|
| Authentication (login / register / forgot password) | Available |
| Template catalog | Available |
| Template: Service Invoice (*Cuenta de Cobro*) | Available |
| Template: Service Invoice with date range | Available |
| PDF generation per template | Available |
| ES / EN support | Available |
| Dark / light mode | Available |

---

## Stack

| Category | Technology |
|---|---|
| Framework | Next.js 16 (App Router, SSR, RSC) |
| Language | TypeScript strict |
| UI | React 19 + shadcn/ui + Tailwind CSS v4 |
| Forms | React Hook Form + Zod |
| Global state | Zustand |
| Auth / DB | Supabase (`@supabase/ssr`) + Prisma |
| PDF | @react-pdf/renderer |
| Toasts | Sonner |
| Theming | next-themes |
| Package manager | pnpm |

---

## Architecture

Clean Architecture with strict layer separation:

```
domain → infrastructure → presentation → app
```

```
src/
├── domain/           # Entities, interfaces, use cases, domain errors
├── infrastructure/   # Supabase, Zod schemas, Prisma, i18n, mappers, PDF templates
├── presentation/     # React components and hooks
└── app/[lang]/       # Next.js routes with i18n — each route has page.tsx + actions.ts
```

The domain layer has zero dependencies on Next.js, Supabase, or React — fully testable and portable.

---

## Setup

### Requirements

- Node.js >= 20
- pnpm >= 9

### Install

```bash
git clone https://github.com/juanleon8581/docucofi.git
cd docucofi
pnpm install
```

### Environment variables

```bash
cp .env.example .env
```

```env
NEXT_PUBLIC_SUPABASE_URL="https://<project>.supabase.co"
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY="<publishable-key>"

DATABASE_URL="postgresql://postgres.[ref]:[pass]@pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres.[ref]:[pass]@db.supabase.co:5432/postgres"
```

### Database

```bash
pnpm prisma generate
pnpm prisma migrate dev
```

### Dev server

```bash
pnpm dev   # http://localhost:3000
```

The middleware redirects `/` to `/es` (default locale) on first load.

---

## Scripts

| Command | Description |
|---|---|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build |
| `pnpm lint` | Run ESLint |
| `pnpm test` | Run unit tests |
| `pnpm test:watch` | Run tests in watch mode |
| `pnpm test:coverage` | Coverage report (100% threshold on domain and infrastructure) |

---

## Internationalization

URL-based routing: `/es/...`, `/en/...`. To add a locale:

1. Add the locale to `src/infrastructure/i18n/config.ts`
2. Create the dictionary at `src/infrastructure/i18n/dictionaries/<locale>.json`

The middleware and `LanguageSwitcher` component pick it up automatically.

---

## License

MIT

---

<div align="center">
  Made with ❤️ by <strong>CofiCode</strong>
</div>

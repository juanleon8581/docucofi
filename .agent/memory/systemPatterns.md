# System Patterns

## Architectural Principles

1. **High Parameterization**: External API keys, public variables, and dynamic logos must be referenced primarily by the `process.env` object.
2. **Ready Boilerplate**: Sub-structures (folders) and primary dependencies like UI components (Tailwind + Shadcn) and authentication must already be installed and configured.
3. **Next.js App Router**: Standard use of server components (`page.tsx`, `layout.tsx`) and clients only through the `'use client'` directive.
4. **Adapter Pattern for External Services**: Any third-party integration (e.g., Supabase) MUST be wrapped in an Adapter implementation located in the Infrastructure layer. These adapters implement a strict Port (Interface) defined in the Domain layer. Direct use of third-party SDKs outside the Infrastructure layer is forbidden.

## Code Patterns

1. **Pure Components**: Minimal use of states when the React Server Component architecture allows it.
2. **Centralized Validation**: All UI forms use asynchronous validation through declarative schemas in Zod, orchestrated by React Hook Form.
3. **UI Injection**: Pre-styled components using Tailwind classes and structured based on directives created under Shadcn UI.
4. **Solid Testing**: Tests developed following the Vitest + React Testing Library pattern.

## System Roles

- **Contextualized Agents (Memory Bank)**: Read the base files in this directory to locate themselves in the initial and long-term focus of the system.

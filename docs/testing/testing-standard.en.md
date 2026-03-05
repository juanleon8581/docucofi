# Unit Testing Standard (TDD)

This project adopts a **Test-Driven Development (TDD)** approach, ensuring that code design is guided by its requirements and verifications from the very beginning.

To achieve this, we use **Vitest** as our primary test runner and **React Testing Library** for tests focused on user behavior and the DOM.

## Rules and Testing Guidelines

### 1. TDD Approach

- **All new code** or substantial changes to logic must be driven by and include unit tests.
- The recommended development cycle is the classic TDD loop: _Red (Failing test) -> Green (Implementation & passing test) -> Refactor (Code improvement)_.

### 2. Strict Coverage (100%)

- By employing TDD, we aim for a code coverage of **100%**.
- Vitest configuration will measure lines, functions, branches, and statements to ensure we operate under this strict standard.

### 3. Co-location Principle ("Co-located tests")

- All tests must be **located in the same directory** alongside the source file they are verifying.
- This facilitates navigation and file identifier reading, and promotes a truly isolated component architecture.
- **Example of correct structure:**
  ```text
  src/
  └── presentation/
      └── components/
          ├── ComponentOne.tsx
          └── ComponentOne.test.tsx
  ```

### 4. Global Configuration (`setup`)

- Any setup or mock needed globally for all layers (for instance, extending `expect` with Testing Library's `jest-dom`) should be centralized in `src/vitest.setup.ts`.

## Available Commands

- `pnpm run test` (or `pnpm test`): Runs the entire test suite once.
- `pnpm run test:watch` (or `pnpm test:watch`): Runs tests in watch mode (ideal for continuous TDD development).
- `pnpm run test:coverage` (or `pnpm test:coverage`): Generates the full report, proving whether the 100% coverage threshold is met.

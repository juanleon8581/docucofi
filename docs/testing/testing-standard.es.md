# Estándar de Pruebas Unitarias (TDD)

Este proyecto adopta un enfoque de **Desarrollo Guiado por Pruebas (TDD - Test-Driven Development)**, garantizando que el diseño del código esté guiado por sus requisitos y verificaciones desde el primer momento.

Para esto, empleamos **Vitest** como nuestro _test runner_ principal y **React Testing Library** para las pruebas enfocadas en el comportamiento del usuario y el DOM.

## Reglas y Directrices de Pruebas

### 1. Enfoque TDD

- **Todo código nuevo** o cambio sustancial en la lógica debe incluir pruebas unitarias.
- El ciclo de desarrollo recomendado es el clásico de TDD: _Red (Prueba que falla) -> Green (Implementación y prueba exitosa) -> Refactor (Mejora del código)_.

### 2. Cobertura Estricta (100%)

- Al emplear TDD, buscamos una cobertura (Coverage) del **100%**.
- La configuración de Vitest se encargará de medir líneas, funciones, ramas de ejecución y declaraciones para asegurar que operemos bajo este estándar estricto.

### 3. Principio de Co-ubicación ("Co-located tests")

- Todas las pruebas deben estar **ubicadas en el mismo directorio** junto al archivo fuente que están verificando.
- Esto facilita la navegación, lectura de identificadores de archivo y promueve una arquitectura de componentes verdaderamente aislados.
- **Ejemplo de estructura correcta:**
  ```text
  src/
  └── presentation/
      └── components/
          ├── ComponentOne.tsx
          └── ComponentOne.test.tsx
  ```

### 4. Configuración Global (`setup`)

- Cualquier configuración o mock que sea necesario a nivel global para todas las capas (por ejemplo, extender `expect` con `jest-dom` de Testing Library) se debe centralizar en `src/vitest.setup.ts`.

## Comandos Disponibles

- `pnpm run test` (o `pnpm test`): Ejecuta toda la suite de pruebas una vez.
- `pnpm run test:watch` (o `pnpm test:watch`): Ejecuta las pruebas en modo de observación (ideal para desarrollo continuo con TDD).
- `pnpm run test:coverage` (o `pnpm test:coverage`): Genera el reporte completo evidenciando si se cumple el umbral del 100%.

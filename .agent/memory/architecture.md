# Clean Architecture & App Router

## High-Level Architecture

This project utilizes Clean Architecture integrated with the Next.js App Router.

- **Presentation (`src/app/`, `src/presentation/`)**: Contains Next.js routing, UI components, custom hooks, and global state. Depends on Domain and Infrastructure layers.
- **Domain (`src/domain/`)**: Emphasizes business logic, containing Entities, Repository interfaces, and Use Cases. Strictly no external dependencies.
- **Infrastructure (`src/infrastructure/`)**: Contains concrete implementations of domain repositories, HTTP clients, and third-party APIs/services. Depends strictly on the Domain layer.

## Third-Party Integrations (Adapter Pattern)

To guarantee low coupling and preserve Clean Architecture, the **Adapter Pattern** is strictly enforced for external libraries (e.g., Supabase, Payment Gateways):

1. **Ports (Domain)**: Define interfaces (e.g., `IAuthRepository`) in the Domain layer that dictate what the application requires.
2. **Adapters (Infrastructure)**: Implement these interfaces in the Infrastructure layer (e.g., `SupabaseAuthAdapter`). The external SDK is ONLY imported and used within these adapter implementations.
3. **Usage**: The Presentation layer and Use Cases strictly rely on the Domain interfaces. Adapters are passed via Dependency Injection.

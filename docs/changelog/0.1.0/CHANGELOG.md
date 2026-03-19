# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-19

### ✨ Added

- Implement route protection and structural differentiation of zones (internal/external).
- Add internal dashboard layout with a custom header, sidebar and user avatar.
- Implement collapsible sidebar UI with Shadcn components (sidebar assistant, sheet, separator, skeleton, tooltip).
- Add `use-mobile` hook for responsive UI.
- Implement user logout functionality including server action (`logoutAction`), client hook (`useLogout`), domain layers (`AuthUseCase`, `IAuthRepository`) and UI integration in `UserAvatar`.
- Add comprehensive unit tests for domain entities, messages, internationalization and infrastructure mappers.

### 🔄 Changed

- Refactor architectural structure to divide application into authenticated and unauthenticated zones.
- Update `InternalHeader` and `Sidebar` to integrate with new dashboard layout.
- Update `UserAvatar` to inclusion of logout menu item.
- Update middleware (`src/proxy.ts`) with redirect logic for route protection.
- Update `vitest.config.ts` to include/exclude new files and paths from coverage.
- Reposition sidebar to support absolute positioning for desktop hover effect.

### 🩹 Fixed

- Ensure unique React keys for sidebar menu groups and items.

### 🔧 Chores

- Update context agent file.
- Add local settings file for claude.

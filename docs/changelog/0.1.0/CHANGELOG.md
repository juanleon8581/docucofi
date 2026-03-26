# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-26

### ✨ Added

- 🆕 Add auto-fill for `cuentaDeCobro` fields from authenticated user metadata
- 🆕 Add user settings page with profile form for personalized document generation
- 🆕 Implement `updateProfile` in `SupabaseAuthAdapter` and extend data mappers
- 🆕 Add user profile fields to domain and implementation of `UpdateProfileDTO`
- 🆕 Add internationalization Support for `cuenta-de-cobro-concepto-fechas`
- 🆕 Add settings page translations and `phoneInvalid` validation key 🌐

### 🔄 Changed

- 🏗️ Configure `/settings` as an authenticated-only path and link it in the sidebar
- 🎨 Center home page layout and enhance `DatePicker` with accent color 💄
- 🗑️ Remove placeholder template from available options

### 🐛 Fixed

- 🐞 Synchronize template field keys with user metadata structure
- 🛡️ Add safety guards against null values in `TemplateCuentaDeCobro` dates
- 🔄 Fix redirection logic to send authenticated users to `/templates`
- 🌐 Include root path `/` in public accessible paths

### 🧪 Tests

- ✅ Implement integration tests for profile updates, mappers, and schemas
- ✅ Add unit tests for profile fields, `UpdateProfileDTO`, and `updateProfile` use case
- 📈 Improve overall test coverage for infrastructure and domain layers

# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-26

### ✨ Added

- 🆕 Add auto-fill for `cuentaDeCobro` fields from authenticated user metadata ✨
- 🆕 Add user settings page with profile form for personalized document generation ✨
- 🆕 Implement `updateProfile` in `SupabaseAuthAdapter` and extend data mappers ✨
- 🆕 Add user profile fields to domain and implementation of `UpdateProfileDTO` ✨
- 🆕 Add internationalization Support for `cuenta-de-cobro-concepto-fechas` 🌐
- 🆕 Add settings page translations and `phoneInvalid` validation key 🌐
- New `TemplateCuentaDeCobro` template component for "Cuenta de Cobro" document generation
- `Previewer` component for real-time document preview with responsive visual styles
- `DynamicForm` component to automatically generate interactive forms from template definitions
- `DatePicker` component with support for single and multiple date selection modes
- `FileInput` component with image preview and `FileReader` integration for file uploads
- `useTemplateStore` using Zustand for high-performance dynamic template state management
- `NumberToWordsAdapter` infrastructure for converting numeric values to Spanish text representation
- `DateAdapter` infrastructure for ISO serialization and localized formatting
- `TemplateField` domain entity and updated `FieldType` union to support more field types
- Several Shadcn UI components: `scroll-area`, `collapsible`, `calendar`, and `popover`
- Native support for automatic value formatting (e.g., date formatting and number-to-words conversion) in templates

### 🔄 Changed

- 🏗️ Configure `/settings` as an authenticated-only path and link it in the sidebar
- 🎨 Center home page layout and enhance `DatePicker` with accent color 💄
- 🗑️ Remove placeholder template from available options
- Improved `CollapsiblePanel` component with landscape-oriented responsive breakpoints
- Enhanced `CollapsiblePanel` flexibility by adding `className` prop support
- Refactored template registry to support dynamic fields and centralized registration
- Extracted and centralized template dictionary helpers for cleaner component wiring
- Polished overall visual appearance of dynamic forms inside the collapsible layout

### 🐛 Fixed

- 🐞 Synchronize template field keys with user metadata structure
- 🛡️ Add safety guards against null values in `TemplateCuentaDeCobro` dates
- 🔄 Fix redirection logic to send authenticated users to `/templates`
- 🌐 Include root path `/` in public accessible paths
- Resolved layout overflow issues by constraining the main container to the viewport height
- Fixed CSS animation glitches when closing panels in the user interface
- Updated existing test suites to align with new responsive classname structures

### 🧪 Tests

- ✅ Implement integration tests for profile updates, mappers, and schemas
- ✅ Add unit tests for profile fields, `UpdateProfileDTO`, and `updateProfile` use case
- 📈 Improve overall test coverage for infrastructure and domain layers
- Comprehensive unit tests for `useTemplateStore` logic
- Unit and integration tests for `DynamicForm` and `TemplateCuentaDeCobro` components
- Regression fixes for UI component style assertions

### 🔧 Chore

- Integrated `prettier-plugin-tailwindcss` for consistent Tailwind CSS class ordering
- Updated project dependencies with `date-fns` and `to-words` libraries
- Refined local development settings for Claude AI assistant

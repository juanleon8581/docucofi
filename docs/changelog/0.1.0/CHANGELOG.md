# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2026-03-23

### ✨ Added

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

- Improved `CollapsiblePanel` component with landscape-oriented responsive breakpoints
- Enhanced `CollapsiblePanel` flexibility by adding `className` prop support
- Refactored template registry to support dynamic fields and centralized registration
- Extracted and centralized template dictionary helpers for cleaner component wiring
- Polished overall visual appearance of dynamic forms inside the collapsible layout

### 🐛 Fixed

- Resolved layout overflow issues by constraining the main container to the viewport height
- Fixed CSS animation glitches when closing panels in the user interface
- Updated existing test suites to align with new responsive classname structures

### 🧪 Tests

- Comprehensive unit tests for `useTemplateStore` logic
- Unit and integration tests for `DynamicForm` and `TemplateCuentaDeCobro` components
- Regression fixes for UI component style assertions

### 🔧 Chore

- Integrated `prettier-plugin-tailwindcss` for consistent Tailwind CSS class ordering
- Updated project dependencies with `date-fns` and `to-words` libraries
- Refined local development settings for Claude AI assistant

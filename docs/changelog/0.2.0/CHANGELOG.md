# Changelog

## [0.2.0] - 2026-04-13

### Added

- Add `updateField` key to i18n dictionaries (58b0d60)
- Wire template pages to database via server actions with error handling (fa50009)
- Add `TemplateFieldMapper` to bridge database fields to presentation layer (943fbc5)
- Add unit tests for `Template` and `UserTemplateData` domain and infrastructure layers (81955c9)
- Add Prisma repository adapters for `Template` and `UserTemplateData` (b63dd69)
- Add Zod schema generator for dynamic template fields (f7afac5)
- Add `TemplateUseCase` and `UserTemplateDataUseCase` (431d113)
- Add `UserTemplateData` DTOs with validation factory (2bc0bfd)
- Add `Template` and `UserTemplateData` repository contracts (04e36c1)
- Add `Template` and `UserTemplateData` domain entities (067a7ae)
- Add `templates` and `user_template_data` database tables with seed data (daea1ce)
- Set up Prisma ORM with Supabase PostgreSQL connection (c23e78f)

### Changed

- Replace inline buttons with shadcn `Button` component in `TemplateCuentaDeCobro` (8ae9026)
- Expose `isAuto` separately on `TemplateFieldDefinition` (6b65f63)
- Replace static field registry with component map in presentation layer (a10567e)
- Convert `Template` and `UserTemplateData` to classes with `fromRaw` factory (c9526f8)
- Update coverage config for `Template` and `UserTemplateData` entity classes (4542863)
- Exclude new domain entities from coverage thresholds (d4ecd5c)
- Add `tsx` dependency for Prisma seed script execution (93b260d)
- Update config and documentation for Prisma setup (b3f1e6a)
- Add `prisma`, `@prisma/adapter-pg`, and `dotenv` dependencies (1fb7532)

### Removed

- Remove in-memory template registry (d95b9f3)

### Fixed

- Fix Zod v4 `ZodRawShape` readonly incompatibility in `templateSchemas` (e34c473)
## [0.2.0] - 2026-04-12

### Added

- Add robots.txt, sitemap, and web manifest files (28e2686)

### Changed

- Add NEXT_PUBLIC_SITE_URL environment variable (aca069e)

### Fixed

- Configure metadataBase and fix title template in layout (ba74d90)
- Fix middleware matcher pattern (28e2686)

[0.2.0]: https://keepachangelog.com/en/1.1.0/

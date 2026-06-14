# Stack Research: BIOMIX Feasibility Engine

**Researched:** 2026-06-14
**Source:** `BIOMIX_Feasibility_Engine_Blueprint.md`
**Confidence:** HIGH for project-specific stack because the blueprint is explicit; MEDIUM for exact dependency versions until install time verifies package availability.

## Recommended Stack

- Next.js 15+ with App Router: primary application framework for dashboard pages, input pages, report pages, and future backend route/API expansion.
- TypeScript: required for safe formula contracts and scenario/result types.
- Tailwind CSS: styling system for the industrial-finance dashboard.
- shadcn/ui: component foundation for forms, tables, dialogs, tabs, and controls.
- Recharts: cost breakdown, revenue vs OPEX, sensitivity, and tornado charts.
- Lucide React: icon set for navigation, actions, KPI affordances, status, and export controls.
- React Hook Form: performant form state for multi-section scenario inputs.
- Zod: validation schema for scenario inputs and conditional pricing/financing rules.
- Zustand: lightweight global scenario store and local storage integration.
- Vitest: unit test runner for calculation engine.
- PDF/CSV/JSON export: `jspdf` plus `html2canvas` for simple PDF, `papaparse` for CSV, native JSON import/export.

## Version Guidance

Use latest stable package versions available at implementation time, but keep formulas independent of UI library versions. The calculation engine should remain plain TypeScript and easy to test outside Next.js rendering.

## Not Recommended for MVP

- Supabase/PostgreSQL/Prisma: defer until v2 after local-first workflow is validated.
- Auth providers: not needed for local MVP.
- Realtime collaboration frameworks: not core to feasibility math.
- AI SDK or LLM advisor: defer; AI may explain calculation results later but must not calculate them.

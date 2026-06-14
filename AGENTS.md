<!-- GSD:project-start source:PROJECT.md -->
## Project

**BIOMIX Feasibility Engine**

BIOMIX Feasibility Engine is a web application for simulating biomass pellet production feasibility using CAPEX, OPEX, production capacity, feedstock quality, GCV, moisture, pricing, transport, financing, and cashflow assumptions. It is aimed at biomass pellet founders/producers, investors, production operators, and commercial/offtaker teams who need a decision dashboard rather than a simple margin calculator.

The source blueprint is `BIOMIX_Feasibility_Engine_Blueprint.md` in this repository. That document remains the detailed source of truth for formulas, default scenarios, UI direction, and MVP acceptance criteria.

**Core Value:** The app must answer whether a biomass pellet project is profitable, why, and under which assumptions, with every business number traceable to a tested calculation formula.

### Constraints

- **Calculation isolation**: All primary formulas must live under `src/lib/calculations/` - JSX/TSX must not contain business formulas.
- **Type safety**: Use TypeScript types for scenario input and result output - formula correctness must be reviewable and testable.
- **Testing**: Use Vitest for unit tests around formula outputs - at minimum HPT, transport trips, HPP denominator, and GCV conversion.
- **Persistence**: Use local storage and JSON import/export for MVP - backend storage is v2.
- **Currency**: Display all money in Indonesian Rupiah by default - USD is only an input for HBA/HPT formulas.
- **Language**: UI copy should be Indonesian and business-friendly.
- **Design**: Visual direction is premium industrial-finance dashboard, dark default, data-dense, not an Excel-like single-page calculator.
- **MVP boundary**: No auth, multi-company database, realtime collaboration, AI advisor, contract analyzer, or live HBA/kurs integration in v1.
- **Launch/dev ports**: Before starting any dev server or preview server, check currently used ports and choose an unused port so BIOMIX does not collide with existing VPS apps.
<!-- GSD:project-end -->

<!-- GSD:stack-start source:research/STACK.md -->
## Technology Stack

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
## Not Recommended for MVP
- Supabase/PostgreSQL/Prisma: defer until v2 after local-first workflow is validated.
- Auth providers: not needed for local MVP.
- Realtime collaboration frameworks: not core to feasibility math.
- AI SDK or LLM advisor: defer; AI may explain calculation results later but must not calculate them.
<!-- GSD:stack-end -->

<!-- GSD:conventions-start source:CONVENTIONS.md -->
## Conventions

Conventions not yet established. Will populate as patterns emerge during development.
<!-- GSD:conventions-end -->

<!-- GSD:architecture-start source:ARCHITECTURE.md -->
## Architecture

Architecture not yet mapped. Follow existing patterns found in the codebase.
<!-- GSD:architecture-end -->

<!-- GSD:skills-start source:skills/ -->
## Project Skills

No project skills found. Add skills to any of: `.claude/skills/`, `.agents/skills/`, `.cursor/skills/`, `.github/skills/`, or `.codex/skills/` with a `SKILL.md` index file.
<!-- GSD:skills-end -->

<!-- GSD:workflow-start source:GSD defaults -->
## GSD Workflow Enforcement

Before using Edit, Write, or other file-changing tools, start work through a GSD command so planning artifacts and execution context stay in sync.

Use these entry points:
- `/gsd-quick` for small fixes, doc updates, and ad-hoc tasks
- `/gsd-debug` for investigation and bug fixing
- `/gsd-execute-phase` for planned phase work

Do not make direct repo edits outside a GSD workflow unless the user explicitly asks to bypass it.
<!-- GSD:workflow-end -->



<!-- GSD:profile-start -->
## Developer Profile

> Profile not yet configured. Run `/gsd-profile-user` to generate your developer profile.
> This section is managed by `generate-claude-profile` -- do not edit manually.
<!-- GSD:profile-end -->

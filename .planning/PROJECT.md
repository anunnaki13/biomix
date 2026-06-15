# BIOMIX Feasibility Engine

## What This Is

BIOMIX Feasibility Engine is a web application for simulating biomass pellet production feasibility using CAPEX, OPEX, production capacity, feedstock quality, GCV, moisture, pricing, transport, financing, and cashflow assumptions. It is aimed at biomass pellet founders/producers, investors, production operators, and commercial/offtaker teams who need a decision dashboard rather than a simple margin calculator.

The source blueprint is `BIOMIX_Feasibility_Engine_Blueprint.md` in this repository. That document remains the detailed source of truth for formulas, default scenarios, UI direction, and MVP acceptance criteria.

## Core Value

The app must answer whether a biomass pellet project is profitable, why, and under which assumptions, with every business number traceable to a tested calculation formula.

## Requirements

### Validated

- ✓ Local-first BIOMIX feasibility MVP ships with a tested calculation engine, editable assumptions, dashboard, analysis, and report export flows. — v1.0 MVP
- ✓ Users can input production, feedstock, quality, pricing, OPEX, CAPEX, transport, and financing assumptions without backend setup. — v1.0 MVP
- ✓ Users can compare scenarios, persist them locally, and export JSON/CSV/PDF-friendly outputs for review. — v1.0 MVP

### Active

- [ ] Add guided onboarding and progress tracking so first-time users know where to start, what is incomplete, and what to do next.
- [ ] Improve data-entry ergonomics for large CAPEX/OPEX/feedstock datasets with better summary, grouping, and review affordances.
- [ ] Polish report and print outputs so BIOMIX is easier to share in investor, internal, and offtaker review contexts.
- [ ] Add lightweight readiness signals that connect input completeness, validation status, and feasibility status in one clear flow.

### Out of Scope

- Login, user accounts, and auth - deferred until a backend is introduced after MVP.
- Multi-company database and team collaboration - not required while MVP uses local storage.
- Supabase/PostgreSQL/Prisma persistence - planned for v2 after the local-first MVP proves useful.
- AI chat advisor - useful future explanation layer, but it must not replace the deterministic calculation engine.
- Contract PDF/DOCX analyzer - future feature after pricing, quality, and scenario basics are stable.
- Realtime HBA/currency/supplier/offtaker integrations - defer until formulas and manual workflows are validated.

## Context

The old BIOMIX assumptions in the blueprint provide starting presets, not hardcoded answers:

- 15 TPD rice husk pellet: 25 operating days/month, 375 tons/month, GCV around 3,800 kcal/kg, target moisture below 20% to 25%, yield around 92%, legacy HPT FOB around Rp1,084,200/ton, legacy HPP around Rp701,333/ton.
- 30 TPD seller-paid transport case: 750 tons/month, 24 ton/truck, 32 trips/month, lab cost Rp200,000/trip, transport between Rp2.5m and Rp6m/trip.
- 20 TPD mix biomass case: 500 tons/month, 50% sekam padi and 50% sawdust, starting feedstock price Rp500/kg, yield 90% to 92%, GCV target 3,700 to 3,900 kcal/kg.

The v1.0 MVP shipped on 2026-06-15 with the complete first milestone: scaffold, formulas, dashboard, forms, persistence, analysis, and report export. The immediate next need is not more core math, but clearer workflow for first-time operators and cleaner business presentation for review meetings.

The product is still local-first. It should work without backend, login, external APIs, or realtime collaboration. Business accuracy and traceable formulas remain the priority, but usability friction is now the main limiter to adoption.

## Constraints

- **Calculation isolation**: All primary formulas must live under `src/lib/calculations/` - JSX/TSX must not contain business formulas.
- **Type safety**: Use TypeScript types for scenario input and result output - formula correctness must be reviewable and testable.
- **Testing**: Use Vitest for unit tests around formula outputs - at minimum HPT, transport trips, HPP denominator, and GCV conversion.
- **Persistence**: Use local storage and JSON import/export for MVP - backend storage is v2.
- **Currency**: Display all money in Indonesian Rupiah by default - USD is only an input for HBA/HPT formulas.
- **Language**: UI copy should be Indonesian and business-friendly.
- **Design**: Visual direction is premium industrial-finance dashboard, dark default, data-dense, not an Excel-like single-page calculator.
- **MVP boundary**: No auth, multi-company database, realtime collaboration, AI advisor, contract analyzer, or live HBA/kurs integration in v1.
- **Launch/dev ports**: Before starting any dev server or preview server, check currently used ports and choose an unused port so BIOMIX does not collide with existing VPS apps.

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Build local-first MVP before backend | Blueprint explicitly says MVP should run without backend using local storage. | - Pending |
| Treat calculation engine as the product core | The app's value depends on accurate, traceable feasibility math. | - Pending |
| Use Next.js 15+ with App Router and TypeScript | Blueprint recommends this stack and it fits dashboard/forms/report workflows. | - Pending |
| Use Zustand for lightweight scenario state | Blueprint suggests Zustand or Jotai; Zustand is simple for scenario store and local persistence. | - Pending |
| Prioritize tested formulas before UI completion | Blueprint final instruction says calculation engine must be correct and tested before dashboard/forms. | - Pending |
| Keep optional backend, AI advisor, and contract analyzer in v2+ | These are explicitly marked future/non-MVP features. | - Pending |
| Check ports before launch/dev server | VPS already hosts other apps; BIOMIX must not take a port that is in use. | - Pending |
| Ship v1.0 before starting usability polish | The core product is now complete enough to shift effort from capability coverage to operator clarity. | ✓ Good |
| Treat v1.1 as a usability milestone rather than a formula milestone | Current complaints are about flow clarity and review ergonomics, not missing calculations. | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via GSD workflows):
1. Requirements invalidated? Move to Out of Scope with reason.
2. Requirements validated? Move to Validated with phase reference.
3. New requirements emerged? Add to Active.
4. Decisions to log? Add to Key Decisions.
5. "What This Is" still accurate? Update if drifted.

**After each milestone** (via `$gsd-complete-milestone`):
1. Full review of all sections.
2. Core Value check - still the right priority?
3. Audit Out of Scope - reasons still valid?
4. Update Context with current state.

---
*Last updated: 2026-06-15 after starting milestone v1.1 Usability Polish*

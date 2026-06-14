# Architecture Research: BIOMIX Feasibility Engine

**Researched:** 2026-06-14
**Source:** `BIOMIX_Feasibility_Engine_Blueprint.md`
**Confidence:** HIGH for MVP architecture because the blueprint specifies folder structure, calculation boundaries, and data flow.

## Architecture Approach

Build a local-first Next.js application with a pure TypeScript calculation core. UI components collect scenario assumptions, Zustand stores the active and saved scenarios, the calculation engine returns a structured `FeasibilityResult`, and pages render dashboards, analysis, and reports from that result.

## Major Components

1. Types: `src/types/biomass.ts` and `src/types/results.ts` define all scenario inputs and calculation outputs.
2. Defaults: `src/lib/defaults/` provides default scenarios, feedstocks, and CAPEX items.
3. Calculation engine: `src/lib/calculations/` owns all formulas and warning/status logic.
4. Validators and formatters: `src/lib/validators/` and `src/lib/formatters/` own Zod schema and IDR/number/percent display.
5. Scenario storage: `src/store/scenarioStore.ts` and `src/lib/storage/` own local storage, import, export, duplicate, and compare behavior.
6. App routes: `src/app/` exposes dashboard, scenario management, input sections, analysis, break-even, and reports.
7. Components: layout, dashboard, form controls, charts, status badges, and report preview.

## Data Flow

Scenario input -> Zod validation -> Zustand store -> `calculateFeasibility(scenario)` -> `FeasibilityResult` -> dashboard/forms/analysis/report UI.

AI and backend features, if added later, must consume the structured result. They must not replace deterministic calculations.

## Build Order

1. Scaffold project and types.
2. Implement defaults and calculation engine.
3. Lock formulas with unit tests.
4. Build dashboard from default scenario.
5. Add input forms and live recalculation.
6. Add scenario persistence and comparison.
7. Add sensitivity/break-even.
8. Add export/report.

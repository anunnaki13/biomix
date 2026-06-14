# Roadmap: BIOMIX Feasibility Engine

## Overview

The v1 roadmap turns the BIOMIX blueprint into a usable local-first feasibility dashboard. The work starts by locking the app foundation, TypeScript contracts, defaults, and validation, then builds and tests the calculation engine before expanding into dashboard, forms, scenario persistence, sensitivity, break-even, and investor/offtaker report export.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work.
- Decimal phases (2.1, 2.2): Urgent insertions, if needed later.

- [x] **Phase 1: Project Setup and Domain Skeleton** - Scaffold the runnable app, shell, domain types, defaults, validation, formatting, and repo docs.
- [x] **Phase 2: Calculation Engine** - Implement all core formulas, warning/status logic, and minimum unit tests.
- [x] **Phase 3: Dashboard UI** - Render calculated feasibility results from the default scenario.
- [x] **Phase 4: Input Forms** - Let users edit all production, feedstock, quality, pricing, OPEX, CAPEX, transport, and financing assumptions.
- [ ] **Phase 5: Scenario Management and Persistence** - Save, duplicate, delete, compare, import, and export scenarios locally.
- [ ] **Phase 6: Sensitivity and Break-Even** - Add sensitivity table, tornado chart, and break-even analysis.
- [ ] **Phase 7: Report Export and MVP Polish** - Add report page, print/PDF/CSV/JSON export, and acceptance polish.

## Phase Details

### Phase 1: Project Setup and Domain Skeleton
**Goal**: Create a runnable Next.js TypeScript app with BIOMIX routes, shell, domain contracts, defaults, validation, formatting, and documentation.
**Mode:** mvp
**Depends on**: Nothing (first phase)
**Requirements**: [SETUP-01, SETUP-02, SETUP-03, SETUP-04, DATA-01, DATA-02, DATA-03, DATA-04, DATA-05, DATA-06]
**Success Criteria** (what must be TRUE):
  1. Developer can run the app locally and open the dashboard route.
  2. App shell, route structure, and folder boundaries match the blueprint direction.
  3. Scenario/result types, default scenario data, validators, and formatters exist.
  4. README describes the BIOMIX app, features, stack, and dev commands.
**Plans**: 4 plans

Plans:
- [x] 01-01: Scaffold Next.js, TypeScript, Tailwind, shadcn/ui, charts, forms, state, validation, and test tooling.
- [x] 01-02: Create AppShell, dashboard route placeholder, navigation, and folder structure.
- [x] 01-03: Define types, default scenarios, validators, and Indonesian formatters.
- [x] 01-04: Write README and verify the app/test commands start cleanly.

### Phase 2: Calculation Engine
**Goal**: Implement deterministic BIOMIX feasibility formulas and prove the minimum blueprint test cases pass.
**Mode:** mvp
**Depends on**: Phase 1
**Requirements**: [CALC-01, CALC-02, CALC-03, CALC-04, CALC-05, CALC-06, CALC-07, CALC-08, CALC-09, CALC-10, CALC-11, TEST-01, TEST-02, TEST-03, TEST-04]
**Success Criteria** (what must be TRUE):
  1. `calculateFeasibility(defaultScenario)` returns a complete `FeasibilityResult`.
  2. HPT, transport trips, HPP denominator, and GCV conversion tests pass.
  3. HPP, margin, revenue, and per-ton/per-kg metrics use pellet output as denominator.
  4. Warning engine emits business and technical risks from blueprint rules.
**Plans**: 5 plans

Plans:
- [x] 02-01: Implement production, feedstock blending, quality, and GCV conversion calculations.
- [x] 02-02: Implement pricing, transport, OPEX, CAPEX, working capital, and financing calculations.
- [x] 02-03: Implement profit, break-even, status, and warning engine calculations.
- [x] 02-04: Wire `calculateFeasibility` and default scenario through the full engine.
- [x] 02-05: Add Vitest coverage for required formula cases and edge risks.

### Phase 3: Dashboard UI
**Goal**: Show the default BIOMIX scenario as an industrial-finance dashboard powered by the calculation engine.
**Mode:** mvp
**Depends on**: Phase 2
**Requirements**: [DASH-01, DASH-02, DASH-03, DASH-04, DASH-05]
**Success Criteria** (what must be TRUE):
  1. User can see production, price, HPP, margin, profit, capital, payback, and technical status KPI cards.
  2. User can see cost breakdown, revenue vs OPEX, and sensitivity chart placeholders or initial charts.
  3. User can see status badges and warning panel generated from engine results.
  4. Dashboard values change if the active scenario object changes.
**Plans**: 3 plans

Plans:
- [x] 03-01: Build layout, KPI cards, status badges, and warning panel.
- [x] 03-02: Build cost and revenue charts from engine result data.
- [x] 03-03: Apply industrial-finance visual polish and responsive behavior.

### Phase 4: Input Forms
**Goal**: Let users edit all MVP assumptions and recalculate feasibility in realtime.
**Mode:** mvp
**Depends on**: Phase 3
**Requirements**: [FORM-01, FORM-02, FORM-03, FORM-04, FORM-05, FORM-06]
**Success Criteria** (what must be TRUE):
  1. User can edit production, feedstock, quality, pricing, OPEX, CAPEX, transport, and financing assumptions.
  2. Zod validation blocks invalid values and incomplete mode-specific inputs.
  3. Dashboard updates automatically when assumptions change.
  4. Form pages use business-friendly Indonesian labels and preserve formula traceability.
**Plans**: 4 plans

Plans:
- [x] 04-01: Build reusable money, percent, ton, number, and mode selector controls.
- [x] 04-02: Build production, feedstock, quality, and pricing input pages.
- [x] 04-03: Build OPEX, CAPEX, transport, financing, tax, and working-capital input pages.
- [x] 04-04: Wire validation, state updates, and realtime recalculation across forms.

### Phase 5: Scenario Management and Persistence
**Goal**: Make BIOMIX useful for multiple business cases without backend storage.
**Mode:** mvp
**Depends on**: Phase 4
**Requirements**: [SCEN-01, SCEN-02, SCEN-03, SCEN-04]
**Success Criteria** (what must be TRUE):
  1. User can create, duplicate, rename, delete, and set default scenarios.
  2. Scenarios persist in browser local storage across refreshes.
  3. User can compare conservative, base case, and optimistic scenarios.
  4. User can import and export scenario JSON.
**Plans**: 3 plans

Plans:
- [ ] 05-01: Implement scenario store, local storage, active/default scenario behavior.
- [ ] 05-02: Build scenario management UI and comparison table.
- [ ] 05-03: Implement JSON import/export with validation and error handling.

### Phase 6: Sensitivity and Break-Even
**Goal**: Show which assumptions most affect profitability and what thresholds define feasibility.
**Mode:** mvp
**Depends on**: Phase 5
**Requirements**: [ANAL-01, ANAL-02, ANAL-03]
**Success Criteria** (what must be TRUE):
  1. User can run sensitivity analysis over key variables and deltas.
  2. User can view tornado impact on monthly profit.
  3. User can view break-even selling price, feedstock price, GCV, and volume.
  4. Analysis uses the same calculation engine as the dashboard.
**Plans**: 3 plans

Plans:
- [ ] 06-01: Implement sensitivity runner and result table.
- [ ] 06-02: Implement tornado chart data and visualization.
- [ ] 06-03: Build break-even analysis UI and connect to engine outputs.

### Phase 7: Report Export and MVP Polish
**Goal**: Let users produce shareable feasibility outputs and meet the blueprint MVP acceptance criteria.
**Mode:** mvp
**Depends on**: Phase 6
**Requirements**: [REPT-01, REPT-02, REPT-03, REPT-04]
**Success Criteria** (what must be TRUE):
  1. User can open a report page containing assumptions, results, risks, sensitivity, break-even, and disclaimer.
  2. User can print or export a PDF report.
  3. User can export CSV and JSON output.
  4. Blueprint acceptance criteria pass manually or through tests where practical.
**Plans**: 3 plans

Plans:
- [ ] 07-01: Build report page and print-friendly layout.
- [ ] 07-02: Implement PDF, CSV, and JSON exports.
- [ ] 07-03: Run MVP acceptance pass, fix polish gaps, and document known limits.

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Project Setup and Domain Skeleton | 4/4 | Complete | 2026-06-14 |
| 2. Calculation Engine | 5/5 | Complete | 2026-06-14 |
| 3. Dashboard UI | 3/3 | Complete | 2026-06-15 |
| 4. Input Forms | 4/4 | Complete | 2026-06-15 |
| 5. Scenario Management and Persistence | 0/3 | Not started | - |
| 6. Sensitivity and Break-Even | 0/3 | Not started | - |
| 7. Report Export and MVP Polish | 0/3 | Not started | - |

## Coverage

- v1 requirements: 47
- Requirements mapped to phases: 47
- Unmapped requirements: 0
- Total planned plans: 25

---
*Roadmap created: 2026-06-14 from BIOMIX blueprint*

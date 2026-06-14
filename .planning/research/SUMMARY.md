# Project Research Summary

**Project:** BIOMIX Feasibility Engine
**Domain:** Biomass pellet production feasibility dashboard
**Researched:** 2026-06-14
**Confidence:** HIGH for project-specific direction; MEDIUM for exact npm versions until implementation verifies packages.

## Executive Summary

BIOMIX is a local-first industrial finance dashboard for biomass pellet feasibility. The product is valuable only if the calculation engine is accurate, explainable, and tested, so the roadmap should build formulas and tests before broad UI/forms work.

The blueprint is unusually implementation-ready: it defines target users, MVP scope, tech stack, data models, formula blocks, default scenario data, warning rules, UI direction, folder structure, unit test minimums, and Codex build order. This allows GSD initialization to skip early questioning and turn the blueprint into testable requirements directly.

The main risk is false confidence from attractive dashboard numbers. Mitigation is to isolate formulas, test known cases, surface warnings, keep transport/working-capital visible, and avoid backend/AI scope until deterministic MVP workflows are solid.

## Key Findings

### Recommended Stack

Use Next.js 15+ App Router, TypeScript, Tailwind CSS, shadcn/ui, Recharts, Lucide React, React Hook Form, Zod, Zustand, and Vitest. Use `jspdf` plus `html2canvas` for simple PDF, `papaparse` for CSV, and native JSON import/export.

### Expected Features

**Must have:**
- Dashboard KPI summary, charts, status, and warnings.
- Production, feedstock, quality, pricing, OPEX, CAPEX, transport, and financing inputs.
- Deterministic calculation engine and unit tests.
- Scenario presets, local storage, duplicate/delete/default/compare, import/export JSON.
- Sensitivity, tornado, break-even, and report export.

**Defer:**
- Auth, backend database, team collaboration, AI advisor, contract analyzer, realtime integrations.

### Architecture Approach

Scenario input is validated, stored locally, passed through `calculateFeasibility`, and rendered by dashboard/analysis/report UI. Backend and AI layers can be added later as consumers of structured result JSON, not as replacements for formulas.

### Critical Pitfalls

1. Keep formulas out of JSX/TSX.
2. Use finished pellet output as HPP denominator.
3. Do not hardcode results in UI.
4. Do not hide transport or working capital.
5. Do not assume pelletization materially increases GCV without explicit drying/torrefaction assumptions.

## Implications for Roadmap

### Phase 1: Project Setup and Domain Skeleton
**Rationale:** Establish the app shell, TypeScript contracts, folder boundaries, validators, defaults, and workflow documentation before formulas/UI expand.

### Phase 2: Calculation Engine
**Rationale:** The engine is the core product. It must be built and tested before dashboard and forms become the visible product.

### Phase 3: Dashboard UI
**Rationale:** Once formulas return structured results, show the base case dashboard and make feasibility understandable.

### Phase 4: Input Forms
**Rationale:** Users need to edit assumptions and see recalculation; validation prevents invalid business states.

### Phase 5: Scenario Management
**Rationale:** The product needs multiple scenarios, persistence, comparison, and JSON portability before deeper analysis is useful.

### Phase 6: Sensitivity and Break-Even
**Rationale:** Feasibility decisions depend on knowing which variables can destroy or save margin.

### Phase 7: Report Export and MVP Polish
**Rationale:** Investor/offtaker sharing needs reports, PDF/CSV/JSON export, print styling, and final acceptance checks.

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Blueprint names the stack explicitly. |
| Features | HIGH | MVP and non-MVP lists are explicit. |
| Architecture | HIGH | Folder structure, types, engine flow, and storage mode are explicit. |
| Pitfalls | HIGH | Blueprint lists hard "do not" rules and formula risks. |

## Sources

### Primary

- `BIOMIX_Feasibility_Engine_Blueprint.md` - product, formulas, data models, roadmap, and acceptance criteria.

---
*Research completed: 2026-06-14*
*Ready for roadmap: yes*

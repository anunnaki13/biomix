# Walking Skeleton — BIOMIX Feasibility Engine

**Phase:** 1
**Generated:** 2026-06-14T00:00:00Z

## Capability Proven End-to-End

The deployed or local BIOMIX app can open a branded dashboard route inside an AppShell, load the default 20 TPD BIOMIX scenario contract, and verify that the project toolchain is ready for formula implementation.

## Architectural Decisions

| Decision | Choice | Rationale |
|---|---|---|
| Framework | Next.js App Router + TypeScript | Matches blueprint and future multi-route dashboard/report flows |
| Data layer | Local in-app defaults and Zustand state | MVP is explicitly local-first with no backend |
| Auth | None in v1 | Blueprint defers auth/backend until later |
| Deployment target | Local dev first, with port pre-check on VPS | Prevents collisions with existing VPS apps |
| Directory layout | `src/app`, `src/components`, `src/lib`, `src/store`, `src/types`, `src/tests` | Mirrors blueprint and supports later formula/UI phases |

## Stack Touched in Phase 1

- [x] Project scaffold
- [x] Routing plan
- [ ] Database read/write
- [x] UI shell
- [x] Deployment/dev environment run command with port-check rule

## Out of Scope (Deferred to Later Slices)

- Full calculation formulas
- Scenario persistence
- Sensitivity and break-even
- Report export
- Backend/auth/database
- AI advisor and contract analyzer

## Subsequent Slice Plan

- Phase 2: Deterministic BIOMIX calculation engine and unit tests
- Phase 3: Dashboard UI bound to engine outputs
- Phase 4: Editable input forms with validation and realtime recalculation
- Phase 5: Scenario persistence, comparison, import/export
- Phase 6: Sensitivity and break-even analysis
- Phase 7: Report export and MVP acceptance polish

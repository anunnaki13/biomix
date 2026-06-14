# Phase 1: Project Setup and Domain Skeleton - Context

**Gathered:** 2026-06-14
**Status:** Ready for planning

<domain>
## Phase Boundary

Phase 1 delivers the runnable BIOMIX project skeleton: Next.js app scaffold, AppShell and route layout, domain types, default scenario data, validation schema, Indonesian formatters, test/tooling setup, and repository documentation. This phase does not implement the full calculation engine yet; it prepares the project so Phase 2 can focus on deterministic formulas and tests.

</domain>

<decisions>
## Implementation Decisions

### Product core
- **D-01:** The BIOMIX blueprint file in the repo is the primary source of truth for formulas, data contracts, UI direction, and acceptance criteria.
- **D-02:** Calculation logic must live in `src/lib/calculations/`, never inside JSX or TSX.
- **D-03:** MVP remains local-first and browser-based; no backend/auth/database work belongs in this phase.

### Stack choices
- **D-04:** Use Next.js App Router with TypeScript.
- **D-05:** Use Tailwind CSS, shadcn/ui, Recharts, Lucide React, React Hook Form, Zod, Zustand, and Vitest as the core implementation stack.
- **D-06:** Use Indonesian Rupiah as the default display currency and Indonesian business-friendly UI copy.

### Phase 1 focus
- **D-07:** Phase 1 should produce a walking skeleton: app runs, dashboard route opens, AppShell exists, and the default BIOMIX scenario/types/validators are available for downstream work.
- **D-08:** Default scenario data should be based on the 20 TPD mixed biomass base case from the blueprint.
- **D-09:** Port conflicts on the VPS must be checked before launching any dev or preview server.

### the agent's Discretion
- Package manager choice if multiple standard options work.
- Exact folder-level file splitting beyond the required blueprint structure.
- Visual polish level for the initial shell, as long as it stays aligned with the industrial-finance direction.
- Exact command sequence for verifying scaffold, build, and tests.

</decisions>

<specifics>
## Specific Ideas

- App structure should follow the blueprint's route map: dashboard, scenario, input sections, analysis, and reports.
- The initial route can be a skeleton dashboard, but it should already feel like BIOMIX rather than a generic starter page.
- The project should be ready for Phase 2 to add formulas without reshuffling directories again.

</specifics>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Product blueprint
- `BIOMIX_Feasibility_Engine_Blueprint.md` — full product, formula, route, data model, test, and UX specification.

### GSD project context
- `.planning/PROJECT.md` — project identity, constraints, and explicit v1/v2 boundaries.
- `.planning/REQUIREMENTS.md` — requirement IDs and traceability for Phase 1.
- `.planning/ROADMAP.md` — Phase 1 goal, required outputs, and plan breakdown.

</canonical_refs>

<code_context>
## Existing Code Insights

### Reusable Assets
- No application source code exists yet; the repo currently contains the blueprint and GSD planning artifacts.

### Established Patterns
- GSD artifacts already define the execution order and planning discipline.
- Port selection before server start is an explicit operating rule for this repo.

### Integration Points
- Phase 1 will establish the route tree, UI shell, types, defaults, validators, and toolchain that Phase 2 and onward must extend.

</code_context>

<deferred>
## Deferred Ideas

- Full formula implementation — Phase 2.
- Dashboard data visualization depth — Phase 3.
- Editable scenario forms — Phase 4.
- Scenario persistence/compare/import/export — Phase 5.
- Sensitivity and break-even views — Phase 6.
- Report export and acceptance polish — Phase 7.
- Backend, auth, AI advisor, contract analyzer, and live integrations — v2+.

</deferred>

---
*Phase: 01-project-setup-and-domain-skeleton*
*Context gathered: 2026-06-14*

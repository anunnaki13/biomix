# Project State

## Project Reference

See: .planning/PROJECT.md (updated 2026-06-14)

**Core value:** The app must answer whether a biomass pellet project is profitable, why, and under which assumptions, with every business number traceable to a tested calculation formula.
**Current focus:** Phase 5 - Scenario Management and Persistence

## Current Position

Phase: 5 of 7 (Scenario Management and Persistence)
Plan: 0 of 3 in current phase
Status: Phase 4 complete
Last activity: 2026-06-15 - Completed live scenario input pages, reusable form controls, and realtime state-driven editing

Progress: [######----] 64%

## Performance Metrics

**Velocity:**
- Total plans completed: 16
- Average duration: 11 min
- Total execution time: 2.8 hours

**By Phase:**

| Phase | Plans | Total | Avg/Plan |
|-------|-------|-------|----------|
| 1 | 4 | 48 min | 12 min |
| 2 | 5 | 55 min | 11 min |
| 3 | 3 | 30 min | 10 min |
| 4 | 4 | 36 min | 9 min |

**Recent Trend:**
- Last 5 plans: 10m, 9m, 9m, 9m, 8m
- Trend: Improving

## Accumulated Context

### Decisions

Decisions are logged in PROJECT.md Key Decisions table.
Recent decisions affecting current work:

- Initialization: Use blueprint as source of truth and skip initial GSD questioning.
- Initialization: Use YOLO mode, standard granularity, parallel execution, planning docs in git, balanced model profile.
- Initialization: Build local-first MVP before backend/auth/AI.
- Initialization: Prioritize tested calculation engine before UI depth.
- Initialization: Check active ports before starting BIOMIX dev/preview servers and use an unused port.
- Phase 1: Keep the root route anchored in BIOMIX assumptions and workflow context until real feasibility math is wired in.
- Phase 1: Add scenario validation and formatting before editable forms so later inputs inherit enforceable business rules.
- Phase 2: Extend the domain model with working-capital and machine-capacity hooks now, so later forms can stay additive.
- Phase 2: Keep pricing, transport, cost, and warning rules modular instead of hiding them inside one monolithic calculator.
- Phase 3: Drive the dashboard from Zustand active scenario state so future forms only need to update state, not custom render paths.
- Phase 3: Use compact KPI formatting and guarded chart hydration to keep the finance dashboard readable and clean in Next.js.
- Phase 4: Keep form components simple and controlled from Zustand instead of adding heavier orchestration before the MVP really needs it.
- Phase 4: Show schema validity near input pages so users can see invalid business states while editing.

### Pending Todos

- Phase 5 planning and execution.

### Blockers/Concerns

None yet.

## Deferred Items

| Category | Item | Status | Deferred At |
|----------|------|--------|-------------|
| Backend | Supabase/PostgreSQL, Prisma, auth, multi-company persistence | Deferred to v2 | Initialization |
| AI | AI advisor and investor narrative generation | Deferred to v2+ | Initialization |
| Documents | Contract PDF/DOCX analyzer | Deferred to v2+ | Initialization |
| Integrations | Realtime HBA, exchange rate, supplier, and offtaker APIs | Deferred to v2+ | Initialization |

## Session Continuity

Last session: 2026-06-14
Stopped at: Phase 4 completed and all major input pages edit the active scenario; next focus is scenario persistence and management
Resume file: None

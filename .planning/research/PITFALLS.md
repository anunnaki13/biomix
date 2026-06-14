# Pitfalls Research: BIOMIX Feasibility Engine

**Researched:** 2026-06-14
**Source:** `BIOMIX_Feasibility_Engine_Blueprint.md`
**Confidence:** HIGH for project-specific pitfalls because the blueprint explicitly lists what Codex must not do.

## Critical Pitfalls

1. **Putting formulas in JSX/TSX** - Prevent by keeping all business math under `src/lib/calculations/` and covering it with unit tests.
2. **Using raw input as HPP denominator** - HPP, margin, and revenue must use finished pellet output.
3. **Hardcoding dashboard results** - UI must read from `calculateFeasibility(defaultScenario)` and user scenarios.
4. **Hiding transport cost** - Transport must support FOB, seller-paid, pass-through/reimbursable, and DDP/landed behavior.
5. **Flattening all OPEX into one input** - OPEX must preserve categories so sensitivity and reports are useful.
6. **Assuming pelletization greatly increases GCV** - GCV improvement must only be modeled through explicit drying/torrefaction assumptions.
7. **Ignoring quality warnings** - GCV, moisture, sulfur, chlorine, potassium, and sodium assumptions affect feasibility and risk.
8. **Skipping working capital** - Payment terms, stock buffers, and cash reserve materially change initial capital and cashflow.
9. **Building backend/auth too early** - MVP should work in-browser first; backend is v2.
10. **Making the UI a single long calculator page** - Use dashboard, scenario, input, analysis, and report routes.

## Phase Mapping

- Phase 1 must establish folder boundaries and types.
- Phase 2 must prevent formula mistakes with tests before UI work expands.
- Phase 3 must prove the dashboard reads calculated results.
- Phase 4 must keep forms validated and tied to recalculation.
- Phase 5 must persist scenarios without backend scope creep.
- Phase 6 must make sensitivity/break-even use the same engine.
- Phase 7 must keep export/report outputs traceable to assumptions.

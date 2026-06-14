# Phase 3 Context

## Goal

Render the BIOMIX dashboard as an industrial-finance surface driven by the live calculation engine and active scenario state.

## Inputs

- Phase 2 calculation engine and test coverage.
- Existing shell, KPI card, status badge, and warning panel primitives.
- Blueprint requirement for KPI cards, charts, warnings, and dashboard responsiveness.

## Constraints

- Dashboard values must come from the active scenario object, not hardcoded display values.
- The UI should feel dense, premium, and presentation-ready without becoming decorative noise.
- Charts must be safe in Next.js static rendering and client hydration.

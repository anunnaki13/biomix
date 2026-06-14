# Phase 3 Research

## UI Direction

- Keep the finance-heavy dashboard structure: KPI rows, supporting detail bands, charts, then warning column.
- Use scenario switching in the topbar to prove the dashboard is bound to the active scenario state.
- Prefer compact currency formatting in KPI contexts so large IDR values stay readable.

## Implementation Notes

- Move the dashboard page to a client component backed by Zustand scenario state.
- Use Recharts for cost and revenue surfaces, but guard SSR/prerender width issues cleanly.
- Add a lightweight sensitivity snapshot now so later analysis work has a visible bridge.

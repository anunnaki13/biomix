# Phase 4 Research

## UI Approach

- Use lightweight controlled inputs bound directly to Zustand for immediate recalculation.
- Keep pages grouped by business domain instead of one giant form.
- Surface schema validity close to the page header so users can see invalid states early.

## Implementation Notes

- A small local form component set is enough here; no need to over-abstract into a heavy form framework yet.
- Feedstock and CAPEX need repeatable row editors because they are table-shaped business data.
- Because the dashboard already consumes active scenario state, realtime recalculation falls out naturally once pages update the store.

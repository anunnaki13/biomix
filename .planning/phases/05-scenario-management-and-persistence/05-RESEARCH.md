# Phase 5 Research

## Persistence Strategy

- Use Zustand `persist` middleware over browser localStorage so current active/default scenario state survives refresh.
- Keep only essential state persisted: scenarios, active scenario id, and default scenario id.

## UX Notes

- Scenario actions belong in one control-center page rather than being scattered.
- Import/export should use plain JSON for transparency and portability.
- Comparison should use engine-derived metrics so no duplicate business logic appears in the UI.

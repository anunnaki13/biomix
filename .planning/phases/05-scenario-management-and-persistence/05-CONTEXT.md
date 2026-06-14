# Phase 5 Context

## Goal

Make BIOMIX scenario work practical by adding local persistence, CRUD operations, import/export, and comparison across scenarios.

## Inputs

- Phase 4 live forms already edit the active scenario.
- Phase 3 dashboard already reads active scenario state.
- Blueprint requires local storage, multiple scenarios, comparison, and JSON portability.

## Constraints

- Persistence must stay local-first with no backend dependency.
- Imported scenarios must pass the project schema before entering the store.
- Scenario comparison should expose the financial and feasibility deltas clearly.

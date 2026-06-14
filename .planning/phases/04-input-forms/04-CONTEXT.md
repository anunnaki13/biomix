# Phase 4 Context

## Goal

Replace the BIOMIX input placeholders with editable scenario forms that write directly to the active Zustand scenario and immediately affect dashboard calculations.

## Inputs

- Phase 3 dashboard already reads the active scenario state.
- Phase 2 engine and schema already define the contract each form must satisfy.

## Constraints

- Editing should stay additive to the existing scenario model.
- Validation should remain visible to the user while they edit.
- Form controls should be reusable across input pages so later expansion stays consistent.

# Phase 2 Context

## Goal

Implement the deterministic BIOMIX calculation engine from the blueprint so feasibility numbers, warnings, and status all come from tested TypeScript formulas.

## Inputs

- Blueprint formulas for production, blending, GCV conversion, HPT pricing, transport, OPEX, CAPEX, financing, profit, and break-even.
- Existing Phase 1 domain types, default scenario, validation, formatting, and app shell.

## Constraints

- All business metrics must use pellet output as the denominator.
- Formula behavior must stay traceable to the blueprint examples and test cases.
- Verification must pass through local `test`, `lint`, and `build`.

# Phase 2 Research

## Key Formula Areas

1. Production depends on effective yield after reject, handling loss, and downtime.
2. Feedstock blending needs weighted quality plus cost allocation by raw input demand.
3. Quality must support ARB, ADB, and DB basis conversion with technical thresholds.
4. Pricing must support manual, HPT, and contract GCV-adjusted logic.
5. Cost, capital, financing, break-even, and warnings must be composable into one engine entrypoint.

## Implementation Notes

- Use small calculation modules in `src/lib/calculations/` to preserve traceability.
- Keep optional fields for machine capacity and working-capital detail so future forms can grow into the engine without refactoring the model again.
- Favor direct unit tests for blueprint examples plus one end-to-end default-scenario engine test.

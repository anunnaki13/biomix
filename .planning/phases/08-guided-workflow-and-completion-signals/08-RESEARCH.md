# Phase 8 Research: Guided Workflow and Completion Signals

## Existing Assets We Can Reuse

- `src/app/input/page.tsx` already provides an ordered input sequence
- `src/components/layout/Topbar.tsx` and `src/components/dashboard/DashboardClient.tsx` already carry the main navigation cues
- `ScenarioValidationCard` already exposes schema validity and can help power readiness summaries
- The store already has a clean active-scenario source of truth, so completion logic can derive from existing scenario state instead of duplicating state

## Recommended Approach

1. Derive completion from the current scenario and schema-aware business rules
2. Show completion by input group, not by every individual field
3. Keep readiness summaries lightweight and visible on the dashboard before adding deeper onboarding UI

## Risks

- Completion logic can become noisy if it is too strict or too field-level
- Readiness summaries can confuse users if they disagree with schema validation or feasibility status

## Guardrails

- Prefer grouped completeness over pixel-perfect audit detail
- Keep readiness language operational and short
- Use the same active scenario state as the rest of the app

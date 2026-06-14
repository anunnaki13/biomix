# Phase 1: Project Setup and Domain Skeleton - Research

**Researched:** 2026-06-14
**Domain:** Next.js local-first industrial-finance dashboard scaffolding
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions
- The BIOMIX blueprint file in the repo is the primary source of truth for formulas, data contracts, UI direction, and acceptance criteria.
- Calculation logic must live in `src/lib/calculations/`, never inside JSX or TSX.
- MVP remains local-first and browser-based; no backend/auth/database work belongs in this phase.
- Use Next.js App Router with TypeScript.
- Use Tailwind CSS, shadcn/ui, Recharts, Lucide React, React Hook Form, Zod, Zustand, and Vitest as the core implementation stack.
- Use Indonesian Rupiah as the default display currency and Indonesian business-friendly UI copy.
- Phase 1 should produce a walking skeleton: app runs, dashboard route opens, AppShell exists, and the default BIOMIX scenario/types/validators are available for downstream work.
- Default scenario data should be based on the 20 TPD mixed biomass base case from the blueprint.
- Port conflicts on the VPS must be checked before launching any dev or preview server.

### the agent's Discretion
- Package manager choice if multiple standard options work.
- Exact folder-level file splitting beyond the required blueprint structure.
- Visual polish level for the initial shell, as long as it stays aligned with the industrial-finance direction.
- Exact command sequence for verifying scaffold, build, and tests.

### Deferred Ideas (OUT OF SCOPE)
- Full formula implementation.
- Scenario persistence, AI advisor, backend, and contract analyzer.

</user_constraints>

<architectural_responsibility_map>
## Architectural Responsibility Map

| Capability | Primary Tier | Secondary Tier | Rationale |
|------------|-------------|----------------|-----------|
| App scaffold and routing | Frontend Server | Browser/Client | Next.js App Router owns route bootstrapping and bundling. |
| AppShell layout and navigation | Browser/Client | Frontend Server | Rendered UI lives client-side, but route composition begins at the app layer. |
| Domain types and validators | Frontend Server | Browser/Client | Shared TypeScript contracts feed both compile-time safety and client form validation. |
| Default scenario data | Frontend Server | Browser/Client | Static app defaults are loaded in-app without backend dependency. |
| Local test runner and tooling | Frontend Server | — | Toolchain configuration is repo/runtime-level, not user-facing runtime behavior. |

</architectural_responsibility_map>

<research_summary>
## Summary

Phase 1 should establish a stable local-first Next.js workspace that already looks and feels like BIOMIX while keeping business formulas out of the UI. The main architectural job is not complexity; it is boundary setting. If we get the types, route structure, validators, shell, and tooling right now, Phase 2 can build formulas without refactoring the app skeleton again.

The standard approach here is a clean App Router structure with `src/app` for pages, `src/components` for layout/UI/form/chart pieces, `src/lib` for calculations/defaults/validators/formatters/storage, `src/store` for Zustand, and `src/tests` or colocated tests for Vitest. Shadcn/ui is useful for production-friendly base controls, while custom BIOMIX styling should come from CSS variables and a domain-specific shell rather than starter defaults.

**Primary recommendation:** Build the repo as a polished, local-first Next.js skeleton with typed BIOMIX domain contracts and validation in place, but stop before implementing calculation formulas beyond what is needed to wire defaults and app structure.
</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| `next` | current stable | App framework and routing | Strong fit for dashboard/report flows and future expansion. |
| `react` / `react-dom` | current stable | UI runtime | Required by Next.js and component ecosystem. |
| `typescript` | current stable | Type safety | Essential for formula contract correctness. |
| `tailwindcss` | current stable | Styling system | Fast iteration with reusable utility patterns. |
| `zod` | current stable | Schema validation | Great for conditional scenario validation and typed parsing. |
| `zustand` | current stable | Scenario state | Lightweight and easy to persist locally. |
| `vitest` | current stable | Unit tests | Fast TypeScript-friendly testing for calculation modules. |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| `recharts` | current stable | Charts | Dashboard, sensitivity, and breakdown graphs. |
| `lucide-react` | current stable | Icons | Navigation, controls, and status cues. |
| `react-hook-form` | current stable | Form state | Multi-section assumption forms in later phases. |
| `@hookform/resolvers` | current stable | Zod + RHF bridge | When forms start using schema validation. |
| `class-variance-authority` | current stable | Variant styling | Handy for design-system flavored UI primitives. |
| `clsx` and `tailwind-merge` | current stable | Class composition | Common shadcn/Tailwind support utilities. |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Zustand | Jotai | Also viable, but Zustand matches blueprint preference and persistence patterns well. |
| Recharts | Nivo / Visx | More powerful in some cases, but Recharts is simpler for MVP business charts. |
| Vitest | Jest | Jest is familiar, but Vitest is lighter in a Vite/TS modern stack. |

**Installation:**
```bash
npm install next react react-dom
npm install -D typescript tailwindcss vitest
npm install zod zustand recharts lucide-react react-hook-form @hookform/resolvers class-variance-authority clsx tailwind-merge
```
</standard_stack>

<architecture_patterns>
## Architecture Patterns

### System Architecture Diagram

User opens route -> Next.js App Router -> AppShell layout -> active BIOMIX scenario defaults/store -> typed view model -> dashboard placeholder UI

Developer tooling -> repo config -> TypeScript/Vitest/Tailwind/shadcn setup -> stable project skeleton for later calculation work

### Recommended Project Structure
```text
src/
├── app/            # Route tree and layouts
├── components/     # Layout, dashboard, form, and UI components
├── lib/            # Calculations, defaults, formatters, storage, validators
├── store/          # Zustand scenario store
├── types/          # BIOMIX input and result contracts
└── tests/          # Formula and utility tests
```

### Pattern 1: Domain-first type contracts
**What:** Define `Scenario` and `FeasibilityResult` before writing business logic or forms.
**When to use:** Immediately in Phase 1 so later work shares a stable contract.

### Pattern 2: App shell before feature depth
**What:** Create shared sidebar/topbar/layout primitives early so later routes slot into a consistent frame.
**When to use:** In the initial scaffold before dashboard or forms get complex.

### Anti-Patterns to Avoid
- **Generic starter look:** Don’t leave the default starter layout untouched; Phase 1 should already read as BIOMIX.
- **Route-free setup:** Don’t only install packages and stop; the phase must prove the app opens at a BIOMIX route.
- **Tooling without validation hooks:** Don’t add stack pieces without wiring the repo for build/test/lint verification.
</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Form validation plumbing | Custom parser/validator layer | Zod + React Hook Form | Reduces edge cases and duplicate logic. |
| UI primitive foundations | Entire internal component library from scratch | shadcn/ui + custom BIOMIX styling | Faster and more maintainable for MVP. |
| Global state persistence glue | Ad hoc event buses | Zustand store + local storage wrapper | Simpler and clearer for scenarios. |
| Test runner plumbing | Homemade TS test harness | Vitest | Better DX and easier future formula coverage. |

**Key insight:** Phase 1 wins by assembling strong existing tools into a clean BIOMIX structure, not by inventing infrastructure.
</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Scaffold drift from blueprint
**What goes wrong:** The directory structure or route model starts diverging from the BIOMIX blueprint.
**Why it happens:** Teams treat the starter scaffold as temporary and postpone structure decisions.
**How to avoid:** Create the intended route and folder layout now, even if some pages stay skeletal.
**Warning signs:** Renaming/moving core directories repeatedly in later phases.

### Pitfall 2: Generic starter UI becomes sticky
**What goes wrong:** The project inherits default visuals that later phases have to undo.
**Why it happens:** Early shell work focuses only on function, not identity.
**How to avoid:** Set BIOMIX color variables, shell composition, and dashboard framing in Phase 1.
**Warning signs:** The app looks like a stock template instead of an industrial-finance tool.

### Pitfall 3: Running servers on conflicting ports
**What goes wrong:** BIOMIX interrupts another VPS app or fails to start cleanly.
**Why it happens:** Developers assume default ports are free.
**How to avoid:** Always inspect active listeners before choosing a dev/preview port.
**Warning signs:** Bind errors, unexpected app responses, or clobbered local reverse proxies.
</common_pitfalls>

<code_examples>
## Code Examples

### Default scenario export
```typescript
export const defaultScenario20TpdMix = {
  id: 'default-20tpd-mix',
  name: '20 TPD Mix Sekam + Sawdust Base Case',
};
```

### Indonesian Rupiah formatter
```typescript
export function formatIDR(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}
```

### Zod rule example
```typescript
const scenarioSchema = z.object({
  production: z.object({
    operatingDaysPerMonth: z.number().min(1).max(31),
  }),
});
```
</code_examples>

<sota_updates>
## State of the Art (2024-2025)

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| Pages Router defaults | App Router-first Next.js setups | Next.js 13+ era | Better layout nesting and route composition. |
| Monolithic form state | Schema-driven RHF + Zod flows | Current React form practice | Cleaner multi-step/business forms. |
| Static utility classes only | Utility classes plus tokenized CSS variables | Current dashboard design practice | Easier domain theming without losing Tailwind speed. |

**New tools/patterns to consider:**
- `shadcn/ui` pattern composition for polished primitives.
- Local-first Zustand patterns for scenario apps without backend.

**Deprecated/outdated:**
- Treating dashboard MVPs as one long form page without route structure.
</sota_updates>

<open_questions>
## Open Questions

1. **Exact dependency versions**
   - What we know: Blueprint names the libraries.
   - What's unclear: Exact latest stable versions to pin.
   - Recommendation: Resolve at install time and keep the calculation core version-agnostic.

2. **How far the shell should go visually in Phase 1**
   - What we know: It should already feel like BIOMIX, not a starter template.
   - What's unclear: How much polish to invest before Phase 3.
   - Recommendation: Set strong layout and color direction now, defer heavier data UI refinement to Phase 3.
</open_questions>

<sources>
## Sources

### Primary (HIGH confidence)
- `BIOMIX_Feasibility_Engine_Blueprint.md` - route structure, stack, types, validation, formatting, roadmap, acceptance criteria.
- `.planning/PROJECT.md` - project constraints and v1 boundaries.
- `.planning/ROADMAP.md` - Phase 1 scope and expected outputs.

</sources>

<metadata>
## Metadata

**Research scope:**
- Core technology: Next.js TypeScript local-first dashboard scaffold
- Ecosystem: Tailwind, shadcn/ui, Zustand, Zod, RHF, Recharts, Vitest
- Patterns: domain-first contracts, shell-first app structure
- Pitfalls: scaffold drift, generic UI drift, port collisions

**Confidence breakdown:**
- Standard stack: HIGH - explicitly named by blueprint
- Architecture: HIGH - route and folder layout are explicit
- Pitfalls: HIGH - blueprint and project constraints are clear
- Code examples: MEDIUM - derived from blueprint snippets, not package docs

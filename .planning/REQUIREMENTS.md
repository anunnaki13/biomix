# Requirements: BIOMIX Feasibility Engine

**Defined:** 2026-06-14
**Core Value:** The app must answer whether a biomass pellet project is profitable, why, and under which assumptions, with every business number traceable to a tested calculation formula.

## v1 Requirements

### Foundation

- [x] **SETUP-01**: Developer can run a Next.js 15+ TypeScript app with Tailwind CSS, shadcn/ui, Recharts, Lucide React, React Hook Form, Zod, Zustand, and Vitest installed.
- [x] **SETUP-02**: User can open a dashboard route rendered inside an AppShell with sidebar and topbar navigation.
- [x] **SETUP-03**: Developer can find app routes, components, calculation modules, defaults, validators, formatters, store, and tests in the folder structure defined by the blueprint.
- [x] **SETUP-04**: Developer can read a concise README with app purpose, feature list, tech stack, and development commands.

### Data Contracts

- [x] **DATA-01**: Developer can use typed `Scenario`, production, feedstock, quality, pricing, OPEX, CAPEX, transport, financing, and tax models.
- [x] **DATA-02**: Developer can use typed `FeasibilityResult` output models for production, quality, pricing, cost, transport, CAPEX, financing, profit, break-even, status, and warnings.
- [x] **DATA-03**: User can load a default 20 TPD 50:50 sekam padi and sawdust base case scenario.
- [x] **DATA-04**: User can choose conservative, base case, and optimistic scenario presets.
- [x] **DATA-05**: Developer can validate scenario inputs with Zod rules for non-negative prices, percentage ranges, mix total, operating days/hours, pricing requirements, financing requirements, and GCV presence.
- [x] **DATA-06**: User sees currency, number, and percent values formatted for Indonesian business usage.

### Calculation Engine

- [ ] **CALC-01**: User can calculate target-output and target-input production, including effective yield, raw input, pellet output, monthly/yearly production, and required machine kg/hour.
- [ ] **CALC-02**: User can calculate multi-feedstock needs, cost, weighted GCV, weighted moisture, and weighted ash while validating that mix percentage totals 100%.
- [ ] **CALC-03**: User can convert GCV between ARB, ADB, and DB basis and receive technical status for GCV/moisture thresholds.
- [ ] **CALC-04**: User can calculate manual price, HPT price, and contract GCV-adjusted price with moisture penalty and reject-risk warnings.
- [ ] **CALC-05**: User can calculate outbound transport trips and costs for FOB, seller-paid, pass-through/reimbursable, and DDP/landed modes.
- [ ] **CALC-06**: User can calculate feedstock cost, utility, labor, maintenance, sparepart, packaging, lab, rent, admin, other OPEX, total OPEX, HPP/kg, and HPP/ton.
- [ ] **CALC-07**: User can calculate CAPEX subtotal, contingency, total CAPEX, working capital, and total initial capital.
- [ ] **CALC-08**: User can calculate annuity and flat loan installments, monthly debt service, total interest, DSCR, and cashflow-after-debt risk.
- [ ] **CALC-09**: User can calculate revenue, gross profit, gross margin, EBITDA, tax, net profit, payback, and annual ROI.
- [ ] **CALC-10**: User can calculate minimum selling price, maximum feedstock price, minimum GCV for break-even in HPT mode, and break-even volume.
- [ ] **CALC-11**: User can receive warnings for low GCV, high moisture, thin margin, low gross margin, long payback, negative cashflow after debt, DSCR below 1.2, high transport cost, insufficient feedstock supply, invalid mix total, machine capacity gap, working capital gap, manual price below HPP, and incomplete HPT inputs.
- [ ] **TEST-01**: Developer can run unit tests proving HPT returns approximately Rp1,084,200/ton for the blueprint test case.
- [ ] **TEST-02**: Developer can run unit tests proving 750 ton/month with 24 ton/truck produces 32 trips.
- [ ] **TEST-03**: Developer can run unit tests proving HPP uses pellet output as denominator.
- [ ] **TEST-04**: Developer can run unit tests proving ADB to ARB GCV conversion.

### Dashboard

- [ ] **DASH-01**: User can view KPI cards for production, selling price, HPP, margin, profit, capital, payback, and technical status.
- [ ] **DASH-02**: User can view charts for cost breakdown, revenue vs OPEX, and sensitivity.
- [ ] **DASH-03**: User can view status badges for `LAYAK`, `LAYAK_DENGAN_CATATAN`, and `TIDAK_LAYAK`.
- [ ] **DASH-04**: User can view a sticky warning panel on desktop and accessible warning content on smaller screens.
- [ ] **DASH-05**: User can see dashboard values from the calculation engine, not hardcoded display numbers.

### Inputs

- [ ] **FORM-01**: User can edit production assumptions including project name/location, target output/input, yield, operating days/hours, downtime, reject, handling loss, and calculation mode.
- [ ] **FORM-02**: User can edit a multi-feedstock table with biomass name, mix, price, GCV, moisture, ash, density, supply limit, inbound transport, and pre-processing cost.
- [ ] **FORM-03**: User can edit quality assumptions including GCV ARB/ADB/DB, moisture, ash, sulfur, chlorine, potassium, sodium, and particle size.
- [ ] **FORM-04**: User can edit pricing assumptions for manual, HPT, contract GCV-adjusted, and delivered price modes.
- [ ] **FORM-05**: User can edit detailed OPEX, CAPEX, transport, working capital, tax, and bank loan assumptions.
- [ ] **FORM-06**: User can change assumptions and see dashboard calculations update automatically.

### Scenarios

- [ ] **SCEN-01**: User can create, duplicate, rename, delete, and set default scenarios.
- [ ] **SCEN-02**: User can save scenarios to browser local storage and reload them after refresh.
- [ ] **SCEN-03**: User can compare conservative, base case, and optimistic scenarios in a table.
- [ ] **SCEN-04**: User can import and export scenario JSON.

### Analysis

- [ ] **ANAL-01**: User can run sensitivity analysis across feedstock price, selling price, GCV, yield, transport cost, operating days, HBA, and exchange rate using configurable deltas.
- [ ] **ANAL-02**: User can view tornado chart impact on monthly profit for key variables.
- [ ] **ANAL-03**: User can view break-even selling price, feedstock price, GCV, and volume.

### Reports

- [ ] **REPT-01**: User can open a report page containing project/scenario title, decision summary, assumptions, OPEX, CAPEX, transport, financing, profit, break-even, sensitivity, warnings, and disclaimer.
- [ ] **REPT-02**: User can print or export the report to PDF.
- [ ] **REPT-03**: User can export calculation/report data to CSV and JSON.
- [ ] **REPT-04**: User sees the blueprint disclaimer that simulation results require lab tests, production trials, contract negotiation, supplier validation, transporter validation, and legal/tax review.

## v2 Requirements

### Backend and Accounts

- **BACK-01**: User can sign in and save scenarios to Supabase/PostgreSQL.
- **BACK-02**: User can manage multiple projects/companies across devices.
- **BACK-03**: Team members can share and collaborate on scenarios.

### AI and Integrations

- **AI-01**: User can ask an AI advisor to explain why a project is profitable or risky based on structured calculation results.
- **AI-02**: User can generate investor/offtaker narrative summaries from scenario results.
- **CNTR-01**: User can upload a contract PDF/DOCX and extract price, volume, quality specification, penalty clause, transport responsibility, and payment term.
- **DATA-API-01**: User can pull realtime HBA, currency, supplier, or offtaker data from external integrations.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Login/auth in MVP | Blueprint says local storage first; backend/auth are optional later. |
| Multi-company database in MVP | Requires backend and account model, deferred to v2. |
| Realtime collaboration | Not necessary to validate feasibility engine core value. |
| AI chat advisor in MVP | AI must not replace deterministic formulas; defer until result JSON is stable. |
| Contract analyzer in MVP | Useful future automation but not required for first usable calculator. |
| Live HBA/kurs APIs in MVP | Manual inputs keep MVP simpler and auditable. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| SETUP-01 | Phase 1 | Complete |
| SETUP-02 | Phase 1 | Complete |
| SETUP-03 | Phase 1 | Complete |
| SETUP-04 | Phase 1 | Complete |
| DATA-01 | Phase 1 | Complete |
| DATA-02 | Phase 1 | Complete |
| DATA-03 | Phase 1 | Complete |
| DATA-04 | Phase 1 | Complete |
| DATA-05 | Phase 1 | Complete |
| DATA-06 | Phase 1 | Complete |
| CALC-01 | Phase 2 | Complete |
| CALC-02 | Phase 2 | Complete |
| CALC-03 | Phase 2 | Complete |
| CALC-04 | Phase 2 | Complete |
| CALC-05 | Phase 2 | Complete |
| CALC-06 | Phase 2 | Complete |
| CALC-07 | Phase 2 | Complete |
| CALC-08 | Phase 2 | Complete |
| CALC-09 | Phase 2 | Complete |
| CALC-10 | Phase 2 | Complete |
| CALC-11 | Phase 2 | Complete |
| TEST-01 | Phase 2 | Complete |
| TEST-02 | Phase 2 | Complete |
| TEST-03 | Phase 2 | Complete |
| TEST-04 | Phase 2 | Complete |
| DASH-01 | Phase 3 | Complete |
| DASH-02 | Phase 3 | Complete |
| DASH-03 | Phase 3 | Complete |
| DASH-04 | Phase 3 | Complete |
| DASH-05 | Phase 3 | Complete |
| FORM-01 | Phase 4 | Complete |
| FORM-02 | Phase 4 | Complete |
| FORM-03 | Phase 4 | Complete |
| FORM-04 | Phase 4 | Complete |
| FORM-05 | Phase 4 | Complete |
| FORM-06 | Phase 4 | Complete |
| SCEN-01 | Phase 5 | Pending |
| SCEN-02 | Phase 5 | Pending |
| SCEN-03 | Phase 5 | Pending |
| SCEN-04 | Phase 5 | Pending |
| ANAL-01 | Phase 6 | Pending |
| ANAL-02 | Phase 6 | Pending |
| ANAL-03 | Phase 6 | Pending |
| REPT-01 | Phase 7 | Pending |
| REPT-02 | Phase 7 | Pending |
| REPT-03 | Phase 7 | Pending |
| REPT-04 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 47 total
- Mapped to phases: 47
- Unmapped: 0

---
*Requirements defined: 2026-06-14*
*Last updated: 2026-06-15 after Phase 4 completion*

# Feature Research: BIOMIX Feasibility Engine

**Researched:** 2026-06-14
**Source:** `BIOMIX_Feasibility_Engine_Blueprint.md`
**Confidence:** HIGH for MVP feature set because the blueprint enumerates required and non-required features.

## Table Stakes for MVP

- Dashboard summary: production, price, HPP, margin, profit, capital, payback, technical status, charts, warnings.
- Production input: target output/input mode, yield, operating days/hours, downtime, reject, handling loss.
- Multi-feedstock input: editable biomass items, mix percentage, price, GCV, moisture, ash, inbound/pre-processing assumptions.
- Quality input: ARB/ADB/DB GCV, moisture, ash, sulfur, chlorine, potassium, sodium, particle size, CFB eligibility.
- Pricing input: manual price, HPT mode, contract GCV adjustment, delivered price assumptions.
- OPEX input: feedstock, utility, labor, maintenance, sparepart, packaging, lab, loader, rent, admin, taxes, inbound/outbound transport.
- CAPEX and working capital: default machine/civil/QC items, contingency, payment term, stock buffer, cash reserve.
- Transport simulation: FOB, seller-paid, pass-through/reimbursable, DDP/landed.
- Financing simulation: loan enabled/disabled, annuity/flat, interest, tenor, grace period, DSCR.
- Scenario management: conservative/base/optimistic, duplicate, rename, delete, default, compare, local storage.
- Sensitivity and break-even: variable deltas, tornado chart, minimum selling price, max feedstock price, minimum GCV, break-even volume.
- Export/report: PDF/CSV/JSON export, print-friendly report, investor/offtaker assumptions and disclaimer.

## Differentiators

- Biomass-specific feasibility warnings: GCV, moisture, DSCR, margin, transport, supply limit, working capital, HPT completeness.
- Explicit transport responsibility modeling rather than hiding transport inside one global cost.
- Formula traceability and unit-tested business math.
- Indonesian Rupiah formatting and Indonesian business copy.

## Deferred Features

- Login and user accounts.
- Multi-company database.
- Realtime collaboration.
- AI advisor.
- Contract analyzer for PDF/DOCX.
- Live HBA/kurs/supplier/offtaker integrations.

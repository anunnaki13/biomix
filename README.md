# BIOMIX Feasibility Engine

Web application untuk simulasi kelayakan bisnis pellet biomassa berbasis CAPEX, OPEX, GCV, HPT, transport, dan cashflow.

## Status Saat Ini

Repo ini sudah melewati Phase 1 foundation:

- Next.js App Router + TypeScript scaffold
- Industrial-finance AppShell
- Route skeleton sesuai blueprint
- Type contracts untuk scenario dan result
- Default scenario 20 TPD mix sekam + sawdust
- Zod validation dan formatter Indonesia
- Smoke test awal untuk scaffold

Formula engine penuh, warning engine lengkap, dan semua perhitungan bisnis utama masuk di Phase 2.

## Features Target MVP

- Production simulator
- Multi-feedstock blending
- GCV and moisture quality check
- HPT pricing calculator
- OPEX and CAPEX calculator
- Transport mode simulation
- Loan and cashflow calculator
- Break-even and sensitivity analysis
- Scenario save/export
- PDF/CSV report

## Tech Stack

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui-ready structure
- Recharts
- Zustand
- Zod
- Vitest

## Development

```bash
npm install
npm run build
npm run test
```

Untuk menjalankan server dev di VPS:

1. Cek dulu port yang sedang dipakai, misalnya dengan `ss -ltnp`.
2. Pilih port yang kosong.
3. Jalankan `npm run dev -- --port <port-kosong>`.

Aturan ini penting supaya BIOMIX tidak menabrak aplikasi lain yang sudah aktif di VPS.

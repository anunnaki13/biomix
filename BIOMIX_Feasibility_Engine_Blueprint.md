# BIOMIX Feasibility Engine
## Blueprint Web Application Kalkulator Proyeksi Keuntungan Pellet Biomassa

**Versi:** 1.0  
**Tanggal:** 14 Juni 2026  
**Target pengguna:** Founder/produsen pellet biomassa, calon investor, operator produksi, tim niaga/offtaker  
**Tujuan teknis dokumen:** Blueprint siap-upload ke GitHub agar Codex dapat membangun web application secara bertahap.

---

## 1. Ringkasan Produk

BIOMIX Feasibility Engine adalah web application untuk menghitung kelayakan bisnis produksi pellet biomassa berdasarkan input **CAPEX**, **OPEX**, **kapasitas produksi**, **kualitas bahan bakar**, **skema kontrak**, **harga jual**, **transport**, dan **pembiayaan**.

Aplikasi ini bukan hanya kalkulator margin sederhana. Aplikasi harus menjadi **dashboard simulasi bisnis** yang dapat menjawab pertanyaan utama:

1. Berapa HPP pellet biomassa per kg dan per ton?
2. Berapa harga jual minimum agar tidak rugi?
3. Apakah harga kontrak/offtaker masih menguntungkan jika harga bahan baku naik?
4. Bagaimana dampak GCV, moisture, yield, downtime, dan transport terhadap laba?
5. Berapa kebutuhan modal awal termasuk CAPEX dan modal kerja?
6. Berapa payback period, laba bulanan, laba tahunan, ROI, dan cashflow?
7. Apakah skema FOB, CIF, DDP, atau transport reimbursable lebih aman?
8. Apakah project masih feasible jika menggunakan pinjaman bank?

---

## 2. Latar Belakang Bisnis

Bisnis pellet biomassa memiliki banyak variabel yang saling mempengaruhi:

- Harga bahan baku biomassa bisa berubah cepat.
- Produk pellet dinilai berdasarkan kualitas, terutama GCV dan moisture.
- Harga jual bisa berbasis kontrak manual, HPT/regulasi, atau negosiasi langsung.
- Biaya transport sangat menentukan karena biomassa memiliki densitas energi lebih rendah daripada batubara.
- Mesin murah sering memiliki kapasitas aktual lebih rendah dari kapasitas katalog.
- Payment term/offtaker bisa memunculkan kebutuhan modal kerja besar.
- Margin terlihat besar di atas kertas, tetapi bisa turun karena downtime, reject, susut, lab test, ritase, dan cicilan.

Karena itu aplikasi harus mampu membuat beberapa skenario, bukan hanya satu angka final.

---

## 3. Acuan Awal dari Dokumen BIOMIX Lama

Blueprint ini mengambil acuan logika dari dokumen BIOMIX sebelumnya dan perhitungan yang sudah pernah dibuat. Nilai-nilai berikut dipakai sebagai **default preset**, bukan angka final wajib.

### 3.1 Preset 15 TPD Rice Husk Pellet

| Parameter | Nilai default |
|---|---:|
| Produk | Pellet sekam padi |
| Output | 15 ton/hari |
| Hari operasi | 25 hari/bulan |
| Output bulanan | 375 ton/bulan |
| GCV base case | 3.800 kcal/kg |
| TM target | <20% sampai 25% |
| Yield | 92% |
| Harga sekam lama | Rp350/kg |
| HPT FOB base case | ± Rp1.084.200/ton |
| HPP produksi lama | ± Rp701.333/ton |
| Margin produksi lama | ± Rp382.867/ton |
| Laba bulanan base case lama | ± Rp143.575.122/bulan |
| CAPEX fixed realistis lama | ± Rp300 juta |

### 3.2 Preset 30 TPD Transport Ditanggung Penjual

| Parameter | Nilai default |
|---|---:|
| Output | 30 ton/hari |
| Output bulanan | 750 ton/bulan |
| Input sekam | 32 ton/hari |
| Hari operasi | 25 hari/bulan |
| Kapasitas truk | 24 ton/rit |
| Ritase bulanan | 32 rit/bulan |
| Biaya lab | Rp200.000/rit |
| Transport simulasi | Rp2,5 juta sampai Rp6 juta/rit |
| Harga jual simulasi | Rp1.050/kg pada GCV ARB 3.900 kcal/kg |
| HPP all-in simulasi | Rp525 sampai Rp728/kg, tergantung harga sekam dan transport |

### 3.3 Preset 20 TPD Mix Biomassa

Preset ini ditambahkan karena project terakhir sering dibahas dengan kapasitas sekitar 20 ton/hari dan bahan 50:50.

| Parameter | Nilai default |
|---|---:|
| Output | 20 ton/hari |
| Hari operasi | 25 hari/bulan |
| Output bulanan | 500 ton/bulan |
| Feedstock 1 | Sekam padi 50% |
| Feedstock 2 | Sawdust 50% |
| Harga awal sekam | Rp500/kg |
| Harga awal sawdust | Rp500/kg |
| Yield awal | 90% sampai 92% |
| GCV target | 3.700 sampai 3.900 kcal/kg |
| Transport mode | Bisa FOB, seller-paid, atau pass-through |

---

## 4. Prinsip Utama Aplikasi

1. Semua perhitungan harus memakai **output pellet jadi**, bukan input bahan baku mentah.
2. Aplikasi harus mendukung lebih dari satu jenis bahan baku: sekam, sawdust, serabut kelapa, PKS, woodchip, dan custom biomass.
3. Semua harga harus bisa diubah pengguna.
4. Jangan hardcode hasil perhitungan di UI.
5. Semua rumus utama harus berada di satu calculation engine: `src/lib/calculations/`.
6. Gunakan TypeScript agar formula aman dan mudah dites.
7. Semua uang ditampilkan dalam format Rupiah Indonesia.
8. Semua persentase disimpan sebagai desimal internal, tetapi ditampilkan sebagai persen.
9. Skenario harus bisa disimpan, diduplikasi, dan dibandingkan.
10. MVP harus bisa berjalan tanpa backend dulu, menggunakan local storage. Backend bisa ditambahkan pada fase berikutnya.

---

## 5. Target MVP

MVP yang harus dibangun pertama:

1. Dashboard ringkasan profit.
2. Input produksi.
3. Input bahan baku/feedstock multi item.
4. Input kualitas GCV dan moisture.
5. Input harga jual manual dan HPT mode.
6. Input OPEX detail.
7. Input CAPEX dan modal kerja.
8. Input transport.
9. Input pinjaman bank sederhana.
10. Skenario konservatif, base case, optimis.
11. Sensitivitas otomatis.
12. Export hasil ke PDF/CSV/JSON.
13. Simpan skenario ke browser/local storage.

Fitur yang **tidak wajib di MVP**:

- Login user.
- Multi-company database.
- Realtime collaboration.
- AI chat advisor.
- Integrasi API HBA/kurs realtime.
- Integrasi supplier/offtaker.

---

## 6. Rekomendasi Tech Stack

### 6.1 Frontend

Gunakan:

- **Next.js 15+** dengan App Router
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui** untuk komponen modern
- **Recharts** untuk chart
- **Lucide React** untuk icon
- **React Hook Form** untuk form
- **Zod** untuk validasi schema
- **Zustand** atau **Jotai** untuk state management ringan

### 6.2 Persistence MVP

Untuk MVP:

- Local storage untuk menyimpan scenario.
- Export/import JSON agar data bisa dipindahkan.

Untuk fase 2:

- Supabase/PostgreSQL.
- Prisma ORM.
- Auth optional.

### 6.3 Testing

Gunakan:

- Vitest untuk unit test calculation engine.
- Playwright optional untuk end-to-end test.

### 6.4 Export

Gunakan salah satu:

- `jspdf` + `html2canvas` untuk PDF sederhana.
- `papaparse` untuk CSV.
- Native JSON export/import.

---

## 7. Nama Aplikasi dan Positioning

Nama aplikasi:

> **BIOMIX Feasibility Engine**

Tagline:

> **Simulasi kelayakan produksi pellet biomassa berbasis CAPEX, OPEX, GCV, HPT, transport, dan cashflow.**

Alternatif nama:

1. BIOMIX Profit Calculator
2. Biomass Margin Dashboard
3. Pellet Business Simulator
4. Co-Firing Biomass Feasibility Tool
5. BioFuel Financial Engine

---

## 8. Struktur Halaman

### 8.1 `/` Dashboard

Dashboard menampilkan hasil utama dari scenario aktif.

Komponen:

- Header scenario aktif.
- Card produksi: ton/hari, ton/bulan, ton/tahun.
- Card harga jual: Rp/kg, Rp/ton, mode harga.
- Card HPP: Rp/kg dan Rp/ton.
- Card margin: margin/kg, margin/ton, margin persen.
- Card laba: laba harian, bulanan, tahunan.
- Card modal: CAPEX, modal kerja, total modal awal.
- Card payback: bulan balik modal.
- Card status teknis: layak/tidak layak GCV dan moisture.
- Chart komposisi biaya.
- Chart revenue vs opex.
- Chart sensitivitas.
- Panel warning.

### 8.2 `/scenario`

Untuk membuat dan mengelola scenario.

Fitur:

- Buat scenario baru.
- Duplicate scenario.
- Rename scenario.
- Delete scenario.
- Set default scenario.
- Compare 3 scenario: konservatif, base case, optimis.

### 8.3 `/input/production`

Input produksi.

Field:

- Nama pabrik/project.
- Lokasi produksi.
- Target output pellet ton/hari.
- Input bahan baku kg/hari atau ton/hari.
- Yield produksi.
- Hari operasi per bulan.
- Jam operasi per hari.
- Downtime persen.
- Reject rate persen.
- Loss handling persen.
- Mode perhitungan: target output atau target input.

### 8.4 `/input/feedstock`

Input bahan baku multi item.

Field per feedstock:

- Nama bahan.
- Persentase campuran.
- Harga beli Rp/kg.
- GCV kcal/kg.
- Moisture awal.
- Ash.
- Bulk density optional.
- Supply limit ton/hari.
- Transport inbound Rp/ton optional.
- Pre-processing cost Rp/ton optional.

Feedstock default:

- Sekam padi.
- Sawdust.
- Serabut kelapa.
- Cangkang sawit.
- Woodchip.
- Custom.

### 8.5 `/input/quality`

Input kualitas produk akhir.

Field:

- GCV ARB.
- GCV ADB.
- GCV DB.
- Total moisture ARB.
- Moisture ADB.
- Ash.
- Sulfur.
- Chlorine.
- Potassium/Kalium.
- Sodium/Natrium.
- Particle size min/max.

Aplikasi harus bisa:

- Convert GCV ADB ke ARB.
- Convert GCV DB ke ARB.
- Memberi status layak CFB.
- Memberi warning jika kualitas turun.

### 8.6 `/input/pricing`

Input harga jual.

Mode harga:

1. Manual price.
2. HPT mode.
3. Contract price with GCV adjustment.
4. Delivered price mode.

Field HPT mode:

- HBA USD/ton.
- Kurs USD/IDR.
- Koefisien biomassa.
- GCV batubara acuan.
- GCV biomassa ARB.

Field contract mode:

- Harga dasar Rp/kg atau Rp/ton.
- GCV basis kontrak.
- Formula penalty/reward.
- Minimum GCV diterima.
- Maximum moisture diterima.
- Reject penalty.

### 8.7 `/input/opex`

Input OPEX.

Kategori:

1. Bahan baku.
2. Listrik dan utility.
3. Tenaga kerja.
4. Maintenance.
5. Sparepart.
6. Packaging.
7. Lab test.
8. Loader/forklift.
9. Sewa lahan/gudang.
10. Admin dan overhead.
11. Pajak/retribusi optional.
12. Transport inbound bahan baku.
13. Transport outbound produk.

### 8.8 `/input/capex`

Input CAPEX.

Komponen default:

- Pellet mill.
- Hammer mill.
- Dryer.
- Cooler.
- Conveyor.
- Silo/hopper.
- Panel listrik.
- Genset optional.
- Timbangan.
- Moisture meter.
- Peralatan QC.
- Bangunan/gudang.
- Instalasi listrik.
- Instalasi mekanikal.
- Forklift/loader optional.
- Kendaraan/truck optional.
- Perizinan.
- Contingency.

Field per item:

- Nama item.
- Qty.
- Unit price.
- Total price otomatis.
- Useful life tahun.
- Depreciation method optional.
- Category.

### 8.9 `/input/transport`

Input transport.

Mode:

1. FOB: transport tidak masuk OPEX penjual.
2. Seller-paid: transport masuk OPEX.
3. Pass-through/reimbursable: transport masuk invoice, tetapi tidak dianggap margin utama.
4. DDP/landed: harga jual sudah termasuk transport.

Field:

- Jarak km optional.
- Kapasitas truk ton/rit.
- Tarif per rit.
- Biaya bongkar muat per rit.
- Biaya lab per rit.
- Loss transport persen.
- Minimum rit per bulan.
- Rounding ritase: ceil.

### 8.10 `/input/financing`

Input pembiayaan.

Field:

- Porsi modal sendiri.
- Porsi pinjaman.
- Nilai pinjaman.
- Bunga tahunan.
- Tenor bulan.
- Grace period bulan.
- Metode cicilan: anuitas atau flat.
- Biaya administrasi bank optional.

Output:

- Cicilan bulanan.
- Total bunga.
- DSCR sederhana.
- Cashflow setelah cicilan.

### 8.11 `/analysis/sensitivity`

Analisis sensitivitas.

Variabel:

- Harga bahan baku.
- Harga jual.
- GCV.
- Moisture.
- Yield.
- Transport per rit.
- Hari operasi.
- Downtime.
- Kurs.
- HBA.

Output:

- Table sensitivitas.
- Tornado chart optional.
- Heatmap margin.
- Break-even GCV.
- Break-even harga bahan baku.

### 8.12 `/reports`

Report untuk investor/offtaker.

Fitur:

- Export PDF.
- Export CSV.
- Export JSON scenario.
- Print-friendly report.
- Ringkasan 1 halaman.
- Detail asumsi.
- Detail hasil.
- Warning dan risiko.

---

## 9. Data Model TypeScript

Buat file `src/types/biomass.ts`.

```ts
export type TransportMode = 'FOB' | 'SELLER_PAID' | 'PASS_THROUGH' | 'DDP';
export type PricingMode = 'MANUAL' | 'HPT' | 'CONTRACT_GCV_ADJUSTED';
export type LoanMethod = 'ANNUITY' | 'FLAT';

export interface Scenario {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  production: ProductionConfig;
  feedstocks: Feedstock[];
  quality: QualityConfig;
  pricing: PricingConfig;
  opex: OpexConfig;
  capex: CapexConfig;
  transport: TransportConfig;
  financing: FinancingConfig;
  tax: TaxConfig;
}

export interface ProductionConfig {
  targetPelletTonPerDay: number;
  rawInputTonPerDay?: number;
  calculationMode: 'TARGET_OUTPUT' | 'TARGET_INPUT';
  operatingDaysPerMonth: number;
  operatingHoursPerDay: number;
  pelletizingYieldPct: number;
  downtimePct: number;
  rejectRatePct: number;
  handlingLossPct: number;
}

export interface Feedstock {
  id: string;
  name: string;
  mixPct: number;
  pricePerKg: number;
  gcvKcalPerKg: number;
  moisturePct: number;
  ashPct?: number;
  sulfurPct?: number;
  chlorinePct?: number;
  inboundTransportPerTon?: number;
  preprocessingCostPerTon?: number;
  supplyLimitTonPerDay?: number;
}

export interface QualityConfig {
  gcvArb?: number;
  gcvAdb?: number;
  gcvDb?: number;
  totalMoistureArbPct: number;
  moistureAdbPct?: number;
  ashPct?: number;
  sulfurPct?: number;
  chlorinePct?: number;
  potassiumPct?: number;
  sodiumPct?: number;
  particleSizeMinMm?: number;
  particleSizeMaxMm?: number;
}

export interface PricingConfig {
  mode: PricingMode;
  manualPricePerTon?: number;
  hbaUsdPerTon?: number;
  usdIdrRate?: number;
  biomassCoefficient?: number;
  referenceCoalGcv?: number;
  contractBasePricePerTon?: number;
  contractBaseGcv?: number;
  minAcceptedGcv?: number;
  maxAcceptedMoisturePct?: number;
  penaltyPerPctMoisture?: number;
}

export interface OpexConfig {
  electricityPerDay: number;
  waterPerDay: number;
  laborMonthly: number;
  maintenancePerTon: number;
  sparepartMonthly: number;
  packagingPerTon: number;
  labTestPerShipment: number;
  rentMonthly: number;
  adminMonthly: number;
  otherMonthly: number;
}

export interface CapexItem {
  id: string;
  name: string;
  category: string;
  qty: number;
  unitPrice: number;
  usefulLifeYears?: number;
}

export interface CapexConfig {
  items: CapexItem[];
  contingencyPct: number;
}

export interface TransportConfig {
  mode: TransportMode;
  truckCapacityTon: number;
  costPerTrip: number;
  loadingUnloadingPerTrip: number;
  labShipmentMode: 'PER_TRIP' | 'PER_MONTH' | 'NONE';
  outboundLossPct: number;
  minimumTripsPerMonth?: number;
}

export interface FinancingConfig {
  enabled: boolean;
  ownCapital: number;
  loanPrincipal: number;
  annualInterestRatePct: number;
  tenorMonths: number;
  gracePeriodMonths: number;
  method: LoanMethod;
  adminFeePct?: number;
}

export interface TaxConfig {
  enabled: boolean;
  incomeTaxPct: number;
}
```

---

## 10. Calculation Result Type

Buat file `src/types/results.ts`.

```ts
export interface FeasibilityResult {
  production: ProductionResult;
  quality: QualityResult;
  pricing: PricingResult;
  cost: CostResult;
  transport: TransportResult;
  capex: CapexResult;
  financing: FinancingResult;
  profit: ProfitResult;
  breakEven: BreakEvenResult;
  status: StatusResult;
  warnings: WarningItem[];
}

export interface ProductionResult {
  rawInputTonPerDay: number;
  rawInputKgPerDay: number;
  pelletTonPerDay: number;
  pelletKgPerDay: number;
  pelletTonPerMonth: number;
  pelletTonPerYear: number;
  requiredMachineKgPerHour: number;
  effectiveYieldPct: number;
}

export interface QualityResult {
  gcvArb: number;
  gcvAdb?: number;
  gcvDb?: number;
  weightedFeedstockGcv: number;
  weightedFeedstockMoisturePct: number;
  technicalStatus: 'PASS' | 'WARNING' | 'FAIL';
  technicalNotes: string[];
}

export interface PricingResult {
  sellingPricePerKg: number;
  sellingPricePerTon: number;
  hptFobPerTon?: number;
  deliveredPricePerTon?: number;
  priceModeLabel: string;
}

export interface CostResult {
  feedstockCostPerDay: number;
  feedstockCostPerMonth: number;
  nonFeedstockOpexPerDay: number;
  nonFeedstockOpexPerMonth: number;
  totalOpexPerDay: number;
  totalOpexPerMonth: number;
  totalOpexPerYear: number;
  hppPerKg: number;
  hppPerTon: number;
  costBreakdown: CostBreakdownItem[];
}

export interface CostBreakdownItem {
  label: string;
  value: number;
  perTon: number;
  percentage: number;
}

export interface TransportResult {
  tripsPerMonth: number;
  outboundTransportMonthly: number;
  outboundTransportPerTon: number;
  outboundTransportPerKg: number;
  isIncludedInOpex: boolean;
}

export interface CapexResult {
  subtotal: number;
  contingencyValue: number;
  totalCapex: number;
  monthlyDepreciation?: number;
}

export interface FinancingResult {
  monthlyInstallment: number;
  totalInterest: number;
  monthlyDebtService: number;
  dscr: number | null;
}

export interface ProfitResult {
  revenuePerDay: number;
  revenuePerMonth: number;
  revenuePerYear: number;
  grossProfitPerKg: number;
  grossProfitPerTon: number;
  grossProfitPerMonth: number;
  grossMarginPct: number;
  ebitdaPerMonth: number;
  profitBeforeTaxPerMonth: number;
  taxPerMonth: number;
  netProfitPerMonth: number;
  netProfitPerYear: number;
  cashflowAfterDebtPerMonth: number;
  simplePaybackMonths: number | null;
  roiAnnualPct: number | null;
}

export interface BreakEvenResult {
  minimumSellingPricePerKg: number;
  minimumSellingPricePerTon: number;
  maximumFeedstockPricePerKg: number;
  minimumGcvForBreakEven?: number;
  breakEvenVolumeTonPerMonth?: number;
}

export interface StatusResult {
  financialStatus: 'PROFITABLE' | 'THIN_MARGIN' | 'LOSS';
  technicalStatus: 'PASS' | 'WARNING' | 'FAIL';
  overallStatus: 'LAYAK' | 'LAYAK_DENGAN_CATATAN' | 'TIDAK_LAYAK';
}

export interface WarningItem {
  level: 'info' | 'warning' | 'danger';
  title: string;
  message: string;
}
```

---

## 11. Formula Produksi

### 11.1 Mode Target Output

Jika pengguna memasukkan target output pellet:

```text
Pellet Ton/Day = Target Pellet Ton/Day
Pellet Kg/Day = Pellet Ton/Day × 1.000
Effective Yield = Pelletizing Yield × (1 - Reject Rate) × (1 - Handling Loss) × (1 - Downtime)
Raw Input Kg/Day = Pellet Kg/Day / Effective Yield
Raw Input Ton/Day = Raw Input Kg/Day / 1.000
Pellet Ton/Month = Pellet Ton/Day × Operating Days/Month
Pellet Ton/Year = Pellet Ton/Month × 12
Required Machine Kg/Hour = Pellet Kg/Day / Operating Hours/Day
```

### 11.2 Mode Target Input

Jika pengguna memasukkan bahan baku masuk:

```text
Raw Input Kg/Day = Raw Input Ton/Day × 1.000
Effective Yield = Pelletizing Yield × (1 - Reject Rate) × (1 - Handling Loss) × (1 - Downtime)
Pellet Kg/Day = Raw Input Kg/Day × Effective Yield
Pellet Ton/Day = Pellet Kg/Day / 1.000
Pellet Ton/Month = Pellet Ton/Day × Operating Days/Month
Pellet Ton/Year = Pellet Ton/Month × 12
```

### 11.3 Catatan Penting

Semua margin, HPP, dan revenue harus memakai pellet jadi sebagai pembagi.

Salah:

```text
HPP/kg = Total OPEX / kg bahan baku masuk
```

Benar:

```text
HPP/kg = Total OPEX / kg pellet jadi
```

---

## 12. Formula Multi Feedstock dan Blending

### 12.1 Validasi Campuran

Total persentase campuran harus 100%.

```text
Total Mix % = SUM(feedstock.mixPct)
Valid jika Total Mix % = 100%
```

Jika tidak 100%, tampilkan warning dan normalisasi optional.

### 12.2 Kebutuhan Tiap Feedstock

```text
Feedstock i Kg/Day = Raw Input Kg/Day × MixPct i
Feedstock i Ton/Day = Feedstock i Kg/Day / 1.000
Feedstock i Cost/Day = Feedstock i Kg/Day × PricePerKg i
Total Feedstock Cost/Day = SUM(Feedstock i Cost/Day)
```

### 12.3 Weighted GCV dan Moisture

```text
Weighted Feedstock GCV = SUM(MixFraction i × GCV i)
Weighted Moisture = SUM(MixFraction i × Moisture i)
Weighted Ash = SUM(MixFraction i × Ash i)
```

### 12.4 Estimasi GCV Produk Akhir

MVP cukup menggunakan input GCV produk akhir dari user. Namun jika user memilih auto-estimate:

```text
Estimated Product GCV = Weighted Feedstock GCV × GCV Improvement Factor
```

Default:

```text
GCV Improvement Factor = 1.00 untuk pelletization biasa
GCV Improvement Factor = 1.05 sampai 1.20 untuk proses drying/torrefaction, jika diaktifkan user
```

Catatan: Pelletization biasa terutama menaikkan densitas dan handling, bukan otomatis menaikkan GCV secara besar. Jangan mengklaim GCV naik tanpa asumsi proses drying/torrefaction yang jelas.

---

## 13. Formula Moisture dan Konversi Basis GCV

### 13.1 Konversi GCV

Semua moisture dalam rumus disimpan sebagai desimal.

```text
GCV DB = GCV ARB / (1 - Total Moisture ARB)
GCV ARB = GCV DB × (1 - Total Moisture ARB)
GCV DB = GCV ADB / (1 - Moisture ADB)
GCV ARB = GCV ADB × (1 - Total Moisture ARB) / (1 - Moisture ADB)
```

### 13.2 Drying Mass Balance Optional

Jika fase berikutnya ingin menghitung pengeringan lebih realistis:

```text
Dry Solid Kg = Wet Input Kg × (1 - Initial Moisture)
Output After Drying Kg = Dry Solid Kg / (1 - Target Moisture)
Water Removed Kg = Wet Input Kg - Output After Drying Kg
Final Pellet Kg = Output After Drying Kg × Pelletizing Yield
```

### 13.3 Kualitas Teknis Minimal

Untuk preset CFB Tenayan, gunakan threshold default:

```text
GCV ARB minimum = 3.487 kcal/kg
Total Moisture maksimum = 25%
Sulfur maksimum = 0,5%
Chlorine maksimum = 0,04%
Kalium maksimum = 15%
Natrium maksimum = 5%
```

Status logic:

```text
Jika GCV ARB >= 3487 dan TM < 25%, status = PASS
Jika GCV ARB antara 3300 dan 3487, status = WARNING
Jika GCV ARB < 3300 atau TM >= 25%, status = FAIL
```

---

## 14. Formula Harga Jual

### 14.1 Manual Mode

```text
Selling Price/Ton = Manual Price/Ton
Selling Price/Kg = Selling Price/Ton / 1.000
```

### 14.2 HPT Mode

```text
HBA Rupiah/Ton = HBA USD/Ton × Kurs USD/IDR
Calorific Correction Factor = Biomass GCV ARB / Reference Coal GCV
HPT FOB/Ton = HBA Rupiah/Ton × Biomass Coefficient × Calorific Correction Factor
HPT FOB/Kg = HPT FOB/Ton / 1.000
```

Contoh unit test:

```text
HBA = 55,66 USD/Ton
Kurs = 17.514
Koefisien = 1,2
GCV Biomassa = 3.800
GCV Batubara Acuan = 4.100

Expected HPT FOB ≈ Rp1.084.200/Ton
```

### 14.3 Contract GCV Adjusted Mode

```text
Adjusted Price/Ton = Base Contract Price/Ton × (Actual GCV ARB / Contract Base GCV)
```

Jika moisture melewati batas:

```text
Moisture Excess = Actual Moisture - Max Accepted Moisture
Moisture Penalty = Base Price × Penalty Rate × Moisture Excess
Final Price = Adjusted Price - Moisture Penalty
```

Jika GCV di bawah minimum:

```text
Jika Actual GCV < Min Accepted GCV, status = reject risk
```

---

## 15. Formula Transport

### 15.1 Ritase

```text
Trips/Month = CEILING(Pellet Ton/Month / Truck Capacity Ton)
Trips/Month = MAX(Trips/Month, Minimum Trips/Month jika ada)
```

### 15.2 Biaya Transport

```text
Transport Monthly = Trips/Month × (Cost Per Trip + Loading/Unloading Per Trip)
Transport Per Ton = Transport Monthly / Pellet Ton/Month
Transport Per Kg = Transport Per Ton / 1.000
```

### 15.3 Mode Transport

#### FOB

```text
Transport tidak masuk OPEX penjual.
Harga jual = FOB.
Margin dihitung dari FOB.
```

#### Seller Paid

```text
Transport masuk OPEX.
HPP = OPEX produksi + transport.
Margin = Harga jual - HPP all-in.
```

#### Pass Through / Reimbursable

```text
Transport masuk invoice delivered price.
Transport tidak dianggap margin utama.
Cashflow bisa terdampak jika penjual menalangi transport lebih dulu.
```

#### DDP / Landed

```text
Harga jual sudah termasuk transport.
Transport masuk OPEX.
Margin = Landed price - HPP all-in.
```

---

## 16. Formula OPEX

### 16.1 Feedstock Cost

```text
Feedstock Cost/Day = SUM(Feedstock Kg/Day × Price/Kg)
Feedstock Cost/Month = Feedstock Cost/Day × Operating Days/Month
Feedstock Cost/Ton Pellet = Feedstock Cost/Month / Pellet Ton/Month
```

### 16.2 Utility

```text
Utility/Day = Electricity/Day + Water/Day
Utility/Month = Utility/Day × Operating Days/Month
```

### 16.3 Labor

```text
Labor/Day = Labor Monthly / Operating Days/Month
```

### 16.4 Maintenance

```text
Maintenance/Month = Maintenance Per Ton × Pellet Ton/Month
```

### 16.5 Packaging

```text
Packaging/Month = Packaging Per Ton × Pellet Ton/Month
```

### 16.6 Lab Test

Jika per rit:

```text
Lab/Month = Lab Test Per Shipment × Trips/Month
```

Jika per bulan:

```text
Lab/Month = Lab Monthly Input
```

### 16.7 Total OPEX

```text
Total OPEX/Month = Feedstock + Utility + Labor + Maintenance + Sparepart + Packaging + Lab + Rent + Admin + Other + Transport jika mode transport termasuk OPEX
Total OPEX/Day = Total OPEX/Month / Operating Days/Month
HPP/Kg = Total OPEX/Month / (Pellet Ton/Month × 1.000)
HPP/Ton = HPP/Kg × 1.000
```

---

## 17. Formula CAPEX dan Modal Kerja

### 17.1 CAPEX

```text
CAPEX Subtotal = SUM(Item Qty × Unit Price)
Contingency Value = CAPEX Subtotal × Contingency %
Total CAPEX = CAPEX Subtotal + Contingency Value
```

### 17.2 Modal Kerja

Input:

- Buffer OPEX bulan.
- Stok bahan baku hari.
- Payment term/piutang hari.
- Cash reserve.

Formula:

```text
OPEX Buffer = Total OPEX Monthly × Buffer Month
Feedstock Stock Buffer = Feedstock Cost/Day × Stock Days
Receivable Buffer = Revenue/Day × Payment Term Days
Total Working Capital = OPEX Buffer + Feedstock Stock Buffer + Receivable Buffer + Cash Reserve
Total Initial Capital = Total CAPEX + Total Working Capital
```

Catatan: Receivable buffer penting jika pembayaran dari pembeli 30 hari setelah invoice.

---

## 18. Formula Pembiayaan

### 18.1 Cicilan Anuitas

```text
Monthly Rate = Annual Interest Rate / 12
Monthly Installment = Principal × [r × (1+r)^n] / [(1+r)^n - 1]
```

Jika bunga 0:

```text
Monthly Installment = Principal / Tenor Months
```

### 18.2 Cicilan Flat

```text
Principal Payment/Month = Principal / Tenor Months
Interest/Month = Principal × Annual Interest Rate / 12
Monthly Installment = Principal Payment/Month + Interest/Month
```

### 18.3 DSCR Sederhana

```text
DSCR = EBITDA Monthly / Monthly Debt Service
```

Warning:

```text
Jika DSCR < 1,2 → warning pembiayaan berisiko
Jika Cashflow After Debt < 0 → danger
```

---

## 19. Formula Profit dan Kelayakan

### 19.1 Revenue

```text
Revenue/Day = Pellet Ton/Day × Selling Price/Ton
Revenue/Month = Pellet Ton/Month × Selling Price/Ton
Revenue/Year = Revenue/Month × 12
```

### 19.2 Margin

```text
Gross Profit/Ton = Selling Price/Ton - HPP/Ton
Gross Profit/Kg = Selling Price/Kg - HPP/Kg
Gross Margin % = Gross Profit/Ton / Selling Price/Ton
Gross Profit/Month = Revenue/Month - Total OPEX/Month
```

### 19.3 Pajak Optional

```text
Tax/Month = MAX(0, Profit Before Tax × Income Tax %)
Net Profit/Month = Profit Before Tax - Tax
```

### 19.4 Payback

```text
Simple Payback Months = Total Initial Capital / Net Profit Monthly
```

Jika user memilih payback terhadap CAPEX saja:

```text
CAPEX Payback Months = Total CAPEX / Net Profit Monthly
```

### 19.5 ROI Tahunan

```text
ROI Annual % = Net Profit Year / Total Initial Capital
```

---

## 20. Break-Even Analysis

### 20.1 Minimum Selling Price

```text
Minimum Selling Price/Kg = HPP/Kg
Minimum Selling Price/Ton = HPP/Ton
```

### 20.2 Maximum Feedstock Price

```text
Max Feedstock Price/Kg =
((Selling Price/Kg - NonFeedstockCost/Kg) × Pellet Kg/Day) / Raw Input Kg/Day
```

Untuk multi feedstock, tampilkan:

- Max average feedstock price.
- Max price per feedstock jika feedstock lain tetap.

### 20.3 Minimum GCV for Break-Even dalam HPT Mode

```text
Minimum GCV = (HPP/Ton × Reference Coal GCV) / (HBA Rupiah/Ton × Biomass Coefficient)
```

### 20.4 Break-Even Volume

```text
Contribution Margin/Ton = Selling Price/Ton - Variable Cost/Ton
Break Even Volume Ton/Month = Fixed Cost/Month / Contribution Margin/Ton
```

Fixed cost minimal:

- Labor.
- Rent.
- Admin.
- Sparepart fixed.
- Debt service optional.

Variable cost:

- Feedstock.
- Electricity variable.
- Maintenance per ton.
- Packaging.
- Transport per ton jika seller-paid.

---

## 21. Scenario Engine

Aplikasi harus punya scenario presets:

### 21.1 Conservative Scenario

```ts
{
  name: 'Konservatif',
  gcvArb: 3500,
  yieldPct: 88,
  feedstockPriceIncreasePct: 15,
  transportCostIncreasePct: 20,
  sellingPriceDecreasePct: 5,
  operatingDaysPerMonth: 24,
  downtimePct: 10
}
```

### 21.2 Base Case Scenario

```ts
{
  name: 'Base Case',
  gcvArb: 3800,
  yieldPct: 92,
  feedstockPriceIncreasePct: 0,
  transportCostIncreasePct: 0,
  sellingPriceDecreasePct: 0,
  operatingDaysPerMonth: 25,
  downtimePct: 5
}
```

### 21.3 Optimistic Scenario

```ts
{
  name: 'Optimis',
  gcvArb: 4000,
  yieldPct: 95,
  feedstockPriceDecreasePct: 10,
  transportCostDecreasePct: 10,
  sellingPriceIncreasePct: 3,
  operatingDaysPerMonth: 26,
  downtimePct: 2
}
```

### 21.4 Scenario Comparison Table

Kolom:

- Scenario name.
- Output ton/month.
- GCV ARB.
- Selling price/ton.
- HPP/ton.
- Margin/ton.
- Gross margin %.
- Net profit/month.
- Payback months.
- Overall status.

---

## 22. Warning Engine

Buat file `src/lib/calculations/warnings.ts`.

Warning yang harus muncul:

1. GCV ARB di bawah 3.487 kcal/kg.
2. Total moisture >= 25%.
3. Margin per ton < Rp100.000.
4. Gross margin < 10%.
5. Payback > 24 bulan.
6. Cashflow after debt negatif.
7. DSCR < 1,2.
8. Transport per ton > Rp200.000.
9. Feedstock supply limit lebih kecil dari kebutuhan.
10. Total mix feedstock tidak 100%.
11. Required machine kg/hour lebih tinggi dari kapasitas mesin user.
12. Working capital tidak cukup untuk payment term.
13. Harga jual manual lebih rendah dari HPP.
14. HPT mode belum lengkap karena HBA/kurs/GCV kosong.

Format warning:

```ts
{
  level: 'warning',
  title: 'Margin Tipis',
  message: 'Margin per ton di bawah Rp100.000. Project masih profit tetapi rentan terhadap kenaikan biaya.'
}
```

---

## 23. UI/UX Direction

Style aplikasi harus terlihat seperti **industrial-finance dashboard**, bukan kalkulator Excel biasa.

### 23.1 Visual Style

Keyword:

- Premium industrial.
- Clean glassmorphism.
- Dark mode default.
- Data-dense tetapi tetap rapi.
- Tidak terlalu banyak animasi.
- Cocok untuk presentasi ke investor/offtaker.

### 23.2 Warna

Gunakan CSS variables:

```css
:root {
  --bg-primary: #071014;
  --bg-secondary: #0b1b22;
  --panel: rgba(255, 255, 255, 0.06);
  --panel-border: rgba(255, 255, 255, 0.12);
  --text-primary: #e8f7f5;
  --text-secondary: #9fb8b4;
  --accent-green: #43f2a6;
  --accent-cyan: #4ddcff;
  --accent-amber: #ffb84d;
  --danger: #ff5d5d;
}
```

### 23.3 Layout

Dashboard layout:

- Sidebar kiri untuk navigasi.
- Topbar untuk scenario aktif, export, reset.
- Main content 12-column grid.
- KPI cards di atas.
- Chart dan table di bawah.
- Panel warning sticky di kanan pada desktop.

### 23.4 Komponen Penting

1. `KpiCard`
2. `ScenarioSwitcher`
3. `MoneyInput`
4. `PercentageInput`
5. `TonInput`
6. `FeedstockMixTable`
7. `CostBreakdownChart`
8. `SensitivityTable`
9. `WarningPanel`
10. `ReportPreview`
11. `CapexItemTable`
12. `TransportModeSelector`
13. `PricingModeSelector`
14. `StatusBadge`

### 23.5 Status Badge

| Status | Warna | Arti |
|---|---|---|
| LAYAK | green | Teknis dan finansial aman |
| LAYAK DENGAN CATATAN | amber | Profit tetapi ada risiko |
| TIDAK LAYAK | red | Rugi atau gagal kualitas |

---

## 24. Struktur Folder Repo

```text
biomix-feasibility-engine/
├── README.md
├── package.json
├── next.config.ts
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── scenario/
│   │   │   └── page.tsx
│   │   ├── input/
│   │   │   ├── production/page.tsx
│   │   │   ├── feedstock/page.tsx
│   │   │   ├── quality/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   ├── opex/page.tsx
│   │   │   ├── capex/page.tsx
│   │   │   ├── transport/page.tsx
│   │   │   └── financing/page.tsx
│   │   ├── analysis/
│   │   │   ├── sensitivity/page.tsx
│   │   │   └── breakeven/page.tsx
│   │   └── reports/page.tsx
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.tsx
│   │   │   ├── Topbar.tsx
│   │   │   └── AppShell.tsx
│   │   ├── dashboard/
│   │   │   ├── KpiCard.tsx
│   │   │   ├── CostBreakdownChart.tsx
│   │   │   ├── RevenueOpexChart.tsx
│   │   │   └── WarningPanel.tsx
│   │   ├── forms/
│   │   │   ├── MoneyInput.tsx
│   │   │   ├── PercentInput.tsx
│   │   │   ├── NumberInput.tsx
│   │   │   ├── FeedstockMixTable.tsx
│   │   │   ├── CapexItemTable.tsx
│   │   │   └── TransportModeSelector.tsx
│   │   └── ui/
│   ├── lib/
│   │   ├── calculations/
│   │   │   ├── index.ts
│   │   │   ├── production.ts
│   │   │   ├── feedstock.ts
│   │   │   ├── quality.ts
│   │   │   ├── pricing.ts
│   │   │   ├── opex.ts
│   │   │   ├── transport.ts
│   │   │   ├── capex.ts
│   │   │   ├── financing.ts
│   │   │   ├── profit.ts
│   │   │   ├── breakeven.ts
│   │   │   ├── sensitivity.ts
│   │   │   └── warnings.ts
│   │   ├── defaults/
│   │   │   ├── scenarios.ts
│   │   │   ├── feedstocks.ts
│   │   │   └── capexItems.ts
│   │   ├── storage/
│   │   │   ├── localScenarioStore.ts
│   │   │   └── importExport.ts
│   │   ├── formatters/
│   │   │   ├── currency.ts
│   │   │   ├── number.ts
│   │   │   └── percentage.ts
│   │   └── validators/
│   │       └── scenarioSchema.ts
│   ├── store/
│   │   └── scenarioStore.ts
│   ├── types/
│   │   ├── biomass.ts
│   │   └── results.ts
│   └── tests/
│       ├── pricing.test.ts
│       ├── production.test.ts
│       ├── transport.test.ts
│       ├── profit.test.ts
│       └── breakeven.test.ts
└── docs/
    ├── BLUEPRINT.md
    ├── FORMULAS.md
    └── SAMPLE_SCENARIOS.md
```

---

## 25. Calculation Engine Main Function

Buat `src/lib/calculations/index.ts`.

```ts
import type { Scenario } from '@/types/biomass';
import type { FeasibilityResult } from '@/types/results';

export function calculateFeasibility(scenario: Scenario): FeasibilityResult {
  const production = calculateProduction(scenario.production, scenario.feedstocks);
  const quality = calculateQuality(scenario.quality, scenario.feedstocks);
  const pricing = calculatePricing(scenario.pricing, quality);
  const transport = calculateTransport(scenario.transport, production, scenario.opex);
  const cost = calculateOpex(scenario, production, transport);
  const capex = calculateCapex(scenario.capex);
  const financing = calculateFinancing(scenario.financing);
  const profit = calculateProfit({ production, pricing, cost, capex, financing, tax: scenario.tax });
  const breakEven = calculateBreakEven({ scenario, production, pricing, cost });
  const warnings = generateWarnings({ scenario, production, quality, pricing, cost, transport, capex, financing, profit, breakEven });
  const status = calculateStatus({ quality, profit, warnings });

  return {
    production,
    quality,
    pricing,
    cost,
    transport,
    capex,
    financing,
    profit,
    breakEven,
    status,
    warnings,
  };
}
```

---

## 26. Default Scenario Data

Buat `src/lib/defaults/scenarios.ts`.

```ts
export const defaultScenario20TpdMix = {
  id: 'default-20tpd-mix',
  name: '20 TPD Mix Sekam + Sawdust Base Case',
  description: 'Default project 20 ton/hari dengan bahan baku 50:50 sekam dan sawdust.',
  production: {
    targetPelletTonPerDay: 20,
    calculationMode: 'TARGET_OUTPUT',
    operatingDaysPerMonth: 25,
    operatingHoursPerDay: 20,
    pelletizingYieldPct: 92,
    downtimePct: 5,
    rejectRatePct: 2,
    handlingLossPct: 1,
  },
  feedstocks: [
    {
      id: 'sekam',
      name: 'Sekam Padi',
      mixPct: 50,
      pricePerKg: 500,
      gcvKcalPerKg: 3500,
      moisturePct: 15,
      ashPct: 18,
    },
    {
      id: 'sawdust',
      name: 'Sawdust',
      mixPct: 50,
      pricePerKg: 500,
      gcvKcalPerKg: 3900,
      moisturePct: 20,
      ashPct: 3,
    },
  ],
  quality: {
    gcvArb: 3700,
    totalMoistureArbPct: 20,
    ashPct: 11,
    sulfurPct: 0.2,
    chlorinePct: 0.03,
  },
  pricing: {
    mode: 'HPT',
    hbaUsdPerTon: 55.66,
    usdIdrRate: 17514,
    biomassCoefficient: 1.2,
    referenceCoalGcv: 4100,
  },
  opex: {
    electricityPerDay: 500000,
    waterPerDay: 0,
    laborMonthly: 35000000,
    maintenancePerTon: 40000,
    sparepartMonthly: 10000000,
    packagingPerTon: 15000,
    labTestPerShipment: 200000,
    rentMonthly: 5000000,
    adminMonthly: 3000000,
    otherMonthly: 3000000,
  },
  capex: {
    contingencyPct: 10,
    items: [
      { id: 'pellet-mill', name: 'Pellet Mill', category: 'Machine', qty: 4, unitPrice: 25000000, usefulLifeYears: 5 },
      { id: 'dryer', name: 'Dryer', category: 'Machine', qty: 1, unitPrice: 75000000, usefulLifeYears: 5 },
      { id: 'cooler', name: 'Cooler', category: 'Machine', qty: 1, unitPrice: 15000000, usefulLifeYears: 5 },
      { id: 'conveyor', name: 'Conveyor', category: 'Machine', qty: 2, unitPrice: 10000000, usefulLifeYears: 5 },
      { id: 'electrical', name: 'Panel dan Instalasi Listrik', category: 'Electrical', qty: 1, unitPrice: 30000000, usefulLifeYears: 5 },
      { id: 'warehouse', name: 'Gudang dan Renovasi', category: 'Civil', qty: 1, unitPrice: 50000000, usefulLifeYears: 10 },
      { id: 'qc', name: 'Timbangan dan QC Tools', category: 'QC', qty: 1, unitPrice: 10000000, usefulLifeYears: 3 },
    ],
  },
  transport: {
    mode: 'SELLER_PAID',
    truckCapacityTon: 24,
    costPerTrip: 4500000,
    loadingUnloadingPerTrip: 0,
    labShipmentMode: 'PER_TRIP',
    outboundLossPct: 0,
  },
  financing: {
    enabled: false,
    ownCapital: 0,
    loanPrincipal: 0,
    annualInterestRatePct: 12,
    tenorMonths: 36,
    gracePeriodMonths: 0,
    method: 'ANNUITY',
  },
  tax: {
    enabled: false,
    incomeTaxPct: 0,
  },
};
```

---

## 27. Unit Test Minimum

Buat test agar Codex tidak salah rumus.

### 27.1 HPT Test

```ts
it('calculates HPT FOB correctly', () => {
  const result = calculateHpt({
    hbaUsdPerTon: 55.66,
    usdIdrRate: 17514,
    biomassCoefficient: 1.2,
    biomassGcv: 3800,
    referenceCoalGcv: 4100,
  });

  expect(Math.round(result)).toBe(1084200);
});
```

### 27.2 Transport Test

```ts
it('calculates transport trips using ceiling', () => {
  const trips = calculateTrips({ pelletTonPerMonth: 750, truckCapacityTon: 24 });
  expect(trips).toBe(32);
});
```

### 27.3 Production Test

```ts
it('uses pellet output as HPP denominator', () => {
  const hpp = calculateHpp({ totalOpexMonthly: 263000000, pelletTonPerMonth: 375 });
  expect(Math.round(hpp)).toBe(701333);
});
```

### 27.4 GCV Conversion Test

```ts
it('converts ADB GCV to ARB GCV', () => {
  const result = gcvAdbToArb({ gcvAdb: 4000, totalMoistureArbPct: 20, moistureAdbPct: 5 });
  expect(Math.round(result)).toBe(3368);
});
```

---

## 28. Formatting Rules

### 28.1 Currency

```ts
export function formatIDR(value: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(value);
}
```

### 28.2 Number

```ts
export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat('id-ID', {
    maximumFractionDigits: digits,
  }).format(value);
}
```

### 28.3 Percent

```ts
export function formatPercent(value: number, digits = 1) {
  return `${formatNumber(value, digits)}%`;
}
```

---

## 29. Validation Rules

Gunakan Zod schema:

1. Harga tidak boleh negatif.
2. Yield harus 0 sampai 100.
3. Downtime 0 sampai 100.
4. Mix total harus 100%.
5. Operating days harus 1 sampai 31.
6. Operating hours harus 1 sampai 24.
7. Truck capacity harus lebih besar dari 0.
8. HBA dan kurs wajib jika pricing mode = HPT.
9. Manual price wajib jika mode = Manual.
10. Loan principal wajib jika financing enabled.
11. Tenor bulan harus > 0 jika financing enabled.
12. GCV wajib minimal salah satu: ARB, ADB, atau DB.

---

## 30. Sensitivity Analysis Detail

### 30.1 Sensitivity Table

Buat function:

```ts
runSensitivity(scenario, variable, deltas)
```

Contoh delta:

```ts
[-20, -10, -5, 0, 5, 10, 20]
```

Variabel:

- Feedstock price.
- Selling price.
- GCV.
- Yield.
- Transport cost.
- Operating days.
- HBA.
- Kurs.

Output per delta:

- New value.
- HPP/ton.
- Revenue/month.
- Net profit/month.
- Payback.
- Status.

### 30.2 Tornado Chart

Tornado chart menampilkan perubahan laba bulanan akibat perubahan ±10% pada variabel utama.

Variabel default:

1. Harga jual.
2. Harga bahan baku.
3. Yield.
4. GCV.
5. Transport.
6. Hari operasi.
7. Listrik.
8. Labor.

---

## 31. Report Output

Report PDF harus berisi:

1. Judul project dan scenario.
2. Ringkasan keputusan.
3. Asumsi produksi.
4. Asumsi feedstock.
5. Asumsi kualitas.
6. Asumsi harga jual.
7. OPEX breakdown.
8. CAPEX breakdown.
9. Transport assumption.
10. Financing assumption.
11. Hasil profit.
12. Break-even analysis.
13. Sensitivity summary.
14. Warning dan risiko.
15. Disclaimer.

Disclaimer:

```text
Simulasi ini adalah alat bantu analisis awal. Hasil akhir bisnis tetap harus divalidasi melalui uji lab, trial produksi, negosiasi kontrak, validasi supplier, validasi transporter, dan kajian legal/pajak.
```

---

## 32. Roadmap Pengerjaan untuk Codex

### Phase 0 — Project Setup

Checklist:

- Init Next.js + TypeScript.
- Install Tailwind.
- Install shadcn/ui.
- Setup folder structure.
- Setup ESLint/Prettier.
- Setup Vitest.
- Buat layout dasar AppShell.

Output:

- Project bisa jalan di local.
- Halaman dashboard kosong tampil.

### Phase 1 — Calculation Engine

Checklist:

- Buat semua type.
- Buat default scenario.
- Buat function production.
- Buat function feedstock.
- Buat function quality.
- Buat function pricing.
- Buat function transport.
- Buat function opex.
- Buat function capex.
- Buat function financing.
- Buat function profit.
- Buat function breakeven.
- Buat warning engine.
- Buat unit test.

Output:

- `calculateFeasibility(defaultScenario)` mengembalikan hasil lengkap.
- Semua test formula utama pass.

### Phase 2 — Dashboard UI

Checklist:

- Buat KPI cards.
- Buat warning panel.
- Buat cost breakdown chart.
- Buat revenue vs OPEX chart.
- Buat status badge.
- Tampilkan default scenario 20 TPD.

Output:

- Dashboard sudah bisa membaca hasil calculation engine.

### Phase 3 — Input Forms

Checklist:

- Form production.
- Form feedstock table.
- Form quality.
- Form pricing.
- Form opex.
- Form capex.
- Form transport.
- Form financing.
- Validasi Zod.
- Auto recalculate setiap input berubah.

Output:

- User bisa mengubah semua asumsi dan dashboard berubah realtime.

### Phase 4 — Scenario Management

Checklist:

- Zustand store.
- Save scenario to local storage.
- Duplicate scenario.
- Delete scenario.
- Import/export JSON.
- Compare scenarios.

Output:

- User bisa menyimpan beberapa skenario.

### Phase 5 — Sensitivity and Break-Even

Checklist:

- Sensitivity table.
- Tornado chart.
- Break-even price.
- Break-even feedstock price.
- Break-even GCV.

Output:

- User bisa melihat faktor paling berpengaruh terhadap laba.

### Phase 6 — Report Export

Checklist:

- Report page.
- Print-friendly CSS.
- Export PDF.
- Export CSV.
- Export JSON.

Output:

- User bisa membuat file ringkasan untuk investor/offtaker.

### Phase 7 — Optional Backend

Checklist:

- Supabase project.
- Auth.
- Save scenarios to database.
- Multi-project.
- User account.
- Team sharing.

Output:

- Aplikasi bisa dipakai jangka panjang lintas device.

---

## 33. Acceptance Criteria

Aplikasi dianggap selesai MVP jika:

1. User dapat membuka dashboard.
2. User dapat memilih scenario default.
3. User dapat mengubah kapasitas produksi, bahan baku, OPEX, CAPEX, harga jual, transport, dan pinjaman.
4. Semua angka dashboard berubah otomatis.
5. HPP dihitung berdasarkan output pellet jadi.
6. HPT mode menghasilkan angka mendekati Rp1.084.200/ton untuk test case HBA 55,66, kurs 17.514, k 1,2, GCV 3.800, reference GCV 4.100.
7. Transport 750 ton/bulan dengan truk 24 ton menghasilkan 32 rit.
8. Aplikasi memberi warning jika GCV < 3.487.
9. Aplikasi memberi warning jika margin tipis.
10. Scenario bisa disimpan di local storage.
11. Scenario bisa di-export JSON.
12. Report bisa di-print atau export PDF.

---

## 34. UX Copy Bahasa Indonesia

Gunakan bahasa Indonesia yang bisnis-friendly.

Contoh label:

- `Produksi Pellet Jadi`
- `Bahan Baku Masuk`
- `Harga Beli Bahan Baku`
- `Harga Jual FOB`
- `Harga Delivered`
- `Biaya Transport per Rit`
- `HPP Produksi`
- `HPP All-in`
- `Margin per Ton`
- `Laba Bersih Bulanan`
- `Balik Modal`
- `Status Kelayakan`
- `Risiko Mutu`
- `Risiko Cashflow`

Contoh warning:

```text
GCV di bawah batas aman CFB. Produk mungkin masih bisa dijual ke pembeli tertentu, tetapi berisiko tidak diterima untuk spesifikasi PLTU CFB.
```

```text
Margin di bawah Rp100.000/ton. Kenaikan kecil pada bahan baku atau transport dapat membuat project rugi.
```

```text
Cashflow setelah cicilan negatif. Project terlihat profit sebelum pinjaman, tetapi tidak cukup kuat membayar debt service bulanan.
```

---

## 35. Hal yang Tidak Boleh Dilakukan Codex

1. Jangan membuat rumus langsung di JSX/TSX.
2. Jangan hardcode angka hasil di UI.
3. Jangan memakai input bahan baku sebagai pembagi HPP.
4. Jangan menyembunyikan transport cost.
5. Jangan membuat semua biaya hanya satu input global.
6. Jangan menganggap pelletization otomatis menaikkan GCV besar.
7. Jangan menghilangkan mode FOB vs seller-paid.
8. Jangan membuat hasil profit tanpa warning teknis GCV dan moisture.
9. Jangan membuat aplikasi hanya satu halaman terlalu panjang tanpa struktur.
10. Jangan memakai USD sebagai default tampilan utama; gunakan Rupiah.

---

## 36. Future Feature: AI Advisor

Fase setelah MVP dapat menambahkan AI Advisor berbasis OpenRouter.

Fungsi AI:

1. Menjelaskan kenapa project rugi.
2. Memberi saran variabel yang harus dinegosiasikan.
3. Membuat narasi report untuk investor.
4. Membandingkan scenario.
5. Menjawab pertanyaan seperti: `Jika harga sekam naik ke Rp600/kg, apakah masih layak?`

Namun AI tidak boleh menggantikan calculation engine. AI hanya membaca hasil dan memberi penjelasan.

Arsitektur:

```text
Scenario Input → Calculation Engine → Structured Result JSON → AI Advisor → Explanation
```

---

## 37. Future Feature: Contract Analyzer

Fase berikutnya dapat menambahkan upload kontrak PDF/DOCX.

Fungsi:

- Extract harga jual.
- Extract volume.
- Extract quality specification.
- Extract penalty clause.
- Extract transport responsibility.
- Extract payment term.
- Auto-fill pricing and contract assumptions.

Namun MVP tidak perlu fitur ini.

---

## 38. README Singkat untuk Repo

Buat `README.md` dengan isi ringkas:

```md
# BIOMIX Feasibility Engine

Web application untuk simulasi kelayakan bisnis pellet biomassa berbasis CAPEX, OPEX, GCV, HPT, transport, dan cashflow.

## Features

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
- shadcn/ui
- Recharts
- Zustand
- Zod
- Vitest

## Development

```bash
npm install
npm run dev
npm run test
```
```

---

## 39. Final Instruction untuk Codex

Bangun aplikasi ini bertahap. Prioritas pertama adalah **calculation engine yang benar dan dites**, baru kemudian UI. Semua angka bisnis harus bisa dilacak ke formula. Tampilan harus premium, tetapi jangan mengorbankan akurasi.

Urutan kerja wajib:

1. Types.
2. Default scenario.
3. Calculation engine.
4. Unit tests.
5. Dashboard.
6. Forms.
7. Scenario storage.
8. Sensitivity.
9. Reports.

Output akhir MVP harus bisa dipakai langsung untuk menjawab:

> Dengan modal CAPEX sekian, OPEX sekian, harga bahan sekian, harga jual sekian, dan transport sekian, apakah bisnis pellet biomassa ini untung, berapa laba bulanannya, dan berapa lama balik modal?


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
  technicalStatus: "PASS" | "WARNING" | "FAIL";
  technicalNotes: string[];
}

export interface PricingResult {
  sellingPricePerKg: number;
  sellingPricePerTon: number;
  hptFobPerTon?: number;
  deliveredPricePerTon?: number;
  transportPassThroughPerTon?: number;
  rejectRisk: boolean;
  priceModeLabel: string;
}

export interface CostBreakdownItem {
  label: string;
  value: number;
  perTon: number;
  percentage: number;
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
  opexBufferValue: number;
  feedstockStockBuffer: number;
  receivableBuffer: number;
  totalWorkingCapital: number;
  totalInitialCapital: number;
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
  financialStatus: "PROFITABLE" | "THIN_MARGIN" | "LOSS";
  technicalStatus: "PASS" | "WARNING" | "FAIL";
  overallStatus: "LAYAK" | "LAYAK_DENGAN_CATATAN" | "TIDAK_LAYAK";
}

export interface WarningItem {
  level: "info" | "warning" | "danger";
  title: string;
  message: string;
}

export type TransportMode = "FOB" | "SELLER_PAID" | "PASS_THROUGH" | "DDP";
export type PricingMode = "MANUAL" | "HPT" | "CONTRACT_GCV_ADJUSTED";
export type LoanMethod = "ANNUITY" | "FLAT";

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
  calculationMode: "TARGET_OUTPUT" | "TARGET_INPUT";
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
  labShipmentMode: "PER_TRIP" | "PER_MONTH" | "NONE";
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

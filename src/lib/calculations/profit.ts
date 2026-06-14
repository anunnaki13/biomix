import type { TaxConfig } from "@/types/biomass";
import type {
  CapexResult,
  CostResult,
  FinancingResult,
  PricingResult,
  ProductionResult,
  ProfitResult,
} from "@/types/results";

export function calculateProfit(params: {
  production: ProductionResult;
  pricing: PricingResult;
  cost: CostResult;
  capex: CapexResult;
  financing: FinancingResult;
  tax: TaxConfig;
}): ProfitResult {
  const revenuePerDay = params.production.pelletTonPerDay * params.pricing.sellingPricePerTon;
  const revenuePerMonth =
    params.production.pelletTonPerMonth * params.pricing.sellingPricePerTon;
  const revenuePerYear = revenuePerMonth * 12;
  const grossProfitPerTon = params.pricing.sellingPricePerTon - params.cost.hppPerTon;
  const grossProfitPerKg = params.pricing.sellingPricePerKg - params.cost.hppPerKg;
  const grossProfitPerMonth = revenuePerMonth - params.cost.totalOpexPerMonth;
  const grossMarginPct =
    params.pricing.sellingPricePerTon > 0
      ? grossProfitPerTon / params.pricing.sellingPricePerTon
      : 0;
  const ebitdaPerMonth = grossProfitPerMonth;
  const profitBeforeTaxPerMonth = ebitdaPerMonth;
  const taxPerMonth =
    params.tax.enabled && profitBeforeTaxPerMonth > 0
      ? profitBeforeTaxPerMonth * (params.tax.incomeTaxPct / 100)
      : 0;
  const netProfitPerMonth = profitBeforeTaxPerMonth - taxPerMonth;
  const netProfitPerYear = netProfitPerMonth * 12;
  const cashflowAfterDebtPerMonth =
    netProfitPerMonth - params.financing.monthlyDebtService;

  return {
    revenuePerDay,
    revenuePerMonth,
    revenuePerYear,
    grossProfitPerKg,
    grossProfitPerTon,
    grossProfitPerMonth,
    grossMarginPct,
    ebitdaPerMonth,
    profitBeforeTaxPerMonth,
    taxPerMonth,
    netProfitPerMonth,
    netProfitPerYear,
    cashflowAfterDebtPerMonth,
    simplePaybackMonths:
      netProfitPerMonth > 0
        ? params.capex.totalInitialCapital / netProfitPerMonth
        : null,
    roiAnnualPct:
      params.capex.totalInitialCapital > 0
        ? netProfitPerYear / params.capex.totalInitialCapital
        : null,
  };
}

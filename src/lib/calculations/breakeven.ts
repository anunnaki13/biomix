import type { Scenario } from "@/types/biomass";
import type {
  BreakEvenResult,
  CostResult,
  FinancingResult,
  PricingResult,
  ProductionResult,
} from "@/types/results";

export function calculateBreakEven(params: {
  scenario: Scenario;
  production: ProductionResult;
  pricing: PricingResult;
  cost: CostResult;
  financing: FinancingResult;
}): BreakEvenResult {
  const nonFeedstockCostPerKg =
    params.production.pelletTonPerMonth > 0
      ? params.cost.nonFeedstockOpexPerMonth /
        (params.production.pelletTonPerMonth * 1000)
      : 0;
  const maximumFeedstockPricePerKg =
    params.production.rawInputKgPerDay > 0
      ? ((params.pricing.sellingPricePerKg - nonFeedstockCostPerKg) *
          params.production.pelletKgPerDay) /
        params.production.rawInputKgPerDay
      : 0;
  const hbaIdrPerTon =
    (params.scenario.pricing.hbaUsdPerTon ?? 0) *
    (params.scenario.pricing.usdIdrRate ?? 0);
  const minimumGcvForBreakEven =
    params.scenario.pricing.mode === "HPT" &&
    hbaIdrPerTon > 0 &&
    (params.scenario.pricing.biomassCoefficient ?? 0) > 0 &&
    (params.scenario.pricing.referenceCoalGcv ?? 0) > 0
      ? (params.cost.hppPerTon * (params.scenario.pricing.referenceCoalGcv ?? 0)) /
        (hbaIdrPerTon * (params.scenario.pricing.biomassCoefficient ?? 0))
      : undefined;
  const fixedCostPerMonth =
    params.scenario.opex.laborMonthly +
    params.scenario.opex.rentMonthly +
    params.scenario.opex.adminMonthly +
    params.scenario.opex.sparepartMonthly +
    params.scenario.opex.otherMonthly +
    params.financing.monthlyDebtService;
  const variableCostPerTon =
    params.production.pelletTonPerMonth > 0
      ? (params.cost.totalOpexPerMonth - fixedCostPerMonth) /
        params.production.pelletTonPerMonth
      : 0;
  const contributionMarginPerTon =
    params.pricing.sellingPricePerTon - variableCostPerTon;

  return {
    minimumSellingPricePerKg: params.cost.hppPerKg,
    minimumSellingPricePerTon: params.cost.hppPerTon,
    maximumFeedstockPricePerKg,
    minimumGcvForBreakEven,
    breakEvenVolumeTonPerMonth:
      contributionMarginPerTon > 0
        ? fixedCostPerMonth / contributionMarginPerTon
        : undefined,
  };
}

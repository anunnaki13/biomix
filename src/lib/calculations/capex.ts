import type { CapexConfig, WorkingCapitalConfig } from "@/types/biomass";
import type { CapexResult, CostResult } from "@/types/results";

export function calculateCapex(
  capex: CapexConfig,
  workingCapital: WorkingCapitalConfig,
  cost: CostResult,
  revenuePerDay: number,
): CapexResult {
  const subtotal = capex.items.reduce(
    (sum, item) => sum + item.qty * item.unitPrice,
    0,
  );
  const contingencyValue = subtotal * (capex.contingencyPct / 100);
  const totalCapex = subtotal + contingencyValue;
  const opexBufferValue = cost.totalOpexPerMonth * workingCapital.opexBufferMonths;
  const feedstockStockBuffer =
    cost.feedstockCostPerDay * workingCapital.feedstockStockDays;
  const receivableBuffer = revenuePerDay * workingCapital.receivableDays;
  const totalWorkingCapital =
    opexBufferValue +
    feedstockStockBuffer +
    receivableBuffer +
    workingCapital.cashReserve;
  const monthlyDepreciation = capex.items.reduce((sum, item) => {
    if (!item.usefulLifeYears || item.usefulLifeYears <= 0) {
      return sum;
    }

    return sum + (item.qty * item.unitPrice) / (item.usefulLifeYears * 12);
  }, 0);

  return {
    subtotal,
    contingencyValue,
    totalCapex,
    opexBufferValue,
    feedstockStockBuffer,
    receivableBuffer,
    totalWorkingCapital,
    totalInitialCapital: totalCapex + totalWorkingCapital,
    monthlyDepreciation,
  };
}

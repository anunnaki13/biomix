import type { Scenario } from "@/types/biomass";
import type { CostResult, ProductionResult, TransportResult } from "@/types/results";

import { calculateFeedstock } from "./feedstock";

export function calculateHpp(params: {
  totalOpexMonthly: number;
  pelletTonPerMonth: number;
}) {
  if (params.pelletTonPerMonth <= 0) {
    return 0;
  }

  return params.totalOpexMonthly / params.pelletTonPerMonth;
}

export function calculateOpex(
  scenario: Scenario,
  production: ProductionResult,
  transport: TransportResult,
): CostResult {
  const feedstock = calculateFeedstock(scenario.feedstocks, production);
  const utilityPerDay = scenario.opex.electricityPerDay + scenario.opex.waterPerDay;
  const utilityPerMonth = utilityPerDay * scenario.production.operatingDaysPerMonth;
  const maintenancePerMonth = scenario.opex.maintenancePerTon * production.pelletTonPerMonth;
  const packagingPerMonth = scenario.opex.packagingPerTon * production.pelletTonPerMonth;
  const labPerMonth =
    scenario.transport.labShipmentMode === "PER_TRIP"
      ? scenario.opex.labTestPerShipment * transport.tripsPerMonth
      : scenario.transport.labShipmentMode === "PER_MONTH"
        ? scenario.opex.labTestPerShipment
        : 0;
  const feedstockCostPerMonth =
    feedstock.totalFeedstockCostPerDay * scenario.production.operatingDaysPerMonth;
  const customItems = scenario.opex.customItems ?? [];
  const customItemsMonthly = customItems.reduce(
    (sum, item) => sum + item.amountMonthly,
    0,
  );
  const nonFeedstockOpexPerMonth =
    utilityPerMonth +
    scenario.opex.laborMonthly +
    maintenancePerMonth +
    scenario.opex.sparepartMonthly +
    packagingPerMonth +
    labPerMonth +
    scenario.opex.rentMonthly +
    scenario.opex.adminMonthly +
    scenario.opex.otherMonthly +
    customItemsMonthly +
    (transport.isIncludedInOpex ? transport.outboundTransportMonthly : 0);
  const totalOpexPerMonth = feedstockCostPerMonth + nonFeedstockOpexPerMonth;
  const totalOpexPerDay = totalOpexPerMonth / scenario.production.operatingDaysPerMonth;
  const hppPerTon = calculateHpp({
    totalOpexMonthly: totalOpexPerMonth,
    pelletTonPerMonth: production.pelletTonPerMonth,
  });
  const hppPerKg = hppPerTon / 1000;
  const breakdownValues = [
    { label: "Feedstock", value: feedstockCostPerMonth },
    { label: "Utility", value: utilityPerMonth },
    { label: "Labor", value: scenario.opex.laborMonthly },
    { label: "Maintenance", value: maintenancePerMonth },
    { label: "Sparepart", value: scenario.opex.sparepartMonthly },
    { label: "Packaging", value: packagingPerMonth },
    { label: "Lab", value: labPerMonth },
    { label: "Rent", value: scenario.opex.rentMonthly },
    { label: "Admin", value: scenario.opex.adminMonthly },
    { label: "Other", value: scenario.opex.otherMonthly },
    ...customItems.map((item) => ({
      label: item.name,
      value: item.amountMonthly,
    })),
    {
      label: "Transport",
      value: transport.isIncludedInOpex ? transport.outboundTransportMonthly : 0,
    },
  ].filter((item) => item.value > 0);

  return {
    feedstockCostPerDay: feedstock.totalFeedstockCostPerDay,
    feedstockCostPerMonth,
    nonFeedstockOpexPerDay:
      nonFeedstockOpexPerMonth / scenario.production.operatingDaysPerMonth,
    nonFeedstockOpexPerMonth,
    totalOpexPerDay,
    totalOpexPerMonth,
    totalOpexPerYear: totalOpexPerMonth * 12,
    hppPerKg,
    hppPerTon,
    costBreakdown: breakdownValues.map((item) => ({
      label: item.label,
      value: item.value,
      perTon: production.pelletTonPerMonth > 0 ? item.value / production.pelletTonPerMonth : 0,
      percentage: totalOpexPerMonth > 0 ? item.value / totalOpexPerMonth : 0,
    })),
  };
}

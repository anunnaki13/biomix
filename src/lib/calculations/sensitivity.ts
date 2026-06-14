import { createScenarioFromBase } from "@/lib/defaults/scenarios";
import type { Scenario } from "@/types/biomass";

import { calculateFeasibility } from "./index";

export type SensitivityVariable =
  | "feedstockPrice"
  | "sellingPrice"
  | "gcv"
  | "yield"
  | "transportCost"
  | "operatingDays"
  | "hba"
  | "usdRate";

export interface SensitivityConfig {
  variable: SensitivityVariable;
  label: string;
  deltaPct: number;
}

export interface SensitivityResultRow {
  variable: SensitivityVariable;
  label: string;
  deltaPct: number;
  baseProfitPerMonth: number;
  adjustedProfitPerMonth: number;
  deltaProfitPerMonth: number;
  baseStatus: string;
  adjustedStatus: string;
}

export const defaultSensitivityConfigs: SensitivityConfig[] = [
  { variable: "sellingPrice", label: "Harga jual", deltaPct: 5 },
  { variable: "feedstockPrice", label: "Harga feedstock", deltaPct: 10 },
  { variable: "gcv", label: "GCV", deltaPct: 5 },
  { variable: "yield", label: "Yield", deltaPct: 3 },
  { variable: "transportCost", label: "Transport", deltaPct: 10 },
  { variable: "operatingDays", label: "Hari operasi", deltaPct: 4 },
  { variable: "hba", label: "HBA", deltaPct: 5 },
  { variable: "usdRate", label: "Kurs USD/IDR", deltaPct: 5 },
];

function applyPct(value: number | undefined, deltaPct: number) {
  return (value ?? 0) * (1 + deltaPct / 100);
}

export function mutateScenarioBySensitivity(
  scenario: Scenario,
  variable: SensitivityVariable,
  deltaPct: number,
) {
  const nextScenario = createScenarioFromBase(scenario, {
    id: scenario.id,
    name: scenario.name,
  });

  switch (variable) {
    case "feedstockPrice":
      nextScenario.feedstocks = nextScenario.feedstocks.map((feedstock) => ({
        ...feedstock,
        pricePerKg: applyPct(feedstock.pricePerKg, deltaPct),
      }));
      break;
    case "sellingPrice":
      if (nextScenario.pricing.mode === "MANUAL") {
        nextScenario.pricing.manualPricePerTon = applyPct(
          nextScenario.pricing.manualPricePerTon,
          deltaPct,
        );
      } else if (nextScenario.pricing.mode === "CONTRACT_GCV_ADJUSTED") {
        nextScenario.pricing.contractBasePricePerTon = applyPct(
          nextScenario.pricing.contractBasePricePerTon,
          deltaPct,
        );
      } else {
        nextScenario.pricing.hbaUsdPerTon = applyPct(
          nextScenario.pricing.hbaUsdPerTon,
          deltaPct,
        );
      }
      break;
    case "gcv":
      nextScenario.quality.gcvArb = applyPct(nextScenario.quality.gcvArb, deltaPct);
      break;
    case "yield":
      nextScenario.production.pelletizingYieldPct = Math.max(
        1,
        nextScenario.production.pelletizingYieldPct + deltaPct,
      );
      break;
    case "transportCost":
      nextScenario.transport.costPerTrip = applyPct(
        nextScenario.transport.costPerTrip,
        deltaPct,
      );
      break;
    case "operatingDays":
      nextScenario.production.operatingDaysPerMonth = Math.max(
        1,
        Math.min(31, Math.round(nextScenario.production.operatingDaysPerMonth + deltaPct)),
      );
      break;
    case "hba":
      nextScenario.pricing.hbaUsdPerTon = applyPct(
        nextScenario.pricing.hbaUsdPerTon,
        deltaPct,
      );
      break;
    case "usdRate":
      nextScenario.pricing.usdIdrRate = applyPct(
        nextScenario.pricing.usdIdrRate,
        deltaPct,
      );
      break;
  }

  return nextScenario;
}

export function runSensitivityAnalysis(
  scenario: Scenario,
  configs: SensitivityConfig[] = defaultSensitivityConfigs,
): SensitivityResultRow[] {
  const baseResult = calculateFeasibility(scenario);

  return configs.map((config) => {
    const adjustedScenario = mutateScenarioBySensitivity(
      scenario,
      config.variable,
      config.deltaPct,
    );
    const adjustedResult = calculateFeasibility(adjustedScenario);

    return {
      variable: config.variable,
      label: config.label,
      deltaPct: config.deltaPct,
      baseProfitPerMonth: baseResult.profit.netProfitPerMonth,
      adjustedProfitPerMonth: adjustedResult.profit.netProfitPerMonth,
      deltaProfitPerMonth:
        adjustedResult.profit.netProfitPerMonth - baseResult.profit.netProfitPerMonth,
      baseStatus: baseResult.status.overallStatus,
      adjustedStatus: adjustedResult.status.overallStatus,
    };
  });
}

import type { ProductionConfig } from "@/types/biomass";
import type { ProductionResult } from "@/types/results";

import { pctToRatio } from "./utils";

export function getEffectiveYieldRatio(production: ProductionConfig) {
  return (
    pctToRatio(production.pelletizingYieldPct) *
    (1 - pctToRatio(production.rejectRatePct)) *
    (1 - pctToRatio(production.handlingLossPct)) *
    (1 - pctToRatio(production.downtimePct))
  );
}

export function calculateProduction(production: ProductionConfig): ProductionResult {
  const effectiveYieldRatio = getEffectiveYieldRatio(production);
  const effectiveYieldPct = effectiveYieldRatio * 100;

  if (effectiveYieldRatio <= 0) {
    return {
      rawInputTonPerDay: 0,
      rawInputKgPerDay: 0,
      pelletTonPerDay: 0,
      pelletKgPerDay: 0,
      pelletTonPerMonth: 0,
      pelletTonPerYear: 0,
      requiredMachineKgPerHour: 0,
      effectiveYieldPct,
    };
  }

  const pelletTonPerDay =
    production.calculationMode === "TARGET_INPUT"
      ? (production.rawInputTonPerDay ?? 0) * effectiveYieldRatio
      : production.targetPelletTonPerDay;
  const pelletKgPerDay = pelletTonPerDay * 1000;
  const rawInputKgPerDay =
    production.calculationMode === "TARGET_INPUT"
      ? (production.rawInputTonPerDay ?? 0) * 1000
      : pelletKgPerDay / effectiveYieldRatio;
  const rawInputTonPerDay = rawInputKgPerDay / 1000;

  return {
    rawInputTonPerDay,
    rawInputKgPerDay,
    pelletTonPerDay,
    pelletKgPerDay,
    pelletTonPerMonth: pelletTonPerDay * production.operatingDaysPerMonth,
    pelletTonPerYear: pelletTonPerDay * production.operatingDaysPerMonth * 12,
    requiredMachineKgPerHour: pelletKgPerDay / production.operatingHoursPerDay,
    effectiveYieldPct,
  };
}

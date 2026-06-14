import type { Feedstock, QualityConfig } from "@/types/biomass";
import type { QualityResult } from "@/types/results";

import { calculateFeedstock } from "./feedstock";
import { pctToRatio } from "./utils";

export function gcvAdbToArb(params: {
  gcvAdb: number;
  totalMoistureArbPct: number;
  moistureAdbPct: number;
}) {
  return (
    params.gcvAdb *
    ((1 - pctToRatio(params.totalMoistureArbPct)) /
      (1 - pctToRatio(params.moistureAdbPct)))
  );
}

export function gcvDbToArb(params: { gcvDb: number; totalMoistureArbPct: number }) {
  return params.gcvDb * (1 - pctToRatio(params.totalMoistureArbPct));
}

export function gcvArbToDb(params: { gcvArb: number; totalMoistureArbPct: number }) {
  const ratio = 1 - pctToRatio(params.totalMoistureArbPct);
  return ratio <= 0 ? 0 : params.gcvArb / ratio;
}

export function calculateQuality(
  quality: QualityConfig,
  feedstocks: Feedstock[],
): QualityResult {
  const feedstock = calculateFeedstock(feedstocks, {
    rawInputKgPerDay: 1000,
    rawInputTonPerDay: 1,
    pelletTonPerDay: 0,
    pelletKgPerDay: 0,
    pelletTonPerMonth: 0,
    pelletTonPerYear: 0,
    requiredMachineKgPerHour: 0,
    effectiveYieldPct: 0,
  });

  const gcvArb =
    quality.gcvArb ??
    (quality.gcvAdb !== undefined && quality.moistureAdbPct !== undefined
      ? gcvAdbToArb({
          gcvAdb: quality.gcvAdb,
          totalMoistureArbPct: quality.totalMoistureArbPct,
          moistureAdbPct: quality.moistureAdbPct,
        })
      : undefined) ??
    (quality.gcvDb !== undefined
      ? gcvDbToArb({
          gcvDb: quality.gcvDb,
          totalMoistureArbPct: quality.totalMoistureArbPct,
        })
      : feedstock.weightedFeedstockGcv);
  const gcvDb =
    quality.gcvDb ??
    gcvArbToDb({
      gcvArb,
      totalMoistureArbPct: quality.totalMoistureArbPct,
    });
  const gcvAdb =
    quality.gcvAdb ??
    (quality.moistureAdbPct !== undefined
      ? gcvDb * (1 - pctToRatio(quality.moistureAdbPct))
      : undefined);

  let technicalStatus: QualityResult["technicalStatus"] = "PASS";
  const technicalNotes: string[] = [];

  if (gcvArb < 3300 || quality.totalMoistureArbPct >= 25) {
    technicalStatus = "FAIL";
  } else if (gcvArb < 3487) {
    technicalStatus = "WARNING";
  }

  if (gcvArb < 3487) {
    technicalNotes.push("GCV ARB di bawah ambang rekomendasi 3.487 kcal/kg.");
  }

  if (quality.totalMoistureArbPct >= 25) {
    technicalNotes.push("Total moisture melewati ambang 25%.");
  }

  if ((quality.sulfurPct ?? 0) > 0.5) {
    technicalNotes.push("Sulfur melebihi ambang 0,5%.");
    technicalStatus = "FAIL";
  }

  if ((quality.chlorinePct ?? 0) > 0.04) {
    technicalNotes.push("Chlorine melebihi ambang 0,04%.");
    technicalStatus = "FAIL";
  }

  return {
    gcvArb,
    gcvAdb,
    gcvDb,
    weightedFeedstockGcv: feedstock.weightedFeedstockGcv,
    weightedFeedstockMoisturePct: feedstock.weightedFeedstockMoisturePct,
    technicalStatus,
    technicalNotes,
  };
}

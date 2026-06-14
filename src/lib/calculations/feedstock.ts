import type { Feedstock } from "@/types/biomass";
import type { ProductionResult } from "@/types/results";

export interface FeedstockUsage {
  id: string;
  name: string;
  mixPct: number;
  kgPerDay: number;
  tonPerDay: number;
  costPerDay: number;
}

export interface FeedstockResult {
  totalMixPct: number;
  normalized: boolean;
  weightedFeedstockGcv: number;
  weightedFeedstockMoisturePct: number;
  weightedFeedstockAshPct: number;
  totalFeedstockCostPerDay: number;
  usages: FeedstockUsage[];
}

export function calculateFeedstock(
  feedstocks: Feedstock[],
  production: ProductionResult,
): FeedstockResult {
  const totalMixPct = feedstocks.reduce((sum, item) => sum + item.mixPct, 0);
  const denominator = totalMixPct === 0 ? 1 : totalMixPct;

  const usages = feedstocks.map((item) => {
    const mixFraction = item.mixPct / denominator;
    const kgPerDay = production.rawInputKgPerDay * mixFraction;
    const tonPerDay = kgPerDay / 1000;
    const costPerDay =
      kgPerDay * item.pricePerKg +
      tonPerDay * (item.inboundTransportPerTon ?? 0) +
      tonPerDay * (item.preprocessingCostPerTon ?? 0);

    return {
      id: item.id,
      name: item.name,
      mixPct: item.mixPct,
      kgPerDay,
      tonPerDay,
      costPerDay,
    };
  });

  return {
    totalMixPct,
    normalized: Math.abs(totalMixPct - 100) > 0.01,
    weightedFeedstockGcv: feedstocks.reduce(
      (sum, item) => sum + (item.mixPct / denominator) * item.gcvKcalPerKg,
      0,
    ),
    weightedFeedstockMoisturePct: feedstocks.reduce(
      (sum, item) => sum + (item.mixPct / denominator) * item.moisturePct,
      0,
    ),
    weightedFeedstockAshPct: feedstocks.reduce(
      (sum, item) => sum + (item.mixPct / denominator) * (item.ashPct ?? 0),
      0,
    ),
    totalFeedstockCostPerDay: usages.reduce((sum, item) => sum + item.costPerDay, 0),
    usages,
  };
}

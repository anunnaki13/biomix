import type { PricingConfig } from "@/types/biomass";
import type { PricingResult, QualityResult } from "@/types/results";

import { safeDivide } from "./utils";

export function calculateHpt(params: {
  hbaUsdPerTon: number;
  usdIdrRate: number;
  biomassCoefficient: number;
  biomassGcv: number;
  referenceCoalGcv: number;
}) {
  const hbaIdr = params.hbaUsdPerTon * params.usdIdrRate;
  const correctionFactor = safeDivide(params.biomassGcv, params.referenceCoalGcv);

  return hbaIdr * params.biomassCoefficient * correctionFactor;
}

function normalizePenaltyRate(value?: number) {
  if (!value) {
    return 0;
  }

  return value > 1 ? value / 100 : value;
}

export function calculatePricing(
  pricing: PricingConfig,
  quality: QualityResult,
  transportPassThroughPerTon = 0,
): PricingResult {
  if (pricing.mode === "MANUAL") {
    const sellingPricePerTon = pricing.manualPricePerTon ?? 0;

    return {
      sellingPricePerKg: sellingPricePerTon / 1000,
      sellingPricePerTon,
      transportPassThroughPerTon,
      rejectRisk: false,
      priceModeLabel: "Manual Price",
    };
  }

  if (pricing.mode === "HPT") {
    const hptFobPerTon = calculateHpt({
      hbaUsdPerTon: pricing.hbaUsdPerTon ?? 0,
      usdIdrRate: pricing.usdIdrRate ?? 0,
      biomassCoefficient: pricing.biomassCoefficient ?? 0,
      biomassGcv: quality.gcvArb,
      referenceCoalGcv: pricing.referenceCoalGcv ?? 1,
    });

    return {
      sellingPricePerKg: hptFobPerTon / 1000,
      sellingPricePerTon: hptFobPerTon,
      hptFobPerTon,
      transportPassThroughPerTon,
      rejectRisk: false,
      priceModeLabel: "HPT FOB",
    };
  }

  const contractBaseGcv = pricing.contractBaseGcv ?? quality.gcvArb ?? 1;
  const adjustedPricePerTon =
    (pricing.contractBasePricePerTon ?? 0) *
    safeDivide(quality.gcvArb, contractBaseGcv);
  const moistureExcess = Math.max(
    0,
    quality.weightedFeedstockMoisturePct -
      (pricing.maxAcceptedMoisturePct ?? Number.POSITIVE_INFINITY),
  );
  const moisturePenalty =
    adjustedPricePerTon *
    normalizePenaltyRate(pricing.penaltyPerPctMoisture) *
    moistureExcess;
  const sellingPricePerTon = Math.max(0, adjustedPricePerTon - moisturePenalty);
  const rejectRisk =
    pricing.minAcceptedGcv !== undefined && quality.gcvArb < pricing.minAcceptedGcv;

  return {
    sellingPricePerKg: sellingPricePerTon / 1000,
    sellingPricePerTon,
    deliveredPricePerTon: sellingPricePerTon,
    transportPassThroughPerTon,
    rejectRisk,
    priceModeLabel: "Contract GCV Adjusted",
  };
}

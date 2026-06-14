import { describe, expect, it } from "vitest";

import { calculateFeasibility } from "@/lib/calculations";
import { defaultScenario20TpdMix } from "@/lib/defaults/scenarios";

describe("feasibility engine", () => {
  it("returns a complete result for the default scenario", () => {
    const result = calculateFeasibility(defaultScenario20TpdMix);

    expect(result.production.pelletTonPerMonth).toBeGreaterThan(0);
    expect(result.quality.gcvArb).toBeGreaterThan(0);
    expect(result.pricing.sellingPricePerTon).toBeGreaterThan(0);
    expect(result.cost.hppPerTon).toBeGreaterThan(0);
    expect(result.capex.totalInitialCapital).toBeGreaterThan(result.capex.totalCapex);
    expect(result.status.overallStatus).toBeTruthy();
  });
});

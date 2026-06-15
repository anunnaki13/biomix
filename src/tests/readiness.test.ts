import { describe, expect, it } from "vitest";

import { defaultScenario20TpdMix } from "@/lib/defaults/scenarios";
import { getScenarioReadiness } from "@/lib/workflow/scenarioReadiness";

describe("scenario readiness", () => {
  it("marks the default scenario ready for review", () => {
    const readiness = getScenarioReadiness(defaultScenario20TpdMix);

    expect(readiness.validationOk).toBe(true);
    expect(readiness.statusLabel).toBe("READY_FOR_REVIEW");
    expect(readiness.completedSections).toBe(readiness.totalSections);
  });

  it("surfaces the next incomplete section when pricing is missing", () => {
    const brokenScenario = structuredClone(defaultScenario20TpdMix);
    brokenScenario.pricing.mode = "MANUAL";
    brokenScenario.pricing.manualPricePerTon = 0;

    const readiness = getScenarioReadiness(brokenScenario);

    expect(readiness.statusLabel).toBe("NEEDS_VALIDATION");
    expect(readiness.nextSection?.key).toBe("pricing");
  });
});


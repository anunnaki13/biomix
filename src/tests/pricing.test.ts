import { describe, expect, it } from "vitest";

import { calculateHpt } from "@/lib/calculations/pricing";

describe("pricing calculations", () => {
  it("calculates HPT FOB correctly", () => {
    const result = calculateHpt({
      hbaUsdPerTon: 55.66,
      usdIdrRate: 17514,
      biomassCoefficient: 1.2,
      biomassGcv: 3800,
      referenceCoalGcv: 4100,
    });

    expect(Math.round(result)).toBe(1084200);
  });
});

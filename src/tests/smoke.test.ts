import { describe, expect, it } from "vitest";

import { defaultScenario20TpdMix } from "@/lib/defaults/scenarios";
import { formatIDR } from "@/lib/formatters/currency";
import { scenarioSchema } from "@/lib/validators/scenarioSchema";

describe("BIOMIX Phase 1 smoke coverage", () => {
  it("parses the default 20 TPD scenario through the schema", () => {
    const result = scenarioSchema.safeParse(defaultScenario20TpdMix);

    expect(result.success).toBe(true);
    expect(defaultScenario20TpdMix.feedstocks).toHaveLength(2);
  });

  it("formats Indonesian Rupiah values for dashboard anchors", () => {
    expect(formatIDR(1084200)).toContain("Rp");
  });
});

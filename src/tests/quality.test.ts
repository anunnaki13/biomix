import { describe, expect, it } from "vitest";

import { gcvAdbToArb } from "@/lib/calculations/quality";

describe("quality calculations", () => {
  it("converts ADB GCV to ARB GCV", () => {
    const result = gcvAdbToArb({
      gcvAdb: 4000,
      totalMoistureArbPct: 20,
      moistureAdbPct: 5,
    });

    expect(Math.round(result)).toBe(3368);
  });
});

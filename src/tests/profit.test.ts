import { describe, expect, it } from "vitest";

import { calculateHpp } from "@/lib/calculations/opex";

describe("profit and HPP helpers", () => {
  it("uses pellet output as HPP denominator", () => {
    const hpp = calculateHpp({
      totalOpexMonthly: 263000000,
      pelletTonPerMonth: 375,
    });

    expect(Math.round(hpp)).toBe(701333);
  });
});

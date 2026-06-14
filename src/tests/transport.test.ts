import { describe, expect, it } from "vitest";

import { calculateTrips } from "@/lib/calculations/transport";

describe("transport calculations", () => {
  it("calculates transport trips using ceiling", () => {
    const trips = calculateTrips({
      pelletTonPerMonth: 750,
      truckCapacityTon: 24,
    });

    expect(trips).toBe(32);
  });
});

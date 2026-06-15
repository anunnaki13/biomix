import { describe, expect, it } from "vitest";

import { defaultScenario20TpdMix } from "@/lib/defaults/scenarios";
import {
  buildReportSnapshot,
  serializeReportCsv,
  serializeReportJson,
} from "@/lib/reports/export";

describe("report export helpers", () => {
  it("builds a snapshot with scenario, outputs, and disclaimer", () => {
    const snapshot = buildReportSnapshot(defaultScenario20TpdMix);

    expect(snapshot.scenario.name).toBe(defaultScenario20TpdMix.name);
    expect(snapshot.summary.revenuePerMonth).toBeGreaterThan(0);
    expect(snapshot.sensitivity.length).toBeGreaterThan(0);
    expect(snapshot.disclaimer.length).toBeGreaterThan(0);
  });

  it("serializes report CSV and JSON from the active snapshot", () => {
    const snapshot = buildReportSnapshot(defaultScenario20TpdMix);

    expect(serializeReportJson(snapshot)).toContain('"scenario"');
    expect(serializeReportCsv(snapshot)).toContain("section,item,value,notes");
    expect(serializeReportCsv(snapshot)).toContain("summary,status");
    expect(serializeReportCsv(snapshot)).toContain("disclaimer,note");
  });
});


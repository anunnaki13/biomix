"use client";

import { scenarioSchema } from "@/lib/validators/scenarioSchema";
import { useActiveScenario } from "@/store/useActiveScenario";

export function ScenarioValidationCard() {
  const { activeScenario } = useActiveScenario();
  const result = scenarioSchema.safeParse(activeScenario);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <p className="font-medium text-text-primary">
        {result.success ? "Scenario valid" : "Scenario perlu perhatian"}
      </p>
      <p className="mt-1 text-text-secondary">
        {result.success
          ? "Perubahan pada halaman input langsung konsisten dengan schema saat ini."
          : result.error.issues[0]?.message}
      </p>
    </div>
  );
}

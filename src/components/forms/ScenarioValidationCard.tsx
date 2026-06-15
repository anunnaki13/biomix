"use client";

import { getScenarioReadiness } from "@/lib/workflow/scenarioReadiness";
import { useActiveScenario } from "@/store/useActiveScenario";

export function ScenarioValidationCard() {
  const { activeScenario } = useActiveScenario();
  const readiness = getScenarioReadiness(activeScenario);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
      <p className="font-medium text-text-primary">
        {readiness.validationOk ? "Scenario valid" : "Scenario perlu perhatian"}
      </p>
      <p className="mt-1 text-text-secondary">
        {readiness.validationOk
          ? `${readiness.completedSections}/${readiness.totalSections} section siap direview.`
          : readiness.issues[0] ?? readiness.summary}
      </p>
    </div>
  );
}

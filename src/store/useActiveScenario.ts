"use client";

import { useMemo } from "react";

import { useScenarioStore } from "@/store/scenarioStore";

export function useActiveScenario() {
  const scenarios = useScenarioStore((state) => state.scenarios);
  const activeScenarioId = useScenarioStore((state) => state.activeScenarioId);
  const updateActiveScenario = useScenarioStore(
    (state) => state.updateActiveScenario,
  );

  const activeScenario = useMemo(
    () => scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0],
    [activeScenarioId, scenarios],
  );

  return {
    activeScenario,
    updateActiveScenario,
  };
}

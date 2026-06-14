import type { Scenario } from "@/types/biomass";

export const LOCAL_STORAGE_SCENARIOS_KEY = "biomix-scenarios";
export const LOCAL_STORAGE_ACTIVE_SCENARIO_KEY = "biomix-active-scenario";
export const LOCAL_STORAGE_DEFAULT_SCENARIO_KEY = "biomix-default-scenario";

export interface PersistedScenarioState {
  scenarios: Scenario[];
  activeScenarioId: string;
  defaultScenarioId: string;
}

"use client";

import { create } from "zustand";

import { defaultScenario20TpdMix, defaultScenarios, scenarioPresets } from "@/lib/defaults/scenarios";
import type { Scenario } from "@/types/biomass";

interface ScenarioStore {
  scenarios: Scenario[];
  activeScenarioId: string;
  presetLabels: readonly { id: string; label: string; notes: string }[];
  setActiveScenario: (id: string) => void;
  updateScenarioMeta: (id: string, payload: Partial<Pick<Scenario, "name" | "description">>) => void;
}

export const useScenarioStore = create<ScenarioStore>((set) => ({
  scenarios: defaultScenarios,
  activeScenarioId: defaultScenario20TpdMix.id,
  presetLabels: scenarioPresets,
  setActiveScenario: (id) => set({ activeScenarioId: id }),
  updateScenarioMeta: (id, payload) =>
    set((state) => ({
      scenarios: state.scenarios.map((scenario) =>
        scenario.id === id
          ? {
              ...scenario,
              ...payload,
              updatedAt: new Date().toISOString(),
            }
          : scenario,
      ),
    })),
}));

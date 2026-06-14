"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import {
  createScenarioFromBase,
  defaultScenario20TpdMix,
  defaultScenarios,
  scenarioPresets,
} from "@/lib/defaults/scenarios";
import {
  LOCAL_STORAGE_SCENARIOS_KEY,
} from "@/lib/storage/localScenarioStore";
import type { Scenario } from "@/types/biomass";

interface ScenarioStore {
  scenarios: Scenario[];
  activeScenarioId: string;
  defaultScenarioId: string;
  presetLabels: readonly { id: string; label: string; notes: string }[];
  setActiveScenario: (id: string) => void;
  setDefaultScenario: (id: string) => void;
  createScenario: () => void;
  duplicateScenario: (id: string) => void;
  deleteScenario: (id: string) => void;
  importScenarios: (scenarios: Scenario[], mode?: "merge" | "replace") => void;
  updateActiveScenario: (updater: (scenario: Scenario) => Scenario) => void;
  updateScenarioMeta: (id: string, payload: Partial<Pick<Scenario, "name" | "description">>) => void;
}

export const useScenarioStore = create<ScenarioStore>()(
  persist(
    (set) => ({
      scenarios: defaultScenarios,
      activeScenarioId: defaultScenario20TpdMix.id,
      defaultScenarioId: defaultScenario20TpdMix.id,
      presetLabels: scenarioPresets,
      setActiveScenario: (id) => set({ activeScenarioId: id }),
      setDefaultScenario: (id) =>
        set({ defaultScenarioId: id, activeScenarioId: id }),
      createScenario: () =>
        set((state) => {
          const baseScenario =
            state.scenarios.find((scenario) => scenario.id === state.activeScenarioId) ??
            defaultScenario20TpdMix;
          const newScenario = createScenarioFromBase(baseScenario, {
            name: `${baseScenario.name} Baru`,
          });

          return {
            scenarios: [...state.scenarios, newScenario],
            activeScenarioId: newScenario.id,
          };
        }),
      duplicateScenario: (id) =>
        set((state) => {
          const sourceScenario = state.scenarios.find((scenario) => scenario.id === id);
          if (!sourceScenario) {
            return state;
          }

          const duplicatedScenario = createScenarioFromBase(sourceScenario, {
            name: `${sourceScenario.name} Copy`,
          });

          return {
            scenarios: [...state.scenarios, duplicatedScenario],
            activeScenarioId: duplicatedScenario.id,
          };
        }),
      deleteScenario: (id) =>
        set((state) => {
          if (state.scenarios.length <= 1) {
            return state;
          }

          const scenarios = state.scenarios.filter((scenario) => scenario.id !== id);
          const fallbackScenarioId = scenarios[0]?.id ?? defaultScenario20TpdMix.id;

          return {
            scenarios,
            activeScenarioId:
              state.activeScenarioId === id ? fallbackScenarioId : state.activeScenarioId,
            defaultScenarioId:
              state.defaultScenarioId === id ? fallbackScenarioId : state.defaultScenarioId,
          };
        }),
      importScenarios: (incomingScenarios, mode = "merge") =>
        set((state) => {
          const merged =
            mode === "replace"
              ? incomingScenarios
              : [
                  ...state.scenarios.filter(
                    (existing) =>
                      !incomingScenarios.some((incoming) => incoming.id === existing.id),
                  ),
                  ...incomingScenarios,
                ];
          const firstScenarioId = merged[0]?.id ?? defaultScenario20TpdMix.id;

          return {
            scenarios: merged,
            activeScenarioId: firstScenarioId,
            defaultScenarioId: firstScenarioId,
          };
        }),
      updateActiveScenario: (updater) =>
        set((state) => ({
          scenarios: state.scenarios.map((scenario) =>
            scenario.id === state.activeScenarioId
              ? {
                  ...updater(structuredClone(scenario)),
                  updatedAt: new Date().toISOString(),
                }
              : scenario,
          ),
        })),
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
    }),
    {
      name: LOCAL_STORAGE_SCENARIOS_KEY,
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        scenarios: state.scenarios,
        activeScenarioId: state.activeScenarioId,
        defaultScenarioId: state.defaultScenarioId,
      }),
      migrate: (persistedState) => {
        const state = persistedState as {
          scenarios?: Scenario[];
          activeScenarioId?: string;
          defaultScenarioId?: string;
        };

        return {
          scenarios: state?.scenarios ?? defaultScenarios,
          activeScenarioId:
            state?.activeScenarioId ??
            state?.defaultScenarioId ??
            defaultScenario20TpdMix.id,
          defaultScenarioId:
            state?.defaultScenarioId ?? defaultScenario20TpdMix.id,
        };
      },
      onRehydrateStorage: () => (state) => {
        if (!state) {
          return;
        }

        const activeScenarioId =
          state.scenarios.find((scenario) => scenario.id === state.activeScenarioId)?.id ??
          state.defaultScenarioId ??
          state.scenarios[0]?.id ??
          defaultScenario20TpdMix.id;
        const defaultScenarioId =
          state.scenarios.find((scenario) => scenario.id === state.defaultScenarioId)?.id ??
          activeScenarioId;

        state.activeScenarioId = activeScenarioId;
        state.defaultScenarioId = defaultScenarioId;
      },
    },
  ),
);

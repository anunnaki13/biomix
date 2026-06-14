import { scenarioSchema } from "@/lib/validators/scenarioSchema";
import type { Scenario } from "@/types/biomass";

export function serializeScenarios(scenarios: Scenario[]) {
  return JSON.stringify(scenarios, null, 2);
}

export function parseScenarioImport(text: string) {
  const parsed = JSON.parse(text) as unknown;
  const candidateScenarios = Array.isArray(parsed) ? parsed : [parsed];

  return candidateScenarios.map((candidate) => scenarioSchema.parse(candidate));
}

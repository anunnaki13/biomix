import type { Scenario } from "@/types/biomass";
import type { FeasibilityResult } from "@/types/results";

import { calculateBreakEven } from "./breakeven";
import { calculateCapex } from "./capex";
import { calculateFinancing } from "./financing";
import { calculateOpex } from "./opex";
import { calculatePricing } from "./pricing";
import { calculateProduction } from "./production";
import { calculateProfit } from "./profit";
import { calculateQuality } from "./quality";
import { calculateStatus } from "./status";
import { calculateTransport } from "./transport";
import { generateWarnings } from "./warnings";

export function calculateFeasibility(scenario: Scenario): FeasibilityResult {
  const production = calculateProduction(scenario.production);
  const quality = calculateQuality(scenario.quality, scenario.feedstocks);
  const transport = calculateTransport(scenario.transport, production);
  const pricing = calculatePricing(
    scenario.pricing,
    quality,
    scenario.transport.mode === "PASS_THROUGH"
      ? transport.outboundTransportPerTon
      : 0,
  );
  const cost = calculateOpex(scenario, production, transport);
  const financingBase = calculateFinancing(scenario.financing);
  const capex = calculateCapex(
    scenario.capex,
    scenario.workingCapital,
    cost,
    production.pelletTonPerDay * pricing.sellingPricePerTon,
  );
  const profitBase = calculateProfit({
    production,
    pricing,
    cost,
    capex,
    financing: financingBase,
    tax: scenario.tax,
  });
  const financing = {
    ...financingBase,
    dscr:
      financingBase.monthlyDebtService > 0
        ? profitBase.ebitdaPerMonth / financingBase.monthlyDebtService
        : null,
  };
  const profit = calculateProfit({
    production,
    pricing,
    cost,
    capex,
    financing,
    tax: scenario.tax,
  });
  const breakEven = calculateBreakEven({
    scenario,
    production,
    pricing,
    cost,
    financing,
  });
  const warnings = generateWarnings({
    scenario,
    production,
    quality,
    pricing,
    cost,
    transport,
    capex,
    financing,
    profit,
    breakEven,
  });
  const status = calculateStatus({ quality, profit, warnings });

  return {
    production,
    quality,
    pricing,
    cost,
    transport,
    capex,
    financing,
    profit,
    breakEven,
    status,
    warnings,
  };
}

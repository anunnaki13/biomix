"use client";

import { useMemo } from "react";
import { ArrowRightLeft, ShieldCheck } from "lucide-react";

import { calculateFeasibility } from "@/lib/calculations";
import { formatIDRCompact } from "@/lib/formatters/currency";
import { useScenarioStore } from "@/store/scenarioStore";
import { cn } from "@/lib/utils";

export function Topbar() {
  const { scenarios, activeScenarioId, presetLabels, setActiveScenario } =
    useScenarioStore();
  const activeScenario =
    scenarios.find((scenario) => scenario.id === activeScenarioId) ?? scenarios[0];
  const result = useMemo(
    () => calculateFeasibility(activeScenario),
    [activeScenario],
  );

  return (
    <header className="panel rounded-2xl p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
            Scenario Aktif
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            {activeScenario.name}
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            {activeScenario.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-accent-green/25 bg-accent-green/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent-green">
            Phase 3 Dashboard
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
            Port check sebelum launch
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
            <ArrowRightLeft className="h-3.5 w-3.5" />
            Local-first MVP
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Formula locked by blueprint
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
            Laba {formatIDRCompact(result.profit.netProfitPerMonth)}/bulan
          </div>
        </div>
      </div>

      <div className="mt-4 flex flex-col gap-3 border-t border-white/10 pt-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex flex-wrap gap-2">
          {presetLabels.map((preset) => (
            <button
              key={preset.id}
              type="button"
              onClick={() => setActiveScenario(preset.id)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition",
                preset.id === activeScenarioId
                  ? "border-accent-cyan/40 bg-accent-cyan/10 text-accent-cyan"
                  : "border-white/10 bg-white/5 text-text-secondary hover:border-white/20 hover:text-text-primary",
              )}
            >
              {preset.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            Status {result.status.overallStatus.replaceAll("_", " ")}
          </span>
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">
            {result.transport.tripsPerMonth} trip/bulan
          </span>
        </div>
      </div>
    </header>
  );
}

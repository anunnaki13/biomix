"use client";

import { useMemo } from "react";

import { SensitivityTable } from "@/components/analysis/SensitivityTable";
import { TornadoChart } from "@/components/analysis/TornadoChart";
import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import {
  defaultSensitivityConfigs,
  runSensitivityAnalysis,
} from "@/lib/calculations/sensitivity";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function SensitivityPage() {
  const { activeScenario } = useActiveScenario();
  const rows = useMemo(
    () => runSensitivityAnalysis(activeScenario, defaultSensitivityConfigs),
    [activeScenario],
  );

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Analysis / Sensitivity"
        title="Sensitivity analysis"
        description="Run delta cepat ke harga, kualitas, operasi, HBA, dan kurs. Semua simulasi tetap lewat engine BIOMIX yang sama dengan dashboard utama."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Impact View"
        title="Tornado impact"
        description="Urutan ini menunjukkan variabel mana yang paling besar mengubah laba bulanan scenario aktif."
      >
        <TornadoChart rows={rows} />
      </FormSection>

      <FormSection
        eyebrow="Scenario Table"
        title="Sensitivity table"
        description="Bandingkan profit baseline melawan hasil setelah delta untuk setiap variabel."
      >
        <SensitivityTable rows={rows} />
      </FormSection>
    </section>
  );
}

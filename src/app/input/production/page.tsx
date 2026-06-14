"use client";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { NumberInput } from "@/components/forms/NumberInput";
import { PercentInput } from "@/components/forms/PercentInput";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { SelectField } from "@/components/forms/SelectField";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function ProductionInputPage() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();
  const production = activeScenario.production;

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / Production"
        title="Asumsi produksi"
        description="Target output atau raw input, ritme operasi, dan faktor loss proses hidup di sini. Semua perubahan langsung mengubah calculation engine pada scenario aktif."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Project"
        title="Identitas scenario"
        description="Nama dan catatan bisnis singkat untuk scenario aktif."
      >
        <div className="grid gap-4 lg:grid-cols-2">
          <TextAreaInput
            label="Deskripsi scenario"
            value={activeScenario.description}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                description: value,
              }))
            }
            rows={5}
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Throughput"
        title="Driver produksi"
        description="Pilih apakah scenario dikendalikan oleh target output pellet atau target input bahan baku."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SelectField
            label="Calculation mode"
            value={production.calculationMode}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: { ...scenario.production, calculationMode: value },
              }))
            }
            options={[
              { label: "Target Output", value: "TARGET_OUTPUT" },
              { label: "Target Input", value: "TARGET_INPUT" },
            ]}
          />
          <NumberInput
            label="Target pellet ton/hari"
            value={production.targetPelletTonPerDay}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: {
                  ...scenario.production,
                  targetPelletTonPerDay: value,
                },
              }))
            }
          />
          <NumberInput
            label="Raw input ton/hari"
            value={production.rawInputTonPerDay ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: { ...scenario.production, rawInputTonPerDay: value },
              }))
            }
          />
          <NumberInput
            label="Kapasitas mesin kg/jam"
            value={production.machineRatedCapacityKgPerHour ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: {
                  ...scenario.production,
                  machineRatedCapacityKgPerHour: value,
                },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Operations"
        title="Ritme operasi dan loss"
        description="Jam operasi, hari operasi, yield, downtime, reject, dan handling loss akan langsung menggeser output efektif."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <NumberInput
            label="Hari operasi / bulan"
            value={production.operatingDaysPerMonth}
            min={1}
            max={31}
            step={1}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: {
                  ...scenario.production,
                  operatingDaysPerMonth: value,
                },
              }))
            }
          />
          <NumberInput
            label="Jam operasi / hari"
            value={production.operatingHoursPerDay}
            min={1}
            max={24}
            step={1}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: {
                  ...scenario.production,
                  operatingHoursPerDay: value,
                },
              }))
            }
          />
          <PercentInput
            label="Yield pelletizing %"
            value={production.pelletizingYieldPct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: {
                  ...scenario.production,
                  pelletizingYieldPct: value,
                },
              }))
            }
          />
          <PercentInput
            label="Downtime %"
            value={production.downtimePct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: { ...scenario.production, downtimePct: value },
              }))
            }
          />
          <PercentInput
            label="Reject rate %"
            value={production.rejectRatePct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: { ...scenario.production, rejectRatePct: value },
              }))
            }
          />
          <PercentInput
            label="Handling loss %"
            value={production.handlingLossPct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                production: {
                  ...scenario.production,
                  handlingLossPct: value,
                },
              }))
            }
          />
        </div>
      </FormSection>
    </section>
  );
}

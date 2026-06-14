"use client";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { NumberInput } from "@/components/forms/NumberInput";
import { PercentInput } from "@/components/forms/PercentInput";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function QualityInputPage() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();
  const quality = activeScenario.quality;

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / Quality"
        title="Kualitas teknis"
        description="GCV, moisture, ash, sulfur, chlorine, dan indikator lain di sini akan memicu status teknis dan warning kelayakan."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="GCV Basis"
        title="Kalori dan moisture basis"
        description="Minimal satu basis GCV wajib ada. Anda bisa isi ARB, ADB, atau DB sesuai data lapangan."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <NumberInput
            label="GCV ARB"
            value={quality.gcvArb ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, gcvArb: value },
              }))
            }
          />
          <NumberInput
            label="GCV ADB"
            value={quality.gcvAdb ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, gcvAdb: value },
              }))
            }
          />
          <NumberInput
            label="GCV DB"
            value={quality.gcvDb ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, gcvDb: value },
              }))
            }
          />
          <PercentInput
            label="Moisture ADB %"
            value={quality.moistureAdbPct ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, moistureAdbPct: value },
              }))
            }
          />
          <PercentInput
            label="Total moisture ARB %"
            value={quality.totalMoistureArbPct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, totalMoistureArbPct: value },
              }))
            }
          />
          <PercentInput
            label="Ash %"
            value={quality.ashPct ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, ashPct: value },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Risk Indicators"
        title="Sulfur, chlorine, alkali, particle size"
        description="Bidang ini belum dipakai semua di formula utama, tetapi sudah penting untuk warning teknis dan kelengkapan data report."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PercentInput
            label="Sulfur %"
            value={quality.sulfurPct ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, sulfurPct: value },
              }))
            }
          />
          <PercentInput
            label="Chlorine %"
            value={quality.chlorinePct ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, chlorinePct: value },
              }))
            }
          />
          <PercentInput
            label="Kalium %"
            value={quality.potassiumPct ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, potassiumPct: value },
              }))
            }
          />
          <PercentInput
            label="Natrium %"
            value={quality.sodiumPct ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, sodiumPct: value },
              }))
            }
          />
          <NumberInput
            label="Particle size min mm"
            value={quality.particleSizeMinMm ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, particleSizeMinMm: value },
              }))
            }
          />
          <NumberInput
            label="Particle size max mm"
            value={quality.particleSizeMaxMm ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                quality: { ...scenario.quality, particleSizeMaxMm: value },
              }))
            }
          />
        </div>
      </FormSection>
    </section>
  );
}

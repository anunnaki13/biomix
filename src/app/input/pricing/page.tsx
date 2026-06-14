"use client";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { MoneyInput } from "@/components/forms/MoneyInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { PercentInput } from "@/components/forms/PercentInput";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { SelectField } from "@/components/forms/SelectField";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function PricingInputPage() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();
  const pricing = activeScenario.pricing;

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / Pricing"
        title="Skema harga jual"
        description="Manual, HPT, dan kontrak yang disesuaikan GCV/moisture ditentukan di sini."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Pricing Mode"
        title="Mode harga aktif"
        description="Schema akan menuntut field yang berbeda tergantung mode yang dipilih."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SelectField
            label="Pricing mode"
            value={pricing.mode}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, mode: value },
              }))
            }
            options={[
              { label: "Manual", value: "MANUAL" },
              { label: "HPT", value: "HPT" },
              { label: "Contract GCV Adjusted", value: "CONTRACT_GCV_ADJUSTED" },
            ]}
          />
          <MoneyInput
            label="Manual price / ton"
            value={pricing.manualPricePerTon ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, manualPricePerTon: value },
              }))
            }
          />
          <NumberInput
            label="HBA USD / ton"
            value={pricing.hbaUsdPerTon ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, hbaUsdPerTon: value },
              }))
            }
          />
          <MoneyInput
            label="Kurs USD/IDR"
            value={pricing.usdIdrRate ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, usdIdrRate: value },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="HPT and Contract"
        title="Parameter pricing lanjutan"
        description="Koefisien biomassa, basis GCV kontrak, dan penalty moisture menentukan harga jual efektif."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <NumberInput
            label="Biomass coefficient"
            value={pricing.biomassCoefficient ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, biomassCoefficient: value },
              }))
            }
          />
          <NumberInput
            label="Reference coal GCV"
            value={pricing.referenceCoalGcv ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, referenceCoalGcv: value },
              }))
            }
          />
          <MoneyInput
            label="Contract base price / ton"
            value={pricing.contractBasePricePerTon ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: {
                  ...scenario.pricing,
                  contractBasePricePerTon: value,
                },
              }))
            }
          />
          <NumberInput
            label="Contract base GCV"
            value={pricing.contractBaseGcv ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, contractBaseGcv: value },
              }))
            }
          />
          <NumberInput
            label="Minimum accepted GCV"
            value={pricing.minAcceptedGcv ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: { ...scenario.pricing, minAcceptedGcv: value },
              }))
            }
          />
          <PercentInput
            label="Maximum accepted moisture %"
            value={pricing.maxAcceptedMoisturePct ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: {
                  ...scenario.pricing,
                  maxAcceptedMoisturePct: value,
                },
              }))
            }
          />
          <PercentInput
            label="Penalty per pct moisture"
            value={pricing.penaltyPerPctMoisture ?? 0}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                pricing: {
                  ...scenario.pricing,
                  penaltyPerPctMoisture: value,
                },
              }))
            }
          />
        </div>
      </FormSection>
    </section>
  );
}

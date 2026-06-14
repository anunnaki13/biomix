"use client";

import { CapexItemTable } from "@/components/forms/CapexItemTable";
import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { MoneyInput } from "@/components/forms/MoneyInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { PercentInput } from "@/components/forms/PercentInput";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function CapexInputPage() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / CAPEX"
        title="CAPEX dan working capital"
        description="Item investasi, contingency, buffer OPEX, stok feedstock, receivable, dan cash reserve ditentukan di sini."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="CAPEX Items"
        title="Daftar investasi"
        description="Ubah item peralatan, sipil, electrical, dan QC sesuai kebutuhan project."
      >
        <CapexItemTable />
      </FormSection>

      <FormSection
        eyebrow="Capital Buffers"
        title="Contingency dan modal kerja"
        description="Buffer modal kerja ikut menentukan total initial capital dan payback."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <PercentInput
            label="Contingency %"
            value={activeScenario.capex.contingencyPct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                capex: { ...scenario.capex, contingencyPct: value },
              }))
            }
          />
          <NumberInput
            label="OPEX buffer months"
            value={activeScenario.workingCapital.opexBufferMonths}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                workingCapital: {
                  ...scenario.workingCapital,
                  opexBufferMonths: value,
                },
              }))
            }
          />
          <NumberInput
            label="Feedstock stock days"
            value={activeScenario.workingCapital.feedstockStockDays}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                workingCapital: {
                  ...scenario.workingCapital,
                  feedstockStockDays: value,
                },
              }))
            }
          />
          <NumberInput
            label="Receivable days"
            value={activeScenario.workingCapital.receivableDays}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                workingCapital: {
                  ...scenario.workingCapital,
                  receivableDays: value,
                },
              }))
            }
          />
          <MoneyInput
            label="Cash reserve"
            value={activeScenario.workingCapital.cashReserve}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                workingCapital: {
                  ...scenario.workingCapital,
                  cashReserve: value,
                },
              }))
            }
          />
        </div>
      </FormSection>
    </section>
  );
}

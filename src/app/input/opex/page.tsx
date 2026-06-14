"use client";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { MoneyInput } from "@/components/forms/MoneyInput";
import { OpexCustomItemTable } from "@/components/forms/OpexCustomItemTable";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function OpexInputPage() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();
  const opex = activeScenario.opex;

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / OPEX"
        title="Biaya operasi"
        description="Pisahkan cost structure agar dashboard dan sensitivity tetap bermakna."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Utilities and Labor"
        title="Utility, labor, dan overhead"
        description="Semua angka ini masuk ke OPEX non-feedstock bulanan."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MoneyInput
            label="Electricity / day"
            value={opex.electricityPerDay}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, electricityPerDay: value },
              }))
            }
          />
          <MoneyInput
            label="Water / day"
            value={opex.waterPerDay}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, waterPerDay: value },
              }))
            }
          />
          <MoneyInput
            label="Labor / month"
            value={opex.laborMonthly}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, laborMonthly: value },
              }))
            }
          />
          <MoneyInput
            label="Admin / month"
            value={opex.adminMonthly}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, adminMonthly: value },
              }))
            }
          />
          <MoneyInput
            label="Rent / month"
            value={opex.rentMonthly}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, rentMonthly: value },
              }))
            }
          />
          <MoneyInput
            label="Other / month"
            value={opex.otherMonthly}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, otherMonthly: value },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Per Ton Drivers"
        title="Biaya produksi berbasis output"
        description="Maintenance, packaging, dan cost shipment membantu analisis margin per ton."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MoneyInput
            label="Maintenance / ton"
            value={opex.maintenancePerTon}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, maintenancePerTon: value },
              }))
            }
          />
          <MoneyInput
            label="Packaging / ton"
            value={opex.packagingPerTon}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, packagingPerTon: value },
              }))
            }
          />
          <MoneyInput
            label="Lab test / shipment"
            value={opex.labTestPerShipment}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, labTestPerShipment: value },
              }))
            }
          />
          <MoneyInput
            label="Sparepart / month"
            value={opex.sparepartMonthly}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                opex: { ...scenario.opex, sparepartMonthly: value },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Flexible OPEX"
        title="Item OPEX tambahan"
        description="Tambahkan item biaya bulanan lain di luar field standar, misalnya loader, security, sewa alat, atau biaya pihak ketiga."
      >
        <OpexCustomItemTable />
      </FormSection>
    </section>
  );
}

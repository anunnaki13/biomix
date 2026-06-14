"use client";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { MoneyInput } from "@/components/forms/MoneyInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { SelectField } from "@/components/forms/SelectField";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function TransportInputPage() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();
  const transport = activeScenario.transport;

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / Transport"
        title="Transport outbound"
        description="Mode transport memengaruhi apakah biaya dibebankan ke OPEX atau hanya ikut invoice delivered price."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Transport Mode"
        title="Mode dan ritase"
        description="FOB, seller-paid, pass-through, dan DDP punya dampak margin yang berbeda."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SelectField
            label="Transport mode"
            value={transport.mode}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                transport: { ...scenario.transport, mode: value },
              }))
            }
            options={[
              { label: "FOB", value: "FOB" },
              { label: "Seller Paid", value: "SELLER_PAID" },
              { label: "Pass Through", value: "PASS_THROUGH" },
              { label: "DDP", value: "DDP" },
            ]}
          />
          <NumberInput
            label="Truck capacity ton"
            value={transport.truckCapacityTon}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                transport: { ...scenario.transport, truckCapacityTon: value },
              }))
            }
          />
          <NumberInput
            label="Minimum trips / month"
            value={transport.minimumTripsPerMonth ?? 0}
            step={1}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                transport: {
                  ...scenario.transport,
                  minimumTripsPerMonth: value,
                },
              }))
            }
          />
          <SelectField
            label="Lab shipment mode"
            value={transport.labShipmentMode}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                transport: { ...scenario.transport, labShipmentMode: value },
              }))
            }
            options={[
              { label: "Per Trip", value: "PER_TRIP" },
              { label: "Per Month", value: "PER_MONTH" },
              { label: "None", value: "NONE" },
            ]}
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Cost Structure"
        title="Tarif dan loss"
        description="Trip cost, loading/unloading, dan transport loss akan memengaruhi landed economics."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MoneyInput
            label="Cost per trip"
            value={transport.costPerTrip}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                transport: { ...scenario.transport, costPerTrip: value },
              }))
            }
          />
          <MoneyInput
            label="Loading/unloading per trip"
            value={transport.loadingUnloadingPerTrip}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                transport: {
                  ...scenario.transport,
                  loadingUnloadingPerTrip: value,
                },
              }))
            }
          />
          <NumberInput
            label="Outbound loss %"
            value={transport.outboundLossPct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                transport: { ...scenario.transport, outboundLossPct: value },
              }))
            }
          />
        </div>
      </FormSection>
    </section>
  );
}

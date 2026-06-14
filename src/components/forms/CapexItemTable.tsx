"use client";

import { MoneyInput } from "@/components/forms/MoneyInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { TextInput } from "@/components/forms/TextInput";
import { useActiveScenario } from "@/store/useActiveScenario";

export function CapexItemTable() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();

  return (
    <div className="space-y-4">
      {activeScenario.capex.items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <TextInput
              label="Item"
              value={item.name}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  capex: {
                    ...scenario.capex,
                    items: scenario.capex.items.map((capexItem) =>
                      capexItem.id === item.id
                        ? { ...capexItem, name: value }
                        : capexItem,
                    ),
                  },
                }))
              }
            />
            <TextInput
              label="Kategori"
              value={item.category}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  capex: {
                    ...scenario.capex,
                    items: scenario.capex.items.map((capexItem) =>
                      capexItem.id === item.id
                        ? { ...capexItem, category: value }
                        : capexItem,
                    ),
                  },
                }))
              }
            />
            <NumberInput
              label="Qty"
              value={item.qty}
              min={0}
              step={1}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  capex: {
                    ...scenario.capex,
                    items: scenario.capex.items.map((capexItem) =>
                      capexItem.id === item.id
                        ? { ...capexItem, qty: value }
                        : capexItem,
                    ),
                  },
                }))
              }
            />
            <MoneyInput
              label="Unit price"
              value={item.unitPrice}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  capex: {
                    ...scenario.capex,
                    items: scenario.capex.items.map((capexItem) =>
                      capexItem.id === item.id
                        ? { ...capexItem, unitPrice: value }
                        : capexItem,
                    ),
                  },
                }))
              }
            />
            <NumberInput
              label="Useful life"
              value={item.usefulLifeYears ?? 0}
              min={0}
              step={1}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  capex: {
                    ...scenario.capex,
                    items: scenario.capex.items.map((capexItem) =>
                      capexItem.id === item.id
                        ? { ...capexItem, usefulLifeYears: value }
                        : capexItem,
                    ),
                  },
                }))
              }
            />
          </div>
        </div>
      ))}
    </div>
  );
}

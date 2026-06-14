"use client";

import { Plus, Trash2 } from "lucide-react";

import { MoneyInput } from "@/components/forms/MoneyInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { TextInput } from "@/components/forms/TextInput";
import { useActiveScenario } from "@/store/useActiveScenario";

function createCapexItemId() {
  return `capex-item-${Math.random().toString(36).slice(2, 10)}`;
}

export function CapexItemTable() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            updateActiveScenario((scenario) => ({
              ...scenario,
              capex: {
                ...scenario.capex,
                items: [
                  ...scenario.capex.items,
                  {
                    id: createCapexItemId(),
                    name: "Item CAPEX Baru",
                    category: "Custom",
                    qty: 1,
                    unitPrice: 0,
                    usefulLifeYears: 5,
                  },
                ],
              },
            }))
          }
          className="inline-flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" />
          Tambah item CAPEX
        </button>
      </div>

      {activeScenario.capex.items.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
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
            <div className="flex items-end">
              <button
                type="button"
                onClick={() =>
                  updateActiveScenario((scenario) => ({
                    ...scenario,
                    capex: {
                      ...scenario.capex,
                      items: scenario.capex.items.filter(
                        (capexItem) => capexItem.id !== item.id,
                      ),
                    },
                  }))
                }
                className="inline-flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-3 text-sm text-danger"
              >
                <Trash2 className="h-4 w-4" />
                Hapus
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

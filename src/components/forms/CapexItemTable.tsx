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

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-[1120px] w-full text-sm">
          <thead className="border-b border-white/10 bg-black/10 text-left text-text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">Item</th>
              <th className="px-4 py-3 font-medium">Kategori</th>
              <th className="px-4 py-3 font-medium">Qty</th>
              <th className="px-4 py-3 font-medium">Unit price</th>
              <th className="px-4 py-3 font-medium">Subtotal</th>
              <th className="px-4 py-3 font-medium">Useful life</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activeScenario.capex.items.map((item) => (
              <tr
                key={item.id}
                className="border-b border-white/6 align-top last:border-b-0"
              >
                <td className="px-4 py-4">
                  <TextInput
                    label="Item"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <TextInput
                    label="Kategori"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <NumberInput
                    label="Qty"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <MoneyInput
                    label="Unit price"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <div className="rounded-xl border border-white/10 bg-black/10 px-3 py-3 text-sm text-text-primary">
                    Rp {(item.qty * item.unitPrice).toLocaleString("id-ID")}
                  </div>
                </td>
                <td className="px-4 py-4">
                  <NumberInput
                    label="Useful life"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
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
                    className="inline-flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-3 py-3 text-sm text-danger"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

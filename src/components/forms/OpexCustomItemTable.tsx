"use client";

import { Plus, Trash2 } from "lucide-react";

import { MoneyInput } from "@/components/forms/MoneyInput";
import { TextInput } from "@/components/forms/TextInput";
import { useActiveScenario } from "@/store/useActiveScenario";

function createOpexItemId() {
  return `opex-item-${Math.random().toString(36).slice(2, 10)}`;
}

export function OpexCustomItemTable() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            updateActiveScenario((scenario) => ({
              ...scenario,
              opex: {
                ...scenario.opex,
                customItems: [
                  ...scenario.opex.customItems,
                  {
                    id: createOpexItemId(),
                    name: "Item OPEX Baru",
                    amountMonthly: 0,
                  },
                ],
              },
            }))
          }
          className="inline-flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" />
          Tambah item OPEX
        </button>
      </div>

      {activeScenario.opex.customItems.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-white/10 bg-white/5 px-4 py-5 text-sm text-text-secondary">
          Belum ada item OPEX tambahan. Tambahkan bila ada biaya bulanan di luar field standar.
        </div>
      ) : null}

      {activeScenario.opex.customItems.length > 0 ? (
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-[720px] w-full text-sm">
            <thead className="border-b border-white/10 bg-black/10 text-left text-text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Nama item</th>
                <th className="px-4 py-3 font-medium">Biaya / bulan</th>
                <th className="px-4 py-3 font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {activeScenario.opex.customItems.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-white/6 align-top last:border-b-0"
                >
                  <td className="px-4 py-4">
                    <TextInput
                      label="Nama item"
                      hideLabel
                      value={item.name}
                      onChange={(value) =>
                        updateActiveScenario((scenario) => ({
                          ...scenario,
                          opex: {
                            ...scenario.opex,
                            customItems: scenario.opex.customItems.map((customItem) =>
                              customItem.id === item.id
                                ? { ...customItem, name: value }
                                : customItem,
                            ),
                          },
                        }))
                      }
                    />
                  </td>
                  <td className="px-4 py-4">
                    <MoneyInput
                      label="Biaya / bulan"
                      hideLabel
                      value={item.amountMonthly}
                      onChange={(value) =>
                        updateActiveScenario((scenario) => ({
                          ...scenario,
                          opex: {
                            ...scenario.opex,
                            customItems: scenario.opex.customItems.map((customItem) =>
                              customItem.id === item.id
                                ? { ...customItem, amountMonthly: value }
                                : customItem,
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
                          opex: {
                            ...scenario.opex,
                            customItems: scenario.opex.customItems.filter(
                              (customItem) => customItem.id !== item.id,
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
      ) : null}
    </div>
  );
}

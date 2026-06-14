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

      {activeScenario.opex.customItems.map((item) => (
        <div
          key={item.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_220px_auto]">
            <TextInput
              label="Nama item"
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
            <MoneyInput
              label="Biaya / bulan"
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
            <div className="flex items-end">
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

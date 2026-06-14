"use client";

import { Plus, Trash2 } from "lucide-react";

import { MoneyInput } from "@/components/forms/MoneyInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { PercentInput } from "@/components/forms/PercentInput";
import { TextInput } from "@/components/forms/TextInput";
import { useActiveScenario } from "@/store/useActiveScenario";

function createFeedstockId() {
  return `feedstock-${Math.random().toString(36).slice(2, 10)}`;
}

export function FeedstockMixTable() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          type="button"
          onClick={() =>
            updateActiveScenario((scenario) => ({
              ...scenario,
              feedstocks: [
                ...scenario.feedstocks,
                {
                  id: createFeedstockId(),
                  name: "Biomassa Baru",
                  mixPct: 0,
                  pricePerKg: 0,
                  gcvKcalPerKg: 0,
                  moisturePct: 0,
                  ashPct: 0,
                },
              ],
            }))
          }
          className="inline-flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-2 text-sm text-accent-cyan"
        >
          <Plus className="h-4 w-4" />
          Tambah feedstock
        </button>
      </div>

      {activeScenario.feedstocks.map((feedstock) => (
        <div
          key={feedstock.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            <TextInput
              label="Nama bahan"
              value={feedstock.name}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id ? { ...item, name: value } : item,
                  ),
                }))
              }
            />
            <PercentInput
              label="Mix %"
              value={feedstock.mixPct}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id ? { ...item, mixPct: value } : item,
                  ),
                }))
              }
            />
            <MoneyInput
              label="Harga beli / kg"
              value={feedstock.pricePerKg}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id ? { ...item, pricePerKg: value } : item,
                  ),
                }))
              }
            />
            <NumberInput
              label="GCV kcal/kg"
              value={feedstock.gcvKcalPerKg}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id
                      ? { ...item, gcvKcalPerKg: value }
                      : item,
                  ),
                }))
              }
            />
            <PercentInput
              label="Moisture %"
              value={feedstock.moisturePct}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id ? { ...item, moisturePct: value } : item,
                  ),
                }))
              }
            />
            <PercentInput
              label="Ash %"
              value={feedstock.ashPct ?? 0}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id ? { ...item, ashPct: value } : item,
                  ),
                }))
              }
            />
            <NumberInput
              label="Supply limit ton/hari"
              value={feedstock.supplyLimitTonPerDay ?? 0}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id
                      ? { ...item, supplyLimitTonPerDay: value }
                      : item,
                  ),
                }))
              }
            />
            <MoneyInput
              label="Inbound transport / ton"
              value={feedstock.inboundTransportPerTon ?? 0}
              onChange={(value) =>
                updateActiveScenario((scenario) => ({
                  ...scenario,
                  feedstocks: scenario.feedstocks.map((item) =>
                    item.id === feedstock.id
                      ? { ...item, inboundTransportPerTon: value }
                      : item,
                  ),
                }))
              }
            />
            <div className="flex items-end">
              <button
                type="button"
                onClick={() =>
                  updateActiveScenario((scenario) => ({
                    ...scenario,
                    feedstocks: scenario.feedstocks.filter(
                      (item) => item.id !== feedstock.id,
                    ),
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

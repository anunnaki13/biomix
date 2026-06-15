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

      <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
        <table className="min-w-[1280px] w-full text-sm">
          <thead className="border-b border-white/10 bg-black/10 text-left text-text-secondary">
            <tr>
              <th className="px-4 py-3 font-medium">Bahan</th>
              <th className="px-4 py-3 font-medium">Mix %</th>
              <th className="px-4 py-3 font-medium">Harga / kg</th>
              <th className="px-4 py-3 font-medium">GCV</th>
              <th className="px-4 py-3 font-medium">Moisture</th>
              <th className="px-4 py-3 font-medium">Ash</th>
              <th className="px-4 py-3 font-medium">Supply limit</th>
              <th className="px-4 py-3 font-medium">Inbound / ton</th>
              <th className="px-4 py-3 font-medium">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {activeScenario.feedstocks.map((feedstock) => (
              <tr
                key={feedstock.id}
                className="border-b border-white/6 align-top last:border-b-0"
              >
                <td className="px-4 py-4">
                  <TextInput
                    label="Nama bahan"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <PercentInput
                    label="Mix %"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <MoneyInput
                    label="Harga beli / kg"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <NumberInput
                    label="GCV kcal/kg"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <PercentInput
                    label="Moisture %"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <PercentInput
                    label="Ash %"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <NumberInput
                    label="Supply limit ton/hari"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
                  <MoneyInput
                    label="Inbound transport / ton"
                    hideLabel
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
                </td>
                <td className="px-4 py-4">
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

"use client";

import { MoneyInput } from "@/components/forms/MoneyInput";
import { NumberInput } from "@/components/forms/NumberInput";
import { PercentInput } from "@/components/forms/PercentInput";
import { TextInput } from "@/components/forms/TextInput";
import { useActiveScenario } from "@/store/useActiveScenario";

export function FeedstockMixTable() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();

  return (
    <div className="space-y-4">
      {activeScenario.feedstocks.map((feedstock) => (
        <div
          key={feedstock.id}
          className="rounded-2xl border border-white/10 bg-white/5 p-4"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
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
          </div>
        </div>
      ))}
    </div>
  );
}

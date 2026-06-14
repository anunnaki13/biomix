"use client";

import { useMemo } from "react";

import { BreakEvenCards } from "@/components/analysis/BreakEvenCards";
import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { calculateFeasibility } from "@/lib/calculations";
import { formatIDRCompact } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function BreakEvenPage() {
  const { activeScenario } = useActiveScenario();
  const result = useMemo(() => calculateFeasibility(activeScenario), [activeScenario]);

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Analysis / Break-even"
        title="Break-even BIOMIX"
        description="Lihat ambang harga jual, feedstock, GCV, dan volume agar project tetap tidak rugi pada scenario aktif."
        aside={<ScenarioValidationCard />}
      />

      <BreakEvenCards result={result} />

      <FormSection
        eyebrow="Interpretation"
        title="Cara membaca angka break-even"
        description="Panel ini membantu menghubungkan angka break-even dengan keputusan bisnis harian."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-text-secondary">Headroom harga jual</p>
            <p className="mt-2 font-display text-xl text-text-primary">
              {formatIDRCompact(
                result.pricing.sellingPricePerTon -
                  result.breakEven.minimumSellingPricePerTon,
              )}
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-text-secondary">Headroom output bulanan</p>
            <p className="mt-2 font-display text-xl text-text-primary">
              {result.breakEven.breakEvenVolumeTonPerMonth
                ? `${formatNumber(
                    result.production.pelletTonPerMonth -
                      result.breakEven.breakEvenVolumeTonPerMonth,
                    1,
                  )} ton`
                : "-"}
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-text-secondary">Margin saat ini</p>
            <p className="mt-2 font-display text-xl text-text-primary">
              {formatIDRCompact(result.profit.grossProfitPerTon)}
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-text-secondary">Payback saat ini</p>
            <p className="mt-2 font-display text-xl text-text-primary">
              {result.profit.simplePaybackMonths
                ? `${formatNumber(result.profit.simplePaybackMonths, 1)} bln`
                : "Belum balik modal"}
            </p>
          </article>
        </div>
      </FormSection>
    </section>
  );
}

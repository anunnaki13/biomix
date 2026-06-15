"use client";

import { FeedstockMixTable } from "@/components/forms/FeedstockMixTable";
import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { calculateQuality } from "@/lib/calculations/quality";
import { formatIDRCompact } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import { formatPercent } from "@/lib/formatters/percentage";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function FeedstockInputPage() {
  const { activeScenario } = useActiveScenario();
  const quality = calculateQuality(activeScenario.quality, activeScenario.feedstocks);
  const totalMix = activeScenario.feedstocks.reduce((sum, item) => sum + item.mixPct, 0);
  const weightedPricePerKg =
    activeScenario.feedstocks.reduce(
      (sum, item) => sum + item.pricePerKg * (item.mixPct / 100),
      0,
    ) || 0;

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / Feedstock"
        title="Mix feedstock"
        description="Atur campuran sekam, sawdust, dan biomassa lain lengkap dengan harga, kualitas, supply limit, dan cost inbound."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Feedstock Table"
        title="Multi-feedstock editor"
        description="Total mix harus tetap 100% agar scenario lolos schema dan warning engine tidak menyala."
      >
        <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <SummaryCard
            label="Jumlah item"
            value={`${activeScenario.feedstocks.length} feedstock`}
          />
          <SummaryCard
            label="Total mix"
            value={formatPercent(totalMix, 0)}
          />
          <SummaryCard
            label="Harga rata-rata campuran"
            value={formatIDRCompact(weightedPricePerKg)}
          />
          <SummaryCard
            label="GCV blended"
            value={`${formatNumber(quality.weightedFeedstockGcv, 0)} kcal/kg`}
          />
        </div>
        <FeedstockMixTable />
      </FormSection>
    </section>
  );
}

function SummaryCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-2 font-display text-xl text-text-primary">{value}</p>
    </article>
  );
}

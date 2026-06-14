import { formatIDR, formatIDRCompact } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import type { FeasibilityResult } from "@/types/results";

interface BreakEvenCardsProps {
  result: FeasibilityResult;
}

export function BreakEvenCards({ result }: BreakEvenCardsProps) {
  const cards = [
    {
      label: "Minimum selling price / ton",
      value: formatIDR(result.breakEven.minimumSellingPricePerTon),
      note: `${formatIDR(result.breakEven.minimumSellingPricePerKg)} per kg`,
    },
    {
      label: "Maximum feedstock price / kg",
      value: formatIDR(result.breakEven.maximumFeedstockPricePerKg),
      note: "Average break-even input price",
    },
    {
      label: "Minimum GCV for HPT break-even",
      value: result.breakEven.minimumGcvForBreakEven
        ? `${formatNumber(result.breakEven.minimumGcvForBreakEven, 0)} kcal/kg`
        : "-",
      note: "Available when HPT pricing inputs are complete",
    },
    {
      label: "Break-even volume / month",
      value: result.breakEven.breakEvenVolumeTonPerMonth
        ? `${formatNumber(result.breakEven.breakEvenVolumeTonPerMonth, 1)} ton`
        : "-",
      note: `Current output ${formatNumber(result.production.pelletTonPerMonth, 0)} ton/bulan`,
    },
  ];

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article key={card.label} className="panel rounded-2xl p-5">
          <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">
            {card.label}
          </p>
          <p className="mt-3 font-display text-2xl font-semibold text-text-primary">
            {card.value}
          </p>
          <p className="mt-2 text-sm text-text-secondary">{card.note}</p>
        </article>
      ))}
      <article className="panel rounded-2xl p-5 md:col-span-2 xl:col-span-4">
        <p className="text-xs uppercase tracking-[0.22em] text-accent-cyan">
          Fixed vs Variable
        </p>
        <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-sm text-text-secondary">Revenue / bulan</p>
            <p className="mt-1 font-display text-xl text-text-primary">
              {formatIDRCompact(result.profit.revenuePerMonth)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-sm text-text-secondary">Total OPEX / bulan</p>
            <p className="mt-1 font-display text-xl text-text-primary">
              {formatIDRCompact(result.cost.totalOpexPerMonth)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-sm text-text-secondary">Gross profit / ton</p>
            <p className="mt-1 font-display text-xl text-text-primary">
              {formatIDRCompact(result.profit.grossProfitPerTon)}
            </p>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
            <p className="text-sm text-text-secondary">Cashflow after debt</p>
            <p className="mt-1 font-display text-xl text-text-primary">
              {formatIDRCompact(result.profit.cashflowAfterDebtPerMonth)}
            </p>
          </div>
        </div>
      </article>
    </section>
  );
}

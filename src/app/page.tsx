import { KpiCard } from "@/components/dashboard/KpiCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { WarningPanel } from "@/components/dashboard/WarningPanel";
import { calculateFeasibility } from "@/lib/calculations";
import { formatIDR } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import { formatPercent } from "@/lib/formatters/percentage";
import { defaultScenario20TpdMix } from "@/lib/defaults/scenarios";

export default function HomePage() {
  const scenario = defaultScenario20TpdMix;
  const result = calculateFeasibility(scenario);
  const warnings = result.warnings.map(
    (warning) => `${warning.title}: ${warning.message}`,
  );

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <section className="panel rounded-2xl p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
                Dashboard Overview
              </p>
              <h1 className="font-display text-4xl font-semibold text-text-primary">
                BIOMIX sudah menghitung baseline feasibility dari scenario default.
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-text-secondary">
                Homepage ini sekarang membaca langsung calculation engine Phase 2,
                jadi angka HPT, HPP, margin, modal awal, dan warning sudah
                traceable ke formula blueprint.
              </p>
            </div>
            <StatusBadge status={result.status.overallStatus} />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Output Pellet / Hari"
            value={`${formatNumber(result.production.pelletTonPerDay, 1)} ton`}
            note={`Raw input ${formatNumber(result.production.rawInputTonPerDay, 2)} ton/hari`}
          />
          <KpiCard
            label="Output Pellet / Bulan"
            value={`${formatNumber(result.production.pelletTonPerMonth, 0)} ton`}
            note={`${formatNumber(scenario.production.operatingDaysPerMonth, 0)} hari operasi`}
          />
          <KpiCard
            label="Harga Jual / Ton"
            value={formatIDR(result.pricing.sellingPricePerTon)}
            note={result.pricing.priceModeLabel}
          />
          <KpiCard
            label="HPP / Ton"
            value={formatIDR(result.cost.hppPerTon)}
            note={`Margin ${formatIDR(result.profit.grossProfitPerTon)}/ton`}
          />
        </section>

        <section className="grid gap-4 xl:grid-cols-4">
          <KpiCard
            label="Laba Bersih / Bulan"
            value={formatIDR(result.profit.netProfitPerMonth)}
            note={`Gross margin ${formatPercent(result.profit.grossMarginPct * 100, 1)}`}
          />
          <KpiCard
            label="Modal Awal"
            value={formatIDR(result.capex.totalInitialCapital)}
            note={`CAPEX ${formatIDR(result.capex.totalCapex)}`}
          />
          <KpiCard
            label="Payback"
            value={
              result.profit.simplePaybackMonths
                ? `${formatNumber(result.profit.simplePaybackMonths, 1)} bulan`
                : "Belum balik modal"
            }
            note={`ROI tahunan ${
              result.profit.roiAnnualPct !== null
                ? formatPercent(result.profit.roiAnnualPct * 100, 1)
                : "-"
            }`}
          />
          <KpiCard
            label="Transport / Ton"
            value={formatIDR(result.transport.outboundTransportPerTon)}
            note={`${formatNumber(result.transport.tripsPerMonth, 0)} trip/bulan`}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-green">
              Technical and Pricing Snapshot
            </p>
            <div className="mt-5 grid gap-3 text-sm text-text-secondary">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>GCV ARB</span>
                <strong className="font-display text-text-primary">
                  {formatNumber(result.quality.gcvArb)} kcal/kg
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Total Moisture</span>
                <strong className="font-display text-text-primary">
                  {formatPercent(scenario.quality.totalMoistureArbPct, 0)}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Technical Status</span>
                <strong className="font-display text-text-primary">
                  {result.quality.technicalStatus}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Break-even GCV</span>
                <strong className="font-display text-text-primary">
                  {result.breakEven.minimumGcvForBreakEven
                    ? `${formatNumber(result.breakEven.minimumGcvForBreakEven)} kcal/kg`
                    : "-"}
                </strong>
              </div>
            </div>
          </article>

          <article className="panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-amber">
              Cost Breakdown
            </p>
            <div className="mt-5 space-y-3">
              {result.cost.costBreakdown.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-lg text-text-primary">
                        {item.label}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        {formatIDR(item.value)} per bulan
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-text-secondary">Per ton</p>
                      <p className="font-display text-xl text-text-primary">
                        {formatIDR(item.perTon)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>

      <div className="xl:sticky xl:top-4 xl:self-start">
        <WarningPanel
          warnings={warnings}
          badgeLabel={result.status.overallStatus.replaceAll("_", " ")}
          title="Risk and Feasibility Flags"
          emptyState="Scenario default ini belum memunculkan warning aktif."
        />
      </div>
    </div>
  );
}

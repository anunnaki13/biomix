import { KpiCard } from "@/components/dashboard/KpiCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { WarningPanel } from "@/components/dashboard/WarningPanel";
import { formatIDR } from "@/lib/formatters/currency";
import { formatPercent } from "@/lib/formatters/percentage";
import { formatNumber } from "@/lib/formatters/number";
import { defaultScenario20TpdMix } from "@/lib/defaults/scenarios";

const warnings = [
  "Calculation engine penuh belum aktif di Phase 1, jadi dashboard saat ini menampilkan anchor data dan bukan hasil profit final.",
  "Transport dan warning teknis lengkap akan dipakai langsung dari formula engine di Phase 2.",
  "Port aktif wajib dicek sebelum menjalankan server dev atau preview di VPS ini.",
];

export default function HomePage() {
  const scenario = defaultScenario20TpdMix;
  const monthlyPellet =
    scenario.production.targetPelletTonPerDay *
    scenario.production.operatingDaysPerMonth;

  const averageFeedstock =
    scenario.feedstocks.reduce(
      (sum, item) => sum + item.pricePerKg * (item.mixPct / 100),
      0,
    ) || 0;

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
                BIOMIX awal sudah hidup, sekarang pondasinya siap untuk formula.
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-text-secondary">
                Phase 1 menyiapkan shell industrial-finance, default scenario 20
                TPD, kontrak data, validasi, dan formatting. Nilai di bawah ini
                adalah anchor assumptions dari blueprint, bukan hasil perhitungan
                kelayakan final.
              </p>
            </div>
            <StatusBadge status="LAYAK_DENGAN_CATATAN" />
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Output Pellet / Hari"
            value={`${formatNumber(
              scenario.production.targetPelletTonPerDay,
              0,
            )} ton`}
            note={`Mode ${scenario.production.calculationMode.replaceAll("_", " ")}`}
          />
          <KpiCard
            label="Output Pellet / Bulan"
            value={`${formatNumber(monthlyPellet, 0)} ton`}
            note={`${formatNumber(
              scenario.production.operatingDaysPerMonth,
              0,
            )} hari operasi`}
          />
          <KpiCard
            label="Harga Feedstock Rata-rata"
            value={formatIDR(averageFeedstock)}
            note="Rata-rata berbobot dari mix sekam dan sawdust"
          />
          <KpiCard
            label="Yield Pellet"
            value={formatPercent(scenario.production.pelletizingYieldPct, 0)}
            note="Anchor assumption untuk masuk ke Phase 2"
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-green">
              Anchor Assumptions
            </p>
            <div className="mt-5 grid gap-3 text-sm text-text-secondary">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>GCV ARB</span>
                <strong className="font-display text-text-primary">
                  {formatNumber(scenario.quality.gcvArb ?? 0)} kcal/kg
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Total Moisture ARB</span>
                <strong className="font-display text-text-primary">
                  {formatPercent(scenario.quality.totalMoistureArbPct, 0)}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Mode Pricing</span>
                <strong className="font-display text-text-primary">
                  {scenario.pricing.mode}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Mode Transport</span>
                <strong className="font-display text-text-primary">
                  {scenario.transport.mode}
                </strong>
              </div>
            </div>
          </article>

          <article className="panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-amber">
              Feedstock Mix
            </p>
            <div className="mt-5 space-y-3">
              {scenario.feedstocks.map((feedstock) => (
                <div
                  key={feedstock.id}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-display text-lg text-text-primary">
                        {feedstock.name}
                      </p>
                      <p className="mt-1 text-sm text-text-secondary">
                        GCV {formatNumber(feedstock.gcvKcalPerKg)} kcal/kg •
                        Moisture {formatPercent(feedstock.moisturePct, 0)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-text-secondary">Mix</p>
                      <p className="font-display text-xl text-text-primary">
                        {formatPercent(feedstock.mixPct, 0)}
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
        <WarningPanel warnings={warnings} />
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useMemo } from "react";
import { ArrowRight, FileSpreadsheet, FlaskConical, FolderInput, Layers3 } from "lucide-react";

import { CostBreakdownChart } from "@/components/dashboard/CostBreakdownChart";
import { KpiCard } from "@/components/dashboard/KpiCard";
import { RevenueOpexChart } from "@/components/dashboard/RevenueOpexChart";
import { SensitivitySnapshot } from "@/components/dashboard/SensitivitySnapshot";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import { WarningPanel } from "@/components/dashboard/WarningPanel";
import { calculateFeasibility } from "@/lib/calculations";
import { formatIDR, formatIDRCompact } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import { formatPercent } from "@/lib/formatters/percentage";
import { useScenarioStore } from "@/store/scenarioStore";
import type { Scenario } from "@/types/biomass";

function applyScenarioDelta(
  scenario: Scenario,
  mutate: (draft: Scenario) => Scenario,
) {
  return calculateFeasibility(mutate(structuredClone(scenario)));
}

export function DashboardClient() {
  const { scenarios, activeScenarioId } = useScenarioStore();

  const scenario =
    scenarios.find((item) => item.id === activeScenarioId) ?? scenarios[0];

  const result = useMemo(() => calculateFeasibility(scenario), [scenario]);
  const warningLines = result.warnings.map(
    (warning) => `${warning.title}: ${warning.message}`,
  );

  const sensitivityItems = useMemo(() => {
    const baselineProfit = result.profit.netProfitPerMonth;

    const variants = [
      {
        label: "Harga jual +5%",
        deltaLabel: "Repricing kontrak / HPT lebih baik",
        profit: applyScenarioDelta(scenario, (draft) => {
          if (draft.pricing.mode === "MANUAL" && draft.pricing.manualPricePerTon) {
            draft.pricing.manualPricePerTon *= 1.05;
          } else {
            draft.quality.gcvArb = (draft.quality.gcvArb ?? 0) * 1.05;
          }

          return draft;
        }).profit.netProfitPerMonth,
      },
      {
        label: "Feedstock +10%",
        deltaLabel: "Tekanan harga bahan baku",
        profit: applyScenarioDelta(scenario, (draft) => {
          draft.feedstocks = draft.feedstocks.map((item) => ({
            ...item,
            pricePerKg: item.pricePerKg * 1.1,
          }));
          return draft;
        }).profit.netProfitPerMonth,
      },
      {
        label: "Transport +10%",
        deltaLabel: "Kenaikan cost per trip",
        profit: applyScenarioDelta(scenario, (draft) => {
          draft.transport.costPerTrip *= 1.1;
          return draft;
        }).profit.netProfitPerMonth,
      },
      {
        label: "Yield -3 poin",
        deltaLabel: "Loss proses lebih berat",
        profit: applyScenarioDelta(scenario, (draft) => {
          draft.production.pelletizingYieldPct = Math.max(
            1,
            draft.production.pelletizingYieldPct - 3,
          );
          return draft;
        }).profit.netProfitPerMonth,
      },
    ];

    return variants.map((item) => ({
      label: item.label,
      deltaLabel: item.deltaLabel,
      deltaValue: item.profit - baselineProfit,
    }));
  }, [result.profit.netProfitPerMonth, scenario]);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_340px]">
      <div className="space-y-6">
        <section className="panel rounded-2xl p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
                Dashboard Overview
              </p>
              <h1 className="font-display text-3xl font-semibold text-text-primary lg:text-4xl">
                {scenario.name}
              </h1>
              <p className="max-w-3xl text-sm leading-7 text-text-secondary">
                {scenario.description ??
                  "Scenario aktif dibaca langsung oleh calculation engine BIOMIX."}
              </p>
            </div>
            <StatusBadge status={result.status.overallStatus} />
          </div>

          <div className="mt-6 grid gap-3 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]">
            <QuickActionCard
              href="/input"
              icon={FolderInput}
              title="Mulai isi asumsi"
              description="Masuk ke Input Center untuk isi data berurutan dari produksi sampai financing."
            />
            <QuickActionCard
              href="/scenario"
              icon={Layers3}
              title="Kelola scenario"
              description="Duplikasi base case, rename, lalu bandingkan hasil beberapa skenario sekaligus."
            />
            <QuickActionCard
              href="/reports"
              icon={FileSpreadsheet}
              title="Keluarkan report"
              description="Buka halaman report untuk print PDF atau export CSV dan JSON dari scenario aktif."
            />
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
            value={formatIDRCompact(result.pricing.sellingPricePerTon)}
            note={result.pricing.priceModeLabel}
          />
          <KpiCard
            label="HPP / Ton"
            value={formatIDRCompact(result.cost.hppPerTon)}
            note={`Margin ${formatIDRCompact(result.profit.grossProfitPerTon)}/ton`}
          />
        </section>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Laba Bersih / Bulan"
            value={formatIDRCompact(result.profit.netProfitPerMonth)}
            note={`Gross margin ${formatPercent(result.profit.grossMarginPct * 100, 1)}`}
          />
          <KpiCard
            label="Modal Awal"
            value={formatIDRCompact(result.capex.totalInitialCapital)}
            note={`CAPEX ${formatIDRCompact(result.capex.totalCapex)}`}
          />
          <KpiCard
            label="Payback"
            value={
              result.profit.simplePaybackMonths
                ? `${formatNumber(result.profit.simplePaybackMonths, 1)} bulan`
                : "Belum balik modal"
            }
            note={`ROI ${result.profit.roiAnnualPct !== null ? formatPercent(result.profit.roiAnnualPct * 100, 1) : "-"}`}
          />
          <KpiCard
            label="Status Teknis"
            value={result.quality.technicalStatus}
            note={`GCV ${formatNumber(result.quality.gcvArb, 0)} kcal/kg`}
          />
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <article className="panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-green">
              Snapshot Teknis
            </p>
            <div className="mt-5 grid gap-3 text-sm text-text-secondary">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Effective Yield</span>
                <strong className="font-display text-text-primary">
                  {formatPercent(result.production.effectiveYieldPct, 1)}
                </strong>
              </div>
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
                <span>Required Kg/Jam</span>
                <strong className="font-display text-text-primary">
                  {formatNumber(result.production.requiredMachineKgPerHour, 0)}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Break-even GCV</span>
                <strong className="font-display text-text-primary">
                  {result.breakEven.minimumGcvForBreakEven
                    ? `${formatNumber(result.breakEven.minimumGcvForBreakEven, 0)} kcal/kg`
                    : "-"}
                </strong>
              </div>
            </div>
          </article>

          <article className="panel rounded-2xl p-6">
            <p className="text-xs uppercase tracking-[0.24em] text-accent-amber">
              Commercial Snapshot
            </p>
            <div className="mt-5 grid gap-3 text-sm text-text-secondary">
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Revenue / Bulan</span>
                <strong className="font-display text-text-primary">
                  {formatIDR(result.profit.revenuePerMonth)}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Total OPEX / Bulan</span>
                <strong className="font-display text-text-primary">
                  {formatIDR(result.cost.totalOpexPerMonth)}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Transport / Ton</span>
                <strong className="font-display text-text-primary">
                  {formatIDR(result.transport.outboundTransportPerTon)}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Feedstock Max Break-even</span>
                <strong className="font-display text-text-primary">
                  {formatIDR(result.breakEven.maximumFeedstockPricePerKg)}
                </strong>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                <span>Trip / Bulan</span>
                <strong className="font-display text-text-primary">
                  {formatNumber(result.transport.tripsPerMonth, 0)}
                </strong>
              </div>
            </div>
          </article>
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <CostBreakdownChart items={result.cost.costBreakdown} />
          <RevenueOpexChart
            revenuePerMonth={result.profit.revenuePerMonth}
            totalOpexPerMonth={result.cost.totalOpexPerMonth}
            ebitdaPerMonth={result.profit.ebitdaPerMonth}
            cashflowAfterDebtPerMonth={result.profit.cashflowAfterDebtPerMonth}
          />
        </section>

        <SensitivitySnapshot items={sensitivityItems} />

        <section className="panel rounded-2xl p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
                Next Step
              </p>
              <h2 className="font-display text-2xl font-semibold text-text-primary">
                Setelah angka terlihat, lanjut ke analisis atau report
              </h2>
              <p className="max-w-3xl text-sm leading-7 text-text-secondary">
                Sensitivity membantu melihat driver profit paling sensitif. Report cocok untuk dibawa ke review internal, investor, dan negosiasi offtaker.
              </p>
            </div>
            <Link
              href="/analysis/sensitivity"
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary transition hover:border-white/20"
            >
              <FlaskConical className="h-4 w-4" />
              Buka sensitivity
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>

      <div className="xl:sticky xl:top-4 xl:self-start">
        <WarningPanel
          warnings={warningLines}
          badgeLabel={result.status.overallStatus.replaceAll("_", " ")}
          title="Risk and Feasibility Flags"
          emptyState="Scenario aktif ini belum memunculkan warning aktif."
        />
      </div>
    </div>
  );
}

function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: typeof FolderInput;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-xl border border-white/10 bg-white/5 p-4 transition hover:border-white/20 hover:bg-white/8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="rounded-xl border border-white/10 bg-black/10 p-3 text-accent-cyan">
          <Icon className="h-4 w-4" />
        </div>
        <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-text-secondary" />
      </div>
      <h3 className="mt-4 font-display text-lg font-semibold text-text-primary">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-7 text-text-secondary">{description}</p>
    </Link>
  );
}

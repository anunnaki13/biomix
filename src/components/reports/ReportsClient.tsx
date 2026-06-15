"use client";

import Link from "next/link";
import { Download, FileJson2, FileText, FlaskConical, Gauge, Printer } from "lucide-react";
import { useMemo } from "react";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { StatusBadge } from "@/components/dashboard/StatusBadge";
import {
  buildReportSnapshot,
  serializeReportCsv,
  serializeReportJson,
  serializeReportText,
} from "@/lib/reports/export";
import { formatIDR, formatIDRCompact } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import { formatPercent } from "@/lib/formatters/percentage";
import { useActiveScenario } from "@/store/useActiveScenario";

function downloadTextFile(filename: string, content: string, type: string) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export function ReportsClient() {
  const { activeScenario } = useActiveScenario();
  const snapshot = useMemo(
    () => buildReportSnapshot(activeScenario),
    [activeScenario],
  );

  return (
    <section className="space-y-6 print:space-y-4">
      <FormPageHeader
        eyebrow="Reports"
        title="Investor and offtaker report"
        description="Halaman ini merangkum scenario aktif dalam format yang lebih mudah dibawa ke diskusi internal, negosiasi offtaker, atau print ke PDF."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Export"
        title="Keluarkan report"
        description="Gunakan Print untuk simpan sebagai PDF dari browser. CSV dan JSON akan membawa snapshot scenario aktif beserta hasil perhitungannya."
      >
        <div className="flex flex-wrap gap-3 print:hidden">
          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-3 text-sm text-accent-cyan"
          >
            <Printer className="h-4 w-4" />
            Print / PDF
          </button>
          <button
            type="button"
            onClick={() =>
              downloadTextFile(
                `${activeScenario.name.replaceAll(/\s+/g, "-").toLowerCase()}-report.csv`,
                serializeReportCsv(snapshot),
                "text/csv;charset=utf-8",
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
          <button
            type="button"
            onClick={() =>
              downloadTextFile(
                `${activeScenario.name.replaceAll(/\s+/g, "-").toLowerCase()}-report.json`,
                serializeReportJson(snapshot),
                "application/json",
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary"
          >
            <FileJson2 className="h-4 w-4" />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() =>
              downloadTextFile(
                `${activeScenario.name.replaceAll(/\s+/g, "-").toLowerCase()}-review.txt`,
                serializeReportText(snapshot),
                "text/plain;charset=utf-8",
              )
            }
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary"
          >
            <FileText className="h-4 w-4" />
            Export TXT
          </button>
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-3 print:hidden">
          <Link
            href="/analysis/sensitivity"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/20"
          >
            <div className="flex items-center gap-2 text-accent-cyan">
              <FlaskConical className="h-4 w-4" />
              <span className="text-sm font-medium">Review sensitivity</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Cek driver profit paling sensitif sebelum share report keluar.
            </p>
          </Link>
          <Link
            href="/analysis/breakeven"
            className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/20"
          >
            <div className="flex items-center gap-2 text-accent-cyan">
              <Gauge className="h-4 w-4" />
              <span className="text-sm font-medium">Review break-even</span>
            </div>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Pastikan threshold harga, GCV, dan volume masih masuk akal.
            </p>
          </Link>
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm font-medium text-text-primary">Print note</p>
            <p className="mt-2 text-sm leading-6 text-text-secondary">
              Saat diprint, sidebar dan topbar otomatis disembunyikan agar hasilnya lebih seperti dokumen review.
            </p>
          </article>
        </div>
      </FormSection>

      <section className="grid gap-6 print:block xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <section className="panel rounded-2xl p-6 print:rounded-none print:border-none print:px-0 print:py-0">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
                  Decision Summary
                </p>
                <h2 className="font-display text-3xl font-semibold text-text-primary">
                  {snapshot.scenario.name}
                </h2>
                <p className="max-w-3xl text-sm leading-7 text-text-secondary">
                  {snapshot.scenario.description || "Scenario aktif tanpa catatan tambahan."}
                </p>
              </div>
              <StatusBadge status={snapshot.summary.status as "LAYAK" | "LAYAK_DENGAN_CATATAN" | "TIDAK_LAYAK"} />
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/10 px-4 py-4 print:rounded-none print:border print:bg-transparent">
              <p className="text-sm font-medium text-text-primary">Executive summary</p>
              <p className="mt-2 text-sm leading-7 text-text-secondary">
                {snapshot.summary.status === "LAYAK"
                  ? "Scenario ini sudah layak dibawa ke pembahasan komersial dan operasional lanjutan, dengan catatan warning tetap dibaca."
                  : snapshot.summary.status === "LAYAK_DENGAN_CATATAN"
                    ? "Scenario ini masih bisa diteruskan, tetapi perlu mitigasi di area warning, break-even, atau kualitas sebelum keputusan final."
                    : "Scenario ini belum cukup kuat untuk dibawa sebagai proposal final tanpa perbaikan asumsi inti."}
              </p>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-text-secondary">Revenue / bulan</p>
                <p className="mt-2 font-display text-xl text-text-primary">
                  {formatIDRCompact(snapshot.summary.revenuePerMonth)}
                </p>
              </article>
              <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-text-secondary">Laba bersih / bulan</p>
                <p className="mt-2 font-display text-xl text-text-primary">
                  {formatIDRCompact(snapshot.summary.netProfitPerMonth)}
                </p>
              </article>
              <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-text-secondary">HPP / ton</p>
                <p className="mt-2 font-display text-xl text-text-primary">
                  {formatIDRCompact(snapshot.summary.hppPerTon)}
                </p>
              </article>
              <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
                <p className="text-sm text-text-secondary">Payback</p>
                <p className="mt-2 font-display text-xl text-text-primary">
                  {snapshot.summary.paybackMonths === null
                    ? "Belum balik modal"
                    : `${formatNumber(snapshot.summary.paybackMonths, 1)} bulan`}
                </p>
              </article>
            </div>
          </section>

          <FormSection
            eyebrow="Assumptions"
            title="Asumsi inti"
            description="Ini angka minimum yang biasanya paling dulu ditanyakan saat review feasibility."
          >
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <AssumptionCard
                label="Output target"
                value={`${formatNumber(snapshot.assumptions.targetOutputTonPerDay, 2)} ton/hari`}
              />
              <AssumptionCard
                label="Hari operasi"
                value={`${formatNumber(snapshot.assumptions.operatingDaysPerMonth, 0)} hari/bulan`}
              />
              <AssumptionCard
                label="Jam operasi"
                value={`${formatNumber(snapshot.assumptions.operatingHoursPerDay, 0)} jam/hari`}
              />
              <AssumptionCard
                label="Yield"
                value={formatPercent(snapshot.assumptions.yieldPct, 1)}
              />
              <AssumptionCard
                label="Mode pricing"
                value={snapshot.assumptions.pricingMode}
              />
              <AssumptionCard
                label="Mode transport"
                value={snapshot.assumptions.transportMode}
              />
            </div>
          </FormSection>

          <FormSection
            eyebrow="Feedstock"
            title="Komposisi biomassa"
            description="Ringkasan campuran bahan baku, harga, GCV, dan moisture scenario aktif."
          >
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
              <table className="min-w-full text-sm">
                <thead className="border-b border-white/10 bg-black/10 text-left text-text-secondary">
                  <tr>
                    <th className="px-4 py-3 font-medium">Feedstock</th>
                    <th className="px-4 py-3 font-medium">Mix</th>
                    <th className="px-4 py-3 font-medium">Harga / kg</th>
                    <th className="px-4 py-3 font-medium">GCV</th>
                    <th className="px-4 py-3 font-medium">Moisture</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.feedstocks.map((item) => (
                    <tr key={item.name} className="border-b border-white/6 last:border-b-0">
                      <td className="px-4 py-3 text-text-primary">{item.name}</td>
                      <td className="px-4 py-3 text-text-secondary">{formatPercent(item.mixPct, 0)}</td>
                      <td className="px-4 py-3 text-text-secondary">{formatIDR(item.pricePerKg)}</td>
                      <td className="px-4 py-3 text-text-secondary">
                        {formatNumber(item.gcvKcalPerKg, 0)} kcal/kg
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{formatPercent(item.moisturePct, 0)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FormSection>

          <section className="grid gap-6 xl:grid-cols-2">
            <FormSection
              eyebrow="OPEX"
              title="OPEX breakdown"
              description="Nilai ini sudah masuk ke kalkulasi HPP dan profitability."
            >
              <div className="space-y-3">
                {snapshot.opexBreakdown.map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-text-primary">{item.label}</p>
                      <p className="text-xs text-text-secondary">
                        {formatIDR(item.perTon)}/ton
                      </p>
                    </div>
                    <strong className="font-display text-text-primary">
                      {formatIDR(item.monthlyValue)}
                    </strong>
                  </div>
                ))}
              </div>
            </FormSection>

            <FormSection
              eyebrow="CAPEX"
              title="CAPEX breakdown"
              description="Daftar item investasi awal yang sedang dipakai scenario aktif."
            >
              <div className="space-y-3">
                {snapshot.capexItems.map((item) => (
                  <div
                    key={`${item.category}-${item.name}`}
                    className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-sm text-text-primary">{item.name}</p>
                      <p className="text-xs text-text-secondary">
                        {item.category} | Qty {formatNumber(item.qty, 0)} x {formatIDR(item.unitPrice)}
                      </p>
                    </div>
                    <strong className="font-display text-text-primary">
                      {formatIDR(item.subtotal)}
                    </strong>
                  </div>
                ))}
              </div>
            </FormSection>
          </section>

          <FormSection
            eyebrow="Sensitivity"
            title="Driver impact"
            description="Perubahan profit bulanan saat setiap driver utama digeser sekali dari baseline."
          >
            <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
              <table className="min-w-full text-sm">
                <thead className="border-b border-white/10 bg-black/10 text-left text-text-secondary">
                  <tr>
                    <th className="px-4 py-3 font-medium">Driver</th>
                    <th className="px-4 py-3 font-medium">Delta</th>
                    <th className="px-4 py-3 font-medium">Dampak laba / bln</th>
                    <th className="px-4 py-3 font-medium">Status hasil</th>
                  </tr>
                </thead>
                <tbody>
                  {snapshot.sensitivity.map((item) => (
                    <tr key={item.label} className="border-b border-white/6 last:border-b-0">
                      <td className="px-4 py-3 text-text-primary">{item.label}</td>
                      <td className="px-4 py-3 text-text-secondary">
                        {item.deltaPct > 0 ? "+" : ""}
                        {formatNumber(item.deltaPct, 0)}%
                      </td>
                      <td className="px-4 py-3 text-text-secondary">
                        {formatIDR(item.deltaProfitPerMonth)}
                      </td>
                      <td className="px-4 py-3 text-text-secondary">{item.adjustedStatus}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </FormSection>
        </div>

        <div className="space-y-6 print:mt-6 xl:sticky xl:top-4 xl:self-start">
          <FormSection
            eyebrow="Break-even"
            title="Threshold cepat"
            description="Angka minimum agar project tidak jatuh ke rugi dalam scenario aktif."
          >
            <div className="space-y-3">
              <MetricRow
                label="Min harga jual / ton"
                value={formatIDR(snapshot.summary.breakEvenPricePerTon)}
              />
              <MetricRow
                label="Max harga feedstock / kg"
                value={formatIDR(snapshot.summary.maxFeedstockPricePerKg)}
              />
              <MetricRow
                label="Min GCV break-even"
                value={
                  snapshot.summary.minimumGcvForBreakEven
                    ? `${formatNumber(snapshot.summary.minimumGcvForBreakEven, 0)} kcal/kg`
                    : "-"
                }
              />
              <MetricRow
                label="Volume break-even / bulan"
                value={
                  snapshot.summary.breakEvenVolumeTonPerMonth
                    ? `${formatNumber(snapshot.summary.breakEvenVolumeTonPerMonth, 1)} ton`
                    : "-"
                }
              />
            </div>
          </FormSection>

          <FormSection
            eyebrow="Risks"
            title="Warning panel"
            description="Flag ini perlu dibaca bareng angka profit agar keputusan tidak terlalu cepat."
          >
            <div className="space-y-3">
              {snapshot.warnings.length > 0 ? (
                snapshot.warnings.map((item) => (
                  <article
                    key={`${item.level}-${item.title}`}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-accent-amber">
                      {item.level}
                    </p>
                    <p className="mt-2 text-sm font-medium text-text-primary">
                      {item.title}
                    </p>
                    <p className="mt-2 text-sm leading-7 text-text-secondary">
                      {item.message}
                    </p>
                  </article>
                ))
              ) : (
                <p className="text-sm leading-7 text-text-secondary">
                  Tidak ada warning aktif pada scenario ini.
                </p>
              )}
            </div>
          </FormSection>

          <FormSection
            eyebrow="Disclaimer"
            title="Batas penggunaan report"
            description="Ini sengaja eksplisit supaya report tidak disalahartikan sebagai final investment memo."
          >
            <ul className="space-y-3 text-sm leading-7 text-text-secondary">
              {snapshot.disclaimer.map((item) => (
                <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </FormSection>
        </div>
      </section>
    </section>
  );
}

function AssumptionCard({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
      <p className="text-sm text-text-secondary">{label}</p>
      <p className="mt-2 font-display text-xl text-text-primary">{value}</p>
    </article>
  );
}

function MetricRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
      <span className="text-sm text-text-secondary">{label}</span>
      <strong className="font-display text-text-primary">{value}</strong>
    </div>
  );
}

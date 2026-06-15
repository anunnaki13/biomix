"use client";

import Link from "next/link";
import { getScenarioReadiness } from "@/lib/workflow/scenarioReadiness";
import { useActiveScenario } from "@/store/useActiveScenario";
import {
  ArrowRight,
  Banknote,
  Factory,
  FileCog,
  Fuel,
  Settings2,
  ShieldCheck,
  Truck,
  Wallet,
} from "lucide-react";

const steps = [
  {
    href: "/input/production",
    title: "1. Produksi",
    description: "Tentukan target output, jam operasi, yield, downtime, dan loss proses.",
    icon: Factory,
  },
  {
    href: "/input/feedstock",
    title: "2. Feedstock",
    description: "Masukkan campuran biomassa, harga, GCV, moisture, supply limit, dan inbound cost.",
    icon: Fuel,
  },
  {
    href: "/input/quality",
    title: "3. Quality",
    description: "Lengkapi basis GCV, moisture, ash, sulfur, chlorine, dan indikator teknis lain.",
    icon: ShieldCheck,
  },
  {
    href: "/input/pricing",
    title: "4. Pricing",
    description: "Pilih mode manual, HPT, atau contract-adjusted, lalu isi parameternya.",
    icon: Banknote,
  },
  {
    href: "/input/opex",
    title: "5. OPEX",
    description: "Isi biaya operasi standar, lalu tambahkan item OPEX bebas bila dibutuhkan.",
    icon: Wallet,
  },
  {
    href: "/input/capex",
    title: "6. CAPEX",
    description: "Edit daftar item investasi dan tambahkan item CAPEX baru tanpa batas tetap.",
    icon: FileCog,
  },
  {
    href: "/input/transport",
    title: "7. Transport",
    description: "Atur mode transport, tarif trip, minimum ritase, dan loss outbound.",
    icon: Truck,
  },
  {
    href: "/input/financing",
    title: "8. Financing",
    description: "Masukkan struktur pinjaman, tax toggle, tenor, bunga, dan cashflow debt.",
    icon: Settings2,
  },
];

export default function InputIndexPage() {
  const { activeScenario } = useActiveScenario();
  const readiness = getScenarioReadiness(activeScenario);

  return (
    <section className="space-y-6">
      <div className="panel rounded-2xl p-6">
        <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
          Input Center
        </p>
        <h1 className="mt-3 font-display text-3xl font-semibold text-text-primary">
          Alur input BIOMIX
        </h1>
        <p className="mt-3 max-w-4xl text-sm leading-7 text-text-secondary">
          Supaya tidak bingung, isi data dari atas ke bawah. Setelah selesai tiap
          langkah, kembali ke dashboard untuk melihat dampaknya. CAPEX dan OPEX
          sekarang punya ruang untuk tambah item baru, jadi Anda tidak terbatasi
          oleh field bawaan.
        </p>

        <div className="mt-6 grid gap-3 md:grid-cols-3">
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-text-secondary">Progress input</p>
            <p className="mt-2 font-display text-2xl text-text-primary">
              {readiness.completedSections}/{readiness.totalSections}
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-text-secondary">Status readiness</p>
            <p className="mt-2 font-display text-2xl text-text-primary">
              {readiness.statusLabel === "READY_FOR_REVIEW"
                ? "Siap review"
                : readiness.statusLabel === "NEEDS_VALIDATION"
                  ? "Perlu validasi"
                  : "Perlu input"}
            </p>
          </article>
          <article className="rounded-xl border border-white/10 bg-white/5 px-4 py-4">
            <p className="text-sm text-text-secondary">Langkah berikutnya</p>
            <p className="mt-2 text-sm leading-7 text-text-primary">
              {readiness.nextSection
                ? `Lengkapi ${readiness.nextSection.label}`
                : "Scenario aktif sudah siap dibawa ke analysis atau report."}
            </p>
          </article>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {steps.map(({ href, title, description, icon: Icon }) => {
          const section = readiness.sections.find((item) => item.href === href);

          return (
            <Link
              key={href}
              href={href}
              className="panel flex items-start justify-between gap-4 rounded-2xl p-5 transition hover:border-white/20 hover:bg-white/8"
            >
              <div className="flex items-start gap-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-3 text-accent-cyan">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-xl font-semibold text-text-primary">
                      {title}
                    </h2>
                    {section ? (
                      <span
                        className={`rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.16em] ${
                          section.complete
                            ? "bg-accent-green/10 text-accent-green"
                            : "bg-accent-amber/10 text-accent-amber"
                        }`}
                      >
                        {section.complete ? "Complete" : "Perlu isi"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-2 max-w-xl text-sm leading-7 text-text-secondary">
                    {description}
                  </p>
                  {section ? (
                    <p className="mt-2 text-sm text-text-secondary">
                      {section.detail}
                    </p>
                  ) : null}
                </div>
              </div>
              <ArrowRight className="mt-1 h-5 w-5 shrink-0 text-text-secondary" />
            </Link>
          );
        })}
      </div>
    </section>
  );
}

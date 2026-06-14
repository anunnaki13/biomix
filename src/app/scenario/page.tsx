"use client";

import { useRef, useState } from "react";
import { Copy, Download, Layers3, Plus, Star, Trash2, Upload } from "lucide-react";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { TextAreaInput } from "@/components/forms/TextAreaInput";
import { TextInput } from "@/components/forms/TextInput";
import { calculateFeasibility } from "@/lib/calculations";
import { formatIDRCompact } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import { parseScenarioImport, serializeScenarios } from "@/lib/storage/importExport";
import { useScenarioStore } from "@/store/scenarioStore";

export default function ScenarioPage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [importStatus, setImportStatus] = useState<string>("");

  const {
    scenarios,
    activeScenarioId,
    defaultScenarioId,
    setActiveScenario,
    setDefaultScenario,
    createScenario,
    duplicateScenario,
    deleteScenario,
    importScenarios,
    updateScenarioMeta,
  } = useScenarioStore();

  const comparisonRows = scenarios.map((scenario) => {
    const result = calculateFeasibility(scenario);

    return {
      id: scenario.id,
      name: scenario.name,
      description: scenario.description ?? "",
      outputPerMonth: result.production.pelletTonPerMonth,
      pricePerTon: result.pricing.sellingPricePerTon,
      hppPerTon: result.cost.hppPerTon,
      marginPerTon: result.profit.grossProfitPerTon,
      profitPerMonth: result.profit.netProfitPerMonth,
      payback: result.profit.simplePaybackMonths,
      status: result.status.overallStatus,
    };
  });

  const handleExport = () => {
    const blob = new Blob([serializeScenarios(scenarios)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "biomix-scenarios.json";
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = async (file: File) => {
    try {
      const text = await file.text();
      const importedScenarios = parseScenarioImport(text);
      importScenarios(importedScenarios, "merge");
      setImportStatus(`${importedScenarios.length} scenario berhasil diimport.`);
    } catch (error) {
      setImportStatus(
        error instanceof Error ? error.message : "Import scenario gagal.",
      );
    }
  };

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Scenario"
        title="Scenario management"
        description="Kelola skenario BIOMIX secara local-first, jadikan salah satu sebagai default, bandingkan performa, lalu export atau import JSON saat perlu berpindah perangkat."
        aside={
          <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-secondary">
            {importStatus || "Persistence aktif lewat localStorage browser."}
          </div>
        }
      />

      <FormSection
        eyebrow="Actions"
        title="Operasi scenario"
        description="Buat scenario baru, duplikasi scenario aktif, export semua scenario, atau import kembali dari JSON."
      >
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => createScenario()}
            className="inline-flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-3 text-sm text-accent-cyan"
          >
            <Plus className="h-4 w-4" />
            Buat scenario
          </button>
          <button
            type="button"
            onClick={() => duplicateScenario(activeScenarioId)}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary"
          >
            <Copy className="h-4 w-4" />
            Duplikasi aktif
          </button>
          <button
            type="button"
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary"
          >
            <Download className="h-4 w-4" />
            Export JSON
          </button>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary"
          >
            <Upload className="h-4 w-4" />
            Import JSON
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) {
                void handleImport(file);
              }
              event.target.value = "";
            }}
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Library"
        title="Scenario library"
        description="Pilih scenario aktif, ubah nama atau deskripsi, tandai sebagai default, atau hapus jika sudah tidak diperlukan."
      >
        <div className="space-y-4">
          {scenarios.map((scenario) => (
            <div
              key={scenario.id}
              className={`rounded-2xl border p-4 ${
                scenario.id === activeScenarioId
                  ? "border-accent-cyan/40 bg-accent-cyan/10"
                  : "border-white/10 bg-white/5"
              }`}
            >
              <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                <div className="flex min-w-0 items-start gap-3">
                  <div className="rounded-xl border border-white/10 bg-black/10 p-3 text-text-secondary">
                    <Layers3 className="h-4 w-4" />
                  </div>
                  <div className="min-w-0 space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {scenario.id === activeScenarioId ? (
                        <span className="rounded-full border border-accent-cyan/30 bg-accent-cyan/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-cyan">
                          Aktif
                        </span>
                      ) : null}
                      {scenario.id === defaultScenarioId ? (
                        <span className="rounded-full border border-accent-green/30 bg-accent-green/10 px-3 py-1 text-xs uppercase tracking-[0.2em] text-accent-green">
                          Default
                        </span>
                      ) : null}
                    </div>
                    <div className="grid gap-4 lg:grid-cols-2">
                      <TextInput
                        label="Nama scenario"
                        value={scenario.name}
                        onChange={(value) =>
                          updateScenarioMeta(scenario.id, { name: value })
                        }
                      />
                      <TextAreaInput
                        label="Deskripsi"
                        value={scenario.description}
                        onChange={(value) =>
                          updateScenarioMeta(scenario.id, { description: value })
                        }
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 xl:justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveScenario(scenario.id)}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary"
                  >
                    Jadikan aktif
                  </button>
                  <button
                    type="button"
                    onClick={() => setDefaultScenario(scenario.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary"
                  >
                    <Star className="h-4 w-4" />
                    Jadikan default
                  </button>
                  <button
                    type="button"
                    onClick={() => duplicateScenario(scenario.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-text-primary"
                  >
                    <Copy className="h-4 w-4" />
                    Duplikasi
                  </button>
                  <button
                    type="button"
                    disabled={scenarios.length <= 1}
                    onClick={() => deleteScenario(scenario.id)}
                    className="inline-flex items-center gap-2 rounded-xl border border-danger/30 bg-danger/10 px-4 py-2 text-sm text-danger disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 className="h-4 w-4" />
                    Hapus
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </FormSection>

      <FormSection
        eyebrow="Comparison"
        title="Compare scenario"
        description="Lihat output, harga, HPP, margin, laba, payback, dan status semua scenario dalam satu meja."
      >
        <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
          <table className="min-w-full text-sm">
            <thead className="border-b border-white/10 bg-black/10 text-left text-text-secondary">
              <tr>
                <th className="px-4 py-3 font-medium">Scenario</th>
                <th className="px-4 py-3 font-medium">Output / bln</th>
                <th className="px-4 py-3 font-medium">Harga / ton</th>
                <th className="px-4 py-3 font-medium">HPP / ton</th>
                <th className="px-4 py-3 font-medium">Margin / ton</th>
                <th className="px-4 py-3 font-medium">Laba / bln</th>
                <th className="px-4 py-3 font-medium">Payback</th>
                <th className="px-4 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-white/6 last:border-b-0"
                >
                  <td className="px-4 py-3 text-text-primary">{row.name}</td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatNumber(row.outputPerMonth, 0)} ton
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatIDRCompact(row.pricePerTon)}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatIDRCompact(row.hppPerTon)}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatIDRCompact(row.marginPerTon)}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {formatIDRCompact(row.profitPerMonth)}
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    {row.payback ? `${formatNumber(row.payback, 1)} bln` : "-"}
                  </td>
                  <td className="px-4 py-3 text-text-primary">{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FormSection>
    </section>
  );
}

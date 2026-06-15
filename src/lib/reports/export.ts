import { calculateFeasibility } from "@/lib/calculations";
import {
  defaultSensitivityConfigs,
  runSensitivityAnalysis,
} from "@/lib/calculations/sensitivity";
import { formatIDR } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import { formatPercent } from "@/lib/formatters/percentage";
import type { Scenario } from "@/types/biomass";

const REPORT_DISCLAIMER = [
  "Simulasi BIOMIX bukan keputusan final investasi dan wajib divalidasi dengan uji lab biomassa.",
  "Kapasitas, yield, dan kualitas wajib diuji lagi lewat trial produksi dan verifikasi vendor mesin.",
  "Harga jual, penalty kualitas, dan volume kontrak wajib dikunci lewat negosiasi offtaker.",
  "Harga bahan baku, supply limit, dan logistik wajib divalidasi dengan supplier dan transporter aktual.",
  "Aspek legal, pajak, dan struktur pembiayaan wajib direview oleh penasihat yang relevan.",
] as const;

export interface ReportSnapshot {
  generatedAt: string;
  scenario: {
    id: string;
    name: string;
    description: string;
    updatedAt: string;
  };
  summary: {
    status: string;
    revenuePerMonth: number;
    netProfitPerMonth: number;
    hppPerTon: number;
    paybackMonths: number | null;
    breakEvenPricePerTon: number;
    maxFeedstockPricePerKg: number;
    minimumGcvForBreakEven?: number;
    breakEvenVolumeTonPerMonth?: number;
  };
  assumptions: {
    targetOutputTonPerDay: number;
    operatingDaysPerMonth: number;
    operatingHoursPerDay: number;
    yieldPct: number;
    pricingMode: string;
    transportMode: string;
  };
  feedstocks: Array<{
    name: string;
    mixPct: number;
    pricePerKg: number;
    gcvKcalPerKg: number;
    moisturePct: number;
  }>;
  opexBreakdown: Array<{
    label: string;
    monthlyValue: number;
    perTon: number;
  }>;
  capexItems: Array<{
    name: string;
    category: string;
    qty: number;
    unitPrice: number;
    subtotal: number;
  }>;
  sensitivity: Array<{
    label: string;
    deltaPct: number;
    deltaProfitPerMonth: number;
    adjustedStatus: string;
  }>;
  warnings: Array<{
    level: string;
    title: string;
    message: string;
  }>;
  disclaimer: readonly string[];
}

function csvEscape(value: string | number) {
  const stringValue = String(value);
  if (/[",\n]/.test(stringValue)) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }
  return stringValue;
}

export function buildReportSnapshot(scenario: Scenario): ReportSnapshot {
  const result = calculateFeasibility(scenario);
  const sensitivity = runSensitivityAnalysis(scenario, defaultSensitivityConfigs);

  return {
    generatedAt: new Date().toISOString(),
    scenario: {
      id: scenario.id,
      name: scenario.name,
      description: scenario.description ?? "",
      updatedAt: scenario.updatedAt,
    },
    summary: {
      status: result.status.overallStatus,
      revenuePerMonth: result.profit.revenuePerMonth,
      netProfitPerMonth: result.profit.netProfitPerMonth,
      hppPerTon: result.cost.hppPerTon,
      paybackMonths: result.profit.simplePaybackMonths,
      breakEvenPricePerTon: result.breakEven.minimumSellingPricePerTon,
      maxFeedstockPricePerKg: result.breakEven.maximumFeedstockPricePerKg,
      minimumGcvForBreakEven: result.breakEven.minimumGcvForBreakEven,
      breakEvenVolumeTonPerMonth: result.breakEven.breakEvenVolumeTonPerMonth,
    },
    assumptions: {
      targetOutputTonPerDay: scenario.production.targetPelletTonPerDay,
      operatingDaysPerMonth: scenario.production.operatingDaysPerMonth,
      operatingHoursPerDay: scenario.production.operatingHoursPerDay,
      yieldPct: scenario.production.pelletizingYieldPct,
      pricingMode: scenario.pricing.mode,
      transportMode: scenario.transport.mode,
    },
    feedstocks: scenario.feedstocks.map((item) => ({
      name: item.name,
      mixPct: item.mixPct,
      pricePerKg: item.pricePerKg,
      gcvKcalPerKg: item.gcvKcalPerKg,
      moisturePct: item.moisturePct,
    })),
    opexBreakdown: result.cost.costBreakdown.map((item) => ({
      label: item.label,
      monthlyValue: item.value,
      perTon: item.perTon,
    })),
    capexItems: scenario.capex.items.map((item) => ({
      name: item.name,
      category: item.category,
      qty: item.qty,
      unitPrice: item.unitPrice,
      subtotal: item.qty * item.unitPrice,
    })),
    sensitivity: sensitivity.map((item) => ({
      label: item.label,
      deltaPct: item.deltaPct,
      deltaProfitPerMonth: item.deltaProfitPerMonth,
      adjustedStatus: item.adjustedStatus,
    })),
    warnings: result.warnings.map((item) => ({
      level: item.level,
      title: item.title,
      message: item.message,
    })),
    disclaimer: REPORT_DISCLAIMER,
  };
}

export function serializeReportJson(snapshot: ReportSnapshot) {
  return JSON.stringify(snapshot, null, 2);
}

export function serializeReportText(snapshot: ReportSnapshot) {
  const lines = [
    `BIOMIX Report - ${snapshot.scenario.name}`,
    "",
    `Generated at: ${snapshot.generatedAt}`,
    `Status: ${snapshot.summary.status}`,
    `Revenue / month: ${formatIDR(snapshot.summary.revenuePerMonth)}`,
    `Net profit / month: ${formatIDR(snapshot.summary.netProfitPerMonth)}`,
    `HPP / ton: ${formatIDR(snapshot.summary.hppPerTon)}`,
    `Break-even price / ton: ${formatIDR(snapshot.summary.breakEvenPricePerTon)}`,
    `Max feedstock / kg: ${formatIDR(snapshot.summary.maxFeedstockPricePerKg)}`,
    "",
    "Assumptions:",
    `- Output target: ${formatNumber(snapshot.assumptions.targetOutputTonPerDay, 2)} ton/day`,
    `- Operating days: ${formatNumber(snapshot.assumptions.operatingDaysPerMonth, 0)} days/month`,
    `- Operating hours: ${formatNumber(snapshot.assumptions.operatingHoursPerDay, 0)} hours/day`,
    `- Yield: ${formatPercent(snapshot.assumptions.yieldPct, 1)}`,
    `- Pricing mode: ${snapshot.assumptions.pricingMode}`,
    `- Transport mode: ${snapshot.assumptions.transportMode}`,
    "",
    "Warnings:",
    ...(snapshot.warnings.length > 0
      ? snapshot.warnings.map(
          (item) => `- [${item.level.toUpperCase()}] ${item.title}: ${item.message}`,
        )
      : ["- No active warning"]),
    "",
    "Disclaimer:",
    ...snapshot.disclaimer.map((item) => `- ${item}`),
  ];

  return lines.join("\n");
}

export function serializeReportCsv(snapshot: ReportSnapshot) {
  const rows = [
    ["section", "item", "value", "notes"],
    ["summary", "scenario_name", snapshot.scenario.name, snapshot.scenario.description],
    ["summary", "generated_at", snapshot.generatedAt, ""],
    ["summary", "status", snapshot.summary.status, ""],
    [
      "summary",
      "revenue_per_month",
      formatIDR(snapshot.summary.revenuePerMonth),
      "",
    ],
    [
      "summary",
      "net_profit_per_month",
      formatIDR(snapshot.summary.netProfitPerMonth),
      "",
    ],
    ["summary", "hpp_per_ton", formatIDR(snapshot.summary.hppPerTon), ""],
    [
      "summary",
      "payback_months",
      snapshot.summary.paybackMonths === null
        ? "Belum balik modal"
        : formatNumber(snapshot.summary.paybackMonths, 1),
      "",
    ],
    [
      "summary",
      "break_even_price_per_ton",
      formatIDR(snapshot.summary.breakEvenPricePerTon),
      "",
    ],
    [
      "summary",
      "max_feedstock_price_per_kg",
      formatIDR(snapshot.summary.maxFeedstockPricePerKg),
      "",
    ],
    [
      "summary",
      "minimum_gcv_for_break_even",
      snapshot.summary.minimumGcvForBreakEven
        ? `${formatNumber(snapshot.summary.minimumGcvForBreakEven, 0)} kcal/kg`
        : "-",
      "",
    ],
    [
      "summary",
      "break_even_volume_ton_per_month",
      snapshot.summary.breakEvenVolumeTonPerMonth
        ? formatNumber(snapshot.summary.breakEvenVolumeTonPerMonth, 1)
        : "-",
      "",
    ],
    [
      "assumption",
      "target_output_ton_per_day",
      formatNumber(snapshot.assumptions.targetOutputTonPerDay, 2),
      "",
    ],
    [
      "assumption",
      "operating_days_per_month",
      formatNumber(snapshot.assumptions.operatingDaysPerMonth, 0),
      "",
    ],
    [
      "assumption",
      "operating_hours_per_day",
      formatNumber(snapshot.assumptions.operatingHoursPerDay, 0),
      "",
    ],
    [
      "assumption",
      "yield_pct",
      formatPercent(snapshot.assumptions.yieldPct, 1),
      "",
    ],
    ["assumption", "pricing_mode", snapshot.assumptions.pricingMode, ""],
    ["assumption", "transport_mode", snapshot.assumptions.transportMode, ""],
    ...snapshot.feedstocks.map((item) => [
      "feedstock",
      item.name,
      `${formatPercent(item.mixPct, 0)} | ${formatIDR(item.pricePerKg)}/kg | ${formatNumber(item.gcvKcalPerKg, 0)} kcal/kg`,
      `Moisture ${formatPercent(item.moisturePct, 0)}`,
    ]),
    ...snapshot.opexBreakdown.map((item) => [
      "opex",
      item.label,
      formatIDR(item.monthlyValue),
      `${formatIDR(item.perTon)}/ton`,
    ]),
    ...snapshot.capexItems.map((item) => [
      "capex",
      item.name,
      formatIDR(item.subtotal),
      `${item.category} | Qty ${formatNumber(item.qty, 0)}`,
    ]),
    ...snapshot.sensitivity.map((item) => [
      "sensitivity",
      `${item.label} ${item.deltaPct > 0 ? "+" : ""}${item.deltaPct}%`,
      formatIDR(item.deltaProfitPerMonth),
      item.adjustedStatus,
    ]),
    ...snapshot.warnings.map((item) => [
      "warning",
      item.title,
      item.level,
      item.message,
    ]),
    ...snapshot.disclaimer.map((item) => ["disclaimer", "note", item, ""]),
  ];

  return rows.map((row) => row.map(csvEscape).join(",")).join("\n");
}

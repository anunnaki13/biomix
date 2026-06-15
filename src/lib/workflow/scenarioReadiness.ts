import { scenarioSchema } from "@/lib/validators/scenarioSchema";
import type { Scenario } from "@/types/biomass";

export type ScenarioSectionKey =
  | "production"
  | "feedstock"
  | "quality"
  | "pricing"
  | "opex"
  | "capex"
  | "transport"
  | "financing";

export interface ScenarioSectionStatus {
  key: ScenarioSectionKey;
  label: string;
  href: string;
  complete: boolean;
  detail: string;
}

export interface ScenarioReadiness {
  validationOk: boolean;
  statusLabel: "READY_FOR_REVIEW" | "NEEDS_INPUT" | "NEEDS_VALIDATION";
  summary: string;
  completedSections: number;
  totalSections: number;
  nextSection?: ScenarioSectionStatus;
  sections: ScenarioSectionStatus[];
  issues: string[];
}

const sectionMeta: Record<
  ScenarioSectionKey,
  { label: string; href: string }
> = {
  production: { label: "Produksi", href: "/input/production" },
  feedstock: { label: "Feedstock", href: "/input/feedstock" },
  quality: { label: "Quality", href: "/input/quality" },
  pricing: { label: "Pricing", href: "/input/pricing" },
  opex: { label: "OPEX", href: "/input/opex" },
  capex: { label: "CAPEX", href: "/input/capex" },
  transport: { label: "Transport", href: "/input/transport" },
  financing: { label: "Financing", href: "/input/financing" },
};

function createSectionStatus(
  key: ScenarioSectionKey,
  complete: boolean,
  detail: string,
): ScenarioSectionStatus {
  return {
    key,
    label: sectionMeta[key].label,
    href: sectionMeta[key].href,
    complete,
    detail,
  };
}

export function getScenarioReadiness(scenario: Scenario): ScenarioReadiness {
  const validation = scenarioSchema.safeParse(scenario);
  const sections: ScenarioSectionStatus[] = [
    getProductionStatus(scenario),
    getFeedstockStatus(scenario),
    getQualityStatus(scenario),
    getPricingStatus(scenario),
    getOpexStatus(scenario),
    getCapexStatus(scenario),
    getTransportStatus(scenario),
    getFinancingStatus(scenario),
  ];
  const completedSections = sections.filter((section) => section.complete).length;
  const nextSection = sections.find((section) => !section.complete);
  const issues = validation.success
    ? []
    : validation.error.issues.map((issue) => issue.message);

  const statusLabel = !validation.success
    ? "NEEDS_VALIDATION"
    : nextSection
      ? "NEEDS_INPUT"
      : "READY_FOR_REVIEW";

  const summary =
    statusLabel === "READY_FOR_REVIEW"
      ? "Scenario aktif sudah lengkap untuk direview, dibandingkan, atau dikeluarkan ke report."
      : statusLabel === "NEEDS_VALIDATION"
        ? issues[0] ?? "Masih ada input yang perlu diperbaiki sebelum scenario siap direview."
        : nextSection
          ? `Lengkapi ${nextSection.label} lebih dulu agar scenario siap direview.`
          : "Masih ada data yang perlu dilengkapi.";

  return {
    validationOk: validation.success,
    statusLabel,
    summary,
    completedSections,
    totalSections: sections.length,
    nextSection,
    sections,
    issues,
  };
}

function getProductionStatus(scenario: Scenario) {
  const production = scenario.production;
  const complete =
    production.targetPelletTonPerDay > 0 &&
    production.operatingDaysPerMonth > 0 &&
    production.operatingHoursPerDay > 0 &&
    production.pelletizingYieldPct > 0;

  return createSectionStatus(
    "production",
    complete,
    complete
      ? `${production.targetPelletTonPerDay} ton/hari, ${production.operatingDaysPerMonth} hari/bulan`
      : "Target output, hari operasi, atau yield belum lengkap.",
  );
}

function getFeedstockStatus(scenario: Scenario) {
  const totalMix = scenario.feedstocks.reduce((sum, item) => sum + item.mixPct, 0);
  const populatedCount = scenario.feedstocks.filter(
    (item) =>
      item.name.trim().length > 0 &&
      item.mixPct > 0 &&
      item.pricePerKg >= 0 &&
      item.gcvKcalPerKg > 0,
  ).length;
  const complete =
    scenario.feedstocks.length > 0 &&
    populatedCount === scenario.feedstocks.length &&
    Math.abs(totalMix - 100) <= 0.01;

  return createSectionStatus(
    "feedstock",
    complete,
    complete
      ? `${scenario.feedstocks.length} item, mix ${Math.round(totalMix)}%`
      : "Pastikan item feedstock terisi dan total mix = 100%.",
  );
}

function getQualityStatus(scenario: Scenario) {
  const quality = scenario.quality;
  const hasGcv =
    (quality.gcvArb ?? 0) > 0 ||
    (quality.gcvAdb ?? 0) > 0 ||
    (quality.gcvDb ?? 0) > 0;
  const complete = hasGcv && quality.totalMoistureArbPct >= 0;

  return createSectionStatus(
    "quality",
    complete,
    complete
      ? `GCV dan moisture utama sudah tersedia`
      : "Isi minimal satu basis GCV dan cek moisture total.",
  );
}

function getPricingStatus(scenario: Scenario) {
  const pricing = scenario.pricing;
  const complete =
    (pricing.mode === "MANUAL" && (pricing.manualPricePerTon ?? 0) > 0) ||
    (pricing.mode === "HPT" &&
      (pricing.hbaUsdPerTon ?? 0) > 0 &&
      (pricing.usdIdrRate ?? 0) > 0 &&
      (pricing.biomassCoefficient ?? 0) > 0 &&
      (pricing.referenceCoalGcv ?? 0) > 0) ||
    (pricing.mode === "CONTRACT_GCV_ADJUSTED" &&
      (pricing.contractBasePricePerTon ?? 0) > 0 &&
      (pricing.contractBaseGcv ?? 0) > 0);

  return createSectionStatus(
    "pricing",
    complete,
    complete
      ? `Mode ${pricing.mode} sudah terkonfigurasi`
      : `Lengkapi parameter wajib untuk mode ${pricing.mode}.`,
  );
}

function getOpexStatus(scenario: Scenario) {
  const opex = scenario.opex;
  const complete =
    opex.laborMonthly >= 0 &&
    opex.electricityPerDay >= 0 &&
    opex.maintenancePerTon >= 0;

  return createSectionStatus(
    "opex",
    complete,
    complete
      ? `${opex.customItems.length} item OPEX tambahan`
      : "Cek biaya operasi utama dan item OPEX tambahan.",
  );
}

function getCapexStatus(scenario: Scenario) {
  const items = scenario.capex.items;
  const complete =
    items.length > 0 &&
    items.every(
      (item) =>
        item.name.trim().length > 0 &&
        item.category.trim().length > 0 &&
        item.qty > 0 &&
        item.unitPrice >= 0,
    );

  return createSectionStatus(
    "capex",
    complete,
    complete
      ? `${items.length} item investasi`
      : "Tambahkan minimal satu item CAPEX yang valid.",
  );
}

function getTransportStatus(scenario: Scenario) {
  const transport = scenario.transport;
  const complete =
    transport.truckCapacityTon > 0 &&
    transport.costPerTrip >= 0 &&
    transport.mode.length > 0;

  return createSectionStatus(
    "transport",
    complete,
    complete
      ? `${transport.mode} | ${transport.truckCapacityTon} ton/truck`
      : "Lengkapi mode, kapasitas truck, dan biaya trip.",
  );
}

function getFinancingStatus(scenario: Scenario) {
  const financing = scenario.financing;
  const complete = !financing.enabled
    ? true
    : financing.loanPrincipal > 0 &&
      financing.tenorMonths > 0 &&
      financing.annualInterestRatePct >= 0;

  return createSectionStatus(
    "financing",
    complete,
    complete
      ? financing.enabled
        ? "Struktur pinjaman sudah terisi"
        : "Financing dimatikan, pakai modal sendiri"
      : "Lengkapi principal, tenor, dan bunga pinjaman.",
  );
}


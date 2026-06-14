import type { Scenario } from "@/types/biomass";
import type {
  BreakEvenResult,
  CapexResult,
  CostResult,
  FinancingResult,
  PricingResult,
  ProductionResult,
  ProfitResult,
  QualityResult,
  TransportResult,
  WarningItem,
} from "@/types/results";

export function generateWarnings(params: {
  scenario: Scenario;
  production: ProductionResult;
  quality: QualityResult;
  pricing: PricingResult;
  cost: CostResult;
  transport: TransportResult;
  capex: CapexResult;
  financing: FinancingResult;
  profit: ProfitResult;
  breakEven: BreakEvenResult;
}): WarningItem[] {
  const warnings: WarningItem[] = [];

  if (params.quality.gcvArb < 3487) {
    warnings.push({
      level: "warning",
      title: "GCV Rendah",
      message:
        "GCV ARB di bawah batas aman CFB. Produk mungkin masih bisa dijual ke pembeli tertentu, tetapi berisiko tidak diterima.",
    });
  }

  if (params.scenario.quality.totalMoistureArbPct >= 25) {
    warnings.push({
      level: "danger",
      title: "Moisture Tinggi",
      message: "Total moisture mencapai atau melewati 25%.",
    });
  }

  if (params.profit.grossProfitPerTon < 100000) {
    warnings.push({
      level: "warning",
      title: "Margin Tipis",
      message:
        "Margin per ton di bawah Rp100.000. Kenaikan kecil pada bahan baku atau transport dapat membuat project rugi.",
    });
  }

  if (params.profit.grossMarginPct < 0.1) {
    warnings.push({
      level: "warning",
      title: "Gross Margin Rendah",
      message: "Gross margin di bawah 10% dan cukup sensitif terhadap perubahan asumsi.",
    });
  }

  if ((params.profit.simplePaybackMonths ?? 0) > 24) {
    warnings.push({
      level: "warning",
      title: "Payback Lama",
      message: "Payback period melebihi 24 bulan.",
    });
  }

  if (params.profit.cashflowAfterDebtPerMonth < 0) {
    warnings.push({
      level: "danger",
      title: "Cashflow Setelah Debt Negatif",
      message: "Cashflow setelah membayar cicilan bank masih negatif.",
    });
  }

  if ((params.financing.dscr ?? Number.POSITIVE_INFINITY) < 1.2) {
    warnings.push({
      level: "warning",
      title: "DSCR Rendah",
      message: "DSCR di bawah 1,2 sehingga pembiayaan cukup berisiko.",
    });
  }

  if (params.transport.outboundTransportPerTon > 200000) {
    warnings.push({
      level: "warning",
      title: "Transport Mahal",
      message: "Biaya transport outbound per ton sudah melebihi Rp200.000.",
    });
  }

  const insufficientFeedstock = params.scenario.feedstocks.find((feedstock) => {
    if (!feedstock.supplyLimitTonPerDay) {
      return false;
    }

    const requiredTonPerDay =
      (params.production.rawInputTonPerDay * feedstock.mixPct) / 100;

    return requiredTonPerDay > feedstock.supplyLimitTonPerDay;
  });

  if (insufficientFeedstock) {
    warnings.push({
      level: "warning",
      title: "Supply Feedstock Tidak Cukup",
      message: `${insufficientFeedstock.name} memiliki supply limit di bawah kebutuhan harian.`,
    });
  }

  const totalMix = params.scenario.feedstocks.reduce((sum, item) => sum + item.mixPct, 0);
  if (Math.abs(totalMix - 100) > 0.01) {
    warnings.push({
      level: "warning",
      title: "Mix Feedstock Tidak Valid",
      message: "Total campuran feedstock belum sama dengan 100%.",
    });
  }

  if (
    params.scenario.production.machineRatedCapacityKgPerHour &&
    params.production.requiredMachineKgPerHour >
      params.scenario.production.machineRatedCapacityKgPerHour
  ) {
    warnings.push({
      level: "warning",
      title: "Kapasitas Mesin Kurang",
      message: "Kebutuhan output per jam lebih tinggi dari kapasitas mesin yang tersedia.",
    });
  }

  const workingCapitalNeed =
    params.capex.opexBufferValue +
    params.capex.feedstockStockBuffer +
    params.capex.receivableBuffer;
  if (params.scenario.workingCapital.cashReserve < workingCapitalNeed * 0.1) {
    warnings.push({
      level: "warning",
      title: "Cadangan Modal Kerja Tipis",
      message: "Cash reserve relatif tipis dibanding kebutuhan modal kerja.",
    });
  }

  if (
    params.scenario.pricing.mode === "MANUAL" &&
    params.pricing.sellingPricePerTon < params.cost.hppPerTon
  ) {
    warnings.push({
      level: "danger",
      title: "Harga Jual di Bawah HPP",
      message: "Manual selling price masih lebih rendah dari HPP per ton.",
    });
  }

  if (
    params.scenario.pricing.mode === "HPT" &&
    (!params.scenario.pricing.hbaUsdPerTon ||
      !params.scenario.pricing.usdIdrRate ||
      !params.scenario.pricing.referenceCoalGcv)
  ) {
    warnings.push({
      level: "warning",
      title: "Input HPT Belum Lengkap",
      message: "HBA, kurs, dan reference GCV wajib diisi untuk mode HPT.",
    });
  }

  if (params.pricing.rejectRisk) {
    warnings.push({
      level: "warning",
      title: "Reject Risk Kontrak",
      message: "GCV aktual berada di bawah minimum kontrak yang diterima.",
    });
  }

  return warnings;
}

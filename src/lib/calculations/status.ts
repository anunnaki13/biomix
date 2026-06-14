import type { ProfitResult, QualityResult, StatusResult, WarningItem } from "@/types/results";

export function calculateStatus(params: {
  quality: QualityResult;
  profit: ProfitResult;
  warnings: WarningItem[];
}): StatusResult {
  const hasDanger = params.warnings.some((warning) => warning.level === "danger");
  const hasWarning = params.warnings.some((warning) => warning.level === "warning");

  const financialStatus: StatusResult["financialStatus"] =
    params.profit.netProfitPerMonth <= 0
      ? "LOSS"
      : params.profit.grossProfitPerTon < 100000 || params.profit.grossMarginPct < 0.1
        ? "THIN_MARGIN"
        : "PROFITABLE";

  const overallStatus: StatusResult["overallStatus"] =
    params.quality.technicalStatus === "FAIL" || financialStatus === "LOSS" || hasDanger
      ? "TIDAK_LAYAK"
      : params.quality.technicalStatus === "WARNING" || financialStatus === "THIN_MARGIN" || hasWarning
        ? "LAYAK_DENGAN_CATATAN"
        : "LAYAK";

  return {
    financialStatus,
    technicalStatus: params.quality.technicalStatus,
    overallStatus,
  };
}

import type { FinancingConfig } from "@/types/biomass";
import type { FinancingResult } from "@/types/results";

export function calculateFinancing(financing: FinancingConfig): FinancingResult {
  if (!financing.enabled || financing.loanPrincipal <= 0 || financing.tenorMonths <= 0) {
    return {
      monthlyInstallment: 0,
      totalInterest: 0,
      monthlyDebtService: 0,
      dscr: null,
    };
  }

  const principal = financing.loanPrincipal;
  const monthlyRate = financing.annualInterestRatePct / 100 / 12;
  const monthlyInstallment =
    financing.method === "FLAT"
      ? principal / financing.tenorMonths + principal * monthlyRate
      : monthlyRate === 0
        ? principal / financing.tenorMonths
        : principal *
          ((monthlyRate * (1 + monthlyRate) ** financing.tenorMonths) /
            ((1 + monthlyRate) ** financing.tenorMonths - 1));
  const totalInterest = Math.max(
    0,
    monthlyInstallment * financing.tenorMonths - principal,
  );

  return {
    monthlyInstallment,
    totalInterest,
    monthlyDebtService: monthlyInstallment,
    dscr: null,
  };
}

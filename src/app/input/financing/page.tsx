"use client";

import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { MoneyInput } from "@/components/forms/MoneyInput";
import { PercentInput } from "@/components/forms/PercentInput";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";
import { SelectField } from "@/components/forms/SelectField";
import { ToggleField } from "@/components/forms/ToggleField";
import { useActiveScenario } from "@/store/useActiveScenario";

export default function FinancingInputPage() {
  const { activeScenario, updateActiveScenario } = useActiveScenario();
  const financing = activeScenario.financing;
  const tax = activeScenario.tax;

  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / Financing"
        title="Pembiayaan dan pajak"
        description="Pengaturan modal sendiri, pinjaman bank, bunga, tenor, dan pajak memengaruhi DSCR, cashflow after debt, dan ROI."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Financing Toggle"
        title="Aktifkan pembiayaan"
        description="Saat financing aktif, principal dan tenor harus lebih besar dari nol agar scenario tetap valid."
      >
        <div className="grid gap-4 xl:grid-cols-2">
          <ToggleField
            label="Financing enabled"
            checked={financing.enabled}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: { ...scenario.financing, enabled: value },
              }))
            }
          />
          <ToggleField
            label="Income tax enabled"
            checked={tax.enabled}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                tax: { ...scenario.tax, enabled: value },
              }))
            }
          />
        </div>
      </FormSection>

      <FormSection
        eyebrow="Debt Terms"
        title="Struktur pinjaman"
        description="Atur principal, bunga tahunan, tenor, dan metode cicilan."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MoneyInput
            label="Own capital"
            value={financing.ownCapital}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: { ...scenario.financing, ownCapital: value },
              }))
            }
          />
          <MoneyInput
            label="Loan principal"
            value={financing.loanPrincipal}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: { ...scenario.financing, loanPrincipal: value },
              }))
            }
          />
          <PercentInput
            label="Annual interest %"
            value={financing.annualInterestRatePct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: {
                  ...scenario.financing,
                  annualInterestRatePct: value,
                },
              }))
            }
          />
          <MoneyInput
            label="Bank admin fee %"
            value={financing.adminFeePct ?? 0}
            step={0.1}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: { ...scenario.financing, adminFeePct: value },
              }))
            }
          />
          <MoneyInput
            label="Tenor months"
            value={financing.tenorMonths}
            step={1}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: { ...scenario.financing, tenorMonths: value },
              }))
            }
          />
          <MoneyInput
            label="Grace period months"
            value={financing.gracePeriodMonths}
            step={1}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: {
                  ...scenario.financing,
                  gracePeriodMonths: value,
                },
              }))
            }
          />
          <SelectField
            label="Loan method"
            value={financing.method}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                financing: { ...scenario.financing, method: value },
              }))
            }
            options={[
              { label: "Annuity", value: "ANNUITY" },
              { label: "Flat", value: "FLAT" },
            ]}
          />
          <PercentInput
            label="Income tax %"
            value={tax.incomeTaxPct}
            onChange={(value) =>
              updateActiveScenario((scenario) => ({
                ...scenario,
                tax: { ...scenario.tax, incomeTaxPct: value },
              }))
            }
          />
        </div>
      </FormSection>
    </section>
  );
}

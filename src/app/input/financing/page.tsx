import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function FinancingInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / Financing"
      title="Asumsi pinjaman dan cashflow safety akan dipusatkan di sini."
      description="Financing akan mengatur own capital, principal, bunga, tenor, grace period, metode annuity/flat, serta efeknya ke debt service dan DSCR."
      bullets={[
        "Validator sekarang sudah menolak financing aktif dengan principal atau tenor nol.",
        "Cashflow after debt dan DSCR warning akan dinyalakan saat formula engine aktif.",
      ]}
    />
  );
}

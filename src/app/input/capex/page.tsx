import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function CapexInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / CAPEX"
      title="CAPEX, contingency, dan working capital akan diatur dari sini."
      description="Halaman ini nanti akan memuat item mesin, sipil, electrical, QC, contingency, serta buffer modal kerja untuk stok bahan baku, receivable, dan cadangan kas."
      bullets={[
        "Default CAPEX item sudah ditanamkan ke scenario dasar.",
        "Payback dan ROI nantinya mengambil base dari CAPEX + working capital.",
      ]}
    />
  );
}

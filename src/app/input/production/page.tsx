import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function ProductionInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / Production"
      title="Asumsi produksi akan diedit di sini."
      description="Produksi mencakup target pellet, mode target output/input, hari operasi, jam operasi, yield, downtime, reject, dan handling loss. Fase ini baru menyiapkan ruangnya."
      bullets={[
        "Target pellet ton/day dan raw input ton/day akan jadi driver utama perhitungan produksi.",
        "Yield efektif tetap harus menjaga denominator HPP berbasis output pellet jadi.",
      ]}
    />
  );
}

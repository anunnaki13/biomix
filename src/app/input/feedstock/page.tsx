import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function FeedstockInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / Feedstock"
      title="Meja mix feedstock sedang dipersiapkan."
      description="Halaman ini akan memuat tabel multi-feedstock untuk sekam, sawdust, dan biomassa lain, lengkap dengan mix, harga, GCV, moisture, ash, supply limit, dan biaya inbound."
      bullets={[
        "Validasi total mix 100% sudah ditulis di schema Phase 1.",
        "Weighted GCV dan moisture akan dihitung penuh saat formula engine masuk di Phase 2.",
      ]}
    />
  );
}

import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function SensitivityPage() {
  return (
    <PlaceholderPage
      eyebrow="Analysis / Sensitivity"
      title="Sensitivity analysis akan dibangun di fase analisis."
      description="Route ini sudah disiapkan untuk run delta pada harga feedstock, harga jual, GCV, yield, transport, operating days, HBA, dan kurs."
      bullets={[
        "Tornado chart akan menyorot pendorong perubahan laba bulanan paling besar.",
        "Semua simulasi nanti tetap lewat engine yang sama dengan dashboard utama.",
      ]}
    />
  );
}

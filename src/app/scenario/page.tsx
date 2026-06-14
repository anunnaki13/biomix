import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function ScenarioPage() {
  return (
    <PlaceholderPage
      eyebrow="Scenario"
      title="Scenario management akan hidup di fase berikutnya."
      description="Halaman ini sudah disiapkan untuk alur simpan, duplikasi, hapus, import/export JSON, dan compare scenario. Struktur route sudah dikunci sejak Phase 1 agar kita tidak bongkar layout lagi nanti."
      bullets={[
        "Preset konservatif, base case, dan optimis akan ditarik dari store local-first.",
        "Scenario compare table akan menunjukkan output ton/month, harga jual, HPP, margin, profit, dan payback.",
        "JSON import/export masuk setelah kontrak data dan validator selesai dipakai penuh.",
      ]}
    />
  );
}

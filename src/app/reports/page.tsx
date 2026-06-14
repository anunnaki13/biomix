import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function ReportsPage() {
  return (
    <PlaceholderPage
      eyebrow="Reports"
      title="Report investor dan offtaker akan keluar dari halaman ini."
      description="Report BIOMIX nanti akan merangkum asumsi, profit, break-even, sensitivity, warning, dan disclaimer untuk kebutuhan presentasi dan negosiasi."
      bullets={[
        "Export PDF, CSV, dan JSON akan dibangun setelah dashboard, forms, dan scenario flow stabil.",
        "Disclaimer wajib tetap tampil agar simulasi tidak diperlakukan sebagai keputusan final tanpa validasi lapangan.",
      ]}
    />
  );
}

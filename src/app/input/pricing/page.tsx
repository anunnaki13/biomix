import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function PricingInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / Pricing"
      title="Manual, HPT, dan contract-adjusted pricing akan tinggal di sini."
      description="Mode pricing BIOMIX perlu jelas sejak awal karena requirement dan validator berbeda untuk harga manual, HPT, serta kontrak yang dikoreksi oleh GCV dan moisture."
      bullets={[
        "Schema sekarang sudah mewajibkan field penting per mode.",
        "Unit test HPT menjadi salah satu acceptance anchor utama di Phase 2.",
      ]}
    />
  );
}

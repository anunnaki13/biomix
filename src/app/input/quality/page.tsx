import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function QualityInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / Quality"
      title="Kualitas teknis akan dipusatkan di halaman ini."
      description="Quality input akan menangani GCV ARB/ADB/DB, total moisture, ash, sulfur, chlorine, potassium, sodium, dan particle size untuk menggerakkan warning teknis dan pass/fail status."
      bullets={[
        "Minimal satu basis GCV sudah diwajibkan oleh schema sejak Phase 1.",
        "Threshold CFB default dari blueprint akan dihidupkan penuh di Phase 2.",
      ]}
    />
  );
}

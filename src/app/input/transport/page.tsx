import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function TransportInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / Transport"
      title="FOB, seller-paid, pass-through, dan DDP akan hidup di halaman ini."
      description="Transport tidak boleh diperlakukan sebagai angka tersembunyi. BIOMIX akan menaruh trip count, biaya per rit, loading/unloading, dan lab shipment mode di ruang ini."
      bullets={[
        "Rule ceil(trips) dan minimum trips sudah masuk blueprint dan akan dites di Phase 2.",
        "Mode transport memengaruhi apakah biaya masuk ke OPEX atau hanya ikut invoice delivered price.",
      ]}
    />
  );
}

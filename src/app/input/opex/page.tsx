import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function OpexInputPage() {
  return (
    <PlaceholderPage
      eyebrow="Input / OPEX"
      title="Detail biaya operasi akan dipisah dengan rapi di sini."
      description="Listrik, air, labor, maintenance, sparepart, packaging, lab, rent, admin, dan biaya lain tidak akan digabung menjadi satu angka global agar sensitivity dan report tetap berarti."
      bullets={[
        "Blueprint melarang menyembunyikan cost structure.",
        "Transport tetap dipisah karena mode FOB dan seller-paid mengubah logika margin.",
      ]}
    />
  );
}

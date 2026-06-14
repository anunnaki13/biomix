import { PlaceholderPage } from "@/components/ui/PlaceholderPage";

export default function BreakEvenPage() {
  return (
    <PlaceholderPage
      eyebrow="Analysis / Break-even"
      title="Break-even BIOMIX akan dipetakan di halaman ini."
      description="Minimum selling price, maximum feedstock price, minimum GCV untuk HPT, dan break-even volume akan ditampilkan di route ini ketika formula engine siap."
      bullets={[
        "Blueprint menekankan bahwa hasil break-even harus tetap memakai output pellet sebagai basis.",
        "Analisis tetap harus eksplisit soal fixed cost vs variable cost.",
      ]}
    />
  );
}

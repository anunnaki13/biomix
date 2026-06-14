"use client";

import { FeedstockMixTable } from "@/components/forms/FeedstockMixTable";
import { FormPageHeader } from "@/components/forms/FormPageHeader";
import { FormSection } from "@/components/forms/FormSection";
import { ScenarioValidationCard } from "@/components/forms/ScenarioValidationCard";

export default function FeedstockInputPage() {
  return (
    <section className="space-y-6">
      <FormPageHeader
        eyebrow="Input / Feedstock"
        title="Mix feedstock"
        description="Atur campuran sekam, sawdust, dan biomassa lain lengkap dengan harga, kualitas, supply limit, dan cost inbound."
        aside={<ScenarioValidationCard />}
      />

      <FormSection
        eyebrow="Feedstock Table"
        title="Multi-feedstock editor"
        description="Total mix harus tetap 100% agar scenario lolos schema dan warning engine tidak menyala."
      >
        <FeedstockMixTable />
      </FormSection>
    </section>
  );
}

import { ArrowRightLeft, ShieldCheck } from "lucide-react";

export function Topbar() {
  return (
    <header className="panel rounded-2xl p-4">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
            Scenario Aktif
          </p>
          <h2 className="mt-2 font-display text-2xl font-semibold text-text-primary">
            20 TPD Mix Sekam + Sawdust Base Case
          </h2>
          <p className="mt-2 text-sm text-text-secondary">
            Fase 1 menyiapkan shell, kontrak data, validasi, dan tooling sebelum
            perhitungan penuh masuk di Phase 2.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="rounded-full border border-accent-green/25 bg-accent-green/10 px-4 py-2 text-xs uppercase tracking-[0.2em] text-accent-green">
            Phase 1 Ready
          </div>
          <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
            Port check sebelum launch
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
            <ArrowRightLeft className="h-3.5 w-3.5" />
            Local-first MVP
          </div>
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
            <ShieldCheck className="h-3.5 w-3.5" />
            Formula locked by blueprint
          </div>
        </div>
      </div>
    </header>
  );
}

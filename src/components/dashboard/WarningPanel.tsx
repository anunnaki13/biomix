interface WarningPanelProps {
  warnings: string[];
}

export function WarningPanel({ warnings }: WarningPanelProps) {
  return (
    <aside className="panel rounded-xl p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-amber">
            Warning Engine
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-text-primary">
            Risiko utama awal
          </h2>
        </div>
        <span className="rounded-full border border-accent-amber/30 bg-accent-amber/10 px-3 py-1 text-xs text-accent-amber">
          Phase 1
        </span>
      </div>

      <ul className="mt-5 space-y-3 text-sm leading-7 text-text-secondary">
        {warnings.map((warning) => (
          <li
            key={warning}
            className="rounded-xl border border-white/8 bg-black/10 px-4 py-3"
          >
            {warning}
          </li>
        ))}
      </ul>
    </aside>
  );
}

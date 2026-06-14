import type { ReactNode } from "react";

interface WarningPanelProps {
  warnings: string[];
  badgeLabel?: string;
  eyebrow?: string;
  title?: string;
  emptyState?: ReactNode;
}

export function WarningPanel({
  warnings,
  badgeLabel = "Warnings",
  eyebrow = "Warning Engine",
  title = "Risiko utama",
  emptyState = "Belum ada warning aktif untuk scenario ini.",
}: WarningPanelProps) {
  return (
    <aside className="panel rounded-xl p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-amber">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-text-primary">
            {title}
          </h2>
        </div>
        <span className="rounded-full border border-accent-amber/30 bg-accent-amber/10 px-3 py-1 text-xs text-accent-amber">
          {badgeLabel}
        </span>
      </div>

      {warnings.length > 0 ? (
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
      ) : (
        <div className="mt-5 rounded-xl border border-white/8 bg-black/10 px-4 py-3 text-sm text-text-secondary">
          {emptyState}
        </div>
      )}
    </aside>
  );
}

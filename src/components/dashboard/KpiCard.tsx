interface KpiCardProps {
  label: string;
  value: string;
  note: string;
}

export function KpiCard({ label, value, note }: KpiCardProps) {
  return (
    <article className="panel rounded-xl p-5">
      <p className="text-xs uppercase tracking-[0.22em] text-text-secondary">
        {label}
      </p>
      <p className="mt-3 font-display text-3xl font-semibold text-text-primary">
        {value}
      </p>
      <p className="mt-2 text-sm text-text-secondary">{note}</p>
    </article>
  );
}

import { cn } from "@/lib/utils";

const toneMap = {
  LAYAK: "border-accent-green/30 bg-accent-green/10 text-accent-green",
  LAYAK_DENGAN_CATATAN:
    "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
  TIDAK_LAYAK: "border-danger/30 bg-danger/10 text-danger",
} as const;

interface StatusBadgeProps {
  status: keyof typeof toneMap;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const label = status.replaceAll("_", " ");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em]",
        toneMap[status],
      )}
    >
      {label}
    </span>
  );
}

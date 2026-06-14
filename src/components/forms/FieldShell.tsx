import type { ReactNode } from "react";

interface FieldShellProps {
  label: string;
  hint?: string;
  children: ReactNode;
}

export function FieldShell({ label, hint, children }: FieldShellProps) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-medium text-text-primary">{label}</span>
      {children}
      {hint ? <span className="block text-xs text-text-secondary">{hint}</span> : null}
    </label>
  );
}

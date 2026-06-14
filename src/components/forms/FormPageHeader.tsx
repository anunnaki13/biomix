import type { ReactNode } from "react";

interface FormPageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
}

export function FormPageHeader({
  eyebrow,
  title,
  description,
  aside,
}: FormPageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-3">
        <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
          {eyebrow}
        </p>
        <h1 className="font-display text-3xl font-semibold text-text-primary">
          {title}
        </h1>
        <p className="max-w-3xl text-sm leading-7 text-text-secondary">
          {description}
        </p>
      </div>
      {aside}
    </div>
  );
}

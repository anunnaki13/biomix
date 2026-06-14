import type { ReactNode } from "react";

interface FormSectionProps {
  eyebrow: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function FormSection({
  eyebrow,
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="panel rounded-2xl p-6">
      <div className="space-y-2">
        <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
          {eyebrow}
        </p>
        <h2 className="font-display text-2xl font-semibold text-text-primary">
          {title}
        </h2>
        {description ? (
          <p className="max-w-3xl text-sm leading-7 text-text-secondary">
            {description}
          </p>
        ) : null}
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
}

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  bullets,
}: PlaceholderPageProps) {
  return (
    <section className="space-y-6">
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

      <div className="grid gap-4 md:grid-cols-2">
        {bullets.map((bullet) => (
          <article
            key={bullet}
            className="panel rounded-xl p-5 text-sm leading-7 text-text-secondary"
          >
            {bullet}
          </article>
        ))}
      </div>
    </section>
  );
}

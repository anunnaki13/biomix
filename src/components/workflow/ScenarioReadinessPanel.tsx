"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2, CircleAlert, CircleDotDashed } from "lucide-react";

import type { ScenarioReadiness } from "@/lib/workflow/scenarioReadiness";
import { cn } from "@/lib/utils";

interface ScenarioReadinessPanelProps {
  readiness: ScenarioReadiness;
}

const statusCopy = {
  READY_FOR_REVIEW: {
    label: "Ready for review",
    tone: "border-accent-green/30 bg-accent-green/10 text-accent-green",
    icon: CheckCircle2,
  },
  NEEDS_INPUT: {
    label: "Needs input",
    tone: "border-accent-amber/30 bg-accent-amber/10 text-accent-amber",
    icon: CircleDotDashed,
  },
  NEEDS_VALIDATION: {
    label: "Needs validation",
    tone: "border-danger/30 bg-danger/10 text-danger",
    icon: CircleAlert,
  },
} as const;

export function ScenarioReadinessPanel({
  readiness,
}: ScenarioReadinessPanelProps) {
  const status = statusCopy[readiness.statusLabel];
  const StatusIcon = status.icon;
  const completionPct = Math.round(
    (readiness.completedSections / readiness.totalSections) * 100,
  );

  return (
    <section className="panel rounded-2xl p-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
            Scenario Readiness
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em]",
                status.tone,
              )}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              {status.label}
            </div>
            <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-text-secondary">
              {readiness.completedSections}/{readiness.totalSections} section lengkap
            </div>
          </div>
          <p className="max-w-3xl text-sm leading-7 text-text-secondary">
            {readiness.summary}
          </p>
        </div>

        {readiness.nextSection ? (
          <Link
            href={readiness.nextSection.href}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-primary transition hover:border-white/20"
          >
            Lengkapi {readiness.nextSection.label}
            <ArrowRight className="h-4 w-4" />
          </Link>
        ) : (
          <Link
            href="/reports"
            className="inline-flex items-center gap-2 rounded-xl border border-accent-cyan/30 bg-accent-cyan/10 px-4 py-3 text-sm text-accent-cyan transition hover:border-accent-cyan/50"
          >
            Buka report
            <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-6 space-y-3">
        <div className="h-2 overflow-hidden rounded-full bg-white/5">
          <div
            className="h-full rounded-full bg-accent-cyan transition-all"
            style={{ width: `${completionPct}%` }}
          />
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {readiness.sections.map((section) => (
            <Link
              key={section.key}
              href={section.href}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-4 transition hover:border-white/20"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-text-primary">
                  {section.label}
                </p>
                <span
                  className={cn(
                    "rounded-full px-2.5 py-1 text-[11px] uppercase tracking-[0.16em]",
                    section.complete
                      ? "bg-accent-green/10 text-accent-green"
                      : "bg-accent-amber/10 text-accent-amber",
                  )}
                >
                  {section.complete ? "Complete" : "Perlu isi"}
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-text-secondary">
                {section.detail}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


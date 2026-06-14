"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { formatIDRCompact } from "@/lib/formatters/currency";

interface SensitivityItem {
  label: string;
  deltaLabel: string;
  deltaValue: number;
}

interface SensitivitySnapshotProps {
  items: SensitivityItem[];
}

export function SensitivitySnapshot({ items }: SensitivitySnapshotProps) {
  return (
    <div className="panel rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-amber">
            Sensitivity Snapshot
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-text-primary">
            Dampak cepat terhadap laba bulanan
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
          Before tornado chart
        </p>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item) => {
          const positive = item.deltaValue >= 0;
          const width = Math.min(100, Math.max(8, Math.abs(item.deltaValue) / 2500000));

          return (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-4"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-medium text-text-primary">{item.label}</p>
                  <p className="mt-1 text-sm text-text-secondary">
                    {item.deltaLabel}
                  </p>
                </div>
                <div
                  className={`flex items-center gap-2 text-sm ${
                    positive ? "text-accent-green" : "text-danger"
                  }`}
                >
                  {positive ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  <span>{formatIDRCompact(item.deltaValue)}</span>
                </div>
              </div>
              <div className="mt-3 h-2 rounded-full bg-white/8">
                <div
                  className={`h-2 rounded-full ${
                    positive ? "bg-accent-green" : "bg-danger"
                  }`}
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

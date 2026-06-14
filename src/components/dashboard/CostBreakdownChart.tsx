"use client";

import { useSyncExternalStore } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { formatIDRCompact } from "@/lib/formatters/currency";
import type { CostBreakdownItem } from "@/types/results";

const palette = [
  "#43f2a6",
  "#4ddcff",
  "#ffb84d",
  "#7dd3fc",
  "#34d399",
  "#fca5a5",
  "#c4b5fd",
  "#fdba74",
  "#86efac",
  "#93c5fd",
];

interface CostBreakdownChartProps {
  items: CostBreakdownItem[];
}

export function CostBreakdownChart({ items }: CostBreakdownChartProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  return (
    <div className="panel rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-cyan">
            Cost Breakdown
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-text-primary">
            Struktur biaya bulanan
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
          Per ton dan kontribusi
        </p>
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,280px)_minmax(0,1fr)]">
        <div className="h-[260px] min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={items}
                  dataKey="value"
                  nameKey="label"
                  innerRadius={62}
                  outerRadius={102}
                  paddingAngle={2}
                  stroke="rgba(255,255,255,0.08)"
                >
                  {items.map((item, index) => (
                    <Cell
                      key={item.label}
                      fill={palette[index % palette.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) =>
                    formatIDRCompact(typeof value === "number" ? value : 0)
                  }
                  contentStyle={{
                    background: "rgba(7, 16, 20, 0.96)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    borderRadius: 12,
                    color: "#e8f7f5",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-full border border-white/10 bg-white/5" />
          )}
        </div>

        <div className="grid gap-3">
          {items.map((item, index) => (
            <div
              key={item.label}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className="h-3 w-3 shrink-0 rounded-full"
                    style={{ backgroundColor: palette[index % palette.length] }}
                  />
                  <div className="min-w-0">
                    <p className="truncate font-medium text-text-primary">
                      {item.label}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {formatIDRCompact(item.value)} / bulan
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-text-primary">
                    {formatIDRCompact(item.perTon)}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {(item.percentage * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

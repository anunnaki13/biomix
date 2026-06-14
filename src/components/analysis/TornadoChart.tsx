"use client";

import { useSyncExternalStore } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatIDRCompact } from "@/lib/formatters/currency";
import type { SensitivityResultRow } from "@/lib/calculations/sensitivity";

interface TornadoChartProps {
  rows: SensitivityResultRow[];
}

export function TornadoChart({ rows }: TornadoChartProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const data = [...rows]
    .sort((a, b) => Math.abs(b.deltaProfitPerMonth) - Math.abs(a.deltaProfitPerMonth))
    .map((row) => ({
      name: row.label,
      deltaProfitPerMonth: row.deltaProfitPerMonth,
      fill: row.deltaProfitPerMonth >= 0 ? "#43f2a6" : "#ff5d5d",
    }));

  return (
    <div className="panel rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-amber">
            Tornado View
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-text-primary">
            Dampak terhadap laba bulanan
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
          Sorted by impact
        </p>
      </div>

      <div className="mt-6 h-[360px] min-w-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 8, right: 20, left: 20, bottom: 8 }}
            >
              <CartesianGrid stroke="rgba(255,255,255,0.08)" horizontal={false} />
              <XAxis
                type="number"
                stroke="#9fb8b4"
                tickFormatter={(value) => formatIDRCompact(value)}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                dataKey="name"
                type="category"
                width={110}
                stroke="#9fb8b4"
                tickLine={false}
                axisLine={false}
              />
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
              <Bar dataKey="deltaProfitPerMonth" radius={[0, 8, 8, 0]}>
                {data.map((item) => (
                  <Cell key={item.name} fill={item.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <div className="h-full rounded-2xl border border-white/10 bg-white/5" />
        )}
      </div>
    </div>
  );
}

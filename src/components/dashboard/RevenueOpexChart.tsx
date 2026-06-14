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

interface RevenueOpexChartProps {
  revenuePerMonth: number;
  totalOpexPerMonth: number;
  ebitdaPerMonth: number;
  cashflowAfterDebtPerMonth: number;
}

export function RevenueOpexChart({
  revenuePerMonth,
  totalOpexPerMonth,
  ebitdaPerMonth,
  cashflowAfterDebtPerMonth,
}: RevenueOpexChartProps) {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const data = [
    { label: "Revenue", value: revenuePerMonth, fill: "#4ddcff" },
    { label: "OPEX", value: totalOpexPerMonth, fill: "#ffb84d" },
    { label: "EBITDA", value: ebitdaPerMonth, fill: "#43f2a6" },
    { label: "Cashflow", value: cashflowAfterDebtPerMonth, fill: "#93c5fd" },
  ];

  return (
    <div className="panel rounded-2xl p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.24em] text-accent-green">
            Revenue vs OPEX
          </p>
          <h2 className="mt-2 font-display text-xl font-semibold text-text-primary">
            Profil arus usaha bulanan
          </h2>
        </div>
        <p className="text-xs uppercase tracking-[0.2em] text-text-secondary">
          Monthly snapshot
        </p>
      </div>

      <div className="mt-6 h-[320px] min-w-0">
        {mounted ? (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} barSize={42}>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="label"
                stroke="#9fb8b4"
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="#9fb8b4"
                tickFormatter={(value) => formatIDRCompact(value)}
                tickLine={false}
                axisLine={false}
                width={92}
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
              <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                {data.map((item) => (
                  <Cell key={item.label} fill={item.fill} />
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

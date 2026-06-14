import { formatIDRCompact } from "@/lib/formatters/currency";
import { formatNumber } from "@/lib/formatters/number";
import type { SensitivityResultRow } from "@/lib/calculations/sensitivity";

interface SensitivityTableProps {
  rows: SensitivityResultRow[];
}

export function SensitivityTable({ rows }: SensitivityTableProps) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10 bg-white/5">
      <table className="min-w-full text-sm">
        <thead className="border-b border-white/10 bg-black/10 text-left text-text-secondary">
          <tr>
            <th className="px-4 py-3 font-medium">Variabel</th>
            <th className="px-4 py-3 font-medium">Delta</th>
            <th className="px-4 py-3 font-medium">Base Profit</th>
            <th className="px-4 py-3 font-medium">Adjusted Profit</th>
            <th className="px-4 py-3 font-medium">Impact</th>
            <th className="px-4 py-3 font-medium">Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.variable} className="border-b border-white/6 last:border-b-0">
              <td className="px-4 py-3 text-text-primary">{row.label}</td>
              <td className="px-4 py-3 text-text-secondary">
                {row.variable === "operatingDays"
                  ? `${formatNumber(row.deltaPct, 0)} hari`
                  : `${formatNumber(row.deltaPct, 1)}%`}
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {formatIDRCompact(row.baseProfitPerMonth)}
              </td>
              <td className="px-4 py-3 text-text-secondary">
                {formatIDRCompact(row.adjustedProfitPerMonth)}
              </td>
              <td
                className={`px-4 py-3 ${
                  row.deltaProfitPerMonth >= 0 ? "text-accent-green" : "text-danger"
                }`}
              >
                {formatIDRCompact(row.deltaProfitPerMonth)}
              </td>
              <td className="px-4 py-3 text-text-primary">
                {row.baseStatus} {"->"} {row.adjustedStatus}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

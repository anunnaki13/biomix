import { formatNumber } from "@/lib/formatters/number";

export function formatPercent(value: number, digits = 1) {
  return `${formatNumber(value, digits)}%`;
}

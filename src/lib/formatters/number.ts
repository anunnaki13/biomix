export function formatNumber(value: number, digits = 0) {
  return new Intl.NumberFormat("id-ID", {
    maximumFractionDigits: digits,
  }).format(value);
}

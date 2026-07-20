export function formatNumber(value) {
  if (value === undefined || value === null || value === "") return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return Number.isInteger(num) ? String(num) : num.toFixed(2);
}

export function formatCurrency(value) {
  if (value === undefined || value === null || value === "") return "—";
  const num = Number(value);
  if (Number.isNaN(num)) return String(value);
  return `$${num.toFixed(2)}`;
}

export function formatCell(value) {
  if (value === undefined || value === null || value === "") return "—";
  if (typeof value === "number") return formatNumber(value);
  return String(value);
}

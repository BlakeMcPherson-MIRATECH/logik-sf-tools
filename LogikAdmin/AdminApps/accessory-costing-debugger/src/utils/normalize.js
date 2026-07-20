export function normalizeName(value) {
  return (value ?? "")
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .toUpperCase();
}

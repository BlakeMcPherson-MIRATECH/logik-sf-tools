// Columns always known to the calc engine, in display order.
// Any other key found on a pasted adder becomes a dynamic column appended after these.
export const BASE_COLUMNS = [
  { key: "qty", label: "Qty", align: "right" },
  { key: "cost", label: "Cost", align: "right", currency: true },
  { key: "stockCode", label: "Stock Code", align: "left" },
  { key: "length", label: "Length", align: "right" },
  { key: "width", label: "Width", align: "right" },
  { key: "thickness", label: "Thickness", align: "right" },
  { key: "dim1", label: "Dim 1", align: "right" },
  { key: "dim2", label: "Dim 2", align: "right" },
];

export const BASE_KEYS = new Set(["name", ...BASE_COLUMNS.map((c) => c.key)]);

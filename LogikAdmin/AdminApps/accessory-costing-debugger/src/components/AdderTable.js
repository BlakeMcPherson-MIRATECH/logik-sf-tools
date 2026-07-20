import React from "react";
import { BASE_COLUMNS } from "../data/columns";
import { formatCell, formatCurrency, formatNumber } from "../utils/format";

const AdderTable = ({
  rows,
  extraColumnKeys,
  hiddenColumns,
  onToggleColumn,
}) => {
  const allColumns = [
    ...BASE_COLUMNS,
    ...extraColumnKeys.map((key) => ({
      key,
      label: key,
      align: "left",
      extra: true,
    })),
  ];
  const visibleColumns = allColumns.filter((c) => !hiddenColumns.has(c.key));

  return (
    <div className="panel">
      <h2 className="panel-title">Adder Results</h2>

      <div className="column-toggles" style={{ marginBottom: 14 }}>
        {allColumns.map((col) => (
          <label
            key={col.key}
            className={`col-toggle ${hiddenColumns.has(col.key) ? "off" : ""}`}
          >
            <input
              type="checkbox"
              checked={!hiddenColumns.has(col.key)}
              onChange={() => onToggleColumn(col.key)}
            />
            {col.label}
            {col.extra && <span className="extra-name">(from JSON)</span>}
          </label>
        ))}
      </div>

      {rows.length === 0 ? (
        <div className="empty-state">
          No adder rows defined for this workbook/product combination.
        </div>
      ) : (
        <div className="table-wrap">
          <table className="adder-table">
            <thead>
              <tr>
                <th>Status</th>
                <th>Adder Name</th>
                {visibleColumns.map((col) => (
                  <th
                    key={col.key}
                    className={col.align === "right" ? "col-right" : ""}
                  >
                    {col.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.rowName}
                  className={row.active ? "row-active" : "row-inactive"}
                >
                  <td>
                    <span
                      className={`status-dot ${row.active ? "on" : "off"}`}
                    />
                    {row.active ? "Active" : "Skipped"}
                  </td>
                  <td className="col-name">{row.rowName}</td>
                  {visibleColumns.map((col) => {
                    const value = row.adder ? row.adder[col.key] : undefined;
                    let display = "—";
                    if (row.adder) {
                      if (col.key === "cost") display = formatCurrency(value);
                      else if (col.currency) display = formatCurrency(value);
                      else if (typeof value === "number")
                        display = formatNumber(value);
                      else display = formatCell(value);
                    }
                    return (
                      <td
                        key={col.key}
                        className={col.align === "right" ? "col-right" : ""}
                      >
                        {display}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdderTable;

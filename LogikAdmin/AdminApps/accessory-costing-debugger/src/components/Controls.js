import React from "react";

const Controls = ({
  rawJson,
  onRawJsonChange,
  jsonError,
  onLoadExample,
  onClear,
  books,
  products,
  selectedBook,
  selectedProduct,
  onBookChange,
  onProductChange,
  summary,
  unmatchedAdders,
  duplicateNames,
}) => {
  return (
    <div className="panel">
      <div className="controls-grid">
        <div>
          <h2 className="panel-title">Accessory Costing JSON</h2>
          <textarea
            className="json-input"
            value={rawJson}
            onChange={(e) => onRawJsonChange(e.target.value)}
            placeholder="Paste the adder JSON array here..."
            spellCheck={false}
          />
          <div className="input-actions">
            <button type="button" className="btn btn-secondary" onClick={onLoadExample}>
              Load Example
            </button>
            <button type="button" className="btn btn-secondary" onClick={onClear}>
              Clear
            </button>
          </div>
          {jsonError && <div className="error-banner">{jsonError}</div>}
          {!jsonError && duplicateNames.length > 0 && (
            <div className="warn-banner">
              Duplicate adder name{duplicateNames.length > 1 ? "s" : ""} in JSON (only the
              last occurrence is shown): {duplicateNames.join(", ")}
            </div>
          )}
          {!jsonError && unmatchedAdders.length > 0 && (
            <div className="warn-banner">
              {unmatchedAdders.length} adder{unmatchedAdders.length > 1 ? "s" : ""} in the
              pasted JSON did not match any row for this book/product:{" "}
              {unmatchedAdders.map((a) => a.name).join(", ")}
            </div>
          )}
        </div>

        <div className="filter-row">
          <h2 className="panel-title">Book &amp; Product</h2>
          <div className="field">
            <label htmlFor="book-select">Workbook</label>
            <select
              id="book-select"
              value={selectedBook}
              onChange={(e) => onBookChange(e.target.value)}
            >
              {books.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>
          <div className="field">
            <label htmlFor="product-select">Product</label>
            <select
              id="product-select"
              value={selectedProduct}
              onChange={(e) => onProductChange(e.target.value)}
            >
              {products.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>

          <div className="summary-row">
            <span className="summary-chip chip-total">
              Rows <strong>{summary.totalRows}</strong>
            </span>
            <span className="summary-chip chip-active">
              Active <strong>{summary.activeCount}</strong>
            </span>
            <span className="summary-chip chip-cost">
              Total Cost <strong>${summary.totalCost.toFixed(2)}</strong>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;

import React, { useEffect, useMemo, useRef, useState } from "react";
import "./styles/theme.css";
import Header from "./components/Header";
import Controls from "./components/Controls";
import AdderTable from "./components/AdderTable";
import {
  ADDER_REFERENCE,
  BOOKS,
  getProductsForBook,
  getRowsForBookProduct,
} from "./data/adderReference";
import { EXAMPLE_JSON } from "./data/example";
import { buildRows, detectBestBookProduct } from "./utils/mergeAdders";

const App = () => {
  const [rawJson, setRawJson] = useState("");
  const [selectedBook, setSelectedBook] = useState(BOOKS[0]);
  const [selectedProduct, setSelectedProduct] = useState(getProductsForBook(BOOKS[0])[0]);
  const [hiddenColumns, setHiddenColumns] = useState(new Set());

  const products = useMemo(() => getProductsForBook(selectedBook), [selectedBook]);

  const { adders: parsedAdders, error: jsonError } = useMemo(() => {
    const trimmed = rawJson.trim();
    if (!trimmed) return { adders: [], error: null };
    try {
      const data = JSON.parse(trimmed);
      const arr = Array.isArray(data) ? data : [data];
      if (!arr.every((item) => typeof item === "object" && item !== null)) {
        return { adders: [], error: "JSON must be an array of adder objects." };
      }
      return { adders: arr, error: null };
    } catch (e) {
      return { adders: [], error: `Invalid JSON: ${e.message}` };
    }
  }, [rawJson]);

  const referenceRows = useMemo(
    () => getRowsForBookProduct(selectedBook, selectedProduct),
    [selectedBook, selectedProduct]
  );

  const { rows, unmatchedAdders, extraColumnKeys, duplicateNames } = useMemo(
    () => buildRows(referenceRows, parsedAdders),
    [referenceRows, parsedAdders]
  );

  const seenExtraKeysRef = useRef(new Set());
  useEffect(() => {
    const newKeys = extraColumnKeys.filter((key) => !seenExtraKeysRef.current.has(key));
    if (newKeys.length === 0) return;
    newKeys.forEach((key) => seenExtraKeysRef.current.add(key));
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      newKeys.forEach((key) => next.add(key));
      return next;
    });
  }, [extraColumnKeys]);

  useEffect(() => {
    if (parsedAdders.length === 0) return;
    const activeCount = rows.filter((r) => r.active).length;
    if (activeCount > 0) return;
    const best = detectBestBookProduct(ADDER_REFERENCE, parsedAdders);
    if (best && (best.book !== selectedBook || best.product !== selectedProduct)) {
      setSelectedBook(best.book);
      setSelectedProduct(best.product);
    }
    // Only re-run when the pasted JSON changes, not on every book/product switch.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [parsedAdders]);

  const summary = useMemo(() => {
    const activeRows = rows.filter((r) => r.active);
    return {
      totalRows: rows.length,
      activeCount: activeRows.length,
      totalCost: activeRows.reduce((sum, r) => sum + Number(r.adder?.cost || 0), 0),
    };
  }, [rows]);

  const handleBookChange = (book) => {
    setSelectedBook(book);
    setSelectedProduct(getProductsForBook(book)[0]);
  };

  const toggleColumn = (key) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="app-shell">
      <Header />
      <div className="main-content">
        <Controls
          rawJson={rawJson}
          onRawJsonChange={setRawJson}
          jsonError={jsonError}
          onLoadExample={() => setRawJson(EXAMPLE_JSON)}
          onClear={() => setRawJson("")}
          books={BOOKS}
          products={products}
          selectedBook={selectedBook}
          selectedProduct={selectedProduct}
          onBookChange={handleBookChange}
          onProductChange={setSelectedProduct}
          summary={summary}
          unmatchedAdders={unmatchedAdders}
          duplicateNames={duplicateNames}
        />
        <AdderTable
          rows={rows}
          extraColumnKeys={extraColumnKeys}
          hiddenColumns={hiddenColumns}
          onToggleColumn={toggleColumn}
        />
      </div>
    </div>
  );
};

export default App;

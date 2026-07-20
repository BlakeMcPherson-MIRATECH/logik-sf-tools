import { normalizeName } from "./normalize";
import { BASE_KEYS } from "../data/columns";

export function buildAdderIndex(parsedAdders) {
  const byName = new Map();
  const duplicateNames = new Set();
  parsedAdders.forEach((adder) => {
    const key = normalizeName(adder && adder.name);
    if (!key) return;
    if (byName.has(key)) duplicateNames.add(key);
    byName.set(key, adder);
  });
  return { byName, duplicateNames };
}

export function buildRows(referenceRows, parsedAdders) {
  const { byName, duplicateNames } = buildAdderIndex(parsedAdders);
  const referenceNameSet = new Set(referenceRows.map((r) => normalizeName(r.rowName)));

  const rows = referenceRows.map((ref) => {
    const key = normalizeName(ref.rowName);
    const adder = byName.get(key) || null;
    const matched = Boolean(adder);
    const qty = matched ? Number(adder.qty ?? 0) : 0;
    const active = matched && qty > 0;
    return { rowName: ref.rowName, matched, active, qty, adder };
  });

  const unmatchedAdders = parsedAdders.filter((a) => {
    const key = normalizeName(a && a.name);
    return key && !referenceNameSet.has(key);
  });

  const extraColumnKeys = [];
  const seen = new Set();
  rows.forEach((row) => {
    if (!row.adder) return;
    Object.keys(row.adder).forEach((k) => {
      if (BASE_KEYS.has(k) || seen.has(k)) return;
      seen.add(k);
      extraColumnKeys.push(k);
    });
  });

  return { rows, unmatchedAdders, extraColumnKeys, duplicateNames: [...duplicateNames] };
}

export function detectBestBookProduct(adderReference, parsedAdders) {
  const { byName } = buildAdderIndex(parsedAdders);
  if (byName.size === 0) return null;

  const combos = new Map();
  adderReference.forEach((ref) => {
    const comboKey = `${ref.book}||${ref.product}`;
    if (!combos.has(comboKey)) {
      combos.set(comboKey, { book: ref.book, product: ref.product, rowNames: [] });
    }
    combos.get(comboKey).rowNames.push(normalizeName(ref.rowName));
  });

  let best = null;
  combos.forEach((combo) => {
    const count = combo.rowNames.filter((n) => byName.has(n)).length;
    if (count > 0 && (!best || count > best.count)) {
      best = { book: combo.book, product: combo.product, count };
    }
  });

  return best;
}

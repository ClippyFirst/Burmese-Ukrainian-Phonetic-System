#!/usr/bin/env node
/**
 * Verify every Myanmar codepoint in Google's pinned codepoint.syms table is
 * represented by the browser's UnicodeLabelMaker port with the exact label.
 */
import { readFileSync } from "node:fs";
import { googleInputSymbols } from "../src/web/google-wfst-input.js";

const path = process.argv[2];
if (!path) throw new Error("Usage: node scripts/validate_google_input_symbols.mjs <codepoint.syms>");
const source = readFileSync(path, "utf8");
const isMyanmar = (cp) =>
  (cp >= 0x1000 && cp <= 0x109f)
  || (cp >= 0xa9e0 && cp <= 0xa9ff)
  || (cp >= 0xaa60 && cp <= 0xaa7f);
let checked = 0;
for (const [index, line] of source.split(/\r?\n/u).entries()) {
  const fields = line.trim().split(/\s+/u);
  if (fields.length !== 2 || !/^\d+$/u.test(fields[1])) continue;
  const codepoint = Number(fields[1]);
  if (!isMyanmar(codepoint)) continue;
  const character = String.fromCodePoint(codepoint);
  const encoded = googleInputSymbols(character);
  if (!encoded.complete || encoded.symbols.length !== 1 || encoded.symbols[0] !== fields[0]) {
    throw new Error("Google input-symbol mismatch at line " + (index + 1)
      + ": U+" + codepoint.toString(16).toUpperCase()
      + " expected " + fields[0] + " got " + JSON.stringify(encoded));
  }
  checked++;
}
if (!checked) throw new Error("No Myanmar codepoint entries found in " + path);
console.log(JSON.stringify({ validation: "PASS", checked, source: path }));

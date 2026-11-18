#!/usr/bin/env node
/**
 * Verify the browser WFST port against Google's own thrax_g2p CLI on a small
 * structural smoke set. This is implementation parity, not IPA accuracy.
 */
import { readFileSync } from "node:fs";
import { googleInputSymbols } from "../src/web/google-wfst-input.js";
import { transduceWfst } from "../src/web/wfst-runtime.js";

const model = JSON.parse(readFileSync("public/models/google-burmese-wfst.json", "utf8"));
if (model.available !== true) throw new Error("Google WFST model asset is not available");
const referencePath = process.argv[2];
if (!referencePath) throw new Error("Usage: node scripts/verify_google_wfst_model_parity.mjs <reference.tsv>");
const lines = readFileSync(referencePath, "utf8").split(/\r?\n/u).filter(Boolean);
const expectedInputs = ["ကေ", "ကော်", "မြန်", "ယူ"];
if (lines.length !== expectedInputs.length) {
  throw new Error("Google thrax_g2p returned " + lines.length + " rows; expected " + expectedInputs.length);
}
let checked = 0;
for (const [index, line] of lines.entries()) {
  const tab = line.indexOf("\t");
  if (tab < 1) throw new Error("Malformed thrax_g2p TSV line " + (index + 1) + ": " + line);
  const input = line.slice(0, tab);
  const expected = line.slice(tab + 1).trim();
  if (input !== expectedInputs[index]) throw new Error("Unexpected CLI input row " + (index + 1) + ": " + input);
  const encoded = googleInputSymbols(input);
  if (!encoded.complete) throw new Error("Browser input-symbol port rejects Google CLI sample: " + input);
  const actual = transduceWfst(encoded.symbols, model);
  if (actual.status !== "CANDIDATE") throw new Error("Browser WFST has no candidate for " + input + ": " + actual.status);
  if (actual.ipa !== expected) {
    throw new Error("WFST parity mismatch for " + input + ": browser=" + JSON.stringify(actual.ipa)
      + " CLI=" + JSON.stringify(expected));
  }
  checked++;
}
console.log(JSON.stringify({ parity: "PASS", checked, accuracy_claim: null, independent_gold_count: 0 }));

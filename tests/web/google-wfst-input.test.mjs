import test from "node:test";
import assert from "node:assert/strict";
import { googleInputSymbols } from "../../src/web/google-wfst-input.js";

test("Google Burmese UTF8_TO_GRAPHEME port maps source codepoints to grammar symbols", () => {
  const result = googleInputSymbols("ကော်");
  assert.equal(result.complete, true);
  assert.deepEqual(result.symbols, ["ka", "-e", "-aa", "asat"]);
});

test("Google Burmese input port rejects codepoints outside the pinned grammar", () => {
  const result = googleInputSymbols("က႞");
  assert.equal(result.complete, false);
  assert.deepEqual(result.unsupported, ["႞"]);
});

test("independent vowels use the grammar's grapheme inventory, not n-gram codepoint aliases", () => {
  const result = googleInputSymbols("ဣဤဥဦဧဩဪ");
  assert.deepEqual(result.symbols, ["i", "ii", "u", "uu", "e", "o", "au"]);
});

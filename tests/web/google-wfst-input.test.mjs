import test from "node:test";
import assert from "node:assert/strict";
import { googleInputSymbols } from "../../src/web/google-wfst-input.js";

test("Google Burmese UnicodeLabelMaker port maps codepoints to pinned input-symbol names", () => {
  const result = googleInputSymbols("ကော်");
  assert.equal(result.complete, true);
  assert.deepEqual(result.symbols, ["ka", "-e", "-aa", "103A"]);
});

test("Google Burmese input port rejects codepoints outside the pinned codepoint symbol table", () => {
  const result = googleInputSymbols("ကက" + String.fromCodePoint(0x10a0));
  assert.equal(result.complete, false);
  assert.deepEqual(result.unsupported, [String.fromCodePoint(0x10a0)]);
});

test("independent vowels use the exact names in the input codepoint symbol table", () => {
  const result = googleInputSymbols("ဣဤဥဦဧဩဪ");
  assert.deepEqual(result.symbols, ["'i", "'ii", "'u", "'uu", "'e", "'o", "'au"]);
});

test("the Unicode codepoint port covers the pinned Burmese block U+1000..U+1059", () => {
  const text = Array.from({length: 0x5a}, (_, index) => String.fromCodePoint(0x1000 + index)).join("");
  const result = googleInputSymbols(text);
  assert.equal(result.complete, true);
  assert.equal(result.symbols.length, 0x5a);
});

test("Google input port preserves hexadecimal labels for Burmese extended codepoints", () => {
  const codepoints = [0x105a, 0x109f, 0xa9e0, 0xa9ff, 0xaa60, 0xaa7f];
  for (const codepoint of codepoints) {
    const character = String.fromCodePoint(codepoint);
    const result = googleInputSymbols(character);
    assert.equal(result.complete, true, character);
    assert.deepEqual(result.symbols, [codepoint.toString(16).toUpperCase()]);
  }
});

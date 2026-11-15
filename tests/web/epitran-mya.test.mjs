import test from "node:test";
import assert from "node:assert/strict";
import { epitranMya } from "../../src/web/epitran-mya.js";

test("Epitran Burmese port reproduces pinned structural smoke outputs", () => {
  const cases = [
    ["ကေ", "ke"],
    ["ကော်", "kaʊʔ"],
    ["ကြည်", "t͡ɕi"],
    ["စွယ်", "səwɛ"],
    ["မြန်", "məjaɴ"],
    ["ယူ", "ju"],
  ];
  for (const [input, expected] of cases) {
    const result = epitranMya(input, { tones: true });
    assert.equal(result.ipa, expected, input);
    assert.equal(result.complete, true, input);
  }
});

test("unknown Myanmar characters are withheld from the candidate", () => {
  const result = epitranMya("က႞");
  assert.equal(result.complete, false);
  assert.ok(result.unknown.includes("႞"));
});

test("the port records upstream provenance and never claims gold validation", () => {
  const result = epitranMya("ကော်");
  assert.equal(result.provider, "epitran-mya-port");
  assert.equal(result.provenance.license, "MIT");
  assert.equal(result.provenance.profile_match, "NOT_INDEPENDENTLY_ADJUDICATED");
});

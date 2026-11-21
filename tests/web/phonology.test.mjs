import test from "node:test";
import assert from "node:assert/strict";
import { phonologizeSyllable } from "../../src/web/phonology.js";

const established = {
  raw: "ကာ",
  onset: "က",
  kinzi: false,
  conjunct: [],
  medials: [],
  vowels: ["ာ"],
  asat: false,
  coda: null,
  prosodyMarks: [],
  structureStatus: "established",
  status: "ESTABLISHED",
};

test("browser phonology stage returns typed source-backed IPA components", () => {
  assert.deepEqual(phonologizeSyllable(established), {
    status: "SEGMENTAL_ONLY",
    ipa: "ka",
    segments: [
      { kind: "onset", source: "က", ipa: "k", status: "established", evidence: ["U18", "GREEN2002"] },
      { kind: "vowel", source: "aa", ipa: "a", status: "established", evidence: ["U18", "GREEN2002"] },
    ],
    unresolved_features: ["tone", "phonation", "quantity", "profile_adjudication"],
    rule_ids: [],
  });
});

test("browser phonology stage preserves medial, coda and prosody blockers", () => {
  for (const [patch, feature] of [
    [{ medials: ["ျ"] }, "medial"],
    [{ coda: "တ", asat: true }, "coda"],
    [{ prosodyMarks: ["့"], status: "ANALYSIS_DEPENDENT" }, "prosody"],
  ]) {
    const result = phonologizeSyllable({ ...established, ...patch });
    assert.equal(result.status, "NOT_ESTABLISHED");
    assert.equal(result.ipa, null);
    assert.ok(result.unresolved_features.includes(feature));
  }
});


test("multiple established vowel signs are not concatenated into an invented combination", () => {
  const result = phonologizeSyllable({ ...established, raw: "ကော", vowels: ["ေ", "ာ"] });
  assert.equal(result.status, "NOT_ESTABLISHED");
  assert.equal(result.ipa, null);
  assert.deepEqual(result.segments, [
    { kind: "onset", source: "က", ipa: "k", status: "established", evidence: ["U18", "GREEN2002"] },
  ]);
  assert.ok(result.unresolved_features.includes("vowel_combination"));
});



test("analysis-dependent onset and vowel rows create a separate provisional segmental IPA", () => {
  const result = phonologizeSyllable({ ...established, raw: "ကီ", vowels: ["ီ"] });
  assert.equal(result.status, "NOT_ESTABLISHED");
  assert.equal(result.ipa, null);
  assert.equal(result.provisional_ipa, "kiː");
  assert.equal(result.provisional_status, "PROVISIONAL_SEGMENTAL_ONLY");
  assert.ok(result.provisional_segments.every(part => part.evidence.length > 0));
});

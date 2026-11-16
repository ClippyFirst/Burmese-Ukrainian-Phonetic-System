import assert from "node:assert/strict";
import { test } from "node:test";
import { PRACTICAL, ONSETS, VOWELS } from "../../src/web/generated/data.js";
import { renderUkrainian } from "../../src/web/ukrainian-adapter.js";
import { phonologizeSyllable } from "../../src/web/phonology.js";
import { analyzeHybrid } from "../../src/web/hybrid-engine.js";

const simpleSyllable = {
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

test("browser adapter covers Ukrainian h/g/x distinctions", () => {
  for (const segment of ["h", "ɦ", "ɡ", "g", "x"]) {
    assert.ok(PRACTICAL[segment], "missing practical table row for " + segment);
  }
  assert.equal(renderUkrainian("h ɦ ɡ g x").text, "г г ґ ґ х");
});

test("browser adapter renders tied affricates as Ukrainian ц, дз, ч, дж", () => {
  const result = renderUkrainian("t͡sd͡zt͡ʃd͡ʒtɕdʑt͡ɕd͡ʑ");
  assert.equal(result.text, "цдзчджчджчдж");
  assert.equal(result.status, "PROPOSED");
  assert.equal(renderUkrainian("t s d z").text, "т с д з");
});

test("browser adapter does not collapse an untied consonant sequence into an affricate", () => {
  assert.equal(renderUkrainian("ts").text, "тс");
  assert.equal(renderUkrainian("t͡s").text, "ц");
});

test("browser adapter uses Ukrainian yotated vowels after syllable-initial j", () => {
  assert.equal(renderUkrainian("ja").text, "я");
  assert.equal(renderUkrainian("je").text, "є");
  assert.equal(renderUkrainian("ji").text, "ї");
  assert.equal(renderUkrainian("jo").text, "йо");
  assert.equal(renderUkrainian("ju").text, "ю");
  assert.equal(renderUkrainian("a.ja").text, "ая");
  assert.equal(renderUkrainian("ja je ji jo ju").text, "я є ї йо ю");
});

test("browser adapter keeps tone and length in prosody trace, not practical spelling", () => {
  const result = renderUkrainian("kʰàː");
  assert.equal(result.text, "к'а");
  assert.ok(result.prosody.some((item) => item.kind === "tone"));
  assert.ok(result.prosody.some((item) => item.kind === "length"));
});

test("browser adapter omits glottal stop and withholds unknown IPA", () => {
  assert.equal(renderUkrainian("ʔa").text, "а");
  const unknown = renderUkrainian("kʰɤ");
  assert.equal(unknown.status, "NOT_ESTABLISHED");
  assert.equal(unknown.text, "");
});

test("browser phonology stage emits IPA components and leaves Ukrainian adaptation downstream", () => {
  const phonology = phonologizeSyllable(simpleSyllable);
  assert.equal(phonology.ipa, "ka");
  assert.equal(phonology.status, "SEGMENTAL_ONLY");
  assert.equal(phonology.ukrainian, undefined);
  assert.equal(renderUkrainian(phonology.ipa).text, "ка");
});

test("unresolved bare inherent vowel remains a placeholder, not a completed syllable", () => {
  const phonology = phonologizeSyllable({ ...simpleSyllable, vowels: [] });
  assert.equal(phonology.ipa, "k?");
  assert.equal(phonology.status, "NOT_ESTABLISHED");
  assert.ok(phonology.unresolved_features.includes("inherent_vowel"));
  assert.equal(renderUkrainian("k").text, "к");
});

test("source registries distinguish orthographic signs from established phonetic values", () => {
  assert.equal(ONSETS["စ"].status, "analysis_dependent");
  assert.equal(ONSETS["ဓ"].status, "analysis_dependent");
  assert.equal(VOWELS.ai.status, "analysis_dependent");
  assert.equal(VOWELS.ii.status, "analysis_dependent");
  assert.equal(VOWELS.uu.status, "analysis_dependent");

  const onset = phonologizeSyllable({ ...simpleSyllable, onset: "စ" });
  assert.equal(onset.ipa, null);
  assert.ok(onset.unresolved_features.includes("onset_realization"));

  const vowel = phonologizeSyllable({ ...simpleSyllable, vowels: ["ီ"] });
  assert.equal(vowel.ipa, null);
  assert.ok(vowel.unresolved_features.includes("vowel_realization"));
});

test("hybrid orchestrator adapts segmental IPA provisionally and never promotes it to canonical", () => {
  const result = analyzeHybrid([{
    raw: "ကာ",
    ipa: "ka",
    status: "ESTABLISHED",
    prosodyStatus: "NOT_ESTABLISHED",
  }]);
  const record = result.records[0];
  assert.equal(record.selectedIpa, null);
  assert.equal(record.phoneticCompleteness, "SEGMENTAL_ONLY");
  assert.equal(record.provisionalAdaptation.text, "ка");
  assert.equal(record.selectedSource, "PROJECT_RULES_SEGMENTAL_PREVIEW");
});

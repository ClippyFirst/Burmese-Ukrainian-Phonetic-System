import assert from "node:assert/strict";
import { test } from "node:test";
import { readFileSync } from "node:fs";
import { PRACTICAL, ONSETS, VOWELS } from "../../src/web/generated/data.js";
import { renderUkrainian } from "../../src/web/ukrainian-adapter.js";
const browserEngineSource = readFileSync(new URL("../../src/web/app.js", import.meta.url), "utf8");
const hybridEngineSource = readFileSync(new URL("../../src/web/hybrid-engine.js", import.meta.url), "utf8");

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


test("browser parser leaves Ukrainian adaptation to the hybrid IPA-first orchestrator", () => {
  assert.ok(browserEngineSource.includes("const unsupportedStructure=sy.kinzi||sy.kinziCoda||sy.medials.length>0||sy.conjunct.length>0"));
  assert.ok(!browserEngineSource.includes("sy.uk="));
  assert.ok(hybridEngineSource.includes("renderUkrainian(ipa)"));
});


test("browser engine exposes onset-only provisional IPA for unresolved Burmese units", () => {
  assert.ok(browserEngineSource.includes("sy.provisionalIpa=hint"));
  assert.ok(browserEngineSource.includes('sy.provisionalUk=adapted.text+"?"'));
  assert.ok(browserEngineSource.includes('sy.provisionalStatus="PROVISIONAL"'));
  assert.ok(browserEngineSource.includes('sy.provisionalUnresolvedFeatures=["inherent_vowel"]'));
  assert.ok(browserEngineSource.includes("ipa.textContent=hybrid.ipa"));
  assert.ok(browserEngineSource.includes("uk.textContent=hybrid.uk"));
  assert.ok(browserEngineSource.includes('if(s.provisionalIpa){const preview=document.createElement("small")'));
});


test("browser G2P source registries distinguish orthographic signs from established phonetic values", () => {
  assert.equal(ONSETS["စ"].status, "analysis_dependent");
  assert.equal(ONSETS["ဓ"].status, "analysis_dependent");
  assert.equal(VOWELS.ai.status, "analysis_dependent");
  assert.equal(VOWELS.ii.status, "analysis_dependent");
  assert.equal(VOWELS.uu.status, "analysis_dependent");
  assert.ok(browserEngineSource.includes('if(!onset)return null'));
  assert.ok(browserEngineSource.includes('if(onset.status!=="established"){sy.status="ANALYSIS_DEPENDENT";return null;}'));
  assert.ok(browserEngineSource.includes('VOWELS[id]?.status!=="established"'));
  assert.ok(browserEngineSource.includes('sy.status="ANALYSIS_DEPENDENT";return null'));
  assert.ok(hybridEngineSource.includes('["UNSUPPORTED", "UNCERTAIN"].includes(segment.status)'));
  assert.ok(browserEngineSource.includes('VOWELS, SIGNS'));
});


test("public phonetic UI renders the hybrid orchestrator result, not the pre-hybrid result", () => {
  assert.ok(browserEngineSource.includes("uk.textContent=hybrid.uk"));
  assert.ok(browserEngineSource.includes("ipa.textContent=hybrid.ipa"));
  assert.ok(browserEngineSource.includes("hybrid.ukrainianStatus"));
  assert.ok(browserEngineSource.includes("hybrid.ipaStatus"));
});

test("segmental-only IPA is shown as provisional and does not bypass the IPA adapter", () => {
  assert.ok(browserEngineSource.includes('item.phoneticCompleteness==="SEGMENTAL_ONLY"'));
  assert.ok(hybridEngineSource.includes('provider: "PROJECT_RULES_SEGMENTAL"'));
  assert.ok(hybridEngineSource.includes("adaptationFor(deterministicIpa)"));
  assert.ok(hybridEngineSource.includes("renderUkrainian(ipa)"));
});

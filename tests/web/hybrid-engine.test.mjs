import test from "node:test";
import assert from "node:assert/strict";
import { analyzeHybrid } from "../../src/web/hybrid-engine.js";

test("hybrid uses established project IPA and keeps Epitran as a comparator", () => {
  const result = analyzeHybrid([{raw:"ကော်",nonMyanmar:false,ipa:"kaʊʔ",status:"ESTABLISHED",prosodyStatus:"ESTABLISHED",profileId:"my-yangon-careful-citation-v1"}]);
  assert.equal(result.ipa, "kaʊʔ");
  assert.equal(result.records[0].selectedSource, "PROJECT_RULES");
  assert.equal(result.records[0].epitranCandidate, "kaʊʔ");
  assert.equal(result.ipaStatus, "ESTABLISHED");
  assert.equal(typeof result.records[0].selectedAdaptation.status, "string");
});

test("hybrid exposes Epitran candidate but does not promote it without gold", () => {
  const result = analyzeHybrid([{raw:"မြန်",nonMyanmar:false,ipa:null,status:"ANALYSIS_DEPENDENT"}]);
  assert.equal(result.ipa, "?");
  assert.equal(result.records[0].epitranCandidate, "məjaɴ");
  assert.equal(result.records[0].selectedSource, "UNRESOLVED");
  assert.equal(result.status, "NOT_ESTABLISHED");
  assert.equal(result.usedExternalFallback, false);
});

test("hybrid preserves non-Myanmar text and never claims a missing Google model", () => {
  const result = analyzeHybrid([
    {raw:"ကော်",nonMyanmar:false,ipa:"kaʊʔ",status:"ESTABLISHED"},
    {raw:" ",nonMyanmar:true},
    {raw:"႞",nonMyanmar:false,ipa:null,status:"UNSUPPORTED"},
  ]);
  assert.ok(result.ipa.includes(" "));
  assert.match(result.ipa, /\?/);
  assert.match(result.providers.google, /PENDING_MODEL/);
});

test("hybrid can execute a local Google WFST candidate before Epitran fallback", () => {
  const model = {
    schema_version: "1.0", available: true, start_state: 0,
    arcs: [{src:0,dst:1,ilabel:"ka",olabel:"k",weight:0}],
    finals: [{state:1,weight:0}],
    provenance: {engine:"test-fixture"},
  };
  const result = analyzeHybrid([{raw:"က",nonMyanmar:false,ipa:null,status:"ANALYSIS_DEPENDENT"}], model);
  assert.equal(result.records[0].google.status, "CANDIDATE");
  assert.equal(result.records[0].googleCandidate, "k");
  assert.equal(result.records[0].selectedSource, "UNRESOLVED");
  assert.equal(result.status, "NOT_ESTABLISHED");
});

test("Google WFST is invoked on a contiguous word run and aligned by its syllable separator", () => {
  const model = {
    schema_version:"1.0",available:true,start_state:0,
    arcs:[
      {src:0,dst:1,ilabel:"ka",olabel:"k",weight:0},
      {src:1,dst:2,ilabel:"<epsilon>",olabel:".",weight:0},
      {src:2,dst:3,ilabel:"ma",olabel:"m",weight:0},
    ],
    finals:[{state:3,weight:0}],
  };
  const result = analyzeHybrid([
    {raw:"က",nonMyanmar:false,ipa:null,status:"ANALYSIS_DEPENDENT"},
    {raw:"မ",nonMyanmar:false,ipa:null,status:"ANALYSIS_DEPENDENT"},
  ], model);
  assert.equal(result.records[0].googleCandidate, "k");
  assert.equal(result.records[1].googleCandidate, "m");
  assert.equal(result.records[0].google.alignment, "SYLLABLE_ALIGNED");
  assert.equal(result.records[0].selectedSource, "UNRESOLVED");
});


test("canonical IPA is the actual input to the single Ukrainian adapter", () => {
  const result = analyzeHybrid([{raw:"ကာ",nonMyanmar:false,ipa:"ka",status:"ESTABLISHED",prosodyStatus:"ESTABLISHED",profileId:"my-yangon-careful-citation-v1"}]);
  assert.equal(result.ipa, "ka");
  assert.equal(result.uk, "ка");
  assert.equal(result.records[0].selectedPhoneticResult.kind, "IPA_CANDIDATE");
  assert.equal(result.records[0].selectedPhoneticResult.notation, "IPA");
  assert.equal(result.records[0].selectedSource, "PROJECT_RULES");
  assert.ok(["ESTABLISHED", "WELL_SUPPORTED", "PROPOSED"].includes(result.records[0].ukrainianStatus));
});

test("unknown internal IPA remains withheld even when external providers return candidates", () => {
  const result = analyzeHybrid([{raw:"မြန်",nonMyanmar:false,ipa:null,status:"ANALYSIS_DEPENDENT"}]);
  assert.equal(result.ipa, "?");
  assert.equal(result.uk, "⟦မြန်⟧");
  assert.equal(result.records[0].selectedPhoneticResult, null);
  assert.equal(result.usedExternalFallback, false);
});

test("tone-only differences are distinguished from segmental divergence", async () => {
  const { compareIpaCandidates } = await import("../../src/web/hybrid-engine.js");
  assert.deepEqual(compareIpaCandidates("ka", "k à"), {
    relation: "SEGMENTAL_AGREEMENT_PROSODY_DIFFERENCE",
    segmental: "AGREEMENT",
    prosody: "TONE_UNDERSPECIFIED_BY_ONE_CANDIDATE",
  });
  assert.equal(compareIpaCandidates("kà", "ká").prosody, "TONE_DIVERGENCE");
  assert.equal(compareIpaCandidates("ka", "kʰa").relation, "DIVERGENCE");
});

test("provider comparison explicitly records unverified dialect scope", () => {
  const result = analyzeHybrid([{raw:"ကာ",nonMyanmar:false,ipa:"ka",status:"ESTABLISHED"}]);
  assert.equal(result.records[0].comparisonScope, "DIALECT_PROFILE_UNVERIFIED");
  assert.equal(result.records[0].profileStatus, "NOT_ESTABLISHED");
});


test("segmental IPA without tone and profile evidence is not canonical", () => {
  const result = analyzeHybrid([{raw:"ကာ",nonMyanmar:false,ipa:"ka",status:"ESTABLISHED"}]);
  const record = result.records[0];
  assert.equal(record.selectedSource, "PROJECT_RULES_SEGMENTAL_PREVIEW");
  assert.equal(record.phoneticCompleteness, "SEGMENTAL_ONLY");
  assert.equal(record.ipaStatus, "ANALYSIS_DEPENDENT");
  assert.equal(record.ukrainianStatus, "PROVISIONAL");
  assert.equal(record.selectionReason, "TONE_OR_PROFILE_NOT_ESTABLISHED");
  assert.equal(result.ipa, "ka");
  assert.equal(result.uk, "ка");
  assert.equal(record.selectedPhoneticResult, null);
  assert.equal(record.provisionalPhoneticResult.kind, "IPA_CANDIDATE");
  assert.ok(record.candidateAdaptations.some(item => item.provider === "PROJECT_RULES_SEGMENTAL" && item.ukrainian.text === "ка"));
});

test("explicit profile and prosody evidence allow canonical IPA to reach the adapter", () => {
  const result = analyzeHybrid([{
    raw:"ကာ",nonMyanmar:false,ipa:"kà",status:"ESTABLISHED",
    prosodyStatus:"ESTABLISHED",profileId:"my-yangon-careful-citation-v1"
  }]);
  assert.equal(result.records[0].selectedSource, "PROJECT_RULES");
  assert.equal(result.ipa, "kà");
  assert.equal(result.uk, "ка");
});


test("uncertain structural segments cannot leak a partial internal IPA candidate", () => {
  const result = analyzeHybrid([{
    raw:"ကာꩠ",nonMyanmar:false,ipa:"ka",status:"UNCERTAIN"
  }]);
  assert.equal(result.ipa, "?");
  assert.equal(result.uk, "⟦ကာꩠ⟧");
  assert.equal(result.records[0].selectedSource, "UNRESOLVED");
  assert.equal(result.records[0].projectCandidate, null);
  assert.equal(result.ipaStatus, "UNCERTAIN");
});

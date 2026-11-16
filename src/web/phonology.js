import { ONSETS, VOWELS, SIGNS } from "./generated/data.js";

const VOWEL_IDS_BY_NAME = {
  "MYANMAR VOWEL SIGN E": "e",
  "MYANMAR VOWEL SIGN I": "i",
  "MYANMAR VOWEL SIGN II": "ii",
  "MYANMAR VOWEL SIGN AI": "ai",
  "MYANMAR VOWEL SIGN U": "u",
  "MYANMAR VOWEL SIGN UU": "uu",
  "MYANMAR VOWEL SIGN TALL AA": "tall_aa",
  "MYANMAR VOWEL SIGN AA": "aa",
  "MYANMAR SIGN ANUSVARA": "anusvara",
};
const PROSODIC_GAPS = ["tone", "phonation", "quantity", "profile_adjudication"];

function evidence(row) {
  return String(row?.evidence || "").split(";").map(value => value.trim()).filter(Boolean);
}

/**
 * Source-preserving Burmese phonology stage.
 *
 * It consumes the browser parser's orthographic structure and the canonical
 * CSV-derived IPA registries. It emits only the established segmental subset;
 * unresolved medials, codas, nasalization and prosody remain explicit.
 */
export function phonologizeSyllable(syllable) {
  const segments = [];
  const blocking = [];
  const unresolved = [];
  const withhold = feature => {
    if (!blocking.includes(feature)) blocking.push(feature);
    if (!unresolved.includes(feature)) unresolved.push(feature);
  };

  if (syllable.structureStatus && syllable.structureStatus !== "established") {
    withhold("orthographic_structure");
  }
  if (syllable.medials?.length) withhold("medial");
  if (syllable.conjunct?.length) withhold("conjunct");
  if (syllable.kinzi || syllable.kinziCoda) withhold("kinzi");
  if (syllable.coda || syllable.asat) withhold("coda");
  if (syllable.prosodyMarks?.length) withhold("prosody");

  const onsetRow = ONSETS[syllable.onset || ""];
  let onsetIpa = null;
  if (!onsetRow?.ipa || onsetRow.status !== "established") {
    withhold("onset_realization");
  } else {
    onsetIpa = onsetRow.ipa;
    segments.push({
      kind: "onset",
      source: syllable.onset,
      ipa: onsetIpa,
      status: onsetRow.status,
      evidence: evidence(onsetRow),
    });
  }

  const vowelSigns = syllable.vowels || [];
  const vowelIpa = [];
  if (!vowelSigns.length) {
    withhold("inherent_vowel");
  } else {
    for (const sign of vowelSigns) {
      const id = VOWEL_IDS_BY_NAME[SIGNS[sign]?.unicode_name];
      const row = VOWELS[id || ""];
      if (id === "anusvara") {
        withhold("nasalization");
      } else if (!row?.ipa || row.status !== "established") {
        withhold("vowel_realization");
      } else {
        vowelIpa.push(row.ipa);
        segments.push({
          kind: "vowel",
          source: id,
          ipa: row.ipa,
          status: row.status,
          evidence: evidence(row),
        });
      }
    }
  }

  for (const feature of PROSODIC_GAPS) {
    if (!unresolved.includes(feature)) unresolved.push(feature);
  }

  let ipa = onsetIpa && vowelIpa.length ? onsetIpa + vowelIpa.join("") : null;
  const partialInherent = Boolean(onsetIpa) && !vowelSigns.length
    && blocking.length === 1 && blocking[0] === "inherent_vowel";
  if (partialInherent) ipa = onsetIpa + "?";

  return {
    status: ipa && blocking.length === 0 ? "SEGMENTAL_ONLY" : "NOT_ESTABLISHED",
    ipa: ipa && (blocking.length === 0 || partialInherent) ? ipa : null,
    segments,
    unresolved_features: unresolved,
    rule_ids: [],
  };
}

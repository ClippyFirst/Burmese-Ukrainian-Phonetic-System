# Evidence confidence tiers — Burmese beta

**Scope:** contemporary Yangon-oriented careful citation profile. These are categorical evidence tiers, not calibrated probabilities, benchmark scores, or claims of expert validation.

| Tier | Meaning | Runtime treatment |
|---|---|---|
| A | Independently adjudicated, profile-matched gold | Not currently available |
| B | Source-traceable segmental IPA candidate; every segment has at least one phonological source beyond Unicode orthographic documentation, and the Ukrainian IPA adapter succeeds | Display as PROVISIONAL; never silently call full/canonical IPA |
| C | Experimental or incomplete evidence: onset-only hint, incomplete segment, unresolved mapping, or unreferenced hypothesis | Display separately with unresolved features |
| D | No usable candidate or unsupported/malformed input | Withhold IPA and Ukrainian output |

## New provisional segmental path

The source registries already contain several non-empty IPA values marked analysis_dependent. Previously, those values were withheld even when a single onset and a single vowel sign each had explicit source locators. The beta now exposes a separate provisional_ipa candidate when all of the following hold:

- exactly one onset and one vowel sign are present;
- both registry rows contain IPA and source evidence;
- any analysis-dependent row is preserved as such;
- no medial, conjunct, kinzi, coda, prosody mark, inherent-vowel inference, or multi-sign vowel combination is involved.

Examples now covered as provisional candidates include ကီ → kiː, ကဲ → kɛ, and စေ → se. The source registry gives the long /iː/ row only a Unicode 18 locator, so ကီ remains tier C: Unicode supports script/orthographic analysis but is not treated as phonological evidence by itself. The candidates ကဲ and စေ have Green (2002) phonological source locators for the analysis-dependent segment and can reach tier B when the IPA → Ukrainian adapter maps the complete string. Otherwise the IPA remains inspectable while the Ukrainian value is withheld.

This does not promote these candidates to canonical IPA. Tone, phonation, quantity and independent profile adjudication remain unresolved; canonical_ipa and canonical_ukrainian remain null. External G2P candidates are not promoted or voted into the result.

## Measurement boundary

The independent adjudicated gold corpus remains empty. Word-level IPA accuracy and Ukrainian accuracy remain NOT_ASSESSED. A B-tier output is a reasoned, traceable provisional candidate, not a measured-correct answer. No benchmark labels or gold rows were created by this change.

## Verification

Implementation branch: research/tier-b-provisional-coverage-2026-11-21, based on main 62b1cba5fe2c2531429593ac122fc021bc077274. Added Python and browser parity logic and regression tests. Exact-head hosted CI is required before merge; do not infer test success from the presence of tests.

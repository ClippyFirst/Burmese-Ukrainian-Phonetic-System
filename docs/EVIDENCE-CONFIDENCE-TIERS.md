# Evidence confidence tiers — Burmese beta

**Scope:** contemporary Yangon-oriented careful citation profile. These are categorical evidence tiers, not calibrated probabilities, benchmark scores, or claims of expert validation.

| Tier | Meaning | Runtime treatment |
|---|---|---|
| A | Independently adjudicated, profile-matched gold | Not currently available |
| B | Every segment has an exact source locator beyond Unicode orthographic documentation; the IPA → Ukrainian adapter succeeds; no unresolved source conflict applies to that candidate | Display as PROVISIONAL; never silently call full/canonical IPA |
| C | Experimental or incomplete evidence: onset-only hint, incomplete segment, unresolved mapping, or unreferenced hypothesis | Display separately with unresolved features |
| D | No usable candidate or unsupported/malformed input | Withhold IPA and Ukrainian output |

## New provisional segmental path

The source registries already contain several non-empty IPA values marked analysis_dependent. Previously, those values were withheld even when a single onset and a single vowel sign each had explicit source locators. The beta now exposes a separate provisional_ipa candidate when all of the following hold:

- exactly one onset and one vowel sign are present;
- both registry rows contain IPA and source evidence;
- any analysis-dependent row is preserved as such;
- no medial, conjunct, kinzi, coda, prosody mark, inherent-vowel inference, or multi-sign vowel combination is involved.

The segment registries now carry exact Green (2005) source locators from the published broad-transcription tables. Simple source-attested segmental candidates include လေ → /le/ → ле, ပူ → /pu/ → пу, and နေ → /ne/ → не. These are tier B only as provisional segmental outputs: tone, phonation, quantity and independent Yangon-profile adjudication remain unresolved. The source locators identify the exact Burmese forms and table/page locations, not merely a bibliography-wide source ID.

The long-vowel candidate ကီ → kiː remains tier C because its current row has no exact phonological source locator for that sign/value pair; Unicode alone is orthographic evidence. The candidate စေ → se also remains tier C despite a Green (2005) locator: Green (2005) maps စ to /s/ and gives စေ sè, while Oo et al. (2020, §3, p. 6330) gives စ /tʃ/. The conflict is preserved in the registry and visible in the browser; tier B is withheld pending target-profile reconciliation.

This does not promote these candidates to canonical IPA. Tone, phonation, quantity and independent profile adjudication remain unresolved; canonical_ipa and canonical_ukrainian remain null. External G2P candidates are not promoted or voted into the result.

## Measurement boundary

The independent adjudicated gold corpus remains empty. Word-level IPA accuracy and Ukrainian accuracy remain NOT_ASSESSED. A B-tier output is a reasoned, traceable provisional candidate, not a measured-correct answer. No benchmark labels or gold rows were created by this change.

## Verification

Implementation branch: research/tier-b-provisional-coverage-2026-11-21, based on main 62b1cba5fe2c2531429593ac122fc021bc077274. Added Python and browser parity logic and regression tests. Exact-head hosted CI is required before merge; do not infer test success from the presence of tests.


## Exact-locator and conflict gate — 2026-11-21

- B now requires a non-empty per-segment `source_locator`, a phonological source beyond Unicode, successful complete IPA → Ukrainian adaptation, and no registered conflicting source analysis for the candidate.
- Green (2005), *Word, foot and syllable structure in Burmese*, front-matter Tables (1) and (6), pp. xii–xiii, and the abbreviation list p. xv, supplies exact segmental source locators for the new B examples. Its online edition is CC BY-SA 4.0; only short source metadata and locators are recorded.
- The conflict for စ is explicit: Green (2005) gives စ /s/ and စေ sè, while Oo et al. (2020) §3, p. 6330 gives စ /tʃ/. The system retains a C-tier candidate for inspection but does not call it B or canonical.
- No independent gold rows were added. B remains a source-traceable research candidate, not a measured-correct result.

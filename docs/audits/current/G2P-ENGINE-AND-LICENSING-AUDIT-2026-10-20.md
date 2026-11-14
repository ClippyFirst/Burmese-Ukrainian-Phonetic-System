# External Burmese G2P and licensing audit

Review date: 2026-10-20  
Decision: **do not replace the project engine with an external G2P yet**.

## Epitran (mya-Mymr)

Evidence reviewed:
- Project README lists mya-Mymr as Burmese support, but explicitly places it in the set of languages with limited support because orthography is highly ambiguous.
- Current Epitran project metadata declares Python >=3.10 and the MIT-Modern-Variant license for the package code. The current release page surfaced v1.35.0 (2026-04-24); pin the exact package version and mapping-data revision in any reproducible benchmark.
- Epitran's general mapping method is orthography-to-IPA with map tables and optional preprocessors/postprocessors. That output should be treated as a candidate baseline, not as independent truth.

Sources:
- https://github.com/dmort27/epitran
- https://github.com/dmort27/epitran/blob/master/README.md
- https://github.com/dmort27/epitran/blob/master/pyproject.toml
- https://github.com/dmort27/epitran/releases

Assessment:
- **Candidate role:** control engine / baseline comparator.
- **Not yet accepted as primary G2P:** the project itself warns that Burmese accuracy is limited due to orthographic ambiguity.
- **Unverified here:** exact coverage of mya-Mymr maps/preprocessors, behavior on this project's adversarial set, lexical accuracy against an independently adjudicated Burmese IPA corpus, and license/provenance of every redistributed mapping or auxiliary data file. Package license alone must not be assumed to settle every data-file right.
- **Required experiment:** pin version and artifact hashes; test whether the mapping leaves unknown graphemes in output; evaluate normalization, kinzi, medials, inherent vowels, codas, checked syllables, tone marks, proper names, loans and malformed input. Compare by layer and publish all disagreements.

## myG2P

Sources:
- https://github.com/ye-kyaw-thu/myG2P
- https://github.com/kyaw-yethu/burmese-G2P

The upstream myG2P repository states that its pronunciation dictionary is licensed under **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0)**. It describes a dictionary based on Myanmar Language Commission pronunciation entries, expanded with foreign pronunciations, and asks users to cite the related publications.

Implications:
- **NonCommercial:** do not use the dictionary as a bundled dependency for commercial use without separate permission.
- **ShareAlike:** adaptations of the licensed database/material may trigger share-alike obligations under the license; whether a particular integration is an adaptation or a separate work requires case-specific legal review.
- **Attribution and notices:** preserve attribution, source provenance and required notices if used in a permitted context.
- The CC BY-NC-SA 4.0 grant permits non-commercial research use, including analysis and adaptation, provided attribution and ShareAlike obligations are followed. Any redistributed myG2P-derived database or adaptation must retain compatible CC BY-NC-SA terms. Commercial product use remains outside the grant and requires separate permission. Do not treat the dictionary as independent IPA gold or copy its IPA as adjudicated truth.
- It is not a universal default dependency for a project whose eventual code/data licensing and possible commercial use have not been decided.

CC BY-NC-SA 4.0 legal text: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.en

## Other candidate categories

- **NRC g2p (MIT):** a general framework for defining transducers, not a Burmese pronunciation model by itself. Useful only if a project-specific mapping is authored and validated.
  - https://github.com/NRC-ILT/g2p
- **Epitran-derived forks:** not independent evidence if they share the same map files/rules; check data provenance before treating agreement as replication.
- **Neural/TTS systems:** may provide useful hypotheses, but require model/data licenses, reproducible weights and a reference corpus. Their output is not automatically IPA ground truth.

## License state of this repository

The repository currently has no root LICENSE file and GitHub reports no detected repository license. This audit deliberately does not invent an MIT/Apache/GPL license choice for the maintainers. CITATION.cff uses license NOASSERTION until the project owner selects a license.

Before public reuse:
1. Decide the license for original source code.
2. Decide whether the corpus is separately licensed and whether source-derived lexical data can be redistributed.
3. Inventory code, model, dictionary, source-text and generated-data licenses separately.
4. Add a root license only after the owner has made that decision.
5. Do not bundle myG2P dictionary material under an incompatible blanket project license.

## Reproducible benchmark protocol

Do not report an engine as better until the independent corpus exists. Record for each run:
- engine/package version and commit or release;
- model/map/data version and cryptographic hashes;
- normalization and preprocessing configuration;
- raw output without cleanup;
- expected broad IPA, source locator and confidence;
- exact-match and feature-level error rates, with tone/coda/medial categories separated;
- unsupported/unknown handling and runtime failures;
- license review outcome.

Until then, Epitran is a **candidate baseline**, myG2P is a **license-constrained dictionary/reference**, and the in-repository engine remains a **partial research prototype**, not a validated full-coverage system.

## Pinned mapping-file inspection (Epitran v1.35.0)

Inspected the release-tagged files directly rather than inferring behavior from the package license or README alone:

- Map: https://github.com/dmort27/epitran/blob/v1.35.0/epitran/data/map/mya-Mymr.csv
- Preprocessor: https://github.com/dmort27/epitran/blob/v1.35.0/epitran/data/pre/mya-Mymr.txt
- Postprocessor: https://github.com/dmort27/epitran/blob/v1.35.0/epitran/data/post/mya-Mymr.txt

Findings from the tagged data:
- The mapping table is compact and contains direct grapheme/chunk-to-IPA substitutions (for example `က → kə`, `ဦ → ʔu`, `ော် → aʊʔ`). These are mapping entries, not evidence that a whole lexical word has been correctly analyzed.
- The preprocessor file is empty at this tag.
- The postprocessor has explicit rules for medial insertion/reordering and removal of selected inherent `ə` outputs. It maps both `ျ` and `ြ` to `j`, and `ွ` to `w`, in its medial handling.
- The inspected postprocessor contains no tone reconstruction rule. The map contains segmental/coda-like outputs such as `ɪɴ`, `aʊʔ` and `aɪɴ`, but this is not a tone-labelled lexical corpus.
- The combination of compact substitutions, postprocessing and the upstream limited-support warning means Epitran can be a useful comparator for grapheme/segmental hypotheses, but cannot supply the missing independent gold targets or validate the project's tone/register model.

This was a static inspection of release-tagged mapping files, not an execution of Epitran. No claim is made about actual output on the project's six structural probes until a reproducible runtime benchmark is run. Do not redistribute these mapping files as part of this repository merely because the package code declares an MIT-Modern-Variant license; keep the tagged third-party data and its licensing/provenance review distinct.

## Optional local baseline runner

The repository now includes `scripts/benchmark_g2p.py`. It imports Epitran only when explicitly run, so Epitran is not a project runtime dependency and no third-party mapping files are copied into this repository.

Example in a separate environment where the maintainer has installed Epitran:

```bash
python scripts/benchmark_g2p.py --engine epitran --output epitran-benchmark.json
```

The JSON report records raw output, package version, corpus SHA-256 and—when the installed package exposes the file—mapping-table SHA-256. It only scores rows whose evidence status is `GOLD_VERIFIED`, with a non-empty expected IPA, source ID and a non-pending source locator. With the current structural-only seed corpus, the eligible gold count is zero and accuracy remains `null`; this is intentional. The runner has not yet been executed against an installed Epitran environment, so no engine output or accuracy result is claimed in this audit.


## Burmese medial/G2P source and licensing update — 2026-11-13

### Google Thrax/OpenFst

- The exact pinned source commit a90601024f07ab7e96c911243324e0adeb16da96 has Apache-2.0 in both repository LICENSE and my/burmese.grm header. This corrects the earlier “license not identified” note for the paper: the paper does not specify the code license, but the actual pinned code does.
- The grammar is a candidate external comparator, not a default runtime dependency. Its upstream WORKSPACE is not fully hermetic; the PR #129 branch contains a pinned build path. The raw structural probe returned m j àɴ for မြန်, but had no expected IPA/gold.
- This code license does not extend to LREC in-house speech data, MLC dictionary data, myG2P, or other corpora.

### Epitran and CRFsuite diagnostics

- Epitran 1.35.3 raw output for မြန် is məjaɴ, compared with Google m j àɴ and Wiktionary /mjàɴ/. The exact artifact has zero gold and null accuracy; treat this as unresolved model disagreement.
- CRFsuite v2 sample: 100 evenly spaced myG2P v2.0 rows, 84 source-concordant, 0 gold, null accuracy, possible training overlap. Medial counts overlap: YA 10/14, RA 17/20, WA 13/15, HA 7/8. The target word မြန် was not selected.
- The CRF model's source data inherits the myG2P CC BY-NC-SA 4.0 restriction. Do not integrate its data/model artifacts commercially without separate permission.
- Current exact artifacts: optional run 43325991496; Epitran SHA-256 cb9cbb1c08047b2082f21f3c29d01d8054eaf37fc462abf55a3336ad265d7c1f; CRF SHA-256 d0df5c6527a757ee3c8be5259578ec08abdd3b219bf317d3de7364a47bdb6125.


## Mya2Rom mode separation — 2026-11-13

Mya2Rom 0.4.4 exposes distinct ipa, mlcts, mlcts2, simple and simple2 modes. MLCTS is orthographic; MLCTS2 is a more phonetic romanization used by the MLC Myanmar-English Dictionary and SEALang, not standardized IPA. The project's runtime explicitly requests mlcts. Do not treat the Latin→Ukrainian crosswalk as pronunciation-based G2P. Mya2Rom's own IPA convention uses /N/ rather than nasalized vowels and documents limitations with stacking, ASAT, schwa, voicing sandhi, alternate pronunciations and Pali/Sanskrit forms. Source license: CC BY-SA 4.0.


## Text-only continuation and licensing update — 2026-11-13

- Active research scope is written sources only. No audio acquisition, processing, annotation or audio-derived G2P evaluation is planned. Legacy SLR80/UCSY-SC1 records are historical metadata only and are not active source candidates.
- MYX_MYANGLISH_2026: CC BY-SA 4.0 declared; 2,121 text pairs; single-author-style, non-standardized romanization; 3-column viewer vs 2-field README mismatch. No rows copied; not IPA.
- MYX_ORTHO_2026: CC BY-SA 4.0 declared; 4,800 noisy-to-clean orthographic rows. "Phonetic" filenames/categories refer to spelling confusion, not IPA. No rows copied.
- OKELL_TEXT_2018: Zenodo Rights/License blank while ELG catalogue lists CC BY 4.0. Rights remain CONFLICT/UNKNOWN; no ingestion or redistribution until direct rights confirmation.
- STEDT1996_BURMESE and MATISOFF2003_HANDBOOK_PTB: copyrighted scholarly sources; only factual claims and page locators are registered, no tables or lexical data copied.
- NISHI1997_ORTHOGRAPHY and NISHI1998_VOICING_RULES: repository-hosted scholarly PDFs; reuse licenses are not stated in the metadata inspected. Only source claims and locators are recorded, not copied tables.
- The new text sources do not alter the myG2P CC BY-NC-SA 4.0 restriction, Wiktionary license conflict, or zero independent IPA-gold status.

## Green and SEAlang textual sources — licensing and reuse gate (2026-11-13)

- Green (2005), “Word, foot and syllable structure in Burmese”, is an online edition explicitly licensed CC BY-SA 4.0 with permission of Pacific Linguistics. Any copied examples or derived data must retain attribution and comply with share-alike; current repository changes record factual claims and page locators only.
- SEAlang MLC dictionary is hosted with permission, but the underlying 1993 MLC / 1996 Dunwoody dictionary remains copyrighted. No project-wide bulk extraction permission is inferred.
- SEAlang Burmese Text and Bitext corpora have no explicit reuse license in the inspected metadata; the metadata includes a 2007 NICT/Matsubara Lab/Anchor copyright notice. Bulk ingestion remains blocked.
- The dictionary's entry-level transcription encoding is unresolved: metadata advertises IPA search/display while Mya2Rom documentation identifies MLCTS2 as used by the MLC dictionary and SEAlang. Do not treat it as IPA gold until the actual representation is inspected.



## myG2P non-commercial research-use decision — 2026-11-14

The upstream README explicitly states CC BY-NC-SA 4.0 and documents a five-field line format: ID, Burmese orthography, syllable segmentation, pronunciation respelling and IPA. It describes the dictionary as based mainly on MLC dictionary words and expanded with foreign pronunciations. The license therefore does not block this project's present non-commercial research analysis: use is permitted subject to attribution and ShareAlike. This is not a blanket commercial-use permission, and the source dictionary is not an independently adjudicated IPA gold set.

- Current project status: **RESEARCH USE PERMITTED** under the published CC BY-NC-SA 4.0 terms.
- Redistribution of copied/derived myG2P database material: retain attribution and compatible CC BY-NC-SA terms.
- Commercial deployment or commercial distribution: **not covered** by this grant; obtain separate permission or exclude the material.
- The user has confirmed this is a research project; no additional project-owner permission gate is required for the non-commercial research activity.
- OpenSLR SLR80 has a published CC BY-SA 4.0 license and a public 528 KiB transcript index, but this execution environment could not retrieve the TSV bytes. Per project instruction, no rows/audio are imported or used unless the actual resource can be accessed. It remains metadata-only and inactive.


## Latest evidence verification — 2026-11-14

- myG2P CC BY-NC-SA 4.0 is permitted for the project's non-commercial research use with attribution and ShareAlike; commercial deployment/distribution remains outside the grant.
- The BSD Burmese wordlist (41,343 rows) was used only for orthographic candidate discovery; it supplied no IPA or syllabification, and no collision status was promoted.
- Required CI 43622250968 SUCCESS: 273 Python + 68 subtests, 20 Node, 58 Playwright; npm audit 0 vulnerabilities; production build and generated-data freshness passed.
- Optional diagnostics 43622250978 SUCCESS: Google WFST 6/6 outputs, 0 runtime errors, no gold (accuracy null); CRF 100 outputs, 84 source-concordant, no gold, possible training overlap. No accuracy claim.


## Final verification after evidence-boundary test correction — 2026-11-14

- Branch tip at this checkpoint: 70481b4a8e6999402c1e83c6ba5c21337bbb7b09; dedicated branch research/burmese-medials-g2p-evidence-2026-11-13.
- Starting main: dc90463bdd734867308f03cb627eb8941efc19d6. Branch comparison: 895 commits ahead, 0 behind; main unchanged.
- Required CI run 43623058823 SUCCESS on the latest branch tip: 273 Python tests + 68 subtests, 20 Node tests, 58 Playwright Chromium tests. IPA-gold structural validation, npm ci, high-severity npm audit (0 vulnerabilities), production build and generated-data freshness passed.
- Preceding run 43622770676 failed one assertion because the test expected a longer phrase than the registered source scope. Corrected the assertion in test commit b3fd204b192633c1c58580e679ef5549f9af9535; latest required CI passed.
- Latest optional diagnostic run 43623058728: Epitran and CRF jobs passed; Google WFST job was still in progress at last inspection. Previous optional run 43622250978 completed all three jobs successfully; Google WFST 6/6 outputs, 0 runtime errors, no gold (accuracy null); CRF 100 predictions, 84 source-concordant, no gold and possible training overlap. No accuracy claim.
- Registries: 91 sources / 192 claims. Collision ledger remains 25 groups; all eight target groups SECONDARY_ONE_SIDE_ONLY. No IPA gold, runtime rule or Ukrainian mapping was promoted.
- myG2P CC BY-NC-SA 4.0 is permitted for non-commercial research with attribution and ShareAlike, but the 2.33 MB source dictionary bytes were not retrievable in this execution environment; no truncated query output was used.
- The BSD wordlist scan produced only unverified orthographic leads; Wiktionary confirms ဒေါင့် is a phonetic respelling attached to ထောင့်, not a separate lexical lemma. No missing-side candidate was accepted.
- Readiness remains PARTIAL PROTOTYPE, not linguistically release-ready.


## Continuation checkpoint — dictionary dataset lead and current-head verification (2026-11-14)

- Registered the Hugging Face Rickaym/Burmese-Dictionary dataset as a metadata-only research lead: declared MIT license, 19,258 rows, fields word, phonetics, meaning, POS and origin. Its dataset card does not identify the underlying lexicographic source or extraction provenance. The phonetics field is described only as pronunciation (အသံထွက်), and preview examples use Myanmar-script respellings, not IPA.
- The public dataset-server rows endpoint was accessible. Exactly the first 2,000 of 19,258 rows were retrieved (20 pages × 100); none contained the eight target suffixes. This is NOT a full-dataset scan. Attempts to continue were blocked when the connected Firecrawl account exhausted its credits; no retries were made. No dataset rows or pronunciation values were imported, and no lexical evidence status was promoted.
- Registered RICKAYM_BURMESE_DICTIONARY_HF_2025 and CLM-RICKAYM-BURMESE-DICT-METADATA-001; added a regression test that preserves the metadata-only / no-IPA / incomplete-scan boundary. Registry totals: 92 sources / 193 claims.
- Required CI run 43623224122 passed on preceding code/test head 282239402b1cf93a090f258500edcc0eaf909873: 273 Python tests + 68 subtests, 20 Node tests, 58 Playwright Chromium tests; npm ci, npm audit (0 vulnerabilities), production build and generated-data freshness passed. The newly added metadata-only regression test is after that head. No workflow run or commit status was returned for current test head 4aa1b41c37c3f07a0368da413de6a6190fe28fa3; therefore the newest test has NOT yet been CI-verified.
- Optional diagnostic run 43623224085: Epitran raw-output and CRF baseline jobs passed; Google WFST raw-output job remained in progress at last check. No accuracy result is claimed.
- Current PR #147 head before this documentation update: 4aa1b41c37c3f07a0368da413de6a6190fe28fa3; branch compare 902 ahead / 0 behind main. PR #147 remains OPEN / DRAFT / mergeable; PR #129 remains untouched. Main unchanged.
- All eight lexical collision targets remain SECONDARY_ONE_SIDE_ONLY; no IPA gold, phonological rule or Ukrainian mapping was promoted. Overall status remains PARTIAL PROTOTYPE, not linguistically release-ready.


## Latest handoff reconciliation — 2026-11-14

- Final documentation branch tip: e5c66c6c066bc425938e71716904c4b512ccbcaa. Latest test/data head: 4aa1b41c37c3f07a0368da413de6a6190fe28fa3. Starting main remains dc90463bdd734867308f03cb627eb8941efc19d6; current comparison is 906 commits ahead / 0 behind.
- Registry integrity rechecked after the metadata-only Burmese dictionary lead: 92 sources / 193 claims; source rows all 7 fields, claim rows all 6 fields; no duplicate IDs and no broken claim-to-source references. All 25 lexical collision groups remain present. Eight target groups remain SECONDARY_ONE_SIDE_ONLY.
- Required tests run 43623224122 passed on prior test head 282239402b1cf93a090f258500edcc0eaf909873: 273 Python tests + 68 subtests, 20 Node tests, 58 Playwright Chromium tests, npm ci, npm audit with 0 vulnerabilities, production build and generated-data freshness.
- One additional regression test and its metadata-only source/claim rows were added after that CI head. GitHub returned no workflow run and no commit status for 4aa1b41c37c3f07a0368da413de6a6190fe28fa3 or the final docs-only tip; therefore the newest test remains unverified by CI. Do not report the latest branch tip as fully CI-green.
- Optional diagnostic run 43623224085 completed SUCCESS: Google WFST 6/6 raw outputs, 0 runtime errors, independent_gold_count=0, accuracy=null (report SHA-256 bb578c92ccc75146a78123098401bdd31e9d07b322588bf0eed5d12bda018466); CRF 100/100 predictions, 84 source-concordant, gold_count=0, accuracy=null, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. These are diagnostics, not accuracy benchmarks.
- The Rickaym dataset remains metadata-only: 2,000/19,258 rows inspected, no target suffix hit in that partial sample, full scan blocked by exhausted connected-service credits. No rows or phonetics imported. myG2P full dictionary bytes also remain inaccessible; no truncated output used.
- PR #147 OPEN / DRAFT / mergeable; PR #129 OPEN / DRAFT and untouched; main unchanged; no merge or release. Readiness remains PARTIAL PROTOTYPE, not linguistically release-ready.


## Full myG2P v2.0 collision scan — 2026-11-14 (supersedes the earlier inaccessible-file checkpoint)

The previously inaccessible upstream file was successfully retrieved by GitHub blob SHA after switching from whole-file path retrieval to the repository blob endpoint. This resolves the earlier access blocker for text-only research. Pinned upstream commit: 54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225; file blob SHA-1: 0b2735f9a6f7fe28ae94c4baaf323d1db3015c3b; 24,802 five-field rows; 0 malformed rows. The upstream README states CC BY-NC-SA 4.0, says the dictionary is based mainly on MLC dictionary words, and notes extensions for foreign pronunciations. Use remains non-commercial research only, with attribution and ShareAlike; this is secondary evidence, not independent adjudicated IPA gold.

Exact scan used the syllable-segmented orthographic field, not broad word-ending substring guesses:
- aung. / ေါင့်: 5 component occurrences across five lexical entries — ဒေါင့် in four compounds (IDs 8063–8066) and ခေါင့် in ဖြစ်ခေါင့်ဖြစ်ခဲ (ID 11580). IPA /da̰ʊɴ/ and /kʰa̰ʊɴ/; the rime /a̰ʊɴ/ matches the existing ောင့် example စောင့် /sa̰ʊɴ/. These are compound-internal syllables, not standalone headwords. Status promoted to SECONDARY_SYSTEM_EQUIVALENCE.
- im / ိံ: 2 component occurrences, တိံ in တာဝတိံသာ and တာဝတိံသာပွဲ (IDs 6840–6841), IPA /dèɪɴ/. Its /eɪɴ/ rime matches the existing ိမ် examples. Status promoted to SECONDARY_SYSTEM_EQUIVALENCE.
- um: / ုမ်း: 1 component occurrence, ဟုမ်း in ဟုမ်းမရူး (ID 20445), IPA /hóʊɴ/. Its /oʊɴ/ rime matches the existing ုံး example in နှလုံး. Status promoted to SECONDARY_SYSTEM_EQUIVALENCE.
- am: / ံး: 700 raw syllable suffix hits across 294 headwords, but all 700 were preceded by ု; the actual sequence is ုံး, the other source unit in the um: group. Exact matches for standalone source unit ံး: **0**. The BSD wordlist's 483 suffix hits have the same issue: all are preceded by ု. The earlier filter was correct; these must not be misclassified as am: evidence.
- No exact syllable matches for im: / ိံး, im. / ိံ့, ui / ို် or um. / ုမ့်.

Final 25-group lexical ledger: **15 SECONDARY_SYSTEM_EQUIVALENCE; 5 SECONDARY_ONE_SIDE_ONLY; 3 SECONDARY_SOURCE_DISTINCTION; 1 SECONDARY_SOURCE_CONFLICT; 1 SPECIAL_NONRIME_CONTEXT_DEPENDENT**. The registry now contains **92 sources / 194 claims**. Added CLM-MYG2P-MLCTS-COLLISION-SCAN-001 and a regression test. No primary MLC adjudication, independent gold, runtime rule, or Ukrainian mapping was promoted.

Latest code/test commit for this batch: 707481df47f8f734afed8e5e4a8ac1d17e334fdd. CI has not yet returned a run/status for this new head; the last verified required CI remains run 43623224122 on earlier head 282239402b1cf93a090f258500edcc0eaf909873 (273 Python + 68 subtests, 20 Node, 58 Playwright; build/freshness/audit passed). Do not describe the newest code/test head as CI-verified until a run is observed.

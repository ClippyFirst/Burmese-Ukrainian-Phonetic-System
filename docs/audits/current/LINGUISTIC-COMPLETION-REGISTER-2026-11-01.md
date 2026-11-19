## Burmese Wiktionary IPA source review — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-IPA-001 | PARTIAL (discovery lead; rights conflict unresolved) | Dataset card: 22,191 records, 20,759 headwords, 113 IPA values (0.51%), snapshot 2026-08-01, CC BY 4.0 declaration. Myanmar Wiktionary local policy (last edited 2024-12-06): CC BY-SA 3.0 Unported/GFDL. No per-entry dialect/convention, audio, annotator/adjudication or detailed locators in the card. | No import into gold. Clarify rights with publisher/rightsholder; then item-level profile/source/IPA audit and independent specialist review. MLCTS is not IPA. |

## Post-merge provenance checkpoint — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-G2P-PROVENANCE-001 | DONE_VERIFIED (PR-head verified; post-merge push CI not independently surfaced) | PR [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106) merged as 76426383038ee18a4cf5f2136379b25c08a40d7e. Exact implementation/workflow-head tests [41726477853](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477853), optional Epitran/CRF [41726478205](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726478205), and optional Goruut [41726477909](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477909) all SUCCESS; downloaded artifact contents inspected. | Report provenance, preserved Epitran resource hashes and sidecar integrity only. Gold remains 0; accuracy null. |

## External diagnostic report provenance — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-G2P-PROVENANCE-001 | DONE_VERIFIED (diagnostic reproducibility only) | PR [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106), exact head 942b6e8834878538c4e478c9195420b9618acd3d; RED [41725146714](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725146714); tests [41726477853](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477853) SUCCESS (162 Python tests + 64 subtests; 54 browser tests); optional Epitran/CRF [41726478205](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726478205) SUCCESS; optional Goruut [41726477909](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477909) SUCCESS. Artifact inspected: JSON + .sha256; expires 2027-02-01. | Harness SHA-256, corpus hash, engine/version, Python/platform and GitHub event metadata recorded; Epitran resource hashes preserved; integrity only. Independent adjudicated gold 0; accuracy null. |

## External diagnostic report provenance — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-G2P-PROVENANCE-001 | DONE_VERIFIED (diagnostic reproducibility only) | PR [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106), current head 8a3fd150a247144320c880756f187a256a890e2f; test-first RED [41725146714](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725146714); exact-head tests [41725456860](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725456860) SUCCESS (162 Python tests + 64 subtests; 54 browser tests); optional Epitran [41725456964](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725456964) SUCCESS; optional Goruut [41725457027](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725457027) SUCCESS. | Report records harness SHA-256, corpus hash, engine/version, Python implementation/version, platform and CI source revision; preserves Epitran resource hashes; JSON report has adjacent SHA-256 sidecar. Diagnostic integrity only. Independent adjudicated gold remains 0; accuracy null. |

## Unicode segmentation parity correction — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| UNICODE-SEGMENTATION-002 | DONE_VERIFIED | [PR #103](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/103), squash merge `8ca42933dec5f830ca70e092f25acaefe1e35ecc`; exact-head Python, Node, build, and built-site browser tests passed in [41713878227](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41713878227) and [41713891844](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41713891844). | Python now groups contiguous mixed-text runs like the browser, excludes Myanmar digits/punctuation U+1040..U+104B from phonetic text segmentation, retains unsupported Myanmar extensions as Myanmar units, and isolates C0/C1 controls. Structural parity only; no pronunciation claim. |

**Research boundary unchanged:** independent adjudicated Burmese IPA gold remains 0; empirical accuracy remains null.

# Burmese linguistic completion register — 2026-11-01

**Benchmark implementation merge:** `a5b844ec1d4f9be9264764ffa3652211fe78b6c5` (PR #100). **Handoff/register reconciliation merge:** `367819f9085eadc022079809a711b504527220ab` (PR #101).
**Latest post-merge exact-main evidence:** [engineering verification](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518082) SUCCESS; [Pages/deployed-site smoke](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518030) SUCCESS.
**Open pull requests:** none at this checkpoint.
**Research boundary:** Independent expert-adjudicated Burmese IPA gold remains 0; `data/benchmark/gold.tsv` is header-only; empirical accuracy remains null.
**Scope:** continue the existing master handoff; this register does not replace it.

## Held-out IPA benchmark integrity — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| IPA-BENCH-HELDOUT-001 | DONE_VERIFIED | PR #100 merged as `a5b844ec1d4f9be9264764ffa3652211fe78b6c5`; exact-main verification [workflow](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518082) SUCCESS; Pages/deployed-site smoke [workflow](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518030) SUCCESS. Export preserves split bucket and frozen manifest seed/version; scoring defaults to held-out test; explicit all-split mode is marked diagnostic; malformed/mixed split metadata and empty predictions fail closed. | Engineering evaluation integrity only. Independent expert-adjudicated Burmese IPA gold remains 0; `data/benchmark/gold.tsv` is header-only; empirical accuracy remains null. No gold rows, IPA labels or accuracy claims were fabricated. |


## Engineering integrity continuation — 2026-11-03

- **TSV-INPUT-001 — DONE_VERIFIED:** benchmark TSV ingestion now rejects duplicate/blank headers and nonblank rows with extra or missing fields; blank physical lines are ignored. Regression cases cover gold/prediction duplicate headers, extra gold cells, and truncated prediction rows.
- **Evidence:** test-first RED [41665726081](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41665726081); focused implementation GREEN [41665859814](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41665859814); implementation commit `f5951bb1248a0bee66a795bd375f7e4e80ce7043`.
- **Acceptance boundary:** input shape is validated before scoring. This does not create adjudicated IPA data or alter language accuracy status (gold 0; accuracy null).

## Strict JSON syntax — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| JSON-INPUT-003 | DONE_VERIFIED | Reject `NaN`, `Infinity`, and `-Infinity` in JSONL and license registry inputs. RED 41692649780; implementation CI 41694102074 SUCCESS (159 Python tests + 64 subtests; 54 built-site browser tests). | Reject non-standard JSON constants before corpus or rights validation; no linguistic labels or license terms changed. |

## License registry JSON integrity — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| JSONL-INPUT-002 | DONE_VERIFIED | Duplicate top-level and nested keys in `licenses.json` rejected. RED 41690120271; implementation CI 41690280710 SUCCESS (157 Python tests + 58 subtests; 54 built-site browser tests). | Rights registry cannot silently apply last-key-wins semantics; no license permission is inferred or broadened. |

## JSONL input integrity — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| JSONL-INPUT-001 | DONE_VERIFIED | Duplicate top-level and nested JSON object keys are rejected. RED 41687392202; exact implementation-head CI 41687710686 SUCCESS (155 Python tests + 58 subtests; 54 built-site browser tests). | Prevent silent last-key-wins corruption before corpus schema/provenance validation. No linguistic data or accuracy claims added. |

## Evidence-based task ledger

| ID | Status | Work remaining | Acceptance |
|---|---|---|---|
| MYA-GOLD-001 | BLOCKED | No independent expert-adjudicated lexical IPA gold exists; data/benchmark/gold.tsv contains only its header. | At least two independent text-based Burmese linguists, adjudication, source-located written dictionary/grammar entries, documented dialect/profile and IPA convention, and frozen held-out text fixtures. No audio. |
| MYA-PHON-001 | PARTIAL | Full vowel-combination derivation, coda/checked-syllable realization, tone/register/phonation inference and contextual allophony remain incomplete. | Source-located, expert-reviewed rule matrix with minimal pairs, explicit dialect scope and fail-closed unresolved cases. |
| MYA-IPA-001 | PARTIAL | Phonological vs phonetic IPA conventions and analysis of tone/register/phonation require specialist adjudication. | Versioned IPA convention, syllable/segment alignment, tone/phonation fields and adjudicated alternatives. |
| MYA-ROM-001 | PARTIAL | All 35 onset and 94 vendor-derived rime target rows have Ukrainian project candidates; PR #141 integrates a separate MLCTS-to-Ukrainian runtime adapter for supported syllable structures. The source rime inventory remains vendor-evidence-limited. | Verify the MLCTS inventory against primary MLC material; expand legal medial/devoicing, kinzi, asat and independent-vowel structures; retain explicit withholding for unsupported forms. |
| MYA-G2P-001 | DONE_VERIFIED (diagnostic harness only) | Goruut has 55/100 partial-coverage outputs; myG2P is CC BY-NC-SA 4.0 and temporary test-only. | No production promotion or source-data import without independent gold and explicit rights clearance. |
| MYA-UI-001 | TODO | Manual visual, keyboard, assistive-technology and mobile QA is not established by CI. | Recorded test matrix and deployed-site results. |
| MYA-REL-001 | PARTIAL | Production readiness blocked by gold, phonological coverage and external asset licensing. | All release gates met; owner makes any project-license decision; no restricted data/model bundled. |

## Current diagnostic evidence

The latest recorded myG2P v2.0/Goruut 100-row comparison is 98 outputs, 2 none; 43 complete, 55 partial, 2 unknown/no output; 98 stable; 69 unphonemized source fragments; strict source-label matches 0/100 and limited-notation matches 17/100. Epitran 1.35.3 had 0 exact source-label matches. These are diagnostic results, not accuracy. myG2P labels are not independent gold and the source is CC BY-NC-SA 4.0; temporary testing only is authorized. Independent gold remains 0; accuracy remains null.

## Open PR and branch reconciliation

PR [#53](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/53) remains open and untouched. Its branch is 5 commits ahead and 38 behind current main, changes only `index.html`, `system.html` and `src/web/styles.css`, and replaces the stylesheet wholesale. It is not safe to merge as-is; re-evaluate only if a fresh visual audit identifies a still-missing requirement, then port focused CSS changes on current main with browser tests. No existing user branch was deleted or rewritten.

## Execution order

1. Preserve fail-closed phonetic behavior.
2. Commission independent text-based IPA review of source-located Burmese dictionary and published phonological-description entries; record dialect/profile, convention, two independent reviews and adjudication.
3. Resolve the phonemic/phonetic convention and the interaction of tones, register, phonation and checked syllables with specialists.
4. Complete vowel/medial/coda derivation and the orthography-to-IPA matrix.
5. Verify MLCTS against primary Myanmar Language Commission sources; finish the separate MLCTS → Ukrainian adapter.
6. Conduct deployed UI/accessibility QA and asset-rights review.

## External dependencies / blockers

- Qualified Burmese phonologist/phonetic annotators and adjudicator.
- Rights-cleared written IPA sources and permission for derived labels; myG2P cannot be redistributed commercially under its current CC BY-NC-SA terms absent permission.
- Primary MLC publication access for MLCTS rule confirmation.
- No local checkout was available to this execution; exact-main GitHub Actions are the engineering evidence. Run documented local release commands in a clean checkout before release.

## Method constraints

Preserve `Burmese orthography → structural/medial analysis → Burmese phonology → typed IPA → Ukrainian adaptation`. MLCTS remains a separate orthographic mode. Do not collapse register/phonation distinctions into guessed tone values.


## Independent IPA gold corpus implementation — 2026-11-01

| Task | Status | Evidence / remaining acceptance |
|---|---|---|
| IPA-GOLD-SCHEMA-001 | DONE_VERIFIED | Record, annotation, adjudication, split and license schemas plus cross-file validator |
| IPA-GOLD-DOUBLE-ANNOTATION-001 | PARTIAL | Two distinct annotators enforced; blind intake requires external controlled collection |
| IPA-GOLD-ADJUDICATION-001 | PARTIAL | Agreement/resolved/unresolved logic and feature-complete IPA comparison; no real adjudicated rows |
| IPA-GOLD-RIGHTS-001 | DONE_VERIFIED (mechanism) | Allowlisted licenses, required rights evidence and rejection of unregistered/non-redistributable licenses; source-by-source legal review still required |
| IPA-GOLD-SPLIT-001 | DONE_VERIFIED | Deterministic hash-based group split; one frozen seed/version is enforced across the entire manifest, including distinct lexeme groups; new groups inherit the existing identity and conflicting overrides are rejected |
| IPA-GOLD-EXPORT-001 | DONE_VERIFIED | Rights-filtered typed IPA export retaining source/license/evidence locators |
| IPA-TYPED-BENCHMARK-001 | DONE_VERIFIED | Different or missing IPA kind cannot count as an exact match |
| IPA-GOLD-RELEASE-GATE-001 | PARTIAL | Tag/manual workflow requires 100/25/25 adjudicated train/dev/test; owner must require the check in release rulesets/procedure |

**Current gold:** zero independent expert-adjudicated records; `gold.tsv` remains header-only; accuracy=null. The new schemas, fixtures and source-attested literature are not gold labels. No phonetic data was invented.


**Research evidence artifact:** [Burmese vowel × medial × checked-syllable × prosody evidence matrix](BURMESE-VOWEL-MEDIAL-PROSODY-EVIDENCE-MATRIX-2026-11-01.md). It separates Green's four-tone analysis, the eight-tone/two-register proposal, consonantal voicelessness and written medial parsing.


**Source reconciliation:** Green (2002 ROA paper; published 2005 chapter) now anchors the 50-rhyme analysis. Repetti-Ludlow (2023) tests a restricted subset of voiceless sonorants and finds variable spread-glottis realization (78% present); Duan & Zhu (2025) proposes an eight-tone/two-register alternative but is not yet independently adjudicated.


**2026-11-01 closeout:** PR [#84](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/84) is the comprehensive implementation and research-matrix change. PR CI passed 121 Python tests + 31 subtests, four generated-data tests and 54 Playwright browser tests; optional Epitran diagnostic passed. Main remains at 4ddb9d3. Gold remains 0; tone/register/phonation adjudication remains blocked.


## 2026-11-01 final IPA-kind consistency verification

- Added fail-closed cross-annotation consistency: both independent annotations for one record must use the same `ipa.kind`, and a `RESOLVED` adjudicated result must preserve that kind. This prevents phonemic-vs-phonetic representation differences from being misclassified as pronunciation disagreements.
- Regression evidence: both new tests failed against the pre-fix validator on the test-only commit, then passed after the validator change.
- New task `IPA-GOLD-REPRESENTATION-KIND-001`: **DONE_VERIFIED** (mechanism and exact-head CI). Blindness, annotator qualifications and independent adjudicator competence remain external operational evidence, not properties CI can prove.
- Final PR head: `5aa4463b70599f36ea287d62ed07d0fd69b3dac1`; CI run [41338466798](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41338466798) SUCCESS — 124 Python tests + 31 subtests; generated-data checks, production build and 54 built-browser Playwright tests passed. Optional Epitran diagnostic run 41338466820 also passed.
- The Burmese matrix remains PARTIAL: Green's extracted 50-rhyme table still needs manual primary-PDF transcription; tone/register/phonation analyses remain competing evidence, not implementation consensus.
- Gold remains zero; `gold.tsv` remains header-only; empirical accuracy remains null. No IPA labels were generated.


## IPA gold split-manifest runtime/schema parity — 2026-11-01

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| BUR-IPA-SPLIT-STRICT-001 | P1 | DONE_VERIFIED | RED test on commit `3f20dcc5f2f90940b600fdb2fd378d4976d3a098` failed as expected; GREEN code commit `76af91582a760b44ce18f029f80dbf9a35f7a4c7`; exact-head CI [41340417848](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41340417848) passed | The split generator and corpus validator share the closed split-field contract; unknown prior-manifest properties are rejected rather than silently dropped. No expert gold is created by this change. |


## Product-corpus license eligibility — 2026-11-01

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| BUR-IPA-LICENSE-ELIGIBILITY-001 | P1 | DONE_VERIFIED | RED tests on `53964d81fdfca19314fbf911dcc424cd3be20027`; GREEN code/schema commit `7383191ca2ca9e8c24099ae2f55483c6f6351d68`; exact-head CI [41341030962](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41341030962) passed | Registry and schema fail closed unless a redistributable product-corpus license explicitly permits commercial use and defines attribution/share-alike obligations. Human source-by-source rights review remains required. |


## Release-gate threshold validation — 2026-11-01

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| BUR-IPA-RELEASE-THRESHOLDS-001 | P1 | DONE_VERIFIED | RED test on `52fbfd77a12ef2e592debbaea7e07b0650d5fd3b`; GREEN code commit `fc77d3e8073e58ae75a86693db971ff3fc0a162a`; exact-head CI [41341757201](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41341757201) passed | All split minimums reject zero and negative values; threshold errors aggregate with other release-gate findings. Default minimums remain 100/25/25. |


## Audio-source review update — 2026-11-01

Historical audit note only: SLR80 is excluded from current text-only scope and is not an active source candidate.

This is **not IPA gold**. The line index contains orthographic transcripts; the paper's FST G2P is a pronunciation-generation/lexicon-bootstrapping tool, not independent adjudicated truth. The recording location does not by itself establish every speaker's dialect. No word-level acoustic timestamps are supplied, so any token selection requires manual alignment verification. The female-only sample cannot support gender-balanced generalization.

Do not acquire, process, annotate or use SLR80 recordings in this work.

Status remains `MYA-GOLD-001 = BLOCKED`: no annotations, annotators or adjudications have been created. Independent gold remains 0 and accuracy remains null.


## Final exact-head verification — 2026-11-01

Branch `feat/ipa-gold-corpus-20261101-review`, source-audit content commit `083ddb740d825b2c1e227cd0f19d051beba097a6`. Burmese exact-head CI: tests [41344959952](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959952) SUCCESS; optional Goruut [41344959963](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959963) SUCCESS; optional Epitran [41344959950](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959950) SUCCESS. Core job passed corpus structure validation, pytest, npm build, generated-data drift check, npm tests and built-browser Playwright tests.

These checks validate the committed repository and its automated engineering contracts. They do **not** validate the linguistic correctness of future human annotations, create gold labels, or change the release blocker. Gold remains empty and accuracy remains null.


## Follow-up handoff-head CI — 2026-11-01

The subsequent documentation-only handoff/register state at commit `0021dae7ea3450b99f63509c39d3dd384241284e` was also checked on its exact head: tests [41345383752](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383752) SUCCESS; optional Goruut [41345383729](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383729) SUCCESS; optional Epitran [41345383623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383623) SUCCESS. These runs validate the updated documentation and existing automated checks, not future IPA annotations. Any later branch update must be checked again on its new exact head.


## Open-rights redistributability invariant — 2026-11-01

| Task | Status | Evidence / acceptance |
|---|---|---|
| BUR-IPA-RIGHTS-OPEN-001 | DONE_VERIFIED | A test-first regression rejected a source with `rights_status=OPEN` and `redistributable=false`; the runtime validator and record JSON Schema now both require `redistributable=true` for OPEN. Test-only RED commit: `644d897cefeb613a74aaa6ea9110ba4e9a5303e2`. Fix/schema code head: `0f0a8a013887a7366aea2424935b0252f5b11778`; exact-head CI run [41348005124](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41348005124) passed: 129 pytest tests + 41 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed; optional Goruut and Epitran diagnostics passed. |

This is a consistency/eligibility invariant, not a new legal determination. It does not change source licenses, rights evidence, gold labels or measured accuracy. Independent adjudicated gold remains 0; accuracy remains null.

## Exact current-head engineering checkpoint — 2026-11-01

- Current code checkpoint: `a8b71b536f93da586e16dfcc91a5db9a8be1f573`; exact-head core CI [41348246731](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41348246731) **SUCCESS**. 129 pytest tests + 41 subtests; npm build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed. Optional Goruut Burmese and Epitran diagnostics passed.
- The `OPEN` / `redistributable` consistency regression is present in runtime validation, JSON Schema and tests.
- Independent expert gold remains 0 and accuracy remains null. Human annotation/profile/convention gates remain open; CI is not linguistic validation.

 
## Nested IPA record contract closure — 2026-11-01

| Task | Status | Evidence / acceptance |
|---|---|---|
| IPA-GOLD-NESTED-STRICT-001 | DONE_VERIFIED (engineering contract) | Test-first RED: [run 41352936278](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41352936278); GREEN exact-code-head CI: [run 41353062069](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41353062069). Runtime validator and JSON Schema both reject undeclared fields in `orthography`, `profile`, `source` and `source.rights_evidence`. 131 pytest tests + 48 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed. |

This closes only the nested-object shape contract. It does not establish the truth of source metadata, rights determinations, speaker profiles, IPA, or expert adjudication. Independent gold remains 0 and accuracy remains null.


## Validator duplicate-call cleanup — 2026-11-01

| Task | Status | Evidence / acceptance |
|---|---|---|
| IPA-GOLD-DUPLICATE-VALIDATION-001 | DONE_VERIFIED | Removed four consecutive duplicate `reject_unknown_properties` calls from nested `orthography`, `profile`, `source`, and `source.rights_evidence` validation. Code commit: `76c2639c57dfdf7da5a4a39a3fae999f2a646532`; resulting shared validator blob SHA: `a072297e320b4b91a36c59fc90328b6ff98d2a5f`. - Core PR CI: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250746 (SUCCESS); core push CI: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354246209 (SUCCESS); optional language diagnostics: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250460, https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250457 (SUCCESS). |

This is dead-code cleanup only: each contract check remains once; no validation rule, schema, IPA value, phonology rule, or corpus row changed. The shared validator remains identical across Lao, Khmer and Burmese. Hosted CI only; no local checkout or local test command is claimed. Independent expert-adjudicated gold remains 0 and empirical accuracy remains null.


## Methodology source refresh — 2026-11-02

| ID | Status | Evidence / acceptance |
|---|---|---|
| ENGINEERING-METHOD-REFRESH-001 | DONE_VERIFIED | Updated `AGENTS.md` and canonical handoff to pin Superpowers 7.0.1, mattpocock/skills current main, and Ponytail 5.3.3. Exact-head CI on methodology commit `8bdcf3e07ed1359d443aad21b53d00b6db3812f2`: [PR tests 41356409847](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409847) and [push tests 41356404196](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356404196) SUCCESS; 131 tests + 48 subtests and 54 Playwright tests; [Goruut 41356409749](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409749) and [Epitran 41356409786](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409786) SUCCESS. No runtime dependencies or copied skill bundles were added. |



## Methodology source refresh follow-up — 2026-11-02

| ENGINEERING-METHOD-REFRESH-002 | DONE_VERIFIED | Updated `AGENTS.md` and canonical handoff to mattpocock/skills v1.3.2 (`d1478fcb140db0b93c0c8df17bcfd311844749d0`); added two-axis review, genuine-RED evidence, template/ownership, and safe worktree-cleanup guidance. Verified documentation checkpoint `b5c50772c3d8f1494bb68d0a85a41b6fee82d1ec`: [tests 41358676730](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676730) SUCCESS; optional [41358676910](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676910) and [41358676749](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676749) SUCCESS. | No third-party code, data, skill bundle, or runtime dependency copied. |

## IPA gold adjudication required-field parity — 2026-11-02

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| IPA-GOLD-ADJUDICATION-FINAL-IPA-001 | P1 | DONE_VERIFIED | A test-first regression demonstrated that an `UNRESOLVED` adjudication with the `final_ipa` property omitted was accepted by the Python runtime even though the JSON Schema requires the property (nullable). Test-only RED commit `2c1897567b1c108a7c587307a01cc79c857f4450`; failing exact-head PR CI [41407021855](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407021855). Runtime fix commit `030d5255eb81400781f6961b53bc5f0d76a85f8c`; exact-head PR CI [41407123331](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123331) SUCCESS. 132 pytest tests + 48 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed. |

The validator now requires the `final_ipa` key to be present for every adjudication. `UNRESOLVED` must supply explicit JSON `null`; `AGREEMENT` and `RESOLVED` still require a typed IPA object. No phonology rules, corpus labels, source data or benchmark scores changed. Optional diagnostic runs: [41407123332](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123332), [41407123343](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123343). Gold remains 0 and empirical accuracy remains null.


### Unresolved adjudication explicit-null positive-path coverage — 2026-11-02

The regression suite now also proves the valid complementary case: `decision=UNRESOLVED` with an explicitly present `final_ipa: null` is accepted and remains excluded from adjudicated gold. Test commit `72d4664d0d1d21872fde11c492d3fd8194b0290f`; exact-head PR CI [41407404042](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407404042) SUCCESS. 133 pytest tests + 48 subtests; npm build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed. Optional diagnostics: [41407410734](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407410734), [41407410747](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407410747) SUCCESS. This does not create IPA labels or change the gold count (still 0) or accuracy (still null).

## External G2P engine coverage audit — 2026-11-02

- **PARTIAL (DONE_VERIFIED diagnostic execution):** Epitran 1.35.3 returned six structural-only probe outputs, with no verified gold. Goruut source snapshot `b224bde` on 100 source-attested myG2P rows produced 0/100 exact and 17/100 limited-normalized matches, 2 failures, 43 complete / 55 partial / 2 unknown coverage, and 69 unphonemized fragments. See `docs/research/external-g2p-benchmark-and-engine-coverage-2026-11-02.md` and Actions runs 41409098332 / 41409098207.
- **NOT SCORED:** independent expert-adjudicated IPA gold remains 0; neither the structural Epitran smoke test nor limited-normalized Goruut concordance establishes accuracy.
- **TODO:** investigate Burmese phonation/tone/register and vowel/coda mismatches; recover language-specific CRF/WFST/FST baselines from myG2P and LREC 2020; fix the absent upstream Goruut `weights9.bin.zlib` asset.


## Goruut language-bundle asset status correction — 2026-11-02

The previous TODO wording suggesting that this repository can simply recover or fix `weights9.bin.zlib` is superseded. Inspection of the exact upstream Goruut source tree at `b224bde02151f8f86d0fe260804e4ca743bda620` shows no `weights9.bin.zlib` in `dicts/lao/`, `dicts/khmer/central/`, or `dicts/burmese/`; the earlier `weights7` and `weights8` assets are present. This is an upstream language-bundle omission in the pinned snapshot, not a missing project-owned file. Status: **BLOCKED (upstream dependency)**. Acceptance: upstream publishes the asset or documents the expected model-tier fallback, and a controlled same-input comparison plus independent expert IPA gold establishes whether the asset changes relevant language coverage. Do not synthesize weights, download unpinned substitutes, or treat the warning as a failed workflow. See the external-engine research audit and canonical handoff for the evidence.


## Additional Burmese CRF baseline inventory — 2026-11-02

| ID | Priority | Status | Evidence / acceptance |
|---|---|---|---|
| BUR-CRF-G2P-001 | P1 | PARTIAL (DONE_VERIFIED raw-output probe) | Added `scripts/benchmark_burmese_crf.py`, six focused unit tests, and a `crf-baseline` job in `.github/workflows/optional-epitran-benchmark.yml`. Pinned model/data/CRFsuite commits: `de0f06056cf334b8cdd5a1efd1226f01c8162b77`, `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`, `a2a1547727985e3aff6a35cffe073f57f0223e9d`. The original pytest import failure in run [41415624611](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415624611) was fixed by `pythonpath = ["."]`; full tests/build/generated-data/JS/Playwright workflow [41417982342](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982342) passed. Optional CRF + Epitran [41417982199](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982199) and Goruut [41417982213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982213) passed. Inspected artifact `burmese-crf-raw-output` (SHA-256 `0119281f9bd3d946a36dad1299f530b629599cfd26146ce190ea34f7c707ddd6`): 100/100 predictions, 84/100 source-concordant diagnostic, `gold_count=0`, `accuracy=null`, status `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; model SHA-256 `f66571b7632eed2e94878278702654ce0a4b25fcab18720af60d3cfe00b011ce`. Probe uses supplied syllable segmentation and source-attested labels; no accuracy is inferred. Further acceptance requires verified train/test disjointness, held-out lexical groups, profile/IPA-convention review and independent expert adjudication. Upstream myG2P source declares CC BY-NC-SA 4.0; artifact is diagnostic only and not redistributed as product data. |


## Main publication reconciliation — 2026-11-02

Supersedes earlier handoff statements that the review branch was still ahead of `main` and unmerged: the CRF benchmark test-import defect was fixed in PR [#86](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/86), merged into the review branch as `db183681eb1fc66e1b513623e08e75d5f8842220`, then the complete language PR [#84](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/84) was merged into `main` as `8cffc508ffaf5ab1b54f3b9276034838d24057ae`; this was the repository's current `main` tip at reconciliation. On the complete feature plus fix, the required workflow passed: tests/build/generated-data check/JS tests/Playwright built-browser tests [41417982342](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982342) SUCCESS; the optional CRF and Epitran jobs [41417982199](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982199) SUCCESS; optional Goruut [41417982213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982213) SUCCESS. The original required test failure [41415624611](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415624611) was specifically `ModuleNotFoundError: No module named 'scripts'`; the pytest `pythonpath = ["."]` fix was verified by the successful full run. The Pages workflow is configured to deploy from `main` and includes a deployed-site/runtime-asset smoke test. The public deployment result could not be independently inspected from this session, so deployment status remains **BLOCKED (external verification/network access)**, not claimed successful. Independent expert-adjudicated gold remains 0 and accuracy remains null; the project is still a research prototype.


## Current-main UI publication — 2026-11-02

The older design PR [#53](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/53) was not merged because its branch had diverged (5 commits ahead / 187 behind current `main`). Its responsive CSS and cache-busting intent were ported onto a fresh branch from the then-current `main`; PR [#87](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/87) was merged as `930ec6b66b4ec5fb280d3c926b8d307a23551998`. The current-main CI [41424015018](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41424015018) passed IPA gold-corpus structure validation, Python tests, generated-web-data drift check, npm tests, production build and Playwright browser tests. The Pages workflow is configured for pushes to `main`; actual deployment completion and public-site smoke-test result remain **BLOCKED (external verification/network/DNS unavailable in this session)**. This UI change improves presentation only and does not improve linguistic accuracy. Independent adjudicated gold remains 0; accuracy remains null; research-prototype status is unchanged.

### Pages smoke-test compatibility follow-up — 2026-11-02

The cache-busted stylesheet URL introduced by the UI polish exposed an overly strict CSS-link extractor in the deployed-site smoke test. Fixed in PR [#88](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/88), merge `fea5f6e44680b6202e07e5e896eb175699c101c2`; the extractor now accepts an optional query string. PR CI passed (41424690731). The Pages workflow is now compatible with the deployed CSS URL. The post-merge Pages deployment and live-site smoke-test result are still **BLOCKED for independent verification** because external DNS/network access and a workflow-run listing endpoint were unavailable; do not infer deployment success from a merged PR or a successful pull-request CI run.


## IPA-GOLD-SPLIT-MANIFEST-IDENTITY-001 — 2026-11-03

**Status: DONE_VERIFIED (runtime validator and split generator).** Root cause: the previous cross-file validator checked seed/version consistency only within each `lexeme_group_id`, allowing distinct groups in one corpus manifest to carry different seeds or versions. The split generator could also add a new group under a newly supplied seed while preserving older groups, silently creating a mixed manifest.

- Added regression coverage for mixed seeds and mixed versions across distinct groups, plus conflicting seed override when extending an existing manifest.
- The tests-only commits failed for the intended three behaviors: 41612967105. The implementation and assertion correction are on branch head `f1eb2af9c134`.
- Exact-head CI: [41613349719](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41613349719) SUCCESS — 142 Python tests + 48 subtests; the full repository workflow also completed successfully.
- New invariant: a single manifest has one `(seed, version)` pair globally; existing manifests retain that identity when extended; explicit conflicting overrides fail closed. A new corpus split design requires a separate versioned manifest.
- This is an engineering reproducibility fix only. It creates no linguistic labels and does not change gold count (0) or accuracy (`null`).

- Follow-up strictness regression: explicit empty `--seed` and `--version` must fail instead of falling through to defaults. Tests-only CI failed on both behaviours (41615393679); the corrected conditional default resolution passed exact-head CI 41615574734.


## Separate-manifest creation acceptance — 2026-11-03

**Status: DONE_VERIFIED on the dedicated PR branch; merge to main remains pending.** Added an acceptance test proving a genuinely new seed/version can be used when the caller supplies a separate empty JSONL input via `--splits`, while the existing frozen manifest remains untouched. Corrected the operator instructions: changing only `--output` does not reset the input manifest; the new-manifest workflow must use a new empty `--splits` file and a distinct `--output` file.

- PR [#90](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/90), final documentation head `239da6add4d23654a0cdb9ecb2a25c77fd588b58`; code/test checkpoint `acc29c519c72d9ba9cc48f30191e0c8a6ae73ae7` (the three subsequent commits are docs-only).
- Exact-head CI [41638537232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41638537232) SUCCESS — 145 pytest tests + 48 subtests; web data validation OK; 54 browser tests passed.
- No linguistic gold rows were added; independent gold remains 0 and empirical accuracy remains `null`.


## Split-manifest integration checkpoint — 2026-11-03

**Burmese PR #90: DONE_VERIFIED on main.** Merged as `01d0d193f043508c6283ba77d70f9e9439402997`. The global manifest identity invariant and separate-manifest creation acceptance are now in the default branch. Exact-main workflow [41643388974](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41643388974) succeeded. No gold rows were added; adjudicated gold remains 0 and empirical accuracy remains `null`.


## Source-citation reconciliation — 2026-11-03

**Status: PARTIAL pending exact-head verification.** Added the WSSANLP 2016 record, exact ACL Anthology locator and scoped author–year references on a clean branch from latest main.

- Superseded PR #91 is not used as a merge candidate; this port must pass exact-head CI.
- No pronunciation labels or corpus records imported; source rights remain source-specific; independent gold remains 0 and accuracy remains `null`.


## MYA-EVIDENCE-AUDIT-001 — source scope and phonology matrix — 2026-11-03

**Status: PARTIAL pending exact-head CI and specialist review.** Updated the Burmese vowel/medial/prosody matrix and external-corpus triage with precise source scopes. Mooney & Repetti-Ludlow (2021) is a one-speaker competing analysis; Hlaing & Mikami's 99.93% is orthographic syllabification, not G2P; Oo et al. (2020) is orthographic speech, not IPA gold; Thu et al. (2016) uses a romanized inventory.

- No lexicon rows or pronunciation labels imported. License claims remain specific to individual artifacts; the LREC grammar and corpus rights are not conflated.
- Original PR #89 workflow [41631406950](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41631406950) succeeded before this clean port; fresh exact-head CI required.
- Independent gold remains 0 and empirical accuracy remains `null`.


## Continuation status sync — 2026-11-03

- Current main: `36ee99a83e6dd2bcf4670860908c3dbf53301ab8`; exact-main checks: tests 41647872126 SUCCESS; Pages/deployed-site 41647872084 SUCCESS.
- PR #89 is closed without merge; its mainline source and agent-guidance work was ported in focused commits. No open PRs were returned by the current open-PR query.
- Engineering improvements on main are verified at the stated commit; this does not promote linguistic validation or manual accessibility tasks to DONE.
- IPA gold remains 0; empirical accuracy remains null. Annotation staffing, convention approval, rights clearance, blind intake and adjudication remain BLOCKED on external human/evidence dependencies.


## BURMESE-METHOD-REFRESH-001 — upstream methodology snapshots — 2026-11-03

**Status: DONE_VERIFIED (reference audit).** Superpowers v7.0.1 current main: `2ce8aa15d05bd57213e6f746f953aafb7ded7a8b`; mattpocock/skills v1.3.2 release: `d1478fcb140db0b93c0c8df17bcfd311844749d0`, current main snapshot: `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`; Ponytail v5.3.3 release: `7801d061243d7b753bad0e0b3c057cd250b11755`, current main: `96608e078b2d5ea607c5c3b8b5a54d1c1fba6846` (README-only post-pin change).

- Release pins and current-main snapshots are distinguished. No third-party runtime or skill files imported.

## 2026-11-03 — held-out benchmark split enforcement

| Task | Status | Evidence / remaining acceptance |
|---|---|---|
| IPA-BENCH-SPLIT-001 | DONE_VERIFIED (engineering contract) | Export preserves the frozen group-safe split; scorer defaults to test and requires explicit selection for train/dev/all. Exact-head tests [41651876020](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41651876020) SUCCESS on `af3ff6c5d3104a45ce5c1524b6083850c6dacd83`. This fixes the evaluation boundary, not linguistic gold. |

Independent gold remains 0 and accuracy remains null. No data labels were fabricated. The split-aware benchmark documentation is in `docs/benchmarking-and-external-ipa.md`.

## Frozen split manifest provenance — 2026-11-03

The export and benchmark now preserve and validate the complete frozen split identity, not only the bucket name: `split`, `split_seed`, and `split_version`. Every adjudicated row must carry non-empty seed/version metadata, and the benchmark rejects a TSV that mixes manifest identities. The report exposes the manifest seed/version and selected scoring split. This makes the evaluated test partition traceable to one exact manifest; it does not create linguistic gold or change the current zero-row accuracy status.


## 2026-11-03 — empty benchmark prediction input

| Task | Status | Evidence / remaining acceptance |
|---|---|---|
| IPA-BENCH-EMPTY-PREDICTIONS-001 | DONE_VERIFIED (engineering guard) | Header-only prediction TSV previously exited 0 and produced an empty `engines` object. Test-first regression failed on all three language repositories; the scorer now rejects an empty prediction dataset after checking gold and frozen split provenance. Missing individual predictions within a named engine remain denominator-counted. RED: [41655173696](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41655173696). Final exact-head tests: [41655504734](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41655504734) SUCCESS. |


## 2026-11-03 — benchmark identifier validation

| Task | Status | Evidence / acceptance |
|---|---|---|
| IPA-BENCH-IDENTIFIERS-001 | DONE_VERIFIED (engineering guard) | Reject whitespace-only gold IDs, prediction IDs and engine names while preserving non-empty identifiers exactly. Test-first RED: gold-ID run 41660769932; prediction-ID/engine run 41662075069. Final exact-code-head CI: 41662232565 SUCCESS (152 Python tests + 54 subtests; 54 built-site browser tests passed).  No linguistic labels or accuracy claims were added. |

## Verified continuation checkpoint — 2026-11-03 (late session)

- Default branch base: `145a24af36767e14a9f094c243c593a1a6e40af5`; continuation branch: `docs/current-state-checkpoint-20261103`.
- Latest mainline work retained: mixed-script runtime parity fix and the latest handoff/register reconciliation.
- Exact-main CI on the recorded default-branch head: tests 41714204905; Pages deploy 41714204591; all listed runs completed with SUCCESS. These are CI checks for the current implementation and deployment, not phonetic validation.
- Open pull requests: none at checkpoint time. No upstream methodology repository was modified; Superpowers, Matt Pocock Skills and Ponytail remain process references only.
- Engineering task ledger: benchmark split provenance, empty-prediction rejection and whitespace-only identifier validation remain **DONE_VERIFIED** as input-integrity safeguards. The recently merged runtime fix is verified by its own regression/CI; no new linguistic rule is inferred from it.
- Linguistic task ledger: independent adjudicated IPA gold remains **0**; gold export remains header-only and empirical accuracy remains `null`. The profile-specific IPA convention, two independent annotators, separate adjudicator, curator/blind intake and item-level rights review remain **BLOCKED** on external human decisions/resources. No labels or source-derived pronunciations were fabricated.
- Manual deployed-site keyboard, screen-reader, responsive and mobile QA remains **TODO**; automated browser checks do not satisfy these acceptance criteria.
- Local test execution was not available in this connector-only session. Verification evidence is the linked GitHub Actions CI on the exact recorded main SHA; do not report local tests as run.


## Research unblock checkpoint — 2026-11-03

- Prospective language-specific expert/researcher leads and additional candidate resources are recorded in docs/ipa-gold-collection-playbook.md with primary-source links and explicit limits.
- These are leads only: no one has been contacted or recruited; no IPA convention has been approved; no rights have been granted; no IPA labels were generated.
- The 30-item pilot remains BLOCKED until the acceptance conditions in the playbook are met. Candidate lexicon entries, phonetic respellings, model outputs, orthographic transcripts and source descriptions are not gold IPA.
- The next external action is to contact a qualified prospective reviewer and request nominations for two independent annotators plus a separate adjudicator; separately complete item-level rights review and blind-intake dry run.


## Burmese Wiktionary rights-source separation — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-RIGHTS-001 | DONE_VERIFIED (source attribution separation); rights decision remains BLOCKED | PR #111 merged at `8c323ff0d1236c5c6d36b2c2be0eac4d493163ab`; dataset-card CC BY 4.0 declaration and Myanmar Wiktionary local CC BY-SA 3.0 Unported/GFDL policy are separate source records and documentary claims. Main tests [41798078257](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078257), optional Epitran [41798080052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798080052), and Pages [41798078321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078321) SUCCESS. | Provenance is correctly separated. Dataset rights remain CONFLICT/UNKNOWN until publisher/rightsholder clarification. No IPA labels, dataset imports or accuracy claims. |


## Post-merge checkpoint — Burmese Wiktionary provenance handoff (2026-11-04)

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-RIGHTS-001 | DONE_VERIFIED (documentation reconciliation); rights remain BLOCKED | PR #112 merged as `f4764d124e73005dab57512c93fdd59938e60ec3`. PR-head tests [41799540057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799540057) SUCCESS; post-merge main tests [41799853697](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853697) and Pages [41799853678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853678) SUCCESS. | Handoff and register now describe the split source records. Dataset rights remain CONFLICT/UNKNOWN; 113 IPA values (0.51%) are not gold. |


## Post-merge checkpoint — Burmese Wiktionary provenance (2026-11-04)

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-RIGHTS-001 | DONE_VERIFIED (source attribution separation and handoff reconciliation); dataset rights remain BLOCKED | PR #111 merged `8c323ff0d1236c5c6d36b2c2be0eac4d493163ab`; PR #112 merged `f4764d124e73005dab57512c93fdd59938e60ec3`; PR #113 merged `040b0ea8f565ca9e443d361d1aaa658af978e9f2`. Main tests [41798078257](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078257), optional Epitran [41798080052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798080052), Pages [41798078321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078321), PR-head tests [41799540057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799540057), post-merge tests [41799853697](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853697) and Pages [41799853678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853678), post-PR113 tests [41800359629](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41800359629) and Pages [41800359623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41800359623) all SUCCESS. | Dataset-card CC BY 4.0 and upstream CC BY-SA 3.0 Unported/GFDL remain conflicting; 113 IPA values (0.51%) are not gold. Obtain written rights clarification and per-entry profile/provenance before any import. |


## Language-specific IPA test fixtures — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-IPA-GOLD-FIXTURE-001 | DONE_VERIFIED | PR [#115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/115) merged as `28ac47949efb725610023a24b69df1c584d598a7`; exact-main tests [41847895975](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41847895975) and Pages/deployed-site smoke [41847895765](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41847895765) SUCCESS. | Test fixture now uses Myanmar script and neutral test profile; regression asserts the Myanmar Unicode-block and matching profile metadata. This validates test-fixture integrity only, not phonological rules or IPA accuracy. Gold remains 0; accuracy null. |


## Burmese external pronunciation source audit — legacy non-text records excluded

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MYG2P-SOURCE-001 | DONE_VERIFIED (source pinned and provenance/rights documented; no import) | Upstream `ye-kyaw-thu/myG2P` revision `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`; Version 2.0 file `ver2/myg2p.ver2.0.txt`, 2,329,808 bytes, Git blob SHA `0b2735f9a6f7fe28ae94c4baaf323d1db3015c3b`, five tab-separated fields including IPA; CC BY-NC-SA 4.0. Registered as `MYG2P2026`. | External diagnostic/comparator only. Non-commercial/share-alike terms, per-entry provenance, dialect and IPA convention must be respected. Existing test-only probe does not become gold or production approval. |
| BURMESE-OPENSLR80-AUDIO-001 | DEFERRED / OUT OF SCOPE | Historical source metadata only; not part of current text-only work. | No recording acquisition, processing, annotation or audio-derived labels. Not a blocker for text-based research. |

**Evidence boundary:** source records and provenance tests are complete; no external dictionary or corpus rows were imported. Independent adjudicated Burmese IPA gold remains 0; accuracy remains null.


## IPA gold release-gate profile consistency — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| IPA-GOLD-RELEASE-PROFILE-001 | DONE_VERIFIED (engineering guard) | Shared `scripts/ipa_gold_corpus.py` now rejects adjudicated corpora that mix target-profile identity (`id`, `variety`, `region`, `register`) or IPA kinds. New regression tests cover both failures. PR #117 merged as `085ce5a2da4a07dfbf606a9892c78a4d3bbb9d91`; exact PR-head CI [41870132273](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870132273) SUCCESS; post-merge CI [41870579420](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579420) SUCCESS; Pages [41870579398](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579398) SUCCESS. | Does not prove profile approval, annotator qualifications, blindness, linguistic contrast coverage, or IPA accuracy. A specialist-reviewed language-specific coverage report remains required before benchmark readiness. |


## Expert recruitment lead revalidation — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-IPA-GOLD-RECRUITMENT-LEADS-001 | PARTIAL | New specialist leads: Chiara Repetti-Ludlow's 2023 Burmese sonorant acoustic study and 2021 Burmese tone/sonority paper; Yuttaporn Naksuk and Tanintorn Limpasiri's comparative phonology review across eight Burmese dialects; University of Yangon referral lead. These do not establish native Yangon annotator qualification, availability or recruitment. | No candidate has been contacted, consented, recruited or approved. Close only after two independent qualified target-variety annotators, separate adjudicator, non-annotating curator, conflict checks, secure blind intake and written role/terms confirmation are documented. |

## Deterministic rule engine — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | PR #128 merged as `cd3a1503e79d32b09a6d2d5206340a37cfd3283b`. Exact main tests [43018103155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103155) and Pages + asset smoke [43018103391](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103391) SUCCESS; live site: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/. | Deterministic rule contract and publication verified. Expert-adjudicated Yangon IPA gold is still required before correctness/accuracy claims. |

## Final deterministic-engine verification — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | Final main head `9bece0a50a367f3f58336d2aba7016ac4af86156`; exact-head tests [43019216137](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216137) and Pages + smoke [43019216297](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216297) SUCCESS. | Deterministic implementation and publication verified. Independent expert-adjudicated Yangon IPA gold remains necessary for broader correctness/accuracy claims. |


## 2026-11-11 — Ukrainian practical transcription continuation

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Python IPA → Ukrainian adapter integrated after deterministic Burmese IPA | DONE_VERIFIED | Previous code revision `530cefbfc874b777650bd7e7ccdb5888534ab348`; 180 Python tests + 66 subtests |
| Canonical CSV and generated browser adapter | DONE_VERIFIED | Generated-data freshness, build and Node tests passed on previous code revision |
| Target distinctions /h, ɦ/ → г, /ɡ/ → ґ, /x/ → х; /w/ → в, contextual /j/ yotation, affricates ц/дз/ч/дж | DONE_VERIFIED | Explicit project policy; official 2026 standard generally uses г for foreign [g], so ґ is a contrast-preserving project choice |
| Browser fail-closed behavior for kinzi, medials and conjuncts | PARTIAL | Implemented; final Playwright run is queued and unverified |
| Accuracy of proposed Ukrainian correspondences | PARTIAL | No independent adjudicated IPA/Ukrainian gold set |
| Final browser CI | BLOCKED | Run 43095578672 queued with zero jobs started |
| Independent text-only IPA gold set | BLOCKED | Requires sourced and adjudicated Yangon-profile IPA labels and held-out evaluation |
| Audio | DEFERRED | Outside current task scope |


## Provisional onset IPA fallback — 2026-11-11

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Python onset-only preview for unresolved Burmese syllables | PARTIAL | Separate provisional IPA/Ukrainian fields and trace; canonical ipa/ukrainian withheld; unresolved rime marked ?. Regression added. Commit 6936f01d3ff320574b8802c7af348d687e63ce17 |
| Browser onset-only preview | PARTIAL | Reuses Yangon onset IPA and IPA adapter; displays provisional IPA and ?. Commit 5b83f5d3674b9e6d2f4114047bd67be5a5440719 |
| Browser regression | PARTIAL | Source-contract assertions added; no executed cross-runtime parity fixture yet. Commit 36b6ebf5a1d5a03b0c4d7a95aae2d842046e4152 |
| Dedicated Yangon grapheme-position evidence registry | TODO | Register primary-source locator, profile, exact onset position, rule ID, scope and reviewer status for every fallback entry |
| Exact-head CI and Chromium verification | BLOCKED pending run | No workflow run was returned for final head 36b6ebf5a1d5a03b0c4d7a95aae2d842046e4152 |
| Vowel/coda/asat/medial/kinzi/conjunct fallback | TODO | Do not extend without source-backed positional rules; no such guesses were added |


## Verification result — provisional onset preview, 2026-11-11

| Work item | Status | Evidence |
|---|---|---|
| Python fallback implementation and regression | DONE_VERIFIED (engineering behavior) | Code/test head aac1d6834b4c29e04f01477af1583a2be9eba485; workflow 43101914347 PASS: 182 tests + 66 subtests |
| Browser fallback detail and canonical fail-closed behavior | DONE_VERIFIED (engineering behavior) | Workflow 43101914347 PASS; Playwright 54/54; production build, generated-data freshness and Node tests PASS |
| Optional Epitran raw-output comparator | DONE_VERIFIED (workflow) | Run 43101914423 PASS; not an independent IPA accuracy benchmark |
| Dedicated Yangon grapheme-position evidence registry | TODO | Existing onset inventory is reused; exact per-entry primary-source locators, scope and adjudication remain required |
| Functional Python/browser parity fixture | PARTIAL | Shared fixture `tests/fixtures/shared_unicode_contract.json` is consumed by Python and Playwright tests for unsupported Myanmar units and analysis-dependent medial/conjunct/kinzi withholding; exact-head CI 43638222569 SUCCESS (278 Python + 68 subtests, 21 Node, 59 Playwright). Not a complete parser/phonology parity suite or IPA gold. |
| Full Myanmar grapheme fallback | DEFERRED / evidence-limited | Only isolated bare consonants receive onset-only preview; vowel/rime/coda/asat/medial/kinzi/conjunct/tone structures remain fail-closed |


## Unicode grapheme accounting sweep — 2026-11-12

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-UNICODE-ACCOUNTING-001 | DONE_VERIFIED (structural/input accounting) | PR #134 merged as `374e1a883ffc2aea5c729377e5aabf22778cbffd`; exact-head tests [43184645239](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43184645239) SUCCESS. Exhaustive sweep covers assigned Unicode L/M code points in all four Myanmar blocks. | Lossless source and code-point trace only; no IPA value is inferred for out-of-profile characters. |
| BURMESE-PHONOLOGY-100-001 | PARTIAL / BLOCKED by evidence | Existing parser/IPA engine withholds unsupported structures; no independent Yangon-profile adjudicated gold. | Requires source-located positional evidence for each supported context, shared Python/browser fixtures, independent adjudication and held-out evaluation. |


## Burmese provisional onset registry reconciliation — 2026-11-12

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-ONSET-HINT-REGISTRY-001 | DONE_VERIFIED (candidate registry parity) | PR #136 merged as `9931acf8c4b8b9a16d210e44eca47f1319f04be2`; exact-head workflow [43185426033](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43185426033) SUCCESS. Python provisional table now includes the existing CSV/browser candidate for U+1009 `ဉ` /ɲ/. | Provisional onset preview only. Canonical IPA remains withheld for isolated bare consonants; no gold label or accuracy claim added. |
| BURMESE-ONSET-IPA-PARITY-001 | PARTIAL / EVIDENCE-LIMITED | Existing `ရ` candidate differs: CSV/browser `r`, Python `ɹ`; both analysis-dependent. | Requires source-located Yangon-profile evidence and explicit broad/narrow IPA convention before choosing or synchronizing a value. |


## MLCTS Latin → Ukrainian target matrix — 2026-11-12

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | Branch `feat/burmese-romanization-ukrainian-matrix-completion-2026-11-12`; exact-head test run [43221074232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221074232) SUCCESS: 187 Python tests + 66 subtests, 54 Node tests, build, generated-data freshness and built-site Playwright all passed. All 35 onset and 94 vendor-rime rows have target candidates. | Table coverage verified; project orthographic rendering only, not IPA or primary-source verification of vendor rimes. Runtime adapter and full source inventory remain open. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 integrates a separate MLCTS → Ukrainian runtime adapter and UI; exact-head and mainline tests pass. | Expand source-verified structures and preserve unsupported/ambiguous sequences without IPA fallback. |


## Burmese Ukrainian target matrix — post-merge evidence — 2026-11-12

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | Merged PR [#138](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/138), merge `1d7045d9695d571017633a2e294b718a13ee5bce`; mainline tests [43221871111](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221871111) and Pages [43221870932](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221870932) SUCCESS. | 35 onset + 94 vendor-rime target rows are covered. Vendor-source evidence remains EVIDENCE_LIMITED; runtime adapter and complete source inventory remain open. |


## Burmese MLCTS Ukrainian runtime adapter — 2026-11-12

| ID | Status | Evidence | Remaining acceptance |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | All 35 onset + 94 vendor-rime target rows populated; merged PR #138; matrix CI passed. | None for existing inventory rows. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 adds `src/web/romanization-ukrainian.js`, syllable-level longest-match onset/medial/rime mapping, separate UI output, and tests for all 94 rime rows and all onset rows. Exact-head tests [43226578745](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226578745) and push [43226566617](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226566617) SUCCESS: 187 Python tests + 66 subtests, 18 Node tests, 55 Playwright tests, build and generated-data freshness. | Expand source inventory and support/adjudicate remaining medial/devoicing/kinzi/asat/independent-vowel combinations; preserve unknown sequences as explicit unsupported rather than guessing. |
| MYA-ROM-MATRIX-001 | PARTIAL | Runtime adapter covers current 94 vendor-derived rime keys plus supported onset and `y/r/w` medial sequences. | Verify complete orthographic inventory against original MLC source; include all legal Burmese sequences, numerals and punctuation. |
| MYA-ROM-LIC-001 | PARTIAL | Mya2Rom 0.4.4 attribution and CC-BY-SA-4.0 notice retained. | Audit each vendored table/data component and upstream licensing/provenance. |

All target renderings remain `PROPOSED`; vendor-derived source rime provenance remains `EVIDENCE_LIMITED`. This is orthographic MLCTS rendering, not IPA or pronunciation transcription.



Latest final exact-head verification after adding explicit withholding for Myanmar code points outside the romanization support inventory: [tests 43227199213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227199213) SUCCESS on `4a2cb24ae9af2bc5e4d9341de65d0a55e07b6e09`: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness. Unsupported Myanmar code points are now explicitly bracketed in the Ukrainian romanization output.


## MLCTS Ukrainian runtime adapter — mainline post-merge verification — 2026-11-12

- PR [#141](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/141) merged as `3fa33864b774c716da5bf6c9778a963148fb9974`.
- Mainline tests [43227806284](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806284) and Pages deployment [43227806266](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806266) both SUCCESS.
- Mainline test evidence: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness all passed.
- Acceptance remains PARTIAL: current Mya2Rom-derived rime inventory is EVIDENCE_LIMITED, and unrepresented legal syllable structures remain visibly unsupported rather than guessed.


## MLCTS runtime mainline reconciliation — 2026-11-12

| ID | Status | Current evidence | Acceptance boundary |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | 35 onset + 94 vendor-derived rime target rows populated; PR #138 merged; current-main tests [43228612973](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612973) and Pages [43228612998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612998) SUCCESS. | Completeness of inventoried table only; vendor-rime source provenance remains EVIDENCE_LIMITED. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 merged as `3fa33864b774c716da5bf6c9778a963148fb9974`; separate runtime adapter/UI executes supported onset, medial and rime mappings; unknown material remains visibly unsupported. | Full source-verified MLCTS inventory and all legal Burmese syllable structures. |
| MYA-ROM-MATRIX-001 | PARTIAL | Runtime supports the existing 94 rime rows with supported onset and y/r/w medial sequences. | Primary MLC source verification; legal medial/devoicing/kinzi/asat/independent-vowel combinations; numerals and punctuation source handling. |
| MYA-ROM-LIC-001 | PARTIAL | Mya2Rom attribution and CC-BY-SA-4.0 notice retained. | Component-by-component audit of vendored code, table data and upstream-derived sources/rights. |

No MLCTS output was promoted to IPA or pronunciation evidence. Independent expert-adjudicated IPA gold remains 0 and empirical accuracy remains null.


## Burmese medials, G2P and coda-parsing update — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-MEDIAL-INVENTORY-001 | DONE_VERIFIED (orthographic inventory) | Unicode 18, WG2 N2827 and Hlaing (2014) support four basic signs plus seven two-/three-medial codepoint combinations. The thesis has a duplicated prose label in the final RA+WA+HA row; codepoints are unambiguous. | This does not assign IPA values to all combinations. |
| MYA-MEDIAL-PHONOLOGY-001 | PARTIAL / CONTEXT_DEPENDENT | Ishida 2026 and pinned Google Thrax: YA/RA typically /j/ with onset-specific exceptions; WA /w/ vs rime /ʊ/; HA aspiration/devoicing and fused outcomes. Watkins (2001) and Green (2002) support secondary articulation /mj/ analysis. | Complete onset × medial × rime × coda × tone matrix and independent Yangon adjudication. |
| MYA-MRAN-IPA-001 | PARTIAL / CROSS-SOURCE CANDIDATE | Wiktionary /mjàɴ/; Green /mj/ plus placeless nasal /N/; Google WFST raw output m j àɴ. Epitran 1.35.3 instead returns məjaɴ. Both external outputs have zero gold and null accuracy. | Independent text-based expert review against written lexical and phonological sources; settle phonemic /N/ vs surface nasalization and schwa disagreement. |
| MYA-ASAT-CODA-001 | DONE_VERIFIED (structural parser parity) | Python now attaches base consonant + U+103A as coda within preceding syllable, matching browser. Regression cases: မြန်, မြန်မာ, ကတ်. Exact-head tests [43325991671](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991671) SUCCESS. | Broader segmentation remains partial pending independent annotated boundary corpus. |
| MYA-GOOGLE-FST-001 | DONE_VERIFIED (source/license and raw diagnostic) | Pinned grammar commit a90601024f07ab7e96c911243324e0adeb16da96 and root LICENSE declare Apache-2.0; raw probe run 43084508359 returned m j àɴ for မြန်, no gold. | Optional comparator only; do not replace deterministic engine or treat output as gold. |
| MYA-CRF-DIAG-001 | PARTIAL / DIAGNOSTIC ONLY | Exact branch run [43325991496](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991496): 84/100 source-concordant; YA 10/14, RA 17/20, WA 13/15, HA 7/8; zero gold and accuracy null; exact မြန် absent. | Train/test overlap unknown; labels are from myG2P CC BY-NC-SA 4.0. |
| MYA-TONE-001 | PARTIAL / COMPETING ANALYSES | Green and LREC 2020 use four-tone descriptions; Duan & Zhu (2025) propose eight tones across modal/lower-breathy registers. | Full empirical review, profile scope and expert-approved convention. |
| MYA-IPA-GOLD-001 | BLOCKED | No independent expert-adjudicated Burmese IPA gold for these medial/coda cells. | Two independent qualified reviewers, third adjudicator, source-located written dictionary/grammar examples, documented broad-vs-narrow IPA convention and frozen held-out text fixtures. No audio is required or in scope. |
| MYA-PR129-RECONCILIATION-001 | LEFT OPEN / NOT MERGED | Draft PR #129 is 53 commits ahead / 17 behind current main and non-mergeable; its research findings were reused, broad hybrid implementation left untouched. | Rebase/reconcile only as a separate, reviewed integration task. |

The project remains PARTIAL PROTOTYPE; empirical accuracy remains null.


## IPA nasalization metadata boundary — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-IPA-NASALIZATION-SCHEMA-001 | DEFERRED | The typed IPA schema preserves literal IPA, kind, boundaries, tone, length and phonation but has no dedicated nasalization property. Literal IPA can preserve the diacritic. | Decide after expert-approved phonemic /N/ vs surface nasalization convention; only then consider a backward-compatible optional schema field. No schema change in this research pass. |


## Legacy non-text corpus metadata — excluded from active scope (2026-11-13)

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-UCSY-SC1-AUDIO-001 | DEFERRED / OUT OF SCOPE | Rights conflict and corpus metadata retained for historical audit only. | No acquisition, processing, annotation or audio-derived IPA labels; not a blocker for text-only research. |
## Burmese Wiktionary IPA source review — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-IPA-001 | PARTIAL (discovery lead; rights conflict unresolved) | Dataset card: 22,191 records, 20,759 headwords, 113 IPA values (0.51%), snapshot 2026-08-01, CC BY 4.0 declaration. Myanmar Wiktionary local policy (last edited 2024-12-06): CC BY-SA 3.0 Unported/GFDL. No per-entry dialect/convention, audio, annotator/adjudication or detailed locators in the card. | No import into gold. Clarify rights with publisher/rightsholder; then item-level profile/source/IPA audit and independent specialist review. MLCTS is not IPA. |

## Post-merge provenance checkpoint — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-G2P-PROVENANCE-001 | DONE_VERIFIED (PR-head verified; post-merge push CI not independently surfaced) | PR [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106) merged as 76426383038ee18a4cf5f2136379b25c08a40d7e. Exact implementation/workflow-head tests [41726477853](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477853), optional Epitran/CRF [41726478205](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726478205), and optional Goruut [41726477909](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477909) all SUCCESS; downloaded artifact contents inspected. | Report provenance, preserved Epitran resource hashes and sidecar integrity only. Gold remains 0; accuracy null. |

## External diagnostic report provenance — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-G2P-PROVENANCE-001 | DONE_VERIFIED (diagnostic reproducibility only) | PR [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106), exact head 942b6e8834878538c4e478c9195420b9618acd3d; RED [41725146714](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725146714); tests [41726477853](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477853) SUCCESS (162 Python tests + 64 subtests; 54 browser tests); optional Epitran/CRF [41726478205](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726478205) SUCCESS; optional Goruut [41726477909](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477909) SUCCESS. Artifact inspected: JSON + .sha256; expires 2027-02-01. | Harness SHA-256, corpus hash, engine/version, Python/platform and GitHub event metadata recorded; Epitran resource hashes preserved; integrity only. Independent adjudicated gold 0; accuracy null. |

## External diagnostic report provenance — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-G2P-PROVENANCE-001 | DONE_VERIFIED (diagnostic reproducibility only) | PR [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106), current head 8a3fd150a247144320c880756f187a256a890e2f; test-first RED [41725146714](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725146714); exact-head tests [41725456860](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725456860) SUCCESS (162 Python tests + 64 subtests; 54 browser tests); optional Epitran [41725456964](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725456964) SUCCESS; optional Goruut [41725457027](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725457027) SUCCESS. | Report records harness SHA-256, corpus hash, engine/version, Python implementation/version, platform and CI source revision; preserves Epitran resource hashes; JSON report has adjacent SHA-256 sidecar. Diagnostic integrity only. Independent adjudicated gold remains 0; accuracy null. |

## Unicode segmentation parity correction — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| UNICODE-SEGMENTATION-002 | DONE_VERIFIED | [PR #103](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/103), squash merge `8ca42933dec5f830ca70e092f25acaefe1e35ecc`; exact-head Python, Node, build, and built-site browser tests passed in [41713878227](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41713878227) and [41713891844](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41713891844). | Python now groups contiguous mixed-text runs like the browser, excludes Myanmar digits/punctuation U+1040..U+104B from phonetic text segmentation, retains unsupported Myanmar extensions as Myanmar units, and isolates C0/C1 controls. Structural parity only; no pronunciation claim. |

**Research boundary unchanged:** independent adjudicated Burmese IPA gold remains 0; empirical accuracy remains null.

# Burmese linguistic completion register — 2026-11-01

**Benchmark implementation merge:** `a5b844ec1d4f9be9264764ffa3652211fe78b6c5` (PR #100). **Handoff/register reconciliation merge:** `367819f9085eadc022079809a711b504527220ab` (PR #101).
**Latest post-merge exact-main evidence:** [engineering verification](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518082) SUCCESS; [Pages/deployed-site smoke](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518030) SUCCESS.
**Open pull requests:** none at this checkpoint.
**Research boundary:** Independent expert-adjudicated Burmese IPA gold remains 0; `data/benchmark/gold.tsv` is header-only; empirical accuracy remains null.
**Scope:** continue the existing master handoff; this register does not replace it.

## Held-out IPA benchmark integrity — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| IPA-BENCH-HELDOUT-001 | DONE_VERIFIED | PR #100 merged as `a5b844ec1d4f9be9264764ffa3652211fe78b6c5`; exact-main verification [workflow](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518082) SUCCESS; Pages/deployed-site smoke [workflow](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518030) SUCCESS. Export preserves split bucket and frozen manifest seed/version; scoring defaults to held-out test; explicit all-split mode is marked diagnostic; malformed/mixed split metadata and empty predictions fail closed. | Engineering evaluation integrity only. Independent expert-adjudicated Burmese IPA gold remains 0; `data/benchmark/gold.tsv` is header-only; empirical accuracy remains null. No gold rows, IPA labels or accuracy claims were fabricated. |


## Engineering integrity continuation — 2026-11-03

- **TSV-INPUT-001 — DONE_VERIFIED:** benchmark TSV ingestion now rejects duplicate/blank headers and nonblank rows with extra or missing fields; blank physical lines are ignored. Regression cases cover gold/prediction duplicate headers, extra gold cells, and truncated prediction rows.
- **Evidence:** test-first RED [41665726081](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41665726081); focused implementation GREEN [41665859814](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41665859814); implementation commit `f5951bb1248a0bee66a795bd375f7e4e80ce7043`.
- **Acceptance boundary:** input shape is validated before scoring. This does not create adjudicated IPA data or alter language accuracy status (gold 0; accuracy null).

## Strict JSON syntax — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| JSON-INPUT-003 | DONE_VERIFIED | Reject `NaN`, `Infinity`, and `-Infinity` in JSONL and license registry inputs. RED 41692649780; implementation CI 41694102074 SUCCESS (159 Python tests + 64 subtests; 54 built-site browser tests). | Reject non-standard JSON constants before corpus or rights validation; no linguistic labels or license terms changed. |

## License registry JSON integrity — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| JSONL-INPUT-002 | DONE_VERIFIED | Duplicate top-level and nested keys in `licenses.json` rejected. RED 41690120271; implementation CI 41690280710 SUCCESS (157 Python tests + 58 subtests; 54 built-site browser tests). | Rights registry cannot silently apply last-key-wins semantics; no license permission is inferred or broadened. |

## JSONL input integrity — 2026-11-03

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| JSONL-INPUT-001 | DONE_VERIFIED | Duplicate top-level and nested JSON object keys are rejected. RED 41687392202; exact implementation-head CI 41687710686 SUCCESS (155 Python tests + 58 subtests; 54 built-site browser tests). | Prevent silent last-key-wins corruption before corpus schema/provenance validation. No linguistic data or accuracy claims added. |

## Evidence-based task ledger

| ID | Status | Work remaining | Acceptance |
|---|---|---|---|
| MYA-GOLD-001 | BLOCKED | No independent expert-adjudicated lexical IPA gold exists; data/benchmark/gold.tsv contains only its header. | At least two independent text-based Burmese linguists, adjudication, source-located written dictionary/grammar entries, documented dialect/profile and IPA convention, and frozen held-out text fixtures. No audio. |
| MYA-PHON-001 | PARTIAL | Full vowel-combination derivation, coda/checked-syllable realization, tone/register/phonation inference and contextual allophony remain incomplete. | Source-located, expert-reviewed rule matrix with minimal pairs, explicit dialect scope and fail-closed unresolved cases. |
| MYA-IPA-001 | PARTIAL | Phonological vs phonetic IPA conventions and analysis of tone/register/phonation require specialist adjudication. | Versioned IPA convention, syllable/segment alignment, tone/phonation fields and adjudicated alternatives. |
| MYA-ROM-001 | PARTIAL | All 35 onset and 94 vendor-derived rime target rows have Ukrainian project candidates; PR #141 integrates a separate MLCTS-to-Ukrainian runtime adapter for supported syllable structures. The source rime inventory remains vendor-evidence-limited. | Verify the MLCTS inventory against primary MLC material; expand legal medial/devoicing, kinzi, asat and independent-vowel structures; retain explicit withholding for unsupported forms. |
| MYA-G2P-001 | DONE_VERIFIED (diagnostic harness only) | Goruut has 55/100 partial-coverage outputs; myG2P is CC BY-NC-SA 4.0 and temporary test-only. | No production promotion or source-data import without independent gold and explicit rights clearance. |
| MYA-UI-001 | TODO | Manual visual, keyboard, assistive-technology and mobile QA is not established by CI. | Recorded test matrix and deployed-site results. |
| MYA-REL-001 | PARTIAL | Production readiness blocked by gold, phonological coverage and external asset licensing. | All release gates met; owner makes any project-license decision; no restricted data/model bundled. |

## Current diagnostic evidence

The latest recorded myG2P v2.0/Goruut 100-row comparison is 98 outputs, 2 none; 43 complete, 55 partial, 2 unknown/no output; 98 stable; 69 unphonemized source fragments; strict source-label matches 0/100 and limited-notation matches 17/100. Epitran 1.35.3 had 0 exact source-label matches. These are diagnostic results, not accuracy. myG2P labels are not independent gold and the source is CC BY-NC-SA 4.0; temporary testing only is authorized. Independent gold remains 0; accuracy remains null.

## Open PR and branch reconciliation

PR [#53](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/53) remains open and untouched. Its branch is 5 commits ahead and 38 behind current main, changes only `index.html`, `system.html` and `src/web/styles.css`, and replaces the stylesheet wholesale. It is not safe to merge as-is; re-evaluate only if a fresh visual audit identifies a still-missing requirement, then port focused CSS changes on current main with browser tests. No existing user branch was deleted or rewritten.

## Execution order

1. Preserve fail-closed phonetic behavior.
2. Commission independent text-based IPA review of source-located Burmese dictionary and published phonological-description entries; record dialect/profile, convention, two independent reviews and adjudication.
3. Resolve the phonemic/phonetic convention and the interaction of tones, register, phonation and checked syllables with specialists.
4. Complete vowel/medial/coda derivation and the orthography-to-IPA matrix.
5. Verify MLCTS against primary Myanmar Language Commission sources; finish the separate MLCTS → Ukrainian adapter.
6. Conduct deployed UI/accessibility QA and asset-rights review.

## External dependencies / blockers

- Qualified Burmese phonologist/phonetic annotators and adjudicator.
- Rights-cleared written IPA sources and permission for derived labels; myG2P cannot be redistributed commercially under its current CC BY-NC-SA terms absent permission.
- Primary MLC publication access for MLCTS rule confirmation.
- No local checkout was available to this execution; exact-main GitHub Actions are the engineering evidence. Run documented local release commands in a clean checkout before release.

## Method constraints

Preserve `Burmese orthography → structural/medial analysis → Burmese phonology → typed IPA → Ukrainian adaptation`. MLCTS remains a separate orthographic mode. Do not collapse register/phonation distinctions into guessed tone values.


## Independent IPA gold corpus implementation — 2026-11-01

| Task | Status | Evidence / remaining acceptance |
|---|---|---|
| IPA-GOLD-SCHEMA-001 | DONE_VERIFIED | Record, annotation, adjudication, split and license schemas plus cross-file validator |
| IPA-GOLD-DOUBLE-ANNOTATION-001 | PARTIAL | Two distinct annotators enforced; blind intake requires external controlled collection |
| IPA-GOLD-ADJUDICATION-001 | PARTIAL | Agreement/resolved/unresolved logic and feature-complete IPA comparison; no real adjudicated rows |
| IPA-GOLD-RIGHTS-001 | DONE_VERIFIED (mechanism) | Allowlisted licenses, required rights evidence and rejection of unregistered/non-redistributable licenses; source-by-source legal review still required |
| IPA-GOLD-SPLIT-001 | DONE_VERIFIED | Deterministic hash-based group split; one frozen seed/version is enforced across the entire manifest, including distinct lexeme groups; new groups inherit the existing identity and conflicting overrides are rejected |
| IPA-GOLD-EXPORT-001 | DONE_VERIFIED | Rights-filtered typed IPA export retaining source/license/evidence locators |
| IPA-TYPED-BENCHMARK-001 | DONE_VERIFIED | Different or missing IPA kind cannot count as an exact match |
| IPA-GOLD-RELEASE-GATE-001 | PARTIAL | Tag/manual workflow requires 100/25/25 adjudicated train/dev/test; owner must require the check in release rulesets/procedure |

**Current gold:** zero independent expert-adjudicated records; `gold.tsv` remains header-only; accuracy=null. The new schemas, fixtures and source-attested literature are not gold labels. No phonetic data was invented.


**Research evidence artifact:** [Burmese vowel × medial × checked-syllable × prosody evidence matrix](BURMESE-VOWEL-MEDIAL-PROSODY-EVIDENCE-MATRIX-2026-11-01.md). It separates Green's four-tone analysis, the eight-tone/two-register proposal, consonantal voicelessness and written medial parsing.


**Source reconciliation:** Green (2002 ROA paper; published 2005 chapter) now anchors the 50-rhyme analysis. Repetti-Ludlow (2023) tests a restricted subset of voiceless sonorants and finds variable spread-glottis realization (78% present); Duan & Zhu (2025) proposes an eight-tone/two-register alternative but is not yet independently adjudicated.


**2026-11-01 closeout:** PR [#84](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/84) is the comprehensive implementation and research-matrix change. PR CI passed 121 Python tests + 31 subtests, four generated-data tests and 54 Playwright browser tests; optional Epitran diagnostic passed. Main remains at 4ddb9d3. Gold remains 0; tone/register/phonation adjudication remains blocked.


## 2026-11-01 final IPA-kind consistency verification

- Added fail-closed cross-annotation consistency: both independent annotations for one record must use the same `ipa.kind`, and a `RESOLVED` adjudicated result must preserve that kind. This prevents phonemic-vs-phonetic representation differences from being misclassified as pronunciation disagreements.
- Regression evidence: both new tests failed against the pre-fix validator on the test-only commit, then passed after the validator change.
- New task `IPA-GOLD-REPRESENTATION-KIND-001`: **DONE_VERIFIED** (mechanism and exact-head CI). Blindness, annotator qualifications and independent adjudicator competence remain external operational evidence, not properties CI can prove.
- Final PR head: `5aa4463b70599f36ea287d62ed07d0fd69b3dac1`; CI run [41338466798](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41338466798) SUCCESS — 124 Python tests + 31 subtests; generated-data checks, production build and 54 built-browser Playwright tests passed. Optional Epitran diagnostic run 41338466820 also passed.
- The Burmese matrix remains PARTIAL: Green's extracted 50-rhyme table still needs manual primary-PDF transcription; tone/register/phonation analyses remain competing evidence, not implementation consensus.
- Gold remains zero; `gold.tsv` remains header-only; empirical accuracy remains null. No IPA labels were generated.


## IPA gold split-manifest runtime/schema parity — 2026-11-01

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| BUR-IPA-SPLIT-STRICT-001 | P1 | DONE_VERIFIED | RED test on commit `3f20dcc5f2f90940b600fdb2fd378d4976d3a098` failed as expected; GREEN code commit `76af91582a760b44ce18f029f80dbf9a35f7a4c7`; exact-head CI [41340417848](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41340417848) passed | The split generator and corpus validator share the closed split-field contract; unknown prior-manifest properties are rejected rather than silently dropped. No expert gold is created by this change. |


## Product-corpus license eligibility — 2026-11-01

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| BUR-IPA-LICENSE-ELIGIBILITY-001 | P1 | DONE_VERIFIED | RED tests on `53964d81fdfca19314fbf911dcc424cd3be20027`; GREEN code/schema commit `7383191ca2ca9e8c24099ae2f55483c6f6351d68`; exact-head CI [41341030962](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41341030962) passed | Registry and schema fail closed unless a redistributable product-corpus license explicitly permits commercial use and defines attribution/share-alike obligations. Human source-by-source rights review remains required. |


## Release-gate threshold validation — 2026-11-01

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| BUR-IPA-RELEASE-THRESHOLDS-001 | P1 | DONE_VERIFIED | RED test on `52fbfd77a12ef2e592debbaea7e07b0650d5fd3b`; GREEN code commit `fc77d3e8073e58ae75a86693db971ff3fc0a162a`; exact-head CI [41341757201](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41341757201) passed | All split minimums reject zero and negative values; threshold errors aggregate with other release-gate findings. Default minimums remain 100/25/25. |


## Audio-source review update — 2026-11-01

Historical audit note only: SLR80 is excluded from current text-only scope and is not an active source candidate.

This is **not IPA gold**. The line index contains orthographic transcripts; the paper's FST G2P is a pronunciation-generation/lexicon-bootstrapping tool, not independent adjudicated truth. The recording location does not by itself establish every speaker's dialect. No word-level acoustic timestamps are supplied, so any token selection requires manual alignment verification. The female-only sample cannot support gender-balanced generalization.

Do not acquire, process, annotate or use SLR80 recordings in this work.

Status remains `MYA-GOLD-001 = BLOCKED`: no annotations, annotators or adjudications have been created. Independent gold remains 0 and accuracy remains null.


## Final exact-head verification — 2026-11-01

Branch `feat/ipa-gold-corpus-20261101-review`, source-audit content commit `083ddb740d825b2c1e227cd0f19d051beba097a6`. Burmese exact-head CI: tests [41344959952](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959952) SUCCESS; optional Goruut [41344959963](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959963) SUCCESS; optional Epitran [41344959950](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959950) SUCCESS. Core job passed corpus structure validation, pytest, npm build, generated-data drift check, npm tests and built-browser Playwright tests.

These checks validate the committed repository and its automated engineering contracts. They do **not** validate the linguistic correctness of future human annotations, create gold labels, or change the release blocker. Gold remains empty and accuracy remains null.


## Follow-up handoff-head CI — 2026-11-01

The subsequent documentation-only handoff/register state at commit `0021dae7ea3450b99f63509c39d3dd384241284e` was also checked on its exact head: tests [41345383752](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383752) SUCCESS; optional Goruut [41345383729](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383729) SUCCESS; optional Epitran [41345383623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383623) SUCCESS. These runs validate the updated documentation and existing automated checks, not future IPA annotations. Any later branch update must be checked again on its new exact head.


## Open-rights redistributability invariant — 2026-11-01

| Task | Status | Evidence / acceptance |
|---|---|---|
| BUR-IPA-RIGHTS-OPEN-001 | DONE_VERIFIED | A test-first regression rejected a source with `rights_status=OPEN` and `redistributable=false`; the runtime validator and record JSON Schema now both require `redistributable=true` for OPEN. Test-only RED commit: `644d897cefeb613a74aaa6ea9110ba4e9a5303e2`. Fix/schema code head: `0f0a8a013887a7366aea2424935b0252f5b11778`; exact-head CI run [41348005124](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41348005124) passed: 129 pytest tests + 41 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed; optional Goruut and Epitran diagnostics passed. |

This is a consistency/eligibility invariant, not a new legal determination. It does not change source licenses, rights evidence, gold labels or measured accuracy. Independent adjudicated gold remains 0; accuracy remains null.

## Exact current-head engineering checkpoint — 2026-11-01

- Current code checkpoint: `a8b71b536f93da586e16dfcc91a5db9a8be1f573`; exact-head core CI [41348246731](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41348246731) **SUCCESS**. 129 pytest tests + 41 subtests; npm build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed. Optional Goruut Burmese and Epitran diagnostics passed.
- The `OPEN` / `redistributable` consistency regression is present in runtime validation, JSON Schema and tests.
- Independent expert gold remains 0 and accuracy remains null. Human annotation/profile/convention gates remain open; CI is not linguistic validation.

 
## Nested IPA record contract closure — 2026-11-01

| Task | Status | Evidence / acceptance |
|---|---|---|
| IPA-GOLD-NESTED-STRICT-001 | DONE_VERIFIED (engineering contract) | Test-first RED: [run 41352936278](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41352936278); GREEN exact-code-head CI: [run 41353062069](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41353062069). Runtime validator and JSON Schema both reject undeclared fields in `orthography`, `profile`, `source` and `source.rights_evidence`. 131 pytest tests + 48 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed. |

This closes only the nested-object shape contract. It does not establish the truth of source metadata, rights determinations, speaker profiles, IPA, or expert adjudication. Independent gold remains 0 and accuracy remains null.


## Validator duplicate-call cleanup — 2026-11-01

| Task | Status | Evidence / acceptance |
|---|---|---|
| IPA-GOLD-DUPLICATE-VALIDATION-001 | DONE_VERIFIED | Removed four consecutive duplicate `reject_unknown_properties` calls from nested `orthography`, `profile`, `source`, and `source.rights_evidence` validation. Code commit: `76c2639c57dfdf7da5a4a39a3fae999f2a646532`; resulting shared validator blob SHA: `a072297e320b4b91a36c59fc90328b6ff98d2a5f`. - Core PR CI: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250746 (SUCCESS); core push CI: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354246209 (SUCCESS); optional language diagnostics: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250460, https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250457 (SUCCESS). |

This is dead-code cleanup only: each contract check remains once; no validation rule, schema, IPA value, phonology rule, or corpus row changed. The shared validator remains identical across Lao, Khmer and Burmese. Hosted CI only; no local checkout or local test command is claimed. Independent expert-adjudicated gold remains 0 and empirical accuracy remains null.


## Methodology source refresh — 2026-11-02

| ID | Status | Evidence / acceptance |
|---|---|---|
| ENGINEERING-METHOD-REFRESH-001 | DONE_VERIFIED | Updated `AGENTS.md` and canonical handoff to pin Superpowers 7.0.1, mattpocock/skills current main, and Ponytail 5.3.3. Exact-head CI on methodology commit `8bdcf3e07ed1359d443aad21b53d00b6db3812f2`: [PR tests 41356409847](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409847) and [push tests 41356404196](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356404196) SUCCESS; 131 tests + 48 subtests and 54 Playwright tests; [Goruut 41356409749](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409749) and [Epitran 41356409786](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409786) SUCCESS. No runtime dependencies or copied skill bundles were added. |



## Methodology source refresh follow-up — 2026-11-02

| ENGINEERING-METHOD-REFRESH-002 | DONE_VERIFIED | Updated `AGENTS.md` and canonical handoff to mattpocock/skills v1.3.2 (`d1478fcb140db0b93c0c8df17bcfd311844749d0`); added two-axis review, genuine-RED evidence, template/ownership, and safe worktree-cleanup guidance. Verified documentation checkpoint `b5c50772c3d8f1494bb68d0a85a41b6fee82d1ec`: [tests 41358676730](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676730) SUCCESS; optional [41358676910](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676910) and [41358676749](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676749) SUCCESS. | No third-party code, data, skill bundle, or runtime dependency copied. |

## IPA gold adjudication required-field parity — 2026-11-02

| ID | Priority | Status | Scope / evidence | Acceptance criteria / dependencies |
|---|---|---|---|---|
| IPA-GOLD-ADJUDICATION-FINAL-IPA-001 | P1 | DONE_VERIFIED | A test-first regression demonstrated that an `UNRESOLVED` adjudication with the `final_ipa` property omitted was accepted by the Python runtime even though the JSON Schema requires the property (nullable). Test-only RED commit `2c1897567b1c108a7c587307a01cc79c857f4450`; failing exact-head PR CI [41407021855](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407021855). Runtime fix commit `030d5255eb81400781f6961b53bc5f0d76a85f8c`; exact-head PR CI [41407123331](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123331) SUCCESS. 132 pytest tests + 48 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed. |

The validator now requires the `final_ipa` key to be present for every adjudication. `UNRESOLVED` must supply explicit JSON `null`; `AGREEMENT` and `RESOLVED` still require a typed IPA object. No phonology rules, corpus labels, source data or benchmark scores changed. Optional diagnostic runs: [41407123332](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123332), [41407123343](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123343). Gold remains 0 and empirical accuracy remains null.


### Unresolved adjudication explicit-null positive-path coverage — 2026-11-02

The regression suite now also proves the valid complementary case: `decision=UNRESOLVED` with an explicitly present `final_ipa: null` is accepted and remains excluded from adjudicated gold. Test commit `72d4664d0d1d21872fde11c492d3fd8194b0290f`; exact-head PR CI [41407404042](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407404042) SUCCESS. 133 pytest tests + 48 subtests; npm build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed. Optional diagnostics: [41407410734](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407410734), [41407410747](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407410747) SUCCESS. This does not create IPA labels or change the gold count (still 0) or accuracy (still null).

## External G2P engine coverage audit — 2026-11-02

- **PARTIAL (DONE_VERIFIED diagnostic execution):** Epitran 1.35.3 returned six structural-only probe outputs, with no verified gold. Goruut source snapshot `b224bde` on 100 source-attested myG2P rows produced 0/100 exact and 17/100 limited-normalized matches, 2 failures, 43 complete / 55 partial / 2 unknown coverage, and 69 unphonemized fragments. See `docs/research/external-g2p-benchmark-and-engine-coverage-2026-11-02.md` and Actions runs 41409098332 / 41409098207.
- **NOT SCORED:** independent expert-adjudicated IPA gold remains 0; neither the structural Epitran smoke test nor limited-normalized Goruut concordance establishes accuracy.
- **TODO:** investigate Burmese phonation/tone/register and vowel/coda mismatches; recover language-specific CRF/WFST/FST baselines from myG2P and LREC 2020; fix the absent upstream Goruut `weights9.bin.zlib` asset.


## Goruut language-bundle asset status correction — 2026-11-02

The previous TODO wording suggesting that this repository can simply recover or fix `weights9.bin.zlib` is superseded. Inspection of the exact upstream Goruut source tree at `b224bde02151f8f86d0fe260804e4ca743bda620` shows no `weights9.bin.zlib` in `dicts/lao/`, `dicts/khmer/central/`, or `dicts/burmese/`; the earlier `weights7` and `weights8` assets are present. This is an upstream language-bundle omission in the pinned snapshot, not a missing project-owned file. Status: **BLOCKED (upstream dependency)**. Acceptance: upstream publishes the asset or documents the expected model-tier fallback, and a controlled same-input comparison plus independent expert IPA gold establishes whether the asset changes relevant language coverage. Do not synthesize weights, download unpinned substitutes, or treat the warning as a failed workflow. See the external-engine research audit and canonical handoff for the evidence.


## Additional Burmese CRF baseline inventory — 2026-11-02

| ID | Priority | Status | Evidence / acceptance |
|---|---|---|---|
| BUR-CRF-G2P-001 | P1 | PARTIAL (DONE_VERIFIED raw-output probe) | Added `scripts/benchmark_burmese_crf.py`, six focused unit tests, and a `crf-baseline` job in `.github/workflows/optional-epitran-benchmark.yml`. Pinned model/data/CRFsuite commits: `de0f06056cf334b8cdd5a1efd1226f01c8162b77`, `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`, `a2a1547727985e3aff6a35cffe073f57f0223e9d`. The original pytest import failure in run [41415624611](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415624611) was fixed by `pythonpath = ["."]`; full tests/build/generated-data/JS/Playwright workflow [41417982342](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982342) passed. Optional CRF + Epitran [41417982199](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982199) and Goruut [41417982213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982213) passed. Inspected artifact `burmese-crf-raw-output` (SHA-256 `0119281f9bd3d946a36dad1299f530b629599cfd26146ce190ea34f7c707ddd6`): 100/100 predictions, 84/100 source-concordant diagnostic, `gold_count=0`, `accuracy=null`, status `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; model SHA-256 `f66571b7632eed2e94878278702654ce0a4b25fcab18720af60d3cfe00b011ce`. Probe uses supplied syllable segmentation and source-attested labels; no accuracy is inferred. Further acceptance requires verified train/test disjointness, held-out lexical groups, profile/IPA-convention review and independent expert adjudication. Upstream myG2P source declares CC BY-NC-SA 4.0; artifact is diagnostic only and not redistributed as product data. |


## Main publication reconciliation — 2026-11-02

Supersedes earlier handoff statements that the review branch was still ahead of `main` and unmerged: the CRF benchmark test-import defect was fixed in PR [#86](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/86), merged into the review branch as `db183681eb1fc66e1b513623e08e75d5f8842220`, then the complete language PR [#84](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/84) was merged into `main` as `8cffc508ffaf5ab1b54f3b9276034838d24057ae`; this was the repository's current `main` tip at reconciliation. On the complete feature plus fix, the required workflow passed: tests/build/generated-data check/JS tests/Playwright built-browser tests [41417982342](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982342) SUCCESS; the optional CRF and Epitran jobs [41417982199](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982199) SUCCESS; optional Goruut [41417982213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982213) SUCCESS. The original required test failure [41415624611](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415624611) was specifically `ModuleNotFoundError: No module named 'scripts'`; the pytest `pythonpath = ["."]` fix was verified by the successful full run. The Pages workflow is configured to deploy from `main` and includes a deployed-site/runtime-asset smoke test. The public deployment result could not be independently inspected from this session, so deployment status remains **BLOCKED (external verification/network access)**, not claimed successful. Independent expert-adjudicated gold remains 0 and accuracy remains null; the project is still a research prototype.


## Current-main UI publication — 2026-11-02

The older design PR [#53](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/53) was not merged because its branch had diverged (5 commits ahead / 187 behind current `main`). Its responsive CSS and cache-busting intent were ported onto a fresh branch from the then-current `main`; PR [#87](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/87) was merged as `930ec6b66b4ec5fb280d3c926b8d307a23551998`. The current-main CI [41424015018](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41424015018) passed IPA gold-corpus structure validation, Python tests, generated-web-data drift check, npm tests, production build and Playwright browser tests. The Pages workflow is configured for pushes to `main`; actual deployment completion and public-site smoke-test result remain **BLOCKED (external verification/network/DNS unavailable in this session)**. This UI change improves presentation only and does not improve linguistic accuracy. Independent adjudicated gold remains 0; accuracy remains null; research-prototype status is unchanged.

### Pages smoke-test compatibility follow-up — 2026-11-02

The cache-busted stylesheet URL introduced by the UI polish exposed an overly strict CSS-link extractor in the deployed-site smoke test. Fixed in PR [#88](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/88), merge `fea5f6e44680b6202e07e5e896eb175699c101c2`; the extractor now accepts an optional query string. PR CI passed (41424690731). The Pages workflow is now compatible with the deployed CSS URL. The post-merge Pages deployment and live-site smoke-test result are still **BLOCKED for independent verification** because external DNS/network access and a workflow-run listing endpoint were unavailable; do not infer deployment success from a merged PR or a successful pull-request CI run.


## IPA-GOLD-SPLIT-MANIFEST-IDENTITY-001 — 2026-11-03

**Status: DONE_VERIFIED (runtime validator and split generator).** Root cause: the previous cross-file validator checked seed/version consistency only within each `lexeme_group_id`, allowing distinct groups in one corpus manifest to carry different seeds or versions. The split generator could also add a new group under a newly supplied seed while preserving older groups, silently creating a mixed manifest.

- Added regression coverage for mixed seeds and mixed versions across distinct groups, plus conflicting seed override when extending an existing manifest.
- The tests-only commits failed for the intended three behaviors: 41612967105. The implementation and assertion correction are on branch head `f1eb2af9c134`.
- Exact-head CI: [41613349719](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41613349719) SUCCESS — 142 Python tests + 48 subtests; the full repository workflow also completed successfully.
- New invariant: a single manifest has one `(seed, version)` pair globally; existing manifests retain that identity when extended; explicit conflicting overrides fail closed. A new corpus split design requires a separate versioned manifest.
- This is an engineering reproducibility fix only. It creates no linguistic labels and does not change gold count (0) or accuracy (`null`).

- Follow-up strictness regression: explicit empty `--seed` and `--version` must fail instead of falling through to defaults. Tests-only CI failed on both behaviours (41615393679); the corrected conditional default resolution passed exact-head CI 41615574734.


## Separate-manifest creation acceptance — 2026-11-03

**Status: DONE_VERIFIED on the dedicated PR branch; merge to main remains pending.** Added an acceptance test proving a genuinely new seed/version can be used when the caller supplies a separate empty JSONL input via `--splits`, while the existing frozen manifest remains untouched. Corrected the operator instructions: changing only `--output` does not reset the input manifest; the new-manifest workflow must use a new empty `--splits` file and a distinct `--output` file.

- PR [#90](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/90), final documentation head `239da6add4d23654a0cdb9ecb2a25c77fd588b58`; code/test checkpoint `acc29c519c72d9ba9cc48f30191e0c8a6ae73ae7` (the three subsequent commits are docs-only).
- Exact-head CI [41638537232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41638537232) SUCCESS — 145 pytest tests + 48 subtests; web data validation OK; 54 browser tests passed.
- No linguistic gold rows were added; independent gold remains 0 and empirical accuracy remains `null`.


## Split-manifest integration checkpoint — 2026-11-03

**Burmese PR #90: DONE_VERIFIED on main.** Merged as `01d0d193f043508c6283ba77d70f9e9439402997`. The global manifest identity invariant and separate-manifest creation acceptance are now in the default branch. Exact-main workflow [41643388974](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41643388974) succeeded. No gold rows were added; adjudicated gold remains 0 and empirical accuracy remains `null`.


## Source-citation reconciliation — 2026-11-03

**Status: PARTIAL pending exact-head verification.** Added the WSSANLP 2016 record, exact ACL Anthology locator and scoped author–year references on a clean branch from latest main.

- Superseded PR #91 is not used as a merge candidate; this port must pass exact-head CI.
- No pronunciation labels or corpus records imported; source rights remain source-specific; independent gold remains 0 and accuracy remains `null`.


## MYA-EVIDENCE-AUDIT-001 — source scope and phonology matrix — 2026-11-03

**Status: PARTIAL pending exact-head CI and specialist review.** Updated the Burmese vowel/medial/prosody matrix and external-corpus triage with precise source scopes. Mooney & Repetti-Ludlow (2021) is a one-speaker competing analysis; Hlaing & Mikami's 99.93% is orthographic syllabification, not G2P; Oo et al. (2020) is orthographic speech, not IPA gold; Thu et al. (2016) uses a romanized inventory.

- No lexicon rows or pronunciation labels imported. License claims remain specific to individual artifacts; the LREC grammar and corpus rights are not conflated.
- Original PR #89 workflow [41631406950](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41631406950) succeeded before this clean port; fresh exact-head CI required.
- Independent gold remains 0 and empirical accuracy remains `null`.


## Continuation status sync — 2026-11-03

- Current main: `36ee99a83e6dd2bcf4670860908c3dbf53301ab8`; exact-main checks: tests 41647872126 SUCCESS; Pages/deployed-site 41647872084 SUCCESS.
- PR #89 is closed without merge; its mainline source and agent-guidance work was ported in focused commits. No open PRs were returned by the current open-PR query.
- Engineering improvements on main are verified at the stated commit; this does not promote linguistic validation or manual accessibility tasks to DONE.
- IPA gold remains 0; empirical accuracy remains null. Annotation staffing, convention approval, rights clearance, blind intake and adjudication remain BLOCKED on external human/evidence dependencies.


## BURMESE-METHOD-REFRESH-001 — upstream methodology snapshots — 2026-11-03

**Status: DONE_VERIFIED (reference audit).** Superpowers v7.0.1 current main: `2ce8aa15d05bd57213e6f746f953aafb7ded7a8b`; mattpocock/skills v1.3.2 release: `d1478fcb140db0b93c0c8df17bcfd311844749d0`, current main snapshot: `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`; Ponytail v5.3.3 release: `7801d061243d7b753bad0e0b3c057cd250b11755`, current main: `96608e078b2d5ea607c5c3b8b5a54d1c1fba6846` (README-only post-pin change).

- Release pins and current-main snapshots are distinguished. No third-party runtime or skill files imported.

## 2026-11-03 — held-out benchmark split enforcement

| Task | Status | Evidence / remaining acceptance |
|---|---|---|
| IPA-BENCH-SPLIT-001 | DONE_VERIFIED (engineering contract) | Export preserves the frozen group-safe split; scorer defaults to test and requires explicit selection for train/dev/all. Exact-head tests [41651876020](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41651876020) SUCCESS on `af3ff6c5d3104a45ce5c1524b6083850c6dacd83`. This fixes the evaluation boundary, not linguistic gold. |

Independent gold remains 0 and accuracy remains null. No data labels were fabricated. The split-aware benchmark documentation is in `docs/benchmarking-and-external-ipa.md`.

## Frozen split manifest provenance — 2026-11-03

The export and benchmark now preserve and validate the complete frozen split identity, not only the bucket name: `split`, `split_seed`, and `split_version`. Every adjudicated row must carry non-empty seed/version metadata, and the benchmark rejects a TSV that mixes manifest identities. The report exposes the manifest seed/version and selected scoring split. This makes the evaluated test partition traceable to one exact manifest; it does not create linguistic gold or change the current zero-row accuracy status.


## 2026-11-03 — empty benchmark prediction input

| Task | Status | Evidence / remaining acceptance |
|---|---|---|
| IPA-BENCH-EMPTY-PREDICTIONS-001 | DONE_VERIFIED (engineering guard) | Header-only prediction TSV previously exited 0 and produced an empty `engines` object. Test-first regression failed on all three language repositories; the scorer now rejects an empty prediction dataset after checking gold and frozen split provenance. Missing individual predictions within a named engine remain denominator-counted. RED: [41655173696](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41655173696). Final exact-head tests: [41655504734](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41655504734) SUCCESS. |


## 2026-11-03 — benchmark identifier validation

| Task | Status | Evidence / acceptance |
|---|---|---|
| IPA-BENCH-IDENTIFIERS-001 | DONE_VERIFIED (engineering guard) | Reject whitespace-only gold IDs, prediction IDs and engine names while preserving non-empty identifiers exactly. Test-first RED: gold-ID run 41660769932; prediction-ID/engine run 41662075069. Final exact-code-head CI: 41662232565 SUCCESS (152 Python tests + 54 subtests; 54 built-site browser tests passed).  No linguistic labels or accuracy claims were added. |

## Verified continuation checkpoint — 2026-11-03 (late session)

- Default branch base: `145a24af36767e14a9f094c243c593a1a6e40af5`; continuation branch: `docs/current-state-checkpoint-20261103`.
- Latest mainline work retained: mixed-script runtime parity fix and the latest handoff/register reconciliation.
- Exact-main CI on the recorded default-branch head: tests 41714204905; Pages deploy 41714204591; all listed runs completed with SUCCESS. These are CI checks for the current implementation and deployment, not phonetic validation.
- Open pull requests: none at checkpoint time. No upstream methodology repository was modified; Superpowers, Matt Pocock Skills and Ponytail remain process references only.
- Engineering task ledger: benchmark split provenance, empty-prediction rejection and whitespace-only identifier validation remain **DONE_VERIFIED** as input-integrity safeguards. The recently merged runtime fix is verified by its own regression/CI; no new linguistic rule is inferred from it.
- Linguistic task ledger: independent adjudicated IPA gold remains **0**; gold export remains header-only and empirical accuracy remains `null`. The profile-specific IPA convention, two independent annotators, separate adjudicator, curator/blind intake and item-level rights review remain **BLOCKED** on external human decisions/resources. No labels or source-derived pronunciations were fabricated.
- Manual deployed-site keyboard, screen-reader, responsive and mobile QA remains **TODO**; automated browser checks do not satisfy these acceptance criteria.
- Local test execution was not available in this connector-only session. Verification evidence is the linked GitHub Actions CI on the exact recorded main SHA; do not report local tests as run.


## Research unblock checkpoint — 2026-11-03

- Prospective language-specific expert/researcher leads and additional candidate resources are recorded in docs/ipa-gold-collection-playbook.md with primary-source links and explicit limits.
- These are leads only: no one has been contacted or recruited; no IPA convention has been approved; no rights have been granted; no IPA labels were generated.
- The 30-item pilot remains BLOCKED until the acceptance conditions in the playbook are met. Candidate lexicon entries, phonetic respellings, model outputs, orthographic transcripts and source descriptions are not gold IPA.
- The next external action is to contact a qualified prospective reviewer and request nominations for two independent annotators plus a separate adjudicator; separately complete item-level rights review and blind-intake dry run.


## Burmese Wiktionary rights-source separation — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-RIGHTS-001 | DONE_VERIFIED (source attribution separation); rights decision remains BLOCKED | PR #111 merged at `8c323ff0d1236c5c6d36b2c2be0eac4d493163ab`; dataset-card CC BY 4.0 declaration and Myanmar Wiktionary local CC BY-SA 3.0 Unported/GFDL policy are separate source records and documentary claims. Main tests [41798078257](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078257), optional Epitran [41798080052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798080052), and Pages [41798078321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078321) SUCCESS. | Provenance is correctly separated. Dataset rights remain CONFLICT/UNKNOWN until publisher/rightsholder clarification. No IPA labels, dataset imports or accuracy claims. |


## Post-merge checkpoint — Burmese Wiktionary provenance handoff (2026-11-04)

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-RIGHTS-001 | DONE_VERIFIED (documentation reconciliation); rights remain BLOCKED | PR #112 merged as `f4764d124e73005dab57512c93fdd59938e60ec3`. PR-head tests [41799540057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799540057) SUCCESS; post-merge main tests [41799853697](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853697) and Pages [41799853678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853678) SUCCESS. | Handoff and register now describe the split source records. Dataset rights remain CONFLICT/UNKNOWN; 113 IPA values (0.51%) are not gold. |


## Post-merge checkpoint — Burmese Wiktionary provenance (2026-11-04)

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-RIGHTS-001 | DONE_VERIFIED (source attribution separation and handoff reconciliation); dataset rights remain BLOCKED | PR #111 merged `8c323ff0d1236c5c6d36b2c2be0eac4d493163ab`; PR #112 merged `f4764d124e73005dab57512c93fdd59938e60ec3`; PR #113 merged `040b0ea8f565ca9e443d361d1aaa658af978e9f2`. Main tests [41798078257](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078257), optional Epitran [41798080052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798080052), Pages [41798078321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078321), PR-head tests [41799540057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799540057), post-merge tests [41799853697](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853697) and Pages [41799853678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853678), post-PR113 tests [41800359629](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41800359629) and Pages [41800359623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41800359623) all SUCCESS. | Dataset-card CC BY 4.0 and upstream CC BY-SA 3.0 Unported/GFDL remain conflicting; 113 IPA values (0.51%) are not gold. Obtain written rights clarification and per-entry profile/provenance before any import. |


## Language-specific IPA test fixtures — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-IPA-GOLD-FIXTURE-001 | DONE_VERIFIED | PR [#115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/115) merged as `28ac47949efb725610023a24b69df1c584d598a7`; exact-main tests [41847895975](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41847895975) and Pages/deployed-site smoke [41847895765](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41847895765) SUCCESS. | Test fixture now uses Myanmar script and neutral test profile; regression asserts the Myanmar Unicode-block and matching profile metadata. This validates test-fixture integrity only, not phonological rules or IPA accuracy. Gold remains 0; accuracy null. |


## Burmese external pronunciation source audit — legacy non-text records excluded

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MYG2P-SOURCE-001 | DONE_VERIFIED (source pinned and provenance/rights documented; no import) | Upstream `ye-kyaw-thu/myG2P` revision `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`; Version 2.0 file `ver2/myg2p.ver2.0.txt`, 2,329,808 bytes, Git blob SHA `0b2735f9a6f7fe28ae94c4baaf323d1db3015c3b`, five tab-separated fields including IPA; CC BY-NC-SA 4.0. Registered as `MYG2P2026`. | External diagnostic/comparator only. Non-commercial/share-alike terms, per-entry provenance, dialect and IPA convention must be respected. Existing test-only probe does not become gold or production approval. |
| BURMESE-OPENSLR80-AUDIO-001 | DEFERRED / OUT OF SCOPE | Historical source metadata only; not part of current text-only work. | No recording acquisition, processing, annotation or audio-derived labels. Not a blocker for text-based research. |

**Evidence boundary:** source records and provenance tests are complete; no external dictionary or corpus rows were imported. Independent adjudicated Burmese IPA gold remains 0; accuracy remains null.


## IPA gold release-gate profile consistency — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| IPA-GOLD-RELEASE-PROFILE-001 | DONE_VERIFIED (engineering guard) | Shared `scripts/ipa_gold_corpus.py` now rejects adjudicated corpora that mix target-profile identity (`id`, `variety`, `region`, `register`) or IPA kinds. New regression tests cover both failures. PR #117 merged as `085ce5a2da4a07dfbf606a9892c78a4d3bbb9d91`; exact PR-head CI [41870132273](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870132273) SUCCESS; post-merge CI [41870579420](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579420) SUCCESS; Pages [41870579398](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579398) SUCCESS. | Does not prove profile approval, annotator qualifications, blindness, linguistic contrast coverage, or IPA accuracy. A specialist-reviewed language-specific coverage report remains required before benchmark readiness. |


## Expert recruitment lead revalidation — 2026-11-04

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-IPA-GOLD-RECRUITMENT-LEADS-001 | PARTIAL | New specialist leads: Chiara Repetti-Ludlow's 2023 Burmese sonorant acoustic study and 2021 Burmese tone/sonority paper; Yuttaporn Naksuk and Tanintorn Limpasiri's comparative phonology review across eight Burmese dialects; University of Yangon referral lead. These do not establish native Yangon annotator qualification, availability or recruitment. | No candidate has been contacted, consented, recruited or approved. Close only after two independent qualified target-variety annotators, separate adjudicator, non-annotating curator, conflict checks, secure blind intake and written role/terms confirmation are documented. |

## Deterministic rule engine — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | PR #128 merged as `cd3a1503e79d32b09a6d2d5206340a37cfd3283b`. Exact main tests [43018103155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103155) and Pages + asset smoke [43018103391](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103391) SUCCESS; live site: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/. | Deterministic rule contract and publication verified. Expert-adjudicated Yangon IPA gold is still required before correctness/accuracy claims. |

## Final deterministic-engine verification — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | Final main head `9bece0a50a367f3f58336d2aba7016ac4af86156`; exact-head tests [43019216137](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216137) and Pages + smoke [43019216297](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216297) SUCCESS. | Deterministic implementation and publication verified. Independent expert-adjudicated Yangon IPA gold remains necessary for broader correctness/accuracy claims. |


## 2026-11-11 — Ukrainian practical transcription continuation

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Python IPA → Ukrainian adapter integrated after deterministic Burmese IPA | DONE_VERIFIED | Previous code revision `530cefbfc874b777650bd7e7ccdb5888534ab348`; 180 Python tests + 66 subtests |
| Canonical CSV and generated browser adapter | DONE_VERIFIED | Generated-data freshness, build and Node tests passed on previous code revision |
| Target distinctions /h, ɦ/ → г, /ɡ/ → ґ, /x/ → х; /w/ → в, contextual /j/ yotation, affricates ц/дз/ч/дж | DONE_VERIFIED | Explicit project policy; official 2026 standard generally uses г for foreign [g], so ґ is a contrast-preserving project choice |
| Browser fail-closed behavior for kinzi, medials and conjuncts | PARTIAL | Implemented; final Playwright run is queued and unverified |
| Accuracy of proposed Ukrainian correspondences | PARTIAL | No independent adjudicated IPA/Ukrainian gold set |
| Final browser CI | BLOCKED | Run 43095578672 queued with zero jobs started |
| Independent text-only IPA gold set | BLOCKED | Requires sourced and adjudicated Yangon-profile IPA labels and held-out evaluation |
| Audio | DEFERRED | Outside current task scope |


## Provisional onset IPA fallback — 2026-11-11

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Python onset-only preview for unresolved Burmese syllables | PARTIAL | Separate provisional IPA/Ukrainian fields and trace; canonical ipa/ukrainian withheld; unresolved rime marked ?. Regression added. Commit 6936f01d3ff320574b8802c7af348d687e63ce17 |
| Browser onset-only preview | PARTIAL | Reuses Yangon onset IPA and IPA adapter; displays provisional IPA and ?. Commit 5b83f5d3674b9e6d2f4114047bd67be5a5440719 |
| Browser regression | PARTIAL | Source-contract assertions added; no executed cross-runtime parity fixture yet. Commit 36b6ebf5a1d5a03b0c4d7a95aae2d842046e4152 |
| Dedicated Yangon grapheme-position evidence registry | TODO | Register primary-source locator, profile, exact onset position, rule ID, scope and reviewer status for every fallback entry |
| Exact-head CI and Chromium verification | BLOCKED pending run | No workflow run was returned for final head 36b6ebf5a1d5a03b0c4d7a95aae2d842046e4152 |
| Vowel/coda/asat/medial/kinzi/conjunct fallback | TODO | Do not extend without source-backed positional rules; no such guesses were added |


## Verification result — provisional onset preview, 2026-11-11

| Work item | Status | Evidence |
|---|---|---|
| Python fallback implementation and regression | DONE_VERIFIED (engineering behavior) | Code/test head aac1d6834b4c29e04f01477af1583a2be9eba485; workflow 43101914347 PASS: 182 tests + 66 subtests |
| Browser fallback detail and canonical fail-closed behavior | DONE_VERIFIED (engineering behavior) | Workflow 43101914347 PASS; Playwright 54/54; production build, generated-data freshness and Node tests PASS |
| Optional Epitran raw-output comparator | DONE_VERIFIED (workflow) | Run 43101914423 PASS; not an independent IPA accuracy benchmark |
| Dedicated Yangon grapheme-position evidence registry | TODO | Existing onset inventory is reused; exact per-entry primary-source locators, scope and adjudication remain required |
| Functional Python/browser parity fixture | TODO | Browser tests cover behavior, but no shared structured cross-runtime fixture yet |
| Full Myanmar grapheme fallback | DEFERRED / evidence-limited | Only isolated bare consonants receive onset-only preview; vowel/rime/coda/asat/medial/kinzi/conjunct/tone structures remain fail-closed |


## Unicode grapheme accounting sweep — 2026-11-12

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-UNICODE-ACCOUNTING-001 | DONE_VERIFIED (structural/input accounting) | PR #134 merged as `374e1a883ffc2aea5c729377e5aabf22778cbffd`; exact-head tests [43184645239](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43184645239) SUCCESS. Exhaustive sweep covers assigned Unicode L/M code points in all four Myanmar blocks. | Lossless source and code-point trace only; no IPA value is inferred for out-of-profile characters. |
| BURMESE-PHONOLOGY-100-001 | PARTIAL / BLOCKED by evidence | Existing parser/IPA engine withholds unsupported structures; no independent Yangon-profile adjudicated gold. | Requires source-located positional evidence for each supported context, shared Python/browser fixtures, independent adjudication and held-out evaluation. |


## Burmese provisional onset registry reconciliation — 2026-11-12

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-ONSET-HINT-REGISTRY-001 | DONE_VERIFIED (candidate registry parity) | PR #136 merged as `9931acf8c4b8b9a16d210e44eca47f1319f04be2`; exact-head workflow [43185426033](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43185426033) SUCCESS. Python provisional table now includes the existing CSV/browser candidate for U+1009 `ဉ` /ɲ/. | Provisional onset preview only. Canonical IPA remains withheld for isolated bare consonants; no gold label or accuracy claim added. |
| BURMESE-ONSET-IPA-PARITY-001 | PARTIAL / EVIDENCE-LIMITED | Existing `ရ` candidate differs: CSV/browser `r`, Python `ɹ`; both analysis-dependent. | Requires source-located Yangon-profile evidence and explicit broad/narrow IPA convention before choosing or synchronizing a value. |


## MLCTS Latin → Ukrainian target matrix — 2026-11-12

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | Branch `feat/burmese-romanization-ukrainian-matrix-completion-2026-11-12`; exact-head test run [43221074232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221074232) SUCCESS: 187 Python tests + 66 subtests, 54 Node tests, build, generated-data freshness and built-site Playwright all passed. All 35 onset and 94 vendor-rime rows have target candidates. | Table coverage verified; project orthographic rendering only, not IPA or primary-source verification of vendor rimes. Runtime adapter and full source inventory remain open. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 integrates a separate MLCTS → Ukrainian runtime adapter and UI; exact-head and mainline tests pass. | Expand source-verified structures and preserve unsupported/ambiguous sequences without IPA fallback. |


## Burmese Ukrainian target matrix — post-merge evidence — 2026-11-12

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | Merged PR [#138](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/138), merge `1d7045d9695d571017633a2e294b718a13ee5bce`; mainline tests [43221871111](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221871111) and Pages [43221870932](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221870932) SUCCESS. | 35 onset + 94 vendor-rime target rows are covered. Vendor-source evidence remains EVIDENCE_LIMITED; runtime adapter and complete source inventory remain open. |


## Burmese MLCTS Ukrainian runtime adapter — 2026-11-12

| ID | Status | Evidence | Remaining acceptance |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | All 35 onset + 94 vendor-rime target rows populated; merged PR #138; matrix CI passed. | None for existing inventory rows. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 adds `src/web/romanization-ukrainian.js`, syllable-level longest-match onset/medial/rime mapping, separate UI output, and tests for all 94 rime rows and all onset rows. Exact-head tests [43226578745](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226578745) and push [43226566617](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226566617) SUCCESS: 187 Python tests + 66 subtests, 18 Node tests, 55 Playwright tests, build and generated-data freshness. | Expand source inventory and support/adjudicate remaining medial/devoicing/kinzi/asat/independent-vowel combinations; preserve unknown sequences as explicit unsupported rather than guessing. |
| MYA-ROM-MATRIX-001 | PARTIAL | Runtime adapter covers current 94 vendor-derived rime keys plus supported onset and `y/r/w` medial sequences. | Verify complete orthographic inventory against original MLC source; include all legal Burmese sequences, numerals and punctuation. |
| MYA-ROM-LIC-001 | PARTIAL | Mya2Rom 0.4.4 attribution and CC-BY-SA-4.0 notice retained. | Audit each vendored table/data component and upstream licensing/provenance. |

All target renderings remain `PROPOSED`; vendor-derived source rime provenance remains `EVIDENCE_LIMITED`. This is orthographic MLCTS rendering, not IPA or pronunciation transcription.



Latest final exact-head verification after adding explicit withholding for Myanmar code points outside the romanization support inventory: [tests 43227199213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227199213) SUCCESS on `4a2cb24ae9af2bc5e4d9341de65d0a55e07b6e09`: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness. Unsupported Myanmar code points are now explicitly bracketed in the Ukrainian romanization output.


## MLCTS Ukrainian runtime adapter — mainline post-merge verification — 2026-11-12

- PR [#141](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/141) merged as `3fa33864b774c716da5bf6c9778a963148fb9974`.
- Mainline tests [43227806284](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806284) and Pages deployment [43227806266](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806266) both SUCCESS.
- Mainline test evidence: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness all passed.
- Acceptance remains PARTIAL: current Mya2Rom-derived rime inventory is EVIDENCE_LIMITED, and unrepresented legal syllable structures remain visibly unsupported rather than guessed.


## MLCTS runtime mainline reconciliation — 2026-11-12

| ID | Status | Current evidence | Acceptance boundary |
|---|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | 35 onset + 94 vendor-derived rime target rows populated; PR #138 merged; current-main tests [43228612973](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612973) and Pages [43228612998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612998) SUCCESS. | Completeness of inventoried table only; vendor-rime source provenance remains EVIDENCE_LIMITED. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 merged as `3fa33864b774c716da5bf6c9778a963148fb9974`; separate runtime adapter/UI executes supported onset, medial and rime mappings; unknown material remains visibly unsupported. | Full source-verified MLCTS inventory and all legal Burmese syllable structures. |
| MYA-ROM-MATRIX-001 | PARTIAL | Runtime supports the existing 94 rime rows with supported onset and y/r/w medial sequences. | Primary MLC source verification; legal medial/devoicing/kinzi/asat/independent-vowel combinations; numerals and punctuation source handling. |
| MYA-ROM-LIC-001 | PARTIAL | Mya2Rom attribution and CC-BY-SA-4.0 notice retained. | Component-by-component audit of vendored code, table data and upstream-derived sources/rights. |

No MLCTS output was promoted to IPA or pronunciation evidence. Independent expert-adjudicated IPA gold remains 0 and empirical accuracy remains null.


## Burmese medials, G2P and coda-parsing update — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-MEDIAL-INVENTORY-001 | DONE_VERIFIED (orthographic inventory) | Unicode 18, WG2 N2827 and Hlaing (2014) support four basic signs plus seven two-/three-medial codepoint combinations. The thesis has a duplicated prose label in the final RA+WA+HA row; codepoints are unambiguous. | This does not assign IPA values to all combinations. |
| MYA-MEDIAL-PHONOLOGY-001 | PARTIAL / CONTEXT_DEPENDENT | Ishida 2026 and pinned Google Thrax: YA/RA typically /j/ with onset-specific exceptions; WA /w/ vs rime /ʊ/; HA aspiration/devoicing and fused outcomes. Watkins (2001) and Green (2002) support secondary articulation /mj/ analysis. | Complete onset × medial × rime × coda × tone matrix and independent Yangon adjudication. |
| MYA-MRAN-IPA-001 | PARTIAL / CROSS-SOURCE CANDIDATE | Wiktionary /mjàɴ/; Green /mj/ plus placeless nasal /N/; Google WFST raw output m j àɴ. Epitran 1.35.3 instead returns məjaɴ. Both external outputs have zero gold and null accuracy. | Independent text-based expert review against written lexical and phonological sources; settle phonemic /N/ vs surface nasalization and schwa disagreement. |
| MYA-ASAT-CODA-001 | DONE_VERIFIED (structural parser parity) | Python now attaches base consonant + U+103A as coda within preceding syllable, matching browser. Regression cases: မြန်, မြန်မာ, ကတ်. Exact-head tests [43325991671](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991671) SUCCESS. | Broader segmentation remains partial pending independent annotated boundary corpus. |
| MYA-GOOGLE-FST-001 | DONE_VERIFIED (source/license and raw diagnostic) | Pinned grammar commit a90601024f07ab7e96c911243324e0adeb16da96 and root LICENSE declare Apache-2.0; raw probe run 43084508359 returned m j àɴ for မြန်, no gold. | Optional comparator only; do not replace deterministic engine or treat output as gold. |
| MYA-CRF-DIAG-001 | PARTIAL / DIAGNOSTIC ONLY | Exact branch run [43325991496](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991496): 84/100 source-concordant; YA 10/14, RA 17/20, WA 13/15, HA 7/8; zero gold and accuracy null; exact မြန် absent. | Train/test overlap unknown; labels are from myG2P CC BY-NC-SA 4.0. |
| MYA-TONE-001 | PARTIAL / COMPETING ANALYSES | Green and LREC 2020 use four-tone descriptions; Duan & Zhu (2025) propose eight tones across modal/lower-breathy registers. | Full empirical review, profile scope and expert-approved convention. |
| MYA-IPA-GOLD-001 | BLOCKED | No independent expert-adjudicated Burmese IPA gold for these medial/coda cells. | Two independent qualified reviewers, third adjudicator, source-located written dictionary/grammar examples, documented broad-vs-narrow IPA convention and frozen held-out text fixtures. No audio is required or in scope. |
| MYA-PR129-RECONCILIATION-001 | LEFT OPEN / NOT MERGED | Draft PR #129 is 53 commits ahead / 17 behind current main and non-mergeable; its research findings were reused, broad hybrid implementation left untouched. | Rebase/reconcile only as a separate, reviewed integration task. |

The project remains PARTIAL PROTOTYPE; empirical accuracy remains null.


## IPA nasalization metadata boundary — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-IPA-NASALIZATION-SCHEMA-001 | DEFERRED | The typed IPA schema preserves literal IPA, kind, boundaries, tone, length and phonation but has no dedicated nasalization property. Literal IPA can preserve the diacritic. | Decide after expert-approved phonemic /N/ vs surface nasalization convention; only then consider a backward-compatible optional schema field. No schema change in this research pass. |


## UCSY-SC1 historical metadata — excluded from active text-only scope (2026-11-13)

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-UCSY-SC1-AUDIO-001 | DEFERRED / OUT OF SCOPE | Rights conflict and corpus metadata retained for historical audit only. | No acquisition, processing, annotation or audio-derived IPA labels; not a blocker for text-only research. |


## Romanization/G2P mode separation — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-ROMANIZATION-SEPARATION-001 | DONE_VERIFIED (runtime contract) | Mya2Rom 0.4.4 defines MLCTS as orthographic and MLCTS2 as a more phonetic romanization; the browser adapter explicitly calls mya2rom(..., "mlcts", ...). | Preserve the Latin→Ukrainian crosswalk as orthographic transliteration. Do not treat MLCTS2 or the crosswalk as IPA/G2P gold. |


## Text-only source and historical-phonology updates — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-MYX-MYANGLISH-001 | PARTIAL / SCHEMA + QUALITY | 2,121 text pairs; raw CSV has two columns, while README dataset_info and viewer show a third official_standard field; non-standard single-author-style romanization. Project owner confirms research-use permission. | Obtain pinned raw artifact and generated Parquet, reconcile schema; use only as an informal romanization diagnostic, not IPA gold. |
| MYA-MYX-ORTHO-001 | PARTIAL / QUARANTINED_FOR_QUALITY_REVIEW | 4,800 work-in-progress noisy-to-clean text rows; sampled target_words mismatch and multi-substitution examples; not IPA. Project owner confirms research-use permission. | Obtain pinned files; audit target spans, deduplicate templates and manually review; do not use as a clean benchmark or IPA gold yet. |
| MYA-OKELL-TEXT-001 | BLOCKED / TOOL ACCESS | 8.8 MB Unicode text corpus; project owner confirms research-use and ingestion permission; current execution environment could not retrieve corpus bytes. | Obtain bytes through project-side transfer or accessible mirror, pin revision/hash, profile Unicode, duplicates and text boundaries. |
| MYA-STEDT-HISTORICAL-MEDIAL-001 | PARTIAL / HISTORICAL-SOURCE-SPECIFIC | STEDT, Nishi (1997/1998 Old Burmese) and Matisoff distinguish OWB/MWB/EModWB, historical -l/-r/-y correspondences, and dialect reflexes. Nishi 1976 itself remains unread. | Reconcile primary Nishi 1976 text and inscriptional examples with modern Yangon evidence; no direct Unicode runtime mapping. |
| MYA-NISHI98-VOICING-001 | DONE_VERIFIED (SOURCE EVIDENCE ONLY) | Full Nishi 1998 text inspected; two patterns, optionality, exceptions and dialect variation recorded; seven source-phonemic examples in sandhi_evidence.csv; tests and exact-head CI pass. | Runtime remains withheld until profile, lexical/context conditions and independent modern Yangon evidence are established. |

Independent text-adjudicated IPA gold remains 0; empirical accuracy remains null. Audio-related records are historical exclusions, not active work items.

| MYA-HILL-2019-CH2-001 | BLOCKED / TOOL ACCESS | Cambridge confirms Hill (2019), chapter 2 Burmese, pp.46-83; accessible publisher excerpt covers the introduction and Tibetan, not the Burmese chapter. Project owner confirms permission. | Obtain full chapter bytes in an accessible environment, inspect medials and written-to-spoken developments, then register exact locators. |

| MYA-GREEN2005-PHONOLOGY-001 | DONE_VERIFIED (SOURCE EVIDENCE ONLY) | Green 2005 broad IPA-style spoken transcription, separate ALA-LC written transliteration, CG onset structure and /N/ nasalization registered with tests. | Select project broad/narrow convention and adjudicate modern written examples; no direct Unicode medial rule yet. |
| MYA-SEALANG-DICT-001 | BLOCKED / ACCESS + SCHEMA | ~35,000-entry MLC-based dictionary; IPA query/display is confirmed at interface level by SHACHI and SEAlang 2008; Mya2Rom separately documents MLCTS2 use; internal record representation remains unknown. Project owner confirms permission. | Retrieve actual entries/export schema and reconcile interface IPA with stored MLCTS2; no IPA gold until inspected. |
| MYA-SEALANG-TEXT-001 | BLOCKED / TOOL ACCESS + SCHEMA | Text and bitext corpora are documented; service counts are not dataset sizes; project owner confirms research-use and ingestion permission, but stable retrieval is unavailable. | Retrieve actual records, inspect query/export schema, pin revision and verify provenance before import. |



## New verified text-evidence tasks — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-NISHI-OLDBURMESE-MEDIALS-001 | DONE_VERIFIED (HISTORICAL EVIDENCE) | Full Nishi 1998 Old Burmese article inspected; 13 new source-linked medial/dialect rows, four claims and four historical rules; tests pass. | Keep historical -h/-l/-r/-y distinctions separate from modern Unicode; all rows WITHHELD. |
| MYA-NISHI-SANDHI-EXAMPLES-001 | DONE_VERIFIED (SOURCE PHONEMIC, NOT IPA) | Seven source-faithful examples from Nishi 1998; explicit transcription-convention note; empty IPA field; tests pass. | Do not promote source phonemic strings to IPA gold or runtime outputs. |
| MYA-MYX-DATA-QUALITY-001 | DONE_VERIFIED (SAMPLED AUDIT) | Myanglish raw/metadata schema mismatch and orthography target_words/multi-substitution issues documented. | Full pinned artifacts still needed for complete row-level audit; corpora remain separate from IPA gold. |
| MYA-TEXT-RESEARCH-AUTHORIZATION-001 | DONE_VERIFIED (PROJECT OWNER CONFIRMATION) | Project owner confirms required permissions for text-only research use and project ingestion. | Preserve source attribution/provenance; no audio work is in scope. |

Exact-head CI 43393402710 on 4835a0abc3e7e4a18c9d0bda35f554031912d570: 217 Python tests + 66 subtests, 20 Node tests, 58 Playwright/Chromium tests; IPA-gold structure validation, build and generated-data freshness all passed. Independent expert-adjudicated IPA gold remains 0; empirical accuracy remains null.

## Final verification snapshot — 2026-11-13

- Exact tested head c03706474cf67b480c449790c9592e5fe0e53fd4; CI 43394274053 SUCCESS: 217 Python + 66 subtests, 20 Node, 58 Playwright, IPA schema, build and generated-data freshness.
- Diagnostics CI 43394274111 SUCCESS: CRF 100/100 outputs, 84 source-concordant, zero gold and null accuracy; Epitran raw output only.
- Registry counts: 56 sources, 71 claims, 42 medial rows, 28 rules, 7 source-phonemic sandhi examples. CSV integrity and traceability passed.
- Nishi (1976) is registered but full text remains unread; Nishi (1998) Old Burmese is a separate inspected source.
- Project owner confirms text-only research and project-ingestion permissions. No audio work.
- Okell/SEAlang/Hill remain tool-access or schema blocked; Myanglish schema is uncertain; myX orthography remains quarantined for quality.
- Independent IPA gold remains 0; accuracy null; runtime rules withheld. Status PARTIAL PROTOTYPE.


| MYA-OKELL1995-DIALECT-MEDIALS-001 | DONE_VERIFIED (SOURCE EVIDENCE ONLY) | Full Okell (1995) text inspected; WB/SB distinction, AR r/y preservation, IT/TV medial /l/, phonemic transcription convention; seven claims, two dialect rules, three matrix rows and regression tests. | All regional rows WITHHELD; do not project onto current Yangon without direct profile-specific evidence. |
| MYA-STANDARD-YANGON-PROFILE-001 | PARTIAL / EVIDENCE-LIMITED | Okell, Nishi and Green provide useful standard/regional/historical contrasts, but no complete current Yangon source-located written fixture set has been independently adjudicated. | Build a modern Yangon profile from text-only authoritative dictionaries/grammars; keep dialectal and historical correspondences separate. |


| MYA-OKELL1969-COLLOQUIAL-GRAMMAR-001 | BLOCKED / TOOL ACCESS | Two-volume reference grammar is bibliographically confirmed; Nishi 1998 cites §§17-20 for voicing sandhi; Okell 1995 identifies it as the Spoken Burmese reference. Project owner confirms permission. | Obtain full text, inspect exact phonology/sandhi sections and register page-located claims before runtime decisions. |


## Consolidated verification snapshot — 2026-11-13

- Exact tested head 2a96f4121a43f704a8f0d2eb6d81cb343fba47db; CI 43395906072 SUCCESS: 219 Python + 66 subtests, 20 Node, 58 Playwright, IPA schema, build and generated-data freshness.
- Optional diagnostics 43395906100 SUCCESS; CRF 100 predictions / 84 source-concordant / 0 gold / null accuracy; Epitran raw output only.
- Final registries: 58 sources, 78 claims, 45 medial rows, 30 rules, 7 source-phonemic sandhi rows. CSV widths, unique IDs and source/claim/rule/matrix links validated.
- Okell (1995) regional medial profiles and Nishi (1998) historical medial evidence are DONE_VERIFIED as source evidence only; runtime remains withheld.
- Okell (1969), Nishi (1976), Hill (2019) chapter 2, Okell text corpus and SEAlang records remain retrieval/schema blocked, not permission blocked.
- Myanglish remains schema-uncertain; myX orthography remains quarantined for quality review. No audio.
- IPA gold=0; accuracy=null; classification PARTIAL PROTOTYPE.


| MYA-SEALANG-IPA-INTERFACE-001 | DONE_VERIFIED (INTERFACE ONLY) | SHACHI metadata and the 2008 SEAlang project paper confirm IPA phonetic query and IPA transliteration display; actual internal record fields remain undisclosed. | Keep separate from internal storage/MLCTS2 question; inspect actual entry/export schema before gold-corpus use. |


## Final evidence and verification — 2026-11-13

- Exact tested code/data head cda73ccb7fa80a0404fed5a65588ebd690253f94; CI 43397172081 SUCCESS: 220 Python + 66 subtests, 20 Node, 58 Playwright, IPA schema, build and generated-data freshness.
- Optional diagnostics 43397181331 SUCCESS: CRF 100 predictions, 84 source-concordant, 0 gold, null accuracy; Epitran raw output only.
- Registries: 59 sources, 83 claims, 45 medial rows, 30 rules, 7 source-phonemic sandhi rows, 9 Okell orthographic-profile rows. CSV widths, unique IDs and cross-registry references validated.
- Okell (1995) and Nishi (1998) full-text evidence is DONE_VERIFIED at source-evidence level only; all historical/regional rules remain withheld.
- SEAlang IPA query/display is DONE_VERIFIED at interface level; internal entry/export representation remains PARTIAL / SCHEMA UNRESOLVED because Mya2Rom separately documents MLCTS2.
- Okell (1969), Nishi (1976), Hill (2019) chapter 2, Okell text corpus and SEAlang records remain tool-access/schema blocked, not permission blocked.
- Myanglish remains schema-uncertain; myX orthography remains quarantined for quality review. No audio.
- IPA gold=0; accuracy=null; classification PARTIAL PROTOTYPE.


## Okell corpus access status correction — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Okell *A Corpus of Modern Burmese* text access | PARTIAL / CONTENT AND BYTE INTEGRITY VERIFIED | Zenodo direct endpoint HTTP 200, text/plain UTF-8; 8,809,265 bytes; provider MD5 matched; SHA-256 6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c; 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment), 67 numbered heading lines, modern Myanmar Unicode, mixed Burmese/English, dialogue/speech transcripts and prose. |
| Corpus text quality and provenance | PARTIAL / TEXT_QUALITY_AUDIT_PENDING | Byte identity verified (MD5 matched; SHA-256 recorded); 21 BOM markers, one NUL, non-NFC text, repeated-line/paragraph counts profiled. Remaining acceptance: map embedded boundaries, document segment provenance, classify repeats, inspect corrupted technical terms and preserve exact source. |
| Corpus as pronunciation gold | DEFERRED / NOT GOLD | No IPA annotation schema or independent IPA labels identified; no G2P scoring. |

Acceptance: retain byte-identical pinned text, compute SHA-256, inspect document boundaries/duplicates/Unicode/corruption and record section locators before importing any lexical examples. No audio.


## Okell corpus structural-quality follow-up — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Exact retrieved-byte integrity | DONE_VERIFIED | Zenodo MD5 matched; SHA-256 6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c; 8,809,265 bytes; UTF-8 valid; 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment). |
| Unicode/structure profile | PARTIAL | 21 BOM markers, one NUL at line 9,300, non-NFC text, 0 U+FFFD, 67 numbered heading lines, 73 unique Myanmar code points. |
| Duplicate/provenance audit | TODO | 295 repeated nonblank line forms / 1,008 excess occurrences and 23 repeated paragraph forms; determine source-level duplication vs recurring titles, headers and dividers. Map embedded boundaries and segment provenance. |

Do not normalize or deduplicate the archival source automatically. No audio.


## Okell corpus orthographic profile — 2026-11-13

Created `data/burmese/okell_text_corpus_orthographic_profile.csv` with four raw medial codepoint counts and five target substring counts. It is pinned to the verified source SHA-256 and explicitly classified ORTHOGRAPHIC_ONLY. Added claim `CLM-OKELL-TEXT-MEDIAL-FREQ-001` and a regression test. The profile does not assert tokenization, syllabification, pronunciation or IPA gold and does not change the runtime.


## Final exact-head continuation — 2026-11-13

- Branch head: `601cf85a5c740627848f9eff1fa1f0911cf03796`; base main: `dc90463bdd734867308f03cb627eb8941efc19d6`; main unchanged.
- PR #147: OPEN / DRAFT / mergeable, ahead / 0 behind (exact ahead count is maintained by PR #147), 29 files. PR #129: OPEN / DRAFT, untouched, 53 ahead / 17 behind, diverged/non-mergeable.
- Registry totals: 59 sources, 83 claims, 45 medial rows, 30 rules, 7 sandhi examples, 9 Okell orthographic profile rows.
- Okell corpus: 8,809,265 bytes; Zenodo MD5 matched; SHA-256 6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c; 21 BOM markers, one NUL, non-NFC, 67 numbered headings, repeated line/paragraph counts profiled. Remaining text-quality/provenance work is PARTIAL.
- Exact-head CI runs 43449980180 and 43449989336 SUCCESS: 222 Python + 66 subtests, 20 Node, 58 Playwright; build and generated freshness pass. IPA gold validator correctly reports zero adjudicated gold. Optional run 43449989348 SUCCESS; CRF remains unscored with zero gold and null accuracy; Epitran is raw-output-only.
- No audio, no runtime medial rules, no merge or release. Classification: PARTIAL PROTOTYPE, not release-ready.


## Full-text G2P and syllabification audit — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Thu et al. (2016) full-text benchmark audit | DONE_VERIFIED (methodology evidence) | 25,300 MLC dictionary words; 25,000 train, three 100-word open sets and 100-word closed set drawn from training. 2,393 graphemes, 1,864 pronunciations, 113 reported phonemes; romanized examples are not specified IPA. SCLITE phoneme-level Levenshtein PER on syllable-segmented words. Claims CLM-THU16-PER-001 and CLM-THU16-PHONESET-001. |
| Hlaing & Mikami (2014) orthographic FST paper | DONE_VERIFIED (structural evidence only) | New source HLAING_MIKAMI2014_FST; 11,732 MLC orthography words; 99.93% word-level orthographic segmentation, not G2P. Internal discrepancies: 32,238 vs 32,283 syllables; 8 vs 9 stacking errors. Claims CLM-HLAING14-ORTHOGRAPHIC-001 and CLM-HLAING14-METRIC-001. |
| Oo et al. (2020) text-side G2P full text | DONE_VERIFIED (architecture and source-specific phonology) | Thrax weighted FST graphemes→IPA; 34 consonants, 54 vowels; four-tone account; /N/ notation; Yangon recording location without explicit dialect label. Restricted web segmentation corpus and grammar-license uncertainty recorded. Claims CLM-OO20-TONE-001, CLM-OO20-NASAL-001, CLM-OO20-SEG-RESTRICTED-001, CLM-OO20-DIALECT-001. |
| Nishi (1998) Development of Voicing Rules PDF | DONE_VERIFIED | Full PDF retrieved and inspected; four new claims and corrected seven-row example/transcription provenance. No runtime rule activated. |
| Runtime promotion | DEFERRED / evidence gate | No new medials, tone, coda, /N/ or voicing rule activated. Independent expert-adjudicated IPA gold remains 0; empirical accuracy null. |

### Interpretation safeguards

- Thu et al.'s closed test overlaps training and cannot support independent accuracy claims.
- Thu et al.'s romanized phone strings are not project IPA.
- Hlaing & Mikami's 99.93% is orthographic word segmentation only.
- Oo et al.'s four-tone account is one source-specific model, not resolution of the four-vs-eight/register question.
- The phrase "open-source" in Oo et al. does not establish a separate license for the G2P grammar files.
- No audio was used.


## Nishi (1998) voicing paper — full text verified — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Nishi (1998), The Development of Voicing Rules in Standard Burmese | DONE_VERIFIED (full-text source evidence) | Full PDF from National Museum of Ethnology repository, DOI 10.15021/00004129, pp.253–260. Two synchronic sandhi patterns, four-stage historical account, optionality, exceptions and dialect comparison. |
| Example/transcription provenance reconciliation | DONE_VERIFIED | Nishi's notation follows Okell (1995), but footnote 3 says all examples are quoted from Okell (1969), §§17–20. Seven sandhi rows now record both layers; IPA values remain empty. |
| Atonicization versus voicing | DONE_VERIFIED (source claim) | Nishi says atonicization is unpredictable and sometimes optional and should not be stated with voicing sandhi. Preserve separate operations/conditions. |
| Runtime voicing promotion | DEFERRED / evidence gate | First pattern explicitly non-obligatory with variables/exceptions; Standard Burmese is heterogeneous; no independent modern Yangon adjudicated gold. |
| Nishi (1976/1977) Medials in Burmese full text | BLOCKED / source file not located | Bibliographic metadata and secondary citations found, but no complete primary text retrieved. Acceptance: inspect all pages, establish original edition/page numbering, and record direct evidence before updating medial rules. |
| Okell (1969) §§17–20 full text | BLOCKED / paywalled or preview-limited | Full book metadata and Google Books/National Library catalogue records found; no accessible complete text verified. Acceptance: inspect the actual cited sections and compare every sandhi example and exception directly. |

Four claims added: CLM-NISHI98-EXAMPLE-PROVENANCE-001, CLM-NISHI98-ATONICIZATION-001, CLM-NISHI98-DIALECT-PATTERNS-001, CLM-NISHI98-EXCEPTIONS-001. Registry totals: 60 sources, 96 claims; 30 phonological rules, 45 medial evidence rows, 7 source-phonemic sandhi examples and 9 orthographic-only Okell profile rows.

## Nishi (1997) orthographic-standardization paper — full text verified — 2026-11-13

Status: DONE_VERIFIED as historical orthographic evidence. Full PDF inspected (BNME 22(4), pp.975–999; DOI 10.15021/00004135). It distinguishes OWB, MWB, EModWB and ModWB; reports OWB -l replacement by -r/-v by initial class and later -y insertion after velars before written -i. It explicitly distinguishes written High and spoken Low varieties. The article focuses on rhyme systems and discusses initials only when necessary; it is not a comprehensive medial inventory or modern Unicode-to-IPA source. Added CLM-NISHI97-SCOPE-001. No runtime mapping activated.


## Duan & Zhu (2025) Burmese tone study — full-text audit — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Duan & Zhu (2025), *Double registers and eight tones in Burmese* | DONE_VERIFIED (FULL-TEXT SOURCE EVIDENCE ONLY) | Full 44-page article inspected from the Academia Sinica journal download page; *Language and Linguistics* 26(3), pp.387–430; CC BY 4.0. The authors propose four traditional tone classes split into eight yin/yang categories (1a–4a, 1b–4b), with modal and lower/breathy registers and pitch, phonation/register and length as dimensions. |
| Empirical sample and dialect scope | DONE_VERIFIED (SOURCE SAMPLE DESCRIPTION) | §1.2 p.392: five speakers aged 22–38, two from Yangon, two from Taunggyi and one from the Mandalay region; 89 words (80 monosyllabic, 9 disyllabic), each read twice; 694 valid word tokens. This is a mixed regional sample, not a Yangon-only sample. |
| Individual variation | DONE_VERIFIED (SOURCE EVIDENCE) | §5.3 Figure 7 and discussion report speaker variation, particularly in T1 and T3; preserve within-source variability rather than forcing one invariant pitch contour. |
| Runtime promotion / four-vs-eight reconciliation | PARTIAL / COMPETING ANALYSES | The paper advances an eight-category compound tone analysis, while Green and Oo et al. (2020) describe four categories. The new paper is a significant peer-reviewed competing analysis, not by itself a project-wide adjudication. No runtime tone model changed. |

Claims added: CLM-DUAN25-MODEL-001, CLM-DUAN25-SAMPLE-001, CLM-DUAN25-VARIATION-001. Existing DUAN2025 source record updated from abstract-only to full-text inspected. Review was text-only: no source recordings were accessed or analyzed. Independent project IPA gold remains 0; empirical G2P accuracy remains null.


## Okell (1999) Myanmar final and syllable-boundary proposal — full-text audit — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| ISO/IEC WG2 N2033, *Proposal for Extension of Myanmar Coded Set* | DONE_VERIFIED (FULL-TEXT ORTHOGRAPHIC EVIDENCE) | Full 18-page document inspected. Appendix 2 contains John Okell's 1999-05-11 research/chart of vowel-sign, tone-mark and final combinations. It separates the regular Burmese open/closed syllable system from added finals used for non-Burmese words and names. |
| Added finals and syllable-boundary method | DONE_VERIFIED (SOURCE EVIDENCE ONLY) | Okell reports that added finals may follow regular finals and tone marks, occasionally with two or three finals; enumerating possible syllable endings is insufficient for boundary detection, and he suggests identifying the beginnings of new syllables. This is a text-processing proposal, not a ready-made phonological syllabifier. |
| Open/closed syllable tone encoding | DONE_VERIFIED (ORTHOGRAPHIC EVIDENCE ONLY) | §§3–5 distinguish tone-mark arrangements in open and closed syllables; absence of an explicit mark has different interpretations in the two structures. This does not resolve the modern four-vs-eight tone analysis. |
| 94 MLCTS rime vendor audit | PARTIAL / PRIMARY-SOURCE EVIDENCE GATE | 94/94 non-empty source keys and MLCTS column values now match vendored Mya2Rom 0.4.4; 25 two-key collision groups are registered. This verifies vendor transcription fidelity, not the primary MLC table. Keep all Ukrainian candidates PROPOSED/EVIDENCE_LIMITED; complete primary-source and word-level adjudication before promotion. |

Claims added: CLM-OKELL99-ADDED-FINALS-001, CLM-OKELL99-SYLLABLE-BOUNDARY-001 and CLM-OKELL99-OPEN-CLOSED-TONE-ORTHOGRAPHY-001. Added regression coverage in `tests/test_source_rule_evidence.py`. Review used document text only; no audio.

Current registry totals after this update: **61 sources, 102 claims**, 30 phonological rules, 45 medial evidence rows, 7 source-phonemic sandhi examples and 9 Okell orthographic-profile rows. CSV validation and CI for this exact head are pending.


## Hill (2019) Burmese historical-phonology chapter — full-text access correction — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Hill (2019), Chapter 2: Burmese, pp.46–83 | DONE_VERIFIED (SECONDARY HISTORICAL ANALYSIS) | Full chapter text inspected from a third-party mirror; title, DOI, chapter pagination and bibliographic identity checked against Cambridge metadata. The mirror is not the publisher source; publisher copyright notice retained, no redistribution. |
| Old Burmese medials and Written Burmese scope | DONE_VERIFIED (SECONDARY SOURCE EVIDENCE) | §46: Old Burmese y-, r-, l-; -w- is derived from -o1- > -wa- and excluded from the historical medial inventory; limited double-medial evidence is noted but excluded from the figure. §47: Written Burmese is an idealized standard, not tied to one specific time/place; historical -l- merges with -y- after velars and -r- after labials. |
| Old Burmese tone notation | DONE_VERIFIED (SOURCE-SPECIFIC RECONSTRUCTION) | §46: Old Burmese does not regularly mark tones; Hill projects Written Burmese tone marking backwards for reconstruction. Do not mistake this analytical choice for regular attested Old Burmese tone marking. |
| Runtime promotion | DEFERRED / HISTORICAL ONLY | Use Hill to triangulate Nishi and other historical sources; no modern Unicode mapping or Yangon G2P rule is licensed. Nishi (1976) itself remains unread as a primary source. |

Claims added: CLM-HILL2019-OB-MEDIALS-001, CLM-HILL2019-WB-SCOPE-001, CLM-HILL2019-OB-TONE-001 and CLM-HILL2019-OB-ORTHO-CAUTION-001. Review was text-only; no audio. Current registry totals: **61 sources, 106 claims**, 30 phonological rules, 45 medial evidence rows, 7 source-phonemic sandhi examples and 9 Okell orthographic-profile rows.


## Primary-source access investigation: Okell 1969 and Nishi 1976/1977 — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Okell (1969), *A Reference Grammar of Colloquial Burmese* edition structure | DONE_VERIFIED (BIBLIOGRAPHIC METADATA) | Two-volume work confirmed independently by Glottolog, Open Library and Indiana University catalogue: vol.1 pp.xvii + 1–240; vol.2 pp.241–482 (482 numbered pages; 498 total physical pages). A reference-material guide describes vol.1 as “Sounds” and vol.2 as alphabetical particles/common words. Nishi (1998) cites the relevant examples to §§17–20. |
| Okell (1969) §§17–20 full text | BLOCKED (ACCESS) | National Library of Myanmar catalogue lists a PDF, but “View Resources” is paid. No open full text of §§17–20 was retrieved. Acceptance: inspect actual section pages, record examples/conditions and compare directly against Nishi 1998. Do not infer section contents from citations or catalogue metadata. |
| Nishi (1976/1977), *Medials in Burmese* archival locator | DONE_VERIFIED (PHYSICAL HOLDING DESCRIPTION) | Cornell University Library finding aid for Nicholas C. Bodman Papers, Collection 14-13-3031, Box 8 Folder 148, lists a July 1977 copy of “Medials in Burmese”, pp.41–52. This verifies an archival copy and pagination, not its contents or online access. |
| Nishi (1976) book chapter and 1977 journal reprint | DONE_VERIFIED (EDITION RECONCILIATION) | 1976 chapter in M. Hashimoto (ed.), pp.15–29; 1977 journal reprint in *Historical Science Reports of Kagoshima University* 26, pp.41–52. These are publication versions of the same study, not independent sources. |
| Nishi (1976/1977) full text | BLOCKED (PHYSICAL ACCESS REQUIRED) | No full text or scan found. Acceptance: request/consult Cornell Box 8 Folder 148 or locate a complete journal scan; inspect all 12 pages, verify page-by-page claims and distinguish original chapter pagination from reprint pagination. |

Claims added: CLM-OKELL1969-EDITION-STRUCTURE-001 and CLM-NISHI1977-ARCHIVAL-ACCESS-001. Source records updated with exact access limitations. Added regression test `test_okell_1969_edition_and_nishi_1977_archival_access_are_not_mistaken_for_full_text()`. No new linguistic rule or medial inventory claim was promoted. Current totals: **61 sources, 108 claims**, 30 phonological rules, 45 medial evidence rows, 7 source-phonemic sandhi examples and 9 Okell orthographic-profile rows. Review remained text-only; no audio.


## Mya2Rom 0.4.4 — complete 94-key vendor audit and MLCTS collision analysis — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Inventory-to-vendor fidelity | DONE_VERIFIED (SOURCE-CODE MATCH) | All **94/94 non-empty** Myanmar keys in `data/burmese/romanization_rimes_inventory.csv` match the vendored Mya2Rom 0.4.4 `vowels` object; all 94 MLCTS values match array column 2 (index 1). The upstream object has 95 keys including an empty-key fallback, intentionally excluded from the 94-row inventory. Vendored `romanisations.js` is byte-identical to upstream master at review. |
| MLCTS-to-source invertibility | PARTIAL / NON-INJECTIVE | **25 MLCTS collision groups**, each mapping two different Myanmar keys to the same MLCTS string. Added `data/burmese/romanization_rime_collisions.csv`. Preserve the Myanmar key; do not reverse-map a Latin MLCTS string to a unique source spelling. Collisions alone do not establish homophony or interchangeable spelling. |
| MLCTS vs MLCTS2 identity | DONE_VERIFIED (VENDOR DOCUMENTATION) | Upstream README distinguishes MLCTS (orthographic) from MLCTS2 (modified, more phonetic, reported as used by the MLC Myanmar-English Dictionary and SEAlang). The project's 94-row table uses the MLCTS column, not MLCTS2. Mya2Rom itself says its expanded tables also draw on Wikipedia and Wiktionary, so it is not a primary MLC publication. |
| Special auk-myit key | PARTIAL / CONTEXT-DEPENDENT | Upstream comments identify the standalone key `့` as an auk-myit-induced creaky-tone provision; the algorithm applies it in syllable matching. Its row now warns that this is not an independent vowel or coda. Do not treat it as a regular rime or infer a free-standing Ukrainian syllable. |
| Primary MLC written-source adjudication | BLOCKED / EVIDENCE GATE | Vendor fidelity is now verified, but the original MLC primary transcription table and every orthographic/rime distinction have not been checked against a primary MLC source or word-level dictionary entries. Acceptance: locate the actual MLC system tables and representative written dictionary entries for each collision group; reconcile orthographic variants, asat, anusvara, tone marks, and special cases. Keep all 94 Ukrainian candidates PROPOSED / EVIDENCE_LIMITED until that work and target-language adjudication are complete. |

Added claims: CLM-MYA2ROM-RIME-EXACT-MATCH-001, CLM-MYA2ROM-MLCTS-COLLISIONS-001, CLM-MYA2ROM-MLCTS-VS-MLCTS2-001 and CLM-MYA2ROM-AUKMYIT-FALLBACK-001. Added a machine-readable 25-group collision audit and regression tests for 94/94 vendor fidelity, collision preservation and the special auk-myit key. No runtime phonological or transcription rule was changed. Current totals: **61 sources, 112 claims**, 30 phonological rules, 45 medial evidence rows, 7 sandhi examples and 9 Okell orthographic-profile rows. No audio was accessed.


## Exact-head verification after 94-key MLCTS audit — 2026-11-13

- Final verified code/data head: `3ab1fb3d4359ede4f9f98ea02b608354268eeef1` on `research/burmese-medials-g2p-evidence-2026-11-13`.
- Main baseline remains `dc90463bdd734867308f03cb627eb8941efc19d6`; branch comparison: **270 commits ahead, 0 behind**. PR #147 remains OPEN / DRAFT / mergeable, 32 changed files; not merged. PR #129 remains untouched. No release or deployment published.
- Main CI run **43477600192**: SUCCESS. Python **228 passed + 66 subtests passed**; Node **20 passed, 0 failed**; Playwright **58 passed**; IPA-gold validator completed with `NOT_READY_NO_ADJUDICATED_GOLD`; package installation, production build, generated-data freshness and Chromium installation passed.
- Duplicate push-triggered CI run **43477590198** also completed successfully. Optional raw-output diagnostics **43477600305** completed successfully; diagnostics are not an accuracy benchmark.
- `npm install` reports **1 high-severity vulnerability**. No `npm audit fix --force` or broad dependency upgrade was applied. Separate dependency review remains required.
- Final registry totals: **61 sources, 112 claims**, 30 phonological rules, 45 medial evidence rows, 7 sandhi evidence rows, 9 Okell orthographic-profile rows; 94 vendor rime keys, 25 MLCTS collision groups. All Ukrainian rime candidates remain PROPOSED / EVIDENCE_LIMITED. No runtime phonological rule changed in this continuation.
- Earlier CI attempt failed only because the newly qualified auk-myit note no longer contained the existing vendor-provenance phrase expected by a test. The note was corrected without removing the linguistic caveat; exact-head CI above passed afterward.
- Repository remains a **PARTIAL PROTOTYPE**: primary MLC rime source, Okell §§17–20, Nishi 1976/1977 full text, independent modern Yangon IPA gold (0), tone model reconciliation and /N/ surface analysis remain open.


## Burmese MLCTS collision lexical evidence — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLCTS-COLLISION-LEXICAL-001 | PARTIAL | 25-row ledger added. The am pair has a secondary rhyme-table parallel (ကမ်/ကံ: /kàɴ/, MLCTS kam). The any pair has a secondary-table discrepancy (ကဉ်: kañ‘ vs ကည်: kany) against the vendor's shared any mapping. | Secondary table only. No primary MLC entry pairs verified. No vendor table correction, runtime mapping, or Ukrainian candidate promotion until MLC primary evidence is checked. |
| BURMESE-MLC-DICTIONARY-ACCESS-001 | BLOCKED / ACCESS | SEAlang metadata confirms the 1993 MLC dictionary basis and 1986 standard orthography. Direct live dictionary retrieval timed out; Firecrawl retrieval could not run because connected-service credits were exhausted. | Obtain accessible MLC primary table/dictionary entry text and record entry locators for all 25 groups; confirm the exact transcription field (MLCTS vs MLCTS2) before using it. |

Evidence source WIKTIONARY_BURMESE_TRANSLITERATION_2026; claims CLM-WIKT-RIME-AM-001 and CLM-WIKT-RIME-ANY-001. Totals: 62 sources / 114 claims. The 94 Ukrainian candidates remain PROPOSED / EVIDENCE_LIMITED; independent adjudicated IPA gold remains 0; accuracy remains null. No audio used.


## Secondary-source reconciliation — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLCTS-NASAL-FINALS-002 | PARTIAL — SECONDARY SOURCE AGREEMENT | Wikipedia's MLC-system summary lists shared -any, -am and -um mappings for the respective final pairs. Wiktionary's detailed rhyme examples agree for am and um, but differ for any. | This does not replace the original MLC publication or word-level MLC dictionary entries. Keep any conflict unresolved. |
| BURMESE-MLC-PRIMARY-TRANSCRIPTION-001 | BLOCKED / PRIMARY SOURCE | Original MLC system table and direct SEAlang dictionary entries were not retrieved. | Verify actual MLC table and representative entries, then resolve the any discrepancy and all remaining collision groups. |

Current ledger: 63 sources / 115 claims; 25 collision groups; 21 unadjudicated, 2 secondary-equivalence, 1 secondary-conflict, 1 special non-rime. No runtime change; no Ukrainian candidate promotion; no audio.


## Exact-head verification — MLCTS lexical audit (2026-11-13)

- Tested code/data snapshot: 46b7da6afd7ecc94e4dcac87c7f759132c74bc6b; research branch remains based on main dc90463bdd734867308f03cb627eb8941efc19d6.
- CI run 43491799213 SUCCESS: 229 Python tests passed + 66 subtests; 20 Node tests passed; 58 Playwright tests passed; production build, generated-data freshness, dependency install and Chromium install passed. Gold schema validator runs successfully but reports NOT_READY_NO_ADJUDICATED_GOLD (0 adjudicated records).
- Optional diagnostic run 43491799196 SUCCESS; outputs are not scored against independent gold and must not be represented as accuracy.
- npm install reports 1 high-severity vulnerability; dependency review remains open.
- Registry: 63 sources / 115 claims; 25 collision groups; lexical audit partition 21 unadjudicated / 2 secondary-equivalence / 1 secondary-source conflict / 1 special non-rime.
- No audio, runtime mapping changes or Ukrainian candidate promotions. Repository remains a PARTIAL PROTOTYPE.



## MLCTS primary-source provenance check — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLCTS-PRIMARY-SOURCE-PROVENANCE-002 | PARTIAL — SECONDARY PROVENANCE ONLY | Ohnmar Htun (2013), §5.1.2.3 p.80, identifies MLCTS [1980] and gives three examples; bibliography [47] p.122 cites the Wikipedia overview accessed 2012-10-12, not a directly identified MLC primary publication. | Do not treat the dissertation as the original specification. Obtain the MLC table itself and verify its exact edition, table rows and publication provenance. |
| BURMESE-ALA-LC-SYSTEM-SEPARATION-001 | DONE_VERIFIED | LOC's 2011 Burmese Romanization Table is explicitly a Library of Congress ALA-LC table and is recorded separately from MLCTS. | Keep ALA-LC correspondences out of MLCTS adjudication; use only for system comparison where explicitly labelled. |
| BURMESE-MLC-PRIMARY-TRANSCRIPTION-001 | BLOCKED / PRIMARY SOURCE | No direct MLC 1980 transcription table or word-level MLC dictionary entries were recovered in this pass. | Inspect primary MLC table and representative entries for all collision groups; distinguish MLCTS from MLCTS2 before adjudication. |

Registry now contains **66 nonblank source records / 118 claims**. No MLCTS/vendor correction, runtime mapping, IPA gold annotation or Ukrainian candidate promotion was made. No audio used.

## Registry count reconciliation — 2026-11-13

A fresh parse of the current CSV registries, counting only nonblank source rows and requiring unique IDs, finds **66 source records and 117 claim records**. The previous continuation note's 65-source count was one too low; the current source registry contains 66 nonblank IDs. Two pre-existing blank CSV records in `sources.csv` are ignored for this count. All 117 claim IDs are unique and every claim's `source_id` resolves to a registered source. The two new provenance records and claims are included in these totals.

A regression test now protects the distinction between the Htun secondary provenance trail and the LOC ALA-LC table. Test/CI status for the final code-bearing commit is pending verification; no local checkout was available in this connector session.

## MLC dictionary bibliographic cross-check — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLC-DICTIONARY-BIBLIOGRAPHY-003 | PARTIAL — BIBLIOGRAPHICALLY CORROBORATED | Unicode Consortium's Other Script Sources bibliography lists the 1993 Myanmar-English Dictionary as compiled and edited by MLC, alongside a 1996 Myanmar orthography treatise. | This is bibliographic confirmation only. Obtain and inspect the actual MLC dictionary entries and identify the transcription field before using any values. |

Registry totals: **66 nonblank source records / 118 claims**. A regression test protects the source record and the limitation that this bibliography does not expose entry text or transcription values.

## Final verification boundary for this continuation — 2026-11-13

- Registry parse on the current branch: **66 nonblank source records / 118 claim records**; all IDs unique, all row widths conform to their CSV headers, and every claim source reference resolves. Two blank CSV records are ignored by the count.
- The provenance regression test was added to `tests/test_romanization_rime_inventory.py`. The GitHub connector exposed no workflow runs and no commit status checks for final code/documentation head `caf66d5a6b58522ca33715654c38b075c1d1fc21`; therefore this latest test change is **NOT YET CI-VERIFIED**. Earlier successful CI on prior code/data head `46b7da6afd7ecc94e4dcac87c7f759132c74bc6b` does not cover this added test.
- No local checkout or local Python test execution was available. Do not claim the new test passed.

## MLC dictionary physical-access leads — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLC-DICTIONARY-ACCESS-ROUTE-004 | PARTIAL — PHYSICAL ACCESS LOCATED | WHO Myanmar Library record 487 lists an available 1993 MLC dictionary copy (635 pages); NDL record 000003254368 lists the 1996 Dunwoody reprint at Tokyo Main and Kansai-kan and a cooperating Japanese library. | Catalogue holdings are not text access. Obtain authorized consultation or page-level copies, then record exact entries and MLCTS/MLCTS2 field semantics. |

Registry totals: **68 nonblank source records / 120 claims**. The new regression assertions verify the two catalogue records while explicitly rejecting any inference that the contents have been inspected.

## MLC dictionary transcription-purpose evidence — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLC-DICT-TRANSCRIPTION-FIELD-005 | PARTIAL — PURPOSE CLUE ONLY | A 1996 Burma Debate notice says the MLC dictionary uses a transcription system to help English speakers pronounce entries. | The notice does not name MLCTS or MLCTS2. Inspect the dictionary's own front matter and representative entries before classifying its transcription field. |

Registry totals: **69 nonblank source records / 121 claims**. No transcription system was inferred from the advertisement.

## Final exact-head CI — provenance and registry tests (2026-11-13)

Code/test head **508816dcddf22272e98647625b657bc79712817e** completed required CI successfully:
- Workflow **43496624771**: SUCCESS.
- Python: **231 passed + 66 subtests passed**.
- Node: **20 passed, 0 failed**.
- Playwright: **58 passed**.
- Chromium install: PASS.
- Production build: PASS.
- Generated web-data freshness: PASS.
- IPA-gold validator: executed successfully, but reports **0 records / 0 annotations / 0 adjudicated records** and `NOT_READY_NO_ADJUDICATED_GOLD`; this is a data-readiness blocker, not a validator failure.
- Optional diagnostics workflow **43496624752**: SUCCESS for raw-output and CRF-baseline jobs. These remain diagnostics only, not scored accuracy.
- `npm install` still reports **1 high-severity vulnerability**; no forced dependency upgrade was made.
- Source registry integrity rechecked: **69 nonblank sources / 121 claims**, unique IDs, valid CSV row widths and all claim-to-source references resolve.
- The latest changes after code/test head are documentation-only. Final branch tip will be recorded after this handoff update.

## MLCTS/modified-column distinction — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLCTS2-COLLISION-CROSSWALK-006 | DONE_VERIFIED — VENDOR-DERIVED ONLY | Added a 25-row crosswalk comparing the MLCTS collision groups with Mya2Rom v0.4.4 third-column values. 21 pairs have the same value; four groups differ: any, any:, any., ui. A regression test compares every row to the vendored array. | This is implementation provenance, not MLC primary evidence. Do not promote lexical equivalence, pronunciation or Ukrainian output until dictionary entries / independent phonological evidence are inspected. |
| BURMESE-MLCTS2-NAMING-RECONCILIATION-007 | DONE_VERIFIED — SOFTWARE DOCUMENTATION SCOPE | README/API calls the third mode mlcts2; the implementation indexes array column 2; romanisations.js labels the column MLCTS-SL. The discrepancy is now explicit in source claims and tests. | Keep both names in provenance; do not silently relabel the upstream source table or infer that it is a separate system. |
| BURMESE-MOW-MLCTS2-RESOURCE-008 | PARTIAL — SECONDARY RESOURCE | MOW v0.1.2 documents MLCTS and MLCTS 2 romanized search variants; v0.1.3 is CC BY 4.0. | The small semantic wordnet can support lexical lookup and variant discovery, not primary MLC table adjudication or a pronunciation gold set. |

Registry totals: **70 nonblank source records / 123 claims**. The crosswalk test is added; CI status for this latest code/test commit is pending.

## Earlier MLC Concise Dictionary — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLC-CONCISE-DICTIONARY-ACCESS-009 | PARTIAL — PRIMARY WORK IDENTIFIED, CONTENT NOT INSPECTED | Allott 1985 reports five parts published 1978-1980 and says the work gives pronunciations; Okell 1982 bibliography identifies a five-volume Rangoon edition from Mranmācā Aphwai. | Locate an authorized physical or digital copy. Inspect title pages, pronunciation key and entries. Do not assume its pronunciation notation is MLCTS or MLCTS2. |

Registry totals: **72 nonblank sources / 125 claims**; source IDs and claim IDs unique, all claim source references resolve, and CSV widths validate.

## Complete Mya2Rom vendor-system inventory — 2026-11-13

- Added `data/burmese/romanization_rimes_vendor_systems.csv`, a 94-row companion inventory that records the exact vendor IPA, MLCTS, modified MLCTS/MLCTS2, Simple and Simple2 values for every non-empty rime key. It is separate from the Ukrainian candidate inventory and does not change runtime behaviour.
- All 94 source keys are present in the vendored Mya2Rom table. The only key whose array has four values rather than five is `ေါင်း`: its Simple2 value is not provided by the upstream array. This missing value is recorded as missing, not guessed.
- Added regression coverage that parses the vendored JS array and compares all 94 rows/columns, while preserving the evidence boundary that these are vendor mappings, not a primary MLC table or independent IPA gold.
- Registry remains **72 nonblank sources / 125 claims**; no new source claim was needed because this artifact is a deterministic extraction of already registered Mya2Rom v0.4.4.
- Exact-head CI for this latest added full crosswalk test is pending.

## Full crosswalk exact-head CI result — 2026-11-13

Code/test commit **c35a7ae0255725aa85cf5f836c64b4ed1fa5b731** completed required CI successfully:
- Workflow **43498396994**: SUCCESS.
- Python: **233 passed + 66 subtests passed** (includes full 94-key and 25-collision crosswalk checks).
- Node: **20 passed, 0 failed**.
- Playwright: **58 passed**; Chromium installation passed.
- Production build: PASS.
- Generated web-data freshness: PASS.
- IPA-gold structural validator executed, but gold remains **NOT_READY_NO_ADJUDICATED_GOLD** (0 independent adjudicated records); successful execution is not evidence that a gold set exists.
- `npm install` still reports **1 high-severity vulnerability**. No dependency force-upgrade was made.
- Latest branch changes after the tested code commit are documentation-only.

## Branch/PR reconciliation after crosswalk work — 2026-11-13

- Dedicated branch: `research/burmese-medials-g2p-evidence-2026-11-13`; current branch comparison before this documentation update: **351 commits ahead of main / 0 behind**.
- PR **#147** remains **OPEN / DRAFT / mergeable**, unmerged; 35 changed files at this checkpoint. Main was not modified.
- PR #129 remains untouched because it was previously found divergent and not mergeable; PR #146 remains merged.
- Latest required CI is green on code/test commit `c35a7ae0255725aa85cf5f836c64b4ed1fa5b731` (run 43498396994). Optional raw-output diagnostic passed; optional CRF-baseline job is still in progress and is not an acceptance benchmark.
- Current source registries: **72 sources / 125 claims**, all IDs unique, CSV widths valid and all claim-to-source references resolve.
- Release readiness remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**: primary MLC source text, independent IPA gold, tone/prosody model validation and npm high-severity dependency finding remain unresolved.

## MOW orthographic lemma coverage — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MOW-RIME-LEXICAL-COVERAGE-010 | DONE_VERIFIED — ORTHOGRAPHIC STRING MATCH ONLY | Official MOW v0.1.3 CC BY 4.0 lemma release; 1,476 lemma rows / 1,041 distinct forms. Added 50-unit summary and 508 unit/lemma hits (442 distinct forms, 547 synsets); both sides occur for 11/25 collision groups, one side for 13/25, neither for 1/25. Regression tests validate table consistency and scope. | Exact word-final substring matches only. No syllabification, pronunciation, MLCTS primary adjudication or homophony claim. Do not promote runtime or Ukrainian outputs. |
| BURMESE-MLCTS-COLLISION-LEXEME-ADJUDICATION-011 | TODO — PRIMARY DICTIONARY / PHONOLOGICAL EVIDENCE | MOW gives orthographic search leads but no pronunciations. | Use these lemmas to locate candidate entries in MLC primary dictionaries; inspect entry headwords and pronunciation key. Confirm exact lexical pairs and pronunciation independently before changing the 25-group ledger. |

The collision-ledger statuses are unchanged: 21 unadjudicated, 2 secondary equivalence, 1 secondary-source conflict, 1 special non-rime. Registry totals: **73 nonblank sources / 126 claims**.

## Reproducible MOW orthographic coverage audit — 2026-11-13

- Vendored the exact upstream MOW v0.1.3 TSV at `data/burmese/external/mow-0.1.3-mya_20171005165336.tab`; its original header is preserved: `## MOW 0.1.3 / mya / CC BY 4.0`. Source ID **MOW_2017_0_1_3_DATASET** and claim **CLM-MOW-ORTHOGRAPHIC-RIME-COVERAGE-001** were added in the concurrent continuation commits already on this branch.
- Added deterministic stdlib-only generator `scripts/analyze_mow_orthographic_rime_coverage.py` with `--check` mode, plus generated files `mow_rime_orthographic_matches.csv` (508 exact source-unit/lemma pairs) and `mow_rime_orthographic_coverage.csv` (50 source-unit rows).
- Recomputed results from the vendored file: 1,476 MOW `mya:lemma` rows, 1,041 distinct lemma forms, 1,198 synsets; 508 suffix-match pairs across 35/50 source-unit variants; 442 distinct matched lemmas and 547 distinct matched synsets. For the 25 collision groups: both variants occur in 11 groups, one side in 13, neither in 1.
- These are exact Unicode orthographic suffix matches, not Burmese syllabification or pronunciation. They do not confirm homophony, MLCTS equivalence, MLC system correctness, or Ukrainian outputs. The generator/test preserve this limitation. The raw upstream license header and source attribution are retained.
- Added two tests: source/license header preservation and reproducible output/count/evidence-boundary validation. Exact-head CI pending.

### Schema-gate correction for MOW dataset-derived claim — 2026-11-13

The first CI attempt after registering the MOW orthographic coverage claim (workflow 43499220650) correctly rejected the locally invented evidence status `DATASET_DERIVED`, because the canonical claim schema does not allow that value. The claim was corrected to the existing schema-supported status `ANALYSIS_DEPENDENT` (commit 5e12f86e21f5576efee44afe84f80759e3799a9e); its scope remains orthographic suffix analysis only. The subsequent exact-head workflow is running with the schema correction, canonicalized test placement and reproducible generator check.

## Final MOW reconciliation and remaining SEAlang access blocker — 2026-11-13

| ID | Status | Evidence | Acceptance criterion |
|---|---|---|---|
| BURMESE-MOW-CANONICAL-GENERATOR-013 | DONE_VERIFIED | The repository's canonical Python generator and vendored CC BY 4.0 MOW release produce the committed 508-pair / 50-unit orthographic coverage outputs. The test suite runs generator `--check`; duplicate parallel exports and duplicate test module were removed. | Keep one canonical generator/output path. Treat results only as orthographic suffix search leads. |
| BURMESE-SEALANG-ENTRY-ACCESS-014 | BLOCKED — SERVICE RETRIEVAL | SHACHI/SEAlang metadata and the 2008 interface description establish an MLC 1993 dictionary derivative, IPA search/display capability and project-level permission; direct Burmese dictionary/API requests timed out or returned 502/400-timeout, and no entry text was retrieved. | Retrieve actual entries for selected MOW lemma leads with headword, dictionary transcription and IPA fields; record exact source locators and adjudicate against the MLC dictionary/primary key. Interface screenshots and metadata alone do not satisfy this. |

Exact code/test head **c76fab9e4e4a910170a26dd8ed89a95790c7973d**: CI runs 43499475187 and 43499485256 SUCCESS — 236 Python + 66 subtests, 20 Node, 58 Playwright; build and generated-data freshness PASS. IPA gold remains NOT_READY_NO_ADJUDICATED_GOLD. npm install still reports one high-severity vulnerability. Registry: 73 sources / 126 claims.

## MOW reproducibility and schema-corrected exact-head CI — 2026-11-13

- The MOW-derived claim status was changed from unsupported `DATASET_DERIVED` to schema-supported `ANALYSIS_DEPENDENT`; the scope remains the same orthographic string-match analysis.
- Required CI on code/test head `c76fab9e4e4a910170a26dd8ed89a95790c7973d`, workflow **43499485256**, completed **SUCCESS**:
  - Python: **236 passed + 66 subtests passed** (includes MOW generator `--check`, dataset/license guard, crosswalks and schema validation).
  - Node: **20 passed, 0 failed**.
  - Playwright: **58 passed**; Chromium install passed.
  - Production build and generated web-data freshness: PASS.
  - `npm install`: **1 high-severity vulnerability** remains.
- Optional diagnostics workflow **43499220654**: both raw-output and CRF-baseline jobs passed. They remain raw diagnostic artifacts, not an accuracy score or evidence for Ukrainian output.
- The generated MOW pair/coverage files are reproducible from the vendored CC BY 4.0 TSV using the stdlib script; test checks committed artifacts against regenerated output.

## Latest branch state after MOW coverage completion — 2026-11-13

- Final documentation/PR-body checkpoint before this note: branch `research/burmese-medials-g2p-evidence-2026-11-13`, **395 commits ahead of main / 0 behind**; PR #147 **OPEN / DRAFT / mergeable**, 39 changed files. The branch remains unmerged; main is unchanged.
- Required CI run **43499485256** passed on code/test commit `c76fab9e4e4a910170a26dd8ed89a95790c7973d`: 236 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium installation passed. Optional raw-output + CRF diagnostic jobs both passed in run **43499485104**.
- The earlier schema failure was only the unsupported claim status `DATASET_DERIVED`; corrected to `ANALYSIS_DEPENDENT`, and the full schema-validation suite passed on the rerun.
- Registry: **73 sources / 126 claims**, unique IDs, valid CSV widths and all claim-to-source references resolved.
- Remaining blockers unchanged: inspect primary MLC dictionary/MLCTS source pages; independently adjudicate IPA gold and tone/prosody; resolve one high-severity npm finding. Project remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**.

## SEAlang API request-pattern lead — 2026-11-13

- Added **SEALANG_SHORTCUT_2022** and **CLM-SEALANG-API-REQUEST-PATTERN-001**. A third-party open-source Burmese shortcut constructs dictionary requests using `http://sealang.net/api/api.pl?service=dictionary&lang=burmese&query=<word>`; the source code also distinguishes the dictionary `query` parameter from the Google `text` parameter.
- This corrects the request template for future attempts, but it does not prove the endpoint is currently available or expose the response schema. Exact request attempts through the web reader still returned 502/inaccessible; Firecrawl could not run because its connected account had exhausted credits. No dictionary entry text was retrieved and no transcription field was adjudicated.
- Added a regression assertion for the API pattern and its limitation. Registry now contains **74 sources / 127 claims**; all IDs remain unique, CSV widths valid and claim source references resolve.
- Next access attempt should use the exact lowercase `lang=burmese` parameter and test the endpoint from a permitted browser/client when connectivity is available; do not treat the third-party wrapper as an authoritative API specification.

## R12A secondary phonological crosswalk and final CI — 2026-11-13

- Reviewed the existing 25-row `romanization_rime_r12a_secondary_phonology_crosswalk.csv` against the current R12A public page. It distinguishes the `any`, `any:` and `any.` groups: the ဉ-series is nasalised (IPA values use archiphoneme `N`), while ည်-series has three non-nasal outcomes. It also gives 18 same-value groups, two partial-coverage groups (`ui`, `un`), one unlisted group (`a.`) and the special non-rime `u.` fallback.
- This strengthens the secondary evidence that the any-series is not a single phonological value, but it does not resolve the MLCTS orthographic collision or replace the MLC primary table. R12A explicitly does not account for vowel reduction and cites secondary phonology sources; no runtime, IPA gold or Ukrainian candidate was changed.
- Latest code/test head `1f6f6a33c1a7c783e921bcf5edada4f05cfa3c6d`, required CI **43500600771 SUCCESS**: **237 Python + 66 subtests**, **20 Node**, **58 Playwright**; Chromium, build and generated-data freshness passed. `npm install` still reports **1 high-severity vulnerability**.
- Optional diagnostics **43500600533 SUCCESS**: raw-output and CRF diagnostic jobs passed; not an accuracy benchmark.

## Latest R12A + SEAlang checkpoint — 2026-11-13

- Registry now contains **75 sources / 128 claims**, including the R12A secondary orthography notes and third-party SEAlang API request-pattern source; all IDs are unique, all CSV widths valid and every claim source reference resolves.
- Branch comparison at this checkpoint: **414 ahead of main / 0 behind**. PR #147 remains **OPEN / DRAFT / mergeable**, unmerged. No main changes or release publication.
- Required CI on latest code/data commit `1f6f6a33c1a7c783e921bcf5edada4f05cfa3c6d`, run **43500600771**, passed: 237 Python + 66 subtests, 20 Node, 58 Playwright, build and generated-data freshness. Optional raw-output/CRF diagnostics run **43500600533** also passed, diagnostic-only.
- One high-severity npm vulnerability remains; primary MLC dictionary transcription field and independent IPA gold remain blocked.
- R12A source and claim are registered as **R12A_BURMESE_ORTHOGRAPHY_2026 / CLM-R12A-RIME-CROSSWALK-2026-001**. Final registry totals after this addition: **75 sources / 128 claims**; source IDs and claim IDs are unique, all claim→source references resolve, and CSV row widths validate.

## MLC 1986 orthography standard — Unicode WG2 corroboration — 2026-11-13

- Added **UNICODE_N2827_MYANMAR_SEMIVOWELS_2004** and claim **CLM-UNICODE-N2827-MLC-MEDIALS-001**. This 2004 national contribution from the Myanmar Unicode and NLP Research Center to ISO/IEC JTC1/SC2/WG2 states that the MLC published *Myanmar Orthography* in October 1986 and that the Ministry of Education prescribed it as the national standard. It describes four basic medial signs and combinations totalling eleven symbols, and explains that medials change pronunciation and are structurally distinct from stacked consonants.
- This is useful documentary evidence for the structural-analysis stage of the pipeline, but it is not the MLC book itself and contains no MLCTS/IPA rime transcription table. The original 1986 orthography book remains uninspected.
- Added a regression assertion that protects the structural-only evidence boundary. Registry totals: **76 sources / 129 claims**; IDs unique, CSV widths valid, all claim source references resolve. Exact-head CI pending.

## MLC 1986 orthography book access — 2026-11-13

| ID | Status | Evidence | Acceptance criterion |
|---|---|---|---|
| BURMESE-MLC-1986-ORTHOGRAPHY-ACCESS-015 | BLOCKED — CATALOG PAGE / PDF NOT RETRIEVED | National Library of Myanmar E-Resources record 189 lists the MLC 1986 second edition, 292 pages, with a PDF option; this aligns with Unicode WG2 N2827's reference to the October 1986 national orthography standard. The bibliographic page returned 502; no book content was inspected. | Retrieve the listed PDF or an authorized scan. Inspect title page, foreword, structural orthography sections and any pronunciation/transcription tables. Confirm whether this is the exact work cited by N2827; do not infer MLCTS/IPA from the catalog metadata. |

Registry totals after registering the catalog lead: **77 sources / 130 claims**, unique IDs and all claim source references valid. CI on test-bearing head `a824fe13c3671b5f02d37c3dc9127ffc460ac1a8` pending.

## Partial primary scan of the 1986 Myanmar Spelling Dictionary — 2026-11-13

- Added **UNICODE_L2_2010_MLC_SPELLING_1986** and **CLM-UNICODE-L2-2010-MLC-SPELLING-SCAN-001**. Unicode WG2 paper L2/10-360 identifies a *Myanmar Spelling Dictionary* published in 1986 and reproduces an image of original page 1, headed “Characters pronunciation List”, plus images of pages 2-9. The explanatory note says the character pronunciation list corresponds to a Myanmar Language Character Map and discusses sorting.
- This is the first directly viewable partial scan of a 1986 Myanmar spelling reference found in this pass. It is not a complete book; the visible tables are orthographic character/pronunciation-list material, not an MLCTS/IPA rime table or word-level dictionary entries. Its identity with the MLC *Myanmar Orthography* in N2827 and National Library record 189 remains unconfirmed.
- The National Library of Myanmar E-Resources catalog record 189 separately lists the MLC 1986 orthography book as a second edition, 292 pages, with a PDF option; the catalog page itself timed out. The Unicode partial scan is a concrete additional source lead but does not clear the primary transcription evidence gate.
- Added regression assertions for the partial-scan status and non-MLCTS/IPA boundary. Registry totals: **78 sources / 131 claims**; IDs unique, CSV widths valid, and all claim→source references resolve.

## 1986 source access lead and exact-head verification — 2026-11-13

- National Library of Myanmar catalog record 189 lists the MLC 1986 orthography work as a second edition, 292 pages, with a PDF option. Unicode WG2 L2/10-360 separately provides a partial scan of a 1986 *Myanmar Spelling Dictionary* (original pages 1-9, including a “Characters pronunciation List”). Their exact bibliographic identity is not confirmed; the catalog page timed out.
- The partial scan is orthographic character/pronunciation-list material, not an MLCTS/IPA rime table or word-level dictionary. No transcription field or candidate pronunciation was inferred.
- Required CI on code/test commit `8e8448b70549062636c3f1c539ee1010f93a86cb`, workflow **43501650235**, completed **SUCCESS**: **241 Python + 66 subtests**, **20 Node**, **58 Playwright**; Chromium, production build and generated-data freshness passed. Optional raw-output/CRF diagnostics **43501650409** passed but are not accuracy scores.
- Registry: **78 sources / 131 claims**, unique IDs, valid CSV widths and all claim source references resolve. One high-severity npm vulnerability remains; IPA gold is still `NOT_READY_NO_ADJUDICATED_GOLD`.
- Branch comparison at the preceding checkpoint: **440 ahead / 0 behind**. PR #147 remains open, draft, mergeable and unmerged; main unchanged.

## Final checkpoint — 2026-11-13

- Dedicated branch `research/burmese-medials-g2p-evidence-2026-11-13`: **445 commits ahead of main / 0 behind**. PR **#147** is **OPEN / DRAFT / mergeable**, unmerged; 40 changed files. PR #129 remains untouched (divergent/non-mergeable at last review); PR #146 remains merged. Main and release state unchanged.
- Latest required CI on code/test head `8e8448b70549062636c3f1c539ee1010f93a86cb`, run **43501650235 SUCCESS**: **241 Python + 66 subtests**, **20 Node**, **58 Playwright**, Chromium, production build and generated-data freshness all passed. Optional diagnostics **43501650409 SUCCESS** (raw-output + CRF; not an accuracy score).
- Source registries: **78 sources / 131 claims**, all IDs unique, valid row widths, all source references resolve.
- Remaining blockers: obtain and inspect complete MLC orthography/1993 dictionary contents and identify the exact transcription field; adjudicate the 25 collision groups from primary lexical evidence; build independent IPA gold and validate tone/prosody; resolve one high-severity npm vulnerability. Status remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**.

## MLC medial structural parser coverage — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MLC-MEDIAL-STRUCTURAL-PARSER-016 | DONE_VERIFIED — ORTHOGRAPHIC_ONLY | `tests/test_parser.py::test_mlc_medial_inventory_is_parsed_structurally_without_phonetic_guessing` covers all 11 MLC medial forms (4 basic + 5 pairs + 2 triples), preserving ordered medial IDs in one syllable and asserting no IPA/phonology assignment. Exact-head CI 43502733106 SUCCESS: 242 Python + 66 subtests, 20 Node, 58 Playwright; build and generated-data freshness pass. | Structural parser regression only. All medial phonological rules remain withheld pending source-specific onset × rime × prosody evidence and adjudicated IPA gold. |

Project status remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**: IPA gold is not ready and one high-severity npm vulnerability remains.

## MOW orthographic lexical coverage — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MOW-ORTHOGRAPHIC-COVERAGE-017 | DONE_VERIFIED — ORTHOGRAPHIC_SUFFIX_ONLY | Generator `scripts/analyze_mow_orthographic_rime_coverage.py`, two committed CSV outputs, reproducibility `--check` test. 508 source-unit/lemma pairs, 50 source-unit rows; 11 collision groups both sides found, 13 one side, 1 neither. Exact-head CI 43503144848 SUCCESS: 242 Python + 66 subtests, 20 Node, 58 Playwright, build and generated-data freshness pass. | Do not treat suffix matches as syllable segmentation, pronunciation, MLCTS correctness or homophony. MOW is not exhaustive; absence is not evidence of nonexistence. Primary MLC lexical and pronunciation evidence is still required. |

Project remains PARTIAL PROTOTYPE / NOT RELEASE-READY. IPA gold is `NOT_READY_NO_ADJUDICATED_GOLD`; one high-severity npm vulnerability remains.

## MLC 1978 spelling-book catalogue lead — 2026-11-13

| ID | Status | Evidence | Acceptance criterion |
|---|---|---|---|
| BURMESE-MLC-SPELLING-BOOK-1978-ACCESS-018 | PARTIAL — CATALOGUE LEAD ONLY | National Diet Library of Japan record R100000136-I1970023484907173422 records a Burmese-language MLC orthography/spelling reference published in 1978. Allott (1985, p.145) independently reports that the MLC spelling book was published in 1978, while separately describing the five-part Concise Burmese Dictionary as issued from late 1978 through 1980. New registry records: NDL_MLC_SPELLING_1978_CATALOG / CLM-MLC-SPELLING-BOOK-1978-CATALOG-001. | Obtain title page and contents; verify exact identity of the catalogue title with Allott's spelling book and distinguish it from the Concise Dictionary. Inspect whether any pronunciation or transcription material exists. No MLCTS/IPA inference from catalogue metadata. |

This is a new access route, not newly inspected primary content. Existing Allott/Okell Concise Dictionary records remain separate. Registry totals after update: 80 sources / 132 claims (before CiNII record; historical checkpoint). Exact-head CI pending.

## MLC 1978 spelling-book retrieval routes — 2026-11-13

| ID | Status | Evidence | Acceptance criterion |
|---|---|---|---|
| BURMESE-MLC-SPELLING-BOOK-ACCESS-019 | PARTIAL — RETRIEVAL ROUTES IDENTIFIED | CiNii Books NCID BA69415754 records 28, 379 pages, 17 cm and holdings at three Japanese libraries (Osaka University and Tokyo University of Foreign Studies). Google Books record _V1LAAAAMAAJ identifies a 379-page scan originating from the University of Michigan, digitized 2007, but exposes snippet-view metadata only. Added CINII_MLC_SPELLING_1978_HOLDINGS / CLM-MLC-SPELLING-BOOK-ACCESS-002. | Request a copy from one of the holding libraries or inspect any accessible Google Books pages. Capture title page, contents and relevant spelling/pronunciation sections with page locators. No claim about actual book contents until inspected. |

Registry totals: 80 sources / 133 claims (verified nonblank, unique source IDs). Exact-head CI pending.

## Crosswalk consistency validation — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-CROSSWALK-INTEGRITY-020 | IMPLEMENTED — CI PENDING | Added `tests/test_rime_crosswalk_consistency.py` to verify that the Mya2Rom MLCTS2 crosswalk, R12A secondary phonology crosswalk and lexical audit all cover the same 25 collision groups with matching source-unit identities; validates two-position array alignment, enumerated comparison states, and explicit secondary-vs-primary boundaries. | Integrity checks validate table consistency only. They do not establish pronunciation, lexical identity, primary MLC correctness or Ukrainian output. CI must pass before DONE_VERIFIED. |

## Rime crosswalk integrity and evidence triage — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-CROSSWALK-INTEGRITY-020 | DONE_VERIFIED — DATA_INTEGRITY_ONLY | `tests/test_rime_crosswalk_consistency.py` verifies all three existing 25-row crosswalks share the same MLCTS keys and source-unit pairs, validates MLCTS2 and R12A two-position value alignment, and locks their observed status distributions. Required CI run **43507606882 SUCCESS** on code commit `de7abaea084515c5ef814575656ede8b83369a6a`: 248 Python, 66 subtests, 20 Node, 58 Playwright; build and generated-data freshness passed. | This validates table alignment and evidence labels only. It does not establish pronunciation, lexical identity, primary MLC correctness, IPA gold or Ukrainian output. |

### Cross-system triage from existing tables (no new linguistic adjudication)

- **Priority 1 — `any` / `any:` / `any.`:** Mya2Rom MLCTS2 and R12A both distinguish the paired Myanmar forms in all three groups. The lexical audit has an explicit secondary-source conflict for `any` (`/kɪ̀ɴ/` versus `/kì/, /kè/, /kɛ̀/`), while `any:` and `any.` remain unadjudicated. This is the clearest existing conflict cluster to preserve for later lexical review; it is not resolved by agreement between secondary tables.
- **Priority 1 — `ui`:** MLCTS2 distinguishes the two source units and R12A has partial coverage (`NOT_COVERED` for one side); the lexical audit has no word-level adjudication. Keep both source units separate.
- **Special handling — `u.`:** both crosswalks classify this as context-dependent/special non-rime behavior. Do not count `့` as an ordinary independent rime or force it into ordinary vowel/coda logic.
- **Secondary corroboration only — `am` and `um`:** both vendor MLCTS2 and R12A show matching outputs for the paired units; the lexical audit records secondary equivalence examples (`/kàɴ/` and `/kòʊɴ/`). These examples do not prove universal equivalence or primary MLC policy.
- **All remaining groups:** retain their existing unadjudicated state. Cross-table agreement is not primary lexical proof.

No source records or runtime rules were promoted by this triage. The first CI attempt exposed two over-specific test assertions; the assertions were corrected against the actual CSV values, and the subsequent required run passed.

## MOW orthographic candidate lists for priority collision groups — 2026-11-13

This is a targeted readout of the already-generated `mow_rime_orthographic_coverage.csv` and `mow_rime_orthographic_matches.csv`, not a new pronunciation dataset.

| MLCTS group | First source unit | MOW lemma matches | Second source unit | MOW lemma matches | Result |
|---|---|---:|---|---:|---|
| `any` | ဉ် | 6 | ည် | 13 | Both sides occur as exact Unicode suffixes |
| `any:` | ဉ်း | 1 | ည်း | 6 | Both sides occur as exact Unicode suffixes |
| `any.` | ဉ့် | 0 | ည့် | 5 | Only second side occurs |
| `ui` | ို် | 0 | ို | 15 | Only second side occurs |

Examples exposed by the existing match table include `ဥယျာဉ်`, `တိရစ္ဆာန်ဥယျာဉ်`, `ယာဉ်` for ဉ်; `ပြည်`, `မြန်မာပြည်`, `လက်ဖက်ရည်` for ည်; `အကျဉ်း` for ဉ်း; and `ချို`, `ငို`, `ဆို`, `တို`, `မှို` for ို. These are candidate lemmas for text-based dictionary lookup only. Suffix matching does not establish syllable boundaries, rime identity, tone, pronunciation or homophony.

The MOW table does not currently provide a lexeme-level adjudication for the `any` or `ui` collision. The next practical step is to use these exact lemmas as lookup keys in already-registered textual resources, recording each dictionary's spelling, entry headword, pronunciation/transcription field and page/entry locator where available. Do not populate observed IPA from MOW.

## Source registry row-count correction — 2026-11-13

Append a correction note: The source CSV contained three internal blank separator lines (plus the final newline); the earlier row-count method counted the three blank lines as empty rows. Removed all blank lines and added a regression test for nonblank unique source IDs. The actual registry contains 80 unique source records and 133 claim records. Historical row-count figures above are superseded.

## Source registry hygiene — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-SOURCE-REGISTRY-INTEGRITY-021 | DONE_VERIFIED — REGISTRY_STRUCTURE | Removed three internal blank separator rows from `data/burmese/sources.csv`; added `test_source_registry_has_no_blank_rows_or_duplicate_source_ids`. Current registry: **80 nonblank unique source records / 133 claims**. Required CI on code commit `62f59f177b15e2df54ace464056df7932058bffb`, run **43508294905 SUCCESS**: 249 Python + 66 subtests, 20 Node, 58 Playwright; build and generated-data freshness passed. | Structural registry integrity only; does not validate source quality or promote linguistic claims. |

The earlier 82/132 and 83/133 counts in preceding catalogue-lead entries were inflated by blank CSV rows and are superseded by the verified 80/133 count above.

## Wiktionary word-level secondary evidence for collision groups — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-LEXICAL-RIME-EXAMPLES-022 | DONE_VERIFIED — SECONDARY_WORD_LEVEL_EXAMPLES_ONLY | Added three source-linked claims under existing `MYWIKTIONARY2026` and enriched the 25-row lexical audit for `any`, `any:` and `ui`. Required CI run **43509339740 SUCCESS** on code commit `191501979a2c5d8b7c0db9a00af5600b7266201f`: 251 Python + 66 subtests, 20 Node, 58 Playwright; build and generated-data freshness passed. | Wiktionary is secondary evidence. No primary MLC rule, universal equivalence, IPA gold or runtime/Ukrainian mapping is authorized. `ui` remains one-side-only. |

### New word-level examples

- `any`: `ဥယျာဉ်` is listed as MLCTS `u.yyany`, IPA `/ʔṵjɪ̀ɴ/` or `/ʔújɪ̀ɴ/`; `ပြည်` is `prany`, IPA `/pjì/`. The shared MLCTS rime suffix is therefore not evidence of homophony.
- `any:`: `အကျဉ်း` is `a.kyany:` with `/ʔət͡ɕɪ́ɴ/`; `နည်း` is `nany:` with `/nɛ́/` for one sense and `/ní/` for another. This supplies secondary examples on both source-unit sides and documents sense-dependent pronunciation under one spelling/MLCTS form.
- `ui`: `ချို` (`hkyui`, `/d͡ʑò/`), `ဆို` (`hcui`, `/sʰò/`) and `တို` (`tui`, `/tò/`) attest the `ို` side only. The paired `ို်` side has no MOW suffix matches, so this is not a comparison.

Updated lexical audit distribution across 25 groups: 19 unadjudicated; 2 secondary-system equivalence; 1 secondary-source conflict (`any`); 1 secondary-source distinction (`any:`); 1 secondary one-side-only (`ui`); 1 special non-rime (`u.`). MLCTS2 crosswalk status is synchronized to the lexical audit and tested. Registry now contains **80 unique sources / 136 unique claims**; no new source record was required.

## Additional `any.` lexical examples — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-ANY-DOT-LEXICAL-023 | PARTIAL — SECONDARY_WORD_LEVEL_EXAMPLES | Added `စဉ့်` (`cany.`, `/sɪ̰ɴ/`) and `ကြည့်` (`krany.`, `/t͡ɕḭ/`) as source-linked word-level examples for ဉ့် and ည့်. Added claim `CLM-WIKTIONARY-ANY-DOT-WORD-LEVEL-EXAMPLES-001`; crosswalk status parity and regression assertions updated. Registry: 80 sources / 137 claims. | Not a minimal pair or primary MLC specification. No IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Lexical audit distribution now: **18 unadjudicated / 2 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. `စဉ့်` is not in MOW; `ကြည့်` is a MOW-listed candidate. The MOW coverage table is unchanged.

## Additional `aung` lexical examples — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-AUNG-LEXICAL-024 | PARTIAL — SECONDARY_WORD_LEVEL_EXAMPLES | Added `ပေါင်` (`paung`, `/pàʊɴ/`) and `တောင်` (`taung`, `/tàʊɴ/`) as lexical examples for ေါင် and ောင်. Same secondary rime sequence `/àʊɴ/` with different onsets. Added claim `CLM-WIKTIONARY-AUNG-WORD-LEVEL-EXAMPLES-001`; updated audit/crosswalk parity and tests. Registry: 80 sources / 138 claims. | Secondary equivalence only; not a controlled minimal pair or primary MLC specification. No IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Lexical audit distribution now: **17 unadjudicated / 3 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**.

## Exact-head verification — lexical collision audit continuation — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-LEXICAL-AUDIT-VERIFICATION-025 | DONE_VERIFIED — DATA_AND_TEST_INTEGRITY | Code/data snapshot `eb81bd29e9417ddbd6d541d54fce6d754b0bb8bd`; required CI **43513203135 SUCCESS** (duplicate **43513212043 SUCCESS**): 251 Python + 66 subtests, 20 Node, 58 Playwright; production build, generated-data freshness and Chromium install passed. Optional raw-output diagnostic **43513212088 SUCCESS**. | Verifies registry/crosswalk parity and application test suite only. IPA gold remains 0; accuracy null; secondary lexical entries are not primary MLC adjudication. One high-severity npm vulnerability remains. |

Current collision ledger: **17 unadjudicated / 3 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 138 claims**.

## Additional `aung:` lexical examples — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-AUNG-COLON-LEXICAL-025 | PARTIAL — SECONDARY_WORD_LEVEL_EXAMPLES | Added MOW-listed `ပေါင်း` (`paung:`, `/páʊɴ/`) and `ကျောင်း` (`kyaung:`, `/t͡ɕáʊɴ/`) for ေါင်း and ောင်း. Same secondary IPA rime sequence `/áʊɴ/`, different onsets. Added claim `CLM-WIKTIONARY-AUNG-COLON-WORD-LEVEL-EXAMPLES-001`; updated audit/crosswalk parity and tests. Registry: 80 sources / 139 claims. | Secondary equivalence only; not a controlled minimal pair or primary MLC specification. No IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Current collision ledger: **16 unadjudicated / 4 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 139 claims**.

## Additional `auk` lexical examples — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-AUK-LEXICAL-026 | PARTIAL — SECONDARY_WORD_LEVEL_EXAMPLES | Added MOW-listed `ပေါက်` (`pauk`, `/paʊʔ/`) and `ကျောက်` (`kyauk`, `/t͡ɕaʊʔ/`) for ေါက် and ောက်. Same secondary IPA rime sequence `/aʊʔ/`, different onsets. Added claim `CLM-WIKTIONARY-AUK-WORD-LEVEL-EXAMPLES-001`; updated audit/crosswalk parity and tests. Registry: 80 sources / 140 claims. | Secondary equivalence only; not a controlled minimal pair or primary MLC specification. No IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Current collision ledger: **15 unadjudicated / 5 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 140 claims**.

## Additional `a`, `a:` and `au` lexical examples — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-A-AU-LEXICAL-027 | PARTIAL — SECONDARY EVIDENCE RECONCILED | Earlier MOW-listed pairs across `a`, `a:` and `au` remain; `a.` now also has both-side examples: `ငါ့` `/ŋa̰/` (`ါ့`) and first syllable `တာ့` `/ta̰/` in `တာ့တာ` (`ာ့`). Registry: 80 sources / 164 claims. | Secondary only, not a controlled minimal pair or primary MLC adjudication. No IPA gold, runtime or Ukrainian mapping promotion. |

Current collision ledger: **12 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 143 claims**.

## One-sided `aung.` lexical example — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-AUNG-DOT-LEXICAL-028 | PARTIAL — SECONDARY_ONE_SIDE_ONLY | Added MOW-listed `စောင့်` (`caung.`, `/sa̰ʊɴ/`) for ောင့်. ေါင့် remains unobserved. Added claim `CLM-WIKTIONARY-AUNG-DOT-ONE-SIDE-EXAMPLE-001`; updated audit/crosswalk parity and regression tests. Registry: 80 sources / 144 claims. | Secondary evidence for one side only; not collision adjudication or primary MLC specification. No IPA gold, runtime or Ukrainian mapping promotion. |

Current collision ledger: **11 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 2 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 144 claims**.

## One-sided `um:` and `un` lexical examples — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-UM-UN-LEXICAL-029 | PARTIAL — SECONDARY_ONE_SIDE_ONLY | Added MOW-listed `နှလုံး` (`hna.lum:`, `/n̥əlóʊɴ/`) for `ုံး` and `ကုန်` (`kun`, `/kòʊɴ/`) for `ုန်`. Opposite sides remain unobserved. Added claims `CLM-WIKTIONARY-UM-COLON-ONE-SIDE-EXAMPLE-001` and `CLM-WIKTIONARY-UN-ONE-SIDE-EXAMPLE-001`; updated audit/crosswalk parity and tests. Registry: 80 sources / 146 claims. | Secondary evidence for one side only; not collision adjudication or primary MLC specification. No IPA gold, runtime or Ukrainian mapping promotion. |

Current collision ledger: **9 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 4 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 146 claims**.

## One-sided `au:`, `im` and `im.` lexical examples — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WIKTIONARY-AU-IM-LEXICAL-030 | PARTIAL — SECONDARY_ONE_SIDE_ONLY | Added MOW-listed `ကျော` (`kyau:`, `/t͡ɕɔ́/`) for ော; `အိမ်` (`im`, `/ʔèɪɴ/`) for ိမ်; and `စိမ့်` (`cim.`, `/sḛɪɴ/`) for ိမ့်. Opposite sides remain unobserved. Added three claims; updated audit/crosswalk parity and regression tests. Registry: 80 sources / 149 claims. | Secondary evidence for one side only; not collision adjudication or primary MLC specification. No IPA gold, runtime or Ukrainian mapping promotion. |

Current collision ledger: **6 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 7 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 149 claims**.

## Final exact-head verification — 2026-11-13

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-LEXICAL-AUDIT-EXACT-HEAD-031 | DONE_VERIFIED — DATA_AND_TEST_INTEGRITY | SHA `62bea5a26012cb1ace4ce11579e17f4a780c3e1e`; CI **43516197628 SUCCESS** and duplicate exact-SHA run **43516203122 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium install passed. Optional raw-output diagnostic **43516203133 SUCCESS**. | Verifies code/data/registry/test integrity only. IPA gold remains 0; accuracy null; all lexical additions remain secondary. One high-severity npm vulnerability remains. |

Final collision ledger: **6 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 7 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 149 claims**.

## `am:` one-side lexical attestation — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-AM-COLON-LEXICAL-025 | PARTIAL — SECONDARY_ONE_SIDE_ONLY | Wiktionary `လမ်း` (`lam:`, `/láɴ/`) ends in `မ်း`; no MOW suffix-match candidate for `ံး` located. Claim `CLM-WIKTIONARY-AM-COLON-ONE-SIDE-EXAMPLE-001` registered; audit, crosswalk and tests updated. | Secondary one-side evidence only; not collision adjudication or primary MLC evidence. No IPA gold, runtime or Ukrainian output promotion. CI pending. |

Current collision ledger: **5 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 8 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 150 claims**.

## Exact-head verification — `am:` lexical continuation — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-AM-COLON-LEXICAL-025 | DONE_VERIFIED — DATA_AND_TEST_INTEGRITY | SHA `73bfbd7d82f69bfa0e306d984a40fe2324fc3515`; required CI runs **43519075644 SUCCESS** and **43519083741 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium installation passed. | Confirms registry, crosswalk and test integrity only. IPA gold remains 0; accuracy null; secondary example is one-side-only and not primary MLC adjudication. One high-severity npm vulnerability remains. |

Current collision ledger: **5 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 8 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 150 claims**.

## `am.` secondary lexical distinction — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-AM-DOT-LEXICAL-025 | PARTIAL — SECONDARY_SOURCE_DISTINCTION | Wiktionary `စိမ့်` (`cim.`, `/sḛɪɴ/`) and `ကြံ့` (`kram.`, `/t͡ɕa̰ɴ/`) represent final မ့် and ံ့; claim `CLM-WIKTIONARY-AM-DOT-LEXICAL-DISTINCTION-001` registered. Audit and crosswalk now flag secondary distinction. | Secondary evidence conflicts with vendor MLCTS2/IPA same-output mapping. Not a minimal pair or primary MLC adjudication; no IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Current collision ledger: **4 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 8 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 151 claims**.

## `au.` one-side lexical attestation — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-AU-DOT-LEXICAL-025 | PARTIAL — SECONDARY_ONE_SIDE_ONLY | Wiktionary `ဝပ်ရှော့` (`waphrau.`, `/waʔʃɔ̰/`) attests source unit `ော့`; claim `CLM-WIKTIONARY-AU-DOT-ONE-SIDE-EXAMPLE-001` registered. | `ေါ့` remains unobserved; not primary MLC adjudication or collision resolution. No IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Current ledger: **3 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 9 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 152 claims**.

## Exact-head verification — `au.` lexical continuation — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-AU-DOT-LEXICAL-025 | DONE_VERIFIED — DATA_AND_TEST_INTEGRITY | SHA `ffd08d7ae8e227ee19a86859de00b7d52f456ecf`; CI **43519887514 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium installation passed. | Confirms data/test integrity only. The lexical example is one-side secondary evidence; opposite source unit remains unobserved. IPA gold remains 0; no primary MLC, runtime or Ukrainian mapping promotion. One high-severity npm vulnerability remains. |

Current ledger: **3 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 9 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 152 claims**.


## `um.` one-side secondary lexical attestation — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-UM-DOT-LEXICAL-025 | PARTIAL — SECONDARY_ONE_SIDE_ONLY | Wiktionary `အုံ့` (`um.`, `/ʔo̰ʊɴ/`) attests ုံ့; claim `CLM-WIKTIONARY-UM-DOT-ONE-SIDE-EXAMPLE-001` registered. Not a MOW suffix candidate. | ုမ့် remains unobserved; secondary evidence only, not primary MLC adjudication or collision resolution. No IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Current ledger: **2 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 10 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 153 claims**.


## `im:` secondary compound-level lexical attestation — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-IM-COLON-LEXICAL-025 | PARTIAL — SECONDARY_ONE_SIDE_ONLY | Wiktionary compound `တစ်သဝေမတိမ်း` provides final-component evidence for `တိမ်း` (`tim:`, `/téɪɴ/`); MOW lists `တိမ်း` for ိမ်း. Claim `CLM-WIKTIONARY-IM-COLON-ONE-SIDE-EXAMPLE-001` registered. | Compound IPA is not a standalone entry; ိံး remains unobserved. No primary MLC adjudication, IPA gold, runtime or Ukrainian mapping promotion. CI pending. |

Current ledger: **1 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 154 claims**.


## MOW suffix-overlap guard — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-MOW-A-DOT-SUFFIX-OVERLAP-025 | DONE_VERIFIED — INTERPRETATION_GUARD | Regression test verifies the only MOW `a.` / `ာ့` suffix match is `ဝပ်ရှော့`, whose full ending is `ော့` and whose Wiktionary entry gives `waphrau.` / `/waʔʃɔ̰/`. | Exact Unicode suffix overlap is not syllabification or phonological-rime evidence. `a.` remains unadjudicated; no data/runtime promotion. |



## Exact-head verification — `im:` / `um.` lexical updates and `a.` suffix guard — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-IM-COLON-LEXICAL-025 / BURMESE-RIME-UM-DOT-LEXICAL-025 / BURMESE-MOW-A-DOT-SUFFIX-OVERLAP-025 | DONE_VERIFIED — DATA_AND_TEST_INTEGRITY | SHA `2b1f306b43a8a6c38e626252fb0b0b9c18501e1b`; CI **43580029898 SUCCESS**: 252 Python + 66 subtests, 20 Node, 58 Playwright; gold-structure validation, build, generated-data freshness and Chromium passed. | Confirms data/test integrity only. Both lexical attestations are secondary and one-sided; `a.` remains unadjudicated. IPA gold remains 0; no primary MLC, runtime or Ukrainian mapping promotion. One high-severity npm vulnerability remains. |

Current ledger: **1 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 154 claims**.


## `a.` phonetic-literature boundary — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-A-DOT-PHONETIC-CONTEXT-026 | DONE_VERIFIED — SOURCE_SCOPE_GUARD | Full texts: Mooney & Repetti-Ludlow (2021), DOI 10.3765/PLSA.V6I1.4900; Watkins (2001), DOI 10.1017/S0025100301002122. | Both provide phonetic vowel/rhyme context but no Burmese spelling-to-MLCTS mapping for the relevant examples. `a.` remains unadjudicated; no runtime promotion. |


## `a.` secondary one-side attestation — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-A-DOT-ONE-SIDE-027 | DONE_VERIFIED — SECONDARY_ONE_SIDE_ONLY | Wiktionary `ငါ့`: IPA `/ŋa̰/`, MLCTS `nga.`, source ending `ါ့`; explicitly a non-lemma induced creaky pronoun form. | Only first source-unit side attested; no lexical `ာ့` example and no primary MLC adjudication. No runtime promotion. |

Updated 25-group distribution: **0 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 12 secondary one-side-only / 1 special non-rime**. Source registry: **80 sources / 157 claims**.


## `a.` both-side secondary lexical equivalence — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-A-DOT-BOTH-SIDES-028 | DONE_VERIFIED — SECONDARY_SYSTEM_EQUIVALENCE | Wiktionary `ငါ့` `/ŋa̰/`, MLCTS `nga.` (`ါ့`) and `တာ့တာ` `/ta̰tà/`, MLCTS `ta.ta`, with first syllable `တာ့` (`ာ့`). | Both source units represented, same `/a̰/` rime; not a controlled minimal pair and not primary MLC adjudication. No runtime promotion. |

Updated 25-group distribution: **0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 158 claims**.


## Final exact-head CI and lexical ledger — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-LEXICAL-AUDIT-025 | DONE_VERIFIED — SECONDARY_EVIDENCE_LEDGER | Final SHA `e6d865e1daa191a7ecc9cd5b0025b628cc930310`; CI **43581081561 SUCCESS**: 253 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness, Chromium, IPA-gold structure validation passed. | Evidence ledger integrity only. 0 groups remain without any lexical evidence, but 11 groups are still one-sided, 1 conflicting and 3 source-distinguished; all evidence is secondary. No primary MLC adjudication or runtime promotion. |
| BURMESE-RAW-G2P-DIAGNOSTICS-001 | DONE_VERIFIED — RAW_OUTPUT_ONLY | Optional run **43581085495 SUCCESS**; CRF 100 predictions / 84 source-concordant / 0 gold / `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; Epitran raw output artifact. | No accuracy estimate. Diagnostic outputs are not gold or held-out benchmark results. |

Current ledger: **0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 158 claims**. Gold: 0. One high-severity npm vulnerability remains.


## Research-source reconciliation and engine integration — 2026-11-14

- Full-text Undermind review of Thu et al. (2016), Oo et al. (2020), and Hlaing (2014) corrected the evidence ledger: WSSANLP open-set PER 14.7/11.4/15.7 (WFST), 15.7 CRF tie on open3; LREC Thrax/OpenFst paper-reported 195 states/2,966 arcs and 88-symbol inventory; Hlaing 11,732 words, 99.93% orthographic segmentation accuracy with 32,238 vs 32,283 syllable-count discrepancy and 8-vs-9 stacking-error discrepancy. Source claims explicitly distinguish these from project IPA accuracy.
- PR #129 was inspected (21 files, 53 commits ahead/17 behind, non-mergeable); its useful work was selectively ported rather than blindly merged: candidate-only hybrid API, Google WFST raw-output harness/optional CI, and medials/conjunct/kinzi IPA withholding. PR #129 remains open/draft/untouched.
- Current branch now has an explicit candidate-only provider API; deterministic rule engine remains final authority. No external provider auto-runs and no provider output is promoted.


## External G2P raw-output artifacts — 2026-11-14

| Claim | Status | Result | Limit |
|---|---|---|---|
| CLM-GOOGLE-WFST-RAW-SMOKE-2026-11-14 | TESTED | Workflow 43582075278: build/symbol checks passed, 6/6 structural-only outputs, report SHA `88372233d85df73593b030ee0f91aa678fe86fd1c6d5cdc18e7c609b8eefd2c6`. | 0 gold, accuracy null. |
| CLM-EPITRAN-RAW-SMOKE-2026-11-14 | TESTED | Epitran 1.35.3, six structural-only raw outputs, report SHA `a7d93e0f04b4f4822094a36760c5376cb596db31a710aae4cdcacd14213d0b69`. | 0 gold, accuracy null. |
| CLM-CRF-MYG2P-RAW-SMOKE-2026-11-14 | TESTED | 100 predictions, 84 source-concordant, report SHA `741dc7fa1263e667cb1c51f91f7ee0a24b0bd6c2479d1efafe63798a63d73d20`. | 0 gold; possible training overlap; no accuracy. |

Current registry: **80 sources / 164 claims**. The 25-group rime ledger remains 0 unadjudicated / 9 secondary equivalence / 1 conflict / 3 distinctions / 11 one-side-only / 1 special non-rime. Independent IPA gold remains 0.


## Final exact-head diagnostic evidence — 2026-11-14

| Claim | Status | Result | Boundary |
|---|---|---|---|
| Google WFST | ESTABLISHED — RAW OUTPUT ONLY | Workflow 43582678434: 6/6 structural-only outputs, report SHA `541dbe0d70074819d006548d5eb7543822e3dae9508c47e598f08504f8d3340b`. | 0 gold; accuracy null. |
| Epitran 1.35.3 | ESTABLISHED — RAW OUTPUT ONLY | Six structural-only raw outputs, report SHA `a582039d46764f07ed509076ca0fb1542d6bdb4a358dc46aa0ad600bbbb88521`. | 0 gold; accuracy null. |
| Burmese-G2P CRF | ESTABLISHED — RAW OUTPUT ONLY | 100/100 predictions, 84 source-concordant, report SHA `741dc7fa1263e667cb1c51f91f7ee0a24b0bd6c2479d1efafe63798a63d73d20`. | 0 gold; possible training overlap; supplied syllable boundaries. |

Registry: **80 sources / 164 claims**; no independent IPA gold.


## Full-text source scope additions — 2026-11-14

Five claims added after full-text review of Hlaing & Mikami (2014), Watkins (2001), and Oo et al. (2020):

- `CLM-HLAING14-GRAMMAR-EXPR-001`: Hlaing & Mikami's orthographic FST expressions disagree on whether medials/vowels can repeat (`M? V?`, `M* V*`, and implementation `Opt(M) Opt(V)`). Preserve as a source-specification inconsistency; it is not a phonological rule.
- `CLM-HLAING14-LICENSE-001`: the paper states no reuse license for the MLC orthography corpus, digitized test words or transducer/code.
- `CLM-WATKINS2001-SPEAKER-SCOPE-001`: Watkins' broad transcription is based on one Rangoon male consultant reading deliberately; useful IPA description, not population-validated Yangon gold.
- `CLM-WATKINS2001-CODA-001`: Watkins' /ʔ/-only coda analysis and vowel subsets remain source-specific; no universal runtime promotion.
- `CLM-OO20-NO-GOLD-001`: Oo et al.'s IPA G2P creates seed pronunciations for checking; SLR80 is manually segmented Burmese text, not word-level IPA gold.

Registry: **80 sources / 169 claims**. None of these claims creates independent adjudicated gold or promotes runtime/Ukrainian output.


## `un` two-sided lexical evidence — 2026-11-14

- `CLM-WIKTIONARY-UN-SECOND-SIDE-EXAMPLE-001` records `ဂုဏ်` /ɡòuɴ/ from the Burmese pronunciation appendix and compound-initial `ဂုဏ်` /ɡòʊɴ/ from `ဂုဏ်ထူး` (MLCTS `gunhtu:`), complementing MOW-listed `ကုန်` /kòʊɴ` for the other orthographic source unit.
- `un` is now `SECONDARY_SYSTEM_EQUIVALENCE`, not primary adjudication and not a controlled minimal pair. No runtime/Ukrainian promotion.
- Registry: **80 sources / 170 claims**. 25-group distribution: **0 unadjudicated / 10 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 10 secondary one-side-only / 1 special non-rime**.


## Exact final test verification — 2026-11-14

The `un` second-side lexical addition and regression changes passed exact-head required CI **43585743620 SUCCESS** on `1ce829eda10ae5c3b3e4b9772efb434043198a75`: 267 Python + 68 subtests, 20 Node, 58 Playwright; npm ci and explicit high-severity audit passed with 0 vulnerabilities. IPA gold remains 0; validator `NOT_READY_NO_ADJUDICATED_GOLD`. Registry 80 sources / 170 claims; rime ledger 0 unadjudicated / 10 secondary equivalence / 1 conflict / 3 distinctions / 10 one-side-only / 1 special non-rime.


## `au:` and `au.` two-sided secondary evidence — 2026-11-14

- `CLM-WIKTIONARY-AU-COLON-SECOND-SIDE-EXAMPLE-001`: `ပေါ` `/pɔ́/`, MLCTS `pau:`, source `ေါ`; complements `ကျော` `/t͡ɕɔ́/`, MLCTS `kyau:`, source `ော`.
- `CLM-WIKTIONARY-AU-DOT-SECOND-SIDE-EXAMPLE-001`: `ပေါ့` `/pɔ̰/`, MLCTS `pau.`, source `ေါ့`; complements final syllable of `ဝပ်ရှော့` `/ʃɔ̰/`, MLCTS `waphrau.`, source `ော့`.
- Both groups are `SECONDARY_SYSTEM_EQUIVALENCE` only. `ပေါ့` is not a MOW suffix-match candidate. Neither claim is a minimal pair or primary MLC adjudication.
- Registry: **80 sources / 172 claims**. 25-group distribution: **0 unadjudicated / 12 secondary equivalence / 1 conflict / 3 distinctions / 8 one-side-only / 1 special non-rime**.
- Required CI **43586334287 SUCCESS** on `dd494662f0c94bcf1f59170fe65ea6cd41199c64`: 267 Python + 68 subtests, 20 Node, 58 Playwright; npm audit 0 vulnerabilities.


## MLC dictionary access and secondary rime-table follow-up — 2026-11-14

- Added `GOOGLE_BOOKS_MLC1996_DIGITIZED`: Google Books identifies the 1996 Dunwoody Press reprint of the 1993 MLC Myanmar-English Dictionary as originating from the University of Michigan and digitized on 2008-05-15 (635 pages). The retrieved record is bibliographic metadata only; no page-level content, pronunciation key or MLCTS/MLCTS2 table was inspected.
- Added `SHACHI_SEALANG_DICT_2009`: independent resource metadata confirms that SEAlang's ~35,000-entry Burmese dictionary is based on the 1993 MLC dictionary (1996 reprint), supports IPA phonetic search/display, and carries copyright attribution for the MLC/Dunwoody source. It does not disclose record-level fields or prove whether entries store MLCTS or MLCTS2.
- Added `CLM-WIKTIONARY-KI-SECONDARY-RIME-TABLE-001`: Wiktionary's secondary rime table lists `ကိံ` /kèɪɴ/ MLCTS `kim` alongside `ကိမ်`. This is table-level evidence for the second orthographic side of `im`, not a lexical entry. It does **not** satisfy the lexical two-sided acceptance criterion; the `im` lexical audit status is unchanged.
- Direct SEAlang dictionary retrieval still returned HTTP 502 / inaccessible through the available web route; the historical API request endpoint was also inaccessible. No MLC entry text or internal schema was obtained.
- Registry totals: **82 sources / 175 claims**. The 25-group lexical audit remains **12 secondary equivalence / 1 secondary conflict / 3 secondary distinctions / 8 secondary one-side-only / 1 special non-rime**. No primary MLC adjudication, runtime mapping or Ukrainian candidate was promoted.
- New regression test protects the distinction between catalog/interface metadata, table-level rime evidence and lexical/primary-source acceptance. Required CI **43618679936 SUCCESS** on exact code/test head `9e1a770cfd3d5e4c56264f79e458637f8c9bc1f9`: **268 Python tests + 68 subtests**, **20 Node tests**, **58 Playwright tests**; IPA-gold structure validation, `npm ci`, `npm audit --audit-level=high` (0 vulnerabilities), production build and generated-data freshness all passed. This validates the code/test-bearing head; subsequent edits to this register are documentation-only.


## Second-edition MLC dictionary access and follow-up phonetic evidence — 2026-11-14

- Added MLC_MYANMAR_ENGLISH_2E_2019: CiNii record BD10832446 identifies a revised second edition of the 1993 Myanmar-English Dictionary, chief editor Dr Myint Kyi, Department of Myanmar Nationalities' Languages, 709 pages, with a University of Tokyo General Library holding and copyright attributed to that department. No pages, pronunciation key, MLCTS/IPA fields or entries were inspected; this is a physical primary-source access lead, not pronunciation evidence.
- Publication year is unresolved: CiNii and the NDL guide say 2019, while a 2023 scholarly bibliography cites the same 2nd edition as 2020. Recorded as an UNCERTAIN claim; do not normalize until the title page/publisher record is inspected.
- NDL's 2022 Burmese bibliographic guide pp.53-59 distinguishes the 1993 MLC / 1996 Dunwoody reprint from the 2nd edition and confirms SEAlang's online Burmese dictionary is based on the 1993/1996 version. Its displayed Burmese examples use ALA-LC bibliographic romanization, not IPA.
- SEAlang's 2008 project paper screenshot displays phonetic forms /ein/ and /êi/ with English senses such as “house/home/dwelling”; the Burmese headword is not recoverable from the text extraction, and the paper does not expose the record schema. Interface output is not treated as a lexical evidence record or IPA gold.
- Full-text reads: Hlaing & Thida (2018) give minimal pairs ပန်း /pan/ vs ဗန်း /ban/ and ပန်း /pan/ vs ပုန်း /pon/ (initial/vowel contrasts, dialect unspecified; not any target rime group); Win & Takara (2011) document four formal Standard Myanmar tones with duration/F0 and five speakers including two Yangon natives; Mooney & Repetti-Ludlow (2021) give phonetic examples without Burmese spellings/MLCTS, so none adjudicates the eight one-sided groups.
- Registry now 89 sources / 189 claims. Collision ledger remains 12 secondary equivalence / 1 secondary conflict / 3 secondary distinctions / 8 one-sided / 1 special non-rime. No lexical status, primary MLC adjudication, runtime mapping or Ukrainian candidate was promoted.
- CI run 43619590836 on code/test snapshot 6b487d31dda78efca218f1f98038f0bb0e0fae57 failed at one new regression assertion: the test expected lowercase “no pages, pronunciation key” while the registered scope begins with uppercase “No pages...”. The other 269 Python tests and 68 subtests passed before pytest stopped; this was a case-sensitive test expectation error, not a data/schema failure. Corrected the assertion in commit 3b5e55cc8ac45afee6c98cf6999510012669ddf2. The corrected assertion was included in subsequent code/test head bccc8c3c495fdaa20736a104eabc4d0642345ac6; required CI run 43619829840 completed SUCCESS. It reports 270 Python tests + 68 subtests, 20 Node tests, 58 Playwright tests; IPA-gold structure validation, npm ci, npm audit --audit-level=high (0 vulnerabilities), production build and generated-data freshness all passed. This supersedes the earlier failed snapshot for the current code/test state; later commits are documentation-only.


- Additional official corroboration: the Ministry of Education's FY 2018-19 Annual Performance Review Report, p.256, lists “Myanmar-English Dictionary (2019)” as a published output of the Department of Myanmar Nationalities' Languages. This supports 2019 independently of the CiNii catalogue and NDL guide; the 2023 MDPI reference's 2020 date remains recorded as a bibliographic discrepancy pending title-page inspection.


## TUFS MED-to-IPA crosswalk and lexical examples — 2026-11-14

- Added TUFS_BURMESE_PRONUNCIATION_MODULE. Its Section 1.3 explicitly compares IPA, TUFS's own notation, Kato 2019 (NEB), the 2019 MED second edition, Ohno 2000 and a Chinese dictionary. The MED column exposes its own rime/tonal notation (-a/-a:/-a., -in/-in:/-in., -ein/-ein:/-ein., -aun/-aun:/-aun., checked -a'/-i'/-u'/-e' etc.). TUFS says its own phonetic notation is mainly based on Kato 2019; the IPA column is TUFS's analysis, not a verified export of the MED internal record field. Do not conflate MED with MLCTS.
- TUFS sections 3.1, 6.2 and 6.3 describe three tones for open/nasal syllables, nasal coda -ɴ with preceding vowel nasalization, and checked -ʔ syllables generally falling; the module notes some researchers count checked syllables as a fourth tone.
- Added five lexical-audit updates (without status promotion): am: gets ကမ်း /káɴ/ on the already-attested မ်း side; aung. gets စောင့် /sâuɴ/ but this differs from Wiktionary /sa̰ʊɴ/ (falling-tone vs creaky-phonation analysis); im gets သိမ် /t̪èiɴ/; im: gets သိမ်း /t̪éiɴ/; im. gets သိမ့် /t̪êiɴ/ and စိမ့် /sêiɴ/. These are additional examples for already observed source-unit sides only. No opposite-side example for any of the eight one-sided groups was found.
- TUFS also documents a dictionary coverage distinction: aspirated ချိုင်း /cʰáiɴ/ is treated as non-lexical by most speakers, appears in Ohno 2000 but not MED 2019, while a voiced /jáiɴ/ form is listed. This is a lexicon/speaker-judgment note, not an MLCTS rule.
- Registry now **89 sources / 189 claims**. The eight groups remain one-sided; no primary MLC entry, independent IPA gold, runtime mapping or Ukrainian candidate was promoted.
- CI run **43620266372** initially failed one test assertion because it expected a lexical form adjacent to the IPA in the claim text; the claim instead phrased it as “For စောင့် 'wait', TUFS gives...”. Corrected the test assertion in **9e0d134a3189a4d57d38de1fa6c0e7b85725d72e**. Required CI run **43620353708 SUCCESS** on that code/test head: **271 Python tests + 68 subtests**, **20 Node tests**, **58 Playwright tests**; IPA-gold structure validation, npm ci, high-severity audit (0 vulnerabilities), production build and generated-data freshness passed.


## Final execution checkpoint — 2026-11-14

- Repository: ClippyFirst/Burmese-Ukrainian-Phonetic-System-
- Starting default-branch commit: dc90463bdd734867308f03cb627eb8941efc19d6
- Starting research-branch head for this continuation: 3d5b3f2b17376e969acabfc9b237ee9d805a71d8
- Dedicated working branch: research/burmese-medials-g2p-evidence-2026-11-13
- Code/data/test-bearing head: 9e0d134a3189a4d57d38de1fa6c0e7b85725d72e
- Latest documentation head before this checkpoint: 4478d4dbaffdc7ab127bc8f2a22f4f543275b880
- Comparison to main at the checkpoint: 858 commits ahead, 0 behind; merge base remains dc90463bdd734867308f03cb627eb8941efc19d6. main was not changed.
- Required CI run 43620353708 SUCCESS on the code/test-bearing head: 271 Python tests + 68 subtests, 20 Node tests, 58 Playwright tests; IPA-gold structural validation, npm ci, npm audit --audit-level=high (0 vulnerabilities), production build and generated-data freshness passed.
- Optional diagnostic run 43620353669 completed SUCCESS across Epitran, CRF and Google Thrax/OpenFst raw-output jobs. Google WFST: 6/6 structural probes produced outputs, 0 runtime errors, independent gold count 0, accuracy null. CRF: 100/100 predictions, 84 source-concordant rows, gold count 0, scoring status NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. These are raw-output diagnostics only, not accuracy benchmarks.
- Evidence registries: 89 sources / 189 claims; CSV widths/refs/ID uniqueness validated. Collision lexical audit contains 25 groups; 8 target groups remain SECONDARY_ONE_SIDE_ONLY. TUFS examples add evidence only to already-observed sides and expose a secondary transcription disagreement for စောင့်; no mapping was promoted.
- Open PRs: #147 (research: map Burmese medial and G2P evidence) and #129 (benchmark/hybrid). #147 remains open; no review submissions or inline review threads. #129 remains untouched because its branch is divergent from main (previous comparison: 53 ahead / 17 behind); compatible work already ported to #147 in the earlier continuation.
- Remaining blockers: obtain permissioned access to the 2019 MED second edition (CiNii/NDL/official Ministry evidence identifies a 709-page copy at University of Tokyo General Library and copies at National Library Myanmar; no entry pages or transcription key inspected); find lexical examples for the missing sides of the eight one-sided groups; expert-adjudicated independent IPA gold; accessibility manual QA; full hermetic pinning for Google WFST dependencies; myG2P commercial deployment/distribution rights (non-commercial research use is permitted under CC BY-NC-SA 4.0).
- Final classification: PARTIAL PROTOTYPE, not release-ready. Engineering CI is green on the code/test head; linguistic evidence, licensing and independent gold remain incomplete.


## Final state addendum — 2026-11-14

- Before this documentation-only addendum, branch head was 5219bd6cfb814f17c63404c90ae20affcd521bd0; comparison to main was 861 ahead / 0 behind, merge base dc90463bdd734867308f03cb627eb8941efc19d6. The main branch remains unchanged.
- The code/data/test head remains 9e0d134a3189a4d57d38de1fa6c0e7b85725d72e; all later commits in this continuation are documentation-only.
- Required CI 43620353708 is SUCCESS: 271 Python + 68 subtests, 20 Node, 58 Playwright; IPA-gold structure validation, npm ci, npm audit (0 vulnerabilities), production build and generated-data freshness passed.
- Optional diagnostic workflow 43620353669 is also complete SUCCESS: Epitran, CRF and Google WFST raw-output jobs succeeded. Google WFST: 6/6 outputs, 0 runtime errors, no independent gold, accuracy null. CRF: 100 predictions, 84 source-concordant, no gold, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. No accuracy claim is made.
- Final evidence totals: 89 sources / 189 claims; 25 collision groups; eight target groups remain one-sided. No primary MLC entries, independent adjudicated IPA gold or runtime/Ukrainian mapping promotion was obtained.
- Final status remains PARTIAL PROTOTYPE, not release-ready; next genuine blocker is permissioned page-level access to the 2019 MED second edition and expert lexical/IPA adjudication.


## myG2P license scope correction — 2026-11-14

The prior handoff wording treated the myG2P CC BY-NC-SA 4.0 license as a blocker without separating research from commercial use. That was too broad. The upstream repository README explicitly grants non-commercial reuse subject to attribution and ShareAlike; it documents the five-field dataset (Burmese orthography, syllable segmentation, respelling, IPA) and says the lexicon is based mainly on MLC words with extensions for foreign pronunciations.

- **Current non-commercial research:** permitted under the published CC BY-NC-SA 4.0 license; no separate maintainer permission is required for this activity, provided its conditions are followed.
- **Redistributed derived data:** retain attribution and CC BY-NC-SA-compatible terms.
- **Commercial deployment/distribution:** not covered; separate permission or removal of the material is required.
- **Evidence boundary:** myG2P remains secondary research/reference data, not independent adjudicated IPA gold. Its IPA values may be compared and audited, not treated as ground truth.
- The project owner confirms this is a research project and authorizes the project to proceed on that basis.
- OpenSLR SLR80 is licensed CC BY-SA 4.0 and has a public transcript index, but actual TSV retrieval failed in this environment; per the owner's instruction, no corpus rows/audio are used or imported until the bytes are accessible. It remains metadata-only.
- Added CLM-MYG2P-NONCOMMERCIAL-RESEARCH-USE-001 and a regression test. Registry now 91 sources / 192 claims; required CI pending on the new code/test head.


## BSD Burmese word-list scan — 2026-11-14

Added an accessible 40,000+ Burmese orthographic word list from dangerchitthu/myanmar-karen-word-lists. Its README states BSD licensing, the line-breaking/spell-checking purpose, and source projects including my-l10n and a SourceForge Myanmar-English dictionary. The exact raw file was retrieved; blob SHA 11fdf476285e242d383d3ca1047138deda3f80eb; license blob SHA 6f46e92f132c607cba418ffbecc9f4a29de25c01. The fetched file contained 41,343 non-comment rows. It provides orthographic strings only, not glosses, syllabification or IPA.

Exact Unicode candidate scan against the eight missing source units:
- am: (ံး): 483 raw suffix hits, but every hit had a dependent vowel sign immediately before ံး; no exact candidate for the standalone source-unit string was established.
- aung. (ေါင့်): ခေါင့်, ဒေါင့်; neither was independently verified as a lexical headword. Wiktionary explicitly labels ဒေါင့် as a phonetic respelling of ထောင့်, so it is not a second lexical item for the missing spelling.
- ui (ို်): ယို် — orthographic candidate only, not independently verified.
- um: (ုမ်း): ရေခအုမ်း, လစာနှုမ်း — unverified candidate strings, no gloss or pronunciation.
- im (ိံ), im: (ိံး), im. (ိံ့) and um. (ုမ့်): no suffix matches.

No candidates were promoted to lexical pronunciation evidence. All eight collision statuses remain SECONDARY_ONE_SIDE_ONLY. This word list is a candidate-discovery layer only; suffix matching does not perform Burmese syllabification and no IPA can be inferred from it. The findings are registered as CLM-DANGERCHITTHU-ORTHOGRAPHIC-CANDIDATE-SCAN-001.


## Verification — 2026-11-14

The latest code/data/test head for this batch is 0b061ef23132cbfa65e94e6c4307375a2c7e68b9. Required CI run 43622250968 completed SUCCESS:
- 273 Python tests and 68 Python subtests passed.
- 20 Node tests passed; 0 failed.
- 58 Playwright Chromium tests passed.
- Independent IPA-gold structural validation passed.
- npm ci, high-severity npm audit (0 vulnerabilities), production build and generated-data freshness check passed.

Optional diagnostic run 43622250978 completed SUCCESS across Epitran, CRF and Google WFST raw-output jobs. Google WFST: 6/6 outputs, 0 runtime errors, independent_gold_count=0, accuracy=null; report SHA-256 0df0f24dd97c0537bcf882c4460ab1f4a3e315b6ece485ef0c6ae9ed22f42c34. CRF: 100/100 predictions, 84 source-concordant rows, gold_count=0, accuracy=null, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. These are raw-output diagnostics only, not accuracy benchmarks.


## Additional lexical source check — Wiktionary phonetic respelling and myG2P access boundary (2026-11-14)

- Added the Wiktionary entry for ထောင့် as a separate source. It lists ဒေါင့် as a phonetic respelling for a second pronunciation of the same lemma, not as an independent lexical headword. Therefore the BSD wordlist candidate ဒေါင့် does not fill the missing aung. spelling side.
- Registered CLM-WIKTIONARY-HTAUNG-DAUNG-RESP-001 and linked it from the aung. lexical audit. No collision status changed.
- myG2P CC BY-NC-SA 4.0 remains permitted for non-commercial research with attribution and ShareAlike. However, the 2.33 MB upstream dictionary file itself could not be retrieved into the current analysis environment: GitHub file retrieval returned no content for the large file, raw download failed, and the hosted scrape reported that the page was too long to process fully. Per the owner's instruction, no partial/truncated query output was treated as evidence and no new myG2P lexical rows were used.
- Registries now contain 91 sources / 192 claims. The 25-group collision audit remains unchanged in status; all eight target groups remain SECONDARY_ONE_SIDE_ONLY.
- Latest corrected test run is pending after fixing a test assertion to match the source wording.


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


## Latest verified continuation — 2026-11-14

- **Code/data/test head:** 7ca075345cc34067e89e7c3e28da8a331576f37b. Required CI run **43624488248 SUCCESS** on this exact head: **275 Python tests + 68 subtests**, **20 Node tests**, **58 Playwright Chromium tests**; independent IPA-gold structural validation, npm ci, high-severity npm audit (**0 vulnerabilities**), production build and generated-data freshness all passed.
- Two intermediate CI attempts after the new lexical statuses failed only on stale assertions/counts and acceptance-boundary wording; those were corrected in the crosswalk/test fixtures. The successful run above is the verified final test state for this batch.
- Full myG2P scan remains as documented above: 24,802 rows, 0 malformed; three secondary system-equivalence promotions (aung., im, um:); five one-sided groups remain. Final 25-group distribution: **15 secondary system-equivalence / 1 secondary-source conflict / 3 secondary-source distinctions / 5 secondary-one-side-only / 1 special non-rime**. Registry: **92 sources / 194 claims**.
- The latest optional diagnostic run **43624488252** has Epitran raw-output and CRF jobs completed successfully; Google WFST raw-output remains IN_PROGRESS at this checkpoint. Previous completed optional run **43623224085** had Google WFST 6/6 outputs, 0 runtime errors, independent gold 0, accuracy null; CRF 100 predictions, 84 source-concordant, gold 0, accuracy null, possible training overlap. No accuracy claim.
- Current PR #147 code/test head: 7ca075345cc34067e89e7c3e28da8a331576f37b; branch comparison at this checkpoint: **928 ahead / 0 behind** main. PR #147 remains OPEN / DRAFT / mergeable, 61 changed files, no submitted reviews or review threads. PR #129 remains OPEN / DRAFT, 53 ahead / 17 behind, left untouched. Main unchanged; no merge or release.
- The Rickaym/Burmese-Dictionary lead remains metadata-only: only the first 2,000/19,258 rows were retrieved; the full suffix scan was not completed after connected-service credits were exhausted. No rows or pronunciation data were imported. This does not affect the full myG2P scan, which was retrieved independently through GitHub's blob endpoint.
- No primary MLC adjudication, independent expert IPA gold, runtime phonological rule, or Ukrainian mapping was promoted. Readiness remains **PARTIAL PROTOTYPE**, not linguistically release-ready.


## Engine continuation — canonical IPA evidence gate (2026-11-14)

**Implementation change:** Python's canonical IPA adapter previously had hard-coded onset/vowel mappings for values whose source registries explicitly label them analysis-dependent. This allowed e.g. စ /s/, ဓ /dʰ/, ီ /iː/, ဲ /ɛ/, ူ /uː/ and ါ /a/ to enter canonical IPA despite the registry status. The adapter now admits only onset and vowel IDs marked established in ipa_onsets.csv / ipa_vowels.csv. Analysis-dependent mappings remain available in the structural/research registry but are withheld from canonical IPA.

**Regression coverage:** tests assert withheld outputs for six analysis-dependent onset/vowel examples; four established control outputs remain; a registry parity test ensures runtime allowlists exactly equal status=established rows. This is a precision/safety improvement, not expanded linguistic coverage. Browser IPA derivation is separate and has not been changed or proven equivalent; Python/browser parity remains PARTIAL.

**CI:** current head ca6c20690094a0cec0e413917e141e1c1fd5e4a7 has required test workflow runs 43629935909 and 43629931025 IN_PROGRESS at checkpoint; no pass is claimed yet. Optional Epitran raw-output run 43629936000 is also IN_PROGRESS. Await exact-head results before marking DONE_VERIFIED.


## Cross-runtime canonical IPA evidence gate — 2026-11-14

Extended the evidence-status correction to the browser G2P path. The browser now checks generated ONSETS and VOWELS registry statuses before deriving canonical IPA. This is important because orthographic vowel-sign recognition in vowel_signs.csv is not itself proof that the phonetic value in ipa_vowels.csv is established. If the onset or any vowel value is analysis-dependent, browser IPA is withheld and the syllable status remains ANALYSIS_DEPENDENT rather than being flattened to a generic not-established state. Onset-only provisional hints remain separate from canonical IPA.

Tests cover generated source registry statuses and assert that the browser derivation enforces both onset and vowel gates. Python/browser semantic parity is improved for these evidence statuses, but full cross-runtime parity remains PARTIAL: the browser has a richer independent phonological derivation for medials, codas and vowel combinations, which remains separately unevaluated against expert IPA gold.

Current implementation/test head: 9cb275d8e9f3a5a695761c29da0e3922f555ecad. CI has been triggered by the PR update; record exact-head outcomes before promoting this task to DONE_VERIFIED.

## Browser evidence-status propagation and regression reconciliation — 2026-11-14

**Task status: DONE_VERIFIED (narrow status-propagation correction); broader Python/browser phonological parity remains PARTIAL.** The browser aggregate `ipaStatus` previously converted all IPA-less states except `UNSUPPORTED` to `NOT_ESTABLISHED`, losing the already-derived `ANALYSIS_DEPENDENT`/`UNCERTAIN` reason. It now preserves those explicit statuses. Regression coverage checks the source-gated path and aggregate preservation.

The exact-head browser run revealed four legacy Playwright cases expecting canonical IPA for `စိတ်`, `ဆာ`, `သာ`, `ယူ`, despite their source onset/vowel records being analysis-dependent. Their expectations now assert fail-closed IPA and Ukrainian output plus `IPA: ANALYSIS_DEPENDENT`; no new IPA values or Ukrainian mappings were created.

Exact implementation/test head `9333bdfec405f9fafb36bab42d90965e11f5e155`; required PR CI `43630941796` SUCCESS: 277 Python tests + 68 subtests; build and generated-data freshness PASS; 21 Node tests PASS; 58 Playwright tests PASS. The push-triggered exact-head workflow `43630938330` was still running at the documentation checkpoint. No gold or accuracy claim follows from these engineering tests; independent adjudicated IPA gold remains 0.


## Python/browser structural-status parity continuation — 2026-11-14

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Browser status preservation for unimplemented medial/conjunct/kinzi structures | DONE_VERIFIED (narrow status contract) | `src/web/app.js` now retains `ANALYSIS_DEPENDENT` instead of flattening recognized unsupported structures to `NOT_ESTABLISHED`; canonical IPA and Ukrainian output remain withheld. |
| Shared Python/browser structural-status fixtures | PARTIAL | Shared cases `ကြွေ`, `က္ကာ`, `င်္ကာ` are asserted in `tests/test_shared_unicode_contract.py` and `tests/browser/converter.spec.js`; exact-head run [43638222569](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638222569) SUCCESS: 278 Python + 68 subtests, 21 Node, 59 Playwright. Full parsed-object/boundary/coda/tone/adapter parity remains unimplemented. |
| Independent IPA adjudication / accuracy | BLOCKED | Zero independent expert-adjudicated Yangon-profile IPA records; accuracy remains null. Structural fixtures are not phonetic gold. |


## Canonical IPA cross-runtime guard — coda, asat and prosody — 2026-11-14

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Browser coda/asat/anusvara/prosody fail-closed parity | DONE_VERIFIED (narrow canonical IPA boundary) | Browser now withholds IPA for coda, asat, anusvara and prosodic marks, preserving `ANALYSIS_DEPENDENT`; matches Python `_ipa` behavior. No browser-only coda/rime IPA is exposed as canonical output. |
| Shared unresolved-structure fixtures | PARTIAL | Seven shared cases across medials, conjunct, kinzi, nasal/checked codas, asat and anusvara are exercised in Python and Playwright. Exact-head CI [43638560797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638560797) SUCCESS: 278 Python + 68 subtests, 21 Node, 59 Playwright. This verifies status/withholding only, not IPA accuracy or complete parse-object equality. |
| Full Python/browser phonological parity | PARTIAL | Full vowel combinations, segmentation edge cases, prosody trace and Ukrainian adapter traces remain to be compared; no expert-adjudicated IPA gold exists. |


## Kinzi coda syllable-boundary parity — 2026-11-14

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Internal kinzi closes preceding Python syllable | DONE_VERIFIED (structural only) | Python now segments `မင်္ဂလာ` as `မင်္` + `ဂ` + `လာ`, records the first unit's kinzi/final nasal structurally, and withholds IPA. Prefix kinzi remains attached to its onset. Shared Python/Playwright fixture and exact-head CI [43638895912](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638895912) SUCCESS (280 Python + 68 subtests, 21 Node, 60 Playwright). |
| Full Burmese syllable-boundary parity | PARTIAL | Only the kinzi boundary case is newly shared; broader source-annotated boundary corpus and all parser states remain outstanding. |


## MLC medial inventory shared structural fixtures — 2026-11-14

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Shared 11-form MLC medial structural contract | DONE_VERIFIED (orthographic only) | Shared fixture covers four basic medials, five pairs and two triples; Python asserts ordered medial IDs and one syllable, Playwright asserts matching syllable row and withheld `ANALYSIS_DEPENDENT` IPA. Exact-head CI [43639262508](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43639262508) SUCCESS: 280 Python + 68 subtests, 21 Node, 60 Playwright. |
| Medial phonetic realization / Ukrainian output | BLOCKED / EVIDENCE-LIMITED | No selected-profile expert-adjudicated medial IPA gold. Structural inventory must not be interpreted as phonetic evidence. |

## Unknown Myanmar extension cluster boundary parity — 2026-11-14

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Browser retains unknown Myanmar-block code points inside the same structural cluster as Python | PARTIAL pending CI | Removed browser inventory-based early splitting. Regression asserts ကာ + U+AA60 is one uncertain cluster; inverse order U+AA60 + ကာ retains a recognized new-base boundary. Python counterpart already exists. Commits 003e4db004361b90531990a692980ffb2a4a43c1, b01667abc786b11de455c5f4eb276083d43e64dd. |
| Full Python/browser structural parser parity | PARTIAL | Still lacks a complete shared canonical projection of parser fields/statuses and a broad source-annotated corpus. This single mismatch fix does not establish whole-parser parity. |
| Phonetic or Ukrainian mapping for unknown Myanmar extension characters | DEFERRED / unsupported | No mapping added; unsupported source material remains visible and receives no guessed IPA or Ukrainian rendering. |

Independent expert-adjudicated IPA gold remains 0; empirical accuracy remains null.

## Exact-head verification — unknown Myanmar extension boundary parity — 2026-11-14

- Code/test head: `84b3c792ebd295f0240fd639f6cd0ee22aec8099`. Browser segmentation now retains unknown Myanmar-block code points within the current orthographic unit until the next recognized Burmese base consonant. The shared Unicode contract includes both `ကာ` + U+AA60 (one cluster; uncertain/unparsed tail) and U+AA60 + `ကာ` (unsupported first unit, recognized second syllable).
- The first exact-head attempt `ed0356cfab274bfe69207e43e104405735c6c79f` failed Playwright (59 passed, 3 failed): one legacy assertion expected the unknown extension to split from the previous Burmese cluster, and two new tests accidentally used literal backslash-u strings instead of the actual code point. Updated the old expectation to the Python structural contract and constructed U+AA60 with `String.fromCodePoint(0xAA60)`. No production behavior was weakened to satisfy tests.
- Corrected exact-head push workflow [43640773724](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43640773724) SUCCESS; PR workflow [43640779155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43640779155) SUCCESS: 280 Python tests + 68 subtests, 21 Node tests, 62 Playwright tests; npm audit gate, production build, generated-data freshness, and Chromium install passed.
- Optional diagnostics [43640779173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43640779173): CRF and Epitran raw-output jobs succeeded; Google WFST raw-output job was still running at this note. These outputs are diagnostics only, not accuracy estimates.
- Status: **DONE_VERIFIED for this specific Python/browser unknown-extension boundary**. Overall parser parity remains **PARTIAL** because a full shared canonical structural projection/status mapping and a source-annotated orthographic boundary corpus do not yet exist. Independent expert-adjudicated IPA gold remains 0; accuracy remains null. No phonological rules or Ukrainian mappings were introduced.


## Continuation — medial-ya contextual ASAT parity — 2026-11-14

- **Finding:** Python's structural parser explicitly consumes ASAT immediately after medial-ya as a contextual coda (`coda.marker=asat`, `orthographic_function=contextual`). The browser previously consumed the same sign only as a generic trailing ASAT flag, losing the structural role. This is a structural representation mismatch, not a pronunciation disagreement.
- **Implementation:** Browser medial parsing now mirrors the Python ordering: when ASAT immediately follows medial-ya, it records the contextual coda, sets the ASAT flag, and retains a Ukrainian diagnostic note. The behavior is deliberately position-specific; ASAT after another medial is not promoted by this change. Canonical IPA remains withheld because medials are still analysis-dependent.
- **Shared regression:** Added `ကျ်` to `tests/fixtures/shared_unicode_contract.json`. Python asserts the medial ID and contextual coda fields; Playwright asserts the same orthographic unit, `ANALYSIS_DEPENDENT` status, and diagnostic note.
- **Exact code/test head:** `9ed49b12b739f6b0cba240e2bdd44e5910f9aa59`.
- **Required push CI:** run [43641788491](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43641788491) SUCCESS — 280 Python tests + 68 subtests; 21 Node tests; 62 Playwright tests; IPA-gold structural validator executed; npm audit found 0 vulnerabilities; production build, generated-data freshness and Chromium installation passed.
- PR-triggered exact-head workflow [43641792351](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43641792351) was still running when this note was added; record its terminal result separately. Optional raw-output diagnostic run [43641792365](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43641792365) had Epitran raw-output complete successfully; CRF and Google Thrax/OpenFst jobs were still in progress. These jobs are diagnostics only, not accuracy estimates.
- **Status: DONE_VERIFIED for the medial-ya contextual-ASAT structural parity case.** Overall Python/browser structural projection and phonological parity remain PARTIAL. Independent expert-adjudicated IPA gold remains 0; empirical accuracy remains null. No phonological rule, IPA value or Ukrainian pronunciation mapping was introduced.


## Continuation — Python/browser structural boundary parity — 2026-11-14

### Medial-ya contextual ASAT coda

- Python's parser consumes ASAT immediately after medial-ya as a contextual coda (`coda.marker=asat`, `orthographic_function=contextual`). The browser had retained only a generic ASAT flag. Browser parsing now mirrors the Python position-specific structure and exposes a diagnostic note.
- Shared fixture `ကျ်` asserts the medial ID and contextual coda in Python; Playwright asserts the same source unit, withheld `ANALYSIS_DEPENDENT` IPA and diagnostic note. ASAT after other medials is not generalized by this change.

### Unsupported controls as boundaries for bare consonants

- Python's standalone-bare-consonant guard tests actual Myanmar phonological neighbours. Browser had treated unsupported C0/C1 control segments as non-Myanmar display units but not as phonological boundaries, so a bare consonant next to DEL or U+009F could follow the contiguous-Myanmar inherent-vowel fallback.
- Browser now treats `unsupportedControl` segments as boundaries for the standalone-consonant guard while preserving the controls as unsupported input. Shared fixtures cover DEL before `က` and U+009F after `က`; Python and Playwright both assert IPA withholding.

### Exact-head verification

- Final code/test head: `6389cac84344baa6d13940d650846667182a79ee`.
- Required push workflow [43642080740](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43642080740) SUCCESS; required PR workflow [43642084798](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43642084798) SUCCESS on the exact same head.
- Results: **281 Python tests + 68 subtests**, **21 Node tests**, **63 Playwright Chromium tests**; independent IPA-gold structural validator executed; npm install/audit found **0 vulnerabilities**; production build, generated-data freshness and Chromium installation passed.
- These changes improve structural parity only. No IPA pronunciation, phonological rule or Ukrainian mapping was introduced. The independent expert-adjudicated IPA gold set remains empty (0); empirical accuracy remains null.
- **Task ledger:** medial-ya contextual-ASAT structural case — DONE_VERIFIED; control-delimited bare-consonant withholding parity — DONE_VERIFIED; complete Python/browser structural projection and phonological parity — PARTIAL; profile-matched expert IPA adjudication — BLOCKED pending qualified annotation/evidence.
- Repository remains a **PARTIAL PROTOTYPE**, not linguistically release-ready. Main remains unchanged; PR #147 remains open/draft/unmerged; PR #129 remains untouched.


## Continuation — tone-mark-before-coda structural parity — 2026-11-14

- **Finding:** For the explicit orthographic sequence `ကာ့င်`, the browser's existing canonical-order path recognized a final base+ASAT after a preceding dot-below/visarga mark, but discarded the mark from its structural record. Python retained the tone mark but left the following final base+ASAT unparsed. This was a parser representation mismatch; the sequence is used as a structural regression probe, not as lexical or pronunciation gold.
- **Implementation:** Python now preserves a pre-coda dot-below/visarga as `tone_mark` before recognizing the final base+ASAT coda. Browser now retains the intervening marks in `prosodyMarks` and keeps the coda structure, with an explicit diagnostic note. Both paths continue to withhold canonical IPA and Ukrainian output for the unresolved coda/prosody.
- **Shared regression:** `tests/fixtures/shared_unicode_contract.json` adds the `ကာ့င်` structural case; Python asserts the dot-below tone-mark record and NGA final-coda record; Playwright asserts the `ANALYSIS_DEPENDENT` state and the diagnostic note that the mark was preserved.
- **Exact code/test head:** `21acdecbe48736ca6c6c398b9206f785e16b6c83`.
- **Required push CI:** [43642460709](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43642460709) SUCCESS. Required PR CI: [43642465130](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43642465130) SUCCESS on the same head. Results: **281 Python tests + 68 subtests**, **21 Node tests**, **63 Playwright Chromium tests**; IPA-gold structural validator executed; npm audit found **0 vulnerabilities**; production build, generated-data freshness and Chromium installation passed.
- **Task ledger:** tone-mark-before-coda structural preservation — DONE_VERIFIED for this regression sequence; complete Python/browser parser-object and phonological parity — PARTIAL; profile-matched expert IPA adjudication — BLOCKED. No pronunciation, phonological rule or Ukrainian mapping was introduced. Independent adjudicated IPA gold remains 0 and empirical accuracy remains null.
- Repository remains a **PARTIAL PROTOTYPE**, not linguistically release-ready. Main remains unchanged; PR #147 remains open/draft/unmerged; PR #129 remains untouched.


## Continuation — shared structural projection and Unicode 17 ordering audit — 2026-11-14

### Implementation

- Added `project_syllable_structure()` to the Python parser and a matching browser `projectStructure()` projection. The browser exposes the projection on each rendered Burmese syllable as a JSON data attribute for inspectable regression tests. This projection is explicitly orthographic/structural; it excludes IPA, Ukrainian candidates and phonetic accuracy claims.
- Shared fixture `tests/fixtures/shared_unicode_contract.json` now contains **31 structural projection cases**: inherent vowel, all four medials and observed combinations, conjunct, kinzi-final nasal, all nine dependent-vowel signs, contextual ASAT, canonical reordering, unknown Myanmar Extended-A tails and unsupported Myanmar inventory entries.
- The Unicode 17.0 Table 16-4 audit exposed a Python/browser mismatch: trailing ASAT after a dependent vowel was represented as a contextual coda by Python but only as a boolean flag by the browser. Browser parsing now retains the same contextual coda record. Fixtures cover `ကာ်`, `ကော်`, and the decomposed input `ကာ့်`, which NFC-normalizes to `ကာ့်` (U+1037 dot below before U+103A ASAT).
- Corrected the source-registry classification of U+AA60 as Myanmar Extended-A, not Extended-B. The Extended-B block is U+A9E0..U+A9FF; Extended-A is U+AA60..U+AA7F.

### Verification

- Code/test head: `3fc08b3384c8aa25212d61f8738a771d27aa41d5`.
- Push CI [43644035177](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43644035177) SUCCESS and PR CI [43644039707](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43644039707) SUCCESS on the same code/test head.
- Results: **282 Python tests + 68 subtests**, **21 Node tests**, **64 Playwright Chromium tests**; npm audit reports **0 vulnerabilities**; production build, generated-data freshness and independent IPA-gold structural validator pass.
- The shared projection is verified for the explicit 31-case contract. It does not establish complete parser-object parity for every possible Myanmar sequence or all language extensions.

### Task ledger and evidence limits

- Shared Python/browser structural projection v1 for 31 explicit cases — **DONE_VERIFIED**.
- Contextual ASAT coda parity, including Unicode canonical reordering — **DONE_VERIFIED** for the covered forms.
- Unicode 17 Table 16-4 parser coverage — **PARTIAL**: common Modern Burmese ordering is mapped and adversarially tested; full sequence permutation coverage and other Myanmar-script languages/extensions remain outside the implemented Burmese inventory.
- Complete Python/browser structural and phonological parity — **PARTIAL**: the projection is a shared selected-field contract, not a proof that all parser internals or G2P rules are identical.
- Independent IPA annotation/adjudication — **DEFERRED** per project-owner direction on 2026-11-14. Continue with existing published evidence and source registries only. This does not convert proposed rules into gold labels and does not permit an accuracy claim; independent adjudicated IPA gold remains 0 and empirical accuracy remains null.
- No new phonological realization, IPA mapping or Ukrainian mapping was introduced by this continuation.
- Repository readiness remains **PARTIAL PROTOTYPE**, not release-ready.


## Continuation — terminal optional G2P diagnostic results — 2026-11-14

- Optional workflow [43644381879](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43644381879) completed successfully on exact head `c8c7583d8aa335d17c616ca40c3318f5ef7d15d2`. All three jobs passed: pinned CRF baseline, pinned Google Burmese Thrax/OpenFst build + IPA symbol-table invariant + raw-output smoke, and Epitran raw-output.
- Google Thrax/OpenFst diagnostic: 6/6 structural probes returned outputs; 0 runtime errors; independent gold count 0; accuracy `null`. Report SHA-256: `4cc5260e9def68f4c2a90b84ae0c8ab72fd212129348b37d5b060034a1b91ad9`.
- CRF diagnostic: 100/100 predictions returned; 84/100 source-concordant rows; gold count 0; scoring status `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; accuracy `null`. This is not a measured accuracy or held-out evaluation.
- Epitran 1.35.3 raw-output job completed and uploaded its report; no gold-scored evaluation was performed.
- Uploaded evidence artifacts (available until 2027-02-12 for Google/CRF and 2027-02-12 for Epitran): Google artifact SHA-256 `6315f8ab0b63be26a83f2cd30a2327e65c166e32ebda90c9bc69c5f3afa39399`; CRF `d91d42802ef5ca99c9ab192495a40782a05f8e3eb59801d623c485e111f36817`; Epitran `0574361cfe7b2bc817204debe0608b84f64ddbf68ecfc53299527c1e1fb69696`.
- **Task ledger:** optional pinned Google FST raw-output build/smoke — DONE_VERIFIED; optional CRF/Epitran diagnostic execution and artifact upload — DONE_VERIFIED; comparative phonetic accuracy, model selection and runtime adoption — PARTIAL/BLOCKED by zero independent IPA gold and possible CRF training overlap. No model was promoted into production and no phonetic accuracy is claimed.
- This terminal result supersedes the earlier note that run `43644381879` was still in progress. The required CI on the same head remains successful. Repository readiness remains **PARTIAL PROTOTYPE**, not linguistically release-ready.

## 2026-11-15 — onset/medial evidence register update

- Source-backed onset/medial evidence inventory — PARTIAL pending exact-head CI: 13 source-linked rows, dedicated JSON Schema, and tests added. No phonological runtime or IPA mapping changed.
- Source-scoped prohibition — Green's complex-onset restriction applies to minor syllables, not globally; major syllables permit C(G) in his analysis.
- Modern medial descriptions — YA/RA palatalization, WA glide/rime ambiguity and HA aspiration/fusion remain contextual candidates; Hlaing multi-medial sequences are orthographic-only; STEDT inventories remain profile/historical-specific.
- Remaining acceptance: exact-head CI success; expand only where a source provides exact cluster/lexical evidence; do not infer a complete legality table from the current sources.

## 2026-11-15 completion register — onset/medial evidence and terminology

- Source-backed onset/medial inventory, scoped cluster constraints, schema and integrity tests — **DONE_VERIFIED** (286 Python tests + 68 subtests; 21 Node; 64 Playwright; code/data/test-head CI 43647671663 SUCCESS).
- Cross-source terminology matrix for tone, checked/killed, creaky phonation, vowel quantity/duration, consonant spread-glottis, nasal /N/, medials and transcription conventions — **DONE_VERIFIED** as a source-reconciliation artifact; no runtime rule promoted.
- Duan & Zhu (2025) full text now inspected; reported sample is mixed-region, no audio accessed. This supersedes abstract-only wording in earlier notes.
- Exhaustive modern Yangon cluster legality, lexical distributions and speaker-level acoustic adjudication remain **PARTIAL/BLOCKED** by incomplete source coverage and no independent project IPA gold. All new evidence rows remain runtime WITHHELD.

## 2026-11-15 optional diagnostic terminal results

Run 43647671628 completed successfully: Epitran, CRF and pinned Google Thrax/OpenFst jobs all passed. Google returned 6/6 outputs with 0 runtime errors; CRF returned 100/100 predictions and 84 source-concordant rows. Both report gold_count=0 and accuracy=null; CRF scoring remains NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. Artifacts are retained in GitHub Actions (Google/Epitran until 2027-02-12; CRF until 2026-12-14). No engine was promoted.


## Source-scoped rime and prosody evidence — 2026-11-15

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-PROSODY-MATRIX-001 | DONE_VERIFIED (source evidence artifact and exact-head CI passed) | 11 source-linked rows in `data/burmese/rime_prosody_evidence.csv`; JSON Schema and dedicated regression tests; seven new claims link Green 2005 and Mooney & Repetti-Ludlow 2021 | Mark DONE_VERIFIED only after exact-head CI passes. This is not a complete lexical rime inventory, IPA gold, or runtime rule set. All rows remain WITHHELD. |
| BURMESE-YANGON-RIME-GRID-001 | PARTIAL | Green's 50-rhyme analysis and Mooney's restricted one-speaker experiment provide complementary but non-identical evidence | Need a complete, profile-matched, item-level rime × coda × tone × phonation grid with source locators and adjudication; no extrapolation into missing cells. |


Correction: Green 2005's printed table was checked visually. The rime/prosody evidence CSV now has 12 rows, including the distinct /ɛ/ open-or-pre-/ʔ/ restriction and explicit exclusion of /ɛN/. The machine-readable claim and test were updated; all entries remain WITHHELD.


### Verification checkpoint — 2026-11-15

`BURMESE-RIME-PROSODY-MATRIX-001` remains PARTIAL pending exact-head CI. Code/data/test head: `f0c240abde1a1aedefcfcb3f9694311318f91c04`. Manual registry validation confirms 12 rows, consistent 16-column widths, unique IDs, valid source/claim links and runtime withholding. Earlier CI had two assertion-text failures in the new tests (289 passed + 68 subtests); both were corrected. Latest required workflow `43689588512` is QUEUED. No local tests were run because github.com was unreachable from the container.


Exact-head closeout: workflow [43689588512](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43689588512) SUCCESS on `f0c240abde1a1aedefcfcb3f9694311318f91c04`: 291 Python + 68 subtests, 21 Node, 64 Playwright Chromium, 0 npm vulnerabilities, build and generated-data freshness passed. The artifact is DONE_VERIFIED; full lexical coverage remains PARTIAL.


## G2P optional diagnostic closeout — 2026-11-15

- **DONE_VERIFIED (build/execution only):** optional workflow [43689588524](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43689588524) completed all three jobs; downloaded and inspected the Google FST, CRF and Epitran JSON artifacts.
- Google FST returned 6/6 non-empty raw outputs with zero runtime errors; independent gold=0 and accuracy=null.
- CRF returned 100/100 predictions and 84/100 source-concordant rows; independent gold=0, accuracy=null, and possible train/test overlap remains unresolved.
- Epitran 1.35.3 emitted raw output for six structural probes; eligible verified gold=0 and exact-match accuracy=null.
- This closes the optional workflow execution task only. Engine comparison, accuracy, linguistic validation and runtime promotion remain BLOCKED by absent independent adjudicated IPA gold and unresolved provenance/overlap questions. No runtime mapping changed.


## Accessibility implementation update — 2026-11-15

- **PARTIAL:** added keyboard skip navigation to both `index.html` and `system.html`; the main landmark is now a focusable fragment target. Shared CSS exposes the link on focus and preserves reduced-motion scrolling behavior.
- **PARTIAL / CI PENDING:** added three Playwright regressions covering both entry pages and reduced-motion preference. The exact implementation head is `481c26d6951d4795e16e239f9332c3e42f7d3f44`; hosted CI has not yet been observed for this head.
- **TODO:** manual screen-reader, zoom/reflow, mobile and full contrast QA remain outstanding. No WCAG conformance claim is made.


## Accessibility verification closeout — 2026-11-15

- **DONE_VERIFIED (automated):** keyboard skip navigation on converter and methodology pages; reduced-motion scrolling behavior. Required PR-head CI workflow [43690500850](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43690500850) SUCCESS: 291 Python + 68 subtests, 21 Node, 67 Playwright Chromium.
- Static contrast calculation for eight selected existing color pairs: all sampled ratios are at least 4.56:1. This is a limited sample, not full-page WCAG validation.
- **TODO:** manual screen-reader, mobile, zoom/reflow and comprehensive contrast/state QA. No WCAG conformance claim.


## 2026-11-15 — TUFS rime notation crosswalk extension

- **BURMESE-RIME-PROSODY-MATRIX-001 — PARTIAL / CI PENDING:** expanded from 12 to 15 source-linked rows with three TUFS Section 1.3 crosswalk records for open, nasal-closed and checked rimes. Added schema enum `documentary_crosswalk` and a regression test. The module compares IPA/TLM/NEB/MED 2019/Ohno/Chinese dictionary notations; it is a secondary university reference and explicitly reflects differing phonological interpretations.
- The rows preserve nasalized vowel + /ɴ/ separately from checked /ʔ/, and record MED romanized forms without equating them to IPA or MLCTS. Checked-as-separate vs fourth-tone remains an analysis choice.
- **Runtime status:** all 15 rows WITHHELD. No phonological runtime rules, IPA gold labels or generated data changed.
- **Verification:** university source table inspected; repository tests have not yet been run for this exact update. Await exact-head hosted CI; local test execution unavailable in this connector-only session.
- **Source:** TUFS Burmese Pronunciation Module, §1.3 table 2, https://www.coelang.tufs.ac.jp/mt/my/pmod2/1-3/1.html.


## 2026-11-15 — TUFS rime crosswalk exact-head closeout

- **BURMESE-RIME-PROSODY-MATRIX-001 — DONE_VERIFIED (source-evidence artifact and engineering CI only):** 15 source-linked rows in `data/burmese/rime_prosody_evidence.csv`; all records have 16 valid CSV fields; JSON Schema includes `documentary_crosswalk`; regression test covers open, nasal-closed and checked-closed notation.
- Exact PR-head CI [43691172177](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43691172177) SUCCESS at `673319e267edeca7bf1a4d082fdf17835cfe8ffc`: 292 Python tests + 68 subtests, 21 Node tests, 67 Playwright Chromium tests, 0 npm vulnerabilities, build and generated-data freshness pass.
- Two intermediate CI failures identified CSV field quoting and assertion wording issues; both were corrected before the successful exact-head run.
- **BURMESE-YANGON-RIME-GRID-001 — PARTIAL:** no exhaustive item-level rime × coda × tone × phonation inventory or independent lexical adjudication. The university crosswalk documents its own analytical correspondences and is not direct extraction from MED entries.
- Runtime status remains WITHHELD for all 15 rows. Independent adjudicated IPA gold remains 0; accuracy remains null; no runtime mappings or generated pronunciation data changed.


## 2026-11-15 — am. lexical evidence extension

- Expanded `CLM-WIKTIONARY-AM-DOT-LEXICAL-DISTINCTION-001` and the `am.` row in `romanization_rime_collision_lexical_audit.csv` with three independently listed Wiktionary lemmas: ဆိမ့် /sʰḛɪɴ/, နိမ့် /nḛɪɴ/, လိမ့် /lḛɪɴ/. The first-side set now contains four entries including စိမ့် /sḛɪɴ/; the opposite side remains ကြံ့ /t͡ɕa̰ɴ/.
- Added regression coverage for all five word-level observations, exact MLCTS forms and the no-promotion boundary.
- Evidence remains secondary lexicographic transcription, not a controlled minimal pair or primary MLC adjudication. No runtime, IPA gold, Ukrainian mapping or generated data changed.
- Sources inspected 2026-11-15: Wiktionary pages for ဆိမ့်, နိမ့် and လိမ့်; see claim locator for exact URLs and page-level details.


## 2026-11-15 — am. lexical evidence verification closeout

- **BURMESE-RIME-COLLISION-LEXICAL-AUDIT-001 — DONE_VERIFIED as a secondary lexical audit extension:** Wiktionary first-side examples for `မ့်` expanded to စိမ့် /sḛɪɴ/, ဆိမ့် /sʰḛɪɴ/, နိမ့် /nḛɪɴ/, and လိမ့် /lḛɪɴ/; opposite `ံ့` example ကြံ့ /t͡ɕa̰ɴ/ retained. Claim, audit row and regression test updated.
- Exact-head PR CI [43692035411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43692035411) SUCCESS at `ed16e0b9efba6780e21608ee04a09b1b9915770e`: 293 Python + 68 subtests, 21 Node, 67 Playwright Chromium; npm audit 0 vulnerabilities; build and generated-data freshness passed.
- Evidence remains secondary lexicographic transcription, not a controlled minimal pair or primary MLC adjudication. No independent IPA gold, accuracy evidence, runtime rules or Ukrainian mappings were added.
- **BURMESE-YANGON-RIME-GRID-001 remains PARTIAL.**


## 2026-11-15 — final am. evidence verification

- Exact data/test head `74dc298086292bd6cbaeb965eb1a6ad9e1926a74` passed workflow [43692279971](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43692279971): 293 Python + 68 subtests, 21 Node, 67 Playwright Chromium, npm audit 0 vulnerabilities, build and generated-data freshness pass.
- CSV diff hygiene: one row changed in source claims and one row in the lexical audit relative to pre-change head; unrelated rows preserved. Runtime and generated data unchanged. Documentation-only closeout commits follow this verified code/data head.


## 2026-11-15 — any: lexical evidence extension

- Expanded `CLM-WIKTIONARY-ANY-COLON-WORD-LEVEL-EXAMPLES-001` and the `any:` row in `romanization_rime_collision_lexical_audit.csv` with စဉ်း /sɪ́ɴ/, ကျဉ်း /t͡ɕɪ́ɴ/, and ဖျဉ်း /pʰjɪ́ɴ/. The `ဉ်း` side now has four word-level secondary entries including အကျဉ်း /ʔət͡ɕɪ́ɴ/; the opposite `ည်း` side remains နည်း /nɛ́/ or /ní/.
- Added regression coverage for exact IPA/MLCTS forms and preservation of source-unit distinction.
- Evidence remains secondary lexicographic transcription, not a controlled minimal pair or primary MLC adjudication. No runtime, IPA gold, Ukrainian mapping or generated data changed.
- Pages inspected 2026-11-15: Wiktionary entries for စဉ်း, ကျဉ်း, ဖျဉ်း, အကျဉ်း and နည်း.


## 2026-11-15 — historical orthographic lead for am:

- Registered R. F. St. Andrew St. John, *A Burmese Reader* (1894), after locating the exact form `ကံး` in a vocabulary note with glosses including day/sun. The preface says the spelling generally follows Judson and acknowledges spelling variation among Burmese books.
- Added documentary claim `CLM-STJOHN-1894-AM-COLON-ORTHOGRAPHIC-ATTESTATION-001` and updated the existing `am:` audit row with the historical locator and explicit evidence boundary.
- This is not a modern MLC entry, MLCTS transcription or pronunciation record: no IPA is supplied. `am:` therefore remains `SECONDARY_ONE_SIDE_ONLY`; no runtime, IPA gold or Ukrainian mapping changed.


## 2026-11-15 — im collision component attestation

- Added Wiktionary `တာဝတိံသာ` as a secondary lexical attestation for source unit `ိံ` in the `im` collision. The entry gives IPA `/tàwa̰tèɪɴθà/`, MLCTS `tawa.timsa`, and cites the MLC Myanmar-English Dictionary (1993); its spelling contains component `တိံ`.
- Explicitly attributed IPA to Wiktionary, not MLC. The entry is a Pali-derived proper noun, not a native minimal pair; it supplements but does not replace the existing myG2P component evidence.
- Added claim `CLM-WIKTIONARY-IM-ANUSVARA-COMPONENT-001`, updated the existing `im` audit row and added regression coverage. Status remains `SECONDARY_SYSTEM_EQUIVALENCE`; no runtime, IPA gold or Ukrainian mapping changed.


## 2026-11-15 — um: borrowed-compound dictionary corroboration

- Registered Myanmar Net's dictionary index entry `ဟုမ်းမရူး` (“Home Rule”), with non-IPA respelling `/houn: ma ru:/`; the first component `ဟုမ်း` contains source unit `ုမ်း`.
- Added source `SHWE_NET_HOME_RULE_ENTRY`, claim `CLM-SHWE-UM-COLON-LOAN-COMPOUND-001`, and regression coverage. Explicitly recorded that the site does not identify the underlying dictionary edition in the result and that its respelling is not IPA.
- This is secondary lexical corroboration for a borrowed English compound only. The `um:` row remains `SECONDARY_SYSTEM_EQUIVALENCE`; no runtime, IPA gold or Ukrainian mapping changed.


## 2026-11-15 — aung. evidence-boundary consistency correction

A final cross-check of the existing lexical audit found stale acceptance-boundary wording: the row correctly described myG2P compound-internal attestations for both source units, but later appended text still said the second source unit ေါင့် was “unobserved”. Corrected the boundary in place. The evidence distinction is now explicit: ောင့် has standalone Wiktionary စောင့် /sa̰ʊɴ/; ေါင့် is attested only as segmented components ဒေါင့် /da̰ʊɴ/ in four compounds and ခေါင့် /kʰa̰ʊɴ/ in ဖြစ်ခေါင့်ဖြစ်ခဲ in the pinned myG2P dictionary. Neither component attestation establishes a standalone lexical lemma. The separate TUFS /sâuɴ/ vs Wiktionary /sa̰ʊɴ/ analysis discrepancy for စောင့် remains unresolved. Added regression assertions against stale “unobserved” wording and for the component-only limitation. No evidence status, source claim, runtime, IPA gold, Ukrainian mapping or generated output was promoted or changed.


## 2026-11-15 — aung. acceptance wording / regression alignment

The first exact-head CI after the boundary correction exposed two test assertions that required the literal phrases “not primary” and “no runtime”. The revised boundary already contained the substantive restrictions but did not preserve those repository-wide contract phrases. Updated the wording and aligned the assertion. The failed run recorded 295 passed, 68 subtests passed and 2 failed; it is not counted as a passing verification. A new exact-head run is required before this correction is considered verified.


## 2026-11-15 — time-scope historical TUFS-only gap statement

A further consistency review found that the original TUFS source claim described a one-day source-only pass but ended with a present-tense statement that all eight then-unattested source units “remain unchanged”. Later source passes had since added secondary component-level evidence for ေါင့်, ိံ and ုမ်း. Reworded the claim to make the 2026-11-14 TUFS-only scope explicit and to defer current statuses to the full evidence ledger. Added a regression test preventing this historical source-pass note from being mistaken for a current status snapshot. This does not change any collision status or pronunciation claim.


## 2026-11-15 — final evidence-boundary consistency verification

- Corrected the stale aung. lexical-audit acceptance boundary: the second source unit ေါင့် is attested only as component-level myG2P syllables inside compounds, not as a standalone headword; the separate TUFS/Wiktionary analysis discrepancy for စောင့် remains unresolved.
- Time-scoped the TUFS-only claim CLM-TUFS-LEXICAL-RIME-EXAMPLES-001 to its 2026-11-14 source pass. Its earlier statement that all eight one-sided statuses “remain unchanged” was stale after later evidence additions for ေါင့်, ိံ and ုမ်း.
- Added regression tests for both consistency conditions. The intermediate exact-head run on 7590630 failed two assertions because the new boundary did not preserve the repository's literal wording contract; the wording/test alignment was corrected in b0c0bd1 and the full workflow passed.
- Verified evidence head: 5e10d0c7ed9f737c1ad801d6ee9dc108070bb074. Required workflow [43695743799](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43695743799) SUCCESS (duplicate exact-head workflow [43695747900](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43695747900) also SUCCESS): 298 Python tests + 68 subtests passed, 21 Node tests passed, 67 Playwright Chromium tests passed, npm audit 0 vulnerabilities, production build passed, generated web-data freshness passed, and IPA-gold structure validation completed. Gold remains 0; empirical accuracy remains null.
- Optional diagnostic workflow [43695747910](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43695747910) at last inspection: CRF baseline and Epitran raw-output jobs SUCCESS; Google Thrax/OpenFst build still in progress. Its live job-log endpoint returned BlobNotFound while running, so no completion is claimed here.
- No source evidence status, pronunciation rule, runtime behavior, IPA gold, Ukrainian mapping or generated pronunciation output changed. PR #147 remains open/draft; PR #129 remains untouched; main was not modified.


## 2026-11-15 — current-head verification closeout

- Verified current branch head `1bc34e6d51c9f3589b66f50636fe9e29301ede7f` with required push and PR CI [43696075472](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696075472) / [43696078055](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696078055): 298 Python tests + 68 subtests, 21 Node tests and 67 Playwright Chromium tests passed; npm audit 0 vulnerabilities; build, generated-data freshness and IPA-gold structural validation passed.
- Closed the previously pending optional diagnostic run [43696078060](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696078060): Google Thrax/OpenFst 6/6 outputs, 0 runtime errors; CRF 100/100 predictions and 84 source-concordant (not scored due possible training overlap); Epitran raw-output completed. Artifacts uploaded: FST 14154970133, CRF 14154556115, Epitran 14154307632.
- These are diagnostic execution results only. Independent gold remains 0, accuracy remains null, and no external engine was promoted. No IPA gold, runtime pronunciation rule or Ukrainian mapping was added.
- PR #147 remains open/Draft; PR #129 remains untouched; main unchanged. Overall project status remains PARTIAL PROTOTYPE.



## 2026-11-15 — current-head verification and task-ledger reconciliation

- **DONE_VERIFIED — engineering CI:** workflow [43696922642](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696922642) SUCCESS on exact branch head `9fdac2c94872eeb5702e801e1c46ea5e932ff6ae`: 298 Python tests + 68 subtests; 21 Node tests; 67 Playwright Chromium tests; npm audit 0 vulnerabilities; production build and generated-data freshness passed. IPA-gold structural validation executed successfully but has zero adjudicated records.
- **DONE_VERIFIED — optional diagnostic execution only:** workflow [43696922641](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696922641) SUCCESS. Thrax/OpenFst: 6/6 raw outputs, 0 runtime errors; CRF: 100/100 predictions, 84 source-concordant but `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; Epitran raw-output completed. Artifact IDs 14154897335 / 14154871257 / 14154353595. No metric of phonetic accuracy is available.
- **BLOCKED — independent G2P evaluation:** expert-adjudicated IPA gold remains 0; acceptance requires a documented independent modern Yangon lexical sample with independently annotated IPA, adjudication and provenance.
- **PARTIAL — linguistic coverage:** full Yangon rime × coda × tone × phonation inventory, source-specific rime collision resolution, tone/register model, surface realization of abstract /N/, and Python/browser phonological parity still require completion or evidence-based deferral.
- **TODO — manual accessibility QA:** automated keyboard/Playwright gates are verified, but screen-reader, mobile, zoom/reflow and comprehensive contrast review remain outstanding.
- **DEFERRED — independent IPA annotation:** remains outside the currently authorized scope; do not infer labels from vendor outputs or source phonemic notation.

The current branch remains 1,139 commits ahead of and 0 behind `main`; PR #147 is OPEN / DRAFT / mergeable; PR #129 is untouched; main has not been modified. Overall state: PARTIAL PROTOTYPE, not release-ready.



## 2026-11-15 — SEAlang live-access probe and primary-record blocker

- Re-inspected the live SEAlang Burmese dictionary page. It identifies its principal source as the Myanmar-English Dictionary (1993, Myanmar Language Commission; 1996 Dunwoody Press reprint, used with permission), reports approximately 35,000 entries, confirms MLC 1986 standard orthography, and exposes an IPA phonetics search field. The live HTML form posts to `https://sealang.net/burmese/search.pl`; the documented 2008 SEAlang Services paper describes a Web API for dictionary lookup and gives an example request shape, but does not by itself establish that the legacy API remains operational today.
- Tested the live CGI endpoint with ordinary orthographic targets including `ကမ်း`, `သိမ်း`, and `မြန်မာ`, plus a phonetic query. Each returned the server diagnostic `SNARK: could not read ../../ram//.tei` followed by “Nothing found”; this is an infrastructure/backend failure signal, not evidence that the dictionary lacks those entries. The legacy `api.sealang.net` endpoint could not be reached through the available retrieval proxy (ERR_TUNNEL_CONNECTION_FAILED).
- **BLOCKED — entry-level MLC evidence:** no live dictionary entry, IPA transcription, definition, or export record was retrieved. Do not mark any rime collision resolved or import data from the page's interface metadata. Acceptance requires a functioning record lookup/export or direct inspection of the 1993/1996 dictionary, with exact headword, displayed transcription, query/date and provenance captured. Copyright remains with MLC/Dunwoody Press; retrieval does not grant redistribution rights.
- Useful primary-source access references: [live SEAlang Burmese Dictionary](https://sealang.net/burmese/dictionary.htm), [dictionary query help](https://sealang.net/help/q-dict.htm), and the archived [SEAlang Services API description](https://www.sealang.net/archives/sealang-2008.pdf). These establish interface/search capability and provenance, not entry-level lexical claims.
- No registry rows, source claims, IPA labels, runtime rules, Ukrainian mappings or generated outputs changed as a result of this failed access probe.



## 2026-11-15 — MLC print-source acquisition lead

- **DONE_VERIFIED — bibliographic discovery only:** publisher listing for 1996 reprint of the 1993 MLC Myanmar-English Dictionary; National Diet Library and Cinii catalogue records for 1993/1996; Cinii record for revised 2019 second edition and one University of Tokyo holding.
- **BLOCKED — entry-level pronunciation evidence:** no book page, symbol key or lexical entry has been inspected. Publisher metadata says the 1996 volume includes a transcription system as a pronunciation aid, but does not establish IPA, phonemic notation or a romanization scheme. The 2019 catalogue does not specify whether the field is retained.
- **Acceptance criterion:** inspect the edition-specific symbol key and at least one relevant lexical entry; record page, headword, exact transcription, edition and provenance; classify the notation before crosswalk use. A catalogue entry alone cannot adjudicate an MLCTS collision or supply IPA gold.
- New source/claim IDs: `MLC1996_REPRINT_CATALOG`, `MLC2019_REVISED_BIB`, `CLM-MLC1996-PRONUNCIATION-AID-001`, `CLM-MLC2019-REVISED-EDITION-001`. No pronunciation, IPA gold, runtime or Ukrainian mapping was added.



## 2026-11-15 — current registry totals and reference integrity

- Current canonical data: **96 sources / 207 claims / 25 rime groups**.
- Rime statuses: 15 secondary equivalence, 5 secondary one-side-only, 3 secondary distinction, 1 secondary conflict, 1 special non-rime.
- Structural validation: unique source IDs, unique claim IDs, and all 207 claim-to-source references resolve. This lightweight parse does not replace JSON Schema validation/full pytest.
- Prior 80/164, 80/169, 80/170 and 80/172 figures are retained as historical checkpoints only.


## 2026-11-15 — current research-head CI and diagnostics closeout

- Current research branch head: `46dff7de598faf5b3b5c64b6664d71594b7db2e3`. PR #147 is OPEN / DRAFT / mergeable; it targets unchanged `main` at `dc90463bdd734867308f03cb627eb8941efc19d6`. Current compare: 1,154 commits ahead, 0 behind; PR reports 75 changed files. This is a PR branch, not a merge or release. PR #129 remains OPEN / DRAFT / non-mergeable and untouched; its separate hybrid-engine changes were not ported. Main remains unchanged.
- Required PR workflow [43710301855](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43710301855) completed SUCCESS for PR head `46dff7de598faf5b3b5c64b6664d71594b7db2e3`; GitHub executed the PR merge ref `690ebffee749b50f0d1a538e5ed4a7666eb6ce9d` against base `dc90463bdd734867308f03cb627eb8941efc19d6`. Job log confirms 298 Python tests + 68 subtests passed, 21 Node tests passed, and 67 Playwright Chromium tests passed. `npm audit` found 0 vulnerabilities; production Vite build, generated web-data freshness check, Chromium installation and IPA-gold structural validator all completed successfully. The validator still reports 0 adjudicated gold records; this is not an accuracy result.
- Optional diagnostic workflow [43710301845](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43710301845) completed SUCCESS on the same PR head. Google Thrax/OpenFst: 6/6 raw outputs, 0 runtime errors, independent gold 0, accuracy null; report SHA-256 `a2e0f0412f077d48610c2c657de32fd5f7f411d7c6682b9b4dbf8ca8c7168b8d`, artifact 14160556430. CRF: 100/100 predictions, 84 source-concordant rows, gold 0, accuracy null, `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; artifact 14160147661. Epitran raw-output-only job completed and uploaded artifact 14159923488; report SHA-256 `28fcbee05ad29766a7947e31925650ddb04ca40803a63b86c0a81fd617c3e272`. These are diagnostic execution/provenance only, not phonetic accuracy or promotion evidence.
- Current canonical registry snapshot remains 96 sources / 207 source claims / 25 rime-collision groups. IDs and claim-to-source references passed the separately recorded structural parse; this does not replace schema validation. No source-level IPA, runtime phonological rule, Ukrainian mapping or generated pronunciation output was added in this closeout.
- Task ledger: DONE_VERIFIED — hosted engineering CI on the PR merge ref; DONE_VERIFIED — optional diagnostic execution only; PARTIAL — Yangon rime/coda/tone/phonation coverage, surface /N/ realization and Python/browser phonological parity; BLOCKED — independent G2P accuracy because adjudicated IPA gold=0 and SEAlang entry-level lookup fails; TODO — manual accessibility QA (screen reader, mobile, zoom/reflow and comprehensive contrast); DEFERRED — independent IPA annotation, which remains outside the currently authorized scope.
- Overall readiness remains PARTIAL PROTOTYPE, not linguistically release-ready. No local checkout or local test execution was available; all test evidence above is from hosted GitHub Actions. No merge, release, or main-branch write was performed.


## 2026-11-15 — exact current-head verification and ledger reconciliation

- Current dedicated branch tip at this checkpoint: `b4c0d549f96bc9c825cce770a94f9dbc0b470a0a`; base `main` remains `dc90463bdd734867308f03cb627eb8941efc19d6`. PR #147 is OPEN / DRAFT / mergeable, 1,157 commits ahead and 0 behind, with 75 changed files. PR #129 remains OPEN / DRAFT and untouched; its separate hybrid-engine code was not ported. No merge, release, or main-branch write was performed.
- Required tests workflow [43712553644](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43712553644) completed SUCCESS on this exact PR head. Every job step succeeded: independent IPA-gold structural validator, Python dependency install and pytest, npm ci, high-severity npm audit gate, production build, generated-web-data freshness check, Node tests, Chromium installation, and built-browser Playwright tests. The validator's successful execution does **not** mean gold readiness: adjudicated IPA records remain 0.
- Optional diagnostic workflow [43712553686](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43712553686) completed SUCCESS; all CRF, raw-output, and Google Thrax/OpenFst jobs and their artifact uploads succeeded. These are diagnostic execution/provenance only. With no independent adjudicated IPA gold, no accuracy or model-promotion claim is made.
- Canonical registry snapshot remains **96 sources / 207 claims / 25 rime-collision groups**. The separately recorded structural parse found unique source/claim IDs and no broken claim-to-source references; this is not a substitute for schema validation or the full test suite.
- Task ledger: **DONE_VERIFIED** — hosted engineering CI on exact head; **DONE_VERIFIED** — optional raw diagnostic execution only; **PARTIAL** — Yangon rime/coda/tone/phonation coverage, surface realization of abstract /N/, and Python/browser phonological parity; **BLOCKED** — independent G2P evaluation (0 adjudicated IPA gold) and MLC entry-level evidence (SEAlang backend failure; print dictionary pages not inspected); **TODO** — manual accessibility QA (screen reader, mobile, zoom/reflow, comprehensive contrast); **DEFERRED** — independent IPA annotation remains outside the currently authorized scope.
- No new phonological rule, IPA label, Ukrainian mapping, or generated pronunciation output was justified by this documentation/CI checkpoint. Overall readiness remains **PARTIAL PROTOTYPE — not linguistically release-ready**. Verification is hosted GitHub Actions; no local checkout or local test execution was available.


## 2026-11-15 — PR head CI completed and public status text reconciled

- Exact current branch head before this documentation update: `abb3fb03c024ed55cdfddbd9dc9483b89a31f4b4`; PR #147 remains OPEN / DRAFT / mergeable, 1,158 commits ahead of unchanged `main` and 0 behind. PR #129 remains OPEN / DRAFT / non-mergeable and untouched.
- Required tests workflow [43720145772](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43720145772) completed SUCCESS. Its steps include independent IPA-gold structure validation, Python pytest, npm install/audit, production build, generated-data freshness, Node tests, Chromium install and built-browser Playwright tests. All steps passed; zero adjudicated IPA gold records remain a data limitation, not a CI failure.
- Optional diagnostics [43720145675](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43720145675) completed SUCCESS for CRF baseline, raw-output and Google Thrax/OpenFst jobs. Successful raw-output execution is not accuracy evaluation or model-promotion evidence.
- Updated `index.html` and `system.html` to remove the stale statement that current-branch CI was still running. The public status now links to exact workflow runs, states that the PR branch has not been deployed to GitHub Pages, and retains the zero-gold caveat. Historical merged-commit Pages status remains identified as historical.
- Existing task ledger remains: DONE_VERIFIED — engineering CI and raw diagnostic execution; PARTIAL — modern Yangon rime/coda/tone/phonation, /N/ surface realization and Python/browser parity; BLOCKED — independent G2P accuracy (0 adjudicated IPA gold) and MLC lexical entry evidence; TODO — manual accessibility QA; DEFERRED — independent IPA annotation.
- No phonological runtime rules, IPA labels, Ukrainian mappings, or lexical claims were changed. Readiness remains PARTIAL PROTOTYPE, not linguistically release-ready. No deployment, merge, or main-branch write was performed.


## 2026-11-15 — Repetti-Ludlow 2023 sonorant phonetics evidence

- Re-inspected the full primary article, Chiara Repetti-Ludlow, “Acoustic correlates of Burmese voiced and voiceless sonorants,” Phonetica 80(6), 433–463, DOI 10.1515/phon-2022-0026. The source was already registered; six new source claims and a six-row machine-readable evidence matrix now expose the findings and limits.
- The article's inventory summary reports six voiced/voiceless sonorant pairs, but its controlled production study tests only four pairs ([w, l, ŋ, m] and their voiceless counterparts), two tones (high/low), one /a/ nucleus, phrase-medial tokens, and nine speakers. It excludes [n, ɲ] and creaky/killed tones. This is not a complete Yangon phonetic inventory.
- The study reports a separately identifiable spread-glottis period in 78% of voiceless tokens and no separately segmented SG period in 22%; average SG duration when present was 100.74 ms. Crucially, the non-SG tokens still show voicelessness-related F0 and following-vowel SoE differences. Therefore absence of audible/segmented SG must not be equated with phonological voicing.
- The study's acoustic results show why a single duration rule is unsafe: the voiced portion of a voiceless sonorant is shorter than voiced sonorants, but adding the SG portion makes the full voiceless sequence longer. The article's LDA reports 86.7% overall internal accuracy but only 5.4% correct classification for non-SG voiceless tokens; neither figure is a project G2P benchmark.
- Added the sonorant phonetics CSV, JSON Schema and tests; linked six documentary claims to existing source REPETTI2023_BURMESE. All rows are WITHHELD; no IPA gold, Myanmar grapheme mapping, runtime rule or Ukrainian mapping was added. README now links the matrix.
- Acceptance: source/claim links, schema validation, unique IDs and explicit withholding are tested. The evidence can guide later analysis of voiceless sonorants but cannot by itself resolve Myanmar orthographic correspondences or justify a universal /h/ + sonorant output.


## 2026-11-15 — exact-head CI, sonorant evidence and responsive smoke-test closeout

- Verified code/test head before this documentation-only update: `6ab325848adc56ea92bfe2436e71962e6e54a0e1`. PR #147 remains OPEN / DRAFT / mergeable; branch is 1,170 commits ahead and 0 behind unchanged `main` (`dc90463bdd734867308f03cb627eb8941efc19d6`), with 78 changed files. PR #129 remains OPEN / DRAFT / non-mergeable and untouched.
- Exact-head PR tests [43723178115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43723178115) and push tests [43723171470](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43723171470) completed SUCCESS. Verified job log: 303 Python tests + 68 subtests; 21 Node tests; 68 Playwright tests; npm audit 0 vulnerabilities; production build and generated-data freshness passed.
- The new Playwright responsive smoke test covers both `index.html` and `system.html` at 320, 375 and 768 CSS px. It verifies no page-level horizontal overflow and that the methodology table retains an inner horizontal scroller at 320 px. The test exposed real overflow in the research notice and methodology page; CSS now allows notice text to shrink/wrap, constrains the table scroller, and contains document overflow. The final exact-head CI passed. This is automated responsive coverage, not a complete accessibility audit.
- Sonorant evidence: six new documentary claims and six rows in `data/burmese/sonorant_phonetics_evidence.csv`, backed by the already-registered Repetti-Ludlow 2023 article. Schema, source/claim referential links, unique IDs and `WITHHELD` runtime status are tested. Registry now has 96 sources and 213 claims; rime-collision matrix remains 25 groups. All six sonorant evidence rows remain withheld from runtime; no orthographic mapping, IPA gold or Ukrainian mapping was added.
- Verification history is retained rather than hidden: an initial homepage status edit broke an existing exact-text assertion; the text was corrected. The new mobile smoke test then exposed 320 px overflow on the homepage and methodology table. The CSS fixes and final 68-test Playwright pass are on the verified head above.
- Optional diagnostics [43722971858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43722971858) completed SUCCESS on the immediately preceding code head `0059d4af`; CRF, raw-output and Thrax/OpenFst jobs succeeded. Exact-head diagnostic run [43723178156](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43723178156) completed SUCCESS with all three jobs (CRF, raw-output, Google Thrax/OpenFst). These are execution/provenance results only; no accuracy or promotion claim is made because adjudicated IPA gold remains 0.
- Updated public status text to the latest verified code/test head and distinguished CI from deployment. The branch remains undeployed on GitHub Pages. Manual screen-reader testing, full keyboard flow, zoom/reflow beyond the automated viewport smoke test, and comprehensive contrast/state QA remain TODO; automated mobile smoke coverage is now DONE_VERIFIED.
- Task ledger: DONE_VERIFIED — exact-head engineering CI; DONE_VERIFIED — six-row source-scoped sonorant evidence schema and traceability tests; DONE_VERIFIED — narrow-viewport smoke tests and inner table scrolling; PARTIAL — Yangon rime/coda/tone/phonation coverage, surface `/N/` realization and Python/browser phonological parity; BLOCKED — independent G2P accuracy (0 adjudicated IPA gold) and MLC lexical entry evidence (SEAlang backend failure; print dictionary pages not inspected); TODO — remaining manual accessibility QA; DEFERRED — independent IPA annotation remains outside the authorized scope.
- Overall readiness remains PARTIAL PROTOTYPE, not linguistically release-ready. No merge, deployment, release, or `main`-branch write was performed.


## 2026-11-15 — documentation-head CI confirmation

- The documentation/status-only follow-up commit `fae584bea5ac580a535ce8c97c7c10c4a7d3f2cd` also passed exact-head PR tests [43723405031](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43723405031) and push tests [43723400788](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43723400788): 303 Python tests + 68 subtests, 21 Node tests, 68 Playwright tests, npm audit 0 vulnerabilities, production build and generated-data freshness all passed. This confirms the final documentation state does not break the verified build.


## 2026-11-15 — ICPhS 2023 phrase-position sonorant evidence

- Added a separately registered primary source, Chiara Repetti-Ludlow, “Acoustic Correlates and Contrast Maintenance in Burmese Voiceless Sonorants,” ICPhS 2023 proceedings paper 104 (https://www.internationalphoneticassociation.org/icphs-proceedings/ICPhS2023/full_papers/104.pdf). Do not conflate this study with the same author's separate Phonetica 2023 article (DOI 10.1515/phon-2022-0026): the ICPhS paper reports 79% preaspiration, while the Phonetica study reports 78% separately identifiable spread-glottis periods.
- Added four documentary claims and four evidence rows. The ICPhS design covers four sonorant pairs, high/low tones, /a/, three phrase positions, nine speakers and 144 target phrases. Its key result is position-conditioned cue reweighting: following-vowel SoE distinguishes voicing in phrase-initial/medial but not phrase-final position, where HNR gains importance after final-vowel devoicing. The paper does not report loss of the underlying voicing contrast.
- Added schema enum values and regression tests for the restricted study scope, the distinct 79% rate, phrase-final cue reweighting and non-transferability of internal LDA percentages. All evidence rows remain WITHHELD; no IPA, grapheme mapping, Ukrainian mapping or runtime behavior changed.
- Registry checkpoint after this addition: 97 sources, 217 documentary claims, 10 sonorant evidence rows; rime/collision groups remain 25. This is a documentary evidence expansion, not full phonological coverage or a gold corpus.


## 2026-11-15 — phrase-position sonorant evidence and final test reconciliation

- Independent primary-source inspection of the full ICPhS 2023 proceedings paper 104 by Repetti-Ludlow added a separate source record `ICPH2023_BURMESE_SONORANTS`, four documentary claims and four structured evidence rows. The paper's restricted design is four sonorant pairs, high/low tones, /a/, three phrase positions, nine speakers and 144 target phrases. It reports preaspiration in 79% of voiceless-sonorant tokens, with phrase-conditioned cue reweighting: following-vowel SoE differentiates voicing initially/medially but not finally, where HNR becomes more important after final-vowel devoicing. This is a distinct experiment from the same author's Phonetica 2023 paper, whose separately segmented spread-glottis period occurs in 78% of tokens. The 79% and 78% figures are not pooled.
- The internal LDA results in the ICPhS paper (84% initial; 87% medial and final) are explicitly marked as paper-specific internal classification, not project G2P accuracy. No classifier scores are promoted to project metrics.
- Final evidence registry checkpoint: **97 sources / 217 documentary claims / 10 sonorant evidence rows / 25 rime-collision groups**. All ten sonorant rows are `WITHHELD`; no runtime rules, IPA labels, Myanmar grapheme mappings or Ukrainian mappings were changed.
- Test-first correction history: the first test run caught two stale assertions (the previous six-row count and an over-specific phrase in the new cue-reweighting assertion). Both were corrected. The corrected exact-head commit `0738bc0058a48fdea6e4e05b43240c2be9ef7bbe` passed push workflow [43728402206](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43728402206): **307 Python tests + 68 subtests, 21 Node tests, 68 Playwright tests**, npm audit 0 vulnerabilities, production build, generated-data freshness and built-browser tests all SUCCESS. The exact-head PR workflow [43728408272](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43728408272) and optional diagnostics [43728408324](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43728408324) were still running at this documentation checkpoint; do not mark them successful until their terminal results are inspected.
- Current branch checkpoint: `0738bc0058a48fdea6e4e05b43240c2be9ef7bbe`; PR #147 remains OPEN / DRAFT; branch is 1,176 commits ahead and 0 behind `main`. No merge, release, deployment or main-branch write was performed.
- Research consequence: voiceless-sonorant phonetic evidence is now better conditioned by phrasal position, but the study's limited segment/tone/vowel inventory prevents generalizing these patterns to all Burmese syllables. Readiness remains PARTIAL PROTOTYPE; independent adjudicated IPA gold remains 0.


## 2026-11-15 — exact-head optional diagnostics completed (80a56aca)

- Re-ran and inspected optional diagnostics on exact branch HEAD `80a56aca4ce8a870e7f927457397b8cc5f4e51e3`, workflow [43728555011](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43728555011): all three jobs completed SUCCESS — Epitran raw output, pinned CRF baseline, and Google Burmese Thrax/OpenFst raw output. The Google FST build, IPA symbol-table uniqueness/currentness checks and six-probe smoke run all passed.
- Diagnostic interpretation remains strictly non-evaluative: Google FST returned 6/6 outputs with 0 runtime errors but `independent_gold_count=0` and `accuracy=null`; CRF returned 100/100 predictions and 84/100 source-concordant rows but `gold_count=0`, `accuracy=null`, `scoring_status=NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`. Epitran raw-output generation completed and its report was uploaded; none of these outputs establishes transcription accuracy or authorizes production promotion.
- Exact-head engineering CI on the same commit also passed: push workflow [43728550185](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43728550185) and PR workflow [43728555022](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43728555022) SUCCESS. Push job logs show 307 Python tests + 68 subtests, 21 Node tests, 68 Playwright tests, npm audit 0 vulnerabilities, production build, generated-data freshness and IPA-gold structural validation all successful.
- Ledger update: DONE_VERIFIED — exact-head optional diagnostic execution/build/smoke gates; BLOCKED — empirical G2P scoring and engine comparison because independent adjudicated IPA gold count remains zero (and CRF probe has possible training overlap). The diagnostic engines remain research-only.
- Branch remains `research/burmese-medials-g2p-evidence-2026-11-13`; this is a documentation-only checkpoint. Readiness remains PARTIAL PROTOTYPE. No runtime rules, IPA annotations, mappings, merge, deployment, release or `main` write were made.


## 2026-11-15 — exact latest-head diagnostics and CI (4392c260)

- Exact branch-head required tests workflow [43730553035](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43730553035) completed SUCCESS on `4392c2607c9489b20c26435a1a98e88fc3f149c4`: 307 Python tests + 68 subtests; 21 Node tests (0 failures); 68 Playwright Chromium tests; npm audit 0 vulnerabilities in both package trees; IPA-gold structural validator, production build and generated-data freshness passed.
- Exact-head optional diagnostic workflow [43730553089](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43730553089) completed SUCCESS for all three jobs. Epitran raw-output report SHA-256 `4d1fe487182b8f23cdf05b6285a38b8c3bca24ac24a47f4a76e0d46c717bdd02`; CRF: 100/100 predictions, 84/100 source-concordant, `gold_count=0`, `accuracy=null`, `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; Google Thrax/OpenFst: 6/6 outputs, 0 runtime errors, `independent_gold_count=0`, `accuracy=null`, report SHA-256 `89690711a9b38ffc72895e73dae41e4b88c890257bacfc805576c1cdfa618058`. Artifact IDs: Epitran `14167599905`, CRF `14168550164`, Google FST `14168291361`.
- These outcomes verify diagnostic execution only. They do not provide independent accuracy evidence, do not resolve potential CRF training overlap, and do not authorize any engine for production. IPA-gold validator reports zero adjudicated records / `NOT_READY_NO_ADJUDICATED_GOLD`.
- Ledger: DONE_VERIFIED — exact-head required engineering CI and optional diagnostic execution/build/smoke gates. BLOCKED — empirical G2P scoring until independent expert-adjudicated IPA gold is populated and overlap-free evaluation is defined. Repository remains PARTIAL PROTOTYPE, not linguistically release-ready.
- No runtime rule, IPA annotation, Ukrainian mapping, merge, release, deployment or `main` change was made.


## 2026-11-15 — Waxman (2018) secondary characterization of MED transcription

- Registered Nathan A. Waxman's conference abstract “The Myanmar English Dictionary (MED) at 25: Trends in Burmese Lexicography for the Anglophone World” (13th International Burma Studies Conference, 2018, p.49) as `WAXMAN2018_MED_AT_25`, with one documentary claim `CLM-WAXMAN2018-MED-TRANSCRIPTION-CHARACTER-001`.
- The abstract characterizes the 1993 MED transcription system as novel and arguably more phonologically transparent, channeling tonal graphemic elements of Burmese script. This adds a secondary description of the dictionary's design intent, but does not reveal the notation key, exact tonal symbols, lexical entries, or whether its transcription is IPA, MLCTS2, or another system. The full paper and dictionary pages were not inspected. Do not treat this as an implementation specification or as evidence that the MED notation is identical to IPA/MLCTS2.
- Added a regression test asserting source/claim linkage and the secondary-only, non-operational evidence boundary. No runtime rule, IPA label, Ukrainian mapping or gold annotation changed.
- Source: https://www.centerforburmastudies.com/uploads/5/2/1/8/52185987/abstracts_template_final_draft_7-30.pdf (conference abstract, p.49).


## 2026-11-15 — Waxman source registration and exact-head verification (23983ab8)

- Added one secondary conference-abstract source and one documentary claim for Nathan A. Waxman (2018), “The Myanmar English Dictionary (MED) at 25: Trends in Burmese Lexicography for the Anglophone World,” p.49. The claim is limited to the abstract's characterization of the MED transcription as relatively phonologically transparent and reflective of tonal graphemic elements. The full paper, notation key and dictionary entries were not inspected; this is not an IPA, MLCTS2 or runtime specification.
- Added a regression test for source/claim referential integrity and the non-operational evidence boundary. The first two test attempts exposed only case-sensitive wording mismatches in the new test assertions; both assertions were corrected to match the registered source wording. No production code or linguistic claim was weakened to make the test pass.
- Exact PR merge-ref tests [43731256990](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43731256990) completed SUCCESS on PR head `23983ab8ade692e1795039dd114c352dddee16ef`: **308 Python tests + 68 subtests**, **21 Node tests**, **68 Playwright Chromium tests**, npm audit 0 vulnerabilities in both package trees, IPA-gold structural validation, production build and generated-data freshness all passed. Validator still reports 0 adjudicated gold records / `NOT_READY_NO_ADJUDICATED_GOLD`.
- Structural registry parse on the same branch found **98 sources / 218 claims**, unique IDs, consistent CSV widths, no broken claim→source references, **15 rime/prosody evidence rows** and **25 rime-collision groups**. This structural parse supplements but does not replace the passing pytest/schema gates.
- Optional diagnostics [43731256987](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43731256987): Epitran raw-output and CRF jobs completed SUCCESS; CRF returned 100/100 predictions and 84/100 source-concordant rows, but `gold_count=0`, `accuracy=null`, and `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`. Google Thrax/OpenFst build was still in progress at this checkpoint; do not mark that job complete until its terminal status and smoke report are inspected.
- Task ledger: DONE_VERIFIED — source/claim registration and regression guard; DONE_VERIFIED — exact-head engineering CI; PARTIAL — full Yangon lexical rime/coda/tone/phonation grid, /N/ surface realization and Python/browser parity; BLOCKED — independent G2P accuracy (0 adjudicated IPA gold) and MLC entry-level transcription evidence (SEAlang backend failure; physical dictionary pages not inspected); TODO — manual screen-reader/mobile/zoom/contrast accessibility QA; DEFERRED — independent IPA annotation remains outside current authorized scope.
- No runtime phonology, IPA labels, Ukrainian mappings, gold annotations, merge, deployment, release or `main` write occurred. Overall readiness remains PARTIAL PROTOTYPE, not linguistically release-ready.


## 2026-11-15 — final optional diagnostics on Waxman test head (23983ab8)

- Follow-up to the in-progress note above: optional workflow [43731256987](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43731256987) completed SUCCESS for all three jobs on PR head `23983ab8ade692e1795039dd114c352dddee16ef`.
- Epitran 1.35.3 raw-output report SHA-256 `b695085d4c4528411576f2362b5d13740e6fc06b82afbe380e018b89b9a5ace5`, artifact `14168731263`.
- CRF returned 100/100 predictions and 84/100 source-concordant rows; `gold_count=0`, `accuracy=null`, `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; artifact `14168446496`.
- Google Burmese Thrax/OpenFst built successfully; all IPA symbol-table invariant checks passed; 6/6 structural-only probes produced outputs with 0 runtime errors; `independent_gold_count=0`, `accuracy=null`; report SHA-256 `c86d41b71a02c4d51f3cf5e432926e5d6993e9dff608426c745fd335e0e63296`, artifact `14168621272`.
- These are successful build/raw-output diagnostics only. They do not establish accuracy or production readiness. Independent adjudicated IPA gold remains zero; CRF overlap remains unresolved.
- Required exact-head tests workflow [43731256990](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43731256990) SUCCESS: 308 Python tests + 68 subtests, 21 Node tests, 68 Playwright tests, npm audit 0 vulnerabilities, build and generated-data freshness pass.

## 2026-11-15 — Mya2Rom source reconciliation and final verification checkpoint

- The MED-related Mya2Rom statement was reconciled against the repository's existing vendored source MYA2ROM044 and existing claims CLM-MYA2ROM-SEALANG-MLCTS2-001, CLM-MYA2ROM-MLCTS-VS-MLCTS2-001 and CLM-MYA2ROM-LIMITATIONS-001. No duplicate source/claim records were retained.
- Added a regression test over those existing records. It checks that orthographic MLCTS remains distinct from MLCTS2, MLCTS2 is not conflated with the separate IPA mode, and the documented limitations remain part of the evidence boundary.
- Exact-head workflow [43734174785](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43734174785) SUCCESS on code-and-documentation head 6e7de3255e982e6065c9875fc5cab14db295c7cc: **309 Python tests + 68 subtests**, **21 Node tests**, **68 Playwright Chromium tests**, production build, generated-data freshness and npm audit (0 vulnerabilities) all passed.
- IPA gold validator remains NOT_READY_NO_ADJUDICATED_GOLD with 0 adjudicated records. This CI result verifies engineering contracts, not linguistic accuracy. The MLC primary notation key and independent lexical gold remain blocked.
- No runtime, IPA labels, gold annotations, Ukrainian mappings, deployment, release, merge or main write occurred. Readiness remains PARTIAL PROTOTYPE.


## 2026-11-15 — exact latest-head CI and public status reconciliation (`8e95ff21`)

- Re-fetched the research branch ref and confirmed exact HEAD `8e95ff211cea94bf6d16c3acc1387b109de92fe4`; PR #147 remains OPEN / DRAFT / mergeable against `main`. PR #129 remains OPEN / DRAFT / non-mergeable and was left untouched. `main` is unchanged.
- Required exact-head workflow [43734367695](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43734367695) completed SUCCESS on this exact SHA. Inspected job logs: **309 Python tests + 68 subtests**, **21 Node tests**, **68 Playwright Chromium tests**; both npm audit checks reported 0 vulnerabilities; production build, generated-data freshness and Chromium browser suite passed. IPA-gold structural validation executed but still reports 0 adjudicated records / `NOT_READY_NO_ADJUDICATED_GOLD`.
- Reviewed the browser test suite and both public HTML pages. Existing automated accessibility-related coverage includes keyboard skip-navigation on both pages, focusable main content, and no page-level horizontal overflow at 320/375/768 px; CSS provides visible focus outlines. These checks do **not** verify screen-reader announcements, contrast compliance, touch target quality on real devices, or manual focus order. Manual accessibility QA remains TODO.
- Corrected stale branch-verification claims in `index.html` and `system.html`: they now cite the exact verified HEAD/workflow and distinguish automated keyboard/responsive checks from manual assistive-technology QA. No linguistic/runtime behavior changed.
- Independent adjudicated IPA gold remains 0; empirical G2P accuracy remains null. Primary MED notation key/page-located entries, full Yangon lexical coverage, /N/ surface realization and parity against independent gold remain unresolved. Repository readiness remains PARTIAL PROTOTYPE, not linguistically release-ready.
- This continuation is documentation-only. No runtime mappings, IPA annotations, Ukrainian candidates, source evidence, branch protection, deployment, release, merge or `main` write were changed.


## 2026-11-16 status reconciliation (no new linguistic labels)

- Rechecked current `main` at `0f752b172b7c3bcc7f6b88c0204b7f27c9d9b10e` after PRs #160–#163. Exact-main engineering CI [43868521807](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43868521807) and Pages deployment [43868521797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43868521797) both completed SUCCESS. These runs verify engineering/build/deployment contracts only.
- No new source-attested IPA, Ukrainian linguistic correspondence, lexical gold row, or adjudication was produced in this continuation. Independent profile-matched adjudicated IPA gold remains **0**; empirical accuracy remains **null / NOT MEASURED**.
- **PARTIAL:** Yangon lexical rime/coda/tone/phonation and medial coverage; contextual /N/ realization; Python/browser phonological parity against independent references; MLCTS inventory/source conformity.
- **BLOCKED:** primary MLC notation key and page-located dictionary entries, plus independent reuse-rights verification. Vendor-derived Mya2Rom tables remain evidence-limited and cannot be promoted to primary MLC evidence.
- **DEFERRED:** independent IPA annotation/pilot remains deferred per project-owner direction. Issue #85 remains open; its prerequisites (approved convention, independent annotators/adjudicator, curator, blind intake, source/rights-cleared sample) are not satisfied. No one has been contacted or recruited.
- No runtime rules, IPA labels, gold data, Ukrainian mappings or linguistic source claims were changed. Do not treat engineering CI or external-provider agreement as linguistic validation.


## 2026-11-16 — final exact-main verification after PR #164

- **Current default branch:** `main`; exact HEAD `372727de8ea2a2a61570c8dc880433e325230683`. PR [#164](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/164) merged the documentation reconciliation as this commit. No runtime, linguistic-data, IPA-label, Ukrainian-mapping, licensing, or release change was made by PR #164.
- **DONE_VERIFIED — exact-main engineering CI:** [test workflow 43887822173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43887822173) completed SUCCESS on the exact SHA. Inspected job log: **315 Python tests + 68 subtests**, Node tests, production build, generated-data freshness, npm tests, **71 built-browser Playwright tests**, and both npm audit checks (**0 vulnerabilities**) passed. All 18 configured job steps succeeded.
- **DONE_VERIFIED — exact-main Pages deployment:** [Pages workflow 43887822197](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43887822197) completed SUCCESS on the exact SHA. All 24 build-job steps and all 4 deploy-job steps succeeded. This includes pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, complete browser input-alphabet check, upstream `thrax_g2p` parity, production build/tests, artifact upload, deployment and live smoke test. The smoke test fetched homepage, `system.html`, built JS/CSS, Mya2Rom assets and Google WFST JSON, then verified `available=true` and `arc_count>0`.
- **Public deployment:** https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ — exact deployment version `372727de8ea2a2a61570c8dc880433e325230683` reported successful.
- **PR reconciliation:** only open PR is [#129](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/129), still a stale divergent draft. It remains untouched: its benchmark/hybrid functionality is already represented and evolved on current main; its old snapshot is not to be merged or cherry-picked blindly.
- **Research/accessibility boundary unchanged:** independent profile-matched adjudicated IPA gold remains **0**; empirical accuracy remains **null / NOT MEASURED**. Phonological coverage and primary MLC/MLCTS evidence remain incomplete; full manual screen-reader, physical-device/touch-target, zoom/reflow and comprehensive contrast/state QA remain TODO. Independent IPA annotation remains DEFERRED per owner direction; issue #85's human prerequisites are unmet.
- **Task ledger:** DONE_VERIFIED — exact-main CI, Pages deployment and live smoke for this SHA; PARTIAL — Yangon phonological coverage, MLCTS source conformity and parity against independent gold; BLOCKED — primary MLC notation/entry evidence and item-level reuse rights; TODO — remaining manual accessibility QA; DEFERRED — independent IPA annotation and stale PR #129 integration.
- **Readiness:** deployed engineering/research prototype, **not linguistically release-ready** and not WCAG-conformance-certified. Hosted GitHub Actions are the verification evidence; no local checkout/test execution is claimed.


## Registry data-integrity checkpoint — 2026-11-17

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-FINALS-REGISTRY-CSV-001 | DONE_VERIFIED (CSV structure only) | `data/burmese/finals.csv` header corrected from four columns to five; `tests/test_finals_registry.py` verifies field alignment, source references and evidence-status values. Hosted PR test run [44151973458](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44151973458): pytest passed; the workflow then failed at the separate npm audit gate. | This does not establish any new Burmese coda or final realization. Keep asat, anusvara, visarga, kinzi, abstract /N/, glottal /ʔ/ and surface nasalization distinct. Full CI remains blocked by GHSA-fc5q-39xc-vjpf / CVE-2026-112366 until a safe dependency path is available. Independent IPA gold remains 0. |


### Exact-head engineering verification — 2026-11-17

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-FINALS-REGISTRY-CSV-001 | DONE_VERIFIED (CSV structure and hosted regression tests) | Exact-head pytest in [44152143092](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44152143092): 317 passed, 68 subtests; IPA corpus structure validation also passed. Exact-head Pages build [44152143185](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44152143185) SUCCESS: Google WFST build/parity, production build, Node tests and built-site Playwright all passed; Pages artifact uploaded (ID 14360401415). | Pages PR preview did not deploy to production. Main test workflow still fails at mandatory npm audit high-severity gate for transitive picomatch. This verifies engineering behavior only; no Burmese coda/final phonetic realization or IPA gold claim is established. |

**Security gate remains BLOCKED:** the exact-head main test run failed only after pytest and `npm ci` at the mandatory high-severity npm advisory check; later steps in that workflow were skipped. Separate Pages workflow confirms the build/test/browser path succeeds when it reaches those steps, but does not resolve the vulnerability or make the required test workflow green. Do not bypass audit or perform an unverified breaking downgrade. Independent profile-matched IPA gold remains 0; accuracy remains null.


### npm advisory dependency trace — 2026-11-17

- Resolved `picomatch@4.0.7` is a transitive development dependency through `vite@8.3.8` (`^4.0.7`) and `tinyglobby@0.2.17` (`^4.0.4`). No direct application dependency was identified.
- GHSA [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) has no official fixed release/version listed. Upstream issue [micromatch/picomatch#247](https://github.com/micromatch/picomatch/issues/247) is the relevant remediation discussion. Upstream PR #194 is unrelated to this ReDoS advisory and must not be treated as a fix.
- No third-party fork, override, downgrade, audit bypass or lockfile fabrication was accepted. **Status: BLOCKED** pending a trustworthy fixed release/replacement and verified compatibility/security regression testing.


## Latest PR-head verification refresh — 2026-11-17

- **Exact PR head inspected:** `9efcb955eb24d204e17d77b8cda29e863f66b03a`; PR [#168](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/168) remains open, mergeable, and based on `main` at `f7f7d41a116c265481bdc17c225a763becab6013`. No merge or production deployment was performed.
- **DONE_VERIFIED — corpus structure and Python suite:** latest-head test workflow [44163332955](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44163332955) passed independent IPA corpus structure validation and pytest (**317 passed, 68 subtests passed**). `npm ci` also succeeded.
- **BLOCKED — mandatory npm audit:** the same workflow failed at `npm audit --audit-level=high` with four high-severity findings resolving to `picomatch` through `fdir`, `tinyglobby` and Vite. npm proposed `vite@6.2.7` only via a breaking `--force` downgrade. Build, generated-data, Node and Playwright steps were skipped in this workflow. Do not call this workflow green or bypass the audit gate.
- **DONE_VERIFIED — independent build/browser path on latest head:** Pages workflow [44163333101](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44163333101) passed pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input-alphabet validation, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright tests, and Pages artifact upload. PR deploy job was skipped as expected; no production deployment is claimed.
- **Security evidence refresh:** GitHub advisory [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf), crawled on 2026-11-17, still lists no patched version; upstream [picomatch issue #247](https://github.com/micromatch/picomatch/issues/247) remains open. The advisory is for single-branch repeated-extglob ReDoS. Upstream PR #194 is not a demonstrated fix for this case. No downgrade, fork override, lockfile fabrication, audit suppression, or speculative patch was introduced.
- **Task ledger:** DONE_VERIFIED — finals CSV five-column contract, source/status integrity tests, 317 Python tests + 68 subtests, and separate latest-head build/Node/browser/Pages-artifact path. BLOCKED — required high-severity npm audit gate pending an official fixed release or independently reviewed replacement with compatibility and adversarial ReDoS tests. PARTIAL/BLOCKED research gates remain unchanged: independent profile-matched IPA gold = 0; accuracy unmeasured; phonological coverage incomplete; primary MLC/MLCTS evidence and reuse rights unresolved; manual accessibility QA incomplete; independent IPA annotation deferred.
- **Readiness:** engineering checks are substantially verified, but the required CI security gate remains red and linguistic validation is incomplete. Repository remains a deployed research/engineering prototype, not linguistically release-ready.


## Duplicate-marker regression guard — 2026-11-17

- Added an explicit assertion to `tests/test_finals_registry.py` that every `orthographic_marker` is unique before constructing the marker-indexed test dictionary. This prevents a duplicate CSV key from being silently overwritten by Python dictionary construction and masking a registry defect.
- Code commit: `0bd0a4527bee30cf334490c1a57c6782d0539b2d`.
- **Verification status: PARTIAL / CI PENDING.** The GitHub Actions workflow file `.github/workflows/test.yml` runs on push and pull request, but no workflow run was returned for this exact commit at the time of this checkpoint. Do not claim this added assertion passed CI until a run on this SHA is observed. Existing evidence for the prior code-bearing head remains 317 pytest passes + 68 subtests, plus the separate Pages build/browser success; the npm audit failure remains unresolved.
- No CSV data, linguistic interpretation, IPA, Ukrainian mapping, runtime behavior or generated artifact changed.


## Exact duplicate-guard CI and upstream remediation-triage refresh — 2026-11-17

- **DONE_VERIFIED — duplicate-marker regression:** exact code commit `0bd0a4527bee30cf334490c1a57c6782d0539b2d` was tested by workflow [44169948734](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44169948734). Corpus structure validation passed; pytest passed (**317 passed, 68 subtests passed**), including the new uniqueness assertion for `orthographic_marker`; `npm ci` passed.
- **BLOCKED — mandatory audit remains unchanged:** workflow 44169948734 failed at `npm audit --audit-level=high` with four high findings for transitive `picomatch` / GHSA-fc5q-39xc-vjpf. Build, generated-data freshness, Node and Playwright steps in this workflow were skipped. No audit bypass or forced downgrade.
- **PAGES BUILD PENDING at this checkpoint:** Pages workflow [44169948381](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44169948381) is still in progress on the same code commit; only setup/toolchain preparation had completed at last inspection. Do not claim a result until it finishes.
- **Upstream remediation candidates found, not adopted:** picomatch PR [#237](https://github.com/micromatch/picomatch/pull/237) proposes collapsing certain single-branch repeated-star extglobs; PR [#238](https://github.com/micromatch/picomatch/pull/238) literalizes leading bare quantifiers and explicitly documents an uncovered structurally similar nested-extglob case (example `+(*(ab)c)`). Both target `master`, remain open/unmerged, and have no published release. PR [#246](https://github.com/micromatch/picomatch/pull/246) targets the separate `v2` branch only. These are candidate upstream work, not a vetted released fix; no patch was vendored or dependency override introduced.
- **Release evidence:** npm still lists picomatch 4.0.7 as latest; the GitHub advisory identifies versions through 4.0.7 as affected and lists no patched version. Treat contradictory third-party scanner summaries as insufficient to override the official GitHub Actions audit failure.
- **Acceptance remains:** await an upstream-reviewed, released fix (or independently review a replacement comprehensively), test adversarial ReDoS cases and API compatibility, then pass mandatory npm audit and full exact-head build/generated-data/Node/Playwright CI.
- No pronunciation, IPA, Ukrainian mapping, generated data or runtime behavior changed. The duplicate-key test is a registry-integrity guard only.


### Upstream patch review details

- PR #237's v4/master patch rewrites a single-branch repeated-star extglob by collapsing the outer quantifier. The inspected patch does not add a capture-mode-specific fallback; because collapsing may change the final repeated capture, its public tests do not establish capture-semantic compatibility. It is not safe to transplant without additional API-level tests.
- PR #238 uses a narrower literal fallback for leading bare `*`/`?` followed by content. It preserves examples such as `+(*)` and `+(a*)`, but its author explicitly lists `+(*(ab)c)` as an uncovered structurally similar case. Its own upstream test count is not a substitute for testing against this repository's pinned dependency tree.
- PR #246 contains a more explicit capture-mode fallback and subprocess timeout tests, but targets the separate `v2` branch, not the v4/master dependency used here.
- Therefore the current dependency path remains **BLOCKED**. Acceptance requires upstream integration/release or a separately reviewed replacement that covers the v4 API, capture semantics, documented nested cases, and adversarial timeout regressions. No one of these open PRs is treated as a security fix.


## Latest exact-branch workflow reconciliation — 2026-11-17

- Branch tip verified: `801c4ce9bb9d3ecb666699b28cd3b9d90ccc94d6`; compare against `main`: 25 commits ahead / 0 behind, five changed files. This is a documentation-only head after the tested code commit `0bd0a4527bee30cf334490c1a57c6782d0539b2d`.
- **DONE_VERIFIED — latest test workflow [44170484469](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44170484469):** corpus structure validation, Python dependency installation and pytest all succeeded; `npm ci` succeeded. The mandatory `npm audit --audit-level=high` step failed. Build, generated-data freshness, Node and Playwright steps were skipped. The exact unresolved failure remains four high-severity transitive `picomatch` advisories; do not mark the required test workflow green.
- **DONE_VERIFIED — latest Pages build [44170484445](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44170484445):** pinned Google Burmese WFST/OpenFst build, IPA symbol-table and browser input-alphabet checks, upstream `thrax_g2p` parity, production build, Node tests, Chromium setup, built-site Playwright tests and Pages artifact upload all succeeded. The deploy job was skipped for this PR event; no production deployment occurred.
- These latest results supersede the earlier checkpoint that listed Pages run 44169948381 as pending. The Pages build is now complete and successful. The separate mandatory test workflow remains failed solely at the high-severity audit step after its preceding Python/pytest/npm-install steps passed.
- **Readiness unchanged:** engineering/build/browser verification is strong, but the mandatory security gate remains blocked; independent adjudicated Yangon-profile IPA gold remains 0 and linguistic coverage, primary-source/licensing evidence and manual accessibility checks remain incomplete. The repository remains a research/engineering prototype, not linguistically release-ready.


## Final status of latest branch workflows — 2026-11-17 22:59 +0200

- **DONE_VERIFIED — test workflow [44172701789](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44172701789):** completed. Corpus structure validation, Python dependency installation, pytest and `npm ci` passed; mandatory `npm audit --audit-level=high` failed; build, generated-data freshness, Node and Playwright steps were skipped.
- **DONE_VERIFIED — Pages workflow [44172701859](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44172701859):** completed successfully. The build job passed Google Burmese WFST/OpenFst, IPA symbol-table/input-alphabet checks, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright tests and Pages artifact upload. The deploy job was skipped for the PR event.
- Thus the Pages run previously pending at the 22:xx checkpoint is now confirmed successful; no production deployment occurred. The latest exact branch tip remains `b3ace2fe741550d1697220507f76cfa6b74f6afd`, 28 commits ahead / 0 behind `main`, with the same five-file PR diff.
- **Upstream security review rechecked at 22:59 +0200:** picomatch PRs [#237](https://github.com/micromatch/picomatch/pull/237) and [#238](https://github.com/micromatch/picomatch/pull/238) are still open/unmerged and target `master`; PR [#246](https://github.com/micromatch/picomatch/pull/246) is still open/unmerged and targets `v2`. #238 was updated 2026-11-17 18:37 UTC but explicitly leaves the nested-extglob shape `+(*(ab)c)` outside its patch. #237 collapses eligible one-branch star extglobs but changes capture behavior unless specially handled; its patch has no capture-mode-specific fallback. #246 includes a capture-mode fallback but is v2-only. None is a published v4 fix.
- **Correction to prior security notes:** upstream PR [#194](https://github.com/micromatch/picomatch/pull/194) is not a fix for CVE-2026-112366; it addresses leading `?` parsing in extglob bodies and remains open. Do not cite it as a remediation for this ReDoS.
- Current primary advisory mirror records the affected range through `picomatch@4.0.7`, with no fixed version stated; upstream issue [#247](https://github.com/micromatch/picomatch/issues/247) remains open. No safe dependency fix was identified. No patch, override, downgrade, audit suppression or lockfile edit was made.
- **Acceptance remains BLOCKED:** a reviewed/released v4 fix or independently verified compatible replacement; tests for default and capture modes, nested extglob boundaries, and adversarial timeouts; mandatory audit passes; then full test workflow including build, generated-data, Node and Playwright passes on the exact final code head.
- No linguistic labels, IPA, Ukrainian mappings, gold-corpus data, runtime code or dependencies changed in this continuation. Independent adjudicated IPA gold remains 0; accuracy unmeasured; linguistic coverage, source/license evidence and manual accessibility QA remain incomplete.



## Latest exact-head verification — 2026-11-17

- PR [#168](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/168) remains OPEN and mergeable. Branch head: `733b383034120000f817cc877f0062f825f5dd2c`; 31 ahead / 0 behind `main`; five changed files.
- **DONE_VERIFIED — structural registry work:** five-column `data/burmese/finals.csv` contract and uniqueness regression guard are present; no phonological realization or Ukrainian output is inferred by this repair.
- **DONE_VERIFIED — exact-head Pages workflow [44175250086](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44175250086):** pinned WFST/OpenFst, IPA symbol table, browser alphabet, upstream parity, production build, Node tests, Playwright and artifact upload passed. PR deploy job skipped; no deployment claim.
- **PARTIAL / BLOCKED — exact-head test workflow [44175250073](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44175250073):** corpus structure validation, Python test dependency install, pytest and `npm ci` passed; mandatory high-severity npm audit failed. Build, generated-data, Node and Playwright steps skipped in this workflow. The separate Pages workflow does not satisfy or bypass this security gate.
- **BLOCKED:** transitive `picomatch@4.0.7` advisory; acceptance requires a trustworthy fixed release or reviewed compatible replacement, default/capture-mode and nested-extglob regressions, adversarial timeout checks, mandatory audit pass, and full test workflow pass on the exact final head.
- **Research status unchanged:** independent profile-matched adjudicated IPA gold = 0; accuracy unmeasured; phonological coverage incomplete; primary MLC/MLCTS source evidence and reuse rights unresolved; manual accessibility QA incomplete; independent IPA annotation DEFERRED. No gold values or pronunciation claims were fabricated.
- **Readiness:** engineering/research prototype, not linguistically release-ready. This exact-head record supersedes prior pending/stale CI checkpoints.



## ReDoS candidate reassessment — 2026-11-17

- New upstream v4-line candidates: [picomatch #261](https://github.com/micromatch/picomatch/pull/261) and [#262](https://github.com/micromatch/picomatch/pull/262), both open/unmerged. [#263](https://github.com/micromatch/picomatch/pull/263) targets v2 only.
- #261 proposes mandatory bounded ambiguity analysis over the generated regex, including final-output checks for wrappers and fail-closed handling of unproven patterns, even with `maxExtglobRecursion: false`. It excludes capture-dependent collapse rewrites and reports 2,009 tests plus adversarial/compatibility coverage. This is the more complete security candidate, but it changes behavior by rejecting some formerly accepted unsafe patterns and is not merged/released.
- #262 preserves more legacy matching behavior and reports 2,001 tests plus large finite differential/adversarial test sets, but its explicit `maxExtglobRecursion: false` bypass remains. It is not a complete mandatory guard.
- Both remain proposals, not verified release fixes. Candidate CI was not independently established as green in this inspection. No patch or lockfile change was made.
- Snyk revocation chatter does not clear GitHub's published GHSA or the repository's failing mandatory npm audit. Upstream issue #247 remains open; the exact project gate still fails on locked `picomatch@4.0.7`.
- **Status:** BLOCKED pending maintainer-reviewed v4 release/replacement, full compatibility/security review and green exact-head audit + CI. Do not report the advisory as resolved.



## Dependency graph clarification — 2026-11-17

- Lockfile v3 confirms the root declares Vite `8.3.8` only as a devDependency; `picomatch` is not a direct application dependency. Locked `picomatch@4.0.7` is selected by Vite `^4.0.7` and tinyglobby `^4.0.4`; fdir `6.5.0` metadata also permits v4. This limits the current dependency exposure to the build/test toolchain but does not waive the mandatory CI audit.
- The GitHub-reviewed OSV record updated 2026-11-17 15:56 UTC still identifies versions through 4.0.7 as affected, CVSS 4.0 8.7, with no fixed version. The Snyk-revocation report is specific to that feed and is not a clearing signal for GitHub/npm audit.
- Dependency manifests and lockfile remain unchanged; security status remains BLOCKED.


## Latest exact branch CI evidence — 2026-11-17

- Branch head: `bc9c25dfe5bf30df5e05787144a8af0f9f5e01b0`; 40 commits ahead / 0 behind `main`; five changed files.
- **DONE_VERIFIED — independent Pages build/browser path:** [workflow 44181463115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463115) passed pinned Google Burmese WFST/OpenFst, IPA symbol-table and browser alphabet checks, upstream `thrax_g2p` parity, production build, Node tests, Chromium, built-site Playwright and Pages artifact upload. Deploy skipped for PR event.
- **BLOCKED — required test workflow:** [workflow 44181463094](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463094) passed corpus structure validation, Python dependency install, pytest and `npm ci`, then failed mandatory `npm audit --audit-level=high`. Build, generated-data, Node and Playwright steps skipped.
- The two workflows provide complementary evidence, not a green full test workflow. Keep security acceptance blocked until a reviewed/released compatible fix or replacement passes mandatory audit and full exact-head CI.
- No new linguistic evidence was introduced: independently adjudicated IPA gold remains 0; accuracy remains unmeasured. Existing phonology, source/licensing and accessibility blockers remain.


## Latest exact-head CI reconciliation — 2026-11-18

- Current PR #168 head is `15a82b5bcf5ca7d11d204181517828dca92cc0a9` (43 commits ahead / 0 behind `main`; five changed files). Earlier head references in this register are historical snapshots, not the current tip.
- **DONE_VERIFIED — Pages workflow [44181463115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463115):** pinned WFST/OpenFst, IPA and browser alphabet invariants, upstream parity, production build, Node and built-site Playwright tests, and artifact upload passed; deploy skipped for PR event.
- **BLOCKED — required test workflow [44181463094](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463094):** corpus validation, Python install, pytest and `npm ci` passed; mandatory high-severity npm audit failed; subsequent build/data/Node/Playwright steps skipped.
- Do not interpret Pages success as a waiver of the mandatory audit. Linguistic evidence status is unchanged: adjudicated IPA gold = 0; accuracy unmeasured.


## Finalized CI results — exact current branch head 748dcea9

- Pages workflow [44185873696](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44185873696) completed successfully through artifact upload; deployment skipped for PR event.
- Required test workflow [44185873801](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44185873801) completed with failure at mandatory high-severity npm audit. Corpus validation, Python dependency install, pytest and `npm ci` passed; subsequent build, generated-data, Node and Playwright steps skipped.
- These workflow results apply to docs-updated head `748dcea9c82308ec9cd7299de12cb7cfec6f5874`; the test workflow is still not green. Security and linguistic evidence blockers remain unchanged.


## Upstream candidate review evidence — 2026-11-18

- Latest public GitHub review state: upstream picomatch PR #261 is open/unmerged with one approval, but the reviewer states they reviewed the diff and did not run it; they identify a compatibility break because previously accepted patterns now throw. PR #262 is open/unmerged with an approval and independent bounded validation (2,001 tests, 1,329,660 selected finite parity comparisons, 35 adversarial deadline cases). Its reviewer explicitly notes that the test corpus is bounded and `maxExtglobRecursion: false` remains an opt-out.
- #261 appears broader in its fail-closed design but has a documented compatibility concern and no independent test execution in the approval. #262 has stronger independent test evidence but leaves the recursion safeguard opt-out. Neither is a merged/released fix; #263 remains on v2.
- The latest GitHub-reviewed OSV advisory still marks picomatch through 4.0.7 affected and does not specify a fixed version. Keep the security gate BLOCKED; do not downgrade, suppress or vendor either candidate without a complete compatibility/security review.


## Exact PR-head CI evidence — 2026-11-18 (head 3430b628)

- PR #168 exact head `3430b628a2e35e19ef3fc4306410b68b8fa412f5`; PR remains open/unmerged/mergeable.
- **DONE_VERIFIED:** Pages workflow [44255972532](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44255972532) passed pinned WFST/OpenFst build, IPA and browser-alphabet invariants, upstream parity, production build, Node tests, Chromium setup, built-site Playwright and artifact upload. Deploy skipped for PR event.
- **BLOCKED:** tests workflow [44255972550](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44255972550) passed corpus structure validation, Python dependency install, pytest and `npm ci`; mandatory `npm audit --audit-level=high` failed, so subsequent build, generated-data, Node and Playwright steps were skipped.
- The security finding is not resolved; Pages success is not a substitute for the mandatory audit. No dependency or linguistic evidence changes were made.
- Linguistic evidence remains limited: independently adjudicated Yangon-profile IPA gold = 0, accuracy unmeasured; phonological coverage incomplete; primary MLC/MLCTS evidence and reuse rights unresolved; manual accessibility QA incomplete. Independent IPA annotation remains DEFERRED.
- **Readiness:** engineering/research prototype, not linguistically release-ready.


## Latest exact-head and dependency-state reconciliation — 2026-11-18

- PR #168 exact head 42f5b1353c3d4ce13070554494c70f6fc6a10b90; five changed files; 55 commits ahead / 0 behind main.
- **DONE_VERIFIED:** IPA corpus structure validation, Python dependency installation and pytest passed on this head in [workflow 44258910321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910321).
- **BLOCKED:** mandatory npm audit --audit-level=high failed with four high-severity findings resolving to picomatch@4.0.7 through fdir, tinyglobby and Vite. The audit's --force suggestion would install Vite 6.2.7, a breaking downgrade; it was not applied. Later build/data/Node/Playwright steps were skipped.
- **PENDING at capture:** [Pages workflow 44258910411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910411) was still running the pinned WFST/OpenFst build. Do not infer success from earlier heads.
- The exact lockfile confirms the dependency is dev-only, but main already has the same Vite 8.3.8 → picomatch@4.0.7 tree. The CSV repair PR did not introduce the finding. Official release/npm metadata still list 4.0.7 as latest and the GitHub-reviewed advisory has no fixed version. Keep the security gate blocked; no override, downgrade, vendored patch or suppression.
- Linguistic status unchanged: independently adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; phonological coverage and MLC/MLCTS evidence/reuse rights incomplete; manual accessibility QA incomplete. Independent annotation remains DEFERRED.


## Final exact code-head evidence — 2026-11-18 (a266e67)

- **DONE_VERIFIED:** [tests workflow 44259714864](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259714864) passed IPA corpus structure validation, Python dependency installation, pytest and npm ci on exact code head a266e67d94e667dc14bf46aadcb36dc7ceffdf24.
- **BLOCKED:** the same workflow failed the mandatory npm high-severity audit on four findings for transitive picomatch@4.0.7; subsequent build, generated-data, Node and Playwright steps were skipped.
- [Pages workflow 44258910411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910411) was still in progress on preceding docs head 42f5b135. WFST/OpenFst build, IPA symbol-table validation, browser input alphabet and model export had passed; Node setup was running. Do not attribute this partial result to a266e67.
- Independent CSV parse confirms four records, five fields each, all source IDs valid against sources.csv, no blank fields, duplicates or out-of-vocabulary evidence statuses. This validates schema integrity only, not phonological interpretation.
- Final documentation-only commits refreshed the canonical status. No code/data/dependency changes. Security remains BLOCKED; independent IPA gold 0; accuracy unmeasured; other linguistic, source-rights and manual accessibility tasks remain PARTIAL/BLOCKED/TODO as previously recorded.


## 2026-11-18 — exact final-head engineering verification

- PR #168 branch exact HEAD: `2efbf870568c7d114f3bad452f8f2a4df95425be`; PR remains open against `main` `f7f7d41a116c265481bdc17c225a763becab6013`.
- **DONE_VERIFIED:** [Pages workflow 44259856263](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259856263) succeeded on exact HEAD. Pinned Burmese WFST/OpenFst, IPA symbol-table, browser input alphabet, static model, upstream parity, production build, Node, Chromium, built-site Playwright and artifact upload all passed. Deploy was skipped for PR event.
- **DONE_VERIFIED:** [test workflow 44259856191](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259856191) passed corpus structure validation, Python install, pytest and npm ci on exact HEAD.
- **BLOCKED:** the same test workflow failed at mandatory npm audit due four high-severity transitive `picomatch@4.0.7` findings; build/generated-data/Node/Playwright stages in that workflow were skipped. Pages success supplies separate build/browser evidence but does not satisfy the audit gate.
- Upstream picomatch #262 now has an APPROVED independent review and finite regression evidence (2,001 tests, 1,329,660 parity comparisons, 35 bounded adversarial cases); the reviewer explicitly notes finite tests are not a universal proof and the opt-out remains. #261 also has an APPROVED review. Both are still unmerged; official latest release remains 4.0.7. No safe released remediation exists yet.
- Linguistic state is unchanged: independently adjudicated Yangon-profile IPA gold = 0; empirical accuracy remains unmeasured; phonological coverage and primary MLC/MLCTS evidence/reuse rights remain incomplete. Manual accessibility QA remains incomplete. Independent IPA annotation remains DEFERRED. No IPA or Ukrainian mappings were added or changed.
- No runtime/dependency/data change, merge, release or production deployment. This repository remains an engineering/research prototype, not linguistically validated for release.


## 2026-11-18 — dependency gate recheck

- On current PR documentation HEAD `47fc51e0ae60b81584d39560d7871570c0baaaa3`, test workflow [44261797858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797858) again passed corpus structure validation, Python install, pytest and npm ci, then failed mandatory npm audit; subsequent build/generated-data/Node/Playwright steps were skipped. Pages build/browser success was on prior code-bearing HEAD `2efbf870...`.
- Lockfile confirms picomatch 4.0.7 is a dev-only transitive dependency through Vite 8.3.8 and tinyglobby 0.2.17.
- Upstream #261 has one approval but no reported GitHub check runs/status contexts; #262 has one approval and a separate independent COMMENTED finite validation (2,001 tests, 1,329,660 comparisons, 35 bounded adversarial cases). #262 explicitly retains an opt-out and compatibility fallback boundary. Both remain open/unmerged; no official patched release.
- Linguistic state unchanged: independent adjudicated Yangon-profile IPA gold = 0; empirical accuracy unmeasured; source rights and coverage incomplete. No linguistic data or mapping changed.


## Exact latest PR-head CI and upstream ReDoS candidate reassessment — 2026-11-18 10:12 +0200

- PR #168 exact HEAD `47fc51e0ae60b81584d39560d7871570c0baaaa3`, still open/unmerged/mergeable. The five-file diff and code-bearing CSV repair are unchanged; later commits are documentation/evidence updates.
- **DONE_VERIFIED:** Pages workflow [44261797839](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797839) succeeded on this exact HEAD through pinned Burmese WFST/OpenFst, IPA and browser alphabet invariants, upstream parity, production build, Node tests, Chromium, built-site Playwright and artifact upload. Deploy skipped for PR event.
- **BLOCKED:** required tests workflow [44261797858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797858) passed corpus validation, Python install, pytest and npm ci, then failed mandatory high-severity npm audit on four transitive `picomatch@4.0.7` findings. Build, generated-data, Node and Playwright were skipped in this workflow.
- New upstream candidates do not clear the blocker. #270's simple collapse optimization has a finite parity claim, but an independent report reproduced timeouts for `+([a]*)b` and `+(@(*a))`; #269 proposes broader literal fallback but has no maintainer review/approval evidence; #267 has no review evidence. All remain open/unmerged, and the official latest release remains 4.0.7. No candidate is adopted.
- Linguistic state unchanged: independently adjudicated Yangon-profile IPA gold = 0; empirical accuracy unmeasured; phonological coverage and primary MLC/MLCTS evidence/reuse rights incomplete. Manual accessibility QA remains incomplete. Independent IPA annotation remains DEFERRED. No IPA or Ukrainian mappings changed.
- No runtime/dependency/data change, merge, release or production deployment. This remains an engineering/research prototype, not linguistically validated for release.


## 2026-11-18 — exact latest-head Pages result

- Pages workflow [44265321954](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44265321954) completed SUCCESS on PR #168 HEAD `bf1655fb861451289ce5be12f1c4bf89a2cccb41`. Pinned WFST/OpenFst, IPA/browser invariants, upstream parity, production build, Node, Chromium, built-site Playwright and artifact upload all passed. Deployment was skipped for the PR event.
- Required tests workflow [44265321857](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44265321857) on the same SHA still failed at mandatory `npm audit --audit-level=high` after corpus validation, Python install, pytest and `npm ci` passed; subsequent build/generated-data/Node/Playwright steps were skipped.
- This supersedes the prior checkpoint's statement that Pages run 44265321954 was pending. The dependency/security gate remains BLOCKED; no linguistic evidence or mappings changed.


## 2026-11-18 — final poll of PR documentation tip

- On exact HEAD `4d1bc99c17474fa08cb5d6133a27808c250a8012`, Pages workflow [44276827871](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44276827871) completed SUCCESS through pinned WFST/OpenFst, IPA/browser invariants, upstream parity, production build, Node, Chromium, built-site Playwright and artifact upload; deploy skipped for PR event.
- Required tests workflow [44276827920](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44276827920) completed FAILURE: corpus validation, Python install, pytest and npm ci passed; mandatory npm audit failed; remaining build/generated-data/Node/Playwright steps skipped.
- The prior note that Pages run 44276827871 was pending is superseded by this completion evidence. PR #168 remains open/unmerged/mergeable. Dependency security blocker and linguistic evidence limitations remain unresolved; no code or phonological data changed.


## 2026-11-18 security follow-up

- Required Tests log [44281804397](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44281804397) shows 4 high audit instances of one GHSA-fc5q-39xc-vjpf on transitive `picomatch@4.0.7` via `fdir` / `tinyglobby` / Vite 8.3.8. `npm audit fix --force` would downgrade Vite to 6.2.7; rejected as a breaking workaround. Python 317 tests + 68 subtests pass; independent IPA gold validation reports 0 records/annotations/adjudicated. Audit gate skips remaining build/data/Node/Playwright steps.
- Threat model: upstream discussion says pattern must be attacker-controlled for ReDoS; path-only control is insufficient. Current package is dev/build tooling with no direct npm runtime deps, but application exposure is not declared absent until glob inputs are traced. This nuance does not waive the repository's mandatory audit policy.
- Candidate gaps: #268 bypass `+(**/a)b`; #270 bypasses `+([a]*)b` and `+(@(*a))`; #238 leaves `+(*)` vulnerable; #273 has finite parity evidence but no independent review; #264 has Windows downstream compatibility evidence only, not security proof. No released fix; latest official version 4.0.7.
- No unsafe dependency workaround or code changes. Prototype only; no adjudicated gold, accuracy unmeasured.


## 2026-11-18 exact-head CI and dependency exposure follow-up — 13:53 +0200

- Current branch `fix/finals-registry-schema-2026-11-17`, PR #168 remains OPEN/unmerged/mergeable at `52f836246e6a5f1b3eb129007a6607d59ecbf985`; `main` remains `f7f7d41a116c265481bdc17c225a763becab6013`. No code-bearing change in this checkpoint.
- **DONE_VERIFIED — Pages [44294768404](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44294768404):** exact HEAD build job passed pinned WFST/OpenFst, IPA symbol-table and browser-alphabet invariants, upstream CLI parity, production build, Node tests, Chromium, built-site Playwright and artifact upload. Deploy skipped for PR event.
- **BLOCKED — required Tests [44294768524](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44294768524) and duplicate push run [44294761936](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44294761936):** both exact-head runs passed corpus structure validation, Python installation, pytest and npm ci; both failed only at mandatory `npm audit --audit-level=high` and skipped subsequent build/generated-data/Node/Playwright steps. The independent Pages run supplies build/browser evidence but does not waive the required audit gate.
- **DONE_VERIFIED — app-level glob-pattern source trace (bounded to tracked app/config scripts):** `package.json` has no direct runtime dependencies and lists only Playwright/Vite as dev dependencies; `vite.config.js` contains fixed local HTML entrypoints and no user-derived glob; `src/web/app.js` accepts Burmese text for parsing/transcription and contains no glob-pattern construction; `scripts/generate-web-data.mjs`, `scripts/validate-web-data.mjs` and `scripts/copy-vendor-assets.mjs` contain no glob/picomatch/tinyglobby use. Lockfile places `picomatch@4.0.7` under the Vite/tinyglobby build-tool dependency tree. This establishes **no observed attacker-controlled glob-pattern path in the inspected application/configuration surface**, not a proof about every transitive internal Vite call or arbitrary future plugin/config changes. The issue remains a mandatory supply-chain/build-tooling audit blocker; no suppression or dependency override is justified.
- Upstream issue [picomatch #247](https://github.com/micromatch/picomatch/issues/247) remains OPEN (updated 2026-11-18 10:01Z); official latest release remains 4.0.7. No reviewed/released compatible fix identified. No Vite downgrade, vendored patch, audit bypass, merge, release or deployment.
- **Ledger:** exact Pages/browser path DONE_VERIFIED; Python test stage DONE_VERIFIED on both test runs; required npm audit BLOCKED; app-specific pattern exposure PARTIAL (no pattern source observed in inspected surface; transitive internal surface not exhaustively proven); linguistic accuracy BLOCKED by 0 adjudicated Yangon-profile IPA gold; MLC/MLCTS primary evidence/reuse rights and complete phonological coverage incomplete; manual accessibility QA TODO; independent IPA annotation DEFERRED.
- Readiness remains **engineering/research prototype, not release-ready**. Acceptance to clear the dependency gate: compatible maintainer-reviewed/released picomatch fix (or independently reviewed compatible replacement), full adversarial and compatibility tests, clean high-severity audit and all required exact-head CI checks passing. Linguistic release acceptance separately requires independently adjudicated profile-matched gold and evidence-backed coverage/licensing.


## 2026-11-18 CI completion and PR stack reconciliation — 14:05 +0200

- Exact current PR #168 HEAD `99a06bf910630862b8018adefd5e0d5fb4bb8d6c` is confirmed by both workflows: Pages [44299009169](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44299009169) **SUCCESS** (build complete, deploy skipped for PR); required Tests PR run [44299009163](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44299009163) and push run [44298997247](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44298997247) both **FAILURE** at the named `Fail on high-severity npm advisories` step. The failures are duplicates of the already identified high-severity transitive picomatch advisory; they do not indicate a new test regression. Exact-head Pages success remains separate evidence, not an audit waiver.
- **PR stack recheck:** #166 remains OPEN against main at `7854d0d84e2fc6622a52cc8379622a9312adfcb5`; its exact-head Tests push/PR and Pages runs [43941025429](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43941025429), [43940980540](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43940980540), [43940980498](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43940980498) were SUCCESS on 2026-11-16, before the current picomatch advisory audit failure. #167 remains OPEN and stacked on #166 at `72421c9ae6e2ff8d4624af3a499c96c14f983aae`; its exact-head Tests and Pages runs [43960465080](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43960465080) and [43960465349](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43960465349) were SUCCESS on 2026-11-16, also before the current advisory gate. These historical successes are not current security clearance.
- **PR overlap reconciliation:** #166 includes the registry-backed typed IPA architecture note, README/engine documentation, licensing and phonology-audit updates; #167 adds Python/browser shared typed phonology, wheel packaging and CI verification, and is based on #166; #168 repairs the five-column finals registry schema and adds direct schema tests, plus security/execution checkpoint documentation. #166 and #168 both modify the three canonical handoff/matrix/register documents, and #166 also changes several other audit/docs. They are not safe to merge independently in arbitrary order. Preserve #166's licensing/adapter/source findings, #167's implementation and tests, and #168's CSV header repair/tests; consolidate overlapping canonical docs on one integration branch before merge. Do not retarget #167 or merge any of these PRs blindly. PR #129 remains an unrelated draft based on a stale divergent base; leave untouched.
- **Ledger update:** DONE_VERIFIED — exact-head Pages/build/browser; exact-head schema test/Python test stage; existing #166/#167 typed IPA implementation on their own branches (historical exact-head CI). BLOCKED — current mandatory npm audit; PARTIAL — PR stack integration and canonical-document reconciliation; BLOCKED — adjudicated IPA gold remains 0, MLC/MLCTS primary evidence and reuse rights, full phonological coverage; TODO — manual accessibility QA; DEFERRED — independent IPA annotation until human prerequisites.
- No merge, retarget, runtime/dependency change, release or production deployment. Current PR #168 remains open. Overall repository readiness remains engineering/research prototype, not release-ready.


## Exact-head verification update — 2026-11-18 (9131c12)

- **DONE_VERIFIED:** exact PR #168 HEAD `9131c123c91eeee438f4ff48c7d49912efb00068` Pages workflow [44301535467](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44301535467) completed SUCCESS. WFST/OpenFst build, IPA symbol-table and browser alphabet checks, model export, upstream parity, production build, Node tests, Chromium, built-site Playwright and artifact upload passed; deployment was skipped for the PR event.
- **DONE_VERIFIED:** required Tests workflow [44301535585](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44301535585) passed corpus validation, Python package build/install and pytest (317 passed + 68 subtests passed); `npm ci` completed.
- **BLOCKED:** the same Tests workflow failed at mandatory high-severity npm audit on four instances of GHSA-fc5q-39xc-vjpf affecting transitive `picomatch@4.0.7` via `fdir`, `tinyglobby` and Vite 8.3.8. `npm audit fix --force` would downgrade Vite to 6.2.7 and was not applied. The remaining test-workflow build/data/Node/Playwright steps were skipped. Separate Pages success does not clear this required gate.
- No source/IPA/UA mapping, code, dependency or corpus change. Independent adjudicated Yangon IPA gold remains 0; accuracy unmeasured; primary MLC/MLCTS evidence and reuse rights and complete phonological coverage remain incomplete; manual accessibility QA TODO; independent annotation DEFERRED. Overall state: engineering/research prototype, not release-ready.

 
## Integration branch checkpoint — 2026-11-18 (c1257e8)

- Created dedicated branch `integration/burmese-ipa-finals-2026-11-18` from PR #168 exact head `a4f730157c837354fbfb8cbadab8b08279e1fc5e`; no existing PR branch or default branch was changed.
- Ported 23 non-overlapping files from PR #167 exact head `72421c9ae6e2ff8d4624af3a499c96c14f983aae`: shared Python/browser typed IPA and phonology adapters, IPA-first browser orchestration, shared contract fixtures, Python/browser tests, wheel packaging verification, workflow changes, README and supporting architecture/phonology/licensing/audit documentation. Existing PR #168 CSV schema correction and `tests/test_finals_registry.py` are preserved.
- Deliberately retained PR #168's three latest canonical execution documents rather than overwriting them with the older #167 versions. PR #167's separate audit/architecture documents are included. No pronunciation labels, IPA gold annotations, Ukrainian mappings or generated model outputs were invented or altered in this integration batch.
- **PARTIAL:** file-level integration committed at `c1257e8a9e02319154d46ee637d2850978ea1a6b`; exact combined-branch CI is pending. Historical PR #167 exact-head tests and Pages runs [43960465080](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43960465080) and [43960465349](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43960465349) passed on 2026-11-16, before the new picomatch advisory blocked npm audit; they do not validate this combined tree.
- PR #166/#167/#168 remain open and unmerged; PR #129 remains untouched. No reviews or review threads were found on #166/#167/#168 at the latest check. This integration branch is isolated; no branch retargeting, merging, release or production deployment was performed.
- Next acceptance: run exact combined-tree Tests and Pages CI, reconcile any conflicts or failures, then determine whether a stacked integration PR can safely supersede duplicated work. Mandatory high-severity npm audit remains an external blocker; do not bypass it.

 
## Combined IPA + finals integration: exact-head CI results — 2026-11-18 (8cd69c2)

- **DONE_VERIFIED — Pages [44309260167](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44309260167):** SUCCESS on exact combined HEAD `8cd69c238043c417769895a09f9191170884b7e9`. Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium install, built-site Playwright and Pages artifact upload all passed. Deploy was skipped for this PR event; no production deployment is claimed.
- **DONE_VERIFIED — Python/package checks:** Tests workflows [44309232745](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44309232745) and [44309260308](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44309260308) both passed independent IPA corpus structure validation, editable package install, wheel registry verification and pytest (**322 passed, 68 subtests passed**). `npm ci` also completed.
- **BLOCKED — mandatory npm audit:** both Tests runs failed at `npm audit --audit-level=high` on four report instances of GHSA-fc5q-39xc-vjpf against transitive `picomatch@4.0.7`. The subsequent build/generated-data/Node/Playwright steps in the Tests workflow were skipped. The separate successful Pages workflow supplies independent build/Node/browser evidence but does not waive the required security gate.
- **Integration status:** PR #171 is a draft stacked PR from `integration/burmese-ipa-finals-2026-11-18` to PR #168's branch; it contains 26 changed files (23 ported implementation/support files plus three current canonical docs). GitHub reports it mergeable; it remains draft/unmerged pending review and security-gate resolution. PRs #166/#167/#168 and #129 remain untouched/open; no branch was force-pushed or retargeted.
- **Linguistic gates unchanged:** independently adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; primary MLC/MLCTS item-level evidence and reuse rights and full phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED pending human prerequisites. No unsupported IPA, pronunciation or Ukrainian mappings were added.
- **Readiness:** combined engineering pipeline is build/browser verified, but required npm security CI and linguistic validation remain incomplete; not release-ready.


## Exact current-head CI and PR reconciliation — 2026-11-18 (cde7302)

- **DONE_VERIFIED — Pages workflow [44310064259](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44310064259): SUCCESS on exact current HEAD `cde73025a6e3ad6d0407f9051b6313e3ec4f7282`.** The pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium install, built-site Playwright and Pages artifact upload all passed. The deploy job was skipped for the PR event; no production deployment is claimed.
- **DONE_VERIFIED — Python/package stages on exact current HEAD:** Tests workflow [44310064262](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44310064262) and push run [44310052337](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44310052337) completed Python corpus structure validation, editable package install, wheel registry verification and pytest (**322 passed, 68 subtests passed**); `npm ci` completed.
- **BLOCKED — required security gate:** both Tests runs failed at `npm audit --audit-level=high` due GHSA-fc5q-39xc-vjpf in transitive `picomatch@4.0.7`. Later steps in those Tests jobs were skipped. The independent successful Pages workflow validates the browser/build path but does not waive the required audit gate. No audit suppression, breaking Vite downgrade or unreviewed dependency patch was applied.
- PR #171 description now records these exact-head outcomes. It remains OPEN, DRAFT and mergeable, based on PR #168's branch; no merge was performed. No reviews or review threads were present at this check. PRs #166/#167/#168 and #129 remain untouched.
- Linguistic gates remain unchanged: adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; source rights and full phonological coverage incomplete; manual accessibility QA TODO; independent annotation deferred pending human prerequisites. Readiness remains research/engineering prototype, not release-ready.


## PR #171 exact-head reconciliation — 2026-11-18 (cde73025)

- **DONE_VERIFIED — Pages workflow [44310064259](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44310064259):** exact HEAD `cde73025a6e3ad6d0407f9051b6313e3ec4f7282`; build job SUCCESS, deploy job SKIPPED for pull-request event. This is not a production deployment.
- **DONE_VERIFIED — Python/package stage in Tests [44310064262](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44310064262):** independent IPA gold-corpus structure validation, Python editable install, wheel registry verification, pytest (**322 passed, 68 subtests passed**) and `npm ci` all passed.
- **BLOCKED — mandatory Tests workflow [44310064262]:** failed at `Fail on high-severity npm advisories` for GHSA-fc5q-39xc-vjpf / CVE-2026-112366 affecting transitive `picomatch@4.0.7`. The subsequent production build, generated-data check, Node tests, Playwright install and built-site browser tests were SKIPPED in this Tests job. Pages success is independent evidence and does not waive this required gate.
- **Upstream security recheck:** public npm metadata still identifies `picomatch@4.0.7` as the latest release; GitHub's advisory affects versions through 4.0.7 and gives no fixed version. No unreviewed override, downgrade, fork or audit suppression was adopted. References: [npm package](https://www.npmjs.com/package/picomatch), [GitHub advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf), [OSV record](https://osv.dev/vulnerability/GHSA-fc5q-39xc-vjpf).
- **Integration reconciliation:** PR #171 is the preferred single review candidate combining the 23-file IPA-first implementation/support port with PR #168's finals CSV schema repair and canonical execution documents (26 changed files). PRs #169/#170 are earlier alternative integration paths; both remain open for comparison and must not be merged independently while #171 is reviewed. PR #171 remains stacked on #168. No branches were deleted, rewritten or retargeted; no merge, release or production deployment occurred.
- **Task ledger:** DONE_VERIFIED — finals CSV schema/test repair; Python IPA pipeline/wheel registry checks; exact-head Pages build and browser path. BLOCKED — mandatory high-severity npm audit and required Tests workflow. PARTIAL — Burmese phonological coverage and primary-source conformity. BLOCKED — adjudicated Yangon-profile IPA gold remains 0, so empirical accuracy is unmeasured; MLC/MLCTS item-level evidence and reuse rights remain incomplete. TODO — manual accessibility QA. DEFERRED — independent IPA annotation per owner direction.
- **Readiness:** engineering/research prototype; not release-ready. Security acceptance requires a maintainer-reviewed compatible fix or independently reviewed replacement, adversarial and compatibility tests, a clean high-severity audit, and all exact-head required CI passing. Linguistic release acceptance separately requires independently adjudicated profile-matched IPA gold, evidence-backed coverage and documented source rights.


## Exact-head CI result — 2026-11-18 (`b7c8fe4d`)

- **DONE_VERIFIED — Pages workflow [44316607402](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44316607402): SUCCESS** on exact PR HEAD `b7c8fe4d46f50705ff5bcd46f42452fefe66b789`. This is a PR build; no production deployment is claimed.
- **BLOCKED — Tests workflow [44316607249](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44316607249): FAILURE** on that same exact HEAD. Corpus structure validation, editable Python install, wheel registry verification, pytest, and `npm ci` passed. The required `npm audit --audit-level=high` then failed with four high-severity findings in the dependency tree rooted at transitive `picomatch@4.0.7`, advisory GHSA-fc5q-39xc-vjpf (ReDoS via repeated extglobs). npm recommends a forced Vite downgrade (`vite@6.2.7`), which is a breaking change; it was not applied. Build, generated-data, Node and Playwright steps were skipped in this job.
- Duplicate push-triggered Tests run [44316601896](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44316601896) failed at the same audit gate; it is not a separate code regression.
- **Interpretation:** Python package/registry tests passed on the exact tip and Pages build/browser workflow passed on the exact tip. The mandatory Tests workflow remains blocked solely at the security audit step; skipped downstream steps are not represented as passed by this Tests run.
- No audit suppression, `--force` downgrade, override, fork or unreviewed dependency patch was applied. PR #171 remains OPEN and DRAFT, stacked on #168. Main remains unchanged; no merge, release or production deployment occurred.
- **Readiness:** research/engineering prototype, not release-ready. Security gate requires a maintainer-reviewed compatible fix or independently reviewed replacement, adversarial/compatibility tests, a clean high-severity audit and a successful exact-head required Tests workflow. Linguistic acceptance remains separately blocked by zero adjudicated Yangon-profile IPA gold, incomplete item-level source/reuse evidence and partial phonological coverage.


## Exact-head CI evidence — 2026-11-18 (`374128a7f4f0f1d6ed6a64efe6122ddfee9c328f`)

- **DONE_VERIFIED — Pages run [44320245648](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320245648):** successful exact-head WFST/OpenFst build, IPA symbol-table/input-alphabet checks, static export, upstream `thrax_g2p` parity, production build, Node tests, Chromium and built-site Playwright, and artifact upload. Deploy skipped because this was a PR event.
- **BLOCKED — Tests run [44320245620](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320245620):** exact-head run failed at mandatory `npm audit --audit-level=high`, GHSA-fc5q-39xc-vjpf in transitive `picomatch`. Corpus structure, Python install, wheel registry, pytest (322 passed; 68 subtests passed), and `npm ci` passed; downstream build/generated-data/Node/Playwright steps skipped. Duplicate push run [44320232869](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320232869) failed at the same gate.
- Security acceptance remains BLOCKED pending a compatible, reviewed fix and clean audit. Linguistic acceptance remains BLOCKED/PARTIAL: adjudicated Yangon IPA gold is 0; accuracy unmeasured; source evidence/reuse rights and full coverage incomplete. Manual accessibility QA TODO; independent annotation DEFERRED. No unsupported linguistic entries were introduced. Not release-ready.


## Exact-head CI evidence — 2026-11-18 (`ddad7f5e08c674966c7f0b2431859878710da719`)

- **DONE_VERIFIED — Pages [44336176912](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176912):** exact-head success for pinned Google Burmese WFST/OpenFst build, IPA symbol-table/input-alphabet checks, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload. No production deployment is implied.
- **BLOCKED — Tests [44336176587](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176587) and duplicate [44336166612](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336166612):** exact-head failure at mandatory high-severity npm audit (4 high findings; GHSA-fc5q-39xc-vjpf affects transitive `picomatch`). Corpus structure, Python install, wheel registry, pytest, Node setup and `npm ci` passed; subsequent build/generated-data/Node/Playwright steps skipped in the test job.
- Security acceptance remains BLOCKED pending compatible, reviewed remediation and a clean required audit. Linguistic acceptance remains BLOCKED/PARTIAL: adjudicated Yangon IPA gold is 0; accuracy unmeasured; source evidence/reuse rights and full coverage incomplete. Manual accessibility QA TODO; independent annotation DEFERRED. No unsupported linguistic entries introduced. Not release-ready.



## Security-gate status recheck — 2026-11-18 (post-withdrawal; PR head `6772712820f74e154fb69d2ea9ce4ae0f98a9b7c`)

- **New primary-source status:** GitHub's advisory page now explicitly labels GHSA-fc5q-39xc-vjpf / CVE-2026-112366 **Withdrawn on 2026-11-18**: https://github.com/advisories/GHSA-fc5q-39xc-vjpf. This supersedes the earlier active-advisory status recorded in the CI logs, but does not itself prove the repository's required audit gate is green.
- **Timing matters:** Tests run [44354810581](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44354810581) failed at `npm audit --audit-level=high` before the withdrawal was recorded. The same job passed corpus validation, editable Python install, wheel registry verification and pytest (**322 passed, 68 subtests passed**); subsequent build/generated-data/Node/Playwright steps were skipped. A fresh exact-head Tests run after the withdrawal is required before changing the gate to DONE_VERIFIED.
- **DONE_VERIFIED — Pages artifact build:** [44354810476](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44354810476) succeeded on this exact head: pinned Google Burmese WFST/OpenFst, IPA and browser alphabet invariants, static export, upstream parity, production build, Node tests, Chromium/Playwright and Pages artifact upload. Deploy was skipped for the PR event.
- **DONE_VERIFIED — optional diagnostics:** [44354810570](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44354810570) completed all three diagnostic jobs successfully. These remain raw-output diagnostics only; independent gold = 0 and accuracy = null.
- Upstream picomatch PR [#273](https://github.com/micromatch/picomatch/pull/273) is still OPEN and has no submitted review or GitHub check runs at this inspection; its author-reported tests/equivalence are not independently verified. It is not adopted. npm currently still lists picomatch 4.0.7 as latest: https://www.npmjs.com/package/picomatch?activeTab=versions. No vendored patch, override, downgrade or audit suppression was introduced.
- **Task ledger:** Pages and optional diagnostic workflows DONE_VERIFIED; Python/corpus tests DONE_VERIFIED; mandatory npm audit gate PARTIAL / awaiting fresh post-withdrawal exact-head CI; linguistic validation PARTIAL/BLOCKED as recorded above. Do not claim release readiness until required Tests completes all configured steps and independent linguistic acceptance criteria are met.



## Post-withdrawal verification closeout — 2026-11-18 (`f2b5766327d8997bd65001acfd199f354cc5ac87`)

- **DONE_VERIFIED — complete push Tests workflow [44366957339](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44366957339) on exact HEAD:** all 18 job steps succeeded. Corpus structure validation, Python install, wheel registry verification, pytest (**322 passed, 68 subtests passed**), `npm ci`, high-severity npm audit (**0 vulnerabilities**), production build, generated-data freshness, Node tests, Chromium install and built-site Playwright (**73 passed**).
- GitHub Advisory Database now marks GHSA-fc5q-39xc-vjpf / CVE-2026-112366 **Withdrawn on 2026-11-18**: https://github.com/advisories/GHSA-fc5q-39xc-vjpf. This withdrawal preceded the successful audit run; prior failing audit runs occurred before withdrawal. No dependency override, downgrade, vendored patch or audit suppression was applied.
- **DONE_VERIFIED — Pages artifact build [44354810476](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44354810476) on immediately preceding code-identical tip `6772712820f74e154fb69d2ea9ce4ae0f98a9b7c`:** pinned Google Burmese WFST/OpenFst, IPA and browser alphabet invariants, static export, upstream parity, production build, Node tests, Chromium/Playwright and Pages artifact upload succeeded. Deploy skipped for PR event. Only documentation changed between that tip and `f2b5766`.
- **PENDING at documentation checkpoint:** PR-event Tests [44366973658](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44366973658) and Pages [44366973477](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44366973477); push Tests on exact `f2b5766` is already fully green. Optional diagnostics [44366973111](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44366973111) were still in progress; previous exact-code diagnostics [44354810570](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44354810570) passed with gold = 0 and accuracy = null.
- **Task ledger:** security gate DONE_VERIFIED on exact `f2b5766`; Python, Node, build, generated-data and 73 built-browser tests DONE_VERIFIED; Pages DONE_VERIFIED on code-identical prior tip, exact-tip PR event pending. Linguistic acceptance remains PARTIAL/BLOCKED: independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; MLC/MLCTS primary evidence and reuse rights incomplete; phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED.
- **Readiness:** security/engineering gate has passed on the exact code tip; repository remains a deployed research/engineering prototype, not linguistically release-ready or WCAG-conformance-certified.



## Final Pages verification — 2026-11-18 (`45309d2a6aaf9bebdf6fa67eca482a3ebc3c8d28`)

- **DONE_VERIFIED — Pages workflow [44367512869](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44367512869): SUCCESS on exact current HEAD.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser alphabet check, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright built-site tests, Pages configuration and artifact upload all completed successfully.
- Combined exact-head evidence: PR Tests [44367513029](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44367513029) SUCCESS; push Tests [44367500136](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44367500136) SUCCESS; Pages [44367512869](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44367512869) SUCCESS; optional diagnostics [44367512967](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44367512967) SUCCESS.
- This verifies build/artifact production only. Pages deployment was not run for the pull-request event; do not describe this as a production deployment.
- Engineering CI gates are now DONE_VERIFIED on this exact HEAD. Linguistic acceptance remains PARTIAL/BLOCKED: independent Yangon IPA gold = 0; accuracy unmeasured; MLC/MLCTS source provenance and reuse-rights evidence incomplete; full phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED. PR #171 remains OPEN/DRAFT/unmerged; release readiness is not established.

## Exact-head CI and diagnostic closeout — 2026-11-18 (`8f0f7961b41b5c894e046dcc79b603be0e165b28`)

- **DONE_VERIFIED — required Tests workflow [44376444433](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44376444433): SUCCESS on exact PR HEAD.** All 31 job steps completed successfully. Corpus structure validation, editable Python install, wheel registry verification, pytest (**322 passed, 68 subtests passed**), `npm ci`, both high-severity npm audit invocations (**0 vulnerabilities**), production build, generated-web-data freshness, Node tests, Chromium installation and built-site Playwright (**73 passed**) all passed.
- **DONE_VERIFIED — Pages build [44376444483](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44376444483): SUCCESS on the same exact HEAD.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet parity, static browser model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright, Pages configuration and artifact upload all passed. Deploy job was skipped because this is a PR event; no production deployment is claimed.
- **DONE_VERIFIED — optional raw-output diagnostics [44376444492](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44376444492): SUCCESS across Epitran/raw-output, CRFsuite baseline and Google WFST raw-output jobs.** This verifies reproducible diagnostic execution only. The diagnostic protocol remains non-gold; no independent Yangon IPA gold has been added, and no accuracy claim is supported by these runs.
- The prior GHSA-fc5q-39xc-vjpf audit failure is superseded for this HEAD by successful required audit runs reporting zero vulnerabilities. No dependency override, downgrade, vendored patch or audit suppression was applied.
- **Task ledger:** required CI, package/corpus checks, npm audit, build, generated-data check, Node and browser tests, Pages artifact build, and optional diagnostic execution are DONE_VERIFIED on exact HEAD. Linguistic acceptance remains PARTIAL/BLOCKED: independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; primary MLC/MLCTS evidence and reuse rights incomplete; phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED.
- PR #171 remains OPEN/DRAFT/unmerged. No production deployment, release, merge, force-push or branch deletion occurred. **Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.**


## Exact-tip CI completion — 2026-11-18 (`98e2b301fe1aa12d6f2b930fb9d9908317738040`)

- **DONE_VERIFIED — PR Tests [44378628219](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628219): SUCCESS** on this exact HEAD. Verified in job logs: **322 Python tests + 68 subtests**, **73 Playwright built-site tests**, production build and generated-data checks passed; `npm audit --audit-level=high` reported **0 vulnerabilities**.
- **DONE_VERIFIED — push Tests [44378609571](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378609571): SUCCESS** on the same exact HEAD.
- **DONE_VERIFIED — Pages build [44378628098](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628098): SUCCESS** on the same exact HEAD. Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet parity, static browser model export, upstream `thrax_g2p` parity, production build, Node/browser tests, Pages configuration and artifact upload succeeded. The `deploy` job was **SKIPPED** for the pull-request event; this is not a production deployment.
- **DONE_VERIFIED — optional raw-output diagnostics [44378628110](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628110): SUCCESS** across Google WFST raw-output, raw-output comparator and CRF baseline jobs. This is reproducibility/structural diagnostic evidence only, not an independent linguistic gold evaluation or accuracy score.
- **Task ledger:** all configured engineering CI gates are DONE_VERIFIED on exact HEAD `98e2b301…`. Linguistic acceptance remains PARTIAL/BLOCKED: independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; primary MLC/MLCTS evidence and reuse rights incomplete; phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED.
- PR #171 remains OPEN/DRAFT/unmerged. No merge, production deployment, release, force-push or branch deletion occurred. **Readiness remains research/engineering prototype, not linguistically release-ready or WCAG-conformance-certified.**


## Exact documentation-tip CI closeout — 2026-11-18 (`98e2b301fe1aa12d6f2b930fb9d9908317738040`)

The latest documentation-only integration tip has now completed all four applicable CI runs. Run metadata confirms every run's `head_sha` is exactly `98e2b301fe1aa12d6f2b930fb9d9908317738040`.

- **DONE_VERIFIED — PR Tests [44378628219](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628219): SUCCESS.** All 31 job steps passed: independent IPA corpus-structure validation, editable Python install, wheel registry verification, pytest (**322 passed, 68 subtests passed**), `npm ci`, high-severity npm audit, production build, generated-web-data freshness, Node tests, Chromium installation and built-site Playwright (**73 passed**).
- **DONE_VERIFIED — push Tests [44378609571](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378609571): SUCCESS** on the same exact SHA; all configured test/audit/build/browser steps passed.
- **DONE_VERIFIED — Pages build [44378628098](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628098): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet parity, static browser model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload passed. The deploy job was skipped for this PR event; this is not a production deployment.
- **DONE_VERIFIED — optional diagnostics [44378628110](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628110): SUCCESS** across raw-output, CRFsuite and Google WFST jobs. These are reproducibility/raw-output diagnostics only, not independent gold or accuracy evidence.
- GitHub run metadata confirms all four run IDs above target exact `head_sha` `98e2b301fe1aa12d6f2b930fb9d9908317738040`. The canonical branch head at this verification was the same SHA.
- **Task ledger:** required Tests, push Tests, package/corpus validation, security audit, build, generated-data check, Node/browser tests, Pages artifact build and optional diagnostic execution are DONE_VERIFIED on this exact tip. Linguistic acceptance remains PARTIAL/BLOCKED: independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; primary MLC/MLCTS evidence and reuse rights incomplete; phonological coverage partial; manual accessibility QA TODO; independent annotation DEFERRED.
- PR #171 remains OPEN/DRAFT/unmerged. No merge, production deployment, release, force-push or branch deletion occurred. **Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.**


## Independent API layer-status contract — 2026-11-18

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-012 | DONE_VERIFIED | Python/browser API now expose separate graphemic, source-phonology, IPA and Ukrainian-adaptation statuses. Added `schemas/analysis-layer-status.schema.json`; schema tests validate Python and browser enum variants; runtime tests cover established segmental, partial medial, unsupported, empty and mixed-script cases. Implementation commit `c607cca53d63f3d4fd606e328010b25eef0b601d`; PR Tests [44389661155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44389661155) and push Tests [44389647797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44389647797) SUCCESS (324 pytest + 68 subtests; 73 Playwright; npm audit 0 vulnerabilities). | API status metadata only; it does not establish phonetic completeness, add gold entries or measure accuracy. Independent adjudicated Yangon IPA gold remains 0. |


## Structural, UI and exact-head acceptance closeout — 2026-11-18

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-010 | DONE_VERIFIED | Canonical-equivalence, Unicode block/inventory, mixed-script, punctuation, controls, malformed virama, reordered-mark and assigned-letter/mark losslessness fixtures in Python and browser; exact-head CI [44392021017](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392021017) SUCCESS (325 pytest + 68 subtests; 74 Playwright). | Bounded Unicode/structural contract only; annotated differential corpus remains partial. |
| BUR-011 | DONE_VERIFIED | All four medials, five pairs, two triples, kinzi, conjunct/subjoined consonants, coda and malformed mark-order fixtures; shared Python/browser structural tests on exact head `ea37329`. | Structural parser acceptance only; no medial/kinzi/conjunct pronunciation claim. |
| BUR-012 | DONE_VERIFIED | Separate graphemic, phonology, IPA and Ukrainian adaptation status fields, runtime-specific JSON Schema and regression tests. | API uncertainty contract only; no added phonological coverage. |
| BUR-016 | DONE_VERIFIED | README and UI research notice document prototype scope; UI exposes independent layer statuses and Playwright asserts the segmental-only provisional case. | Manual assistive-technology, keyboard, zoom/reflow and mobile QA remains TODO. |

### Exact code/UI CI evidence — 2026-11-18

- PR Tests [44392021017](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392021017) and push Tests [44392004315](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392004315): SUCCESS on exact head `ea37329ae4a3ba59442a3a61e56210e7b971e8b2`; 325 pytest, 68 subtests, 74 Playwright, npm audit 0 vulnerabilities.
- Pages build [44392020805](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392020805): SUCCESS; Pages artifact uploaded; deploy skipped for PR event.
- Optional diagnostics [44392020840](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392020840): SUCCESS; raw-output reproducibility only.
- Research boundary unchanged: independent adjudicated Yangon IPA gold = 0; accuracy unmeasured; source rights and full phonological coverage incomplete.


## Exact-head implementation and CI closeout — 2026-11-18 (`42c53bb1cab2b2e17baea5ee6abc2365917fe75f`)

- **DONE_VERIFIED — BUR-012 independent analysis-layer status contract:** Python exposes `graphemic_status` and `phonology_status`; browser exposes `graphemicStatus` and `phonologyStatus`. Existing IPA and Ukrainian adaptation statuses remain independent. Runtime-specific JSON Schema, enum alignment, Python/browser tests, and mixed-script Myanmar-unit scoping are implemented. This is status/uncertainty metadata, not new phonological coverage.
- **DONE_VERIFIED — research UI status presentation:** browser UI displays the independent layer statuses; regression tests cover the provisional/segmental-only case. README and architecture documentation explicitly preserve the distinction between segmental candidates and canonical full-profile pronunciation.
- **DONE_VERIFIED — PR Tests [44392937073](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392937073): SUCCESS on exact HEAD.** Python: **325 passed, 68 subtests passed**; npm audit: **0 vulnerabilities**; production build, generated-web-data freshness, Node tests, and built-site Playwright: **74 passed**. Corpus/schema validation, editable install and wheel registry verification also passed.
- **DONE_VERIFIED — push Tests [44392923302](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392923302): SUCCESS** on the same exact HEAD, with the same Python/browser counts and zero npm vulnerabilities.
- **DONE_VERIFIED — Pages artifact build [44392936981](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392936981): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser alphabet parity, static model export, upstream `thrax_g2p` parity, production build, Node/browser tests, Pages configuration and artifact upload passed. Deploy job was **SKIPPED** for this PR event; no production deployment is claimed.
- **DONE_VERIFIED — optional raw-output diagnostics [44392937034](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392937034): SUCCESS** across Google WFST raw-output, CRF baseline and raw-output comparator jobs. These remain reproducibility diagnostics, not independent gold evaluation or accuracy evidence.
- GitHub confirms the branch is **137 commits ahead, 0 behind** `main`; PR #171 is **OPEN/DRAFT/unmerged**, mergeable, and based on `a4f730157c837354fbfb8cbadab8b08279e1fc5e`. No merge, force-push, branch deletion, release or production deployment occurred.
- **Remaining acceptance blockers:** independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; primary MLC/MLCTS source evidence and reuse rights incomplete; full vowels, medials, codas, tone, phonation, quantity and profile coverage remain partial; manual assistive-technology/keyboard/zoom/reflow/mobile accessibility QA remains TODO; independent annotation remains deferred pending qualified annotators and rights-cleared data.
- **Readiness:** engineering CI is DONE_VERIFIED on exact HEAD; the repository remains a research/engineering prototype, **not linguistically release-ready and not WCAG-conformance-certified**. Diagnostic outputs must not be presented as accuracy scores.


## Final exact-head CI verification — 2026-11-18 (`86c5f4f90689882a8ebcb537bfae27d1fe7d206b`)

- **DONE_VERIFIED — PR Tests [44393965534](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44393965534): SUCCESS** on exact HEAD. Logs confirm **325 pytest + 68 subtests**, **74 built-site Playwright tests**, both npm audit invocations reporting **0 vulnerabilities**, production build, generated-web-data freshness, Node tests, corpus/schema validation, editable install and wheel registry verification.
- **DONE_VERIFIED — push Tests [44393948559](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44393948559): SUCCESS** on the same exact HEAD. Logs independently confirm 325 pytest + 68 subtests, 74 Playwright and zero npm vulnerabilities.
- **DONE_VERIFIED — GitHub Pages artifact build [44393965346](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44393965346): SUCCESS** on exact HEAD. Pinned Google Burmese WFST/OpenFst build completed; IPA unique-decodability, phoneme symbol-table currentness and TSV currentness checks passed; static browser export, parity checks, production build and artifact upload succeeded. The deploy job was skipped for this PR event; **no production deployment is claimed**.
- **DONE_VERIFIED — optional diagnostics [44393965297](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44393965297): SUCCESS** on exact HEAD. Epitran raw-output, CRF baseline and Google WFST raw-output jobs completed and uploaded artifacts. Google WFST: 6/6 outputs, 0 runtime errors, independent gold count 0, accuracy null. CRF: 100 rows, 100 predictions, 84 source-concordant rows, gold count 0, accuracy null, scoring status `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`. These are diagnostic outputs only and must not be represented as accuracy evidence.
- **Task ledger:** all four configured engineering workflows are DONE_VERIFIED on exact HEAD `86c5f4f...`; the prior exact-head documentation-only commit `86c5f4f...` is the verified tip. This closeout note itself is being added as a documentation-only follow-up and will require its own CI run before its SHA is marked verified.
- **Remaining blockers unchanged:** independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; primary MLC/MLCTS source evidence and reuse rights incomplete; full phonological coverage partial; manual accessibility QA TODO; independent annotation deferred pending qualified annotators and rights-cleared data.
- PR #171 remains OPEN/DRAFT/unmerged. No release, merge, force-push, branch deletion or production deployment occurred. Readiness remains research/engineering prototype, not linguistically release-ready or WCAG-conformance-certified.


## Convention approval and gold pilot gate — 2026-11-18

- **DONE_VERIFIED (documentation draft only):** `docs/ipa-convention-sheet-draft.md` captures the specialist decisions required before annotation and maps them to existing typed IPA fields.
- **BLOCKED:** no approved convention version, no confirmed expert panel, no two independent annotators, no separate adjudicator and no curator approval record.
- **BLOCKED:** source/item-level rights and exact locator review must precede the 30-item sample.
- **TODO:** private blind-intake dry-run and sample selection after the preceding gates pass.
- No labels, inferred IPA, model-derived gold, runtime phonology or benchmark accuracy were added. The draft must not be treated as approved guidance.


## Exact final-tip CI closeout — 2026-11-18 (`ed7d5905bfcd1b21e2b19724de4468045ce79b3e`)

GitHub Actions job metadata was re-polled after the earlier pending update. All four configured workflows now have completed jobs on this exact commit:

- **DONE_VERIFIED — PR Tests [44396077489](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44396077489): SUCCESS.** Corpus structure validation, Python install, wheel registry verification, pytest, npm ci, high-severity npm audit, production build, generated-data freshness, Node tests, Chromium installation and built-site Playwright all passed. The job had no failed or skipped test steps.
- **DONE_VERIFIED — Push Tests [44396061046](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44396061046): SUCCESS** on the same exact SHA; all configured steps passed.
- **DONE_VERIFIED — Pages artifact build [44396077232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44396077232): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser alphabet parity, static model export, upstream `thrax_g2p` parity, production build, Node/browser tests and Pages artifact upload passed. Deploy job was **SKIPPED** for the PR event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44396077439](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44396077439): SUCCESS** across raw-output comparator, CRF baseline and Google WFST raw-output jobs. These remain diagnostic outputs only, not independent gold or accuracy evidence.

The exact-head engineering CI gate is therefore green on `ed7d5905bfcd1b21e2b19724de4468045ce79b3e`. PR #171 remains OPEN/DRAFT/mergeable/unmerged; no review submissions or inline review threads were returned by GitHub at this check. No merge, release, force-push, branch deletion or production deployment occurred. Linguistic acceptance is unchanged: independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; expert convention approval, qualified annotators/adjudicator/curator, rights-cleared attested items and private blind intake remain blockers; full phonological coverage and manual accessibility QA remain incomplete. Readiness remains research/engineering prototype, not linguistically release-ready or WCAG-conformance-certified.


## Exact latest-head CI closeout — 2026-11-18 (`ca138eb60bc95a2accd2d6bfa3e111b0ce905101`)

All four configured engineering workflows completed successfully on the exact integration tip:
- PR Tests [44404325558](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44404325558): SUCCESS.
- Push Tests [44404308900](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44404308900): SUCCESS.
- Pages artifact build [44404325607](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44404325607): SUCCESS, including pinned Google Burmese Thrax/OpenFst, IPA symbol-table invariants, browser alphabet parity, static export, upstream `thrax_g2p` parity, production build, Node/browser tests and artifact upload. Deploy was SKIPPED for the PR event; no production deployment.
- Optional diagnostics [44404325554](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44404325554): SUCCESS across raw-output comparator, CRF baseline and Google WFST raw-output. These remain diagnostic-only, not independent gold or accuracy evidence.

The integration branch is 148 commits ahead of `main` and 0 behind at this comparison; PR #171 remains OPEN/DRAFT/mergeable/unmerged and is stacked on `fix/finals-registry-schema-2026-11-17`. No rebase, merge, deployment, release, force-push or branch deletion occurred.

Scientific acceptance remains PARTIAL/BLOCKED: independently adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; specialist convention approval, two independent annotators, separate adjudicator, curator, 30 attested items with item-level source locators/rights, and private blind-intake dry-run remain unresolved. Full phonological coverage and manual accessibility QA are incomplete. Research/engineering prototype only; not linguistically release-ready or WCAG-conformance-certified. No runtime, corpus, gold-label or linguistic-rule changes were made in this CI closeout.


## Exact latest integration-tip CI closeout — 2026-11-18 (`afaa32a748f836f78a28b4fb287dcbe4bd8c0641`)

All four configured workflows have now completed successfully on the exact current integration head:

- **DONE_VERIFIED — PR Tests [44406181613](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44406181613): SUCCESS.** Required Python/package/corpus checks, npm install and high-severity audit, production build, generated-data freshness, Node tests and **74 built-site Playwright tests** passed.
- **DONE_VERIFIED — Push Tests [44406161737](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44406161737): SUCCESS.** All configured steps passed, including **74 built-site Playwright tests**.
- **DONE_VERIFIED — Pages artifact build [44406181681](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44406181681): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet parity, static browser model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload passed. The deploy job was **SKIPPED** for the PR event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44406181652](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44406181652): SUCCESS** across the pinned CRF baseline, raw-output comparator and Google WFST raw-output jobs. These are reproducibility/raw-output diagnostics only, not independent gold or accuracy evidence.

The exact-head engineering CI gate is green on `afaa32a748f836f78a28b4fb287dcbe4bd8c0641`. PR #171 remains OPEN/DRAFT/mergeable/unmerged; it is stacked on `fix/finals-registry-schema-2026-11-17`, 151 commits ahead of `main` and 0 behind at the recorded comparison. No merge, release, force-push, branch deletion or production deployment occurred.

**Linguistic acceptance remains PARTIAL/BLOCKED:** independently adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; specialist convention approval, qualified annotators/adjudicator/curator, rights-cleared attested items and private blind-intake remain unresolved; full phonological coverage and manual accessibility QA remain incomplete. The optional benchmarks do not change this evidence status. Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified. No runtime, corpus, gold-label or linguistic-rule changes were made in this CI closeout.


## Exact CI closeout — integration tip `6c5190683bce286cfc46c52497cabdc6d7b2fa07` (2026-11-18)

All four configured workflows completed successfully on this exact SHA; run metadata confirms each `head_sha` matches:

- **DONE_VERIFIED — PR Tests [44407661913](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407661913): SUCCESS.** Corpus structure validation, editable Python install, wheel registry verification, pytest, npm install, high-severity npm audit, production build, generated-data freshness, Node tests, Chromium installation and built-site Playwright suite all passed.
- **DONE_VERIFIED — Push Tests [44407648376](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407648376): SUCCESS** on the same SHA; all configured steps passed, including built-site browser tests.
- **DONE_VERIFIED — Pages artifact build [44407661700](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407661700): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser-input alphabet parity, static browser-model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload passed. The deploy job was **SKIPPED** for the PR event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44407661678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407661678): SUCCESS.** Pinned Google WFST, CRF baseline and raw-output comparator jobs passed and uploaded outputs/provenance. These are reproducibility/raw-output diagnostics only, not independent gold or accuracy evidence.

The exact-head engineering CI gate is green on `6c5190683bce286cfc46c52497cabdc6d7b2fa07`. PR #171 remains OPEN/DRAFT/mergeable/unmerged, based on `fix/finals-registry-schema-2026-11-17`. This closeout changed no runtime, phonology, source data, corpus, gold labels or benchmark methodology.

**Linguistic acceptance remains PARTIAL/BLOCKED:** independently adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; specialist convention approval, qualified annotators/adjudicator/curator, rights-cleared attested pilot items and private blind intake remain unresolved; full phonological coverage and manual accessibility QA remain incomplete. No accuracy claim follows from optional raw-output diagnostics. Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.


## Repository integration reconciliation — 2026-11-19

**DONE_VERIFIED — PR #129 stack content reconciliation (tree-level only).** The apparent 11 paths unique to #129's diff are already present in #171's base tree (#168 head a4f730157c837354fbfb8cbadab8b08279e1fc5e) and inherited by #171. Confirmed by fetching the base and #171 copies of hybrid.py and benchmark_google_fst.py, and verifying the associated registry/docs/tests are present in the inherited tree. No duplicate port is required. PR #129 remains OPEN/DRAFT, stale/diverged and mergeable=false; its description/comment and PR #171 comment now state the corrected reconciliation. No merge/rebase/close/source branch mutation occurred.

**Evidence boundary unchanged:** independent adjudicated Yangon IPA gold=0; accuracy unmeasured. External provider priorities are diagnostic ordering only; candidate outputs remain unpromoted. myG2P remains CC BY-NC-SA 4.0 constrained and is not bundled. Google WFST smoke remains raw-output/build evidence only, not pronunciation accuracy. This reconciliation adds no lexical gold or linguistic claims.


## Engineering CI closeout — 2026-11-19

**DONE_VERIFIED (exact HEAD `65c823c8d6a2a50f30a73bdf7fec99497a8c4fb2`):** PR Tests run 44498785399 SUCCESS; Pages build run 44498785224 SUCCESS; optional diagnostics run 44498785171 SUCCESS. Required Python/package/wheel/pytest, npm install and high-severity audit, production build, generated-data freshness, Node tests, Chromium and built-site Playwright passed. Pages artifact uploaded (57,959 bytes; SHA-256 38af2788bbb4ec9d051d95c29844c8e662f175e939515a393015614eb23ff261); deploy job skipped for PR event. Optional Google WFST/Epitran/CRF outputs are diagnostics only and do not constitute independent gold or accuracy evidence.

**Linguistic acceptance unchanged:** independently adjudicated Yangon-profile IPA gold=0; accuracy unmeasured; expert convention approval, annotators/adjudicator/curator, rights-cleared attested items and blind-intake dry-run remain blocked; full phonological coverage partial; manual accessibility QA TODO. No new gold labels or accuracy claim.


## Exact-head CI closeout — 2026-11-19 (`3c1e74c457091b925e1fc15a9d997123e60f6773`)

All three configured PR workflows completed **SUCCESS on this exact HEAD**:
- **DONE_VERIFIED — PR Tests [44512786531](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44512786531): SUCCESS.** Python/package/wheel and corpus validation, pytest, npm install and high-severity audit, production build, generated-data freshness, Node tests, Chromium and built-site Playwright all passed.
- **DONE_VERIFIED — Pages artifact build [44512786476](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44512786476): SUCCESS.** Pinned Google Burmese WFST/OpenFst, IPA symbol-table invariants, browser alphabet parity, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and artifact upload passed. Artifact `github-pages`: 57,959 bytes, SHA-256 `97eb5066cf78e002020225f4f22f55314872b2e63206cd29cd6576b50f81b526`. Deploy job was **SKIPPED** for the PR event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44512786448](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44512786448): SUCCESS.** Google WFST raw-output (1,976 bytes; SHA-256 `1dab2ecfd879c0bb39d1e4e8fc01c1eabbbde1322c36d4529ed62d5fc7b35835`), CRF raw-output (12,370 bytes; SHA-256 `45621543ad79aa6feb109ae00029d1714b8bd510465a6e69f2c87f591ea3d4b4`) and Epitran raw-output (1,706 bytes; SHA-256 `e734ebed1963fc96a21b5754fd7e7b648e106d7f1e1b2b729b1bee4a62670678`) artifacts uploaded. These remain diagnostic-only; independently adjudicated Yangon IPA gold=0 and accuracy is unmeasured.

PR #171 remains OPEN/DRAFT/mergeable/unmerged. This exact-head closeout changes no runtime, source data, corpus, gold labels or benchmark methodology. Linguistic acceptance remains PARTIAL/BLOCKED: specialist convention approval, qualified annotators/adjudicator/curator, rights-cleared attested pilot items, private blind intake, full phonological coverage and manual accessibility QA remain unresolved. Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.


## Exact documentation-tip CI closeout — 2026-11-19 (`12f3ed423d97e1fe533425045105a12142fc66fd`)

All three configured workflows completed **SUCCESS on this exact HEAD**:
- **DONE_VERIFIED — required Tests [44518364893](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44518364893): SUCCESS.** Independent IPA gold corpus structure validation, editable Python install, wheel registry verification, pytest, `npm ci`, high-severity npm audit, production build, generated-data freshness, Node tests, Chromium installation and built-site Playwright all passed.
- **DONE_VERIFIED — Pages artifact build [44518364743](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44518364743): SUCCESS.** Pinned Google Burmese WFST/OpenFst, IPA symbol-table invariants, browser alphabet parity, static browser model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and artifact upload passed. Artifact `github-pages`: 57,958 bytes; SHA-256 `4fc13f68bea2e175f412e3256638992a55c1c3237ec7b9960d94790436ce9b3a`. Deploy job was **SKIPPED** for the PR event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44518364788](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44518364788): SUCCESS** across all three jobs (raw-output comparator, CRF baseline, Google WFST raw-output). Uploaded artifacts: comparator 1,700 bytes, SHA-256 `8645a3eb5e35204c487bd48f6d3a46540b3bfe11a86ab6aabb366ac23e9dace8`; CRF 12,370 bytes, SHA-256 `8730be5f8d8cc054627fd1c4ea0963481cd28db4011f1b3d103d0aced31c3271`; Google WFST 1,976 bytes, SHA-256 `5f95bfb8b5efc86dd19e75d0babd4ebff5a4be2fd794fd7f0e87fc612e839a82`. These remain diagnostic raw outputs only, not independent gold or accuracy evidence.

The run metadata identifies the exact same `head_sha` for all three workflows. The three documents in this section are now synchronized to this exact verified tip. PR #171 remains OPEN/DRAFT/mergeable/unmerged. No source/runtime, corpus, gold label, schema or generated artifact changed in this closeout. Independent adjudicated Yangon IPA gold=0; accuracy remains unmeasured. Specialist convention approval, qualified annotators/adjudicator/curator, item-level source rights and attested pilot items, blind-intake dry-run, full phonological coverage and manual accessibility QA remain unresolved. Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.


## Green (2002) primary-source verification — 2026-11-19

`docs/ipa-gold-collection-playbook.md` now records a direct check of Antony Dubach Green's October 2002 Rutgers Optimality Archive PDF. The review verified the paper's account of placeless coda /N/, preceding-vowel nasalization and approximate coronal/velar realization (the latter attributed by Green to Bennett & Lehman 1994); the /ʔ,N/ place-assimilation discussion and examples in (17); and Table (35)'s 50 major rhymes, whose nasal-rhyme columns list Low/High/Creaky but no Checked tone. The paper explicitly identifies its transcription as broad, nearly standard IPA and notes cross-author convention variation.

**Ledger:** source identification and central-claim verification = DONE_VERIFIED as a literature-audit step; complete manual transcription of all 50 table cells and independent specialist review = PARTIAL/TODO; conversion into runtime rules or gold labels = NOT AUTHORIZED. Table (35) is an inventory adapted from Thein Tun (1982), not a rights-cleared lexical item list. Green's examples are source leads, not automatically approved pilot items. /N/ must remain distinct from its context-dependent surface realization; no blanket [n]/[ŋ] mapping is justified.

No runtime, registry, corpus, schema, gold-label, or benchmark changes were made. Independent adjudicated Yangon IPA gold remains 0; accuracy remains unmeasured; expert recruitment, convention approval, item-level rights review and blind intake remain blocked. The engineering/research prototype is not linguistically release-ready.


## Green (2002) unresolved nasal-rhyme + Checked-tone input — 2026-11-19

A closer check of section 2.4 (printed pp. 12–13; PDF page 6) adds an important limit to the table (35) observation. Green says nasal-rhyme syllables do not occur with Checked tone, then explicitly considers a hypothetical input combining nasalization with the Checked tone's [+constricted glottis, −tense] feature bundle. He lists several possible outputs (including loss of the c.g. feature, change in tenseness, or deletion of nasalization) and states that there is no independent evidence to rank the relevant faithfulness constraints; the hypothetical output therefore remains unanswerable (PDF lines 234–243).

**Disposition:** record the absence of Checked in Green's nasal-rhyme inventory as a source-specific descriptive generalization only. Do not infer a repair, neutralization, deletion, or surface IPA for a hypothetical nasal+Checked combination; do not encode a runtime rule or gold label from this discussion. This uncertainty is explicit in the primary source, not merely a gap in the project's research. Specialist review and profile-matched evidence remain required.


## Exact-head four-workflow CI closeout — 2026-11-19 (`adef3fedb2e69afb9c66edc1f46c9ec3414329b7`)

All four configured workflows completed **SUCCESS on this exact integration HEAD**; each run's `head_sha` is `adef3fedb2e69afb9c66edc1f46c9ec3414329b7`:

- **DONE_VERIFIED — PR Tests [44590458324](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44590458324): SUCCESS.** Corpus structure validation, editable Python install, wheel registry verification, pytest, npm install/audit, production build, generated-data freshness, Node tests, Chromium installation and built-site Playwright all passed.
- **DONE_VERIFIED — Push Tests [44590449926](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44590449926): SUCCESS.** All configured Python/package/corpus, npm/build/data freshness, Node and browser test steps passed.
- **DONE_VERIFIED — Pages artifact build [44590458189](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44590458189): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet parity, static browser-model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload passed. Artifact `github-pages`: 57,955 bytes; SHA-256 `f6b3d65f3b0d933e68715cd58e7088408e7628b829501483dff17e46f4a9098f`. Deploy job was **SKIPPED** for the PR event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44590458182](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44590458182): SUCCESS** across Google WFST raw-output, CRF baseline and raw-output comparator jobs. Artifacts: Epitran 1,702 bytes (SHA-256 `1fcf373a6b54219515272f63086b8e3dc1cf32313ee843c01e2dd76827bb7790`); Google WFST 1,977 bytes (`ba72e256e766ff370a50e479ef50d69bbc7ea7f2c9a020fc2dbe2497b6436400`); CRF 12,370 bytes (`0158ab709c5d310ca8ee9c30a4ddb9bbaebdfca280e95949248e0679c83e59f5`). These remain raw-output diagnostics only, not independent gold or accuracy evidence.

The exact-head engineering CI gate is green. PR #171 remains OPEN/DRAFT/mergeable/unmerged, based on `fix/finals-registry-schema-2026-11-17`. This closeout changes no runtime, source data, corpus, gold labels, schema or benchmark methodology. Independent adjudicated Yangon IPA gold=0; accuracy remains unmeasured. Specialist convention approval, qualified annotators/adjudicator/curator, item-level source rights and attested pilot items, blind-intake dry-run, complete phonological coverage and manual accessibility QA remain unresolved. Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.

## Beta release scope decision — 2026-11-21

The project owner has explicitly chosen to proceed with public beta versions because qualified external specialists will not be available. This supersedes the earlier assumption that human expert annotation/adjudication is a prerequisite for *any* release.

- **Beta is permitted; expert validation is not claimed.** The gold corpus may remain empty and linguistic accuracy must remain null / NOT_ASSESSED.
- Reclassify the absence of annotators, adjudicator and expert-approved convention as **DEFERRED for beta**, not as a blocker to publishing a clearly labelled beta. It remains a blocker to expert-validated or production linguistic claims.
- Preserve all fail-closed behavior. Do not invent IPA, gold labels, accuracy metrics, source permissions or complete contextual rules.
- Beta acceptance requires exact-candidate engineering CI, package/site build, generated-data freshness, browser smoke tests, user-facing limitations, and documented rights for every shipped asset.
- Candidate external corpora with unresolved item-level provenance or license remain excluded. This decision does not authorize their import or redistribution.
- Manual accessibility QA is not a beta engineering gate if clearly disclosed as not performed; automated checks remain required.
- Publication of a GitHub Release or other external announcement still requires a separate owner-authorized action.

Canonical criteria: [docs/BETA-RELEASE-POLICY.md](BETA-RELEASE-POLICY.md). This decision changes release scope only; it does not alter phonological rules, IPA labels, corpus contents, or linguistic evidence.

---

## Engineering gate and corpus-coverage corrections — 2026-11-04

- The shared IPA corpus CLI previously emitted `release_ready: true` after checking only machine-verifiable corpus engineering conditions (adjudicated rows, frozen split minimums, one target-profile signature, one IPA kind and recorded redistributable source rights). It did not evaluate expert approval of the IPA convention, annotator/adjudicator qualifications, blind intake or expert-approved phonological contrast coverage.
- The success payload now reports `engineering_gate_passed: true` and `linguistic_release_readiness: "NOT_ASSESSED_BY_THIS_COMMAND"`. It lists six external acceptance gates not evaluated by this command: versioned expert-approved IPA convention; qualified independent annotators and separate adjudicator; controlled blind annotation/adjudication; expert-approved contrast coverage; independent corpus curator; and independent source-rights/license verification. It no longer emits `release_ready`.
- The engineering gate now separately requires at least **30 distinct adjudicated lexeme groups** by default, in addition to train/dev/test record minima. It reports both the number of distinct adjudicated groups and the configured minimum; repeated records within a single group cannot inflate the group-coverage count. Tests may lower the minimum explicitly for small synthetic fixtures.
- The tag/manual workflow is now named `IPA gold engineering-data gate`, and its minimum-count step explicitly says it is not linguistic release approval.
- Test-first evidence: regression-only commits produced expected Python-test failures on the old implementation (RED runs 41885532144, 41886250739, 41887130166). The final implementation on code-bearing commit `17324f3f08f5b3f69c710c284a2fb355fc859629` has exact-head hosted evidence: 41887469954; additional push workflow: 41887463480. At checkpoint, the PR workflow had passed Python tests, npm build, generated-data drift check and npm tests, but the built-browser test was still running; the push workflow was still installing Chromium. Full workflow success is NOT YET VERIFIED.
- Updated `tests/test_ipa_gold_corpus.py` to assert the exact status, six unevaluated gates, absence of the old `release_ready` key, distinct lexeme-group minimums, and positive group minimum validation. No IPA labels, phonological rules, corpus rows, source permissions or generated pronunciation data changed.
- No local checkout or local test execution was available in this connector session; all verification evidence listed here is from hosted GitHub Actions.

## Post-merge handoff audit — 2026-11-04

- The base `main` SHA for this implementation branch was `58c509080eb5ae6d22c2d5277904d2688b9d246e`. This is an immutable branch-base fact, not a claim that it remains the live `main` head after this implementation PR is merged.
- Previous documentation checkpoint PR #122 had exact head `60a92b8a54bb2a2955e7eb7ad5502f8e749d504f`. Its diff was manually inspected; no CI status/workflow evidence surfaced for that PR head, so its CI remains **NOT VERIFIED**.
- The duplicate follow-up PR #123 was closed unmerged. The replacement implementation PR is #124; it includes the validator, regression tests, workflow-label correction, agent guidance and this handoff update. The branch's code-bearing implementation commit is `42d2d478bd025aceb67bddac7e9f335121da0f4b`; GitHub PR metadata is the source of the eventual merge SHA.
- The exact-head workflow evidence and any still-running steps are recorded in the engineering-gate section above. This document intentionally records immutable branch-base history rather than a self-referential live-main SHA.
- Independent expert-adjudicated IPA gold remains 0; `data/benchmark/gold.tsv` remains header-only; empirical accuracy remains null. The profile confirmation does not substitute for expert convention approval, independent annotators/adjudicator, curator, blind intake, contrast coverage or independently verified source rights.

---


## Exact mainline checkpoint after methodology-gate adoption — 2026-11-04

- Verified `main` head: `ef82296a0906bf0c041d60a8cf6f193a602e9950`. The two methodology/completion-gate PRs for this repository are merged; there are no open PRs at this checkpoint. No implementation, linguistic registry, source record, benchmark label, or generated artifact was changed by those PRs.
- Exact-head CI status at checkpoint: Burmese tests run 41877091198 and Pages deployment run 41877090949 are QUEUED. These runs have not completed; do not record them as successful. Earlier green PR runs are not substitutes for this exact mainline head.
- GitHub branch metadata reports `main` as unprotected (no required status checks). This is a repository governance risk, not changed here; configuring branch protection or rulesets requires an owner decision and is outside this checkpoint.
- Independent expert-adjudicated IPA gold remains 0; `data/benchmark/gold.tsv` remains header-only; empirical accuracy remains null. MYA-GOLD-001 remains BLOCKED (independent adjudicated gold=0; gold.tsv header-only; target profile is already confirmed as contemporary Standard Burmese, Yangon reference variety, careful citation-form speech (`my-yangon-careful-citation-v1`); the versioned IPA convention sheet, two independent text-based reviewers, third adjudicator, curator, private blind intake and rights-cleared 30 source-located written lexeme groups remain required). MYA-PHON-001, MYA-IPA-001 and MYA-ROM-001 remain PARTIAL; MYA-UI-001 remains TODO. Myanmar Wiktionary rights remain CONFLICT/UNKNOWN; MLCTS and myG2P remain orthographic/diagnostic evidence, not IPA gold.
- Methodology upstream refresh: Unlazy remains at `16671491f6679ad9378f52604d3bc2415b4120c7`; Matt Pocock skills at `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`; Ponytail at `96608e078b2d5ea607c5c3b8b5a54d1c1fba6846`. Superpowers main has advanced to `22f0b463e7a5e579904dd6211a520321035526f7` (v7.0.2), one commit beyond the project's pinned v7.0.1 snapshot. Its delta is primarily harness/platform integration and skill-helper changes; no runtime dependency or unreviewed copy was imported. Keep the existing pinned reference reproducible unless a project-specific adoption is justified.
- Environment boundary: this checkpoint used GitHub's hosted repository/Actions APIs; no local checkout or local test execution was available. Do not claim local pytest/npm/Playwright results.
- Next actionable work: Continue primary-source verification of MLCTS and the versioned IPA convention, while organizing a text-only human adjudication pilot based on written dictionary entries and published phonological descriptions; do not treat MLCTS or sparse Wiktionary IPA as gold.

---

## External source review — Burmese Wiktionary IPA (2026-11-04)

- Reviewed the Hugging Face dataset card, its JSONL file metadata, and the upstream Wiktionary copyright policy.
- Dataset card reports 22,191 word–POS rows, 20,759 unique headwords, and only 113 IPA values (0.51%); MLCTS has full coverage but is not IPA.
- The card declares CC BY 4.0 while identifying Myanmar Wiktionary as the source. The Myanmar Wiktionary local policy page (last edited 2024-12-06) states CC BY-SA 3.0 Unported and GFDL. This is a potential license compatibility/relicensing issue; rights stay CONFLICT/UNKNOWN pending clarification. Source policy: https://my.wiktionary.org/wiki/%E1%80%9D%E1%80%85%E1%80%BA%E1%80%9B%E1%80%BE%E1%80%84%E1%80%BA%E1%80%94%E1%80%9B%E1%80%AE:%E1%80%A1%E1%80%91%E1%80%BD%E1%80%B1%E1%80%91%E1%80%BD%E1%80%B1_%E1%80%9E%E1%80%90%E1%80%AD%E1%80%95%E1%80%BC%E1%80%AF%E1%80%96%E1%80%BD%E1%80%9A.
- The dataset provides no per-entry dialect/convention, audio, annotator/adjudication, or detailed source locator in the card. Treat as a sparse discovery lead, not independent gold. No rows imported.
- Evidence: https://huggingface.co/datasets/its-autumn/burmese-wiktionary; https://en.wiktionary.org/wiki/Wiktionary:Copyrights.

## Post-merge reconciliation — Burmese G2P diagnostic provenance (2026-11-03)

- PR [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106) is merged into main as **76426383038ee18a4cf5f2136379b25c08a40d7e**; this is the current mainline checkpoint for this change.
- The exact implementation/workflow head 942b6e8834878538c4e478c9195420b9618acd3 was verified: tests [41726477853](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477853) SUCCESS (162 Python tests + 64 subtests; 54 browser tests); optional Epitran/CRF [41726478205](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726478205) SUCCESS; optional Goruut [41726477909](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477909) SUCCESS. The downloaded Epitran artifact contains JSON + .json.sha256 and is retained 90 days.
- Later commits on the PR reconciled the handoff/register only. The post-merge push-run result was not available through the connected workflow-run query at this checkpoint; no post-merge CI result is claimed.
- Research boundary unchanged: independent adjudicated Burmese IPA gold remains 0; empirical accuracy remains null.

## Continuation update — external Burmese G2P report provenance and integrity (2026-11-03)

- **BURMESE-G2P-PROVENANCE-001 — DONE_VERIFIED (diagnostic reproducibility only):** scripts/benchmark_g2p.py now embeds exact harness SHA-256, corpus path/hash, engine name/version, Python version/implementation, platform, and clearly named GitHub event SHA/ref/head-ref fields. Existing Epitran mapping/preprocessor/postprocessor hashes remain intact. A supplied JSON output path produces a .json.sha256 sidecar and creates parent directories.
- **Workflow/artifact correction:** optional-epitran-benchmark.yml now uploads the JSON and adjacent sidecar together and retains the Epitran artifact for 90 days. The CRF artifact's separate retention policy is unchanged.
- **Test-first evidence:** regression test added first; expected RED [41725146714](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725146714). A transient implementation run [41725276827](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725276827) caught an incorrectly escaped newline in the sidecar; fixed and rerun.
- **Final exact PR-head verification:** head 942b6e8834878538c4e478c9195420b9618acd3d; tests [41726477853](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477853) SUCCESS (162 Python tests + 64 subtests; 54 browser tests); optional Epitran/CRF [41726478205](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726478205) SUCCESS; optional Goruut [41726477909](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41726477909) SUCCESS. Downloaded Epitran artifact was inspected and contains JSON + SHA-256 sidecar; expiry 2027-02-01.
- **Research boundary:** provenance/integrity only; no orthographic or source-attested output is promoted to gold. Independent adjudicated Burmese IPA gold remains 0; empirical accuracy remains null.
- **PR:** [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106), branch head 942b6e8834878538c4e478c9195420b9618acd3d.

## Continuation update — external Burmese G2P report provenance and integrity (2026-11-03)

- **BURMESE-G2P-PROVENANCE-001 — DONE_VERIFIED (diagnostic reproducibility only):** scripts/benchmark_g2p.py now embeds the exact harness SHA-256, corpus path/hash, engine name/version, Python version/implementation, platform, and GitHub source revision when running in Actions. Existing Epitran mapping/preprocessor/postprocessor hashes remain preserved. When a JSON output path is supplied, the report writer creates parent directories and writes an adjacent .json.sha256 digest sidecar.
- **Test-first evidence:** regression test added first; expected RED on [41725146714](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725146714). An implementation run [41725276827](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725276827) caught a literal-backslash newline in the sidecar; corrected and rerun.
- **Exact implementation-head verification:** Python/Node/build/browser tests [41725456860](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725456860) SUCCESS (162 Python tests + 64 subtests; 54 browser tests); optional Epitran [41725456964](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725456964) SUCCESS; optional Goruut [41725457027](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41725457027) SUCCESS.
- **Research boundary:** this is provenance/integrity work only. It does not make orthographic or source-attested outputs gold. Independent adjudicated Burmese IPA gold remains 0; empirical accuracy remains null.
- **PR:** [#106](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/106), branch head 8a3fd150a247144320c880756f187a256a890e2f; pending review/merge at this checkpoint.

## Continuation update — Python/browser mixed-script segmentation parity (2026-11-03)

- **UNICODE-SEGMENTATION-002 — DONE_VERIFIED:** Python segmentation now follows the browser's text-boundary contract: contiguous non-Myanmar text is retained as one segment; Myanmar digits and punctuation U+1040..U+104B are treated as mixed-text separators, not Burmese phonetic units; Myanmar Extended-A/B/C letters remain recognized as Myanmar script even when unsupported by the Burmese phonetic inventory; C0/C1 controls remain isolated unsupported units.
- **Implementation:** [PR #103](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/103), squash merge `8ca42933dec5f830ca70e092f25acaefe1e35ecc`.
- **Test-first / CI evidence:** the first run exposed an incorrectly escaped test fixture (not a parser defect); the fixture was corrected to contain actual control code points. Exact final PR-head `1c61bd1ec91a5275e2dc88a845a8c1740fa8d657`: Python tests, Node tests, generated web build, and built-site browser tests all passed in [push workflow 41713878227](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41713878227) and [PR workflow 41713891844](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41713891844).
- **Scope boundary:** source segmentation/API parity only. No phonological rules, IPA labels, gold examples, or accuracy claims were added. The broad `is_myanmar` Unicode block recognizer remains unchanged so unsupported Myanmar extensions are not misclassified as ordinary foreign-script passthrough.

# Master execution plan and chat handoff

## Verified mainline checkpoint — Burmese Wiktionary provenance (2026-11-04)

- Current main before this documentation checkpoint: `040b0ea8f565ca9e443d361d1aaa658af978e9f2`. No open PRs; open human IPA pilot issue #85 remains.
- PR #111 split dataset-card CC BY 4.0 and Myanmar Wiktionary local policy CC BY-SA 3.0 Unported/GFDL into separate source records and documentary claims. PR #112 reconciled the triage/register/handoff; PR #113 recorded the verified post-merge state. PR #111 main tests [41798078257](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078257), optional Epitran [41798080052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798080052), Pages [41798078321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078321), PR #112 head tests [41799540057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799540057), post-merge tests [41799853697](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853697), Pages [41799853678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853678), and PR #113 post-merge tests [41800359629](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41800359629), Pages [41800359623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41800359623) all SUCCESS.
- Rights remain CONFLICT/UNKNOWN; the dataset has 113 IPA values (0.51%) and no per-entry dialect/convention, audio, detailed locators or adjudication. OpenSLR SLR80 is a separate CC BY-SA 4.0 audio/transcript resource with 20 female Yangon speakers; it supplies no IPA. Gold remains 0; accuracy remains null.


## Verified mainline checkpoint — Burmese Wiktionary provenance (2026-11-04)

- Current main: `f4764d124e73005dab57512c93fdd59938e60ec3` (PR #112). No open PRs at checkpoint.
- PR #111 merged as `8c323ff0d1236c5c6d36b2c2be0eac4d493163ab`, splitting dataset-card CC BY 4.0 from Myanmar Wiktionary local policy CC BY-SA 3.0 Unported/GFDL into separate source records and documentary claims. Main tests [41798078257](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078257), optional Epitran [41798080052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798080052), Pages [41798078321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078321) SUCCESS.
- PR #112 merged as `f4764d124e73005dab57512c93fdd59938e60ec3`, reconciling the triage, completion register and handoff. PR-head tests [41799540057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799540057) SUCCESS; post-merge main tests [41799853697](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853697) and Pages deployment [41799853678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41799853678) SUCCESS.
- Research boundary: source attribution is now accurate, but rights are still CONFLICT/UNKNOWN. The snapshot has 113 IPA values (0.51%) and no item-level dialect/convention, audio, detailed locators or adjudication. No dataset import, gold labels or accuracy claims.


## Burmese Wiktionary source-provenance checkpoint — 2026-11-04

- PR #111 merged as `8c323ff0d1236c5c6d36b2c2be0eac4d493163ab`. The dataset card's CC BY 4.0 declaration and the upstream Myanmar Wiktionary local policy's CC BY-SA 3.0 Unported/GFDL statement are now represented by separate source records and separate documentary claims.
- **BURMESE-WIKTIONARY-RIGHTS-001 — DONE_VERIFIED** for source attribution separation only. Main tests [41798078257](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078257), optional Epitran [41798080052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798080052), and Pages [41798078321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41798078321) all SUCCESS.
- **Rights remain BLOCKED / CONFLICT-UNKNOWN.** The two declarations come from different authorities and have not been legally reconciled. The 2026 snapshot has only 113 IPA values (0.51%) and lacks per-entry profile, audio, IPA convention, annotator/adjudication and detailed locator data. Do not import it into gold or treat MLCTS as IPA.
- Acceptance: obtain written rights clarification from the dataset publisher/rightsholder, then audit individual IPA entries for source locator, dialect/profile and convention; independent specialist review is still required. Gold remains 0; accuracy remains null.

 — Burmese → Ukrainian

## Continuation update — strict JSON constants (2026-11-03)

- **JSON-INPUT-003 — DONE_VERIFIED:** JSONL corpus records and the license registry now reject JavaScript-only constants `NaN`, `Infinity`, and `-Infinity` through the JSON decoder's `parse_constant` hook. Diagnostics retain file and line context.
- **Regression coverage:** invalid constants in a corpus JSONL row and in `licenses.json`.
- **Test-first RED:** [41692649780](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41692649780) — exactly the two new regression tests failed before the parser change.
- **Implementation-head CI:** [41694102074](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41694102074) SUCCESS — 159 Python tests + 64 subtests; 54 built-site browser tests.
- **Scope boundary:** this enforces RFC-compliant JSON syntax only; no corpus labels, license permissions, or gold records were changed.

## Continuation update — duplicate JSON keys in license registry (2026-11-03)

- **JSONL-INPUT-002 — DONE_VERIFIED:** the standalone `data/benchmark/licenses.json` registry is now parsed with the same duplicate-key rejection as JSONL corpus files. Duplicate top-level `licenses` and nested `redistributable` keys fail with path-qualified diagnostics; this prevents last-key-wins ambiguity in redistribution decisions.
- **Regression coverage:** duplicate top-level and nested license-registry JSON keys. Test-first RED: [41690120271](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41690120271); exact implementation-head CI: [41690280710](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41690280710) SUCCESS — 157 Python tests + 58 subtests; 54 built-site browser tests.
- **Scope boundary:** no license grant is inferred or changed, and no source records or IPA labels are added. Existing rights evidence requirements remain in force.

## Continuation update — duplicate JSON object-key rejection (2026-11-03)

- **JSONL-INPUT-001 — DONE_VERIFIED:** `scripts/ipa_gold_corpus.py` now rejects duplicate JSON object member names at every nesting level. The parser reports the source path and line number instead of allowing Python's default decoder to silently retain only the last value.
- **Regression coverage:** duplicate top-level `record_id` and nested `orthography.text` keys, using otherwise valid corpus records.
- **Test-first RED:** 41687392202.
- **Exact implementation-head verification:** 41687710686 SUCCESS — 155 Python tests + 58 subtests; 54 built-site browser tests.
- **Scope boundary:** this protects annotation/provenance/profile/split input integrity; no linguistic labels, source data, schemas, or gold rows were added or changed. Independent adjudicated gold remains 0; empirical accuracy remains null.

## Continuation update — strict benchmark TSV validation (2026-11-03)

- **Implementation commit:** `f5951bb1248a0bee66a795bd375f7e4e80ce7043` on `fix/heldout-ipa-benchmark-20261103` (PR #100; subsequent documentation commits follow it).
- **DONE_VERIFIED (input integrity):** `read_tsv()` now rejects duplicate column names, blank header names, and nonblank rows with missing or extra fields. Physically blank lines remain ignored; values are not silently padded, truncated, or rewritten.
- **Regression coverage:** duplicate gold and prediction headers, extra gold fields, and short prediction rows. Test-first RED: [41665726081](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41665726081); focused GREEN after implementation: [41665859814](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41665859814).
- **Scope boundary:** this is TSV/input-integrity hardening only. It does not add IPA labels, change linguistic rules, or establish empirical accuracy. Independent adjudicated gold remains 0 and accuracy remains null.

## Current repository state — 2026-11-03 (post-merge)

- **Mainline integration:** benchmark implementation PR #100 was squash-merged as `a5b844ec1d4f9be9264764ffa3652211fe78b6c5`; the handoff/register reconciliation PR #101 was squash-merged as `367819f9085eadc022079809a711b504527220ab`. No open PRs remained at this checkpoint.
- **Held-out benchmark contract:** gold export preserves `split`, `split_seed`, and `split_version`; adjudicated records without a frozen split fail closed; the scorer defaults to `test`; train/dev/all require explicit diagnostic selection; mixed manifest identities and empty prediction files are rejected.
- **Input integrity:** benchmark TSV headers/row widths, whitespace-only identifiers, duplicate JSON object keys, and non-standard JSON constants are rejected with regression coverage.
- **Post-merge exact-main verification:** Post-merge tests and GitHub Pages build/deployment plus deployed-site/runtime-asset smoke all passed on the exact `main` head. The workflow included Python validation/tests, npm tests/build, generated-web-data drift check, and built-site Chromium tests. [workflow](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518082); [Pages/deployed-site smoke](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41707518030).
- **Research boundary:** Independent expert-adjudicated Burmese IPA gold remains 0; `data/benchmark/gold.tsv` is header-only; empirical accuracy remains null. Engineering, browser and deployment checks do not establish pronunciation accuracy.

## Current task ledger and blockers

- **DONE_VERIFIED:** deterministic manifest-wide split identity; export/scorer held-out split integrity; strict TSV and JSON input validation; post-merge exact-main engineering verification.
- **PARTIAL:** The complete vowel/medial/coda engine, tone/register/phonation and checked-syllable realization, contextual allophony, and primary-source-backed MLCTS → Ukrainian adapter remain incomplete.
- **BLOCKED:** Approve a versioned broad/narrow IPA convention; recruit two qualified independent Burmese linguists for source-located written IPA adjudication and a separate reviewer; use rights-cleared written dictionaries, grammars and published phonological descriptions. No audio.
- **TODO:** Manual visual, keyboard, screen-reader, responsive and mobile QA on the deployed site remains TODO.

## Historical checkpoints (retained for audit; superseded by the current state above)



- **DONE_VERIFIED (engineering):** independent IPA corpus schemas, runtime validation, deterministic split/rights gates, source/evidence documentation, and exact-head automated engineering checks are present on the active branch. This is not linguistic validation.
- **PARTIAL:** source-language phonology, IPA conventions, and Ukrainian target adaptation remain bounded by the language-specific evidence matrices and unresolved cases.
- **BLOCKED:** the 30-lexeme blind pilot cannot start until the target variety/profile and IPA convention are approved, two qualified independent annotators and a separate adjudicator are confirmed, rights-cleared source packets are prepared, and the blind intake dry-run passes.
- **TODO:** manual deployed-site visual, keyboard, assistive-technology, and mobile QA.
- **Next actionable human milestone:** resolve the recruitment and convention checklist in [issue #85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85) and follow [the controlled acquisition protocol](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/blob/feat/ipa-gold-corpus-20261101-review/docs/ipa-gold-collection-playbook.md).

No local checkout was available for this checkpoint; do not interpret hosted CI as local test execution, expert adjudication, visual QA, or release approval. Preserve the fail-closed pipeline and do not create IPA/gold labels from model output or unsupported spelling inference.



## Methodology source refresh — 2026-11-02

The adopted engineering references were checked against current upstream revisions without importing them as runtime dependencies:

- Superpowers 7.0.1: `obra/superpowers@2ce8aa15d05bd57213e6f746f953aafb7ded7a8b` — explicit plans, true RED/GREEN TDD, systematic debugging, code review, and verification-before-completion. At GREEN, verify the project suite, not only the narrow test that first went red.
- mattpocock/skills current main: `d1478fcb140db0b93c0c8df17bcfd311844749d0` — composable skills, source-backed research, test-first implementation, and two-axis review (spec compliance separately from repository standards).
- Ponytail 5.3.3: `7801d061243d7b753bad0e0b3c057cd250b11755` — codebase/data-flow audit, connected-code review, minimal complete changes, and explicit preservation of security, data integrity, and accessibility.

These references guide the method; project-specific linguistic, provenance, privacy, rights, and fail-closed requirements remain authoritative.

**Methodology refresh commit:** `8bdcf3e07ed1359d443aad21b53d00b6db3812f2` on the active review branch. **Exact-head verification:** [PR tests 41356409847](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409847) and [push tests 41356404196](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356404196) SUCCESS; 131 tests + 48 subtests and 54 Playwright tests; [Goruut 41356409749](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409749) and [Epitran 41356409786](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41356409786) SUCCESS.

## Historical records

The dated entries below are retained as audit history. When a historical status or SHA conflicts with this current checkpoint, the active branch ref, completion register, and exact-head workflow run above are authoritative.

## Historical master handoff snapshot — 2026-10-25

**Last reviewed:** 2026-10-25  
**Repository:** https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-  
**Default branch:** `main`  
**Baseline SHA for this checkpoint:** `e7ade446b06cd11f2f97ae28905e1aee9f6d1f48`  
**Status:** research prototype; not release-ready; no independently adjudicated IPA gold entries verified.

## Operating contract

Preserve the pipeline:

Myanmar orthography → grapheme/syllable structure → source-language phonology → typed IPA/phonetic result → Ukrainian target adaptation → Ukrainian practical orthography.

A valid Unicode cluster is not proof of a Standard Burmese word, a structural parse is not a phonological analysis, and a candidate Ukrainian spelling is not evidence of correct pronunciation. Keep uncertainty and unsupported states explicit. Do not fill missing outputs with guesses.

## Task ledger

| ID | Priority | Status | Scope and evidence | Acceptance criteria / blocker |
|---|---|---|---|---|
| BUR-STRUCT-001 | P0 | PARTIAL | Python parser recognizes Myanmar blocks, kinzi, virama/subjoined consonants, medials, vowel signs and malformed states; `tests/test_parser.py` covers basic structures. | Build an independently annotated segmentation corpus and verify Python/browser parity across combining marks, mixed scripts and ambiguous boundaries. |
| BUR-INV-001 | P0 | PARTIAL | Main consonant, medial and vowel-sign inventories are represented. | Enumerate valid/invalid combinations and support each phonological generalization with a source-located example and counterexample. |
| BUR-VOW-001 | P0 | TODO | Dependent and inherent vowels are structurally represented; full combination derivation is not implemented. | Implement only source-backed context rules; test length, quality, medials, coda and lexical exceptions against a reviewed reference set. |
| BUR-CODA-001 | P0 | TODO | Some coda structure is parsed, but complete checked-syllable realization is not established. | Establish final inventory and checked-syllable behavior with source-located, variety-labelled examples and regression tests. |
| BUR-PROS-001 | P0 | BLOCKED | Traditional tone and newer register/tone analyses are documented as competing accounts; runtime does not implement a validated tone/register/phonation model. | Specialist adjudication and suitable source data are required before a deterministic full prosodic model can be accepted. |
| BUR-IPA-001 | P0 | PARTIAL | Conservative IPA seed exists; browser has a separate handwritten derivation. | Define one inspectable IPA contract, preserve broad vs surface IPA and provenance, and verify cross-runtime parity on an adjudicated corpus. |
| BUR-UA-001 | P1 | PARTIAL | Practical candidates are table-driven and use explicit not-established fallback; canonical Ukrainian inventory is external. | Validate feature-distance ranking and every target policy choice against the canonical inventory; do not infer official normativity. |
| BUR-GOLD-001 | P0 | BLOCKED | `data/burmese/phonology_corpus.csv` has six structural probes, not phonological gold; verified independent IPA gold count is 0. | Create a rights-cleared, independently adjudicated lexical corpus with source locator, dialect, transcription convention, IPA, uncertainty and review status before reporting accuracy. |
| BUR-LIC-001 | P1 | BLOCKED | No root project license is declared; `CITATION.cff` uses `NOASSERTION`. The myG2P dictionary is CC BY-NC-SA 4.0. | Owner must select the code/data licensing policy. Do not bundle myG2P data or infer reuse permission from public visibility. |
| BUR-BOUNDARY-001 | P1 | DONE_VERIFIED | PR [#33](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/33) merged as `e374266af5e8fe67e779d01be6d29a56a33d1578`. The U+AA60 Khamti letter is recognized as Myanmar-block text but remains outside the Standard Burmese onset inventory. | Exact-head CI [40215282144](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40215282144) passed pytest, npm build, generated-data drift check, npm tests and Playwright browser tests. This is a script/language boundary test, not phonological gold and not an accuracy improvement. |

## Existing work to preserve

- Unicode normalization entry point and conservative grapheme/syllable parser.
- Explicit kinzi, conjunct/subjoined consonant and four-medial representation.
- Evidence and competing-analysis datasets.
- Conservative IPA seed and separate practical target adapter.
- Russian practical transcription as documentary comparator, not as Ukrainian truth.
- Explicit `inventory_unavailable` and `not_established` fallbacks; no hidden Ukrainian fallback table.
- External Epitran benchmark harness as an optional comparator, not a runtime dependency.
- Existing license audit: do not copy myG2P dictionary entries into tests, corpus or generated artifacts without a rights/compatibility review.

## Verification state

- Main CI runs [40211924300](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40211924300) and [40211924324](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40211924324) were reported successful in the prior checkpoint. They validate the then-current code and test suite, not linguistic completeness.
- PR #33 initially failed in run [40215189582](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40215189582) because the test expected `None` while the documented model serializes an absent onset as an empty object. The assertion was corrected to the model contract, then exact-head run [40215282144](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40215282144) passed all Python, build, generated-data, Node and browser checks. PR #33 merged as `e374266af5e8fe67e779d01be6d29a56a33d1578`.
- No local test run is claimed for this checkpoint.
- Independent gold-corpus size: **0 verified entries**. Word-level IPA accuracy and Ukrainian name-level accuracy are **not measured**.

## Next actions, in dependency order

1. Finish exact-head CI for PR #33; fix and rerun if it fails, then merge only after checks pass.
2. Add a machine-checkable source/claim-to-rule link audit, ensuring every implemented phonological rule has a scope, source locator, uncertainty label and test reference.
3. Define a cross-runtime structural contract for normalization, token boundaries, unknown code points and unsupported combinations; test Python and browser against the same fixtures.
4. Build a small, rights-cleared adjudicated lexical corpus before extending deterministic IPA rules. Keep structural probes separate from gold.
5. Implement vowels and codas in evidence-backed slices, one accepted environment at a time; add negative cases for plausible but unsupported spellings.
6. Address tone/register/phonation only after source and specialist adjudication; preserve competing analyses rather than averaging them.
7. Revisit release readiness only after the IPA contract, independent corpus, target-inventory integration, license decision, reproducible tests and release metadata all meet their acceptance criteria.

## Readiness rule

Do not mark the repository 80% ready based on file count, test count, UI completeness or successful CI alone. A readiness estimate must be tied to explicit layer-level acceptance criteria. Until independent lexical IPA gold and comprehensive source-phonology coverage exist, this remains a **partial research prototype**, not a release-ready transcription engine.


## Burmese misplaced-virama fail-closed guard — 2026-10-25

- Adversarial parser review found that U+1039 (virama) is correctly consumed in the onset/conjunct loop but was also accepted by the generic trailing-special-sign loop. A misplaced virama after a vowel could therefore leave the syllable marked structurally established and let the conservative IPA adapter emit a plausible-looking prefix.
- The trailing-special parser now treats virama outside the conjunct position as invalid and returns before IPA generation. Added a regression for `ကာ္` that requires invalid status and withheld IPA.
- This is malformed-input integrity, not a new phonological rule or accuracy claim. Exact-head CI must pass Python tests, schema checks, generated-data drift, and browser/build checks where configured. Independent adjudicated Burmese IPA gold remains 0.


## Post-merge current-head checkpoint — 2026-10-25

- Misplaced-virama fail-closed fix merged as `8b96926897f54841daf442ff67ee0f73593004f2` via [PR #35](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/35).
- Exact PR-head tests [40216523493](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40216523493) passed. Post-merge `main` tests [40216622672](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40216622672) and Pages deployment [40216622638](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40216622638) passed.
- U+1039 outside the conjunct sequence is now invalid rather than silently consumed as a trailing sign. This is malformed-input integrity, not phonological coverage. Independent adjudicated gold remains 0; vowel combinations, coda/checked syllables, tone/register/phonation and target-policy adjudication remain open.


## Evidence-registry schema checkpoint — 2026-10-25

- Main commit after PR [#39](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/39): `8a2482535c463a9371f7c0c6ac32c15880b7485c`.
- Every row in `sources.csv`, `source_claims.csv`, and `phonological_rules.csv` now validates against explicit JSON Schemas; IDs are unique and each rule's source and claim are checked for referential consistency. Exact-head test workflow [40222099466](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222099466) passed.
- Remaining data-integrity work: schema and validation of `phonology_corpus.csv`, including enforcement that `STRUCTURAL_ONLY` entries cannot contain asserted IPA or Ukrainian gold fields. This must not be confused with source-language phonological validation.
- Linguistic blockers remain unchanged: 0 independent lexical IPA gold entries, incomplete source-adjudicated vowels/codas, no complete tone/register/phonation runtime model, and no Ukrainian name-level gold.


## Corpus evidence-schema checkpoint — 2026-10-25

- Main commit after PR [#41](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/41): `3c8f03957fb3d8b8201bafac0dcdc819f50b8fe1`.
- Added `schemas/phonology_corpus.schema.json`; every corpus row now validates against a schema. The contract prevents structural probes from carrying expected IPA/Ukrainian outputs and requires adjudication metadata before any row can be labeled `GOLD_VERIFIED`.
- Exact-head full workflow [40222516985](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222516985) passed tests, build, generated-data checks and browser tests.
- Linguistic evidence is unchanged: six structural probes, zero independently adjudicated lexical IPA gold entries, no word-level accuracy estimate. Next genuine blocker is specialist/source-located adjudication, not additional schema machinery.


## Unicode corpus locator checkpoint — 2026-10-25

- Main commit after PR [#43](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/43): `0c793b76f45261c9d9044e0eac01245a8afef54f`.
- The three Unicode-sourced structural rows now point to §16.3.1 / Table 16-4 in Unicode 18.0.0. Their status remains structural-only; no IPA/Ukrainian expected values were added.
- Exact-head test/build/generated-data/browser verification passed in [40223402689](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223402689). Optional Epitran comparison [40223406632](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223406632) is not gold evidence.
- Remaining source-data work: inspect Green 2002 at exact source pages, then obtain independent IPA adjudication. No accuracy estimate is currently justified.


## Romanization standard and crosswalk checkpoint — 2026-10-31

- Added [romanization-to-ukrainian-matrix.md](romanization-to-ukrainian-matrix.md) with the standard decision, licensing notes, initial onset/rhyme crosswalk and explicit task ledger.
- Selected MLCTS as the separate orthographic romanization profile. Mya2Rom documentation identifies MLCTS as an orthographical transcription system created by the Myanmar Language Commission and distinguishes it from modified MLCTS / MLCTS2, described as more phonetic. This matches the product contract: written-form romanization is separate from IPA-first phonetic adaptation.
- The browser now calls mya2rom(part, "mlcts") and the result card is labelled MLCTS. The regression uses the Mya2Rom documented sample မြို့: MLCTS must return mrui., while MLCTS2 returns mjou.
- Test-first RED: workflow [41228903857](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41228903857) failed only the new profile assertion as intended (expected mrui., received mjou.; 46 browser tests passed, 1 failed).
- Exact-head GREEN: workflow [41229019002](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41229019002) passed: pytest 61 passed / 29 subtests passed; npm build; generated web data drift check; Node tests; Playwright 47 passed. This verifies the profile selection and UI label, not complete MLCTS coverage or a Ukrainian romanization adapter.
- PR #54 contains the standard decision, crosswalk, test-first regression and MLCTS runtime switch.
- The existing Mya2Rom vendor files and CC-BY-SA-4.0 notice are preserved. The upstream README identifies Wikipedia/Wiktionary-derived table material; row-level source scope and attribution must remain explicit.
- Task statuses: MYA-ROM-STD-001 DONE_VERIFIED (source review); MYA-ROM-PROFILE-001 TODO; MYA-ROM-UA-001 TODO; MYA-ROM-MATRIX-001 PARTIAL; MYA-ROM-LIC-001 PARTIAL; Burmese contextual IPA and independent lexical gold remain PARTIAL.
- Branch: work/romanization-matrix-completion-20261031. No runtime code changed in this checkpoint; no new test result is claimed.


## MLCTS onset crosswalk data checkpoint — 2026-10-31

- Added data/burmese/romanization_ukrainian.csv with all 35 source consonant/onset graphemes present in the vendored Mya2Rom MLCTS column. Every row records source form, MLCTS form, Ukrainian candidate, evidence status, source URL and a source locator.
- Added tests/test_romanization_matrix.py. It checks exact onset inventory and MLCTS values against the reviewed table, unique source-unit keys, HTTPS provenance, locators, allowed statuses and non-empty values for PROPOSED rows.
- Test-first RED: workflow [41229203729](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41229203729) failed because the canonical CSV did not yet exist (61 prior Python tests passed; 2 new tests failed for the intended missing-file reason).
- Exact-head GREEN: workflow [41229245383](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41229245383) passed: pytest 63 passed / 29 subtests passed; npm build; generated web data drift check; Node tests; Playwright 47 passed.
- The CSV intentionally leaves several Ukrainian onset candidates EVIDENCE_LIMITED; this is not a missing-data bug. It prevents guessed values for MLCTS units such as g/gh, c/hc, j/jh and dh until source phonology and Ukrainian target adaptation are adjudicated.
- MYA-ROM-MATRIX-ONSET-001 is DONE_VERIFIED as an engineering/source-table inventory. MYA-ROM-MATRIX-001 remains PARTIAL because medial, vowel, coda, independent-vowel, kinzi, asat, numeral and punctuation rows and the syllable adapter remain outstanding.


## Two-method result UI checkpoint — 2026-10-31

- Added an accessible two-button method switch: **Фонетичний** and **За романізацією**. The default remains phonetic.
- The phonetic panel contains IPA, Ukrainian phonetic output, structural analysis and phonetic issue notices.
- The romanization panel contains MLCTS output and a clearly labelled PARTIAL Ukrainian crosswalk state linked to the canonical matrix. It does not reuse IPA or phonetic Ukrainian output as a fallback.
- Test-first RED: workflow [41230002926](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230002926) failed because the method controls and panel IDs did not exist.
- The first implementation run [41230226358](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230226358) passed Python, build, generated-data and Node tests plus 47 browser tests, but an existing browser assertion still expected the old card order. The assertion was updated to include the new romanization→Ukrainian status card.
- Exact-head GREEN [41230424775](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230424775): pytest 63 passed / 29 subtests passed; npm build; generated-data drift check; Node tests; Playwright 48 passed.
- The MLCTS → Ukrainian syllable adapter remains incomplete; the tab shows PARTIAL rather than falling back to IPA. The MLCTS romanization output itself is kept separate from phonetic analysis.


## Production Pages artifact correction — 2026-10-31

- Audited open PR #48 (Fix MLCTS2 romanizer asset in GitHub Pages build). It was 4 commits behind main, had merge conflicts, and its proposed changes were not merged blindly. Ported only the necessary production-artifact behavior to this fresh branch.
- Added scripts/copy-vendor-assets.mjs to copy both Mya2Rom browser files into Vite's public output; Vite now builds both index.html and system.html; Playwright now tests the built preview rather than the dev server.
- Added a production-artifact test requiring dist/index.html, dist/system.html, dist/vendor/mya2rom/romanisations.js and dist/vendor/mya2rom/mya2rom.js, plus a browser assertion that window.mya2rom is loaded from the built artifact.
- Updated test:browser to build before preview; CI uses test:browser:built after its single explicit build, so build/test/deploy use the same artifact without duplicate builds.
- Test-first RED: workflow [41230779647](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230779647) failed as intended because dist/system.html was absent from the previous production build.
- Exact-head GREEN: workflow [41230976020](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230976020) passed: pytest 63 passed / 29 subtests passed; production build; generated-data drift check; Node 3/3 passed including the new artifact test; Playwright 48 passed against Vite preview.
- This proves the production build contains the service page, methodology page and both Mya2Rom assets. A post-merge GitHub Pages deployment is still required before claiming the live site has the corrected artifact.


## Final main / Pages checkpoint — 2026-10-31

- Final main commit: fff943db823ae5ca0f4fed50b572cc75cb743f84.
- PR #54: MLCTS profile and onset matrix; PR #55: two separate method tabs; PR #56: production asset copy, multi-page build and preview-based browser tests.
- PR #48 was closed as superseded by #56; its old branch was left intact. PR #53 styling work remains open and untouched.
- Main verification [41231199684](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41231199684) passed: pytest 63 + 29 subtests; Node 3/3; Playwright 48 against the built artifact.
- Pages deployment [41231199596](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41231199596) succeeded: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ .
- Final statuses: MYA-ROM-PROFILE-001 DONE_VERIFIED; MYA-ROM-MATRIX-ONSET-001 DONE_VERIFIED; MYA-ROM-MATRIX-001 PARTIAL; MYA-ROM-UA-001 TODO; MYA-PAGES-ARTIFACT-001 DONE_VERIFIED; MYA-PHONETIC-COVERAGE PARTIAL/BLOCKED pending independent lexical gold and expert adjudication.
- The romanization tab's Ukrainian result is intentionally PARTIAL. Do not claim full romanization coverage until a complete source → MLCTS → Ukrainian syllable matrix and adapter pass exact coverage tests.


## MLCTS rime inventory continuation — 2026-10-31

- User confirmed the two-method contract: orthographic MLCTS → Ukrainian table adapter must be independent from phonetic IPA → Ukrainian adaptation. The romanization route is intended to cover supported written units; the phonetic route may withhold unsupported pronunciation.
- Added `data/burmese/romanization_rimes_inventory.csv` with **94 rime keys** and their exact MLCTS column values extracted from the vendored Mya2Rom 0.4.4 `vowels` object. Every row records the upstream repository, file/object locator and an explicit warning that Mya2Rom's extended tables are not direct proof of an original MLC publication. Ukrainian candidates are marked `PROPOSED` and every row remains `EVIDENCE_LIMITED` pending source-level and target-language adjudication.
- Added `tests/test_romanization_rime_inventory.py` to verify the inventory count, unique source keys, non-empty MLCTS values, provenance, explicit evidence status and the absence of unsupported Ukrainian candidates.
- Existing 35-row onset crosswalk, MLCTS profile, method tabs and production Pages asset-copy fix are preserved. This new inventory does not complete the MLCTS → Ukrainian syllable adapter or the medial/coda/contextual orthographic coverage audit.
- Status: MYA-ROM-RIME-INVENTORY-001 = implementation added, CI verification pending; MYA-ROM-MATRIX-001 remains PARTIAL; MYA-ROM-UA-001 remains TODO; full IPA/phonological coverage remains PARTIAL/BLOCKED pending independent lexical gold and specialist adjudication.
- Branch: `work/romanization-evidence-completion-20261031`. Changes are isolated from `main`; do not mark the new tests DONE_VERIFIED until the exact PR-head workflow passes.

- Added `tests/web/romanization-rime-inventory.test.mjs` to compare all 94 CSV source keys and MLCTS strings directly against the vendored Mya2Rom `vowels` object, so the inventory cannot silently drift from its attributed upstream implementation.


## MLCTS rime parity test correction — 2026-10-31

- The first PR workflow [41232402326](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41232402326) passed Python (64 tests + 29 subtests), build and generated-data drift checks, then failed the new Node parity test at parse time because an escaped quote was expressed as an invalid Unicode-mode regular-expression escape.
- Removed the unnecessary quote-unescape regex; the vendored MLCTS strings in the source table do not require it. The parity test still checks every source key and MLCTS value against the vendor table. Exact-head rerun is pending.
- The official BGN/PCGN 1970 guide and UNGEGN Burmese report were inspected. They establish BGN/PCGN 1970 as a geographical-name system and state that the system is not reversible; Mya2Rom documentation distinguishes MLC-created orthographic MLCTS from the more phonetic modified variant. The matrix now records why standard MLCTS is selected for the orthographic mode, while the original MLC publication remains a source-retrieval blocker.


## Verified MLCTS rime inventory and standard rationale — 2026-10-31

- Exact PR-head workflow [41232548770](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41232548770) checked out merge commit for head `a514943e96d8e2b5bc5fc8815898cb96aae39721` and passed: pytest **64 passed / 29 subtests passed**; Vite build; generated web-data drift check; Node **4/4** tests (including the 94-row vendor parity test); Playwright **48 passed** against the built artifact.
- The preceding workflow [41232402326](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41232402326) passed Python/build/drift checks but failed the new Node test due an invalid Unicode-mode regex escape. The unnecessary quote-unescape regex was removed; the exact-head run above is green.
- `MYA-ROM-RIME-INVENTORY-001` is `DONE_VERIFIED` as a vendor-derived inventory and parity-tested dataset. `MYA-ROM-MATRIX-001` remains `PARTIAL`; `MYA-ROM-UA-001` remains `TODO`; `MYA-ROM-LIC-001` remains `PARTIAL` pending original MLC source and full attribution scope review.
- The matrix now explains why MLCTS (the orthographic MLC transcription profile) is selected over BGN/PCGN 1970 for general written-text mode. BGN/PCGN 1970 remains a useful geographical-name comparator, but UNGEGN says it is not reversible and PCGN notes that some choices depend on pronunciation. The original MLC publication has not yet been obtained; Mya2Rom's vendor data remains a secondary implementation source.
- No runtime files changed in this PR; no new Pages deployment is required. Existing site: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.
- Verification PR: [#59](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/59), branch `verify/romanization-evidence-20261031`. PR #58 contains the earlier test attempt and is superseded by #59.


## Post-merge main checkpoint — 2026-10-31

- PR #59 merged by squash as `d468c6ec16289009da553ed4696932e7c7f7d79f`; this is the main-branch implementation merge SHA for the romanization evidence inventory.
- Exact code-verification workflow [41232548770](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41232548770) passed: 64 Python tests + 29 subtests; Vite build; generated-data drift check; Node 4/4; Playwright 48 against the built artifact passed. The exact code-verification run checked out head `a514943e96d8e2b5bc5fc8815898cb96aae39721`; subsequent changes before merge were documentation-only.
- The bounded source inventory and its tests are now on `main`. The overall orthographic matrix and runtime adapter remain incomplete; see the PARTIAL/TODO statuses above.
- No runtime behavior or Pages build inputs changed in this PR; the already deployed GitHub Pages site remains the existing public service. A new Pages deployment was not necessary for these data/documentation-only changes.


## Final main SHA and merged MLCTS inventory — 2026-10-31

- The 94-row MLCTS rime inventory, Python provenance tests, Node vendor-parity test and standard-selection rationale were merged by PR #59 as `d468c6ec16289009da553ed4696932e7c7f7d79f`; the post-merge handoff checkpoint PR #60 merged as `085c2a7bdf7aae3292122a17552bfc92af6d726c`. This is the main head before this final handoff-only update.
- Exact-head workflow [41232548770](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41232548770) passed: pytest 64 + 29 subtests; Vite build; generated-data drift; Node 4/4; Playwright 48.
- Remaining acceptance: obtain and verify original MLC source; complete medial/vowel/coda/marker inventory; adjudicate Ukrainian rime candidates; implement independent MLCTS syllable → Ukrainian adapter; expand IPA lexical gold. No runtime changes or new Pages deployment were made.


## Open styling PR reconciliation — 2026-10-31

- Rechecked open PR #53 (`design/burmese-layout-20261030`) against current `main` `edbd9d52c280968592e2b84c19e4d8a8fc2bf614`: branch is diverged, 5 commits ahead and 7 behind; merge base is `272da3970c0e8791c5bc5406cc4289e2c841eeef`. Its changes are limited to `index.html`, `system.html`, `src/web/styles.css`; the layout-contract test is present in its diff.
- PR #53 remains open and untouched. Do not merge blindly: first rebase/port the CSS and test changes onto a fresh branch from current `main`, then run current browser tests and review the built Pages artifact. No styling work was cherry-picked in this checkpoint.
- The MLCTS rime inventory and its 64 Python tests + 29 subtests, Node 4/4, Playwright 48 and Vite build verification remain preserved on `main`; the MLCTS → Ukrainian adapter and primary MLC source remain open research/implementation blockers.

 
## Responsive layout merge and verification — 2026-10-31

- PR [#62](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/62) was merged by squash as `78f56512f59bbfa6fc881ccd35e34c4bf1fff7b1`.
- The PR adds 36 focused responsive CSS override lines in `src/web/styles.css`, preserving current IPA typography and method-switch styles instead of replacing the stylesheet from diverged PR #53.
- Exact PR-head tests workflow [41234651088](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41234651088) completed successfully. The job passed `pytest`, Vite build, generated-data drift check, `npm test`, Playwright Chromium installation, and `npm run test:browser:built`.
- PR #53 remains open and untouched: its branch is diverged; the focused responsive behavior was ported without merging the older stylesheet/test snapshot wholesale.
- This UI-only merge does not complete original MLC source retrieval, full MLCTS rime/medial inventory, Ukrainian syllable adapter, or independent phonetic gold. Research prototype status remains unchanged.
- A new Pages deployment after this merge has not yet been verified; inspect the deployment workflow before claiming the live site contains this CSS.


## MLC primary-source retrieval follow-up — 2026-10-31

- A further source search located the Library of Congress 2011 *Burmese Romanization Table* PDF. It is an ALA-LC table, not the original MLC/MLCTS publication; it was explicitly excluded as evidence for MLCTS values. It does document separate conventions for medials, conjuncts, finals, tone marks, punctuation, numerals and word division, but those rules must not be silently imported into the MLCTS profile.
- The SIL catalogue link surfaced by secondary bibliographic metadata returned HTTP 403 in this environment. No original Myanmar Language Commission publication or primary MLCTS table was obtained in this pass.
- Therefore the MLC-source task remains BLOCKED/EVIDENCE_LIMITED. The 94-row inventory remains a vendor-derived Mya2Rom parity inventory, not a primary-source-verified MLC transcription table. No new Ukrainian candidate or pronunciation was inferred.


## Browser output integrity regression — 2026-10-31

- PR [#64](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/64) merged as `d0b7f6351a4151b974ec9ee379f81f7a06da9613`.
- Reproduced a real browser data-loss bug: `ကာ ꩠ` yielded only `ка `; the unsupported Myanmar unit disappeared from the Ukrainian output. The fix now renders unresolved/unsupported units as `⟦source⟧` and withholds incomplete syllable-level mappings.
- Corrected contextual initial `/j/` + vowel status aggregation so the established project behavior `/juː/ → ю` remains visible without requiring a separate standalone `/j/` mapping.
- Added Playwright coverage for the exact full Burmese greeting sentence. The test reconstructs the normalized input from rendered segment rows and verifies that no source unit, whitespace or punctuation is lost; it explicitly checks the unresolved marker and does not assert unsupported linguistic gold.
- Exact-head CI [41238825573](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238825573) passed pytest 64 + 29 subtests, Node 4/4, production Vite build, generated-data drift, and Playwright 50/50.
- New tasks: `MYA-OUTPUT-PRESERVATION-001` DONE_VERIFIED; `MYA-SENTENCE-INTEGRITY-001` DONE_VERIFIED. Full sentence-level phonetic accuracy remains BLOCKED/EVIDENCE_LIMITED; `MYA-ROM-UA-001` remains TODO; primary MLC source retrieval remains BLOCKED.
- Pages deployment [41238926334](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238926334) completed successfully and published `d0b7f6351a4151b974ec9ee379f81f7a06da9613` at https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/. Main workflow [41238926148](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238926148) also passed.

## Full-sentence MLCTS and Myanmar punctuation/numeral preservation — 2026-10-31

- Main head: `b6ce024a26bef44c76744aa231b52de551c12c16` (PR #69).
- PR #68 added a full Burmese greeting sentence to the browser MLCTS route. Its exact-head workflow [41240518900](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41240518900) passed the Python, Vite build, generated-data, Node, and built-artifact Playwright gates.
- PR #69 fixed a confirmed source-loss bug. The app previously treated Basic Myanmar digits U+1040–1049 and punctuation U+104A–104B as romanizable script, then passed those code points to Mya2Rom; sentence stops and numerals could disappear. The shared segment predicate now preserves those as non-romanized text, and `romanizeTextPreservingNonMyanmar` passes only contiguous Myanmar text runs to Mya2Rom while preserving Latin text, numerals, whitespace, and punctuation around them.
- The new browser regressions cover the supplied four-sentence greeting, the four U+104B sentence stops, and a mixed-script sample containing Latin `ABC`, Myanmar digits `၁၂၃`, comma U+104A, and full stop U+104B in both output modes.
- Exact-head workflow [41241791556](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41241791556) passed: Python tests, Vite production build, generated-data drift check, Node tests, Playwright Chromium setup, and **52/52 built-artifact browser tests**. The earlier test assumption that MLCTS periods must equal sentence punctuation was rejected: some vendor MLCTS forms themselves contain periods; the correct assertions distinguish those from the preserved Myanmar punctuation.
- This is a bounded Basic Myanmar punctuation/numeral and mixed-text fix, not a full Myanmar Unicode inventory guarantee. Mya2Rom's 94-row table remains vendor-derived; the original MLC primary publication remains BLOCKED/EVIDENCE_LIMITED; MLCTS → Ukrainian syllable adaptation remains TODO; independent lexical IPA gold remains 0.
- PR #53 remains open and untouched because its branch is diverged and replaces the stylesheet wholesale. At the time of this checkpoint, no post-PR #69 deployment run was yet accessible. A later check verified the Pages deployment at [41242001050](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41242001050), including deployed HTML, script, CSS and vendor-asset smoke checks; see the cross-mode integrity checkpoint below.


## Cross-mode Myanmar source-integrity completion — 2026-10-31

- PR #72 merged by squash as `257db544ccb09bb9b51e5cfdf882b12f5b08b7a2`. It closes a second, narrower source-loss case left by the earlier PR #64 fix: an unsupported Myanmar code point adjacent to a valid syllable could be absorbed into the same phonetic segment, leaving only the valid prefix in Ukrainian output. The segmenter now isolates unsupported code points; `ကာꩠ` renders as `ка⟦ꩠ⟧`.
- The MLCTS browser route now derives a conservative supported-character/base inventory from canonical consonant, independent-vowel, vowel-sign, medial, asat and virama registries plus the vendor's explicit tone/special symbols. Basic Myanmar digits U+1040–1049 and punctuation U+104A–104B remain passthrough material, not syllabic text. Unsupported Myanmar code points and orphan signs are rendered as visible `⟦source⟧` markers rather than silently dropped or guessed.
- Exact PR-head workflows [41243831142](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41243831142) and [41243825927](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41243825927) passed. The job ran pytest (**64 passed + 29 subtests**), generated-data reproducibility, Node tests, Vite production build, Chromium setup and Playwright against the built artifact (**53 passed**).
- PR #69's post-merge main Quality workflow [41242001075](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41242001075) and Pages deployment [41242001050](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41242001050) both succeeded; the deployment includes the HTML, script, CSS and vendor-asset smoke checks. This corrects the earlier checkpoint's statement that no post-PR #69 deployment was accessible.
- PR #72 post-merge main verification [41244193538](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41244193538) passed: pytest 64 + 29 subtests, Node tests, production Vite build, generated-data reproducibility and Playwright 53/53. Pages deployment [41244193576](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41244193576) completed successfully; the deploy job's `Smoke-test deployed site and runtime assets` step passed. Main commit `257db544ccb09bb9b51e5cfdf882b12f5b08b7a2` is published at https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.
- Ledger: `MYA-OUTPUT-PRESERVATION-001` remains DONE_VERIFIED and now covers adjacent unsupported units in both phonetic and MLCTS modes; `MYA-ROM-OUTPUT-INTEGRITY-001` DONE_VERIFIED for the bounded supported inventory, digits/punctuation, mixed text and visible unsupported markers. Full Unicode/MLCTS coverage is not claimed. `MYA-ROM-UA-001` remains TODO; the 94-row vendor-derived rime inventory remains PARTIAL/EVIDENCE_LIMITED; original MLC primary source remains BLOCKED; independent lexical IPA gold remains 0.
- Open layout PR #53 remains untouched because its branch is diverged and its wholesale stylesheet replacement risks current IPA typography and method-switch styles. No CSS change was needed for these engine fixes.


## Python parser source-preservation parity checkpoint — 2026-10-31

- PR [#74](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/74) merged by squash as `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`.
- Added Python parser regressions in `tests/test_parser.py`: (1) an unsupported Myanmar Extended-A code point adjacent to a valid syllable remains in the exact raw source cluster and yields `partially_unparsed`; (2) a mixed sentence containing Burmese text, Latin text, ASCII digits, Burmese digits and Myanmar punctuation reconstructs exactly from the parser's source units. Both tests assert normalized source equality and exact concatenation of graphemes/source spans.
- Exact PR-head workflow [41244535813](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41244535813) passed all configured steps: pytest, Vite build, generated-web-data drift check, Node tests, Playwright Chromium setup and built-artifact browser tests. This verifies the test-only change on the exact PR head; no linguistic mapping or IPA gold was added.
- Post-merge main runs [41245969998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969998) (tests) and [41245969938](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969938) (Pages) were queued when this checkpoint was prepared. Do not mark post-merge main CI or deployment complete until those exact runs finish successfully.
- Ledger: `MYA-PY-SOURCE-PRESERVATION-001` DONE_VERIFIED for exact source reconstruction and malformed-adjacent-codepoint withholding on the Python parser. Cross-runtime token boundaries are intentionally not claimed identical: Python retains the whole affected raw cluster as partial, while the browser can split a supported prefix and visible unsupported marker. Phonetic accuracy remains BLOCKED/EVIDENCE_LIMITED; independent lexical IPA gold remains 0.


## Post-merge verification correction — 2026-10-31

- The previously queued post-merge runs for PR #74 have now completed successfully on exact main SHA `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`: tests [41245969998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969998) and Pages [41245969938](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969938). The test job passed pytest, Vite build, generated-data drift, Node tests and built-artifact Playwright; Pages build/deploy and deployed-site/runtime smoke test passed.
- Documentation PR #75 merged by squash as `48bb45cf2a5c6cc95057fecacdfbc6e852b760b1`. Its exact-head tests workflow [41246079334](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246079334) passed all configured steps.
- The new exact-main workflows for PR #75's merge commit `48bb45cf2a5c6cc95057fecacdfbc6e852b760b1` are [41246294703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294703) (tests) and [41246294821](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294821) (Pages). They were still in progress when this note was authored; inspect their final conclusions before claiming final-main verification or deployment for this documentation head.
- No linguistic implementation changed in PR #74 or #75. MYA-PY-SOURCE-PRESERVATION-001 remains DONE_VERIFIED for bounded source reconstruction; independent lexical IPA gold remains 0 and MLCTS → Ukrainian remains TODO.


## Final main verification for documentation PR #75 — 2026-10-31

- The exact-main test run [41246294703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294703) and Pages deployment [41246294821](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294821) have now both completed successfully on main SHA `48bb45cf2a5c6cc95057fecacdfbc6e852b760b1`. Pages build, deploy and deployed-site/runtime smoke test passed.
- Therefore the post-PR #75 main checkpoint is DONE_VERIFIED. The only remaining CI status for this documentation sequence is the exact PR-head workflow for this follow-up documentation PR; its result must be inspected before merge.


## Whole-message adversarial regression — 2026-11-01

- Added PR [#77](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/77), merged as `7a85219f67082ca3d225a31d79429068719349c6`.
- New test `test_python_parser_preserves_multiline_mixed_script_adversarial_input` exercises a single message containing supported Burmese syllables on both sides of an unsupported Myanmar-script character, tab, Latin identifier, ASCII digits, CRLF, Myanmar digits and punctuation, U+200B, emoji and Arabic-script text.
- The contract checks exact reconstruction through both grapheme and syllable source records; the unsupported Khamti/Extended-C code point remains explicitly unsupported and valid neighboring Burmese syllables remain structurally established.
- Exact PR-head CI [41289738055](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41289738055) passed: pytest, production build, generated-web-data drift check, Node tests, Playwright install and built-browser tests.
- This is a source-integrity/structural probe, not an IPA gold row. Independent lexical IPA gold remains 0; phonological accuracy remains NOT MEASURED.


## Python/browser whole-message parity — 2026-11-01

- PR [#78](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/78) merged as `a137274d90579bde6aedefee4068942f93e9c00f`.
- Added a built-browser Playwright regression for the same difficult mixed message as the Python source-integrity test: Burmese syllables around unsupported Myanmar Extended-C, Latin identifier, tab, CRLF, Myanmar digits and punctuation, U+200B, emoji and Arabic script.
- The browser test checks that the textarea preserves its content under the platform's standard CRLF→LF value canonicalization, that rendered syllable source records reconstruct that browser-normalized input, and that unsupported Myanmar material remains visible with aggregate UNSUPPORTED status while foreign text and digits remain visible.
- Exact PR-head workflow [41290257958](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41290257958) passed pytest, production build, generated-web-data drift, Node tests, Playwright installation and all built-browser tests.
- Together with PR #77, this establishes Python and browser whole-message source-integrity coverage. It still does not establish independent IPA gold or phonological accuracy.


## Goruut comparator research — 2026-11-01

- Task `MYA-G2P-GORUUT-001`: `PARTIAL` (upstream availability/source triage only; runtime execution and quality validation pending).
- Inspected and pinned upstream Goruut commit `b224bde02151f8f86d0fe260804e4ca743bda620`; upstream README advertises Burmese, IPA output, word tokens and tonal phones, but no syllable tokens or tie bars and no number/date normalization. MIT applies to source code only; embedded model/dictionary asset licenses remain unaudited.
- Added the candidate record to `docs/benchmarking-and-external-ipa.md` and reconciled adjacent candidates: Epitran 1.35.3 remains the runnable baseline with its documented limited-support caveat; myG2P remains CC BY-NC-SA 4.0 and unsuitable for commercial redistribution absent permission; the Burmese FST publication is a research lead, not proof of a licensed installable package. PR [#79](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/79).
- No Goruut runtime invocation or output artifact was produced. Independent gold remains 0; no accuracy or winner claim. Next acceptance: run pinned Goruut in isolated optional CI, audit model/dictionary provenance, review tone/register/phonation/medials/codas and dialect against independent expert-adjudicated IPA.


## Goruut asset licensing reconciliation — 2026-11-01

- Task `BURMESE-G2P-GORUUT-001` remains `BLOCKED` for runtime execution, not merely PARTIAL: the source-code MIT license does not establish rights for the language-specific lexicon/model assets.
- The pinned Goruut source tree contains embedded files under `dicts/burmese/`; Goruut's own data-preparation documentation states these model assets derive from a `lexicon.tsv`. The corresponding separate `neurlang/dataset/burmese/` lexicon is present, but dataset repo metadata declares no license, root tree has no LICENSE/COPYING, and the README does not allocate a license/provenance to this language.
- No runtime invocation, output artifact, or quality claim is made. Next acceptance: per-language source/provenance and rights for both lexicon and derived weights, then owner-approved usage decision, followed by isolated pinned execution and independent expert IPA adjudication.
- Detailed evidence and exact upstream paths: `docs/audits/current/GORUUT-ASSET-LICENSE-REVIEW-2026-11-01.md`.


## External corpus/source triage — 2026-11-01

- Task `MYA-IPA-SOURCE-TRIAGE-001`: `PARTIAL` for discovery and evidence triage; external data import / benchmark gold remains `BLOCKED` pending source-specific rights and expert validation.
- External-source triage is PARTIAL; no independently adjudicated, openly reusable Burmese IPA gold was verified. myG2P offers richer IPA but states CC BY-NC-SA 4.0 and remains blocked for commercial use without permission. A 2026 Wiktionary extraction reports 22,191 words with full MLCTS but only 113 IPA rows (0.51%) under CC BY 4.0; it is a possible MLCTS crosswalk, not a broad IPA gold corpus. OpenSLR SLR80 is historical metadata only and excluded from active text-only research; it is not an annotation source or blocker. Mya2Rom is CC BY-SA 4.0 and a comparator, not gold. See the source-triage audit for boundaries and links. Gold remains 0.
- No external corpus rows, IPA labels or model weights were copied into the repository. No accuracy score or engine ranking is claimed.
- Full source register and acceptance gates: `docs/audits/current/EXTERNAL-PHONETIC-CORPUS-TRIAGE-2026-11-01.md`.


## MYA-GORUUT-RUNTIME-001 — PARTIAL

- Added an optional, test-only HTTP runtime probe for Goruut at pinned upstream commit `b224bde02151f8f86d0fe260804e4ca743bda620`. It explicitly enables `Burmese` in `BuiltinDictLanguages`, builds the upstream Go binary and records raw JSON responses for six existing structural probes plus sentence/punctuation cases. `scripts/benchmark_goruut.py` records commit, language, input SHA-256, raw response, tokens and errors; no IPA normalization or accuracy scoring occurs. Structural probes are not phonological gold. Accuracy=null; independent gold=0. Workflow: `.github/workflows/optional-goruut-runtime.yml`; artifact retention 30 days.
- Acceptance: exact-head optional workflow must pass; inspect raw output for language coverage, unknown-word behavior, punctuation, multiword segmentation, malformed/unicode cases and phonetic output consistency. Keep raw data and errors; do not normalize tone/length/diacritics.
- Status remains PARTIAL until runtime artifacts are inspected and language-specific expert gold exists. The test-only CI checkout is not a production dependency or data import.


## MYA-GORUUT-RUNTIME-001 — PARTIAL (runtime executed; not promoted)

- The pinned Goruut runtime was executed with Burmese enabled (Go 1.23.12). Seven of eight probes returned phonetic tokens; the Burmese-punctuation sentence `ကေ၊ ကော်။` returned no phonetic output. Raw tokens such as `kè`, `kɔ̀`, `tɕì`, `swɛ̀`, `mjàɴ`, `jù` are preserved but not validated against an independent Burmese IPA set. Server log repeatedly reports missing `weights9.bin.zlib`. Do not promote. Full evidence: `docs/audits/current/GORUUT-RUNTIME-EVALUATION-2026-11-01.md`.
- Runtime/build/HTTP availability is verified for the returned probes. Phonetic accuracy, dialect coverage and IPA convention are not verified; independent expert gold remains 0.
- Acceptance to progress: investigate the repeated missing `weights9.bin.zlib` warning and raw outputs; resolve unsupported/empty responses; create a language-specific expert-adjudicated held-out IPA set; rerun and inspect exact artifacts. Production integration remains deferred until those gates pass.


## MYA-GORUUT-RUNTIME-001 — PARTIAL, repeatability evaluated

- Three-repeat re-evaluation: 7/8 probe inputs returned usable output and all 7 were stable across three repetitions; Burmese punctuation sentence `ကေ၊ ကော်။` returned no output in all three. This establishes limited repeatability, not IPA accuracy.
- Production integration remains blocked by insufficient source concordance, missing/unsupported outputs or incomplete phonetic forms. Independent expert gold remains 0.
- Next acceptance: investigate upstream missing-weight warning and language-specific mapping; resolve every no-output and unstable-tone case; commission expert IPA gold; rerun the pinned artifact and retain raw evidence.


## Cross-engine comparator evidence — PARTIAL

- Cross-engine check: Epitran 1.35.3 returned 6/6 raw outputs; Goruut returned 7/8 usable probes and failed the Burmese punctuation sentence. Exact string agreement between Epitran and Goruut was 0/6. Epitran is largely tone-less in these examples while Goruut emits tone-marked strings; without a common IPA convention and expert gold this is disagreement, not an accuracy ranking. Latest Goruut run had 7 stable usable outputs; a prior run showed one unstable `ကြည်` output.
- No external result is accepted as independent gold. Production selection remains blocked pending expert adjudication and repeatable, dialect-scoped validation.


## MYA-GORUUT-RUNTIME-001 — PARTIAL (exact-head evidence recorded)

- Exact PR #82 head `d8b065bc66dce5fdd9959c4f0eb932a29acaedba` runtime build and HTTP probe passed: [41310771082](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41310771082); artifact SHA-256 `0eb19d7079de818736ecff095f700405fc4b46de3791dd6e4fd68762346218fa`.
- Goruut 7/8 usable, 6 stable and 1 unstable across three repeats; punctuation case fails. Epitran 1.35.3 6/6 outputs; raw exact agreement 0/6. Not accuracy; gold=0.
- Missing `weights9.bin.zlib` warning persists; causal relation unknown. Keep both engines as comparators only.
- Full run evidence and config hash: `docs/audits/current/GORUUT-RUNTIME-EVALUATION-2026-11-01.md`.


## Goruut nondeterminism root-cause finding — Burmese

- The only unstable input (ကြည်) carried RandomizationWordsCount=1 and RandomizationWordsChoices=2 on all three responses. The other seven inputs had no such metadata; six were reproducible and one punctuation input returned no output.
- Upstream pinned selector counts homographs and falls back to a random dictionary pronunciation when no preferred entry is selected; response counters are `RandomizationWordsCount` and `RandomizationWordsChoices`. See [selector source](https://github.com/neurlang/goruut/blob/b224bde02151f8f86d0fe260804e4ca743bda620/repo/services/parts_of_speech_selector_service.go#L168-L205).
- Missing `weights9.bin.zlib` is a separate warning; causality is not established.


## BURMESE Goruut source-coverage gate — PARTIAL

- Raw runtime evidence was re-analysed using `PrePunct`, `CleanWord`, and `PostPunct`; non-empty phonetic output is not sufficient evidence of complete coverage.
- - Goruut: 7/8 inputs returned phonetic output; 1 punctuation sentence returned no output. All 7 returned outputs passed this source-coverage check. Six were stable; `ကြည်` was unstable and carried `RandomizationWordsCount=1`, `RandomizationWordsChoices=2`.
- - Epitran 1.35.3 returned six outputs on the six structural probes; exact string agreement with Goruut was 0/6. This is not accuracy or a winner selection.
- - This re-analysis confirms no partial-source-coverage response in the small Burmese probe set, but eight cases are far too few to establish language coverage.
- The benchmark harness now has tests for dropped source characters and source letters in punctuation fields; exact-head CI is still pending. No accuracy score or production promotion is claimed.
- Full evidence: `docs/audits/current/GORUUT-RUNTIME-EVALUATION-2026-11-01.md`.


## Owner scope decision — temporary test-only use — 2026-11-01

The repository owner explicitly directed that external Goruut assets may be used for temporary verification and comparison without blocking these tests on license review. Accordingly:

- **Test-only execution:** authorized for this research task; do not stop runtime probes because the external asset license is unresolved.
- **No data/model import:** no Goruut dictionary, model weight, or MekongPhon source row is copied into the product runtime or committed as a corpus by this decision.
- **Production packaging or redistribution:** not authorized by this instruction and remains outside this test-only scope; asset provenance/rights must be revisited before any bundling, redistribution, or production deployment.

This is a project scope decision, not a legal conclusion about the upstream assets.


## myG2P v2.0 100-entry source-attested comparison — 2026-11-01

A richer Burmese pronunciation resource was identified and is now wired into an optional, test-only comparison:

- Upstream: https://github.com/ye-kyaw-thu/myG2P
- Pinned upstream commit: `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`; dictionary: `ver2/myg2p.ver2.0.txt`.
- The README describes a five-column dictionary (word ID, orthography, syllable-broken word, pronunciation, IPA). Version 2.0 says IPA labels were added for each dictionary word; it acknowledges contributors and says mappings were checked, but does not provide per-entry reviewer IDs, adjudication protocol, or a sufficiently specified dialect/register profile.
- The source README declares CC BY-NC-SA 4.0. Per owner instruction, this dataset is used only in temporary verification artifacts; it is not copied into repository data or the product runtime.
- `scripts/prepare_myg2p_probe.py` parses the pinned TSV, records malformed/missing/duplicate rows, and deterministically selects 100 unique IPA-labelled headwords evenly across file order. It retains source line locators, word IDs, syllabification, pronunciation and the original IPA string. It does not label any row GOLD_VERIFIED.
- The optional runtime workflow runs both pinned Goruut and Epitran 1.35.3 against exactly the same 100 words, three repetitions for Goruut, and compares raw output with myG2P source labels. Goruut source concordance is eligible only when the response is stable, source coverage is complete, and no dictionary-randomization counters are present. Epitran is compared separately. All scores remain accuracy=null and independent_gold_count=0.

This is a stronger Burmese source-attested diagnostic than the 8-word structural smoke set, but it is still not independent gold. Exact-head workflow evidence is pending.


### Burmese source-coverage repeat-run evidence

## Re-run with source-coverage and randomization counters — 2026-11-01

The updated harness completed on PR branch commit `422ee1f991203275af21031e0ee3b2be78042816`: [runtime workflow 41312361052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41312361052), artifact [13086372584](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41312361052/artifacts/13086372584), ZIP SHA-256 `d6ea2b1aa6252fbe81c371e25d5ec7627d8608bb722b54a7c8fee85e729fe7f3`.

- Goruut returned 7/8 inputs; 7/7 had complete source coverage, one punctuation sentence had no output. All seven returned outputs were repeat-stable in this run.
- `ကြည်` carried `RandomizationWordsCount=1` and `RandomizationWordsChoices=2` in all three repetitions, even though this particular run selected the same `tɕì` output each time. A previous independent run selected different outputs across repetitions. Therefore metadata indicates an ambiguous dictionary selection even when a three-repeat sample happens to be stable; the new comparison excludes such rows from source-attested scoring.
- Epitran 1.35.3 returned six outputs on the original six structural probes; raw exact agreement remains 0/6. No independent gold; accuracy null.

This run reinforces that repeat stability alone is insufficient: Goruut's ambiguity counters must also be clear before source concordance is even reported.



## Final Burmese PR #82 / myG2P reconciliation — 2026-11-01

- Final head `dcd9dfb6f1306ce01547f922238aba3fdefd6586`: repository verification [41313487752](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487752) and Goruut/Epitran/myG2P runtime [41313487703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487703) both **PASS**. The repository run included pytest, npm build, generated-data validation, Node tests and Playwright built-browser tests.
- The 100-row myG2P v2.0 comparison (source commit `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`) yielded Goruut coverage 43 complete / 55 partial / 2 unknown; 98/100 responses; 98 stable, 0 unstable; no randomization metadata; 69 unphonemized source fragments. Strict source-attested exact matches 0/100; limited notation diagnostic 17/100. Epitran 1.35.3 also had 0/100 exact source-label matches. These are not accuracy scores.
- The separate eight-case probe had 7 outputs, 1 no-output, 7 complete-coverage responses, 6 stable and 1 unstable/randomized. The `weights9.bin.zlib` warning remains unexplained.
- Artifact [13086900774](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487703/artifacts/13086900774), SHA-256 `ca165ac84ee6b284a423a988a5ee32d951a883c36073b01fd5f086ba83022f77`; downloaded archive hash matched GitHub digest. myG2P CC BY-NC-SA 4.0 is used only in temporary verification under explicit owner authorization; no source dictionary is committed or packaged. Independent gold=0; accuracy=null.
- Parser, comparison, runtime workflow and exact-head engineering checks are **DONE_VERIFIED**. Phonetic correctness and production selection remain **BLOCKED/PARTIAL** pending expert-adjudicated, dialect-scoped Burmese IPA gold and further analysis of partial source coverage.


## Burmese repeatability correction — final PR #82 head

Fresh runtime [41324681722](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41324681722), artifact [13090128004](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41324681722/artifacts/13090128004), SHA-256 `0a1948d0662835a0cfaa7e8e08f49f481e2fec5569e63491a052c06b4a4fdac9`, supersedes the preceding 8-case statement: the small engineering probe returned 7/8 outputs, all 7 complete and stable, with **one ambiguous dictionary-selection input** carrying randomization counters in all three repeats (but 0 output-unstable cases in this run). The 100-row myG2P result remains 98/100 outputs, 43 complete / 55 partial / 2 unknown, 98 stable, no randomization metadata, 69 unphonemized fragments, 0 strict source-label matches and 17 limited-notation matches. Accuracy remains null; gold=0. Downloaded archive SHA-256 matched GitHub digest.


## Session closeout — 2026-11-01

- PR [#82](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/82) was reviewed and squash-merged into `main` as `e9c83322f304a670dd25e121dcc5b60e1cf3a896`; main branch head was verified to equal that SHA.
- Post-merge test workflow [41326238767](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41326238767) PASS. Pages build, Playwright built-browser tests, deploy and deployed-site/runtime smoke test [41326238774](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41326238774) PASS.
- Final PR-head Goruut/myG2P runtime [41325432725](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41325432725) PASS; artifact [13091201287](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41325432725/artifacts/13091201287), SHA-256 `eb8bd2018467eb2ca92f20677aac1b62601a3f9d6eb29857b3abc190c7f52f67`. On 100 myG2P entries: 98 Goruut outputs, 2 none; 43 complete / 55 partial / 2 unknown; 98 stable, no randomization metadata; 69 unphonemized source fragments; 0 strict and 17 limited-notation source-label matches. Epitran 1.35.3 also had 0 exact source-label matches. The separate 8-case probe had 7 outputs, 7 complete, 6 stable and 1 unstable/randomized case.
- Parser, comparison workflow and exact-head tests: **DONE_VERIFIED**. Production phonology remains **PARTIAL/BLOCKED**: 55/100 Goruut outputs are partial; 2/100 absent; myG2P labels are source-attested, not independent gold; independent expert Burmese IPA gold remains 0. myG2P CC BY-NC-SA 4.0 is used only under the owner's temporary test-only authorization; no dictionary data is committed or bundled. The `weights9.bin.zlib` warning remains unexplained.
- No local checkout was available; engineering verification is from exact-head and post-merge GitHub Actions. See runtime audit and execution matrix for details.


## Linguistic completion register — 2026-11-01

- Current verified `main` baseline: `4ddb9d3f10427275ce75c7ae73270468d3721106`; latest exact-main engineering workflow: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41326473323 (success). See the linked current audit register for the verified status and next acceptance criteria: [Linguistic completion register](audits/current/LINGUISTIC-COMPLETION-REGISTER-2026-11-01.md).
- Reconfirmed `data/benchmark/gold.tsv` contains only its header. Independent expert-adjudicated lexical IPA gold remains **0**; empirical accuracy remains **null**. No external source-attested labels or engine outputs are promoted to gold.
- The register separates implementable repository work from external expert, primary-source and licensing blockers. Preserve existing canonical plans, registries, tests and generated data; do not create parallel corpora or weaken fail-closed behavior.
- No local checkout was available for this pass. GitHub Actions provide exact-main engineering evidence only; they do not prove linguistic accuracy, manual accessibility QA or legal permissions.
## Current master-matrix status override — 2026-11-01

The following current statuses supersede older checkpoint rows above where they conflict; historical evidence remains preserved.

| Workstream | Current status | Current acceptance boundary |
|---|---|---|
| Independent Burmese IPA gold | BLOCKED | Gold TSV is header-only; no independently adjudicated lexical IPA; accuracy=null. Requires source-located written IPA/dictionary evidence, defined target profile, two independent text-based reviewers and adjudication; no audio. |
| Consonant/kinzi/medial analysis | PARTIAL | Structural parsing exists; source-backed phonological contexts and full cross-runtime differential corpus remain incomplete. |
| Vowel combinations and codas | PARTIAL | Full vowel derivation, checked-syllable and contextual coda realization are not implemented. |
| Tone/register/phonation | TODO | Specialist adjudication of competing analyses and a scoped runtime model are required; do not collapse them into guessed tone labels. |
| IPA → Ukrainian | PARTIAL | Canonical external inventory boundary exists; candidate policy and expert-reviewed correspondence coverage remain incomplete. |
| MLCTS → Ukrainian | TODO | Separate source-aware orthographic adapter is not implemented; verify rules against primary MLC sources. |
| Goruut/myG2P/Epitran comparisons | DONE_VERIFIED (diagnostic harness only) | Runtime artifacts and parsing are verified; 55/100 Goruut outputs were partial in the myG2P probe; no accuracy or production claim. myG2P remains temporary test-only under CC BY-NC-SA 4.0. |
| Python/browser phonological parity | TODO | Existing source-preservation parity does not establish phonological result parity. Add shared expert-backed phonology fixtures. |
| Manual UI/accessibility QA | TODO | Deployed visual, keyboard, screen-reader and mobile QA not evidenced by CI. |
| Release readiness | PARTIAL | Blocked by gold, phonological coverage, primary-source and asset-rights gates. |


### 2026-11-01 follow-up — validator and Burmese evidence audit

- IPA-GOLD-SCHEMA-001 remains DONE_VERIFIED (mechanism), now with runtime/schema parity checks: closed object properties, mandatory annotation notes, string uncertainty arrays, ISO dates and optional field types.
- IPA-TYPED-BENCHMARK-001 remains DONE_VERIFIED (mechanism): adjudicated gold requires a valid IPA kind; missing/different prediction kinds cannot score as exact matches or enter CER.
- Green's major/minor syllable analysis and rhyme restrictions now have explicit source locators; Mooney & Repetti-Ludlow (2021) challenges direct tone-to-vowel mapping; Duan & Zhu (2025) presents an unresolved eight-tone/two-register proposal; Repetti-Ludlow (2023) separates voiceless-sonorant cues from vowel phonation.
- Orthographic medials remain separate from phonological /j,w/ or other source analyses. Checked coda /ʔ/, nasalization, creaky phonation and tone are not collapsed.
- Independent expert gold remains 0; gold.tsv remains header-only. No IPA labels or unverified runtime rules were added.


### Research artifact — Burmese

- [BURMESE vowel × medial × checked-syllable × prosody evidence matrix](docs/audits/current/BURMESE-VOWEL-MEDIAL-PROSODY-EVIDENCE-MATRIX-2026-11-01.md): source-located Green rhyme restrictions, major/minor syllables, medial evidence limits and competing tone/register analyses.
- Checked /ʔ/, nasal /N/, creaky tone, vowel phonation and voiceless-sonorant cues remain distinct; no unsupported rules or IPA labels were added.


## 2026-11-01 implementation and verification closeout

- Starting main SHA: 4ddb9d3f10427275ce75c7ae73270468d3721106 (main remains unchanged).
- Implementation branch: feat/ipa-gold-corpus-20261101-review.
- Comprehensive PR: [#84](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/84); PR-head implementation checkpoint SHA: 1129048b96546187bace51ed8e3c665cd3d1d7cc.
- PR CI: [tests](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41337415201) SUCCESS — 121 Python tests + 31 subtests; four generated-data/web tests; 54 built-browser Playwright tests; production build and generated-data drift checks passed.
- Optional diagnostic: [Epitran raw-output benchmark](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41337415197) SUCCESS. It remains diagnostic evidence, not independent gold.
- This branch includes the previous documentation-only PR #83 in full; #83 was closed as superseded after its content was verified in #84. No branch was deleted.
- Legacy PR [#53](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/53) remains open and untouched: it is a divergent legacy CSS/layout patch and was not blindly merged.
- Existing feature branch feat/independent-ipa-gold-corpus-20261101 was left untouched because its history is substantially broader; the narrower review branch is the PR source.
- No local checkout was available; all verification claims above are GitHub Actions evidence, not local command runs.

### Final task ledger

- Corpus schemas/runtime validator, license registry, frozen group-safe splits and typed benchmark: DONE_VERIFIED (implementation and CI only).
- Actual independent expert annotations and adjudicated gold: BLOCKED — no qualified annotators or adjudicated source dataset supplied; gold.tsv remains header-only, gold count 0, accuracy null.
- Full vowel/medial/checked-syllable/tone/register/phonation model: PARTIAL/BLOCKED — see the Burmese evidence matrix; Green, LREC 2020, Mooney & Repetti-Ludlow, Duan & Zhu and Repetti-Ludlow use different analyses and sample scopes.
- LREC 2020 in-house speech and segmentation corpora are not public domain and are excluded from project data/assets.
- Release gate: PARTIAL — count, rights, adjudication and split checks exist and fail closed on empty gold; project owner must require the gate in repository rulesets/release procedure, and feature-coverage thresholds require an expert-approved matrix.
- Manual UI/accessibility review: TODO.

**Readiness:** research infrastructure is substantially improved; the language system remains a research prototype, not production/release-ready.


## 2026-11-01 final IPA-kind consistency verification

- Added fail-closed cross-annotation consistency: both independent annotations for one record must use the same `ipa.kind`, and a `RESOLVED` adjudicated result must preserve that kind. This prevents phonemic-vs-phonetic representation differences from being misclassified as pronunciation disagreements.
- Regression evidence: both new tests failed against the pre-fix validator on the test-only commit, then passed after the validator change.
- New task `IPA-GOLD-REPRESENTATION-KIND-001`: **DONE_VERIFIED** (mechanism and exact-head CI). Blindness, annotator qualifications and independent adjudicator competence remain external operational evidence, not properties CI can prove.
- Final PR head: `5aa4463b70599f36ea287d62ed07d0fd69b3dac1`; CI run [41338466798](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41338466798) SUCCESS — 124 Python tests + 31 subtests; generated-data checks, production build and 54 built-browser Playwright tests passed. Optional Epitran diagnostic run 41338466820 also passed.
- The Burmese matrix remains PARTIAL: Green's extracted 50-rhyme table still needs manual primary-PDF transcription; tone/register/phonation analyses remain competing evidence, not implementation consensus.
- Gold remains zero; `gold.tsv` remains header-only; empirical accuracy remains null. No IPA labels were generated.


## CI action runtime modernization — 2026-11-01

- Status: `DONE_VERIFIED` (CI maintenance only; no Burmese phonology or transcription behavior changed).
- Updated all five workflow files to current Node.js 24-compatible action majors: `actions/checkout@v7`, `actions/setup-python@v7`, `actions/setup-node@v7`, `actions/setup-go@v7`, and `actions/upload-artifact@v7`. Existing Pages actions remain at `configure-pages@v6`, `upload-pages-artifact@v5`, and `deploy-pages@v5`.
- Tested code commit: `a1ef4e13105937cd282e6edd67020a74207f649b`.
- Exact-head verification: [tests 41339669408](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41339669408) SUCCESS; [optional Epitran diagnostic 41339669397](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41339669397) SUCCESS.
- Verified workflow coverage: 124 Python tests + 31 subtests, web-data validation, production build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed on the exact code commit.
- Local checkout was unavailable; verification evidence is GitHub Actions. The gold corpus remains empty and empirical accuracy remains unmeasured.


## Frozen split-manifest schema parity — 2026-11-01

- Status: `DONE_VERIFIED`.
- Review found that `assign-splits` accepted unknown properties in existing split rows even though the split JSON Schema is closed; the generator could silently discard those fields when rewriting the manifest.
- RED evidence: regression `test_assign_splits_rejects_unknown_properties_in_existing_manifest` failed as expected on test-only commit `3f20dcc5f2f90940b600fdb2fd378d4976d3a098` ([run 41340275371](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41340275371)).
- GREEN implementation: shared `SPLIT_PROPERTIES` is now used by both cross-file validation and `assign-splits`; the generator rejects unknown fields instead of dropping them. Code commit: `76af91582a760b44ce18f029f80dbf9a35f7a4c7`.
- Exact-head verification: [tests 41340417848](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41340417848) SUCCESS — 125 Python tests + 31 subtests; web-data validation, production build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed.
- Shared implementation and regression test are byte-identical across Lao, Khmer and Burmese branches. No corpus rows or IPA labels were added; independent gold remains zero and accuracy remains null.


## Product-corpus license eligibility — 2026-11-01

- Status: `DONE_VERIFIED` (policy enforcement; no source corpus or license grant was changed).
- Review found that the license registry accepted `redistributable: true` together with `commercial_use: false/null` or unknown attribution/share-alike terms. That could make a non-commercial or legally incomplete entry eligible for the product corpus if the registry were misconfigured.
- RED evidence: the new runtime and schema-contract tests failed on test-only commit `53964d81fdfca19314fbf911dcc424cd3be20027` ([run 41340809527](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41340809527)).
- GREEN implementation: a redistributable license must explicitly set `commercial_use: true` and boolean `attribution_required` + `share_alike`; the JSON Schema now encodes the same conditional rule. Code/schema commit: `7383191ca2ca9e8c24099ae2f55483c6f6351d68`.
- Exact-head verification: [tests 41341030962](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41341030962) SUCCESS — 127 Python tests + 35 subtests; web-data validation, production build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed.
- This is a conservative product-corpus eligibility rule, not a legal opinion about all uses of these licenses. Each real source still needs human rights review. No IPA gold rows were added; independent gold remains zero and accuracy remains null.


## Release-gate threshold validation — 2026-11-01

- Status: `DONE_VERIFIED`.
- Review found that the CLI accepted zero/negative `--min-train`, `--min-dev` and `--min-test` thresholds. That could let an operator weaken a release gate below a meaningful non-empty split requirement.
- RED evidence: the six invalid threshold cases (0 and -1 for each split) failed as expected on test-only commit `52fbfd77a12ef2e592debbaea7e07b0650d5fd3b` ([run 41341548544](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41341548544)).
- GREEN implementation: all three minimums must be positive integers. Invalid threshold configuration is added to the gate's aggregated findings rather than raised before corpus checks, preserving diagnostics for other blockers. Final code commit: `fc77d3e8073e58ae75a86693db971ff3fc0a162a`.
- Exact-head verification: [tests 41341757201](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41341757201) SUCCESS — 128 Python tests + 41 subtests; web-data validation, production build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed.
- The configured release-gate defaults remain train=100, dev=25, test=25. No gold rows or IPA labels were added; independent gold remains zero and accuracy remains null.


## Controlled IPA gold acquisition checkpoint — 2026-11-01

- Added `docs/ipa-gold-collection-playbook.md` on `feat/ipa-gold-corpus-20261101-review`. This defines a human-led 30-lexeme process pilot, one predeclared pronunciation profile and IPA convention per corpus version, a curator, two blind independent annotators, and a third independent adjudicator. It sets explicit start/pilot-accepted/benchmark-ready gates and distinguishes pilot data from held-out evaluation.
- This is a protocol/documentation deliverable, not evidence that annotators have been recruited or that any IPA gold has been collected. The four JSONL corpus inputs remain empty; no gold labels or accuracy claims were added.
- External source lead: MekongPhon (LREC 2026) reports 367k Lao and 1.3m Khmer orthography–IPA pairs. It is recorded only as a candidate external reference. Its dataset-specific license, variety/profile, IPA convention, provenance, verification method, and overlap with engine development data must be checked before use. The LREC proceedings CC BY-NC-4.0 notice does not establish the dataset license. https://lrec.elra.info/lrec2026-main-129
- Khmer additional lead: chemvatho/Khmer-acoustic-model reports a 29,204-entry IPA dictionary and states dictionary data are CC BY-SA 4.0, distinct from MIT code/model. Per-entry provenance, dialect, IPA consistency, exact version and actual reuse rights still require inspection before importing. https://github.com/chemvatho/Khmer-acoustic-model
- Lao sampling guidance distinguishes Vientiane from other profiles and preserves lexical tone separately from contextual F0 effects; sources include Yanagimura (2013) and EURPhon profiles. Khmer guidance distinguishes Phnom Penh vowel/coda effects and variable /r/-loss. Burmese guidance keeps competing tone/prosody analyses explicit and requires source-table transcription to be independently checked before annotation.
- Current blockers: recruit/confirm two qualified annotators and one independent adjudicator per language; choose and approve target variety/convention; identify rights-cleared pilot lexemes; test a blind intake channel; verify candidate external datasets before use. Burmese additionally needs specialist approval of its prosodic transcription convention and source extraction. These are human/source/rights dependencies, not additional automation tasks.
- No repository test was run for this documentation-only checkpoint; existing CI evidence belongs to the preceding code head. Re-run exact-head CI after the documentation commits before merge.


## External corpus provenance audit — 2026-11-01

- Inspected https://github.com/byu-matrix-lab/MekongPhon. Its pipeline README describes SEAlang frequency lists, IPA scraping, minor lexicon post-processing, OPUS sentence downloads, lexicon train/eval splits, and trie-based sentence conversion from word-level IPA entries. Treat this as a large external orthography–IPA resource and possible comparator, not automatically as independent sentence-level phonetic gold.
- The upstream repository root LICENSE path was not present in the inspected tree. Dataset-specific redistribution permission, source terms, variety, IPA conventions, human verification/correction process, exact data files and overlap with our engine sources remain unverified. Do not import or redistribute any of it until those are resolved. Proceedings CC BY-NC-4.0 and Apache-2.0 model-card licenses do not license the underlying dataset by implication.
- Khmer Acoustic Model dictionary remains a candidate external comparator only; its README states dictionary CC BY-SA 4.0 and claims native-linguist validation, but per-entry provenance, variety, IPA convention and exact version require inspection.
- Historical source note only: Oo et al. (LREC 2020) described an ASR corpus with orthographic text. It is excluded from active text-only work; no recordings, rights checks or re-transcription will be pursued.
- No data files were imported and no IPA labels were added. Corpus remains empty and benchmark accuracy remains null.


## Controlled IPA acquisition documentation CI — 2026-11-01

The documentation-only playbook, corpus-guide and handoff changes at the preceding branch head were checked by GitHub Actions. Burmese: tests 41343513461 SUCCESS; optional Epitran 41343513473 SUCCESS; optional Goruut 41343513505 SUCCESS. No language-engine runtime or gold data changed. This validates the repository state, not the linguistic correctness of future annotations. Pages deployment and release-gate workflow were not run.


## Source acquisition update — 2026-11-01

- Historical metadata only: OpenSLR 80 (SLR80) was previously reviewed as an audio/transcript resource. It is explicitly excluded from current text-only scope and is not an active candidate.
- Scope boundary: SLR80 is not used. Text-only G2P research must rely on written lexical and phonological sources; no audio-based labels or evaluation are permitted.
- Recommended split: a separately labelled contextual phonetic subset from SLR80, plus a distinct citation-form lexical set elicited from qualified speakers of the approved target variety. Never mix their accuracy denominators or claim citation-form accuracy from sentence-context tokens.
- MYA-GOLD-001 remains BLOCKED; independent text-adjudicated IPA gold is 0 and accuracy is null. Next acceptance step: two independent reviewers adjudicate source-located written lexical examples under one versioned IPA convention; no audio.


## Final exact-head verification — 2026-11-01

Branch `feat/ipa-gold-corpus-20261101-review`, source-audit content commit `083ddb740d825b2c1e227cd0f19d051beba097a6`. Burmese exact-head CI: tests [41344959952](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959952) SUCCESS; optional Goruut [41344959963](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959963) SUCCESS; optional Epitran [41344959950](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41344959950) SUCCESS. Core job passed corpus structure validation, pytest, npm build, generated-data drift check, npm tests and built-browser Playwright tests.

These checks validate the committed repository and its automated engineering contracts. They do **not** validate the linguistic correctness of future human annotations, create gold labels, or change the release blocker. Gold remains empty and accuracy remains null.


## Follow-up handoff-head CI — 2026-11-01

The subsequent documentation-only handoff/register state at commit `0021dae7ea3450b99f63509c39d3dd384241284e` was also checked on its exact head: tests [41345383752](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383752) SUCCESS; optional Goruut [41345383729](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383729) SUCCESS; optional Epitran [41345383623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41345383623) SUCCESS. These runs validate the updated documentation and existing automated checks, not future IPA annotations. Any later branch update must be checked again on its new exact head.


## Open-rights state consistency fix — 2026-11-01

- Code review found that a source could pass corpus validation with `rights_status: OPEN` but `redistributable: false`. The export and release gate would later exclude/reject it, but the canonical record itself was contradictory.
- Added a test-first regression. Test-only commit `644d897cefeb613a74aaa6ea9110ba4e9a5303e2` failed as expected in the language CI because validation incorrectly returned success for that contradictory state.
- Added the fail-closed Python validation and matching conditional in `schemas/ipa-gold-record.schema.json`; regression also asserts the schema condition. Exact code/schema head: `0f0a8a013887a7366aea2424935b0252f5b11778`.
- Exact-head CI [41348005124](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41348005124) passed: 129 pytest tests + 41 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed; optional Goruut and Epitran diagnostics passed.
- No external corpus, restricted source data, IPA label or benchmark record was imported or created. Gold remains 0; `gold.tsv` remains header-only; empirical accuracy remains null.

## Exact current-head verification and handoff reconciliation — 2026-11-01

- Verified default branch `main` at `4ddb9d3f10427275ce75c7ae73270468d3721106`; work branch `feat/ipa-gold-corpus-20261101-review` at `a8b71b536f93da586e16dfcc91a5db9a8be1f573`. GitHub compare reports **83/84/82 commits ahead respectively and 0 behind** (see the repository's PR compare; no main commits need porting at this checkpoint).
- Exact current-head GitHub Actions core run: [41348246731](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41348246731) — SUCCESS. 129 pytest tests + 41 subtests; npm build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed. Optional Goruut Burmese and Epitran diagnostics passed.
- These are hosted CI results. No local checkout or local test execution is claimed. Optional G2P/Goruut/Epitran checks are diagnostics only and do not establish linguistic correctness.
- The current branch contains the open-rights invariant: `rights_status=OPEN` requires `redistributable=true` in both the Python validator and `schemas/ipa-gold-record.schema.json`, with a regression test.
- Independent expert-adjudicated gold remains **0**; `gold.tsv` remains header-only; empirical accuracy remains **null**. Engineering CI does not close human annotation, profile/convention approval, or linguistic validation gates.
- This entry supersedes earlier handoff statements that described the documentation/code checkpoint as awaiting exact-head CI. The PR description may contain older or superseded SHA references; the branch ref and exact-head run above are authoritative.


## IPA gold nested-record contract hardening — 2026-11-01

- Test-first regression run [41352936278](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41352936278) failed as expected: undeclared fields inside orthography, profile, source and rights_evidence passed runtime validation, and the schema left those objects open.
- Runtime fix and schema closure: unknown properties are now rejected at all four nested boundaries. Exact code/schema head `4e4bcde92ed9af7348b51b0b13dfe9a86eb64cbd`; exact-head core CI [41353062069](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41353062069) SUCCESS (131 pytest tests + 48 subtests; npm build, generated-data drift, npm tests and 54 Playwright browser tests passed).
- Engineering-only change: no linguistic rules, IPA labels, gold records, source data or accuracy claims added. Independent expert gold remains 0; accuracy remains null. Hosted CI only; no local checkout was available.


## Cross-repository validator cleanup checkpoint — 2026-11-01

- Methodology review: the repository's pinned references in `AGENTS.md` already capture the relevant practices from Superpowers (test-first changes and evidence-gated verification), mattpocock/skills (clear module seams and behavior-focused tests), and Ponytail (small complete diffs and connected-code review). They remain methodology references, not runtime dependencies; no external skill bundle was copied into the product.
- Removed four consecutive duplicate nested-object validation calls from `scripts/ipa_gold_corpus.py` (orthography, profile, source, and rights_evidence). This removes redundant work without changing the contract. The resulting file has the same blob SHA across all three repositories: `a072297e320b4b91a36c59fc90328b6ff98d2a5f`.
- Code commit: `76c2639c57dfdf7da5a4a39a3fae999f2a646532`. - Core PR CI: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250746 (SUCCESS); core push CI: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354246209 (SUCCESS); optional language diagnostics: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250460, https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41354250457 (SUCCESS).
- No schema, source data, linguistic rule, IPA label, or gold row changed. Independent expert-adjudicated gold remains 0; accuracy remains null. The next substantive blocker is still qualified target-variety annotation and adjudication, not more validator scaffolding.


### Upstream methodology review — follow-up 2026-11-02

- **mattpocock/skills v1.3.2**: `d1478fcb140db0b93c0c8df17bcfd311844749d0` (released 2026-10-29). Applied separate spec/acceptance and repository-standards review; standards-file discovery; genuine-RED evidence requiring proof that a mutation changed relevant source; and repository-specific issue/PR template and ownership checks.
- **Superpowers 7.0.1** remains pinned at `2ce8aa15d05bd57213e6f746f953aafb7ded7a8b`; preserve untracked work on refused worktree cleanup and keep human-authored report sections genuinely human-authored.
- **Ponytail 5.3.3** remains pinned at `7801d061243d7b753bad0e0b3c057cd250b11755`. Upstream `main` at `96608e078b2d5ea607c5c3b8b5a54d1c1fba6846` only adds a README product/logo mention after the method pin; no methodology update is warranted.
- No upstream skill bundle, code, dependency, dataset, or runtime integration was copied.


## Exact-head verification — methodology refresh 2026-11-02

- Documentation and agent guidance checkpoint: `b5c50772c3d8f1494bb68d0a85a41b6fee82d1ec`.
- [tests 41358676730](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676730) completed SUCCESS on this exact commit; pytest, npm build, generated-data drift check, npm tests and built-browser Playwright all passed.
- Optional diagnostic runs [41358676910](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676910) and [41358676749](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41358676749) also completed SUCCESS. These diagnostics are not accuracy evidence.
- The current branch has one subsequent documentation-only evidence-register commit; its exact-head CI is recorded in the final session report. No engine, linguistic rules, IPA labels, gold records, datasets, or runtime dependencies were changed.


## Adjudication schema/runtime parity correction — 2026-11-02

- Found a real contract mismatch: `schemas/ipa-gold-adjudication.schema.json` requires `final_ipa` (nullable), but the Python validator used `row.get("final_ipa")` and therefore accepted an omitted key for `UNRESOLVED`.
- Test-first evidence: test-only commit `2c1897567b1c108a7c587307a01cc79c857f4450` failed as intended on exact-head PR CI [41407021855](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407021855); the runtime returned success for a malformed adjudication and the new regression failed.
- Fix: `030d5255eb81400781f6961b53bc5f0d76a85f8c` now rejects a missing `final_ipa` property for every decision; unresolved cases must explicitly provide `null`. Exact-head PR CI [41407123331](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123331) SUCCESS. 132 pytest tests + 48 subtests; npm build, generated-data drift, npm tests and 54 built-browser Playwright tests passed.
- Optional diagnostic runs: [41407123332](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123332), [41407123343](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407123343) — SUCCESS.
- This is validator/schema parity only. No linguistic rules, IPA labels, gold records or source datasets changed; independent expert gold remains 0 and accuracy remains null.


## Unresolved adjudication positive-path verification — 2026-11-02

- Added explicit positive-path coverage proving that `UNRESOLVED` with a present `final_ipa: null` remains valid; omitted `final_ipa` is rejected by the new runtime guard. Test commit `72d4664d0d1d21872fde11c492d3fd8194b0290f`.
- Exact-head PR CI [41407404042](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407404042) SUCCESS. 133 pytest tests + 48 subtests; npm build, generated-data drift check, npm tests and 54 built-browser Playwright tests passed.
- Optional diagnostic runs: [41407410734](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407410734), [41407410747](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41407410747) — SUCCESS.
- No linguistic rules, IPA labels, corpus records, datasets or empirical metrics changed. Independent expert gold remains 0; accuracy remains null.


## External G2P benchmark and engine coverage audit — 2026-11-02

A source-backed audit was added at [docs/research/external-g2p-benchmark-and-engine-coverage-2026-11-02.md](research/external-g2p-benchmark-and-engine-coverage-2026-11-02.md). It separates declared engine language support from verified phonological coverage, records language-specific external benchmark resources, defines a reproducible held-out evaluation protocol, and explicitly does not claim a score for this repository. No external engine output was promoted to IPA gold.

Current key findings:
- Epitran and Goruut both declare this language, but both remain comparators only; their public support lists do not establish complete project-profile coverage.
- The audit records engine-specific limitations and the phonological feature inventory that must be evaluated.
- The next step is a pinned, same-input, held-out benchmark with independent expert references and feature-specific metrics; exact model/dataset versions and provenance must be recorded before execution.

No runtime engine benchmark was run in this documentation update. Hosted CI verifies repository engineering, not linguistic correctness or benchmark accuracy.


## External engine smoke evidence — 2026-11-02

Detailed methods, benchmark context, limitations and per-feature acceptance requirements: [external G2P benchmark and engine coverage audit](research/external-g2p-benchmark-and-engine-coverage-2026-11-02.md).

Burmese: Epitran 1.35.3 returned six structural-only outputs, zero eligible verified gold; Goruut on 100 source-attested myG2P rows had 0/100 exact, 17/100 limited notation-normalized matches, 98 outputs, 2 failures, 43 complete/55 partial/2 unknown coverage, and 69 unphonemized fragments. No independent gold; accuracy=null. Runs: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41409098332 and https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41409098207.

These are raw-output concordance/coverage diagnostics, not accuracy measurements. All independent gold counts remain zero and accuracy remains null. The missing `weights9.bin.zlib` diagnostic in Goruut's logs is recorded for investigation. Declared language support is not accepted as proof of adequate coverage. No gold labels or production rules were changed based on these runs.


## Benchmark provenance correction — 2026-11-02

Goruut was fetched from upstream source snapshot `b224bde`, not a release tag; Epitran was version 1.35.3. Added the documented myG2P phoneme/vowel-combination/context coverage to the source review.

The detailed research audit is authoritative for engine versions, benchmark limitations, and measured diagnostic values. Do not describe the Goruut run as release-pinned; it used the captured upstream source revision stated above.


## Verification checkpoint for the 2026-11-02 external-engine audit

Research audit and completion register are now updated. Last register commit before this handoff update: `4e7d0f9c8059921a81d2be3ef7f9c674cf46c758`.

Core tests and optional Epitran/Goruut raw-output workflows passed on the same code state before the final register-only documentation commit: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41409098216, 41409098332, 41409098207.

The commits after those workflow runs changed only research-audit / handoff / completion-register documentation, not executable code. Do not treat hosted diagnostic jobs as gold evaluation: all independent gold counts remain zero. The current review branch remains ahead of `main` and has not been merged.


## Final exact-head CI reconciliation — 2026-11-02

The previously pending final-head hosted workflows have now completed successfully on this repository's recorded review-branch head `ddda11a465eed394cc4efa7c8df56802d798a6fa`. Runs: [tests 41409594362](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41409594362); [Epitran 41409594432](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41409594432); [Goruut 41409594366](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41409594366). All listed jobs and steps report SUCCESS. This closes the CI-status uncertainty from the preceding checkpoint; it does not close linguistic validation or gold-data acceptance.

A follow-up inspection of the pinned Goruut source tree at `b224bde02151f8f86d0fe260804e4ca743bda620` confirms that the language-specific dictionary directories for Lao, Khmer Central and Burmese do not contain `weights9.bin.zlib`; the available language assets include the earlier weight files. Therefore the recurring log warning is consistent with an absent upstream language asset in that snapshot, not evidence that our checkout step failed to fetch an existing file. The server still starts and returns outputs, but the precise model-quality impact of the missing file is not established by this probe. Keep it recorded as an upstream model-bundle coverage limitation; do not patch or synthesize model weights locally.

The current review branch remains ahead of `main` and 0 commits behind; no PR was merged and no release was published. Independent expert-adjudicated gold remains 0; empirical accuracy remains null. All external-engine scores remain diagnostic concordance only.


## Final audit-register correction checkpoint — 2026-11-02

The completion register now supersedes the stale action item to locally recover/fix Goruut `weights9.bin.zlib`: the pinned upstream source tree does not publish that file for the three language bundles. The issue is therefore **BLOCKED (upstream dependency)** pending upstream publication or documentation of the intended fallback, not a project-owned file repair. No synthetic weights or substitute model assets were introduced.

The immediately preceding exact-head verification completed successfully on the pre-register-correction commits; the register correction itself changes documentation only. Previous runs: [Burmese tests 41411562583](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41411562583); [Goruut 41411562590](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41411562590); [Epitran 41411562613](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41411562613). Current branch commit before this handoff checkpoint: `1db0d15a30380b2367136270017b8bc03e101d12`. The handoff update will trigger fresh branch CI; do not treat these preceding run IDs as verification of the new handoff commit.


## Additional Burmese CRF baseline discovered — 2026-11-02

A follow-up search found [`kyaw-yethu/burmese-G2P`](https://github.com/kyaw-yethu/burmese-G2P) at source commit `de0f06056cf334b8cdd5a1efd1226f01c8162b77`. Its CRFsuite `ver2/g2p.model` emits IPA-like output using the myG2P dictionary, but the README acknowledges sentence-level errors on particles and postpositional markers. Its preprocessing script randomizes rows with unseeded `shuf` and uses a 19,830/4,957 train/test partition; the committed model's exact training membership is not established, so evaluation on the same myG2P dictionary risks leakage. Status: **TODO (safe raw-output probe; BLOCKED for accuracy scoring until disjoint held-out data and profile are verified)**. Do not reuse its internal score as independent evidence. Gold remains 0; accuracy remains null.


## Burmese CRF baseline implementation checkpoint — 2026-11-02

The previously identified kyaw-yethu CRF candidate now has an isolated, pinned `crf-baseline` job inside the existing `.github/workflows/optional-epitran-benchmark.yml`; this workflow exists on the base branch and is therefore eligible to execute on the open PR before merge. The runner builds CRFsuite from `chokkan/crfsuite@a2a1547727985e3aff6a35cffe073f57f0223e9d`, checks out `kyaw-yethu/burmese-G2P@de0f06056cf334b8cdd5a1efd1226f01c8162b77` and `ye-kyaw-thu/myG2P@54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`, and runs `scripts/benchmark_burmese_crf.py` on the deterministic source-attested 100-row probe. The script retains source locators, IPA convention, model SHA-256, predictions and limitations; it explicitly emits no gold score (`gold_count=0`, `accuracy=null`). It supplies the dictionary's syllable boundaries, so it does not test `sylbreak` or end-to-end sentence handling.

Six unit tests were added for sequence formatting, missing segmentation, sequence parsing and provenance. Exact-code-head GitHub Actions currently reports tests run [41415541580](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415541580), optional comparator workflow [41415541557](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415541557) (including the CRF job), and Goruut run [41415541572](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415541572) as **QUEUED**. This is **PARTIAL**, not DONE_VERIFIED, until the jobs complete and the artifact is inspected.

The upstream README says the CRF model's sentence conversion remains future work and identifies particles/postpositional markers as a known weakness. The upstream preprocessing script uses unseeded `shuf` with a 19,830/4,957 train/test split; exact model training membership is not recorded. Source concordance against myG2P must therefore remain diagnostic, not accuracy.


## Main publication reconciliation — 2026-11-02

Supersedes earlier handoff statements that the review branch was still ahead of `main` and unmerged: the CRF benchmark test-import defect was fixed in PR [#86](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/86), merged into the review branch as `db183681eb1fc66e1b513623e08e75d5f8842220`, then the complete language PR [#84](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/84) was merged into `main` as `8cffc508ffaf5ab1b54f3b9276034838d24057ae`; this was the repository's current `main` tip at reconciliation. On the complete feature plus fix, the required workflow passed: tests/build/generated-data check/JS tests/Playwright built-browser tests [41417982342](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982342) SUCCESS; the optional CRF and Epitran jobs [41417982199](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982199) SUCCESS; optional Goruut [41417982213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982213) SUCCESS. The original required test failure [41415624611](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41415624611) was specifically `ModuleNotFoundError: No module named 'scripts'`; the pytest `pythonpath = ["."]` fix was verified by the successful full run. The Pages workflow is configured to deploy from `main` and includes a deployed-site/runtime-asset smoke test. The public deployment result could not be independently inspected from this session, so deployment status remains **BLOCKED (external verification/network access)**, not claimed successful. Independent expert-adjudicated gold remains 0 and accuracy remains null; the project is still a research prototype.


## Burmese CRF artifact inspection — 2026-11-02

The successful optional run [41417982199](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41417982199) produced artifact `burmese-crf-raw-output` (artifact SHA-256 `0119281f9bd3d946a36dad1299f530b629599cfd26146ce190ea34f7c707ddd6`), which was downloaded and inspected. It contains 100/100 predictions, 84/100 exact source-concordant strings, model SHA-256 `f66571b7632eed2e94878278702654ce0a4b25fcab18720af60d3cfe00b011ce`, and explicit `gold_count=0`, `accuracy=null`, `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`. This is a useful reproducible raw-output diagnostic, not accuracy: model training membership is unknown, the source rows are not independent adjudicated gold, and the supplied syllable segmentation is not evaluated. The artifact is retained as CI evidence; the upstream myG2P data declares CC BY-NC-SA 4.0 and is not redistributed as product data.


## Current-main UI publication — 2026-11-02

The older design PR [#53](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/53) was not merged because its branch had diverged (5 commits ahead / 187 behind current `main`). Its responsive CSS and cache-busting intent were ported onto a fresh branch from the then-current `main`; PR [#87](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/87) was merged as `930ec6b66b4ec5fb280d3c926b8d307a23551998`. The current-main CI [41424015018](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41424015018) passed IPA gold-corpus structure validation, Python tests, generated-web-data drift check, npm tests, production build and Playwright browser tests. The Pages workflow is configured for pushes to `main`; actual deployment completion and public-site smoke-test result remain **BLOCKED (external verification/network/DNS unavailable in this session)**. This UI change improves presentation only and does not improve linguistic accuracy. Independent adjudicated gold remains 0; accuracy remains null; research-prototype status is unchanged.

### Pages smoke-test compatibility follow-up — 2026-11-02

The cache-busted stylesheet URL introduced by the UI polish exposed an overly strict CSS-link extractor in the deployed-site smoke test. Fixed in PR [#88](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/88), merge `fea5f6e44680b6202e07e5e896eb175699c101c2`; the extractor now accepts an optional query string. PR CI passed (41424690731). The Pages workflow is now compatible with the deployed CSS URL. The post-merge Pages deployment and live-site smoke-test result are still **BLOCKED for independent verification** because external DNS/network access and a workflow-run listing endpoint were unavailable; do not infer deployment success from a merged PR or a successful pull-request CI run.


## Split-manifest continuation update — 2026-11-03

- PR [#90](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/90) was merged into current `main`; see the post-merge checkpoint below.
- Added a regression test for creating a new, independent split manifest using a new empty JSONL `--splits` input and explicit new seed/version. Updated `docs/ipa-gold-corpus.md` to state that a new `--output` alone does not reset the existing input manifest.
- Exact-head CI [41638537232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41638537232) SUCCESS — 145 pytest tests + 48 subtests; web data validation OK; 54 browser tests passed.
- Linguistic gold remains 0; gold export remains header-only; empirical accuracy remains `null`. This is split lifecycle/reproducibility engineering, not phonetic validation.


## Manifest-wide split identity integration — 2026-11-03

- PR [#90](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/90) merged by squash into `main` as `01d0d193f043508c6283ba77d70f9e9439402997`.
- The change enforces one manifest-wide `(seed, version)` pair across all lexeme groups, preserves the frozen identity when extending a manifest, rejects conflicting explicit overrides and empty explicit CLI values, and requires a distinct empty input manifest for a genuinely new split identity.
- Exact-main push verification: [41643388974](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41643388974) SUCCESS. Main test workflow [41643388974](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41643388974) passed. Pages build/deploy and live deployed-site smoke [41643388999](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41643388999) also passed, including Chromium built-site tests, Pages upload/deploy and deployed runtime-asset smoke.
- This is a reproducibility/engineering correction, not a linguistic accuracy result. Independent adjudicated IPA gold remains 0; accuracy remains `null`.
- The previously open documentation PRs [#91](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/91) and quality-audit PR [#89](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/89) now each lag current `main` by one commit; they require reconciliation and fresh exact-head checks. Their prior CI successes do not constitute post-merge verification.


## Source-citation port on latest main — 2026-11-03

- Reconciles the source-registry, references and research-audit changes from superseded PR #91 onto current `main` after split-manifest and handoff integrations.
- The missing WSSANP 2016 record and exact ACL Anthology locator are included; author–year citations are corrected. The paper's romanized phoneme inventory is not treated as project IPA gold; dataset redistribution rights remain unverified.
- Earlier source/citation PR exact-head CI succeeded, but this new branch requires its own exact-head checks. No external labels or model outputs imported; independent IPA gold remains 0 and accuracy remains `null`.


## Burmese focused source audit and agent guidance — 2026-11-03

- Ported the evidence-matrix and agent-navigation portion of prior PR #89 onto current main after the manifest-wide split fix (#90) and WSSANP citation reconciliation (#94). Split runtime code, tests and source-registry changes were intentionally excluded because they are already merged.
- Updated the vowel/medial/prosody evidence matrix to describe Mooney & Repetti-Ludlow (2021) precisely: two acoustic experiments with one female native Yangon consultant; isolated vs sentential cue differences; coda/sonority-conditioned vowel alternations remain a competing analysis, not a settled replacement for traditional tone categories.
- Added source-level distinctions: Hlaing & Mikami's reported 99.93% is orthographic word syllabification, not G2P/IPA; Oo et al. (2020) is a 20-female-speaker Yangon orthographic speech corpus, not IPA gold; Thu et al. (2016) evaluates a romanized phone inventory, not project IPA gold. Dataset and grammar licenses remain artifact-specific.
- Added the root glossary, verified codebase map, issue-tracker instructions and AGENTS.md routing to the canonical handoff.
- No lexicon rows, IPA labels or model predictions imported. Independent adjudicated gold remains 0; accuracy remains `null`.
- Exact-head CI is pending for this documentation port; original PR #89 CI [41631406950](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41631406950) succeeded on its earlier head and is not evidence for this new branch.


## Current repository continuation checkpoint — 2026-11-03

- Verified default branch `main` at `36ee99a83e6dd2bcf4670860908c3dbf53301ab8`.
- Latest exact-main CI: tests 41647872126 SUCCESS; Pages/deployed-site 41647872084 SUCCESS.
- PR reconciliation: PR #89 is closed without merge; its mainline source and agent-guidance work was ported in focused commits. No open PRs were returned by the current open-PR query.
- Current engineering state: The latest main includes manifest-wide split identity, WSSANP/benchmark citation reconciliation, focused Burmese vowel/medial/prosody evidence corrections, agent navigation, and current Pages deployment. The research matrix still treats the single-consultant acoustic evidence as bounded, not a universal tone/vowel analysis.
- Linguistic evidence boundary: 0 independent adjudicated IPA records; gold.tsv header-only; empirical accuracy null. CI and deterministic fixtures verify engineering behavior only; they do not establish pronunciation accuracy.
- Human/research blockers remain: approve the versioned IPA convention; recruit two qualified independent annotators and a separate adjudicator; establish blinded intake; verify source-specific data rights; collect and adjudicate a profile-specific pilot; complete deployed-site manual keyboard, screen-reader, responsive and mobile QA.
- No gold labels, source-derived IPA guesses, phonological rules, or benchmark scores were created in this checkpoint.


## Upstream methodology reference refresh — 2026-11-03

- `obra/superpowers` current `main` remains `2ce8aa15d05bd57213e6f746f953aafb7ded7a8b`, release v7.0.1. The current upstream change set includes explicit safety around refusing to delete worktrees with untracked work, evidence re-reading rather than test reruns, bounded/event-driven waits, and more explicit review/finish accounting. Project AGENTS.md retains the relevant scoped principles; the external repository is not a runtime dependency.
- `mattpocock/skills` current `main` is `4ae2317ddb22b046e26455e4f9c9b3aaaf62212d`; the latest commit adds a software-factory glossary and example runs. The release reference remains v1.3.2 at `d1478fcb140db0b93c0c8df17bcfd311844749d0`; distinguish the immutable release pin from the current-main snapshot.
- `DietrichGebert/ponytail` current `main` is `96608e078b2d5ea607c5c3b8b5a54d1c1fba6846`, release v5.3.3. The post-pin change inspected is a README product/logo addition, not a methodology change; the method reference remains the v5.3.3 release commit `7801d061243d7b753bad0e0b3c057cd250b11755`.
- No upstream skill files were copied into product/runtime code. These are traceable method references only.

## Continuation — held-out IPA benchmark correction (2026-11-03)

- Base `main`: `f506b80744b1f96996e9ecdfb7e03622b152907d`; work branch: `fix/heldout-ipa-benchmark-20261103`.
- Finding: the frozen split manifest existed, but the gold TSV export discarded split identity and the scorer included all adjudicated rows. This could allow train/dev examples into a purported independent evaluation.
- Implemented: export now requires a frozen assignment and emits `split`; the gold TSV header includes the field; benchmark validation requires a valid split, defaults to `test`, and supports explicit `--split train|dev|all` for non-held-out diagnostics. Reports identify the selected split and distinguish all adjudicated rows from the scored denominator.
- Exact code/test-head verification: [tests run 41651876020](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41651876020) SUCCESS on `af3ff6c5d3104a45ce5c1524b6083850c6dacd83`, including pytest, npm build, generated web-data check, npm tests and built-site Playwright Chromium tests.
- **IPA-BENCH-SPLIT-001 — DONE_VERIFIED (engineering contract).** Independent expert-adjudicated gold remains 0; `gold.tsv` remains header-only; empirical accuracy remains `null`. No phonetic labels were added.
- Still blocked: two qualified independent annotators, a separate adjudicator, approved IPA convention, controlled blind intake and source-specific rights evidence. Manual visual/keyboard/screen-reader/mobile QA remains TODO.

**Final review:** self-review performed against the complete branch diff and matching implementation across all three repositories (no subagent reviewer is available). The split/export/scoring contract, fail-closed paths, report denominator, tests and docs were inspected; no Critical/Important defect was identified. PR remains open for owner review; no shared-branch merge was performed.

## Frozen split manifest provenance — 2026-11-03

The export and benchmark now preserve and validate the complete frozen split identity, not only the bucket name: `split`, `split_seed`, and `split_version`. Every adjudicated row must carry non-empty seed/version metadata, and the benchmark rejects a TSV that mixes manifest identities. The report exposes the manifest seed/version and selected scoring split. This makes the evaluated test partition traceable to one exact manifest; it does not create linguistic gold or change the current zero-row accuracy status.


## Empty prediction dataset guard — 2026-11-03

A further benchmark review found that a header-only prediction TSV exited successfully and emitted a report with no engine entries. This could be mistaken for a completed evaluation even though no engine had been evaluated. Added a regression test and a fail-closed CLI guard requiring at least one prediction row. The guard runs after gold/split-manifest validation so existing malformed-manifest diagnostics remain specific. This does not change the treatment of missing rows within a named engine: those remain in its denominator. Exact-head verification: RED: [41655173696](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41655173696). Final exact-head tests: [41655504734](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41655504734) SUCCESS. The benchmark guard is DONE_VERIFIED as an engineering input-integrity check; no gold rows or accuracy claims were added.


## Continuation — whitespace-only benchmark identifiers (2026-11-03)

A code review found that truthiness-only identifier checks accepted whitespace-only gold IDs, prediction IDs and engine names. Such values could create visually empty keys and make malformed prediction rows look like a named engine. Validation now rejects identifiers whose trimmed value is empty while preserving non-empty identifiers verbatim for exact matching. Regression tests cover each field separately.

- Test-first RED for whitespace-only gold IDs: [workflow run 41660769932](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41660769932) FAILED on the new regression as expected.
- Test-first RED for prediction engine/ID fields: [workflow run 41662075069](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41662075069).
- Final exact-code-head verification: [workflow run 41662232565](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41662232565) SUCCESS; 152 Python tests + 54 subtests; 54 built-site browser tests passed.
- Verified implementation commit: `7d6a5a5f207a7e6040c632032f18d6acc303234a`; exact-code-head CI [workflow run 41662232565](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41662232565) SUCCESS.
- **IPA-BENCH-IDENTIFIERS-001 — DONE_VERIFIED (engineering input-integrity guard).** No linguistic labels, gold records or accuracy claims were added.

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


## One-pass continuation checkpoint — 2026-11-04

- Current default branch: `main`; verified head `21b7160342423cce4cf844485e15452457b11386` (latest commit after PR #114).
- Open PR query on 2026-11-04 returned none. Latest relevant merges: #108–#114. These register the Burmese Wiktionary snapshot, correct and separate the dataset-card and Myanmar Wiktionary policy claims, and reconcile the post-merge evidence.
- Exact-head hosted verification for PR #111: tests 41797849174 SUCCESS; optional Epitran raw-output benchmark 41797849167 SUCCESS. PRs #112–#114 are documentation-only reconciliation. The current main combined-status endpoint returned no status entries; this is not evidence of a failed or successful main push run.
- Preserved evidence boundary: the Wiktionary snapshot reports 22,191 word–POS rows, 20,759 headwords and only 113 IPA values (0.51%); MLCTS coverage is not IPA coverage. The dataset card's CC BY 4.0 conflicts with the upstream Myanmar Wiktionary policy's CC BY-SA 3.0 Unported/GFDL terms. Rights remain **CONFLICT/UNKNOWN**; no rows or IPA labels were imported.
- Task ledger: source claim separation, provenance and regression coverage **DONE_VERIFIED**; independent adjudicated Burmese IPA gold **BLOCKED** (0 records; gold export header-only; accuracy null); specialist approval of IPA/tone/register convention, two independent annotators, separate adjudicator, item-level rights and blind intake **BLOCKED**; full vowel/coda/checked-syllable/tone/phonation/contextual allophony and MLCTS crosswalk remain **PARTIAL**; manual keyboard/screen-reader/mobile QA **TODO**.
- Do not treat MLCTS, Epitran, Goruut, Wiktionary's sparse IPA, or model output as project gold. No phonology or Ukrainian mapping rules changed in the latest source-evidence merges.
- The initial checkpoint commit was documentation-only; a subsequent test-only change now uses Burmese script and a neutral test profile in the IPA-corpus fixtures. Hosted CI results for the final head are recorded separately; local tests were not run in this connector session. Hosted CI evidence above is tied to the exact PR head, not a claim of fresh local verification.


## Hosted verification update — 2026-11-04

- Draft PR #115 exact head `3c7e54150186406dda3bf2033202f9baac84ef55`: Tests run [41844585137](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41844585137) **SUCCESS**.
- The completed job reports success for independent IPA gold corpus structure validation, editable Python package installation and pytest, Node dependency installation, site build, generated-web-data reproducibility, npm tests, Chromium installation and browser tests against the built site.
- This verifies the docs-only PR head and the repository's current CI contract. It does not resolve the Burmese Wiktionary rights conflict, establish phonological accuracy, or create missing IPA gold; the evidence and expert-review blockers above remain unchanged.


## Test-fixture correction — 2026-11-04

- Review found that the shared IPA-corpus validator test file used Lao orthography and a Lao-specific profile description even in the Khmer and Burmese repositories. This did not affect production validation, but made the fixtures misleading and weakened language-specific test coverage.
- The test fixtures now use the repository's script (Lao / Khmer / Myanmar), neutral `test-<language>` profile identifiers and `Test fixture (<language>)` variety labels. A regression test asserts the fixture characters fall within the corresponding Unicode block and that profile metadata matches the repository language.
- This is a test-harness correction only. It does not validate language phonology, IPA correctness, or script-specific parser behavior; the production validator still intentionally validates corpus structure rather than imposing a single script restriction on all orthographic records.


## Final test-fixture PR verification — 2026-11-04

- Test and handoff changes were present at head `75577df557671c5c0c275e2c65ca20582aeb2a01` when the following hosted checks completed: Tests [41847155216](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41847155216) **SUCCESS**.
- The successful checks include the language-specific IPA-corpus fixture regression, repository data validation, language-specific Python test suite, web build/reproducibility checks and Chromium browser checks where configured.
- Exact job steps were inspected; every reported step completed with `success`. These are engineering/structural checks, not a linguistic accuracy benchmark. No local tests were run in this connector session.


## Burmese external source research continuation — 2026-11-04

- Created `research/burmese-open-pronunciation-evidence-20261104` from current main `11c4d4d73bc478c9d07ce7bfe3a3477327790445`.
- Pinned and reviewed upstream myG2P at `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`; confirmed Version 2.0's five-field file includes an IPA field and is explicitly CC BY-NC-SA 4.0. Registered source `MYG2P2026` and documentary claim `CLM-MYG2P-001`.
- Historical registry note: OPENSLR80 remains registered for audit provenance only and is excluded from active text-only research; no data or recordings are accessed.
- Added source-provenance regression tests to `tests/test_source_rule_evidence.py`, and updated the external corpus triage and linguistic completion register.
- No dictionary/audio data copied. The existing myG2P probe remains test-only; the new source audit does not authorize production use, commercial redistribution, or treating myG2P outputs as project gold.
- Independent adjudicated Burmese IPA gold remains 0; accuracy remains null. Hosted CI pending; no local test execution was available in this connector session.


## Final Burmese external-source PR verification — 2026-11-04

- Current PR #116 head at verification: `7e77d271274aef3c1b9eb6404689562d6f02ad03`.
- Repository tests: [41850851191](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41850851191) **SUCCESS**.
- Optional Epitran raw-output / pinned comparator workflow: [41850850898](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41850850898) **SUCCESS**, including both raw-output and CRF-baseline jobs. This is diagnostic reproducibility only; it does not validate IPA accuracy or create gold.
- The tests verify the pinned myG2P artifact blob SHA, five-field IPA-bearing format, CC BY-NC-SA 4.0 status, OpenSLR CC BY-SA 4.0 source record and documentary claim linkage.
- All source data remain external; no new runtime integration or production permission was added. Independent adjudicated Burmese IPA gold remains 0; empirical accuracy remains null.
- No local tests were run; exact hosted jobs and step conclusions were inspected.


## IPA gold release-gate profile consistency — 2026-11-04

- Found a concrete gap in the shared `scripts/ipa_gold_corpus.py`: the release gate checked adjudicated-record counts, frozen splits and source redistribution rights, but did not enforce the playbooks' one-target-profile / one-IPA-convention requirement. A mixed-variety or mixed-kind corpus could therefore pass the numeric/rights gate and be scored as one benchmark.
- Added regression tests first for mixed profile and mixed IPA kind in each of the three repositories. The first Lao test run failed on both new cases as expected; after adjusting the fixture to populate all three deterministic split buckets, the regression remained targeted. The Khmer and Burmese exact-head runs subsequently passed; final run IDs and merge evidence are recorded below.
- Added shared gate checks for consistent target profile (`profile.id`, `variety`, `region`, `register`) and one adjudicated IPA kind. Speaker/audio identifiers are not part of the active text-only acceptance path.
- Updated the corpus documentation and completion register. The checks do not replace approved convention sheets, human reviewer qualifications, blind annotation evidence, or language-specific contrast-coverage reports. The gate still does not calculate contrast coverage from free-text phonological metadata.
- No IPA labels, pronunciation rules, Ukrainian mappings, source data, or benchmark scores were added. Independent adjudicated gold remains 0 in all three projects.


## Final release-gate profile guard verification — 2026-11-04

- TDD RED evidence on the pre-fix implementation: Lao [41868595591](https://github.com/ClippyFirst/Lao-Ukrainian-Phonetic-System/actions/runs/41868595591), Khmer [41868607839](https://github.com/ClippyFirst/Khmer-Ukrainian-Phonetic-System-/actions/runs/41868607839), and Burmese [41868623352](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41868623352). In each repository both new regression cases failed because the old CLI returned `{"release_ready": true, ...}` for a corpus deliberately mixing target profiles and/or IPA kinds despite meeting train/dev/test minimums.
- GREEN after the shared validator fix:
  - Lao Verify [41868752376](https://github.com/ClippyFirst/Lao-Ukrainian-Phonetic-System/actions/runs/41868752376) **SUCCESS**; 172 Python tests and 4 browser tests passed; data/evidence audit, optional G2P CLI, generated-data reproducibility and Chromium built-site checks also passed.
  - Khmer Quality [41868942150](https://github.com/ClippyFirst/Khmer-Ukrainian-Phonetic-System-/actions/runs/41868942150) **SUCCESS**; 176 tests and 60 subtests passed, plus browser runtime contract and site build checks.
  - Burmese tests [41868956132](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41868956132) **SUCCESS**; 167 tests and 64 subtests passed, generated web data stayed current, npm tests and 54 built-site browser tests passed.
- Final documentation/register/handoff commits also passed their subsequent push CI: Lao [41869194865](https://github.com/ClippyFirst/Lao-Ukrainian-Phonetic-System/actions/runs/41869194865), Khmer [41869262079](https://github.com/ClippyFirst/Khmer-Ukrainian-Phonetic-System-/actions/runs/41869262079), and Burmese [41869342234](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41869342234). Exact final PR-head runs are tracked in the PRs.
- The Burmese execution status matrix was updated in the same branch. Lao and Khmer have no separate execution-matrix file; their canonical handoff and linguistic completion register were updated.
- This verifies an engineering fail-closed guard only. The CLI still does not calculate language-specific contrast coverage, and human convention approval, blind workflow evidence, expert adjudication and rights review remain required. No linguistic data or rules changed.
- No local checkout/tests were available in this connector session; all test claims above refer to inspected hosted GitHub Actions logs.


## Mainline merge verification — IPA gold release-profile guard — 2026-11-04

- PR #117 merged to `main` as `085ce5a2da4a07dfbf606a9892c78a4d3bbb9d91`; current main was confirmed at the same SHA immediately after merge.
- Exact PR-head verification: [41870132273](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870132273) **SUCCESS** (168 tests; 64 subtests; 54 built-site browser tests).
- Post-merge tests [41870579420](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579420) **SUCCESS** and Pages [41870579398](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579398) **SUCCESS**.
- The branch was based on latest main with zero commits behind at merge; no conflicting PRs were present. The exact diff was reviewed and merged with an expected-head SHA guard.
- The release guard is now on main. Independent expert-adjudicated gold remains 0; this work does not establish phonetic accuracy or benchmark readiness.


## Expert recruitment lead revalidation — 2026-11-04

- Branch: `research/expert-recruitment-leads-20261104`, based on main immediately before this research pass.
- Rechecked official institutional and publication sources for prospective expert reviewers/referral routes; appended a dated, qualification-limited section to `docs/ipa-gold-collection-playbook.md` and added `BURMESE-IPA-GOLD-RECRUITMENT-LEADS-001` to the existing completion register.
- Candidate fit is limited to the evidence actually published: no availability, willingness, native target-variety competence, role independence or consent is inferred. No one was contacted. Public institutional emails are included only where published by the institution/research journal.
- The pilot remains blocked on actual recruitment, versioned convention approval, two independent target-variety annotators, separate adjudicator, non-annotating curator, source/item rights and secure blind intake. No IPA labels or gold data were added.
- Hosted CI pending for this branch; no local checkout/tests were available in this connector session.


## Final expert-lead research PR verification — 2026-11-04

- Exact PR head: `e56d4f4ea8692fded1e074cc74bc0d0725104c90`; Tests [41872785717](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41872785717) **SUCCESS**. Inspected steps: IPA corpus structure, editable Python install, pytest, Node install, production build, generated-data freshness, npm tests and built-site Chromium browser tests all passed.
- The update only improves recruitment evidence. No recruitment, IPA labels, gold data or production phonology changed.
- No local checkout or local tests were available; these results refer only to the hosted GitHub Actions runs linked above.
- The human pilot remains blocked on actual invitations/consent, approved versioned IPA convention, two qualified independent target-variety annotators, separate adjudicator, curator, item-level rights and secure blind intake.


## Agent completion-methodology update — 2026-11-04

- Added the missing Unlazy completion-gate discipline to `AGENTS.md`, pinned to upstream `Leonxlnx/unlazy@16671491f6679ad9378f52604d3bc2415b4120c7`. The update adopts observable acceptance items, evidence-bound manual gates, exact-final-commit re-verification, scoped task decomposition and explicit non-successful handoff for blockers.
- Kept the existing master handoff/status vocabulary and GitHub Actions as canonical. No second ledger framework, Unlazy checker/hooks, runtime dependency, or linguistic behavior was introduced.
- Also retained the existing Superpowers, Matt Pocock and Ponytail methodology references. Their use is constrained by project-specific IPA, source-rights, privacy and fail-closed requirements.
- Documentation PR: #119. Exact-head CI evidence: 41876124400 (Tests SUCCESS). The PR has been merged to main; post-merge workflow/deployment checks are still being observed where applicable.
- This is an engineering-process improvement only. It does not resolve the external blockers: expert recruitment and approved IPA conventions, independent adjudicated gold, item-level redistribution rights, and controlled blind annotation intake. No people were contacted and no IPA labels or corpus data were added.

## Deterministic rule-engine replacement — 2026-11-11

- Replaced provider consensus with RuleBasedBurmeseEngine in src/burmese_ukrainian/rule_engine.py; legacy HybridBurmeseEngine is a compatibility alias only. No model voting, provider injection, network calls, Google WFST or myG2P in the active phonetic runtime.
- Runtime path: Myanmar NFC normalization → structural parsing → repository onset/medial/rime rules → IPA only for supported syllables; incomplete output is explicitly PARTIAL. MLCTS stays isolated in its orthographic mode.
- Website copy and methodology page now state the deterministic local rule path and link to docs/DETERMINISTIC-RULE-ENGINE.md.
- PR [#128](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/128) merged to main as `cd3a1503e79d32b09a6d2d5206340a37cfd3283b` from branch release/deterministic-rule-engine-2026-11-11. Exact main tests [43018103155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103155) and Pages deployment + post-deploy asset smoke [43018103391](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103391) both SUCCESS: pytest, npm build, generated-data check, npm test and built-browser Playwright all passed.
- Published service: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/
- Engineering task DONE_VERIFIED; linguistic coverage remains PARTIAL/PROPOSED. Determinism is verified; unsupported coda, tone/phonation and other incomplete rules still require expert-adjudicated Yangon gold.

## Final deterministic-engine verification — 2026-11-11

- Post-merge hardening on main head `9bece0a50a367f3f58336d2aba7016ac4af86156`: legacy factory rejects external provider injection; the trace field is explicitly a processing-stage list, not an invented evidence-rule ID.
- Exact-head tests [43019216137](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216137) and Pages deployment + asset smoke [43019216297](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216297) both SUCCESS; Python tests, npm build, generated-data drift check, npm tests and built-browser Playwright passed.
- Live service: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/. MLCTS remains a separate orthographic mode; no external G2P/model participates in phonetic runtime.
- Remaining linguistic acceptance: independent adjudicated Yangon IPA gold and broader tone/phonation/coda coverage; no blanket accuracy claim.


## 2026-11-11 continuation — Ukrainian practical transcription

### Repository state
- Starting default-branch SHA: `fab39881259df94be93634088a75667a13059cfc`.
- Current final verification branch: `feat/burmese-ukrainian-practical-adapter-verified-final-2026-11-11`.
- Browser fail-closed implementation code SHA: `e9bd12819ed692d7be2607356008217de9430dca`. Subsequent commits update only handoff/matrix/register documentation; the live PR head is authoritative for the latest documentation commit.
- Draft PR [#133](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/133), open, not merged.
- Earlier drafts #129, #130, #131 and #132 are superseded/closed as appropriate; their branches are retained.
- Main was not modified; no site deployment or publication occurred.

### Implemented
- Added `src/burmese_ukrainian/practical.py` as the Python whole-IPA → Ukrainian adapter. `RuleBasedBurmeseEngine` invokes it after IPA derivation and concatenates per-syllable Ukrainian spellings into a word while preserving IPA syllable boundaries and per-syllable trace.
- Added `src/web/ukrainian-adapter.js` for browser rendering, backed by generated data from `data/burmese/ukrainian_practical.csv` and `data/burmese/practical_rules.csv`.
- Added fail-closed handling for unknown IPA, and browser-side withholding of IPA/Ukrainian output for medials, conjuncts and kinzi until those structures have fully supported phonetic rules. Structural parsing remains available.
- Target conventions: /h, ɦ/ → г; /ɡ/ (ASCII /g/) → ґ as a contrast-preserving project choice; /x/ → х; /w/ → в; /t͡s, d͡z, t͡ʃ, d͡ʒ/ → ц, дз, ч, дж; /tɕ, dʑ/ → ч, дж as approximations; aspiration is represented with a project apostrophe; syllable-initial /j/ uses Ukrainian yotated spellings where transparent.
- Tone and length remain in IPA/prosody trace and are not converted into Ukrainian stress or vowel doubling.
- Restored the complete pre-existing source registry before adding/pinning the official Ukrainian Orthography 2026 source; no pre-existing source IDs were intentionally discarded.
- Russian practical transcription remains a comparator only. The Russian /h/ → х and aspiration conventions are not copied.
- Text-only work; no audio corpus was used.

### Verification evidence and limits
- Previous code revision `530cefbfc874b777650bd7e7ccdb5888534ab348`, workflow [43094695944](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43094695944): Python tests (180 tests + 66 subtests), package build, generated-data freshness and Node tests passed. The Playwright browser step failed on two assertions: stale page copy and a kinzi-bearing syllable receiving a practical rendering.
- Both browser issues were corrected on the current branch: page copy now reflects the target policy, and the browser parser withholds unsupported kinzi/medial/conjunct structures consistently with Python. Regression coverage was added.
- Final branch workflow [43095578672](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43095578672) is still `queued` with zero jobs started. Therefore the final browser/Playwright correction is implemented but not yet CI-verified; do not report the final browser suite as passed.
- No independent adjudicated Burmese IPA/Ukrainian gold set exists. Passing code tests do not establish phonetic accuracy.

### Task ledger
| Work item | Status | Evidence / acceptance |
|---|---|---|
| Python IPA → Ukrainian adapter and deterministic engine integration | DONE_VERIFIED | Previous revision Python suite: 180 tests + 66 subtests; engine retains IPA boundary and syllable trace |
| Canonical CSV correspondence/rule data and generated browser data | DONE_VERIFIED | Previous revision generated-data freshness, package build and Node tests passed; source registry preserved |
| Browser adapter with longest-match affricates and contextual /j/ | PARTIAL | Implemented; final Playwright run is queued and has not started |
| Browser fail-closed handling for kinzi, medials and conjuncts | PARTIAL | Code and regression assertion added; final browser acceptance remains pending |
| Empirical validity of Ukrainian target correspondences | PARTIAL | Explicit proposed mapping policy; independent adjudicated target gold is absent |
| Final browser CI | BLOCKED | GitHub Actions run 43095578672 remains queued with no jobs; acceptance: complete green browser suite on current PR head |
| Independent text-only Burmese IPA/Ukrainian gold set | BLOCKED | Requires sourced IPA labels with dialect/profile provenance and independent adjudication; acceptance: held-out set, annotation/adjudication record, PER/CER, coverage and abstention report |
| Audio validation | DEFERRED | Explicitly outside current text-only task |

### Next genuine blockers
1. Wait for GitHub Actions to start and complete run 43095578672; fix any remaining failures and rerun.
2. Build an independent text-only Yangon Burmese IPA/Ukrainian adjudication set before making accuracy claims.


## Verification refresh — 2026-11-11

- PR #133 is the authoritative continuation branch and remains open/draft and unmerged. Consult its live head for the latest documentation revision. Main remains unchanged at `fab39881259df94be93634088a75667a13059cfc`.
- The executable browser adapter and fail-closed parser code are unchanged after code SHA `e9bd12819ed692d7be2607356008217de9430dca`; later commits update README, matrix, completion register and handoff only.
- Latest exact-head workflow at this handoff snapshot [43095883419](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43095883419) was queued with no jobs started; later documentation-only commits triggered another exact-head run. Consult PR #133 for the current run. Do not report the final Playwright suite as verified until this run completes successfully.
- The text-only task does not require audio. A separate text IPA/Ukrainian adjudication set remains blocked by missing independently sourced and adjudicated labels; this blocks empirical accuracy claims, not the deterministic target adapter implementation.
- Audio annotation is DEFERRED by scope. No source IPA labels, gold corpus rows or accuracy scores were invented or added.


## Provisional grapheme IPA fallback — continuation 2026-11-11

- Added `docs/provisional-grapheme-ipa-fallback.md` defining the Lao-style `PROVISIONAL` grapheme → IPA → existing Ukrainian adapter contract, visible `?` uncertainty, Python/browser parity and benchmark separation.
- This is a design/acceptance document only, not an implementation claim. Current Burmese parser/practical adapter still withholds unsupported constructions. Implementation is BLOCKED pending a source-backed, Yangon-profile positional grapheme-to-IPA inventory; onset hints must not be reused as coda/vowel/medial/kinzi readings.


## Provisional onset fallback implementation — 2026-11-11

- Python and browser now expose a separate PROVISIONAL onset-only IPA preview for unresolved syllables where the existing Yangon onset inventory has an IPA value.
- The existing IPA → Ukrainian adapter renders the hint; ? marks the unresolved rime/structure. Canonical ipa/ukrainian remain withheld.
- No vowel, coda/asat realization, medial, kinzi, conjunct, tone or phonation is inferred.
- Python regression and browser source-contract regression were added.
- Status: PARTIAL. Dedicated Yangon-profile source registry, executed browser parity fixtures, exact-head CI and Chromium verification remain outstanding.
- Exact head at this update: 36b6ebf5a1d5a03b0c4d7a95aae2d842046e4152. No workflow run was returned for this branch; no tests are recorded as passed.


## Final continuation snapshot — 2026-11-11 23:00 +02:00

- Current PR #133 head: ebc826673868cafec41043411673fa3e618ae866. Draft, open, unmerged. Main baseline remains fab39881259df94be93634088a75667a13059cfc.
- Implemented Python and browser onset-only PROVISIONAL fallback. It uses the existing Yangon onset IPA inventory → existing IPA adapter → Ukrainian text plus ?. Canonical fields remain withheld.
- Exact-head test workflow 43100176432 was queued at the latest check; no job had started. Do not claim test success.
- Local test execution was unavailable: public GitHub clone attempt failed because the execution environment could not resolve github.com. No tests are claimed passed on the new fallback.
- Remaining: execute Python/Node/Chromium tests on the exact head; add functional shared Python/browser fixtures; register each provisional onset with exact written primary-source locator and Yangon-profile scope; expand only where positional evidence is explicit. Independent text-only Yangon adjudicated gold remains BLOCKED.


## Fallback scope clarification — 2026-11-11

The browser onset-only preview is now limited to isolated bare consonant tokens. Contextual structures (vowels, codas/asat, medials, kinzi, conjuncts and prosodic marks) remain on their existing fail-closed path. The preview appears only in per-syllable details; canonical main output is unchanged. Earlier browser regression run 43100176432 failed because the first integration leaked onset-only previews into contextual syllables; the scope fix and a new verification run are in progress.


## Verified implementation result — 2026-11-11

- Code/test head aac1d6834b4c29e04f01477af1583a2be9eba485.
- Workflow 43101914347 PASS: 182 Python tests, 66 subtests, npm install, build, generated-data freshness, Node tests and Chromium Playwright 54/54.
- Optional Epitran raw-output comparator 43101914423 PASS; it is not an independent IPA accuracy gold set.
- Browser keeps canonical IPA/Ukrainian output fail-closed and shows a separate onset-only preview only for isolated bare consonants. Contextual structures remain withheld.
- Linguistic feature remains PARTIAL: dedicated Yangon-profile positional evidence registry and functional shared Python/browser parity fixture remain TODO. Independent text-based adjudicated gold remains BLOCKED.


## MLCTS romanization mainline reconciliation — 2026-11-12

- Current `main`: `718dc4b2c1424651b32bc63b0202f5d08a067bc7`.
- Preserved merged sequence: matrix completion PR #138 (`1d7045d9695d571017633a2e294b718a13ee5bce`); matrix synchronization PR #140 (`91efc36c33fae9d78b663aa35acd91ea801a9998`); runtime adapter PR #141 (`3fa33864b774c716da5bf6c9778a963148fb9974`); post-merge evidence PR #142 (current mainline checkpoint).
- Current-head tests [43228612973](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612973) and Pages [43228612998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612998): SUCCESS.
- Current ledger: target matrix DONE_VERIFIED (35 onset + 94 vendor-rime rows); MLCTS → Ukrainian runtime PARTIAL (adapter integrated for supported onset/rime/medial structures); complete source orthographic matrix PARTIAL (MLC primary source unavailable; unsupported structures withheld); component-level vendor licensing/provenance audit PARTIAL.
- Open draft research PR #129 remains untouched. It is a separate G2P/provider diagnostic integration, not a dependency of the orthographic MLCTS adapter.
- No local checkout was available in this connector-only session; verification cited here is hosted GitHub Actions on exact current `main`. No local pytest/npm/Playwright execution is claimed.


## Burmese MLCTS source-profile reconciliation — 2026-11-12

- Audited the vendored Mya2Rom README and registered `MYA2ROM044` plus the bibliographic/rights locator `MLC1993DICT_BIB` in `data/burmese/sources.csv`.
- Important correction: Mya2Rom documents `mlcts` as the MLC-created orthographic transcription system, while `mlcts2` is a more phonetic modification used by the MLC for its Myanmar-English Dictionary and by SEAlang. The current project explicitly calls the `mlcts` profile; it must not be described as using the dictionary's `mlcts2` output.
- The 1993 MLC *Myanmar-English Dictionary* is bibliographically located, but accessible SHACHI metadata states the source content is copyright 1993 MLC / 1996 Dunwoody Press. The actual primary tables and reuse permission have not been obtained. No table content was copied.
- Mya2Rom README limitations include stacked letters, asat, voicing sandhi, alternate pronunciations and Pali/Sanskrit-derived words. The vendored software is CC BY-SA 4.0 and remains attributed in `vendor/mya2rom/NOTICE.md`.
- No runtime or crosswalk data changed. `MYA-ROM-MATRIX-001` remains PARTIAL; 94 rime keys remain vendor-derived and EVIDENCE_LIMITED pending primary MLC `mlcts` source recovery and row-by-row verification. MLCTS2 is a distinct profile and not a drop-in replacement.
- Evidence: https://github.com/myanmaropenwordnet/mya2rom; https://shachi.org/resources/3949; bibliographic review of the 1993 dictionary: https://doi.org/10.1093/ijl/9.1.52.


## Post-merge closeout — Burmese MLCTS source-profile reconciliation — 2026-11-12

- PR [#144](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/144) merged as `690266b72979df2758e89992e635b2e39ad95196`.
- Added `MLC1993DICT_BIB` and `MYA2ROM044` to `data/burmese/sources.csv`; documented that the project runtime explicitly requests `mlcts` (orthographic), while Mya2Rom documents `mlcts2` as a more phonetic modification used by the MLC Myanmar-English Dictionary and SEAlang.
- The MLC 1993 dictionary is bibliographically located; accessible metadata records copyright in the source material. Original primary tables and reuse permission remain unavailable. No table data was copied.
- Exact PR-head tests [43276549749](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43276549749): **SUCCESS**. Optional diagnostic [43276549453](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43276549453): **SUCCESS** (raw-output comparators only, not gold accuracy).
- Mainline tests [43276744574](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43276744574): **SUCCESS**; Pages deployment and deployed-site/runtime smoke [43276744563](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43276744563): **SUCCESS**; optional diagnostic [43276745850](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43276745850): **SUCCESS**.
- No code or matrix rows changed. `MYA-ROM-MATRIX-001` remains PARTIAL because 94 rime keys are vendor-derived and not checked against the original MLC `mlcts` orthographic specification; Ukrainian candidates remain PROPOSED.
- Current mainline at this checkpoint: `690266b72979df2758e89992e635b2e39ad95196`. Verification is from hosted GitHub Actions; no local checkout/test execution is claimed.




## Burmese web example correction — 2026-11-13

- User-reported input: `ကာ မြန်မာ`. Root cause of the visible numbering gap was UI indexing: preserved whitespace segments were counted as syllables. The blank-looking separator row also lacked a descriptive label.
- PR [#146](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/146) merged as `85dab8bdd08576c1cd112552f68092182bd9a8fa`. Myanmar syllables now receive contiguous numbering; whitespace remains preserved and is labelled without being counted.
- Exact final-head tests [43318947338](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43318947338) SUCCESS: 187 Python tests + 66 subtests, 19 Node tests, 56 Chromium Playwright tests, build and generated-data freshness.
- The IPA/ukrainian abstention for `မြန်` remains unchanged and deliberate: positional medial-ra/rime evidence is not established in the selected Yangon profile. The service must not infer an IPA form merely to avoid a placeholder.
- Pages deployment [43319186954](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43319186954) was triggered after merge and must be checked before confirming the live site has updated. No local test execution is claimed.


## Burmese medial/nasal-coda target note — 2026-11-13

The proposed /ɴ/ → нг target rule is conditional on an IPA analysis that explicitly emits /ɴ/. Green's abstract placeless /N/ and nasalized-vowel realizations must not be routed through this rule without an explicit phonetic conversion decision.


## Nasal coda and IPA schema boundary — 2026-11-13

- Added source-backed phonotactic records for Green's placeless /N/ coda and nasal-rhyme tone restrictions.
- The Ukrainian target rule /ɴ/ → нг is explicitly conditional on the selected IPA analysis producing /ɴ/; it does not automatically apply to abstract /N/ or nasalized vowels.
- The IPA gold schema preserves nasalization in the literal IPA value but has no dedicated typed nasalization field. No schema change was made; consider an optional field only after the expert-approved convention sheet.


## UCSY-SC1 rights note — 2026-11-13

Historical metadata only: the paper's corpus description remains in the audit trail, but UCSY-SC1 is excluded from active text-only scope; no access or rights work is planned.


## Final one-pass verification — 2026-11-13

- Base/default-branch starting commit: dc90463bdd734867308f03cb627eb8941efc19d6.
- Latest code/data-bearing research head: 826601139fd73a5152b6b37a5ed3574f3fca18a5.
- Dedicated branch: research/burmese-medials-g2p-evidence-2026-11-13.
- Draft PR: #147. It is intentionally not merged while independent linguistic adjudication remains absent.
- Required exact-head CI 43327571175 SUCCESS: 201 Python tests + 66 subtests; independent IPA gold schema validation; npm build; generated web-data freshness; 19 Node tests; 58 Chromium/Playwright tests.
- Optional raw comparator/CRF workflow 43327570809 SUCCESS. Outputs remain non-gold and accuracy remains null.
- Intermediate CI failures were fixed and rerun: 43324492175 exposed Python coda segmentation and matrix CSV issues; 43326933757 exposed a temporary practical_rules.csv path-mapping overwrite during documentation work. The table was restored from main, the conditional /ɴ/ note reapplied, and the final required CI passed.
- No runtime medial IPA rule was enabled. The structural coda fix is verified; phonological coverage remains PARTIAL.
- Independent expert-adjudicated IPA gold for the medial/coda cells: 0. Empirical accuracy: null.
- PR #129 remains open/draft and untouched as a code branch (53 commits ahead / 17 behind current main, non-mergeable); its source-backed research findings were reconciled into this branch, but its broad hybrid-engine code was not ported.
- Release assessment: PARTIAL PROTOTYPE, not linguistically release-ready. Research dossier is ready for specialist review and data-rights resolution.


## Mya2Rom mode contract — 2026-11-13

- Mya2Rom 0.4.4 exposes ipa, mlcts, mlcts2, simple and simple2; MLCTS is orthographic, MLCTS2 is more phonetic romanization but not standardized IPA.
- The project browser adapter explicitly calls mya2rom(unit.raw, "mlcts", ...). A regression test now locks this mode.
- Keep Latin→Ukrainian transliteration separate from source phonology → IPA → Ukrainian adaptation. The upstream README documents stacking, ASAT, schwa, voicing-sandhi and alternate-pronunciation limitations; its IPA convention uses /N/ instead of nasalized vowels.


## Final exact-head verification — 2026-11-13

- Starting default-branch commit: dc90463bdd734867308f03cb627eb8941efc19d6.
- Latest code/data-bearing research head: fef242e4d4cc978823e4133f65abe48224355c13.
- Dedicated branch: research/burmese-medials-g2p-evidence-2026-11-13; draft PR #147 is open and not merged.
- Required exact-head CI 43328423650 SUCCESS: 201 Python tests + 66 subtests; independent IPA gold schema validation; npm build; generated web-data freshness; 20 Node tests; 58 Chromium/Playwright tests. The new Node regression asserts that the romanization adapter explicitly requests MLCTS, not MLCTS2 or IPA.
- Optional raw comparator/CRF workflow 43328423664 SUCCESS. These artifacts remain non-gold; no accuracy is reported.
- Intermediate CI failures were fixed and rerun: 43324492175 exposed Python coda segmentation and matrix CSV issues; 43326933757 exposed a temporary practical_rules.csv path-mapping overwrite during documentation work. The table was restored from main, the conditional /ɴ/ note reapplied, and final exact-head CI passed.
- Structural coda parsing is verified: မြန် is one syllable; မြန်မာ is two; ကတ် retains final consonant + ASAT. Browser/Python tests pass.
- No runtime medial IPA rule was enabled. Independent expert-adjudicated IPA gold for the medial/coda cells remains 0; empirical accuracy remains null.
- PR #129 remains open/draft and untouched as a code branch (53 commits ahead / 17 behind current main, non-mergeable); its source-backed research findings were reconciled here, but its broad hybrid-engine code was not ported.
- UCSY-SC1 remains a historical metadata record only; it is excluded from active text-only research and is not a blocker.
- Release assessment: PARTIAL PROTOTYPE, not linguistically release-ready. The research dossier is ready for specialist review and data-rights resolution.

## Text-only Burmese research continuation — 2026-11-13

User direction: **use text sources only; do not use audio**. This is the active scope for future research and implementation. Do not acquire, inspect, process, annotate or request recordings. Historical SLR80/UCSY-SC1 notes are retained only as prior audit history and must not be turned into next-step tasks.

Newly registered text resources:
- MYX_MYANGLISH_2026: 2,121 Burmese Unicode ↔ Myanglish text pairs. Potential informal romanization diagnostic only. Its own documentation warns that Myanglish is non-standard and predominantly reflects one author's style; the viewer shows three columns while the README schema describes two. CC BY-SA 4.0 is declared. Not IPA gold; no rows imported.
- MYX_ORTHO_2026: 4,800-row orthographic correction corpus. "phonetic" in filenames/categories means spelling confusion, not IPA. Future medial contrasts are roadmap items, not present validated evidence. CC BY-SA 4.0 is declared. No rows imported.
- OKELL_TEXT_2018: John Okell's 8.8 MB text corpus compiled in the 1990s. ELG lists CC BY 4.0, but Zenodo's Rights/License field is blank; blocked from ingestion pending direct rights reconciliation.

Acceptance boundaries: preserve distinct orthographic MLCTS, informal Myanglish, IPA and Ukrainian adaptation fields. Never treat romanized text as IPA without an explicit convention and independent linguistic evidence. Before any import, pin exact dataset revision/hash, reconcile schema, inspect row-level quality and license obligations, and add source-to-claim-to-test provenance. No runtime medial rules are authorized by these resources alone.

Current linguistic status remains unchanged: independent expert-adjudicated IPA gold = 0; empirical accuracy = null; medial/coda IPA rules remain withheld; release status = PARTIAL PROTOTYPE.

## Historical Burmese medial evidence — 2026-11-13

New text-only source: STEDT Monograph 3 (Namkung, ed., 1996), pp.61-66, which compiles three distinct Burmese source profiles. The Written Burmese inventory cites Benedict 1976 and treats /-w-/ as rhyme material while /-y-/ and /-r-/ are initial-cluster components. The Rangoon entries cite Burling 1967 and Roop 1972 and list /-y-/ and /-w-/ medials with source-specific distribution restrictions; Roop says /r/ appears only in borrowings.

Do not merge these into one universal rule or equate the historical notation directly with modern Unicode U+103B/U+103C/U+103D. New source claims, matrix rows, evidence-only rules and tests are registered. Both rows remain WITHHELD. The STEDT book is marked All Rights Reserved; no tables or lexical data were copied. Current Yangon runtime and IPA outputs are unchanged.

## Written Burmese historical-medial reconciliation — 2026-11-13

Nishi (1997) distinguishes OWB, MWB, EModWB and ModWB spelling standards. OWB medial -l- was replaced by MWB -r-/-v- depending on initial context; EModWB inserted -y- after k-/kh- before written -i, reflecting a phonemic change. Nishi explicitly separates Written Burmese H from spoken Burmese L and warns that their phonological systems and historical periods are not identical.

Matisoff (2003, pp.56,70-71) describes historical WB *-r- > Modern Burmese -y- and explains why Written Burmese is not reliable for reconstructing the distinction among proto *-r-, *-l- and *-y-. Orthographic spellings can shift or vacillate across periods.

New source claims, matrix rows, evidence-only rules and tests are registered. All new historical rows remain WITHHELD; they are not modern Unicode-to-IPA rules. The full Nishi 1976 "Medials in Burmese" chapter is still a source-access target; only bibliographic records and later secondary citations are currently verified.

## Contextual Burmese voicing research — 2026-11-13

Nishi (1998), *The Development of Voicing Rules in Standard Burmese* (BNME 23(1), pp.253-260; DOI 10.15021/00004129), describes two textually documented voicing-sandhi patterns: optional/exception-rich C1aC2 voicing around atonic /a/, and voicing of eligible initials after non-stop tonal rhymes in close juncture within words or phrases with postpositions. The paper warns that "Standard Burmese" is not a well-defined variety and documents differences across regional dialects. It also reports that the Myanmar-English Dictionary (1993) reflects the second rule in its lexical phonemic transcriptions.

The source, three claims, two analysis-dependent rule records and a provenance test are registered. Neither rule is enabled globally. Next acceptance step: select the target spoken profile and reconcile Nishi's descriptions with accessible written dictionary examples and Okell's text grammar. No audio is used.

## Hill (2019) full-text access target — 2026-11-13

Cambridge University Press confirms Nathan W. Hill, *The Historical Phonology of Tibetan, Burmese, and Chinese*, chapter 2 "Burmese", pp.46-83, DOI 10.1017/9781316550939.003. Only a short publisher preview was accessible; no medial-specific claim is made from it. The source and bibliographic/access claim are registered. Next research gate: obtain authorized full-text access, inspect Old Burmese medial clusters and written-to-spoken developments, and add only source-located claims. Do not infer content from the title or preview.

## Verified continuation checkpoint — 2026-11-13

### Repository state
- Default branch: main, starting base SHA dc90463bdd734867308f03cb627eb8941efc19d6.
- Existing research branch at start of this continuation: research/burmese-medials-g2p-evidence-2026-11-13, starting head 5e49b2d13506d32606050b10a43972d998cd6539.
- Verified code/data head before this checkpoint: 4145126ec65b834df96fc7ed57749a719daa27c2.
- PR #147 remains OPEN / DRAFT and mergeable; at the last comparison it was 66 commits ahead, 0 behind, with 25 changed files. It has not been merged.
- PR #129 remains untouched; its broad hybrid implementation was not ported or merged.

### Verification on exact head 4145126ec65b834df96fc7ed57749a719daa27c2
Main CI run 43389272448: SUCCESS.
- Independent IPA gold structure validation: SUCCESS.
- Python: 206 passed, 66 subtests passed.
- npm build: SUCCESS.
- Generated web data freshness check: SUCCESS.
- Node tests: 20 passed, 0 failed.
- Playwright/Chromium browser tests: 58 passed.
Optional diagnostic workflow 43389279081: SUCCESS.
- CRF diagnostic: 100 inputs, 100 predictions, 84 source-concordant; gold_count=0, accuracy=null, scoring status NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. This is not an accuracy result.
- Epitran 1.35.3 raw-output artifact generated; no gold comparison or accuracy claim.
Manual registry integrity check: 51 source rows, 55 claim rows, 28 medial-evidence rows, 19 phonological-rule rows; all CSV row widths valid, IDs unique, all claim→source and rule→claim→source links resolve. No registry integrity issues found.

### Commands executed by the verified GitHub Actions workflow
- pip install -e ".[test]"
- pytest
- npm install
- npm run build
- generated web data freshness validation
- npm test (generate:web plus Node test suite)
- npx playwright install --with-deps chromium
- npm run test:browser:built
- independent IPA gold corpus structure validation

No local repository checkout or local shell test run was performed in this session; verification above is from the exact-head GitHub Actions run. Earlier intermediate CI failures caught a medial-matrix CSV field alignment issue and test assertion wording/case mismatches; those were corrected before the successful exact-head run.

### Scope and release boundary
- Text-only research is the active user-directed scope. Legacy SLR80/UCSY-SC1 entries are historical metadata only and are DEFERRED / OUT OF SCOPE. No audio was acquired, inspected, processed, annotated or used.
- No new corpus rows were imported; no runtime medial mapping or contextual voicing rule was enabled.
- Independent text-adjudicated IPA gold remains 0; empirical accuracy remains null. The project remains a PARTIAL PROTOTYPE, not release-ready.

### Remaining evidence/access gates
1. Obtain authorized full text of Nishi (1976), “Medials in Burmese”, and Hill (2019), chapter 2; add claims only with exact locators.
2. Reconcile historical Written Burmese/Rangoon analyses with modern Yangon orthography and phonology; keep source profiles separate until then.
3. Obtain direct rights clarification for John Okell's text corpus (Zenodo Rights/License blank vs ELG CC BY 4.0).
4. Pin and inspect exact Myanglish/orthography dataset revisions, reconcile schema, manually review text rows and CC BY-SA 4.0 obligations before any import.
5. Build independent expert-reviewed text IPA fixtures from written dictionaries/grammars with one approved broad/narrow convention and source locators. No audio is part of this acceptance path.
6. Resolve the competing tone/register analyses and the abstract /N/ vs surface nasalization representation before enabling affected IPA rules.
7. Continue primary-source verification for the 94 MLCTS rime entries; current vendor-derived coverage is not fully primary-source adjudicated.

## Green 2005 and SEAlang text resources — 2026-11-13

Green's chapter “Word, foot and syllable structure in Burmese” in *Studies in Burmese Linguistics* (2005, pp.1-26) is an openly licensed CC BY-SA 4.0 text source. It explicitly separates broad IPA-style transcription of spoken Burmese from ALA-LC transliteration of Written Burmese; gives the medial transliteration order y, r, l, v, h; describes major-syllable CG onsets and minor-syllable restrictions; and analyzes coda /N/ as nasalization on the preceding vowel. The new source claims, evidence row, evidence-only rules and tests are registered. They do not enable a direct Unicode-medial rule.

SEAlang's MLC-based dictionary (~35,000 entries), Burmese Text Corpus and Bitext Corpus are registered as text-only candidates. The dictionary's actual transcription field is unresolved (SHACHI metadata advertises IPA search/display, while Mya2Rom says MLCTS2 is used by MLC/SEAlang). The text and bitext corpora have no explicit reuse license; reported “contexts/pairs served” are service counts, not verified corpus sizes. No rows were downloaded or imported. Bulk reuse is blocked pending rights and schema verification.

## Final verified snapshot after text-source expansion — 2026-11-13

- Starting default-branch base: main at dc90463bdd734867308f03cb627eb8941efc19d6. Starting continuation branch head: 5e49b2d13506d32606050b10a43972d998cd6539.
- Exact tested code/data head: d2800ce458ea3c08c3fecb9e61ad170502837343.
- PR #147: OPEN / DRAFT, mergeable, 90 commits ahead of main and 0 behind; 25 files changed. Not merged. PR #129 remains untouched.
- Exact-head main CI run 43390071180: SUCCESS — 209 Python tests + 66 subtests; independent IPA-gold schema validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests.
- Exact-head optional diagnostic run 43390071177: SUCCESS. CRF: 100 inputs, 100 predictions, 84 source-concordant, gold_count=0, accuracy=null, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. Epitran raw-output artifact generated; no gold comparison or accuracy claim.
- Registry integrity: 55 source rows, 62 claims, 29 medial evidence rows, 22 phonological rules. CSV widths valid, IDs unique, all claim→source and rule→claim→source links resolve. No integrity issues.
- New text evidence includes Green (2005) broad IPA vs ALA-LC separation, CG onset and /N/ nasalization; Nishi (1997/1998), Matisoff (2003), STEDT (1996); and SEAlang dictionary/text/bitext candidates with unresolved representation/rights gates.
- No audio was acquired, inspected, processed, annotated or used. Legacy non-text source records are historical metadata only and DEFERRED / OUT OF SCOPE. No corpus rows were imported and no runtime medial or contextual voicing rule was enabled.
- No local checkout or local shell test run was performed; verification is from the exact-head GitHub Actions runs. Commands executed by CI: pip install -e ".[test]"; pytest; npm install; npm run build; generated web-data freshness validation; npm test; npx playwright install --with-deps chromium; npm run test:browser:built; independent IPA-gold structure validation.
- Earlier intermediate CI runs caught and corrected evidence-row field alignment and test assertion mismatches. The exact-head run above is successful.

### Final unresolved acceptance gates
1. Authorized full text for Nishi (1976) “Medials in Burmese” and Hill (2019) chapter 2; no claims until exact page/section evidence is inspected.
2. Reconcile historical Written Burmese, Rangoon, and modern Yangon profiles; no direct Unicode-medial mapping from historical notation.
3. Direct rights clarification for John Okell text corpus; Zenodo license field is blank while ELG lists CC BY 4.0.
4. SEAlang dictionary entry inspection to resolve IPA vs MLCTS2 representation; explicit permission for bulk extraction from dictionary/text/bitext resources.
5. Pin Myanglish and orthography dataset revisions/hashes; reconcile schema and manually review rows and CC BY-SA 4.0 obligations before import.
6. Build independent expert-reviewed text IPA fixtures from written dictionaries/grammars with one broad/narrow convention and source locators. Gold remains 0; accuracy remains null.
7. Resolve tone/register competing analyses and abstract /N/ vs surface nasalization before enabling affected rules.
8. Verify the 94 MLCTS rime entries against primary written sources; vendor-derived coverage is not fully adjudicated.

Repository classification: **PARTIAL PROTOTYPE**; research handoff is substantially improved, but linguistic release readiness is not established.

## Final PR-head verification — 2026-11-13

The previous final snapshot recorded 90 commits ahead; the final comparison before this note is 92 commits ahead, 0 behind, 25 changed files. PR #147 is OPEN / DRAFT / mergeable, with no submitted reviews; PR #129 remains OPEN / DRAFT and untouched.

Exact final pre-note head 18b42a7415d3323220d09c0aacf2a17a3c6ff07d passed GitHub Actions run 43390340513: 209 Python tests + 66 subtests; independent IPA-gold structure validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests. Optional CRF/Epitran diagnostics passed on the same code/data tree at d2800ce458ea3c08c3fecb9e61ad170502837343; the two intervening commits were documentation-only.

The active source registry has 55 sources, 62 claims, 29 medial evidence rows and 22 phonological rules. A manual parser verified every CSV row width, unique source/claim IDs and all claim→source and rule→claim→source links. No source rows or phonetic labels were imported. No audio was used. The active project remains a PARTIAL PROTOTYPE; no release or merge was performed.

## Text-only continuation after project-owner permission confirmation — 2026-11-13

### Scope and authorization

The project owner confirms all required permissions for research use and project ingestion of textual resources. Rights are no longer treated as blockers to research processing. Preserve public source metadata and attribution. No audio was acquired, opened, processed, annotated or used; audio remains outside scope.

### New primary-source work

- Inspected full Nishi (1998), “Old Burmese: Toward the History of Burmese” (BNME 23(3), pp.659-692; DOI 10.15021/00004119), and registered source NISHI1998_OLDBURMESE.
- Nishi §1.3 distinguishes historical -h with sonorants (voiceless/aspirated sonorant unit) from true -r/-l/-y/-w clusters called medials. Do not equate historical -h with modern Unicode U+103E.
- Nishi §2.1.1 documents OWB -l- alongside -r/-y/-w, later -l- reflexes after velars/bilabials, and the MB -r-/-y- distinction merging into -y- in Standard EModWB.
- Nishi §4 and Table 3 document the tentative Great Consonantal Shift and cross-dialect cluster reflexes among WB, SB, Arakanese, Tavoyan, Intha and Minor Taungyo. Standard-variety interference, hypercorrection and dialectal variation prevent universal modern mapping.
- Added four claims/rules and 13 Nishi historical/dialect matrix rows; all remain WITHHELD from runtime.
- Nishi's separate 1998 voicing paper states its slash-delimited forms follow Okell 1995 phonemic transcription. Added seven source-attested examples to data/burmese/sandhi_evidence.csv, explicitly NOT IPA; ipa_value is empty.

### External textual corpora

- Project owner permission confirmed for research use and project ingestion.
- Myanglish raw CSV has two columns (myanmar,myanglish), while README metadata/viewer expose a third official_standard feature. This remains schema-uncertain; treat as informal romanization only.
- myX orthography corpus is work-in-progress. Sampled hcara_phonetic.csv has target_words misalignment (ဆျာ→ဆရာ labelled with မင်ရည်/မှင်ရည်); sampled phet_bet rows can contain multiple substitutions. Keep quarantined for quality review and deduplication; not IPA gold.
- At that earlier checkpoint, John Okell's 8.8 MB text corpus, SEAlang dictionary/corpora and Hill (2019) chapter 2 had not been retrieved. The Okell text corpus is now byte-verified and profiled in the 2026-11-13 continuation below; SEAlang records/corpora and the full Hill chapter remain access/schema blockers, not permission blockers. No audio was used.

### Exact verification

- Tested code/data head: 4835a0abc3e7e4a18c9d0bda35f554031912d570.
- GitHub Actions run 43393402710 SUCCESS: 217 Python tests + 66 subtests; IPA-gold structure validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests.
- Two preceding test runs failed on one case-sensitive test assertion only; the assertion was corrected and the exact-head run passed.
- Registry integrity: 55 sources, 71 claims, 42 medial rows, 28 phonological rules, 7 source-phonemic sandhi rows. Manual CSV validation found no malformed widths, duplicate IDs or broken claim/source/rule links.
- No runtime medial or contextual voicing rule enabled. Independent expert-adjudicated IPA gold = 0; empirical accuracy = null.

### Current acceptance gates

1. Obtain and pin Okell corpus bytes; run reproducible Unicode, duplicate, boundary and text-quality profiling.
2. Retrieve SEAlang dictionary/text/bitext records and inspect actual entry representation/schema (IPA vs MLCTS2).
3. Obtain Hill (2019) chapter 2 bytes; inspect exact historical medial sections and record locators.
4. Obtain Nishi (1976) full text; Nishi (1998) is a secondary summary, not a substitute for claiming the 1976 paper was read.
5. Pin and obtain raw Myanglish and myX orthography artifacts; reconcile metadata, deduplicate, and audit row-level target alignment.
6. Build independently adjudicated text IPA fixtures with fixed broad/narrow convention and source locators; gold remains 0.
7. Resolve four-tone vs eight-tone/register analyses and abstract /N/ vs surface nasalization before runtime promotion.
8. Verify the 94 MLCTS rime entries against primary written sources.

Repository remains **PARTIAL PROTOTYPE**, not linguistically release-ready. PR #147 remains a Draft; no merge or release performed.

## Final exact-head handoff — 2026-11-13

- Current PR #147 head: c03706474cf67b480c449790c9592e5fe0e53fd4; branch is 135 commits ahead of main, 0 behind, 28 files changed. PR is OPEN / DRAFT / mergeable; no reviews submitted. PR #129 untouched.
- Exact-head CI 43394274053 SUCCESS: 217 Python tests + 66 subtests; IPA-gold structure validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests.
- Exact-head diagnostics 43394274111 SUCCESS: CRF 100 predictions, 84 source-concordant, gold_count=0, accuracy=null, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran raw-output only.
- Final data registries: 56 sources, 71 claims, 42 medial rows, 28 phonological rules, 7 source-phonemic sandhi cases. CSV widths, unique IDs and all cross-registry links verified.
- Nishi (1998) Old Burmese full text and the separate Nishi (1998) voicing paper are source-registered. Thirteen new historical/dialect medial rows and seven source-phonemic sandhi cases are added and tested; none are project IPA gold or runtime rules.
- Nishi (1976) Medials in Burmese is registered as a primary-source target but remains unread in this execution. Nishi (1998) is explicitly only a secondary summary.
- All required text-only research and project-ingestion permissions are confirmed by the project owner. No audio was used.
- Myanglish remains schema-uncertain (raw 2 columns vs metadata/viewer 3 features); myX orthography remains quarantined for target_words misalignment, multi-substitution examples and template duplication.
- Okell, SEAlang and Hill chapter 2 remain blocked by tool access/schema, not permission. No corpus bytes were imported.
- Independent expert-adjudicated IPA gold = 0; empirical accuracy = null. No runtime medial/voicing promotion. Release classification: PARTIAL PROTOTYPE.


## Okell (1995) dialect medial evidence — 2026-11-13

Full text of John Okell's *Three Burmese Dialects* (Pacific Linguistics A-83, pp.1-138) inspected. It explicitly distinguishes WB from SB (spoken) and compares Arakanese, Intha and Tavoyan against both.
- Arakanese preserves the WB r/y distinction that SB merges in speech; the source's main Arakanese reference is high-prestige Sit-twe speech, not every Arakanese subvariety.
- Intha and Tavoyan have restricted medial /l/ combinations; Tavoyan /-l/ is explicitly absent from SB.
- Dialect text transcriptions are phonemic with limited allophonic approximations, not project IPA gold.
- Added source OKELL1995_THREE_DIALECTS, seven claims, two dialect-dependent rules, three withheld medial rows and regression tests.
- This pass inspected only written text/tables; no audio or recordings were accessed. No Okell regional rule is enabled for Yangon.


## Okell (1969) reference grammar — next text-only source gate

Registered John Okell's *A Reference Grammar of Colloquial Burmese* (two volumes, 498 pp., Oxford University Press, 1969). Bibliographic identity is confirmed by Glottolog and library catalogues. Nishi (1998) cites §§17-20 for voicing sandhi; Okell (1995) identifies it as the Spoken Burmese reference. Project owner confirms research-use permission. Full text was not retrieved in this run; obtain the text and inspect exact phonology/sandhi pages before attributing any new claims or considering runtime rules.


## Consolidated verified handoff — 2026-11-13

Exact tested code/data head 2a96f4121a43f704a8f0d2eb6d81cb343fba47db passed main CI 43395906072: 219 Python tests + 66 subtests, IPA-gold structure validation, npm build, generated-data freshness, 20 Node tests and 58 Playwright/Chromium tests. Optional diagnostics 43395906100 passed: CRF 100 predictions / 84 source-concordant / zero gold / null accuracy / NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran raw output only.

Final registries: 58 sources, 78 claims, 45 medial evidence rows, 30 phonological rules, 7 source-phonemic sandhi examples. Manual CSV integrity and traceability validation passed.

New full-text source work includes Nishi (1998) Old Burmese and Okell (1995) Three Burmese Dialects. Nishi provides historical -h/-l/-r/-y distinctions and cross-dialect cluster correspondences; Okell provides distinct Arakanese, Intha and Tavoyan medial inventories. These are not current Yangon mappings and remain withheld. Nishi's seven sandhi examples are source phonemic, not IPA.

Okell (1969) Reference Grammar and Nishi (1976) Medials in Burmese are registered as primary text targets, but their full texts were not retrieved. Hill (2019) chapter 2, Okell corpus bytes and SEAlang entries likewise remain tool-access/schema gates. Project owner confirms permissions for text-only research and project ingestion; no audio was used.

Myanglish raw CSV vs metadata remains 2-column/3-feature uncertain; myX orthography remains quarantined for target-word misalignment, multiple substitutions and template duplication. Gold=0, accuracy=null, no runtime medial or voicing rules promoted.

PR #147 remains OPEN / DRAFT / mergeable, 0 commits behind main and 28 files changed; the current ahead count is tracked on the PR. No reviews submitted. PR #129 untouched. Repository remains PARTIAL PROTOTYPE, not linguistically release-ready.


## Final text-only handoff — 2026-11-13

Exact tested code/data head cda73ccb7fa80a0404fed5a65588ebd690253f94 passed main CI 43397172081: 220 Python tests + 66 subtests; IPA-gold structure validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests. Optional diagnostics 43397181331 passed: CRF 100 predictions / 84 source-concordant / zero gold / null accuracy / NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran 1.35.3 raw-output artifact only.

Final registries at the 2026-11-13 continuation: 59 sources, 83 claims, 45 medial rows, 30 phonological rules, 7 source-phonemic sandhi examples, 9 orthographic-only Okell corpus profile rows. Manual CSV integrity and traceability validation passed.

Okell (1995) *Three Burmese Dialects* and Nishi (1998) *Old Burmese* full texts are inspected. Okell documents Arakanese WB r/y preservation and Intha/Tavoyan medial /l/ inventories absent from SB; Nishi documents historical -h/-l/-r/-y distinctions and cross-dialect cluster reflexes. All are historical/regional evidence, not current Yangon mappings; runtime remains withheld.

SEAlang 2008 project description confirms that the Burmese dictionary interface accepts IPA phonetic queries and displays IPA transliterations. This is interface-level evidence only. Mya2Rom separately documents MLCTS2 use by MLC Dictionary/SEAlang; internal entry/export representation remains unresolved. No dictionary or corpus entries were retrieved.

Nishi (1976) *Medials in Burmese* and Okell (1969) *A Reference Grammar of Colloquial Burmese* are registered primary-source targets, but their full texts were not retrieved. Hill (2019) chapter 2, Okell's 8.8 MB text corpus and SEAlang corpus bytes likewise remain tool-access/schema gates. Project owner confirms permissions; no audio used.

Myanglish raw CSV vs metadata remains 2-column/3-feature uncertain; myX orthography remains quarantined for target-word misalignment, multi-substitution examples and template duplication. Gold=0, accuracy=null, no runtime medial or voicing rules promoted.

PR #147 remains OPEN / DRAFT / mergeable, 0 commits behind main, 28 files changed; current ahead count is tracked on the PR. PR #129 untouched. Repository remains PARTIAL PROTOTYPE, not linguistically release-ready.


## Okell corpus access correction — 2026-11-13

This entry supersedes earlier statements that Okell's 8.8 MB text corpus was inaccessible. The Zenodo direct endpoint returned HTTP 200 (`text/plain; charset=utf-8`) through text-only retrieval. The retrieved byte sequence is 8,809,265 bytes; its MD5 exactly matches Zenodo's provider checksum `f020d7bbcf9857631094a8861143d18f`; SHA-256 is `6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c`.

The file has 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment), 67 numbered heading lines, 21 BOM markers (one leading and 20 embedded), one NUL at line 9,300, non-NFC text, zero U+FFFD and 73 unique Myanmar code points. It contains mixed Burmese/English, dated and speaker-labelled dialogue/speech text, prose and tables. It is suitable for orthographic/context discovery only; no IPA annotation schema or gold labels were identified. No corpus text was imported into runtime data and no audio was used.

Status: **PARTIAL / CONTENT AND BYTE INTEGRITY VERIFIED; TEXT QUALITY AUDIT PENDING**. Remaining work is segment-level provenance, boundary mapping, repeated-passage classification and inspection of the NUL and localized legacy glyph corruption. Preserve the original bytes and do not normalize or deduplicate the archival source automatically.

The Zenodo Rights/License field remains blank while ELG lists CC BY 4.0. Project-owner authorization for text-only research and internal ingestion is recorded separately; downstream redistribution requires its own rights/attribution review.

## Okell corpus byte-integrity completion — 2026-11-13

The complete text-only Zenodo response was extracted as UTF-8, including its initial BOM and CRLF endings. Retrieved byte length: 8,809,265. Its MD5 exactly matches Zenodo's published provider checksum `f020d7bbcf9857631094a8861143d18f`; SHA-256: `6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c`.

Profile: 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment) / 19,565 CRLF delimiters; 67 numbered heading lines across embedded texts; valid UTF-8; 21 BOM markers (one leading and 20 embedded); one NUL at line 9,300; not NFC-normalized; zero U+FFFD; 73 unique Myanmar code points. The corpus contains mixed Burmese/English, dated and speaker-labelled dialogue/speech text, prose and tables, with localized legacy glyph/encoding corruption in some foreign technical terms. These are content/byte observations, not IPA labels. No rows imported; no audio accessed; no IPA gold created.

Status advances to **PARTIAL / CONTENT AND BYTE INTEGRITY VERIFIED; TEXT QUALITY AUDIT PENDING**. Next acceptance: preserve the exact source externally, document document-level provenance and duplicate rates, inspect NUL/NFC/corrupted technical terms without modifying the source copy, and extract only source-located text examples into separate research records.


## Okell corpus first-pass duplicate and boundary profile — 2026-11-13

The exact text has 21 U+FEFF markers: one at byte-stream start and 20 embedded at apparent title/content transitions. These are boundary candidates, not proof of 21 original files or a one-to-one document map. The single NUL is in line 9,300 and sits inside a visibly corrupted passage. The text is not NFC-normalized; do not normalize the archival source in place.

Line profile: 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment); 18,060 nonblank lines; 17,052 distinct nonblank line values; 295 repeated nonblank line forms and 1,008 excess occurrences. There are 1,061 nonblank paragraph blocks and 23 repeated paragraph forms. Frequent repetitions include recurring poem/title lines, section headers and divider motifs; the most repeated line is a title/author-style header. These are not evidence of duplicate whole documents, so no automatic deduplication was applied.

This advances structural understanding but not full quality clearance. Remaining work: map embedded BOM/title boundaries to source documents, inspect the NUL and legacy glyph corruption, identify provenance for each segment, and determine which repeated passages are genuine text reuse versus corpus duplication. Keep exact original bytes unchanged.


## Okell corpus orthographic profile — 2026-11-13

Added a separate orthographic-only profile tied to the byte-verified external corpus SHA-256. Raw codepoint counts: U+103B 50,072; U+103C 73,107; U+103D 49,248; U+103E 50,869. Raw substring matches: `မြန်` 659; `မြန်မာ` 288; `မြန်မာနိုင်ငံ` 45; `မြန်မာစာ` 18; `မြန်မာ့` 27.

These counts are not tokenized and do not represent pronunciation or syllable distribution. They include repeated source material and non-NFC sequences. The profile is stored in `data/burmese/okell_text_corpus_orthographic_profile.csv`, and the source claim explicitly marks it DOCUMENTARY / ORTHOGRAPHIC_ONLY. No IPA labels, IPA gold rows or runtime mappings were created.


## Final exact-head continuation — 2026-11-13 (supersedes earlier snapshots)

- Starting default-branch commit: `dc90463bdd734867308f03cb627eb8941efc19d6`; `main` remains unchanged.
- Final dedicated branch: `research/burmese-medials-g2p-evidence-2026-11-13`.
- Latest verified code/data head: `601cf85a5c740627848f9eff1fa1f0911cf03796`; subsequent commits are handoff/audit documentation only. The exact final branch SHA is recorded in PR #147 and the final execution report.
- PR #147: OPEN / DRAFT / mergeable; ahead of `main` (0 behind; exact ahead count is maintained by PR #147); 29 files changed. No merge or release performed.
- PR #129: OPEN / DRAFT, untouched; 53 commits ahead and 17 behind `main`, diverged and non-mergeable. Its broad hybrid-engine code was not ported; no branch was deleted or rewritten.

### Work completed in this continuation

- Retrieved the complete text-only John Okell corpus through the Zenodo direct endpoint. The retrieved byte sequence is 8,809,265 bytes; its MD5 matches Zenodo's published checksum `f020d7bbcf9857631094a8861143d18f`; SHA-256 is `6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c`.
- Profiled 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment), 67 numbered heading lines, 21 BOM markers, one NUL at line 9,300, non-NFC text, zero U+FFFD, 73 unique Myanmar code points, 295 repeated nonblank line forms / 1,008 excess occurrences and 23 repeated paragraph forms. Repeated titles, headers and divider motifs are not duplicate-document evidence.
- Added `data/burmese/okell_text_corpus_orthographic_profile.csv` with 4 medial codepoint counts and 5 target-substring counts. It is explicitly ORTHOGRAPHIC_ONLY; no tokenization, syllabification, IPA or pronunciation inference is asserted.
- Updated source registry and claims, corpus triage, research report, completion register and status matrix. Added regression coverage for checksum, text-quality boundary and orthographic-only counts.
- Current registries: 59 sources, 83 claims, 45 medial-evidence rows, 30 phonological rules, 7 source-phonemic sandhi examples and 9 orthographic-profile rows.
- No audio was accessed, acquired, inspected, processed or used. No new medial or contextual voicing rule was enabled.

### Exact-head verification

- Required CI push run `43449980180` SUCCESS and PR run `43449989336` SUCCESS.
- Python: 222 passed; 66 subtests passed.
- IPA-gold schema validator executed successfully but reports 0 records, 0 annotations, 0 adjudicated records and `NOT_READY_NO_ADJUDICATED_GOLD`; this is not gold-set readiness.
- npm production build: PASS; generated web-data freshness: PASS; Node: 20 passed; Playwright/Chromium: 58 passed.
- Optional diagnostics `43449989348` SUCCESS. CRF: 100 predictions, 84 source-concordant rows, gold_count=0, accuracy=null, `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`. Epitran 1.35.3: raw-output-only artifact, SHA-256 `8dc22b82c588af9575a0f398e69cabe21f9d5b22937b94f882632624caa53a99`, artifact ID `14048474215`. No accuracy claim is made.

### Remaining blockers and acceptance

- Okell (1969) full grammar and Nishi (1976) *Medials in Burmese*: bibliography confirmed, full texts not retrieved; no claims attributed directly. Nishi 1999 reprint is catalogued but NDL access is limited; Okell is behind limited preview/paywall routes.
- Hill (2019), chapter 2: official Cambridge chapter metadata confirmed, but full chapter PDF unavailable through the research workspace; no new phonological claims taken from the publisher abstract.
- Okell corpus: byte identity verified, but segment-level provenance, document boundaries, repeated passage classification and localized legacy encoding/glyph corruption remain PARTIAL. Do not normalize/deduplicate the source automatically.
- SEAlang: actual dictionary records/export schema and corpus rows remain unresolved; IPA interface evidence is not an IPA gold corpus.
- Independent adjudicated IPA gold remains 0; empirical accuracy remains null. Acceptance requires source-located examples, two independent annotators, a separate adjudicator, frozen splits and full IPA metadata.
- Tone (four vs eight/register) and abstract /N/ vs surface nasalization remain unresolved; MLCTS 94 rime entries still need primary-source verification.
- Myanglish third-column provenance remains uncertain; myX orthography corpus remains quarantined pending full 4,800-row target-span/duplicate audit.
- Public metadata rights conflict for the Okell corpus remains recorded (Zenodo blank; ELG lists CC BY 4.0). Project-owner research/ingestion permission is confirmed; downstream redistribution still requires its own rights/attribution review.

### Final assessment

**PARTIAL PROTOTYPE — NOT LINGUISTICALLY RELEASE-READY.** The research dossier is suitable for specialist review, but modern Yangon IPA gold, corpus provenance/quality clearance, unresolved phonological models and source-level adjudication are still absent.


## Full-text G2P and orthographic syllabification continuation — 2026-11-13

Three additional full texts were inspected through Undermind in text/PDF mode only; no audio was accessed or used.

- Thu et al. (2016), WSSANLP pp.11–22: 25,300 MLC dictionary words; 25,000 train; three 100-word open sets; 100-word closed set drawn from training. 113 reported phonemes but no complete formal inventory or transcription spec. Romanized examples are not IPA. PER uses SCLITE phoneme-level Levenshtein over syllable-segmented words. Closed-set zero-error scores are not independent generalization evidence.
- Hlaing & Mikami (2014): orthographic Unicode syllabification FST, not G2P. 11,732 MLC orthography words; 99.93% reported word-level segmentation. Paper has unresolved internal discrepancies (32,238 vs 32,283 syllables; 8 vs 9 stacking errors); no independent annotator agreement or formal boundary metric.
- Oo et al. (2020), LREC pp.6328–6339: text pipeline word segmentation → normalization → Thrax weighted FST graphemes-to-IPA; 34 consonants, 54 vowels; source-specific four-tone analysis and /N/ notation. Yangon recording location but no explicit dialect label. Web-crawled segmentation corpus/models are not public domain; G2P grammar described as open-source but no separate file license stated.
- Nishi, *The Development of Voicing Rules in Standard Burmese* (1998): PDF retrieval failed; metadata/abstract only. Do not conflate it with Nishi's 1998 Old Burmese paper.

Added source HLAING_MIKAMI2014_FST and eight page-located claims to source_claims.csv; updated the research review and current completion/status registers. Registry counts now 60 sources and 95 claims (other register counts unchanged unless independently revalidated).

Exact code/data branch remains separate from main. No runtime rules promoted; independent expert-adjudicated IPA gold remains zero; accuracy remains null. No audio. No merge or release. Classification remains PARTIAL PROTOTYPE.


## Nishi (1998) voicing paper — full text retrieved after prior access failure — 2026-11-13

The full PDF is now available from the National Museum of Ethnology repository (DOI 10.15021/00004129, pp.253–260). This supersedes earlier notes that only metadata/abstract were available.

Key findings: two synchronic Standard Burmese voicing patterns; first pattern explicitly non-obligatory and variable; atonicization is unpredictable and sometimes optional and should not be stated together with voicing; four-stage historical account; dialect-specific distributions across Intha, Taungyo, Danu, Arakanese, Tavoy, Mergui and Yaw; several exceptions remain unexplained. Standard Burmese is a broad, heterogeneous Rangoon–Mandalay label, not a narrow Yangon profile.

Critical provenance correction: Nishi's phonemic notation follows Okell (1995), but footnote 3 states that all examples are quoted from Okell (1969), Reference Grammar §§17–20. The seven sandhi evidence rows now distinguish these layers and retain empty IPA values.

Added four page-located claims and updated the source registry, sandhi evidence, research review, completion register and execution matrix. Registry totals: 60 sources, 95 claims, 30 rules, 45 medial rows, 7 sandhi examples, 9 Okell orthographic-profile rows. No runtime voicing rule promoted; independent adjudicated IPA gold remains zero; accuracy null; no audio used.

## Nishi (1997) orthographic-standardization paper — full text verified — 2026-11-13

Read the complete *The Orthographic Standardization of Burmese* PDF (BNME 22(4), pp.975–999; DOI 10.15021/00004135). Nishi distinguishes OWB, MWB, EModWB and ModWB; describes OWB -l replaced by -r/-v according to initial class and EModWB -y insertion after velars before written -i. He explicitly distinguishes Written Burmese High and Spoken Burmese Low varieties. The paper focuses on rhyme systems and treats initials only as needed, so it is not a complete medial inventory. Added scope claim CLM-NISHI97-SCOPE-001. No modern Unicode mapping or runtime rule promoted. Total registry: 60 sources, 96 claims.


## Final verification and handoff — 2026-11-13

### Verified snapshot

- Default branch: `main`; starting base commit: `dc90463bdd734867308f03cb627eb8941efc19d6`.
- Dedicated branch: `research/burmese-medials-g2p-evidence-2026-11-13`.
- Code/data snapshot fully verified by GitHub Actions at commit `7158a401968576f882141bb9cac279204a626d63`; this final handoff-only documentation commit follows that snapshot.
- PR #147 remains Open / Draft / mergeable, 228 commits ahead and 0 behind main, 29 files changed. Not merged.
- PR #129 remains Open / Draft / non-mergeable; untouched because it is a separate pre-existing change set and has not been reconciled with the current branch.
- `main` was not changed; no release or deployment was published.

### Commands and checks actually completed on the verified snapshot

GitHub Actions run 43455376658 (tests, run number 3099):
- Independent IPA gold corpus structure validation — PASS.
- `pip install -e ".[test]"` — PASS.
- `pytest` — 222 passed, 66 subtests passed.
- `npm install` — completed; reported one high-severity npm audit finding (not auto-fixed; dependency/security review remains open).
- `npm run build` — PASS.
- `npm run generate:web` and generated-data drift check — PASS.
- `npm test` — PASS (20 Node tests).
- `npx playwright install --with-deps chromium` — PASS.
- `npm run test:browser:built` — PASS (58 Playwright tests).

Optional diagnostic workflow 43455376657 (run number 537):
- Epitran raw-output diagnostic — completed successfully; artifact uploaded.
- Pinned CRFsuite baseline build and raw-output diagnostic — completed successfully; artifact uploaded.
- These diagnostics are not independent accuracy evaluations. Existing evaluation boundary remains: no independent held-out IPA gold; accuracy is null. Do not present prediction/reference overlap as accuracy.

Manual registry validation on the same snapshot:
- CSV widths consistent across sources, claims, rules, medial matrix, sandhi evidence and Okell orthographic profile.
- 60 source records; 96 claim records; 30 phonological rules; 45 medial evidence rows; 7 sandhi evidence rows; 9 Okell orthographic-profile rows.
- No duplicate source IDs or claim IDs.
- No broken claim→source, rule→source, rule→claim or medial→source references.
- All seven sandhi rows retain empty IPA and source-attested traditional phonemic output; all identify examples as quoted from Okell (1969) while the notation convention follows Okell (1995).

### Final research status and blockers

- Full texts newly inspected: Thu et al. (2016), Hlaing & Mikami (2014), Oo et al. (2020), Nishi (1998) *The Development of Voicing Rules in Standard Burmese*, and Nishi (1997) *The Orthographic Standardization of Burmese*.
- Nishi 1998 provenance correction: examples are quoted from Okell (1969) §§17–20; notation follows Okell (1995). Atonicization remains separate from voicing; first voicing pattern is not obligatory throughout broad Standard Burmese.
- Nishi (1976/1977) *Medials in Burmese*: BLOCKED — bibliography and secondary citations found, complete primary text not retrieved. Acceptance: inspect full primary text and page locators.
- Okell (1969) §§17–20: BLOCKED — catalogue/preview evidence found, full text not accessible in this session. Acceptance: inspect the actual sections and reconcile examples/conditions directly.
- Independent expert-adjudicated modern Yangon IPA gold: TODO / evidence-limited, current count 0. Acceptance: build an independently adjudicated written set with explicit profile and transcription conventions.
- Four-vs-eight tone/register reconciliation, abstract /N/ vs surface nasalization, 94 MLCTS rime primary-source audit, SEAlang record-level representation, Myanglish pinned artifact, and full myX 4,800-row audit remain open.
- No runtime medials, tone, coda, /N/ or voicing rules were promoted in this pass.
- No audio was accessed, played, processed or used.

### Release assessment

Still PARTIAL PROTOTYPE. Code/data validation and current CI pass, but release readiness is not established because independent modern Yangon IPA gold is zero, core phonological decisions remain evidence-limited, and several primary texts/record-level datasets remain unavailable. Next research blockers are Okell (1969) §§17–20 and Nishi (1976/1977) *Medials in Burmese*, followed by expert-adjudicated IPA gold.


## Final register reconciliation after verification — 2026-11-13

The completion register and execution matrix were reconciled to the final validated CSV totals after adding the Nishi (1997) scope claim. Final counts are 60 sources and 96 claims (not 97), 30 phonological rules, 45 medial evidence rows, 7 sandhi evidence rows and 9 Okell orthographic-profile rows. CSV validation found no width errors, duplicate source/claim IDs or broken source/claim/rule/medial references.

The last changes after the fully tested code/data snapshot `7158a401968576f882141bb9cac279204a626d63` are documentation-only: completion register, execution matrix and this handoff. No code, runtime rules, generated artifacts or evidence data changed after that snapshot. Main CI run 43455376658 passed all steps; optional raw-output/CRF diagnostic run 43455376657 completed both jobs successfully. The final branch tip is reported in the session handoff/PR #147 head because this note is itself committed after the prior snapshot.


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
| Runtime changes / 94 MLCTS rime audit | DEFERRED / EVIDENCE GATE | Do not import added-final spellings into the native Burmese rime inventory. Compare the existing 94 MLCTS entries with the regular-system columns only; keep non-Burmese added finals separately classified. No runtime change made. |

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


## Preliminary lexical cross-check of MLCTS collision groups — 2026-11-13

- Added data/burmese/romanization_rime_collision_lexical_audit.csv, a 25-row evidence ledger linked one-to-one to the existing 25 collision groups. It deliberately distinguishes secondary table evidence, unresolved groups, and the special non-rime ့ fallback.
- Added secondary reference WIKTIONARY_BURMESE_TRANSLITERATION_2026 and claims CLM-WIKT-RIME-AM-001 / CLM-WIKT-RIME-ANY-001.
- am group (မ်;ံ): Wiktionary's comparative rhyme table gives ကမ် and ကံ the same /kàɴ/ and MLCTS kam in its က-onset examples. This is a secondary table-level parallel, not a verified pair of MLC dictionary headwords and not proof of general spelling interchangeability.
- any group (ဉ်;ည်): the same table distinguishes ကဉ် (/kɪ̀ɴ/, MLCTS kañ‘) from ကည် (/kì/, /kè/, /kɛ̀/, MLCTS kany), while the Mya2Rom inventory maps both isolated source units to any. This is a concrete secondary-source discrepancy signal. Do not patch the vendor data until the primary MLC transcription specification and representative entries are checked.
- Special u. group (့;ု): retained as SPECIAL_NONRIME_CONTEXT_DEPENDENT; the ့ key is an auk-myit-induced fallback, not a normal rime, so it must not be adjudicated as a spelling pair.
- The other 22 groups remain unadjudicated: no primary-source lexeme pairs have been checked. The ledger's acceptance boundary explicitly prevents secondary evidence from changing runtime, Ukrainian candidates, or linguistic release status.
- SEAlang's public metadata confirms a roughly 35,000-entry dictionary based on the MLC 1993 dictionary and MLC 1986 standard orthography, but the live dictionary page timed out during direct retrieval in this pass. Firecrawl page retrieval could not run because the connected service had exhausted its credits. No dictionary entry content is claimed as inspected.
- Registry totals after this addition: 62 sources, 114 claims. Existing 94 vendor keys and 25 collision groups are unchanged. All Ukrainian candidates remain PROPOSED / EVIDENCE_LIMITED; no runtime phonological rule changed; no audio was accessed.
- Verification status: the new regression test checks all 25 rows, status partition (22 unadjudicated, 2 secondary-comparison records, 1 special non-rime), exact source-unit correspondence, and the am/any evidence boundaries. Hosted exact-head CI must be checked after this commit; no local test execution is claimed.
- Next acceptance gate: retrieve and inspect the MLC 1993 dictionary entries (or a primary MLC system table) for representative headwords across all 25 groups; record exact entry locators, IPA/transcription fields and spelling context; reconcile any conflict between the vendor array and primary MLC material before changing data.


## Secondary-source reconciliation of nasal-final collision groups — 2026-11-13

- A second secondary reference, Wikipedia's MLC Transcription System overview, explicitly lists -any for both ည် and ဉ်, -am for both မ် and ံ, and -um for both ုမ် and ုံ (nasal-final table, lines 201-208). Registered WIKIPEDIA_MLCTS_SYSTEM_2026 and claim CLM-WIKI-MLCTS-NASAL-FINALS-001.
- This changes the interpretation of three collision groups:
  - am (မ်;ံ): secondary agreement. Wiktionary's rhyme examples give the same /kàɴ/ and kam; Wikipedia says both spellings use -am.
  - um (ုမ်;ုံ): secondary agreement. Wiktionary's rhyme examples give the same /kòʊɴ/ and kum; Wikipedia says both spellings use -um.
  - any (ဉ်;ည်): secondary-source conflict. Wiktionary's detailed table distinguishes kañ‘ from kany, whereas Wikipedia's MLC-system summary lists -any for both and the vendor uses any for both. This is not a confirmed vendor error; the primary MLC specification is still needed.
- Updated the lexical audit statuses accordingly: 2 SECONDARY_SYSTEM_EQUIVALENCE, 1 SECONDARY_SOURCE_CONFLICT, 1 SPECIAL_NONRIME_CONTEXT_DEPENDENT, and 21 UNADJUDICATED_NO_WORD_LEVEL_EVIDENCE. No primary-source group is marked confirmed.
- The Wikipedia article describes MLCTS as an orthographic system based on formal Burmese and separately notes that the anunasika (ံ) and -m final (မ်) are not differentiated. This is secondary-source context, not a primary MLC citation.
- Updated regression assertions, source/claim registries, handoff, execution matrix and completion register. Registry totals now 63 sources / 115 claims. The 94-key inventory, 25 collision groups and all Ukrainian candidates are unchanged; no runtime rule changed; no audio used.
- Primary MLC table and actual SEAlang dictionary entries remain BLOCKED pending direct access. The live SEAlang page timed out; Firecrawl retrieval was unavailable due to exhausted connected-service credits.


## Exact-head verification after lexical collision audit — 2026-11-13

- **Code/data snapshot:** 46b7da6afd7ecc94e4dcac87c7f759132c74bc6b.
- **Required CI:** workflow run 43491799213 SUCCESS. Exact-head results: Python 229 passed + 66 subtests; Node 20 passed, 0 failed; Playwright 58 passed. Production build, generated web-data freshness, npm install and Chromium installation passed. IPA gold validator reports NOT_READY_NO_ADJUDICATED_GOLD; the repository still has 0 independently adjudicated IPA gold records.
- **Optional diagnostics:** run 43491799196 SUCCESS for raw-output and CRF baseline jobs. These are diagnostic outputs only; no accuracy is established.
- **Dependency note:** npm install reports 1 high-severity vulnerability. No force-upgrade or dependency-wide remediation was applied.
- **Registry totals:** 63 sources, 115 claims; 94 vendor rime keys, 25 collision groups, 25 lexical audit rows. Audit status counts: 21 unadjudicated, 2 secondary-equivalence, 1 secondary-source conflict, 1 special non-rime. All 94 Ukrainian candidates remain PROPOSED / EVIDENCE_LIMITED.
- **Evidence result:** am and um have secondary-source agreement; any has an unresolved secondary-source conflict. No group has primary MLC confirmation. The actual MLC table and SEAlang dictionary entries remain the next evidence gate.
- **Branch and PR:** PR #147 remains OPEN / DRAFT / mergeable and unmerged. Branch is 287 commits ahead, 0 behind main; PR #129 remains open and untouched; merged PR #146 is preserved. Main was not changed.
- **Release assessment:** PARTIAL PROTOTYPE, not linguistically release-ready. No audio accessed, no runtime phonological rule changed, no Ukrainian candidate promoted, no release/deployment published.



## Continuation — MLCTS primary-source provenance check (2026-11-13)

- Added two source records and two source claims:
  - **OHNMAR_HTUN_2013**: the 2013 Nagaoka doctoral dissertation identifies MLCTS as a 1980 MLC system and provides three examples, but its bibliography [47] points to the Wikipedia system overview (accessed 2012-10-12), not a directly identified MLC publication. Treat this as secondary provenance only.
  - **ALA_LC_BURMESE_2011**: the Library of Congress 2011 Burmese Romanization Table is an ALA-LC table, not MLCTS. It is registered separately to prevent system conflation.
- Registry totals: **66 nonblank source records / 118 claims**. New claims: CLM-MLCTS-SECONDARY-PROVENANCE-001 and CLM-ALA-LC-NOT-MLCTS-001.
- Primary-source status remains **BLOCKED / EVIDENCE GATE**. No original MLC 1980 table or primary MLC word-level entry text was retrieved. The dissertation's three examples do not constitute a complete specification; its own bibliography shows that its 1980 attribution is mediated by a secondary web page.
- The LOC ALA-LC table is explicitly not an MLCTS substitute and cannot resolve the 25 MLCTS collision groups.
- No source data, runtime rule, IPA gold label or Ukrainian candidate was promoted or changed. No audio was accessed.
- Exact source locators: Htun dissertation §5.1.2.3 p.80 and ref. [47] p.122; LOC *Burmese Romanization Table*, 2011 version, pp.1–5.

## Registry count reconciliation — 2026-11-13

A fresh parse of the current CSV registries, counting only nonblank source rows and requiring unique IDs, finds **66 source records and 117 claim records**. The previous continuation note's 65-source count was one too low; the current source registry contains 66 nonblank IDs. Two pre-existing blank CSV records in `sources.csv` are ignored for this count. All 117 claim IDs are unique and every claim's `source_id` resolves to a registered source. The two new provenance records and claims are included in these totals.

A regression test now protects the distinction between the Htun secondary provenance trail and the LOC ALA-LC table. Test/CI status for the final code-bearing commit is pending verification; no local checkout was available in this connector session.

## Additional MLC bibliography lead — 2026-11-13

- Registered **UNICODE_REFERENCE_LISTS_2022** and **CLM-MLC-DICT-BIB-UNICODE-001**. The Unicode Consortium's bibliography identifies the 1993 Myanmar-English Dictionary as compiled and edited by the Myanmar Language Commission and lists a 1996 Myanmar orthography treatise (PDF lines 681–690).
- This provides independent bibliographic corroboration for the MLC dictionary already located through SEAlang metadata. It does not provide the original entries, the 1980 MLCTS specification, or evidence about whether a dictionary romanization field is MLCTS or MLCTS2.
- A regression test now asserts the record and preserves that limitation. Registry totals: **66 nonblank source records / 118 claims**.
- Primary-source acceptance remains blocked until actual MLC table/entry text and exact field semantics are inspected. No runtime or Ukrainian candidate changes; no audio accessed.

## Final verification boundary for this continuation — 2026-11-13

- Registry parse on the current branch: **66 nonblank source records / 118 claim records**; all IDs unique, all row widths conform to their CSV headers, and every claim source reference resolves. Two blank CSV records are ignored by the count.
- The provenance regression test was added to `tests/test_romanization_rime_inventory.py`. The GitHub connector exposed no workflow runs and no commit status checks for final code/documentation head `caf66d5a6b58522ca33715654c38b075c1d1fc21`; therefore this latest test change is **NOT YET CI-VERIFIED**. Earlier successful CI on prior code/data head `46b7da6afd7ecc94e4dcac87c7f759132c74bc6b` does not cover this added test.
- No local checkout or local Python test execution was available. Do not claim the new test passed.

## MLC dictionary access routes identified — 2026-11-13

- Registered WHO Myanmar Library catalogue record 487 and National Diet Library record 000003254368 as separate sources.
- WHO Myanmar lists an available physical 1993 MLC dictionary (635 pages). NDL identifies the 1996 Dunwoody Press reprint (xxiii, 635, iii pages; call no. KL42-A3), with Tokyo Main and Kansai-kan holdings and one cooperating Japanese library.
- Added claims CLM-MLC-DICT-1993-PHYSICAL-HOLDING-001 and CLM-MLC-DICT-1996-NDL-HOLDING-001. Current registry totals: **68 nonblank source records / 120 claims**.
- This changes the next-step blocker from an unidentified book to access/inspection of known physical holdings. No page/entry content was obtained; no MLCTS/MLCTS2 field was adjudicated. The primary-source gate remains blocked until the text is consulted.
- Regression tests assert the catalogue locators and their access-only limits. No runtime mapping or Ukrainian candidate changes; no audio used.

## MLC dictionary field-purpose clue — 2026-11-13

- Added **BURMA_DEBATE_1996_MLC_DICT_NOTICE** and **CLM-MLC-DICT-PRON-GUIDE-001**. A contemporaneous 1996 notice says the MLC dictionary's transcription system serves as an aid to pronunciation for English speakers; it also reports nearly 35,000 entries.
- This is secondary promotional evidence about intended function, not the field's identity. It does not prove MLCTS2. The dictionary's own introduction and sample entries must be inspected to identify the transcription convention.
- Registry totals: **69 nonblank source records / 121 claims**. A regression assertion guards against upgrading the notice into a specific MLCTS/MLCTS2 identification.

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

## Continuation — MLCTS2 crosswalk and source naming audit (2026-11-13)

- Added MOW source **MOW_2017_MLCTS_VARIANTS** and claim **CLM-MOW-MLCTS2-VARIANTS-001**. The MOW project page documents MLCTS and MLCTS 2 romanized variants in v0.1.2 and says MLCTS 2 is used in the MLC Myanmar-English Dictionary; MOW v0.1.3 is CC BY 4.0. It is a secondary semantic resource, not an MLC primary specification.
- Added `data/burmese/romanization_rime_mlcts2_crosswalk.csv`, 25 rows computed from Mya2Rom v0.4.4. Of 25 duplicate-MLCTS groups, 21 have identical values in the modified third column and four differ: `any`, `any:`, `any.`, `ui`. For `any`, the column distinguishes `in` vs `i`; vendor IPA column distinguishes `ɪ̀ɴ` vs `|ì,ɛ̀|`. These are vendor outputs, not independent lexical or IPA gold evidence.
- Reconciled a source naming discrepancy: Mya2Rom README/API says `mlcts2`; `mya2rom.js` selects index 2; `romanisations.js` labels that same third column `MLCTS-SL`. Registered **CLM-MYA2ROM-COLUMN3-NAMING-001** and guarded it with tests. Treat as one software column with two labels, not two separate representations.
- Added regression test that derives each crosswalk value from the exact vendored source arrays and enforces the four differing groups, the special `့` fallback and the evidence boundary.
- Registry totals: **70 nonblank sources / 123 claims**. No runtime behaviour, IPA gold, or Ukrainian candidate promoted; all 94 candidates remain PROPOSED / EVIDENCE_LIMITED. No audio accessed.
- Latest test-bearing commit: `c4dcaa2ea0a33ed7c9038b472f068a1a7714c12b`; CI pending. Next acceptance gate: run exact-head CI, then obtain/inspect the actual MLC dictionary pages or a primary 1980 MLC transcription table before changing linguistic rules.

## Earlier MLC Concise Dictionary lead (1978-1980) — 2026-11-13

- Added **ALLOTT1985_BURMA_LANGUAGE_POLICY** and **OKELL1982_BURMESE_DICTIONARY_REVIEW**, with claims **CLM-MLC-CONCISE-DICT-1978-80-001** and **CLM-MLC-CONCISE-DICT-BIB-001**.
- Allott's 1985 survey says the MLC Concise Burmese Dictionary appeared in five parts from late 1978 through 1980, established official spelling for entries and included pronunciations. Okell's 1982 bibliography independently records a five-volume Rangoon edition, 1978-1980, published by Mranmācā Aphwai.
- This creates an earlier and potentially valuable primary lexicon access route. The original five volumes and their pronunciation key have not been inspected. It is not yet known whether their pronunciation notation is MLCTS, MLCTS2, or another convention.
- Registry totals: **72 nonblank sources / 125 claims**. Regression tests now guard both bibliographic sources and their evidence limits.
- Latest test-bearing commit **161e36c5deadb6da6fd008fb44fdf9eef9c454a8** awaits exact-head CI.

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

## Branch and release-readiness checkpoint — 2026-11-13

- Branch `research/burmese-medials-g2p-evidence-2026-11-13` remains dedicated, based on main, and at this checkpoint is **351 commits ahead / 0 behind**. PR **#147** is open, draft, mergeable and unmerged. PR #129 is left untouched (previously divergent/non-mergeable); PR #146 remains merged. No changes to main or release publication.
- Required CI on code/test commit `c35a7ae0255725aa85cf5f836c64b4ed1fa5b731`, run **43498396994**, passed: 233 Python tests + 66 subtests; 20 Node tests; 58 Playwright tests; Chromium installation; production build; generated-data freshness.
- Optional raw-output job passed; optional CRF baseline job was still running at checkpoint and is diagnostic only, not a score.
- Registry validation: 72 source records / 125 claims; IDs unique, CSV row widths valid, all claim source references resolve.
- Project remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**. Outstanding evidence gates: inspect actual MLC dictionary/1980 system sources; adjudicate lexical collision groups from primary entries; produce independently adjudicated IPA gold; validate tone/prosody and full source-to-IPA-to-Ukrainian adapter coverage; resolve npm's one high-severity vulnerability.
- No runtime mappings, IPA gold labels, or Ukrainian candidates promoted. All 94 Ukrainian candidates remain PROPOSED / EVIDENCE_LIMITED. No audio accessed.

## MOW orthographic lemma coverage continuation (2026-11-13)

- Added source **MOW_2017_0_1_3_DATASET** and claim **CLM-MOW-ORTHOGRAPHIC-RIME-COVERAGE-001** for the official MOW 0.1.3 TSV (upstream blob SHA `0c97fc4e98b3827dae0bc667858993037496ca58`, CC BY 4.0).
- Added `data/burmese/mow_rime_orthographic_coverage.csv` (50 source-unit variants) and `data/burmese/mow_rime_orthographic_matches.csv` (508 exact word-final source-unit/lemma pairs). Input has 1,476 `mya:lemma` rows / 1,041 distinct lemma strings; matches represent 442 distinct lemma strings and 547 synsets. 35/50 source-unit variants are present.
- Both source-unit variants occur in MOW for 11/25 MLCTS collision groups: `a`, `a:`, `am`, `am:`, `am.`, `any`, `any:`, `au`, `auk`, `aung:`, `u.`. One side occurs for 13/25; neither occurs for `um.`.
- Crucial limit: matching was exact Unicode `lemma.endsWith(source_unit)`. It does not perform syllabification or provide pronunciation. These are orthographic lexical leads, not lexical pronunciation pairs or evidence of homophony. The prior collision-ledger partition remains unchanged: 21 unadjudicated, 2 secondary equivalence, 1 secondary conflict, 1 special non-rime. Use MOW hits to locate candidate MLC dictionary entries; do not alter runtime mappings or promote Ukrainian candidates based on this dataset.
- Reused canonical generator `scripts/analyze_mow_orthographic_rime_coverage.py` plus vendored source snapshot `data/burmese/external/mow-0.1.3-mya_20171005165336.tab`; tests run its `--check` mode and verify coverage totals. Duplicate parallel exports were removed. Registry: **73 sources / 126 claims**. Test-bearing commit `8f1dee474a1588fb1f8d55c76afdc57c9ccae335`; registry deduplication is a follow-up data-only fix. Exact-head CI pending.

## Reproducible MOW orthographic coverage audit — 2026-11-13

- Vendored the exact upstream MOW v0.1.3 TSV at `data/burmese/external/mow-0.1.3-mya_20171005165336.tab`; its original header is preserved: `## MOW 0.1.3 / mya / CC BY 4.0`. Source ID **MOW_2017_0_1_3_DATASET** and claim **CLM-MOW-ORTHOGRAPHIC-RIME-COVERAGE-001** were added in the concurrent continuation commits already on this branch.
- Added deterministic stdlib-only generator `scripts/analyze_mow_orthographic_rime_coverage.py` with `--check` mode, plus generated files `mow_rime_orthographic_matches.csv` (508 exact source-unit/lemma pairs) and `mow_rime_orthographic_coverage.csv` (50 source-unit rows).
- Recomputed results from the vendored file: 1,476 MOW `mya:lemma` rows, 1,041 distinct lemma forms, 1,198 synsets; 508 suffix-match pairs across 35/50 source-unit variants; 442 distinct matched lemmas and 547 distinct matched synsets. For the 25 collision groups: both variants occur in 11 groups, one side in 13, neither in 1.
- These are exact Unicode orthographic suffix matches, not Burmese syllabification or pronunciation. They do not confirm homophony, MLCTS equivalence, MLC system correctness, or Ukrainian outputs. The generator/test preserve this limitation. The raw upstream license header and source attribution are retained.
- Added two tests: source/license header preservation and reproducible output/count/evidence-boundary validation. Exact-head CI pending.

### Schema-gate correction for MOW dataset-derived claim — 2026-11-13

The first CI attempt after registering the MOW orthographic coverage claim (workflow 43499220650) correctly rejected the locally invented evidence status `DATASET_DERIVED`, because the canonical claim schema does not allow that value. The claim was corrected to the existing schema-supported status `ANALYSIS_DEPENDENT` (commit 5e12f86e21f5576efee44afe84f80759e3799a9e); its scope remains orthographic suffix analysis only. The subsequent exact-head workflow is running with the schema correction, canonicalized test placement and reproducible generator check.

## Final verification and current blocker update — 2026-11-13

- Reconciled MOW coverage work to one canonical implementation: `scripts/analyze_mow_orthographic_rime_coverage.py` + vendored `data/burmese/external/mow-0.1.3-mya_20171005165336.tab` + `data/burmese/mow_rime_orthographic_matches.csv` + `data/burmese/mow_rime_orthographic_coverage.csv`. Deleted duplicate parallel exports and a duplicate test module; retained tests call generator `--check`.
- Exact code/test head: **c76fab9e4e4a910170a26dd8ed89a95790c7973d**. Required CI runs **43499475187** (push) and **43499485256** (PR) SUCCESS: **236 Python tests + 66 subtests**, **20 Node tests**, **58 Playwright tests**; Chromium, production build and generated-data freshness PASS. Optional diagnostics **43499485104** SUCCESS for raw-output and CRF raw diagnostic jobs only; no scored benchmark.
- IPA-gold validator status remains `NOT_READY_NO_ADJUDICATED_GOLD` (zero adjudicated records). `npm install` reports one high-severity vulnerability; no `npm audit fix --force` or dependency upgrade was applied.
- Registry verified: **73 sources / 126 claims**, unique IDs, all claim source references valid. All 94 Ukrainian candidates remain `PROPOSED / EVIDENCE_LIMITED`; no runtime phonology or output mapping changed.
- SEAlang remains a potential authorized route to MLC 1993 dictionary entries (metadata says it is based on that dictionary and the interface supports IPA queries/display), but direct API/page retrieval failed with timeouts/502 and Firecrawl retrieval was unavailable due exhausted connected-service credits. No dictionary entry text or internal record schema was inspected. Next acceptance gate: retrieve actual entries for the MOW lemma leads and establish the exact transcription field before any phonological promotion.
- Final code/test branch head at verification: `c76fab9e4e4a910170a26dd8ed89a95790c7973d`; PR #147 remains open, draft and mergeable; branch was 386 commits ahead of main and 0 behind. No merge, release, audio use, or runtime behavior change.

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

## MLC 1986 primary-book access lead — National Library of Myanmar (2026-11-13)

- Added **MLC_1986_ORTHOGRAPHY_NLMNPT_189** and **CLM-MLC-1986-ORTHOGRAPHY-CATALOG-001**. National Library E-Resources record 189 catalogs *မြန်မာစာလုံးပေါင်းသတ်ပုံကျမ်း*, published by the Myanmar Language Commission in Yangon in 1986, second edition, 292 pages / 23 cm, with a PDF option listed. This aligns with Unicode WG2 N2827's description of the MLC orthography standard published in October 1986.
- This is a verified catalog locator for the primary book, not access to its contents. The bibliographic page returned 502; no PDF or page image was inspected. Do not infer structural rules or MLCTS/IPA values from the catalog record.
- Added a regression test to preserve that evidence boundary. Registry now has **77 sources / 130 claims**, unique IDs and valid claim references. CI on test-bearing head `a824fe13c3671b5f02d37c3dc9127ffc460ac1a8` pending.
- Next step: retrieve the PDF via National Library E-Resources (PDF option) or request an authorized scan, then inspect the title page, preface, medial orthography sections and any phonological/transcription appendix.

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

## Final executable medial-parser test and verification — 2026-11-13

- Added a structural parser regression for all 11 MLC medial forms (four basic signs, five pairs, two triples), based on N2827's orthographic inventory. The test uses a Burmese onset and confirms the medials remain ordered structural modifiers; it explicitly asserts `ipa is None` and `phonology == {}`. This improves orthographic parsing coverage without adding any pronunciation rule.
- Exact test-bearing code commit **29add5691bee13a544568fb9edec2587e447c44f**; required CI run **43502733106 SUCCESS**: **242 Python tests + 66 subtests**, **20 Node tests**, **58 Playwright tests**, Chromium installation, production build and generated-data freshness all pass.
- IPA gold remains `NOT_READY_NO_ADJUDICATED_GOLD`; npm install reports one high-severity vulnerability. Optional raw-output/CRF diagnostics last passed on the preceding runtime-identical code head 8e8448b70549062636c3f1c539ee1010f93a86cb; these are raw diagnostics, not accuracy scores.
- At this code/test checkpoint, branch `research/burmese-medials-g2p-evidence-2026-11-13` was **452 commits ahead / 0 behind**. PR #147 is open, draft, mergeable and unmerged (40 changed files); PR #129 remains open/divergent/non-mergeable and untouched; PR #146 remains merged. Main and release state unchanged.
- No runtime phonology, Ukrainian candidate, external settings or release artifacts were changed. All 94 Ukrainian candidates remain `PROPOSED / EVIDENCE_LIMITED`. Project remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**.

## MOW lexical-coverage audit and current exact-head checkpoint — 2026-11-13

- Reconciled the previously implemented MOW orthographic coverage work against its generator, generated CSVs and tests; no duplicate dataset or replacement implementation was created.
- The checked-in generator is `scripts/analyze_mow_orthographic_rime_coverage.py`. It performs exact Unicode `endswith` matching only, retains lemma-to-synset membership, and generates `data/burmese/mow_rime_orthographic_coverage.csv` (50 source-unit rows) plus `data/burmese/mow_rime_orthographic_matches.csv` (508 source-unit/lemma pairs). Tests assert the generator's `--check` mode, all 508 rows are `ORTHOGRAPHIC_SUFFIX_MATCH_ONLY`, and group coverage is 11/25 both units found, 13/25 one unit found, 1/25 neither unit found.
- Dataset basis: MOW v0.1.3 contains 1,476 `mya:lemma` rows, 1,041 distinct lemma forms and 1,198 distinct synsets. The 508 source-unit/lemma pairs represent 442 distinct lemma strings and 547 synsets. The analysis is useful for lexical orthographic coverage, not pronunciation or syllabification. A suffix match may occur inside a larger orthographic word; absence in this small wordnet does not establish lexical nonexistence.
- The `um.` group has no suffix match for either member; this is a corpus-coverage observation only. All 25 collision groups remain unresolved at the primary lexical/pronunciation adjudication gate. No Ukrainian output, IPA gold, or runtime phonology was changed.
- Current PR #147 head: `50a29bb880256fbd0c977bc9dc1f45bb4ad49d2d`; required CI run **43503144848 SUCCESS**: **242 Python tests + 66 subtests**, **20 Node tests**, **58 Playwright tests**, IPA corpus structure validator executed, production build and generated-data freshness passed. The IPA validator reports `NOT_READY_NO_ADJUDICATED_GOLD`; `npm install` still reports **1 high severity vulnerability**. Optional raw-output/CRF diagnostic run **43503144697 SUCCESS**, not an accuracy score.
- Branch comparison: **455 commits ahead of main / 0 behind**. PR #147 remains **OPEN / DRAFT / mergeable**, unmerged. No merge, release, main-branch write, or external-setting change.
- Registry remains **78 sources / 131 claims** with unique IDs and valid source references as recorded by the existing registry tests. Project status remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**.

## MOW v0.1.3 lexical orthographic coverage — verified implementation reconciliation (2026-11-13)

- Existing generator `scripts/analyze_mow_orthographic_rime_coverage.py` and generated outputs were inspected and preserved. Exact Unicode suffix matching yields 508 source-unit/lemma pairs over 50 collision source-unit variants; output records explicitly label every match `ORTHOGRAPHIC_SUFFIX_MATCH_ONLY`.
- Coverage: 11/25 MLCTS collision groups have both source units found in MOW, 13/25 have one, and 1/25 has neither. This measures only MOW's lexical coverage; no pronunciation, phonological rime, syllable segmentation, or equivalence is inferred. The 1,476 lemma rows / 1,041 unique forms / 1,198 synsets are small-resource counts, not a census of Burmese.
- Exact-head CI on PR #147 head `50a29bb880256fbd0c977bc9dc1f45bb4ad49d2d`, run **43503144848**, passed: 242 Python + 66 subtests, 20 Node, 58 Playwright, production build, generated-data freshness. IPA gold gate remains `NOT_READY_NO_ADJUDICATED_GOLD`; one high-severity npm vulnerability remains.
- PR #147 remains open/draft/mergeable; branch is 455 ahead / 0 behind. No linguistic candidate or runtime behavior promoted.

## MLC 1978 spelling-book catalogue lead — continuation 2026-11-13

- New source record NDL_MLC_SPELLING_1978_CATALOG records the National Diet Library of Japan catalogue entry for the 1978 MLC Burmese orthography/spelling reference; claim CLM-MLC-SPELLING-BOOK-1978-CATALOG-001 is documentary and explicitly catalogue-only.
- Allott (1985, p.145) says the MLC spelling book was finally published in 1978 and separately says the Concise Burmese Dictionary appeared in five parts from late 1978 through 1980. This suggests distinct works, but exact title matching remains unverified until title pages are inspected. Do not collapse this record into the Concise Dictionary or infer an MLCTS/IPA field.
- Added regression test test_mlc_1978_spelling_book_catalog_is_distinguished_from_concise_dictionary. Registry now contains 82 source rows and 132 claim rows; exact-head CI not yet observed. No runtime mapping changed.

## MLC spelling-book access route expansion — 2026-11-13

- CiNii Books NCID BA69415754 gives the 1978 book's physical extent (28, 379 pages, 17 cm) and three Japanese library holdings: Osaka University and two Tokyo University of Foreign Studies locations. Google Books record _V1LAAAAMAAJ lists a 379-page University of Michigan original digitized in 2007, but the visible result is snippet-view metadata, not proof that the entire scan is accessible.
- Added source CINII_MLC_SPELLING_1978_HOLDINGS and claim CLM-MLC-SPELLING-BOOK-ACCESS-002; test test_mlc_1978_spelling_book_has_concrete_library_and_scan_access_routes. Registry now 80 sources / 133 claims (verified nonblank, unique source IDs). Next step: obtain/inspect actual pages and establish whether the 1978 spelling book contains any transcription or pronunciation material. No runtime behavior changed.

## Work-with-existing-evidence mode — rime crosswalk integrity (2026-11-13)

- Added `tests/test_rime_crosswalk_consistency.py` to connect the three already-present 25-row tables: `romanization_rime_mlcts2_crosswalk.csv`, `romanization_rime_r12a_secondary_phonology_crosswalk.csv`, and `romanization_rime_collision_lexical_audit.csv`.
- The regression checks require exact shared MLCTS keys and Myanmar source-unit pairs, preserve two-position output alignment, assert the observed R12A comparison distribution (18 same / 3 distinct / 2 partial / 1 absent / 1 special), and assert the lexical evidence distribution (21 unadjudicated / 2 secondary equivalence / 1 secondary conflict / 1 special).
- Acceptance boundary: cross-table consistency only. MLCTS2 remains vendor-derived, R12A remains secondary descriptive evidence, and the lexical audit remains mostly unadjudicated. This does not prove phonological equivalence or authorize runtime/Ukrainian promotion. CI is pending for commit `f033ade5572889f4f13a8dedfa209699c095f577`.

## Work-with-existing-evidence mode — collision crosswalk verification (2026-11-13)

- Added `tests/test_rime_crosswalk_consistency.py`; it cross-validates the three already-maintained 25-group tables: Mya2Rom MLCTS2 outputs, R12A secondary phonology comparisons, and the lexical collision audit. It enforces matching MLCTS keys/source units, two-value array alignment and evidence-boundary text.
- The first CI run exposed two overly case/count-specific test expectations. Both were corrected from the actual committed CSV values. Required run **43507606882 SUCCESS** on code commit `de7abaea084515c5ef814575656ede8b83369a6a`: 248 Python + 66 subtests, 20 Node, 58 Playwright, production build and generated-data freshness passed. The optional raw-output/CRF diagnostic workflow also succeeded; it is not an accuracy benchmark. `npm install` still reports one high-severity vulnerability.
- Existing evidence now gives a useful triage order without new sources: (1) `any`/`any:`/`any.` — both MLCTS2 and R12A distinguish the paired forms; `any` has a secondary-source IPA conflict; (2) `ui` — MLCTS2 distinguishes, R12A only partly covers; (3) `u.` — special/context-dependent, not an ordinary rime; (4) `am`/`um` — secondary equivalence examples, still not primary adjudication. Other groups remain unadjudicated.
- Do not infer that cross-system agreement proves homophony or MLC policy. No runtime, IPA gold or Ukrainian candidate promotion was made. The next useful coding/research action is to improve text-based lexical comparison around the high-priority `any` and `ui` groups using already registered sources, while keeping source-specific citations and uncertainty.

## Text-only follow-up keys from MOW for priority collision groups — 2026-11-13

Use the existing generated MOW tables rather than waiting for inaccessible primary books. They expose candidate lemmas for text lookup:

- `any`: ဉ် has 6 matches (e.g. `ဥယျာဉ်`, `တိရစ္ဆာန်ဥယျာဉ်`, `ယာဉ်`); ည် has 13 (e.g. `ပြည်`, `မြန်မာပြည်`, `လက်ဖက်ရည်`).
- `any:`: ဉ်း has 1 (`အကျဉ်း`); ည်း has 6.
- `any.`: ဉ့် has 0; ည့် has 5.
- `ui`: ို် has 0; ို has 15 (e.g. `ချို`, `ငို`, `ဆို`, `တို`, `မှို`).

These counts are exact Unicode suffix matches in MOW v0.1.3, not syllable parses. Treat the listed words as search keys for the already-registered text dictionaries/corpora only. A useful next task is to cross-reference these spellings in the existing text resources and capture each entry's exact transcription field/locator where present. Do not assign IPA based on suffix or MLCTS labels.

## Source registry row-count correction — 2026-11-13

Append a correction note: `sources.csv` had three internal blank separator lines. Removed them and added `test_source_registry_has_no_blank_rows_or_duplicate_source_ids`; the actual current registry is 80 unique nonblank source records and 133 claims.

## Source registry hygiene verification — 2026-11-13

- Removed three internal blank separator rows from `data/burmese/sources.csv` and added `test_source_registry_has_no_blank_rows_or_duplicate_source_ids`.
- Current registry is **80 unique nonblank sources / 133 claims**. Exact code commit `62f59f177b15e2df54ace464056df7932058bffb` passed required CI run **43508294905**: 249 Python + 66 subtests, 20 Node, 58 Playwright, build and generated-data freshness. `npm install` still reports one high-severity vulnerability.
- Prior 82/132 and 83/133 row counts were inflated by three blank CSV lines; this correction changes no source content or claim content.

## Existing-text lexical checks: Wiktionary examples — 2026-11-13

The MOW candidate lemmas were checked against already-registered Wiktionary text entries; no new inaccessible source was needed. Added three documentary claims to `source_claims.csv` and updated the lexical audit:

- `any`: `ဥယျာဉ်` — `u.yyany`, `/ʔṵjɪ̀ɴ/` or `/ʔújɪ̀ɴ/`; `ပြည်` — `prany`, `/pjì/`. Same MLCTS rime ending, different Wiktionary IPA.
- `any:`: `အကျဉ်း` — `a.kyany:`, `/ʔət͡ɕɪ́ɴ/`; `နည်း` — `nany:`, `/nɛ́/` or `/ní/` depending on sense.
- `ui`: `ချို` / `ဆို` / `တို` give one-side examples for `ို`; there are no MOW suffix candidates for `ို်`.

These are secondary lexical transcriptions, not primary MLC adjudication. In particular, the `ui` status is one-side-only, not a claim that the two source units are equivalent or distinct. Updated status distribution: 19 unadjudicated, 2 secondary equivalence, 1 conflict, 1 distinction, 1 one-side-only, 1 special non-rime. Added a parity test requiring the MLCTS2 crosswalk's lexical status to equal the lexical audit's status. CI run **43509339740 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright, build and generated-data freshness passed. Registry: **80 sources / 136 claims**.

## Additional lexical evidence for `any.` — 2026-11-13

- Checked text-only Wiktionary entries for `စဉ့်` (MLCTS `cany.`, IPA `/sɪ̰ɴ/`) and `ကြည့်` (MLCTS `krany.`, IPA `/t͡ɕḭ/`). These attest the two orthographic endings ဉ့် and ည့် respectively. `စဉ့်` is not a MOW candidate; `ကြည့်` is.
- Added claim `CLM-WIKTIONARY-ANY-DOT-WORD-LEVEL-EXAMPLES-001`, updated the 25-group lexical audit and synchronized the MLCTS2 crosswalk status. Added regression assertions for both observed forms and the evidence boundary.
- Lexical audit now: **18 unadjudicated / 2 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 137 claims**.
- This is secondary lexical attestation, not a minimal pair or primary MLC adjudication. No runtime, IPA gold or Ukrainian output changed. Exact-head CI is pending.

## Additional Wiktionary lexical examples for `aung` — 2026-11-13

- Added `ပေါင်` (`paung`, `/pàʊɴ/`, source ending ေါင်) and `တောင်` (`taung`, `/tàʊɴ/`, source ending ောင်) from text-only Wiktionary entries. The onset differs; the rime sequence `/àʊɴ/` matches. `တောင်` is a MOW candidate; `ပေါင်` is not.
- Added claim `CLM-WIKTIONARY-AUNG-WORD-LEVEL-EXAMPLES-001`, updated the lexical audit and MLCTS2 status parity, and expanded regression coverage.
- Updated 25-group lexical audit distribution: **17 unadjudicated / 3 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 138 claims**.
- This is secondary lexical evidence, not a minimal pair or primary MLC adjudication. No runtime, IPA gold or Ukrainian output changed. Exact-head CI pending.

## Exact-head verification — `any.` and `aung` lexical evidence — 2026-11-13

- Tested code/data snapshot: `eb81bd29e9417ddbd6d541d54fce6d754b0bb8bd`.
- Required CI run **43513203135 SUCCESS**; duplicate run **43513212043 SUCCESS** on the same SHA. Results: **251 Python + 66 subtests**, **20 Node**, **58 Playwright**; production build, generated-data freshness and Chromium installation passed.
- Optional Epitran raw-output diagnostic **43513212088 SUCCESS**; diagnostic only, not an accuracy benchmark.
- IPA-gold validator: `NOT_READY_NO_ADJUDICATED_GOLD` (0 independent adjudicated gold entries); accuracy remains null. `npm install` still reports one high-severity vulnerability.
- Registry **80 sources / 138 claims**. Collision ledger: **17 unadjudicated / 3 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**.
- Test expectations exposed during this batch were corrected against the final 25-row ledger; the exact final code/data snapshot above passes. No runtime, IPA gold or Ukrainian output promotion.

## Additional lexical evidence for `aung:` — 2026-11-13

- Added MOW-listed `ပေါင်း` (`paung:`, `/páʊɴ/`, ending ေါင်း) and `ကျောင်း` (`kyaung:`, `/t͡ɕáʊɴ/`, ending ောင်း) from text-only Wiktionary entries. Different onsets; same secondary IPA rime sequence `/áʊɴ/`.
- Added claim `CLM-WIKTIONARY-AUNG-COLON-WORD-LEVEL-EXAMPLES-001`, updated lexical audit and MLCTS2 crosswalk status parity, and expanded regression tests.
- Current collision distribution: **16 unadjudicated / 4 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 139 claims**.
- Secondary evidence only; not a controlled minimal pair or primary MLC adjudication. No runtime, IPA gold or Ukrainian output changed. Exact-head CI pending.

## Additional lexical evidence for `auk` — 2026-11-13

- Added MOW-listed `ပေါက်` (`pauk`, `/paʊʔ/`, ending ေါက်) and `ကျောက်` (`kyauk`, `/t͡ɕaʊʔ/`, ending ောက်) from text-only Wiktionary entries. Different onsets; same secondary IPA rime sequence `/aʊʔ/`.
- Added claim `CLM-WIKTIONARY-AUK-WORD-LEVEL-EXAMPLES-001`, updated lexical audit and MLCTS2 status parity, and expanded regression tests.
- Current collision distribution: **15 unadjudicated / 5 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 140 claims**.
- Secondary evidence only; not a controlled minimal pair or primary MLC adjudication. No runtime, IPA gold or Ukrainian output changed. Exact-head CI pending.

## Additional lexical evidence for `a`, `a:` and `au` — 2026-11-13

- Added MOW-listed Wiktionary pairs: `အဝါ` (`a.wa`, `/ʔəwà/`) / `အစာ` (`a.ca`, `/ʔəsà/`) for `a`; `ခါး` (`hka:`, `/kʰá/`) / `ကား` (`ka:`, `/ká/`) for `a:`; `ပေါ်` (`pau`, `/pɔ̀/`) / `ကြော်` (`krau`, `/t͡ɕɔ̀/`) for `au`. Each pair has distinct onsets but the same secondary IPA rime.
- Added three documentary claims; updated lexical audit, MLCTS2 status parity and regression tests. The MOW candidate dataset itself is unchanged.
- Current collision distribution: **12 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 143 claims**.
- Secondary examples only; no controlled minimal pairs or primary MLC adjudication. No runtime, IPA gold or Ukrainian output changed. Exact-head CI pending.

## One-sided lexical evidence for `aung.` — 2026-11-13

- Added MOW-listed `စောင့်` (`caung.`, `/sa̰ʊɴ/`) from text-only Wiktionary; it attests only the ောင့် side. The ေါင့် side remains unobserved.
- Added claim `CLM-WIKTIONARY-AUNG-DOT-ONE-SIDE-EXAMPLE-001`; updated lexical audit, MLCTS2 status parity and tests.
- Current collision distribution: **11 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 2 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 144 claims**.
- One-sided secondary attestation only; no collision adjudication or runtime/IPA gold/Ukrainian output promotion. Exact-head CI pending.

## One-sided lexical examples for `um:` and `un` — 2026-11-13

- Added MOW-listed `နှလုံး` (`hna.lum:`, `/n̥əlóʊɴ/`) for the `ုံး` side of `um:` and `ကုန်` (`kun`, `/kòʊɴ/`) for the `ုန်` side of `un`. Opposite sides remain unobserved.
- Added claims `CLM-WIKTIONARY-UM-COLON-ONE-SIDE-EXAMPLE-001` and `CLM-WIKTIONARY-UN-ONE-SIDE-EXAMPLE-001`; updated audit/crosswalk parity and regression tests.
- Current collision distribution: **9 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 4 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 146 claims**.
- One-sided secondary evidence only; no collision adjudication, IPA gold, runtime or Ukrainian output promotion. Exact-head CI pending.

## One-sided lexical examples for `au:`, `im` and `im.` — 2026-11-13

- Added MOW-listed `ကျော` (`kyau:`, `/t͡ɕɔ́/`) for the ော side of `au:`; `အိမ်` (`im`, `/ʔèɪɴ/`) for ိမ် in `im`; and `စိမ့်` (`cim.`, `/sḛɪɴ/`) for ိမ့် in `im.`. Opposite sides remain unobserved.
- Added three documentary claims and updated lexical audit, MLCTS2 status parity and regression tests.
- Current collision distribution: **6 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 7 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 149 claims**.
- One-sided secondary evidence only; no collision adjudication, IPA gold, runtime or Ukrainian output promotion. Exact-head CI pending.

## Final exact-head verification — 2026-11-13

- Final tested code/data SHA: `62bea5a26012cb1ace4ce11579e17f4a780c3e1e`.
- Required CI **43516197628 SUCCESS** and duplicate exact-SHA run **43516203122 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium installation passed.
- Optional Epitran raw-output diagnostic **43516203133 SUCCESS**, diagnostic only. IPA gold remains `NOT_READY_NO_ADJUDICATED_GOLD` with 0 independently adjudicated entries; accuracy remains null.
- npm reports one high-severity vulnerability. No dependency upgrade was made.
- Final ledger: 25 groups = **6 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 7 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 149 claims**.
- PR #147 remains OPEN / DRAFT / mergeable; branch is 598 commits ahead and 0 behind `main`. No merge or release performed.

## `am:` one-side lexical evidence — 2026-11-14

- Added Wiktionary attestation `လမ်း` (`lam:`, `/láɴ/`) for the `မ်း` side of the `am:` collision; no MOW lexical example for `ံး` was located.
- Updated lexical audit, MLCTS2 crosswalk, source claim and regression tests. Status: `SECONDARY_ONE_SIDE_ONLY`, not equivalence.
- Registry: **80 sources / 150 claims**. Collision ledger: **5 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 8 secondary one-side-only / 1 special non-rime**.
- Secondary evidence only; no primary MLC, IPA gold, runtime or Ukrainian mapping promotion. Exact-head CI pending.

## Exact-head verification — `am:` lexical evidence — 2026-11-14

- Verified SHA `73bfbd7d82f69bfa0e306d984a40fe2324fc3515`; required CI runs **43519075644 SUCCESS** and **43519083741 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium installation passed.
- Optional Epitran raw-output diagnostic **43519083746 SUCCESS**, not an accuracy benchmark. IPA gold remains `NOT_READY_NO_ADJUDICATED_GOLD` (0 independent gold entries); accuracy is not measurable.
- `npm install` reports one high-severity vulnerability; no unreviewed dependency upgrade.
- Ledger: 5 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 8 secondary one-side-only / 1 special non-rime. Registry 80 sources / 150 claims.
- No primary MLC, IPA gold, runtime or Ukrainian output promotion.

## `am.` secondary lexical distinction — 2026-11-14

- Wiktionary records `စိမ့်` (`cim.`, `/sḛɪɴ/`, final မ့်) and `ကြံ့` (`kram.`, `/t͡ɕa̰ɴ/`, final ံ့). MOW includes `စိမ့်` and compound `အိန္ဒိယကြံ့` as suffix-match candidates.
- These secondary transcriptions distinguish the rime realizations and conflict with vendor same-output MLCTS2/IPA. Audit and crosswalk set to `SECONDARY_SOURCE_DISTINCTION`; claim `CLM-WIKTIONARY-AM-DOT-LEXICAL-DISTINCTION-001` registered.
- Current distribution: 4 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 8 secondary one-side-only / 1 special non-rime. Registry 80 sources / 151 claims.
- Not a minimal pair or primary MLC adjudication. Runtime, IPA gold and Ukrainian output unchanged. Exact-head CI pending.

## `au.` one-side lexical attestation — 2026-11-14

- Wiktionary `ဝပ်ရှော့` (`waphrau.`, `/waʔʃɔ̰/`) supplies a lexical example for source unit `ော့`; no example for `ေါ့` was located.
- Audit and MLCTS2 crosswalk updated to `SECONDARY_ONE_SIDE_ONLY`; claim `CLM-WIKTIONARY-AU-DOT-ONE-SIDE-EXAMPLE-001` registered; tests expanded.
- Distribution: 3 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 9 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 152 claims.
- One-side secondary evidence only; no runtime or Ukrainian output change. Exact-head CI pending.

## Exact-head verification — `au.` lexical continuation — 2026-11-14

- Verified SHA `ffd08d7ae8e227ee19a86859de00b7d52f456ecf`; required CI **43519887514 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium install passed. Duplicate exact-SHA run **43519895530** was still completing.
- Optional Epitran raw-output diagnostic **43519895542 SUCCESS**, not accuracy benchmark. IPA gold remains `NOT_READY_NO_ADJUDICATED_GOLD`; npm install reports one high-severity vulnerability.
- Ledger: 3 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 9 secondary one-side-only / 1 special non-rime. Registry 80 sources / 152 claims.
- No primary MLC, IPA gold, runtime or Ukrainian output promotion.


## `um.` one-side secondary lexical attestation — 2026-11-14

- Wiktionary `အုံ့` (`um.`, `/ʔo̰ʊɴ/`) attests the source-unit ending ုံ့. It is **not** in the MOW suffix-match inventory; this is secondary evidence outside MOW. The opposite ending ုမ့် remains unobserved.
- Added claim `CLM-WIKTIONARY-UM-DOT-ONE-SIDE-EXAMPLE-001`; updated lexical audit, MLCTS2 status parity and regression tests.
- Distribution: **2 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 10 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 153 claims**.
- One-side secondary evidence only; no primary MLC adjudication, IPA gold, runtime or Ukrainian output promotion. Exact-head CI pending.


## `im:` one-side secondary lexical attestation — 2026-11-14

- Wiktionary `တစ်သဝေမတိမ်း` (`tacsa.wema.tim:`, `/təθwèmətéɪɴ/`) provides a compound-level attestation of final component `တိမ်း`, and MOW independently lists `တိမ်း` for source ending ိမ်း. This is not a standalone pronunciation entry; opposite unit ိံး remains unobserved.
- Added claim `CLM-WIKTIONARY-IM-COLON-ONE-SIDE-EXAMPLE-001`; updated audit, crosswalk parity and regression tests.
- Distribution: **1 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 154 claims**.
- Secondary compound evidence only; no primary MLC adjudication, IPA gold, runtime or Ukrainian output promotion. Exact-head CI pending.


## MOW orthographic suffix overlap — `a.` caution — 2026-11-14

- MOW suffix inventory has one apparent `a.` / `ာ့` match: `ဝပ်ရှော့`. This is only a code-point suffix overlap inside full final sequence `ော့`, not evidence of a standalone `a.` rime.
- Wiktionary lists `ဝပ်ရှော့` as `waphrau.`, IPA `/waʔʃɔ̰/`; it remains evidence for `au.` only. `a.` stays unadjudicated.
- Added regression test to prevent the orthographic suffix inventory from being misread as syllable/rime segmentation. Generator behavior unchanged because its declared contract is exact code-point suffix matching only.


## Exact-head verification — `im:` / `um.` and MOW suffix guard — 2026-11-14

- Test-bearing SHA `2b1f306b43a8a6c38e626252fb0b0b9c18501e1b`; required CI **43580029898 SUCCESS**: 252 Python + 66 subtests, 20 Node, 58 Playwright; IPA-gold structure validation, production build, generated-web-data freshness and Chromium install passed.
- A preceding test run failed because one old regression assertion still expected the former distribution (3 unadjudicated / 9 one-side-only). The count assertion was corrected to 1 / 11; the subsequent exact-SHA CI passed.
- IPA gold remains `NOT_READY_NO_ADJUDICATED_GOLD` (0 independent entries); npm reports one high-severity vulnerability. No dependency update applied.
- Final lexical ledger: 1 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime. Registry 80 sources / 154 claims.
- PR #147 remains OPEN / DRAFT / mergeable; branch 667 commits ahead / 0 behind main. No merge or release.


## `a.` phonetic context vs spelling-level evidence — 2026-11-14

- Full-text evidence from Mooney & Repetti-Ludlow 2021: one female Yangon speaker; open /a/ has a centralized closed-syllable outcome transcribed [5], with lexical phonetic examples but no Burmese script or MLCTS.
- Watkins 2001: one Rangoon male consultant; /ma/ and /maʔ/ examples and four-tone inventory, but no orthographic keys for the example words.
- Both sources are registered as documentary/phonetic evidence. They cannot adjudicate the `a.` source-unit collision (`ါ့` vs `ာ့`) without spelling-to-pronunciation linkage. `a.` remains the only unadjudicated group.
- The `ဝပ်ရှော့` MOW suffix hit is a raw overlap inside `ော့`, with `waphrau.` / `/waʔʃɔ̰/`; it is retained under `au.` only.


## `a.` one-side lexical update — 2026-11-14

- Wiktionary entry `ငါ့` gives IPA `/ŋa̰/`, MLCTS `nga.`, and explicitly identifies a non-lemma familiar/informal induced creaky-tone pronoun form from `ငါ`. Its spelling ends in `ါ့`, the first side of the `a.` collision.
- This is a real secondary spelling-to-pronunciation example, but it is not a MOW candidate or primary MLC dictionary evidence. No lexical example for `ာ့` was found. Status becomes `SECONDARY_ONE_SIDE_ONLY`, not adjudicated.
- The MOW `ဝပ်ရှော့` hit remains an overlap inside `ော့` and is counted under `au.` only.


## `a.` first-side lexical attestation — 2026-11-14

- Wiktionary's `ငါ့` entry gives `/ŋa̰/`, MLCTS `nga.`, and identifies it as a familiar/informal non-lemma induced creaky-tone form of `ငါ`. The final unit `ါ့` is the first source-unit side of `a.`.
- Updated `a.` to `SECONDARY_ONE_SIDE_ONLY`. This is secondary lexical evidence, not MOW coverage or primary MLC adjudication; no lexical example for `ာ့` located.
- Revised 25-group distribution: 0 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 12 secondary one-side-only / 1 special non-rime. Registry now 80 sources / 157 claims.


## `a.` second-side example found — 2026-11-14

- Wiktionary `တာ့တာ` (English borrowing *ta-ta*) has IPA `/ta̰tà/` and MLCTS `ta.ta`; its first syllable `တာ့` supplies the second source-unit side `ာ့` with `/ta̰/`.
- Together with `ငါ့` `/ŋa̰/`, MLCTS `nga.`, ending `ါ့`, both sides now have secondary lexical examples with matching `/a̰/` rime realization.
- Not a minimal pair, not primary MLC evidence. `တာ့` is internal to the word, so its absence from the MOW word-final suffix inventory is expected. Status becomes `SECONDARY_SYSTEM_EQUIVALENCE`; no runtime change.


## `a.` both-side lexical evidence update — 2026-11-14

- `တာ့တာ` is a Wiktionary Burmese lemma (borrowed interjection), IPA `/ta̰tà/`, MLCTS `ta.ta`; its first syllable `တာ့` supplies the second source unit `ာ့` with `/ta̰/`.
- Combined with `ငါ့` `/ŋa̰/`, MLCTS `nga.`, source unit `ါ့`, this gives secondary lexical examples on both sides with matching `/a̰/` rime realization. Not a controlled minimal pair or primary MLC adjudication.
- MOW's word-final suffix scan does not include `တာ့တာ` because `တာ့` is internal to the form; no issue with the scan's declared contract.
- Current 25-group distribution: 0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime. Registry 80 sources / 158 claims.


## Final exact-head verification — 2026-11-14

- Final tested code/data HEAD (subsequent closeout commits are documentation-only): `e6d865e1daa191a7ecc9cd5b0025b628cc930310`; required CI run **43581081561 SUCCESS**: 253 Python tests + 66 subtests, 20 Node tests, 58 Playwright tests. IPA-gold structure validation, build, generated-data freshness and Chromium install passed.
- Optional diagnostic run **43581085495 SUCCESS**. CRF raw output: 100 predictions, 84 source-concordant rows, 0 gold, `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`, accuracy null. Epitran raw output artifact generated; no accuracy score. Do not interpret these as evaluated benchmark results.
- Gold remains `NOT_READY_NO_ADJUDICATED_GOLD` (0 entries). npm install reports one high-severity vulnerability; no dependency update applied.
- Current lexical ledger: 0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime. Registry 80 sources / 158 claims.
- PR #147 OPEN / DRAFT / mergeable; branch remains ahead of main with zero commits behind. Not merged.


## PR #129 reconciliation and selective port — 2026-11-14

- Inspected all open PRs. PR #129 (`research/burmese-hybrid-benchmarks-reconciled-2026-11-11`, head `d0be0c316fe59f64f1b2f71e484c10d1356dbf3b`) remains OPEN/DRAFT, 53 commits ahead and 17 behind its then-current main base; current GitHub reports it non-mergeable. It is divergent from PR #147 and was not merged or closed.
- Compared its 21 changed files and ported the useful, non-conflicting work into PR #147: conservative IPA withholding for medials/conjunct/kinzi; explicit candidate-only `HybridBurmeseEngine` and provider adapters; provider provenance/ordering; Google WFST raw-output harness, tests and optional CI job; registry and README/docs updates. Existing current-branch source records for MYG2P, Google WFST and CRF were reused rather than duplicated.
- `external_backends_used` now reports providers actually attempted; external outputs remain diagnostic candidates and cannot replace the rule-engine IPA. The `myG2P` dictionary is not copied into the repository.
- PR #129 remains untouched so its owner can review/close it; the port is tracked on PR #147. The deterministic engine remains final authority and no phonological rule or gold label was promoted.


## Current exact-head comparator verification — 2026-11-14

- Required CI **43582075261 SUCCESS** on test-bearing SHA `45d3513ad1f6bbbda8d9a97768e493cdda08856d`: **267 Python tests + 68 subtests**, **20 Node tests**, **58 Playwright tests**; production build, generated-data freshness, Chromium install and IPA-gold structure validation passed. `npm install` still reports one high-severity vulnerability.
- Optional diagnostics **43582075278 SUCCESS** on the same SHA: Google WFST build/symbol checks and 6/6 raw outputs; Epitran 1.35.3 raw output; CRF 100/100 predictions and 84 source-concordant, but zero gold and possible training overlap.
- Downloaded artifacts were inspected. No output is gold and no accuracy was computed. Google report SHA `88372233d85df73593b030ee0f91aa678fe86fd1c6d5cdc18e7c609b8eefd2c6`; Epitran report SHA `a7d93e0f04b4f4822094a36760c5376cb596db31a710aae4cdcacd14213d0b69`; CRF report SHA `741dc7fa1263e667cb1c51f91f7ee0a24b0bd6c2479d1efafe63798a63d73d20`.
- Source registry now has **80 sources / 164 claims**; 25 rime groups: **0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**.


## Authoritative current handoff — 2026-11-14

This section supersedes all older branch-count, PR-state and CI snapshots above; those entries are historical checkpoints.

- Starting code/test snapshot for this continuation: `20ab71a61c296431776b8a6aed7bbb46ecb01da8` (PR #147 branch). Current test-bearing data/code head: `fd27f481470b5f6a08648cf0dcc25ab8b4a8ecf5`; required CI **43582496619 SUCCESS**: 267 Python tests + 68 subtests, 20 Node tests, 58 Playwright tests, IPA corpus structure check, production build, generated-data freshness and Chromium install. `npm install` reports one high-severity vulnerability.
- Optional comparator run **43582075278 SUCCESS** on the same implementation: Google Thrax/OpenFst build and symbol checks, 6/6 raw structural-only outputs; Epitran 1.35.3 six raw outputs; CRF 100/100 predictions and 84 source-concordant, but 0 gold and possible train/test overlap. Downloaded artifacts inspected; accuracy is null for all.
- Latest repository data integrity: **80 sources / 164 claims**, 25 rime groups = **0 unadjudicated / 9 secondary equivalence / 1 conflict / 3 distinctions / 11 one-side-only / 1 special non-rime**. No primary MLC adjudication; independent Yangon IPA gold remains 0.
- PR #147 is OPEN / DRAFT / mergeable; branch 745 commits ahead / 0 behind `main` at the test-bearing checkpoint. No merge, release or deployment. PR #129 remains OPEN / DRAFT / non-mergeable (53 ahead / 17 behind its base); its compatible work was selectively ported to #147, but PR #129 itself was left untouched. Recent merged PRs #141–#146 are already included because #147 is 0 behind main.
- Runtime change in this continuation is conservative abstention only: Python IPA withholds medials, conjuncts and kinzi rather than silently omitting them. External candidate API does not run by default and never promotes outputs; RuleBasedBurmeseEngine remains final authority. No new tone, rime or Ukrainian mapping rule was activated.
- Remaining blockers: primary MLC written-source adjudication; independent Yangon-profile IPA gold and expert annotators; full positional medial/coda/tone/phonation coverage and Python/browser parity; manual accessibility QA; Google WFST dependency hermeticity; commercial deployment/distribution rights for myG2P CC BY-NC-SA 4.0; one npm high-severity vulnerability. The repository remains a PARTIAL PROTOTYPE, not release-ready.


## Final exact-head closeout — 2026-11-14

- Final branch tip: `cf7bb590f0acb7929f10832ca80062b83a1b33a2`; PR #147 OPEN / DRAFT / mergeable, 750 ahead / 0 behind `main`; not merged.
- Required CI **43582678405 SUCCESS** on that exact tip: 267 Python + 68 subtests, 20 Node, 58 Playwright; build, generated-data freshness, Chromium and IPA-gold structure validation passed. One high-severity npm vulnerability remains.
- Optional diagnostics **43582678434 SUCCESS** on that exact tip: Google WFST 6/6 raw outputs, Epitran six raw outputs, CRF 100/100 predictions / 84 source-concordant. Zero gold, no accuracy. Artifacts inspected; provenance recorded in `sources.csv`, `source_claims.csv` and `external-ipa-renderers.json`.
- Source registry 80 sources / 164 claims. Rime ledger: 0 unadjudicated / 9 secondary equivalence / 1 conflict / 3 distinctions / 11 one-side-only / 1 special non-rime.
- PR #129 remains OPEN / DRAFT / non-mergeable and untouched; its compatible implementation was selectively ported into #147. Main unchanged, no release or deployment. Repository remains PARTIAL PROTOTYPE, not linguistically release-ready.


## Security and install reproducibility closeout — 2026-11-14

Vite `8.3.1` was the high-severity dependency finding. Updated the pinned dev dependency to `8.3.8` and added `npm audit --audit-level=high` to required CI. Exact-head run **43583443880 SUCCESS** on `6b90336171b807f5f17d32e237dda210f7b1a820`: npm audited 19 packages, found **0 vulnerabilities**, and the explicit audit gate passed. This closes the high-severity finding without `npm audit fix --force`.

Install reproducibility is now verified: `package-lock.json` (`lockfileVersion: 3`, 51 package entries) was committed at `35b2649481ac2f8532fdc1ebbf2c123d2abaf1ee`; CI now runs `npm ci` and `npm audit --audit-level=high`.


## npm clean-install reproducibility completed — 2026-11-14

A generated npm lockfile from Vite 8.3.8 resolution was validated (`lockfileVersion: 3`, 51 package entries) and committed as `package-lock.json` at commit `35b2649481ac2f8532fdc1ebbf2c123d2abaf1ee`. CI uses `npm ci` and `npm audit --audit-level=high`. Exact-head CI **43583859568 SUCCESS** on `2c17f9843766913c40654c59965a63593b604092`: 267 Python + 68 subtests, 20 Node, 58 Playwright; npm ci, audit, build, generated-data freshness and Chromium passed; 0 vulnerabilities.


## Final repository closeout — 2026-11-14

- Test-bearing code/data head `2c17f9843766913c40654c59965a63593b604092`; required CI **43583859568 SUCCESS**: 267 Python + 68 subtests, 20 Node, 58 Playwright; `npm ci`, `npm audit --audit-level=high`, build, generated-data freshness and Chromium passed; 0 vulnerabilities.
- `package-lock.json` is committed (lockfile v3, 51 package entries); CI now uses `npm ci`. The high-severity Vite advisory is fixed with Vite 8.3.8.
- IPA gold remains 0 independently adjudicated entries; validator correctly returns `NOT_READY_NO_ADJUDICATED_GOLD`. Primary MLC adjudication remains unavailable. Repository is still a PARTIAL PROTOTYPE, not release-ready.


## 2026-11-14 continuation — full-text evidence and dependency security

- Current exact-head test checkpoint before this documentation/data update: `716e65b4fac5b4f2ec782ffacdf9408521503d01`; required CI `43583984697 SUCCESS`: 267 Python + 68 subtests, 20 Node, 58 Playwright; `npm install` and explicit `npm audit --audit-level=high` each reported 0 vulnerabilities. Vite is pinned to 8.3.8.
- Five additional source claims registered after full-text reads of Hlaing & Mikami 2014, Watkins 2001, and Oo et al. 2020. Hlaing's FST is orthographic only; its grammar has unreconciled M/V multiplicity expressions and no stated reuse license. Watkins is a broad transcription of one Rangoon consultant, not a population-validated gold set. Oo's seed lexicon and SLR80 are not independently adjudicated IPA gold.
- Rime ledger verified from CSV: 25 groups = 0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime. No primary MLC adjudication and no independent IPA gold.
- Security finding closed. Remaining install reproducibility gap: no committed `package-lock.json`; CI still uses `npm install`, not `npm ci`. A lockfile artifact exists in run 43583094199 but was not ported into the repo.
- Continue to keep runtime and Ukrainian outputs unchanged until primary lexical evidence and independent adjudication are available.


## Correction: npm lockfile state and final test checkpoint — 2026-11-14 12:20 UTC

The preceding continuation note incorrectly stated that no committed npm lockfile existed. This was corrected by inspecting the actual branch: `package-lock.json` is present (lockfileVersion 3, 51 package entries; blob `43c0da9092cc0c63f7ed5f89a11ad5c6039aeb1e`), and the workflow uses `npm ci` plus `npm audit --audit-level=high`. Exact-head required CI **43584975330 SUCCESS** on `58fe38c15f6373948640c89921d818d3be3cafff`: 267 Python + 68 subtests, 20 Node, 58 Playwright; `npm ci` and explicit audit both report **0 vulnerabilities**. Therefore npm install reproducibility and the Vite high-severity advisory are DONE_VERIFIED; do not carry forward the earlier incorrect blocker.

Current source registry after five new claims: **80 sources / 169 claims**. Rime ledger: **0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Independent IPA gold remains 0. Repository remains a PARTIAL PROTOTYPE, not linguistically release-ready.


## Exact-head optional diagnostics — 2026-11-14

Optional workflow **43584975335 SUCCESS** on PR head `58fe38c15f6373948640c89921d818d3be3cafff`: Google WFST build/symbol checks and 6/6 structural-only outputs; Epitran 6/6 raw outputs; CRF 100/100 predictions, 84 source-concordant, 0 gold and possible training overlap. All artifacts downloaded and inspected; report/ZIP hashes and exact links recorded in `data/external-ipa-renderers.json` and `source_claims.csv`. All accuracy values remain null; candidates stay disabled by default.

Current branch data checkpoint: 80 sources / 169 claims; 25 rime groups = 0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime. Final required CI on `58fe38c15f6373948640c89921d818d3be3cafff` was `43584975330 SUCCESS` (267 Python + 68 subtests, 20 Node, 58 Playwright; npm ci and audit 0 vulnerabilities). The later source-registry and documentation commits require the latest exact-head CI to finish before final closeout.


## `un` lexical ledger extension — 2026-11-14

A secondary Wiktionary appendix directly lists `ဂုဏ်` /ɡòuɴ/ and `ကုန်` /kòuɴ/; the `ဂုဏ်ထူး` compound entry confirms the first component `ဂုဏ်` /ɡòʊɴ/ with MLCTS `gunhtu:`. The `un` group was upgraded to `SECONDARY_SYSTEM_EQUIVALENCE` (not primary adjudication). Regression tests updated. Registry **80 sources / 170 claims**; rime ledger **0 unadjudicated / 10 secondary equivalence / 1 conflict / 3 distinctions / 10 one-side-only / 1 special non-rime**. Exact-head CI is pending for this last evidence/test change.


## Exact final checkpoint — 2026-11-14 12:30 UTC

- Branch `research/burmese-medials-g2p-evidence-2026-11-13`, final tested HEAD `1ce829eda10ae5c3b3e4b9772efb434043198a75`; PR #147 OPEN / DRAFT / mergeable, **794 ahead / 0 behind** `main`; no reviews or inline review threads.
- Required CI **43585743620 SUCCESS** on exact HEAD: **267 Python tests + 68 subtests**, **20 Node**, **58 Playwright**; IPA corpus structural validator, `npm ci`, `npm audit --audit-level=high` (0 vulnerabilities), production build, generated-data freshness and Chromium install all passed.
- Source registry: **80 sources / 170 claims**. Rime ledger: **25 groups = 0 unadjudicated / 10 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 10 secondary one-side-only / 1 special non-rime**.
- `un` upgraded to secondary equivalence from `ဂုဏ်` /ɡòuɴ/ (also first component in `ဂုဏ်ထူး`) and `ကုန်` /kòʊɴ`; claim `CLM-WIKTIONARY-UN-SECOND-SIDE-EXAMPLE-001`; tests updated. Not primary MLC adjudication or controlled minimal pair.
- Required security/install status: Vite 8.3.8, committed `package-lock.json` (lock v3, 51 package entries), CI `npm ci`, audit 0 vulnerabilities — DONE_VERIFIED.
- PR #129 remains OPEN / DRAFT / non-mergeable (53 ahead / 17 behind `main`), untouched; its compatible changes selectively ported to #147. No merges, releases or deployments.
- Remaining genuine blockers: primary MLC transcription table/dictionary text not retrieved; independent Yangon-profile expert IPA gold remains 0; complete positional phonology/tone/phonation and Python/browser parity incomplete; manual accessibility QA outstanding; Google WFST dependency references not fully content-address pinned; commercial reuse of myG2P remains blocked by CC BY-NC-SA 4.0. Repository status: **PARTIAL PROTOTYPE — not linguistically release-ready**.


## Final verified state — 2026-11-14 12:35 UTC

- Final tested SHA `f1854a75f63281e536f7c661eac1ad19f541833b`; PR #147 OPEN / DRAFT / mergeable, 798 ahead / 0 behind `main`, 61 changed files; no reviews or inline threads. PR #129 remains OPEN / DRAFT / non-mergeable (53 ahead / 17 behind); untouched. No merge/release/deployment.
- Required CI **43585929068 SUCCESS** on exact SHA: 267 Python tests + 68 subtests, 20 Node, 58 Playwright; IPA structure validation, `npm ci`, high-severity npm audit (0 vulnerabilities), build, generated-data freshness and Chromium install passed.
- Source registry: 80 sources / 170 claims. Rime ledger: 25 groups = 0 unadjudicated / 10 secondary equivalence / 1 conflict / 3 distinctions / 10 one-side-only / 1 special non-rime.
- `un` secondary lexical equivalence claim and tests are included. No primary MLC adjudication, no independently adjudicated Yangon IPA gold, no runtime or Ukrainian mapping promotion.
- Vite 8.3.8, lockfile v3 committed (51 package entries), `npm ci` and zero-vulnerability audit are DONE_VERIFIED.
- Still blocked/partial: primary MLC dictionary/transcription pages unavailable; independent expert IPA gold and annotators unavailable; positional medial/coda/tone/phonation coverage and Python/browser phonological parity incomplete; manual accessibility QA outstanding; Google WFST dependency transitive pinning not fully hermetic; myG2P commercial reuse blocked by CC BY-NC-SA 4.0. Repository remains **PARTIAL PROTOTYPE, not linguistically release-ready**.


## Two additional `au` lexical evidence groups — 2026-11-14

`au:` upgraded using `ပေါ` `/pɔ́/` (MLCTS `pau:`, source ေါ) plus `ကျော` `/t͡ɕɔ́/` (MLCTS `kyau:`, source ော). `au.` upgraded using `ပေါ့` `/pɔ̰/` (MLCTS `pau.`, source ေါ့) plus final syllable `/ʃɔ̰/` of `ဝပ်ရှော့` (MLCTS `waphrau.`, source ော့). Claims `CLM-WIKTIONARY-AU-COLON-SECOND-SIDE-EXAMPLE-001` and `CLM-WIKTIONARY-AU-DOT-SECOND-SIDE-EXAMPLE-001` registered; tests updated. `ပေါ့` is outside the MOW suffix candidate inventory. Secondary evidence only, no controlled minimal pair, no primary MLC adjudication or runtime promotion.

Registry: **80 sources / 172 claims**. Rime ledger: **0 unadjudicated / 12 secondary equivalence / 1 conflict / 3 distinctions / 8 one-side-only / 1 special non-rime**. Required CI **43586334287 SUCCESS** on `dd494662f0c94bcf1f59170fe65ea6cd41199c64`: 267 Python + 68 subtests, 20 Node, 58 Playwright; npm ci and audit 0 vulnerabilities.


## Continuation — MLC dictionary access and rime-table evidence (2026-11-14)

- Starting verified branch checkpoint before this continuation: `1312a1fe03e1d9bc3fe551514f0e44ff6e22ff7d`; base `main` was `dc90463bdd734867308f03cb627eb8941efc19d6`. Existing PR #147 was open/draft/mergeable and 812 commits ahead / 0 behind at that checkpoint. Its exact-head required workflow 43586469354 and optional Epitran workflow 43586469388 both completed successfully. This continuation appends evidence and a regression test; it does not merge the PR.
- Google Books record for the 1996 Dunwoody Press reprint of the MLC 1993 Myanmar-English Dictionary states that the original is from the University of Michigan and that the 635-page item was digitized on 2008-05-15. Only catalog metadata was accessible in this review; no page images, OCR entry, pronunciation key or MLCTS/MLCTS2 table was inspected. Registered as `GOOGLE_BOOKS_MLC1996_DIGITIZED` / `CLM-GOOGLE-BOOKS-MLC1996-DIGITIZATION-001`.
- SHACHI's independent resource record for the SEAlang Burmese Dictionary states that it contains about 35,000 entries, derives from the MLC 1993 dictionary (1996 Dunwoody Press reprint), supports IPA phonetic search/display, and identifies copyright in the MLC/Dunwoody source. It does not expose record-level fields or prove whether the dictionary's internal representation is MLCTS, MLCTS2 or another schema. Registered as `SHACHI_SEALANG_DICT_2009` / `CLM-SHACHI-SEALANG-MLC-DICT-METADATA-001`.
- Wiktionary's secondary rhyme table includes `ကိံ` /kèɪɴ/ MLCTS `kim` alongside `ကိမ်`. This is a schematic/table-level example, not a lexical word entry. Registered as `CLM-WIKTIONARY-KI-SECONDARY-RIME-TABLE-001`; it does not change the `im` lexical status or meet the two-sided lexical acceptance criterion.
- Direct SEAlang dictionary page returned HTTP 502; the historical API URL was inaccessible through the available web retrieval. No MLC dictionary entry or internal export schema was obtained. The primary MLC transcription-table task therefore remains BLOCKED on page-level source access.
- Registry: **82 sources / 175 claims**. The 25-group lexical audit remains **12 secondary equivalence / 1 secondary conflict / 3 secondary distinctions / 8 secondary one-side-only / 1 special non-rime**. No new primary adjudication, no independent IPA gold, no runtime or Ukrainian mapping promotion.
- Added `test_mlc_dictionary_access_leads_and_secondary_rime_table_are_not_overstated` to protect the evidence boundary. Required CI **43618679936 SUCCESS** on exact code/test head `9e1a770cfd3d5e4c56264f79e458637f8c9bc1f9`: **268 Python tests + 68 subtests**, **20 Node tests**, **58 Playwright tests**; IPA-gold structure validation, `npm ci`, `npm audit --audit-level=high` (0 vulnerabilities), production build and generated-data freshness passed. Subsequent register/handoff edits are documentation-only. The optional raw-output/CRF/Google-WFST diagnostic workflow is tracked separately and must not be treated as an accuracy benchmark.


## Continuation — MLC second edition and phonetic evidence (2026-11-14)

- Added a concrete primary-source access lead: CiNii record BD10832446 lists a 709-page 2nd/revised edition of the 1993 Myanmar-English Dictionary, chief editor Dr Myint Kyi, published by the Department of Myanmar Nationalities' Languages; one copy is held by the University of Tokyo General Library. CiNii/NDL say 2019; a 2023 scholarly bibliography cites 2020. Preserve the date discrepancy. No pages, pronunciation key, MLCTS/IPA field or license for reuse has been inspected.
- NDL's 2022 bibliographic guide pp.53-59 says the SEAlang Burmese Dictionary is based on the 1993 MLC / 1996 Dunwoody reprint and notes a second edition in 2019. Its sample Burmese words use ALA-LC bibliographic romanization, not phonetic transcription.
- The 2008 SEAlang project paper shows IPA input and phonetic result display. The screenshot includes /ein/ and /êi/ with house/home senses, but the Burmese headword is not recoverable from text extraction; no lexical row added and no assumption made about stored record format.
- Hlaing & Thida (2018) supplies two minimal pairs (ပန်း /pan/ vs ဗန်း /ban/; ပန်း /pan/ vs ပုန်း /pon/), but they are onset/vowel contrasts outside the target rime collisions and dialect is unspecified. Win & Takara (2011) supports four formal Standard Myanmar tone categories and F0+duration analysis, with five speakers including two Yangon natives. Mooney & Repetti-Ludlow (2021) lacks Burmese-script headwords/MLCTS in the phonetic examples. None resolves the eight one-sided groups.
- Registry: 89 sources / 189 claims. Lexical audit remains 12 equivalence / 1 conflict / 3 distinction / 8 one-sided / 1 special non-rime. No new primary MLC adjudication, IPA gold, runtime mapping or Ukrainian candidate.
- Code/test commit 6b487d31dda78efca218f1f98038f0bb0e0fae57 triggered required CI run 43619590836, which failed one test assertion caused by lowercase/uppercase mismatch in a scope substring. 269 Python tests + 68 subtests passed, 1 failed. Fixed only the assertion in 3b5e55cc8ac45afee6c98cf6999510012669ddf2. The corrected assertion was included in subsequent code/test head bccc8c3c495fdaa20736a104eabc4d0642345ac6; required CI run 43619829840 completed SUCCESS: 270 Python tests + 68 subtests, 20 Node tests, 58 Playwright tests; IPA-gold structure validation, npm ci, high-severity audit (0 vulnerabilities), production build and generated-data freshness passed. Later commits are documentation-only. The previous successful baseline on 9e1a770c... remains valid for that earlier snapshot only.
- New Undermind continuation file: /analysis/2026-11-14-mlc-dictionary-access.md; deep search /analysis/Burmese MLC lexical transcription and rime contrasts completed 2026-11-14.


- Further primary institutional corroboration: the Ministry of Education FY 2018-19 Annual Performance Review Report, p.256, lists “Myanmar-English Dictionary (2019)” as an output of the Department of Myanmar Nationalities' Languages. This reinforces 2019 over the lone 2020 bibliographic variant, while the edition statement/editorial details still require title-page inspection.


## Continuation — TUFS MED crosswalk and lexical evidence (2026-11-14)

- Registered Tokyo University of Foreign Studies' Burmese Pronunciation Module. Section 1.3 explicitly identifies the 2019 Myanmar-English Dictionary second edition as MED and compares its own notation with IPA, TUFS's notation, Kato 2019, Ohno 2000 and a Chinese dictionary. The MED column gives rime/tone spellings including -a/-a:/-a., -in/-in:/-in., -ein/-ein:/-ein., -aun/-aun:/-aun. and checked -a' etc. TUFS states its own notation is mainly based on Kato 2019; do not treat its IPA column as a verified MED record export or conflate MED with MLCTS.
- TUFS describes three tones for open/nasal syllables, final -ɴ nasalization, and checked -ʔ syllables generally falling (some researchers count these as a fourth tone). It supplies Burmese-script lexical examples and IPA.
- Updated one-sided lexical audit examples for five groups: am: (ကမ်း /káɴ/ on မ်း), aung. (စောင့် /sâuɴ/ on ောင့်), im (သိမ် /t̪èiɴ/ on ိမ်), im: (သိမ်း /t̪éiɴ/ on ိမ်း), im. (သိမ့် /t̪êiɴ/ and စိမ့် /sêiɴ/ on ိမ့်). For စောင့်, TUFS's falling-tone /sâuɴ/ differs from Wiktionary's creaky /sa̰ʊɴ/; preserve the disagreement. No missing source-unit side was found, so all eight statuses remain one-sided. No mapping or Ukrainian candidate promotion.
- TUFS notes aspirated ချိုင်း /cʰáiɴ/ is regarded as non-lexical by most speakers and absent from MED 2019 although present in Ohno 2000; a voiced /jáiɴ/ form is listed. This is a lexicon coverage/speaker judgment issue, not a rule.
- Registry **89 sources / 189 claims**.
- CI run 43620266372 had one test assertion wording failure; corrected in code/test commit 9e0d134a3189a4d57d38de1fa6c0e7b85725d72e. Required CI run **43620353708 SUCCESS**: **271 Python tests + 68 subtests**, **20 Node tests**, **58 Playwright tests**, IPA-gold structure validation, npm ci, npm audit (0 vulnerabilities), production build and generated-data freshness all passed.
- Optional diagnostics run 43620353669 completed SUCCESS: Epitran, CRF and Google WFST raw-output jobs succeeded. Google WFST returned 6/6 outputs with 0 runtime errors but 0 independent gold (accuracy null). CRF returned 100 predictions, 84 source-concordant, with 0 gold and NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. These are raw-output diagnostics, not accuracy results.


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

## Engine continuation — browser evidence status and stale end-to-end assertions (2026-11-14)

- Starting tested head for this continuation: `821cfbe945db8529c5765dfc9c1e673653a544f5` (PR #147 branch; earlier run exposed one stale Node assertion). Current code/test head: `9333bdfec405f9fafb36bab42d90965e11f5e155` on `research/burmese-medials-g2p-evidence-2026-11-13`.
- Repaired the Node test to match the actual two-stage fail-closed onset check. Corrected a browser aggregate-status bug: `ANALYSIS_DEPENDENT` and `UNCERTAIN` are now preserved in `ipaStatus` rather than collapsed to `NOT_ESTABLISHED`.
- The first full Playwright run then surfaced four old assertions expecting canonical outputs for analysis-dependent onset/vowel entries. Updated those tests to require withheld IPA/Ukrainian output and explicit `IPA: ANALYSIS_DEPENDENT`. No new pronunciation value, phonological rule, IPA gold label or Ukrainian mapping was introduced.
- **Exact PR-head required CI:** run `43630941796` SUCCESS — 277 Python tests + 68 subtests; package install and gold corpus structural validator PASS; npm audit gate PASS; production build PASS; generated web data freshness PASS; 21 Node tests PASS; 58 Playwright tests PASS.
- Push-triggered required run `43630938330` was still running at the time this note was written; do not infer its result from the PR run. Optional CRF and Epitran raw-output jobs succeeded on run `43630941801`; Google Thrax/OpenFst build was still in progress. These are diagnostic raw outputs, not accuracy results.
- PR #147 remains OPEN / DRAFT; main remains unchanged. PR #129 remains OPEN / DRAFT / non-mergeable and untouched. PR #147 remains far ahead of main (950 commits, 0 behind at this checkpoint); no merge or release performed.
- Readiness remains **PARTIAL PROTOTYPE**, not linguistically release-ready: independent expert-adjudicated IPA gold 0, empirical accuracy null, and full Python/browser parity not established.


## Continuation — Python/browser structural-status parity — 2026-11-14

- Starting branch head: `e1f9713636c1d1e6718b72f7b7092f193bc9203b`; branch `research/burmese-medials-g2p-evidence-2026-11-13`; main remains `dc90463bdd734867308f03cb627eb8941efc19d6`.
- Fixed the browser's loss of uncertainty reason for recognized but unimplemented medials, conjuncts and kinzi. Python exposes `phonetic_status=analysis_dependent`; browser now retains `ANALYSIS_DEPENDENT` instead of reducing these cases to `NOT_ESTABLISHED`. IPA and Ukrainian output remain withheld.
- Extended the existing shared fixture file with `ကြွေ`, `က္ကာ`, `င်္ကာ`; both Python and Playwright suites consume these cases. Tests assert the same conservative IPA/status boundary. No phonological rule, IPA value, gold label or Ukrainian candidate was promoted.
- Code/test commits: `49806e7eb32c0d78f231c79ea6eaf420cb122191` (browser status); `22f0b95af6fc132fd47dd276e6e9a83c0c233227` (shared fixture); `a8bd52ebe2e269ce280ef33b3e46b85dfeaa5f93` (Python fixture test); `0b0156e1139a6b277ead4a42606b69c31050468d` (browser fixture assertions and stale expectation updates).
- Exact PR-head required CI run [43638222569](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638222569) SUCCESS on code/test head `0b0156e1139a6b277ead4a42606b69c31050468d`: 278 Python tests + 68 subtests; 21 Node tests; 59 Playwright tests; IPA-gold schema validator executed; npm audit gate reports 0 vulnerabilities; production build, generated-data freshness and Chromium installation passed.
- Optional diagnostics run `43638222580`: Epitran raw-output job SUCCESS; CRF and Google Thrax/OpenFst jobs were still running at this checkpoint. These remain diagnostic-only and cannot establish accuracy.
- Ledger: shared structural-status parity is **PARTIAL**; complete Python/browser parsed-object and phonological parity remains TODO/PARTIAL; independent expert-adjudicated IPA gold remains 0 and empirical accuracy null. No audio accessed. PR #147 remains open/draft/unmerged; PR #129 remains untouched/open/draft/non-mergeable; main unchanged. Repository remains **PARTIAL PROTOTYPE**, not linguistically release-ready.


## Continuation — canonical coda/prosody evidence gate and Python/browser parity — 2026-11-14

- Extended the browser's conservative canonical IPA boundary to codas, asat, anusvara and prosodic marks. This now matches Python's `_ipa` withholding contract for these structures; the browser marks recognized unresolved structures `ANALYSIS_DEPENDENT`, withholds IPA and emits no Ukrainian candidate.
- The browser's previous coda/rime-derived canonical outputs for `ပင်`, `ကုန်`, `ကိုက်` and `ကော်` were removed from the accepted path. Their former tests now assert withholding. The underlying experimental derivation code remains behind the gate and is not promoted.
- Shared `tests/fixtures/shared_unicode_contract.json` now contains seven phonetic-status cases covering medial, conjunct, kinzi, nasal coda, checked coda, asat-conditioned rime and anusvara. Python and Playwright suites consume the same cases.
- Code/test head `93e9c9283acb757ec7cb0a61d974faecc7e45eff`; exact PR-head required CI [43638560797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638560797) SUCCESS: 278 Python + 68 subtests; 21 Node; 59 Playwright; npm audit 0 vulnerabilities; production build, generated-data freshness and Chromium install passed. Push-triggered duplicate run `43638555772` was still in progress at documentation time.
- The status-level structural parity gate is improved but remains **PARTIAL**: complete parser-object, syllable-boundary, vowel-combination, prosody and IPA→Ukrainian trace parity are not yet established. No phonological rule, IPA gold label or Ukrainian mapping was added. Independent expert IPA gold remains 0; empirical accuracy null.
- Readiness remains **PARTIAL PROTOTYPE**. Main unchanged; PR #147 remains open/draft/unmerged; PR #129 remains untouched/open/draft/non-mergeable. No audio accessed.


## Continuation — internal kinzi syllable boundary and cross-runtime fixture — 2026-11-14

- Identified a concrete Python/browser structural mismatch in `မင်္ဂလာ`: browser treats internal kinzi as the final nasal of the preceding syllable (`မင်္`) and starts the next onset at `ဂ`; Python had absorbed `ဂ` into the same cluster. Python parser now recognizes internal KINZI as a structural coda and segments the next onset separately.
- Prefix kinzi remains a different structure and stays attached to its onset. The first implementation incorrectly split prefix-kinzi clusters; required CI run `43638831711` exposed three regressions. Corrected the boundary condition so a split occurs only for internal kinzi, not when the current cluster begins with KINZI. Existing tests were preserved and expanded.
- Added shared structural fixture `မင်္ဂလာ` with exact expected syllable units `မင်္`, `ဂ`, `လာ`; Python and Playwright tests consume it. Python also asserts internal kinzi position, final nasal code point and structural status. No pronunciation, IPA or Ukrainian mapping was added.
- Corrected code/test head `e97aaebf43d99e9d21597fba6b35625fb5ca0bd2`; exact PR-head required CI [43638895912](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638895912) SUCCESS: 280 Python tests + 68 subtests; 21 Node tests; 60 Playwright tests; npm audit 0 vulnerabilities; production build, generated-data freshness and Chromium install passed.
- Structural kinzi boundary is **DONE_VERIFIED**. General Python/browser syllabification parity remains **PARTIAL**. IPA gold remains 0 and accuracy null. No audio accessed.


## Continuation — shared all-medials structural parity contract — 2026-11-14

- Extended the shared fixture file with all 11 medial forms listed by the existing MLC/Unicode structural inventory: four basic signs, five two-medial combinations and two three-medial combinations. The fixture carries ordered structural IDs only, not IPA or Ukrainian values.
- Python tests assert the expected medial IDs and one orthographic syllable. Playwright tests consume the same JSON fixture and assert the same displayed syllable unit plus `IPA: ANALYSIS_DEPENDENT`; the browser continues to withhold canonical IPA and Ukrainian output for these medials.
- Exact code/test head `702568dcf2214787938b6964708cb6e7d4d52e92`; required PR-head CI [43639262508](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43639262508) SUCCESS: 280 Python + 68 subtests; 21 Node; 60 Playwright; npm audit 0 vulnerabilities; production build, generated-data freshness and Chromium install passed.
- This closes the shared structural fixture requirement for the enumerated medial inventory, not phonological parity. Medial phonetic realization, complete parser-state parity and Ukrainian adapter traces remain PARTIAL/BLOCKED pending source-located, profile-matched evidence and independent adjudication. IPA gold remains 0; accuracy null.

## Continuation — unknown Myanmar extension cluster parity — 2026-11-14

- A focused Python/browser audit found a real structural segmentation divergence. Python keeps every Myanmar-block code point inside the current orthographic unit until the next recognized Burmese base consonant; the browser previously split an unrecognized Myanmar extension character immediately because it was absent from PHONETIC_INPUT_CHARS. Thus ကာ + U+AA60 was one Python cluster with an unparsed tail but two browser units. This was a parser-boundary defect, not a phonological disagreement.
- Updated browser segment() so Myanmar inventory membership no longer controls segmentation. The full Myanmar-block run is retained structurally; parseCluster() then reports an unsupported/uncertain sequence without assigning IPA or Ukrainian output. The recognized-base boundary is retained, so U+AA60 followed by ကာ still yields two units.
- Added Playwright regressions for both directions: unknown extension after a valid syllable remains attached to that cluster; unknown extension before a valid base remains a separate unsupported unit. Existing Python test test_adjacent_unknown_myanmar_extension_is_preserved_after_valid_syllable supplies the matching Python-side contract.
- Code commit 003e4db004361b90531990a692980ffb2a4a43c1; browser regression commit b01667abc786b11de455c5f4eb276083d43e64dd. Required CI for the final docs/code head is pending at documentation time; do not mark this DONE_VERIFIED until exact-head PR and push workflows pass.
- Status: implementation and regression coverage are PARTIAL pending CI. This closes one explicit boundary mismatch only. Full Python/browser parser parity remains PARTIAL: status taxonomies and structural record schemas are not yet represented by a complete shared canonical projection, and the full Myanmar orthographic boundary space is not source-annotated. No IPA labels or Ukrainian mappings were added. Independent adjudicated IPA gold remains 0; empirical accuracy remains null.

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

## Continuation — source-scoped onset/medial evidence matrix — 2026-11-15

- Added data/burmese/onset_cluster_evidence.csv (13 source-linked rows), schemas/onset_cluster_evidence.schema.json, and tests/test_onset_cluster_evidence.py.
- The matrix separates: obligatory onset and placeless coda claims; Green's C(G) major-syllable template; the minor-syllable-only complex-onset prohibition; foot-initial cluster analysis and reduction; attested /mj/ examples; Ishida's context-conditioned YA/RA/WA/HA descriptions; Hlaing's orthographic medial combinations; and STEDT's separate Written Burmese and historical Rangoon inventories.
- Crucial negative finding: Green's prohibition on complex onsets in minor syllables is not a global ban. The sequences ကျ and ကြ are not labelled prohibited; Ishida records palatalized velar-conditioned outcomes. The sources inspected do not provide an exhaustive modern Yangon onset × medial × rime legality table.
- All 13 rows have runtime_status=WITHHELD; this is an evidence inventory, not a new phonological runtime, IPA gold set or Ukrainian mapping.
- Task ledger: source-backed consonant/medial evidence matrix and source integrity test — DONE_VERIFIED after exact-head CI; exhaustive segmental cluster legality and lexical distribution — PARTIAL; profile-matched phonological runtime rules — PARTIAL/BLOCKED by insufficient source coverage and absent adjudicated IPA.
- No audio was recorded, no third-party corpus was copied, and no licensing scope was expanded. Main remains unchanged; PR #147 remains the continuation vehicle.


## Continuation — cross-source phonology terminology matrix — 2026-11-15

- Added §10 to the vowel × medial × checked-syllable × prosody evidence matrix and marked the corresponding workpack task DONE_VERIFIED at the document/evidence level.
- The matrix separates tone inventory, checked/killed labels, segmental /ʔ/, creaky phonation, phonemic vowel length, measured duration, consonantal spread-glottis, nasal /N/, glides/medials and source transcription conventions across Green, Watkins, Mooney & Repetti-Ludlow, Duan & Zhu and Repetti-Ludlow.
- Reconciled stale Duan & Zhu coverage: the full text is now inspected (not merely the abstract); five speakers from Yangon, Taunggyi and the Mandalay region, 89 items and 694 valid tokens are reported; T1/T3 speaker variation is recorded. No audio was accessed. This remains a competing analysis, not project consensus.
- No tone or phonation rule, IPA mapping or Ukrainian output was enabled. Independent adjudicated IPA gold remains 0.

## Exact-head verification — source-scoped phonology evidence continuation — 2026-11-15

- Code/data/test verification head: 424e27120d51c7d256b1d43b30b6897ea3761f42. After its successful CI, only documentation files were updated; final documentation closeout head: 9215f5bb8c1c110db9d6b0ea3a1216df53fbd5a9. Main remains unchanged; branch is 1042 commits ahead and 0 behind.
- Added 13 source-linked onset/medial/coda evidence rows, dedicated JSON Schema and integrity tests. The source-backed matrix is explicitly not an exhaustive modern Yangon prohibited-cluster list. Green's minor-syllable complex-onset restriction is scoped to minor syllables; C(G) remains allowed in his major-syllable analysis. Ishida's velar-conditioned palatalization means ကျ/ကြ are not globally marked prohibited.
- Added cross-source terminology reconciliation covering tone, checked/killed, creaky phonation, phonemic length vs duration, consonantal spread-glottis, /N/, medial/glide distinctions and transcription conventions. Corrected stale Duan & Zhu scope wording: full text inspected, five mixed-region speakers, 89 words/694 valid tokens; no audio accessed.
- Exact code/data/test-head required CI [43647671663](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43647671663) SUCCESS: 286 Python tests + 68 subtests, 21 Node tests, 64 Playwright Chromium tests; 0 npm vulnerabilities; production build, generated-data freshness, IPA-gold structure validation and Chromium tests pass.
- Optional diagnostics [43647671628](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43647671628): CRF and Epitran jobs passed; Google FST job was still running at note time. These remain raw-output diagnostics, not accuracy measurements.
- **Task ledger:** source-backed onset/medial evidence matrix + schema/tests — DONE_VERIFIED; cross-source terminology matrix — DONE_VERIFIED; exhaustive modern Yangon cluster legality and lexical distribution — PARTIAL; profile-matched phonological runtime rules and IPA → Ukrainian mapping — PARTIAL/BLOCKED by incomplete evidence and zero independent IPA gold.
- No phonological runtime mapping, Ukrainian mapping, corpus import or license change was made. Repository remains PARTIAL PROTOTYPE, not linguistically release-ready.

## Terminal optional G2P diagnostic closeout — 2026-11-15

Optional workflow [43647671628](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43647671628) completed SUCCESS on code/data/test head 424e27120d51c7d256b1d43b30b6897ea3761f42. All three jobs passed: Epitran raw-output, CRF baseline, pinned Google Thrax/OpenFst build + symbol-table invariants + raw-output.
- Google FST: 6/6 outputs, 0 runtime errors, independent gold 0, accuracy null; report SHA-256 7fec8ba8845c5fe8758155708eb8d32cfa1fa684b46eeaabc7fc8455abae0606.
- CRF: 100/100 predictions, 84/100 source-concordant, gold 0, accuracy null, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP.
- Artifacts: Google ID 14134846400, digest ac5cd0b7b00a746d67116fc32831369e555e316d554bedfc34bf6b18378b0949 (expires 2027-02-12); Epitran ID 14134308008, digest 13ae2b78ac2a9b961e1e10231a58f787fb5b11142640997b7a1bf6ff327dc797 (expires 2027-02-12); CRF ID 14135275454, digest dcd9667213ea2c611795a8b3851c7809ea26b853755e6b36291d373e9466ccc0 (expires 2026-12-14).
- These are raw-output diagnostics only. They do not supply independent IPA gold, accuracy estimates or grounds to promote a backend. This terminal result supersedes the prior in-progress note.


## Continuation — source-scoped rime/prosody evidence matrix — 2026-11-15

- Added `data/burmese/rime_prosody_evidence.csv` with 11 source-scoped rows, `schemas/rime_prosody_evidence.schema.json`, `tests/test_rime_prosody_evidence.py`, and seven new claims in `data/burmese/source_claims.csv`.
- Green 2005 evidence is scoped to its 50-major-rhyme/four-tone analysis: diphthongs are closed-only; /e,o/ are open-only in the cited table; nasal rhymes exclude checked tone; /N/ is represented separately from surface nasalization; vowel length is non-contrastive in the author's moraic analysis.
- Mooney & Repetti-Ludlow 2021 is recorded as one female native Yangon consultant and restricted experimental targets. The matrix separates open/closed vowel alternations, the authors' tone-independent sonority analysis, isolation vs sentential acoustic cue differences, and nasalized vs oral token observations.
- All rows remain `WITHHELD`; no phonological runtime rule, IPA value, Ukrainian mapping or gold label was added. The extracted article text is used for claims/locators; project audio was not accessed.
- Exact-head CI is pending. Keep `BURMESE-RIME-PROSODY-MATRIX-001` PARTIAL until the new test suite and full required workflow pass. The complete lexical Yangon rime grid and independent adjudicated IPA gold remain open blockers.


### Source transcription correction

A visual check of Green 2005's printed Table (9) and §2.2 pages resolved an OCR ambiguity. The open-only mid-vowel set is /e, o, ɔ/; /ɛ/ is permitted in open syllables and before /ʔ/, but not before /N/. The rime/prosody matrix now has 12 rows and a dedicated claim/test for this distinction. This is a source-faithful correction only; no runtime rule was enabled.


### Verification checkpoint — rime/prosody evidence batch (2026-11-15)

- Final code/data/test head for this batch: `f0c240abde1a1aedefcfcb3f9694311318f91c04`. The new matrix has 12 rows, 16 consistent CSV fields, unique evidence IDs, valid source/claim references, schema-required fields aligned to the CSV header, and all 12 rows explicitly `WITHHELD`.
- Required CI run `43689485005` on the earlier test head failed with **2 assertion-text mismatches only** in the new test file; 289 tests passed and 68 subtests passed. The test expectations and source wording were corrected, and Green's /ɔ/ vs /ɛ/ distribution was aligned with the printed page image.
- Latest required exact-head workflow `43689588512` on `f0c240a` is **QUEUED**, not yet passed. Optional diagnostics `43689588524` are also queued. Do not mark the matrix DONE_VERIFIED until exact-head CI succeeds.
- A local clone/test run was not possible in this session because the container could not resolve github.com. No local test result is claimed.
- Runtime, IPA and Ukrainian mappings remain unchanged. The full modern Yangon lexical rime grid and independent adjudicated IPA gold remain open.


### Final exact-head CI closeout — rime/prosody evidence — 2026-11-15

- Required workflow [43689588512](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43689588512) **SUCCESS** on code/data/test head `f0c240abde1a1aedefcfcb3f9694311318f91c04`.
- Python: **291 passed + 68 subtests**; Node: **21 passed**; Playwright Chromium: **64 passed**.
- npm audit: **0 vulnerabilities**; production build and generated-data freshness passed; IPA-gold structure validator executed successfully but still has zero adjudicated gold.
- The 12-row source-linked rime/prosody evidence artifact is now `DONE_VERIFIED`. The full modern Yangon lexical rime grid, independent adjudicated IPA gold and runtime phonological coverage remain `PARTIAL/BLOCKED`; no IPA or Ukrainian mapping was promoted.


## Optional diagnostic artifact inspection — 2026-11-15 (run 43689588524)

The optional workflow [43689588524](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43689588524) has now completed successfully on code/data/test head `f0c240abde1a1aedefcfcb3f9694311318f91c04` (PR merge ref `3c4c5c20bd9d8837d5af53832d69ae4bc9a92c52`). All three jobs completed: CRF baseline, Epitran raw output, and Google Thrax/OpenFst build + symbol-table invariants + raw-output smoke.

- Google Thrax/OpenFst: **6/6** structural probes returned non-empty output; 0 runtime errors; independent gold 0; accuracy `null`; `RAW_OUTPUT_SMOKE_NOT_ACCURACY`. Report SHA-256 `eb9e803bf203e363bcf2eb173e21024798b55678f62bbdd3205bd539f85db0f6`; artifact ID `14152141084`, GitHub artifact digest `sha256:eb9e803bf203e363bcf2eb173e21024798b55678f62bbdd3205bd539f85db0f6`, expires 2027-02-13.
- CRF: **100/100** predictions; **84/100** source-concordant; gold 0; accuracy `null`; status `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`. Model training membership is not established, probe syllabification is supplied rather than evaluated, and source labels are related to the model's myG2P source. Artifact ID `14151244554`, digest `sha256:39e9d49a4f100af0cb1b0e65032ebb76cc1d53c5ef30bba4787968ceec912b91`, expires 2026-12-15.
- Epitran **1.35.3**: all six structural probes emitted raw output; expected IPA remains empty and all comparisons are unscored. Report records zero eligible verified gold and null exact-match accuracy. Artifact ID `14151438782`, digest `sha256:2ab261cf68a6078f0428575c6d0c8ec2264e640486cb7e98c11a3b585afc68e1`, expires 2027-02-13.

The three ZIP artifacts were downloaded and their JSON payloads inspected. This confirms reproducible build/execution and exposes candidate disagreement, not correctness. Do not calculate an accuracy from source concordance, promote any output to IPA gold, enable an external engine in runtime, or use these results to derive Ukrainian mappings. The optional workflow is now fully closed; the required exact-head CI remains the separate acceptance evidence for the implementation batch.


## Accessibility continuation — keyboard navigation and reduced motion — 2026-11-15

Implemented a small, targeted accessibility improvement in the two public HTML entry pages:
- `index.html` and `system.html` now expose a first-in-tab-order skip link, “Перейти до основного вмісту”, targeting the main landmark. The main landmark has `id="main-content"` and `tabindex="-1"` so fragment navigation can move keyboard focus to it.
- `src/web/styles.css` reveals the skip link only on keyboard focus, gives it a visible high-contrast focus outline, and retains the existing `prefers-reduced-motion: reduce` override that disables smooth scrolling.
- `tests/browser/converter.spec.js` adds three Playwright cases: keyboard skip navigation on the converter page, reduced-motion computed scroll behavior, and skip navigation on the methodology page.

Current branch head after these changes: `481c26d6951d4795e16e239f9332c3e42f7d3f44` (1085 ahead / 0 behind main). File-level verification through GitHub confirms both pages contain the skip link and focusable main target, the shared stylesheet contains the focus-only skip-link rule and reduced-motion media query, and the browser suite contains all three regression cases. The required workflow run is not yet exposed for this exact head (commit workflow lookup returned no runs; combined commit status has not been verified as successful). Do not mark this acceptance gate DONE_VERIFIED until hosted CI passes.

**Status:** implementation present; automated regression coverage authored; acceptance **PARTIAL / CI PENDING**. Manual screen-reader, mobile viewport, zoom/reflow and deployed visual QA remain TODO; no claim of WCAG conformance is made. The change does not alter conversion behavior or phonological mappings.


## Accessibility verification closeout — 2026-11-15

Required workflow [43690500850](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43690500850) completed **SUCCESS** for PR #147 head `a415dc1a89c7d9cf06a78896e3dcab3bb3824004` (GitHub tested merge ref `c559d4d0bbb88c44f7cd64bf199014b26b23d556`). Exact logged outcomes:
- Python: **291 passed + 68 subtests**.
- Node: **21 passed, 0 failed**.
- Playwright Chromium: **67 passed**, including the three new accessibility regressions.
- IPA-gold validator executed successfully but reports 0 records, 0 annotations and 0 adjudicated records (`NOT_READY_NO_ADJUDICATED_GOLD`).
- npm audit: **0 vulnerabilities**; production build passed; generated web data freshness passed.

The keyboard skip navigation and reduced-motion browser regressions are now **DONE_VERIFIED** by exact PR-head CI. This is not a full accessibility certification. A static WCAG contrast calculation on selected existing foreground/background pairs found: body 15.43:1, muted body 5.16:1, status text 5.73:1, input hint 4.56:1, warning copy 6.63:1, warning link 8.48:1, primary-button text 6.19:1, focus blue against the main surface 6.81:1. The smallest sampled ratio is 4.56:1; this limited source-color sample is not an automated full-page contrast audit and does not cover every state, overlay, disabled control or rendered pixel.

Manual screen-reader, mobile reflow, 200–400% zoom, deployed visual QA and full-page contrast/state coverage remain **TODO**. No WCAG conformance claim is made. This verification supersedes the prior CI-pending note; the exact tested PR head is `a415dc1`, while the branch may advance with documentation-only closeout commits.


## TUFS pronunciation-module rime crosswalk — 2026-11-15

- Added three source-linked, explicitly typed documentary crosswalk rows to `data/burmese/rime_prosody_evidence.csv`: open-vowel, nasal-closed and checked-closed rimes. They record the university module's IPA/TLM/NEB/MED 2019/Ohno/Chinese-dictionary correspondences in Section 1.3, table 2 (open rows 151–172; nasal rows 173–193; checked rows 194–201).
- The source explicitly warns that pronunciation notation varies with researchers' phonological interpretations. The new rows therefore classify this as `documentary_crosswalk`, not experimental or primary lexical evidence. MED forms such as -a/-a:/-a., -an/-an:/an: and -a' remain distinct from the module's IPA forms and are not assumed to be MLCTS.
- The three rows preserve the module's distinction between nasalized vowels plus /ɴ/ and checked /ʔ/; its treatment of checked syllables separately from three open/nasal tones is one analytical convention, not project-wide consensus.
- Added the `documentary_crosswalk` schema enum and a regression test that checks all three categories and their withholding. All 15 rime/prosody rows remain `WITHHELD`; no runtime mapping or generated pronunciation changed.
- Source: Tokyo University of Foreign Studies, Burmese Pronunciation Module, Section 1.3, https://www.coelang.tufs.ac.jp/mt/my/pmod2/1-3/1.html (accessed 2026-11-15). The page is copyrighted; no source text dataset was copied.
- Verification at this point: source table visually/textually inspected in the published university module; repository test execution awaits exact-head hosted CI. No local test execution is claimed.


## TUFS rime crosswalk verification closeout — 2026-11-15

- The three TUFS crosswalk records are now structurally valid CSV (15 data rows, 16 fields per row), linked to the existing TUFS source and claim, and schema-valid under the new `documentary_crosswalk` evidence type. A direct RFC-4180 field-count check through the fetched branch file confirmed all rows have exactly 16 fields; the regression suite additionally validates every row against the JSON Schema.
- **Exact-head CI:** PR workflow [43691172177](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43691172177) SUCCESS on `673319e267edeca7bf1a4d082fdf17835cfe8ffc`. Results: **292 Python tests + 68 subtests passed**, **21 Node tests passed**, **67 Playwright Chromium tests passed**, npm audit **0 vulnerabilities**, production build passed, generated web-data freshness passed, and independent IPA-gold structure validation completed. The test log reports 0 adjudicated IPA gold remains unchanged; no accuracy is established.
- Two intermediate CI attempts exposed malformed CSV quoting and overly literal assertions. Both were corrected; the successful exact-head run above includes the final CSV and test changes. Earlier failed attempts are not counted as verification.
- **BURMESE-RIME-PROSODY-MATRIX-001 — DONE_VERIFIED (source-evidence artifact and exact-head CI):** 15 linked rows, schema, regression tests. **BURMESE-YANGON-RIME-GRID-001 remains PARTIAL**; this is still not a full item-level lexical rime × coda × tone × phonation grid.
- All 15 rows remain `WITHHELD`. No runtime rules, IPA gold, Ukrainian mappings, or generated pronunciation artifacts changed. Independent adjudicated IPA gold remains 0; empirical accuracy remains null.
- Branch head at this closeout: `673319e267edeca7bf1a4d082fdf17835cfe8ffc`; PR #147 remains open and draft. Main remains unchanged.


## Lexical evidence expansion — MLCTS am. rime — 2026-11-15

A targeted Wiktionary follow-up verified three additional Burmese word entries for the already represented first source-unit side မ့်: ဆိမ့် /sʰḛɪɴ/, နိမ့် /nḛɪɴ/, and လိမ့် /lḛɪɴ/. Alongside the previously recorded စိမ့် /sḛɪɴ/, this gives four secondary word-level entries for မ့်; the opposite source-unit side ံ့ remains represented by ကြံ့ /t͡ɕa̰ɴ/. The lexical audit row and existing claim `CLM-WIKTIONARY-AM-DOT-LEXICAL-DISTINCTION-001` were expanded in place. Added a regression test for all five exact word/IPA/MLCTS observations and the non-promotion boundary. This remains secondary source-level distinction evidence, not a controlled minimal pair or primary MLC adjudication; the broader rime grid and runtime status are unchanged. Exact page locators: Wiktionary entries for [ဆိမ့်](https://en.wiktionary.org/wiki/ဆိမ့်), [နိမ့်](https://en.wiktionary.org/wiki/နိမ့်), [လိမ့်](https://en.wiktionary.org/wiki/လိမ့်), alongside previously recorded [စိမ့်](https://en.wiktionary.org/wiki/စိမ့်) and [ကြံ့](https://en.wiktionary.org/wiki/ကြံ့). Retrieved 2026-11-15.


## am. lexical evidence verification closeout — 2026-11-15

- Expanded the existing `am.` lexical audit and claim with three individually inspected Wiktionary entries: ဆိမ့် /sʰḛɪɴ/, နိမ့် /nḛɪɴ/, and လိမ့် /lḛɪɴ/. Together with စိမ့် /sḛɪɴ/, the source-unit side မ့် now has four word-level attestations; the opposite unit ံ့ remains represented by ကြံ့ /t͡ɕa̰ɴ/.
- Exact page checks: [ဆိမ့်](https://en.wiktionary.org/wiki/ဆိမ့်), [နိမ့်](https://en.wiktionary.org/wiki/နိမ့်), [လိမ့်](https://en.wiktionary.org/wiki/လိမ့်); existing entries [စိမ့်](https://en.wiktionary.org/wiki/စိမ့်) and [ကြံ့](https://en.wiktionary.org/wiki/ကြံ့). These are secondary lexical transcriptions; they do not constitute a controlled minimal pair or primary MLC adjudication.
- Added a regression test for all five exact Burmese forms, MLCTS values and IPA values, including the no-runtime-promotion boundary.
- Exact final-head PR CI [43692035411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43692035411) SUCCESS on `ed16e0b9efba6780e21608ee04a09b1b9915770e`: **293 Python tests + 68 subtests passed**, **21 Node tests passed**, **67 Playwright Chromium tests passed**, npm audit **0 vulnerabilities**, production build and generated-data freshness passed.
- The lexical audit remains secondary evidence; all runtime conversion rules and Ukrainian mappings remain unchanged. No adjudicated IPA gold was added and no accuracy claim follows.


## Final am. evidence CI and diff hygiene — 2026-11-15

- Rebuilt the two touched CSV files from their pre-change contents and replaced only the targeted `am.` evidence/claim records, preserving all unrelated rows byte-for-byte. The final compare against pre-change head `4196147de0a5735dea8c5e494346e192dd90d26b` shows exactly one changed line in `source_claims.csv` and one changed line in `romanization_rime_collision_lexical_audit.csv`, plus the new regression test and three documentation updates. No runtime or generated files are changed.
- Exact-head workflow [43692279971](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43692279971) SUCCESS on `74dc298086292bd6cbaeb965eb1a6ad9e1926a74`: **293 Python + 68 subtests**, **21 Node**, **67 Playwright Chromium**, npm audit **0 vulnerabilities**, build and generated-data freshness pass.
- The subsequent documentation-only commits record this verified code/data head; they do not change executable files or evidence content. Current branch head at documentation update: `74dc298086292bd6cbaeb965eb1a6ad9e1926a74` before these doc-only commits.


## Lexical evidence expansion — MLCTS any: rime — 2026-11-15

Wiktionary follow-up added three word-level entries on the `ဉ်း` side: စဉ်း /sɪ́ɴ/ (cany:), ကျဉ်း /t͡ɕɪ́ɴ/ (kyany:), and ဖျဉ်း /pʰjɪ́ɴ/ (hpyany:). Together with existing အကျဉ်း /ʔət͡ɕɪ́ɴ/, this yields four secondary lexical examples for `ဉ်း`; the `ည်း` side remains represented by နည်း /nɛ́/ or /ní/ depending on sense. Updated the existing source claim and lexical audit row in place and added regression coverage for all four first-side examples, the second-side example, and the explicit non-promotion boundary. The records remain secondary lexicographic evidence, not a controlled minimal pair or primary MLC adjudication. No runtime, IPA gold, Ukrainian mapping, or generated pronunciation data changed. Pages inspected 2026-11-15: [စဉ်း](https://en.wiktionary.org/wiki/စဉ်း), [ကျဉ်း](https://en.wiktionary.org/wiki/ကျဉ်း), [ဖျဉ်း](https://en.wiktionary.org/wiki/ဖျဉ်း), [အကျဉ်း](https://en.wiktionary.org/wiki/အကျဉ်း), [နည်း](https://en.wiktionary.org/wiki/နည်း).


## Historical spelling lead for MLCTS am: — 2026-11-15

A targeted search found a historical orthographic occurrence of `ကံး` in R. F. St. Andrew St. John, *A Burmese Reader* (1894). The vocabulary note gives English glosses including “day” and “sun”. The preface says the author generally followed Judson spelling and explicitly notes variation among Burmese books. This is therefore recorded as a historical spelling lead only: it supplies no IPA, modern MLCTS form, modern MLC dictionary adjudication, or evidence of present-day Yangon pronunciation. The source registry, source-claim ledger, `am:` audit interpretation and regression test now preserve this distinction. The `am:` row remains `SECONDARY_ONE_SIDE_ONLY`; no runtime or Ukrainian mapping promotion is permitted. Source: https://www.highlightcomputer.com/A%20Burmese%20reader.pdf (1894; inspected 2026-11-15).


## Additional secondary component attestation for MLCTS im — 2026-11-15

A Wiktionary entry for the Pali-derived Burmese proper noun `တာဝတိံသာ` provides contributor-supplied IPA `/tàwa̰tèɪɴθà/` and MLCTS `tawa.timsa`; its Burmese spelling contains component `တိံ`, corresponding to the `ိံ` source unit in the `im` collision. The entry cites the Myanmar-English Dictionary (Myanmar Language Commission 1993), but the IPA displayed is Wiktionary's field, not an MLC transcription. This adds secondary lexical corroboration to the existing myG2P component-level records; it does not create a native minimal pair or primary MLC adjudication. The `im` status remains `SECONDARY_SYSTEM_EQUIVALENCE`; no runtime or Ukrainian mapping promotion. Inspected 2026-11-15: https://en.wiktionary.org/wiki/တာဝတိံသာ.


## Myanmar Net lexical corroboration for MLCTS um: — 2026-11-15

Myanmar Net's dictionary index lists the obsolete borrowed proper noun `ဟုမ်းမရူး` (“Home Rule”) and gives the non-IPA respelling `/houn: ma ru:/`. The initial component `ဟုမ်း` contains the `ုမ်း` source unit already found in the myG2P syllable segmentation. This is a separate dictionary-level lexical lead for an English loan compound, not an IPA attestation: the site does not identify its underlying dictionary edition in the search result and the respelling is not IPA. Added source record `SHWE_NET_HOME_RULE_ENTRY`, claim `CLM-SHWE-UM-COLON-LOAN-COMPOUND-001`, audit provenance and regression coverage. The `um:` status remains `SECONDARY_SYSTEM_EQUIVALENCE`; no runtime or Ukrainian mapping promotion. Source: https://shwe.net/ref/home/dictionary/%E1%80%9F/page/11/ (retrieved 2026-11-15).


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


## Exact-head verification and optional diagnostics closeout — 2026-11-15

- Current research branch head: `1bc34e6d51c9f3589b66f50636fe9e29301ede7f`; PR #147 remains open and Draft. The branch is 1,138 commits ahead of `main`, 0 behind; `main` remains unchanged. Open PR #129 remains untouched on its separate benchmark branch.
- Required push CI [43696075472](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696075472) and PR CI [43696078055](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696078055) both SUCCESS on this exact head. Push-job log: 298 Python tests + 68 subtests passed; 21 Node tests passed; 67 Playwright Chromium tests passed; npm audit reported 0 vulnerabilities; production build, generated-data freshness and IPA-gold structural validation completed. IPA gold count remains 0; empirical accuracy remains null.
- Optional diagnostics [43696078060](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696078060) also SUCCESS on the same head. Google Thrax/OpenFst: 6/6 raw outputs, 0 runtime errors, independent gold 0, accuracy null; artifact ID 14154970133, report SHA-256 `1b7bea9394badbb6944ddccd8f52ad669bb02f19c90c4f38aa406780336aece8`, uploaded archive digest `c2a0e7c6fe481c4c0edd3168f0eb7dd62b1b9a7a86b8412720a3b03b6888e4a1`. CRF: 100/100 predictions, 84 source-concordant, gold 0, accuracy null, explicitly NOT SCORED due possible training overlap; artifact ID 14154556115, archive digest `af7d2ab1ec8530411124c1374ceaebdba680ca3886f3345bfa4b0fa2c77168b0`. Epitran raw output completed; artifact ID 14154307632, report SHA-256 `d94bb99b714318479f5bc5f45cab255425c11216fce57f9f38cc07587ffc9c3b`, archive digest `5718ad092f9116dccc25d90f509f4a29f66d96e3be3d9d3e7a7563aeb9adca55`.
- This supersedes the earlier 2026-11-15 note that the Google FST job was still running. All three optional diagnostic jobs are now terminal SUCCESS. This is raw-output/build execution evidence only, not phonetic accuracy or production readiness; no candidate engine is promoted.
- No runtime, generated pronunciation data, IPA gold, or Ukrainian mapping changed in this verification closeout. Overall readiness remains PARTIAL PROTOTYPE.



## 2026-11-15 — documentation-head CI and diagnostic rerun closeout

- Verified current branch tip before this handoff update: `9fdac2c94872eeb5702e801e1c46ea5e932ff6ae`. The branch is 1,139 commits ahead of `main`, 0 behind; PR #147 remains OPEN / DRAFT / mergeable. PR #129 remains untouched. Main is unchanged.
- Required push workflow [43696922642](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696922642) completed SUCCESS on that exact branch tip. Job [132759429822](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696922642) confirms: 298 Python tests + 68 subtests passed; 21 Node tests passed; 67 Playwright Chromium tests passed; npm audit found 0 vulnerabilities; production Vite build, generated web-data freshness, and IPA-gold structural validation all completed. The validator's gold count remains zero; empirical accuracy remains null.
- Optional diagnostic workflow [43696922641](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696922641) completed SUCCESS on the same branch tip. Google Thrax/OpenFst produced 6/6 raw outputs with 0 runtime errors, independent gold count 0 and accuracy null; report SHA-256 `51a05c235d341d62742a0e73d6db616b616057e3dd4f3d3d32a4346534dba917`, artifact ID 14154897335, archive digest `961b5989e9c037861f7bebd07fa86c6bec2547b69eeff7d6a43facc9c0cc2058`. CRF returned 100/100 predictions, 84 source-concordant rows, gold count 0, accuracy null, and `NOT_SCORED_POSSIBLE_TRAINING_OVERLAP`; artifact ID 14154871257, archive digest `a7f21f44ca369e5857ae1eb6473128b1c0d4cf39388b405997151eeb7a6252a6`. Epitran raw output completed; report SHA-256 `feb2f188b2426e946eb62bc9c783f6eb85b2e3a699452399577439b5db7c34ba`, artifact ID 14154353595, archive digest `18bbd88f16025d699bf4896eef81ef197b8881612b8f6f27d0d98bbb1f62e7ca`.
- These diagnostics verify executable output generation and artifact provenance only. They do not establish phonetic correctness, independent generalization, or production suitability. No external engine, pronunciation rule, IPA annotation, Ukrainian mapping, or generated pronunciation data is promoted.
- This entry supersedes earlier handoff snapshots that predate commit `9fdac2c` and records the workflow run that tested that documentation-only commit. Overall status remains PARTIAL PROTOTYPE, not release-ready.



## 2026-11-15 — SEAlang live-access probe and primary-record blocker

- Re-inspected the live SEAlang Burmese dictionary page. It identifies its principal source as the Myanmar-English Dictionary (1993, Myanmar Language Commission; 1996 Dunwoody Press reprint, used with permission), reports approximately 35,000 entries, confirms MLC 1986 standard orthography, and exposes an IPA phonetics search field. The live HTML form posts to `https://sealang.net/burmese/search.pl`; the documented 2008 SEAlang Services paper describes a Web API for dictionary lookup and gives an example request shape, but does not by itself establish that the legacy API remains operational today.
- Tested the live CGI endpoint with ordinary orthographic targets including `ကမ်း`, `သိမ်း`, and `မြန်မာ`, plus a phonetic query. Each returned the server diagnostic `SNARK: could not read ../../ram//.tei` followed by “Nothing found”; this is an infrastructure/backend failure signal, not evidence that the dictionary lacks those entries. The legacy `api.sealang.net` endpoint could not be reached through the available retrieval proxy (ERR_TUNNEL_CONNECTION_FAILED).
- **BLOCKED — entry-level MLC evidence:** no live dictionary entry, IPA transcription, definition, or export record was retrieved. Do not mark any rime collision resolved or import data from the page's interface metadata. Acceptance requires a functioning record lookup/export or direct inspection of the 1993/1996 dictionary, with exact headword, displayed transcription, query/date and provenance captured. Copyright remains with MLC/Dunwoody Press; retrieval does not grant redistribution rights.
- Useful primary-source access references: [live SEAlang Burmese Dictionary](https://sealang.net/burmese/dictionary.htm), [dictionary query help](https://sealang.net/help/q-dict.htm), and the archived [SEAlang Services API description](https://www.sealang.net/archives/sealang-2008.pdf). These establish interface/search capability and provenance, not entry-level lexical claims.
- No registry rows, source claims, IPA labels, runtime rules, Ukrainian mappings or generated outputs changed as a result of this failed access probe.



## 2026-11-15 — MLC dictionary print-access route discovered

- SEAlang remains blocked at entry level: the live CGI returns `SNARK: could not read ../../ram//.tei`; the legacy API could not be reached through the available retrieval proxy. Do not interpret this as “entry not found”.
- New bibliographic evidence makes primary-source access actionable. Dunwoody Press currently lists the 1996 reprint of the 1993 MLC *Myanmar English Dictionary* and describes ~35,000 entries in 1986 standard orthography plus a transcription system used as a pronunciation aid for English speakers. This is catalogue metadata, not a sample entry or proof that the transcription is IPA.
- The National Diet Library of Japan catalogues the 1996 imprint; Cinii records seven Japanese university holdings for the 1993 edition. Cinii also identifies a revised 2019 second edition (709 pages; Burmese headwords with English definitions) and one holding at the University of Tokyo General Library. The 2019 catalogue does not say whether the pronunciation-transcription system is retained.
- Added source records `MLC1996_REPRINT_CATALOG` and `MLC2019_REVISED_BIB` and documentary claims `CLM-MLC1996-PRONUNCIATION-AID-001` / `CLM-MLC2019-REVISED-EDITION-001`. Updated external corpus/source triage with the access routes and acceptance boundary.
- Next acceptance step: inspect the 1996 edition's transcription key and sample entries (or confirm field continuity in 2019), record exact page/headword and edition, and determine whether the notation is phonetic/phonemic/orthographic before using it. No entry, IPA value, runtime rule, Ukrainian mapping or gold label was inferred from catalogue metadata.
- Sources: [Dunwoody Press](https://www.thedunwoodypress.com/product-page/myanmar-english-dictionary), [National Diet Library](https://ndlsearch.ndl.go.jp/en/books/R100000002-I000003254368), [Cinii 1993 holdings](https://ci.nii.ac.jp/ncid/BA24767941), [Cinii 2019 edition](https://ci.nii.ac.jp/ncid/BD10832446). Overall status remains PARTIAL PROTOTYPE.



## 2026-11-15 — canonical registry count reconciliation after MLC bibliographic additions

A fresh parse of the current branch's canonical CSVs (not historical snapshots) reports **96 source records / 207 source claims / 25 rime-collision groups**. All source IDs and claim IDs are unique; every claim's `source_id` resolves to a registered source. Current rime-group status distribution: **15 SECONDARY_SYSTEM_EQUIVALENCE / 5 SECONDARY_ONE_SIDE_ONLY / 3 SECONDARY_SOURCE_DISTINCTION / 1 SECONDARY_SOURCE_CONFLICT / 1 SPECIAL_NONRIME_CONTEXT_DEPENDENT**. The two new MLC bibliographic source records and two documentary claims are included in those totals. Historical 80/164 or 80/172 counts in earlier entries are time-scoped snapshots, not current totals. This structural parse is not a substitute for the repository's full Python/schema test suite.


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


## 2026-11-15 — MLC dictionary access trail refined (SHACHI / TIL)

- New access evidence narrows the MLC dictionary blocker. SHACHI metadata for the SEAlang Library Burmese Dictionary describes an approximately 35,000-entry resource based on the 1993 MLC Myanmar-English Dictionary (1996 Dunwoody Press reprint), says the source was used with permission, and describes IPA sound-based lookup. The linked SEAlang endpoint timed out during this check. SHACHI metadata is not the underlying data, does not grant this repository reuse rights, and does not prove that the resource's outputs are adjudicated IPA.
- TIL's Romabama material contains many lexical examples cited to specific MEDict pages. A TIL note says MEDict itself provides a pronunciation guide in a non-phonetic-alphabet script. The displayed TIL forms are in the TIL author's Romabama conventions; they are not verified reproductions of the MLC notation. Treat them only as secondary lexical leads for primary-page cross-checking.
- Dunwoody Press catalogue confirms the MED's 1993 publication, about 35,000 entries and a pronunciation transcription aid; WHO Myanmar Library catalogue records a 635-page copy as available in its holdings. Neither means the project has inspected the physical pages.
- Ledger refinement: PARTIAL — discoverable secondary MED-linked lexical index and access routes; BLOCKED — primary MLC notation key / original entries, SEAlang content access and independent reuse-rights verification. No source rows or lexical data were added because no primary notation key, entry image or reusable dataset was obtained.
- Sources: https://shachi.org/resources/3949 ; https://www.tuninst.net/RBM-TYPEWRITER/von01.htm ; https://www.tuninst.net/HUMAN-VOICE/HV-indx.htm ; https://www.thedunwoodypress.com/product-page/myanmar-english-dictionary ; https://kohammr.searo.who.int/bib/487
- No runtime, IPA gold, Ukrainian mapping, licensing decision, merge, deployment or release change occurred. Readiness remains PARTIAL PROTOTYPE.


## 2026-11-15 — continuation checkpoint after MLC access review

- Final commit SHA is recorded in the PR head and final session report; this handoff avoids a self-referential SHA that would become stale when the file itself is committed.
- PR #147: OPEN / DRAFT; the latest GitHub metadata reports `mergeable: false` (recheck after GitHub recalculates); head is the dedicated research branch; 0 commits behind `main`, 78 changed files at this snapshot. No reviews or review threads are present. PR #129 remains OPEN / DRAFT / non-mergeable and was not modified.
- Main remains the base; no merge, deployment, release or main-branch write occurred.
- The required CI result for this exact documentation head is **not verified**: the combined commit-status endpoint returned no statuses, and the PR-triggered workflow lookup returned no runs for this head. Prior successful exact-head CI on code-bearing commit `23983ab8ade692e1795039dd114c352dddee16ef` remains valid for that code/test snapshot only; it must not be represented as a test run on this later documentation head.
- The current docs-only changes refine the MLC dictionary access evidence and remove duplicate validation sentences from `system.html`. No runtime or data files, source registries, IPA labels, gold annotations or Ukrainian mappings changed in this continuation.
- Remaining acceptance blockers: primary MED notation key and page-located entries plus independent rights review; independent adjudicated IPA gold and overlap-free scoring; complete Yangon vowel/rime/coda/tone/phonation coverage; Python/browser parity against independent gold; manual screen-reader, zoom, contrast and focus QA.
- Overall status remains **PARTIAL PROTOTYPE / NOT LINGUISTICALLY RELEASE-READY**.

## 2026-11-15 — Mya2Rom secondary identification of MED transcription variant

- Found a high-value secondary source: the Mya2Rom README explicitly distinguishes orthographic MLCTS from modified/phonetic MLCTS2 and says the modified version is used by the Myanmar Language Commission in its Myanmar-English Dictionary and by SEAlang. This is the strongest explicit identification found so far for the MED's transcription family, but it is not a primary MLC notation key or inspected dictionary entry.
- Reconciled the finding with the already registered and vendored source MYA2ROM044 and its existing MLCTS2 / MLCTS-vs-MLCTS2 / limitations claims. No duplicate source or claim was retained. Added a regression test over the existing registry records.
- The same README documents major romanizer limitations: no schwa or voicing-sandhi modelling; incomplete stacked-letter/asat handling; alternate pronunciations omitted; Pali/Sanskrit exceptions. Its IPA mode is Wikipedia-style. Treat it as a secondary comparator, not a gold IPA engine.
- The repository declares CC-BY-SA-4.0. No code/tables were copied; no license compatibility decision for this project's own distribution was made.
- No phonology runtime, IPA gold, Ukrainian mapping or production output changed. Primary MLC notation-key verification and independent gold remain blocked.

## 2026-11-15 — Mya2Rom registry-boundary test and exact-head CI

- Added regression test over the already-existing MYA2ROM044 source and documentary claims to assert that orthographic MLCTS and modified MLCTS2 remain distinct, that MLCTS2 is not conflated with the separate IPA mode, and that the documented romanizer limitations remain visible in the evidence registry. No duplicate source/claim row remains.
- Exact-head workflow [43733991562](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43733991562) SUCCESS on code/test commit b27a5d3fce31df66ef3dab8296019a7796953468: **309 Python tests + 68 subtests**, **21 Node tests**, **68 Playwright Chromium tests**, production build, generated-data freshness and npm audit (0 vulnerabilities) all passed.
- The IPA gold validator correctly remains NOT_READY_NO_ADJUDICATED_GOLD (0 adjudicated records). Passing engineering CI does not change linguistic readiness. Manual assistive-technology QA and independent IPA annotation remain unresolved/outside scope.

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


## 2026-11-16 — exact-main continuation checkpoint after PR #163

- Re-fetched the repository after PRs #160–#163. Default branch is `main`, exact HEAD `0f752b172b7c3bcc7f6b88c0204b7f27c9d9b10e`. PRs #160–#163 are merged; the deployed site remains https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.
- **DONE_VERIFIED — exact-main engineering CI:** workflow [43868521807](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43868521807) completed SUCCESS on exact SHA `0f752b172b7c3bcc7f6b88c0204b7f27c9d9b10e`. The `test` job completed every configured step: IPA-gold structural validation, Python test suite, npm install/audit, production build, generated-data freshness, npm tests, Chromium install and built-browser Playwright tests.
- **DONE_VERIFIED — exact-main Pages deployment:** workflow [43868521797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43868521797) completed SUCCESS on the same SHA. Both build and deploy jobs succeeded, including pinned Google Burmese WFST/OpenFst build, symbol-table and input-alphabet checks, upstream `thrax_g2p` parity, built-browser suite, Pages artifact upload, deployment and deployed-site/runtime-asset smoke test.
- **PR #129 rechecked, not merged:** it remains OPEN / DRAFT / non-mergeable. Its head is `d0be0c316fe59f64f1b2f71e484c10d1356dbf3b`, based on obsolete `fab39881259df94be93634088a75667a13059cfc`. A fresh compare against current `main` reports DIVERGED, 53 commits ahead / 34 behind, merge base `fab39881259df94be93634088a75667a13059cfc`, 21 changed files. Prior file-level reconciliation found its benchmark/hybrid functionality already represented and subsequently evolved on current main; do not merge or cherry-pick this stale snapshot. Leave the PR and branch untouched pending a new, specific missing requirement.
- Open human research issue [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85) remains unresolved. Its 30-item pilot still requires an approved versioned IPA convention, two independent qualified Burmese annotators, a third adjudicator, a non-annotating curator, private blind intake, source-located/rights-cleared items, and independent annotation/adjudication. No person has been contacted or recruited. Independent IPA annotation remains **DEFERRED** under the project-owner direction; do not manufacture labels or count the structural corpus as gold.
- **Task ledger:** DONE_VERIFIED — exact-main tests and Pages deployment for `0f752b172b7c3bcc7f6b88c0204b7f27c9d9b10e`; DONE_VERIFIED — prior canonical-output withholding and placeholder contrast fix; PARTIAL — phonological coverage, MLCTS primary-source verification, cross-runtime parity against independent gold, and accessibility assurance; TODO — manual screen-reader, real-device/touch-target, zoom/reflow and comprehensive contrast/state QA; BLOCKED — primary MLC notation/entry evidence and associated reuse-rights verification; DEFERRED — independent IPA annotation/pilot per owner direction and stale PR #129 integration.
- **Evidence boundary:** independently adjudicated profile-matched IPA gold remains 0; accuracy remains null/unmeasured. Green CI and successful deployment verify engineering behavior only. Repository status remains a deployed partial research prototype, not linguistically release-ready and not WCAG-conformance-certified.
- No runtime code, linguistic registry, IPA labels, Ukrainian mappings, gold data, license decision, release, or production setting was changed in this checkpoint.


## 2026-11-16 — final exact-main verification after PR #164

- **Current default branch:** `main`; exact HEAD `372727de8ea2a2a61570c8dc880433e325230683`. PR [#164](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/164) merged the documentation reconciliation as this commit. No runtime, linguistic-data, IPA-label, Ukrainian-mapping, licensing, or release change was made by PR #164.
- **DONE_VERIFIED — exact-main engineering CI:** [test workflow 43887822173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43887822173) completed SUCCESS on the exact SHA. Inspected job log: **315 Python tests + 68 subtests**, Node tests, production build, generated-data freshness, npm tests, **71 built-browser Playwright tests**, and both npm audit checks (**0 vulnerabilities**) passed. All 18 configured job steps succeeded.
- **DONE_VERIFIED — exact-main Pages deployment:** [Pages workflow 43887822197](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43887822197) completed SUCCESS on the exact SHA. All 24 build-job steps and all 4 deploy-job steps succeeded. This includes pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, complete browser input-alphabet check, upstream `thrax_g2p` parity, production build/tests, artifact upload, deployment and live smoke test. The smoke test fetched homepage, `system.html`, built JS/CSS, Mya2Rom assets and Google WFST JSON, then verified `available=true` and `arc_count>0`.
- **Public deployment:** https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ — exact deployment version `372727de8ea2a2a61570c8dc880433e325230683` reported successful.
- **PR reconciliation:** only open PR is [#129](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/129), still a stale divergent draft. It remains untouched: its benchmark/hybrid functionality is already represented and evolved on current main; its old snapshot is not to be merged or cherry-picked blindly.
- **Research/accessibility boundary unchanged:** independent profile-matched adjudicated IPA gold remains **0**; empirical accuracy remains **null / NOT MEASURED**. Phonological coverage and primary MLC/MLCTS evidence remain incomplete; full manual screen-reader, physical-device/touch-target, zoom/reflow and comprehensive contrast/state QA remain TODO. Independent IPA annotation remains DEFERRED per owner direction; issue #85's human prerequisites are unmet.
- **Task ledger:** DONE_VERIFIED — exact-main CI, Pages deployment and live smoke for this SHA; PARTIAL — Yangon phonological coverage, MLCTS source conformity and parity against independent gold; BLOCKED — primary MLC notation/entry evidence and item-level reuse rights; TODO — remaining manual accessibility QA; DEFERRED — independent IPA annotation and stale PR #129 integration.
- **Readiness:** deployed engineering/research prototype, **not linguistically release-ready** and not WCAG-conformance-certified. Hosted GitHub Actions are the verification evidence; no local checkout/test execution is claimed.


## Finals registry integrity correction — 2026-11-17

- Dedicated branch: `fix/finals-registry-schema-2026-11-17`, based on `main` at `f7f7d41a116c265481bdc17c225a763becab6013`.
- Corrected `data/burmese/finals.csv`: the previous header declared four columns while every data row contained five fields. The corrected header now distinguishes `phonological_interpretation` from `evidence_status`, retaining the existing descriptions, status values and source IDs without adding phonological rules.
- Added `tests/test_finals_registry.py` to assert exact column alignment, absence of surplus CSV fields, non-empty values, registered source references, allowed status values, and the contextual status of asat/anusvara/visarga versus the established structural kinzi row.
- Exact branch-head commit: `9df05c081bfa55aebe2ecd2dea2c17d6aed26964`; preceding data correction commit: `74346bb27e327338bac5966fb3dd18331952a0fd`.
- Hosted workflow [44151591432](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44151591432): IPA corpus structure validation SUCCESS; `pytest` SUCCESS (**317 passed, 68 subtests passed**). The workflow then FAILED at its pre-build npm audit gate: 4 high-severity advisories for transitive `picomatch` ReDoS (GHSA-fc5q-39xc-vjpf / CVE-2026-112366); npm reports no safe automatic fix and recommends a breaking Vite downgrade. Build, generated-data check, Node and Playwright steps were SKIPPED as a consequence. Do not claim the full workflow passed or bypass the security gate. Upstream advisory currently reports picomatch through 4.0.7 affected with no patched version stated.
- No IPA, tone, coda, medial, Ukrainian correspondence, gold-corpus or generated pronunciation values were changed. This is a CSV integrity correction only; kinzi's row is not a general coda realization rule.
- Existing review chain preserved: PR #166 remains the documentation base against `main`; PR #167 remains stacked on #166 and contains the registry-backed Python/browser IPA stage; stale PR #129 remains open/draft and is not to be cherry-picked. No existing PR was merged or modified by this branch.
- Next acceptance: complete a compatible dependency remediation when upstream provides a patched picomatch release (or a reviewed, tested safe dependency path), then rerun the entire test workflow including npm build, generated-data freshness, Node and built-browser Playwright. Independent phonological gold remains 0; accuracy remains unmeasured.


## Exact-head verification follow-up — 2026-11-17

- Latest branch head before this documentation update: `7eed688b5aa2d783022d64b54558425525aa3445`; branch `fix/finals-registry-schema-2026-11-17`; base `main` at `f7f7d41a116c265481bdc17c225a763becab6013`.
- Pages build workflow [44152143185](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44152143185) completed SUCCESS on that exact head. Google WFST/OpenFst build, IPA symbol-table and input-alphabet checks, upstream `thrax_g2p` parity, production build, Node tests, Chromium install, built-site Playwright tests, Pages artifact configuration and upload all passed. Artifact `github-pages` ID `14360401415`, SHA-256 `4a50e481edb2fdf19d7d0732b77469d449b69867c31b34f49520e46cd717704a`. Pull-request deploy job was skipped by design: artifact build is verified, but no production deployment is claimed.
- Exact-head main test workflow [44152143092](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44152143092) remains FAILURE at mandatory npm high-severity advisory gate after corpus validation, pytest (**317 passed, 68 subtests**) and `npm ci` succeeded. Remaining steps in that workflow were skipped. The Pages workflow independently ran and passed build, Node and browser tests; this does not remediate or bypass the security gate.
- Task status: finals CSV structural integrity — DONE_VERIFIED; Python tests — DONE_VERIFIED; production build/Node/built-browser tests on exact PR head — DONE_VERIFIED; npm advisory remediation — BLOCKED pending a verified safe dependency release/path; production deployment — not attempted from PR workflow.
- Do not downgrade Vite, suppress npm audit, or merge while the required security gate is failing without an explicit owner decision and a verified remediation. No linguistic evidence or IPA/gold values were added. Independent profile-matched IPA gold remains 0; accuracy remains unmeasured.


## npm dependency-path follow-up — 2026-11-17

- Lockfile tracing confirms two development-tool paths to the affected package: `vite@8.3.8 → picomatch@^4.0.7` and `tinyglobby@0.2.17 → picomatch@^4.0.4`; resolved package is `picomatch@4.0.7`. The application has no direct picomatch dependency or runtime use identified by this trace.
- GitHub Advisory [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) still lists versions through 4.0.7 as affected without a fixed version. Upstream [issue #247](https://github.com/micromatch/picomatch/issues/247) requests remediation guidance and remains the relevant upstream tracking reference. **Correction to the earlier investigation trail:** upstream PR #194 changes extglob parsing around leading `?`; its own description says it does not fix the separate repeated-extglob ReDoS case. It is not a remediation for this advisory.
- A third-party patched fork was found, but it was not substituted: package identity, maintainership, compatibility and security provenance are not sufficiently established for an unreviewed build-tool override. No dependency override, downgrade, lockfile edit, audit bypass or source patch was made.
- The next security acceptance criterion remains: upstream fixed release or independently reviewed replacement, plus API-compatibility and adversarial ReDoS regression tests, then full exact-head audit/build/generated-data/Node/Playwright CI.


## Final continuation checkpoint — 2026-11-17

- Before this handoff checkpoint, branch head was `6587fdc6cfda57aa1cba6634b95d1ec8069aa259`; comparison against `main` (`f7f7d41a116c265481bdc17c225a763becab6013`) showed **11 commits ahead / 0 behind**. The PR remains open and mergeable; no merge or production deployment was performed.
- Latest docs-triggered test run [44163097875](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44163097875) again passed corpus structure validation and pytest, then failed at the required high-severity npm advisory gate. Its build/generated-data/Node/Playwright steps were skipped. The independent Pages build [44152143185](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44152143185) on the exact code-bearing head remains the evidence for successful production build, Node and built-browser Playwright tests and artifact upload.
- PR #168 description was updated to include the independent Pages evidence and the corrected advisory investigation. Existing PRs #166/#167/#129 were not modified or merged.
- Final ledger: DONE_VERIFIED — CSV header/field alignment, source/status integrity tests, 317 Python tests + 68 subtests, and separate exact-code-head build/Node/browser/Pages-artifact path. BLOCKED — mandatory npm audit gate until a trustworthy fix/replacement exists. PARTIAL/BLOCKED research gates remain unchanged: 0 independent profile-matched IPA gold, accuracy unmeasured, phonological coverage incomplete, primary MLC/MLCTS evidence and reuse rights unresolved, manual accessibility QA incomplete, independent IPA annotation deferred.
- No local checkout or local tests were available/performed. All verification claims above are from hosted GitHub Actions. Repository remains a deployed research/engineering prototype, not linguistically release-ready.


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



## Continuation checkpoint — exact PR head verified, 2026-11-17

Repository: `ClippyFirst/Burmese-Ukrainian-Phonetic-System-`
Branch: `fix/finals-registry-schema-2026-11-17`
PR: [#168](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/168), OPEN, mergeable, base `main`.
Head: `733b383034120000f817cc877f0062f825f5dd2c`; compare: 31 commits ahead / 0 behind; five changed files.

### Verified outcomes

- The finals registry header/schema repair and duplicate-marker regression test remain the only code/data scope of this branch; all source rows and evidence statuses were preserved. No pronunciation, IPA, Ukrainian mapping, runtime, generated data or dependencies changed.
- Exact-head Pages workflow [44175250086](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44175250086) SUCCESS: Google Burmese WFST/OpenFst, IPA symbol table, browser alphabet, upstream `thrax_g2p` parity, production build, Node tests, Chromium, built-site Playwright and artifact upload passed. Deploy job SKIPPED because this was a PR event.
- Exact-head test workflow [44175250073](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44175250073) FAILURE at required `npm audit --audit-level=high`. Corpus structure validation, Python dependency installation, pytest and `npm ci` passed; build, generated-data freshness, Node and Playwright steps were skipped in this workflow.
- The successful Pages path is independent evidence for build/browser checks, not a waiver of the required audit gate.

### Current task ledger

- **DONE_VERIFIED:** finals CSV schema repair; registry field/source/status/uniqueness regression checks; Python suite and corpus structure gate on exact head; separate exact-head production build, Node/browser suite and Pages artifact.
- **BLOCKED:** mandatory high-severity npm audit because the dependency tree resolves affected `picomatch@4.0.7`; no trustworthy fixed v4 release or compatible replacement has been established. Do not downgrade Vite, vendor an unreviewed patch, override, fabricate lock data or suppress audit.
- **PARTIAL / BLOCKED:** independently adjudicated Yangon-profile IPA gold remains empty (0 entries), accuracy is unmeasured, phonological coverage incomplete, primary MLC/MLCTS evidence and reuse rights unresolved, manual accessibility QA incomplete.
- **DEFERRED:** independent IPA annotation, as previously directed; prerequisites remain unmet.

### Commands/checks actually run through hosted CI

- Workflow 44175250073: corpus structure validation — PASS; `pip install -e ".[test]"` — PASS; `pytest` — PASS; `npm ci` — PASS; `npm audit --audit-level=high` — FAIL; later build/generated-data/Node/Playwright steps — SKIPPED.
- Workflow 44175250086: pinned Google WFST/OpenFst build, IPA symbol-table and browser-alphabet checks, upstream parity, `npm run build`, `npm test`, Chromium installation and `npm run test:browser:built` — PASS; Pages artifact upload — PASS; deploy — SKIPPED.
- No local checkout/tests are claimed. No merge, release or production deployment was performed.

### Next genuine blockers / acceptance criteria

1. Security: upstream reviewed/released picomatch v4 fix or independently reviewed compatible replacement; API and capture semantics verified; nested extglob and adversarial ReDoS timeout tests; mandatory audit green; then complete test workflow green on exact final head.
2. Linguistic validation: independent expert adjudication of profile-matched lexical IPA with provenance and double annotation; only then report accuracy.
3. Phonology: evidence-backed completion of rime/coda/checked-syllable, vowel combinations, tone/register/phonation and allophony without promoting restricted findings beyond their source scope.
4. Sources/licensing: primary MLC/MLCTS source verification, exact scope and redistribution/reuse rights documented.
5. Accessibility: manual screen-reader, touch-target, zoom/reflow, contrast and state checks recorded with reproducible evidence.

**Readiness:** research/engineering prototype, not linguistically release-ready. This checkpoint supersedes stale workflow-pending and branch-tip statements earlier in this handoff.



## Security continuation — new upstream candidate review (2026-11-17)

The latest upstream search surfaced several new candidate patches, including:

- [picomatch PR #261](https://github.com/micromatch/picomatch/pull/261), open/unmerged, base `master`: the broadest safety proposal found. It adds a bounded ambiguity analyzer over generated regex output, final-output validation where wrappers can introduce repetition, and fail-closed `SyntaxError` for unsafe or unproven repetitions even if `maxExtglobRecursion: false`. It deliberately avoids capture-dependent rewrites. Author-reported validation: 2,009 tests and bounded adversarial subprocesses plus option/parser/capture/language checks. This is not yet independently verified CI or a release. It also introduces intentional compatibility changes: previously accepted unsafe patterns can now throw.
- [picomatch PR #262](https://github.com/micromatch/picomatch/pull/262), open/unmerged, base `master`: narrower normalization of selected wildcard repetitions, with author-reported 2,001 tests, coverage suite, 3,657,752 finite boolean comparisons and 16 bounded adversarial subprocesses. It preserves more legacy matching, but retains an explicit `maxExtglobRecursion: false` bypass and therefore is not equivalent to #261's mandatory guard.
- [picomatch PR #263](https://github.com/micromatch/picomatch/pull/263) is based on `v2`, not the v4 line used by this project's dependency tree.

Issue [#247](https://github.com/micromatch/picomatch/issues/247) remains open. Although a commenter noted that the Snyk record seemed revoked, another confirmed the GitHub GHSA publication; our own mandatory `npm audit --audit-level=high` continues to fail against locked `picomatch@4.0.7`. A revocation in one advisory feed is not evidence that the GitHub/npm audit gate is clear.

**Decision:** neither patch was transplanted. Both are unmerged proposals, and the candidate check-run state was not established as green during this review. #261 is the stronger candidate for mandatory safety, but its behavioral compatibility changes need maintainer review and exact dependency-tree tests before adoption. #262's explicit opt-out is a material residual bypass. Acceptance remains a reviewed/released v4 fix or controlled compatible replacement, default/capture/nested/parser-option/adversarial tests, mandatory audit green, and full exact-head CI green.

The project's locked dependency remains unchanged. No audit suppression, downgrade, override, or unreviewed vendoring was introduced.



### Dependency exposure clarification

The committed lockfile v3 shows `picomatch@4.0.7` is **transitive**, not a direct runtime dependency: the root package declares Vite `8.3.8` as a devDependency; Vite and tinyglobby both select picomatch v4, while fdir metadata also permits v4. This makes the currently visible exposure part of the build/test toolchain rather than the declared application runtime dependency graph. It still blocks the mandatory CI security gate.

The GitHub-reviewed advisory mirrored by OSV was updated 2026-11-17 15:56 UTC, continues to mark versions through 4.0.7 affected, rates it CVSS 4.0 8.7, and states no fixed version. A Snyk-specific revocation comment therefore cannot be treated as clearing GitHub's advisory or the project's npm audit result. No package manifest or lockfile changes were made.


## Exact latest-head workflow reconciliation — 2026-11-17 (current)

Repository: `ClippyFirst/Burmese-Ukrainian-Phonetic-System-`
Branch: `fix/finals-registry-schema-2026-11-17`
PR: [#168](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/168), OPEN, mergeable, base `main`.
Latest branch head: `bc9c25dfe5bf30df5e05787144a8af0f9f5e01b0`; compare: 40 commits ahead / 0 behind; five changed files.

### Latest exact-head outcomes

- **DONE_VERIFIED — Pages workflow [44181463115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463115):** Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright tests and Pages artifact upload all passed. Deploy job skipped because this is a PR event; no production deployment occurred.
- **BLOCKED — test workflow [44181463094](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463094):** corpus structure validation, Python dependency installation, pytest and `npm ci` passed; mandatory `npm audit --audit-level=high` failed. Build, generated-data freshness, Node and Playwright steps skipped in this workflow.
- The independent Pages workflow validates build/browser behavior but does not clear or bypass the mandatory npm audit gate. Do not report the full test workflow as green.

### Final ledger update

- **DONE_VERIFIED:** finals CSV five-column schema repair and registry source/status/field/uniqueness tests; exact-head Python/corpus checks; exact-head production build, Node, built-site Playwright and Pages artifact path.
- **BLOCKED:** mandatory high-severity npm audit; affected transitive `picomatch@4.0.7` remains unresolved. Acceptance: reviewed/released v4 remediation or independently reviewed compatible replacement; default/capture/nested-extglob/adversarial timeout checks; mandatory audit green; full test workflow green on exact final head.
- **PARTIAL / BLOCKED:** independent adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; phonological coverage incomplete; primary MLC/MLCTS evidence and reuse rights unresolved; manual accessibility QA incomplete.
- **DEFERRED:** independent IPA annotation remains deferred under prior project direction.

### Commands/checks actually executed

Hosted CI only; no local checkout or local commands are claimed. Workflow 44181463094: corpus structure validation PASS; Python dependency installation PASS; `pytest` PASS; `npm ci` PASS; `npm audit --audit-level=high` FAIL; subsequent build/generated-data/Node/Playwright steps SKIPPED. Workflow 44181463115: WFST/OpenFst and IPA/input-alphabet checks PASS; upstream parity PASS; `npm run build` PASS; `npm test` PASS; Chromium install PASS; `npm run test:browser:built` PASS; Pages artifact upload PASS; deploy SKIPPED.

No dependency override, downgrade, vendored patch, lockfile fabrication, audit suppression, merge, release or production deployment was performed. No linguistic labels, IPA, Ukrainian mappings, runtime code or generated data changed.

**Readiness:** engineering/research prototype; not release-ready and not linguistically validated. The mandatory security gate and independent phonological evidence remain genuine blockers.


## 2026-11-18 continuation — exact PR head

Current branch `fix/finals-registry-schema-2026-11-17` is at `15a82b5bcf5ca7d11d204181517828dca92cc0a9`; PR #168 remains open, unmerged and mergeable, 43 commits ahead / 0 behind `main`, with five changed files.

### Verified hosted checks

- Workflow [44181463094](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463094): corpus structure validation PASS; Python dependency installation PASS; `pytest` PASS; `npm ci` PASS; mandatory `npm audit --audit-level=high` FAIL; build, generated-data freshness, Node and Playwright steps SKIPPED.
- Workflow [44181463115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463115): pinned Google Burmese WFST/OpenFst build PASS; IPA symbol-table and browser input-alphabet checks PASS; upstream `thrax_g2p` parity PASS; production build PASS; `npm test` PASS; Chromium install PASS; built-site Playwright PASS; Pages artifact upload PASS; deploy SKIPPED for PR event.

The Pages workflow proves the browser build/test path on the exact current head, but it does not make the mandatory test workflow green. Security remediation remains blocked pending a compatible reviewed/released fix or replacement and full exact-head CI. No dependency bypass, downgrade, vendored patch, merge, release or production deployment was made.

The linguistic blockers remain: independent adjudicated Yangon-profile IPA gold = 0 and accuracy unmeasured; phonological coverage incomplete; primary MLC/MLCTS evidence and reuse rights unresolved; manual accessibility QA incomplete. Independent IPA annotation remains deferred under prior direction. Repository status: engineering/research prototype, not release-ready or linguistically validated.


### Completed follow-up of the two workflows on head `748dcea9c82308ec9cd7299de12cb7cfec6f5874`

- [Tests workflow 44185873801](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44185873801): corpus structure validation PASS; Python dependency installation PASS; `pytest` PASS; `npm ci` PASS; mandatory `npm audit --audit-level=high` FAIL; build, generated-data freshness, Node and Playwright steps SKIPPED.
- [Pages workflow 44185873696](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44185873696): WFST/OpenFst build and IPA/browser alphabet invariants PASS; upstream parity PASS; production build PASS; Node tests PASS; Chromium install PASS; built-site Playwright PASS; Pages artifact upload PASS; deploy SKIPPED for PR event.
- PR #168 remains open, unmerged and mergeable; 46 commits ahead / 0 behind `main`; five changed files. No merge, release, production deploy, dependency bypass or linguistic changes. Status remains engineering/research prototype, not release-ready; npm audit and independent phonological/source/accessibility evidence remain blockers.


### Updated upstream remediation triage — 2026-11-18

Current public evidence does not justify changing the lockfile:

- [GHSA-fc5q-39xc-vjpf / CVE-2026-112366](https://osv.dev/vulnerability/GHSA-fc5q-39xc-vjpf): GitHub-reviewed OSV entry continues to mark picomatch through 4.0.7 affected; no fixed version is specified. The upstream [4.0.7 changelog](https://github.com/micromatch/picomatch/blob/master/CHANGELOG.md) does not document a fix for this later single-branch repeated-extglob advisory.
- [Upstream PR #261](https://github.com/micromatch/picomatch/pull/261): open/unmerged, v4 master line, one approval. The reviewer explicitly did not run the branch and flags a compatibility break: some patterns previously accepted now throw `SyntaxError`. Author-reported 2,009 tests are not independently verified.
- [Upstream PR #262](https://github.com/micromatch/picomatch/pull/262): open/unmerged, v4 master line, one approval and independent reviewer evidence of 2,001 tests, 1,329,660 selected finite parity comparisons, and 35 bounded adversarial deadline cases. The reviewer explicitly limits the conclusion: finite corpus only, fallback can alter semantics for complex patterns, and `maxExtglobRecursion: false` remains an opt-out.
- [Upstream PR #263](https://github.com/micromatch/picomatch/pull/263) targets v2, not this v4 dependency.

No candidate is merged or released. #261 and #262 were not transplanted: neither currently satisfies both the compatibility and unconditional security acceptance criteria. Continue to require a maintainer-approved/released v4 remediation or an independently reviewed replacement, followed by mandatory npm audit and complete CI on the exact project head. No downgrade, lockfile override, vendored patch or audit suppression.


## 2026-11-18 continuation — finalized CI on head 3430b628

Current verified PR #168 head at the start of this evidence refresh was `3430b628a2e35e19ef3fc4306410b68b8fa412f5` on `fix/finals-registry-schema-2026-11-17`. PR remains open, unmerged and mergeable; 52 commits ahead / 0 behind `main`, five changed files.

- [Tests workflow 44255972550](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44255972550): IPA corpus structure validation PASS; Python dependency installation PASS; `pytest` PASS; `npm ci` PASS; mandatory `npm audit --audit-level=high` FAIL; build, generated-data freshness, Node and Playwright steps SKIPPED.
- [Pages workflow 44255972532](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44255972532): pinned Google Burmese WFST/OpenFst build PASS; IPA symbol-table and browser input-alphabet checks PASS; upstream `thrax_g2p` parity PASS; production build PASS; `npm test` PASS; Chromium install PASS; built-site Playwright PASS; Pages artifact upload PASS; deploy SKIPPED for PR event.

These workflows are complementary, not a green required test workflow. The locked transitive `picomatch@4.0.7` security gate remains BLOCKED; no downgrade, override, vendored patch, lockfile fabrication or audit bypass was introduced. No merge, release or production deployment occurred. No new phonological claims, IPA values, Ukrainian mappings or generated artifacts were introduced.

**Task ledger:** DONE_VERIFIED — finals registry schema repair and focused validation; exact-head corpus/Python checks; Pages build/browser path. BLOCKED — mandatory high-severity npm audit pending compatible reviewed/released remediation and complete exact-head CI. PARTIAL — independent adjudicated Yangon-profile IPA gold remains 0 and accuracy unmeasured; phonological coverage, source evidence/reuse rights and manual accessibility QA remain incomplete. DEFERRED — independent IPA annotation remains deferred under prior direction.

**Readiness:** engineering/research prototype, not release-ready and not linguistically validated. No local checkout or local commands are claimed; all verification above is hosted GitHub Actions evidence.


## 2026-11-18 — exact latest documentation head 42f5b135

- PR #168 head 42f5b1353c3d4ce13070554494c70f6fc6a10b90; branch fix/finals-registry-schema-2026-11-17; base main at f7f7d41a116c265481bdc17c225a763becab6013. PR remains open and mergeable; no merge or release.
- **BLOCKED — required tests workflow [44258910321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910321):** corpus structure validation, Python dependency installation, pytest and npm ci passed. npm audit --audit-level=high failed on four high-severity findings, all resolving to picomatch@4.0.7 through fdir, tinyglobby and Vite. The suggested npm audit fix --force would downgrade Vite to 6.2.7; not applied. Build, generated-data freshness, Node and Playwright steps were skipped in this test job.
- **PENDING at evidence capture — Pages workflow [44258910411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910411):** pinned build setup passed; the Bazel/OpenFst build was still running. No outcome is claimed here.
- Dependency graph cross-check: package.json declares no runtime dependencies; Vite 8.3.8 is a devDependency. Lockfile v3 pins picomatch@4.0.7 as a dev-only transitive dependency via Vite and tinyglobby. The same lockfile state exists on main; this is not introduced by PR #168. Exposure is currently in the build/test toolchain, but the mandatory repository audit remains binding.
- Upstream release check: official micromatch/picomatch releases and npm still show 4.0.7 as latest; no 4.0.8 release or verified fixed version was found. GitHub-reviewed GHSA-fc5q-39xc-vjpf / CVE-2026-112366 continues to list versions through 4.0.7 as affected without a patched version. Do not treat third-party claims about 4.0.8 or Snyk-specific revocation comments as remediation.
- No dependency manifest/lockfile change, audit bypass, vendored patch, Vite downgrade, runtime/phonological change, IPA label, Ukrainian mapping, gold data, merge, release or production deployment. PR #168 remains open pending a compatible reviewed/released remediation and full exact-head CI.
- **Task ledger:** DONE_VERIFIED — finals CSV schema correction and focused Python tests; corpus validation and pytest on this exact head. BLOCKED — mandatory npm high-severity audit. PENDING — exact-head Pages workflow. PARTIAL — phonological/source/licensing/accessibility evidence. DEFERRED — independent IPA annotation under prior direction.


## Final follow-up — exact code head a266e67 (2026-11-18)

- Three documentation-only commits updated the canonical handoff, execution matrix and linguistic completion register. Final docs branch head after this refresh: a266e67d94e667dc14bf46aadcb36dc7ceffdf24; 58 commits ahead / 0 behind main. Runtime, dependency, data, IPA, Ukrainian mapping and generated artifacts were not changed by these documentation commits.
- Required tests workflow [44259714864](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259714864) on exact code head a266e67: corpus validation PASS; Python dependency installation PASS; pytest PASS; npm ci PASS; mandatory npm audit FAIL on the same four high-severity picomatch@4.0.7 findings. Build, generated-data, Node and Playwright steps SKIPPED.
- Pages workflow [44258910411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910411) was still in progress on prior docs head 42f5b135; pinned Google WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet and static-model export had passed; Node setup was in progress. This is not exact-head verification for a266e67 and no final Pages outcome is claimed.
- Independent CSV re-parse: four data rows, all five fields; no surplus/missing/blank cells, duplicate markers, invalid evidence statuses or unresolved source IDs (all four refer to U18). This supplements the passing pytest; it does not validate the linguistic truth of the interpretations.
- No merge/release/deploy. Security gate remains BLOCKED; gold remains 0 and empirical accuracy unmeasured.


## Exact final-head CI and upstream remediation review — 2026-11-18

- **Final PR branch HEAD:** `2efbf870568c7d114f3bad452f8f2a4df95425be`; PR [#168](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/168) remains open, base `main` at `f7f7d41a116c265481bdc17c225a763becab6013`. No merge, release or production deployment.
- **DONE_VERIFIED — exact-head Pages build:** [workflow 44259856263](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259856263) completed SUCCESS on this exact HEAD. All build steps passed: pinned Google Burmese WFST/OpenFst, IPA symbol-table invariants, browser input alphabet, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium setup, built-site Playwright, Pages artifact configuration and upload. PR deploy job was skipped by event design.
- **BLOCKED — exact-head mandatory test workflow:** [workflow 44259856191](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259856191) completed FAILURE on this exact HEAD. IPA corpus structure validation, Python dependency install, pytest and `npm ci` passed; `npm audit --audit-level=high` failed on four high-severity findings resolving to transitive `picomatch@4.0.7`. Build, generated-data, Node and Playwright steps were skipped in this workflow. The successful Pages workflow is complementary build/browser evidence and does not waive the mandatory audit.
- **Upstream candidate review update:** picomatch PR [#262](https://github.com/micromatch/picomatch/pull/262) is now open with a maintainer-independent APPROVED review and a second reviewer report: 2,001 tests, 1,329,660 finite parser/matcher parity comparisons, and 35 bounded adversarial cases under two-second/128-MB limits. The review explicitly says these are bounded tests, not a proof for every pattern, and notes `maxExtglobRecursion: false` remains an opt-out while unsupported shapes use literal fallback. PR [#261](https://github.com/micromatch/picomatch/pull/261) also has an APPROVED review and proposes mandatory bounded ambiguity checks. Both are still unmerged upstream proposals; official latest release remains 4.0.7. Neither is a released, downstream-verifiable fix, so do not adopt a fork, patch lockfile, downgrade Vite or suppress audit.
- **Issue/advisory state:** upstream issue [#247](https://github.com/micromatch/picomatch/issues/247) remains open. GitHub advisory GHSA-fc5q-39xc-vjpf remains the relevant published security signal despite a comment that the separate Snyk advisory was revoked. The official latest release endpoint still resolves to picomatch 4.0.7; no patched release was found.
- **Task ledger:** DONE_VERIFIED — finals CSV structure/tests; exact-head Pages build, Node and built-browser tests; corpus validation and pytest. BLOCKED — required high-severity npm audit pending upstream-reviewed released remediation and exact-head full test workflow. PARTIAL/BLOCKED/TODO research and accessibility items unchanged: independent Yangon-profile adjudicated IPA gold 0; accuracy unmeasured; phonological coverage and primary MLC/MLCTS evidence/reuse rights incomplete; manual accessibility QA incomplete; independent IPA annotation DEFERRED.
- This is a docs-only evidence refresh. No runtime, dependency, linguistic data, IPA, Ukrainian mapping or generated artifact changed. Readiness remains engineering/research prototype, not linguistically release-ready.


## Dependency candidate reassessment and latest audit rerun — 2026-11-18 10:12 UTC+02

- Latest test workflow [44261797858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797858) ran on documentation HEAD `47fc51e0ae60b81584d39560d7871570c0baaaa3`. Corpus structure validation, Python install, pytest and `npm ci` passed; mandatory high-severity `npm audit` failed; build, generated-data, Node and Playwright steps skipped. This reconfirms the blocker on the current PR tip. The prior Pages SUCCESS remains on code-bearing HEAD `2efbf870...`, not this later docs-only HEAD.
- Current lockfile dependency paths are now explicit: root devDependency Vite `8.3.8` requires `picomatch ^4.0.7`; `tinyglobby 0.2.17` requires `^4.0.4`; installed `node_modules/picomatch` is `4.0.7` and marked dev-only. This is a build-toolchain dependency, not a production runtime dependency, but the repository's mandatory audit gate still fails.
- Upstream #261 is OPEN, mergeable, and has one APPROVED review, but its head commit has no GitHub check-runs/status contexts reported. Its own description claims 2,009 tests and a fail-closed bounded ambiguity proof; approval alone is not independent execution evidence.
- Upstream #262 is OPEN, mergeable, and has one APPROVED review plus a separate COMMENTED independent validation. The latter reports npm test, 1,329,660 bounded parity comparisons and 35 isolated adversarial cases. It explicitly limits the claim: finite tests are not a universal proof, complex literal-fallback forms do not preserve all matching semantics, and `maxExtglobRecursion: false` remains an opt-out. Its head also reports no GitHub check-runs/status contexts. Neither upstream PR is merged/released; latest official release remains 4.0.7.
- Candidate decision: do not vendor either fork or alter the lockfile. #261 has a stronger stated fail-closed design but lacks independently reported execution evidence; #262 has richer independent finite validation but a documented opt-out and fallback compatibility boundary. Both need maintainer disposition, CI evidence and a tagged release before adoption.
- PR #168 remains open; #166 and #167 remain open and unmerged; #129 remains divergent/non-mergeable. Main remains `f7f7d41...`. No runtime, dependency, linguistic or generated-data change.


## Latest exact-head verification and picomatch candidate scope check — 2026-11-18 10:12 +0200

- Current PR #168 head: `47fc51e0ae60b81584d39560d7871570c0baaaa3`; open, unmerged and mergeable. The code-bearing CSV schema/test change is unchanged; recent commits only reconcile evidence and handoff documents.
- Exact-head Pages workflow [44261797839](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797839) SUCCESS: pinned Burmese WFST/OpenFst, IPA/browser alphabet invariants, upstream parity, production build, Node, Chromium, built-site Playwright and artifact upload passed; deploy skipped for PR event.
- Exact-head required tests workflow [44261797858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797858) FAILURE: corpus structure validation, Python install, pytest and npm ci passed; mandatory npm audit failed on four high-severity transitive `picomatch@4.0.7` findings. Build, generated-data, Node and Playwright were skipped. Do not conflate the separate Pages success with a green required test workflow.
- **New candidate scope review:** upstream #270 proposes a small collapse optimization for single-branch wildcard extglobs and reports 19,902,265 finite parity cases, but an independent commenter reproduced timeouts for `+([a]*)b` and `+(@(*a))`, so it does not cover the full advisory surface. #269 proposes a wider literal-fallback strategy and adversarial child-process tests but has no maintainer review/approval evidence. #267 proposes another collapse strategy and also lacks review evidence. All remain open/unmerged; official release remains 4.0.7. No candidate was ported or considered a resolved fix.
- Security acceptance remains BLOCKED: require a maintainer-reviewed/released compatible v4 fix or independently reviewed replacement, tests covering simple and complex/nested wildcard extglobs, capture/contains and parser options, adversarial deadlines, mandatory audit PASS, and full exact-head required CI PASS.
- Other acceptance criteria remain: independently adjudicated Yangon-profile IPA gold (currently 0) before accuracy measurement; complete phonological coverage; primary MLC/MLCTS evidence and item-level reuse rights; manual accessibility QA. Independent IPA annotation remains DEFERRED.
- No runtime, dependency, linguistic data, IPA, Ukrainian mapping or generated artifact changed in this continuation. No merge, release or production deployment. Readiness remains engineering/research prototype, not linguistically release-ready.


## Exact PR-head Pages completion — 2026-11-18 11:31 +0200

- PR #168 head at evidence capture: `bf1655fb861451289ce5be12f1c4bf89a2cccb41`; PR remains OPEN, unmerged and mergeable.
- Pages workflow [44265321954](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44265321954) is now confirmed SUCCESS on that exact SHA. The complete build job passed pinned Burmese WFST/OpenFst, IPA symbol-table and browser alphabet checks, upstream parity, production build, Node tests, Chromium, built-site Playwright and artifact upload. The deploy job was SKIPPED for the pull-request event; no production deployment occurred.
- Required tests workflow [44265321857](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44265321857) on the same SHA remains FAILURE: corpus validation, Python install, pytest and npm ci passed; mandatory high-severity npm audit failed; later build/generated-data/Node/Playwright steps skipped. This exact-head combination means browser/build acceptance is verified but required CI remains BLOCKED by the transitive `picomatch@4.0.7` advisory.
- No dependency or linguistic changes were made. PR #168 remains open; no merge, release or production deployment. Research blockers remain unchanged: independent Yangon-profile IPA gold 0, accuracy unmeasured, incomplete phonological coverage, unresolved primary MLC/MLCTS evidence/reuse rights and manual accessibility QA; independent IPA annotation DEFERRED.


## Final CI poll for exact PR documentation tip — 2026-11-18

- PR #168 HEAD `4d1bc99c17474fa08cb5d6133a27808c250a8012` has 73 commits ahead / 0 behind `main`; PR remains open, unmerged and mergeable, with five changed files and no submitted review or review threads.
- Pages workflow [44276827871](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44276827871) completed SUCCESS on this exact SHA. Pinned WFST/OpenFst, IPA/browser invariants, upstream parity, production build, Node, Chromium, built-site Playwright and artifact upload passed. Deploy skipped for PR event.
- Required tests workflow [44276827920](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44276827920) completed FAILURE on the same SHA: corpus validation, Python install, pytest and npm ci passed; mandatory high-severity npm audit failed; build/generated-data/Node/Playwright skipped in this workflow.
- Latest upstream recheck: picomatch issue #247 and candidate PRs #261, #262, #267, #269 and #270 all remain open; none merged. Official latest release remains 4.0.7. Existing concerns about bounded coverage, compatibility and unresolved adversarial shapes remain; no candidate adopted.
- No dependency workaround, runtime/IPA/Ukrainian mapping change, merge, release or production deployment. Readiness remains an engineering/research prototype; independent Yangon-profile IPA gold is 0 and empirical accuracy unmeasured, phonological coverage and primary MLC/MLCTS evidence/reuse rights incomplete, manual accessibility QA outstanding; independent IPA annotation remains deferred.


## 2026-11-18 security triage continuation — exact audit evidence and candidate gaps

- Full Tests job log [44281804397](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44281804397): `npm ci` succeeds; `npm audit --audit-level=high` reports 4 high-severity instances of one underlying GHSA-fc5q-39xc-vjpf for locked transitive `picomatch@4.0.7`, reached through `fdir` → `tinyglobby` → Vite 8.3.8. `npm audit fix --force` proposes Vite 6.2.7 (breaking downgrade), so no automated downgrade accepted. This project has no direct runtime npm dependencies; the finding is in dev/build tooling. Upstream discussion says exploitability requires an attacker-controlled glob pattern, not merely attacker-controlled path input; app-level exposure is not established without an untrusted pattern source, but the explicit high-severity audit gate remains binding.
- Same job: IPA gold validation = 0 records / 0 annotations / 0 adjudicated; `NOT_READY_NO_ADJUDICATED_GOLD`; pytest 317 passed and 68 subtests passed. Required Tests stops at audit, so build/generated-data/Node/Playwright are skipped there. Separate Pages workflow passes on this PR HEAD.
- Candidate re-triage: #268 has an independent globstar bypass timeout `+(**/a)b`; #270 has independent timeout reports for `+([a]*)b` and `+(@(*a))`; #238 still times out on `+(*)` despite approvals; #273 has broad finite equivalence claims but no independent review and not full adversarial scope. #264 has downstream Windows compatibility evidence (133 client and 18 distribution files unchanged) but that does not prove security and no review is recorded. No candidate meets both broad security and compatibility review criteria; latest release remains 4.0.7.
- No dependency override, Vite downgrade, vendored patch, audit suppression, source change or merge. PR #168 remains open. Readiness remains prototype; independent IPA gold = 0, accuracy unmeasured.


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


## Exact-head CI completion — 2026-11-18 (9131c12)

- **DONE_VERIFIED — Pages workflow [44301535467](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44301535467):** completed SUCCESS on exact PR #168 HEAD `9131c123c91eeee438f4ff48c7d49912efb00068`. Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet, static model export, upstream `thrax_g2p` parity, `npm run build`, `npm test`, Chromium installation, built-site Playwright and Pages artifact upload all passed. Deployment was skipped because this was a pull-request event.
- **PARTIAL / BLOCKED — required Tests workflow [44301535585](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44301535585):** corpus validation, Python package build/install and pytest passed (**317 passed, 68 subtests passed**); `npm ci` completed. The mandatory `npm audit --audit-level=high` then failed on four high-severity instances of GHSA-fc5q-39xc-vjpf affecting transitive `picomatch@4.0.7` via `fdir`, `tinyglobby` and Vite 8.3.8. Audit recommends `npm audit fix --force`, which would downgrade Vite to 6.2.7; this breaking workaround remains rejected. Subsequent test-workflow build/generated-data/Node/Playwright steps were skipped; the independent Pages workflow supplies separate build/browser evidence but does not waive the mandatory audit gate.
- No code, dependency, IPA, Ukrainian mapping or corpus changes were made in this checkpoint. No merge, release or production deployment occurred. PR #168 remains open against main.
- Ledger: Pages/build/browser DONE_VERIFIED; Python suite DONE_VERIFIED; mandatory high-severity dependency audit BLOCKED; independently adjudicated Yangon-profile IPA gold remains 0 and accuracy unmeasured; source rights/phonological coverage remain incomplete; manual accessibility QA TODO; independent annotation DEFERRED pending human prerequisites. Readiness remains engineering/research prototype, not release-ready.

 
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


## Exact-head CI closeout — 2026-11-18 (`374128a7f4f0f1d6ed6a64efe6122ddfee9c328f`)

- **DONE_VERIFIED — Pages [44320245648](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320245648): SUCCESS on this exact HEAD.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright and Pages artifact upload all passed. Deployment was skipped for the PR event; no production deployment occurred.
- **BLOCKED — Tests [44320245620](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320245620): FAILURE on this exact HEAD.** Corpus structure validation, editable Python install, wheel registry verification and pytest passed (**322 passed, 68 subtests passed**); `npm ci` completed; mandatory `npm audit --audit-level=high` failed on GHSA-fc5q-39xc-vjpf in transitive `picomatch`. Build, generated-data, Node and Playwright steps were skipped in this job. Duplicate push run [44320232869](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320232869) failed at the same audit gate.
- Pages success independently verifies the browser/build path but does not waive the required security gate. PR #171 remains OPEN, DRAFT and unmerged. No release or production deployment. Linguistic acceptance remains incomplete: independently adjudicated Yangon IPA gold = 0 and accuracy unmeasured; primary MLC/MLCTS evidence and reuse rights incomplete; phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED pending human prerequisites.
- **Readiness:** engineering/research prototype, not release-ready.


## Exact-head CI checkpoint — 2026-11-18 (`ddad7f5e08c674966c7f0b2431859878710da719`)

- **DONE_VERIFIED — Pages build [44336176912](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176912): SUCCESS on this exact HEAD.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright and Pages artifact upload all passed. This is a successful PR Pages artifact build; it is not evidence of a production deployment.
- **BLOCKED — Tests [44336176587](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176587) and duplicate push run [44336166612](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336166612): FAILURE on this exact HEAD.** In the inspected test job, corpus structure validation, editable Python install, wheel registry verification, pytest, Node setup and `npm ci` passed. Mandatory `npm audit --audit-level=high` failed with 4 high-severity findings, including GHSA-fc5q-39xc-vjpf in transitive `picomatch`. Build, generated-data, Node and Playwright steps were skipped by this job. The successful Pages workflow uses `npm install --no-audit` and does not waive the required audit gate.
- PR #171 remains OPEN, DRAFT and unmerged. No dependency override, audit suppression, release or production deployment was made. Linguistic acceptance remains incomplete: independently adjudicated Yangon IPA gold = 0 and accuracy unmeasured; primary MLC/MLCTS evidence and reuse rights incomplete; phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED pending human prerequisites.
- **Readiness:** engineering/research prototype, not release-ready.



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


## Exact-tip CI completion — 2026-11-18 (`98e2b301fe1aa12d6f2b930fb9d9908317738040`)

- **DONE_VERIFIED — PR Tests [44378628219](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628219): SUCCESS** on this exact HEAD. Verified in job logs: **322 Python tests + 68 subtests**, **73 Playwright built-site tests**, production build and generated-data checks passed; `npm audit --audit-level=high` reported **0 vulnerabilities**.
- **DONE_VERIFIED — push Tests [44378609571](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378609571): SUCCESS** on the same exact HEAD.
- **DONE_VERIFIED — Pages build [44378628098](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628098): SUCCESS** on the same exact HEAD. Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet parity, static browser model export, upstream `thrax_g2p` parity, production build, Node/browser tests, Pages configuration and artifact upload succeeded. The `deploy` job was **SKIPPED** for the pull-request event; this is not a production deployment.
- **DONE_VERIFIED — optional raw-output diagnostics [44378628110](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44378628110): SUCCESS** across Google WFST raw-output, raw-output comparator and CRF baseline jobs. This is reproducibility/structural diagnostic evidence only, not an independent linguistic gold evaluation or accuracy score.
- **Task ledger:** all configured engineering CI gates are DONE_VERIFIED on exact HEAD `98e2b301…`. Linguistic acceptance remains PARTIAL/BLOCKED: independently adjudicated Yangon IPA gold = 0; accuracy unmeasured; primary MLC/MLCTS evidence and reuse rights incomplete; phonological coverage incomplete; manual accessibility QA TODO; independent annotation DEFERRED.
- PR #171 remains OPEN/DRAFT/unmerged. No merge, production deployment, release, force-push or branch deletion occurred. **Readiness remains research/engineering prototype, not linguistically release-ready or WCAG-conformance-certified.**


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


## Convention-sheet preparation continuation — 2026-11-18

A specialist decision draft now exists at [docs/ipa-convention-sheet-draft.md](ipa-convention-sheet-draft.md) and is linked from [the controlled gold collection playbook](ipa-gold-collection-playbook.md). It enumerates approval decisions for profile/task, IPA kind, tone/register/phonation, vowels/length, syllable boundaries, medials, codas, uncertainty and schema fit. It is explicitly **NOT APPROVED FOR ANNOTATION** and does not select disputed analyses or add IPA labels.

The gold pilot remains blocked pending qualified specialist approval, two independent annotators, a separate adjudicator, curator, item-level source/rights checks and a private blind-intake dry-run. Issue [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85) is the coordination tracker; its protocol links now point to the current integration branch. No person was contacted/recruited, no source material copied, no gold data created and no accuracy claim made.



## Exact CI closeout — integration tip `6c5190683bce286cfc46c52497cabdc6d7b2fa07` (2026-11-18)

All four configured workflows completed successfully on this exact SHA; run metadata confirms each `head_sha` matches:

- **DONE_VERIFIED — PR Tests [44407661913](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407661913): SUCCESS.** Corpus structure validation, editable Python install, wheel registry verification, pytest, npm install, high-severity npm audit, production build, generated-data freshness, Node tests, Chromium installation and built-site Playwright suite all passed.
- **DONE_VERIFIED — Push Tests [44407648376](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407648376): SUCCESS** on the same SHA; all configured steps passed, including built-site browser tests.
- **DONE_VERIFIED — Pages artifact build [44407661700](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407661700): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser-input alphabet parity, static browser-model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload passed. The deploy job was **SKIPPED** for the PR event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44407661678](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44407661678): SUCCESS.** Pinned Google WFST, CRF baseline and raw-output comparator jobs passed and uploaded outputs/provenance. These are reproducibility/raw-output diagnostics only, not independent gold or accuracy evidence.

The exact-head engineering CI gate is green on `6c5190683bce286cfc46c52497cabdc6d7b2fa07`. PR #171 remains OPEN/DRAFT/mergeable/unmerged, based on `fix/finals-registry-schema-2026-11-17`. This closeout changed no runtime, phonology, source data, corpus, gold labels or benchmark methodology.

**Linguistic acceptance remains PARTIAL/BLOCKED:** independently adjudicated Yangon-profile IPA gold = 0; accuracy unmeasured; specialist convention approval, qualified annotators/adjudicator/curator, rights-cleared attested pilot items and private blind intake remain unresolved; full phonological coverage and manual accessibility QA remain incomplete. No accuracy claim follows from optional raw-output diagnostics. Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.


## Mainline architecture document reconciliation — 2026-11-20

- Integrated the root `docs/ARCHITECTURE.md` correction from merged PR #172 (merge commit `2544d3f8528c8ff8ac526843e3963a9fe337312e`) into this IPA-first integration branch, and linked it from README.
- PR #172 exact head `bf24c1227330751a246a5e81c492df65e332c414`: Tests [44723214246](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44723214246) SUCCESS (315 Python tests + 68 subtests, 71 built-site Playwright tests, 0 npm vulnerabilities); Pages build [44723214235](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44723214235) SUCCESS, including WFST/OpenFst, IPA symbol-table/input-alphabet checks, upstream Thrax parity, build and artifact upload. Deploy was skipped for the PR event.
- The merge commit is included as the second parent of the reconciliation merge commit; no force-push or branch deletion is used.
- Root `docs/ARCHITECTURE.md` was updated on 2026-11-20 to describe the registry-backed IPA-first Python/browser topology, canonical CSV ownership, shared semantic fixtures, external diagnostic-only engines, typed IPA adapter boundary and conservative prosodic/profile withholding. It no longer describes the pre-#171 mainline. This documentation is part of the current #171 candidate; after merge it will describe shipped mainline behavior.


## Exact reconciled integration-head CI closeout — 2026-11-20

- Final reconciled branch head before this closeout: `9d39110ca5f7e30f6449e1975633f79f7421a429`. It is a proper two-parent merge commit: first parent is the IPA-first implementation head `880520ddc3e6e81b837d6ba9e864bc6686329c2c`; second parent is main's merged architecture commit `2544d3f8528c8ff8ac526843e3963a9fe337312e`.
- Current PR #171 base is `main`; compare: 185 commits ahead / 0 behind, 37 changed paths, GitHub reports mergeable. PR remains OPEN/DRAFT; no production deployment or release occurred.
- PR Tests [44724860279](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724860279) SUCCESS: **325 Python tests + 68 subtests**, **74 built-site Playwright tests**, npm build/Node tests, generated-data freshness and both npm audit checks (**0 vulnerabilities**).
- Push Tests [44724850117](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724850117) SUCCESS on the same exact head.
- Pages artifact build [44724860172](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724860172) SUCCESS: pinned Google Burmese WFST/OpenFst, IPA symbol-table invariants, browser input-alphabet validation, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload. Deploy was SKIPPED because this was a PR event.
- Optional diagnostics [44724860152](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724860152) SUCCESS across Epitran/raw-output comparator, Google WFST raw output and CRF baseline. These are diagnostic/reproducibility artifacts only, not independent gold or accuracy evidence.
- Engineering integration is verified on this exact head. Linguistic release acceptance remains PARTIAL/BLOCKED: expert-approved versioned Yangon careful-citation IPA convention; qualified independent annotators, adjudicator and curator; private blind intake; item-level source rights/locators; at least 30 distinct adjudicated lexeme groups; complete tone/phonation/quantity/coda/medial coverage; manual accessibility QA. Independent adjudicated IPA gold remains 0 and empirical accuracy remains unmeasured.
- PRs #168/#169/#170 remain open and untouched as overlapping candidates. PR #171 is the consolidated candidate; owner review is still required before merge.


## Registry-backed IPA-first integration merged — 2026-11-20

- Consolidated PR #171 merged to `main` by squash as `a7cd77c30ff039b594536f72219ccd2a497e7dfd`. It integrates the finals-registry repair, canonical CSV-backed IPA phonology, typed IPA boundary, Python/browser implementations, shared semantic fixtures, layer statuses, wheel data verification, conservative hybrid diagnostics and the corrected runtime architecture.
- Exact PR head `2ca51ca28f9d4ebd6f67539e8ee2ce9423e01b96` passed PR Tests [44733556541](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733556541) (**325 Python tests + 68 subtests; 74 Playwright; 0 npm vulnerabilities**), push Tests [44733544647](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733544647), Pages artifact [44733556536](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733556536), and optional diagnostics [44733556552](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733556552).
- Exact post-merge main commit `a7cd77c30ff039b594536f72219ccd2a497e7dfd`: push Tests [44734426671](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44734426671) SUCCESS (**325 Python + 68 subtests; 74 Playwright; 0 npm vulnerabilities**); Pages/deploy [44734426858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44734426858) SUCCESS including live-site/runtime-asset smoke; optional diagnostics [44734426623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44734426623) SUCCESS (diagnostic only).
- PRs #166, #167, #168, #169 and #170 were closed as completed/superseded after checking their relevant code/data changes against current `main`; their branches were not deleted or rewritten. PR #129 remains open because it contains separate research benchmark assets not part of #171.
- Issue [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85) now links to mainline annotation protocol and convention draft. It remains open: independent adjudicated Yangon IPA gold = 0, empirical accuracy unmeasured, convention sheet unapproved, no annotators/adjudicator/curator, no private blind intake, no rights-cleared 30-item pilot.
- Manual accessibility QA is tracked in Issue [#173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/173). Automated Chromium tests are not manual WCAG sign-off.
- Engineering pipeline and deployment are verified; linguistic release readiness remains BLOCKED/PARTIAL. The final ledger synchronization is documentation-only and its own exact-head CI is checked separately.

## Exact latest mainline verification and PR-stack reconciliation — 2026-11-20

- Current `main` HEAD: `c88b1857a7e321264a4ad31c5efeb8bf471f49e6`.
- PR #171 is merged as `a7cd77c30ff039b594536f72219ccd2a497e7dfd`; PR #172 architecture clarification is merged as `2544d3f8528c8ff8ac526843e3963a9fe337312e`.
- Exact current-main Tests [44735314959](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44735314959): SUCCESS — **325 Python tests + 68 subtests**, **74 Playwright tests**, npm audit found **0 vulnerabilities**; wheel registry verification, generated-data freshness, Node tests and built-site browser tests passed.
- Exact current-main Pages [44735314873](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44735314873): SUCCESS — pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input-alphabet parity, static model export, upstream `thrax_g2p` parity, production build, Node/Playwright, artifact upload and Pages deployment succeeded. Published site: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.
- PRs #166–#170 were closed as completed/superseded after reconciliation; their branches were retained. PR #129 remains open but is a divergent historical candidate (head `d0be0c316fe59f64f1b2f71e484c10d1356dbf3b`, 53 ahead / 42 behind current main, mergeable=false). Rechecked all 21 changed paths: its optional Epitran workflow, Google WFST benchmark script and benchmark test are byte-identical to main; its remaining paths differ, including older hybrid/IPA adapter/tests and docs. Main contains newer implementations. No PR #129 changes need porting; it is DEFERRED pending owner decision to close, and was not merged, rebased or force-pushed.
- Independent Yangon-profile adjudicated IPA gold remains 0; empirical accuracy remains unmeasured. Specialist approval of the versioned IPA convention, qualified independent annotators, adjudicator, curator, private blind intake, item-level source rights and 30 distinct adjudicated lexeme groups remain BLOCKED on human/source-rights dependencies. Full tone/phonation/quantity/medial/coda coverage and manual accessibility QA remain incomplete; Issue #173 tracks the latter.
- Engineering integration and deployment are verified. Linguistic release readiness remains PARTIAL/BLOCKED; automated CI is not linguistic validation or manual WCAG sign-off.

## Accessibility automation expansion and exact-head closeout — 2026-11-20

- Added `aria-labelledby="input-heading"` to the source textarea and distinct accessible names to the MLCTS, IPA and Ukrainian copy controls.
- Added a built-site Playwright contract for both service and methodology pages: document language, exactly one main landmark and H1, accessible names for controls and links, image alt attributes, named navigation, input name and mode-group name.
- Existing browser checks also cover skip navigation, keyboard access to the main content, reduced-motion scrolling, narrow viewport reflow and placeholder contrast.
- Exact main code HEAD `9083ac45d4eaec324aecbea46e587a07613da4d6`: Tests [44737261587](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44737261587) SUCCESS — **325 Python tests + 68 subtests, 75 Playwright tests, 0 npm vulnerabilities**.
- Exact same-head Pages [44737261616](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44737261616) SUCCESS — pinned Google WFST/OpenFst and symbol-table/alphabet checks, upstream Thrax parity, production build, browser suite, artifact upload, deployment and deployed-site/runtime-asset smoke.
- This is automated accessibility smoke coverage, not a human audit. Issue [#173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/173) remains open for keyboard-only end-to-end QA, named screen-reader/assistive-technology runs, 200%/400% zoom, full contrast sampling, touch targets, reduced-motion/text-size behavior and device-specific evidence. No WCAG conformance claim is made.

## Exact current-main closeout and bounded research continuation — 2026-11-20

- Verified main HEAD: c39ee3b05455ea309d4327ee15d9d6fed8db7605.
- Exact-head Tests [44738350586](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44738350586) and Pages/deploy [44738350573](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44738350573) both SUCCESS. Tests include corpus structure, wheel IPA registry, Python, npm audit/build/generated data/Node and built-site Playwright; Pages includes pinned WFST/OpenFst, IPA symbol-table/alphabet checks, upstream Thrax parity, production browser tests and deployed runtime-asset smoke.
- PR #174 accessibility automation/documentation is included in this mainline; PR #129 remains open as a divergent historical research PR and is not to be merged or independently ported. Its relevant benchmark/provider implementation is already represented by the integrated stack; preserve the branch and leave closure to the owner.
- Added bounded source record NI2025 and claim CLM-NI25-ONSET-F0-001 from Ni (2025). The study's four Yangon-origin bilingual speakers, /ʔə/+open-/a/ carrier-sentence design and F0-only result are recorded in the research workpack. This is not citation-form IPA or lexical gold and does not change runtime rules.
- Independent adjudicated gold remains 0; accuracy remains unmeasured. Convention approval, two annotators, separate adjudicator/curator, blind intake and rights-cleared 30-item pilot remain blocked on human and rights dependencies (Issue #85).
- Manual accessibility QA remains TODO under Issue #173; automated smoke is not WCAG sign-off.
- This pre-merge branch-status note is superseded by the final merged-main closeout below.


## Final merged-main closeout — 2026-11-20 (supersedes the pre-merge checkpoint above)

- Final default-branch commit: [46b9a089d771eb9cf582a4fd24bead656965e9b0](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/commit/46b9a089d771eb9cf582a4fd24bead656965e9b0); PR [#175](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/175) is merged. The earlier c39ee3b checkpoint and “branch is not main” instruction above are historical, superseded states.
- Exact final-commit Tests [44753083163](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44753083163): SUCCESS. Optional Epitran raw-output diagnostics [44753082760](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44753082760): SUCCESS.
- Exact final-commit Pages/deploy [44753082850](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44753082850): SUCCESS. Both build and deploy jobs passed, including pinned Google Burmese WFST/OpenFst build, IPA symbol-table and browser-alphabet validation, upstream Thrax parity, static model export, Node tests, production build, Playwright, Pages artifact upload/deployment and deployed runtime-asset smoke.
- PR [#129](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/129) remains open and intentionally untouched: it is divergent historical research work; its benchmark/provider functionality is already represented in the integrated stack. Preserve the branch; owner may decide whether to close it.
- Human gates remain: gold pilot BLOCKED under [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85); manual accessibility QA TODO under [#173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/173). Independent adjudicated gold=0; empirical accuracy unmeasured. No license was selected because that is an owner decision.
- Result: engineering/build/deployment verified; linguistically a research prototype, not release-ready. Connector-hosted CI was verified; no local checkout or local test commands were available in this session.


## Owner-authorized noncommercial licensing — 2026-11-21

The repository owner has confirmed that the project purpose is noncommercial research and scientific knowledge-sharing. This supersedes earlier handoff notes that the root-license decision was still awaiting the owner.

- Original project software code: PolyForm Noncommercial 1.0.0 (LICENSE); package metadata now declares SPDX identifier PolyForm-Noncommercial-1.0.0.
- Original documentation and explanatory prose: CC BY-NC 4.0 (LICENSE-DOCS).
- CITATION.cff now identifies the software license rather than NOASSERTION.
- The prior stale README statement that the repository had no project license has been replaced.
- The project license does not relicense Epitran/MIT, Google Language Resources/Apache-2.0, Mya2Rom/CC BY-SA 4.0, or any other third-party component. Their upstream notices remain controlling.
- The license does not blanket-license data/; each source-derived observation, corpus, model, dictionary and recording retains its own provenance and rights status. Unknown or conflicting rights remain unresolved and do not authorize redistribution.
- PolyForm Noncommercial is not OSI-approved Open Source. Commercial use is not granted by these terms.

Task ledger:
- BURMESE-LICENSE-001 — PARTIAL pending PR CI/merge; scope and metadata implementation is in this branch.
- Third-party source-rights clearance — PARTIAL/BLOCKED per item-level evidence; this license change does not close those existing research gates.
- No linguistic data, IPA labels, Ukrainian mappings, runtime rules, or generated artifacts were changed.

The dedicated branch is license/noncommercial-research-2026-11-21; this section records the proposal until its PR is reviewed and merged. No release or legal opinion is implied.


## Final noncommercial license closeout — 2026-11-21

The owner-authorized noncommercial licensing decision is merged. PR #177 added PolyForm Noncommercial 1.0.0 for original project code, CC BY-NC 4.0 for original documentation, synchronized Python package and CITATION.cff metadata, and reconciled third-party notices and license scope. Merge commit: 3d9789152b251dfa503f36726cc7a89c9835fcb7.

PR-head verification on d4d2498fe8ba9f9f46422e81fff679b5d3bbd5f5: tests run 44826544412 SUCCESS; Pages build run 44826544397 SUCCESS (deploy is skipped for pull_request events). Exact-main tests and Pages/deploy runs on 3d9789152b251dfa503f36726cc7a89c9835fcb7 were queued at the time of this handoff update and must be checked before calling that main SHA fully green.

BURMESE-LICENSE-001 — DONE_VERIFIED for the repository-owned software/docs licensing declarations, scope boundaries, package metadata and PR-head CI. Third-party/source-data rights remain PARTIAL or BLOCKED per item-level evidence; this project license does not authorize redistribution of items with unknown or conflicting rights. No linguistic records, IPA, runtime rules or generated artifacts were changed. The repository remains a linguistically partial research prototype, not release-ready.


## Original research-data license — 2026-11-21

Owner-authorized noncommercial research reuse now explicitly covers original project-authored datasets, annotations and curated database contributions under CC BY-NC 4.0 (`LICENSE-DATA`), where the maintainers/contributors hold the rights. README and `THIRD_PARTY_NOTICES.md` now explain the scope and exclusions; `data/benchmark/licenses.json` registers CC-BY-NC-4.0 and distinguishes research reuse from the stricter commercial/product gold-corpus gate. The gold-corpus documentation preserves that gate: NC-only material is not eligible for commercial/product export.

BURMESE-RESEARCH-DATA-LICENSE-001 — implementation complete on this branch; pending PR-head and post-merge CI. This grant does not clear Mya2Rom, Epitran mapping data, Google language resources, myG2P, MOW, Goruut or any other third-party source. Existing per-item rights evidence remains controlling. No new corpus rows, IPA labels, lexical data or runtime behavior were added. The gold corpus remains empty and the expert pilot remains blocked pending approved convention, independent annotators/adjudicator, curator and item-level rights checks.


## Research-data license merged and exact-main CI — 2026-11-21

PR #179 merged as `c604092088d48bd4c4bf8fcf45cf40ab77705a08`. PR-head tests [44829563024](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44829563024) and Pages build [44829563050](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44829563050) both passed (deploy is correctly skipped on pull requests). The exact post-merge main SHA `c604092088d48bd4c4bf8fcf45cf40ab77705a08` is fully green: tests [44830387172](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44830387172) and Pages build/deploy [44830387150](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44830387150) both SUCCESS.

BURMESE-RESEARCH-DATA-LICENSE-001 — DONE_VERIFIED for the repository-owned original research-data license scope, benchmark registry distinction, README and third-party notice updates. Original project-authored datasets/annotations are CC BY-NC 4.0 for noncommercial research only where contributors hold the rights. Third-party/source-derived data rights remain separately unresolved where noted. NC-only rows remain excluded from the commercial/product gold-corpus gate. No gold rows, IPA labels or runtime behavior were added. Expert gold pilot and manual accessibility QA remain outstanding; the repository remains a research prototype, not linguistically release-ready.


## Final exact-main CI after all license closeouts — 2026-11-21

PR #180 merged as `07fcbf92f11cde54ed726a07f0593fd0075e7e09`. Exact post-merge main CI is fully green: tests [44831787580](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44831787580) SUCCESS and Pages build/deploy [44831787588](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44831787588) SUCCESS. This supersedes the prior exact-main checkpoint on `c604092088d48bd4c4bf8fcf45cf40ab77705a08`.

The final main includes the owner-authorized PolyForm Noncommercial code license, CC BY-NC documentation and original research-data grants, the updated third-party notice, benchmark eligibility distinction and completed licensing handoff. BURMESE-RESEARCH-DATA-LICENSE-001 remains DONE_VERIFIED. Third-party/source-specific rights remain unresolved where noted; no new IPA or gold data were created. Expert gold pilot and manual accessibility QA remain outstanding; the repository is still a linguistically partial research prototype.


## Public beta reproducibility and release preparation — 2026-11-21

Owner decision: proceed with public beta without external linguists; expert gold, independent adjudication and measured linguistic accuracy are DEFERRED for beta and remain prerequisites only for expert-validated/production linguistic claims.

- Current pre-change main: `7c02268690ebc8db9f7f9517c0263ce6913c0fab`; exact-main Python/Node/wheel/build/generated-data/Chromium workflow and Pages build/deploy both passed (runs `44904891035` and `44904891024`).
- The Pages workflow still used floating `npm install` although `package-lock.json` existed. Dedicated branch `beta/burmese-reproducible-deps-2026-11-21` changes this to `npm ci`, adds local browser-beta instructions and adds a beta release checklist. PR and exact-head verification are pending.
- The browser is a local-first static client; it distinguishes the IPA-first provisional phonetic path from the separate MLCTS orthographic romanization path. Neither is represented as expert-validated.
- Existing unresolved phonological scope remains PARTIAL: medial/conjunct/kinzi, coda/checked-syllable, vowel combinations, tone/register/phonation, dialect profiles and Python/browser parser parity. Fail-closed behavior remains mandatory.
- Rights: Mya2Rom and Google WFST build/runtime notices remain in place; myG2P is not bundled due NC-SA terms; no uncleared data is imported. No new data or IPA labels were added.
- Manual accessibility review remains TODO; automated Playwright is not WCAG certification. Expert gold remains 0 and accuracy null.

See `docs/BETA-RELEASE-CHECKLIST.md` and `docs/BETA-RELEASE-POLICY.md`. No GitHub Release was published; publication is a separate owner-controlled action.


## Final beta engineering closeout — 2026-11-21

PR #185 merged as `4ab231eeedfb5ad00b72aebd7418d143ffb10242`. It changes the Pages dependency installation to `npm ci` against the existing npm lockfile, adds reproducible local browser-beta instructions, and adds the operational beta release checklist. Exact PR-head tests on `ac4e25ff01d6c0c1e1d0784aa1c72abfac4caaec` passed [44906901064](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44906901064); exact PR-head Pages build passed [44906901057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44906901057) (deploy correctly skipped on pull_request). Exact post-merge main tests [44907208175](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44907208175) and Pages build/deploy [44907208189](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44907208189) both SUCCESS.

BURMESE-BETA-ENGINEERING-001 — DONE_VERIFIED. Engineering beta gates (tests, wheel contents, generated-data freshness, npm build/tests, production Chromium and Pages deployment) are green on exact main `4ab231eeedfb5ad00b72aebd7418d143ffb10242`. This does not establish full Burmese pronunciation coverage, expert validation or measured accuracy.

BURMESE-GOLD-PILOT-001 — DEFERRED for beta / BLOCKED for expert-validated claims; gold=0, accuracy=null. BURMESE-MANUAL-A11Y-001 — TODO; no human WCAG review. Phonological coverage remains PARTIAL for medials, conjuncts, kinzi, codas, vowel combinations, tone/register/phonation, profile adjudication and full Python/browser parser parity. Third-party rights remain source-specific; myG2P and unclear data are not bundled. No IPA labels, lexical corpus rows or accuracy metrics were added. No GitHub Release was published.


## Current mainline beta verification — 2026-11-21 (supersedes earlier pending note)

PR #186 merged as `940a1db63404b0b564b50198369d2e783525219a`. Exact-current-main Tests workflow [44908043970](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44908043970) completed SUCCESS. Exact-current-main Pages build/deploy [44908043967](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44908043967) was IN_PROGRESS at this checkpoint (pinned Google Burmese WFST/OpenFst build); do not treat it as passed until its conclusion is SUCCESS. This supersedes the earlier stale statement that PR #185's reproducibility work was pending: PR #185 is merged, `npm ci` is in the Pages workflow, and its exact PR-head and prior post-merge checks passed. The latest exact-main deploy is the only outstanding engineering verification at this checkpoint.

BETA status: engineering checks DONE_VERIFIED except the current-main Pages deployment check pending; expert gold remains 0 / accuracy null and is DEFERRED for beta; manual accessibility QA remains TODO; phonological coverage remains PARTIAL; source-specific third-party rights remain PARTIAL where recorded. No IPA labels, gold rows, unsupported runtime rules, or GitHub Release were added by this closeout.


## Final exact-main beta check completion — 2026-11-21

The previously running Pages build/deploy [44908043967](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44908043967) has now completed SUCCESS on exact main `940a1db63404b0b564b50198369d2e783525219a`. Tests [44908043970](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44908043970) also SUCCESS on the same SHA. The current-main engineering beta gate is therefore DONE_VERIFIED for this commit. This is build/runtime evidence only; it does not validate pronunciation accuracy, complete phonological coverage, or manual accessibility.


## Final Burmese public beta mainline closeout — 2026-11-21

Latest main SHA: `9bdb0dd942e9186f85a60cf52a258d95026da0f0`. PR #191 merged the methodology-page beta disclosure and direct links to the beta checklist/policy. Exact post-merge Tests [44909742163](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44909742163) SUCCESS (325 Python tests + 68 subtests; 75 production Chromium tests); Pages build/deploy [44909742287](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44909742287) SUCCESS, including pinned Google WFST/OpenFst build, production browser smoke and deployed asset smoke.

The public landing and methodology pages now identify the service as a public research beta with the 21 November status snapshot. The README links the beta policy and operational checklist. Engineering beta gate DONE_VERIFIED. Independent expert IPA gold remains 0 and accuracy null (DEFERRED for beta); phonological coverage remains PARTIAL for tone/register/phonation, medials/conjuncts/kinzi, codas/vowel combinations and full Python/browser parity; manual accessibility QA remains TODO; unresolved third-party rights remain excluded where required. No IPA labels, gold rows, unsupported runtime rules or GitHub Release were added.

## Tier-B provisional coverage implementation — 2026-11-21

- **DONE_VERIFIED (code + hosted tests):** added a separate provisional IPA lane for one onset + one single vowel sign when both have explicit registry IPA and source evidence and no structural/prosodic blocker is present. Python and browser runtimes share the same contract. IPA candidates pass through the existing IPA → Ukrainian adapter; no direct grapheme-to-Ukrainian shortcut was added.
- **DONE_VERIFIED (evidence tiers):** B requires a complete segmental candidate, successful Ukrainian IPA adaptation, and a phonological source beyond Unicode-only orthographic documentation for every segment. ကီ → kiː remains C because its vowel row cites only U18; စေ → se can be B where the adapter succeeds. Tone, phonation, quantity and profile adjudication remain unresolved, so this is not canonical full IPA.
- **DONE_VERIFIED (exact-head CI at code-bearing checkpoint):** branch head c90805a6f82f2976c28d4d14c4e7509d05871c82; PR test run 44932277935 SUCCESS (328 Python tests + 68 subtests; npm tests 75 passed; generated-data freshness, production build and built Chromium smoke all passed). Push test run 44932273308 also SUCCESS. Pages PR workflow 44932277924 was still pending at this checkpoint and is not represented as passed.
- **PARTIAL:** only explicitly registered single-onset/single-vowel combinations are eligible; medials, conjuncts, kinzi, codas, multi-sign vowel combinations and prosody remain withheld. No corpus-wide coverage or accuracy claim follows.
- **DEFERRED:** independent Yangon-profile expert adjudication and an independent gold corpus. Gold remains empty; empirical accuracy remains NOT_ASSESSED.
- PR #193 contains this work. Existing draft PR #129 was inspected and left untouched as a separate historical/divergent research stack; it was not rebased, ported or merged.

## Post-merge verification — 2026-11-21

Tier-B implementation PR #193 was squash-merged as dce44bf5ab93fcc9f70fcf1b84e84d033ef36bc5. The resulting mainline code checkpoint passed exact-main Tests run 44933368532 SUCCESS (328 Python tests + 68 subtests; npm tests 77 passed; generated web data, build and built Chromium smoke passed). Mainline Pages run 44933368467 was still building the pinned Google Burmese WFST/OpenFst model at handoff time; no deployment success is claimed until that run completes. PR #129 remains untouched and unmerged as a separate divergent historical research branch. Independent Yangon-profile gold remains empty; measured accuracy remains NOT_ASSESSED.

## Deployment closeout after tier-B merge — 2026-11-21

The mainline Pages run 44933368467 completed SUCCESS on the tier-B code merge SHA dce44bf5ab93fcc9f70fcf1b84e84d033ef36bc5. The pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser alphabet check, upstream thrax_g2p parity, npm build/tests, built Chromium tests, Pages artifact upload, deployment and deployed HTML/JS/CSS smoke all passed. Public beta remains at https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ .

The subsequent documentation-only main checkpoint before this closeout was 071a9c33120dcbc980dfa730f8bf8dd4b29253d3; exact-main Tests run 44933539925 also passed (328 Python tests + 68 subtests; npm tests 77 passed; built Chromium smoke passed). Independent Yangon-profile gold remains empty; accuracy remains NOT_ASSESSED. This completes engineering/deployment verification for the bounded B-tier preview path, not full-language phonetic validation.

## Tier-B evidence gate hardening — 2026-11-21 (supersedes the earlier same-day tier-B examples)

- **DONE_VERIFIED (source registry):** added exact Green (2005) locators from *Word, foot and syllable structure in Burmese*, Table (1), p. xii; Table (6), p. xiii; and abbreviation list p. xv. The locators are attached to individual onset/vowel rows and propagated through Python and browser phonology results.
- **DONE_VERIFIED (confidence policy):** B now requires every segment to have a non-Unicode source ID plus an exact per-segment locator, a successful full IPA → Ukrainian adaptation, and no registered source-analysis conflict. It is a provisional segmental tier, not full canonical IPA or a probability.
- **B examples (segmental only):** နီ → /ni/ → ні; လေ → /le/ → ле; ပူ → /pu/ → пу; နေ → /ne/ → не. Tone, phonation, quantity and independent Yangon-profile adjudication remain unresolved. The source's broad IPA vowel-quality examples are not used to infer length.
- **C retained intentionally:** ကီ → /ki/ remains C because its onset က lacks an exact phonological locator; Unicode alone is not phonological evidence. စေ → /se/ remains C because Green (2005) maps စ to /s/ and gives စေ sè, while Oo et al. (2020) §3, p. 6330 gives စ /tʃ/. The candidate is inspectable, but the conflict blocks B and canonical promotion.
- **DONE_VERIFIED (exact-head CI at code checkpoint):** branch commit 1ec2fb3f0f54d99b99397c12c32a088a6c313d32; Tests run 44935059189 SUCCESS: 329 Python tests + 68 subtests, npm 78 passed, dependency advisory gate, production build, generated-web-data freshness and built Chromium smoke all passed. The run includes independent IPA gold structure validation and wheel registry inclusion checks.
- **PARTIAL:** only source-located simple CV candidates are newly B. Medials, conjuncts, kinzi, codas, multi-sign vowels, sandhi and full prosody remain outside this B subset.
- **DEFERRED:** independent Yangon-profile expert adjudication and independent gold remain unavailable; gold is empty and measured accuracy remains NOT_ASSESSED.
- PR #194 carries this hardening. The earlier PR #193 merge and public beta deployment remain intact; PR #129 remains an untouched divergent historical branch.
- **Deployment:** branch Pages workflow 44934968745 was still building at this checkpoint. Do not claim the new code is deployed until a post-merge main Pages run and deployed asset smoke test pass.

## Green (2005) source-rights correction — 2026-11-21

- **DONE_VERIFIED (merged source metadata):** PR #195 merged as `921d891b253fc1984f163f94b383145e168c32d4`. `data/burmese/sources.csv`, `docs/EVIDENCE-CONFIDENCE-TIERS.md`, and `THIRD_PARTY_NOTICES.md` now agree that the Green (2005) PDF's copyright page p. ii vests copyright in Pacific Linguistics and states no open license. The former CC BY-SA 4.0 assertion was removed.
- **Rights boundary:** only short factual IPA examples and exact source locators are recorded; no tables or extended text are copied. Broader reuse remains unresolved.
- **Exact PR-head CI:** test and build succeeded; CRF baseline, raw-output and Google WFST diagnostic jobs succeeded. Main post-merge build/browser/deploy checks are still tracked separately.
- **Linguistic boundary unchanged:** the four B examples remain provisional segmental candidates only; tone, phonation, length and independent Yangon-profile adjudication are unresolved. Gold remains empty and accuracy NOT_ASSESSED.

## Additional lexical-source search — 2026-11-21

- **Research outcome:** Undermind search across Watkins (2001), Oo et al. (2020), Thura et al. (2016) and related leads returned no additional exact orthography–IPA item pairs with page/entry locators, transcription convention, profile and rights evidence sufficient for B. No new candidates were guessed or imported.
- **Evidence limitation:** this is a negative result from available search metadata/abstracts, not proof that no qualifying source exists. Full-text/source-page inspection and item-level rights verification remain the acceptance criteria.
- **Current B boundary:** four exact-locator segmental candidates only; no independent Yangon adjudication, no independent gold, and no accuracy score.

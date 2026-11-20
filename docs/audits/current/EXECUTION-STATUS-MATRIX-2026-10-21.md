# Burmese phonology execution status matrix

Updated: 2026-11-18
Base branch at start: main (verified HEAD: f7f7d41a116c265481bdc17c225a763becab6013); active stacked integration candidate tracked by PR #171
Scope: executable status ledger reconciled with the 2026-10-20 phonology and G2P/licensing audits. This is a continuation register, not a claim of full phonological coverage.

## Status vocabulary
- DONE_VERIFIED — implementation and relevant automated verification both exist.
- PARTIAL — some executable behavior exists, but the layer acceptance criteria are incomplete.
- TODO — no sufficient implementation or verification is established.
- BLOCKED — an external decision, dependency, or missing independent evidence prevents defensible completion.
- DEFERRED — explicitly outside this iteration.
- Coverage counts distinguish implemented behavior, regression-tested behavior, and independently validated lexical evidence. Structural tests do not validate phonological analyses.

## Layer-by-layer ledger

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Unicode normalization | Python NFC/NFD/NFKC/NFKD entry points; browser NFC entry point | Python NFC idempotence and one canonical-equivalence pair are tested; browser checks the same pair's normalized analysis; broader compatibility-character policy and corpus coverage remain absent | Not applicable to pronunciation | PARTIAL | Specify the supported normalization contract and expand canonical-equivalence/compatibility tests in both runtimes |
| Myanmar block recognition | Bounded Myanmar/Extended block recognition | Structural fixture tests reported by audit | Not phonological evidence | DONE_VERIFIED (bounded contract only) | Keep block recognition distinct from parser/phonology support |
| Grapheme and syllable segmentation | Conservative Python parser and separate browser parser | Shared Unicode contract covers supported-block vs unsupported-inventory cases; PR #30 fixes empty/whitespace-only input. PR #77 adds Python whole-message reconstruction with unsupported Myanmar Extended-C between valid Burmese units, mixed scripts, numerals, punctuation, CRLF and U+200B. PR #78 adds built-browser parity: source reconstruction under textarea CRLF→LF canonicalization, visible unsupported Myanmar unit and preserved foreign text/numerals. Exact PR-head CI [41289738055](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41289738055) and [41290257958](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41290257958) passed pytest, build, generated-data drift, Node and Playwright browser checks. Annotated differential corpus remains incomplete. | 0 lexical gold entries established | PARTIAL | Expand boundary-annotated cases across combining-mark orders, malformed clusters and all API/service entry points; independently adjudicate phonological examples |
| Consonant/onset inventory | Small Python onset IPA table and graphemic inventory | Existing parser/IPA regression coverage is limited | No independently adjudicated inventory-wide lexical set | PARTIAL | Source-map each onset and test legal/unsupported contexts |
| Kinzi | Explicit structural recognition and role metadata | Structural regression coverage exists; contextual phonological tests incomplete | None established | PARTIAL | Source-located onset/medial/coda-context cases and cross-runtime assertions |
| Medials / complex onsets | Four medial signs parsed; some browser contextual derivation | Partial; full combination gold set absent | None established | PARTIAL | Inventory combinations, competing analyses, environments, counterexamples and paired Python/browser tests |
| Dependent/inherent vowels | Vowel signs parsed; small vowel-ID-to-IPA map | Structural tests exist; derivation coverage incomplete | None established | PARTIAL | Evidence-backed combination table and context/length/quality tests; no extrapolation from unverified patterns |
| Codas / checked syllables | Some final structures parsed; browser rime rules reported | Incomplete | None established | PARTIAL | Enumerate coda/rime classes, mark checked-syllable conditions, test each sourced class |
| Tone | Analysis registries document competing traditional and eight-tone/register analyses; no established runtime realization | Not adequately tested as a phonological layer | 0 tone-labelled gold entries established | TODO | Add scoped, source-located tone examples and separate phonemic category from surface F0 realization |
| Register / phonation | Competing literature descriptions documented | No complete runtime model verified | 0 independently adjudicated register/phonation entries | TODO | Model alternatives explicitly with dialect/scope and phonetic evidence; avoid consensus claims where sources disagree |
| Contextual rules / allophony | Partial browser hand-written cases | Rule-complete regression suite absent | None established | PARTIAL | Rule registry with source, environment, output, counterexamples and Python/browser parity tests |
| IPA result/status contract | Python `RuleBasedBurmeseEngine.analyze()` and browser `analyzeHybrid()` expose separate graphemic, source-phonology, IPA and Ukrainian-adaptation statuses; unresolved dimensions remain independent | `tests/test_rule_engine.py`, `tests/web/hybrid-engine.test.mjs`, and `schemas/analysis-layer-status.schema.json` / `tests/test_schema_validation.py` cover established segmental, partial, unsupported, empty and mixed-text cases; exact implementation-head PR and push Tests [44389661155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44389661155) / [44389647797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44389647797) passed | No lexical IPA gold entries; status contracts are engineering metadata, not phonetic validation | DONE_VERIFIED (API layer-status contract only) | Keep status vocabularies aligned across entry points; extend adversarial structure coverage; do not promote partial IPA to canonical output |
| Misplaced U+1039 virama evidence | Parser already rejects virama not consumed as a conjunct; Unicode structural claim and test trace now recorded | Regression tests in `tests/test_malformed_ipa_withholding.py` and provenance test | Unicode 18.0.0 §16.3.1 / Table 16-4; structural evidence only | DONE_VERIFIED for source-to-test traceability; phonology still TODO | Keep IPA withheld; do not treat structural validation as a pronunciation rule or gold IPA |
| IPA → Ukrainian target adapter | Canonical candidate inventory plus executable whole-string IPA → Ukrainian adapter in Python and browser; longest-match affricates, h/ɦ → г, ɡ/g → ґ (project choice), x → х, explicit ц/дз/ч/дж, aspiration notation, contextual /j/ yotation, prosody trace, fail-closed unknown segments; post-IPA integration in deterministic engine and public service | Python sequence tests; browser adapter tests include spaced IPA, untied consonant sequences and fail-closed unsupported structures; generated-data freshness, Node tests and built-site Playwright rerun queued on PR #133 (run 43095497303) | No Ukrainian name-level or independent lexical IPA gold evaluation | DONE_VERIFIED (source evidence artifact; lexical coverage remains PARTIAL) | Pass the full exact-head CI including built-site Playwright; retain empirical gold evaluation as separate blocker |
| Feature-distance ranking | Candidate ranking implementation exists | Limited regression tests; final schema/feature validation not established | No empirical target-ranking validation | PARTIAL | Validate feature definitions and weights against canonical inventory; test deterministic ranking, ties, unknown features and missing inventory |
| Comparative Russian/Ukrainian policies | Comparative registries and documentary layer present | Practical tests cover selected correspondences | No independent name-level benchmark | PARTIAL | Check every rule provenance, target-language rationale, uncertainty and non-inheritance from Russian |
| Malformed/unsupported input | Structural and practical uncertainty outcomes exist | Some malformed virama and unknown-target tests | Not a lexical accuracy measure | PARTIAL | Adversarial tests for all API/CLI/browser entry points; no confident output after malformed or incomplete parse |
| Phonological source → claim → rule → test traceability | Every current rule row links to a registered source and scoped claim, locator, evidence status and existing regression-test file | `tests/test_source_rule_evidence.py` checks unique rule IDs, source/claim existence, matching source IDs, non-empty locators/scopes and valid statuses | Provenance contract only; no independent lexical IPA gold or accuracy claim | DONE_VERIFIED (current rule rows only) | Add source/claim/locator/test metadata to each new rule; independently adjudicate phonological outputs before expanding the rule inventory |
| JSON schemas / data validation / generated artifacts | Canonical source, source-claim, phonological-rule and syllable schemas; new runtime-specific analysis-layer status schema; generated web data | Existing source/claim/rule/corpus validation plus `tests/test_schema_validation.py` validates Python and browser layer-status enum contracts; exact-head CI is recorded below | Schema integrity only; lexical IPA gold remains 0 | PARTIAL | Continue schema-backed checks for new registries and source/claim locator quality; keep linguistic adjudication separate |
| Python/browser parity | Separate implementations; shared fixtures now cover unsupported Myanmar and analysis-dependent medial/conjunct/kinzi withholding | Python and browser tests consume `tests/fixtures/shared_unicode_contract.json`; exact-head CI 43638222569 passes 278 Python + 68 subtests, 21 Node, 59 Playwright | None established; fixtures are structural/status contracts, not phonetic gold | PARTIAL | Extend fixtures to full parsed structure, syllable boundaries, coda/tone states and adapter traces; retain expert IPA adjudication as a separate gate |
| Lexical IPA gold corpus | Three U18 structural probes now have exact Unicode 18.0 §16.3.1 / Table 16-4 locators; three Green 2002 probes remain pending | PR #43 replaced stale Unicode locators for `ကေ`, `ကော်`, and `ယူ`; exact-head full workflow [40223402689](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223402689) passed pytest, build, generated-data checks, Node tests and Playwright browser tests. Optional Epitran raw-output workflow [40223406632](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223406632) is a comparison artifact, not gold evaluation. | 0 independently adjudicated lexical IPA gold entries | BLOCKED for accuracy evaluation; PARTIAL for source locator cleanup | Inspect the Green 2002 source at exact pages/examples, then obtain expert IPA adjudication; do not promote source examples directly to gold |
| Epitran comparator | Optional scripts/benchmark_g2p.py; pinned Epitran 1.35.3 raw-output workflow on ci/optional-epitran-smoke-2026-10-24 | Workflow [40092717790](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40092717790) and artifact inspected; six outputs, zero errors; package/mapping hashes recorded | 0 verified gold entries; exact-match count/accuracy null | DONE_VERIFIED for raw-output smoke; BLOCKED for accuracy by gold corpus | Preserve artifact; obtain exact source locators and independent adjudication before any scoring; do not infer accuracy from these six structural probes |
| myG2P data | License risks documented; dictionary not bundled | Licensing review is documentary | Not applicable | DONE_VERIFIED (non-bundling guardrail) | Do not import dictionary material absent separate permission and rights review |
| Project license | No root LICENSE; CITATION.cff uses NOASSERTION | Presence/absence documented | Not applicable | BLOCKED — owner decision | Owner selects code license and separately resolves corpus/data/model rights; do not infer from public visibility |
| CI / release readiness | CI configuration now includes schema and generated-artifact gates | CI run #259 passes: pytest (32), web data validation/build, generated-data drift, npm unit tests, and browser tests (40) | No end-to-end phonological validation | PARTIAL | Extend schema validation to all canonical evidence registries; obtain independent lexical IPA gold entries; run pinned Epitran only in a separate environment |

## Gold-corpus rules
1. Keep the six existing seed cases labelled STRUCTURAL_ONLY; they are not phonological gold.
2. A scoreable row must have GOLD_VERIFIED, non-empty expected IPA, a registered source ID, and a precise non-pending source locator.
3. The benchmark enforces non-empty IPA convention, scope/dialect, analysis level (phonemic vs surface phonetic), reviewer and uncertainty/alternative notes. Unit tests verify incomplete metadata is not scored.
4. Never fill expected IPA from the system under test, Epitran, or myG2P and then use that same output as independent truth.
5. Report exact-match and feature/category metrics only over the eligible gold set; show unresolved and unsupported cases separately.

## Reproducibility and license gates
- Epitran is a pinned comparator only. Do not promote it to the primary engine based on agreement with its own mapping or unverified outputs.
- Preserve raw Epitran output and separately hash installed package metadata, map, preprocessor and postprocessor where available.
- Keep third-party code, maps, dictionary, model weights, source text and generated artifacts as separate rights-bearing categories.
- No root license should be added until the owner decides. A public repository is not a license grant.

## Execution evidence and limitations
This register was prepared from the current README, both named audits, the seed corpus, src/burmese_ukrainian/ipa.py, src/burmese_ukrainian/parser.py, tests/test_parser.py, tests/test_practical.py, and scripts/benchmark_g2p.py. Remote inspection confirmed branches main, final-hardening, fix/adversarial-burmese-phonology, and service-ready; they were not modified or merged. This work is on feat/burmese-phonology-coverage-gates-2026-10-21 and is tracked by open draft PR #4; it has not been merged.

Automated CI run #259 (commit 1045735c244e96c898c3a675f15ad68f6b79151a) completed SUCCESS: editable package install PASS; pytest PASS (32 tests, including JSON Schema checks); npm install PASS; npm run build PASS; canonical web-data validation PASS; generated-data drift check PASS; Playwright installation PASS; npm run test:browser PASS (40 tests). The shared Unicode fixture is exercised in the browser. The Epitran benchmark was not run. The project remains a partial research prototype, not release-ready. Independent gold validation remains blocked; project licensing remains an owner decision.

## Website publication

| Layer | State | Evidence | Remaining acceptance criterion |
|---|---|---|---|
| Public disclosure | PARTIAL pending deployment | Homepage and methodology page now disclose the research-preview status, 0 verified lexical IPA gold entries, and 6 structural-only probes; a browser regression asserts the notice and matrix link | Merge only after CI passes, verify GitHub Pages deployment and live page content |


## External comparator execution update — 2026-10-24

A manually dispatchable/path-triggered workflow was added on branch ci/optional-epitran-smoke-2026-10-24 to install Epitran 1.35.3 in an isolated CI job and preserve the raw JSON report as an artifact. This improves reproducibility of the candidate smoke run but does not change the research status: the six current rows remain STRUCTURAL_ONLY, verified gold count remains zero, and accuracy must remain null. Mark the smoke run DONE_VERIFIED only after CI succeeds and the artifact's raw outputs, version, mapping hash, and error status are inspected.


## Epitran smoke run — 2026-10-24

- The first optional workflow run [40092549134](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40092549134) failed after package installation due an `UnboundLocalError`: an in-function `import importlib.resources` shadowed the module used for `importlib.metadata.version`. Fixed by importing `resources` directly, then added a regression guard.
- Successful rerun: [40092717790](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40092717790), Epitran 1.35.3 / Python 3.12.15, 6/6 raw outputs, 0 errors. Corpus SHA-256 `bc7d4f138581b7cfd48594b41891a26ec45123ea4488af977b48567201f0b19b`; mapping SHA-256 `de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4`; artifact SHA-256 `1ca54b638897f41f124147df0744f9929e651757b720552082d701748794e475`.
- Raw outputs include `ကေ → ke`, `ကော် → kaʊʔ`, `ကြည် → t͡ɕi`, `စွယ် → səwɛ`, `မြန် → məjaɴ`, `ယူ → ju`. These are preserved as candidate outputs, not adjudicated IPA truth. Verified gold count is 0; exact-match count and accuracy are null. Epitran does not reconstruct tone in this mapping and the present corpus cannot support an accuracy claim.


## Final reproducibility record — 2026-10-24

- Current-head verification [40093021155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40093021155) passed: pytest, web build, generated-data drift check, npm tests and Playwright browser tests all succeeded.
- Current-head raw-output run [40093021146](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40093021146) passed. Epitran 1.35.3 / Python 3.12.15; corpus path `data/burmese/phonology_corpus.csv`; corpus SHA-256 `bc7d4f138581b7cfd48594b41891a26ec45123ea4488af977b48567201f0b19b`; mapping SHA-256 `de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4`; empty preprocessor SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`; postprocessor SHA-256 `0eac185c50b19b7c2682d1395afad97a7662a5ff22e2344195eb0d3ffcbed7af`; artifact ZIP SHA-256 `6abad56759caa47868dee8af5e82068c143f810336454099ba9c149dc74e8f09`.
- Six structural probes yielded `ke`, `kaʊʔ`, `t͡ɕi`, `səwɛ`, `məjaɴ`, `ju`. Gold count 0; exact-match count and accuracy null. This is a reproducible smoke run, not an accuracy result.


## Final reproducibility record — 2026-10-24

Current-head verification run 40093021155 passed: pytest, web build, generated-data drift check, npm tests, and Playwright browser tests. Current-head raw-output run 40093021146 passed with Epitran 1.35.3 / Python 3.12.15. The six structural probes produced raw candidate outputs only; verified gold count is zero and accuracy remains null.

Corpus path is relative: data/burmese/phonology_corpus.csv. Corpus SHA-256: bc7d4f138581b7cfd48594b41891a26ec45123ea4488af977b48567201f0b19b. Mapping SHA-256: de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4. Preprocessor is empty (SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855). Postprocessor SHA-256: 0eac185c50b19b7c2682d1395afad97a7662a5ff22e2344195eb0d3ffcbed7af. Artifact ZIP SHA-256: 6abad56759caa47868dee8af5e82068c143f810336454099ba9c149dc74e8f09. This is a reproducible smoke run, not an accuracy result.


## Merge and final acceptance record — 2026-10-24

PR #9 merged at `b71e2075b1e7dcebd17b54164bc017eb99eececd`. The raw-output smoke and full verification suite passed on the code-tested head; the report hashes the corpus and Epitran mapping/pre/post resources and keeps the gold denominator at zero. The raw-output task is DONE_VERIFIED; accuracy and source-adjudicated corpus tasks remain BLOCKED/TODO.


Authoritative readiness checkpoint — 2026-10-24 12:38 UTC

- Current main HEAD: b7a44e6e0ff7ec0010d58c30c2ceb0101e72761b.
- Engineering verification: DONE_VERIFIED. Current-main tests 40093806758 and Pages deploy 40093806746 both passed. Test suite includes Python, generated-data drift, npm, build and Playwright checks.
- Epitran smoke: DONE_VERIFIED as raw-output execution only. Pinned Epitran 1.35.3 / Python 3.12.15; six structural probes; zero runtime errors; artifact SHA-256 6abad56759caa47868dee8af5e82068c143f810336454099ba9c149dc74e8f09. Verified independent gold count 0 and accuracy null.
- Remaining TODO/BLOCKED: independent IPA gold corpus, tone-aware validation, lexical/context coverage, and source adjudication of candidate outputs. Do not add Epitran as a runtime dependency or call these six probes an accuracy benchmark.
- Readiness: engineering prototype verified; not empirically accuracy-certified or release-ready as a complete transcription engine.

## Authoritative current-head checkpoint — 2026-10-25

This checkpoint supersedes older baseline SHAs and statements that the current-head smoke/CI were still pending.

- Current `main`: `32f6f3da9328aa96e746d63b63912c4e64793646`.
- Current-main tests [40128844973](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40128844973): `success`; Pages deployment [40128844976](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40128844976): `success`; optional Epitran smoke [40128845097](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40128845097): `success`.
- PR #22's documentation correction is merged. The earlier stale instruction to run Epitran has been replaced with observed smoke evidence.
- Epitran remains a raw-output comparator only: six structural probes, zero runtime errors, no adjudicated gold, and no accuracy estimate. No production dependency or external corpus was added.
- Engineering workflow is DONE_VERIFIED for the recorded current head. Phonological coverage, Python/browser engine parity, independent source-adjudicated gold, tone-aware evaluation and license-owner decisions remain PARTIAL/BLOCKED as recorded above. The repository is not an accuracy-certified general-purpose transcription engine.

## Latest verified smoke evidence — 2026-10-25

- Current-main smoke [40134067758](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40134067758) and artifact [12576415800](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40134067758/artifacts/12576415800) were inspected. ZIP SHA-256: `6ff7fd5d70f386d76eefb37d50d2718d9de3f4e410749cf94848af9afeab788c`; 6/6 outputs, 0 runtime errors, Epitran 1.35.3 / Python 3.12.15.
- All six corpus rows remain STRUCTURAL_ONLY, so verified gold count is 0 and accuracy null. Raw-output execution is DONE_VERIFIED; phonological accuracy remains BLOCKED by missing source-located independent adjudication.
- PR #24 narrowed automatic smoke triggers to executable input/source/script/workflow changes; evidence-only registry/doc updates no longer trigger another optional run.


## Empty-input API contract — 2026-10-25

- Found a top-level API bug: `parse_burmese("")` previously returned `status="ok"` because Python's `all([])` is true, even though no syllable was analyzed.
- Empty and whitespace-only input now return `status="empty_input"`, preserving normalized input but producing no graphemes/syllables.
- This is an API status correction, not a pronunciation rule. Exact-head CI must pass Python tests, schema checks, build and browser tests.


## Evidence-registry schema checkpoint — 2026-10-25

- PR [#39](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/39) merged as `8a2482535c463a9371f7c0c6ac32c15880b7485c`.
- Added explicit JSON Schemas for source registry records and phonological rule records; expanded the existing claim schema to match the canonical `source_claims.csv` fields (`evidence_type` and `scope` included).
- The test now validates every canonical source, claim and implemented rule row, unique identifiers, and referential integrity from source → claim → rule. The test-first checkpoint failed for the intended missing-schema reason in [40222025229](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222025229); final exact-head verification passed in [40222099466](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222099466) and [40222096239](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222096239).
- This closes a provenance validation gap, not a phonological one. The six corpus rows remain structural-only; independent lexical IPA gold count is still 0. Next acceptance criterion: add a schema and integrity checks for `phonology_corpus.csv`, with explicit allowed evidence statuses and a rule that structural-only rows cannot carry gold IPA or Ukrainian output.


## Corpus evidence-schema checkpoint — 2026-10-25

- PR [#41](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/41) merged as `3c8f03957fb3d8b8201bafac0dcdc819f50b8fe1`.
- Added `schemas/phonology_corpus.schema.json` and validates every row of `data/burmese/phonology_corpus.csv`. The schema constrains evidence statuses and enforces that `STRUCTURAL_ONLY` records have empty IPA/Ukrainian gold fields; `GOLD_VERIFIED` records require IPA convention, scope, analysis level, reviewer and uncertainty metadata. Tests also check unique case IDs, source references and non-pending locators for gold rows.
- Exact-head full workflow [40222516985](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222516985) passed pytest, npm build, generated-data checks, Node tests and Playwright browser tests.
- All six existing rows remain `STRUCTURAL_ONLY`; the new schema deliberately does not promote them to phonological gold. Independent lexical IPA gold count remains 0 and accuracy remains unmeasured.


## Unicode corpus locator checkpoint — 2026-10-25

- PR [#43](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/43) merged as `0c793b76f45261c9d9044e0eac01245a8afef54f`.
- Updated the U18 source registry title/scope and replaced the three stale locator placeholders with exact `Unicode 18.0.0 Chapter 16 §16.3.1, Table 16-4` references for `ကေ`, `ကော်`, and `ယူ`.
- These rows remain `STRUCTURAL_ONLY`; expected IPA and Ukrainian fields remain empty. The Unicode chapter's example `ကော် /kaw/` is cited as a locator, not copied as gold.
- Exact-head full CI [40223402689](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223402689) passed all tests, generated-data checks, Node and browser tests. Optional Epitran raw-output comparison [40223406632](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223406632) completed successfully but is not an accuracy benchmark.
- Green 2002 rows remain source-locator-pending; independent lexical IPA gold remains 0.


## Evidence update — 2026-10-25

The misplaced-virama guard now has an explicit source → claim → rule → test link through `CLM-ORTH-001` / `MALFORMED_VIRAMA_WITHHOLD_IPA`. Unicode establishes script/syllable structure, not the pronunciation of malformed input. The implementation continues to return invalid status and withhold IPA.


## Shared Ukrainian target adaptation — 2026-10-30

| Task | Status | Evidence / acceptance |
|---|---|---|
| Preserve Burmese aspirated IPA in Ukrainian practical output | DONE_VERIFIED | /kʰ tʰ pʰ sʰ/ → к' т' п' с'; /tɕʰ/ → ч'. Source IPA remains unchanged. |
| Distinguish /h/, /ɡ/ and /x/ | DONE_VERIFIED | /h/ → г, /ɡ/ → ґ, genuine /x/ → х in the canonical practical registry and rules. |
| Preserve affricate identity | DONE_VERIFIED | /tɕ/ → ч, /dʑ/ → дж; no grapheme-based inference. |
| Preserve /ʔ/ as distinct from aspiration | DONE_VERIFIED | /ʔ/ remains ∅ in practical output and never receives the aspiration apostrophe. |
| Keep the dental-fricative candidate evidence-gated | DONE_VERIFIED | The existing grouped /θ~ð/ → т candidate is restored as ANALYSIS_DEPENDENT with its comparator provenance; no claim of exact phonetic identity. |

Exact PR-head workflow [41075332863](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41075332863) passed pytest, generated-web-data drift, production build, Node tests and Playwright browser tests. PR #49 remains draft; existing PR #48 was left untouched. Branch head: `e43c4e0121d9f29bc942e5f470d795c114c2085e`.

These are owner-approved Ukrainian target-policy decisions, not external linguistic sources or a normative Ukrainian standard. The change does not add Burmese phonological gold. Independent adjudicated lexical IPA gold remains 0; accuracy remains unmeasured. Remaining TODO/BLOCKED work on full Burmese tone/register/phonation, coda/vowel coverage and independent lexical validation is unchanged.


## Romanization profile and crosswalk decision — 2026-10-31

| Task | Status | Evidence / acceptance |
|---|---|---|
| Select orthographic Burmese romanization profile | DONE_VERIFIED (source review) | MLCTS is explicitly described by Mya2Rom upstream as an orthographic transcription system created by the Myanmar Language Commission; modified MLCTS / MLCTS2 is more phonetic. |
| Align browser romanization mode with selected MLCTS profile | TODO | Change mya2rom(..., "mlcts2") to "mlcts", update UI label and exact-output browser regression; run full exact-head CI and Pages checks. |
| Build MLCTS → Ukrainian syllable crosswalk | PARTIAL | Onset + 94 vendor-rime target rows are populated and tested on the task branch; complete source-verified Myanmar structures and a runtime syllable adapter remain open. Do not reuse IPA mapper. |
| Ukrainian target matrix coverage | DONE_VERIFIED | Exact-head test run [43221074232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221074232) passed: 187 Python tests + 66 subtests, 54 Node tests, build, generated-data freshness and built-site Playwright. 35 onset + 94 vendor-rime target rows are populated; source inventory remains EVIDENCE_LIMITED. |
| Complete MLCTS correspondence inventory | PARTIAL | Cover consonants, medials, vowels, codas, independent vowels, kinzi, asat, numerals and punctuation with source locators and explicit unsupported states. |
| Audit Mya2Rom provenance and redistribution | PARTIAL | Preserve CC-BY-SA-4.0 notices; verify each copied code/data component and upstream-derived table source. |

This is a method-selection and research-matrix update only. It does not add IPA gold or claim phonological accuracy. Current independent adjudicated lexical IPA gold count remains 0.


## Production Pages artifact gate — 2026-10-31

| Task | Status | Evidence / acceptance |
|---|---|---|
| Copy Mya2Rom browser assets into Vite public output | DONE_VERIFIED (PR candidate) | scripts/copy-vendor-assets.mjs copies romanisations.js and mya2rom.js; artifact test verifies both files in dist |
| Include methodology page in production build | DONE_VERIFIED (PR candidate) | Vite multi-page input includes index.html and system.html; artifact test verifies dist/system.html |
| Test browser behavior against production artifact | DONE_VERIFIED (PR candidate) | Playwright preview server uses vite preview; browser asserts window.mya2rom exists and methodology navigation works |
| Post-merge GitHub Pages deployment | DONE_VERIFIED | Main commit fff943db823ae5ca0f4fed50b572cc75cb743f84 deployed successfully by workflow 41231199596 to https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ |

Test-first RED: [41230779647](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230779647) failed because the production artifact omitted system.html. Exact-head GREEN: [41230976020](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230976020) passed: pytest 63 + 29 subtests; Node 3/3; Playwright 48.




## Final main / Pages checkpoint — 2026-10-31

- Final main commit: fff943db823ae5ca0f4fed50b572cc75cb743f84.
- PR #54: MLCTS profile and onset matrix; PR #55: two separate method tabs; PR #56: production asset copy, multi-page build and preview-based browser tests.
- PR #48 was closed as superseded by #56; its old branch was left intact. PR #53 styling work remains open and untouched.
- Main verification [41231199684](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41231199684) passed: pytest 63 + 29 subtests; Node 3/3; Playwright 48 against the built artifact.
- Pages deployment [41231199596](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41231199596) succeeded: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ .
- Final statuses: MYA-ROM-PROFILE-001 DONE_VERIFIED; MYA-ROM-MATRIX-ONSET-001 DONE_VERIFIED; MYA-ROM-MATRIX-001 PARTIAL; MYA-ROM-UA-001 TODO; MYA-PAGES-ARTIFACT-001 DONE_VERIFIED; MYA-PHONETIC-COVERAGE PARTIAL/BLOCKED pending independent lexical gold and expert adjudication.
- The romanization tab's Ukrainian result is intentionally PARTIAL. Do not claim full romanization coverage until a complete source → MLCTS → Ukrainian syllable matrix and adapter pass exact coverage tests.


## Browser output integrity and full-sentence regression — 2026-10-31

| Task | Status | Evidence |
|---|---|---|
| Preserve unresolved/unsupported Burmese source units in Ukrainian browser output | DONE_VERIFIED | PR [#64](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/64) merged as `d0b7f6351a4151b974ec9ee379f81f7a06da9613`; unresolved units now render as `⟦source⟧` rather than disappearing or exposing incomplete per-syllable mappings |
| Preserve supported contextual initial /j/ + vowel rendering | DONE_VERIFIED | Existing `/juː/ → ю` browser regression remains green after correcting status aggregation for the contextual target |
| Full user-supplied Burmese greeting sentence source reconstruction | DONE_VERIFIED | Playwright reconstructs the normalized sentence from rendered source-unit rows and asserts exact equality; unresolved Ukrainian units remain explicitly marked |
| Full Burmese phonetic/target accuracy for the sentence | BLOCKED / EVIDENCE_LIMITED | No independent lexical IPA gold and no complete Ukrainian mapping inventory; do not infer missing pronunciations or spellings to force a full output |

Exact final PR-head workflow [41238825573](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238825573) passed: pytest 64 + 29 subtests, Node 4/4, Vite build, generated-data drift check, and Playwright 50/50 against the built artifact. The Pages workflow [41238926334](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238926334) completed successfully and deployed merged main `d0b7f6351a4151b974ec9ee379f81f7a06da9613` to https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/. Main verification [41238926148](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238926148) also completed successfully.


## Mixed-text and unsupported-source preservation — 2026-10-31

| Task | Status | Evidence / acceptance |
|---|---|---|
| Python parser exact source reconstruction for mixed sentences | DONE_VERIFIED (PR-head evidence) | PR #74 merged as `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`; exact-head workflow [41244535813](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41244535813) passed all configured Python, Node, build, generated-data and Playwright steps. Tests cover Latin text, ASCII digits, Burmese digits, Myanmar punctuation and exact source-unit reconstruction. |
| Python withholding for unsupported Myanmar Extended-A adjacent to a valid syllable | DONE_VERIFIED (bounded parser behavior) | Regression asserts the complete raw cluster is preserved and status is `partially_unparsed`; no unsupported unit is silently dropped or promoted to IPA. |
| Exact post-merge main verification and Pages deployment | IN_PROGRESS / BLOCKED pending CI | Main SHA `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`; runs [41245969998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969998) and [41245969938](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969938) were queued at checkpoint time. Acceptance: both exact-SHA workflows complete successfully; Pages smoke test confirms deployed runtime assets. |

These are source-integrity regressions, not evidence of Burmese IPA accuracy, full Unicode coverage, or completion of the MLCTS → Ukrainian adapter. Independent lexical IPA gold remains 0.


## Post-merge CI evidence correction — 2026-10-31

- PR #74's post-merge main tests [41245969998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969998) and Pages deployment [41245969938](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969938) completed successfully on `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`; deployed-site/runtime smoke test passed. This supersedes the earlier queued status in the preceding checkpoint.
- The subsequent documentation-only PR #75 merged as `48bb45cf2a5c6cc95057fecacdfbc6e852b760b1`; exact PR-head tests [41246079334](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246079334) passed. Its post-merge exact-main tests [41246294703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294703) and Pages [41246294821](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294821) were still running at this checkpoint.


## Final main verification correction — 2026-10-31

- Exact-main tests [41246294703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294703) and Pages [41246294821](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294821) completed successfully on `48bb45cf2a5c6cc95057fecacdfbc6e852b760b1`. The earlier in-progress note above is superseded; deployed-site/runtime smoke test passed.
- Follow-up documentation PR-head verification remains required before merge.


## External G2P candidate register update — 2026-11-01

| Candidate | Status | Evidence / acceptance |
|---|---|---|
| Goruut | PARTIAL — upstream advertised support only | Pinned source commit `b224bde02151f8f86d0fe260804e4ca743bda620`; README lists Burmese and an IPA phone set. No syllable tokens or tie bars; numbers/dates unsupported. MIT source-code license verified, embedded asset licenses not yet audited. Run in isolated optional CI and retain raw output before considering further use. |
| Epitran 1.35.3 | DONE_VERIFIED as raw-output smoke only | Existing six structural probes and resource hashes remain diagnostic; documented limited Burmese support; independent gold remains 0. |
| myG2P | BLOCKED for commercial redistribution absent rights decision | Upstream license is CC BY-NC-SA 4.0; do not vendor into the commercial runtime absent permission/legal review. |

No accuracy score or engine winner is available. Promotion requires independent expert-adjudicated IPA and a separate license/provenance audit for all model and dictionary assets.


## 2026-11-01 exact-head runtime update — Goruut

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-GORUUT-RUNTIME-001 | PARTIAL | PR #82 exact head `d8b065bc66dce5fdd9959c4f0eb932a29acaedba`; [runtime workflow 41310771082](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41310771082); artifact ZIP SHA-256 `0eb19d7079de818736ecff095f700405fc4b46de3791dd6e4fd68762346218fa` | Pinned Go build succeeds; 7/8 usable Goruut outputs, 6 stable and 1 unstable; punctuation probe has no output. Epitran 1.35.3 returns 6/6; raw exact match 0/6. Accuracy remains null, independent gold=0. |
| MYA-GORUUT-ASSET-WARNING-001 | BLOCKED | Runtime server log in artifact; `weights9.bin.zlib` missing while pinned tree has `weights8.bin.zlib` | Diagnose upstream loader/asset path and determine whether it affects output; no causal claim yet. |
| MYA-PHONETIC-GOLD-001 | BLOCKED / TEXT-ONLY EXPERT REVIEW | Current source and phonology audits | Create independently reviewed IPA examples from written dictionaries, lexical entries and published phonological descriptions, with source locators and a versioned broad/narrow convention. |

The exact-head results supersede earlier one-shot claims of full stability: `ကြည်` varied between `tɕì` and `tɕɪ̀ɴ` across repeated requests. No external engine is selected as production provider.


### Goruut nondeterminism root cause and report contract

Pinned upstream `SelectE` counts multiple dictionary pronunciations and, when no homograph-model preferred entry is selected, falls through to a random dictionary pronunciation. The upstream source comment names this behavior; the response counters `RandomizationWordsCount` / `RandomizationWordsChoices` are populated by the sentence use case. Exact sources: [selector](https://github.com/neurlang/goruut/blob/b224bde02151f8f86d0fe260804e4ca743bda620/repo/services/parts_of_speech_selector_service.go#L168-L205), [counter propagation](https://github.com/neurlang/goruut/blob/b224bde02151f8f86d0fe260804e4ca743bda620/usecases/phonemize_usecase.go#L84-L85).

The latest Burmese artifact shows the only unstable input `ကြည်` carried these counters on all three repetitions (1 ambiguous word, 2 choices); the other seven inputs had no ambiguity metadata. The optional benchmark script now parses and aggregates those counters as randomized input/repetition counts while leaving accuracy null. This is an ambiguity signal, not a claim that all homographs are incorrect. The missing `weights9.bin.zlib` warning is separate and its causal relationship remains unproven.


### Source-coverage gate update — 2026-11-01

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-GORUUT-SOURCE-COVERAGE-001 | PARTIAL | Exact-head artifact 13085043436; raw-output re-analysis | 7/8 Goruut outputs passed source-field reconstruction and punctuation-field letter checks; one punctuation sentence returned no output. Eight probes do not establish broad coverage. |
| MYA-GORUUT-RANDOMIZATION-REPORT-001 | PARTIAL | Pinned upstream selector source; test-first assertions added | Harness parses RandomizationWordsCount/Choices and has coverage tests. Exact-head CI for the new parser is pending. |

The source-coverage contract reconstructs the input from PrePunct + CleanWord + PostPunct after NFC/whitespace removal and flags letters, combining marks or numbers left in PrePunct/PostPunct. This is a coverage check, not phonetic accuracy. The new implementation must pass CI before the task can be marked DONE_VERIFIED.


### myG2P v2.0 100-row comparison — PARTIAL, CI pending

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-MYG2P-PARSER-001 | PARTIAL | `scripts/prepare_myg2p_probe.py`; `tests/test_prepare_myg2p_probe.py` | Parses pinned five-column dictionary, tracks malformed/missing/duplicate rows, creates deterministic 100 unique source-located rows, and labels them SOURCE_ATTESTED_NOT_GOLD. Exact-head test CI pending. |
| MYA-MYG2P-COMPARISON-001 | PARTIAL | Optional Goruut workflow now checks out myG2P commit `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`; same 100 rows go to Goruut (3 repeats) and Epitran 1.35.3 | Await exact-head runtime artifact. Report raw outputs, coverage, randomization and source-attested concordance only; accuracy must remain null and independent gold=0. |

The user explicitly authorized temporary test-only use regardless of upstream license review. The dictionary is not committed to this repository or bundled into product runtime. Per-entry IPA is source-attested, not independently adjudicated gold.


### Repeat-run reconciliation — 2026-11-01

The first independent 8-probe run (artifact 13085043436) showed one unstable output for `ကြည်`; the later run [41312361052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41312361052) showed the same word stable across three repeats but retained `RandomizationWordsCount=1` and `RandomizationWordsChoices=2` in every response. Thus a stable three-sample result does not remove the upstream ambiguity: random choice may happen to repeat the same candidate. The later run classified 7/8 as complete source coverage and one punctuation sentence as no output. The source-coverage and randomization gates must both pass before any source-attested comparison; no gold/accuracy claim.


### Final myG2P / Goruut exact-head verification — 2026-11-01

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-MYG2P-PARSER-001 | DONE_VERIFIED | PR #82 head `dcd9dfb6f1306ce01547f922238aba3fdefd6586`; tests workflow [41313487752](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487752) PASS; `scripts/prepare_myg2p_probe.py`; parser tests | 24,802 physical lines; 24,009 unique IPA entries; 793 duplicate headwords skipped; 0 malformed and 0 missing-IPA rows. Deterministic 100-row source-located probe generated; not gold. |
| MYA-MYG2P-COMPARISON-001 | DONE_VERIFIED | Runtime [41313487703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487703) PASS; artifact [13086900774](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487703/artifacts/13086900774), SHA-256 `ca165ac84ee6b284a423a988a5ee32d951a883c36073b01fd5f086ba83022f77` | Goruut 98/100 outputs; 43 complete / 55 partial / 2 unknown; 98 stable; 0 randomized; 69 unphonemized fragments; strict source concordance 0/100 and limited notation diagnostic 17/100. Epitran 1.35.3 raw output captured. Accuracy=null, independent gold=0. |

**Evidence boundary:** myG2P declares CC BY-NC-SA 4.0 and remains temporary test-only input under explicit owner authorization. It is not copied into product data or runtime. Source labels are not independently adjudicated gold; neither raw engine agreement nor dictionary concordance establishes accuracy. The 8-case engineering probe separately had 7/8 outputs, 7 complete, 1 unstable/randomized and 1 no-output. Production promotion remains blocked pending qualified expert IPA gold and dialect/profile adjudication.


### Final exact-head evidence correction — 2026-11-01

The final PR #82 runtime [41324681722](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41324681722), artifact [13090128004](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41324681722/artifacts/13090128004), supersedes the previous 8-case wording: 7/8 outputs, 7/7 complete and stable, 1/8 carried upstream dictionary-randomization metadata despite identical output across the three sampled repeats, 1/8 no output. The 100-row myG2P comparison remains 98 outputs, 43 complete / 55 partial / 2 unknown, 98 stable, no randomization metadata, 69 unphonemized fragments, 0 strict and 17 limited-notation source-label matches. These are not accuracy; independent gold=0. The downloaded archive SHA-256 matches the GitHub digest.


### Session closeout — PR #82 merged, 2026-11-01

- PR #82 merged into `main` as `e9c83322f304a670dd25e121dcc5b60e1cf3a896`.
- Post-merge pytest, npm build, generated-data validation, Node tests and Playwright built-browser suite: [41326238767](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41326238767) PASS. Pages build/deploy and deployed-site/runtime smoke test: [41326238774](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41326238774) PASS.
- MYA-MYG2P-PARSER-001 and MYA-MYG2P-COMPARISON-001 remain DONE_VERIFIED as temporary research tooling, not production phonology. The 100-row diagnostic is 98/100 outputs, 43 complete / 55 partial / 2 unknown, 98 stable, 0 randomization metadata, 69 unphonemized fragments, 0 strict / 17 limited-notation matches. Source labels remain not-gold; independent gold=0, accuracy=null.
- Remaining blocker: qualified expert-adjudicated, dialect-scoped Burmese IPA gold and review of the partial-coverage cases. No model/data redistribution is authorized by test-only use.


## Current status override — 2026-11-01

This current-head reconciliation supersedes older status cells above where they conflict; the dated historical checkpoints remain intact.

| Workstream | Current status | Acceptance / blocker |
|---|---|---|
| Independent lexical IPA gold | BLOCKED | data/benchmark/gold.tsv is header-only; independent gold=0 and accuracy=null. Requires source-located written IPA/phonological evidence, a defined target variety, two independent text-based reviewers and adjudication. No audio. |
| Consonant, kinzi and medial phonology | PARTIAL | Structural parsing exists; source-backed contextual phonological coverage and a differential corpus remain incomplete. |
| Vowel combinations and coda realization | PARTIAL | Full vowel derivation, checked-syllable and contextual coda realization are not implemented. |
| Tone/register/phonation | TODO | Specialist adjudication of competing analyses and scoped implementation are required; do not infer or collapse them. |
| IPA → Ukrainian | PARTIAL | Canonical external inventory boundary exists; target policies remain proposal-level and need expert review. |
| MLCTS → Ukrainian | PARTIAL | Separate orthographic adapter is integrated for supported onset/rime combinations and y/r/w medials; unsupported forms are visibly withheld. Full acceptance requires primary MLC source verification and coverage of kinzi/asat/devoicing/independent-vowel structures. |
| Goruut/myG2P/Epitran harness | DONE_VERIFIED (diagnostic only) | Parser, comparison and runtime artifacts verified; 55/100 Goruut outputs partial; myG2P remains temporary test-only under CC BY-NC-SA 4.0. No accuracy or production claim. |
| Python/browser phonological parity | TODO | Existing source-preservation parity does not establish phonological result parity; add shared expert-backed phonology fixtures. |
| Manual UI/accessibility QA | TODO | Deployed visual, keyboard, screen-reader and mobile QA not evidenced by CI. |
| Release readiness | PARTIAL | Blocked by gold, phonological coverage, primary-source and asset-rights gates. |


## Independent IPA gold corpus status — 2026-11-01

| Task | Status | Acceptance / blocker |
|---|---|---|
| IPA-GOLD-SCHEMA-001 | DONE_VERIFIED | Four JSON Schemas, empty JSONL templates and cross-file validator |
| IPA-GOLD-DOUBLE-ANNOTATION-001 | PARTIAL | Enforces two distinct annotators and third adjudicator; blind human collection remains external |
| IPA-GOLD-ADJUDICATION-001 | PARTIAL | Agreement/resolved/unresolved semantics verified; no real adjudicated examples |
| IPA-GOLD-SPLIT-001 | DONE_VERIFIED | Deterministic frozen lexeme-group splits and regression tests |
| IPA-GOLD-EXPORT-001 | DONE_VERIFIED | Rights-filtered export to existing benchmark contract; current output header-only |
| IPA-TYPED-BENCHMARK-001 | DONE_VERIFIED | IPA kind mismatch is not scored as exact match |
| IPA-GOLD-RELEASE-GATE-001 | PARTIAL | Tag/manual gate requires 100/25/25 gold; repository ruleset/release procedure must require it |
| BURMESE-ORTHO-KINZI-MEDIAL-001 | PARTIAL | Unicode structure documented; complete mapping and adversarial coverage open |
| BURMESE-VOWEL-CODA-001 | PARTIAL | Sonority/coda-conditioned vowel model needs expert-backed matrix |
| BURMESE-TONE-PHONATION-001 | TODO | Tone vs phonation vs segmental glottal closure requires specialist adjudication |
| BURMESE-PYTHON-BROWSER-PHONOLOGY-PARITY-001 | TODO | Requires shared expert-backed IPA fixtures |

**Gold status:** 0 independent adjudicated records; `gold.tsv` header-only; accuracy=null. The new workpack is a research specification, not completed phonological coverage.


Additional current controls:
- `IPA-GOLD-RIGHTS-001` — DONE_VERIFIED (mechanism): allowlisted license registry, required per-record rights evidence and non-redistributable license rejection. Source-by-source legal review remains required.
- `IPA-GOLD-PROVENANCE-EXPORT-001` — DONE_VERIFIED: export and benchmark report preserve source ID, license ID and rights-evidence locator.
- `IPA-GOLD-BLIND-INTAKE-001` — BLOCKED: qualified annotators and a controlled blind intake channel are not connected; public Git history cannot enforce blinding.


## CI action runtime modernization — 2026-11-01

| ID | Status | Evidence | Scope / acceptance |
|---|---|---|---|
| BUR-CI-ACTIONS-001 | DONE_VERIFIED | Code commit `a1ef4e13105937cd282e6edd67020a74207f649b`; exact-head [tests 41339669408](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41339669408) and [Epitran diagnostic 41339669397](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41339669397) both SUCCESS | All five workflow files use current Node.js 24-compatible action majors; Python, Node, build, generated-data, and 54 Playwright browser checks passed. No phonological behavior changed. |


## Focused source audit and evidence-gate refinements — 2026-11-03

| Evidence / task | Status | Verified source result | Consequence / acceptance |
|---|---|---|---|
| MYA-ORTHO-SYLLABIFICATION-001 | PARTIAL (external evidence reviewed; not implemented as ClippyFirst G2P) | Hlaing & Mikami (2014), [Automatic syllable segmentation of Myanmar texts using finite state transducer](https://doi.org/10.4038/ICTER.V6I2.7150): rule-based FST; 11,732 orthographic words; 99.93% word-syllabification; consonant-stacking subset 245/253 correct (96.83%); text also discusses a free-standing-vowel error; article count inconsistency 32,238 vs 32,283 syllables. | This is orthographic segmentation, not G2P, phoneme or IPA accuracy. Use only as structural-parser comparator; test kinzi/stacked consonants explicitly. |
| MYA-TONE-VOWEL-ANALYSIS-001 | PARTIAL | Mooney & Repetti-Ludlow (2021), [Sonority and syllable structure: The case of Burmese tone](https://doi.org/10.3765/plsa.v6i1.4900): acoustic experiments from one Yangon speaker; proposes syllable-structure/sonority-conditioned vowel alternations and a competing underlying-tone analysis. | Preserve as competing analysis; do not collapse vowel quality into tone or replace traditional surface categories without qualified review. |
| MYA-CORPUS-SLR80-001 | PARTIAL | Oo et al. (2020), [Burmese Speech Corpus, Finite-State Text Normalization and Pronunciation Grammars with an Application to Text-to-Speech](https://aclanthology.org/2020.lrec-1.777): 2,528 utterances, 20 female Yangon speakers, 22,443 tokens, 9,941 unique words; corpus CC BY-SA 4.0; separate Thrax/WFST G2P grammar. | Orthographic speech corpus, not IPA gold; no public train/dev/test split or speaker-balanced IPA benchmark established. Verify grammar license separately. |
| MYA-PHONETIC-PROFILE-001 | PARTIAL | Watkins (2001), [Burmese](https://doi.org/10.1017/S0025100301002122), JIPA profile from one 30-year-old Yangon male reading slowly; Gruber (2011), [Perceptual Cues to Lexical Tone in Burmese](https://doi.org/10.3765/EXABS.V0I0.557), reports joint pitch/duration/phonation cues. | Use as profile and feature evidence, not multi-speaker population gold. Keep tone, phonation and duration typed and separately testable. |
| MYA-GOLD-AGREEMENT-001 | TODO | Cucchiarini (1996), DOI [10.3109/02699209608985167](https://doi.org/10.3109/02699209608985167); Oller & Ramsdell (2006), DOI [10.1044/1092-4388(2006/100)]. | Pilot reports exact normalized agreement plus alignment-aware feature-weighted agreement, separate tone/duration/phonation/vowel/coda/boundary diagnostics, unresolved alternatives and adjudication rate. Raw percentage agreement supplementary only. |

No lexicon rows, IPA labels, or model predictions were imported. Gold remains 0; accuracy remains null. The detailed source audit is also recorded in the current top-level handoff and linguistic completion register.


## Engineering test-harness status — 2026-11-04

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| IPA corpus test-fixture language identity | Fixture uses Myanmar-script sample, `test-burmese` profile and neutral variety label; shared script-range constants are explicit in the test module | Regression asserts all fixture characters are in the Myanmar Unicode block and profile metadata matches the repository language; exact-main tests [41847895975](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41847895975) SUCCESS | Not applicable; this is test-data integrity, not phonological validation | DONE_VERIFIED | Preserve language-specific fixtures when adding shared corpus tests; do not infer phonological coverage from this check |

This engineering correction does not change the language-layer statuses above. Independent Burmese IPA gold remains 0; accuracy remains null.


## IPA gold release-gate corpus identity — 2026-11-04

| Task | Status | Evidence | Remaining acceptance |
|---|---|---|---|
| BURMESE-IPA-GOLD-PROFILE-GATE-001 | DONE_VERIFIED (engineering guard) | PR #117 merged as `085ce5a2da4a07dfbf606a9892c78a4d3bbb9d91`; exact-head tests [41870132273](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870132273), post-merge tests [41870579420](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579420), and Pages [41870579398](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579398) SUCCESS. Shared validator rejects mixed adjudicated target profiles and mixed IPA kinds; positive regression confirms speaker/audio IDs may vary. | Human approval of Standard Yangon profile/convention, blind double annotation, independent adjudicator, rights-cleared source set, and specialist-reviewed onset × medial × vowel × coda × prosodic coverage remain outstanding. This guard does not create gold or prove accuracy. |

## Deterministic rule engine — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | PR #128 merged as `cd3a1503e79d32b09a6d2d5206340a37cfd3283b`; main tests [43018103155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103155) and Pages smoke [43018103391](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103391) SUCCESS; live site published. | Deterministic engine published. Expert-adjudicated Yangon IPA gold still required for phonetic correctness/accuracy claims. |

## Final deterministic-engine verification — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | Final main head `9bece0a50a367f3f58336d2aba7016ac4af86156`; tests [43019216137](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216137) and Pages + smoke [43019216297](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216297) SUCCESS. | Deterministic runtime published; independent expert-adjudicated Yangon IPA gold remains outstanding. |


## Ukrainian practical transcription — 2026-11-11 continuation

- Python and browser output are both post-IPA adapters; the browser imports the generated correspondence and rule tables rather than maintaining a separate linguistic mapping table.
- The browser adapter uses longest-match for explicit affricates, preserves word spaces, treats syllable dots as boundaries, and applies Ukrainian yotation to /j/ at the start of each IPA syllable.
- The target policy distinguishes /h, ɦ/ → г, /ɡ/ (ASCII /g/) → ґ as a project-specific choice, and /x/ → х. It maps explicit /t͡s, d͡z, t͡ʃ, d͡ʒ/ to ц, дз, ч, дж; /tɕ, dʑ/ are practical approximations. Plain adjacent consonants are not collapsed into affricates.
- Aspiration is marked with a project apostrophe; /ʔ/ is omitted from ordinary practical spelling but remains in IPA/trace. Tone and length are retained analytically, not converted to Ukrainian stress or vowel doubling.
- Unknown IPA withholds the complete Ukrainian string. Burmese parser structures not yet supported by phonological rules (medials, conjuncts, kinzi) are withheld in both Python and browser paths.
- PR #133 is the active practical-system PR; PR #132 was superseded after its browser test exposed fail-open handling. The exact-head test run [43095497303](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43095497303) is queued. No independent adjudicated lexical IPA gold set exists; empirical accuracy remains unmeasured.


## 2026-11-11 — Ukrainian practical adapter task update

| Task | Status | Evidence / acceptance |
|---|---|---|
| Add Python whole-IPA → Ukrainian adapter and integrate after deterministic IPA | DONE_VERIFIED | `src/burmese_ukrainian/practical.py`, `rule_engine.py`; previous Python suite 180 + 66 subtests |
| Generate browser mapping from canonical practical CSV/rule data | DONE_VERIFIED | `src/web/ukrainian-adapter.js`; previous build, generated-data freshness and Node tests passed |
| Map /h, ɦ/ → г, /ɡ/ → ґ (project choice), /x/ → х, /w/ → в, syllable-initial /j/ yotation, affricates → ц/дз/ч/дж | DONE_VERIFIED | Canonical practical table and tests; /ɡ/ → ґ is not claimed as universal orthographic norm |
| Preserve tone/length in IPA trace; join syllable-level Ukrainian output into one word | DONE_VERIFIED | Python engine output and regression tests |
| Browser fail-closed behavior for kinzi/medials/conjuncts | PARTIAL — CROSS-RUNTIME PARITY OPEN | Browser all-medials guard remains; Python adapter now explicitly withholds medials/conjunct/kinzi. Exact-head CI 43582496619 passed 58 Playwright tests. | Shared structured fixtures and Python/browser parity remain TODO; no browser IPA rule promotion. |
| Final browser/Playwright acceptance | DONE_VERIFIED — CI ONLY | Exact-head CI 43582496619 on SHA `fd27f481470b5f6a08648cf0dcc25ab8b4a8ecf5` passed 58 built-site Playwright tests, build and generated-data checks. | Manual visual, keyboard, screen-reader and mobile accessibility QA remains TODO; CI is not a substitute. |
| Independent empirical IPA/Ukrainian accuracy evaluation | BLOCKED | No independent text gold set yet; requires source provenance, dialect scope and adjudication |
| Audio validation | DEFERRED | Outside user-requested text-only scope |


### Exact-head verification refresh — 2026-11-11

- PR #133 is the authoritative continuation branch; its live head is recorded in GitHub PR metadata. The practical adapter code remains at `e9bd12819ed692d7be2607356008217de9430dca`; subsequent commits are documentation-only.
- Exact-head workflow [43095883419](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43095883419) is queued with no jobs started. Final browser/Playwright verification is therefore still PARTIAL/BLOCKED pending the run.
- No audio is required for this task. The remaining accuracy blocker is an independently sourced, text-only Yangon IPA/Ukrainian adjudication set; without it, accuracy remains unmeasured.


### Provisional onset fallback continuation — 2026-11-11

| Task | Status | Evidence / blocker |
|---|---|---|
| Python onset-only fallback for unresolved syllables | PARTIAL | RuleBasedBurmeseEngine now exposes separate provisional IPA/Ukrainian preview and trace; canonical fields remain withheld |
| Browser onset-only fallback | PARTIAL | Browser parser reuses onset IPA and target adapter; unresolved remainder receives ? |
| Python/browser parity | TODO | Add shared fixture with exact matching status, IPA hint, Ukrainian rendering and trace |
| Exact-head CI / Chromium | DONE_VERIFIED — CURRENT TEST-BEARING HEAD | Required CI 43582496619 SUCCESS on `fd27f481470b5f6a08648cf0dcc25ab8b4a8ecf5`: 267 Python tests + 68 subtests, 20 Node tests, 58 Playwright tests; production build, generated-data freshness and Chromium install passed. | IPA gold validator still reports `NOT_READY_NO_ADJUDICATED_GOLD`; one high-severity npm vulnerability remains. |
| Complete Yangon positional fallback registry | TODO | Evidence-gated; onset-only partial coverage is not a full grapheme fallback |


### Verification result — provisional onset preview, 2026-11-11

| Task | Status | Evidence / blocker |
|---|---|---|
| Python onset-only preview for isolated bare consonants | DONE_VERIFIED (engineering behavior) | Head aac1d6834b4c29e04f01477af1583a2be9eba485; 182 tests + 66 subtests passed |
| Browser preview in analysis details; canonical output unchanged | DONE_VERIFIED (engineering behavior) | Playwright 54/54; same workflow 43101914347 |
| Build, generated data and Node tests | DONE_VERIFIED | Workflow 43101914347 all pass |
| Optional Epitran raw-output comparator | DONE_VERIFIED (comparator only) | Workflow 43101914423 pass; not accuracy evidence |
| Functional Python/browser shared fixture | TODO | Still needs matching structured fallback output and trace across runtimes |
| Full positional Myanmar fallback inventory | BLOCKED by evidence | Requires exact Yangon-profile positional IPA sources for vowels, codas/asat, medials, kinzi, conjuncts and tone |


### Complete Myanmar grapheme accounting — 2026-11-12

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Unicode L/M input accounting across Myanmar blocks | Parser preserves each assigned letter/combining mark in U+1000–109F, U+A9E0–A9FF, U+AA60–AA7F, U+116D0–116FF; exact U+ code points retained in records | Exhaustive Python sweep added in PR #134; exact-head test workflow [43184645239](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43184645239) PASS | Not phonological evidence; no pronunciation gold inferred | DONE_VERIFIED (structural accounting only) | Keep unsupported Myanmar-language extensions explicit; build source-backed Yangon positional IPA inventory before expanding phonology |
| Complete Yangon-profile pronunciation/IPA for all letters and contexts | Only narrow onset/rime rules plus isolated bare-consonant provisional preview; context-dependent medials, vowels, codas, kinzi, conjuncts and tone remain unresolved | Existing parser/withholding tests plus the new exhaustive source-accounting sweep | Independent adjudicated Yangon-profile gold remains 0 | PARTIAL / BLOCKED | Require source-located onset × medial × vowel × coda × prosody evidence, shared Python/browser fixtures, independent annotation/adjudication and held-out accuracy evaluation |


### Burmese onset registry parity — 2026-11-12

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Provisional onset hint registry completeness | Python map now includes U+1009 `ဉ → ɲ`, matching the existing analysis-dependent CSV/browser registry | Exact-head workflow [43185426033](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43185426033) PASS: Python, generated-data freshness, Node and built Chromium | Not independent gold; this is registry parity only | DONE_VERIFIED for U+1009 hint | Add a shared structured Python/browser fixture for every provisional onset candidate |
| `ရ` candidate IPA parity | CSV/browser registry uses `r`; Python candidate map uses `ɹ`; both are analysis-dependent | Difference identified by source-table/code comparison; no adjudicating test should encode either as truth yet | None | PARTIAL / EVIDENCE-LIMITED | Resolve with source-located Yangon-profile phonetic evidence and record an explicit broad/narrow IPA policy before aligning |


## MLCTS → Ukrainian target matrix — 2026-11-12

- Branch `feat/burmese-romanization-ukrainian-matrix-completion-2026-11-12` adds explicit Ukrainian target candidates to all 35 onset rows and all 94 vendor-derived rime rows.
- `MYA-ROM-UA-TARGET-001` is DONE_VERIFIED on exact-head test run [43221074232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221074232); the target mapping is a project orthographic convention. `MYA-ROM-UA-001` remains TODO because no runtime syllable adapter consumes the MLCTS string yet.
- `MYA-ROM-MATRIX-001` remains PARTIAL: the 94-rime source inventory is Mya2Rom-derived and not individually verified against the original MLC publication; medials, kinzi, asat, independent vowels, numerals, punctuation and legal syllable coverage are still incomplete.


## Post-merge mainline verification — MLCTS Ukrainian target matrix — 2026-11-12

- PR #138 merged as `1d7045d9695d571017633a2e294b718a13ee5bce`.
- Mainline test [43221871111](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221871111) and Pages deployment [43221870932](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221870932) passed.
- `MYA-ROM-UA-TARGET-001` remains DONE_VERIFIED; the runtime adapter and full source orthographic inventory remain open as separately classified above.


## MLCTS romanization → Ukrainian runtime adapter — 2026-11-12

| ID | Status | Evidence / blocker |
|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | Existing 35 onset and 94 vendor-derived rime target rows are populated. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 adds the runtime adapter and UI. Exact-head tests [43226578745](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226578745) and push [43226566617](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226566617) pass: 187 Python tests + 66 subtests, 18 Node tests, 55 Playwright tests, build and generated-data freshness. Remaining: all legal syllable structures and primary MLC verification. |
| MYA-ROM-MATRIX-001 | PARTIAL | Runtime supports all current rime rows and onset combinations with supported y/r/w medials; unsupported structures remain visibly bracketed. Full orthographic inventory, kinzi/asat/devoicing and MLC primary-source adjudication remain open. |


Latest final exact-head verification after adding explicit withholding for Myanmar code points outside the romanization support inventory: [tests 43227199213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227199213) SUCCESS on `4a2cb24ae9af2bc5e4d9341de65d0a55e07b6e09`: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness. Unsupported Myanmar code points are now explicitly bracketed in the Ukrainian romanization output.


## MLCTS Ukrainian runtime adapter — mainline post-merge verification — 2026-11-12

- PR [#141](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/141) merged as `3fa33864b774c716da5bf6c9778a963148fb9974`.
- Mainline tests [43227806284](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806284) and Pages deployment [43227806266](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806266) both SUCCESS.
- Mainline test evidence: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness all passed.
- Acceptance remains PARTIAL: current Mya2Rom-derived rime inventory is EVIDENCE_LIMITED, and unrepresented legal syllable structures remain visibly unsupported rather than guessed.


## MLCTS → Ukrainian mainline status refresh — 2026-11-12

The earlier TODO row is superseded by the integrated runtime in PR #141. Current `main` is `718dc4b2c1424651b32bc63b0202f5d08a067bc7`; exact-main tests [43228612973](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612973) and Pages [43228612998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612998) passed. Status is PARTIAL, not DONE: 35 onset and 94 vendor-rime targets are mapped, but the rime inventory is vendor-derived/EVIDENCE_LIMITED and legal structures outside the supported adapter inventory remain withheld. This is orthographic rendering, not IPA validation.


## Browser structural-analysis numbering correction — 2026-11-13

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Whitespace excluded from Myanmar syllable numbering while preserved in source reconstruction | DONE_VERIFIED | PR [#146](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/146), merged as `85dab8bdd08576c1cd112552f68092182bd9a8fa`. Regression for `ကာ မြန်မာ` asserts contiguous Myanmar syllable numbers `01`, `02`, `03`, retained separator, and unchanged fail-closed phonetic output. Exact merged-head test run [43318947338](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43318947338): 187 Python tests + 66 subtests, 19 Node tests, 56 Chromium Playwright tests, build and generated-data freshness all SUCCESS. |
| Yangon IPA coverage for medial-ra/rime in `မြန်` | PARTIAL | Still intentionally withheld: the current positional IPA rule inventory does not establish this combination. No grapheme-only guess was introduced. Acceptance: source-backed positional analysis and independent expert adjudication for the selected Yangon profile, followed by shared Python/browser fixtures. |

The initial regression run [43318664262](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43318664262) exposed an incorrectly escaped whitespace-detection regex; this was corrected before merge. The successful run above is on the final merged code head. Mainline Pages deployment [43319186954](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43319186954) was triggered after merge; deployment status is tracked separately and must not be inferred from the test result.


## Burmese medial and G2P evidence review — 2026-11-13

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Four medial signs as orthographic slots | DONE_VERIFIED as source registry | Unicode 18 Table 16-4 plus WG2 N2827; establishes orthographic identities/order, not IPA values. |
| YA/RA medial phonology | PARTIAL / ANALYSIS_DEPENDENT | Ishida 2026 describes /j/ default and velar-conditioned palatalization; Watkins 2001 describes secondary articulation in phonological /j,w/ clusters. Full onset × rime × prosody inventory and independent Yangon adjudication remain absent. |
| WA medial | PARTIAL / CONTEXT_DEPENDENT | /w/ glide and /ʊ/ vowel/rime alternatives documented; no complete environment table. |
| HA medial | PARTIAL / CONTEXT_DEPENDENT | Aspiration/devoicing and selected /ʃ/ fusion documented; no full onset-class inventory. |
| Multiple medials | PARTIAL | MLC 1986 orthographic inventory of eleven forms reported in WG2 N2827; no complete modern native/loan distribution or IPA gold. |
| Lexical IPA for မြန် | CANDIDATE / NOT GOLD | English Wiktionary lists /mjàɴ/ and a compound contains /mjàɴmà/. This supersedes “no lexical lead found” but does not approve a general rule or runtime output. |
| Shared runtime implementation | TODO | Browser has dormant candidate derivation behind an all-medials guard; Python adapter independently withholds medials/codas. Require shared fixtures and parity before enabling. |
| myG2P dictionary reuse | BLOCKED pending permission for commercial integration | CC BY-NC-SA 4.0; Myanmar README says commercial use is not granted without maintainer permission. |
| Oo et al. Thrax grammar reuse | PARTIAL — CODE LICENSE VERIFIED; DEPENDENCY LOCK OPEN | Google Language Resources repository/grammar declare Apache-2.0; pinned build and six-probe smoke passed in optional workflow 43582075278. | Upstream WORKSPACE dependencies are not all content-address pinned; no in-house LREC speech/segmentation corpus reused; no accuracy claim. |
| Independent Yangon IPA gold | BLOCKED / NOT ESTABLISHED | No controlled speaker recordings, independent annotation or adjudication for target medial combinations. |

Detailed review: docs/research/BURMESE-MEDIALS-AND-G2P-EVIDENCE-REVIEW-2026-11-13.md. Evidence registry: data/burmese/medial_evidence_matrix.csv. Automated traceability: tests/test_medial_evidence_matrix.py.

The previous handoff statement that no word-level pronunciation lead was found for မြန် is superseded: a lexical IPA candidate is now documented. Runtime abstention remains unchanged until the candidate is independently validated and the phonemic-vs-phonetic output contract is fixed.


## Burmese medial/G2P research reconciliation — 2026-11-13 (expanded)

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Eleven MLC medial forms | DONE_VERIFIED as orthographic inventory | Hlaing (2014) Table 5 lists four basic signs plus seven codepoint combinations; WG2 N2827 independently states eleven total. The thesis has a duplicated description typo on the final RA+WA+HA row; codepoints are authoritative. |
| YA/RA and glide onset | PARTIAL / ANALYSIS_DEPENDENT | Green (2002) gives /mj/ onset examples; Ishida 2026 and pinned Google Thrax describe /j/ behavior with onset-specific exceptions. No complete expert-adjudicated grapheme × onset matrix. |
| Nasal coda in မြန် | PARTIAL / CROSS-SOURCE CANDIDATE | Wiktionary /mjàɴ/, Google WFST raw output m j àɴ, and Green's /mj/ plus placeless /N/ model converge. Still no independent text-based expert adjudication; Green treats /N/ as vowel nasalization, not necessarily [ɴ]. |
| Google Thrax source/license | DONE_VERIFIED | Pinned grammar and repository LICENSE both Apache-2.0 at a90601024f07ab7e96c911243324e0adeb16da96. Run 43084508359 build/raw-output smoke succeeded, zero gold; optional comparator only. |
| Hlaing orthographic FST | DONE_VERIFIED as published structural baseline | 11,732 words / 32,283 syllables; initial 99.93% word-level syllabification; not G2P or IPA accuracy. |
| Burmese tone inventory | PARTIAL / COMPETING ANALYSES | Green and Oo et al. (2020) describe four categories; Duan & Zhu (2025) full text (44 pp., CC BY 4.0) proposes eight categories across modal/lower registers. Its sample is five speakers from Yangon, Taunggyi and Mandalay region (not Yangon-only); 89 words / 694 valid tokens; individual T1/T3 variation documented. |
| Open PR #129 | LEFT OPEN / NOT MERGED | Draft hybrid-engine research PR is 53 commits ahead and 17 behind current main, divergent and non-mergeable. Its source-backed Google FST and raw-output evidence were reused in this research report; the broad hybrid implementation was not ported or merged. |

Detailed evidence: docs/research/BURMESE-MEDIALS-AND-G2P-EVIDENCE-REVIEW-2026-11-13.md. New rows: data/burmese/medial_evidence_matrix.csv. Traceability tests: tests/test_medial_evidence_matrix.py.


### Cross-runtime coda segmentation correction — 2026-11-13

- Python previously split an asat-marked final consonant as a new syllable onset. For မြန်, it produced two structural records (မြ + န်), while the browser correctly kept မြန် as one syllable.
- Python segmentation now treats a base consonant followed by U+103A as a coda within the preceding syllable, and the parser records the final consonant and ASAT codepoint explicitly.
- Regression coverage: မြန် is one orthographic syllable; မြန်မာ is two; ကတ် retains final တ+ASAT. Browser tests lock the same visible syllable boundaries.
- Phonetic status is unchanged: medial/coda syllables remain withheld from IPA until source-backed phonological rules and parity fixtures are accepted.


### External raw-engine diagnostics — 2026-11-13

- Epitran 1.35.3 returned məjaɴ for the structural-only probe မြန်, while Google Thrax returned m j àɴ. Both runs had zero gold and null accuracy; the disagreement is unresolved.
- CRFsuite v2 returned 84/100 source-concordant predictions on a 100-row sample of myG2P v2.0. Medial-bearing sample counts: YA 10/14, RA 17/20, WA 13/15, HA 7/8 (overlapping categories). The exact word မြန် was not in the sample; training overlap is possible and the input syllable boundaries were supplied.
- These outputs are diagnostic only, not gold, not accuracy, and not approved runtime rules. The myG2P source dataset remains CC BY-NC-SA 4.0.


## Final exact-head verification — 2026-11-13

- Research branch head before this documentation reconciliation: 5eff1f3d052e775026ffff0fa0b3edd00512224d.
- Required workflow [43325991671](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991671) SUCCESS: independent IPA gold schema validation, Python tests, npm build, generated web-data freshness, Node tests, Chromium/Playwright built-site tests.
- Optional raw-output workflow [43325991496](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991496) SUCCESS: Epitran and CRFsuite diagnostics; artifacts are recorded with SHA-256 in the source registry.
- Exact final CI is engineering/provenance verification only. Gold remains zero and accuracy null.


### Nasal-coda evidence and IPA schema boundary — 2026-11-13

- Added Green-based phonotactic rows for placeless /N/ and nasal-rhyme tone restrictions. These are analysis-dependent source records, not active runtime rules.
- Clarified that the proposed Ukrainian /ɴ/ → нг rule applies only when the selected IPA convention explicitly emits /ɴ/; it must not be used automatically for abstract /N/ or nasalized-vowel realizations.
- The IPA gold schema preserves literal IPA, kind, syllable boundaries, tone, vowel length and phonation, but has no typed nasalization property. Literal IPA remains sufficient for transcription; a structured field is deferred until expert convention approval.


### UCSY-SC1 corpus lead — 2026-11-13

UCSY-SC1 is historical corpus metadata only and excluded from current text-only scope; rights details do not create an active task or blocker.


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
# Burmese phonology execution status matrix

Updated: 2026-11-01
Base branch at start: main (latest visible commit: 81ad16ff252c0e8c59d3e5118b58216e5bad70bf)
Scope: executable status ledger reconciled with the 2026-10-20 phonology and G2P/licensing audits. This is a continuation register, not a claim of full phonological coverage.

## Status vocabulary
- DONE_VERIFIED — implementation and relevant automated verification both exist.
- PARTIAL — some executable behavior exists, but the layer acceptance criteria are incomplete.
- TODO — no sufficient implementation or verification is established.
- BLOCKED — an external decision, dependency, or missing independent evidence prevents defensible completion.
- DEFERRED — explicitly outside this iteration.
- Coverage counts distinguish implemented behavior, regression-tested behavior, and independently validated lexical evidence. Structural tests do not validate phonological analyses.

## Layer-by-layer ledger

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Unicode normalization | Python NFC/NFD/NFKC/NFKD entry points; browser NFC entry point | Python NFC idempotence and one canonical-equivalence pair are tested; browser checks the same pair's normalized analysis; broader compatibility-character policy and corpus coverage remain absent | Not applicable to pronunciation | PARTIAL | Specify the supported normalization contract and expand canonical-equivalence/compatibility tests in both runtimes |
| Myanmar block recognition | Bounded Myanmar/Extended block recognition | Structural fixture tests reported by audit | Not phonological evidence | DONE_VERIFIED (bounded contract only) | Keep block recognition distinct from parser/phonology support |
| Grapheme and syllable segmentation | Conservative Python parser and separate browser parser | Shared Unicode contract covers supported-block vs unsupported-inventory cases; PR #30 fixes empty/whitespace-only input. PR #77 adds Python whole-message reconstruction with unsupported Myanmar Extended-C between valid Burmese units, mixed scripts, numerals, punctuation, CRLF and U+200B. PR #78 adds built-browser parity: source reconstruction under textarea CRLF→LF canonicalization, visible unsupported Myanmar unit and preserved foreign text/numerals. Exact PR-head CI [41289738055](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41289738055) and [41290257958](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41290257958) passed pytest, build, generated-data drift, Node and Playwright browser checks. Annotated differential corpus remains incomplete. | 0 lexical gold entries established | PARTIAL | Expand boundary-annotated cases across combining-mark orders, malformed clusters and all API/service entry points; independently adjudicate phonological examples |
| Consonant/onset inventory | Small Python onset IPA table and graphemic inventory | Existing parser/IPA regression coverage is limited | No independently adjudicated inventory-wide lexical set | PARTIAL | Source-map each onset and test legal/unsupported contexts |
| Kinzi | Explicit structural recognition and role metadata | Structural regression coverage exists; contextual phonological tests incomplete | None established | PARTIAL | Source-located onset/medial/coda-context cases and cross-runtime assertions |
| Medials / complex onsets | Four medial signs parsed; some browser contextual derivation | Partial; full combination gold set absent | None established | PARTIAL | Inventory combinations, competing analyses, environments, counterexamples and paired Python/browser tests |
| Dependent/inherent vowels | Vowel signs parsed; small vowel-ID-to-IPA map | Structural tests exist; derivation coverage incomplete | None established | PARTIAL | Evidence-backed combination table and context/length/quality tests; no extrapolation from unverified patterns |
| Codas / checked syllables | Some final structures parsed; browser rime rules reported | Incomplete | None established | PARTIAL | Enumerate coda/rime classes, mark checked-syllable conditions, test each sourced class |
| Tone | Analysis registries document competing traditional and eight-tone/register analyses; no established runtime realization | Not adequately tested as a phonological layer | 0 tone-labelled gold entries established | TODO | Add scoped, source-located tone examples and separate phonemic category from surface F0 realization |
| Register / phonation | Competing literature descriptions documented | No complete runtime model verified | 0 independently adjudicated register/phonation entries | TODO | Model alternatives explicitly with dialect/scope and phonetic evidence; avoid consensus claims where sources disagree |
| Contextual rules / allophony | Partial browser hand-written cases | Rule-complete regression suite absent | None established | PARTIAL | Rule registry with source, environment, output, counterexamples and Python/browser parity tests |
| IPA result/status contract | Python and browser withhold IPA for unresolved anusvara (U+1036) and for a bare consonant that is an isolated token, including when surrounded by whitespace/Latin text; contiguous Myanmar clusters retain the existing contextual path | PR #28 merged as `62cb4ab49bd88736faea89f2b378d10b009ce640`; PR #32 adds boundary-aware withholding and regression tests for `က A` vs contiguous `ကမ`. Boundary-aware bare-consonant regression was found to assert an English phrase against Ukrainian UI text; the assertion now checks the existing Ukrainian uncertainty wording. New shared DEL/C1 fixtures are included; exact-head CI [40211417858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40211417858) passed Python tests, web validation/build, generated-data checks and Playwright browser tests. Earlier anusvara parity passed in [CI run 40197390660](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40197390660). | No lexical IPA gold entries | PARTIAL | Expand shared fixtures across inherent-vowel environments, coda, tone and malformed cases; verify broader status parity |
| Misplaced U+1039 virama evidence | Parser already rejects virama not consumed as a conjunct; Unicode structural claim and test trace now recorded | Regression tests in `tests/test_malformed_ipa_withholding.py` and provenance test | Unicode 18.0.0 §16.3.1 / Table 16-4; structural evidence only | DONE_VERIFIED for source-to-test traceability; phonology still TODO | Keep IPA withheld; do not treat structural validation as a pronunciation rule or gold IPA |
| IPA → Ukrainian target adapter | Canonical candidate inventory plus executable whole-string IPA → Ukrainian adapter in Python and browser; longest-match affricates, h/ɦ → г, ɡ/g → ґ (project choice), x → х, explicit ц/дз/ч/дж, aspiration notation, contextual /j/ yotation, prosody trace, fail-closed unknown segments; post-IPA integration in deterministic engine and public service | Python sequence tests; browser adapter tests include spaced IPA, untied consonant sequences and fail-closed unsupported structures; generated-data freshness, Node tests and built-site Playwright rerun queued on PR #133 (run 43095497303) | No Ukrainian name-level or independent lexical IPA gold evaluation | PARTIAL pending exact-head CI | Pass the full exact-head CI including built-site Playwright; retain empirical gold evaluation as separate blocker |
| Feature-distance ranking | Candidate ranking implementation exists | Limited regression tests; final schema/feature validation not established | No empirical target-ranking validation | PARTIAL | Validate feature definitions and weights against canonical inventory; test deterministic ranking, ties, unknown features and missing inventory |
| Comparative Russian/Ukrainian policies | Comparative registries and documentary layer present | Practical tests cover selected correspondences | No independent name-level benchmark | PARTIAL | Check every rule provenance, target-language rationale, uncertainty and non-inheritance from Russian |
| Malformed/unsupported input | Structural and practical uncertainty outcomes exist | Some malformed virama and unknown-target tests | Not a lexical accuracy measure | PARTIAL | Adversarial tests for all API/CLI/browser entry points; no confident output after malformed or incomplete parse |
| Phonological source → claim → rule → test traceability | Every current rule row links to a registered source and scoped claim, locator, evidence status and existing regression-test file | `tests/test_source_rule_evidence.py` checks unique rule IDs, source/claim existence, matching source IDs, non-empty locators/scopes and valid statuses | Provenance contract only; no independent lexical IPA gold or accuracy claim | DONE_VERIFIED (current rule rows only) | Add source/claim/locator/test metadata to each new rule; independently adjudicate phonological outputs before expanding the rule inventory |
| JSON schemas / data validation / generated artifacts | Canonical source, source-claim and phonological-rule CSV registries; syllable schema; generated web data | PR #39 adds `source_record.schema.json` and `phonological_rule.schema.json`, expands `source.schema.json` to the actual claim fields, and validates every source/claim/rule row plus unique IDs and source→claim→rule links. Exact-head tests [40222099466](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222099466) and web/deploy workflow [40222096239](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222096239) passed. | Provenance/schema integrity only; lexical IPA gold remains 0 | PARTIAL | Extend schema-backed checks to phonology-corpus records and source/claim locator quality; keep linguistic adjudication separate |
| Python/browser parity | Separate implementations; shared fixtures now cover unsupported Myanmar and analysis-dependent medial/conjunct/kinzi withholding | Python and browser tests consume `tests/fixtures/shared_unicode_contract.json`; exact-head CI 43638222569 passes 278 Python + 68 subtests, 21 Node, 59 Playwright | None established; fixtures are structural/status contracts, not phonetic gold | PARTIAL | Extend fixtures to full parsed structure, syllable boundaries, coda/tone states and adapter traces; retain expert IPA adjudication as a separate gate |
| Lexical IPA gold corpus | Three U18 structural probes now have exact Unicode 18.0 §16.3.1 / Table 16-4 locators; three Green 2002 probes remain pending | PR #43 replaced stale Unicode locators for `ကေ`, `ကော်`, and `ယူ`; exact-head full workflow [40223402689](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223402689) passed pytest, build, generated-data checks, Node tests and Playwright browser tests. Optional Epitran raw-output workflow [40223406632](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223406632) is a comparison artifact, not gold evaluation. | 0 independently adjudicated lexical IPA gold entries | BLOCKED for accuracy evaluation; PARTIAL for source locator cleanup | Inspect the Green 2002 source at exact pages/examples, then obtain expert IPA adjudication; do not promote source examples directly to gold |
| Epitran comparator | Optional scripts/benchmark_g2p.py; pinned Epitran 1.35.3 raw-output workflow on ci/optional-epitran-smoke-2026-10-24 | Workflow [40092717790](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40092717790) and artifact inspected; six outputs, zero errors; package/mapping hashes recorded | 0 verified gold entries; exact-match count/accuracy null | DONE_VERIFIED for raw-output smoke; BLOCKED for accuracy by gold corpus | Preserve artifact; obtain exact source locators and independent adjudication before any scoring; do not infer accuracy from these six structural probes |
| myG2P data | License risks documented; dictionary not bundled | Licensing review is documentary | Not applicable | DONE_VERIFIED (non-bundling guardrail) | Do not import dictionary material absent separate permission and rights review |
| Project license | No root LICENSE; CITATION.cff uses NOASSERTION | Presence/absence documented | Not applicable | BLOCKED — owner decision | Owner selects code license and separately resolves corpus/data/model rights; do not infer from public visibility |
| CI / release readiness | CI configuration now includes schema and generated-artifact gates | CI run #259 passes: pytest (32), web data validation/build, generated-data drift, npm unit tests, and browser tests (40) | No end-to-end phonological validation | PARTIAL | Extend schema validation to all canonical evidence registries; obtain independent lexical IPA gold entries; run pinned Epitran only in a separate environment |

## Gold-corpus rules
1. Keep the six existing seed cases labelled STRUCTURAL_ONLY; they are not phonological gold.
2. A scoreable row must have GOLD_VERIFIED, non-empty expected IPA, a registered source ID, and a precise non-pending source locator.
3. The benchmark enforces non-empty IPA convention, scope/dialect, analysis level (phonemic vs surface phonetic), reviewer and uncertainty/alternative notes. Unit tests verify incomplete metadata is not scored.
4. Never fill expected IPA from the system under test, Epitran, or myG2P and then use that same output as independent truth.
5. Report exact-match and feature/category metrics only over the eligible gold set; show unresolved and unsupported cases separately.

## Reproducibility and license gates
- Epitran is a pinned comparator only. Do not promote it to the primary engine based on agreement with its own mapping or unverified outputs.
- Preserve raw Epitran output and separately hash installed package metadata, map, preprocessor and postprocessor where available.
- Keep third-party code, maps, dictionary, model weights, source text and generated artifacts as separate rights-bearing categories.
- No root license should be added until the owner decides. A public repository is not a license grant.

## Execution evidence and limitations
This register was prepared from the current README, both named audits, the seed corpus, src/burmese_ukrainian/ipa.py, src/burmese_ukrainian/parser.py, tests/test_parser.py, tests/test_practical.py, and scripts/benchmark_g2p.py. Remote inspection confirmed branches main, final-hardening, fix/adversarial-burmese-phonology, and service-ready; they were not modified or merged. This work is on feat/burmese-phonology-coverage-gates-2026-10-21 and is tracked by open draft PR #4; it has not been merged.

Automated CI run #259 (commit 1045735c244e96c898c3a675f15ad68f6b79151a) completed SUCCESS: editable package install PASS; pytest PASS (32 tests, including JSON Schema checks); npm install PASS; npm run build PASS; canonical web-data validation PASS; generated-data drift check PASS; Playwright installation PASS; npm run test:browser PASS (40 tests). The shared Unicode fixture is exercised in the browser. The Epitran benchmark was not run. The project remains a partial research prototype, not release-ready. Independent gold validation remains blocked; project licensing remains an owner decision.

## Website publication

| Layer | State | Evidence | Remaining acceptance criterion |
|---|---|---|---|
| Public disclosure | PARTIAL pending deployment | Homepage and methodology page now disclose the research-preview status, 0 verified lexical IPA gold entries, and 6 structural-only probes; a browser regression asserts the notice and matrix link | Merge only after CI passes, verify GitHub Pages deployment and live page content |


## External comparator execution update — 2026-10-24

A manually dispatchable/path-triggered workflow was added on branch ci/optional-epitran-smoke-2026-10-24 to install Epitran 1.35.3 in an isolated CI job and preserve the raw JSON report as an artifact. This improves reproducibility of the candidate smoke run but does not change the research status: the six current rows remain STRUCTURAL_ONLY, verified gold count remains zero, and accuracy must remain null. Mark the smoke run DONE_VERIFIED only after CI succeeds and the artifact's raw outputs, version, mapping hash, and error status are inspected.


## Epitran smoke run — 2026-10-24

- The first optional workflow run [40092549134](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40092549134) failed after package installation due an `UnboundLocalError`: an in-function `import importlib.resources` shadowed the module used for `importlib.metadata.version`. Fixed by importing `resources` directly, then added a regression guard.
- Successful rerun: [40092717790](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40092717790), Epitran 1.35.3 / Python 3.12.15, 6/6 raw outputs, 0 errors. Corpus SHA-256 `bc7d4f138581b7cfd48594b41891a26ec45123ea4488af977b48567201f0b19b`; mapping SHA-256 `de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4`; artifact SHA-256 `1ca54b638897f41f124147df0744f9929e651757b720552082d701748794e475`.
- Raw outputs include `ကေ → ke`, `ကော် → kaʊʔ`, `ကြည် → t͡ɕi`, `စွယ် → səwɛ`, `မြန် → məjaɴ`, `ယူ → ju`. These are preserved as candidate outputs, not adjudicated IPA truth. Verified gold count is 0; exact-match count and accuracy are null. Epitran does not reconstruct tone in this mapping and the present corpus cannot support an accuracy claim.


## Final reproducibility record — 2026-10-24

- Current-head verification [40093021155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40093021155) passed: pytest, web build, generated-data drift check, npm tests and Playwright browser tests all succeeded.
- Current-head raw-output run [40093021146](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40093021146) passed. Epitran 1.35.3 / Python 3.12.15; corpus path `data/burmese/phonology_corpus.csv`; corpus SHA-256 `bc7d4f138581b7cfd48594b41891a26ec45123ea4488af977b48567201f0b19b`; mapping SHA-256 `de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4`; empty preprocessor SHA-256 `e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855`; postprocessor SHA-256 `0eac185c50b19b7c2682d1395afad97a7662a5ff22e2344195eb0d3ffcbed7af`; artifact ZIP SHA-256 `6abad56759caa47868dee8af5e82068c143f810336454099ba9c149dc74e8f09`.
- Six structural probes yielded `ke`, `kaʊʔ`, `t͡ɕi`, `səwɛ`, `məjaɴ`, `ju`. Gold count 0; exact-match count and accuracy null. This is a reproducible smoke run, not an accuracy result.


## Final reproducibility record — 2026-10-24

Current-head verification run 40093021155 passed: pytest, web build, generated-data drift check, npm tests, and Playwright browser tests. Current-head raw-output run 40093021146 passed with Epitran 1.35.3 / Python 3.12.15. The six structural probes produced raw candidate outputs only; verified gold count is zero and accuracy remains null.

Corpus path is relative: data/burmese/phonology_corpus.csv. Corpus SHA-256: bc7d4f138581b7cfd48594b41891a26ec45123ea4488af977b48567201f0b19b. Mapping SHA-256: de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4. Preprocessor is empty (SHA-256 e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855). Postprocessor SHA-256: 0eac185c50b19b7c2682d1395afad97a7662a5ff22e2344195eb0d3ffcbed7af. Artifact ZIP SHA-256: 6abad56759caa47868dee8af5e82068c143f810336454099ba9c149dc74e8f09. This is a reproducible smoke run, not an accuracy result.


## Merge and final acceptance record — 2026-10-24

PR #9 merged at `b71e2075b1e7dcebd17b54164bc017eb99eececd`. The raw-output smoke and full verification suite passed on the code-tested head; the report hashes the corpus and Epitran mapping/pre/post resources and keeps the gold denominator at zero. The raw-output task is DONE_VERIFIED; accuracy and source-adjudicated corpus tasks remain BLOCKED/TODO.


Authoritative readiness checkpoint — 2026-10-24 12:38 UTC

- Current main HEAD: b7a44e6e0ff7ec0010d58c30c2ceb0101e72761b.
- Engineering verification: DONE_VERIFIED. Current-main tests 40093806758 and Pages deploy 40093806746 both passed. Test suite includes Python, generated-data drift, npm, build and Playwright checks.
- Epitran smoke: DONE_VERIFIED as raw-output execution only. Pinned Epitran 1.35.3 / Python 3.12.15; six structural probes; zero runtime errors; artifact SHA-256 6abad56759caa47868dee8af5e82068c143f810336454099ba9c149dc74e8f09. Verified independent gold count 0 and accuracy null.
- Remaining TODO/BLOCKED: independent IPA gold corpus, tone-aware validation, lexical/context coverage, and source adjudication of candidate outputs. Do not add Epitran as a runtime dependency or call these six probes an accuracy benchmark.
- Readiness: engineering prototype verified; not empirically accuracy-certified or release-ready as a complete transcription engine.

## Authoritative current-head checkpoint — 2026-10-25

This checkpoint supersedes older baseline SHAs and statements that the current-head smoke/CI were still pending.

- Current `main`: `32f6f3da9328aa96e746d63b63912c4e64793646`.
- Current-main tests [40128844973](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40128844973): `success`; Pages deployment [40128844976](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40128844976): `success`; optional Epitran smoke [40128845097](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40128845097): `success`.
- PR #22's documentation correction is merged. The earlier stale instruction to run Epitran has been replaced with observed smoke evidence.
- Epitran remains a raw-output comparator only: six structural probes, zero runtime errors, no adjudicated gold, and no accuracy estimate. No production dependency or external corpus was added.
- Engineering workflow is DONE_VERIFIED for the recorded current head. Phonological coverage, Python/browser engine parity, independent source-adjudicated gold, tone-aware evaluation and license-owner decisions remain PARTIAL/BLOCKED as recorded above. The repository is not an accuracy-certified general-purpose transcription engine.

## Latest verified smoke evidence — 2026-10-25

- Current-main smoke [40134067758](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40134067758) and artifact [12576415800](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40134067758/artifacts/12576415800) were inspected. ZIP SHA-256: `6ff7fd5d70f386d76eefb37d50d2718d9de3f4e410749cf94848af9afeab788c`; 6/6 outputs, 0 runtime errors, Epitran 1.35.3 / Python 3.12.15.
- All six corpus rows remain STRUCTURAL_ONLY, so verified gold count is 0 and accuracy null. Raw-output execution is DONE_VERIFIED; phonological accuracy remains BLOCKED by missing source-located independent adjudication.
- PR #24 narrowed automatic smoke triggers to executable input/source/script/workflow changes; evidence-only registry/doc updates no longer trigger another optional run.


## Empty-input API contract — 2026-10-25

- Found a top-level API bug: `parse_burmese("")` previously returned `status="ok"` because Python's `all([])` is true, even though no syllable was analyzed.
- Empty and whitespace-only input now return `status="empty_input"`, preserving normalized input but producing no graphemes/syllables.
- This is an API status correction, not a pronunciation rule. Exact-head CI must pass Python tests, schema checks, build and browser tests.


## Evidence-registry schema checkpoint — 2026-10-25

- PR [#39](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/39) merged as `8a2482535c463a9371f7c0c6ac32c15880b7485c`.
- Added explicit JSON Schemas for source registry records and phonological rule records; expanded the existing claim schema to match the canonical `source_claims.csv` fields (`evidence_type` and `scope` included).
- The test now validates every canonical source, claim and implemented rule row, unique identifiers, and referential integrity from source → claim → rule. The test-first checkpoint failed for the intended missing-schema reason in [40222025229](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222025229); final exact-head verification passed in [40222099466](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222099466) and [40222096239](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222096239).
- This closes a provenance validation gap, not a phonological one. The six corpus rows remain structural-only; independent lexical IPA gold count is still 0. Next acceptance criterion: add a schema and integrity checks for `phonology_corpus.csv`, with explicit allowed evidence statuses and a rule that structural-only rows cannot carry gold IPA or Ukrainian output.


## Corpus evidence-schema checkpoint — 2026-10-25

- PR [#41](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/41) merged as `3c8f03957fb3d8b8201bafac0dcdc819f50b8fe1`.
- Added `schemas/phonology_corpus.schema.json` and validates every row of `data/burmese/phonology_corpus.csv`. The schema constrains evidence statuses and enforces that `STRUCTURAL_ONLY` records have empty IPA/Ukrainian gold fields; `GOLD_VERIFIED` records require IPA convention, scope, analysis level, reviewer and uncertainty metadata. Tests also check unique case IDs, source references and non-pending locators for gold rows.
- Exact-head full workflow [40222516985](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40222516985) passed pytest, npm build, generated-data checks, Node tests and Playwright browser tests.
- All six existing rows remain `STRUCTURAL_ONLY`; the new schema deliberately does not promote them to phonological gold. Independent lexical IPA gold count remains 0 and accuracy remains unmeasured.


## Unicode corpus locator checkpoint — 2026-10-25

- PR [#43](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/43) merged as `0c793b76f45261c9d9044e0eac01245a8afef54f`.
- Updated the U18 source registry title/scope and replaced the three stale locator placeholders with exact `Unicode 18.0.0 Chapter 16 §16.3.1, Table 16-4` references for `ကေ`, `ကော်`, and `ယူ`.
- These rows remain `STRUCTURAL_ONLY`; expected IPA and Ukrainian fields remain empty. The Unicode chapter's example `ကော် /kaw/` is cited as a locator, not copied as gold.
- Exact-head full CI [40223402689](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223402689) passed all tests, generated-data checks, Node and browser tests. Optional Epitran raw-output comparison [40223406632](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/40223406632) completed successfully but is not an accuracy benchmark.
- Green 2002 rows remain source-locator-pending; independent lexical IPA gold remains 0.


## Evidence update — 2026-10-25

The misplaced-virama guard now has an explicit source → claim → rule → test link through `CLM-ORTH-001` / `MALFORMED_VIRAMA_WITHHOLD_IPA`. Unicode establishes script/syllable structure, not the pronunciation of malformed input. The implementation continues to return invalid status and withhold IPA.


## Shared Ukrainian target adaptation — 2026-10-30

| Task | Status | Evidence / acceptance |
|---|---|---|
| Preserve Burmese aspirated IPA in Ukrainian practical output | DONE_VERIFIED | /kʰ tʰ pʰ sʰ/ → к' т' п' с'; /tɕʰ/ → ч'. Source IPA remains unchanged. |
| Distinguish /h/, /ɡ/ and /x/ | DONE_VERIFIED | /h/ → г, /ɡ/ → ґ, genuine /x/ → х in the canonical practical registry and rules. |
| Preserve affricate identity | DONE_VERIFIED | /tɕ/ → ч, /dʑ/ → дж; no grapheme-based inference. |
| Preserve /ʔ/ as distinct from aspiration | DONE_VERIFIED | /ʔ/ remains ∅ in practical output and never receives the aspiration apostrophe. |
| Keep the dental-fricative candidate evidence-gated | DONE_VERIFIED | The existing grouped /θ~ð/ → т candidate is restored as ANALYSIS_DEPENDENT with its comparator provenance; no claim of exact phonetic identity. |

Exact PR-head workflow [41075332863](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41075332863) passed pytest, generated-web-data drift, production build, Node tests and Playwright browser tests. PR #49 remains draft; existing PR #48 was left untouched. Branch head: `e43c4e0121d9f29bc942e5f470d795c114c2085e`.

These are owner-approved Ukrainian target-policy decisions, not external linguistic sources or a normative Ukrainian standard. The change does not add Burmese phonological gold. Independent adjudicated lexical IPA gold remains 0; accuracy remains unmeasured. Remaining TODO/BLOCKED work on full Burmese tone/register/phonation, coda/vowel coverage and independent lexical validation is unchanged.


## Romanization profile and crosswalk decision — 2026-10-31

| Task | Status | Evidence / acceptance |
|---|---|---|
| Select orthographic Burmese romanization profile | DONE_VERIFIED (source review) | MLCTS is explicitly described by Mya2Rom upstream as an orthographic transcription system created by the Myanmar Language Commission; modified MLCTS / MLCTS2 is more phonetic. |
| Align browser romanization mode with selected MLCTS profile | TODO | Change mya2rom(..., "mlcts2") to "mlcts", update UI label and exact-output browser regression; run full exact-head CI and Pages checks. |
| Build MLCTS → Ukrainian syllable crosswalk | PARTIAL | Onset + 94 vendor-rime target rows are populated and tested on the task branch; complete source-verified Myanmar structures and a runtime syllable adapter remain open. Do not reuse IPA mapper. |
| Ukrainian target matrix coverage | DONE_VERIFIED | Exact-head test run [43221074232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221074232) passed: 187 Python tests + 66 subtests, 54 Node tests, build, generated-data freshness and built-site Playwright. 35 onset + 94 vendor-rime target rows are populated; source inventory remains EVIDENCE_LIMITED. |
| Complete MLCTS correspondence inventory | PARTIAL | Cover consonants, medials, vowels, codas, independent vowels, kinzi, asat, numerals and punctuation with source locators and explicit unsupported states. |
| Audit Mya2Rom provenance and redistribution | PARTIAL | Preserve CC-BY-SA-4.0 notices; verify each copied code/data component and upstream-derived table source. |

This is a method-selection and research-matrix update only. It does not add IPA gold or claim phonological accuracy. Current independent adjudicated lexical IPA gold count remains 0.


## Production Pages artifact gate — 2026-10-31

| Task | Status | Evidence / acceptance |
|---|---|---|
| Copy Mya2Rom browser assets into Vite public output | DONE_VERIFIED (PR candidate) | scripts/copy-vendor-assets.mjs copies romanisations.js and mya2rom.js; artifact test verifies both files in dist |
| Include methodology page in production build | DONE_VERIFIED (PR candidate) | Vite multi-page input includes index.html and system.html; artifact test verifies dist/system.html |
| Test browser behavior against production artifact | DONE_VERIFIED (PR candidate) | Playwright preview server uses vite preview; browser asserts window.mya2rom exists and methodology navigation works |
| Post-merge GitHub Pages deployment | DONE_VERIFIED | Main commit fff943db823ae5ca0f4fed50b572cc75cb743f84 deployed successfully by workflow 41231199596 to https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ |

Test-first RED: [41230779647](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230779647) failed because the production artifact omitted system.html. Exact-head GREEN: [41230976020](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41230976020) passed: pytest 63 + 29 subtests; Node 3/3; Playwright 48.




## Final main / Pages checkpoint — 2026-10-31

- Final main commit: fff943db823ae5ca0f4fed50b572cc75cb743f84.
- PR #54: MLCTS profile and onset matrix; PR #55: two separate method tabs; PR #56: production asset copy, multi-page build and preview-based browser tests.
- PR #48 was closed as superseded by #56; its old branch was left intact. PR #53 styling work remains open and untouched.
- Main verification [41231199684](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41231199684) passed: pytest 63 + 29 subtests; Node 3/3; Playwright 48 against the built artifact.
- Pages deployment [41231199596](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41231199596) succeeded: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ .
- Final statuses: MYA-ROM-PROFILE-001 DONE_VERIFIED; MYA-ROM-MATRIX-ONSET-001 DONE_VERIFIED; MYA-ROM-MATRIX-001 PARTIAL; MYA-ROM-UA-001 TODO; MYA-PAGES-ARTIFACT-001 DONE_VERIFIED; MYA-PHONETIC-COVERAGE PARTIAL/BLOCKED pending independent lexical gold and expert adjudication.
- The romanization tab's Ukrainian result is intentionally PARTIAL. Do not claim full romanization coverage until a complete source → MLCTS → Ukrainian syllable matrix and adapter pass exact coverage tests.


## Browser output integrity and full-sentence regression — 2026-10-31

| Task | Status | Evidence |
|---|---|---|
| Preserve unresolved/unsupported Burmese source units in Ukrainian browser output | DONE_VERIFIED | PR [#64](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/64) merged as `d0b7f6351a4151b974ec9ee379f81f7a06da9613`; unresolved units now render as `⟦source⟧` rather than disappearing or exposing incomplete per-syllable mappings |
| Preserve supported contextual initial /j/ + vowel rendering | DONE_VERIFIED | Existing `/juː/ → ю` browser regression remains green after correcting status aggregation for the contextual target |
| Full user-supplied Burmese greeting sentence source reconstruction | DONE_VERIFIED | Playwright reconstructs the normalized sentence from rendered source-unit rows and asserts exact equality; unresolved Ukrainian units remain explicitly marked |
| Full Burmese phonetic/target accuracy for the sentence | BLOCKED / EVIDENCE_LIMITED | No independent lexical IPA gold and no complete Ukrainian mapping inventory; do not infer missing pronunciations or spellings to force a full output |

Exact final PR-head workflow [41238825573](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238825573) passed: pytest 64 + 29 subtests, Node 4/4, Vite build, generated-data drift check, and Playwright 50/50 against the built artifact. The Pages workflow [41238926334](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238926334) completed successfully and deployed merged main `d0b7f6351a4151b974ec9ee379f81f7a06da9613` to https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/. Main verification [41238926148](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41238926148) also completed successfully.


## Mixed-text and unsupported-source preservation — 2026-10-31

| Task | Status | Evidence / acceptance |
|---|---|---|
| Python parser exact source reconstruction for mixed sentences | DONE_VERIFIED (PR-head evidence) | PR #74 merged as `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`; exact-head workflow [41244535813](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41244535813) passed all configured Python, Node, build, generated-data and Playwright steps. Tests cover Latin text, ASCII digits, Burmese digits, Myanmar punctuation and exact source-unit reconstruction. |
| Python withholding for unsupported Myanmar Extended-A adjacent to a valid syllable | DONE_VERIFIED (bounded parser behavior) | Regression asserts the complete raw cluster is preserved and status is `partially_unparsed`; no unsupported unit is silently dropped or promoted to IPA. |
| Exact post-merge main verification and Pages deployment | IN_PROGRESS / BLOCKED pending CI | Main SHA `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`; runs [41245969998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969998) and [41245969938](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969938) were queued at checkpoint time. Acceptance: both exact-SHA workflows complete successfully; Pages smoke test confirms deployed runtime assets. |

These are source-integrity regressions, not evidence of Burmese IPA accuracy, full Unicode coverage, or completion of the MLCTS → Ukrainian adapter. Independent lexical IPA gold remains 0.


## Post-merge CI evidence correction — 2026-10-31

- PR #74's post-merge main tests [41245969998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969998) and Pages deployment [41245969938](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41245969938) completed successfully on `6ec5c6a15af45fce5d993933c3c429d8e9a82c79`; deployed-site/runtime smoke test passed. This supersedes the earlier queued status in the preceding checkpoint.
- The subsequent documentation-only PR #75 merged as `48bb45cf2a5c6cc95057fecacdfbc6e852b760b1`; exact PR-head tests [41246079334](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246079334) passed. Its post-merge exact-main tests [41246294703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294703) and Pages [41246294821](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294821) were still running at this checkpoint.


## Final main verification correction — 2026-10-31

- Exact-main tests [41246294703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294703) and Pages [41246294821](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41246294821) completed successfully on `48bb45cf2a5c6cc95057fecacdfbc6e852b760b1`. The earlier in-progress note above is superseded; deployed-site/runtime smoke test passed.
- Follow-up documentation PR-head verification remains required before merge.


## External G2P candidate register update — 2026-11-01

| Candidate | Status | Evidence / acceptance |
|---|---|---|
| Goruut | PARTIAL — upstream advertised support only | Pinned source commit `b224bde02151f8f86d0fe260804e4ca743bda620`; README lists Burmese and an IPA phone set. No syllable tokens or tie bars; numbers/dates unsupported. MIT source-code license verified, embedded asset licenses not yet audited. Run in isolated optional CI and retain raw output before considering further use. |
| Epitran 1.35.3 | DONE_VERIFIED as raw-output smoke only | Existing six structural probes and resource hashes remain diagnostic; documented limited Burmese support; independent gold remains 0. |
| myG2P | BLOCKED for commercial redistribution absent rights decision | Upstream license is CC BY-NC-SA 4.0; do not vendor into the commercial runtime absent permission/legal review. |

No accuracy score or engine winner is available. Promotion requires independent expert-adjudicated IPA and a separate license/provenance audit for all model and dictionary assets.


## 2026-11-01 exact-head runtime update — Goruut

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-GORUUT-RUNTIME-001 | PARTIAL | PR #82 exact head `d8b065bc66dce5fdd9959c4f0eb932a29acaedba`; [runtime workflow 41310771082](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41310771082); artifact ZIP SHA-256 `0eb19d7079de818736ecff095f700405fc4b46de3791dd6e4fd68762346218fa` | Pinned Go build succeeds; 7/8 usable Goruut outputs, 6 stable and 1 unstable; punctuation probe has no output. Epitran 1.35.3 returns 6/6; raw exact match 0/6. Accuracy remains null, independent gold=0. |
| MYA-GORUUT-ASSET-WARNING-001 | BLOCKED | Runtime server log in artifact; `weights9.bin.zlib` missing while pinned tree has `weights8.bin.zlib` | Diagnose upstream loader/asset path and determine whether it affects output; no causal claim yet. |
| MYA-PHONETIC-GOLD-001 | BLOCKED / TEXT-ONLY EXPERT REVIEW | Current source and phonology audits | Create independently reviewed IPA examples from written dictionaries, lexical entries and published phonological descriptions, with source locators and a versioned broad/narrow convention. |

The exact-head results supersede earlier one-shot claims of full stability: `ကြည်` varied between `tɕì` and `tɕɪ̀ɴ` across repeated requests. No external engine is selected as production provider.


### Goruut nondeterminism root cause and report contract

Pinned upstream `SelectE` counts multiple dictionary pronunciations and, when no homograph-model preferred entry is selected, falls through to a random dictionary pronunciation. The upstream source comment names this behavior; the response counters `RandomizationWordsCount` / `RandomizationWordsChoices` are populated by the sentence use case. Exact sources: [selector](https://github.com/neurlang/goruut/blob/b224bde02151f8f86d0fe260804e4ca743bda620/repo/services/parts_of_speech_selector_service.go#L168-L205), [counter propagation](https://github.com/neurlang/goruut/blob/b224bde02151f8f86d0fe260804e4ca743bda620/usecases/phonemize_usecase.go#L84-L85).

The latest Burmese artifact shows the only unstable input `ကြည်` carried these counters on all three repetitions (1 ambiguous word, 2 choices); the other seven inputs had no ambiguity metadata. The optional benchmark script now parses and aggregates those counters as randomized input/repetition counts while leaving accuracy null. This is an ambiguity signal, not a claim that all homographs are incorrect. The missing `weights9.bin.zlib` warning is separate and its causal relationship remains unproven.


### Source-coverage gate update — 2026-11-01

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-GORUUT-SOURCE-COVERAGE-001 | PARTIAL | Exact-head artifact 13085043436; raw-output re-analysis | 7/8 Goruut outputs passed source-field reconstruction and punctuation-field letter checks; one punctuation sentence returned no output. Eight probes do not establish broad coverage. |
| MYA-GORUUT-RANDOMIZATION-REPORT-001 | PARTIAL | Pinned upstream selector source; test-first assertions added | Harness parses RandomizationWordsCount/Choices and has coverage tests. Exact-head CI for the new parser is pending. |

The source-coverage contract reconstructs the input from PrePunct + CleanWord + PostPunct after NFC/whitespace removal and flags letters, combining marks or numbers left in PrePunct/PostPunct. This is a coverage check, not phonetic accuracy. The new implementation must pass CI before the task can be marked DONE_VERIFIED.


### myG2P v2.0 100-row comparison — PARTIAL, CI pending

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-MYG2P-PARSER-001 | PARTIAL | `scripts/prepare_myg2p_probe.py`; `tests/test_prepare_myg2p_probe.py` | Parses pinned five-column dictionary, tracks malformed/missing/duplicate rows, creates deterministic 100 unique source-located rows, and labels them SOURCE_ATTESTED_NOT_GOLD. Exact-head test CI pending. |
| MYA-MYG2P-COMPARISON-001 | PARTIAL | Optional Goruut workflow now checks out myG2P commit `54b5c76bb5a87fdbaaeddc1892e6ebd8f97ee225`; same 100 rows go to Goruut (3 repeats) and Epitran 1.35.3 | Await exact-head runtime artifact. Report raw outputs, coverage, randomization and source-attested concordance only; accuracy must remain null and independent gold=0. |

The user explicitly authorized temporary test-only use regardless of upstream license review. The dictionary is not committed to this repository or bundled into product runtime. Per-entry IPA is source-attested, not independently adjudicated gold.


### Repeat-run reconciliation — 2026-11-01

The first independent 8-probe run (artifact 13085043436) showed one unstable output for `ကြည်`; the later run [41312361052](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41312361052) showed the same word stable across three repeats but retained `RandomizationWordsCount=1` and `RandomizationWordsChoices=2` in every response. Thus a stable three-sample result does not remove the upstream ambiguity: random choice may happen to repeat the same candidate. The later run classified 7/8 as complete source coverage and one punctuation sentence as no output. The source-coverage and randomization gates must both pass before any source-attested comparison; no gold/accuracy claim.


### Final myG2P / Goruut exact-head verification — 2026-11-01

| Task | Status | Evidence | Acceptance / blocker |
|---|---|---|---|
| MYA-MYG2P-PARSER-001 | DONE_VERIFIED | PR #82 head `dcd9dfb6f1306ce01547f922238aba3fdefd6586`; tests workflow [41313487752](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487752) PASS; `scripts/prepare_myg2p_probe.py`; parser tests | 24,802 physical lines; 24,009 unique IPA entries; 793 duplicate headwords skipped; 0 malformed and 0 missing-IPA rows. Deterministic 100-row source-located probe generated; not gold. |
| MYA-MYG2P-COMPARISON-001 | DONE_VERIFIED | Runtime [41313487703](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487703) PASS; artifact [13086900774](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41313487703/artifacts/13086900774), SHA-256 `ca165ac84ee6b284a423a988a5ee32d951a883c36073b01fd5f086ba83022f77` | Goruut 98/100 outputs; 43 complete / 55 partial / 2 unknown; 98 stable; 0 randomized; 69 unphonemized fragments; strict source concordance 0/100 and limited notation diagnostic 17/100. Epitran 1.35.3 raw output captured. Accuracy=null, independent gold=0. |

**Evidence boundary:** myG2P declares CC BY-NC-SA 4.0 and remains temporary test-only input under explicit owner authorization. It is not copied into product data or runtime. Source labels are not independently adjudicated gold; neither raw engine agreement nor dictionary concordance establishes accuracy. The 8-case engineering probe separately had 7/8 outputs, 7 complete, 1 unstable/randomized and 1 no-output. Production promotion remains blocked pending qualified expert IPA gold and dialect/profile adjudication.


### Final exact-head evidence correction — 2026-11-01

The final PR #82 runtime [41324681722](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41324681722), artifact [13090128004](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41324681722/artifacts/13090128004), supersedes the previous 8-case wording: 7/8 outputs, 7/7 complete and stable, 1/8 carried upstream dictionary-randomization metadata despite identical output across the three sampled repeats, 1/8 no output. The 100-row myG2P comparison remains 98 outputs, 43 complete / 55 partial / 2 unknown, 98 stable, no randomization metadata, 69 unphonemized fragments, 0 strict and 17 limited-notation source-label matches. These are not accuracy; independent gold=0. The downloaded archive SHA-256 matches the GitHub digest.


### Session closeout — PR #82 merged, 2026-11-01

- PR #82 merged into `main` as `e9c83322f304a670dd25e121dcc5b60e1cf3a896`.
- Post-merge pytest, npm build, generated-data validation, Node tests and Playwright built-browser suite: [41326238767](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41326238767) PASS. Pages build/deploy and deployed-site/runtime smoke test: [41326238774](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41326238774) PASS.
- MYA-MYG2P-PARSER-001 and MYA-MYG2P-COMPARISON-001 remain DONE_VERIFIED as temporary research tooling, not production phonology. The 100-row diagnostic is 98/100 outputs, 43 complete / 55 partial / 2 unknown, 98 stable, 0 randomization metadata, 69 unphonemized fragments, 0 strict / 17 limited-notation matches. Source labels remain not-gold; independent gold=0, accuracy=null.
- Remaining blocker: qualified expert-adjudicated, dialect-scoped Burmese IPA gold and review of the partial-coverage cases. No model/data redistribution is authorized by test-only use.


## Current status override — 2026-11-01

This current-head reconciliation supersedes older status cells above where they conflict; the dated historical checkpoints remain intact.

| Workstream | Current status | Acceptance / blocker |
|---|---|---|
| Independent lexical IPA gold | BLOCKED | data/benchmark/gold.tsv is header-only; independent gold=0 and accuracy=null. Requires source-located written IPA/phonological evidence, a defined target variety, two independent text-based reviewers and adjudication. No audio. |
| Consonant, kinzi and medial phonology | PARTIAL | Structural parsing exists; source-backed contextual phonological coverage and a differential corpus remain incomplete. |
| Vowel combinations and coda realization | PARTIAL | Full vowel derivation, checked-syllable and contextual coda realization are not implemented. |
| Tone/register/phonation | TODO | Specialist adjudication of competing analyses and scoped implementation are required; do not infer or collapse them. |
| IPA → Ukrainian | PARTIAL | Canonical external inventory boundary exists; target policies remain proposal-level and need expert review. |
| MLCTS → Ukrainian | PARTIAL | Separate orthographic adapter is integrated for supported onset/rime combinations and y/r/w medials; unsupported forms are visibly withheld. Full acceptance requires primary MLC source verification and coverage of kinzi/asat/devoicing/independent-vowel structures. |
| Goruut/myG2P/Epitran harness | DONE_VERIFIED (diagnostic only) | Parser, comparison and runtime artifacts verified; 55/100 Goruut outputs partial; myG2P remains temporary test-only under CC BY-NC-SA 4.0. No accuracy or production claim. |
| Python/browser phonological parity | TODO | Existing source-preservation parity does not establish phonological result parity; add shared expert-backed phonology fixtures. |
| Manual UI/accessibility QA | TODO | Deployed visual, keyboard, screen-reader and mobile QA not evidenced by CI. |
| Release readiness | PARTIAL | Blocked by gold, phonological coverage, primary-source and asset-rights gates. |


## Independent IPA gold corpus status — 2026-11-01

| Task | Status | Acceptance / blocker |
|---|---|---|
| IPA-GOLD-SCHEMA-001 | DONE_VERIFIED | Four JSON Schemas, empty JSONL templates and cross-file validator |
| IPA-GOLD-DOUBLE-ANNOTATION-001 | PARTIAL | Enforces two distinct annotators and third adjudicator; blind human collection remains external |
| IPA-GOLD-ADJUDICATION-001 | PARTIAL | Agreement/resolved/unresolved semantics verified; no real adjudicated examples |
| IPA-GOLD-SPLIT-001 | DONE_VERIFIED | Deterministic frozen lexeme-group splits and regression tests |
| IPA-GOLD-EXPORT-001 | DONE_VERIFIED | Rights-filtered export to existing benchmark contract; current output header-only |
| IPA-TYPED-BENCHMARK-001 | DONE_VERIFIED | IPA kind mismatch is not scored as exact match |
| IPA-GOLD-RELEASE-GATE-001 | PARTIAL | Tag/manual gate requires 100/25/25 gold; repository ruleset/release procedure must require it |
| BURMESE-ORTHO-KINZI-MEDIAL-001 | PARTIAL | Unicode structure documented; complete mapping and adversarial coverage open |
| BURMESE-VOWEL-CODA-001 | PARTIAL | Sonority/coda-conditioned vowel model needs expert-backed matrix |
| BURMESE-TONE-PHONATION-001 | TODO | Tone vs phonation vs segmental glottal closure requires specialist adjudication |
| BURMESE-PYTHON-BROWSER-PHONOLOGY-PARITY-001 | TODO | Requires shared expert-backed IPA fixtures |

**Gold status:** 0 independent adjudicated records; `gold.tsv` header-only; accuracy=null. The new workpack is a research specification, not completed phonological coverage.


Additional current controls:
- `IPA-GOLD-RIGHTS-001` — DONE_VERIFIED (mechanism): allowlisted license registry, required per-record rights evidence and non-redistributable license rejection. Source-by-source legal review remains required.
- `IPA-GOLD-PROVENANCE-EXPORT-001` — DONE_VERIFIED: export and benchmark report preserve source ID, license ID and rights-evidence locator.
- `IPA-GOLD-BLIND-INTAKE-001` — BLOCKED: qualified annotators and a controlled blind intake channel are not connected; public Git history cannot enforce blinding.


## CI action runtime modernization — 2026-11-01

| ID | Status | Evidence | Scope / acceptance |
|---|---|---|---|
| BUR-CI-ACTIONS-001 | DONE_VERIFIED | Code commit `a1ef4e13105937cd282e6edd67020a74207f649b`; exact-head [tests 41339669408](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41339669408) and [Epitran diagnostic 41339669397](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41339669397) both SUCCESS | All five workflow files use current Node.js 24-compatible action majors; Python, Node, build, generated-data, and 54 Playwright browser checks passed. No phonological behavior changed. |


## Focused source audit and evidence-gate refinements — 2026-11-03

| Evidence / task | Status | Verified source result | Consequence / acceptance |
|---|---|---|---|
| MYA-ORTHO-SYLLABIFICATION-001 | PARTIAL (external evidence reviewed; not implemented as ClippyFirst G2P) | Hlaing & Mikami (2014), [Automatic syllable segmentation of Myanmar texts using finite state transducer](https://doi.org/10.4038/ICTER.V6I2.7150): rule-based FST; 11,732 orthographic words; 99.93% word-syllabification; consonant-stacking subset 245/253 correct (96.83%); text also discusses a free-standing-vowel error; article count inconsistency 32,238 vs 32,283 syllables. | This is orthographic segmentation, not G2P, phoneme or IPA accuracy. Use only as structural-parser comparator; test kinzi/stacked consonants explicitly. |
| MYA-TONE-VOWEL-ANALYSIS-001 | PARTIAL | Mooney & Repetti-Ludlow (2021), [Sonority and syllable structure: The case of Burmese tone](https://doi.org/10.3765/plsa.v6i1.4900): acoustic experiments from one Yangon speaker; proposes syllable-structure/sonority-conditioned vowel alternations and a competing underlying-tone analysis. | Preserve as competing analysis; do not collapse vowel quality into tone or replace traditional surface categories without qualified review. |
| MYA-CORPUS-SLR80-001 | PARTIAL | Oo et al. (2020), [Burmese Speech Corpus, Finite-State Text Normalization and Pronunciation Grammars with an Application to Text-to-Speech](https://aclanthology.org/2020.lrec-1.777): 2,528 utterances, 20 female Yangon speakers, 22,443 tokens, 9,941 unique words; corpus CC BY-SA 4.0; separate Thrax/WFST G2P grammar. | Orthographic speech corpus, not IPA gold; no public train/dev/test split or speaker-balanced IPA benchmark established. Verify grammar license separately. |
| MYA-PHONETIC-PROFILE-001 | PARTIAL | Watkins (2001), [Burmese](https://doi.org/10.1017/S0025100301002122), JIPA profile from one 30-year-old Yangon male reading slowly; Gruber (2011), [Perceptual Cues to Lexical Tone in Burmese](https://doi.org/10.3765/EXABS.V0I0.557), reports joint pitch/duration/phonation cues. | Use as profile and feature evidence, not multi-speaker population gold. Keep tone, phonation and duration typed and separately testable. |
| MYA-GOLD-AGREEMENT-001 | TODO | Cucchiarini (1996), DOI [10.3109/02699209608985167](https://doi.org/10.3109/02699209608985167); Oller & Ramsdell (2006), DOI [10.1044/1092-4388(2006/100)]. | Pilot reports exact normalized agreement plus alignment-aware feature-weighted agreement, separate tone/duration/phonation/vowel/coda/boundary diagnostics, unresolved alternatives and adjudication rate. Raw percentage agreement supplementary only. |

No lexicon rows, IPA labels, or model predictions were imported. Gold remains 0; accuracy remains null. The detailed source audit is also recorded in the current top-level handoff and linguistic completion register.


## Engineering test-harness status — 2026-11-04

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| IPA corpus test-fixture language identity | Fixture uses Myanmar-script sample, `test-burmese` profile and neutral variety label; shared script-range constants are explicit in the test module | Regression asserts all fixture characters are in the Myanmar Unicode block and profile metadata matches the repository language; exact-main tests [41847895975](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41847895975) SUCCESS | Not applicable; this is test-data integrity, not phonological validation | DONE_VERIFIED | Preserve language-specific fixtures when adding shared corpus tests; do not infer phonological coverage from this check |

This engineering correction does not change the language-layer statuses above. Independent Burmese IPA gold remains 0; accuracy remains null.


## IPA gold release-gate corpus identity — 2026-11-04

| Task | Status | Evidence | Remaining acceptance |
|---|---|---|---|
| BURMESE-IPA-GOLD-PROFILE-GATE-001 | DONE_VERIFIED (engineering guard) | PR #117 merged as `085ce5a2da4a07dfbf606a9892c78a4d3bbb9d91`; exact-head tests [41870132273](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870132273), post-merge tests [41870579420](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579420), and Pages [41870579398](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/41870579398) SUCCESS. Shared validator rejects mixed adjudicated target profiles and mixed IPA kinds; positive regression confirms speaker/audio IDs may vary. | Human approval of Standard Yangon profile/convention, blind double annotation, independent adjudicator, rights-cleared source set, and specialist-reviewed onset × medial × vowel × coda × prosodic coverage remain outstanding. This guard does not create gold or prove accuracy. |

## Deterministic rule engine — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | PR #128 merged as `cd3a1503e79d32b09a6d2d5206340a37cfd3283b`; main tests [43018103155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103155) and Pages smoke [43018103391](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43018103391) SUCCESS; live site published. | Deterministic engine published. Expert-adjudicated Yangon IPA gold still required for phonetic correctness/accuracy claims. |

## Final deterministic-engine verification — 2026-11-11

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| MYA-DETERMINISTIC-RULE-ENGINE-001 | DONE_VERIFIED (engineering); linguistic coverage PARTIAL | Final main head `9bece0a50a367f3f58336d2aba7016ac4af86156`; tests [43019216137](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216137) and Pages + smoke [43019216297](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43019216297) SUCCESS. | Deterministic runtime published; independent expert-adjudicated Yangon IPA gold remains outstanding. |


## Ukrainian practical transcription — 2026-11-11 continuation

- Python and browser output are both post-IPA adapters; the browser imports the generated correspondence and rule tables rather than maintaining a separate linguistic mapping table.
- The browser adapter uses longest-match for explicit affricates, preserves word spaces, treats syllable dots as boundaries, and applies Ukrainian yotation to /j/ at the start of each IPA syllable.
- The target policy distinguishes /h, ɦ/ → г, /ɡ/ (ASCII /g/) → ґ as a project-specific choice, and /x/ → х. It maps explicit /t͡s, d͡z, t͡ʃ, d͡ʒ/ to ц, дз, ч, дж; /tɕ, dʑ/ are practical approximations. Plain adjacent consonants are not collapsed into affricates.
- Aspiration is marked with a project apostrophe; /ʔ/ is omitted from ordinary practical spelling but remains in IPA/trace. Tone and length are retained analytically, not converted to Ukrainian stress or vowel doubling.
- Unknown IPA withholds the complete Ukrainian string. Burmese parser structures not yet supported by phonological rules (medials, conjuncts, kinzi) are withheld in both Python and browser paths.
- PR #133 is the active practical-system PR; PR #132 was superseded after its browser test exposed fail-open handling. The exact-head test run [43095497303](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43095497303) is queued. No independent adjudicated lexical IPA gold set exists; empirical accuracy remains unmeasured.


## 2026-11-11 — Ukrainian practical adapter task update

| Task | Status | Evidence / acceptance |
|---|---|---|
| Add Python whole-IPA → Ukrainian adapter and integrate after deterministic IPA | DONE_VERIFIED | `src/burmese_ukrainian/practical.py`, `rule_engine.py`; previous Python suite 180 + 66 subtests |
| Generate browser mapping from canonical practical CSV/rule data | DONE_VERIFIED | `src/web/ukrainian-adapter.js`; previous build, generated-data freshness and Node tests passed |
| Map /h, ɦ/ → г, /ɡ/ → ґ (project choice), /x/ → х, /w/ → в, syllable-initial /j/ yotation, affricates → ц/дз/ч/дж | DONE_VERIFIED | Canonical practical table and tests; /ɡ/ → ґ is not claimed as universal orthographic norm |
| Preserve tone/length in IPA trace; join syllable-level Ukrainian output into one word | DONE_VERIFIED | Python engine output and regression tests |
| Browser fail-closed behavior for kinzi/medials/conjuncts | PARTIAL | Implemented; final Playwright run 43095883419 queued with no jobs |
| Final browser/Playwright acceptance | BLOCKED | Acceptance: current PR head completes all Chromium tests successfully |
| Independent empirical IPA/Ukrainian accuracy evaluation | BLOCKED | No independent text gold set yet; requires source provenance, dialect scope and adjudication |
| Audio validation | DEFERRED | Outside user-requested text-only scope |


### Exact-head verification refresh — 2026-11-11

- PR #133 is the authoritative continuation branch; its live head is recorded in GitHub PR metadata. The practical adapter code remains at `e9bd12819ed692d7be2607356008217de9430dca`; subsequent commits are documentation-only.
- Exact-head workflow [43095883419](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43095883419) is queued with no jobs started. Final browser/Playwright verification is therefore still PARTIAL/BLOCKED pending the run.
- No audio is required for this task. The remaining accuracy blocker is an independently sourced, text-only Yangon IPA/Ukrainian adjudication set; without it, accuracy remains unmeasured.


### Provisional onset fallback continuation — 2026-11-11

| Task | Status | Evidence / blocker |
|---|---|---|
| Python onset-only fallback for unresolved syllables | PARTIAL | RuleBasedBurmeseEngine now exposes separate provisional IPA/Ukrainian preview and trace; canonical fields remain withheld |
| Browser onset-only fallback | PARTIAL | Browser parser reuses onset IPA and target adapter; unresolved remainder receives ? |
| Python/browser parity | TODO | Add shared fixture with exact matching status, IPA hint, Ukrainian rendering and trace |
| Exact-head CI / Chromium | BLOCKED | No workflow run returned for head 36b6ebf5a1d5a03b0c4d7a95aae2d842046e4152 |
| Complete Yangon positional fallback registry | TODO | Evidence-gated; onset-only partial coverage is not a full grapheme fallback |


### Verification result — provisional onset preview, 2026-11-11

| Task | Status | Evidence / blocker |
|---|---|---|
| Python onset-only preview for isolated bare consonants | DONE_VERIFIED (engineering behavior) | Head aac1d6834b4c29e04f01477af1583a2be9eba485; 182 tests + 66 subtests passed |
| Browser preview in analysis details; canonical output unchanged | DONE_VERIFIED (engineering behavior) | Playwright 54/54; same workflow 43101914347 |
| Build, generated data and Node tests | DONE_VERIFIED | Workflow 43101914347 all pass |
| Optional Epitran raw-output comparator | DONE_VERIFIED (comparator only) | Workflow 43101914423 pass; not accuracy evidence |
| Functional Python/browser shared fixture | TODO | Still needs matching structured fallback output and trace across runtimes |
| Full positional Myanmar fallback inventory | BLOCKED by evidence | Requires exact Yangon-profile positional IPA sources for vowels, codas/asat, medials, kinzi, conjuncts and tone |


### Complete Myanmar grapheme accounting — 2026-11-12

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Unicode L/M input accounting across Myanmar blocks | Parser preserves each assigned letter/combining mark in U+1000–109F, U+A9E0–A9FF, U+AA60–AA7F, U+116D0–116FF; exact U+ code points retained in records | Exhaustive Python sweep added in PR #134; exact-head test workflow [43184645239](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43184645239) PASS | Not phonological evidence; no pronunciation gold inferred | DONE_VERIFIED (structural accounting only) | Keep unsupported Myanmar-language extensions explicit; build source-backed Yangon positional IPA inventory before expanding phonology |
| Complete Yangon-profile pronunciation/IPA for all letters and contexts | Only narrow onset/rime rules plus isolated bare-consonant provisional preview; context-dependent medials, vowels, codas, kinzi, conjuncts and tone remain unresolved | Existing parser/withholding tests plus the new exhaustive source-accounting sweep | Independent adjudicated Yangon-profile gold remains 0 | PARTIAL / BLOCKED | Require source-located onset × medial × vowel × coda × prosody evidence, shared Python/browser fixtures, independent annotation/adjudication and held-out accuracy evaluation |


### Burmese onset registry parity — 2026-11-12

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Provisional onset hint registry completeness | Python map now includes U+1009 `ဉ → ɲ`, matching the existing analysis-dependent CSV/browser registry | Exact-head workflow [43185426033](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43185426033) PASS: Python, generated-data freshness, Node and built Chromium | Not independent gold; this is registry parity only | DONE_VERIFIED for U+1009 hint | Add a shared structured Python/browser fixture for every provisional onset candidate |
| `ရ` candidate IPA parity | CSV/browser registry uses `r`; Python candidate map uses `ɹ`; both are analysis-dependent | Difference identified by source-table/code comparison; no adjudicating test should encode either as truth yet | None | PARTIAL / EVIDENCE-LIMITED | Resolve with source-located Yangon-profile phonetic evidence and record an explicit broad/narrow IPA policy before aligning |


## MLCTS → Ukrainian target matrix — 2026-11-12

- Branch `feat/burmese-romanization-ukrainian-matrix-completion-2026-11-12` adds explicit Ukrainian target candidates to all 35 onset rows and all 94 vendor-derived rime rows.
- `MYA-ROM-UA-TARGET-001` is DONE_VERIFIED on exact-head test run [43221074232](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221074232); the target mapping is a project orthographic convention. `MYA-ROM-UA-001` remains TODO because no runtime syllable adapter consumes the MLCTS string yet.
- `MYA-ROM-MATRIX-001` remains PARTIAL: the 94-rime source inventory is Mya2Rom-derived and not individually verified against the original MLC publication; medials, kinzi, asat, independent vowels, numerals, punctuation and legal syllable coverage are still incomplete.


## Post-merge mainline verification — MLCTS Ukrainian target matrix — 2026-11-12

- PR #138 merged as `1d7045d9695d571017633a2e294b718a13ee5bce`.
- Mainline test [43221871111](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221871111) and Pages deployment [43221870932](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43221870932) passed.
- `MYA-ROM-UA-TARGET-001` remains DONE_VERIFIED; the runtime adapter and full source orthographic inventory remain open as separately classified above.


## MLCTS romanization → Ukrainian runtime adapter — 2026-11-12

| ID | Status | Evidence / blocker |
|---|---|---|
| MYA-ROM-UA-TARGET-001 | DONE_VERIFIED | Existing 35 onset and 94 vendor-derived rime target rows are populated. |
| MYA-ROM-UA-001 | PARTIAL | PR #141 adds the runtime adapter and UI. Exact-head tests [43226578745](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226578745) and push [43226566617](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43226566617) pass: 187 Python tests + 66 subtests, 18 Node tests, 55 Playwright tests, build and generated-data freshness. Remaining: all legal syllable structures and primary MLC verification. |
| MYA-ROM-MATRIX-001 | PARTIAL | Runtime supports all current rime rows and onset combinations with supported y/r/w medials; unsupported structures remain visibly bracketed. Full orthographic inventory, kinzi/asat/devoicing and MLC primary-source adjudication remain open. |


Latest final exact-head verification after adding explicit withholding for Myanmar code points outside the romanization support inventory: [tests 43227199213](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227199213) SUCCESS on `4a2cb24ae9af2bc5e4d9341de65d0a55e07b6e09`: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness. Unsupported Myanmar code points are now explicitly bracketed in the Ukrainian romanization output.


## MLCTS Ukrainian runtime adapter — mainline post-merge verification — 2026-11-12

- PR [#141](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/141) merged as `3fa33864b774c716da5bf6c9778a963148fb9974`.
- Mainline tests [43227806284](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806284) and Pages deployment [43227806266](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43227806266) both SUCCESS.
- Mainline test evidence: 187 Python tests + 66 subtests, 19 Node tests, 55 Playwright browser tests, production build and generated-data freshness all passed.
- Acceptance remains PARTIAL: current Mya2Rom-derived rime inventory is EVIDENCE_LIMITED, and unrepresented legal syllable structures remain visibly unsupported rather than guessed.


## MLCTS → Ukrainian mainline status refresh — 2026-11-12

The earlier TODO row is superseded by the integrated runtime in PR #141. Current `main` is `718dc4b2c1424651b32bc63b0202f5d08a067bc7`; exact-main tests [43228612973](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612973) and Pages [43228612998](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43228612998) passed. Status is PARTIAL, not DONE: 35 onset and 94 vendor-rime targets are mapped, but the rime inventory is vendor-derived/EVIDENCE_LIMITED and legal structures outside the supported adapter inventory remain withheld. This is orthographic rendering, not IPA validation.


## Browser structural-analysis numbering correction — 2026-11-13

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Whitespace excluded from Myanmar syllable numbering while preserved in source reconstruction | DONE_VERIFIED | PR [#146](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/146), merged as `85dab8bdd08576c1cd112552f68092182bd9a8fa`. Regression for `ကာ မြန်မာ` asserts contiguous Myanmar syllable numbers `01`, `02`, `03`, retained separator, and unchanged fail-closed phonetic output. Exact merged-head test run [43318947338](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43318947338): 187 Python tests + 66 subtests, 19 Node tests, 56 Chromium Playwright tests, build and generated-data freshness all SUCCESS. |
| Yangon IPA coverage for medial-ra/rime in `မြန်` | PARTIAL | Still intentionally withheld: the current positional IPA rule inventory does not establish this combination. No grapheme-only guess was introduced. Acceptance: source-backed positional analysis and independent expert adjudication for the selected Yangon profile, followed by shared Python/browser fixtures. |

The initial regression run [43318664262](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43318664262) exposed an incorrectly escaped whitespace-detection regex; this was corrected before merge. The successful run above is on the final merged code head. Mainline Pages deployment [43319186954](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43319186954) was triggered after merge; deployment status is tracked separately and must not be inferred from the test result.


## Burmese medial and G2P evidence review — 2026-11-13

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Four medial signs as orthographic slots | DONE_VERIFIED as source registry | Unicode 18 Table 16-4 plus WG2 N2827; establishes orthographic identities/order, not IPA values. |
| YA/RA medial phonology | PARTIAL / ANALYSIS_DEPENDENT | Ishida 2026 describes /j/ default and velar-conditioned palatalization; Watkins 2001 describes secondary articulation in phonological /j,w/ clusters. Full onset × rime × prosody inventory and independent Yangon adjudication remain absent. |
| WA medial | PARTIAL / CONTEXT_DEPENDENT | /w/ glide and /ʊ/ vowel/rime alternatives documented; no complete environment table. |
| HA medial | PARTIAL / CONTEXT_DEPENDENT | Aspiration/devoicing and selected /ʃ/ fusion documented; no full onset-class inventory. |
| Multiple medials | PARTIAL | MLC 1986 orthographic inventory of eleven forms reported in WG2 N2827; no complete modern native/loan distribution or IPA gold. |
| Lexical IPA for မြန် | CANDIDATE / NOT GOLD | English Wiktionary lists /mjàɴ/ and a compound contains /mjàɴmà/. This supersedes “no lexical lead found” but does not approve a general rule or runtime output. |
| Shared runtime implementation | TODO | Browser has dormant candidate derivation behind an all-medials guard; Python adapter independently withholds medials/codas. Require shared fixtures and parity before enabling. |
| myG2P dictionary reuse | BLOCKED pending permission for commercial integration | CC BY-NC-SA 4.0; Myanmar README says commercial use is not granted without maintainer permission. |
| Oo et al. Thrax grammar reuse | BLOCKED pending license verification | Paper describes public GitHub grammar but does not specify its license. |
| Independent Yangon IPA gold | BLOCKED / NOT ESTABLISHED | No controlled speaker recordings, independent annotation or adjudication for target medial combinations. |

Detailed review: docs/research/BURMESE-MEDIALS-AND-G2P-EVIDENCE-REVIEW-2026-11-13.md. Evidence registry: data/burmese/medial_evidence_matrix.csv. Automated traceability: tests/test_medial_evidence_matrix.py.

The previous handoff statement that no word-level pronunciation lead was found for မြန် is superseded: a lexical IPA candidate is now documented. Runtime abstention remains unchanged until the candidate is independently validated and the phonemic-vs-phonetic output contract is fixed.


## Burmese medial/G2P research reconciliation — 2026-11-13 (expanded)

| Work item | Status | Evidence / acceptance |
|---|---|---|
| Eleven MLC medial forms | DONE_VERIFIED as orthographic inventory | Hlaing (2014) Table 5 lists four basic signs plus seven codepoint combinations; WG2 N2827 independently states eleven total. The thesis has a duplicated description typo on the final RA+WA+HA row; codepoints are authoritative. |
| YA/RA and glide onset | PARTIAL / ANALYSIS_DEPENDENT | Green (2002) gives /mj/ onset examples; Ishida 2026 and pinned Google Thrax describe /j/ behavior with onset-specific exceptions. No complete expert-adjudicated grapheme × onset matrix. |
| Nasal coda in မြန် | PARTIAL / CROSS-SOURCE CANDIDATE | Wiktionary /mjàɴ/, Google WFST raw output m j àɴ, and Green's /mj/ plus placeless /N/ model converge. Still no independent text-based expert adjudication; Green treats /N/ as vowel nasalization, not necessarily [ɴ]. |
| Google Thrax source/license | DONE_VERIFIED | Pinned grammar and repository LICENSE both Apache-2.0 at a90601024f07ab7e96c911243324e0adeb16da96. Run 43084508359 build/raw-output smoke succeeded, zero gold; optional comparator only. |
| Hlaing orthographic FST | DONE_VERIFIED as published structural baseline | 11,732 words / 32,283 syllables; initial 99.93% word-level syllabification; not G2P or IPA accuracy. |
| Burmese tone inventory | PARTIAL / COMPETING ANALYSES | Green and LREC 2020 describe four categories; Duan & Zhu (2025) propose eight tones across modal/lower registers; full empirical tables not independently reviewed here. |
| Open PR #129 | LEFT OPEN / NOT MERGED | Draft hybrid-engine research PR is 53 commits ahead and 17 behind current main, divergent and non-mergeable. Its source-backed Google FST and raw-output evidence were reused in this research report; the broad hybrid implementation was not ported or merged. |

Detailed evidence: docs/research/BURMESE-MEDIALS-AND-G2P-EVIDENCE-REVIEW-2026-11-13.md. New rows: data/burmese/medial_evidence_matrix.csv. Traceability tests: tests/test_medial_evidence_matrix.py.


### Cross-runtime coda segmentation correction — 2026-11-13

- Python previously split an asat-marked final consonant as a new syllable onset. For မြန်, it produced two structural records (မြ + န်), while the browser correctly kept မြန် as one syllable.
- Python segmentation now treats a base consonant followed by U+103A as a coda within the preceding syllable, and the parser records the final consonant and ASAT codepoint explicitly.
- Regression coverage: မြန် is one orthographic syllable; မြန်မာ is two; ကတ် retains final တ+ASAT. Browser tests lock the same visible syllable boundaries.
- Phonetic status is unchanged: medial/coda syllables remain withheld from IPA until source-backed phonological rules and parity fixtures are accepted.


### External raw-engine diagnostics — 2026-11-13

- Epitran 1.35.3 returned məjaɴ for the structural-only probe မြန်, while Google Thrax returned m j àɴ. Both runs had zero gold and null accuracy; the disagreement is unresolved.
- CRFsuite v2 returned 84/100 source-concordant predictions on a 100-row sample of myG2P v2.0. Medial-bearing sample counts: YA 10/14, RA 17/20, WA 13/15, HA 7/8 (overlapping categories). The exact word မြန် was not in the sample; training overlap is possible and the input syllable boundaries were supplied.
- These outputs are diagnostic only, not gold, not accuracy, and not approved runtime rules. The myG2P source dataset remains CC BY-NC-SA 4.0.


## Final exact-head verification — 2026-11-13

- Research branch head before this documentation reconciliation: 5eff1f3d052e775026ffff0fa0b3edd00512224d.
- Required workflow [43325991671](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991671) SUCCESS: independent IPA gold schema validation, Python tests, npm build, generated web-data freshness, Node tests, Chromium/Playwright built-site tests.
- Optional raw-output workflow [43325991496](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43325991496) SUCCESS: Epitran and CRFsuite diagnostics; artifacts are recorded with SHA-256 in the source registry.
- Exact final CI is engineering/provenance verification only. Gold remains zero and accuracy null.


### Nasal-coda evidence and IPA schema boundary — 2026-11-13

- Added Green-based phonotactic rows for placeless /N/ and nasal-rhyme tone restrictions. These are analysis-dependent source records, not active runtime rules.
- Clarified that the proposed Ukrainian /ɴ/ → нг rule applies only when the selected IPA convention explicitly emits /ɴ/; it must not be used automatically for abstract /N/ or nasalized-vowel realizations.
- The IPA gold schema preserves literal IPA, kind, syllable boundaries, tone, vowel length and phonation, but has no typed nasalization property. Literal IPA remains sufficient for transcription; a structured field is deferred until expert convention approval.


### UCSY-SC1 corpus lead — 2026-11-13

UCSY-SC1 is historical corpus metadata only and excluded from current text-only scope; rights details do not create an active task or blocker.


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


### Romanization/G2P boundary — 2026-11-13

The browser romanization adapter explicitly requests Mya2Rom MLCTS, which the upstream README defines as orthographic. MLCTS2 is a more phonetic romanization but not standardized IPA. The Latin→Ukrainian crosswalk remains a separate orthographic mode and must not be used as a G2P/IPA oracle.


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
- UCSY-SC1 remains historical metadata only; it is excluded from active text-only research.
- Release assessment: PARTIAL PROTOTYPE, not linguistically release-ready. The research dossier is ready for specialist review and data-rights resolution.

### Text-only source research continuation — 2026-11-13

| Task | Status | Evidence / acceptance boundary |
|---|---|---|
| Register Myanglish text candidate | PARTIAL | MYX_MYANGLISH_2026 and CLM-MYX-MYANGLISH-001 registered. 2,121 text pairs; informal non-standard romanization, predominantly one author's style; viewer/README field-count discrepancy (3 vs 2); CC BY-SA 4.0 declared. Do not use as IPA gold. Acceptance: inspect pinned raw CSV, reconcile all columns, sample and manually adjudicate text-only correspondences, document attribution/share-alike compatibility. |
| Register orthographic correction corpus | PARTIAL | MYX_ORTHO_2026 and CLM-MYX-ORTHO-001 registered. 4,800 rows; orthographic noisy-to-clean data; "phonetic" refers to confusion class, not IPA. Acceptance: inspect row quality and identify any actual medial examples before considering regression fixtures. |
| Assess John Okell text corpus | BLOCKED | OKELL_TEXT_2018 registered. Zenodo has 8.8 MB text file and blank Rights/License field; ELG catalogue lists CC BY 4.0. Acceptance: obtain direct rights clarification or corrected Zenodo/DataCite metadata before copying or redistributing. |
| Enforce text-only continuation scope | DONE_VERIFIED (documentation) | Corpus triage, research report, master matrix and handoff now explicitly exclude audio acquisition, processing and annotation. Existing SLR80/UCSY-SC1 entries remain historical metadata only. |

No corpus rows or pronunciation labels were imported. No runtime G2P rule was enabled. Independent expert-adjudicated IPA gold remains 0; empirical accuracy remains null. This source review does not change release status: **PARTIAL PROTOTYPE**.

### Historical medial-analysis reconciliation — 2026-11-13

- Added STEDT Monograph 3 (1996), pp.61-66, to the source and claim registries. It preserves one Written Burmese analysis (Benedict 1976, with Matisoff's additional notes) and two distinct Rangoon profiles (Burling 1967; Roop 1972).
- Written Burmese entry: /-w-/ is assigned to the rhyme; /-y-/ and /-r-/ to initial clusters. Rangoon entries list /-y-/ and /-w-/ with source-specific restrictions; Roop describes /r/ only in borrowings.
- Added two source-specific evidence-matrix entries, two evidence-only phonological-rule records and regression checks. Both remain WITHHELD and do not map directly to U+103B/U+103C/U+103D or authorize runtime output.
- Acceptance blocker: reconcile the underlying historical notation with modern Unicode spellings and the intended current Yangon profile using further written primary sources; retain the three source profiles separately.
- STEDT volume copyright is All Rights Reserved; only factual claims and locators are registered, no tables or source data copied.

### Written Burmese periodization and historical medial changes — 2026-11-13

- Registered Nishi (1997), *The Orthographic Standardization of Burmese*, and Matisoff (2003), *Handbook of Proto-Tibeto-Burman*.
- Nishi distinguishes OWB, MWB, EModWB and ModWB; records the replacement of OWB -l- by MWB -r-/-v- and later insertion of -y- after k-/kh- before written -i. He explicitly separates written H and spoken L phonological systems.
- Matisoff records WB *-r- > Modern Burmese -y- and warns that Written Burmese does not reliably preserve distinctions among proto-medials *-r-, *-l- and *-y-; orthographic shifts and exceptions are documented.
- Added two evidence-matrix entries, two evidence-only rules and regression tests. Both entries remain WITHHELD; no current Unicode-to-IPA or runtime rule is inferred.
- Acceptance criterion: reconcile Nishi's full 1976 "Medials in Burmese" treatment, historical inscriptional spellings, later written standards, and modern standard Yangon phonology using source-specific profiles and specialist review.

### Contextual voicing sandhi — 2026-11-13

- Registered Nishi (1998), *The Development of Voicing Rules in Standard Burmese* (DOI 10.15021/00004129), with three documentary claims.
- Added two source-linked evidence-only rule records: atonic C1aC2 voicing and voicing after non-stop tonal rhymes in close juncture.
- The paper reports substantial variation and exceptions and warns that Standard Burmese is not a well-defined variety. Regional dialects differ in rule presence.
- Both rules remain analysis-dependent and are not enabled globally. Acceptance requires a selected runtime profile, lexical/context coverage, written-source cross-checks and tests for optionality/exceptions. No audio evidence is part of the acceptance path.



- **Hill (2019) chapter 2** — BLOCKED / ACCESS. Cambridge confirms the Burmese historical-phonology chapter (pp.46-83), but only a short §44 preview was accessible. No medial-specific claim has been made. Acceptance: authorized full text, exact page locators and source-specific reconciliation before adding evidence.

### Exact-head verification checkpoint — 2026-11-13

| Check | Status | Evidence |
|---|---|---|
| Independent IPA gold structure validation | DONE_VERIFIED | CI run 43389272448, exact tested head 4145126ec65b834df96fc7ed57749a719daa27c2 |
| Python tests | DONE_VERIFIED | 206 passed + 66 subtests passed |
| npm build and generated-data freshness | DONE_VERIFIED | Both successful in run 43389272448 |
| Node tests | DONE_VERIFIED | 20 passed, 0 failed |
| Playwright/Chromium browser tests | DONE_VERIFIED | 58 passed |
| Optional Epitran/CRF diagnostics | DONE_VERIFIED (diagnostic only) | Run 43389279081; CRF 100/100 outputs, 84 source-concordant, 0 gold, accuracy null, possible training overlap; Epitran raw artifact only |
| Source registry integrity | DONE_VERIFIED | 51 sources, 55 claims, 28 medial rows, 19 phonological rules; no CSV width, duplicate-ID or traceability errors |
| Text-only scope | DONE_VERIFIED (documentation) | Handoff, corpus triage, completion register and source registry mark legacy non-text corpus records as excluded/deferred; no audio work |

The successful CI applies to exact head 4145126ec65b834df96fc7ed57749a719daa27c2. This checkpoint is documentation-only; any subsequent commit requires its own exact-head verification. Release status remains PARTIAL PROTOTYPE because independent text-adjudicated IPA gold is 0 and empirical accuracy is null.

### Green 2005 and SEAlang text-source gates — 2026-11-13

- Registered Green (2005), “Word, foot and syllable structure in Burmese”, an online CC BY-SA 4.0 source with broad IPA-style spoken transcription and separate ALA-LC orthographic transliteration. Added source-linked claims for CG onsets, major/minor syllables and /N/ nasalization. One medial evidence row and three evidence-only rules added; all remain WITHHELD/analysis-dependent.
- Registered SEAlang dictionary, Burmese Text Corpus and Burmese Bitext Corpus as text-only candidates. Dictionary transcription semantics are unresolved (IPA search/display metadata vs MLCTS2 documentation); corpora lack explicit reuse licenses. No rows imported.
- Acceptance: inspect SEAlang entries through an accessible interface, resolve the transcription encoding, obtain rights for any bulk extraction, and validate actual row schema. Green's phonological facts do not directly map Unicode medials.

### Final exact-head verification — 2026-11-13

| Area | Status | Evidence |
|---|---|---|
| Python + subtests | DONE_VERIFIED | 209 passed + 66 subtests, CI 43390071180 |
| IPA gold schema | DONE_VERIFIED | Independent structure validation passed; gold corpus remains header-only / 0 entries |
| Build and generated-data freshness | DONE_VERIFIED | npm run build and generated-data freshness check passed |
| Node tests | DONE_VERIFIED | 20 passed, 0 failed |
| Browser tests | DONE_VERIFIED | 58 Playwright/Chromium tests passed |
| Optional diagnostics | DONE_VERIFIED (not accuracy evidence) | CI 43390071177; CRF 100 predictions, 84 source-concordant, gold 0, accuracy null; Epitran raw artifact only |
| Registry integrity | DONE_VERIFIED | 55 sources, 62 claims, 29 medial rows, 22 phonological rules; no schema-width, duplicate-ID or traceability errors |
| Text-only scope | DONE_VERIFIED (documentation) | Legacy non-text records are historical-only and deferred; no audio work or data import |

Exact tested head: d2800ce458ea3c08c3fecb9e61ad170502837343. PR #147 remains Draft and is not release-ready. Linguistic gold=0 and empirical accuracy=null; classification remains PARTIAL PROTOTYPE.

### Final PR-head check — 2026-11-13

- PR #147 head 18b42a7415d3323220d09c0aacf2a17a3c6ff07d, 92 commits ahead of main / 0 behind, 25 files; OPEN / DRAFT / mergeable. No submitted reviews. PR #129 remains untouched.
- Exact-head run 43390340513: SUCCESS (209 Python + 66 subtests, IPA gold structure, build, generated-data freshness, 20 Node, 58 Playwright).
- Optional diagnostics run 43390071177: SUCCESS; CRF 100 predictions / 84 source-concordant / 0 gold / null accuracy / possible training overlap; Epitran raw-output artifact only.
- Registry integrity: 55 sources, 62 claims, 29 medial rows, 22 phonological rules; no CSV width, duplicate-ID or traceability issues.
- Text-only scope remains enforced; no audio, no corpus imports, no runtime rules promoted. Release status: PARTIAL PROTOTYPE.

### Nishi full-text and text-only corpus continuation — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Nishi (1998) Old Burmese historical medial analysis | DONE_VERIFIED (source evidence) | Full text inspected; source NISHI1998_OLDBURMESE; four claims/rules and 13 new medial/dialect rows; all historical rows WITHHELD from runtime. |
| Nishi (1998) voicing examples | DONE_VERIFIED (source phonemic, not IPA) | Seven examples in data/burmese/sandhi_evidence.csv; source transcription convention explicit; ipa_value empty; regression tests. |
| Myanglish corpus | PARTIAL / SCHEMA UNCERTAIN | Raw CSV has 2 columns, metadata/viewer expose third official_standard feature; informal romanization only, not IPA. |
| myX orthography corpus | PARTIAL / QUARANTINED_FOR_QUALITY_REVIEW | Sample target_words misalignment, multiple simultaneous substitutions and templated duplicates; permission confirmed, quality review required. |
| John Okell text corpus | BLOCKED / TOOL ACCESS | Research/ingestion permission confirmed by project owner; 8.8 MB file not retrievable in this execution environment. |
| SEAlang text and dictionary | BLOCKED / TOOL ACCESS + SCHEMA | Permission confirmed; direct entry/corpus retrieval unavailable; dictionary IPA vs MLCTS2 representation unresolved. |
| Hill (2019) chapter 2 | BLOCKED / TOOL ACCESS | Permission confirmed; only publisher excerpt for introduction/Tibetan chapter accessible, not Burmese chapter. |
| Text-only authorization | DONE_VERIFIED (project owner confirmation) | Research-use and project-ingestion permission confirmed for textual resources; no audio in scope. |

### Exact code/data-head verification — 2026-11-13

- Tested head: 4835a0abc3e7e4a18c9d0bda35f554031912d570.
- GitHub Actions run 43393402710: SUCCESS — 217 Python tests + 66 subtests; independent IPA-gold structure validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests.
- Earlier runs 43393310910 and 43393302505 failed only on a case-sensitive assertion expecting lower-case “historical merger only”; corrected to match the stored capitalized scope. Exact corrected-head run above passed.
- Registry integrity: 55 sources, 71 claims, 42 medial evidence rows, 28 phonological rules, 7 source-phonemic sandhi examples. Manual CSV parser verified row widths and all source/claim/rule/matrix links; no duplicate IDs or broken traceability.
- Independent expert-adjudicated IPA gold remains 0; empirical IPA accuracy remains null. No runtime medial/voicing rule promoted. Classification remains PARTIAL PROTOTYPE.

### Final exact-head verification — 2026-11-13 (supersedes earlier snapshots)

- Final tested head: c03706474cf67b480c449790c9592e5fe0e53fd4.
- Main CI run 43394274053: SUCCESS — 217 Python tests + 66 subtests; independent IPA-gold schema validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests.
- Optional diagnostics run 43394274111: SUCCESS — CRF 100 predictions / 84 source-concordant / gold_count 0 / accuracy null / NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran raw-output artifact only.
- Final registry counts: 56 sources, 71 claims, 42 medial evidence rows, 28 phonological rules, 7 source-phonemic sandhi examples. Manual CSV integrity check found no malformed widths, duplicate IDs or broken source/claim/rule/matrix references.
- Nishi (1976) Medials in Burmese is registered as a primary-source target, but its full text was not retrieved. Nishi (1998) Old Burmese is a separate full-text source and only a secondary summary of Nishi 1976.
- Project owner confirms text-only research and project-ingestion permissions. No audio used. External corpus access/schema and quality gates remain.
- PR #147 OPEN / DRAFT / mergeable, 135 commits ahead, 0 behind, 28 files. PR #129 untouched.
- Gold remains 0; accuracy remains null; no runtime medial or voicing rule promoted. Repository remains PARTIAL PROTOTYPE.


### Okell (1995) dialect evidence — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Okell (1995) WB/SB and regional medial profiles | DONE_VERIFIED (source evidence) | Full text; AR preserves WB r/y, SB merges; IT/TV have medial /l/ absent in SB; three matrix rows, seven claims, two dialect rules and regression tests. |
| Modern Yangon medial profile | PARTIAL / EVIDENCE-LIMITED | Do not infer from Arakanese, Intha, Tavoyan or historical OWB; requires current Yangon-specific text evidence and independently adjudicated examples. |
| Okell transcription convention | DONE_VERIFIED (source scope) | Texts are phonemic with limited allophonic approximations; not project IPA gold. No audio accessed. |


| Okell (1969) Reference Grammar | BLOCKED / TOOL ACCESS | Bibliographically verified; cited for Standard/Colloquial Burmese phonology and voicing sandhi, but full text unavailable in this execution. Permission confirmed; exact section/page evidence still required. |


### Consolidated text-only research snapshot — 2026-11-13

- Exact tested code/data head: 2a96f4121a43f704a8f0d2eb6d81cb343fba47db.
- Main CI 43395906072 SUCCESS: 219 Python tests + 66 subtests; IPA-gold structure validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests.
- Optional diagnostic 43395906100 SUCCESS: CRF 100 predictions, 84 source-concordant, gold_count=0, accuracy=null, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran raw-output artifact only.
- Registries: 58 sources, 78 claims, 45 medial evidence rows, 30 phonological rules, 7 source-phonemic sandhi examples. Manual CSV validation found no malformed widths, duplicate IDs or broken references.
- Okell (1995) dialect profiles and Nishi (1998) historical medials are source-evidenced and tested; all remain withheld from runtime. Okell (1969) and Nishi (1976) are registered full-text targets, not yet retrieved.
- Owner confirms text-only research and project-ingestion permissions. No audio used. Okell/SEAlang/Okell1969/Nishi1976/Hill retrieval and corpus schema/quality gates remain.
- PR #147 OPEN / DRAFT / mergeable, 0 commits behind main and 28 files; current ahead count is tracked on the PR; PR #129 untouched.
- IPA gold remains 0, accuracy null, no runtime rules promoted. Status PARTIAL PROTOTYPE.


### Final text-only evidence snapshot — 2026-11-13

- Exact tested code/data head: cda73ccb7fa80a0404fed5a65588ebd690253f94.
- Main CI run 43397172081 SUCCESS: 220 Python tests + 66 subtests; independent IPA-gold structure validation; npm build; generated-data freshness; 20 Node tests; 58 Playwright/Chromium tests.
- Optional diagnostics run 43397181331 SUCCESS: CRF 100 predictions, 84 source-concordant, gold_count=0, accuracy=null, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran 1.35.3 raw-output artifact only.
- Final registries at the 2026-11-13 continuation: 59 sources, 83 claims, 45 medial evidence rows, 30 phonological rules, 7 source-phonemic sandhi examples, 9 orthographic-only Okell corpus profile rows. Manual CSV validation found no malformed widths, duplicate IDs or broken references.
- Okell (1995) dialect profiles and Nishi (1998) historical medials are source-evidenced/tested; all remain withheld from runtime. SEAlang 2008 confirms IPA query/display at interface level, but internal storage remains unresolved against Mya2Rom MLCTS2. Okell (1969) and Nishi (1976) remain registered but unread full-text targets.
- Project owner confirms text-only research and project-ingestion permissions. No audio used. Corpus byte access, internal SEAlang schema, Myanglish metadata reconciliation and myX quality remain gates.
- PR #147 remains OPEN / DRAFT / mergeable, 0 commits behind main, 28 files. Current ahead count is tracked on the PR.
- IPA gold remains 0, accuracy null, no runtime rules promoted. Status PARTIAL PROTOTYPE.


### Okell text corpus — access status correction (2026-11-13)

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Okell *A Corpus of Modern Burmese* content access | PARTIAL / CONTENT AND BYTE INTEGRITY VERIFIED | Zenodo direct file endpoint HTTP 200, text/plain UTF-8; provider MD5 f020d7bbcf9857631094a8861143d18f matched; 8,809,265 bytes; SHA-256 6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c; 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment), 67 numbered heading lines, valid UTF-8, Myanmar Unicode, Burmese/English mixed content, dialogue/speech transcripts and prose. |
| Okell corpus integrity and quality | PARTIAL / TEXT_QUALITY_AUDIT_PENDING | Byte identity is verified (Zenodo MD5 match; SHA-256 6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c); 21 BOM markers, one NUL, non-NFC, 295 repeated nonblank line forms / 1,008 excess occurrences and 23 repeated paragraph forms profiled. Acceptance: map embedded boundaries to original documents, classify repeated passages, inspect corruption/NUL without altering source, document segment provenance. |
| Okell corpus as IPA/G2P gold | DEFERRED / NOT GOLD | No IPA annotation schema or independently adjudicated IPA values identified. Do not import as IPA gold or score predictions against it. |

No corpus rows were imported and no audio was accessed or used. This correction supersedes prior BLOCKED_TOOL_ACCESS classification; SEAlang entry/schema access remains separately unresolved.


### Okell corpus structure and duplicate-line profile — 2026-11-13

| Work item | Status | Evidence / acceptance boundary |
|---|---|---|
| Byte/Unicode integrity | DONE_VERIFIED (retrieved-byte profile) | Zenodo MD5 matched; SHA-256 6bbafd699c587876317f6e0535b9dd8f9ec87c15efe4b7e65a8c7362ebcdbf4c; 8,809,265 bytes; valid UTF-8; 19,565 CRLF-terminated lines (19,566 split segments including the final empty segment); 21 BOM markers; one NUL; non-NFC; zero U+FFFD. |
| Structural/duplicate profile | PARTIAL | 67 numbered heading lines; 295 repeated nonblank line forms / 1,008 excess occurrences; 23 repeated paragraph forms. Repeated poem/title/header/divider lines mean these are not duplicate-document counts. |
| Provenance and text quality | TODO | Map embedded BOM/title boundaries to original documents; inspect line 9,300 NUL and localized glyph corruption; classify duplicate passages and source provenance before any extraction. |

No deduplication or normalization was applied to the source copy; no audio or IPA gold was used.


### Okell corpus orthographic-only profile — 2026-11-13

| Metric | Count | Status |
|---|---:|---|
| U+103B | 50,072 | ORTHOGRAPHIC_ONLY |
| U+103C | 73,107 | ORTHOGRAPHIC_ONLY |
| U+103D | 49,248 | ORTHOGRAPHIC_ONLY |
| U+103E | 50,869 | ORTHOGRAPHIC_ONLY |
| `မြန်` substring | 659 | ORTHOGRAPHIC_ONLY |
| `မြန်မာ` substring | 288 | ORTHOGRAPHIC_ONLY |

Full profile: `data/burmese/okell_text_corpus_orthographic_profile.csv`. These are raw codepoint/substring counts, not token or phonological frequencies; no IPA or runtime rule follows from them.


## Final exact-head verification — 2026-11-13

Final branch head `601cf85a5c740627848f9eff1fa1f0911cf03796` on `research/burmese-medials-g2p-evidence-2026-11-13`, based on unchanged main `dc90463bdd734867308f03cb627eb8941efc19d6`. PR #147 is open/draft/mergeable, 195 commits ahead and 0 behind, 29 files. PR #129 is open/draft and untouched, diverged 53 ahead / 17 behind and non-mergeable.

Exact-head CI: `43449980180` and `43449989336` SUCCESS — 222 Python tests + 66 subtests; IPA schema validator ran with zero gold records; npm build and generated-data freshness passed; 20 Node and 58 Playwright/Chromium tests passed. Optional diagnostics `43449989348` SUCCESS — CRF 100 predictions, 84 source-concordant, 0 gold, null accuracy, NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran raw output only. No audio, no runtime medial rules, no merge/release.

The Okell corpus byte identity and orthographic-only profile are now documented in the root handoff and research review. Final assessment remains PARTIAL PROTOTYPE, not release-ready.


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
| 94 MLCTS rime vendor audit | PARTIAL / PRIMARY-SOURCE EVIDENCE GATE | 94/94 keys and MLCTS column values match vendored Mya2Rom 0.4.4; 25 collision groups are machine-readable. Original MLC primary tables and word-level adjudication remain unverified; all Ukrainian candidates remain PROPOSED/EVIDENCE_LIMITED. |

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


## MLCTS collision lexical cross-check — 2026-11-13

| Task | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| 25-group collision evidence ledger | PARTIAL — SECONDARY EVIDENCE LEDGER COMPLETE | 25 rows preserved; 0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime. Source registry 80 sources / 164 claims. | All evidence remains secondary; primary MLC table and independent Yangon IPA adjudication are still required. No runtime or Ukrainian promotion. |
| am / မ်;ံ comparison | PARTIAL — SECONDARY TABLE MATCH | Wiktionary's comparative rhyme table gives ကမ် and ကံ the same /kàɴ/ and MLCTS kam in the က-onset examples. | Do not generalize to all words or claim MLC dictionary headword attestation. |
| any / ဉ်;ည် comparison | BLOCKED — SOURCE CONFLICT | Wiktionary's table distinguishes ကဉ် (kañ‘; /kɪ̀ɴ/) and ကည် (kany; /kì/, /kè/, /kɛ̀/), while Mya2Rom maps both isolated keys to any. | Primary MLC table/entry verification is required before correcting vendor data. |
| Other 22 collision groups | TODO — LEXICAL EVIDENCE | No direct primary-source lexeme pairs checked. | Record MLC dictionary headword, exact page/entry locator, source spelling, IPA/MLCTS fields and contextual analysis for representative examples in each group. |
| Special u. / ့;ု group | PARTIAL — CONTEXT-DEPENDENT | ့ is an auk-myit-induced vendor fallback, not an ordinary independent rime. | Exclude it from ordinary lexical equivalence decisions; analyze its syllabic context separately. |

Registry integrity on this continuation: 62 source records, 114 claim records; 25 collision groups; 25 lexical-audit rows. CSV parsing confirms consistent widths, unique source/claim IDs, and no broken claim-to-source references. New Python regression coverage is committed; exact-head CI run 43491503349 was still in progress at the time of this matrix update. No local test execution is claimed. No runtime or Ukrainian candidate changes; no audio used.


## Nasal-final secondary-source reconciliation — 2026-11-13

- Added Wikipedia's MLC-system overview as a secondary source and registered claim CLM-WIKI-MLCTS-NASAL-FINALS-001. It lists shared -any, -am and -um spellings for the paired finals.
- Reclassified the am and um groups as SECONDARY_SYSTEM_EQUIVALENCE (supported by both secondary tables), and any as SECONDARY_SOURCE_CONFLICT (Wiktionary detailed table vs Wikipedia's MLC summary vs vendor). No primary MLC adjudication is claimed.
- Lexical ledger now has 21 unadjudicated, 2 secondary-equivalence, 1 secondary-conflict and 1 special non-rime group. Totals: 63 sources / 115 claims. No runtime or Ukrainian candidate changes. CI on the preceding head was still in progress; final exact-head verification pending.


## Exact-head CI result — 2026-11-13

- Code/data head: 46b7da6afd7ecc94e4dcac87c7f759132c74bc6b.
- Required workflow run 43491799213: SUCCESS. Python 229 passed + 66 subtests passed; Node 20 passed / 0 failed; Playwright 58 passed. Gold validator executed and correctly returned NOT_READY_NO_ADJUDICATED_GOLD. npm install, production build, generated-data freshness, Chromium install and browser suite all passed.
- npm install still reports 1 high-severity dependency vulnerability; no forced dependency upgrade applied.
- Optional diagnostics run 43491799196: SUCCESS (raw-output and CRF diagnostic jobs). These are raw diagnostic artifacts only, not an IPA accuracy benchmark; independent adjudicated IPA gold remains 0.
- Final linguistic status remains PARTIAL PROTOTYPE. No runtime rule or Ukrainian candidate promoted.



## MLCTS primary-source provenance check — 2026-11-13

- Added **OHNMAR_HTUN_2013**, the Nagaoka University of Technology doctoral dissertation *Development of Cross-Lingual Phonetic Similarity Metrics*. Its §5.1.2.3 (p.80) labels MLCTS as the 1980 Myanmar Language Commission system and gives three sample romanizations. Crucially, its bibliography entry [47] (p.122) cites the Wikipedia MLC Transcription System page, accessed 2012-10-12, rather than identifying or reproducing an MLC primary publication. This is a secondary provenance trail, not independent confirmation of the full 1980 table.
- Added **ALA_LC_BURMESE_2011**, the Library of Congress *Burmese Romanization Table* (2011). It is an ALA-LC table, not MLCTS; keep its forms separate and do not use it to adjudicate MLCTS collision rows.
- New claims: CLM-MLCTS-SECONDARY-PROVENANCE-001 and CLM-ALA-LC-NOT-MLCTS-001. Registry totals: **66 nonblank source records / 118 claims**.
- This search did not recover the primary MLC 1980 specification or primary word-level dictionary entries. The MLC-primary-source task remains **BLOCKED / EVIDENCE GATE**; acceptance remains direct inspection of the actual MLC tables and properly located dictionary entries, with the transcription field distinguished as MLCTS vs MLCTS2.
- No vendor mapping, runtime rule, IPA gold label or Ukrainian candidate changed. No audio accessed.

## Registry count reconciliation — 2026-11-13

A fresh parse of the current CSV registries, counting only nonblank source rows and requiring unique IDs, finds **66 source records and 117 claim records**. The previous continuation note's 65-source count was one too low; the current source registry contains 66 nonblank IDs. Two pre-existing blank CSV records in `sources.csv` are ignored for this count. All 117 claim IDs are unique and every claim's `source_id` resolves to a registered source. The two new provenance records and claims are included in these totals.

A regression test now protects the distinction between the Htun secondary provenance trail and the LOC ALA-LC table. Test/CI status for the final code-bearing commit is pending verification; no local checkout was available in this connector session.

## MLC dictionary bibliographic cross-check — 2026-11-13

- Added **UNICODE_REFERENCE_LISTS_2022** and claim **CLM-MLC-DICT-BIB-UNICODE-001**. The Unicode Consortium's *Other Script Sources* bibliography lists the Myanmar-English Dictionary as a 1993 work compiled and edited by the Myanmar Language Commission, and a 1996 Myanmar orthography treatise (PDF lines 681–690).
- This independently strengthens the bibliographic locator for MLC primary material, but the Unicode bibliography does not reproduce dictionary entries or MLCTS/MLCTS2 tables. It therefore does not clear the primary-source evidence gate.
- Added regression assertions for the new bibliography record and its narrow evidential scope. No linguistic mapping was changed.
- Registry totals after this addition: **66 nonblank source records / 118 claims**.

## Final verification boundary for this continuation — 2026-11-13

- Registry parse on the current branch: **66 nonblank source records / 118 claim records**; all IDs unique, all row widths conform to their CSV headers, and every claim source reference resolves. Two blank CSV records are ignored by the count.
- The provenance regression test was added to `tests/test_romanization_rime_inventory.py`. The GitHub connector exposed no workflow runs and no commit status checks for final code/documentation head `caf66d5a6b58522ca33715654c38b075c1d1fc21`; therefore this latest test change is **NOT YET CI-VERIFIED**. Earlier successful CI on prior code/data head `46b7da6afd7ecc94e4dcac87c7f759132c74bc6b` does not cover this added test.
- No local checkout or local Python test execution was available. Do not claim the new test passed.

## MLC dictionary physical-access leads — 2026-11-13

- Added **WHO_MLC1993_DICT_CATALOG**: WHO Myanmar Library record 487 identifies the 1993 MLC dictionary (635 pages) and lists a physical copy as available at WHO Myanmar.
- Added **NDL_MLC1996_DICT_CATALOG**: National Diet Library record 000003254368 identifies the 1996 Dunwoody Press reprint (xxiii, 635, iii pages), call number KL42-A3, with Tokyo Main and Kansai-kan holdings and one cooperating Japanese library holding.
- New claims: CLM-MLC-DICT-1993-PHYSICAL-HOLDING-001 and CLM-MLC-DICT-1996-NDL-HOLDING-001. Registry totals: **68 nonblank source records / 120 claims**.
- These are concrete acquisition/consultation leads, not evidence from the book's contents. WHO and NDL catalogue records do not provide the MLCTS table or word-level entries. The MLC-primary-source acceptance gate remains blocked until the physical/authorized text is inspected and the transcription field is distinguished as MLCTS vs MLCTS2.
- Regression assertions now cover both catalogue records and explicitly preserve their access-only scope. No linguistic mapping or runtime behaviour changed.

## MLC dictionary transcription-purpose evidence — 2026-11-13

- Added **BURMA_DEBATE_1996_MLC_DICT_NOTICE** and claim **CLM-MLC-DICT-PRON-GUIDE-001**. A contemporaneous notice for the Dunwoody Press reprint says the dictionary uses a transcription system as an aid to pronunciation for English speakers and contains nearly 35,000 entries (Burma Debate, Nov/Dec 1996, p.40).
- This is a useful clue about the dictionary field's purpose, but it does not name the system. It cannot establish MLCTS2, nor can it substitute for inspecting the dictionary's own front matter and entries.
- Registry totals: **69 nonblank source records / 121 claims**. Regression assertions preserve the ambiguity explicitly. No mapping or runtime change.

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

## MLCTS vs modified-column collision crosswalk — 2026-11-13

- Added **MOW_2017_MLCTS_VARIANTS** and claim **CLM-MOW-MLCTS2-VARIANTS-001**. MOW's own project page says v0.1.2 added romanized variants searchable via both MLCTS and “MLCTS 2”, explicitly describing the latter as the version used in the MLC Myanmar-English Dictionary; MOW v0.1.3 is a CC BY 4.0 downloadable semantic wordnet. This is corroboration of the distinction and a lexical-resource lead, not an MLC primary specification.
- Audited the actual Mya2Rom v0.4.4 third array column for all 25 MLCTS collision groups and added `data/burmese/romanization_rime_mlcts2_crosswalk.csv`. Results: **21 groups retain identical third-column output; 4 groups differ**: `any` (ဉ်/ည်: `in/i`), `any:` (ဉ်း/ည်း: `in:/i:`), `any.` (ဉ့်/ည့်: `in./i.`), and `ui` (ို်/ို: `ai'/ou`). The vendor's IPA column also differs for these four pairs. This shows the modified column is more discriminating for these particular source-unit pairs; it does not establish primary MLC lexical correctness or independent IPA gold.
- Important naming detail: Mya2Rom v0.4.4 README/API calls the third column `mlcts2`; `mya2rom.js` maps that mode to array index 2; the `romanisations.js` header labels the same column **MLCTS-SL** and describes it as the SEAlang/MLC dictionary modification. Added claim **CLM-MYA2ROM-COLUMN3-NAMING-001** to record this internal nomenclature discrepancy; no evidence of two separate columns in this version.
- Added exact-source regression coverage that derives all 25 crosswalk rows from the vendored array and guards the four distinct groups, special `့` fallback, and non-primary evidence boundary.
- Registry totals after additions: **70 nonblank source records / 123 claims**. No runtime mapping, IPA gold label or Ukrainian candidate changed. All 94 Ukrainian candidates remain PROPOSED / EVIDENCE_LIMITED.

## Earlier MLC Concise Burmese Dictionary access lead — 2026-11-13

- Added **ALLOTT1985_BURMA_LANGUAGE_POLICY** and **OKELL1982_BURMESE_DICTIONARY_REVIEW** with claims **CLM-MLC-CONCISE-DICT-1978-80-001** and **CLM-MLC-CONCISE-DICT-BIB-001**.
- Allott's 1985 chapter (p.145) reports that the MLC Concise Burmese Dictionary was published in five parts from late 1978 through 1980, standardized the official orthography of its entries, and supplied pronunciations. Okell's 1982 bibliography independently lists it as five volumes, Rangoon, Mranmācā Aphwai.
- This identifies a potentially earlier MLC primary lexicon with pronunciation information. Neither secondary source reproduces the dictionary's pronunciation key, any romanization table, or the relevant lexical entries. It is not yet established that this dictionary uses MLCTS/MLCTS2; inspect the front matter and representative entries before claiming that.
- Registry totals: **72 nonblank source records / 125 claims**. New regression assertions preserve the secondary-only status.

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

## MOW lexical word-form coverage for collision endings — 2026-11-13

- Retrieved the official MOW 0.1.3 release TSV from `myanmaropenwordnet/mow`; upstream blob SHA `0c97fc4e98b3827dae0bc667858993037496ca58`. The release header and repository README state CC BY 4.0. It contains 1,476 `mya:lemma` rows and 1,041 distinct Burmese lemma strings.
- Added `data/burmese/mow_rime_orthographic_coverage.csv` (50 source-unit rows) and `data/burmese/mow_rime_orthographic_matches.csv` (508 exact source-unit/lemma pairs). The matching operation is strictly Unicode string `endsWith(source_unit)`; it does not syllabify, identify lexical rimes, or provide pronunciations.
- The 508 pairs cover 442 distinct lemma strings and 547 synsets; 35/50 source-unit variants occur at least once. Both variants of 11/25 collision groups occur in MOW (`a`, `a:`, `am`, `am:`, `am.`, `any`, `any:`, `au`, `auk`, `aung:`, `u.`); only one side occurs for 13/25 groups; neither side occurs for `um.` in this small resource.
- These are lexical orthographic search leads only. They do not adjudicate the MLCTS collision, prove that two spellings are homophonous, or establish source-language phonology. Absence from this limited wordnet is not evidence that a form does not exist. The 21 collision groups remain unadjudicated; the prior two secondary equivalence groups, one secondary conflict and one special non-rime remain unchanged.
- Reused the canonical reproducible generator `scripts/analyze_mow_orthographic_rime_coverage.py` and vendored CC BY 4.0 source snapshot `data/burmese/external/mow-0.1.3-mya_20171005165336.tab`; regression tests invoke the generator in `--check` mode and assert coverage totals. Redundant parallel CSV exports were removed. Registry totals: **73 nonblank sources / 126 claims**; unique IDs and claim references validated. CI for the latest test-bearing commit is pending.

## Reproducible MOW orthographic coverage audit — 2026-11-13

- Vendored the exact upstream MOW v0.1.3 TSV at `data/burmese/external/mow-0.1.3-mya_20171005165336.tab`; its original header is preserved: `## MOW 0.1.3 / mya / CC BY 4.0`. Source ID **MOW_2017_0_1_3_DATASET** and claim **CLM-MOW-ORTHOGRAPHIC-RIME-COVERAGE-001** were added in the concurrent continuation commits already on this branch.
- Added deterministic stdlib-only generator `scripts/analyze_mow_orthographic_rime_coverage.py` with `--check` mode, plus generated files `mow_rime_orthographic_matches.csv` (508 exact source-unit/lemma pairs) and `mow_rime_orthographic_coverage.csv` (50 source-unit rows).
- Recomputed results from the vendored file: 1,476 MOW `mya:lemma` rows, 1,041 distinct lemma forms, 1,198 synsets; 508 suffix-match pairs across 35/50 source-unit variants; 442 distinct matched lemmas and 547 distinct matched synsets. For the 25 collision groups: both variants occur in 11 groups, one side in 13, neither in 1.
- These are exact Unicode orthographic suffix matches, not Burmese syllabification or pronunciation. They do not confirm homophony, MLCTS equivalence, MLC system correctness, or Ukrainian outputs. The generator/test preserve this limitation. The raw upstream license header and source attribution are retained.
- Added two tests: source/license header preservation and reproducible output/count/evidence-boundary validation. Exact-head CI pending.

### Schema-gate correction for MOW dataset-derived claim — 2026-11-13

The first CI attempt after registering the MOW orthographic coverage claim (workflow 43499220650) correctly rejected the locally invented evidence status `DATASET_DERIVED`, because the canonical claim schema does not allow that value. The claim was corrected to the existing schema-supported status `ANALYSIS_DEPENDENT` (commit 5e12f86e21f5576efee44afe84f80759e3799a9e); its scope remains orthographic suffix analysis only. The subsequent exact-head workflow is running with the schema correction, canonicalized test placement and reproducible generator check.

## Final MOW reuse reconciliation and exact-head verification — 2026-11-13

- Canonical MOW analysis is `scripts/analyze_mow_orthographic_rime_coverage.py`, using vendored CC BY 4.0 source `data/burmese/external/mow-0.1.3-mya_20171005165336.tab`; canonical outputs are `data/burmese/mow_rime_orthographic_matches.csv` and `data/burmese/mow_rime_orthographic_coverage.csv`. Removed the parallel duplicate exports and their duplicate test module. The retained regression test invokes the canonical generator with `--check`.
- Exact final code/test head: **c76fab9e4e4a910170a26dd8ed89a95790c7973d**. Required CI run **43499475187** (push) and **43499485256** (pull request) both SUCCESS: **236 Python tests + 66 subtests**, **20 Node tests**, **58 Playwright tests**, Chromium installation, production build and generated-web-data freshness all PASS. Optional diagnostics run **43499485104** SUCCESS for raw-output and CRF diagnostic jobs only; no scored accuracy benchmark.
- IPA validator runs successfully but continues to report **NOT_READY_NO_ADJUDICATED_GOLD** (zero independently adjudicated gold records). `npm install` reports **one high-severity vulnerability** and recommends `npm audit fix --force`; no forced dependency upgrade was applied.
- Source registry revalidated: **73 sources / 126 claims**, unique source IDs and claim IDs, valid claim→source references and expected CSV widths.
- SEAlang remains a viable authorized derivative access route according to its metadata, and its API is documented as accepting orthography/IPA. However, direct Burmese dictionary/API retrieval returned 502/timeout/400-timeout in this pass; connected page-retrieval credits were exhausted, so **no SEAlang entry text was inspected**. Do not treat interface metadata as entry-level phonetic evidence.
- Final branch head after this status entry will be docs-only; code/test evidence above applies to exact code/test head `c76fab9e...`. PR #147 remains OPEN / DRAFT / mergeable; branch is 386 commits ahead of main and 0 behind at the time of verification.

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

## MLC 1986 orthography book — National Library catalog locator (2026-11-13)

- Added **MLC_1986_ORTHOGRAPHY_NLMNPT_189** and claim **CLM-MLC-1986-ORTHOGRAPHY-CATALOG-001**. The National Library of Myanmar E-Resources record 189 lists *မြန်မာစာလုံးပေါင်းသတ်ပုံကျမ်း*, author/publisher Myanmar Language Commission, Yangon 1986, second edition, 292 pages, 23 cm, and a PDF option.
- This catalog record aligns with Unicode WG2 N2827's statement that the MLC's *Myanmar Orthography* was published in October 1986 and prescribed as the national standard. It is a strong primary-book locator, not inspection of the book. The bibliographic page returned 502 in this pass; no PDF pages, foreword, tables or pronunciation key were inspected.
- Added regression coverage that prevents the catalog record from being treated as content evidence. Registry totals: **77 sources / 130 claims**; IDs unique, CSV widths valid and all claim→source references resolve. CI on test-bearing head `a824fe13c3671b5f02d37c3dc9127ffc460ac1a8` is pending.

## Partial primary scan of the 1986 Myanmar Spelling Dictionary — 2026-11-13

- Added **UNICODE_L2_2010_MLC_SPELLING_1986** and **CLM-UNICODE-L2-2010-MLC-SPELLING-SCAN-001**. Unicode WG2 paper L2/10-360 identifies a *Myanmar Spelling Dictionary* published in 1986 and reproduces an image of original page 1, headed “Characters pronunciation List”, plus images of pages 2-9. The explanatory note says the character pronunciation list corresponds to a Myanmar Language Character Map and discusses sorting.
- This is the first directly viewable partial scan of a 1986 Myanmar spelling reference found in this pass. It is not a complete book; the visible tables are orthographic character/pronunciation-list material, not an MLCTS/IPA rime table or word-level dictionary entries. Its identity with the MLC *Myanmar Orthography* in N2827 and National Library record 189 remains unconfirmed.
- The National Library of Myanmar E-Resources catalog record 189 separately lists the MLC 1986 orthography book as a second edition, 292 pages, with a PDF option; the catalog page itself timed out. The Unicode partial scan is a concrete additional source lead but does not clear the primary transcription evidence gate.
- Added regression assertions for the partial-scan status and non-MLCTS/IPA boundary. Registry totals: **78 sources / 131 claims**; IDs unique, CSV widths valid, and all claim→source references resolve.

## Final checkpoint — 2026-11-13

- Dedicated branch `research/burmese-medials-g2p-evidence-2026-11-13`: **445 commits ahead of main / 0 behind**. PR **#147** is **OPEN / DRAFT / mergeable**, unmerged; 40 changed files. PR #129 remains untouched (divergent/non-mergeable at last review); PR #146 remains merged. Main and release state unchanged.
- Latest required CI on code/test head `8e8448b70549062636c3f1c539ee1010f93a86cb`, run **43501650235 SUCCESS**: **241 Python + 66 subtests**, **20 Node**, **58 Playwright**, Chromium, production build and generated-data freshness all passed. Optional diagnostics **43501650409 SUCCESS** (raw-output + CRF; not an accuracy score).
- Source registries: **78 sources / 131 claims**, all IDs unique, valid row widths, all source references resolve.
- Remaining blockers: obtain and inspect complete MLC orthography/1993 dictionary contents and identify the exact transcription field; adjudicate the 25 collision groups from primary lexical evidence; build independent IPA gold and validate tone/prosody; resolve one high-severity npm vulnerability. Status remains **PARTIAL PROTOTYPE / NOT RELEASE-READY**.

## Structural parser coverage for all MLC medial forms — 2026-11-13

- Added `tests/test_parser.py::test_mlc_medial_inventory_is_parsed_structurally_without_phonetic_guessing`. It exercises the four basic medial signs, five two-medial forms and two three-medial forms listed in N2827 using a real Burmese onset. It verifies one orthographic syllable, ordered medial IDs, established structural parse, and that `ipa` remains `None` and `phonology` remains empty.
- This is a real executable improvement to the orthographic parser's regression coverage. It does **not** enable medial-to-IPA rules, resolve context-dependent allophony, or promote any candidate pronunciation. All medial phonological behavior remains withheld.
- Exact test-bearing code head **29add5691bee13a544568fb9edec2587e447c44f**; CI run **43502733106 SUCCESS**: **242 Python tests + 66 subtests**, **20 Node tests**, **58 Playwright tests**; Chromium, production build and generated-data freshness all pass. IPA gold remains `NOT_READY_NO_ADJUDICATED_GOLD`; npm install still reports one high-severity vulnerability.

## MOW v0.1.3 lexical orthographic coverage — verified implementation reconciliation (2026-11-13)

- Existing generator `scripts/analyze_mow_orthographic_rime_coverage.py` and generated outputs were inspected and preserved. Exact Unicode suffix matching yields 508 source-unit/lemma pairs over 50 collision source-unit variants; output records explicitly label every match `ORTHOGRAPHIC_SUFFIX_MATCH_ONLY`.
- Coverage: 11/25 MLCTS collision groups have both source units found in MOW, 13/25 have one, and 1/25 has neither. This measures only MOW's lexical coverage; no pronunciation, phonological rime, syllable segmentation, or equivalence is inferred. The 1,476 lemma rows / 1,041 unique forms / 1,198 synsets are small-resource counts, not a census of Burmese.
- Exact-head CI on PR #147 head `50a29bb880256fbd0c977bc9dc1f45bb4ad49d2d`, run **43503144848**, passed: 242 Python + 66 subtests, 20 Node, 58 Playwright, production build, generated-data freshness. IPA gold gate remains `NOT_READY_NO_ADJUDICATED_GOLD`; one high-severity npm vulnerability remains.
- PR #147 remains open/draft/mergeable; branch is 455 ahead / 0 behind. No linguistic candidate or runtime behavior promoted.

## MLC 1978 spelling-book catalogue lead — 2026-11-13

- Added a separate NDL catalogue source for *မြန်မာစာလုံးပေါင်းသတ်ပုံကျမ်း*, a Burmese-language MLC orthography/spelling reference published in 1978. Allott's inspected 1985 chapter separately reports a spelling book published in 1978 and a five-part Concise Burmese Dictionary issued from late 1978 to 1980 (ANU PDF lines 10082–10113).
- This raises a bibliographic hypothesis that the spelling book and Concise Dictionary are distinct publications. Exact title identity and relationship remain to be checked against title pages; catalogue metadata alone does not prove the contents or any pronunciation notation.
- Registry updated: 80 sources / 132 claims (historical checkpoint; source count corrected after blank-row cleanup). Added a regression test protecting the distinction and evidence boundary. No runtime, MLCTS, IPA or Ukrainian mapping changed. Exact-head CI pending.

## MLC spelling-book retrieval routes — 2026-11-13

- CiNii Books record BA69415754 gives a fuller physical description (28, 379 pages, 17 cm) and lists three Japanese library holdings, including Osaka University and Tokyo University of Foreign Studies. Google Books record _V1LAAAAMAAJ identifies a University of Michigan original and a digitized 379-page scan from 2007, but the surfaced access is snippet-view metadata, not a verified full-text download.
- Added a separate catalogue/digitization source and regression test. Registry totals: 80 sources / 133 claims (verified nonblank, unique source IDs). The primary book remains uninspected; request a copy or inspect accessible pages before making any pronunciation/MLCTS claim.

## Crosswalk consistency validation — 2026-11-13

- Added `tests/test_rime_crosswalk_consistency.py` for the three existing 25-group rime crosswalks. It checks shared key coverage and Myanmar source-unit alignment, per-source-unit MLCTS2/IPA array alignment, R12A comparison-state counts (18 same, 3 distinct, 2 partial, 1 absent, 1 special), and lexical audit evidence-state counts (21 unadjudicated, 2 secondary equivalence, 1 secondary conflict, 1 special).
- This is data-integrity verification, not phonological adjudication. It adds no new IPA gold, no primary MLC evidence and no runtime rule. Status: implementation committed; CI pending.

## Rime crosswalk integrity and evidence triage — 2026-11-13

- Added `tests/test_rime_crosswalk_consistency.py` for the three existing 25-row tables. It checks exact MLCTS-key and source-unit alignment, two-value MLCTS2/R12A array alignment, enumerated evidence states and exact distribution counts.
- Verified required CI run **43507606882 SUCCESS** on code commit `de7abaea084515c5ef814575656ede8b83369a6a`: **248 Python + 66 subtests**, **20 Node**, **58 Playwright**, production build and generated-data freshness all passed. npm install still reports **one high-severity vulnerability**. Optional diagnostic workflow on the same commit completed successfully; raw model output is not an accuracy score.
- Triage from existing evidence: `any`/`any:`/`any.` are distinguished by both MLCTS2 and R12A; `any` has a secondary-source IPA conflict. `ui` is distinguished by MLCTS2 and only partially covered by R12A. `u.` is special/context-dependent, not an ordinary rime. `am` and `um` have secondary equivalence examples but no primary adjudication. The other groups remain unadjudicated.
- This is data-integrity and research prioritization only. No primary-source claim, IPA gold entry, phonological rule or Ukrainian output was promoted.

## MOW text-lookup candidates for `any` and `ui` — 2026-11-13

- Existing MOW generated data exposes 6 lemmas ending in ဉ် and 13 ending in ည် for `any`; 1 ending in ဉ်း and 6 in ည်း for `any:`; 0 ending in ဉ့် and 5 in ည့် for `any.`; and 0 ending in ို် versus 15 in ို for `ui`.
- Candidate strings include `ဥယျာဉ်`, `တိရစ္ဆာန်ဥယျာဉ်`, `ယာဉ်`, `ပြည်`, `မြန်မာပြည်`, `လက်ဖက်ရည်`, `အကျဉ်း`, `ချို`, `ငို`, `ဆို`, `တို`, and `မှို`.
- This turns the prior collision triage into concrete textual lookup keys. The evidence remains exact orthographic suffix matching only; no syllabification, pronunciation or homophony conclusion. No source/runtime status promoted.

## Source registry row-count correction — 2026-11-13

Append a correction note: `sources.csv` had three internal blank separator lines; earlier row counting included those as empty rows. Removed blank lines and added `test_source_registry_has_no_blank_rows_or_duplicate_source_ids`. Current validated registry: 80 unique nonblank sources / 133 claims.

## Source registry hygiene — 2026-11-13

- Removed three internal blank lines from `data/burmese/sources.csv`; added a regression test requiring every source row to have a nonblank unique `source_id`.
- Verified current registry: **80 unique nonblank source rows / 133 claims**. Required CI run **43508294905 SUCCESS** on code commit `62f59f177b15e2df54ace464056df7932058bffb`: 249 Python + 66 subtests, 20 Node, 58 Playwright, production build and generated-data freshness passed.
- Corrects the earlier 82/132 and 83/133 counts, which included blank separator rows. No source or linguistic claim was removed; only empty lines were deleted.

## Word-level Wiktionary examples for `any`, `any:` and `ui` — 2026-11-13

- Added three documentary claims under the existing Wiktionary snapshot and updated the lexical collision audit plus MLCTS2 crosswalk evidence-state labels.
- `any`: `ဥယျာဉ်` (`u.yyany`, `/ʔṵjɪ̀ɴ/` or `/ʔújɪ̀ɴ/`) vs `ပြည်` (`prany`, `/pjì/`).
- `any:`: `အကျဉ်း` (`a.kyany:`, `/ʔət͡ɕɪ́ɴ/`) vs `နည်း` (`nany:`, `/nɛ́/` or `/ní/`, sense-dependent).
- `ui`: `ချို`, `ဆို`, `တို` provide examples for `ို` only; no `ို်` MOW suffix match exists, so no comparison is possible.
- Required CI run **43509339740 SUCCESS** on code commit `191501979a2c5d8b7c0db9a00af5600b7266201f`: **251 Python + 66 subtests**, **20 Node**, **58 Playwright**, build and generated-data freshness passed. One high-severity npm vulnerability remains.
- Updated lexical-audit distribution: 19 unadjudicated / 2 secondary equivalence / 1 secondary conflict / 1 secondary distinction / 1 one-side-only / 1 special non-rime. The new evidence is secondary and lexical; it does not authorize runtime, IPA gold or Ukrainian promotion. Current registry: **80 sources / 136 claims**.

## Additional Wiktionary lexical attestation for `any.` — 2026-11-13

- Added word-level secondary entries for `စဉ့်` (MLCTS `cany.`, IPA `/sɪ̰ɴ/`) and `ကြည့်` (MLCTS `krany.`, IPA `/t͡ɕḭ/`), covering ဉ့် and ည့် endings respectively. Only `ကြည့်` is a MOW suffix candidate; `စဉ့်` was found independently in Wiktionary.
- Added `CLM-WIKTIONARY-ANY-DOT-WORD-LEVEL-EXAMPLES-001`; updated lexical audit, MLCTS2 status parity and regression tests.
- Distribution: 18 unadjudicated / 2 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 137 claims.
- Status remains secondary lexical evidence only; no primary MLC adjudication, IPA gold, runtime or Ukrainian mapping promotion. Exact-head CI pending.

## Additional lexical examples for `aung` — 2026-11-13

- Wiktionary text entries list `ပေါင်` (`paung`, `/pàʊɴ/`) with ending ေါင် and `တောင်` (`taung`, `/tàʊɴ/`) with ending ောင်. Their onsets differ but the secondary IPA rime sequence `/àʊɴ/` matches. Only `တောင်` is a MOW suffix candidate.
- Added `CLM-WIKTIONARY-AUNG-WORD-LEVEL-EXAMPLES-001`; lexical audit and MLCTS2 crosswalk statuses synchronized; regression coverage expanded.
- Current distribution: 17 unadjudicated / 3 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 138 claims.
- Secondary evidence only; not a controlled minimal pair or primary MLC adjudication. No IPA gold, runtime or Ukrainian output promotion. CI pending.

## Exact-head verification — secondary lexical collision audit — 2026-11-13

- Verified code/data snapshot `eb81bd29e9417ddbd6d541d54fce6d754b0bb8bd`; required CI **43513203135 SUCCESS** (duplicate **43513212043 SUCCESS**): 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium install passed.
- Optional Epitran raw-output diagnostic **43513212088 SUCCESS**, not an accuracy score. IPA-gold validator remains `NOT_READY_NO_ADJUDICATED_GOLD`; independent gold count 0. npm install reports one high-severity vulnerability.
- Registry 80 sources / 138 claims. Collision evidence distribution: 17 unadjudicated / 3 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime.
- This verifies code/data/test consistency only. Secondary Wiktionary examples do not adjudicate primary MLC policy and do not enable runtime or Ukrainian mapping changes.

## Additional lexical evidence for `aung:` — 2026-11-13

- Added MOW-listed `ပေါင်း` (`paung:`, `/páʊɴ/`) and `ကျောင်း` (`kyaung:`, `/t͡ɕáʊɴ/`) as Wiktionary word-level examples for ေါင်း and ောင်း. The onsets differ but the secondary IPA rime sequence `/áʊɴ/` matches.
- Added claim `CLM-WIKTIONARY-AUNG-COLON-WORD-LEVEL-EXAMPLES-001`; updated lexical audit, MLCTS2 status parity and regression tests.
- Current distribution: 16 unadjudicated / 4 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 139 claims.
- This is secondary lexical evidence, not a minimal pair or primary MLC adjudication. No IPA gold, runtime or Ukrainian output promotion. CI pending.

## Additional lexical evidence for `auk` — 2026-11-13

- Added MOW-listed `ပေါက်` (`pauk`, `/paʊʔ/`) and `ကျောက်` (`kyauk`, `/t͡ɕaʊʔ/`) as Wiktionary word-level examples for ေါက် and ောက်. Their onsets differ but the secondary IPA rime sequence `/aʊʔ/` matches.
- Added claim `CLM-WIKTIONARY-AUK-WORD-LEVEL-EXAMPLES-001`; updated lexical audit, MLCTS2 status parity and regression tests.
- Current distribution: 15 unadjudicated / 5 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 140 claims.
- This is secondary lexical evidence, not a minimal pair or primary MLC adjudication. No IPA gold, runtime or Ukrainian output promotion. CI pending.

## Additional lexical evidence for `a`, `a:` and `au` — 2026-11-13

- Added MOW-listed Wiktionary word pairs: `အဝါ` (`a.wa`, `/ʔəwà/`) / `အစာ` (`a.ca`, `/ʔəsà/`) for `a`; `ခါး` (`hka:`, `/kʰá/`) / `ကား` (`ka:`, `/ká/`) for `a:`; `ပေါ်` (`pau`, `/pɔ̀/`) / `ကြော်` (`krau`, `/t͡ɕɔ̀/`) for `au`. Same secondary IPA rime within each pair, different onsets.
- Added three source claims and updated lexical audit, MLCTS2 parity and regression tests. MOW coverage data unchanged.
- Current distribution: 12 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 1 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 143 claims.
- Secondary evidence only; not minimal pairs or primary MLC adjudication. No IPA gold, runtime or Ukrainian output promotion. CI pending.

## One-sided lexical evidence for `aung.` — 2026-11-13

- Added MOW-listed Wiktionary lemma `စောင့်` (`caung.`, `/sa̰ʊɴ/`) for ောင့်. No example for ေါင့် was located. Added claim `CLM-WIKTIONARY-AUNG-DOT-ONE-SIDE-EXAMPLE-001`; synchronized lexical audit and MLCTS2 status, and expanded tests.
- Current distribution: 11 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 2 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 144 claims.
- This is secondary evidence for one side only, not a collision adjudication or primary MLC specification. No IPA gold, runtime or Ukrainian output promotion. CI pending.

## One-sided lexical examples for `um:` and `un` — 2026-11-13

- Added MOW-listed Wiktionary lemma `နှလုံး` (`hna.lum:`, `/n̥əlóʊɴ/`) for `ုံး` and `ကုန်` (`kun`, `/kòʊɴ/`) for `ုန်`; the opposite sides remain unobserved. Added two documentary claims and updated lexical audit, MLCTS2 parity and regression tests.
- Current distribution: 9 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 4 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 146 claims.
- Secondary one-sided evidence only; not collision adjudication or primary MLC specification. No IPA gold, runtime or Ukrainian output promotion. CI pending.

## One-sided lexical examples for `au:`, `im` and `im.` — 2026-11-13

- Added MOW-listed Wiktionary entries `ကျော` (`kyau:`, `/t͡ɕɔ́/`) for ော; `အိမ်` (`im`, `/ʔèɪɴ/`) for ိမ်; and `စိမ့်` (`cim.`, `/sḛɪɴ/`) for ိမ့်. Opposite source-unit sides remain unobserved.
- Added three source claims and updated lexical audit, MLCTS2 status parity and regression tests.
- Current distribution: 6 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 7 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 149 claims.
- Secondary one-sided evidence only; no collision adjudication or primary MLC specification. No IPA gold, runtime or Ukrainian output promotion. CI pending.

## Final exact-head verification — 2026-11-13

- SHA `62bea5a26012cb1ace4ce11579e17f4a780c3e1e`; required CI **43516197628 SUCCESS** and duplicate exact-SHA run **43516203122 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; production build, generated-data freshness and Chromium install passed.
- Optional Epitran raw-output diagnostic **43516203133 SUCCESS**; not an accuracy score. IPA-gold validator remains `NOT_READY_NO_ADJUDICATED_GOLD`, with 0 independent gold entries. One high-severity npm vulnerability remains.
- Collision audit: 25 groups = 6 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 7 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 149 claims.
- Engineering/test consistency verified. Secondary Wiktionary evidence does not adjudicate primary MLC policy and does not authorize runtime or Ukrainian mapping changes.

## `am:` lexical evidence continuation — 2026-11-14

- `လမ်း` (`lam:`, `/láɴ/`) confirms a secondary lexical example for source unit `မ်း`; opposite unit `ံး` remains unobserved in the MOW suffix-match scan.
- Audit and MLCTS2 crosswalk updated to `SECONDARY_ONE_SIDE_ONLY`; claim `CLM-WIKTIONARY-AM-COLON-ONE-SIDE-EXAMPLE-001` registered; regression tests expanded.
- Evidence distribution: 5 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 8 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 150 claims.
- No runtime or Ukrainian output changes. Exact-head CI pending.

## Exact-head verification — `am:` lexical continuation — 2026-11-14

- Verified SHA `73bfbd7d82f69bfa0e306d984a40fe2324fc3515`; required CI **43519075644 SUCCESS** and **43519083741 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; production build, generated-data freshness and Chromium install passed.
- Optional Epitran raw-output diagnostic **43519083746 SUCCESS**; IPA gold `NOT_READY_NO_ADJUDICATED_GOLD`, 0 independent gold entries. One high-severity npm vulnerability remains.
- Collision ledger: 5 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 2 secondary distinction / 8 secondary one-side-only / 1 special non-rime; 80 sources / 150 claims.
- Secondary evidence only; no primary MLC or runtime/IPA gold/Ukrainian mapping promotion.

## `am.` secondary lexical distinction — 2026-11-14

- Wiktionary entries `စိမ့်` (`cim.`, `/sḛɪɴ/`) and `ကြံ့` (`kram.`, `/t͡ɕa̰ɴ/`) provide one lexical example for each final source unit မ့် and ံ့. MOW scan contains စိမ့် and အိန္ဒိယကြံ့ suffix candidates.
- Distinct secondary IPA rimes conflict with vendor same-output MLCTS2/IPA. Audit/crosswalk updated to `SECONDARY_SOURCE_DISTINCTION`; claim registered.
- Distribution: 4 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 8 secondary one-side-only / 1 special non-rime. Registry 80 sources / 151 claims.
- Not primary MLC adjudication; no runtime or Ukrainian output promotion. Exact-head CI pending.

## `au.` lexical evidence continuation — 2026-11-14

- `ဝပ်ရှော့` (`waphrau.`, `/waʔʃɔ̰/`) provides a Wiktionary lexical example for `ော့`; opposite unit `ေါ့` remains unobserved.
- Audit and crosswalk set to `SECONDARY_ONE_SIDE_ONLY`; claim registered; regression tests updated.
- Distribution: 3 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 9 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 152 claims.
- No primary MLC or runtime promotion. Exact-head CI pending.

## Exact-head verification — `au.` lexical continuation — 2026-11-14

- Verified SHA `ffd08d7ae8e227ee19a86859de00b7d52f456ecf`; CI **43519887514 SUCCESS**: 251 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness and Chromium install passed.
- Optional Epitran diagnostic **43519895542 SUCCESS**; IPA gold `NOT_READY_NO_ADJUDICATED_GOLD`, 0 independent gold entries. One high-severity npm vulnerability remains.
- Ledger: 3 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 9 secondary one-side-only / 1 special non-rime; 80 sources / 152 claims.
- Secondary evidence only; no runtime or Ukrainian output changes.


## `um.` secondary lexical attestation — 2026-11-14

- Wiktionary `အုံ့` (`um.`, `/ʔo̰ʊɴ/`) supplies a one-side example for ုံ့. It is not a MOW suffix candidate; ုမ့် remains unobserved.
- Claim `CLM-WIKTIONARY-UM-DOT-ONE-SIDE-EXAMPLE-001` registered; audit, crosswalk and tests updated.
- Distribution: 2 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 10 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 153 claims.
- Secondary evidence only; no primary MLC or runtime/IPA gold/Ukrainian mapping promotion. Exact-head CI pending.


## `im:` secondary compound-level lexical attestation — 2026-11-14

- Wiktionary compound `တစ်သဝေမတိမ်း` has MLCTS `tacsa.wema.tim:` and IPA `/təθwèmətéɪɴ/`; its final component `တိမ်း` is an MOW suffix candidate for ိမ်း. The source provides compound IPA, not a standalone pronunciation record. ိံး remains unobserved.
- Claim `CLM-WIKTIONARY-IM-COLON-ONE-SIDE-EXAMPLE-001` registered; audit, crosswalk and tests updated.
- Distribution: 1 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime. Registry: 80 sources / 154 claims.
- Secondary evidence only; no primary MLC or runtime/IPA gold/Ukrainian mapping promotion. Exact-head CI pending.


## MOW `a.` suffix-overlap caution — 2026-11-14

- The single MOW suffix-match candidate for `a.` / `ာ့` is `ဝပ်ရှော့`, where the matched code points overlap the larger final sequence `ော့`. Wiktionary records this word as `waphrau.` / `/waʔʃɔ̰/`, so it is not promoted as an `a.` rime example.
- Added a regression test preserving `a.` as unadjudicated and `ဝပ်ရှော့` as an `au.` example only. This does not change the generator's explicitly orthographic-only suffix matching contract.


## Exact-head CI — `im:` / `um.` and MOW overlap guard — 2026-11-14

- SHA `2b1f306b43a8a6c38e626252fb0b0b9c18501e1b`; CI **43580029898 SUCCESS**: 252 Python + 66 subtests, 20 Node, 58 Playwright; gold-structure validation, build, generated-data freshness and Chromium passed.
- Previous run exposed one stale status-distribution assertion (expected 3 unadjudicated / 9 one-side-only); corrected to 1 / 11 and reran successfully.
- IPA gold remains 0 adjudicated entries; one high-severity npm vulnerability remains. No runtime or Ukrainian mapping change.
- Ledger: 1 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime; registry 80 sources / 154 claims.


## Burmese rime lexical evidence continuation — 2026-11-14

| ID | Status | Evidence | Acceptance criterion / boundary |
|---|---|---|---|
| BURMESE-RIME-A-DOT-ONE-SIDE-027 | DONE_VERIFIED — SECONDARY_ONE_SIDE_ONLY | Wiktionary `ငါ့` entry: IPA `/ŋa̰/`, MLCTS `nga.`, written ending `ါ့`; explicitly a non-lemma familiar/informal induced creaky pronoun form. Claim `CLM-WIKTIONARY-A-DOT-ONE-SIDE-EXAMPLE-001`. | Only first source-unit side attested; no lexical example for `ာ့`; not primary MLC adjudication or MOW candidate. No runtime/Ukrainian promotion. |
| BURMESE-RIME-A-DOT-PHONETIC-CONTEXT-026 | DONE_VERIFIED — SOURCE_SCOPE_GUARD | Full texts Mooney & Repetti-Ludlow (2021), DOI `10.3765/PLSA.V6I1.4900`, and Watkins (2001), DOI `10.1017/S0025100301002122`. | Phonetic context only; no Burmese orthography-to-MLCTS mapping for the example items. |
| BURMESE-MOW-A-DOT-SUFFIX-OVERLAP-025 | DONE_VERIFIED — INTERPRETATION_GUARD | MOW's sole `a.` / `ာ့` suffix hit `ဝပ်ရှော့` overlaps larger ending `ော့`; Wiktionary gives `waphrau.` / `/waʔʃɔ̰/`, hence `au.`. Regression tests preserve this distinction. | Code-point suffix matching is not syllabification. No `a.` rime promotion from this candidate. |

Updated lexical ledger: 25 groups = **0 unadjudicated / 8 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 12 secondary one-side-only / 1 special non-rime**. Source registry: **80 sources / 157 claims**. Exact-head CI for this update pending. IPA gold remains 0; runtime and Ukrainian output unchanged.


## `a.` both-side lexical evidence — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-A-DOT-BOTH-SIDES-028 | DONE_VERIFIED — SECONDARY_SYSTEM_EQUIVALENCE | Wiktionary `ငါ့` `/ŋa̰/` (`ါ့`) and `တာ့တာ` `/ta̰tà/`, first syllable `တာ့` (`ာ့`); MLCTS values `nga.` and `ta.ta`. | Secondary lexical equivalence for both sides; not a minimal pair or primary MLC adjudication. No runtime change. |

Current ledger: **0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 158 claims**. Exact-head CI pending.


## Final exact-head verification — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-RIME-A-DOT-BOTH-SIDES-028 | DONE_VERIFIED — SECONDARY_SYSTEM_EQUIVALENCE | Final SHA `e6d865e1daa191a7ecc9cd5b0025b628cc930310`; Wiktionary `ငါ့` `/ŋa̰/` (ending `ါ့`) and `တာ့တာ` `/ta̰tà/`, first syllable `တာ့` (`ာ့`); exact-head CI **43581081561 SUCCESS**. | Secondary lexical evidence only; not a controlled minimal pair or primary MLC adjudication. No runtime/Ukrainian promotion. |
| BURMESE-RIME-LEXICAL-AUDIT-025 | DONE_VERIFIED — TESTED_LEDGER | 253 Python + 66 subtests, 20 Node, 58 Playwright; build, generated-data freshness, Chromium and IPA-gold structure validation passed. | All 25 groups have some secondary evidence; 11 still one-sided, 1 conflicting, 3 distinguished. |

Registry: **80 sources / 158 claims**. IPA gold remains 0; `NOT_READY_NO_ADJUDICATED_GOLD`. Optional diagnostics **43581085495 SUCCESS**: raw outputs only; CRF 100 predictions / 84 source-concordant / 0 gold / possible training overlap, no accuracy. One high-severity npm vulnerability remains. PR #147 is OPEN / DRAFT / mergeable, 704 ahead / 0 behind main; not merged.


## External hybrid candidate integration and conservative IPA guard — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-IPA-MEDIAL-STACK-KINZI-WITHHOLD-001 | DONE_VERIFIED — CONSERVATIVE_ABSTENTION | `src/burmese_ukrainian/ipa.py` now returns no IPA when parsed `medials`, `conjunct` or `kinzi` fields are present; tests cover `ကြွေ`, `က္ကာ`, `င်္ဂါ` and public engine `PARTIAL` status. | Does not add pronunciations; prevents silent segment deletion until profile-specific rules are adjudicated. |
| BURMESE-HYBRID-CANDIDATE-COLLECTOR-001 | DONE_VERIFIED — DIAGNOSTIC_ONLY | `HybridBurmeseEngine` wrapper, explicit Google/myG2P/Epitran/CLI adapters, provider-order/provenance tests; final IPA is preserved from `RuleBasedBurmeseEngine`. | Providers never run by default; no voting/promotion; myG2P license remains CC BY-NC-SA 4.0 and no data is bundled. |
| BURMESE-GOOGLE-WFST-RAW-SMOKE-001 | DONE_VERIFIED — HARNESS_AND_OPTIONAL_CI | Pinned source commit, structural-only raw-output script/tests and optional workflow ported from PR #129. Historical run 43084508359: 6/6 raw outputs, 0 gold, accuracy null. | Current-branch exact-head optional workflow still pending; no accuracy claim or production fallback. |

Primary-source corrections added: WSSANLP PER results and test split; LREC 2020 compiled WFST/inventory counts; Hlaing 2014 syllable-count and stacking-error discrepancies. None is promoted to project IPA gold.


## Current-branch hybrid and raw-output verification — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-HYBRID-CANDIDATE-COLLECTOR-001 | DONE_VERIFIED — DIAGNOSTIC_ONLY | `HybridBurmeseEngine`, explicit provider adapters and tests; external provider attempts are listed separately from candidates; required CI on SHA `45d3513ad1f6bbbda8d9a97768e493cdda08856d` passed. | RuleBased engine remains final IPA authority; no provider auto-runs, votes or promotes. |
| BURMESE-GOOGLE-WFST-RAW-SMOKE-001 | DONE_VERIFIED — RAW_OUTPUT_ONLY | Optional run **43582075278 SUCCESS**; Bazel build, symbol-table checks, 6/6 outputs; report SHA `88372233d85df73593b030ee0f91aa678fe86fd1c6d5cdc18e7c609b8eefd2c6`. | Six structural-only probes; 0 gold; accuracy null; upstream dependencies not fully hermetic. |
| BURMESE-EPITRAN-RAW-SMOKE-001 | DONE_VERIFIED — RAW_OUTPUT_ONLY | Epitran 1.35.3, six structural-only raw outputs, artifact ZIP SHA `4b60180e479d884826ed158dab525c809a3c45c66e627eb4904e61c8be048304`. | 0 gold; no accuracy claim. |
| BURMESE-CRF-RAW-SMOKE-001 | DONE_VERIFIED — RAW_OUTPUT_ONLY | CRF 100/100 outputs, 84 source-concordant, 0 gold, possible training overlap, artifact ZIP SHA `fbf339ed34dfb80b4147998d7b2fee4c602fcb1abc10c91b9229ea10ccf7bb9d`. | Not accuracy; syllable boundaries are supplied. |



## Current exact-head acceptance snapshot — 2026-11-14

- Required CI 43582496619 SUCCESS on test-bearing SHA `fd27f481470b5f6a08648cf0dcc25ab8b4a8ecf5`: 267 Python + 68 subtests, 20 Node, 58 Playwright; build, generated-data freshness, Chromium and IPA-gold structure validation passed.
- Optional raw-output evidence is recorded in the source registry. It is not accuracy evidence: Google 6/6 structural-only outputs; Epitran six raw outputs; CRF 100/100 with 84 source-concordant, zero gold and possible training overlap.
- Registry 80 sources / 164 claims. Independent IPA gold 0. One high-severity npm vulnerability remains.


## Exact final branch verification — 2026-11-14

- Final branch tip at this checkpoint: `cf7bb590f0acb7929f10832ca80062b83a1b33a2`; PR #147 remains OPEN / DRAFT / mergeable, **750 ahead / 0 behind** `main`.
- Required CI **43582678405 SUCCESS** on this exact tip: **267 Python tests + 68 subtests**, **20 Node tests**, **58 Playwright tests**; IPA corpus structure check, production build, generated-data freshness and Chromium installation passed. Gold remains `NOT_READY_NO_ADJUDICATED_GOLD`; npm reports one high-severity vulnerability.
- Optional workflow **43582678434 SUCCESS** on this exact tip: Google WFST 6/6 raw outputs, Epitran six raw outputs, CRF 100/100 predictions and 84 source-concordant; 0 gold, no accuracy. Artifacts downloaded and inspected.
- Source registry: **80 sources / 164 claims**. Rime ledger: **0 unadjudicated / 9 secondary equivalence / 1 conflict / 3 distinctions / 11 one-side-only / 1 special non-rime**. No primary MLC adjudication or runtime/Ukrainian promotion.


## Web dependency security follow-up — 2026-11-14

| ID | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BURMESE-WEB-DEPENDENCY-SECURITY-001 | DONE_VERIFIED — CLEAN_INSTALL_AND_AUDIT | Vite `8.3.8`; committed `package-lock.json` (`lockfileVersion: 3`, 51 package entries; commit `35b2649481ac2f8532fdc1ebbf2c123d2abaf1ee`); required CI **43583859568 SUCCESS** on test-bearing SHA `2c17f9843766913c40654c59965a63593b604092`: `npm ci`, `npm audit --audit-level=high`, build and generated-data checks passed; 0 vulnerabilities. | Clean-install reproducibility and high-severity audit gate verified. |


## Final clean-install acceptance — 2026-11-14

Required CI **43583859568 SUCCESS** on test-bearing SHA `2c17f9843766913c40654c59965a63593b604092`: 267 Python + 68 subtests, 20 Node, 58 Playwright; `npm ci`, `npm audit --audit-level=high`, production build, generated-data freshness and Chromium passed. npm audit found 0 vulnerabilities. The committed lockfile closes the transitive dependency reproducibility gap.


## 2026-11-14 full-text source audit and security status

- Full-text recheck of Hlaing & Mikami (2014) identified non-equivalent grammar expressions (`M? V?` vs `M* V*` vs implementation `Opt(M) Opt(V)`), orthographic-only scope, no stated data/code license, and reported evaluation discrepancies (32,238 vs 32,283 syllables; eight vs nine stacking errors). Claims `CLM-HLAING14-GRAMMAR-EXPR-001` and `CLM-HLAING14-LICENSE-001` registered.
- Watkins (2001) full text: one Rangoon male consultant, deliberate reading, broad IPA; only /ʔ/ as modern coda in this analysis. Claims registered with single-speaker and source-specific scope. Oo et al. (2020) seed IPA lexicon is not released gold; SLR80 text transcripts are not IPA labels.
- Rime ledger current verified distribution: 25 groups = **0 unadjudicated / 9 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 11 secondary one-side-only / 1 special non-rime**. Source registry before this update: 80 sources / 164 claims; five claims added by this update.
- Exact-head required CI **43583984697 SUCCESS** on `716e65b4fac5b4f2ec782ffacdf9408521503d01`: 267 Python + 68 subtests, 20 Node, 58 Playwright; `npm audit` found 0 vulnerabilities. IPA gold remains `NOT_READY_NO_ADJUDICATED_GOLD`.
- Dependency security item is DONE_VERIFIED; committed npm lockfile / `npm ci` migration remains PARTIAL (the lockfile was generated only as a workflow artifact, not committed).


## Correction and authoritative exact-head snapshot — 2026-11-14 12:20 UTC

The preceding continuation note incorrectly stated that no committed npm lockfile existed. Repository inspection corrected that statement: `package-lock.json` is present (lockfileVersion 3, 51 package entries; blob `43c0da9092cc0c63f7ed5f89a11ad5c6039aeb1e`), and `.github/workflows/test.yml` uses `npm ci` plus `npm audit --audit-level=high`. Exact-head CI **43584975330 SUCCESS** on `58fe38c15f6373948640c89921d818d3be3cafff` confirms `npm ci`, audit with **0 vulnerabilities**, 267 Python + 68 subtests, 20 Node and 58 Playwright. Thus install reproducibility and the Vite high-severity finding are both DONE_VERIFIED at this checkpoint.

The 25-group rime CSV currently has 0 unadjudicated groups (9 secondary equivalence, 1 secondary conflict, 3 secondary distinction, 11 secondary one-side-only, 1 special non-rime). The source registry now contains **80 sources / 169 claims** after five additional full-text claims. Independent adjudicated IPA gold remains 0; do not change that status.


## Exact-head comparator provenance — 2026-11-14

Optional run **43584975335 SUCCESS** on PR head `58fe38c15f6373948640c89921d818d3be3cafff`: Google WFST 6/6 structural-only outputs (Bazel build/symbol checks passed), Epitran 6/6 raw outputs, myG2P CRF 100/100 predictions with 84 source-concordant. Zero independent gold and null accuracy for all; CRF may overlap training data and is given syllable boundaries. Artifacts downloaded/inspected; report and ZIP hashes recorded in engine registry and source claims. No model enabled by default.


## `un` secondary lexical evidence update — 2026-11-14

Wiktionary Appendix:Burmese pronunciation lists `ဂုဏ်` /ɡòuɴ/ and `ကုန်` /kòuɴ/; the `ဂုဏ်ထူး` entry provides compound-initial confirmation for `ဂုဏ်` with IPA `/ɡòʊɴdú/` and MLCTS `gunhtu:`. The `un` ledger/crosswalk row is now `SECONDARY_SYSTEM_EQUIVALENCE`, with a new documentary claim and regression assertions. This remains secondary evidence, not a minimal pair or primary MLC adjudication. Distribution: **0 unadjudicated / 10 secondary equivalence / 1 conflict / 3 distinctions / 10 one-side-only / 1 special non-rime**. Registry: **80 sources / 170 claims**.


## Exact final verification after `un` ledger extension — 2026-11-14

- Final tested branch head: `1ce829eda10ae5c3b3e4b9772efb434043198a75`; required CI **43585743620 SUCCESS**: **267 Python + 68 subtests**, **20 Node**, **58 Playwright**; `npm ci`, `npm audit --audit-level=high`, build, generated-data freshness, Chromium install all passed; **0 vulnerabilities**.
- Rime ledger: 25 groups = **0 unadjudicated / 10 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 10 secondary one-side-only / 1 special non-rime**. Registry: **80 sources / 170 claims**.
- IPA gold validator correctly remains `NOT_READY_NO_ADJUDICATED_GOLD` (0 independently adjudicated entries). PR #147 OPEN / DRAFT / mergeable, 794 ahead / 0 behind `main`; no reviews or inline review threads. PR #129 OPEN / DRAFT / non-mergeable, 53 ahead / 17 behind; untouched. No merge/release/deployment.


## Current final HEAD verification — 2026-11-14 12:35 UTC

- Branch head `f1854a75f63281e536f7c661eac1ad19f541833b`; required CI **43585929068 SUCCESS** on exact SHA: 267 Python + 68 subtests, 20 Node, 58 Playwright; `npm ci`, explicit `npm audit --audit-level=high` (0 vulnerabilities), build, generated-data freshness and Chromium all passed.
- Rime evidence: 25 groups = 0 unadjudicated / 10 secondary equivalence / 1 secondary conflict / 3 secondary distinction / 10 secondary one-side-only / 1 special non-rime. Source registry 80 sources / 170 claims. Independent IPA gold 0.


## `au:` / `au.` lexical evidence update — 2026-11-14

Wiktionary `ပေါ` `/pɔ́/` (MLCTS `pau:`; source ေါ) and `ကျော` `/t͡ɕɔ́/` (MLCTS `kyau:`; source ော) establish secondary equivalence for `au:`. `ပေါ့` `/pɔ̰/` (MLCTS `pau.`; source ေါ့) and final syllable `/ʃɔ̰/` in `ဝပ်ရှော့` (MLCTS `waphrau.`; source ော့) establish secondary equivalence for `au.`. Two new claims and regression assertions added; no primary MLC adjudication or runtime promotion. Distribution: **0 unadjudicated / 12 secondary equivalence / 1 conflict / 3 distinctions / 8 one-side-only / 1 special non-rime**. Registry: **80 sources / 172 claims**.

Required CI **43586334287 SUCCESS** on `dd494662f0c94bcf1f59170fe65ea6cd41199c64`: 267 Python + 68 subtests, 20 Node, 58 Playwright; npm ci, explicit audit (0 vulnerabilities), build and generated-data freshness passed.


## MLC dictionary access and secondary rime-table follow-up — 2026-11-14

- Google Books metadata identifies a digitized 1996 Dunwoody Press reprint of the MLC 1993 Myanmar-English Dictionary (University of Michigan original; digitized 2008-05-15; 635 pages), but the inspected page exposed metadata only, not page images or transcription tables.
- SHACHI independently describes the SEAlang Burmese dictionary as sourced from the MLC 1993 dictionary, supporting IPA search/display and recording MLC/Dunwoody copyright. This does not reveal the internal entry schema or MLCTS/MLCTS2 field semantics.
- Wiktionary's rime table gives `ကိံ` /kèɪɴ/ MLCTS `kim` for the `im` collision's second orthographic side. This is a secondary table example, not a lexical entry; it does not change the 8 one-side-only lexical groups.
- SEAlang dictionary/API retrieval remains inaccessible (HTTP 502 / inaccessible endpoint). No primary MLC entry/table inspected. No runtime or Ukrainian mapping promotion.
- Registry: **82 sources / 175 claims**; lexical collision ledger remains **12 secondary equivalence / 1 conflict / 3 distinctions / 8 one-side-only / 1 special non-rime**. Required CI **43618679936 SUCCESS** on code/test head `9e1a770cfd3d5e4c56264f79e458637f8c9bc1f9`: 268 Python + 68 subtests, 20 Node, 58 Playwright; IPA-gold structure validation, `npm ci`, high-severity audit (0 vulnerabilities), production build and generated-data freshness passed. This is the test-bearing snapshot; later handoff/register changes are documentation-only.


## MLC second-edition access follow-up — 2026-11-14

- New access lead: CiNii identifies a revised 2nd edition of the 1993 Myanmar-English Dictionary (709 pages, chief editor Dr Myint Kyi, Department of Myanmar Nationalities' Languages) with one holding at the University of Tokyo General Library. NDL guide reports 2019; a 2023 scholarly bibliography cites 2020. Publication year remains unresolved; no pages or pronunciation system inspected.
- NDL's 2022 guide confirms SEAlang is based on the 1993/1996 MLC dictionary. SEAlang 2008 paper documents IPA query/display and a screenshot with phonetic output, but the headword is not recoverable from extraction and record schema is not disclosed.
- Hlaing & Thida (2018), Win & Takara (2011), and Mooney & Repetti-Ludlow (2021) add phonetic context but no new lexical example for the missing side of the eight one-sided collision groups. No mapping promotion.
- Registry 89 sources / 189 claims; collision distribution unchanged.
- CI 43619590836 failed one new Python assertion due to capitalization mismatch (No pages... vs expected no pages...); 269 Python tests + 68 subtests passed, 1 failed. Assertion corrected in 3b5e55cc8ac45afee6c98cf6999510012669ddf2; The corrected assertion was included in subsequent code/test head bccc8c3c495fdaa20736a104eabc4d0642345ac6; required CI run 43619829840 completed SUCCESS: 270 Python tests + 68 subtests, 20 Node tests, 58 Playwright tests; IPA-gold structure validation, npm ci, high-severity audit (0 vulnerabilities), production build and generated-data freshness passed. Later commits are documentation-only.


- Official Ministry of Education FY 2018-19 Annual Performance Review Report, p.256, lists “Myanmar-English Dictionary (2019)” among outputs of the Department of Myanmar Nationalities' Languages. This independently supports the 2019 publication year; a 2023 scholarly bibliography still gives 2020, so preserve the citation discrepancy pending title-page verification.


## TUFS MED-to-IPA comparison — 2026-11-14

- TUFS's university Burmese Pronunciation Module explicitly compares its IPA analysis with the 2019 MED second edition's own transcription notation and other dictionaries. It lists MED forms such as -a/-a:/-a., -in/-in:/-in., -ein/-ein:/-ein., -aun/-aun:/-aun. and checked -a' etc. This is a MED comparison, not proof of MED=MLCTS or a primary dictionary page.
- TUFS provides lexical examples for already-observed sides of am:, aung., im, im:, im.; no missing-side lexical example found. It also disagrees with Wiktionary on the phonetic analysis of စောင့် (/sâuɴ/ vs /sa̰ʊɴ/). No collision status promotion.
- Registry 89 sources / 189 claims; eight one-sided groups remain one-sided.
- Required CI 43620353708 SUCCESS: 271 Python + 68 subtests, 20 Node, 58 Playwright; IPA gold structure validation, npm ci, npm audit (0 vulnerabilities), production build and generated-data freshness passed. The preceding run 43620266372 had one test assertion wording failure; corrected in 9e0d134a3189a4d57d38de1fa6c0e7b85725d72e and rerun successfully.


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


## Optional diagnostic run 43620353669 — 2026-11-14

Optional diagnostics run 43620353669 completed SUCCESS: Epitran, CRF and Google WFST raw-output jobs succeeded. Google WFST returned 6/6 outputs with 0 runtime errors but 0 independent gold (accuracy null). CRF returned 100 predictions, 84 source-concordant, with 0 gold and NOT_SCORED_POSSIBLE_TRAINING_OVERLAP. These are raw-output diagnostics, not accuracy results.


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

## Browser evidence-status propagation — 2026-11-14

- **DONE_VERIFIED (narrow engineering correction):** Browser aggregate IPA status now preserves `ANALYSIS_DEPENDENT` and `UNCERTAIN` instead of flattening them to `NOT_ESTABLISHED`. Per-syllable fail-closed output remains unchanged.
- **DONE_VERIFIED (regression alignment):** Four stale browser tests that expected unsupported canonical outputs (`စိတ်`, `ဆာ`, `သာ`, `ယူ`) were rewritten to assert withholding and explicit analysis-dependent IPA status. No linguistic rule or Ukrainian mapping was added.
- **Exact-head verification:** `9333bdfec405f9fafb36bab42d90965e11f5e155`; PR test workflow `43630941796` SUCCESS — 277 Python tests + 68 subtests, package installation, gold-corpus structural validation, npm audit gate, production build, generated-data freshness, 21 Node tests, 58 Playwright tests. Push workflow `43630938330` was still running at checkpoint. Optional CRF and Epitran raw-output jobs succeeded; optional Google WFST build was still running.
- **Remaining PARTIAL:** Full cross-runtime phonological parity, contextual medials/rimes/tone/phonation and independent expert-adjudicated IPA gold. Gold count remains 0; empirical accuracy remains null.


## Python/browser structural-status parity continuation — 2026-11-14

- Corrected a semantic mismatch: Python `to_ipa` records `phonetic_status=analysis_dependent` for recognized but unimplemented medials, conjuncts and kinzi; the browser had flattened these IPA-less states to `NOT_ESTABLISHED`. Browser now preserves `ANALYSIS_DEPENDENT` for those recognized structures, while continuing to withhold canonical IPA and Ukrainian output.
- Extended the shared structural contract `tests/fixtures/shared_unicode_contract.json` with `ကြွေ`, `က္ကာ` and `င်္ကာ`. Python and Playwright tests consume the same fixtures and assert withheld IPA/output plus the explicit analysis-dependent status. No phonological rule, IPA label or Ukrainian mapping was added.
- Exact PR-head required CI on code/test SHA `0b0156e1139a6b277ead4a42606b69c31050468d`, run [43638222569](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638222569), SUCCESS: 278 Python tests + 68 subtests; 21 Node tests; 59 Playwright tests; IPA-gold structural validator executed; npm audit gate reports 0 vulnerabilities; production build, generated-data freshness and Chromium install passed.
- **Status: PARTIAL** for Python/browser structural-status parity. The fixtures do not yet compare complete parser objects, syllable boundary decisions, coda/tone analysis, or Ukrainian adapter traces. Independent expert-adjudicated IPA gold remains 0; empirical accuracy is null. Repository remains a PARTIAL PROTOTYPE.


## Canonical IPA parity — coda, asat and prosody withholding — 2026-11-14

- Browser canonical IPA now withholds any syllable containing a coda, asat, anusvara or prosodic mark, matching Python's conservative `_ipa` boundary. Recognized unresolved material is marked `ANALYSIS_DEPENDENT`; no coda/rime/tone IPA or Ukrainian output is emitted.
- Shared fixture contract now covers seven withheld structures: medial-ra/wa, conjunct, kinzi, nasal coda, checked coda, asat-conditioned rime and anusvara. The same JSON cases are consumed by Python and Playwright tests.
- Old browser expectations for `ပင်`, `ကုန်`, `ကိုက်` and `ကော်` were changed from guessed IPA to withheld output. This intentionally removes unsupported browser-only canonical IPA rather than promoting those rules into Python.
- Exact PR-head required CI on code/test SHA `93e9c9283acb757ec7cb0a61d974faecc7e45eff`, run [43638560797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638560797), SUCCESS: 278 Python tests + 68 subtests; 21 Node tests; 59 Playwright tests; npm audit reports 0 vulnerabilities; build, generated-data freshness and Chromium install pass.
- **Status remains PARTIAL:** status-level parity is verified for these cases, but complete parser object, syllable boundary, all vowel-combination and IPA→Ukrainian trace parity remain incomplete. Independent expert-adjudicated IPA gold remains 0; empirical accuracy is null.


## Kinzi syllable-boundary parity — 2026-11-14

- Corrected Python segmentation for internal kinzi: the `င + U+103A + U+1039` sequence closes the preceding syllable before the next written onset, matching the browser parser. Prefix kinzi remains attached to its following onset; the parser distinguishes these contexts explicitly.
- Python now records internal kinzi as a structural final nasal (`kinzi.position=coda`, `coda.character=င`) while keeping IPA withheld. Shared fixture `မင်္ဂလာ` asserts the same three browser/Python syllable units: `မင်္`, `ဂ`, `လာ`.
- First implementation exposed three regressions in prefix-kinzi behavior (`tests/test_malformed_ipa_withholding.py`, `tests/test_shared_unicode_contract.py`, `tests/test_unicode.py`); corrected by requiring the current cluster not to start with KINZI before splitting at the following onset. No tests were weakened.
- Exact PR-head required CI on corrected code/test SHA `e97aaebf43d99e9d21597fba6b35625fb5ca0bd2`, run [43638895912](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43638895912), SUCCESS: 280 Python tests + 68 subtests; 21 Node tests; 60 Playwright tests; npm audit 0 vulnerabilities; build and generated-data freshness passed.
- **Status: DONE_VERIFIED for this kinzi structural boundary only.** Full syllabification parity across the entire Burmese orthography remains PARTIAL; the shared case is structural, not IPA gold.


## Shared all-medials structural parity fixtures — 2026-11-14

- Extended `tests/fixtures/shared_unicode_contract.json` with the full 11-form MLC medial inventory: four basic signs, five two-medial combinations and two three-medial combinations. Each fixture checks the ordered Python medial IDs, one-cluster boundary, browser syllable row and `ANALYSIS_DEPENDENT` IPA withholding.
- Python and Playwright suites consume the same cases. These are Unicode/orthographic structural probes only; no medial phonetic realization or Ukrainian candidate was added.
- Exact PR-head required CI on code/test SHA `702568dcf2214787938b6964708cb6e7d4d52e92`, run [43639262508](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43639262508), SUCCESS: 280 Python tests + 68 subtests; 21 Node tests; 60 Playwright tests; npm audit 0 vulnerabilities; build, generated-data freshness and Chromium install passed.
- **Status: DONE_VERIFIED for structural coverage of the listed medial inventory and its fail-closed browser behavior.** Complete syllable parsing and phonetic realization remain PARTIAL/BLOCKED by source-profile evidence and expert adjudication.

## Unknown Myanmar extension cluster boundary — 2026-11-14

- Finding: Python grouped an unknown Myanmar extension character after a valid Burmese syllable into that orthographic cluster and marked the tail unparsed; browser segmentation split the extension character into a separate unsupported token. Root cause: browser segmentation used PHONETIC_INPUT_CHARS as a segmentation boundary, while Python segments by Myanmar script-block membership and recognized following base consonants.
- Implementation: Removed inventory-membership splitting from browser Myanmar segmentation. All Myanmar-block code points remain in the current structural unit until a recognized new Burmese base consonant boundary; parser inventory validation remains downstream and fail-closed.
- Regression coverage: Added two Playwright cases: ကာ + U+AA60 stays one uncertain cluster; U+AA60 + ကာ stays two units and preserves the valid second onset. Existing Python regression covers the first source sequence.
- Commits: code 003e4db004361b90531990a692980ffb2a4a43c1; tests b01667abc786b11de455c5f4eb276083d43e64dd.
- Status: PARTIAL pending exact-head CI. Do not infer verification from earlier CI. No phonological mapping was introduced; IPA gold remains 0. Full parser parity remains PARTIAL pending shared projection fixtures for the full structural schema/status taxonomy and a broader source-annotated orthographic corpus.

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

## 2026-11-15 continuation — source-scoped onset/medial inventory

- Added 13-row evidence table: data/burmese/onset_cluster_evidence.csv; schema: schemas/onset_cluster_evidence.schema.json; integrity tests: tests/test_onset_cluster_evidence.py.
- The table is evidence-only and reuses registered source/claim IDs. It scopes Green's complex-onset restriction to minor syllables, keeps foot-initial and reduction claims prosodic/morphological, and separates modern Ishida medial descriptions from Hlaing orthographic combinations and STEDT historical inventories.
- All entries are WITHHELD from runtime. Exhaustive modern Yangon segmental cluster legality and lexical distribution remain PARTIAL. Exact-head CI is pending; do not mark DONE_VERIFIED until the new test passes on the final branch head.

## Exact-head verification — onset/medial evidence and terminology matrix — 2026-11-15

- Final code/data/test head for the 13-row onset/medial evidence table: the table, JSON Schema and four integrity tests were included before required CI run 43647554863. The later documentation-only terminology reconciliation was recorded after the exact code/data/test-head run by required workflow 43647671663.
- Exact code/data/test-head CI [43647671663](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43647671663) SUCCESS: **286 Python tests + 68 subtests**, **21 Node tests**, **64 Playwright Chromium tests**; npm audit reports **0 vulnerabilities**; production build, generated-data freshness, IPA-gold structural validator and Chromium browser tests passed.
- The optional comparator run [43647671628](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43647671628) is diagnostic only; Epitran and CRF jobs succeeded, Google FST job was still in progress at this note. No diagnostic output is IPA gold or an accuracy result.
- **Task ledger:** source-backed onset/medial evidence matrix + schema + integrity tests — DONE_VERIFIED; cross-source terminology reconciliation — DONE_VERIFIED as evidence documentation; exhaustive modern Yangon onset × medial × rime legality — PARTIAL; phonological runtime/IPA mapping — WITHHELD.
- This supersedes the previous note that exact-head CI was pending. Independent adjudicated IPA gold remains 0; accuracy remains null. Main remains unchanged; PR #147 remains open/draft.

## Terminal optional diagnostic closeout — 2026-11-15

Optional run [43647671628](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43647671628) is now **SUCCESS** on code/data/test head 424e27120d51c7d256b1d43b30b6897ea3761f42. All jobs passed: Epitran raw-output, CRF baseline and pinned Google Thrax/OpenFst build/symbol-table/raw-output.
- Google FST: 6/6 outputs, 0 runtime errors, gold 0, accuracy null; report SHA-256 7fec8ba8845c5fe8758155708eb8d32cfa1fa684b46eeaabc7fc8455abae0606.
- CRF: 100/100 predictions, 84/100 source-concordant, gold 0, accuracy null, scoring status NOT_SCORED_POSSIBLE_TRAINING_OVERLAP.
- Artifacts: Google 14134846400 (digest ac5cd0b7b00a746d67116fc32831369e555e316d554bedfc34bf6b18378b0949; expires 2027-02-12); Epitran 14134308008 (digest 13ae2b78ac2a9b961e1e10231a58f787fb5b11142640997b7a1bf6ff327dc797; expires 2027-02-12); CRF 14135275454 (digest dcd9667213ea2c611795a8b3851c7809ea26b853755e6b36291d373e9466ccc0; expires 2026-12-14).
These are raw-output diagnostics, not independent IPA gold, accuracy or promotion evidence. Earlier "still in progress" note is superseded.


## 2026-11-15 continuation — rime/prosody evidence

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Source-scoped rime × coda × tone × phonation evidence | 11-row Green 2005 / Mooney & Repetti-Ludlow 2021 matrix with source/claim/locator/profile fields; dedicated JSON Schema; all rows withheld from runtime | Dedicated integrity/schema tests added; exact-head CI pending | No independent adjudicated lexical IPA; one-speaker Mooney experiment is not a multi-speaker gold set | PARTIAL pending exact-head CI | Pass exact-head CI; then expand source coverage without conflating phonemic tone, /ʔ/, /N/, nasalization, quantity and duration |
| Modern Yangon lexical rime inventory | Source-level distributional constraints now machine-readable | Evidence-integrity checks only | No complete source-located lexical inventory or adjudicated rime × tone grid | PARTIAL | Recover and verify primary MLC/Okell lexical entries and item-level source locators; retain unsupported cells as unknown |


The rime/prosody evidence artifact now contains 12 rows (not 11): a printed-page check of Green 2005 corrected the open-only set to /e, o, ɔ/ and separately records /ɛ/ as open or pre-/ʔ/, excluding /ɛN/. Exact-head CI remains pending.


### Verification checkpoint — 2026-11-15

The rime/prosody evidence batch's code/data/test head is `f0c240abde1a1aedefcfcb3f9694311318f91c04`. Manual CSV/reference checks pass (12 rows, 16 fields, unique IDs, valid source/claim links, all WITHHELD). An earlier required CI attempt failed on two assertion wording mismatches (289 passed + 68 subtests); those assertions were corrected. The latest exact-head CI run `43689588512` remains QUEUED, so the task remains PARTIAL pending hosted verification. Local clone/test execution was unavailable because github.com DNS resolution failed in the container.


## Optional G2P diagnostics — completed artifact inspection (2026-11-15)

Workflow [43689588524](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43689588524) completed SUCCESS on code/data/test head `f0c240abde1a1aedefcfcb3f9694311318f91c04`; CRF, Epitran and Google Thrax/OpenFst jobs all completed. Downloaded artifacts were inspected:

| Candidate | Raw result | Gold / score | Interpretation |
|---|---|---|---|
| Google Thrax/OpenFst | 6/6 structural probes non-empty; 0 runtime errors | 0 gold; accuracy null | Build/execution smoke only |
| CRF | 100/100 predictions; 84/100 source-concordant | 0 gold; accuracy null; possible training overlap | Source concordance is not accuracy; model training membership unknown |
| Epitran 1.35.3 | Six structural probes emitted raw outputs | 0 eligible verified gold; exact-match accuracy null | Raw candidate output only |

Artifact IDs/digests: Google `14152141084` / `eb9e803bf203e363bcf2eb173e21024798b55678f62bbdd3205bd539f85db0f6`; CRF `14151244554` / `39e9d49a4f100af0cb1b0e65032ebb76cc1d53c5ef30bba4787968ceec912b91`; Epitran `14151438782` / `2ab261cf68a6078f0428575c6d0c8ec2264e640486cb7e98c11a3b585afc68e1`. All outputs remain diagnostic; none is gold or runtime-enabled. This supersedes the prior note that the Google job was still in progress.


## Accessibility continuation — 2026-11-15

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Keyboard skip navigation | Skip-to-main link on converter and methodology pages; main landmark is focusable after fragment navigation | Three Playwright regressions authored: both page routes and reduced-motion preference | GitHub file-content checks confirm markup/CSS/test presence; exact-head hosted CI not yet observed; no manual assistive-technology session | PARTIAL / CI PENDING | Pass required exact-head workflow; manually verify keyboard sequence and screen-reader announcement in at least one desktop browser |
| Reduced-motion preference | Existing CSS override retained and covered by new computed-style regression | Playwright test asserts computed `scroll-behavior: auto` under `reducedMotion: reduce` | No deployed browser/OS-level manual verification | PARTIAL | Pass exact-head CI; verify with OS preference and inspect any other animated transitions |
| Full accessibility QA | Existing labels, landmarks, focus-visible styling and live regions retained | Targeted keyboard/reduced-motion tests only | No WCAG audit, screen-reader, contrast matrix or mobile reflow audit completed | TODO | Complete manual keyboard, screen-reader, zoom/reflow, contrast and mobile checks; record browser/AT versions and findings |

Implementation head: `481c26d6951d4795e16e239f9332c3e42f7d3f44`. CI is not yet confirmed; do not promote these tasks to DONE_VERIFIED. No claim of WCAG conformance is made.


## Accessibility verification closeout — 2026-11-15

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| Keyboard skip navigation | Skip-to-main link on converter and methodology pages; main landmark is focusable after fragment navigation | Exact PR-head workflow 43690500850: both page routes pass in Playwright Chromium | Browser automation only; no assistive-technology session | DONE_VERIFIED (automated behavior) | Manual keyboard and screen-reader announcement check |
| Reduced-motion preference | CSS disables smooth document scrolling when reduced motion is requested | Exact PR-head workflow 43690500850: computed `scroll-behavior: auto` assertion passes | Emulated browser media preference; OS-level verification not performed | DONE_VERIFIED (automated behavior) | Manual OS preference verification and inspect any future transitions |
| Full accessibility QA | Existing labels, landmarks, focus-visible styling and live regions retained | Targeted keyboard/reduced-motion tests only | Limited static contrast sample: 8 selected text/focus pairs all ≥4.56:1; not a full-page audit | TODO | Screen reader, keyboard, zoom/reflow, mobile, and full state-by-state contrast checks; record browser/AT versions |

Exact PR head `a415dc1a89c7d9cf06a78896e3dcab3bb3824004`, tested merge ref `c559d4d0bbb88c44f7cd64bf199014b26b23d556`. Required workflow [43690500850](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43690500850) SUCCESS: 291 Python + 68 subtests, 21 Node, 67 Playwright Chromium, npm audit 0 vulnerabilities, build and generated-data freshness pass. IPA gold remains zero. No WCAG conformance claim.


## Additional source-scoped rime crosswalk — 2026-11-15

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| TUFS open/nasal/checked rime crosswalk | Three additional rows in `data/burmese/rime_prosody_evidence.csv`; explicit `documentary_crosswalk` evidence type distinguishes notation correspondence from experimental/source phonology | Regression test asserts separate open, nasal-closed and checked-closed records, MED notation distinction, /ɴ/ vs /ʔ/, and runtime withholding | Published TUFS module Section 1.3 table 2 inspected; university module is a secondary phonetics reference, not direct MED dictionary extraction | PARTIAL / CI PENDING | Exact-head hosted CI; independently adjudicated lexical coverage and source-profile reconciliation remain outstanding |

No runtime or generated data was changed. All 15 rows remain WITHHELD.


## TUFS rime crosswalk exact-head verification closeout — 2026-11-15

| Layer / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| TUFS open/nasal/checked rime crosswalk | Three additional rows; schema adds `documentary_crosswalk`; all 15 evidence rows have 16 valid CSV fields and source/claim links | Exact PR-head workflow [43691172177](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43691172177) SUCCESS: 292 Python + 68 subtests, 21 Node, 67 Playwright Chromium, npm audit 0 vulnerabilities, production build and generated-data freshness pass | TUFS §1.3 table 2 inspected; secondary university crosswalk only, not direct MED dictionary extraction or independent lexical adjudication | DONE_VERIFIED (evidence artifact and engineering CI only) | Expand item-level Yangon lexical coverage; preserve notation distinctions and keep runtime withheld pending adjudication |

The wider `BURMESE-YANGON-RIME-GRID-001` remains PARTIAL. All 15 rows are WITHHELD; no runtime or generated data changed. Exact verified PR head `673319e267edeca7bf1a4d082fdf17835cfe8ffc`.


## Additional lexical attestations for am. — 2026-11-15

| Area | Evidence extension | Validation | Status / boundary |
|---|---|---|---|
| MLCTS `am.` collision, source units `မ့်;ံ့` | Wiktionary lexical audit now records four first-side entries: စိမ့် /sḛɪɴ/, ဆိမ့် /sʰḛɪɴ/, နိမ့် /nḛɪɴ/, လိမ့် /lḛɪɴ/; opposite side remains ကြံ့ /t͡ɕa̰ɴ/ | Source claim and lexical audit updated; regression test checks all five word/IPA/MLCTS items and retains non-promotion guard | PARTIAL / secondary distinction evidence only; not a controlled minimal pair or primary MLC adjudication; no runtime/Ukrainian mapping promotion |

The four first-side entries reinforce a source-level lexical distinction but do not fill the missing independent adjudication gate.


## am. lexical evidence verification closeout — 2026-11-15

| Area | Implemented evidence | Verification | Status / acceptance boundary |
|---|---|---|---|
| MLCTS `am.` source-unit distinction `မ့်;ံ့` | Four Wiktionary first-side entries (စိမ့်, ဆိမ့်, နိမ့်, လိမ့်) and one opposite-side entry (ကြံ့), each with recorded IPA/MLCTS; source claim and audit updated | Exact-head PR CI [43692035411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43692035411) SUCCESS: 293 Python + 68 subtests, 21 Node, 67 Playwright Chromium, 0 npm vulnerabilities, build and generated-data freshness pass | DONE_VERIFIED as a secondary lexical audit extension only; not primary MLC adjudication, controlled minimal pair, independent gold or runtime approval |

No runtime, IPA gold, Ukrainian mapping or generated pronunciation data changed. Wider Yangon rime coverage remains PARTIAL.


## Final am. evidence verification — 2026-11-15

The final data/test head `74dc298086292bd6cbaeb965eb1a6ad9e1926a74` passed workflow [43692279971](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43692279971): 293 Python + 68 subtests, 21 Node, 67 Playwright Chromium, npm audit 0 vulnerabilities, build and generated-data freshness pass. Diff hygiene verified that only one source-claim row and one lexical-audit row changed relative to the pre-change head; no runtime/generated artifacts changed. Later commits in this closeout are documentation-only.


## Additional lexical attestations for any: — 2026-11-15

| Area | Evidence extension | Validation | Status / boundary |
|---|---|---|---|
| MLCTS `any:` collision, source units `ဉ်း;ည်း` | Four Wiktionary entries on `ဉ်း`: အကျဉ်း /ʔət͡ɕɪ́ɴ/, စဉ်း /sɪ́ɴ/, ကျဉ်း /t͡ɕɪ́ɴ/, ဖျဉ်း /pʰjɪ́ɴ/; opposite `ည်း` remains နည်း /nɛ́/ or /ní/ | Existing source claim and lexical audit updated; regression test checks all examples and preserves the two source-unit spellings | PARTIAL / secondary lexical evidence only; not a controlled minimal pair or primary MLC adjudication; no runtime/Ukrainian mapping promotion |

The additional attestations expand coverage but do not resolve the primary MLC adjudication requirement.


## Historical orthographic lead for am: — 2026-11-15

| Area | Evidence extension | Validation | Status / boundary |
|---|---|---|---|
| MLCTS `am:` opposite source unit `ံး` | St. John (1894), *A Burmese Reader*, contains `ကံး` with English glosses including day/sun; preface states spelling generally follows Judson and acknowledges variation among Burmese books | Added source-registry record, documentary claim, audit interpretation and regression guard | PARTIAL / historical spelling only; no IPA, modern MLCTS or MLC adjudication; `am:` remains `SECONDARY_ONE_SIDE_ONLY`; no runtime/Ukrainian promotion |



## Additional component attestation for im — 2026-11-15

| Area | Evidence extension | Validation | Status / boundary |
|---|---|---|---|
| MLCTS `im`, source unit `ိံ` | Wiktionary `တာဝတိံသာ` gives contributor IPA `/tàwa̰tèɪɴθà/`, MLCTS `tawa.timsa`, and cites MLC Myanmar-English Dictionary (1993); the form contains component `တိံ` | Existing `im` row and source-claim ledger extended; regression test preserves component status and IPA provenance | PARTIAL / Pali-derived proper noun; secondary Wiktionary IPA, not MLC IPA; not native minimal pair or primary MLC adjudication; no runtime/Ukrainian promotion |



## Additional lexical corroboration for um: — 2026-11-15

| Area | Evidence extension | Validation | Status / boundary |
|---|---|---|---|
| MLCTS `um:`, source unit `ုမ်း` | Myanmar Net dictionary index lists borrowed proper noun `ဟုမ်းမရူး` (“Home Rule”) with non-IPA respelling `/houn: ma ru:/`; first component `ဟုမ်း` contains `ုမ်း` | Added source registry entry, documentary claim, existing audit-row provenance and regression guard | PARTIAL / borrowed English compound; non-IPA respelling only; underlying dictionary edition unspecified; not independent phonetic gold or primary MLC adjudication; no runtime/Ukrainian promotion |



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


## 2026-11-15 — exact-head CI and optional diagnostics terminal closeout

| Area | Evidence | Verification | Status / boundary |
|---|---|---|---|
| Required CI on current research head `1bc34e6d51c9f3589b66f50636fe9e29301ede7f` | Existing code/data/test state, no new implementation change | Push [43696075472](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696075472) and PR [43696078055](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696078055) SUCCESS: 298 Python + 68 subtests, 21 Node, 67 Playwright Chromium; npm audit 0 vulnerabilities; build, generated-data freshness and IPA-gold structural validation pass | DONE_VERIFIED for current engineering checks; zero adjudicated IPA gold, accuracy null |
| Optional engine diagnostics | Pinned Google Thrax/OpenFst, CRF baseline, Epitran raw-output | [43696078060](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696078060) SUCCESS: FST 6/6 outputs and 0 runtime errors; CRF 100/100 predictions, 84 source-concordant but unscored due possible training overlap; Epitran raw-output completed | DONE_VERIFIED for execution and artifact upload only; no accuracy claim or runtime promotion |

Artifact IDs: Google FST 14154970133; CRF 14154556115; Epitran 14154307632. All diagnostic reports retain `gold_count=0` / `accuracy=null` where applicable. The research branch is 1,138 commits ahead of main and 0 behind; PR #147 remains open/Draft; PR #129 untouched. Overall release readiness remains PARTIAL PROTOTYPE.



## 2026-11-15 — exact current-head verification refresh

| Work item | Evidence | Status |
|---|---|---|
| Required engineering CI on branch head `9fdac2c94872eeb5702e801e1c46ea5e932ff6ae` | Push workflow [43696922642](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696922642) SUCCESS: 298 Python + 68 subtests, 21 Node, 67 Playwright Chromium; npm audit 0 vulnerabilities; production build and generated-data freshness passed; IPA-gold structure validator ran with zero gold records | DONE_VERIFIED for engineering gates only |
| Optional external-engine diagnostics | [43696922641](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43696922641) SUCCESS: Thrax/OpenFst 6/6 raw outputs, 0 runtime errors; CRF 100/100 predictions, 84 source-concordant, NOT SCORED due possible training overlap; Epitran raw output completed | DONE_VERIFIED for execution/artifact provenance only; no accuracy claim |
| Independent phonetic evaluation | IPA gold count 0; accuracy null across diagnostics | BLOCKED pending independent expert-adjudicated modern Yangon IPA gold |
| Production linguistic readiness | No candidate engine promoted; tone/register, /N/, full Yangon rime/prosody and source-specific ambiguities remain unresolved | PARTIAL PROTOTYPE; not release-ready |

Diagnostic artifacts: FST 14154897335 (archive SHA-256 `961b5989e9c037861f7bebd07fa86c6bec2547b69eeff7d6a43facc9c0cc2058`); CRF 14154871257 (`a7f21f44ca369e5857ae1eb6473128b1c0d4cf39388b405997151eeb7a6252a6`); Epitran 14154353595 (`18bbd88f16025d699bf4896eef81ef197b8881612b8f6f27d0d98bbb1f62e7ca`). These are raw-output diagnostics, not benchmark accuracy.



## 2026-11-15 — SEAlang live-access probe and primary-record blocker

- Re-inspected the live SEAlang Burmese dictionary page. It identifies its principal source as the Myanmar-English Dictionary (1993, Myanmar Language Commission; 1996 Dunwoody Press reprint, used with permission), reports approximately 35,000 entries, confirms MLC 1986 standard orthography, and exposes an IPA phonetics search field. The live HTML form posts to `https://sealang.net/burmese/search.pl`; the documented 2008 SEAlang Services paper describes a Web API for dictionary lookup and gives an example request shape, but does not by itself establish that the legacy API remains operational today.
- Tested the live CGI endpoint with ordinary orthographic targets including `ကမ်း`, `သိမ်း`, and `မြန်မာ`, plus a phonetic query. Each returned the server diagnostic `SNARK: could not read ../../ram//.tei` followed by “Nothing found”; this is an infrastructure/backend failure signal, not evidence that the dictionary lacks those entries. The legacy `api.sealang.net` endpoint could not be reached through the available retrieval proxy (ERR_TUNNEL_CONNECTION_FAILED).
- **BLOCKED — entry-level MLC evidence:** no live dictionary entry, IPA transcription, definition, or export record was retrieved. Do not mark any rime collision resolved or import data from the page's interface metadata. Acceptance requires a functioning record lookup/export or direct inspection of the 1993/1996 dictionary, with exact headword, displayed transcription, query/date and provenance captured. Copyright remains with MLC/Dunwoody Press; retrieval does not grant redistribution rights.
- Useful primary-source access references: [live SEAlang Burmese Dictionary](https://sealang.net/burmese/dictionary.htm), [dictionary query help](https://sealang.net/help/q-dict.htm), and the archived [SEAlang Services API description](https://www.sealang.net/archives/sealang-2008.pdf). These establish interface/search capability and provenance, not entry-level lexical claims.
- No registry rows, source claims, IPA labels, runtime rules, Ukrainian mappings or generated outputs changed as a result of this failed access probe.



## 2026-11-15 — MLC primary dictionary access route refined

| Work item | Evidence | Status |
|---|---|---|
| Identify a primary dictionary acquisition route | Dunwoody Press lists the 1996 reprint of the 1993 MLC dictionary; NDL and Cinii catalogue 1993/1996 copies; Cinii lists a 2019 revised second edition at University of Tokyo | DONE_VERIFIED for bibliographic discovery only |
| Inspect dictionary transcription semantics and entries | No physical/digital page or entry inspected; 1996 publisher says only “transcription system” for pronunciation aid, not IPA semantics | TODO / BLOCKED pending access to book pages |
| Resolve lexical rime collisions from MLC | No primary lexical examples transcribed or adjudicated | BLOCKED pending page-level evidence and notation-key interpretation |

Source records added: `MLC1996_REPRINT_CATALOG`, `MLC2019_REVISED_BIB`; claims: `CLM-MLC1996-PRONUNCIATION-AID-001`, `CLM-MLC2019-REVISED-EDITION-001`. Catalogue evidence is bibliographic only and does not authorize pronunciation or runtime promotion.



## 2026-11-15 — live canonical registry totals (supersedes older snapshots)

Current branch CSV parse: **96 sources / 207 claims / 25 rime groups**. Rime distribution: **15 secondary equivalence / 5 secondary one-side-only / 3 secondary distinction / 1 secondary conflict / 1 special non-rime**. All source IDs and claim IDs are unique; every claim references an existing source. Earlier 80-source counts are historical snapshots. This was a structural CSV/reference check, not a full schema or pytest run.


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


## 2026-11-15 — MLC dictionary evidence access refinement

- **PARTIAL:** a secondary MED-linked lexical index is discoverable. TIL's Romabama pages contain lexical examples with MEDict page references, and SHACHI describes the SEAlang Burmese Dictionary as based on the 1993 MLC dictionary and used with permission. Dunwoody Press and WHO Myanmar Library records establish catalogue/holding routes.
- **BLOCKED:** primary MLC transcription key and original entry pages remain uninspected; the SEAlang dictionary endpoint timed out; SHACHI metadata is not the dataset or a project reuse license. TIL's displayed Roman forms belong to the TIL author's Romabama conventions and must not be mislabeled as MLC transcription or IPA.
- Acceptance criterion: inspect a primary MED copy (including its front matter / notation key and page-located entries), then reconcile any secondary TIL/SEAlang forms against those pages; separately verify rights before extracting or redistributing data. Until then, do not add MED lexical rows or use them as IPA gold.
- No runtime, corpus, IPA annotation, mapping or licensing state changed. Overall readiness remains PARTIAL PROTOTYPE.

## 2026-11-15 — Mya2Rom narrows the MED notation variant (secondary evidence)

- **PARTIAL / stronger identification:** Mya2Rom's README distinguishes orthographic MLCTS from modified/phonetic MLCTS2 and explicitly states that MLCTS2 is used by the Myanmar Language Commission for its Myanmar-English Dictionary and by SEAlang. This is a secondary implementer statement, not inspection of the MLC dictionary's notation key.
- Reconciled against the already registered/vendored source MYA2ROM044 and existing MLCTS2, MLCTS-vs-MLCTS2 and limitations claims; no duplicate source or claim row retained. Added a regression test covering those existing records.
- Mya2Rom is not an IPA gold source: its README documents no schwa or voicing-sandhi modelling, incomplete stacked-letter/asat handling, omission of alternate pronunciations and Pali/Sanskrit exceptions. Its IPA mode is described as a Wikipedia-style output, not the MED's own transcription.
- Acceptance remains: inspect primary MED front matter and page-located entries; verify exact symbol semantics and source rights independently; reconcile Mya2Rom/SEAlang/TIL forms against the primary pages. No runtime, IPA labels, gold or Ukrainian mappings were changed.

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
## Публікація GitHub Pages і live smoke test — 2026-11-15

- DONE_VERIFIED — merge/publish: PR #147 об'єднано методом squash у main; merge commit 69cb277ea1d9209432d91adbed250625b14f3ee4.
- DONE_VERIFIED — deployment: GitHub Actions workflow Deploy site to GitHub Pages, run https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43742948563, event push, head_sha=69cb277ea1d9209432d91adbed250625b14f3ee4, conclusion success.
- DONE_VERIFIED — public smoke test: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ віддає оновлений інтерфейс. У браузері введено မြန်မာ; MLCTS показав mran ma, романізаційна матриця — мранма; фонетичний режим показав ?ma та ⟦မြန်⟧ма, позначивши перший сегмент як NOT_ESTABLISHED / ANALYSIS_DEPENDENT. Структурний trace показав မြန် і မာ. Консольних помилок і page exceptions у smoke test не виявлено.
- Висновок про коректність: smoke test підтверджує роботу публічного UI та контрольовану відмову від непідтвердженої вимови, але не є лінгвістичною валідацією. Незалежний ад’юдикований IPA gold corpus: 0 записів; емпірична IPA/українська точність лишається null.
- PARTIAL — linguistic coverage: повна модель голосних, checked syllables/coda, тон/регістр/фонація, медалі/кінзі/кон’юнкти та незалежна лексична валідація залишаються незавершеними або доказово обмеженими.
- TODO — release hygiene: ручний screen-reader/contrast/focus QA та перевірка на фізичному мобільному пристрої ще не підтверджені.
- BLOCKER: без незалежно ад’юдикованих, джерельно атрибутованих IPA gold записів не можна заявляти виміряну точність або називати рушій лінгвістично завершеним.
## Runtime provenance clarification and republished methodology — 2026-11-15

- DONE_VERIFIED — architecture inspection: live browser phonetic mode uses repository JavaScript structural parsing + deterministic evidence-gated Burmese-to-IPA rules + project Ukrainian IPA adapter; it is not a third-party G2P ensemble.
- DONE_VERIFIED — romanization provenance: separate browser MLCTS mode calls vendored Mya2Rom 0.4.4 (CC BY-SA 4.0) and then the project's MLCTS-to-Ukrainian adapter. Its rime inventory remains EVIDENCE_LIMITED; this route is orthographic romanization, not IPA.
- DONE_VERIFIED — research-only comparators: Python HybridBurmeseEngine is an optional wrapper. Google Burmese WFST, myG2P, Epitran, CRF and CLI providers require explicit injection; outputs remain diagnostic candidates and are not promoted or voted into canonical IPA. They are not public-site runtime dependencies.
- DONE_VERIFIED — documentation/UI: README, methodology page, deterministic-engine contract and hybrid-engine note now describe the split accurately. PR #149 merged as 3abfe992eac8d38932ce0f5aff1bd7161589292e.
- DONE_VERIFIED — CI and Pages: workflow 43747683399 SUCCESS; Pages workflow 43747683385 SUCCESS including browser suite, deployment and deployed-site/runtime-asset smoke test. Public methodology page was fetched and verified with the new sections.
- PARTIAL — implementation parity: browser and Python deterministic engines are separate implementations. Shared structural contracts are tested, but full phonological parity remains unproven.
- BLOCKED / evidence-limited — linguistic accuracy: independent adjudicated Yangon-profile IPA gold remains 0; empirical accuracy remains null. Do not promote proposed phonetic rules based on structural smoke tests or third-party raw outputs.
- No runtime phonological mappings or Ukrainian transcription rules were changed in this work.

## GitHub Pages browser hybrid ports — 2026-11-15 (merged and deployed)

- DONE_VERIFIED — implementation: PR #151 was squash-merged to `main` as `fa39452804257b0997a2ce37bd3d915ac56f4555`. The public browser now runs a project-owned hybrid orchestrator with (a) the existing deterministic project rules as canonical output, (b) a narrow Epitran 1.35.3 `mya-Mymr` mapping/postprocessing port, and (c) a local Google Burmese Thrax/OpenFst WFST candidate provider. The UI exposes provider status, candidate IPA, agreement/divergence and Ukrainian-adapter previews; external candidates are never auto-promoted.
- DONE_VERIFIED — Google model build and export: the main-branch Pages workflow built the pinned Google model and exported a same-origin static JSON graph. Final generated graph: start state 130, 195 states, 2,966 arcs, 20 final states, 191,796 bytes. The browser downloads only this local static asset; no user text is sent to a server or third-party API.
- DONE_VERIFIED — source alphabet parity: the build-time validator checked all 224 Myanmar codepoint entries in the pinned Google `my/codepoint.syms` table. Google WFST browser interpreter output matched upstream `thrax_g2p` on all 4 build-time probes. This is implementation parity, not IPA accuracy.
- DONE_VERIFIED — browser integration: the built-site Playwright suite passed 70/70, including a live generated-model check that requires a `GOOGLE_WFST` candidate in the hybrid panel. The browser suite also verified same-origin-only requests for the local hybrid path.
- DONE_VERIFIED — main CI: workflow `43756709423` SUCCESS; 312 Python tests and 68 subtests passed, 38 Node tests passed, 70 Playwright tests passed; dependency audit reported 0 vulnerabilities.
- DONE_VERIFIED — GitHub Pages deployment: workflow `43756709415` SUCCESS on main commit `fa39452804257b0997a2ce37bd3d915ac56f4555`; deployed-site smoke test fetched the homepage, methodology page, built JS/CSS, vendored Mya2Rom assets and `/models/google-burmese-wfst.json`, and asserted the model is available with nonzero arcs. Public URL: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/
- DONE_VERIFIED — provenance/licensing: Epitran MIT mapping and Google Language Resources Apache-2.0 source notices are included; Google, OpenFst and Thrax revisions are pinned. The Google upstream README describes the language only as Burmese / Myanmar and does not specify a dialect profile; the generated model records `dialect_profile: null`. The Epitran port is deliberately narrow, not the full Python/PanPhon package.
- PARTIAL — linguistic validation: independent profile-matched IPA gold remains 0 and empirical IPA/Ukrainian accuracy remains null. The external providers remain diagnostic candidates. Agreement between engines is not independent evidence.
- DEFERRED — myG2P browser port (dictionary CC BY-NC-SA 4.0; no commercial redistribution permission assumed), CRF and Goruut ports (no sufficient model/license/quality basis for this static-site pass).
- TODO — manual screen-reader, contrast/focus and physical mobile-device QA remain unverified.
- Preserved — the project deterministic rules, Ukrainian IPA adapter, separate Mya2Rom 0.4.4/MLCTS orthographic route, and research-only Python `HybridBurmeseEngine` remain in place. No phonological mapping rules were promoted or replaced in this port.
- PR #129 remains open/draft and untouched; it is a separate research Python-wrapper/benchmark track, not a dependency of the Pages browser port.
- Release assessment: the hybrid browser shell is technically deployed and smoke-tested on GitHub Pages. The repository remains a research prototype, not a linguistically release-ready transcription system, until independent profile-matched IPA gold and manual accessibility/mobile QA are complete.


## 2026-11-15 · GitHub Pages hybrid browser port

- **DONE_VERIFIED (delivery/integration):** PR #151 merged; current deployed main commit `75afaa8b216a7718bdf71ea9d865cb135cac20ec`; Pages workflow [43757659164](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43757659164) SUCCESS. No backend/API was introduced.
- **DONE_VERIFIED (Google WFST build/export):** pinned Google language-resources Burmese Thrax/OpenFst graph exported as a static same-origin JSON asset: start state 130, 195 states, 2,966 arcs, 20 finals, 191,796 JSON bytes. The deployment smoke test fetched this asset and asserted `available === true` and `arc_count > 0`.
- **DONE_VERIFIED (implementation parity, narrow smoke set):** browser WFST interpreter matched upstream `thrax_g2p` CLI exactly on four fixed strings (`ကေ`, `ကော်`, `မြန်`, `ယူ`). This is implementation parity, not independent pronunciation validation.
- **DONE_VERIFIED (browser integration):** local Epitran 1.35.3 mapping port, deterministic project rules, and Google WFST run in the hybrid UI; provider candidates and Ukrainian adaptations are displayed separately as PROVISIONAL and are not promoted into canonical output.
- **DONE_VERIFIED (CI):** Python and Node test steps, production build, and Playwright built-site suite completed successfully; Playwright reported 70 passed. Deploy job successfully fetched pages, JS/CSS, Mya2Rom assets and the WFST model.
- **Still BLOCKED/PARTIAL:** independent profile-matched IPA gold remains 0; dialect profile of upstream Google model is unspecified; Epitran is a narrow mapping/postprocessor port, not full Python/PanPhon; Python/browser parity against independent gold is not established; manual screen-reader/real-device accessibility QA remains outstanding.
- **Release classification:** deployed research prototype / partial linguistic system. The site is live with a real hybrid browser engine, but it is not a linguistically validated or accuracy-certified transcription engine.


## 2026-11-15 — IPA-first browser integration ledger

Starting main: `8aa91f3aa289b18fccd4dee338849b843441c1fc`.
Work branch: `fix/ipa-first-hybrid-pipeline-2026-11-15`.

| Task | Status | Evidence / acceptance |
|---|---|---|
| Make the hybrid orchestrator the actual source of phonetic UI output | DONE_VERIFIED | Public render uses `analyzeHybrid().ipa` and `.uk`; parser-side `sy.uk` and pre-hybrid aggregate output removed; test run 43768906066 passed on code/test head `e321e72b610bbe4516570411821702d5597cca9a` |
| Enforce selected IPA → one Ukrainian adapter | DONE_VERIFIED | Full selected IPA and segmental-only candidate previews both pass through the same `renderUkrainian()` adapter; segmental preview is explicitly PROVISIONAL and canonical fields remain withheld; Python API exposes matching additive metadata |
| Preserve provider provenance and no-voting policy | DONE_VERIFIED | Typed provider candidates retain provenance; external outputs never vote or replace project candidates; uncertain/unsupported structure blocks internal candidate leakage |
| Distinguish tone-only differences from segmental divergence | DONE_VERIFIED | NFD-aware comparison distinguishes exact agreement, segmental agreement with tone/prosody difference, and segmental divergence; 47 Node tests and 70 Playwright tests passed; built browser conditionally checks Google candidate when model is present |
| Keep dialect profile matching explicit | BLOCKED | Google and Epitran profile compatibility is not independently adjudicated |
| Independent lexical IPA gold and accuracy | BLOCKED | Adjudicated profile-matched gold count remains 0 |
| Full medials/kinzi/conjunct/rime/prosody coverage | PARTIAL/BLOCKED | Structural recognition and provider outputs exist; evidence-backed canonical realization is incomplete; lexical/contextual tone and profile gold remain unavailable |

Research constraints incorporated: Oo20's corpus is Yangon-recorded speech with word segmentation, not a phoneme-labelled G2P gold set; Watkins 2001 is one Rangoon consultant and must remain scope-limited; Hla14's reported accuracy is orthographic syllabification, not G2P; Thu16's MLC lexicon is not licensed for redistribution by the paper itself.


### 2026-11-15 — completeness gate refinement

- Canonical selection now requires an internal IPA candidate with status `ESTABLISHED`/`WELL_SUPPORTED`, explicit `prosodyStatus` of the same accepted level, and a non-empty explicit `profileId`.
- A project IPA string without tone/profile evidence is `SEGMENTAL_ONLY` and `ANALYSIS_DEPENDENT`; its Ukrainian adaptation is shown only as a provisional preview through the IPA adapter.
- Regression coverage verifies that `ka` without prosody/profile metadata is withheld, while a fully scoped candidate reaches the adapter.
- This prevents a segmental-only output from being mistaken for full Burmese IPA.


### 2026-11-15 — research expansion and canonical gate

- Added GRUBER2011, TIAN2018 and DELLWO2020 to the source registry; added source-scoped claims and three new rime/prosody evidence rows. data/burmese/rime_prosody_evidence.csv now has 18 rows; all remain WITHHELD.
- Evidence consequence: lexical tone uses interacting phonation/F0/duration cues; grammatical tone can be context-conditioned; standard/southern varieties differ in cue weighting. These are not context-free orthographic rules.
- Mooney & Repetti-Ludlow's vowel/coda alternation account is kept separate from tone assignment; it is tone-independent in the environments analyzed and remains source-scoped.
- Current implementation status: canonical IPA selection is blocked unless segmental IPA, explicit prosody status and an explicit profile ID are present. The browser parser currently supplies no such lexical/prosodic annotation; simple forms such as ka remain SEGMENTAL_ONLY.
- Browser parser no longer computes a parallel sy.uk or a second ipaText/ukText output. convert() returns structural segments; analyzeHybrid() owns the main phonetic result; the selected IPA reaches renderUkrainian() once.
- Exact-head CI remains pending at this ledger update; see PR #154. Do not mark the implementation DONE_VERIFIED until all relevant jobs, including built-browser Playwright, pass.


### Segmental candidate display refinement — 2026-11-15

The browser now follows the Python engine's existing distinction: a deterministic segmental string such as ka may be displayed with its IPA-adapted Ukrainian candidate, but both remain explicitly provisional while tone/phonation/quantity and profile evidence are missing. The complete/canonical claim remains withheld; unknown structures such as မြန် remain bracketed. This avoids turning evidence caution into an empty interface while keeping the full-pronunciation status honest.


### Python API completeness metadata — 2026-11-15

The Python RuleBasedBurmeseEngine now exposes the same distinction additively: `ipa` remains the segmental candidate for compatibility; `ipa_status=analysis_dependent`, `phonetic_completeness=SEGMENTAL_ONLY`, `prosody_status=not_established`, and `profile_status=PROFILE_SCOPED_NOT_INDEPENDENTLY_ADJUDICATED` are explicit; `canonical_ipa` and `canonical_ukrainian` remain null; Ukrainian candidate status is PROVISIONAL. Mixed-input onset/rime previews are no longer labeled SUPPORTED_PATH. Regression tests cover this contract. Exact-head CI pending.


Registry checkpoint from current branch: `data/burmese/sources.csv` has 101 data rows; `data/burmese/source_claims.csv` has 221 data rows; `data/burmese/rime_prosody_evidence.csv` has 18 data rows. The 3 new tone/context/dialect evidence rows are all WITHHELD.


### Exact verification checkpoint — 2026-11-15

Code/test head: `e321e72b610bbe4516570411821702d5597cca9a`; final PR head: `84cd2cc726b2f0aa7b8ba81b86eb291e7d0636d9`; squash merge/main commit: `4927150f5ece769370726cd4d693135ff58a04a2`. GitHub Actions test run [43769213528](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43769213528) completed SUCCESS: 315 Python tests + 68 subtests; 47 Node tests passed; production build and generated/web data validation passed; Playwright built-browser suite 70 passed; npm audit reported 0 vulnerabilities. Optional diagnostics [43769387484](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43769387484) completed SUCCESS: Google FST 6/6 outputs, 0 runtime errors, 3 symbol-table tests passed; CRF 100/100 predictions, 84 source-concordant, gold_count=0 and not scored because of possible training overlap; Epitran raw-output artifact uploaded. None of these outputs is gold or accuracy evidence. PR #154 was merged. GitHub Pages deployment [43769387460](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43769387460) completed SUCCESS for main commit `4927150f5ece769370726cd4d693135ff58a04a2`; deployed smoke test fetched the home page, methodology page, JS/CSS, Mya2Rom assets and Google WFST JSON and verified the model is available with non-zero arcs. Live URL: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.


### Post-merge deployment checkpoint — 2026-11-15

- PR #154 merged by squash; main commit `4927150f5ece769370726cd4d693135ff58a04a2`.
- Pages workflow [43769387460](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43769387460) SUCCESS; deploy and smoke-test jobs both passed.
- Main-commit test workflow [43769387448](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43769387448) SUCCESS.
- Optional diagnostic workflow [43769387484](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43769387484) SUCCESS. Google FST 6/6 raw outputs, 0 runtime errors, 3 upstream symbol tests passed; CRF 100 predictions/84 source-concordant, but no gold and NOT_SCORED_POSSIBLE_TRAINING_OVERLAP; Epitran raw output artifact available. All remain diagnostic.
- Site is live at https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.
- Remaining linguistic blockers unchanged: 0 independent profile-matched IPA gold; provider profile equivalence unverified; phonological coverage partial; manual screen-reader/real-device accessibility QA outstanding. Classification remains PARTIAL LINGUISTIC PROTOTYPE, not release-ready.

### 2026-11-16 · Visible provider-specific provisional previews

- PR #156 merged as `6a804901bf1f55fce3559696f73ce9ccc5373642`; source branch `feat/visible-provisional-provider-previews-2026-11-16`.
- Added a dedicated, visibly labelled PROVISIONAL preview section below canonical Ukrainian output. It assembles provider-specific IPA→Ukrainian candidate adaptations for project segmental rules, Epitran and Google WFST, preserving spaces/non-Myanmar text and marking segments without a candidate as `⟦…⟧`.
- Canonical IPA/Ukrainian fields are unchanged. External providers do not vote or become canonical; preview is diagnostic and explicitly not confirmed transcription.
- CI [43833796332](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43833796332) SUCCESS on feature head: 315 Python tests + 68 subtests, 70 built-browser Playwright tests, production build, generated data validation, npm tests and npm audit 0 vulnerabilities. A first test attempt failed only because an assertion expected wording different from the UI copy; corrected and reran the full workflow successfully.
- PR check [43833807816](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43833807816) SUCCESS. Main merge commit: `6a804901bf1f55fce3559696f73ce9ccc5373642`.
- Deployment [43834003555](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43834003555) for the first merge commit was cancelled while PR validation occupied the shared `pages` concurrency group. PR #157 fixed this by isolating each PR queue from the production main queue. Verification: main deployment [43834457247](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43834457247) completed SUCCESS with build, model generation, parity checks, tests, deploy and deployed-site smoke test all passing.
- Linguistic blockers remain: independent profile-matched IPA gold count 0; no accuracy score; provider dialect equivalence, tone/phonation/quantity and complex medials/kinzi/conjunct/coda coverage incomplete. Classification remains deployed research prototype, not linguistically release-ready.


### 2026-11-16 · Final Pages verification after queue-isolation fix

- PR #157 merged as `7548ffed7b264af836e1fbf124cdcff8d093a8c7`; main branch now contains the provider-preview UI and Pages concurrency isolation.
- Main test workflow [43834457242](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43834457242) SUCCESS. Python: 315 passed + 68 subtests; Node tests passed; production build and generated-data freshness passed; 70 built-browser Playwright tests passed; npm audit found 0 vulnerabilities.
- Production Pages workflow [43834457247](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43834457247) SUCCESS on exact main SHA `7548ffed7b264af836e1fbf124cdcff8d093a8c7`. Pinned Google WFST build, symbol-table invariants, input alphabet check, browser/upstream `thrax_g2p` parity, site build, all tests, deployment and live HTTP smoke test passed.
- Smoke test URL: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/. It fetched home, `system.html`, built JS/CSS, Mya2Rom JS/romanisations and Google WFST JSON; model `available=true` and `arc_count>0` assertions passed.
- The PR/main workflow overlap now runs concurrently under separate Pages concurrency groups; main deployment no longer waits behind PR preview builds. The cancelled earlier main run 43834003555 is superseded by the successful run 43834457247.
- Public homepage status date updated to 16.11.2026 and now explains the separately labelled provider previews.
- Readiness remains PARTIAL LINGUISTIC PROTOTYPE. Independent profile-matched IPA gold count is 0; accuracy is not measured; provider dialect equivalence and tone/phonation/quantity/medial/kinzi/conjunct/coda coverage remain incomplete. No linguistic release-readiness claim.

### 2026-11-16 · PR #159 — canonical output withholding for provisional segmental candidates

- **DONE_VERIFIED (implementation and PR validation):** PR [#159](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/159) merged by squash into `main` as `6986d4caf1f17f0b74bf7b921789cd4f016ef67e`; reviewed feature head was `bede352ce5ae1565dc7d45b4914cdda881c808ad`. The fix removes the fallback that copied segmental-only IPA and provisional Ukrainian adaptations into canonical `ipa`/`uk`. Canonical IPA now requires a selected profile/prosody-complete IPA; unresolved output is `?`. Canonical Ukrainian output requires a selected adaptation; unresolved Burmese remains bracketed. Candidate previews stay in the separate PROVISIONAL diagnostics UI.
- **DONE_VERIFIED (PR CI):** test workflow [43846969019](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43846969019) and PR Pages build workflow [43846969175](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43846969175) both SUCCESS on the exact feature head. The Pages build included pinned Google WFST construction, IPA symbol-table and input-alphabet invariants, upstream `thrax_g2p` parity, production build, unit tests and `npm run test:browser:built`; artifact upload succeeded. Browser suite: 70 passed on the PR validation workflow.
- **Acceptance behavior:** for `ကာ` with segmental-only `ka`, canonical fields withhold the unsupported claim (`ipa: ?`, `uk: ⟦ကာ⟧`); a separately labelled provisional preview may still show the candidate. Browser expectations were updated for `ကာ`, `ကေ`, `ကမ`, mixed text and punctuation.
- **DONE_VERIFIED (live public UI regression check):** after the successful main deployment, a real browser session on the public Pages URL entered `ကာ`, `ကေ`, `ကမ`, `မြန်`, `မာ`, and `မြန်မာ`. Observed canonical pairs were respectively `? / ⟦ကာ⟧`, `? / ⟦ကေ⟧`, `?? / ⟦က⟧⟦မ⟧`, `? / ⟦မြန်⟧`, `? / ⟦မာ⟧`, and `?? / ⟦မြန်⟧⟦မာ⟧`. Provider-specific previews remained separately labelled PROVISIONAL. The browser confirmed the intended separation in the live UI; these are contract/regression checks, not pronunciation-accuracy judgments.
- **DONE_VERIFIED (post-merge main CI and deployment):** exact main SHA `6986d4caf1f17f0b74bf7b921789cd4f016ef67e`. Main test workflow [43854422673](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43854422673) SUCCESS: 315 Python tests + 68 subtests, Node tests, build, generated-data freshness, npm audit (0 vulnerabilities), and 70 built-browser Playwright tests passed. Production Pages workflow [43854422771](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43854422771) SUCCESS: pinned Google WFST build/export, IPA symbol-table invariants, complete Burmese input-alphabet check, browser/upstream `thrax_g2p` parity, production build, tests, Pages artifact, deployment, and live HTTP smoke test all passed. The smoke test fetched `/`, `system.html`, built JS/CSS, Mya2Rom assets and `/models/google-burmese-wfst.json`, asserting `available === true` and `arc_count > 0`. Public site: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.
- **Preserved:** PR #129 remains open and untouched because it is a stale divergent research/benchmark branch, not a dependency of this output-contract correction. PRs #147 and #155 remain merged.
- **Linguistic status unchanged:** independent profile-matched IPA gold count remains 0; accuracy is unmeasured. This fixes canonical-output honesty, not phonological coverage or linguistic accuracy. Readiness remains a deployed partial linguistic/research prototype, not linguistically release-ready.


### 2026-11-16 · PR #160 documentation merge and PR #129 reconciliation

- **DONE_VERIFIED:** documentation PR [#160](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/160) merged by squash as `80bcbc21978d0503b4fcc9585d00786de434af07`, based on main `6986d4caf1f17f0b74bf7b921789cd4f016ef67e`. It updates this execution matrix and the master handoff in place with the PR #159 canonical-output correction, exact CI/deployment evidence and live browser regression observations.
- **DONE_VERIFIED (post-merge main test workflow):** [43864791708](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43864791708) completed SUCCESS on exact main SHA `80bcbc21978d0503b4fcc9585d00786de434af07`; all 18 job steps passed. The full test job includes Python, Node, build, generated-data checks, npm audit and built-browser Playwright.
- **DONE_VERIFIED (post-merge production Pages workflow):** [43864791835](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43864791835) completed SUCCESS on the same SHA; build and deploy jobs both passed. Pinned Google WFST/OpenFst build, IPA symbol-table invariants, Burmese input alphabet validation, upstream `thrax_g2p` parity, production build, full tests and 70 built-browser Playwright tests passed. Pages artifact ID `14225011705` uploaded successfully. Deployment of exact commit `80bcbc21978d0503b4fcc9585d00786de434af07` was reported successful; live HTTP smoke fetched `/`, `/system.html`, built JS/CSS, Mya2Rom assets and `/models/google-burmese-wfst.json`, asserting `available=true` and `arc_count>0`. Public site: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/.
- **PR #129 reconciliation (reviewed, not merged):** [PR #129](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/129) remains open with head `d0be0c316fe59f64f1b2f71e484c10d1356dbf3b`, based on obsolete main `fab39881259df94be93634088a75667a13059cfc`; GitHub currently reports `mergeable=false`, `mergeable_state=dirty`. Its own description reports 53 commits ahead / 0 behind relative to that old base, not the current main. The branch's Google WFST benchmark script and optional benchmark workflow are byte-identical to current main; its hybrid engine, IPA adapter, tests, hybrid docs and external-renderer registry differ from current main's later evolved versions. The corresponding hybrid/benchmark functionality is already present on current main and was subsequently extended; merging the stale branch would reintroduce older snapshots and conflicts. **Decision: leave PR #129 and its branch untouched**; do not merge, close, or cherry-pick without a new scoped requirement. The research facts and constraints remain represented in current main's source registry, benchmark reports and hybrid implementation.
- **Task ledger:** PR #160 documentation update — DONE_VERIFIED; exact-main test CI — DONE_VERIFIED; exact-main Pages/deployment — IN_PROGRESS; PR #129 — DEFERRED/left open because stale and conflicting, no unique missing feature yet established.
- **Readiness:** deployed research prototype / partial linguistic system. Independent profile-matched IPA gold remains 0 and accuracy unmeasured; phonological coverage and manual accessibility QA remain incomplete. Independent IPA annotation stays DEFERRED per project-owner direction recorded 2026-11-14.

- **DONE_VERIFIED (limited live keyboard/accessibility smoke):** a browser-only manual pass on the public site at `https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/` inspected the accessibility tree and keyboard focus order. The skip link is first and targets `main#main-content[tabindex="-1"]`; the Burmese textarea has the accessible name “Введіть бірманський текст” via a visually hidden `label` and carries `lang="my"`; navigation, sample/clear, method-switch and copy controls expose text names; results and research status expose named regions. No unreachable control or obvious focus-order break was observed in this pass. This is a limited browser keyboard/DOM accessibility smoke, not a screen-reader session, contrast audit, real-device touch-target test, or WCAG conformance assessment. **Remaining manual QA stays TODO** for screen readers, actual mobile devices, zoom/reflow and comprehensive contrast/state review.


### 2026-11-16 · Accessibility contrast correction and post-merge verification

- **DONE_VERIFIED:** documentation PR [#161](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/161) merged as `da0196ac8ceed6a6222c1d9d94a9ab50e8bb7504`. It records PR #160, stale PR #129 reconciliation, and the limited live keyboard/accessibility smoke (skip link, textarea accessible name and `lang="my"`, named controls/regions, focus reachability). It does not claim a screen-reader test or full WCAG conformance.
- **DONE_VERIFIED:** live homepage contrast spot-check found the Burmese textarea placeholder `#aaa69d` on white at **2.43:1**, below the 3:1 WCAG AA large-text threshold. PR [#162](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/162) changed it to `var(--muted)` (`#62666b`) with `opacity:1`; measured contrast is approximately **5.78:1**. A built-browser regression test now calculates the rendered pseudo-element/background ratio and requires `>=4.5:1`.
- **Verification of PR #162:** exact-head test workflow [43865918112](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43865918112) and Pages build workflow [43865945633](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43865945633) both SUCCESS; 315 Python tests + 68 subtests, 71 built-browser Playwright tests, Node tests, build, generated-data checks and npm audit (0 vulnerabilities). One intermediate push run failed because the test's CSS RGB parser used an incorrectly escaped digit regex; corrected on the final head and exact-head CI passed.
- **DONE_VERIFIED (post-merge main):** PR #162 squash merge / current main SHA `51268ab92468cc29a60ab27eacbfaad64b42184d`. Main test workflow [43866687391](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43866687391) SUCCESS: 315 Python tests + 68 subtests, 71 Playwright tests, Node tests, build, generated-data freshness and npm audit (0 vulnerabilities). Production Pages workflow [43866687424](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43866687424) SUCCESS: pinned Google WFST build, symbol-table/input-alphabet invariants, upstream `thrax_g2p` parity, build/tests, 71 Playwright tests, Pages artifact `14226731346`, deployment and live HTTP smoke for homepage, methodology page, JS/CSS, Mya2Rom assets and Google WFST JSON (`available=true`, `arc_count>0`).
- **Accessibility ledger:** DONE_VERIFIED — limited live keyboard/DOM accessibility smoke and homepage placeholder contrast correction with regression test. TODO — full manual screen-reader testing, physical mobile-device/touch-target review, zoom/reflow and comprehensive contrast/state audit. No WCAG conformance claim. A further methodology-page contrast spot-check could not be run in this session because the connected browser service exhausted its daily credits; no results are inferred for that page.
- **PR #129:** remains open and untouched; stale divergent research branch is not merged. Independent IPA annotation remains DEFERRED per project-owner direction; profile-matched IPA gold remains 0 and accuracy unmeasured. Repository readiness remains deployed partial linguistic/research prototype, not linguistically release-ready.


## 2026-11-16 exact-main reconciliation

| Workstream | Status | Current evidence / acceptance boundary |
|---|---|---|
| Mainline engineering tests | DONE_VERIFIED | Exact SHA `0f752b172b7c3bcc7f6b88c0204b7f27c9d9b10e`; workflow [43868521807](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43868521807) SUCCESS; configured Python, Node, build, generated-data, npm audit and built-browser checks completed. |
| GitHub Pages deployment | DONE_VERIFIED | Exact SHA `0f752b172b7c3bcc7f6b88c0204b7f27c9d9b10e`; workflow [43868521797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43868521797) SUCCESS; build, Google WFST checks, deployment and live smoke completed. |
| Canonical output fail-closed behavior | DONE_VERIFIED | PR #159 and exact-main regression suite prevent provisional segmental candidates from becoming canonical IPA/Ukrainian output. |
| Homepage placeholder contrast correction | DONE_VERIFIED | PR #162; built-browser test enforces >=4.5:1 for the textarea placeholder. This is not a full-site contrast audit. |
| Phonological completeness / independent IPA accuracy | PARTIAL | No independently adjudicated profile-matched IPA gold rows; accuracy is null. Tone/phonation, medials, codas, quantity and lexical coverage remain incomplete. |
| MLC/MLCTS primary-source verification | BLOCKED | Primary MLC notation key and page-located entries plus item-level reuse-rights evidence are not available; Mya2Rom-derived rime rows remain evidence-limited. |
| Manual accessibility assurance | TODO | Screen-reader session, physical mobile/touch-target review, zoom/reflow and comprehensive contrast/state audit still lack evidence. Limited keyboard/DOM smoke and homepage placeholder test are not substitutes. |
| Independent IPA pilot | DEFERRED | Issue #85 remains open; owner direction defers independent annotation. Do not create labels or treat structural probes as gold. |
| PR #129 | DEFERRED | Open draft is stale/non-mergeable; current-main compare is 53 ahead / 34 behind from obsolete merge base. No unique missing feature established; leave untouched. |

**Current main:** `0f752b172b7c3bcc7f6b88c0204b7f27c9d9b10e`. **Readiness:** deployed partial research prototype; not linguistically release-ready. Independent gold = 0; accuracy = null.


## 2026-11-16 — final exact-main verification after PR #164

- **Current default branch:** `main`; exact HEAD `372727de8ea2a2a61570c8dc880433e325230683`. PR [#164](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/164) merged the documentation reconciliation as this commit. No runtime, linguistic-data, IPA-label, Ukrainian-mapping, licensing, or release change was made by PR #164.
- **DONE_VERIFIED — exact-main engineering CI:** [test workflow 43887822173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43887822173) completed SUCCESS on the exact SHA. Inspected job log: **315 Python tests + 68 subtests**, Node tests, production build, generated-data freshness, npm tests, **71 built-browser Playwright tests**, and both npm audit checks (**0 vulnerabilities**) passed. All 18 configured job steps succeeded.
- **DONE_VERIFIED — exact-main Pages deployment:** [Pages workflow 43887822197](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43887822197) completed SUCCESS on the exact SHA. All 24 build-job steps and all 4 deploy-job steps succeeded. This includes pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, complete browser input-alphabet check, upstream `thrax_g2p` parity, production build/tests, artifact upload, deployment and live smoke test. The smoke test fetched homepage, `system.html`, built JS/CSS, Mya2Rom assets and Google WFST JSON, then verified `available=true` and `arc_count>0`.
- **Public deployment:** https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/ — exact deployment version `372727de8ea2a2a61570c8dc880433e325230683` reported successful.
- **PR reconciliation:** only open PR is [#129](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/129), still a stale divergent draft. It remains untouched: its benchmark/hybrid functionality is already represented and evolved on current main; its old snapshot is not to be merged or cherry-picked blindly.
- **Research/accessibility boundary unchanged:** independent profile-matched adjudicated IPA gold remains **0**; empirical accuracy remains **null / NOT MEASURED**. Phonological coverage and primary MLC/MLCTS evidence remain incomplete; full manual screen-reader, physical-device/touch-target, zoom/reflow and comprehensive contrast/state QA remain TODO. Independent IPA annotation remains DEFERRED per owner direction; issue #85's human prerequisites are unmet.
- **Task ledger:** DONE_VERIFIED — exact-main CI, Pages deployment and live smoke for this SHA; PARTIAL — Yangon phonological coverage, MLCTS source conformity and parity against independent gold; BLOCKED — primary MLC notation/entry evidence and item-level reuse rights; TODO — remaining manual accessibility QA; DEFERRED — independent IPA annotation and stale PR #129 integration.
- **Readiness:** deployed engineering/research prototype, **not linguistically release-ready** and not WCAG-conformance-certified. Hosted GitHub Actions are the verification evidence; no local checkout/test execution is claimed.


## Data-integrity correction — 2026-11-17

| Registry / acceptance gate | Implemented coverage | Tested coverage | Independently validated coverage | Status | Next acceptance criterion |
|---|---|---|---|---|---|
| `data/burmese/finals.csv` column contract | Corrected five-column header to distinguish orthographic marker, possible function, phonological interpretation, evidence status and source ID; no linguistic values or rules added | `tests/test_finals_registry.py`; hosted run [44151591432](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44151591432): 317 Python tests + 68 subtests passed, including the new registry tests | Structural CSV/source-reference integrity only; no pronunciation gold | DONE_VERIFIED (bounded data-integrity contract) | Preserve typed distinction among orthographic signs, underlying codas and surface phonetics; full workflow rerun after npm dependency remediation |

**CI qualification for the correction branch:** the same run passed IPA corpus structure validation and pytest, then failed at the npm audit gate because transitive `picomatch` is affected by GHSA-fc5q-39xc-vjpf / CVE-2026-112366. Four high-severity advisories were reported; npm offered only a breaking Vite downgrade, and no patched picomatch release was identified. Build, generated-data, Node and Playwright steps were skipped. This is a dependency/security blocker, not a failure of the finals-registry tests. Do not label the complete workflow green.


## Exact-head Pages build verification — 2026-11-17

- **DONE_VERIFIED — production build/test/artifact path (PR preview only):** Pages workflow [44152143185](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44152143185) completed SUCCESS on exact branch head `7eed688b5aa2d783022d64b54558425525aa3445`. All build-job steps passed: pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, complete Burmese input alphabet check, browser/upstream `thrax_g2p` parity, `npm run build`, `npm test`, Chromium installation, `npm run test:browser:built`, Pages artifact configuration and upload. Artifact `github-pages` ID `14360401415` (SHA-256 `4a50e481edb2fdf19d7d0732b77469d449b69867c31b34f49520e46cd717704a`). The deploy job was SKIPPED as expected for a pull-request preview; this is not a production deployment.
- **Main test workflow remains BLOCKED:** exact-head run [44152143092](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44152143092) passed corpus structure validation and pytest (**317 passed, 68 subtests**) and `npm ci`, then failed the mandatory high-severity npm advisory gate. Build, generated-data freshness, Node and built-browser steps in that workflow were skipped. The successful Pages build above independently covers those engineering checks but does not clear the security gate.
- **Acceptance status:** finals CSV schema correction and its Python tests are DONE_VERIFIED; build and browser verification are now DONE_VERIFIED on the exact PR head; dependency security remediation remains BLOCKED pending a verified safe upstream/fixed-version path. No dependency was downgraded, audit was not bypassed, and no production deployment was triggered.


## npm advisory dependency-path investigation — 2026-11-17

- `package.json` pins Vite `8.3.8`; `package-lock.json` resolves `picomatch@4.0.7` through two development-only paths: `vite@8.3.8 → picomatch@^4.0.7` and `tinyglobby@0.2.17 → picomatch@^4.0.4`. The project does not call picomatch directly; it is a transitive build-tool dependency.
- Current GitHub Advisory [GHSA-fc5q-39xc-vjpf](https://github.com/advisories/GHSA-fc5q-39xc-vjpf) and [upstream issue #247](https://github.com/micromatch/picomatch/issues/247) still identify picomatch through 4.0.7 as affected and provide no official fixed release/version. The upstream PR #194 is an unrelated extglob parsing correction, **not** a fix for CVE-2026-112366; do not treat it as remediation.
- A third-party fork/package was discovered but not adopted: it is not an upstream release and lacks the compatibility, maintenance and supply-chain assurance required for a production override. No dependency override, downgrade, audit suppression or lockfile fabrication was made.
- **Security gate remains BLOCKED.** Acceptance: an upstream fixed picomatch release or an independently reviewed replacement with verified API compatibility and adversarial regression tests; then run full npm audit, build, generated-data freshness, Node and built-browser suites on the exact head.


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



## Exact final-head CI reconciliation — 2026-11-17

- **Branch/PR state:** PR [#168](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/168) is OPEN and mergeable, based on `main`; head `733b383034120000f817cc877f0062f825f5dd2c`. Compare: 31 commits ahead / 0 behind; five changed files. No merge or deployment performed.
- **DONE_VERIFIED — Pages build on exact head:** workflow [44175250086](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44175250086) completed SUCCESS. Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input-alphabet validation, upstream `thrax_g2p` parity, production build, Node tests, Chromium setup, built-site Playwright tests and Pages artifact upload all passed. Deploy job was SKIPPED for the PR event; this is not a production deployment.
- **PARTIAL / BLOCKED — required test workflow on exact head:** [44175250073](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44175250073) completed FAILURE at mandatory `npm audit --audit-level=high`. IPA corpus structure validation, `pip install -e ".[test]"`, pytest and `npm ci` passed before the gate. The build, generated-data freshness, Node and Playwright steps were skipped in this workflow. Do not mark the required test workflow green.
- The Pages workflow independently verifies build/Node/browser execution on this exact head, but does not waive the mandatory security gate. The unresolved transitive `picomatch@4.0.7` advisory remains BLOCKED; no safe fixed v4 release/replacement has been established. No downgrade, override, vendored patch, lockfile fabrication or audit bypass was made.
- **Task ledger:** DONE_VERIFIED — finals registry schema correction and duplicate-marker regression; Python/IPA structural gate; separate exact-head build, Node, browser and artifact path. BLOCKED — high-severity dependency audit. PARTIAL/BLOCKED — independent Yangon-profile adjudicated IPA gold (0 verified entries; accuracy unmeasured), complete phonology/rime/coda/prosody, primary MLC/MLCTS evidence and reuse rights, manual accessibility QA. Independent IPA annotation remains DEFERRED as previously directed.
- **Readiness:** engineering/research prototype only; not release-ready as a linguistically validated transcription system. This section supersedes earlier branch-tip and pending-workflow checkpoints above.



## Upstream ReDoS candidate refresh — 2026-11-17

- New proposals appeared on upstream `micromatch/picomatch`: [#261](https://github.com/micromatch/picomatch/pull/261) and [#262](https://github.com/micromatch/picomatch/pull/262), both OPEN/unmerged and targeting `master` (the v4 development line). [#263](https://github.com/micromatch/picomatch/pull/263) targets `v2` and is not a v4 candidate.
- **#261 — broader mandatory safety boundary:** adds a bounded ambiguity analysis over generated regex tokens, with fail-closed behavior on proof limits; rechecks final output where raw operators/options can wrap repetitions; preserves captures by excluding the collapse rewrite when capture semantics differ; and rejects unsafe/unproven patterns with `SyntaxError`, including when `maxExtglobRecursion: false`. Its author reports 2,009 tests plus adversarial subprocess, option/parser-path, capture and language-comparison coverage. This is a substantial compatibility change (some formerly matched patterns now reject) and is not yet upstream-merged/released. Treat as the stronger candidate for security completeness, not as an approved patch.
- **#262 — narrower compatibility-oriented rewrite:** normalizes selected repeated wildcard branches, preserving some previously supported alternatives and existing tests; the author reports 2,001 tests, CI coverage, 3,657,752 boolean comparisons and 16 bounded adversarial subprocesses. However its stated explicit `maxExtglobRecursion: false` opt-out remains a bypass, so it does not establish the same mandatory safety boundary as #261.
- #237/#238/#246 remain open proposals with previously recorded capture/nested-shape/v2 limitations. No upstream proposal is merged or released as a v4 fix. Candidate checks/statuses were not available as completed green CI at inspection; do not treat author-reported local test summaries as independently verified upstream CI.
- GitHub issue [#247](https://github.com/micromatch/picomatch/issues/247) remains OPEN. A comment says the Snyk entry appeared revoked, but another confirms publication of GitHub advisory GHSA-fc5q-39xc-vjpf; the repository's mandatory npm audit still fails on the pinned tree. Therefore Snyk status alone does not clear the current CI/security gate.
- **Decision:** do not transplant either patch or change the lockfile in this repository. Wait for maintainer-reviewed integration/release or a controlled compatibility review against the exact Vite/fdir/tinyglobby dependency tree. Required acceptance remains: API/behavior compatibility tests, default and capture modes, nested extglob and parser-option bypass coverage, adversarial timeouts, npm audit green, then exact-head CI green.



## Dependency exposure and advisory source cross-check — 2026-11-17

- Parsed the committed npm lockfile v3 from `main` (same dependency manifests as this PR; PR diff changes only finals CSV, tests and docs). Root declares Vite `8.3.8` as a devDependency; `picomatch` is not a direct project dependency. Locked `picomatch@4.0.7` is pulled by Vite `8.3.8` (`^4.0.7`) and tinyglobby `0.2.17` (`^4.0.4`); fdir `6.5.0` also declares `^3 || ^4` via its peer dependency metadata. Thus current exposure is in the build/test toolchain, not the application's declared runtime dependency list; nevertheless the mandatory repository audit blocks CI.
- Current OSV mirror of the GitHub-reviewed advisory records the affected range through `4.0.7`, CVSS 4.0 8.7, reviewed timestamp 2026-11-17T15:56:42Z, and no fixed version. See [OSV advisory](https://osv.dev/vulnerability/GHSA-fc5q-39xc-vjpf) and [GitHub advisory](https://github.com/advisories/GHSA-fc5q-39xc-vjpf). This corroborates that a Snyk-specific revocation comment does not establish that GitHub's advisory or npm audit has cleared the lockfile.
- No manifest, lockfile or dependency changes made. Acceptance remains an upstream reviewed v4 fix or independently verified compatible replacement, followed by audit and full CI.


## Exact latest-head CI reconciliation — 2026-11-17

- Branch head `bc9c25dfe5bf30df5e05787144a8af0f9f5e01b0`; compare against `main`: 40 commits ahead / 0 behind, five changed files.
- **DONE_VERIFIED — Pages workflow [44181463115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463115):** pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input alphabet, upstream `thrax_g2p` parity, production build, Node tests, Chromium setup, built-site Playwright and Pages artifact upload all passed. Deploy was skipped for the PR event.
- **BLOCKED — test workflow [44181463094](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463094):** corpus structure validation, Python dependency installation, pytest and `npm ci` passed; mandatory `npm audit --audit-level=high` failed. Build, generated-data freshness, Node and Playwright steps were skipped in this workflow.
- This exact-head Pages success does not waive the mandatory security gate. No dependency, runtime, pronunciation, IPA, Ukrainian mapping or generated-data changes were made in this continuation. No merge, release or production deploy occurred.
- Readiness remains PARTIAL: mandatory audit blocked; independent adjudicated Yangon-profile IPA gold = 0 and accuracy unmeasured; phonological coverage, primary MLC/MLCTS evidence and reuse rights, and manual accessibility QA remain incomplete.


## Exact latest PR-head verification — 2026-11-18

- Verified branch head: `15a82b5bcf5ca7d11d204181517828dca92cc0a9`; PR #168 remains open, unmerged and mergeable; comparison with `main`: 43 commits ahead / 0 behind, five changed files.
- **DONE_VERIFIED — Pages workflow [44181463115](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463115):** WFST/OpenFst, IPA symbol-table and browser alphabet checks, upstream `thrax_g2p` parity, production build, Node tests, Chromium, built-site Playwright and artifact upload all passed. Deploy skipped because this is a PR event.
- **BLOCKED — test workflow [44181463094](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44181463094):** corpus validation, Python dependency installation, pytest and `npm ci` passed; mandatory `npm audit --audit-level=high` failed. Build, generated-data freshness, Node and Playwright steps were skipped in this workflow.
- These are complementary results, not a fully green test workflow. No dependency or linguistic changes were made. No merge, release or production deployment occurred.
- Remaining acceptance blockers are unchanged: compatible reviewed/released `picomatch` remediation and full exact-head security CI; independently adjudicated Yangon-profile IPA gold (currently 0) and accuracy measurement; incomplete phonological coverage; unresolved primary MLC/MLCTS evidence and reuse rights; manual accessibility QA.


## Finalized CI results on documentation-updated head — 2026-11-18

- Current head at verification: `748dcea9c82308ec9cd7299de12cb7cfec6f5874`; PR #168 open, unmerged, mergeable; 46 commits ahead / 0 behind `main`; five changed files.
- **DONE_VERIFIED — Pages workflow [44185873696](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44185873696):** WFST/OpenFst, IPA and browser alphabet checks, upstream parity, production build, Node tests, Chromium, built-site Playwright and artifact upload all passed; deploy skipped for PR event.
- **BLOCKED — required test workflow [44185873801](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44185873801):** corpus validation, Python install, pytest and `npm ci` passed; mandatory `npm audit --audit-level=high` failed; later build/generated-data/Node/Playwright steps skipped.
- Pages success confirms the independent browser pipeline on this head but does not satisfy the mandatory security gate. No runtime, dependency or linguistic changes made.


## Upstream security candidate review refresh — 2026-11-18

- Rechecked GHSA-fc5q-39xc-vjpf / CVE-2026-112366. Current GitHub-reviewed OSV record still lists `picomatch` versions through 4.0.7 as affected and states no fixed version; upstream 4.0.7 changelog has no entry for this later advisory. Sources: [OSV advisory](https://osv.dev/vulnerability/GHSA-fc5q-39xc-vjpf), [upstream changelog](https://github.com/micromatch/picomatch/blob/master/CHANGELOG.md), [upstream issue #247](https://github.com/micromatch/picomatch/issues/247).
- **Candidate #261 remains open/unmerged**, targets v4 `master`, and now has one APPROVED review. That reviewer explicitly says they reviewed the diff but did not run the branch, and flags breaking behavior where unsafe repeated extglobs now throw instead of matching. Author-reported 2,009 tests are not independently reproduced. [PR #261](https://github.com/micromatch/picomatch/pull/261).
- **Candidate #262 remains open/unmerged**, targets v4 `master`, and has an approval plus a substantive independent review. Reviewer reports 2,001 tests, 1,329,660 bounded parity comparisons and 35 isolated adversarial cases; explicitly states the checks are bounded, complex literal-fallback forms do not preserve all semantics, and `maxExtglobRecursion: false` remains an opt-out. [PR #262](https://github.com/micromatch/picomatch/pull/262).
- #263 remains v2-only. No candidate is a published upstream fix. Neither candidate was transplanted: #261 has a material compatibility objection and lacks independent execution; #262's explicit opt-out means it does not satisfy an unconditional mandatory guard. Acceptance still requires maintainer-approved/released v4 fix or separately reviewed compatible replacement, plus exact project CI.


## Exact PR-head CI reconciliation — 2026-11-18 (head 3430b628)

- PR #168 head `3430b628a2e35e19ef3fc4306410b68b8fa412f5`; branch `fix/finals-registry-schema-2026-11-17`; PR remains open, unmerged and mergeable; 52 commits ahead / 0 behind `main`, five changed files.
- **DONE_VERIFIED — Pages workflow [44255972532](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44255972532):** pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input-alphabet checks, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright and Pages artifact upload passed. Deploy job skipped for PR event.
- **BLOCKED — required tests workflow [44255972550](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44255972550):** IPA corpus structure validation, Python dependency installation, pytest and `npm ci` passed; mandatory `npm audit --audit-level=high` failed. Build, generated-data freshness, Node and Playwright steps skipped.
- These are complementary workflows; Pages success does not clear the mandatory security gate. No dependency or linguistic change was made. No merge, release or production deployment occurred.
- Acceptance blockers remain: reviewed/released compatible `picomatch` remediation and full exact-head test CI; independent adjudicated Yangon-profile IPA gold (0; accuracy unmeasured); incomplete phonological coverage; unresolved primary MLC/MLCTS evidence and reuse rights; manual accessibility QA. Independent IPA annotation remains DEFERRED.


## Exact-head verification refresh — 2026-11-18 (PR #168, head 42f5b135)

- Exact branch head: 42f5b1353c3d4ce13070554494c70f6fc6a10b90; 55 commits ahead / 0 behind main; five changed files.
- **DONE_VERIFIED:** corpus structure validation, Python dependency install and pytest passed in [workflow 44258910321](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910321).
- **BLOCKED:** the same required test workflow failed at npm audit --audit-level=high with four high-severity findings for transitive picomatch@4.0.7; npm audit fix --force proposed breaking Vite downgrade to 6.2.7. Build, generated-data, Node and Playwright steps were skipped. No workaround or dependency change was made.
- **PENDING at capture:** Pages workflow [44258910411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910411) was still building pinned Google WFST/OpenFst; no pass/fail claimed.
- Lockfile inspection confirms picomatch@4.0.7 is dev-only and already present on main through Vite 8.3.8 and tinyglobby; PR #168 did not introduce it. Official picomatch releases/npm still show 4.0.7 as latest; no verified fixed version found.
- **Readiness:** still blocked for release by mandatory security CI; linguistic gold remains 0 and accuracy unmeasured. No merge or release.


## Final follow-up — exact code head a266e67 (2026-11-18)

- Exact code head tested: a266e67d94e667dc14bf46aadcb36dc7ceffdf24. Required tests workflow [44259714864](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259714864): corpus validation, Python install, pytest and npm ci PASS; mandatory npm audit FAIL on four high-severity picomatch@4.0.7 findings; build, generated-data, Node and Playwright SKIPPED.
- Pages workflow [44258910411](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44258910411) was still running on prior docs head 42f5b135. WFST/OpenFst build, IPA symbol table, browser alphabet and static-model export passed; Node setup remained in progress. Not an exact-head result for a266e67.
- Independent CSV validation found 4 rows, all 5 columns, all source IDs resolving to U18, no blank/surplus fields, duplicate markers or invalid statuses.
- Final docs-only commits updated the handoff/matrix/register; no runtime/dependency/phonological changes. Security BLOCKED; not release-ready.


## Exact final-head verification and dependency triage — 2026-11-18 (PR #168, HEAD 2efbf870)

- **Branch/head:** `fix/finals-registry-schema-2026-11-17` at `2efbf870568c7d114f3bad452f8f2a4df95425be`; base `main` at `f7f7d41a116c265481bdc17c225a763becab6013`. PR #168 remains open; no merge/release/deployment.
- **DONE_VERIFIED — exact-head Pages workflow:** [44259856263](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259856263) SUCCESS. Pinned WFST/OpenFst build, IPA symbol-table and browser-alphabet checks, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium setup, built-site Playwright tests, and artifact upload all passed. Deploy skipped for PR event.
- **BLOCKED — exact-head test workflow:** [44259856191](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44259856191) FAILURE at mandatory `npm audit --audit-level=high`; four high findings for transitive `picomatch@4.0.7`. Corpus structure validation, Python dependency installation, pytest and `npm ci` passed. Build, generated-data, Node and Playwright steps skipped in this workflow.
- **Upstream remediation evidence:** picomatch #262 now has an APPROVED independent review and reported 2,001 tests, 1,329,660 finite matching-parity comparisons and 35 bounded adversarial cases; its reviewer explicitly disclaims a universal proof and records an explicit opt-out plus literal fallback for unsupported patterns. #261 also has an APPROVED review. Both remain open/unmerged; official latest release remains 4.0.7. Therefore neither is yet an acceptable released remediation for this repository's mandatory audit gate.
- **Ledger:** DONE_VERIFIED — CSV contract/test, exact-head Pages build/browser path, Python tests. BLOCKED — npm audit until a reviewed upstream change is merged/released or a separately reviewed safe dependency path is available and full exact-head CI passes. PARTIAL — phonological coverage and primary-source conformity. BLOCKED — primary MLC notation/entries and item-level reuse rights. TODO — manual screen-reader/device/touch-target/zoom/reflow/contrast-state QA. DEFERRED — independent IPA annotation per owner direction.
- No dependency workaround, audit bypass, runtime or linguistic change. Independent Yangon IPA gold remains 0; accuracy unmeasured. Not release-ready.


## 2026-11-18 10:12 — current-head audit and upstream candidate comparison

- Latest PR #168 test run [44261797858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797858) on HEAD `47fc51e0ae60b81584d39560d7871570c0baaaa3`: corpus structure, Python install, pytest, npm ci PASS; mandatory npm audit FAIL; build/generated-data/Node/Playwright SKIPPED. Pages SUCCESS is on earlier code-bearing HEAD `2efbf870...`.
- Lockfile confirms Vite 8.3.8 -> picomatch ^4.0.7; tinyglobby 0.2.17 -> ^4.0.4; resolved picomatch 4.0.7 is dev-only.
- Upstream #261: OPEN, mergeable, one APPROVED review, no reported check-runs/status contexts. Claimed 2,009 tests and bounded fail-closed ambiguity checking are PR-author claims; approval is not independent test execution.
- Upstream #262: OPEN, mergeable, one APPROVED review and a separate COMMENTED independent validation reporting npm test, 1,329,660 bounded parity comparisons and 35 adversarial cases. The reviewer expressly limits the evidence: finite tests are not a universal proof; complex fallback cases do not retain every matching semantic; `maxExtglobRecursion: false` remains an opt-out. No reported check-runs/status contexts.
- Neither candidate is merged/released; official latest remains 4.0.7. Do not vendor, override, downgrade or suppress audit.
- PR #168 stays open; #166/#167 stay open; #129 remains non-mergeable/diverged. No runtime/data/IPA changes. Security gate BLOCKED; research/accessibility states unchanged.


## Exact latest PR-head verification and expanded upstream ReDoS review — 2026-11-18 10:12 +0200

- PR #168 branch HEAD: `47fc51e0ae60b81584d39560d7871570c0baaaa3`; PR remains OPEN, unmerged and mergeable; five changed files. The code-bearing implementation remains `0bd0a4527bee30cf334490c1a57c6782d0539b2d`; subsequent commits on this branch are evidence/documentation updates only.
- **DONE_VERIFIED — exact PR-head Pages workflow [44261797839](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797839):** SUCCESS on `47fc51e0ae60b81584d39560d7871570c0baaaa3`. The independent Pages path completed the pinned Burmese WFST/OpenFst build, IPA symbol-table and browser alphabet checks, upstream parity, production build, Node tests, Chromium setup, built-site Playwright tests and artifact upload. Deployment was skipped for the PR event.
- **BLOCKED — exact PR-head required test workflow [44261797858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44261797858):** corpus structure validation, Python dependency install, pytest and `npm ci` passed; mandatory `npm audit --audit-level=high` failed on four high-severity transitive `picomatch@4.0.7` findings. Build, generated-data, Node and Playwright steps were skipped in this workflow. Pages success is complementary evidence, not a waiver of the audit gate.
- **New upstream candidate review:** picomatch #270 is an unreviewed narrow collapse optimization with a reported 19.9M finite matching-parity cases, but an independent commenter reproduced >2s hangs for `+([a]*)b` and `+(@(*a))`; these shapes are explicitly outside its simple collapse rules. It is not a complete advisory fix. #269 proposes broader literal fallback and 50k-character child-process tests, but currently has no maintainer review/approval evidence. #267 also proposes collapse/fallback handling but has no review evidence. All remain open/unmerged; official latest release remains 4.0.7. Do not treat any as a verified fix or transplant unreviewed code.
- **Ledger:** DONE_VERIFIED — CSV schema/test repair, exact PR-head Pages/browser path, Python tests. BLOCKED — required npm audit and full required workflow. PARTIAL/BLOCKED/TODO linguistic source, coverage, licensing and manual accessibility tasks remain as recorded. Independent IPA annotation remains DEFERRED.
- No dependency workaround, audit bypass, runtime or linguistic change. Independent Yangon-profile adjudicated IPA gold remains 0; empirical accuracy remains unmeasured. Repository remains an engineering/research prototype, not release-ready.


## Exact latest-head Pages completion — 2026-11-18 11:31 +0200

- PR #168 HEAD at evidence capture: `bf1655fb861451289ce5be12f1c4bf89a2cccb41` (70 ahead / 0 behind `main`); PR remains OPEN, unmerged and mergeable.
- **DONE_VERIFIED — Pages workflow [44265321954](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44265321954)** completed SUCCESS on that exact HEAD. Build job passed pinned WFST/OpenFst setup/build, IPA symbol-table and browser alphabet checks, upstream parity, production build, Node tests, Chromium setup, built-site Playwright and Pages artifact upload. Deploy job was SKIPPED because this was a pull-request run; this is not a production deployment.
- **BLOCKED — required tests workflow [44265321857](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44265321857)** on the same exact HEAD: corpus validation, Python install, pytest and `npm ci` PASS; mandatory `npm audit --audit-level=high` FAIL; build, generated-data, Node and Playwright steps SKIPPED in this workflow. The separate Pages success does not waive the mandatory audit gate.
- The PR's latest exact-head verification therefore has a successful full build/browser/artifact path but remains overall CI-blocked by the high-severity transitive `picomatch@4.0.7` audit finding. No dependency workaround, merge, release or production deployment was performed.


## Final poll of exact documentation HEAD — 2026-11-18

- Current PR HEAD at this checkpoint: `4d1bc99c17474fa08cb5d6133a27808c250a8012` (73 commits ahead / 0 behind `main`). PR #168 remains open, unmerged and mergeable; five changed files.
- **DONE_VERIFIED — Pages workflow [44276827871](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44276827871):** SUCCESS on this exact SHA. Pinned WFST/OpenFst, IPA symbol-table/browser alphabet, upstream parity, production build, Node, Chromium, built-site Playwright and artifact upload passed. Deploy skipped for PR event.
- **BLOCKED — required tests workflow [44276827920](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44276827920):** corpus validation, Python install, pytest and npm ci passed; mandatory high-severity npm audit failed; build/generated-data/Node/Playwright skipped in this workflow. Same transitive `picomatch@4.0.7` security gate; no verified compatible fix/release.
- This exact SHA has a successful Pages build/browser path but is not CI-green. No dependency workaround, merge, release or production deployment.


## 2026-11-18 follow-up security evidence

| Task | Status | Evidence / acceptance |
|---|---|---|
| Determine exact npm audit cause | DONE_VERIFIED | Job log [44281804397](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44281804397): four high findings are instances of GHSA-fc5q-39xc-vjpf against one transitive `picomatch@4.0.7` via fdir/tinyglobby/Vite 8.3.8. Force fix downgrades Vite to 6.2.7 (breaking); rejected. |
| Assess app-specific threat exposure | PARTIAL | Upstream maintainer/contributor says ReDoS requires attacker-controlled glob pattern, not merely path input. App has no direct npm runtime dependencies and lockfile path is dev/build toolchain. Need prove no untrusted user/content-derived glob reaches picomatch before classifying app exposure; audit gate remains mandatory regardless. |
| Upstream candidate security coverage | BLOCKED | #268 globstar bypass `+(**/a)b`; #270 timeouts for `+([a]*)b` and `+(@(*a))`; #238 still times out on `+(*)`; #273 finite equivalence only/no independent review; #264 downstream Windows parity does not prove security. Acceptance: maintainer-reviewed/released fix plus adversarial and compatibility tests, then clean audit/full CI. |
| Exact-head test evidence | PARTIAL | Python 317 passed + 68 subtests; IPA gold validation explicitly reports 0 adjudicated records. Audit failure prevents build/generated-data/Node/Playwright steps in required Tests workflow. Pages workflow separately SUCCESS. |


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


## Exact-head CI evidence — 2026-11-18 (PR #168, 9131c12)

- **DONE_VERIFIED:** Pages workflow [44301535467](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44301535467) succeeded on exact HEAD `9131c123c91eeee438f4ff48c7d49912efb00068`: pinned WFST/OpenFst, IPA symbol table, browser alphabet, model export, upstream parity, production build, Node tests, Chromium, built-site Playwright and artifact upload passed; deploy skipped for PR event.
- **DONE_VERIFIED:** Python package build/install and pytest passed in required Tests workflow [44301535585](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44301535585): 317 tests and 68 subtests passed; `npm ci` completed.
- **BLOCKED:** same Tests workflow failed only at mandatory `npm audit --audit-level=high`: four high-severity instances of GHSA-fc5q-39xc-vjpf for transitive `picomatch@4.0.7` via `fdir`/ `tinyglobby`/Vite 8.3.8. The suggested `--force` remediation downgrades Vite to 6.2.7 and remains rejected. Later test-workflow build/generated-data/Node/Playwright steps were skipped; Pages success is separate evidence, not an audit waiver.
- No code/dependency/linguistic-data changes, merge, release or deployment. Linguistic evidence gates remain unchanged; prototype is not release-ready.

 
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


## Historical research-branch reconciliation — 2026-11-18

- **DONE_VERIFIED — no missing source-claim port from `research/burmese-engine-benchmark-expansion-2026-11-11`:** its `data/burmese/source_claims.csv` contains 15 data rows; all 15 IDs are already present in current `main`, whose register has 221 rows. The branch is substantially stale; no claim rows were missing from main.
- **DONE_VERIFIED — benchmark implementation already in main:** `scripts/benchmark_google_fst.py` and `.github/workflows/optional-epitran-benchmark.yml` have identical blob SHAs on that research branch and main. No code port is needed.
- **Evidence-only WSSANLP resource:** `W16-3702` is already in `data/burmese/sources.csv`. ACL Anthology verifies the paper and its abstract; the proceedings paper describes 25,300 MLC dictionary words split into 25,000 training words, three 100-word open test sets and a separate 100-word closed test. The paper reports seven G2P approaches and PER/manual error review. Its romanized phone notation is not this project's IPA gold, and the paper citation does not establish redistribution rights for the underlying dictionary. Do not treat it as an adjudicated gold set. Sources: https://aclanthology.org/W16-3702/ and https://aclanthology.org/W16-37.pdf.
- **OpenSLR SLR80 intentionally not promoted:** the current `OPENSLR80` source row explicitly marks it historical metadata only and excluded from active text-only research by owner direction; no audio is to be acquired, processed, annotated or used for G2P/IPA acceptance. The old branch's renderer-registry entry proposing future expert audio review conflicts with that scope and is not ported. Official OpenSLR metadata and the LREC paper describe audio plus orthographic transcripts, not IPA labels; the corpus license is CC BY-SA 4.0. Sources: https://www.openslr.org/80/ and https://lrec-conf.org/proceedings/lrec2020/pdf/2020.lrec-1.777.pdf.
- **DONE_VERIFIED — older adapter branch reconciled:** `src/burmese_ukrainian/practical.py`, `src/web/ukrainian-adapter.js`, and `data/burmese/ukrainian_practical.csv` on `feat/burmese-ukrainian-practical-adapter-verified-final-2026-11-11` have identical blob SHAs to main. No port needed.
- **STALE branch not reused:** `feat/burmese-romanization-ukrainian-matrix-completion-2026-11-12` has older `romanization_ukrainian.csv` and `romanization_rimes_inventory.csv` blobs than main; its versions were not copied over newer mainline evidence.
- **Disposition:** retain the benchmark branch for historical reference; no cherry-pick or new runtime behavior justified by this comparison. No branch deleted or rewritten.


## Additional parser-test branch reconciliation — 2026-11-18

- **DONE_VERIFIED — `test/complete-grapheme-accounting-2026-11-12` is superseded in main:** all 9 test function names on that branch are present in `main`'s `tests/test_parser.py`; main additionally contains five later parser tests for asat codas, MLC medial inventory, and kinzi. No test cherry-pick is needed.
- These are structural/source-preservation tests, not pronunciation or IPA gold. The branch is 2 commits ahead but 122 behind main; its old file must not replace the expanded current suite.


## Remaining runtime/accessibility branch reconciliation — 2026-11-18

- **DONE_VERIFIED — no code port required from `fix/withhold-segmental-preview-from-canonical-output-2026-11-16`:** `src/web/hybrid-engine.js` and its focused test file have identical blob SHAs to main.
- **DONE_VERIFIED — no code port required from `feat/romanization-to-ukrainian-runtime-2026-11-12`:** `src/web/romanization-ukrainian.js` has identical blob SHA to main; main's corresponding test file is newer and includes the orthographic-MLCTS-mode assertion absent from the older branch.
- **DONE_VERIFIED — contrast fix already in main:** `src/web/styles.css` and `tests/browser/converter.spec.js` on `fix/textarea-placeholder-contrast-2026-11-16` match main exactly.
- **DONE_VERIFIED — onset hint behavior/test superseded:** the branch's provisional /ɲ/ test is present in main; current main registry marks ဉ /ɲ as `analysis_dependent`, while the canonical IPA adapter excludes it from `ESTABLISHED_ONSETS`. No unsupported onset was promoted.
- **DONE_VERIFIED — whitespace segment numbering branch is older than main's app and browser suite;** no file overwrite or cherry-pick.
- **Disposition:** these branches contain no missing code/test changes that justify a port onto PR #171. They remain preserved as historical references.


## Exact-head CI result — 2026-11-18 (`b7c8fe4d`)

- **DONE_VERIFIED — Pages workflow [44316607402](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44316607402): SUCCESS** on exact PR HEAD `b7c8fe4d46f50705ff5bcd46f42452fefe66b789`. This is a PR build; no production deployment is claimed.
- **BLOCKED — Tests workflow [44316607249](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44316607249): FAILURE** on that same exact HEAD. Corpus structure validation, editable Python install, wheel registry verification, pytest, and `npm ci` passed. The required `npm audit --audit-level=high` then failed with four high-severity findings in the dependency tree rooted at transitive `picomatch@4.0.7`, advisory GHSA-fc5q-39xc-vjpf (ReDoS via repeated extglobs). npm recommends a forced Vite downgrade (`vite@6.2.7`), which is a breaking change; it was not applied. Build, generated-data, Node and Playwright steps were skipped in this job.
- Duplicate push-triggered Tests run [44316601896](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44316601896) failed at the same audit gate; it is not a separate code regression.
- **Interpretation:** Python package/registry tests passed on the exact tip and Pages build/browser workflow passed on the exact tip. The mandatory Tests workflow remains blocked solely at the security audit step; skipped downstream steps are not represented as passed by this Tests run.
- No audit suppression, `--force` downgrade, override, fork or unreviewed dependency patch was applied. PR #171 remains OPEN and DRAFT, stacked on #168. Main remains unchanged; no merge, release or production deployment occurred.
- **Readiness:** research/engineering prototype, not release-ready. Security gate requires a maintainer-reviewed compatible fix or independently reviewed replacement, adversarial/compatibility tests, a clean high-severity audit and a successful exact-head required Tests workflow. Linguistic acceptance remains separately blocked by zero adjudicated Yangon-profile IPA gold, incomplete item-level source/reuse evidence and partial phonological coverage.


## Exact-head verification addendum — 2026-11-18 (`374128a7f4f0f1d6ed6a64efe6122ddfee9c328f`)

- **DONE_VERIFIED — Pages [44320245648](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320245648):** exact-head success. WFST/OpenFst build, IPA and input-alphabet invariants, static export, upstream parity, production build, Node tests, Playwright and artifact upload passed; deploy skipped for PR event.
- **BLOCKED — Tests [44320245620](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320245620):** exact-head failure at mandatory high-severity npm audit for GHSA-fc5q-39xc-vjpf in transitive `picomatch`. Corpus validation, editable install, wheel verification, pytest (322 passed; 68 subtests passed) and `npm ci` passed; build/generated-data/Node/Playwright steps skipped. Duplicate push run [44320232869](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44320232869) failed identically.
- No audit suppression, forced downgrade or unreviewed dependency patch. PR #171 remains draft/unmerged; no deployment/release. Linguistic gold/coverage, source-rights and manual accessibility gates remain open as documented.


## Upstream picomatch remediation triage — 2026-11-18

- **PR #238 is not an acceptable complete fix:** it has three approvals, but reviewer reproductions on the proposed head `44f192261f312ddf236cb7bdc05d8f22663f98f9` still show exponential behavior for `+(*)`, `*(*)`, and `+(a*)`; independent follow-up also timed out `+(*)`. Its approvals do not resolve the reproduced residual cases. Source: https://github.com/micromatch/picomatch/pull/238.
- **PR #273 is a promising but unverified candidate, not a released fix:** it rewrites star-literal repeated extglobs and adds eight focused tests. Its author reports 2,006 passing tests, lint clean, and 6,039,264 finite pattern/string equivalence pairs with zero differences. However, as of this check it has zero submitted reviews, zero GitHub check runs, no CI status checks, and remains open/unmerged. These are author-reported results, not independently reproduced evidence. Source: https://github.com/micromatch/picomatch/pull/273.
- Latest upstream release remains `4.0.7` (2026-08-24); no subsequent fixed release was found in the GitHub releases list. The security advisory remains unresolved in the dependency graph.
- **Disposition: BLOCKED; no dependency change.** Do not import either PR as a patch, override, fork or lockfile rewrite yet. Acceptance requires maintainer-reviewed/merged upstream remediation or a separately reviewed compatible replacement, independently run adversarial tests for the known residual cases and semantic-equivalence/compatibility coverage, then clean high-severity audit and exact-head required CI.
- Repository exposure remains bounded by the lockfile's dev-only dependency classification, but this does not waive the required audit gate or establish safety if untrusted glob patterns reach build tooling.

## 2026-11-18 — exact integration-tip Pages closeout (`ddad7f5e`)

- **DONE_VERIFIED — Pages workflow [44336176912](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176912) succeeded on exact integration HEAD `ddad7f5e08c674966c7f0b2431859878710da719`.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser alphabet parity, static model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright tests and Pages artifact upload all passed. Deploy was skipped because the event was a pull request; this is not a production deployment.
- **BLOCKED — required Tests workflow [44336176587](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176587)** on the same SHA failed at the mandatory `npm audit --audit-level=high` for GHSA-fc5q-39xc-vjpf / transitive `picomatch@4.0.7`, after corpus validation, Python install, wheel registry verification, pytest and `npm ci` passed. Build/generated-data/Node/Playwright steps were skipped in that Tests job; Pages success independently covers those build/browser stages but does not waive the required security gate.
- PR #171 description was reconciled to this exact-head result. PR remains OPEN/DRAFT/mergeable and unmerged; main remains unchanged. No dependency override, downgrade, suppression, fork, merge, release or production deployment.
- Readiness remains research/engineering prototype: mandatory security gate blocked; independent adjudicated Yangon-profile IPA gold remains 0; empirical accuracy unmeasured; phonological coverage, primary MLC/MLCTS item-level evidence/reuse rights and manual accessibility QA remain incomplete; independent IPA annotation remains DEFERRED by owner scope.


## Exact-head verification addendum — 2026-11-18 (`ddad7f5e08c674966c7f0b2431859878710da719`)

- **DONE_VERIFIED — Pages [44336176912](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176912):** exact-head success. Pinned WFST/OpenFst build, IPA and browser alphabet invariants, static export, upstream parity, production build, Node tests, Playwright and Pages artifact upload passed. No production deployment.
- **BLOCKED — Tests [44336176587](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336176587) and duplicate [44336166612](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44336166612):** exact-head failure at required `npm audit --audit-level=high` (4 high findings, including GHSA-fc5q-39xc-vjpf in transitive `picomatch`). Corpus validation, Python install, wheel verification, pytest, Node setup and `npm ci` passed; later build/generated-data/Node/Playwright steps were skipped in the test job.
- Pages' separate `npm install --no-audit` build path does not waive the required security gate. PR #171 remains draft/unmerged. No audit suppression, dependency workaround, release or production deployment. Linguistic gold/coverage, source-rights and manual accessibility gates remain open.

## 2026-11-18 — exact documentation-tip Pages completion (`a0202336e9f88f96039d957bb21b92f0ccdaf93b`)

- **DONE_VERIFIED — Pages [44339640438](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44339640438): SUCCESS** on exact SHA `a0202336e9f88f96039d957bb21b92f0ccdaf93b`. Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser alphabet parity, static export, upstream `thrax_g2p` parity, production build, Node tests, Chromium installation, built-site Playwright and Pages artifact upload passed. Deploy job skipped on PR event; no production deployment.
- **BLOCKED — Tests [44339640388](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44339640388): FAILURE** on same SHA. Corpus structure validation, editable Python install, wheel registry verification and pytest passed (322 tests + 68 subtests); `npm ci` completed. Required `npm audit --audit-level=high` failed with four high findings including GHSA-fc5q-39xc-vjpf in transitive `picomatch`; subsequent build/generated-data/Node/Playwright steps skipped.
- PR #171 description now records both outcomes. PR remains OPEN/DRAFT/mergeable and unmerged; no dependency workaround or audit suppression. Security gate remains the immediate blocker; linguistic gold remains 0 and accuracy unmeasured. Documentation-only descendants do not change runtime, data or linguistic rules.

## Primary-source access lead — 2026-11-18

- **DONE_VERIFIED — bibliographic/access evidence added, not phonetic evidence.** CiNii Books record BA24767941 identifies the 1993 Myanmar-English Dictionary compiled/edited by the Myanmar Language Commission, gives its extent as xxiii, 635, iii pages, and lists holdings at seven Japanese libraries. Added `CINII_MLC1993_DICT_HOLDINGS` to `data/burmese/sources.csv` and `CLM-MLC-DICT-1993-CINII-HOLDINGS-001` to `data/burmese/source_claims.csv`. The record provides retrieval routes only: no pages, pronunciation key, MLCTS/IPA field or entries were inspected. This does not change the linguistic acceptance status or authorize runtime rules.
- Primary-content access remains BLOCKED pending actual inspection of a copy and rights review; the existing WHO Myanmar Library holding and 1996 NDL/Dunwoody access leads remain distinct routes.

## Optional raw-output diagnostics — 2026-11-18 (PR head `7f551df93b53fe775bd9a10d75445653eca827b9`)

- **DONE_VERIFIED — optional workflow [44353665567](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44353665567): SUCCESS** across all three jobs. Artifacts: Epitran raw output (SHA-256 `1092f31196c9580a55f0f54af7f05749089493f5897aa33dd3bb995d9d708feb`), Google WFST raw output (`a31955361f80647b034bcc723ad2f4fa2993ba150eab9be85abd2a42eae6a4eb`), and CRF raw output (`0662459bcfc147175b12170de4da9c6b208d3f6bc329ce42ad5d042cfc92bd46`).
- Epitran 1.35.3 returned six outputs for six **STRUCTURAL_ONLY** probes; eligible verified gold = 0 and accuracy = null.
- Pinned Google Burmese Thrax/OpenFst returned six outputs for six structural-only probes with zero runtime errors; independent gold = 0 and accuracy = null. This confirms build/execution only, not IPA or dialect accuracy.
- Pinned CRFsuite v2 returned predictions for 100 deterministic source-attested myG2P rows; 84 were source-concordant. Gold = 0 and accuracy = null. The probe supplies syllable boundaries, exact model training membership is unknown, and train/test overlap is possible; concordance is diagnostic only. myG2P is CC BY-NC-SA 4.0 and used test-only; no data/model entries copied into repository runtime or gold.
- **Interpretation:** all three optional diagnostics executed successfully, but none supplies independent validation or supports an accuracy claim. Keep linguistic acceptance BLOCKED/PARTIAL.

## Exact PR-head CI closeout — 2026-11-18 (`7f551df93b53fe775bd9a10d75445653eca827b9`)

- **DONE_VERIFIED — Pages [44353665074](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44353665074): SUCCESS** on exact PR head. WFST/OpenFst build, IPA symbol-table and browser alphabet checks, static export, upstream parity, production build, Node tests, Chromium/Playwright and Pages artifact upload passed; deploy skipped for PR event.
- **BLOCKED — Tests [44353666294](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44353666294): FAILURE** at mandatory high-severity npm audit after corpus validation, Python install, wheel verification, pytest (322 + 68 subtests) and `npm ci` passed. Build/generated-data/Node/Playwright steps skipped in this job.
- Optional raw-output diagnostics [44353665567](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44353665567) succeeded, with independent gold = 0 and accuracy null for Epitran, Google WFST and CRF. No accuracy claim.




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

| ID | Status | Implementation and verification | Remaining boundary |
|---|---|---|---|
| BUR-012 | DONE_VERIFIED | Python `RuleBasedBurmeseEngine.analyze()` emits `graphemic_status` and `phonology_status`; browser `analyzeHybrid()` emits `graphemicStatus` and `phonologyStatus`. Existing independent IPA and Ukrainian status fields remain separate. Added `schemas/analysis-layer-status.schema.json`; Python/browser regression tests cover established segmental, structurally valid partial, unsupported, empty and mixed-text cases. Implementation commit `c607cca53d63f3d4fd606e328010b25eef0b601d`; PR Tests [44389661155](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44389661155) and push Tests [44389647797](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44389647797) SUCCESS (324 pytest + 68 subtests; 73 Playwright; audit 0 vulnerabilities). | This is a typed uncertainty/status contract, not new phonology. Independent adjudicated Yangon IPA gold = 0; accuracy unmeasured; tone, phonation, quantity, full vowel/coda/medial coverage and profile adjudication remain incomplete. |

## Exact implementation-head optional diagnostics — 2026-11-18

- **DONE_VERIFIED — [44389661175](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44389661175): SUCCESS** across raw-output comparator, CRFsuite baseline and Google WFST raw-output jobs on implementation commit `c607cca53d63f3d4fd606e328010b25eef0b601d`. Outputs remain diagnostic only; no independent gold or accuracy score.
- The Pages workflow for this implementation head was queued/running at the time of this matrix update; no deployment is claimed.


## Structural, UI and exact-head CI closeout — 2026-11-18

| ID | Status | Implementation and exact verification | Remaining boundary |
|---|---|---|---|
| BUR-010 | DONE_VERIFIED | Unicode normalization/segmentation contract: canonical-equivalence pair; Myanmar block/inventory boundaries; mixed scripts, digits, punctuation, CRLF, zero-width and C0/C1 controls; malformed virama; reordered marks; lossless accounting of assigned Myanmar letters/marks. Python/browser fixtures and built-site tests pass on exact head `ea37329ae4a3ba59442a3a61e56210e7b971e8b2`. | Bounded structural contract only; broad annotated differential corpus and complete parser equivalence remain PARTIAL. |
| BUR-011 | DONE_VERIFIED | Four medials, five pairs, two triples, kinzi-final nasal, syllable boundaries, subjoined consonants, coda attachment, legal mark order and malformed virama have explicit structural fixtures. Python parser, shared fixtures and built-browser tests pass on exact head `ea37329`. | Structural only. Medial/kinzi/conjunct phonological realizations remain withheld/partial. |
| BUR-012 | DONE_VERIFIED | Independent Python/browser graphemic, source-phonology, IPA and Ukrainian-adaptation status fields; runtime-specific JSON Schema and schema tests. | Status contract does not add phonology or gold. |
| BUR-016 | DONE_VERIFIED | README and browser research notice state prototype limitations; UI exposes all four layer statuses; Playwright test asserts segmental-only output remains provisional. | Manual accessibility QA remains TODO. |

### Exact code/UI head verification — `ea37329ae4a3ba59442a3a61e56210e7b971e8b2`

- **DONE_VERIFIED — PR Tests [44392021017](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392021017): SUCCESS** — 325 pytest, 68 subtests, 74 built-site Playwright; npm audit 0 vulnerabilities; production build, generated-data freshness and Node tests passed.
- **DONE_VERIFIED — push Tests [44392004315](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392004315): SUCCESS** on exact same SHA.
- **DONE_VERIFIED — Pages build [44392020805](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392020805): SUCCESS** — pinned WFST/OpenFst, symbol-table and alphabet parity, static model export, upstream `thrax_g2p` parity, production build, Node/browser tests and Pages artifact upload. Deploy job skipped for PR event; no production deployment.
- **DONE_VERIFIED — optional diagnostics [44392020840](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44392020840): SUCCESS** across Epitran/raw-output, CRF and Google WFST jobs. No accuracy or gold claim.
- **Readiness:** engineering/research prototype only. Independent adjudicated Yangon IPA gold = 0; accuracy null; source rights and full phonological coverage remain incomplete; manual accessibility QA TODO.


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


## IPA gold pilot preparation update — 2026-11-18

| Work item | Status | Evidence | Remaining acceptance |
|---|---|---|---|
| Convention-sheet preparation | DONE_VERIFIED (draft only) | `docs/ipa-convention-sheet-draft.md` records unresolved specialist decisions and maps them to the existing IPA schema and collection protocol. | Specialist approval; do not annotate against this draft. |
| Expert approval and recruitment | BLOCKED | Issue [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85) identifies prospective leads and required roles; no one is confirmed or contacted. | Approved versioned convention, two qualified independent annotators, independent adjudicator and non-annotating curator. |
| 30-item pilot selection | BLOCKED | Existing playbook defines coverage goals and source/rights requirements. | Exact attested lexemes, source locators, profile fit and item-level rights evidence; no Cartesian-product synthetic items. |
| Blind intake | TODO | Protocol specifies separate locked submissions and independent adjudication. | Private intake dry-run; no public PR/shared repo used as blind channel. |

This update adds preparation scaffolding only. Gold JSONL remains empty; no IPA labels or accuracy score were created.


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


## PR #129 stack-tree reconciliation — 2026-11-19

Correction: the 11 paths unique to PR #129's changed-file list are not missing from the active #171 integration stack. They are already present in #171's base tree (#168 head a4f730157c837354fbfb8cbadab8b08279e1fc5e) and inherited by #171. The base and #171 copies of src/burmese_ukrainian/hybrid.py and scripts/benchmark_google_fst.py were fetched and compared; supporting registry/docs/tests are also present in the inherited tree. Do not port duplicate files.

PR #129 remains OPEN/DRAFT and diverged (head d0be0c316fe59f64f1b2f71e484c10d1356dbf3b; mergeable=false). Its PR description/comment and PR #171 comment were updated with this correction. No code changes or branch operations were made. Engineering diagnostics remain smoke-only; independent adjudicated IPA gold=0, accuracy unmeasured. This task is DONE_VERIFIED as a repository-tree reconciliation, not as new linguistic validation.


## Exact-head engineering CI — 2026-11-19 (`65c823c8d6a2a50f30a73bdf7fec99497a8c4fb2`)

| Work item | Status | Evidence | Boundary |
|---|---|---|---|
| Required PR workflow | DONE_VERIFIED | Run 44498785399 SUCCESS; Python install/wheel, pytest, npm install/audit/build, generated-data freshness, Node tests and built-site Playwright all passed. | No linguistic gold/accuracy inference. |
| Pages build | DONE_VERIFIED | Run 44498785224 SUCCESS; pinned Google WFST/OpenFst, IPA symbol table, browser alphabet parity, static export, upstream parity, production build, Node/browser tests and artifact upload passed. | Deploy job SKIPPED on PR event. |
| Optional diagnostics | DONE_VERIFIED | Run 44498785171 SUCCESS; Google WFST raw-output, Epitran comparator and CRF baseline jobs passed and uploaded artifacts. | Raw-output diagnostics only; independent gold=0, accuracy=null. |

Exact verified HEAD: `65c823c8d6a2a50f30a73bdf7fec99497a8c4fb2`. Any later commit must be re-verified independently. Research blockers remain unchanged: adjudicated Yangon IPA gold=0, accuracy unmeasured, expert convention approval and rights-cleared annotation pilot unresolved; manual accessibility QA incomplete. Engineering/research prototype only.


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


## Exact-head four-workflow CI closeout — 2026-11-19 (`a6288a9ed90fc432c054c0da37486d0d5596b6c7`)

All four configured workflows completed **SUCCESS on the exact same integration HEAD** `a6288a9ed90fc432c054c0da37486d0d5596b6c7`; GitHub run metadata confirms that exact `head_sha` for every run:

- **DONE_VERIFIED — PR Tests [44600685509](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44600685509): SUCCESS.** All 31 job steps passed, including independent IPA corpus-structure validation, editable Python install, wheel registry verification, pytest, npm ci, high-severity npm audit, production build, generated-web-data freshness, Node tests, Chromium installation and built-site Playwright.
- **DONE_VERIFIED — Push Tests [44600675346](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44600675346): SUCCESS.** All 31 job steps passed, including the same Python/package/corpus, npm/security, build/data freshness, Node and built-site browser gates.
- **DONE_VERIFIED — Pages artifact build [44600685884](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44600685884): SUCCESS.** Pinned Google Burmese WFST/OpenFst build, IPA symbol-table invariants, browser input-alphabet parity, static browser-model export, upstream `thrax_g2p` parity, production build, Node tests, Chromium/Playwright and Pages artifact upload all passed. Artifact `github-pages`: 57,952 bytes (artifact ID `14566699934`). The deploy job was **SKIPPED** because this was a pull-request event; no production deployment occurred.
- **DONE_VERIFIED — optional diagnostics [44600685511](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44600685511): SUCCESS** across CRF baseline, Google WFST raw-output and raw-output comparator jobs. Artifacts: Epitran 1,705 bytes; Google WFST 1,976 bytes; CRF 12,370 bytes. These are reproducibility/raw-output diagnostics only, not independent gold or accuracy evidence.

The exact-head engineering CI gate is green. PR #171 remains OPEN/DRAFT/mergeable/unmerged, based on `fix/finals-registry-schema-2026-11-17`. This closeout changes no runtime, source data, corpus, gold labels, schema or benchmark methodology. Independent adjudicated Yangon IPA gold remains 0; accuracy remains unmeasured. Specialist convention approval, qualified annotators/adjudicator/curator, item-level source rights and attested pilot items, blind-intake dry-run, complete phonological coverage and manual accessibility QA remain unresolved. Readiness remains engineering/research prototype, not linguistically release-ready or WCAG-conformance-certified.


## Root architecture document reconciliation — 2026-11-20

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-ARCH-DOC-001 | DONE_VERIFIED | Root `docs/ARCHITECTURE.md` was rewritten on #171 to document the registry-backed IPA-first Python/browser topology, shared semantic fixtures, canonical CSV registries, IPA adapter boundary and unresolved prosody/profile gates. #172's architecture clarification remains merged on `main`; this #171 update reconciles it with the new runtime. | Documentation only; exact-head CI for the updated #171 candidate is recorded below. |



## Exact reconciled integration-head CI closeout — 2026-11-20

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-IPA-FIRST-INTEGRATION-001 | PARTIAL (engineering gate DONE_VERIFIED; merge and linguistic acceptance pending) | Exact merge head `9d39110ca5f7e30f6449e1975633f79f7421a429`; PR Tests [44724860279](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724860279), Push Tests [44724850117](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724850117), Pages artifact [44724860172](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724860172), optional diagnostics [44724860152](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44724860152) all SUCCESS. Counts: 325 Python + 68 subtests; 74 Playwright; npm audit 0 vulnerabilities. | PR #171 remains OPEN/DRAFT, based on main, 185 ahead / 0 behind, 37 paths. PRs #168/#169/#170 remain open/overlapping. No merge or release. Linguistic gold remains 0 and accuracy unmeasured. |



## Final integration and release-gate status — 2026-11-20

| Task | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-IPA-FIRST-INTEGRATION-001 | DONE_VERIFIED (engineering integration) / PARTIAL (linguistic release) | PR #171 merged as `a7cd77c30ff039b594536f72219ccd2a497e7dfd`; exact PR-head Tests [44733556541](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733556541), push Tests [44733544647](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733544647), Pages [44733556536](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733556536), diagnostics [44733556552](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44733556552) SUCCESS. Post-merge main Tests [44734426671](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44734426671), Pages/deploy [44734426858](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44734426858), diagnostics [44734426623](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44734426623) SUCCESS. | Tone, phonation, quantity, medials/codas/vowel combinations, profile adjudication and independent gold remain incomplete. No accuracy score. |
| BUR-PR-STACK-RECONCILIATION-001 | DONE_VERIFIED | PRs #166–#170 closed as superseded/completed after checking relevant changed files against current main; branches preserved. PR #129 remains open as a separate research benchmark candidate. | No branch deletion, force-push or duplicate merge. |
| BUR-GOLD-PILOT-001 | BLOCKED (human/source-rights dependency) | Issue [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85). | Approve convention, recruit 2 annotators + independent adjudicator + curator, private blind intake, rights-clear 30 lexeme groups, independent adjudication. |
| BUR-MANUAL-A11Y-001 | TODO (human QA) | Issue [#173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/173). | Manual keyboard/screen-reader/zoom/reflow/contrast/mobile review and remediation; no WCAG claim before evidence. |


## Exact current-main closeout — 2026-11-20

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-IPA-FIRST-INTEGRATION-001 | DONE_VERIFIED (engineering and deployment) / PARTIAL (linguistic) | Exact main HEAD `c88b1857a7e321264a4ad31c5efeb8bf471f49e6`: Tests [44735314959](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44735314959) SUCCESS (325 Python + 68 subtests; 74 Playwright; npm audit 0 vulnerabilities); Pages/deploy [44735314873](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44735314873) SUCCESS, including live Pages deployment. | Engineering gate is green. Independent gold=0, accuracy unmeasured; complete Burmese prosody and expert adjudication remain outstanding. |
| BUR-PR129-RECONCILIATION-001 | DEFERRED (historical divergent PR) | PR #129 remains 53 ahead / 42 behind and mergeable=false. All 21 paths compared; optional Epitran workflow, Google WFST benchmark script and test are identical to main, while other paths are older/different versions of code/docs already represented in main. A current-state comment is recorded on PR #129. | Do not merge/rebase stale branch; owner may close it as historical context. No branch deletion. |
| BUR-GOLD-PILOT-001 | BLOCKED (human/source-rights dependency) | Issue [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85). | Approved convention, two independent annotators, adjudicator, curator, blind intake and 30 rights-cleared adjudicated lexeme groups. |
| BUR-MANUAL-A11Y-001 | TODO (human QA) | Issue [#173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/173). | Manual keyboard/screen-reader/zoom/reflow/contrast/mobile review and retest. |

## Automated accessibility smoke — 2026-11-20

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-A11Y-AUTO-001 | DONE_VERIFIED (automated smoke only) | Main HEAD `9083ac45d4eaec324aecbea46e587a07613da4d6`: Tests [44737261587](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44737261587) SUCCESS (325 Python + 68 subtests; 75 Playwright; npm audit 0 vulnerabilities); Pages/deploy [44737261616](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44737261616) SUCCESS including deployed-site/runtime-asset smoke. | Automated semantics/named controls/links, landmarks, image alt, skip navigation, keyboard, reduced motion, narrow reflow and placeholder contrast only. Does not replace manual assistive-technology or WCAG review. |
| BUR-MANUAL-A11Y-001 | TODO (human QA) | Issue [#173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/173). | Complete keyboard-only end-to-end, screen-reader, 200%/400% zoom, contrast, touch-target and mobile/device evidence; remediate and retest. |

## Exact mainline closeout after accessibility automation — 2026-11-20

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-MAIN-CI-2026-11-20-C39 | DONE_VERIFIED | Exact main HEAD c39ee3b05455ea309d4327ee15d9d6fed8db7605. Tests [44738350586](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44738350586) SUCCESS; workflow steps confirm gold-corpus structural validation, wheel registry check, pytest, npm high-severity audit, production build, generated-data freshness, Node tests and built-site Playwright. Pages/deploy [44738350573](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44738350573) SUCCESS; pinned Google WFST/OpenFst build, IPA symbol-table and browser alphabet checks, upstream Thrax parity, production build, Playwright, Pages deployment and public runtime-asset smoke all succeeded. | Hosted exact-head verification only; no local checkout/tests in this connector session. |
| BUR-NI25-PROSODY-EVIDENCE-001 | DONE_VERIFIED (source registered and scope audited) | data/burmese/sources.csv (NI2025), data/burmese/source_claims.csv (CLM-NI25-ONSET-F0-001), and this workpack record study design, bounded findings and non-promotion boundary. | Research evidence only. Does not establish Yangon citation-form IPA, independent lexical gold, a general minor-syllable tone rule or runtime phonology. |
| BUR-GOLD-PILOT-001 | BLOCKED | Issue [#85](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/85). | Expert-approved convention, two independent annotators, separate adjudicator and curator, private blind intake, item-level rights and 30 adjudicated lexeme groups. |
| BUR-MANUAL-A11Y-001 | TODO (human QA) | Issue [#173](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/issues/173). | Manual keyboard/screen-reader/zoom/reflow/contrast/mobile review and remediation; automated tests are not WCAG sign-off. |


## Final merged-main verification — 2026-11-20

| Work item | Status | Evidence | Acceptance boundary |
|---|---|---|---|
| BUR-FINAL-MAIN-CI-2026-11-20 | DONE_VERIFIED | Final main commit [46b9a089d771eb9cf582a4fd24bead656965e9b0](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/commit/46b9a089d771eb9cf582a4fd24bead656965e9b0); PR #175 merged. Tests [44753083163](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44753083163), optional Epitran diagnostics [44753082760](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44753082760), and Pages/deploy [44753082850](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44753082850) all SUCCESS. Pages build and deploy jobs both succeeded. | Hosted exact-final-commit verification. No local checkout/tests in this session. |
| BUR-GOLD-PILOT-001 | BLOCKED | Issue #85; no independent adjudicated gold. | Expert-approved convention, two independent annotators, separate adjudicator/curator, blind intake, item-level rights and 30 adjudicated lexeme groups. |
| BUR-MANUAL-A11Y-001 | TODO (human QA) | Issue #173. | Human keyboard, screen-reader, zoom/reflow, contrast, touch-target and mobile QA; automated checks are not WCAG sign-off. |
| BUR-LICENSE-OWNER-DECISION | BLOCKED | Repository has no declared license; no owner instruction to select one. | Owner chooses and approves repository license. |


## Licensing decision update — 2026-11-21

- BURMESE-LICENSE-001 — PARTIAL pending PR CI/merge: add PolyForm Noncommercial 1.0.0 for original project code, CC BY-NC 4.0 for original documentation, update package/Citation metadata, and explicitly exclude third-party components and source-specific research data.
- Owner intent is confirmed: noncommercial research and scientific knowledge-sharing. Commercial use is not granted by the selected terms; PolyForm Noncommercial is not OSI-approved Open Source.
- Existing Epitran, Google Language Resources, Mya2Rom and other third-party license terms remain unchanged. Dataset/source rights remain item-specific; unknown/conflicting entries are not cleared by the repository's own licenses.
- No phonological or runtime behavior changed. Acceptance: exact PR-head CI green, license-scope files and metadata reviewed, then merge.


## Licensing decision closeout — 2026-11-21

- BURMESE-LICENSE-001 — DONE_VERIFIED. Original project code is licensed under PolyForm Noncommercial 1.0.0; original documentation under CC BY-NC 4.0. Package metadata and CITATION.cff now declare PolyForm-Noncommercial-1.0.0. PR #177 merged as 3d9789152b251dfa503f36726cc7a89c9835fcb7.
- Exact PR-head tests 44826544412 and Pages build 44826544397 both SUCCESS. Exact-main tests and Pages/deploy are queued at this checkpoint; their final results must be recorded separately.
- Third-party software and item-level research data remain under their own rights. Unknown/conflicting source rights are not cleared by the project license. PolyForm Noncommercial is not OSI-approved Open Source and does not grant commercial-use permission.
- No linguistic rules, IPA values, lexical labels, generated datasets or runtime behavior changed.


## Research data licensing — 2026-11-21

- BURMESE-RESEARCH-DATA-LICENSE-001 — PARTIAL pending PR/CI: added CC BY-NC 4.0 for original project-authored research datasets/annotations via `LICENSE-DATA`; README and third-party notice scope/exclusions updated; benchmark license registry and gold-corpus docs distinguish noncommercial research reuse from commercial/product-corpus eligibility.
- Third-party data and mixed-source rows are not covered. Unknown/conflicting provenance remains BLOCKED; Mya2Rom, Epitran maps, Google resources, myG2P and Goruut retain their own terms. No new data/IPA labels were introduced.


## Research data licensing — final verified state — 2026-11-21

- BURMESE-RESEARCH-DATA-LICENSE-001 — DONE_VERIFIED. PR #179 merged as `c604092088d48bd4c4bf8fcf45cf40ab77705a08`; original project-authored datasets, annotations and curated database contributions are licensed CC BY-NC 4.0 under `LICENSE-DATA`, only where project contributors hold the rights. README, `THIRD_PARTY_NOTICES.md`, `data/benchmark/licenses.json` and gold-corpus documentation now distinguish noncommercial research reuse from commercial/product-corpus eligibility.
- PR-head tests 44829563024 and Pages build 44829563050 SUCCESS. Exact-main tests 44830387172 and Pages build/deploy 44830387150 SUCCESS on `c604092088d48bd4c4bf8fcf45cf40ab77705a08`.
- Third-party source rights and mixed-source rows remain governed by item-level evidence; unknown/conflicting rights are not cleared by this grant. NC-only records remain excluded from the commercial/product gold-corpus gate. No gold data or IPA labels were added.


## Final mainline CI — 2026-11-21

Final main SHA `07fcbf92f11cde54ed726a07f0593fd0075e7e09` is fully verified: tests 44831787580 SUCCESS; Pages build/deploy 44831787588 SUCCESS. This supersedes the previous checkpoint on `c604092088d48bd4c4bf8fcf45cf40ab77705a08`. BURMESE-RESEARCH-DATA-LICENSE-001 remains DONE_VERIFIED. Third-party item-level rights, expert IPA gold pilot and manual accessibility QA remain unresolved; no gold labels or runtime rules were added by the licensing work.

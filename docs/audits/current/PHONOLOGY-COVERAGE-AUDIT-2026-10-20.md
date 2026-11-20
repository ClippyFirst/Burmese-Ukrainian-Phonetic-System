# Burmese phonology coverage audit

Review date: 2026-10-20  
Repository: https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-

## Scope and interpretation

This is an implementation audit, not a claim that all standard Burmese pronunciations have been surveyed. "Implemented and tested" means an executable behavior has regression coverage; it does not mean the linguistic claim is empirically validated. A source listed in the bibliography does not, by itself, establish that code implements its findings.

Statuses:
- **Implemented and tested** — an executable behavior has regression coverage.
- **Partially implemented** — a limited representation or subset exists and has some tests.
- **Documented only** — the issue or analysis is described, but no complete implementation is verified.
- **Absent / not established** — no adequate implementation or independent evidence-backed evaluation is currently verified.

## Layer-by-layer inventory

| Layer | Status | What is present | What is still missing |
|---|---|---|---|
| Unicode normalization | Partially implemented | Python normalization exposes NFC/NFD/NFKC/NFKD; browser normalizer uses NFC. | Equivalence tests across canonical spellings, full normalization contract across runtimes, and policy on compatibility normalization. |
| Myanmar block recognition | Implemented and tested (bounded contract) | Python and browser recognize Myanmar, Extended-A/B and U+116D0–U+116FF ranges; shared JSON fixture tests unsupported script characters. | Range recognition is not proof that every code point is Burmese or supported by the parser. |
| Grapheme/syllable segmentation | Partially implemented | Conservative segmentation and structural parser; browser has a separate parser. | Independent annotated boundary corpus; differential Python/browser tests for punctuation, mixed scripts, combining marks and ambiguous boundaries. |
| Main consonants | Partially implemented | Graphemic inventory and a small onset IPA table. | Complete phoneme inventory, lexical/phonological conditions, contrast validation and coverage accounting. |
| Kinzi | Partially implemented | Explicit sequence recognition in parser and browser. | Source-backed cases for onset/medial/coda contexts; consistent phonological interpretation across runtimes. |
| Medials and complex onsets | Partially implemented | Four medial signs and structural combination handling; browser derives some contextual IPA. | Complete combination inventory, source-anchored IPA, competing analyses and a cross-runtime gold set. |
| Dependent and inherent vowels | Partially implemented | Vowel signs are parsed; inherent-vowel state exists; Python maps only a small set of vowel IDs. | Full vowel combinations, context rules, length/quality contrasts and independent word-level validation. |
| Finals/codas and checked syllables | Partially implemented | Parser records some coda structures; browser has contextual coda/rime rules. | Complete coda inventory, checked-syllable realization and validated lexical examples. |
| Tone | Documented only / not established in runtime | Analysis registries retain traditional four-way and eight-tone/register analyses. | Source-backed tone-labelled examples, F0/phonation/duration interpretation, dialect/scope metadata and calibrated output. |
| Phonation/register | Documented only | The literature registry includes competing register/phonation accounts. | No complete evidence-gated implementation or benchmark verified. |
| Allophony and phonological rules | Partially implemented in browser; not established as a complete model | Hand-written contextual cases exist. | Rule-by-rule source mapping, environments, counterexamples and cross-runtime tests. |
| IPA | Partially implemented | Python IPA uses a small onset/vowel seed map and marks output conservative_partial or analysis_dependent; browser has a separate, richer handwritten derivation. | No validated comprehensive IPA layer; no independent gold set; no guarantee the two runtimes agree. |
| IPA → Ukrainian | Partially implemented | Table-driven candidate registry and explicit not_established fallback; Russian rules are kept as a comparison layer. | Independent validation of every correspondence, contextual Ukrainian spelling policy and name-level benchmark. |
| Unknown/ambiguous inputs | Partially implemented | Parser and practical layer have uncertainty/unsupported outcomes. | One cross-runtime status contract, no-confident-output guarantee, and adversarial tests for every API path. |
| Citation and licensing metadata | Citation metadata added in this audit; project license unresolved | CITATION.cff declares the work as a research prototype and license NOASSERTION. | A maintainer must choose and document a project license after separating code, corpus and third-party data rights. No license is inferred from public visibility. |

## Evidence-gated output contract

Use statuses at the layer where uncertainty originates. Do not collapse them into one success flag.

- SUPPORTED: the specific analysis is covered by a source-backed rule and an applicable regression/gold test.
- UNCERTAIN: more than one plausible analysis remains, source scope does not settle the case, or the runtime has only a hypothesis.
- UNSUPPORTED: the input or construction is outside the implemented inventory.
- NOT_ESTABLISHED: the system has no defensible output mapping.

A successful Unicode parse must not imply supported phonology. Supported IPA must not automatically imply a single Ukrainian spelling. A placeholder such as ? is diagnostic output, not a transcription.

## Current independent-corpus measurement

The repository has literature/source registries and structural regression fixtures, but this review did not verify a complete independently adjudicated lexical IPA corpus. Therefore:
- phonological gold-corpus size: **0 verified entries** in this audit;
- validated word-level IPA accuracy: **not measured**;
- Ukrainian name-level accuracy: **not measured**;
- browser/Python phonological agreement: **not measured**.

These are unknown measurements, not 0% accuracy. The shared Unicode JSON fixture is explicitly a structural/status contract and must not be counted as phonological gold data.

## Next acceptance gates

1. Add source-located examples with the exact source page/table/entry and a documented IPA convention.
2. Require a second source or independent reviewer for disputed lexical/tonal analyses where possible.
3. Separate phonemic/broad IPA from surface phonetic detail.
4. Compare Python, browser and external engines only on the same adjudicated examples.
5. Report coverage as supported examples / eligible examples, with unresolved and unsupported cases shown separately.
6. Keep tone, phonation and dialect claims analysis-dependent until the evidence supports a narrower conclusion.

## Sources

See docs/references.md, data/burmese/sources.csv, data/burmese/source_claims.csv, and data/burmese/tone_analyses.csv.


## Evidence update — 2026-11-13

- **Segmentation:** Python now recognizes a base consonant + U+103A ASAT as a final/coda in the preceding syllable, matching the browser parser. Tests cover မြန် (one syllable), မြန်မာ (two) and ကတ်. Overall segmentation remains partial because there is no independent annotated boundary corpus.
- **Medials:** the orthographic inventory is now source-verified as four basic signs plus seven combinations. Phonetic behavior remains partial/context-dependent; the existence of a combination is not an IPA rule.
- **Coda:** Green's placeless /N/ analysis requires nasalization/approximate place realization, not an unconditional independent [ɴ]. The Ukrainian /ɴ/ target rule remains conditional on the selected IPA representation.
- **External models:** Google Thrax /m j àɴ/ and Epitran /məjaɴ/ disagree on မြန်; both have zero gold. CRF source concordance is not empirical accuracy.
- **Tone:** four-tone and eight-tone/register analyses remain separate. No tone rule is enabled.
- **Release boundary:** independent adjudicated IPA gold remains zero; word-level accuracy remains unmeasured.


### Typed IPA metadata gap — 2026-11-13

The IPA gold schema can preserve nasalization in its literal IPA value, but has no separate typed nasalization property. This is not a current transcription blocker if the literal string is preserved; it is a downstream-query limitation. Defer schema expansion until the phonemic /N/ vs surface nasalization convention is expert-approved.


## Text-only historical and contextual evidence update — 2026-11-13

- **Historical medial structure:** STEDT (1996), Nishi (1997) and Matisoff (2003) show that Written Burmese periodization, proto-medial reconstruction and modern spoken correspondences must remain separate. Historical WB *-r- > Modern Burmese -y- is documented, but no direct mapping to current Unicode U+103B/U+103C is established.
- **Written/spoken distinction:** Nishi (1997) explicitly distinguishes written H and spoken L systems and their non-coterminous periods. A written romanization or historical spelling cannot alone establish modern Yangon IPA.
- **Contextual voicing:** Nishi (1998) describes two Standard Burmese voicing-sandhi patterns, but documents optionality, exceptions and regional differences. Both remain analysis-dependent; no global runtime rule is enabled.
- **Text corpora:** Myanglish and orthographic correction datasets may support romanization diagnostics or spelling-normalization research after schema and row review; neither supplies IPA gold. Okell text corpus is authorized for research by the project owner; its bytes remain inaccessible in this execution environment.
- **Measurement:** independent expert-adjudicated text-based IPA gold remains **0**; word-level accuracy remains **null/unmeasured**. No audio is part of the active scope or acceptance criteria.


### Nishi full-text evidence and text-corpus status — 2026-11-13

- Nishi (1998), *Old Burmese: Toward the History of Burmese*, is now inspected in full. It distinguishes historical -h as a voiceless/aspirated sonorant marker from actual -r/-l/-y/-w medial clusters; documents OWB -l- and later conditioned reflexes; places the MB -r-/-y- merger in Standard EModWB; and compares cluster reflexes across WB, SB, Arakanese, Tavoyan, Intha and Minor Taungyo.
- These are historical written/phonological correspondences, not direct modern Unicode mappings. Four historical rules and thirteen new matrix rows are source-linked and tested; every such row remains WITHHELD.
- Nishi (1998) voicing paper contributes seven source-phonemic sandhi examples. They follow Okell 1995's source transcription convention and are explicitly NOT project IPA; IPA field is empty.
- Text-use permissions for external resources are confirmed by the project owner. Okell and SEAlang remain blocked only by actual byte/entry retrieval and schema access, not by permission.
- Myanglish raw CSV vs dataset metadata has an unresolved 2-column/3-feature discrepancy. The myX orthography corpus has sampled target_words misalignment and multi-substitution examples; quarantine pending full row audit and deduplication.
- Exact-head CI 43393402710: 217 Python tests + 66 subtests, 20 Node tests and 58 browser tests passed; build, generated-data freshness and IPA schema validation passed. Gold remains 0 and accuracy null.

### Final verified state — 2026-11-13

Exact head c03706474cf67b480c449790c9592e5fe0e53fd4 passed CI run 43394274053: 217 Python tests + 66 subtests, 20 Node tests, 58 browser tests, IPA-gold schema validation, build and generated-data freshness. Diagnostic run 43394274111 also passed, but it has no gold and no accuracy result.

The registries contain 56 sources, 71 claims, 42 medial rows, 28 phonological rules and 7 source-phonemic sandhi examples. Nishi (1998) historical and dialect evidence is now more fully represented; all such rows remain WITHHELD. Nishi (1976) is a registered but unread primary-source target.

Text research permissions are confirmed by the project owner; remaining external-source blockers are retrieval/schema and dataset quality, not permission. No audio was used. IPA gold=0, empirical accuracy=null, no runtime rules promoted.


### Okell (1995) regional medial profiles — 2026-11-13

Full text of *Three Burmese Dialects* inspected. It explicitly separates Written Burmese from Standard spoken Burmese and documents distinct Arakanese, Intha and Tavoyan profiles:
- Arakanese preserves WB r/y, which SB merges in speech; the registered AR profile is specifically high-prestige Sit-twe, not all Arakanese varieties.
- Intha and Tavoyan have restricted medial /l/ combinations; Tavoyan /-l/ is explicitly absent from SB.
- The book's transcribed texts are phonemic with limited allophonic approximations, not project IPA gold.
Added source OKELL1995_THREE_DIALECTS, seven claims, two dialect-dependent rules and three withheld medial rows. No audio was accessed. No regional rule was enabled for Yangon.


Okell (1969), *A Reference Grammar of Colloquial Burmese*, is registered as a high-priority primary text target. Nishi (1998) cites §§17-20 for voicing sandhi and Okell (1995) identifies it as the Spoken Burmese reference. Full text was not retrieved; no direct claims are attributed to it. Permission is confirmed; retrieval and exact page locators remain the gate.


### Consolidated final snapshot — 2026-11-13

Exact tested head 2a96f4121a43f704a8f0d2eb6d81cb343fba47db passed CI 43395906072: 219 Python tests + 66 subtests, 20 Node tests, 58 browser tests, IPA schema validation, build and generated-data freshness. Diagnostics 43395906100 passed but has zero gold and no accuracy result.

The evidence registries now contain 58 sources, 78 claims, 45 medial rows, 30 rules and 7 source-phonemic sandhi cases. Okell (1995) documents dialect-specific AR/IT/TV medial inventories; Nishi (1998) documents historical medial distinctions and dialect reflexes. Neither source licenses direct modern Yangon mappings. Okell (1969) and Nishi (1976) remain unread primary-source targets.

Text permissions are confirmed; remaining blockers are retrieval/schema and data quality. No audio was used. IPA gold=0; empirical accuracy=null; no runtime rules promoted.


### Final verified evidence state — 2026-11-13

Exact tested code/data head cda73ccb7fa80a0404fed5a65588ebd690253f94 passed CI 43397172081: 220 Python tests + 66 subtests, 20 Node, 58 browser tests, IPA schema validation, build and generated-data freshness. Optional diagnostics 43397181331 passed but has zero gold and no accuracy result.

The registries contain 59 sources, 81 claims, 45 medial rows, 30 phonological rules and 7 source-phonemic sandhi cases. Okell (1995) regional and Nishi (1998) historical evidence is source-linked/tested and withheld from runtime. SEAlang interface-level IPA support is confirmed by the 2008 project description, but internal storage vs MLCTS2 remains unresolved. Okell (1969) and Nishi (1976) remain unread primary-source targets.

Text permissions are confirmed; remaining blockers are retrieval/schema and data quality. No audio was used. IPA gold=0; empirical accuracy=null; no runtime rules promoted.


### Runtime architecture update — 2026-11-16

The Burmese runtime now follows a clearer staged boundary inspired by the Lao implementation architecture: parser output → registry-backed phonology → typed segmental IPA → completeness/profile gate → Ukrainian adapter. This is an architecture transfer only; no Lao phonological rule or sound value was copied.

Python `phonologize_syllable()` and browser `phonologizeSyllable()` read the same canonical onset/vowel correspondences (Python directly from CSV; browser from generated data) and emit the same typed segmental result. The result preserves source component IDs, IPA values, registry status, source evidence and unresolved features. The browser's previous inline IPA derivation block has been replaced by the dedicated stage. The Python wheel now packages the canonical CSV registries.

The shared contract fixture exercises:
- established simple CV segmental output;
- ya-medial withholding;
- checked-coda withholding;
- prosodic-marker withholding;
- analysis-dependent onset and vowel withholding;
- isolated bare-consonant / inherent-vowel withholding.

Earlier implementation-head CI [43940264184](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43940264184) passed 320 Python tests + 68 subtests, wheel registry verification, 48 Node tests, 72 built-browser tests, production build, generated-data freshness and npm audit (0 vulnerabilities).

**Coverage interpretation:** DONE_VERIFIED for the typed registry boundary and the explicit shared fixtures only. PARTIAL for full Python/browser parser and phonological parity. No vowel combination, medial, coda, checked-syllable, tone, register, phonation or quantity rule was added. Independent adjudicated IPA gold remains 0; empirical accuracy remains null. This is not evidence of improved phonetic accuracy or release readiness.

### Final integration verification — 2026-11-16

The implementation is available in [PR #167](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/pull/167). Runtime-head PR test workflow [43943933652](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43943933652) passed: 320 Python tests + 68 subtests, 49 Node tests and 73 built-browser tests. The Python wheel includes the canonical onset/vowel registries. Runtime-head Pages PR build [43943933659](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43943933659) also passed its pinned Google WFST/OpenFst build, symbol-table checks, upstream CLI parity and built-browser checks; deployment was skipped for the PR event. A later documentation-checkpoint test workflow [43946446370](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43946446370) passed; Pages workflow [43946446443](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43946446443) was still running at last inspection. Subsequent commits only corrected documentation evidence.

The shared cross-runtime contract now explicitly withholds multi-sign vowel sequences unless a dedicated combination rule is sourced, and preserves adjacent bare-consonant placeholders as incomplete. This does not change the linguistic coverage assessment: vowel combinations, medials, codas/checked syllables, nasalization and prosody remain incomplete; independent adjudicated IPA gold remains 0 and empirical accuracy remains null.


### Final architecture and evidence checkpoint — 2026-11-16

- The Lao-inspired architecture transfer is now verified as an engineering boundary: parser output → shared registry-backed onset/vowel phonology → typed segmental IPA → completeness/profile gate → Ukrainian adapter. Python and browser consume the same canonical onset/vowel correspondence data; Python wheel packaging is verified.
- Exact implementation-head workflow [43949402563](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43949402563) passed on `78308eb897116491b634e723de1918debcf2f929`: 320 Python tests + 68 subtests, 49 Node tests, 73 built-browser Playwright tests, wheel registry verification, IPA corpus structural validation, production build, generated-data freshness and npm audit with 0 vulnerabilities.
- Exact-head Pages build [43949402698](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43949402698) passed pinned Google Burmese WFST/OpenFst compilation, symbol-table and input-alphabet checks, upstream `thrax_g2p` CLI parity, production site build, 73 browser tests and Pages artifact upload. Deployment was skipped because this was a PR event.
- The declared shared fixture set proves only the represented cases. It does not establish full parser parity, complete Burmese phonology or empirical accuracy. Multi-sign vowel combinations, medials, codas/checked syllables, nasalization, tone/register/phonation and quantity remain withheld where their realization is not source-adjudicated.
- No new Burmese phonological rule, IPA label, Ukrainian correspondence, gold-corpus entry, dialect claim or third-party asset was introduced by the architecture transfer. Independent profile-matched adjudicated IPA gold remains **0**; empirical word-level IPA and Ukrainian name-level accuracy remain **not measured**.
- Current status: typed registry boundary and declared fixtures — DONE_VERIFIED; complete parser/phonology parity — PARTIAL; vowel/coda realization — TODO/evidence-limited; tone/register/phonation/quantity — BLOCKED pending specialist/profile adjudication; independent gold — BLOCKED / DEFERRED under owner direction.
- Review remains stacked: PR #166 is the documentation base; PR #167 contains the architecture implementation. Both remain open and unmerged. No production deployment occurred.
- A non-blocking Pages-workflow warning notes that `actions/setup-java@v4` and `bazelbuild/setup-bazelisk@v3` target Node.js 20 while the runner forces Node.js 24. The current pinned WFST build and tests passed; treat action-runtime modernization as maintenance work requiring a verified compatible version and exact-head rerun, not as a linguistic blocker.


### CI maintenance migration and exact code-head verification — 2026-11-16

- The Pages workflow migrated from archived `bazelbuild/setup-bazelisk@v3` and deprecated `actions/setup-java@v4` to pinned Node 24 actions: `actions/setup-java@d1374f8ac74474200d16ef8ecee22c7ae7a51880` (v6) and `bazel-contrib/setup-bazel@104e3eea9447cdaa4b00d0fb46191a3985d26ab3` (0.19.1). Bazelisk 1.30.0 is pinned; Java 17, Bazel 7.4.1 and all upstream Google/OpenFst/Thrax source pins are unchanged.
- Exact code-head test workflow [43959491958](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43959491958) SUCCESS: 320 Python + 68 subtests, 49 Node, 73 browser tests, wheel/registry verification, IPA corpus structural validation, generated-data freshness and npm audit 0 vulnerabilities.
- Exact code-head Pages build [43959491968](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/43959491968) SUCCESS: new action setup, Google Burmese WFST/OpenFst build, IPA symbol-table and input-alphabet checks, upstream `thrax_g2p` parity, site build, 73 browser tests and Pages artifact upload. Deployment skipped for PR event.
- The Node.js 20 deprecation warning is resolved. A non-fatal GCC `-Wstringop-overflow` warning remains in the legacy upstream native build; it did not affect the successful build/tests.
- This is CI maintenance only. No source phonological value, IPA label, Ukrainian mapping, dialect assertion or gold-corpus entry changed. Independent profile-matched adjudicated IPA gold remains 0; empirical accuracy remains unmeasured. The language-coverage statuses above remain unchanged.

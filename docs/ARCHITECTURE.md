# Burmese → Ukrainian — Runtime architecture and trust boundaries

**Scope:** current registry-backed IPA-first integration architecture. This document describes the intended runtime contract and the implementation now present in the consolidated integration branch; it does not claim that every Burmese phonological contrast or pronunciation profile is complete.

## Product contract

The repository exposes two distinct conversion routes:

1. **Phonetic route:** Myanmar/Burmese orthography → Unicode normalization → graphemic and orthographic-syllable structure → source-language phonological analysis → typed IPA candidate → Ukrainian IPA adapter → practical Ukrainian output.
2. **Orthographic romanization route:** Burmese orthography → MLCTS romanization → separate MLCTS-to-Ukrainian correspondence table.

MLCTS is an orthographic romanization convention, not IPA. It must never be used as a proxy for pronunciation, phonemic contrasts, tone, phonation or vowel quality. Russian practical transcription is a documentary comparator only and is never a runtime intermediate.

## Runtime topology

### Shared source data and build boundary

- `data/burmese/ipa_onsets.csv` and `data/burmese/ipa_vowels.csv` are the canonical, source-indexed segmental IPA registries consumed by Python and the browser-data generator.
- `data/burmese/finals.csv` retains its five-column structural/evidence contract. Context-dependent finals are not promoted into phonological values without source-backed rules.
- Source registries and source/claim tables are authoritative. Browser modules under `src/web/generated/` are generated artifacts; never edit them by hand.
- The Python wheel includes the canonical IPA registry data under its shared data directory and has a wheel-content verification step.
- Shared phonology fixtures express cross-runtime semantic expectations. Python and browser implementations remain separately executable and are compared at the contract boundary; fixture parity is not a substitute for phonetic adjudication.

### Browser application

The published application is a static Vite site with no user-text server, database, account, analytics or runtime API.

- The app normalizes input and performs Myanmar orthographic/syllable segmentation while preserving unsupported units and non-Myanmar text.
- `src/web/phonology.js` resolves the supported segmental subset from generated canonical onset/vowel registries. It emits typed segment records, evidence and unresolved features; it withholds unsupported medials, conjuncts, kinzi, codas, vowel combinations and prosody.
- `src/web/hybrid-engine.js` orchestrates project rules and optional external candidates. Epitran and pinned Google Burmese Thrax/OpenFst are diagnostic comparators; they are not voted, are not fallbacks and do not become canonical output merely because they return a string.
- The project's Ukrainian adapter consumes IPA, not Myanmar graphemes. Only a project IPA result with established profile and prosodic completeness can become canonical output. Segmental-only previews and external candidates remain explicitly provisional.
- The separate MLCTS route uses vendored Mya2Rom and a distinct MLCTS-to-Ukrainian table. Its licensing notices are maintained under `vendor/mya2rom/`.

### Python package

The Python package follows the same stage boundaries through its own implementation:

- `parser.py` reconstructs orthographic/syllable structure.
- `phonology.py` loads the canonical CSV registries and returns a typed segmental result with evidence and unresolved features.
- `ipa.py` composes the source-side IPA result without filling unsupported combinations.
- `rule_engine.py` exposes separate graphemic, phonological, IPA, phonetic-completeness, prosody, profile and Ukrainian-adaptation statuses. A partial segmental preview is not a complete pronunciation.
- `practical.py` adapts IPA into proposed Ukrainian practical orthography.
- `romanization.py` and its separate adapter implement MLCTS rather than the phonetic route.

### IPA-first and uncertainty contract

The IPA layer is the only boundary between source phonology and Ukrainian adaptation. Never generate a confident Ukrainian pronunciation independently from Myanmar graphemes while presenting IPA as a parallel explanation.

Keep separate:
- phonemic vs broad/narrow phonetic transcription;
- graphemic segmentation vs phonological syllabification;
- segmental completeness vs tone/phonation/quantity/profile completeness;
- source transcription candidates vs adjudicated target-profile forms;
- source claims, rule IDs, provenance and uncertainty.

A segmental IPA candidate is not automatically complete Burmese IPA. Tone, phonation, vowel quantity, medials, kinzi, codas, vowel combinations and profile adjudication remain withheld wherever the selected profile and evidence do not establish them. Unknown or conflicting inputs must not be guessed.

## Research and release gates

Engineering verification and linguistic acceptance are separate.

Engineering CI covers Python tests and wheel contents, canonical registry validation, generated-data drift, Node tests, built-site Chromium/Playwright, pinned WFST/OpenFst and upstream Thrax parity, Pages artifacts/deployment and dependency audits. Optional external-engine jobs are diagnostic only.

Linguistic acceptance additionally requires a versioned, expert-approved Yangon careful-citation IPA convention; qualified independent annotators; a separate adjudicator and non-annotating curator; private blind intake; item-level source rights and locators; and at least 30 distinct adjudicated lexeme groups with explicit contrast-coverage rationale. Until then, independent gold remains zero and empirical accuracy remains unmeasured.

## Security and accessibility

- Render user text as text, never executable HTML.
- No user-text upload or runtime network dependency is part of ordinary conversion.
- Keep browser dependencies small and pin external build/model inputs.
- Run automated keyboard/contrast/browser checks and retain manual accessibility review as a separate acceptance task.
- Do not claim WCAG conformance solely from automated smoke tests.

## Change discipline

1. Update canonical source registries, not generated modules.
2. Add source-located positive, negative and boundary fixtures before promoting a rule.
3. Keep orthographic segmentation separate from phonological syllabification.
4. Keep romanization separate from IPA.
5. Preserve alternatives and uncertainty; do not guess missing pronunciations.
6. Verify the exact final commit in all relevant workflows and record what each workflow actually tested.

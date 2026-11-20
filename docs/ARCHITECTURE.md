# Burmese → Ukrainian — Runtime architecture and trust boundaries

**Snapshot:** default branch `main`, baseline `f7f7d41a116c265481bdc17c225a763becab6013`. This document describes the shipped mainline, not an unmerged integration branch.

## Product contract

The repository exposes two distinct conversion routes. They must not be collapsed into one another.

1. **Phonetic route:** Myanmar/Burmese orthography → Unicode normalization → graphemic and syllable structure → source-language phonological analysis → explicitly typed IPA candidate → Ukrainian IPA adapter → practical Ukrainian output.
2. **Orthographic romanization route:** Burmese orthography → MLCTS romanization → separate MLCTS-to-Ukrainian correspondence table.

MLCTS is an orthographic romanization convention, not IPA. It must never be used as a proxy for pronunciation, phonemic contrasts, tone, phonation or vowel quality. Russian practical transcription is a documentary comparator only and is never a runtime intermediate.

## Mainline runtime topology

### Browser application

The published application is a static Vite site with no user-text server, database, account, analytics or runtime API.

- The phonetic UI uses a browser-side hybrid diagnostic shell. Project-owned segmental IPA candidates can be passed through the Ukrainian IPA adapter.
- Epitran and the pinned Google Burmese Thrax/OpenFst model are diagnostic comparators. They are not voted, are not fallbacks, and do not become canonical output merely because they return a string.
- A segmental candidate without a complete named pronunciation profile and supported tone/phonation/quantity is explicitly partial or provisional. Do not label it a complete canonical pronunciation.
- The romanization UI uses vendored Mya2Rom 0.4.4 for MLCTS, then the project's separate MLCTS-to-Ukrainian table. Its licence and notices are maintained under `vendor/mya2rom/`.

### Python package

The Python rule engine and its IPA-to-Ukrainian adapter are separate code paths from the browser implementation on this mainline snapshot.

- `RuleBasedBurmeseEngine.analyze()` exposes the source analysis, segmental IPA candidate, practical candidate, and separate graphemic, phonological, IPA, phonetic-completeness, prosody and profile statuses.
- `transcribe_ipa()` is the language-specific practical adapter over the repository's provenance-bearing IPA and practical-rule data.
- `HybridBurmeseEngine` is an opt-in research wrapper for explicitly injected providers. It does not authorize provider output as gold or canonical runtime IPA.

**Parity boundary:** do not claim full Python/browser phonological parity for this mainline snapshot. Shared fixtures and equivalent result semantics are desirable, but equivalent JSON shape is not proof of equivalent phonological analysis. The registry-backed IPA-first integration work is tracked separately from `main`; its branch/CI evidence must be reviewed and merged before describing it as shipped mainline behavior.

## Data and generation ownership

- `data/burmese/*.csv` and source/claim registries are the authoritative research inputs.
- Build scripts generate browser modules under `src/web/generated/`; generated files must not be edited by hand.
- Source claims, rule environments, evidence status and implementation status are separate concepts. A documented analysis is not automatically an executable rule.
- The finals registry uses its declared five-column contract; schema changes require aligned parser, generator and regression updates.
- `schemas/` contains machine-readable result/data contracts. Python and browser consumers must fail closed on unsupported or incomplete structures.
- External model outputs and benchmark artifacts retain provider, revision, profile, IPA kind and raw-output provenance. Diagnostic success is not an accuracy score.

## IPA result and Ukrainian adapter boundary

The intended architecture has one authoritative path from source phonology into typed IPA and then into Ukrainian adaptation. Do not generate Ukrainian output independently from Myanmar graphemes while presenting IPA as a parallel explanation.

The IPA layer must distinguish, rather than flatten:

- phonemic vs broad/narrow phonetic transcription;
- segmental completeness vs prosody/profile completeness;
- syllable boundaries and syllable structure;
- vowel length, tone and phonation where evidenced;
- supported, partial, analysis-dependent, unsupported and conflicting cases;
- source claims, rule IDs and uncertainty.

The adapter consumes the IPA result, preserves traceable features and withholds unsupported sequences. A provisional segmental string must not be promoted to canonical full pronunciation by the Ukrainian adapter.

## Research and release gates

Engineering verification and linguistic acceptance are separate gates.

Engineering CI should cover Python tests/package/wheel, canonical registry validation, generated-data drift, Node tests, built-site Chromium/Playwright, Pages artifact/deployment and dependency audit. Optional external-engine jobs are diagnostic only.

Linguistic acceptance additionally requires a versioned, expert-approved Yangon careful-citation IPA convention; qualified independent annotators; a separate adjudicator and non-annotating curator; private blind intake; item-level source rights and locators; and at least 30 distinct adjudicated lexeme groups with explicit coverage rationale. Until then, independent gold remains zero and empirical accuracy remains unmeasured.

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

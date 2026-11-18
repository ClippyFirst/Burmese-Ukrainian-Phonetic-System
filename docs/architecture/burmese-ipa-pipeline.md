# Burmese phonology pipeline: registry-backed typed IPA

## Why this boundary exists

The Lao repository demonstrates a useful engineering pattern: keep source-script parsing, language phonology, IPA, and target-language adaptation as distinct, inspectable stages. This Burmese implementation adopts that pattern without copying Lao rules, inventories, or assumptions.

The Burmese service must not turn a parsed Myanmar spelling directly into Ukrainian letters. Its production phonetic path is:

`Myanmar Unicode → normalization → Burmese graphemic/syllable structure → registry-backed Burmese phonology → typed IPA candidate → completeness/profile gate → Ukrainian IPA adapter → practical Ukrainian orthography`

The orthographic MLCTS path remains separate and is not an IPA fallback.

## Canonical source data

The source-side segmental correspondences are maintained in:

- `data/burmese/ipa_onsets.csv`
- `data/burmese/ipa_vowels.csv`

Python loads these files through `burmese_ukrainian.phonology.load_phonology_registry()`. The browser build generates `src/web/generated/data.js` from the same CSV registries; `src/web/phonology.js` consumes the generated tables. The Python wheel includes the two canonical registries under its shared data directory, and the loader checks the source checkout first before resolving installed package data.

The Python compatibility mappings in `ipa.py` are now derived views of these registries, not independent hand-maintained tables. Do not add a correspondence to one runtime only.

## Typed phonology result

Both `phonologize_syllable()` in Python and `phonologizeSyllable()` in the browser return the same contract:

- `status`: `SEGMENTAL_ONLY` only when the currently registered segmental onset+rime is complete; otherwise `NOT_ESTABLISHED`.
- `ipa`: an established segmental candidate, an explicit incomplete placeholder where the legacy diagnostic contract requires it, or `null` when the structure must be withheld.
- `segments[]`: typed onset/vowel components with source identifier, IPA value, registry status, and source evidence.
- `unresolved_features[]`: structural and prosodic gaps that remain open.
- `rule_ids[]`: currently empty because the implemented subset consists of direct registry correspondences, not newly inferred contextual rules.

The contract is deliberately not a declaration of complete pronunciation. Tone, phonation, quantity and profile adjudication remain unresolved even for a simple segmental candidate such as `ka`.


## Independent API layer statuses

The engine APIs expose the status of each transformation layer independently. Python uses snake_case keys; the browser uses camelCase keys:

| Layer | Python | Browser | Meaning |
|---|---|---|---|
| Graphemic analysis | `graphemic_status` | `graphemicStatus` | `ESTABLISHED` when all Myanmar units parse; `PARTIAL` for partially parsed units; `UNSUPPORTED` for malformed/unsupported Myanmar units; `NOT_APPLICABLE` when there are no Myanmar phonological units |
| Source phonology | `phonology_status` | `phonologyStatus` | `SEGMENTAL_ONLY` for the currently established segmental subset; `PARTIAL` when some sourced components exist but required structure is withheld; `NOT_ESTABLISHED` when no source-backed phonological component is available; `NOT_APPLICABLE` when no Myanmar phonological units are present |
| IPA candidate | `ipa_status` | `ipaStatus` | Whether the typed IPA result is established, analysis-dependent, unsupported or withheld |
| Ukrainian adaptation | `ukrainian_status` | `ukrainianStatus` | Status of the IPA-to-Ukrainian target adaptation, not of source-side pronunciation |

These dimensions are deliberately not collapsed. A well-formed graphemic parse does not establish phonology; a `SEGMENTAL_ONLY` result is not complete surface IPA; an analysis-dependent IPA candidate does not become canonical merely because the Ukrainian adapter can render it. Mixed-script passthrough text is excluded from the graphemic/phonology aggregate.

`schemas/analysis-layer-status.schema.json` defines the allowed status combinations for the Python and browser API contracts. Python and browser regression tests cover established segmental, partially withheld, unsupported and empty-input cases.

## Fail-closed boundaries

The current stage does not infer realizations for:

- medials and conjuncts;
- kinzi and complex syllable structures;
- codas, ASAT and checked-syllable realization;
- anusvara and contextual nasalization;
- analysis-dependent onset or vowel rows;
- inherent-vowel values in isolated bare-consonant cases;
- tone, register, phonation, quantity or a named dialect profile.

The parser can preserve and describe these structures, but the IPA stage withholds a complete segmental result when a required realization is not established. External Epitran and Google WFST results remain diagnostic candidates; they do not vote, silently replace project output, or become gold.

## Cross-runtime contract

`tests/fixtures/shared_phonology_contract.json` is the common executable contract. Python tests call `to_ipa()`; browser tests enter the actual built UI and inspect the typed result attached to each syllable. Both runtimes must match the same expected objects for supported simple CV, medial, checked coda, prosody, analysis-dependent onset/vowel and isolated bare-consonant cases.

This is intentionally narrower than full parser parity. Python and browser still have separate parsers and runtime implementations. Passing the shared fixtures verifies only the declared cases; it does not establish complete Burmese phonological equivalence.

## Adding future phonological rules

A future vowel-combination, medial, coda or prosodic rule is acceptable only when all of the following are available:

1. A primary source and exact source locator supporting the target variety and environment.
2. Explicit source grapheme/structure analysis and an IPA convention.
3. Positive and negative examples, including plausible but unsupported spellings.
4. A versioned registry entry or rule with provenance and a stable identifier.
5. The same shared fixture exercised by Python and the built browser.
6. Explicit uncertainty and completeness behavior; no provisional result may bypass the IPA adapter.
7. Independent specialist adjudication before the rule is represented as empirical gold or used for an accuracy claim.

Do not add phonological values from external engine output alone. Do not promote structural probes or model agreement to IPA gold.

## Evidence and release boundary

This change improves engineering consistency and inspectability; it adds no new Burmese phonological realization, IPA label, Ukrainian mapping or gold-corpus entry. Independent adjudicated Burmese IPA gold remains zero and empirical accuracy remains unmeasured. The repository remains a partial research prototype, not a linguistically validated production release.

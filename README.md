# Burmese → Ukrainian Phonetic-Graphemic Correspondence System

Research-grade Burmese (Myanmar script) → Ukrainian correspondence system with an evidence-gated practical transcription layer.

## Scientific pipeline

Burmese Unicode → normalization → graphemic/syllable structure → onset/conjunct/kinzi/medials/vowel/inherent-vowel analysis → prosodic analysis → Burmese phonology → surface phonetics → IPA → feature space → Ukrainian target → Ukrainian practical orthography.

The practical output is never produced by direct Myanmar-character substitution. See the [registry-backed Burmese IPA pipeline](docs/architecture/burmese-ipa-pipeline.md) for the shared typed contract and fail-closed boundaries.

## Runtime architecture and provenance (important distinction)

The published site has a **browser-side hybrid diagnostic shell**, not a voting ensemble. It exposes two separate modes:

1. **Phonetic mode (IPA-first hybrid with explicit completeness states):** the browser parser supplies project segmental IPA candidates; the hybrid orchestrator runs these through the same Ukrainian IPA adapter and also collects narrow Epitran 1.35.3 and local Google Burmese Thrax/OpenFst candidates. A segmental string such as ka may be displayed with a Ukrainian candidate, but both are explicitly PARTIAL/PROVISIONAL until tone/phonation/quantity and a named profile are established. Only a fully scoped project IPA may be labeled canonical. The Google grammar is not established as a specific Yangon speaker profile. Provider outputs retain provenance and are never voted or used as fallback; unresolved structures remain withheld. Google is compiled from pinned source during the GitHub Pages build and served as a same-origin static JSON model; no server API receives user input. The Epitran port is not the full Python/PanPhon stack. The Python package and browser still have separate parsers, but both now consume the same CSV-backed onset/vowel registries and emit the same typed segmental-IPA contract. Shared fixtures exercise the same supported and withheld cases in Python and the built browser. Full parser and phonological parity remains PARTIAL.
2. **Romanization mode (third-party engine + project adapter):** the browser calls vendored **Mya2Rom 0.4.4** to obtain MLCTS romanization, then applies the project's own MLCTS-to-Ukrainian correspondence table. This is an orthographic route, not IPA and not the phonetic engine. Mya2Rom is distributed under CC BY-SA 4.0; see `vendor/mya2rom/NOTICE.md` and `vendor/mya2rom/License.md`. Its source rime inventory remains evidence-limited.

The separate Python `HybridBurmeseEngine` is still a research wrapper for explicitly injected providers such as myG2P, CRF and CLI backends. myG2P is not bundled because its dictionary is CC BY-NC-SA 4.0. The public browser's two external comparators are Epitran and Google WFST; both remain diagnostic until independent, profile-matched IPA gold supports promotion. Therefore the accurate description is: **project-owned canonical phonetic rules + browser-local Epitran/Google IPA candidates + a separate Mya2Rom/MLCTS romanization route**. This is a hybrid shell, but not a consensus/voting G2P engine.

## Scope

The default scope is contemporary Standard Burmese. Yangon-oriented claims are used only where the cited source supports that scope. Myanmar script is not treated as synonymous with Burmese.

## Cyrillic comparative layer

The project now explicitly reproduces the comparative methodology used in the Thai project:

Burmese phonology/IPA → Russian practical control → Ukrainian target-language policy → Ukrainian practical output

A dedicated Russian practical tradition is documented. The principal historical source located is V. G. Epstein, Rules of Russian Transcription of Burmese Geographical Names (1959). A further institutional instruction from 1978 is also documented, demonstrating continuity of the Russian geographical-name tradition. The repository records this tradition as a control/predecessor layer, not as the source of truth for Ukrainian.

The comparison shows several systematic target-language differences:

| Burmese | Russian practical | Ukrainian project baseline |
|---|---|---|
| /kʰ/ | кх | к' |
| /tʰ/ | тх | т' |
| /pʰ/ | пх | п' |
| /sʰ/ | сх | с' |
| /i/ | и | і |
| /ɛ/ | э | е |
| /ɯ/ | ы/у | и* |
| /ŋ/ | нг | нг |
| /w/ | у | в |
| /h/ | х | г |
| /ɡ/ (ASCII alias /g/) | г | ґ* |
| /ɦ/ | — | г |
| /x/ | х | х |
| /t͡s, d͡z/ | ц, дз | ц, дз |
| /t͡ʃ, d͡ʒ/ | ч, дж | ч, дж |
| /ɹ/ | й/r-dependent | р* |
| tone | not encoded | not encoded |

Aspiration is preserved with an apostrophe in the Ukrainian practical layer; /ʔ/ does not trigger it. The distinctions /h/ → г, /ɡ/ → ґ and /x/ → х are project-wide target conventions, not claims that foreign /h/ is identical to Ukrainian /ɦ/.

The shared target conventions are documented in the canonical [foreign IPA → Ukrainian adaptation policy](https://github.com/ClippyFirst/Ukrainian-Phonetic-Inventory/blob/main/docs/foreign-target-adaptation.md). This repository's executable practical adapter maps whole IPA sequences after the deterministic Burmese IPA engine, including aspiration, /h/ → г, /ɡ/ (ASCII /g/) → ґ, /x/ → х and Ukrainian affricate sequences. The /ɡ/ → ґ choice is project-specific: the 2026 Ukrainian standard generally adapts foreign [g] with г and allows ґ as an imitation choice in personal names.

## Serbian and Bulgarian comparators

A dedicated Burmese-specific Serbian or Bulgarian practical transcription system of comparable codified status was NOT_ESTABLISHED in the present review.

Serbian scholarship is nevertheless retained as a methodological comparator for target-language adaptation: pronunciation, established usage, natural target-language clusters, simplicity and consistency matter, and another language's transcription should not be imported blindly.

Bulgarian remains NOT_ESTABLISHED until a primary Burmese-specific source is located.

## Usage

Install the package with test-only dependencies and run the test suite:

```bash
pip install -e ".[test]"
pytest
python -m pip wheel --no-deps --wheel-dir dist .
python scripts/verify_python_wheel.py dist
```

The test extra includes `pytest` and `jsonschema`; schema validation is test-only and is not a runtime dependency. CI also verifies that the built wheel contains the canonical Burmese IPA registries and that regenerating web data leaves `src/web/generated/data.js` unchanged:

```bash
npm run generate:web
git diff --exit-code -- src/web/generated/data.js
```

Structural Burmese parsing is available directly through the Python package.
The generic ipa_to_ukrainian() adapter intentionally requires a local checkout of the canonical ClippyFirst/Ukrainian-Phonetic-Inventory repository; the Burmese repository does not vendor or duplicate that generic inventory. Without it, that generic adapter returns inventory_unavailable.

For the language-specific practical system, use transcribe_ipa(). It uses the repository's provenance-bearing data/burmese/ukrainian_practical.csv and data/burmese/practical_rules.csv tables. RuleBasedBurmeseEngine.analyze() exposes separate graphemic_status, phonology_status, ipa_status and ukrainian_status fields, alongside the segmental IPA candidate, post-IPA Ukrainian candidate, phonetic_completeness, prosody_status, profile_status, canonical_ipa and canonical_ukrainian fields. The browser exposes the same layer dimensions as graphemicStatus, phonologyStatus, ipaStatus and ukrainianStatus. A segmental-only IPA string is not reported as canonical full pronunciation. Unknown IPA segments withhold the complete practical string.

## Current implementation

Implemented:
- NFC/NFD normalization entry point.
- Conservative Myanmar grapheme/syllable segmentation.
- Explicit kinzi detection.
- Virama/subjoined-consonant parsing.
- Four-medial parsing.
- Dependent-vowel parsing.
- Explicit inherent-vowel state.
- Explicit malformed/unsupported states.
- Evidence and competing-analysis datasets.
- Structural syllable generator.
- Prosody analysis slots that do not invent tone values.
- Registry-driven source-side phonology stage shared by Python and browser, with typed IPA components, per-segment provenance and explicit unresolved features.
- Shared Python/browser phonology contract fixtures for simple CV, medials, checked codas, prosody, analysis-dependent onset/vowel rows and isolated bare consonants.
- Python IPA correspondence views derived from the canonical CSV registries; the installable wheel includes those registries.
- Canonical Ukrainian target adapter boundary.
- Burmese→Russian documentary correspondence registry.
- Burmese→Ukrainian practical correspondence registry.
- Machine-readable practical rule registry and provenance claims.
- Executable Ukrainian practical target layer.
- Whole-IPA sequence adapter with longest-match affricates, contextual /j/ yotation, and tone/length trace.
- Ukrainian practical rendering integrated after IPA in the deterministic engine.
- Comparative Russian-vs-Ukrainian documentation.
- Serbian/Bulgarian comparator audit.
- Practical-layer regression tests.
- JSON Schemas, benchmark seeds, adversarial-test specification and CI.

Not yet established as complete:
- full Burmese vowel-combination derivation;
- complete coda and checked-syllable realization;
- complete tone/register/phonation realization;
- full allophony and phonological-rule engine;
- corpus-backed lexical validation;
- final feature-distance ranking against the canonical Ukrainian-Phonetic-Inventory schema;
- empirical adjudication of project-specific choices such as /h/ → г and /ɯ/ → и.

## Evidence policy

Unicode is authoritative for encoding and script mechanics, not automatic authority for every phonological analysis.

The prosodic layer retains competing analyses. Traditional descriptions and newer double-register/eight-tone proposals are not averaged into a false consensus.

Russian practical transcription is documentary evidence for Russian practice. It is not evidence that the Russian target is optimal for Ukrainian.

## Sources

- Unicode Standard, Chapter 16, Myanmar.
- Unicode Technical Note #11, Representing Myanmar in Unicode.
- Green (2002), Word, Foot, and Syllable Structure in Burmese.
- Mooney & Repetti-Ludlow (2021), Sonority and syllable structure: The case of Burmese tone.
- Duan & Zhu (2025), Double registers and eight tones in Burmese.
- Tun et al. (2011), Myanmar text-to-speech system with rule-based tone synthesis.
- V. G. Epstein (1958), bibliographic lead on Burmese proper-name transcription (article-level verification remains uncertain).
- V. G. Epstein (1959), Rules of Russian Transcription of Burmese Geographical Names.
- K. T. Boyko & A. V. Samarkin (1978), Instruction for Russian transmission of geographical names of Burma.
- Ukrainian Orthography 2026, practical-transcription provisions for geographical names.

## Research artifacts

- data/burmese/romanization_ukrainian.csv — 35-entry MLCTS onset crosswalk.
- data/burmese/romanization_rimes_inventory.csv — 94 vendor-derived MLCTS rime keys with explicit EVIDENCE_LIMITED Ukrainian status.
- data/burmese/cyrillic_systems.csv
- data/burmese/russian_practical_transcription.csv
- data/burmese/ukrainian_practical.csv
- data/burmese/practical_rules.csv
- data/burmese/source_claims.csv
- docs/practical-transcription.md
- docs/russian-vs-ukrainian.md
- docs/serbian-bulgarian-comparison.md
- src/burmese_ukrainian/practical.py
- tests/test_practical.py

## Status labels

ESTABLISHED · WELL_SUPPORTED · PROPOSED · ANALYSIS_DEPENDENT · DIALECT_DEPENDENT · CONTEXT_DEPENDENT · UNCERTAIN · DISPUTED · NOT_ESTABLISHED · UNSUPPORTED

The implementation intentionally returns uncertainty instead of silently inventing a linguistic analysis.

## Core principle

The Russian system is a documented predecessor/control layer.

The Ukrainian system is defensible only when every divergence from Russian can be explained through:

1. Burmese phonology;
2. Burmese orthography;
3. Ukrainian phonology;
4. Ukrainian orthography;
5. evidence strength.


## Current evidence and license audits

- [Phonology coverage audit](docs/audits/current/PHONOLOGY-COVERAGE-AUDIT-2026-10-20.md): implementation status by layer and current coverage limits.
- [External G2P and licensing audit](docs/audits/current/G2P-ENGINE-AND-LICENSING-AUDIT-2026-10-20.md): Epitran and myG2P roles, restrictions and benchmark gates.
- [Third-party notices](THIRD_PARTY_NOTICES.md): code/data/model licensing review.
- [Seed corpus](data/burmese/phonology_corpus.csv): structural probes explicitly marked as not phonological gold data.
- [Citation metadata](CITATION.cff).

**Current measurement:** no independently adjudicated lexical IPA gold entries are verified yet. Word-level IPA accuracy and Ukrainian name-level accuracy are therefore not measured. The six rows in the seed corpus are structural probes only; blank IPA and Ukrainian fields are intentional, not missing results to be inferred.

The repository currently has no root project license. Do not assume the source code or data are licensed for reuse merely because the repository is public. CITATION.cff uses NOASSERTION until the owner chooses a license.

### Optional Epitran baseline

`scripts/benchmark_g2p.py` can capture raw output from an independently installed Epitran `mya-Mymr` transducer without making Epitran a runtime dependency:

```bash
python scripts/benchmark_g2p.py --engine epitran --output epitran-benchmark.json
```

Run it in an environment where Epitran is installed separately. The report records engine/version and hashes where available. It does not score structural probes as phonological gold data; accuracy remains `null` until rows are independently source-located and marked `GOLD_VERIFIED`. See the [G2P and licensing audit](docs/audits/current/G2P-ENGINE-AND-LICENSING-AUDIT-2026-10-20.md) before redistributing third-party data.



## External IPA renderers and G2P candidates

The research registry records external pronunciation engines, IPA dictionaries, and Unicode IPA display fonts without treating unvalidated output as ground truth. See [`docs/external-ipa-renderers.md`](docs/external-ipa-renderers.md) and the machine-readable [`data/external-ipa-renderers.json`](data/external-ipa-renderers.json). These are candidate inventories only; no third-party engine is enabled by default, and the ClippyFirst IPA → Ukrainian adapter remains the sole target adaptation boundary.


## Two output methods

The service separates the orthographic MLCTS romanization route from the IPA-first phonetic route. The romanization tab currently exposes a PARTIAL Ukrainian crosswalk and never falls back to phonetic output. See the [romanization → Ukrainian research matrix](docs/romanization-to-ukrainian-matrix.md) for the selected profile, source comparison and onset table.


## Production build and GitHub Pages

The production build includes both site pages, Mya2Rom assets, and a compiled local Google Burmese WFST JSON model. The Pages workflow builds the pinned Google/OpenFst source before Vite packaging; Playwright runs against the built preview.


## Live service

GitHub Pages: https://clippyfirst.github.io/Burmese-Ukrainian-Phonetic-System-/

The production build contains both site pages, Mya2Rom assets and the same-origin Google Burmese WFST model. The browser hybrid orchestrator compares project rules, Epitran and Google WFST candidates locally. External candidates remain unpromoted pending independent gold. The romanization tab is separate from the IPA-first phonetic tab; its Ukrainian crosswalk is still marked PARTIAL.

## Independent IPA gold corpus

The project uses a provenance-backed, double-annotated IPA gold workflow. See [the corpus protocol](docs/ipa-gold-corpus.md) and [the language-specific phonology research workpack](docs/audits/current/PHONOLOGY-RESEARCH-WORKPACK-2026-11-01.md). The corpus is currently empty by design; no phonetic accuracy claim is available until expert adjudication is complete.

## Deterministic rules and browser hybrid runtime

The canonical phonetic result still comes from the project's conservative local rules and the IPA → Ukrainian adapter. The public GitHub Pages site now also runs a browser-side hybrid orchestrator: a pinned Epitran 1.35.3 Burmese mapping port and a Google Burmese Thrax/OpenFst model compiled into a same-origin static JSON asset during the Pages build. The WFST interpreter supports weighted alternatives and epsilon arcs. No server or external API receives the input text.

External IPA candidates and their Ukrainian-adapter previews are shown beside the canonical result. They are not voted or automatically promoted; unresolved project output remains unresolved until independent, profile-matched IPA adjudication exists. The site loads only its own static WFST model asset. MLCTS remains a separate orthographic mode. See [the deterministic engine contract](docs/DETERMINISTIC-RULE-ENGINE.md) and [the browser hybrid-engine contract](docs/hybrid-engines.md).

Python entry point: `from burmese_ukrainian import RuleBasedBurmeseEngine`. Deterministic execution does not make every PROPOSED pronunciation independently verified.


## Research-only Python hybrid wrapper

The optional Python `HybridBurmeseEngine` can collect explicitly configured Google Burmese WFST, myG2P v2, Epitran and command-line IPA candidates with provenance. It does not run external providers by default, vote between them, or replace the deterministic rule engine's final IPA. The public website has a separate browser implementation; the Python wrapper is not its runtime. See [raw-output benchmarking boundaries](docs/benchmarking-and-external-ipa.md).


### Rime and prosody evidence

The source-scoped rime × coda × tone × phonation evidence matrix is maintained in `data/burmese/rime_prosody_evidence.csv`, with its JSON Schema and regression tests. Separate voiced/voiceless sonorant evidence from Repetti-Ludlow (2023) is recorded in `data/burmese/sonorant_phonetics_evidence.csv`; it preserves the study's restricted sample and variable spread-glottis realization and remains withheld from runtime. It records Green's source-specific rime restrictions and Mooney & Repetti-Ludlow's restricted Yangon experimental findings without promoting them to runtime pronunciation rules. Every row is withheld from runtime; the matrix is not a lexical IPA gold set.

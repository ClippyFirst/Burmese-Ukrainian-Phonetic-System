# Limitations

The current implementation is a research scaffold with hardened data
contracts, not a complete Burmese lexical analyzer or surface-phonetic
synthesizer.

## Established implementation limits

- Full Burmese vowel-combination derivation is not implemented.
- Complete coda and checked-syllable realization is not implemented.
- Tone/register/phonation realization is represented analytically but is not
  fully inferred from orthography.
- Full Burmese allophony and contextual phonological rules are not implemented.
- Corpus-backed lexical validation is not yet available.
- Feature-distance ranking against the canonical Ukrainian inventory is not yet
  implemented.
- The canonical Ukrainian inventory must be supplied to the target adapter;
  it is intentionally not duplicated in this repository.

## Research limits

The following project decisions remain proposal-level or analysis-dependent:

- /h/ → г versus х;
- /ɯ/ → и;
- /θ, ð/ → т;
- treatment of some Burmese /r/ and /j/ environments;
- practical treatment of complex finals and checked syllables.

These must not be presented as official Ukrainian norms.

## Validation limits

The benchmark currently contains structural orthographic seed cases, not a
gold-standard lexical corpus. Therefore the repository must not report
accuracy percentages for the complete system.

The correct status vocabulary is used instead:
ESTABLISHED, WELL_SUPPORTED, ANALYSIS_DEPENDENT, DIALECT_DEPENDENT,
CONTEXT_DEPENDENT, UNCERTAIN, DISPUTED, NOT_ESTABLISHED, UNSUPPORTED.


## Ukrainian target-inventory adapter and feature-distance ranking — 2026-11-16

The Python adapter in `src/burmese_ukrainian/ukrainian.py` currently performs exact-IPA lookup only and requires a local checkout of the private `ClippyFirst/Ukrainian-Phonetic-Inventory` repository (`inventory.json` and `data/uk/graphemes.csv`). That canonical repository separately contains target feature vectors and a feature-distance ranking implementation, but the Burmese runtime does not import it and does not produce evidence-backed feature vectors for its source IPA segments.

**Status: PARTIAL exact lookup / BLOCKED feature-distance ranking.** Do not duplicate the canonical target inventory or invent source vectors. Acceptance requires a versioned, consumable target-inventory API/artifact; an explicit source-IPA feature representation with provenance and uncertainty; deterministic candidate scoring that preserves mismatches and rule traces; and Python/browser regression and parity tests.

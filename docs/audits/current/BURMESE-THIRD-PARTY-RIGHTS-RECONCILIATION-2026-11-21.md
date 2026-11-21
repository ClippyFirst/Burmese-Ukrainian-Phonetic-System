# Burmese third-party source-rights reconciliation — 2026-11-21

**Status:** source-level triage advanced; item-level and derivative rights remain PARTIAL/BLOCKED. This is a research audit, not legal advice or blanket clearance.

## Decision model

Assess each component independently: original source text/dictionary; transcription/annotation; audio; model weights; software; derived labels; compiled database. A paper's publication license does not automatically license its dataset. A software MIT license does not automatically license embedded lexicon/model assets. For mixed-source corpora, every component and source row needs provenance and a rights decision.

Use these statuses:
- CLEARED_FOR_PILOT: evidence supports the specified internal research/annotation use and retention.
- CLEARED_FOR_REDISTRIBUTION: explicit rights support the intended public redistribution and derivative terms.
- RESTRICTED: permitted only within stated conditions (e.g., non-commercial/share-alike).
- UNKNOWN: insufficient or absent permission evidence; exclude from intake/export.
- CONFLICT: authoritative records disagree; quarantine until maintainer clarification.
- EXCLUDED: outside project scope or not a pronunciation source.

## Source ledger

| Source/component | Public evidence | Pilot disposition | Redistribution / commercial disposition |
|---|---|---|---|
| OpenSLR SLR80 speech/text corpus | OpenSLR primary resource and LREC 2020 paper state CC BY-SA 4.0; text is orthographic, not IPA. The paper describes 20 female Yangon speakers and 2,528 utterances. | RESTRICTED pending decision on whether speech/audio is in scope and share-alike implications for any derived labels. Existing project scope excludes audio review; do not silently add it. | CC BY-SA attribution/share-alike obligations must be evaluated for derivatives. Not automatically cleared for commercial incorporation. |
| Hugging Face mirrors of SLR80 | One mirror card declares CC BY 4.0 while the canonical OpenSLR resource and paper state CC BY-SA 4.0. | CONFLICT; do not use mirror license metadata to relax canonical terms. Prefer canonical source only after scope decision. | CONFLICT; maintainer clarification needed before any different license assertion. |
| myG2P | Upstream README declares CC BY-NC-SA 4.0 and says dictionary is based mainly on Myanmar Language Commission dictionary words. | RESTRICTED; candidate for non-commercial comparison only after item/source scope and derived-asset terms are confirmed. Do not treat as gold. | Non-commercial/share-alike restrictions are incompatible with an unrestricted commercial/product export absent separate written permission. |
| Burmese Wiktionary-derived dataset | Dataset card reports CC BY 4.0 and a 2026-08-01 Wiktionary dump; only 113 entries carry IPA in the cited audit. | RESTRICTED_PENDING_VERIFICATION: preserve attribution and exact dump/entry provenance; independently confirm dataset extraction and underlying Wiktionary terms before using any IPA entry. | CC BY does not erase underlying source attribution or database obligations; no bulk import until the chain is documented. |
| Myanmar Language Commission pronunciation dictionary | Used by external G2P resources; no project-held item-level redistribution license established in current evidence. | UNKNOWN; no copied entries in pilot until exact edition, permission and source locators are documented. | UNKNOWN; exclude. |
| Mya2Rom | Repository metadata declares CC BY-SA 4.0; README traces some rules to Wikipedia/Wiktionary and includes multiple romanization/IPA modes. | RESTRICTED comparator only; rule outputs are not gold. Review the exact upstream-derived content and retain separate orthographic/IPA types. | Share-alike and upstream attribution require review before redistribution or model incorporation. |
| Goruut Burmese lexicon/model | Goruut code is MIT, but the separate dataset repository has no declared license and no clear per-language source rights; embedded weights derive from lexicon data. | RESTRICTED_FOR_EPHEMERAL_TEST_ONLY under owner scope decision; no asset copying or corpus import. | UNKNOWN; no vendoring, caching, redistribution or production packaging. |
| Original project-authored documentation/data | Project's own declarations: PolyForm Noncommercial 1.0.0 for code; CC BY-NC 4.0 for eligible original documentation/research data. | Apply only to genuinely original project-authored material, not copied third-party content. | Non-commercial restriction remains; never apply it to third-party sources. |

## Newly reconciled evidence

- OpenSLR's own SLR80 page and the LREC 2020 corpus paper state CC BY-SA 4.0. A Hugging Face mirror currently reports CC BY 4.0. The canonical source and paper take precedence for this project; the mirror discrepancy is recorded as CONFLICT, not resolved by choosing the more permissive statement.
- myG2P's current upstream README explicitly states CC BY-NC-SA 4.0 and its MLC-dictionary basis. This is sufficient to retain the non-commercial restriction but not to establish rights for every underlying MLC-derived entry or derivative model.
- The Wiktionary-derived card's CC BY 4.0 statement is not itself a complete chain-of-title audit for every source entry. Preserve exact dump, page/entry revision, attribution and any database terms if future item use is proposed.

## Required evidence per pilot item

source_id; original publisher/maintainer; exact source title and edition/version/date; stable URL and exact page/entry/record locator; SHA-256 of retrieved artifact where lawful; underlying source work; dataset-specific license identifier/version and evidence URL; rights holder/permission contact; permitted internal use, transcription, retention, adaptation, redistribution and commercial use; attribution text; share-alike/NC obligations; privacy/consent restrictions; reviewer/date; final status; reason for exclusion where not cleared.

A source-level license is not enough if an item was itself copied from another dictionary, website or corpus. Mixed-origin entries must preserve the chain or remain UNKNOWN.

## Explicit exclusions and stop rules

- Do not import any row with UNKNOWN or CONFLICT status into the public gold corpus.
- Do not derive IPA from SLR80 orthographic transcripts or treat its speech text as gold.
- Do not use myG2P or CC BY-NC-SA material in a commercial release absent separate permission.
- Do not infer that model weights inherit the software license.
- Do not claim the third-party rights audit is complete until all selected pilot items and every intended redistributed component have an item-level decision.

## Current acceptance

Source-level triage is improved, but no new item has been cleared for the 30-item pilot by this audit. Third-party rights remain PARTIAL; gold remains 0; accuracy remains unmeasured.

## Sources

- OpenSLR SLR80: https://www.openslr.org/80/
- Oo et al. (2020), corpus and licensing description: https://lrec-conf.org/proceedings/lrec2020/pdf/2020.lrec-1.777.pdf
- Conflicting Hugging Face SLR80 mirror metadata: https://huggingface.co/datasets/deepdml/openslr80-burmese
- myG2P upstream README: https://github.com/ye-kyaw-thu/myG2P
- Burmese Wiktionary-derived dataset card: https://huggingface.co/datasets/its-autumn/burmese
- Mya2Rom: https://github.com/myanmaropenwordnet/mya2rom
- Goruut dataset repository: https://github.com/neurlang/dataset

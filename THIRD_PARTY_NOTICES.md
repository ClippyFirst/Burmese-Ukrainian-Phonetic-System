# Third-party notices and licensing status

This file records a research review, not legal advice.

## Repository's own license

As of 2026-11-21, original project software code is licensed under PolyForm Noncommercial 1.0.0 (`LICENSE`), original documentation under CC BY-NC 4.0 (`LICENSE-DOCS`), and original project-authored research datasets/annotations under CC BY-NC 4.0 (`LICENSE-DATA`) for noncommercial research, only where the relevant maintainers/contributors own the rights. These grants do not relicense third-party components or source-derived material whose rights remain with someone else. Every external engine, dictionary, model, font, corpus and copied data item retains its own rights and attribution conditions. Unknown or conflicting rights remain unresolved and do not authorize redistribution. The IPA gold product-corpus gate remains stricter and excludes NC-only sources. PolyForm Noncommercial is not an OSI-approved Open Source license.

## External candidates reviewed

### Epitran
- Project: https://github.com/dmort27/epitran
- Package metadata identifies the code license as MIT-Modern-Variant.
- The upstream support table lists mya-Mymr but warns that Burmese is limited support because the orthography is highly ambiguous.
- Review mapping/preprocessor/postprocessor files and their provenance individually before redistribution; do not assume a package-code license automatically answers every data-rights question.
- Citation: Mortensen, D. R., Dalmia, S., & Littell, P. (2018). Epitran: Precision G2P for Many Languages. LREC 2018.

### myG2P
- Project: https://github.com/ye-kyaw-thu/myG2P
- Declared dictionary license: CC BY-NC-SA 4.0.
- Noncommercial and ShareAlike conditions make it unsuitable as an unreviewed universal dependency, particularly where commercial use or a differently licensed corpus is possible.
- Preserve attribution and evaluate derivative database/adaptation questions before any reuse.
- Related burmese-G2P repository: https://github.com/kyaw-yethu/burmese-G2P

## Rule for future additions

For every external engine, dictionary, model, or copied data set, record: exact upstream URL; release/commit; component name; code license; data/model license; attribution; commercial-use restrictions; redistribution/adaptation obligations; artifact hash; and whether any material was actually copied into this repository.


## Browser port added for the GitHub Pages hybrid runtime

- Epitran 1.35.3's Burmese mapping table and mya-Mymr postprocessing are ported to `src/web/epitran-mya.js`. The port is a local browser comparator, not the full Python/PanPhon stack. Upstream mapping commit: `2387d95820d6d9b8f459c35141e6239f4de5dbfb`; mapping SHA-256: `de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4`. MIT license is included at `vendor/epitran/LICENSE.txt`.
- `src/web/hybrid-engine.js` orchestrates project rules and the Epitran port entirely in the browser. The orchestrator compares project IPA with external candidates; external outputs are never automatically promoted. No server or external API receives user input.
- `src/web/wfst-runtime.js` is a browser-side tropical-weight WFST interpreter; `src/web/google-wfst-input.js` ports Google's Burmese UnicodeLabelMaker codepoint-input mapping from `my/codepoint.syms` (the compiled FST contains its internal UTF8_TO_GRAPHEME transducer). The pinned Google WFST graph is compiled to a static JSON asset during the Pages build and served from the same origin. A source-checkout stub remains PENDING_MODEL until that build step runs.
- Independent IPA gold remains 0; neither the port nor upstream smoke outputs establish pronunciation accuracy.

- Google Language Resources source revision `a90601024f07ab7e96c911243324e0adeb16da96`, OpenFst `22867ee7b483598a729abe125da2517584a5d010` and Thrax `c65fb3d51f9bd0299503f3289a124f52c3431eeb` are pinned for model generation. The Apache-2.0 license is included at `vendor/google-language-resources/LICENSE.txt`.


## Project license scope and research reuse — 2026-11-21

- Original project software code is licensed under **PolyForm Noncommercial 1.0.0**; see [LICENSE](LICENSE). The license permits noncommercial research, modification and redistribution, and has a separate permission for educational institutions and public research organizations regardless of funding source.
- Original documentation and explanatory prose are licensed under **CC BY-NC 4.0**; see [LICENSE-DOCS](LICENSE-DOCS).
- These project licenses do **not** apply to third-party software, fonts, models, dictionaries, corpora, recordings, source quotations, or other materials whose rights are held by someone else. Retain each component's own notices and terms.
- Original project-authored research datasets and annotations are covered by `LICENSE-DATA` for noncommercial research, but only to the extent the project contributors hold the rights. Third-party/source-derived material and mixed records remain governed by their item-level provenance and rights statements. Where rights are unknown or conflicting, redistribution and derivative use remain unapproved.
- PolyForm Noncommercial is not an OSI-approved Open Source license. Commercial use is not granted; contact the rights holder for separate permission.

## Green (2005) Burmese phonology reference

Antony Dubach Green, “Word, foot and syllable structure in Burmese,” in *Studies in Burmese Linguistics*, ed. Justin Watkins (Pacific Linguistics, 2005), pp. 1–25. Source PDF: https://burmastudiesgroup.com/wp-content/uploads/2022/03/watkins_studies-in-burmese-linguistics.pdf. The PDF states that copyright in this edition is vested with Pacific Linguistics (copyright page, p. ii); no open license is stated in the PDF. The repository records only brief factual IPA examples and exact bibliographic locators, not the source tables or extended text. This is not a blanket permission to redistribute the chapter or extract a larger corpus; rights for any broader reuse remain unresolved.

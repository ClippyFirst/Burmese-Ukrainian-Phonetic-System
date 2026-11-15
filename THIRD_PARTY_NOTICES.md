# Third-party notices and licensing status

This file records a research review, not legal advice.

## Repository's own license

No root LICENSE file is currently present and GitHub reports no detected license for this repository. No open-source license is inferred. The owner must choose the license for original code and decide separately how to license the corpus/data before a blanket license is added.

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
- `src/web/wfst-runtime.js` is a browser-side tropical-weight WFST interpreter; `src/web/google-wfst-input.js` ports Google's Burmese UTF8_TO_GRAPHEME input mapping. The pinned Google WFST graph is compiled to a static JSON asset during the Pages build and served from the same origin. A source-checkout stub remains PENDING_MODEL until that build step runs.
- Independent IPA gold remains 0; neither the port nor upstream smoke outputs establish pronunciation accuracy.

- Google Language Resources source revision `a90601024f07ab7e96c911243324e0adeb16da96`, OpenFst `22867ee7b483598a729abe125da2517584a5d010` and Thrax `c65fb3d51f9bd0299503f3289a124f52c3431eeb` are pinned for model generation. The Apache-2.0 license is included at `vendor/google-language-resources/LICENSE.txt`.

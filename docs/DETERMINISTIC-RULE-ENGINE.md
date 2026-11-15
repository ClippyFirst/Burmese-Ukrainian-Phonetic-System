# Детермінований бірманський рушій

Активний браузерний рушій і Python API використовують фіксовані правила репозиторію. Вони не запускають нейромережі, не звертаються до мережі, не викликають Google WFST чи myG2P і не голосують між кандидатами. Mya2Rom використовується лише в окремому режимі MLCTS-романізації.

## Конвеєр

1. NFC-нормалізація та сегментація Myanmar-послідовностей.
2. Структурний розбір початкових приголосних, kinzi, conjunct, medials, голосних, фіналей та знаків.
3. Застосування явних правил onset–medial–rime з таблиць репозиторію.
4. Побудова IPA лише там, де реалізоване правило повністю покриває склад.
5. Відмова від IPA для невстановлених фіналей, тональних/просодичних або неоднозначних комбінацій.

## Детермінованість і межі

Однаковий нормалізований ввід і та сама версія таблиць дають однаковий результат. Статус `PROPOSED` не означає експертно доведену вимову. Неповний результат позначається як `PARTIAL`; жоден зовнішній рушій не підставляється як fallback.

Профіль: `my-yangon-careful-citation-v1`. MLCTS і фонетична IPA-транскрипція залишаються окремими режимами.

## Python

```python
from burmese_ukrainian import RuleBasedBurmeseEngine

result = RuleBasedBurmeseEngine().analyze("ကာ")
print(result["ipa"], result["status"])
```

`RuleBasedBurmeseEngine` залишається авторитетним рушієм фінального IPA. Окремий `HybridBurmeseEngine` — дослідницька оболонка: зовнішні провайдери запускаються лише за явної передачі в `providers`, їхні результати зберігаються як кандидати з provenance, але не голосують і не замінюють IPA. Виклик без провайдерів зберігає поведінку правилового рушія. MLCTS залишається окремим орфографічним режимом; див. [контракт гібридного шару](hybrid-engines.md).


## Evidence-status gate in the Python IPA adapter — 2026-11-14

The Python adapter now enforces the status column in data/burmese/ipa_onsets.csv and ipa_vowels.csv at the canonical IPA boundary. Previously, several analysis-dependent registry entries (for example onset စ /s/, ဓ /dʰ/ and vowels ီ /iː/, ဲ /ɛ/, ူ /uː/, ါ /a/) were present in hard-coded maps and could be emitted as canonical IPA despite their registry status. They remain available as structural or research hypotheses, but canonical IPA is now limited to registry entries marked established.

The change deliberately does not expand phonological coverage. It reduces unsupported output. Regression tests check both negative examples and positive established controls, and assert that the runtime allowlists exactly match the source registries. Browser parity has not yet been established by this Python-side fix; its separate derivation requires a corresponding audit before claiming cross-runtime equivalence.


## Cross-runtime canonical IPA evidence gate — 2026-11-14

Extended the evidence-status correction to the browser G2P path. The browser now checks generated ONSETS and VOWELS registry statuses before deriving canonical IPA. This is important because orthographic vowel-sign recognition in vowel_signs.csv is not itself proof that the phonetic value in ipa_vowels.csv is established. If the onset or any vowel value is analysis-dependent, browser IPA is withheld and the syllable status remains ANALYSIS_DEPENDENT rather than being flattened to a generic not-established state. Onset-only provisional hints remain separate from canonical IPA.

Tests cover generated source registry statuses and assert that the browser derivation enforces both onset and vowel gates. Python/browser semantic parity is improved for these evidence statuses, but full cross-runtime parity remains PARTIAL: the browser has a richer independent phonological derivation for medials, codas and vowel combinations, which remains separately unevaluated against expert IPA gold.

Current implementation/test head: 9cb275d8e9f3a5a695761c29da0e3922f555ecad. CI has been triggered by the PR update; record exact-head outcomes before promoting this task to DONE_VERIFIED.

## Browser evidence-status propagation correction — 2026-11-14

A follow-up audit found that `parseCluster` correctly retained `ANALYSIS_DEPENDENT` for an onset or vowel rejected by the source registry, but `convert()` flattened every non-`UNSUPPORTED` IPA-less segment to `NOT_ESTABLISHED` in the aggregate `ipaStatus`. The aggregation now preserves `ANALYSIS_DEPENDENT` and `UNCERTAIN` alongside `UNSUPPORTED`. The overall UI status can still be more cautious because Ukrainian output is withheld; the separate IPA status now retains the actual reason.

The first full browser run exposed four legacy end-to-end assertions that expected IPA for `စိတ်`, `ဆာ`, `သာ` and `ယူ`. Those expectations conflicted with the current source registries (`analysis_dependent` onset/vowel entries), so the tests were corrected to require withheld IPA/Ukrainian output and the explicit `IPA: ANALYSIS_DEPENDENT` status. No phonological mapping was added or promoted.

Exact code/test head: `9333bdfec405f9fafb36bab42d90965e11f5e155`. Required PR CI run `43630941796` SUCCESS: 277 Python tests + 68 subtests, npm build, generated-data freshness, 21 Node tests, and 58 Playwright tests. Push workflow `43630938330` was still running at the documentation checkpoint. Full Python/browser phonological parity remains PARTIAL; independent expert-adjudicated IPA gold remains 0.


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

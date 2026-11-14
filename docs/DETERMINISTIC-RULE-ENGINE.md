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

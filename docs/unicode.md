# Burmese Unicode model

Unicode 18.0 documents a modern Burmese syllabic structure with kinzi, base consonant/vowel letters, subjoined consonants, asat, four medials, dependent vowels and prosodic signs. U+1031 is logically encoded after the base consonant although rendered to its left.

Kinzi is U+1004 U+103A U+1039 before the following base consonant. It is a rendering form, not a separate encoded character.

Canonical normalization can reorder some U+103A/U+1037 sequences; canonically equivalent inputs must be treated as linguistically equivalent.

Myanmar ordinary word boundaries are not represented by ordinary spaces; U+200B may mark a word-break opportunity.


## Executed parser coverage audit — Unicode 17.0 Table 16-4 — 2026-11-14

The project parser's common Modern Burmese structural order is now tested through a shared Python/browser projection. The projection records source code points, onset, kinzi presence, conjuncts, medial IDs, dependent-vowel IDs, inherent-vowel state, coda marker/function, tone-mark class and structural status. It deliberately does not infer phonetic values.

The regression set includes all four medials and selected combinations, subjoined consonant, kinzi-final nasal, all dependent-vowel signs in the project inventory, medial-ya + ASAT, dependent-vowel + ASAT, and canonical reordering of ASAT after dot below. U+1031 remains logically encoded after the consonant even though it is rendered to the left. The parser preserves unsupported Myanmar-block characters as unsupported rather than treating them as ordinary passthrough.

Unicode 17.0 §16.3 and Table 16-4: https://www.unicode.org/versions/Unicode17.0.0/core-spec/chapter-16/. The specification explicitly notes that canonical normalization can reorder U+103A ASAT after U+1037 dot below and implementations should treat the orders as fundamentally the same text.

Coverage remains PARTIAL: this audit does not claim all legal/illegal orthographic permutations, or the extended conventions of Shan, Mon, Karen, Khamti, Pali or Sanskrit, are implemented. Those require language-specific inventories and should not be forced into the Modern Burmese parser.

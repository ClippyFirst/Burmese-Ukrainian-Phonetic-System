# Burmese IPA convention sheet — specialist decision draft

**Status: DRAFT FOR SPECIALIST REVIEW — NOT APPROVED FOR ANNOTATION**  
**Version:** 0.1-draft  
**Target pilot proposed in Issue #85:** contemporary Standard Yangon Burmese, careful citation-form speech, project profile ID `my-yangon-careful-citation-v1`.  
**Purpose:** turn the existing gold-collection playbook into an explicit decision record. This document does not select a phonological analysis, assign IPA values, or authorize collection.

> **Gate:** annotators must not begin gold annotation until a qualified Burmese specialist approves a versioned convention. Unresolved items below are blockers, not permission for annotators to choose independently.

## 1. Approval record

| Role | Required approval | Person / pseudonymous ID | Date | Notes |
|---|---|---|---|---|
| Burmese/Yangon profile specialist | Confirm variety, register and citation-form scope | Pending | — | Native-speaker competence and linguistic qualification must be checked separately |
| IPA/phonetics reviewer | Confirm transcription level and notation conventions | Pending | — | May be same as profile specialist only if competence is documented |
| Project owner / curator | Confirm protocol, rights and secure intake | Pending | — | Curator must not annotate |
| Version approval | Freeze this sheet before packet generation | Pending | — | Any later change requires a new version and impact note |

## 2. Fixed project constraints

These are constraints of the collection protocol, not claims about Burmese pronunciation:

1. One record has one declared target profile and one transcription `kind`.
2. All annotations and adjudication for a record use the same `kind`; a phonemic-vs-phonetic difference is not treated as an ordinary annotator disagreement.
3. Keep source evidence, annotator judgments, adjudication and engine predictions separate.
4. Never seed annotators with system output, romanizer output or another annotator's transcription.
5. Preserve uncertainty and unresolved disagreement; do not force a single answer.
6. Do not infer full pronunciation from Myanmar orthography alone.
7. Do not use a source item unless its exact locator and item-level rights status have been reviewed.
8. Public corpus records use pseudonymous speaker/annotator IDs; identity mappings and private audio stay outside the repository.

## 3. Decisions requiring specialist sign-off

### D1. Target profile and speech task

**Proposed pilot scope (not yet approved):** contemporary Standard Yangon Burmese, careful citation forms.

Specialist must confirm:
- whether this profile label is appropriate and how it should be operationalized;
- whether the pilot uses elicited isolated citation forms, citation forms with a carrier prompt, or another controlled task;
- which lexical, register, age, regional and speaker variants are excluded or separately labelled;
- whether the evidence source actually matches the target profile.

**Do not conflate:** Yangon recording location with independently established speaker dialect; Standard Burmese with a claim of homogeneous Yangon speech; sentence-context audio with isolated citation-form speech.

Decision: **PENDING**  
Rationale / source locator: _to be completed by reviewer_

### D2. IPA transcription level (`kind`)

The corpus schema supports:
- `PHONEMIC`
- `PHONETIC_BROAD`
- `PHONETIC_NARROW`

Select exactly one primary kind for this pilot. If the research requires more than one level, define separate linked annotation layers/records in a future schema revision; do not mix levels in one gold denominator.

Questions for reviewer:
- Which level is appropriate for the intended Burmese-to-Ukrainian mapping and what distinctions must be preserved?
- What is the policy for predictable allophony, aspiration, release, devoicing, nasalization and glottalization?
- Which narrow phonetic details are reliable from the permitted evidence (audio vs written sources)?

Decision: **PENDING**  
Selected kind: _none_  
Rationale / examples with exact source locators: _pending_

### D3. Tone, register, pitch and phonation

Do not assume traditional tone labels, register analyses, pitch contours and phonation categories are interchangeable. Published work cited by the playbook includes competing analyses and speaker/context limits.

Reviewer must decide:
- whether the pilot records a traditional category, a phonological analysis, a surface phonetic contour, or multiple explicitly separated fields;
- how pitch/F0, duration, voice quality/phonation and tone are represented;
- which context is required (isolated, carrier phrase, sentence);
- how neutralization or context-sensitive realization is recorded;
- how competing analyses and uncertain cases are represented.

The current IPA object has `tone` and `phonation` string fields. It does not define a controlled vocabulary or a separate F0/time-aligned contour format. If the chosen convention requires richer acoustic structure, raise a schema change before annotation rather than overloading these fields.

Decision: **PENDING**  
Chosen analysis / controlled values: _none_  
Sources and limits: _pending_

### D4. Vowels, quality and duration

Reviewer must define:
- vowel symbols and permitted diacritics for the chosen transcription level;
- whether length is encoded in the literal IPA string, the typed `vowel_length` field, or both, and how consistency is validated;
- how diphthongs, offglides, vowel alternations and uncertain quality are handled;
- whether centralization, nasalization or other quality details are included at broad vs narrow level.

Do not derive an unlisted vowel from a grapheme-to-IPA guess. Record uncertainty instead.

Decision: **PENDING**  
Inventory / examples / exact source locators: _pending_

### D5. Syllables, minor syllables and boundaries

Reviewer must define:
- syllable-boundary notation and when boundaries are mandatory;
- treatment of minor syllables and reduced/weak syllables;
- whether a lexeme with multiple syllables is represented as one IPA string plus `syllable_boundaries`;
- treatment of compound or morphologically complex forms and lexical grouping.

The schema supports a list of syllable-boundary strings but does not itself define the convention.

Decision: **PENDING**  
Rules / examples: _pending_

### D6. Medials, complex onsets and conjunct structures

Reviewer must define the phonetic/phonological interpretation of each attested medial and complex onset for the target profile, including any context-conditioned or variable realizations.

Structural recognition of Myanmar medial signs, kinzi and subjoined consonants by the software is not evidence for a particular IPA realization. Record:
- the source environment and exact locator;
- allowed variants, if documented;
- uncertainty policy;
- whether the selected IPA level represents underlying segments or surface realization.

Decision: **PENDING**  
Rule table and evidence: _pending_

### D7. Codas and checked syllables

Reviewer must define:
- coda representation at the selected transcription level;
- how checked syllables and their phonetic realization are recorded;
- whether nasalization or other vowel effects are represented in the IPA value and/or typed metadata;
- how phonemic coda notation is distinguished from surface realization.

**Existing evidence boundary:** Green (2002) is cited in the project handoff for an analysis of Burmese coda /N/ as placeless with preceding-vowel nasalization and approximate place realization. This is not permission to rewrite every /N/ as [ɴ]. The prior project note explicitly defers any default [ɴ] convention. The reviewer must inspect the exact source and target profile before deciding.

Decision: **PENDING**  
Rules / source page or table: _pending_

### D8. Uncertainty, variants and adjudication

Confirm:
- how annotators mark uncertain segments and competing lexical pronunciations;
- when a variant receives a separate record/profile vs an uncertainty note;
- how source disagreement is distinguished from annotator disagreement;
- what evidence is sufficient for `RESOLVED`;
- which cases must remain `UNRESOLVED` and therefore excluded from gold.

The corpus lifecycle already defines `AGREEMENT`, `RESOLVED` and `UNRESOLVED`; this sheet must not weaken those requirements.

Decision: **PENDING**  
Policy: _pending_

## 4. Source-specific guardrails for the pilot

These guardrails summarize existing project source review; they do not replace item-level verification.

| Source | Potential role | Do not claim |
|---|---|---|
| Mooney & Repetti-Ludlow (2021) | Evidence about interactions among Burmese tone, vowel quality, sonority and syllable structure; useful for identifying competing analyses and questions | A universal tone inventory or a population-wide rule from one female Yangon consultant |
| Green (2002) | Source for coda /N/ analysis, subject to exact edition/page and profile review | A default surface [ɴ] realization for every context |
| OpenSLR SLR80 / Oo et al. (2020) | Potential contextual audio stimuli after rights, token alignment and profile checks | IPA labels, isolated citation forms, speaker-dialect classification or gender-balanced generalization |
| Thu et al. (2016) / MLC dictionary | Historical G2P comparator and dictionary bibliography | Independent IPA gold or permission to redistribute dictionary entries |
| Wiktionary-derived dataset | Discovery lead only pending upstream license compatibility and item-level audit | Cleared project corpus or independently adjudicated labels |
| JIPA Burmese description audio | Reference lead subject to publisher/IPA permissions | Permission to copy or redistribute audio in this project |

All selected pilot items require exact source title, author, edition, page/table/entry or audio file/time interval, profile match, license and rights evidence in the corpus record.

## 5. Evidence packet and review format

For each proposed convention, reviewer should provide:
- decision and scope;
- exact source locator(s), including page/table/section;
- whether the statement is established, competing, profile-limited or uncertain;
- at least one attested example and any counterexample/exception;
- what the annotator should write;
- what the annotator must not infer;
- whether the current schema can represent the result without loss.

Do not put private speaker information or blind annotation submissions in this public document.

## 6. Approval checklist

- [ ] D1 profile and speech task approved
- [ ] D2 one IPA kind selected and approved
- [ ] D3 tone/register/phonation policy approved
- [ ] D4 vowel quality/length policy approved
- [ ] D5 syllable/minor-syllable boundary policy approved
- [ ] D6 medials/complex onset policy approved
- [ ] D7 coda/checked-syllable/nasalization policy approved
- [ ] D8 uncertainty/variant/adjudication policy approved
- [ ] Every rule has exact source locators and stated scope/limits
- [ ] Schema can represent the decisions; required schema changes are implemented and tested
- [ ] Curator, two qualified independent annotators and a separate adjudicator confirmed
- [ ] Source and item-level rights checks complete
- [ ] Private blind intake dry-run passed

**Until all applicable approvals are complete, status remains BLOCKED for gold annotation.**

## 7. References already reviewed by the project

- Mooney, D. & Repetti-Ludlow, C. (2021), “Sonority and syllable structure: The case of Burmese tone”, *Proceedings of the Annual Meetings on Phonology*. https://doi.org/10.3765/plsa.v6i1.4900
- Green (2002), Burmese phonology/thesis source cited in the project handoff; exact bibliographic/page locator must be verified by the specialist before using a rule.
- Oo et al. (2020), “Burmese Speech Corpus, Finite-State Text Normalization and Pronunciation Grammars with an Application to Text-to-Speech”. https://aclanthology.org/2020.lrec-1.777
- Thu et al. (2016), “Comparison of Grapheme-to-Phoneme Conversion Methods on a Myanmar Pronunciation Dictionary”. https://aclanthology.org/W16-3702
- Controlled collection and blindness requirements: [IPA gold collection playbook](ipa-gold-collection-playbook.md) and [independent IPA gold corpus contract](ipa-gold-corpus.md).

## 8. Change control

This draft must not be silently converted to an approved convention. After specialist review:
1. update the version and approval record;
2. retain rejected/competing analyses with their source scope;
3. update the annotation packet and schema only where required;
4. add sourced test cases before runtime rules are changed;
5. freeze the approved sheet before blind annotation begins.

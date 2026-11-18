from .parser import parse_burmese
from .phonology import load_phonology_registry, phonologize_syllable
from .unicode import BASE_CONSONANTS, KINZI, MEDIALS, SPECIAL, VOWEL_SIGNS


# Compatibility views are derived from the canonical CSV registries. The
# browser generator reads those same files; neither runtime owns a second
# hand-maintained copy of source IPA correspondences.
_DEFAULT_REGISTRY = load_phonology_registry()
ONSET_IPA = {
    character: row["ipa"]
    for character, row in _DEFAULT_REGISTRY["onsets"].items()
    if row.get("ipa")
}
ESTABLISHED_ONSETS = {
    character
    for character, row in _DEFAULT_REGISTRY["onsets"].items()
    if row.get("status") == "established" and row.get("ipa")
}
VOWEL_IPA = {
    identifier: row["ipa"]
    for identifier, row in _DEFAULT_REGISTRY["vowels"].items()
    if row.get("status") == "established" and row.get("ipa")
}


def _ipa(s, registry=None):
    """Backward-compatible IPA projection of the typed phonology stage."""
    return phonologize_syllable(s, registry=registry)["ipa"]


def _is_myanmar_phonological_char(char: str) -> bool:
    return (
        char in BASE_CONSONANTS
        or char in VOWEL_SIGNS
        or char in MEDIALS
        or char in SPECIAL
        or char in KINZI
    )


def _standalone_bare_consonant_indices(syllables: list[dict]) -> set[int]:
    """Find bare consonant clusters bounded by non-Myanmar text or input edges.

    Adjacent Myanmar syllable clusters stay on the existing contextual path.
    A bare consonant separated by whitespace, Latin text, or punctuation is a
    standalone token even when the overall input contains multiple characters.
    """
    standalone = set()
    for index, syllable in enumerate(syllables):
        raw = syllable.get("raw", "")
        if len(raw) != 1 or raw not in BASE_CONSONANTS:
            continue
        previous_raw = syllables[index - 1].get("raw", "") if index else ""
        next_raw = syllables[index + 1].get("raw", "") if index + 1 < len(syllables) else ""
        left_is_myanmar = bool(previous_raw) and _is_myanmar_phonological_char(previous_raw[-1])
        right_is_myanmar = bool(next_raw) and _is_myanmar_phonological_char(next_raw[0])
        if not left_is_myanmar and not right_is_myanmar:
            standalone.add(index)
    return standalone


def to_ipa(text: str, registry=None) -> dict:
    result = parse_burmese(text)
    bare_isolated = _standalone_bare_consonant_indices(result["syllables"])
    for index, syllable in enumerate(result["syllables"]):
        phonology = phonologize_syllable(syllable, registry=registry)
        if index in bare_isolated:
            phonology["ipa"] = None
            phonology["status"] = "NOT_ESTABLISHED"
            if "isolated_bare_consonant" not in phonology["unresolved_features"]:
                phonology["unresolved_features"].insert(0, "isolated_bare_consonant")
        syllable["phonology"] = phonology
        syllable["ipa"] = phonology["ipa"]
        syllable["phonetic_status"] = (
            "conservative_partial" if syllable["ipa"] else "analysis_dependent"
        )
    result["ipa"] = " ".join(syllable["ipa"] or "?" for syllable in result["syllables"])
    return result

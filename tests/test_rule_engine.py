from burmese_ukrainian.rule_engine import RuleBasedBurmeseEngine
from burmese_ukrainian.hybrid import HybridBurmeseEngine


def test_rule_engine_generates_repeatable_ipa_from_repository_rules():
    engine = RuleBasedBurmeseEngine()
    first = engine.analyze("ကာ")
    second = engine.analyze("ကာ")
    assert first == second
    assert first["ipa"] == "ka"
    assert first["status"] == "PROPOSED"
    assert first["ipa_status"] == "analysis_dependent"
    assert first["phonetic_completeness"] == "SEGMENTAL_ONLY"
    assert first["prosody_status"] == "not_established"
    assert first["canonical_ipa"] is None
    assert first["canonical_ukrainian"] is None
    assert first["ipa_candidate"]["kind"] == "IPA_CANDIDATE"
    assert first["ukrainian_candidate_status"] == "PROVISIONAL"
    assert first["deterministic"] is True
    assert first["external_backends_used"] == []


def test_unsupported_bare_consonant_is_withheld():
    result = RuleBasedBurmeseEngine().analyze("က")
    assert result["ipa"] is None
    assert result["status"] == "PARTIAL"
    assert result["canonical_ipa"] is None
    assert result["ukrainian_candidate_status"] == "NOT_ESTABLISHED"


def test_hybrid_wraps_rule_engine_without_changing_final_ipa():
    baseline = RuleBasedBurmeseEngine().analyze("ကာ")
    result = HybridBurmeseEngine().analyze("ကာ")
    assert result["ipa"] == baseline["ipa"]
    assert result["external_candidates"] == []


def test_hybrid_factory_accepts_candidates_but_does_not_promote_them():
    from burmese_ukrainian import create_hybrid_engine
    baseline = RuleBasedBurmeseEngine().analyze("ကာ")
    result = create_hybrid_engine({"external-model": lambda _: "ka"}).analyze("ကာ")
    assert result["ipa"] == baseline["ipa"]
    assert result["external_candidates"][0]["provider"] == "external-model"
    assert result["external_candidates"][0]["promotion"].startswith("WITHHELD")
    assert result["external_backends_used"] == ["external-model"]


def test_provisional_onset_registry_includes_the_registered_nya_letter():
    # data/burmese/ipa_onsets.csv registers U+1009 as analysis-dependent /ɲ/.
    # It is a provisional onset hint only; an isolated bare consonant still
    # does not become canonical IPA or a complete word transcription.
    result = RuleBasedBurmeseEngine().analyze("ဉ")
    assert result["ipa"] is None
    assert result["status"] == "PARTIAL"
    assert result["provisional_ipa"] == "ɲ"


def test_canonical_ipa_withholds_analysis_dependent_onsets_and_vowels():
    from burmese_ukrainian.ipa import to_ipa

    # These values exist in the source registries as analysis-dependent
    # hypotheses. Their presence in the parser inventory must not promote them
    # to canonical IPA merely because a string mapping exists in Python.
    for source in ("စေ", "ဓာ", "ကီ", "ကဲ", "ကူ", "ကါ"):
        result = to_ipa(source)
        assert result["syllables"][0]["ipa"] is None, source
        assert result["syllables"][0]["phonetic_status"] == "analysis_dependent", source

    # The established subset remains executable.
    for source, expected in (("ကေ", "ke"), ("ကိ", "ki"), ("ကု", "ku"), ("ကာ", "ka")):
        result = to_ipa(source)
        assert result["syllables"][0]["ipa"] == expected, source
        assert result["syllables"][0]["phonetic_status"] == "conservative_partial", source


def test_runtime_ipa_allowlists_match_the_established_source_registries():
    import csv
    from pathlib import Path
    from burmese_ukrainian.ipa import ESTABLISHED_ONSETS, VOWEL_IPA

    root = Path(__file__).resolve().parents[1]
    with (root / "data/burmese/ipa_onsets.csv").open(encoding="utf-8", newline="") as stream:
        onset_rows = list(csv.DictReader(stream))
    with (root / "data/burmese/ipa_vowels.csv").open(encoding="utf-8", newline="") as stream:
        vowel_rows = list(csv.DictReader(stream))

    expected_onsets = {row["character"] for row in onset_rows if row["status"] == "established"}
    expected_vowels = {row["id"] for row in vowel_rows if row["status"] == "established"}
    assert ESTABLISHED_ONSETS == expected_onsets
    assert set(VOWEL_IPA) == expected_vowels


def test_rule_engine_marks_profile_scope_without_claiming_profile_adjudication():
    result = RuleBasedBurmeseEngine().analyze("ကာ")
    assert result["profile"] == "my-yangon-careful-citation-v1"
    assert result["profile_status"] == "PROFILE_SCOPED_NOT_INDEPENDENTLY_ADJUDICATED"
    assert result["ipa_candidate"]["profile"] == result["profile"]
    assert result["ipa_candidate"]["prosody_status"] == "not_established"
    assert result["ipa_candidate"]["phonetic_completeness"] == "SEGMENTAL_ONLY"


def test_mixed_input_segmental_previews_are_not_labeled_supported():
    result = RuleBasedBurmeseEngine().analyze("ကာ မြန်မာ")
    preview = result["fallback_trace"][0]
    assert preview["ipa"] == "ka"
    assert preview["status"] == "PROVISIONAL_SEGMENTAL_ONLY"
    assert "tone" in preview["unresolved_features"]
    assert "PROFILE_NOT_INDEPENDENTLY_ADJUDICATED" in preview["warnings"]



def test_api_exposes_independent_graphemic_phonology_ipa_and_ukrainian_statuses():
    engine = RuleBasedBurmeseEngine()

    segmental = engine.analyze("ကာ")
    assert segmental["graphemic_status"] == "ESTABLISHED"
    assert segmental["phonology_status"] == "SEGMENTAL_ONLY"
    assert segmental["ipa_status"] == "analysis_dependent"
    assert segmental["ukrainian_status"] == "proposed"

    unresolved = engine.analyze("ကျာ")
    assert unresolved["graphemic_status"] == "ESTABLISHED"
    assert unresolved["phonology_status"] == "PARTIAL"
    assert unresolved["ipa_status"] == "analysis_dependent"
    assert unresolved["ukrainian_status"] == "not_established"

    empty = engine.analyze("")
    assert empty["graphemic_status"] == "NOT_APPLICABLE"
    assert empty["phonology_status"] == "NOT_APPLICABLE"

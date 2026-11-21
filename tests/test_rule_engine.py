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


def test_api_layer_statuses_ignore_non_myanmar_passthrough_text():
    result = RuleBasedBurmeseEngine().analyze("ကာ hello")
    assert result["graphemic_status"] == "ESTABLISHED"
    assert result["phonology_status"] == "SEGMENTAL_ONLY"

    non_myanmar_only = RuleBasedBurmeseEngine().analyze("hello")
    assert non_myanmar_only["graphemic_status"] == "NOT_APPLICABLE"
    assert non_myanmar_only["phonology_status"] == "NOT_APPLICABLE"



def test_analysis_dependent_registry_rows_reach_only_the_provisional_ipa_adapter():
    result = RuleBasedBurmeseEngine().analyze("ကီ")
    assert result["ipa"] is None
    assert result["canonical_ipa"] is None
    assert result["provisional_ipa"] == "kiː"
    assert result["fallback_status"] == "PROVISIONAL"
    trace = result["fallback_trace"][0]
    assert trace["status"] == "PROVISIONAL_SEGMENTAL_ONLY"
    assert "analysis_dependent_segmental_realization" in trace["unresolved_features"]
    assert "SOURCE_REGISTRY_ANALYSIS_DEPENDENT" in trace["warnings"]



def test_source_traceable_segmental_candidates_are_tier_b_not_gold():
    engine = RuleBasedBurmeseEngine()
    for source, expected_ipa, expected_uk in (("လေ", "le", "ле"), ("ပူ", "pu", "пу"), ("မိ", "mi", "мі"), ("နေ", "ne", "не")):
        result = engine.analyze(source)
        assert result["confidence_tier"] == "B", source
        assert result["ipa"] == expected_ipa, source
        assert result["ukrainian_candidate"], source
        assert result["canonical_ipa"] is None, source
        assert result["canonical_ukrainian"] is None, source

    # Green (2005) and Oo et al. (2020) disagree on the source mapping of စ.
    # The candidate remains visible, but a source conflict prevents tier B.
    conflicting = engine.analyze("စေ")
    assert conflicting["confidence_tier"] == "C"
    assert conflicting["provisional_ipa"] == "se"
    assert "SOURCE_ANALYSIS_CONFLICT" in conflicting["fallback_trace"][0]["warnings"]

    # Unicode-only evidence supports script structure, not a B-tier phonological claim.
    unicode_only = engine.analyze("ကီ")
    assert unicode_only["confidence_tier"] == "C"
    assert unicode_only["provisional_ipa"] == "kiː"

    onset_only = engine.analyze("ဉ")
    assert onset_only["confidence_tier"] == "C"

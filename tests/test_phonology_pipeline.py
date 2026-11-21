from pathlib import Path

from burmese_ukrainian.ipa import to_ipa
from burmese_ukrainian.phonology import load_phonology_registry


ROOT = Path(__file__).resolve().parents[1]


def test_simple_segmental_ipa_exposes_typed_source_backed_components():
    result = to_ipa("ကာ")
    syllable = result["syllables"][0]

    assert syllable["ipa"] == "ka"
    assert syllable["phonology"] == {
        "status": "SEGMENTAL_ONLY",
        "ipa": "ka",
        "segments": [
            {
                "kind": "onset",
                "source": "က",
                "ipa": "k",
                "status": "established",
                "evidence": ["U18", "GREEN2002"],
            },
            {
                "kind": "vowel",
                "source": "aa",
                "ipa": "a",
                "status": "established",
                "evidence": ["U18", "GREEN2002"],
            },
        ],
        "unresolved_features": [
            "tone",
            "phonation",
            "quantity",
            "profile_adjudication",
        ],
        "rule_ids": [],
    }


def test_registry_override_changes_real_ipa_output_without_editing_runtime_tables(tmp_path):
    onset_rows = (ROOT / "data/burmese/ipa_onsets.csv").read_text(encoding="utf-8")
    vowel_rows = (ROOT / "data/burmese/ipa_vowels.csv").read_text(encoding="utf-8")
    (tmp_path / "ipa_onsets.csv").write_text(
        onset_rows.replace("က,k,established", "က,q,established"),
        encoding="utf-8",
    )
    (tmp_path / "ipa_vowels.csv").write_text(
        vowel_rows.replace("aa,a,established", "aa,ɑ,established"),
        encoding="utf-8",
    )

    registry = load_phonology_registry(tmp_path)
    result = to_ipa("ကာ", registry=registry)

    assert result["syllables"][0]["ipa"] == "qɑ"
    assert result["syllables"][0]["phonology"]["segments"][0]["ipa"] == "q"
    assert result["syllables"][0]["phonology"]["segments"][1]["ipa"] == "ɑ"


def test_unresolved_medial_coda_and_prosody_remain_explicitly_withheld():
    for source, feature in (
        ("ကျာ", "medial"),
        ("ကတ်", "coda"),
        ("ကာ့", "prosody"),
    ):
        syllable = to_ipa(source)["syllables"][0]
        assert syllable["ipa"] is None, source
        assert feature in syllable["phonology"]["unresolved_features"], source
        assert syllable["phonology"]["status"] == "NOT_ESTABLISHED", source


def test_installed_registry_data_is_used_without_a_source_checkout(tmp_path, monkeypatch):
    import shutil
    import burmese_ukrainian.phonology as phonology

    installed = (
        tmp_path
        / "prefix"
        / "share"
        / "burmese-ukrainian-phonetic-system"
        / "data"
        / "burmese"
    )
    installed.mkdir(parents=True)
    for name in ("ipa_onsets.csv", "ipa_vowels.csv"):
        shutil.copyfile(ROOT / "data" / "burmese" / name, installed / name)

    monkeypatch.setattr(phonology, "_DEFAULT_DATA_DIR", tmp_path / "missing-source-tree")
    monkeypatch.setattr(phonology.sysconfig, "get_path", lambda key: str(tmp_path / "prefix"))

    registry = phonology.load_phonology_registry()
    assert registry["onsets"]["က"]["ipa"] == "k"
    assert registry["vowels"]["aa"]["ipa"] == "a"


def test_python_phonology_output_matches_shared_browser_contract():
    import json

    fixture_path = ROOT / "tests" / "fixtures" / "shared_phonology_contract.json"
    contract = json.loads(fixture_path.read_text(encoding="utf-8"))
    for case in contract["cases"]:
        result = to_ipa(case["input"])
        assert len(result["syllables"]) == 1, case["id"]
        assert result["syllables"][0]["phonology"] == case["expected"], case["id"]



def test_analysis_dependent_source_rows_produce_separate_provisional_ipa_only():
    for source, expected in (("ကီ", "ki"), ("ကဲ", "kɛ"), ("ကူ", "ku"), ("စေ", "se")):
        syllable = to_ipa(source)["syllables"][0]
        assert syllable["ipa"] is None
        assert syllable["phonology"]["status"] == "NOT_ESTABLISHED"
        assert syllable["phonology"]["provisional_ipa"] == expected
        assert syllable["phonology"]["provisional_status"] == "PROVISIONAL_SEGMENTAL_ONLY"
        assert all(part["evidence"] for part in syllable["phonology"]["provisional_segments"])


def test_green2005_source_locators_are_attached_to_simple_cv_segments():
    for source, expected in (("နီ", "ni"), ("လေ", "le"), ("ပူ", "pu"), ("နေ", "ne")):
        syllable = to_ipa(source)["syllables"][0]
        candidate = syllable["ipa"] or syllable["phonology"].get("provisional_ipa")
        parts = syllable["phonology"].get("provisional_segments") or syllable["phonology"]["segments"]
        assert candidate == expected, source
        assert all(part.get("source_locator") for part in parts), source
        assert "tone" in syllable["phonology"]["unresolved_features"], source

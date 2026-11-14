import json
from pathlib import Path

from burmese_ukrainian import parse_burmese


FIXTURE_PATH = Path(__file__).parent / "fixtures" / "shared_unicode_contract.json"


def test_shared_unicode_contract_fixtures():
    fixture = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))
    assert fixture["schema_version"] == 1

    for case in fixture["cases"]:
        expected = case["python"]
        result = parse_burmese(case["input"])
        assert result["status"] == expected["top_level_status"], case["id"]
        assert [f"U+{ord(ch):04X}" for ch in case["input"]] == case["codepoints"], case["id"]
        assert result["syllables"][0]["status"] == expected["syllable_status"], case["id"]
        if expected["graphemes_preserved"]:
            assert result["graphemes"] == [case["input"]], case["id"]


def test_shared_phonetic_status_contract_withholds_unimplemented_structures():
    from burmese_ukrainian.ipa import to_ipa

    fixture = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))
    for case in fixture["phonetic_status_cases"]:
        result = to_ipa(case["input"])
        assert len(result["syllables"]) == 1, case["id"]
        syllable = result["syllables"][0]
        assert syllable["ipa"] is None, case["id"]
        assert syllable["phonetic_status"] == case["expected_python_phonetic_status"], case["id"]


def test_shared_kinzi_coda_boundary_fixture():
    fixture = json.loads(FIXTURE_PATH.read_text(encoding="utf-8"))
    for case in fixture["structural_cases"]:
        result = parse_burmese(case["input"])
        expected = case["python"]
        assert result["graphemes"] == expected["graphemes"], case["id"]
        assert len(result["syllables"]) == expected["syllable_count"], case["id"]
        first = result["syllables"][0]
        assert first["kinzi"]["position"] == expected["first_kinzi_position"], case["id"]
        assert first["coda"]["character"] == expected["first_coda_character"], case["id"]

"""Source-scoped Burmese sonorant voicing evidence; not runtime rules or IPA gold."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "burmese"


def _rows(path):
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def test_sonorant_evidence_is_schema_valid_linked_and_withheld():
    import jsonschema

    sources = {row["source_id"] for row in _rows(DATA / "sources.csv")}
    claims = {row["claim_id"]: row for row in _rows(DATA / "source_claims.csv")}
    evidence = _rows(DATA / "sonorant_phonetics_evidence.csv")
    schema = json.loads((ROOT / "schemas" / "sonorant_phonetics_evidence.schema.json").read_text(encoding="utf-8"))

    assert len(evidence) == 6
    assert len({row["evidence_id"] for row in evidence}) == len(evidence)
    for row in evidence:
        jsonschema.validate(row, schema)
        assert row["source_id"] in sources
        assert row["claim_id"] in claims
        assert claims[row["claim_id"]]["source_id"] == row["source_id"]
        assert claims[row["claim_id"]]["status"] == "DOCUMENTARY"
        assert row["source_locator"].strip()
        assert row["scope_limit"].strip()
        assert row["implementation_consequence"].strip()
        assert row["runtime_status"] == "WITHHELD"


def test_sonorant_study_scope_does_not_expand_to_full_inventory():
    evidence = {row["evidence_id"]: row for row in _rows(DATA / "sonorant_phonetics_evidence.csv")}
    inventory = evidence["REPETTI-SONORANT-INVENTORY-001"]
    scope = evidence["REPETTI-SONORANT-EXPERIMENT-SCOPE-001"]
    assert "six voiced/voiceless pairs" in inventory["phonological_feature"]
    assert "four sonorant pairs" in scope["segment_class"]
    assert "high/low tones" in scope["phonological_feature"]
    assert "Nine speakers" in scope["study_context"]
    assert "[n, ɲ]" in scope["study_context"]
    assert scope["runtime_status"] == "WITHHELD"


def test_spread_glottis_is_variable_not_a_categorical_orthographic_sequence():
    evidence = {row["evidence_id"]: row for row in _rows(DATA / "sonorant_phonetics_evidence.csv")}
    row = evidence["REPETTI-SONORANT-SG-VARIATION-001"]
    assert "78%" in row["reported_phonetic_realization"]
    assert "22%" in row["reported_phonetic_realization"]
    assert "100.74 ms" in row["reported_phonetic_realization"]
    assert "Do not model every voiceless sonorant as a categorical /h/+sonorant sequence" in row["implementation_consequence"]
    assert row["runtime_status"] == "WITHHELD"


def test_non_sg_tokens_remain_phonologically_distinct_in_reported_experiment():
    evidence = {row["evidence_id"]: row for row in _rows(DATA / "sonorant_phonetics_evidence.csv")}
    row = evidence["REPETTI-SONORANT-NONSG-CUES-001"]
    assert "F0" in row["reported_phonetic_realization"]
    assert "SoE" in row["reported_phonetic_realization"]
    assert "Do not infer voiced IPA solely from the absence" in row["implementation_consequence"]
    assert row["runtime_status"] == "WITHHELD"


def test_lda_overall_accuracy_is_not_misrepresented_as_project_accuracy():
    evidence = {row["evidence_id"]: row for row in _rows(DATA / "sonorant_phonetics_evidence.csv")}
    row = evidence["REPETTI-SONORANT-LDA-LIMITS-001"]
    assert "86.7% overall" in row["reported_phonetic_realization"]
    assert "5.4% for voiceless non-SG" in row["reported_phonetic_realization"]
    assert "Never cite the 86.7% figure as project accuracy" in row["implementation_consequence"]
    assert row["runtime_status"] == "WITHHELD"

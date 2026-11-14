"""Source-backed onset/medial constraints; not a complete phonotactic grammar or IPA gold."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "burmese"


def rows(path):
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def test_onset_cluster_evidence_is_linked_scoped_and_withheld():
    sources = {row["source_id"] for row in rows(DATA / "sources.csv")}
    claims = {row["claim_id"] for row in rows(DATA / "source_claims.csv")}
    evidence = rows(DATA / "onset_cluster_evidence.csv")
    schema = json.loads((ROOT / "schemas" / "onset_cluster_evidence.schema.json").read_text(encoding="utf-8"))

    assert len(evidence) == 13
    assert len({row["evidence_id"] for row in evidence}) == len(evidence)
    assert {row["evidence_class"] for row in evidence} >= {
        "source_analysis", "source_scoped_prohibition", "descriptive_candidate",
        "orthographic_only", "historical_source_specific",
    }
    for row in evidence:
        assert row["source_id"] in sources
        assert row["claim_id"] in claims
        assert row["source_locator"].strip()
        assert row["profile_scope"].strip()
        assert row["implementation_consequence"].strip()
        assert row["runtime_status"] == "WITHHELD"
        assert set(row) == set(schema["required"])
        assert row["domain"] in schema["properties"]["domain"]["enum"]
        assert row["evidence_class"] in schema["properties"]["evidence_class"]["enum"]


def test_complex_onset_prohibition_is_limited_to_minor_syllables():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "onset_cluster_evidence.csv")}
    minor = evidence["ONSET-MINOR-CG-PROHIBITED-001"]
    major = evidence["ONSET-CG-MAJOR-001"]

    assert minor["evidence_class"] == "source_scoped_prohibition"
    assert "minor syllables" in minor["environment"]
    assert "not a global Burmese cluster ban" in minor["implementation_consequence"]
    assert major["evidence_class"] == "source_analysis"
    assert "major syllables" in major["environment"]


def test_velar_ya_ra_sequences_are_not_marked_as_globally_prohibited():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "onset_cluster_evidence.csv")}
    row = evidence["MED-YA-RA-VELAR-001"]
    assert row["evidence_class"] == "descriptive_candidate"
    assert "palatalized outcomes" in row["attested_analysis"]
    assert row["runtime_status"] == "WITHHELD"


def test_orthographic_historical_and_phonological_medial_claims_stay_separate():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "onset_cluster_evidence.csv")}
    assert evidence["MED-MULTI-ORTHOGRAPHIC-001"]["evidence_class"] == "orthographic_only"
    assert evidence["MED-STEDT-WRITTEN-001"]["evidence_class"] == "historical_source_specific"
    assert evidence["MED-STEDT-RANGOON-001"]["evidence_class"] == "historical_source_specific"
    assert evidence["MED-WA-CONTEXT-001"]["runtime_status"] == "WITHHELD"
    assert evidence["MED-HA-CONTEXT-001"]["runtime_status"] == "WITHHELD"

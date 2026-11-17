"""Validate the source-preserving Burmese finals registry CSV contract."""
import csv
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "burmese"


def _read(path):
    with path.open(encoding="utf-8", newline="") as stream:
        reader = csv.DictReader(stream)
        rows = list(reader)
        return reader.fieldnames, rows


def test_finals_registry_has_aligned_columns_and_source_references():
    fields, rows = _read(DATA / "finals.csv")
    assert fields == [
        "orthographic_marker",
        "possible_function",
        "phonological_interpretation",
        "evidence_status",
        "source_id",
    ]
    assert rows
    assert all(None not in row for row in rows), "CSV rows must not contain surplus fields"
    assert all(all(value.strip() for value in row.values()) for row in rows)

    sources_fields, sources = _read(DATA / "sources.csv")
    assert "source_id" in sources_fields
    source_ids = {row["source_id"] for row in sources}
    assert all(row["source_id"] in source_ids for row in rows)

    allowed_statuses = {
        "established",
        "well_supported",
        "analysis_dependent",
        "dialect_dependent",
        "context_dependent",
        "uncertain",
        "disputed",
        "not_established",
        "unsupported",
    }
    assert all(row["evidence_status"] in allowed_statuses for row in rows)


def test_finals_registry_keeps_orthographic_markers_separate():
    _, rows = _read(DATA / "finals.csv")
    by_marker = {row["orthographic_marker"]: row for row in rows}

    assert by_marker["U+103A"]["evidence_status"] == "context_dependent"
    assert by_marker["U+1036"]["evidence_status"] == "context_dependent"
    assert by_marker["U+1038"]["evidence_status"] == "context_dependent"
    assert by_marker["kinzi"]["evidence_status"] == "established"

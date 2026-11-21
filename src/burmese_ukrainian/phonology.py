"""Registry-driven Burmese phonology stage.

The CSV files under data/burmese are the canonical source for source-side
segmental correspondences. This module deliberately does not infer medial,
coda, vowel-combination, tone, phonation or quantity realizations that the
selected profile has not established.
"""
from __future__ import annotations

import csv
import sysconfig
from functools import lru_cache
from pathlib import Path
from typing import Any


_DEFAULT_DATA_DIR = Path(__file__).resolve().parents[2] / "data" / "burmese"
_PROSODIC_GAPS = ("tone", "phonation", "quantity", "profile_adjudication")


def _read_registry(path: Path, key: str, required: set[str]) -> dict[str, dict[str, Any]]:
    with path.open(encoding="utf-8", newline="") as stream:
        reader = csv.DictReader(stream)
        fields = set(reader.fieldnames or ())
        missing = required - fields
        if missing:
            raise ValueError(f"{path.name} is missing required columns: {sorted(missing)}")
        records: dict[str, dict[str, Any]] = {}
        for line, row in enumerate(reader, start=2):
            identifier = (row.get(key) or "").strip()
            if not identifier:
                raise ValueError(f"{path.name}:{line} has an empty {key}")
            if identifier in records:
                raise ValueError(f"{path.name}:{line} duplicates {key}={identifier!r}")
            record = dict(row)
            record["evidence"] = [
                item.strip() for item in (row.get("evidence") or "").split(";") if item.strip()
            ]
            records[identifier] = record
    return records


@lru_cache(maxsize=4)
def _load_cached(data_dir: str) -> dict[str, dict[str, dict[str, Any]]]:
    root = Path(data_dir)
    return {
        "onsets": _read_registry(
            root / "ipa_onsets.csv", "character", {"character", "ipa", "status", "evidence"}
        ),
        "vowels": _read_registry(
            root / "ipa_vowels.csv", "id", {"id", "ipa", "status", "evidence"}
        ),
    }


def _default_data_dir() -> Path:
    """Resolve source-tree data first, then the installed wheel's shared data."""
    installed = (
        Path(sysconfig.get_path("data"))
        / "share"
        / "burmese-ukrainian-phonetic-system"
        / "data"
        / "burmese"
    )
    if not (_DEFAULT_DATA_DIR / "ipa_onsets.csv").is_file() and (installed / "ipa_onsets.csv").is_file():
        return installed
    return _DEFAULT_DATA_DIR


def load_phonology_registry(data_dir: str | Path | None = None) -> dict[str, dict[str, dict[str, Any]]]:
    """Load canonical IPA correspondence registries, optionally from a test fixture directory."""
    root = Path(data_dir).resolve() if data_dir is not None else _default_data_dir()
    return _load_cached(str(root) )


def phonologize_syllable(
    syllable: dict[str, Any],
    registry: dict[str, dict[str, dict[str, Any]]] | None = None,
) -> dict[str, Any]:
    """Return a typed, evidence-carrying segmental analysis without guessing gaps."""
    source = registry if registry is not None else load_phonology_registry()
    segments: list[dict[str, Any]] = []
    blocking: list[str] = []
    unresolved: list[str] = []

    def withhold(feature: str) -> None:
        if feature not in blocking:
            blocking.append(feature)
        if feature not in unresolved:
            unresolved.append(feature)

    if syllable.get("status", "established") != "established":
        withhold("orthographic_structure")

    if syllable.get("medials"):
        withhold("medial")
    if syllable.get("conjunct"):
        withhold("conjunct")
    if syllable.get("kinzi"):
        withhold("kinzi")
    if syllable.get("coda"):
        withhold("coda")
    if syllable.get("tone_mark"):
        withhold("prosody")

    onset = (syllable.get("onset") or {}).get("character")
    onset_row = source["onsets"].get(onset or "")
    onset_ipa = None
    provisional_onset_ipa = None
    provisional_segments: list[dict[str, Any]] = []
    if onset_row and onset_row.get("ipa") and onset_row.get("status") in {"established", "analysis_dependent"} and onset_row.get("evidence"):
        provisional_onset_ipa = onset_row["ipa"]
        onset_segment = {
            "kind": "onset", "source": onset, "ipa": provisional_onset_ipa,
            "status": onset_row["status"], "evidence": list(onset_row["evidence"]),
        }
        if onset_row.get("source_locator"):
            onset_segment["source_locator"] = onset_row["source_locator"]
        if onset_row.get("conflicting_sources"):
            onset_segment["conflicting_sources"] = [
                item.strip() for item in onset_row["conflicting_sources"].split(";") if item.strip()
            ]
        provisional_segments.append(onset_segment)
    if not onset_row or not onset_row.get("ipa") or onset_row.get("status") not in {"established", "analysis_dependent"}:
        withhold("onset_realization")
    elif onset_row.get("status") != "established":
        withhold("onset_realization")
    else:
        onset_ipa = onset_row["ipa"]
        established_onset_segment = {
            "kind": "onset", "source": onset, "ipa": onset_ipa,
            "status": onset_row["status"], "evidence": list(onset_row["evidence"]),
        }
        if onset_row.get("source_locator"):
            established_onset_segment["source_locator"] = onset_row["source_locator"]
        segments.append(established_onset_segment)

    vowel = syllable.get("vowel")
    vowel_signs = (vowel or {}).get("signs", [])
    vowel_ipa: list[str] = []
    provisional_vowel_ipa: list[str] = []
    if len(vowel_signs) > 1:
        withhold("vowel_combination")
    elif not vowel_signs:
        withhold("inherent_vowel")
    else:
        for sign in vowel_signs:
            identifier = sign.get("id")
            vowel_row = source["vowels"].get(identifier or "")
            if identifier == "anusvara":
                withhold("nasalization")
            elif not vowel_row or not vowel_row.get("ipa") or vowel_row.get("status") not in {"established", "analysis_dependent"} or not vowel_row.get("evidence"):
                withhold("vowel_realization")
            else:
                value = vowel_row["ipa"]
                candidate_segment = {
                    "kind": "vowel", "source": identifier, "ipa": value,
                    "status": vowel_row["status"], "evidence": list(vowel_row["evidence"]),
                }
                if vowel_row.get("source_locator"):
                    candidate_segment["source_locator"] = vowel_row["source_locator"]
                provisional_vowel_ipa.append(value)
                provisional_segments.append(candidate_segment)
                if vowel_row.get("status") == "established":
                    vowel_ipa.append(value)
                    segments.append(candidate_segment)
                else:
                    withhold("vowel_realization")

    unresolved.extend(feature for feature in _PROSODIC_GAPS if feature not in unresolved)
    segmental_ipa = "".join([onset_ipa] + vowel_ipa) if onset_ipa and vowel_ipa else None

    # Preserve the legacy onset-plus-placeholder diagnostic for a structurally
    # bare consonant. It is explicitly NOT_ESTABLISHED and cannot become IPA gold.
    if onset_ipa and not vowel_signs:
        segmental_ipa = onset_ipa + "?"

    complete_segmental = bool(segmental_ipa) and not blocking
    provisional_ipa = None
    if (provisional_onset_ipa and len(provisional_vowel_ipa) == 1
        and set(blocking).issubset({"onset_realization", "vowel_realization"})
        and any(item["status"] == "analysis_dependent" for item in provisional_segments)):
        provisional_ipa = provisional_onset_ipa + provisional_vowel_ipa[0]
    # Retain the legacy onset-plus-question-mark diagnostic for adjacent bare
    # Myanmar consonant clusters. It is explicitly incomplete and is withheld
    # at isolated-token boundaries by to_ipa().
    partial_inherent = bool(onset_ipa) and not vowel_signs and blocking == ["inherent_vowel"]
    result = {
        "status": "SEGMENTAL_ONLY" if complete_segmental else "NOT_ESTABLISHED",
        "ipa": segmental_ipa if complete_segmental or partial_inherent else None,
        "segments": segments,
        "unresolved_features": unresolved,
        "rule_ids": [],
    }
    if provisional_ipa:
        result["provisional_ipa"] = provisional_ipa
        result["provisional_segments"] = provisional_segments
        result["provisional_status"] = "PROVISIONAL_SEGMENTAL_ONLY"
    return result

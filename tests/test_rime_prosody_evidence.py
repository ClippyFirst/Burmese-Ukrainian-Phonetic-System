"""Source-scoped rime/prosody evidence; not a pronunciation generator or IPA gold."""
import csv
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DATA = ROOT / "data" / "burmese"


def rows(path):
    with path.open(encoding="utf-8", newline="") as handle:
        return list(csv.DictReader(handle))


def test_rime_prosody_evidence_is_schema_shaped_linked_and_withheld():
    import jsonschema

    sources = {row["source_id"] for row in rows(DATA / "sources.csv")}
    claims = {row["claim_id"] for row in rows(DATA / "source_claims.csv")}
    evidence = rows(DATA / "rime_prosody_evidence.csv")
    schema = json.loads((ROOT / "schemas" / "rime_prosody_evidence.schema.json").read_text(encoding="utf-8"))

    assert len(evidence) == 15
    assert len({row["evidence_id"] for row in evidence}) == len(evidence)
    for row in evidence:
        jsonschema.validate(row, schema)
        assert row["source_id"] in sources
        assert row["claim_id"] in claims
        assert row["source_locator"].strip()
        assert row["profile_scope"].strip()
        assert row["implementation_consequence"].strip()
        assert row["runtime_status"] == "WITHHELD"


def test_green_rime_constraints_remain_source_scoped():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "rime_prosody_evidence.csv")}
    diphthongs = evidence["GREEN-DIPHTHONG-CODA-001"]
    mid = evidence["GREEN-MID-VOWEL-OPEN-001"]
    epsilon = evidence["GREEN-EPSILON-OPEN-CHECKED-001"]
    nasal_tone = evidence["GREEN-NASAL-TONE-001"]

    assert "/ei ai ou au/" in diphthongs["vowel_class"]
    assert "/ʔ/ or /N/" in diphthongs["coda_class"]
    assert mid["syllable_type"] == "open"
    assert "/e o ɔ/" in mid["vowel_class"]
    assert epsilon["syllable_type"] == "open or checked"
    assert "never /N/" in epsilon["coda_class"]
    assert "checked absent" in nasal_tone["tone_class"]
    assert all(row["runtime_status"] == "WITHHELD" for row in (diphthongs, mid, epsilon, nasal_tone))


def test_mooney_vowel_alternation_is_not_encoded_as_tone_to_vowel_rule():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "rime_prosody_evidence.csv")}
    alternation = evidence["MOONEY-CLOSED-VOWEL-ALTERNATION-001"]
    assert "tone-independent" in alternation["reported_realization"]
    assert "Do not implement a direct tone-to-vowel rule" in alternation["implementation_consequence"]
    assert alternation["runtime_status"] == "WITHHELD"


def test_mooney_citation_and_sentential_tone_cues_are_not_collapsed():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "rime_prosody_evidence.csv")}
    isolated = evidence["MOONEY-ISOLATED-TONE-CUES-001"]
    sentential = evidence["MOONEY-SENTENTIAL-TONE-CUES-001"]
    assert "F0 did not distinguish all four" in isolated["reported_realization"]
    assert "duration distinctions are largely neutralized" in sentential["reported_realization"]
    assert isolated["source_locator"] != sentential["source_locator"]
    assert isolated["runtime_status"] == sentential["runtime_status"] == "WITHHELD"


def test_experimental_scope_and_phonation_observation_are_explicit():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "rime_prosody_evidence.csv")}
    scope = evidence["MOONEY-EXPERIMENT-SCOPE-001"]
    phonation = evidence["MOONEY-NASAL-ORAL-PHONATION-001"]
    assert "One speaker" in scope["profile_scope"]
    assert "nasalized" in phonation["reported_realization"]
    assert "experimental sample only" in phonation["profile_scope"]
    assert scope["evidence_status"] == "methodological_scope"


def test_tufs_crosswalk_keeps_open_nasal_and_checked_notation_distinct():
    evidence = {row["evidence_id"]: row for row in rows(DATA / "rime_prosody_evidence.csv")}
    open_rime = evidence["TUFS-OPEN-RIME-CROSSWALK-001"]
    nasal = evidence["TUFS-NASAL-RIME-CROSSWALK-001"]
    checked = evidence["TUFS-CHECKED-RIME-CROSSWALK-001"]

    assert open_rime["evidence_status"] == "documentary_crosswalk"
    assert "MED 2019" in open_rime["reported_realization"]
    assert "/ɴ/" in nasal["coda_class"]
    assert "not a universal segmental [n]" in nasal["implementation_consequence"]
    assert "/ʔ/" in checked["coda_class"]
    assert "three open/nasal tones" in checked["reported_realization"]
    assert all(row["runtime_status"] == "WITHHELD" for row in (open_rime, nasal, checked))

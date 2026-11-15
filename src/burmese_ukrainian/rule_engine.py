"""Deterministic, rule-based Burmese → IPA → Ukrainian research engine.

The canonical IPA path remains conservative. A separate onset-only preview is
available for unresolved syllables; it never guesses vowels, codas, medials,
kinzi, phonation or tone.
"""
from __future__ import annotations

from typing import Any

from .ipa import ONSET_IPA, to_ipa
from .practical import transcribe_ipa


def _provisional_preview(syllables: list[dict[str, Any]]) -> dict[str, Any] | None:
    previews = []
    for item in syllables:
        if item.get("ipa") and item.get("phonetic_status") == "conservative_partial":
            rendered = transcribe_ipa(item["ipa"])
            previews.append({
                "source": item.get("raw", ""),
                "ipa": item["ipa"],
                "ukrainian": rendered.get("text") or "?",
                "status": "PROVISIONAL_SEGMENTAL_ONLY",
                "position": "syllable",
                "rule_id": None,
                "unresolved_graphemes": [],
                "unresolved_features": ["tone", "phonation", "quantity", "profile_adjudication"],
                "warnings": ["TONE_NOT_INFERRED", "PROFILE_NOT_INDEPENDENTLY_ADJUDICATED"],
            })
            continue
        onset = item.get("onset", {}).get("character")
        raw = item.get("raw", "")
        # Do not strip context from a recognized syllable containing rime,
        # coda, medial, kinzi or conjunct structure. The onset-only preview is
        # limited to an isolated bare consonant token.
        hint = ONSET_IPA.get(onset) if len(raw) == 1 and raw == onset else None
        mapped = transcribe_ipa(hint) if hint else {"text": None}
        known = mapped.get("text") if mapped.get("text") is not None else ""
        unresolved = [ch for ch in raw if ch != onset] if hint else list(raw)
        previews.append({
            "source": raw,
            "ipa": hint,
            "ukrainian": known + ("?" if hint and known else "?"),
            "status": "PROVISIONAL" if hint and known else "UNKNOWN",
            "position": "onset" if hint and known else None,
            "rule_id": "BURMESE-PREVIEW-ONSET-IPA-V1" if hint and known else None,
            "unresolved_graphemes": unresolved,
            "unresolved_features": ["inherent_vowel"] if hint and known else [],
            "warnings": ["ISOLATED_ONSET_ONLY", "INHERENT_VOWEL_NOT_INFERRED"] if hint and known else ["NO_REGISTERED_POSITIONAL_IPA_HINT"],
            "evidence": ["U18", "W16-3702"] if hint and known else [],
        })
    if not previews:
        return None
    has_hint = any(item.get("ipa") for item in previews)
    return {
        "status": "PROVISIONAL" if has_hint else "UNKNOWN",
        "ipa_preview": " ".join(item["ipa"] or "?" for item in previews) if has_hint else None,
        "ukrainian_preview": " ".join(item["ukrainian"] for item in previews),
        "syllables": previews,
        "warnings": ["LOW_CONFIDENCE", "TONE_NOT_INFERRED"],
    }


class RuleBasedBurmeseEngine:
    """Deterministic Myanmar-script phonology for the selected Yangon profile."""

    profile = "my-yangon-careful-citation-v1"
    engine_id = "burmese-deterministic-rules-v1"

    def analyze(self, text: str) -> dict[str, Any]:
        result = to_ipa(text)
        syllables = result.get("syllables", [])
        unresolved = [
            item.get("raw", "")
            for item in syllables
            if not item.get("ipa") or item.get("phonetic_status") != "conservative_partial"
        ]
        complete = bool(syllables) and not unresolved
        ipa_parts = [item["ipa"] for item in syllables] if complete else []
        ipa = " ".join(ipa_parts) if complete else None

        practical_parts = [transcribe_ipa(part) for part in ipa_parts] if complete else []
        practical_complete = bool(practical_parts) and all(
            part.get("text") is not None for part in practical_parts
        )
        practical_statuses = {part.get("status") for part in practical_parts}
        practical_status = (
            "not_established" if not practical_complete else
            "analysis_dependent" if "analysis_dependent" in practical_statuses else
            "proposed"
        )
        practical_text = (
            "".join(part["text"] for part in practical_parts)
            if practical_complete else None
        )
        preview = _provisional_preview(syllables)
        phonetic_statuses = {item.get("phonetic_status") for item in syllables}
        ipa_status = (
            "analysis_dependent" if complete or "analysis_dependent" in phonetic_statuses
            else "not_established"
        )
        ipa_candidate = ({
            "kind": "IPA_CANDIDATE",
            "notation": "IPA",
            "provider": "PROJECT_RULES",
            "raw": ipa,
            "status": "PARTIAL",
            "profile": self.profile,
            "prosody_status": "not_established",
            "phonetic_completeness": "SEGMENTAL_ONLY",
            "provenance": {"engine": self.engine_id, "profile_id": self.profile},
        } if complete else None)
        return {
            "input": text,
            "normalized": result.get("normalized", text),
            "profile": self.profile,
            "engine": self.engine_id,
            "deterministic": True,
            "ipa": ipa,
            "ipa_status": ipa_status,
            "canonical_ipa": None,
            "ipa_candidate": ipa_candidate,
            "phonetic_completeness": "SEGMENTAL_ONLY" if complete else "INCOMPLETE",
            "prosody_status": "not_established",
            "profile_status": "PROFILE_SCOPED_NOT_INDEPENDENTLY_ADJUDICATED",
            "ukrainian": practical_text,
            "ukrainian_status": practical_status,
            "canonical_ukrainian": None,
            "ukrainian_candidate_status": "PROVISIONAL" if practical_complete else "NOT_ESTABLISHED",
            "ukrainian_syllables": [part.get("text") for part in practical_parts] if practical_complete else [],
            "ukrainian_segments": [
                segment for part in practical_parts for segment in part.get("segments", [])
            ],
            "ukrainian_prosody": [
                mark for part in practical_parts for mark in part.get("prosody", [])
            ],
            "provisional_ipa": preview["ipa_preview"] if preview and not complete else None,
            "provisional_ukrainian": preview["ukrainian_preview"] if preview and not complete else None,
            "fallback_status": preview["status"] if preview and not complete else None,
            "fallback_trace": preview["syllables"] if preview and not complete else [],
            "ipa_with_placeholders": result.get("ipa"),
            "status": "PROPOSED" if complete else (
                "NOT_ESTABLISHED" if not syllables else "PARTIAL"
            ),
            "syllables": syllables,
            "processing_steps": [
                "MYANMAR_UNICODE_NORMALIZATION",
                "BURMESE_ORTHOGRAPHIC_PARSER",
                "BURMESE_ONSET_MEDIAL_RIME_RULES",
                "CONSERVATIVE_IPA_WITHHOLDING",
                "PROSODY_AND_PROFILE_COMPLETENESS_GATE",
                "PROVISIONAL_ONSET_IPA_PREVIEW",
                "IPA_TO_UKRAINIAN_PRACTICAL_ADAPTER",
            ],
            "reason": (
                "The displayed IPA is a segmental-only candidate. Tone, phonation and quantity are not inferred; canonical full IPA remains withheld until the relevant prosodic dimensions are established for the selected profile."
                if complete else
                "Canonical IPA is withheld for unresolved structure. A separate onset-only low-confidence preview is shown where the registered initial IPA and Ukrainian adapter both support it; no rime, tone, medial or coda is inferred."
            ),
            "external_backends_used": [],
        }


# Backward-compatible name: no model ensemble or provider injection remains.
HybridBurmeseEngine = RuleBasedBurmeseEngine


def create_hybrid_engine() -> RuleBasedBurmeseEngine:
    """Compatibility factory returning the deterministic rule engine only."""
    return RuleBasedBurmeseEngine()

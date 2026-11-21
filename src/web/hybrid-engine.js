/**
 * Static-site IPA-first hybrid orchestrator.
 *
 * Structural parsing remains upstream. Every pronunciation candidate is kept
 * as a typed IPA result; only the evidence-gated project result can currently
 * become canonical. The canonical IPA is then passed through the one Ukrainian
 * IPA adapter. External engines never vote or silently replace unknowns.
 */
import { epitranMya } from "./epitran-mya.js";
import { renderUkrainian } from "./ukrainian-adapter.js";
import { transduceWfst } from "./wfst-runtime.js";
import { transduceGoogleBurmese } from "./google-wfst-input.js";

const STATUS_RANK = {
  ESTABLISHED: 0, WELL_SUPPORTED: 1, PROPOSED: 2, PROVISIONAL: 3,
  ANALYSIS_DEPENDENT: 4, NOT_ESTABLISHED: 5, UNSUPPORTED: 6, UNCERTAIN: 7,
};
const TONE_MARKS = /[\u0300\u0301\u0302\u0303\u0304\u030c]/gu;
function normalizedIpa(ipa) {
  return String(ipa || "").normalize("NFD").replace(/[\s.·]/gu, "");
}
function segmentalIpa(ipa) {
  return normalizedIpa(ipa).replace(TONE_MARKS, "");
}
function toneSignature(ipa) {
  return (normalizedIpa(ipa).match(TONE_MARKS) || []).join("");
}
export function compareIpaCandidates(left, right) {
  const a = normalizedIpa(left), b = normalizedIpa(right);
  if (!a || !b) return { relation: "NOT_COMPARABLE", segmental: "NOT_COMPARABLE", prosody: "NOT_COMPARABLE" };
  if (a === b) return { relation: "AGREEMENT", segmental: "AGREEMENT", prosody: "AGREEMENT" };
  if (segmentalIpa(a) === segmentalIpa(b)) {
    const at = toneSignature(a), bt = toneSignature(b);
    return {
      relation: "SEGMENTAL_AGREEMENT_PROSODY_DIFFERENCE",
      segmental: "AGREEMENT",
      prosody: !at || !bt ? "TONE_UNDERSPECIFIED_BY_ONE_CANDIDATE" : "TONE_DIVERGENCE",
    };
  }
  return { relation: "DIVERGENCE", segmental: "DIVERGENCE", prosody: "NOT_COMPARABLE" };
}
function aggregate(statuses, fallback = "NOT_ESTABLISHED") {
  if (!statuses.length) return fallback;
  return statuses.reduce((worst, item) =>
    (STATUS_RANK[item] ?? 5) > (STATUS_RANK[worst] ?? 0) ? item : worst, "ESTABLISHED");
}
function graphemicLayerStatus(records) {
  if (!records.length) return "NOT_APPLICABLE";
  const statuses = records.map(({ segment }) => {
    if (segment.structureStatus) return segment.structureStatus;
    if (segment.status === "UNSUPPORTED") return "unsupported_or_malformed";
    if (segment.status === "UNCERTAIN") return "partially_unparsed";
    return "established";
  });
  if (statuses.some(status => ["invalid", "unsupported_or_malformed"].includes(status))) return "UNSUPPORTED";
  if (statuses.some(status => status !== "established")) return "PARTIAL";
  return "ESTABLISHED";
}
function phonologyLayerStatus(records) {
  if (!records.length) return "NOT_APPLICABLE";
  const statuses = records.map(({ segment, deterministicIpa }) => {
    if (segment.phonology?.status === "SEGMENTAL_ONLY") return "SEGMENTAL_ONLY";
    if (segment.phonology?.segments?.length || segment.phonology?.provisional_segments?.length) return "PARTIAL";
    return deterministicIpa ? "SEGMENTAL_ONLY" : "NOT_ESTABLISHED";
  });
  if (statuses.every(status => status === "SEGMENTAL_ONLY")) return "SEGMENTAL_ONLY";
  if (statuses.some(status => ["PARTIAL", "SEGMENTAL_ONLY"].includes(status))) return "PARTIAL";
  return "NOT_ESTABLISHED";
}
function typedCandidate(provider, ipa, status, provenance = {}, profile = "UNSPECIFIED") {
  return {
    kind: "IPA_CANDIDATE", notation: "IPA", provider, raw: ipa,
    normalized: normalizedIpa(ipa), status, profile, provenance,
  };
}
function adaptationFor(ipa) {
  if (!ipa) return { text: "", status: "NOT_ESTABLISHED", parts: [], prosody: [] };
  return renderUkrainian(ipa);
}

export function analyzeHybrid(segments, googleModel = null) {
  const records = segments.map((segment) => {
    if (segment.nonMyanmar) return { segment, passthrough: true };
    const provisionalSegmentalIpa = segment.provisionalStatus === "PROVISIONAL_SEGMENTAL_ONLY"
      ? segment.provisionalIpa : null;
    const deterministicIpa = (segment.ipa || provisionalSegmentalIpa)
      && !["UNSUPPORTED", "UNCERTAIN"].includes(segment.status)
      ? (segment.ipa || provisionalSegmentalIpa) : null;
    const prosodyStatus = segment.prosodyStatus || segment.toneStatus || "NOT_ESTABLISHED";
    const profileId = segment.profileId || null;
    // A segmental onset+rime string is not complete Burmese IPA without an
    // established tone/phonation/quantity analysis for an explicit profile.
    const deterministicEstablished = Boolean(deterministicIpa)
      && ["ESTABLISHED", "WELL_SUPPORTED"].includes(segment.status)
      && ["ESTABLISHED", "WELL_SUPPORTED"].includes(prosodyStatus)
      && Boolean(profileId);
    const projectCandidate = deterministicIpa ? typedCandidate(
      "PROJECT_RULES", deterministicIpa,
      deterministicEstablished ? segment.status : "PARTIAL",
      { engine: "project deterministic browser rules", prosody_status: prosodyStatus },
      profileId || "UNSPECIFIED",
    ) : null;
    const epitran = epitranMya(segment.raw, { tones: true });
    const epitranCandidate = epitran.complete && epitran.ipa ? epitran.ipa : null;
    const externalCandidates = epitranCandidate ? [{
      provider: "EPITRAN_PORT", ipa: epitranCandidate,
      typed: typedCandidate("EPITRAN_PORT", epitranCandidate, "PROVISIONAL",
        epitran.provenance || { engine: "Epitran 1.35.3 Burmese mapping port", tones_requested: true }),
    }] : [];
    const candidateAdaptations = [];
    if (projectCandidate && !deterministicEstablished) candidateAdaptations.push({
      provider: "PROJECT_RULES_SEGMENTAL", ipa: deterministicIpa,
      ukrainian: adaptationFor(deterministicIpa), status: "PROVISIONAL",
      completeness: "SEGMENTAL_ONLY", reason: "TONE_OR_PROFILE_NOT_ESTABLISHED",
    });
    if (epitranCandidate) candidateAdaptations.push({
      provider: "EPITRAN_PORT", ipa: epitranCandidate,
      ukrainian: adaptationFor(epitranCandidate), status: "PROVISIONAL",
    });
    const selectedIpa = deterministicEstablished ? deterministicIpa : null;
    const selectedAdaptation = selectedIpa ? adaptationFor(selectedIpa) : null;
    const provisionalAdaptation = !selectedIpa && deterministicIpa
      ? adaptationFor(deterministicIpa) : null;
    return {
      segment, passthrough: false, deterministicIpa, deterministicStatus: segment.status,
      deterministicEstablished, prosodyStatus, profileId, projectCandidate,
      confidenceTier: segment.confidenceTier || (deterministicIpa ? "C" : "D"),
      phoneticCompleteness: deterministicEstablished ? "PROFILE_COMPLETE" : deterministicIpa ? "SEGMENTAL_ONLY" : "UNKNOWN",
      epitran, epitranCandidate, google: { status: "NOT_RUN", ipa: null },
      googleCandidate: null, externalCandidates, candidateAdaptations,
      selectedIpa,
      selectedPhoneticResult: selectedIpa
        ? typedCandidate("PROJECT_RULES", selectedIpa, segment.status,
          { engine: "project deterministic browser rules", source_status: segment.status }, profileId || "UNSPECIFIED")
        : null,
      selectedAdaptation, provisionalAdaptation,
      provisionalPhoneticResult: !selectedIpa ? projectCandidate : null,
      selectedSource: deterministicEstablished ? "PROJECT_RULES"
        : projectCandidate ? "PROJECT_RULES_SEGMENTAL_PREVIEW" : "UNRESOLVED",
      ipaStatus: deterministicEstablished ? segment.status
        : ["UNSUPPORTED", "ANALYSIS_DEPENDENT", "UNCERTAIN"].includes(segment.status) ? segment.status
          : deterministicIpa ? "ANALYSIS_DEPENDENT" : "NOT_ESTABLISHED",
      ukrainianStatus: selectedIpa ? selectedAdaptation.status
        : provisionalAdaptation?.text ? "PROVISIONAL" : "NOT_ESTABLISHED",
      selectedStatus: selectedIpa ? aggregate([segment.status, selectedAdaptation.status])
        : provisionalAdaptation?.text ? "ANALYSIS_DEPENDENT" : "NOT_ESTABLISHED",
      agreement: "NOT_COMPARABLE", comparison: { relation: "NOT_COMPARABLE" },
      comparisonScope: profileId ? "PROJECT_PROFILE_SCOPED_EXTERNAL_SCOPE_UNVERIFIED" : "DIALECT_PROFILE_UNVERIFIED",
      profileStatus: profileId ? "PROJECT_PROFILE_SCOPED" : "NOT_ESTABLISHED",
      selectionReason: deterministicEstablished ? "PROFILE_AND_PROSODY_ESTABLISHED"
        : deterministicIpa ? "TONE_OR_PROFILE_NOT_ESTABLISHED"
          : "NO_COMPLETE_PROJECT_IPA",
      promotionPolicy: "WITHHELD_PENDING_INDEPENDENT_PROFILE_MATCHED_IPA_GOLD",
    };
  });

  // Google is run once per contiguous Myanmar run so its word context survives
  // UI segmentation. Dot boundaries are used only when counts align exactly.
  for (let start = 0; start < records.length;) {
    if (records[start].passthrough) { start++; continue; }
    let end = start;
    while (end < records.length && !records[end].passthrough) end++;
    const raw = records.slice(start, end).map((item) => item.segment.raw).join("");
    const googleRun = transduceGoogleBurmese(raw, googleModel, transduceWfst);
    if (googleRun.status === "CANDIDATE") {
      const pieces = googleRun.ipa.split(".").map((piece) => piece.trim());
      if (pieces.length === end - start && pieces.every(Boolean)) {
        for (let index = start; index < end; index++) {
          const item = records[index], candidate = pieces[index - start];
          item.google = { ...googleRun, ipa: candidate, alignment: "SYLLABLE_ALIGNED" };
          item.googleCandidate = candidate;
          item.externalCandidates.push({
            provider: "GOOGLE_WFST", ipa: candidate,
            typed: typedCandidate("GOOGLE_WFST", candidate, "PROVISIONAL",
              googleRun.provenance || googleModel?.provenance || { engine: "Google Burmese Thrax/OpenFst static model" }),
          });
          item.candidateAdaptations.push({
            provider: "GOOGLE_WFST", ipa: candidate,
            ukrainian: adaptationFor(candidate), status: "PROVISIONAL",
          });
        }
      } else {
        records[start].google = { ...googleRun, alignment: "RUN_LEVEL_ONLY" };
        records[start].googleRunCandidate = googleRun.ipa;
        for (let index = start + 1; index < end; index++) {
          records[index].google = { status: "RUN_LEVEL_NOT_ALIGNED", ipa: null };
        }
      }
    } else {
      for (let index = start; index < end; index++) records[index].google = googleRun;
    }
    start = end;
  }

  for (const item of records) {
    if (item.passthrough) continue;
    const candidates = [
      ...(item.projectCandidate ? [{ provider: "PROJECT_RULES", ipa: item.projectCandidate.raw }] : []),
      ...item.externalCandidates,
    ].filter((candidate) => candidate.ipa);
    if (candidates.length < 2) {
      item.agreement = "NOT_COMPARABLE";
      item.comparison = { relation: "NOT_COMPARABLE" };
    } else {
      const comparisons = candidates.slice(1).map((candidate) =>
        compareIpaCandidates(candidates[0].ipa, candidate.ipa));
      item.comparison = comparisons.find((value) => value.relation === "DIVERGENCE")
        || comparisons.find((value) => value.relation !== "AGREEMENT") || comparisons[0];
      item.agreement = comparisons.every((value) => value.relation === "AGREEMENT")
        ? "AGREEMENT"
        : comparisons.some((value) => value.relation === "DIVERGENCE")
          ? "DIVERGENCE"
          : comparisons.some((value) => value.relation === "SEGMENTAL_AGREEMENT_PROSODY_DIFFERENCE")
            ? "SEGMENTAL_AGREEMENT_PROSODY_DIFFERENCE" : "NOT_COMPARABLE";
    }
  }

  const phonetic = records.filter((item) => !item.passthrough);
  const ipaStatus = aggregate(phonetic.map((item) => item.ipaStatus),
    phonetic.length ? "NOT_ESTABLISHED" : "UNSUPPORTED");
  const ukrainianStatus = aggregate(phonetic.map((item) => item.ukrainianStatus),
    phonetic.length ? "NOT_ESTABLISHED" : "UNSUPPORTED");
  const status = aggregate([ipaStatus, ukrainianStatus],
    phonetic.length ? "NOT_ESTABLISHED" : "UNSUPPORTED");
  const hasGoogle = googleModel?.available === true;
  return {
    // Public result fields are canonical-only. Segmental and provider candidates
    // remain available in candidateAdaptations and are rendered in the explicitly
    // provisional preview panel; they must never leak into the main transcription.
    ipa: records.map((item) => item.passthrough ? item.segment.raw
      : (item.selectedIpa || "?")).join(""),
    uk: records.map((item) => {
      if (item.passthrough) return item.segment.raw;
      const adaptation = item.selectedAdaptation;
      // Match the Lao repository policy: the final Ukrainian field abstains visibly
      // when no canonical adaptation is established. Candidate hints remain in diagnostics.
      return adaptation?.text && !["NOT_ESTABLISHED", "UNSUPPORTED", "UNCERTAIN", "PROVISIONAL"].includes(adaptation.status)
        ? adaptation.text : "???";
    }).join(""),
    status, graphemicStatus: graphemicLayerStatus(phonetic),
    phonologyStatus: phonologyLayerStatus(phonetic), ipaStatus, ukrainianStatus, records,
    providers: {
      project: "ACTIVE · conservative deterministic browser rules",
      epitran: "ACTIVE · Epitran 1.35.3 Burmese mapping port · diagnostic candidate",
      google: hasGoogle ? "ACTIVE · local Google Burmese WFST model" : "PENDING_MODEL · browser interpreter is ready; static FST graph not deployed",
    },
    promotionPolicy: "Only established project IPA is canonical; external candidates remain diagnostic until independent profile-matched gold is available.",
    usedExternalFallback: false,
  };
}

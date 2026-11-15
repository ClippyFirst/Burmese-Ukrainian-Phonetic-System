/**
 * Static-site hybrid orchestrator. All providers run locally in the browser.
 * The deterministic project result remains canonical. Epitran candidates are
 * computed per parsed segment; Google WFST is run over contiguous Myanmar runs
 * so its word/syllable context is not destroyed by the UI segmenter.
 * External outputs are compared and surfaced, never auto-promoted without
 * independent profile-matched IPA adjudication.
 */
import { epitranMya } from "./epitran-mya.js";
import { renderUkrainian } from "./ukrainian-adapter.js";
import { transduceWfst } from "./wfst-runtime.js";
import { transduceGoogleBurmese } from "./google-wfst-input.js";

const STATUS_RANK = {
  ESTABLISHED: 0, WELL_SUPPORTED: 1, PROPOSED: 2, PROVISIONAL: 3,
  ANALYSIS_DEPENDENT: 4, NOT_ESTABLISHED: 5, UNSUPPORTED: 6,
};
function aggregate(statuses, fallback = "NOT_ESTABLISHED") {
  if (!statuses.length) return fallback;
  return statuses.reduce((worst, item) =>
    (STATUS_RANK[item] ?? 5) > (STATUS_RANK[worst] ?? 0) ? item : worst, "ESTABLISHED");
}

export function analyzeHybrid(segments, googleModel = null) {
  const records = segments.map((segment) => {
    if (segment.nonMyanmar) return { segment, passthrough: true };
    const deterministicIpa = segment.ipa || null;
    const deterministicEstablished = Boolean(deterministicIpa)
      && ["ESTABLISHED", "WELL_SUPPORTED"].includes(segment.status);
    const epitran = epitranMya(segment.raw, { tones: true });
    const epitranCandidate = epitran.complete && epitran.ipa ? epitran.ipa : null;
    const candidateAdaptations = epitranCandidate ? [{
      provider: "EPITRAN_PORT", ipa: epitranCandidate,
      ukrainian: renderUkrainian(epitranCandidate), status: "PROVISIONAL",
    }] : [];
    return {
      segment, passthrough: false, deterministicIpa, deterministicStatus: segment.status,
      deterministicEstablished, epitran, epitranCandidate, google: { status: "NOT_RUN", ipa: null },
      googleCandidate: null, externalCandidates: epitranCandidate
        ? [{ provider: "EPITRAN_PORT", ipa: epitranCandidate }] : [],
      candidateAdaptations, agreement: "NOT_COMPARABLE",
      selectedIpa: deterministicEstablished ? deterministicIpa : null,
      selectedSource: deterministicEstablished ? "PROJECT_RULES" : "UNRESOLVED",
      selectedStatus: deterministicEstablished ? (segment.uk?.status || segment.status) : "NOT_ESTABLISHED",
      promotionPolicy: "WITHHELD_PENDING_INDEPENDENT_PROFILE_MATCHED_IPA_GOLD",
    };
  });

  // Invoke Google once per contiguous Myanmar run, preserving context. Its
  // syllable separator "." is used for per-segment alignment only when counts
  // match the structural parser; otherwise retain a word-level candidate.
  for (let start = 0; start < records.length;) {
    if (records[start].passthrough) { start++; continue; }
    let end = start;
    while (end < records.length && !records[end].passthrough) end++;
    const raw = records.slice(start, end).map((item) => item.segment.raw).join("");
    const googleRun = transduceGoogleBurmese(raw, googleModel, transduceWfst);
    if (googleRun.status === "CANDIDATE") {
      const pieces = googleRun.ipa.split(".");
      if (pieces.length === end - start && pieces.every(Boolean)) {
        for (let index = start; index < end; index++) {
          const item = records[index], candidate = pieces[index - start];
          item.google = { ...googleRun, ipa: candidate, alignment: "SYLLABLE_ALIGNED" };
          item.googleCandidate = candidate;
          item.externalCandidates.push({ provider: "GOOGLE_WFST", ipa: candidate });
          item.candidateAdaptations.push({
            provider: "GOOGLE_WFST", ipa: candidate,
            ukrainian: renderUkrainian(candidate), status: "PROVISIONAL",
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
      item.deterministicEstablished ? item.deterministicIpa : null,
      ...item.externalCandidates.map((candidate) => candidate.ipa),
    ].filter(Boolean);
    item.agreement = candidates.length < 2 ? "NOT_COMPARABLE"
      : candidates.every((candidate) => candidate === candidates[0]) ? "AGREEMENT" : "DIVERGENCE";
  }

  const phonetic = records.filter((item) => !item.passthrough);
  const status = aggregate(phonetic.map((item) => item.selectedStatus), phonetic.length ? "NOT_ESTABLISHED" : "UNSUPPORTED");
  const hasGoogle = googleModel?.available === true;
  return {
    ipa: records.map((item) => item.passthrough ? item.segment.raw : (item.segment.ipa || "?")).join(""),
    uk: records.map((item) => item.passthrough ? item.segment.raw
      : (item.segment.uk?.text && !["NOT_ESTABLISHED", "UNSUPPORTED", "UNCERTAIN"].includes(item.segment.uk.status)
        ? item.segment.uk.text : "⟦" + item.segment.raw + "⟧")).join(""),
    status, records,
    providers: {
      project: "ACTIVE · conservative deterministic browser rules",
      epitran: "ACTIVE · Epitran 1.35.3 Burmese mapping port · diagnostic candidate",
      google: hasGoogle ? "ACTIVE · local Google Burmese WFST model" : "PENDING_MODEL · browser interpreter is ready; static FST graph not deployed",
    },
    promotionPolicy: "External candidates remain visible but are not promoted to canonical IPA or Ukrainian output without independent profile-matched gold.",
    usedExternalFallback: false,
  };
}

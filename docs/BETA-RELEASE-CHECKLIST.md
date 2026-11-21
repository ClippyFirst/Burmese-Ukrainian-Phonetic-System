# Burmese public beta release checklist

## Public beta release gate — 2026-11-21

- [x] Exact candidate SHA has successful Python/Node tests, generated-data freshness, package-wheel verification, npm build and production Chromium smoke.
- [x] Exact candidate SHA has successful Pages build/deploy and deployed HTML/JS/CSS smoke verification.
- [x] Both Python and browser contracts preserve partial/unsupported structures; no unsupported medial, conjunct, kinzi, coda, vowel or prosodic material is silently dropped.
- [x] Browser and Python package install instructions work from a clean checkout; npm dependency graph is locked and CI uses `npm ci`.
- [x] UI and README distinguish IPA-first phonetic diagnostics from MLCTS orthographic romanization and label provisional outputs.
- [x] Third-party assets shipped in the browser have source/version/license notices; myG2P, uncleared dictionaries and unresolved source data remain excluded.
- [x] No user text is uploaded; no analytics/telemetry is present.
- [x] Expert gold and empirical accuracy remain NOT ASSESSED; manual accessibility QA is disclosed as not performed.

## Current evidence record

PR #185 is merged as `4ab231eeedfb5ad00b72aebd7418d143ffb10242`. Exact PR-head tests [44906901064](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44906901064) and Pages build [44906901057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44906901057) passed. Exact post-merge main tests [44907208175](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44907208175) and Pages build/deploy [44907208189](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44907208189) passed. The Pages workflow now uses `npm ci` against the committed lockfile.

The system is a usable research beta only within explicit support boundaries. Full Burmese phonology, parser parity, tone/register/phonation, vowel/coda/medial coverage, independent gold and empirical accuracy are not established. These are visible limitations, not hidden release blockers for the beta milestone.

## Commands

```bash
python -m pytest -q
npm ci
npm run build
npm run generate:web && git diff --exit-code -- src/web/generated/data.js
npm test
npm run test:browser:built
```

Use the repository's canonical scripts and CI workflow if command names change. Run all checks on the exact candidate commit. Distinguish code/build success from pronunciation validation.


## Final beta engineering closeout — 2026-11-21

PR #185 merged as `4ab231eeedfb5ad00b72aebd7418d143ffb10242`. It changes the Pages dependency installation to `npm ci` against the existing npm lockfile, adds reproducible local browser-beta instructions, and adds the operational beta release checklist. Exact PR-head tests on `ac4e25ff01d6c0c1e1d0784aa1c72abfac4caaec` passed [44906901064](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44906901064); exact PR-head Pages build passed [44906901057](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44906901057) (deploy correctly skipped on pull_request). Exact post-merge main tests [44907208175](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44907208175) and Pages build/deploy [44907208189](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44907208189) both SUCCESS.

BURMESE-BETA-ENGINEERING-001 — DONE_VERIFIED. Engineering beta gates (tests, wheel contents, generated-data freshness, npm build/tests, production Chromium and Pages deployment) are green on exact main `4ab231eeedfb5ad00b72aebd7418d143ffb10242`. This does not establish full Burmese pronunciation coverage, expert validation or measured accuracy.

BURMESE-GOLD-PILOT-001 — DEFERRED for beta / BLOCKED for expert-validated claims; gold=0, accuracy=null. BURMESE-MANUAL-A11Y-001 — TODO; no human WCAG review. Phonological coverage remains PARTIAL for medials, conjuncts, kinzi, codas, vowel combinations, tone/register/phonation, profile adjudication and full Python/browser parser parity. Third-party rights remain source-specific; myG2P and unclear data are not bundled. No IPA labels, lexical corpus rows or accuracy metrics were added. No GitHub Release was published.


## Final current-main beta verification — 2026-11-21

Latest main SHA: `940a1db63404b0b564b50198369d2e783525219a`. PR #186 merged the final beta status/checklist reconciliation. Exact post-merge tests [44908043970](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44908043970) SUCCESS and Pages build/deploy [44908043967](https://github.com/ClippyFirst/Burmese-Ukrainian-Phonetic-System-/actions/runs/44908043967) SUCCESS. This supersedes the previous exact-main checkpoint at `4ab231eeedfb5ad00b72aebd7418d143ffb10242`.

BURMESE-BETA-ENGINEERING-001 — DONE_VERIFIED on exact main. The project is ready as an engineering beta within documented supported cases. Expert gold remains 0 / accuracy null and is DEFERRED for beta; manual accessibility review remains TODO; phonological coverage remains PARTIAL. No official standard or comprehensive accuracy claim is made. No GitHub Release was published.

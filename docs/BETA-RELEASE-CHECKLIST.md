# Burmese public beta release checklist

## Public beta release gate — 2026-11-21

- [ ] Exact candidate SHA has successful Python/Node tests, generated-data freshness, package-wheel verification, npm build and production Chromium smoke.
- [ ] Exact candidate SHA has successful Pages build/deploy and deployed HTML/JS/CSS smoke verification.
- [ ] Both Python and browser contracts preserve partial/unsupported structures; no unsupported medial, conjunct, kinzi, coda, vowel or prosodic material is silently dropped.
- [ ] Browser and Python package install instructions work from a clean checkout; npm dependency graph is locked and CI uses `npm ci`.
- [ ] UI and README distinguish IPA-first phonetic diagnostics from MLCTS orthographic romanization and label provisional outputs.
- [ ] Third-party assets shipped in the browser have source/version/license notices; myG2P, uncleared dictionaries and unresolved source data remain excluded.
- [ ] No user text is uploaded; no analytics/telemetry is present.
- [ ] Expert gold and empirical accuracy remain NOT ASSESSED; manual accessibility QA is disclosed as not performed.

## Current evidence record

At the time this checklist was added, main `7c02268690ebc8db9f7f9517c0263ce6913c0fab` passed the Python/Node/wheel/build/generated-data/browser test workflow and the Pages build/deploy workflow. The Pages workflow still used `npm install` despite a committed lockfile; the dedicated branch `beta/burmese-reproducible-deps-2026-11-21` changes it to `npm ci`. Exact PR-head and post-merge checks are required before marking that improvement DONE_VERIFIED.

The system is a usable research beta only within explicit support boundaries. Full Burmese phonology, parser parity, tone/register/phonation, vowel/coda/medial coverage, independent gold and empirical accuracy are not established. These are visible limitations, not hidden release blockers for the beta milestone.

## Commands

```bash
python -m pytest -q
python scripts/validate_web_data.py
npm ci
npm run build
npm test
npm run test:browser:built
```

Use the repository's canonical scripts and CI workflow if command names change. Run all checks on the exact candidate commit. Distinguish code/build success from pronunciation validation.

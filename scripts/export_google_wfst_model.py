#!/usr/bin/env python3
"""Convert OpenFst fstprint/fstinfo text into a compact static browser model."""
from __future__ import annotations
import argparse
import hashlib
import json
import re
from pathlib import Path

def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def parse_info(text: str) -> tuple[int, int]:
    match = re.search(r"(?im)^\s*start state\s+(\d+)\s*$", text)
    if not match:
        raise ValueError("fstinfo output does not contain a numeric start state")
    states = re.search(r"(?im)^\s*# of states\s+(\d+)\s*$", text)
    if not states:
        raise ValueError("fstinfo output does not contain a state count")
    return int(match.group(1)), int(states.group(1))

def parse_fstprint(text: str) -> tuple[list[dict], list[dict]]:
    arcs: list[dict] = []
    finals: list[dict] = []
    for number, raw in enumerate(text.splitlines(), 1):
        line = raw.strip()
        if not line:
            continue
        fields = line.split()
        if len(fields) in (1, 2):
            state = int(fields[0])
            weight = float(fields[1]) if len(fields) == 2 else 0.0
            if weight != float("inf"):
                finals.append({"state": state, "weight": weight})
        elif len(fields) in (4, 5):
            src, dst = int(fields[0]), int(fields[1])
            weight = float(fields[4]) if len(fields) == 5 else 0.0
            if weight == float("inf"):
                continue
            arcs.append({
                "src": src, "dst": dst, "ilabel": fields[2],
                "olabel": fields[3], "weight": weight,
            })
        else:
            raise ValueError(f"cannot parse fstprint line {number}: {raw!r}")
    if not arcs or not finals:
        raise ValueError("compiled WFST has no arcs or no final states")
    return arcs, finals

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--fst-print", type=Path, required=True)
    parser.add_argument("--fst-info", type=Path, required=True)
    parser.add_argument("--fst-binary", type=Path, required=True)
    parser.add_argument("--input-symbols", type=Path, required=True)
    parser.add_argument("--output-symbols", type=Path, required=True)
    parser.add_argument("--output", type=Path, required=True)
    parser.add_argument("--source-commit", required=True)
    parser.add_argument("--openfst-commit", required=True)
    parser.add_argument("--thrax-commit", required=True)
    args = parser.parse_args()
    start, state_count = parse_info(args.fst_info.read_text(encoding="utf-8"))
    arcs, finals = parse_fstprint(args.fst_print.read_text(encoding="utf-8"))
    if max(max(a["src"], a["dst"]) for a in arcs) >= state_count:
        raise ValueError("arc state ID exceeds fstinfo state count")
    model = {
        "schema_version": "1.0", "available": True, "start_state": start,
        "state_count": state_count, "arc_count": len(arcs),
        "arcs": arcs, "finals": finals,
        "provenance": {
            "engine": "Google language-resources Burmese Thrax/OpenFst G2P",
            "source_commit": args.source_commit,
            "openfst_commit": args.openfst_commit,
            "thrax_commit": args.thrax_commit,
            "fst_sha256": sha256(args.fst_binary),
            "input_symbols_sha256": sha256(args.input_symbols),
            "output_symbols_sha256": sha256(args.output_symbols),
            "independent_gold_count": 0,
            "accuracy": None,
        },
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(model, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(json.dumps({"states": state_count, "arcs": len(arcs), "finals": len(finals), "bytes": args.output.stat().st_size}))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

#!/usr/bin/env python3
"""Convert OpenFst fstprint output plus its binary header to a static browser model."""
from __future__ import annotations
import argparse
import hashlib
import json
import re
import struct
from pathlib import Path

FST_MAGIC_NUMBER = 2125659606

def sha256(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()

def parse_fst_header(path: Path) -> tuple[int, int, int, str, str]:
    """Read the pinned OpenFst FstHeader fields (little-endian runner format).

    OpenFst serializes int32 magic, two length-prefixed strings, int32 version
    and flags, uint64 properties, then int64 start/numstates/numarcs.
    """
    data = path.read_bytes()
    offset = 0
    def read(fmt: str):
        nonlocal offset
        size = struct.calcsize(fmt)
        if offset + size > len(data):
            raise ValueError("truncated OpenFst binary header")
        value = struct.unpack_from("<" + fmt, data, offset)[0]
        offset += size
        return value
    def read_string() -> str:
        nonlocal offset
        length = read("i")
        if length < 0 or offset + length > len(data):
            raise ValueError("invalid OpenFst header string length")
        value = data[offset:offset + length].decode("utf-8")
        offset += length
        return value
    if read("i") != FST_MAGIC_NUMBER:
        raise ValueError("OpenFst binary magic number mismatch")
    fst_type, arc_type = read_string(), read_string()
    _version, _flags = read("i"), read("i")
    _properties = read("Q")
    start, states, arcs = read("q"), read("q"), read("q")
    if start < 0 or states <= 0 or arcs < 0 or start >= states:
        raise ValueError("invalid OpenFst start/state/arc counts")
    return int(start), int(states), int(arcs), fst_type, arc_type

def parse_info(text: str) -> tuple[int, int]:
    states = re.search(r"(?im)^\s*# of states\s+(\d+)\s*$", text)
    arcs = re.search(r"(?im)^\s*# of arcs\s+(\d+)\s*$", text)
    if not states or not arcs:
        raise ValueError("fstinfo output does not contain numeric state and arc counts")
    return int(states.group(1)), int(arcs.group(1))

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
    start, header_states, header_arcs, fst_type, arc_type = parse_fst_header(args.fst_binary)
    info_states, info_arcs = parse_info(args.fst_info.read_text(encoding="utf-8"))
    arcs, finals = parse_fstprint(args.fst_print.read_text(encoding="utf-8"))
    if (header_states, header_arcs) != (info_states, info_arcs):
        raise ValueError("binary FST header and fstinfo state/arc counts disagree")
    if header_arcs != len(arcs):
        raise ValueError(f"binary FST reports {header_arcs} arcs but fstprint exported {len(arcs)}")
    if max(max(a["src"], a["dst"]) for a in arcs) >= header_states:
        raise ValueError("arc state ID exceeds FST header state count")
    model = {
        "schema_version": "1.0", "available": True, "start_state": start,
        "state_count": header_states, "arc_count": len(arcs),
        "arcs": arcs, "finals": finals,
        "provenance": {
            "engine": "Google language-resources Burmese Thrax/OpenFst G2P",
            "source_commit": args.source_commit,
            "openfst_commit": args.openfst_commit,
            "thrax_commit": args.thrax_commit,
            "fst_type": fst_type, "arc_type": arc_type,
            "fst_sha256": sha256(args.fst_binary),
            "input_symbols_sha256": sha256(args.input_symbols),
            "output_symbols_sha256": sha256(args.output_symbols),
            "independent_gold_count": 0,
            "accuracy": None,
        },
    }
    args.output.parent.mkdir(parents=True, exist_ok=True)
    args.output.write_text(json.dumps(model, ensure_ascii=False, separators=(",", ":")) + "\n", encoding="utf-8")
    print(json.dumps({"start_state": start, "states": header_states, "arcs": len(arcs), "finals": len(finals), "bytes": args.output.stat().st_size}))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())

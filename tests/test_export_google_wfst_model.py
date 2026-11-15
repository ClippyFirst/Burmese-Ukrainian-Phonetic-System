import struct
from pathlib import Path

import pytest

from scripts.export_google_wfst_model import (
    FST_MAGIC_NUMBER,
    parse_fst_header,
    parse_fstprint,
    parse_info,
)


def _write_fst_header(path: Path, *, start=0, states=3, arcs=2):
    def text(value: str) -> bytes:
        encoded = value.encode("utf-8")
        return struct.pack("<i", len(encoded)) + encoded
    header = (
        struct.pack("<i", FST_MAGIC_NUMBER)
        + text("vector")
        + text("standard")
        + struct.pack("<iiQqqq", 1, 0, 0, start, states, arcs)
    )
    path.write_bytes(header)


def test_parse_openfst_binary_header_and_text_dump(tmp_path):
    binary = tmp_path / "G2P.fst"
    _write_fst_header(binary, start=2, states=3, arcs=2)
    assert parse_fst_header(binary) == (2, 3, 2, "vector", "standard")

    states, arcs_count = parse_info("fst type vector\n# of states\t3\n# of arcs\t2\n")
    arcs, finals = parse_fstprint(
        "0\t1\tka\tk\t0.2\n1\t2\t-aa\ta\t0\n2\t0\n"
    )
    assert (states, arcs_count) == (3, 2)
    assert arcs[0] == {"src": 0, "dst": 1, "ilabel": "ka", "olabel": "k", "weight": 0.2}
    assert finals == [{"state": 2, "weight": 0.0}]


def test_parser_rejects_corrupt_header_and_malformed_text(tmp_path):
    corrupt = tmp_path / "bad.fst"
    corrupt.write_bytes(b"not an fst")
    with pytest.raises(ValueError, match="magic number"):
        parse_fst_header(corrupt)

    with pytest.raises(ValueError, match="state and arc counts"):
        parse_info("# of states 2\n")
    with pytest.raises(ValueError, match="cannot parse"):
        parse_fstprint("0 1 ka\n")

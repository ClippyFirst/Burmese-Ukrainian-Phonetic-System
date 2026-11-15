import json
from pathlib import Path
import subprocess
import sys

from scripts.export_google_wfst_model import parse_fstprint, parse_info


def test_parse_openfst_info_and_weighted_text():
    start, states = parse_info("fst type vector\n# of states\t3\nstart state\t0\n")
    arcs, finals = parse_fstprint("0\t1\tka\tk\t0.2\n1\t2\t-aa\ta\t0\n2\t0\n")
    assert (start, states) == (0, 3)
    assert arcs[0] == {"src": 0, "dst": 1, "ilabel": "ka", "olabel": "k", "weight": 0.2}
    assert finals == [{"state": 2, "weight": 0.0}]


def test_parser_rejects_missing_start_state_and_malformed_arc():
    try:
        parse_info("# of states 2\n")
    except ValueError as error:
        assert "start state" in str(error)
    else:
        raise AssertionError("missing start state must fail")
    try:
        parse_fstprint("0 1 ka\n")
    except ValueError as error:
        assert "cannot parse" in str(error)
    else:
        raise AssertionError("malformed FST line must fail")

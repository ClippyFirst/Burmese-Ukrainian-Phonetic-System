#!/usr/bin/env python3
"""Verify that built Python wheels include the canonical Burmese IPA registries."""
from __future__ import annotations

import sys
from pathlib import Path
from zipfile import ZipFile


def main() -> int:
    if len(sys.argv) != 2:
        raise SystemExit("usage: verify_python_wheel.py WHEEL_DIRECTORY")
    directory = Path(sys.argv[1])
    wheels = sorted(directory.glob("*.whl"))
    if len(wheels) != 1:
        raise SystemExit(f"expected exactly one wheel in {directory}, found {len(wheels)}")

    required = {
        "share/burmese-ukrainian-phonetic-system/data/burmese/ipa_onsets.csv",
        "share/burmese-ukrainian-phonetic-system/data/burmese/ipa_vowels.csv",
    }
    with ZipFile(wheels[0]) as archive:
        members = set(archive.namelist())
    missing = {
        suffix for suffix in required
        if not any(name.endswith(suffix) for name in members)
    }
    if missing:
        raise SystemExit(f"wheel is missing canonical IPA registries: {sorted(missing)}")
    print(f"Verified canonical Burmese IPA registries in {wheels[0].name}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())

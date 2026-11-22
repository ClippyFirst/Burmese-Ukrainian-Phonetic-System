from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def test_shared_strictness_vocabulary_maps_to_existing_modes():
    html = (ROOT / "index.html").read_text(encoding="utf-8")
    app = (ROOT / "src" / "web" / "app.js").read_text(encoding="utf-8")
    policy = (ROOT / "docs" / "BETA-RELEASE-POLICY.md").read_text(encoding="utf-8")

    assert '<option value="strict">Strict ·' in html
    assert '<option value="balanced" selected>Soft ·' in html
    assert '<option value="exploratory">Super-soft ·' in html
    assert 'level==="exploratory"' in app
    assert 'level==="strict"' in app
    assert "Confidence tiers A–D are evidence categories" in policy


def test_unresolved_final_ukrainian_marker_is_triple_question_mark():
    app = (ROOT / "src" / "web" / "app.js").read_text(encoding="utf-8")
    rule_engine = (ROOT / "src" / "burmese_ukrainian" / "rule_engine.py").read_text(encoding="utf-8")
    practical = (ROOT / "src" / "burmese_ukrainian" / "practical.py").read_text(encoding="utf-8")

    assert 'sy.provisionalUk=adapted.text+"???";' in app
    assert 'known + "???"' in rule_engine
    assert 'text="???"' in practical

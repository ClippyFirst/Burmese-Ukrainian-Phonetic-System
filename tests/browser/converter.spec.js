import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";

const sharedUnicodeContract = JSON.parse(
  readFileSync(new URL("../fixtures/shared_unicode_contract.json", import.meta.url), "utf8")
);

test("service loads with empty state",async({page})=>{await page.goto("/");await expect(page.locator("h1")).toContainText("Бірманський текст");await expect(page.locator("#empty")).toBeVisible();});
test("example produces result",async({page})=>{await page.goto("/");await page.click("#example");await expect(page.locator("#results")).toBeVisible();await expect(page.locator("#uk")).toBeVisible();await expect(page.locator("#ipa")).toBeVisible();});
test("source is preserved and clear works",async({page})=>{await page.goto("/");await page.locator("#source").fill("မြန်မာ ABC 123");await expect(page.locator("#source")).toHaveValue("မြန်မာ ABC 123");await page.click("#clear");await expect(page.locator("#source")).toHaveValue("");await expect(page.locator("#empty")).toBeVisible();});
test("non-Myanmar material is preserved in output",async({page})=>{await page.goto("/");await page.locator("#source").fill("မြန်မာ ABC 123!");await expect(page.locator("#uk")).toContainText(" ABC 123!");await expect(page.locator("#issues")).toContainText("збережено без змін");});
test("scientific page is reachable",async({page})=>{await page.goto("/system.html");await expect(page.locator("h1")).toContainText("українське читання");});
test("evidence status is not overstated",async({page})=>{await page.goto("/");await page.locator("#source").fill("ကာ");await expect(page.locator("#ipa")).toHaveText("ka");await expect(page.locator("#uk")).toHaveText("ка");await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");await expect(page.locator("#uk-status")).toContainText("українська передача: PROVISIONAL");await expect(page.locator("#hybrid-provider-results")).toContainText("сегментний кандидат: PROJECT_RULES_SEGMENTAL_PREVIEW");await expect(page.locator("#hybrid-provider-results")).not.toContainText("канонічний вибір: PROJECT_RULES_SEGMENTAL_PREVIEW");await expect(page.locator("#hybrid-provider-results")).toContainText("DIALECT_PROFILE_UNVERIFIED");const providerDetails=await page.locator("#hybrid-provider-results").innerText();if(providerDetails.includes("Google WFST: ACTIVE")){await expect(page.locator("#hybrid-provider-results")).toContainText("SEGMENTAL_AGREEMENT_PROSODY_DIFFERENCE");await expect(page.locator("#hybrid-provider-results")).toContainText("TONE_UNDERSPECIFIED_BY_ONE_CANDIDATE");}else{await expect(page.locator("#hybrid-provider-results")).toContainText("Google WFST: MODEL_NOT_DEPLOYED");}await expect(page.locator("#issues")).toBeVisible();});
test("pure non-Myanmar input is not presented as a successful Burmese analysis",async({page})=>{await page.goto("/");await page.locator("#source").fill("ABC 123");await expect(page.locator("#uk")).toHaveText("ABC 123");await expect(page.locator("#uk-status")).toContainText("UNSUPPORTED");});
test("kinzi-containing syllable is withheld rather than guessed",async({page})=>{await page.goto("/");await page.locator("#source").fill("င်္ကာ");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toContainText("⟦");await expect(page.locator("#uk-status")).toContainText("ANALYSIS_DEPENDENT");});
test("unsupported palatal medial is withheld instead of guessed",async({page})=>{await page.goto("/");await page.locator("#source").fill("ကျား");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toHaveText("⟦ကျား⟧");await expect(page.locator("#uk-status")).toContainText("ANALYSIS_DEPENDENT");});
test("closed ော rime with an unsupported medial remains withheld",async({page})=>{await page.goto("/");await page.locator("#source").fill("ကျောင်း");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toHaveText("⟦ကျောင်း⟧");});
test("kinzi belongs to the preceding linguistic syllable",async({page})=>{await page.goto("/");await page.locator("#source").fill("မင်္ဂလာ");await expect(page.locator("#syllables")).toContainText("မင်္");await expect(page.locator("#syllables")).toContainText("ဂ");});
test("ha-to with unsupported medial context is not guessed",async({page})=>{await page.goto("/");await page.locator("#source").fill("ရှ");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toHaveText("⟦ရှ⟧");});

test("nasal coda remains withheld until surface realization is adjudicated",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ပင်");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦ပင်⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("analysis-dependent onset withholds checked-i IPA rather than guessing its rime",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("စိတ်");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦စိတ်⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("closed u with a nasal coda remains withheld pending profile adjudication",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကုန်");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦ကုန်⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("medial wa rimes remain withheld until contextual rules are verified",async({page})=>{await page.goto("/");await page.locator("#source").fill("ကွက် ကွန်");await expect(page.locator("#ipa")).toHaveText("? ?");await expect(page.locator("#uk")).toContainText("⟦ကွက်⟧");await expect(page.locator("#uk")).toContainText("⟦ကွန်⟧");});

test("i+u checked rime remains withheld pending profile adjudication",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကိုက်");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦ကိုက်⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("medial wa with a sonorant coda remains withheld",async({page})=>{await page.goto("/");await page.locator("#source").fill("ဆွမ်း");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toHaveText("⟦ဆွမ်း⟧");});

test("Myanmar Extended-B characters are recognized as Myanmar script, then explicitly marked unsupported",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ꩠ");
  await expect(page.locator("#uk-status")).toContainText("UNSUPPORTED");
  await expect(page.locator("#issues")).not.toContainText("збережено без змін");
});

test("mixed Myanmar and supplementary-block Myanmar material does not silently become ordinary passthrough",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("မြန်မာ ꩠ");
  await expect(page.locator("#uk-status")).toContainText("UNSUPPORTED");
  await expect(page.locator("#issues")).not.toContainText("збережено без змін");
});

test("analysis-dependent aspirated onset is withheld from canonical IPA",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ဆာ");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦ဆာ⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("analysis-dependent theta onset remains withheld from canonical IPA",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("သာ");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦သာ⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("kinzi-coda structure is retained while unsupported IPA is withheld",async({page})=>{await page.goto("/");await page.locator("#source").fill("မင်္ဂလာ");await expect(page.locator("#ipa")).toContainText("?");await expect(page.locator("#syllables")).toContainText("မင်္");await expect(page.locator("#uk-status")).toContainText("ANALYSIS_DEPENDENT");});

test("Burmese punctuation remains preserved around withheld words",async({page})=>{await page.goto("/");await page.locator("#source").fill("ကျောင်း၊ ကျောင်း။");await expect(page.locator("#ipa")).toContainText("?");await expect(page.locator("#uk")).toContainText("၊");await expect(page.locator("#uk")).toContainText("။");await expect(page.locator("#syllables")).not.toContainText("Нерозібраний знак ၊");await expect(page.locator("#syllables")).not.toContainText("Нерозібраний знак ။");});

test("unsupported medial/rime combinations do not leak debug IPA symbols",async({page})=>{await page.goto("/");await page.locator("#source").fill("ကျောင်း စိတ် ပိုက် ကိုက်");await expect(page.locator("#uk")).toContainText("⟦ကျောင်း⟧");await expect(page.locator("#uk")).not.toContainText("∅");});

test("non-Myanmar runs are grouped instead of displayed one character at a time",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ABC 123 — Test #42");
  await expect(page.locator("#syllables .syllable")).toHaveCount(1);
  await expect(page.locator("#syllables .syllable").first()).toContainText("ABC 123 — Test #42");
});

test("မြန်မာ separates into syllable-like clusters without false unsupported-sign warnings",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("မြန်မာ");
  await expect(page.locator("#syllables")).not.toContainText("Нерозібраний знак");
  await expect(page.locator("#syllables")).not.toContainText("UNSUPPORTED");
});

test("whitespace separators are preserved but do not shift Burmese syllable numbering",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကာ မြန်မာ");
  const numbered=await page.locator("#syllables .syllable strong").allTextContents();
  expect(numbered).toEqual(["01  ကာ","02  မြန်","03  မာ"]);
  await expect(page.locator("#syllables")).toContainText("пробіл/перенесення рядка збережено без змін");
  await expect(page.locator("#ipa")).toHaveText("ka ?ma");
  await expect(page.locator("#uk")).toHaveText("ка ⟦မြန်⟧ма");
});

test("provisional Ukrainian mappings are visible in segment-level evidence status",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကာ");
  await expect(page.locator("#uk-status")).toContainText("українська передача: PROVISIONAL");
  await expect(page.locator("#hybrid-provider-results")).toContainText("PROJECT_RULES_SEGMENTAL → ка [PROVISIONAL]");
});

test("a mixed string keeps the most cautious mapping status in the aggregate",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကာ သာ");
  await expect(page.locator("#uk-status")).toContainText("ANALYSIS_DEPENDENT");
});


test("open E vowel sign is analyzed and rendered as a provisional Ukrainian candidate",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကေ");
  await expect(page.locator("#ipa")).toHaveText("ke");
  await expect(page.locator("#uk")).toHaveText("ке");
  await expect(page.locator("#hybrid-provider-results")).toContainText("PROJECT_RULES_SEGMENTAL → ке [PROVISIONAL]");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("the conventional ော် rime remains withheld pending asat-conditioned adjudication",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကော်");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦ကော်⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});

test("the ည် rime after an unsupported ya/ra medial remains withheld",async({page})=>{await page.goto("/");await page.locator("#source").fill("ကြည်");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toHaveText("⟦ကြည်⟧");});

test("the medial-wa plus yat rime remains withheld until verified",async({page})=>{await page.goto("/");await page.locator("#source").fill("စွယ်");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toHaveText("⟦စွယ်⟧");});


test("phonological and Ukrainian-candidate evidence statuses are reported independently",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကာ");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
  await expect(page.locator("#uk-status")).toContainText("українська передача: PROVISIONAL");
});

test("prosodic markers are summarized once instead of repeated in every segment row",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကျောင်း၊ ကျောင်း။");
  await expect(page.locator("#issues")).toContainText("Просодичні знаки збережено в аналітичному шарі");
  await expect(page.locator("#syllables")).not.toContainText("Просодичний/ритмічний знак збережено як аналітичний маркер");
});


test("the medial ra in မြန် remains withheld rather than being dropped",async({page})=>{await page.goto("/");await page.locator("#source").fill("မြန်");await expect(page.locator("#ipa")).toHaveText("?");await expect(page.locator("#uk")).toHaveText("⟦မြန်⟧");});

test("analysis-dependent uu vowel withholds /juː/ and Ukrainian output",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ယူ");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦ယူ⟧");
  await expect(page.locator("#uk-status")).toContainText("IPA: ANALYSIS_DEPENDENT");
});


test("supplementary Myanmar code points are segmented by Unicode code point, not UTF-16 half",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill(String.fromCodePoint(0x116d0));
  await expect(page.locator("#uk-status")).toContainText("UNSUPPORTED");
  await expect(page.locator("#issues")).not.toContainText("збережено без змін");
});


test("shared phonetic-status fixtures preserve analysis-dependent structural uncertainty", async ({page}) => {
  for (const fixture of sharedUnicodeContract.phonetic_status_cases) {
    await page.goto("/");
    await page.locator("#source").fill(fixture.input);
    await expect(page.locator("#ipa"), fixture.id).toHaveText("?");
    await expect(page.locator("#uk-status"), fixture.id).toContainText("IPA: " + fixture.expected_browser_ipa_status);
    await expect(page.locator("#uk"), fixture.id).toContainText("⟦");
  }
});

test("shared structural fixtures preserve kinzi coda syllable boundaries", async ({page}) => {
  for (const fixture of sharedUnicodeContract.structural_cases) {
    await page.goto("/");
    await page.locator("#source").fill(fixture.input);
    const labels = await page.locator("#syllables .syllable strong").allTextContents();
    expect(labels, fixture.id).toEqual(
      fixture.browser.syllables.map((raw, index) => String(index + 1).padStart(2, "0") + "  " + raw)
    );
    await expect(page.locator("#uk-status"), fixture.id).toContainText(
      "IPA: " + fixture.browser.first_ipa_status
    );
    if (fixture.browser.first_note) {
      await expect(page.locator("#syllables"), fixture.id).toContainText(fixture.browser.first_note);
    }
    if (fixture.browser.required_preserved_mark) {
      await expect(page.locator("#syllables"), fixture.id).toContainText(fixture.browser.required_preserved_mark);
    }
  }
});

test("shared Unicode contract fixtures preserve unsupported Myanmar status across runtimes", async ({page}) => {
  for (const fixture of sharedUnicodeContract.cases) {
    await page.goto("/");
    await page.locator("#source").fill(fixture.input);
    await expect(page.locator("#uk-status"), fixture.id).toContainText(fixture.browser.uk_status);
    if (fixture.browser.must_not_report_passthrough) {
      await expect(page.locator("#issues"), fixture.id).not.toContainText("збережено без змін");
    }
  }
});


test("canonically equivalent Myanmar spellings share normalized analysis",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ဦ");
  const firstSyllables=await page.locator("#syllables").innerText();
  const firstIpa=await page.locator("#ipa").innerText();
  await page.locator("#source").fill("ဦ");
  expect(await page.locator("#syllables").innerText()).toBe(firstSyllables);
  expect(await page.locator("#ipa").innerText()).toBe(firstIpa);
});

test("research validation limits are visible to site visitors", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator(".research-notice")).toContainText(/дослідницький прототип/i);
  await expect(page.locator(".research-notice")).toContainText("Незалежного лексичного IPA gold corpus ще немає");
  await expect(page.locator(".research-notice")).toContainText("/h/ → г");
  await page.goto("/system.html");
  await expect(page.locator("#validation-status")).toContainText("0 GOLD IPA");
  await expect(page.locator("#validation-status")).toContainText("STRUCTURAL PROBES");
  await expect(page.locator('#validation-status a[href*="EXECUTION-STATUS-MATRIX-2026-10-21.md"]')).toHaveAttribute("href", /EXECUTION-STATUS-MATRIX-2026-10-21\.md/);
});

test("unresolved anusvara is not silently deleted from browser IPA",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကံ");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦ကံ⟧");
  await expect(page.locator("#uk-status")).toContainText("ANALYSIS_DEPENDENT");
  await expect(page.locator("#syllables")).toContainText("IPA не встановлено");
});

test("unresolved inherent vowel is withheld instead of guessed in browser IPA",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("က");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦က⟧");
  await expect(page.locator("#uk-status")).toContainText("NOT_ESTABLISHED");
  await expect(page.locator("#syllables")).toContainText("Попередня підказка: k → к? [PROVISIONAL]");
});


test("bare consonant bounded by Latin text is withheld even in a multi-token input",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("က A");
  await expect(page.locator("#ipa")).toContainText("?");
  await expect(page.locator("#ipa")).not.toContainText("ka");
  await expect(page.locator("#ipa-status")).toContainText("не встановлено");
});

test("contiguous Myanmar bare clusters retain the existing contextual fallback",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကမ");
  await expect(page.locator("#ipa")).toHaveText("kama");
  await expect(page.locator("#uk")).toHaveText("кама");
  await expect(page.locator("#issues")).toBeVisible();
});

test("romanization uses orthographic MLCTS, not modified phonetic MLCTS2",async({page})=>{
  await page.goto("/");
  expect(await page.evaluate(() => typeof window.mya2rom)).toBe("function");
  await page.locator("#source").fill("မြို့");
  await expect(page.locator("#romanization")).toHaveText("mrui.");
  await expect(page.locator("#romanization-status")).toContainText("Mya2Rom 0.4.4");
  const headings=await page.locator("#results article:not(#hybrid-engine-panel) h3").allTextContents();
  expect(headings.slice(0,3)).toEqual(["Романізація · MLCTS","Українська за романізацією","IPA"]);
});

test("primary navigation exposes the service and methodology pages",async({page})=>{
  await page.goto("/");
  const nav=page.locator(".site-header nav.nav");
  await expect(nav).toBeVisible();
  await expect(nav.getByRole("link",{name:"Сервіс"})).toHaveAttribute("aria-current","page");
  await expect(nav.getByRole("link",{name:"Методологія"})).toHaveAttribute("href","./system.html");
});


test("romanization and phonetic outputs are separate selectable modes",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("မြို့");
  await expect(page.locator("#mode-phonetic")).toHaveAttribute("aria-pressed","true");
  await expect(page.locator("#ipa-panel")).toBeVisible();
  await expect(page.locator("#ua-panel")).toBeVisible();
  await expect(page.locator("#romanization-panel")).toBeHidden();
  await page.locator("#mode-romanization").click();
  await expect(page.locator("#mode-romanization")).toHaveAttribute("aria-pressed","true");
  await expect(page.locator("#romanization-panel")).toBeVisible();
  await expect(page.locator("#ua-romanization-panel")).toBeVisible();
  await expect(page.locator("#ua-romanization-status")).toContainText("PROPOSED");
  await expect(page.locator("#ipa-panel")).toBeHidden();
  await expect(page.locator("#ua-panel")).toBeHidden();
  await page.locator("#mode-phonetic").click();
  await expect(page.locator("#ipa-panel")).toBeVisible();
  await expect(page.locator("#ua-panel")).toBeVisible();
  await expect(page.locator("#romanization-panel")).toBeHidden();
});

test("unsupported Myanmar units remain visible in mixed Ukrainian output",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကာꩠ");
  await expect(page.locator("#source")).toHaveValue("ကာꩠ");
  await expect(page.locator("#syllables")).toContainText("ꩠ");
  await expect(page.locator("#uk")).toHaveText("⟦ကာꩠ⟧");
  await expect(page.locator("#uk-status")).toContainText("UNCERTAIN");
});

test("full Burmese greeting sentence preserves every segmented source unit",async({page})=>{
  const sentence="မင်္ဂလာပါ။ ကျွန်တော့်နာမည် မောင်မောင်ပါ။ ကျွန်တော် မြန်မာနိုင်ငံက လာပါတယ်။ ဘာသာစကားအသစ်တွေကို လေ့လာရတာ ကြိုက်ပါတယ်။";
  await page.goto("/");
  await page.locator("#source").fill(sentence);
  await expect(page.locator("#source")).toHaveValue(sentence);
  await expect(page.locator("#results")).toBeVisible();
  await expect(page.locator("#uk")).not.toHaveText("");
  await expect(page.locator("#ipa")).not.toHaveText("");
  const reconstructed = await page.locator("#syllables .syllable").evaluateAll(rows => rows.map(row => {
    const source = row.querySelector("strong");
    return source ? source.textContent.replace(/^\d+\s+/u, "") : row.textContent.split(" · ")[0];
  }).join(""));
  expect(reconstructed).toBe(sentence.normalize("NFC"));
  await expect(page.locator("#uk")).toContainText("⟦မင်္⟧");
});


test("Myanmar digits and punctuation are preserved in both output modes",async({page})=>{
  const sentence="မင်္ဂလာပါ ABC ၁၂၃၊ မြန်မာစာ။";
  await page.goto("/");
  await page.locator("#source").fill(sentence);
  await page.locator("#mode-romanization").click();
  const romanized=await page.locator("#romanization").textContent();
  expect(romanized).toMatch(/[A-Za-z]/u);
  expect(romanized).toContain("ABC");
  expect(romanized).toContain("၁၂၃");
  expect(romanized).toContain("၊");
  expect(romanized.match(/။/gu) ?? []).toHaveLength(1);
  expect(romanized).not.toMatch(/[\u1000-\u103f\u104c-\u109f]/u);
  await page.locator("#mode-phonetic").click();
  await expect(page.locator("#uk")).toContainText("ABC");
  await expect(page.locator("#uk")).toContainText("၁၂၃");
  await expect(page.locator("#uk")).toContainText("။");
});

test("full Burmese greeting sentence preserves Burmese sentence stops in MLCTS mode",async({page})=>{
  const sentence="မင်္ဂလာပါ။ ကျွန်တော့်နာမည် မောင်မောင်ပါ။ ကျွန်တော် မြန်မာနိုင်ငံက လာပါတယ်။ ဘာသာစကားအသစ်တွေကို လေ့လာရတာ ကြိုက်ပါတယ်။";
  await page.goto("/");
  await page.locator("#source").fill(sentence);
  await page.locator("#mode-romanization").click();
  const romanized=await page.locator("#romanization").textContent();
  expect(romanized).toMatch(/[A-Za-z]/u);
  expect(romanized).toContain(" ");
  expect(romanized).toContain(".");
  expect(romanized.match(/။/gu) ?? []).toHaveLength(4);
  expect(romanized).not.toMatch(/[\u1000-\u103f\u104c-\u109f]/u);
  await expect(page.locator("#ua-romanization-result")).not.toHaveText("");
  await expect(page.locator("#ua-romanization-status")).toContainText(/PROPOSED|PARTIAL/u);
  await expect(page.locator("#output-method-note")).toContainText("MLCTS");
});

test("MLCTS romanization visibly preserves Myanmar characters outside the supported inventory",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကာꩠကာ");
  await page.locator("#mode-romanization").click();
  const romanized=await page.locator("#romanization").textContent();
  expect(romanized).toMatch(/[A-Za-z]/u);
  expect(romanized).toContain("⟦ꩠ⟧");
  await page.locator("#source").fill("ကာ  ာ");
  const orphanSign=await page.locator("#romanization").textContent();
  expect(orphanSign).toContain("⟦ာ⟧");
});


test("browser preserves a multiline mixed-script message around unsupported Myanmar units",async({page})=>{
  const sentence="ကာ\tABC-42\r\n၁၂၃၊။\u200b𑛐 😀 العربية ဂီ";
  // HTML textarea values canonicalize CRLF to LF; compare against that declared browser boundary.
  const browserValue=sentence.replace(/\r\n/gu,"\n").normalize("NFC");
  await page.goto("/");
  await page.locator("#source").fill(sentence);
  await expect(page.locator("#source")).toHaveValue(browserValue);
  await expect(page.locator("#results")).toBeVisible();

  const reconstructed = await page.locator("#syllables .syllable").evaluateAll(rows => rows.map(row => {
    const source = row.querySelector("strong");
    return source ? source.textContent.replace(/^\d+\s+/u, "") : row.textContent.split(" · ")[0];
  }).join(""));
  expect(reconstructed).toBe(browserValue);

  await expect(page.locator("#uk")).toContainText("ABC-42");
  await expect(page.locator("#uk")).toContainText("၁၂၃");
  await expect(page.locator("#uk")).toContainText("𑛐");
  await expect(page.locator("#uk")).toContainText("😀 العربية");
  await expect(page.locator("#uk-status")).toContainText("UNSUPPORTED");
});

test("MLCTS mode renders the separate Ukrainian syllable crosswalk",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကာ ABC");
  await page.locator("#mode-romanization").click();
  await expect(page.locator("#romanization")).not.toHaveText("");
  await expect(page.locator("#ua-romanization-result")).toHaveText("ка ABC");
  await expect(page.locator("#ua-romanization-status")).toContainText("PROPOSED");
  await expect(page.locator("#ipa")).toBeHidden();
});


test("browser keeps the medial-ra nasal coda in one orthographic syllable",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("မြန်");
  const rows=page.locator("#syllables .syllable");
  await expect(rows).toHaveCount(1);
  await expect(rows.first().locator("strong")).toContainText("မြန်");
  await expect(page.locator("#ipa")).toContainText("?");
  await expect(page.locator("#uk")).toContainText("⟦မြန်⟧");
});

test("browser separates မြန်မာ into two syllables, not three",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("မြန်မာ");
  const rows=page.locator("#syllables .syllable");
  await expect(rows).toHaveCount(2);
  await expect(rows.nth(0).locator("strong")).toContainText("မြန်");
  await expect(rows.nth(1).locator("strong")).toContainText("မာ");
  await expect(page.locator("#ipa")).toContainText("?");
});

test("unknown Myanmar extension letters stay attached to the same structural cluster as Python",async({page})=>{
  await page.goto("/");
  const source="ကာ"+String.fromCodePoint(0xAA60);
  await page.locator("#source").fill(source);
  const rows=page.locator("#syllables .syllable");
  await expect(rows).toHaveCount(1);
  await expect(rows.first().locator("strong")).toContainText(source);
  await expect(page.locator("#uk")).toHaveText("⟦"+source+"⟧");
  await expect(page.locator("#uk-status")).toContainText("UNCERTAIN");
});

test("unknown Myanmar extension letter before a supported onset preserves the onset boundary",async({page})=>{
  await page.goto("/");
  const unknown=String.fromCodePoint(0xAA60);
  const source=unknown+"ကာ";
  await page.locator("#source").fill(source);
  const labels=await page.locator("#syllables .syllable strong").allTextContents();
  expect(labels).toEqual(["01  "+unknown,"02  ကာ"]);
  await expect(page.locator("#uk")).toContainText("⟦"+unknown+"⟧");
  await expect(page.locator("#ipa")).toHaveText("?ka");
});


test("unsupported control characters delimit standalone bare consonants like Python", async ({page}) => {
  for (const fixture of sharedUnicodeContract.bare_consonant_boundary_cases) {
    await page.goto("/");
    await page.locator("#source").fill(fixture.input);
    await expect(page.locator("#ipa"), fixture.id).toHaveText(fixture.browser.ipa);
    await expect(page.locator("#uk"), fixture.id).toContainText("⟦");
  }
});


test("browser structural projection matches the shared Python contract",async({page})=>{
  await page.goto("/");
  for(const fixture of sharedUnicodeContract.structural_projection_cases){
    await page.locator("#source").fill(fixture.input);
    const rows=page.locator("#syllables .syllable[data-structure]");
    await expect(rows,fixture.id).toHaveCount(1);
    const projection=JSON.parse(await rows.first().getAttribute("data-structure"));
    expect(projection,fixture.id).toEqual(fixture.python_projection);
  }
});


test("keyboard users can skip the repeated header and reach the main content",async({page})=>{
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip=page.getByRole("link",{name:"Перейти до основного вмісту"});
  await expect(skip).toBeFocused();
  await expect(skip).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});

test("reduced-motion preference disables smooth document scrolling",async({page})=>{
  await page.emulateMedia({reducedMotion:"reduce"});
  await page.goto("/");
  await expect.poll(()=>page.locator("html").evaluate(el=>getComputedStyle(el).scrollBehavior)).toBe("auto");
});


test("methodology page exposes the same keyboard skip navigation",async({page})=>{
  await page.goto("/system.html");
  await page.keyboard.press("Tab");
  const skip=page.getByRole("link",{name:"Перейти до основного вмісту"});
  await expect(skip).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});


test("converter and methodology pages avoid page-level horizontal overflow at narrow viewports",async({page})=>{
  for(const width of [320,375,768]){
    await page.setViewportSize({width,height:800});
    for(const route of ["/","/system.html"]){
      await page.goto(route);
      if(route==="/system.html"&&width===320){
        const tableScroll=await page.locator(".table-wrap").first().evaluate(el=>({
          clientWidth:el.clientWidth,scrollWidth:el.scrollWidth,overflowX:getComputedStyle(el).overflowX
        }));
        expect(tableScroll.scrollWidth).toBeGreaterThan(tableScroll.clientWidth);
        expect(tableScroll.overflowX).toBe("auto");
      }
      const dimensions=await page.evaluate(()=>({
        viewport:document.documentElement.clientWidth,
        document:document.documentElement.scrollWidth,
        offenders:[...document.querySelectorAll("body *")].map(el=>{
          const rect=el.getBoundingClientRect();
          const parents=[];let node=el;
          for(let depth=0;node&&depth<5;depth++,node=node.parentElement){
            const box=node.getBoundingClientRect();const style=getComputedStyle(node);
            parents.push({tag:node.tagName,className:typeof node.className==="string"?node.className:"",width:Math.round(box.width),left:Math.round(box.left),right:Math.round(box.right),clientWidth:node.clientWidth,scrollWidth:node.scrollWidth,overflowX:style.overflowX});
          }
          return {tag:el.tagName,id:el.id,className:typeof el.className==="string"?el.className:"",left:Math.round(rect.left),right:Math.round(rect.right),width:Math.round(rect.width),parents};
        }).filter(el=>el.right>document.documentElement.clientWidth+1||el.left < -1).slice(0,4)
      }));
      expect(dimensions.document,route+" at "+width+"px; offenders="+JSON.stringify(dimensions.offenders)).toBeLessThanOrEqual(dimensions.viewport);
    }
  }
});

test("browser hybrid runs Epitran locally and withholds external candidates from canonical IPA",async({page})=>{
  const external=[];
  page.on("request",request=>{if(new URL(request.url()).origin!== "http://127.0.0.1:4173")external.push(request.url());});
  await page.goto("/");
  await page.locator("#source").fill("မြန်");
  await expect(page.locator("#hybrid-engine-panel")).toBeVisible();
  await expect(page.locator("#hybrid-provider-results")).toContainText("Epitran 1.35.3");
  await expect(page.locator("#hybrid-provider-results")).toContainText("məjaɴ");
  await expect(page.locator("#ipa")).toHaveText("?");
  await expect(page.locator("#uk")).toHaveText("⟦မြန်⟧");
  await expect(page.locator("#hybrid-provider-results")).toContainText("WITHHELD_PENDING_INDEPENDENT_PROFILE_MATCHED_IPA_GOLD");
  expect(external).toEqual([]);
});

test("Google WFST model status is explicit in the browser provider panel",async({page})=>{
  await page.goto("/");
  await page.locator("#source").fill("ကော်");
  const modelResponse=await page.request.get("/models/google-burmese-wfst.json");
  expect(modelResponse.ok()).toBeTruthy();
  const model=await modelResponse.json();
  await expect(page.locator("#hybrid-provider-results")).toContainText(model.available?"ACTIVE · local Google Burmese WFST model":"PENDING_MODEL");
  if (model.available) {
    await expect(page.locator("#hybrid-provider-results")).toContainText("GOOGLE_WFST");
    await expect(page.locator("#hybrid-provider-results")).not.toContainText("MODEL_NOT_DEPLOYED");
  }
});

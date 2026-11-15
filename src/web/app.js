import { ONSETS, VOWELS, SIGNS, MEDIALS, ROMANIZATION_SUPPORTED, ROMANIZATION_BASES } from "./generated/data.js";
import { renderUkrainian } from "./ukrainian-adapter.js";
import { renderMlctsText } from "./romanization-ukrainian.js";
import { analyzeHybrid } from "./hybrid-engine.js";

const source=document.querySelector("#source"), results=document.querySelector("#results"), empty=document.querySelector("#empty");
const issues=document.querySelector("#issues"), issueText=document.querySelector("#issue-text"), count=document.querySelector("#count");
const uk=document.querySelector("#uk"), ipa=document.querySelector("#ipa"), romanization=document.querySelector("#romanization"), syllables=document.querySelector("#syllables");
const ukStatus=document.querySelector("#uk-status"), ipaStatus=document.querySelector("#ipa-status"), live=document.querySelector("#live");
const uaRomanization=document.querySelector("#ua-romanization-result"), uaRomanizationStatus=document.querySelector("#ua-romanization-status");
const modePhonetic=document.querySelector("#mode-phonetic"), modeRomanization=document.querySelector("#mode-romanization"), outputMethodNote=document.querySelector("#output-method-note");
const hybridProviderResults=document.querySelector("#hybrid-provider-results");
let googleWfstModel=null;

function setOutputMode(mode){
  document.querySelectorAll("[data-method-panel]").forEach(panel=>{panel.hidden=panel.dataset.methodPanel!==mode;});
  modePhonetic.classList.toggle("is-active",mode==="phonetic");
  modePhonetic.setAttribute("aria-pressed",String(mode==="phonetic"));
  modeRomanization.classList.toggle("is-active",mode==="romanization");
  modeRomanization.setAttribute("aria-pressed",String(mode==="romanization"));
  outputMethodNote.textContent=mode==="phonetic"
    ?"Гібридний режим у браузері: власні правила + Epitran + локальна Google WFST-модель → IPA-кандидати й українські адаптації. Кандидати PROVISIONAL; жодних серверних API."
     :"Романізаційний режим: Burmese orthography → MLCTS → окрема українська матриця. Нерозпізнані MLCTS-послідовності залишаються видимими; фонетичний результат не використовується як fallback.";
}

const KINZI="င်္", VIRAMA="္", ASAT="်";
const NASAL_CODAS=new Set(["င","န","မ","ည"]);
const CHECKED_CODAS=new Set(["က","ခ","ဂ","ဃ","စ","ဆ","ဇ","ဈ","တ","ထ","ဒ","ဓ","ပ","ဖ","ဗ","ဘ"]);
const MEDIAL_CHARS=new Set(Object.keys(MEDIALS)), VOWEL_CHARS=new Set(Object.keys(SIGNS)), BASE=new Set(Object.keys(ONSETS));
const ROMANIZATION_SUPPORTED_CHARS=new Set(ROMANIZATION_SUPPORTED), ROMANIZATION_BASE_CHARS=new Set(ROMANIZATION_BASES);
function normalize(text){return text.normalize("NFC");}
function isMyanmarCodePoint(n){
  // Myanmar, Myanmar Extended-A/B, and the supplementary Myanmar block.
  // Script recognition is intentionally broader than the supported inventory:
  // unknown Myanmar characters must be reported as unsupported, not passed through.
  return (n>=0x1000&&n<=0x109f)||(n>=0xa9e0&&n<=0xa9ff)||(n>=0xaa60&&n<=0xaa7f)||(n>=0x116d0&&n<=0x116ff);
}
function isMyanmarTextAt(text,index){
  const cp=text.codePointAt(index);
  return isMyanmarCodePoint(cp)&&!(cp>=0x1040&&cp<=0x104b);
}
function widthAt(text,index){return text.codePointAt(index)>0xffff?2:1;}
function romanizeTextPreservingNonMyanmar(text,romanizer){
  let result="",buffer="",bufferIsMyanmar=null;
  const flush=()=>{
    if(!buffer)return;
    if(bufferIsMyanmar){
      const romanized=romanizer(buffer,"mlcts");
      result+=romanized||"⟦"+buffer+"⟧";
    }else{
      result+=buffer;
    }
    buffer="";
  };
  for(let index=0;index<text.length;index+=widthAt(text,index)){
    const character=String.fromCodePoint(text.codePointAt(index));
    const isMyanmarRun=isMyanmarTextAt(text,index);
    const startsMyanmarRun=isMyanmarRun&&(!buffer||bufferIsMyanmar===false);
    if(isMyanmarRun&&(!ROMANIZATION_SUPPORTED_CHARS.has(character)||(startsMyanmarRun&&!ROMANIZATION_BASE_CHARS.has(character)))){
      flush();
      result+="⟦"+character+"⟧";
      bufferIsMyanmar=null;
      continue;
    }
    if(buffer&&isMyanmarRun!==bufferIsMyanmar)flush();
    buffer+=character;
    bufferIsMyanmar=isMyanmarRun;
  }
  flush();
  return result;
}

// Keep ordinary whitespace and punctuation available for text passthrough, but
// never silently preserve invisible C0/C1 controls as if they were user prose.
function isUnsafeControlAt(text,index){
  const cp=text.codePointAt(index);
  return (cp>=0x0000&&cp<=0x0008)||(cp>=0x000b&&cp<=0x000c)||(cp>=0x000e&&cp<=0x001f)||(cp>=0x007f&&cp<=0x009f);
}

function segment(text){
  const s=normalize(text),out=[];let i=0;
  while(i<s.length){
    if(isUnsafeControlAt(s,i)){
      const raw=String.fromCodePoint(s.codePointAt(i));
      out.push({raw,nonMyanmar:false,unsupportedControl:true});i+=widthAt(s,i);continue;
    }
    if(!isMyanmarTextAt(s,i)){
      const start=i;i+=widthAt(s,i);
      while(i<s.length&&!isMyanmarTextAt(s,i)&&!isUnsafeControlAt(s,i))i+=widthAt(s,i);
      out.push({raw:s.slice(start,i),nonMyanmar:true});continue;
    }
    const start=i;let prev=String.fromCodePoint(s.codePointAt(i));i+=widthAt(s,i);
    // Match Python's structural segmentation: once inside a Myanmar run,
    // retain every Myanmar-block code point in the current orthographic unit.
    // Inventory support is a parser concern, not a segmentation boundary;
    // otherwise an unknown extension letter after a valid syllable is split
    // into a synthetic standalone token in the browser but attached as an
    // unparsed tail in Python.
    while(i<s.length&&isMyanmarTextAt(s,i)){
      const ch=String.fromCodePoint(s.codePointAt(i));
      const isCodaBase=BASE.has(ch)&&s[i+ch.length]===ASAT;
      const followsKinzi=s.slice(Math.max(start,i-3),i)===KINZI;
      const startsWithKinzi=s.slice(start,i).startsWith(KINZI);
      const isNewBase=BASE.has(ch)&&!isCodaBase&&(prev!==VIRAMA||(followsKinzi&&!startsWithKinzi));
      if(isNewBase)break;
      prev=ch;i+=widthAt(s,i);
    }
    out.push({raw:s.slice(start,i),nonMyanmar:false});
  }
  return out;
}

function projectStructure(sy){
  const coda=sy.coda&&typeof sy.coda==="object"
    ? {character:sy.coda.character||null,marker:sy.coda.marker||null,orthographic_function:sy.coda.orthographic_function||null}
    : sy.coda
      ? {character:sy.coda,marker:sy.asat?"asat":null,orthographic_function:sy.kinziCoda?"kinzi_final_nasal":"final_consonant"}
      : null;
  const mark=sy.prosodyMarks.find(x=>x==="့"||x==="း");
  const vowelIds={
    "MYANMAR VOWEL SIGN E":"e","MYANMAR VOWEL SIGN I":"i",
    "MYANMAR VOWEL SIGN II":"ii","MYANMAR VOWEL SIGN AI":"ai",
    "MYANMAR VOWEL SIGN U":"u","MYANMAR VOWEL SIGN UU":"uu",
    "MYANMAR VOWEL SIGN TALL AA":"tall_aa","MYANMAR VOWEL SIGN AA":"aa",
    "MYANMAR SIGN ANUSVARA":"anusvara"
  };
  return {
    raw:sy.raw,
    codepoints:Array.from(sy.raw,ch=>"U+"+ch.codePointAt(0).toString(16).toUpperCase().padStart(4,"0")),
    onset:sy.onset||null,
    kinzi:Boolean(sy.kinzi||sy.kinziCoda),
    conjunct:[...sy.conjunct],
    medials:sy.medials.map(m=>MEDIALS[m]?.id||null),
    vowel_signs:sy.vowels.map(v=>vowelIds[SIGNS[v]?.unicode_name]||null),
    inherent_vowel_status:sy.onset?(sy.vowels.length?"overridden":"present_or_contextually_suppressed"):null,
    coda,
    tone_mark:mark==="့"?"dot_below":mark==="း"?"visarga":null,
    analysis_status:sy.structureStatus||"established"
  };
}

function parseCluster(raw,withholdBareInherent=false){
  const sy={raw,onset:null,kinzi:false,conjunct:[],medials:[],vowels:[],asat:false,status:"ESTABLISHED",ipa:null,uk:null,notes:[],prosodyMarks:[]};
  let i=0;
  if(raw.startsWith(KINZI)){sy.kinzi=true;i=3;}
  if(i>=raw.length||!BASE.has(raw[i])){sy.status="UNSUPPORTED";sy.structureStatus="unsupported_or_malformed";sy.structure=projectStructure(sy);sy.notes.push("Не вдалося визначити початкову приголосну.");return sy;}
  sy.onset=raw[i++];
  while(i<raw.length&&raw[i]===VIRAMA){
    if(i+1<raw.length&&BASE.has(raw[i+1])){sy.conjunct.push(raw[i+1]);i+=2;}
    else{sy.status="UNCERTAIN";sy.notes.push("Неповна послідовність virama.");break;}
  }
  while(i<raw.length&&MEDIAL_CHARS.has(raw[i])){
    const medial=raw[i++];
    sy.medials.push(medial);
    // Python records ASAT immediately after medial-ya as a contextual coda.
    // Preserve that structural distinction instead of flattening it to a tail mark.
    if(i<raw.length&&raw[i]===ASAT&&MEDIALS[medial]?.id==="medial_ya"){
      sy.coda={marker:"asat",codepoint:"U+103A",orthographic_function:"contextual"};
      sy.asat=true;
      i++;
      sy.notes.push("Знак asat після medial ya збережено як контекстну фіналь.");
    }
  }
  // Dependent vowels belong to the preceding linguistic syllable; a following
  // kinzi is its final /ŋ/, even though the Unicode sequence is stored before
  // the next written base consonant.
  while(i<raw.length&&VOWEL_CHARS.has(raw[i]))sy.vowels.push(raw[i++]);
  if(i+2<raw.length&&raw.slice(i,i+3)===KINZI){sy.kinziCoda=true;sy.coda="င";i+=3;sy.asat=true;}
  if(!sy.coda&&i+1<raw.length&&BASE.has(raw[i])&&raw[i+1]===ASAT){sy.coda=raw[i];i+=2;sy.asat=true;}
  // A written kinzi after a syllable-final NGA closes the preceding syllable.
  if(sy.coda==="င"&&raw[i]===VIRAMA&&i===raw.length-1){sy.kinziCoda=true;i++;}
  // Canonically equivalent Myanmar strings may place DOT BELOW before ASAT.
  // Read these tail marks without changing the underlying syllable analysis.
  if(!sy.coda){
    let j=i;
    const marks=[];
    while(j<raw.length&&(raw[j]==="ံ"||raw[j]==="့"||raw[j]==="း"))marks.push(raw[j++]);
    if(j+1<raw.length&&BASE.has(raw[j])&&raw[j+1]===ASAT){
      sy.coda=raw[j];i=j+2;sy.asat=true;
      // Do not lose the tone/prosody marks that precede the final consonant.
      sy.prosodyMarks.push(...marks);
      if(marks.length)sy.status="ANALYSIS_DEPENDENT";
      sy.notes.push("Канонічний порядок знаків збережено перед визначенням фіналі.");
    }
  }
  while(i<raw.length){
    if(raw[i]===ASAT){sy.asat=true;if(!sy.coda)sy.coda={marker:"asat",codepoint:"U+103A",orthographic_function:"contextual"};i++;continue;}
    if(raw[i]==="ံ"||raw[i]==="့"||raw[i]==="း"){sy.prosodyMarks.push(raw[i]);sy.status="ANALYSIS_DEPENDENT";i++;continue;}
    sy.status="UNCERTAIN";sy.notes.push("Нерозібраний знак "+raw[i++]);
  }
  // Keep repeated diagnostics deterministic and readable.
  sy.notes=[...new Set(sy.notes)];
  sy.structureStatus=sy.status==="UNSUPPORTED"?"unsupported_or_malformed":sy.status==="UNCERTAIN"?"partially_unparsed":"established";
  sy.structure=projectStructure(sy);
  const isolatedBare=withholdBareInherent&&!sy.vowels.length&&!sy.coda&&!sy.asat&&!sy.medials.length&&!sy.conjunct.length&&!sy.kinzi&&!sy.prosodyMarks.length;
  // Match the Python rule engine: medials, conjuncts and kinzi are parsed
  // structurally but remain outside the validated IPA rule inventory.
  const unsupportedStructure=sy.kinzi||sy.kinziCoda||sy.medials.length>0||sy.conjunct.length>0;
  // Python's canonical IPA adapter withholds codas, asat, anusvara and
  // prosodic marks until their selected-profile surface realizations are
  // adjudicated. Keep the browser boundary equally conservative.
  const unsupportedRime=Boolean(sy.coda||sy.asat||sy.prosodyMarks.length||sy.vowels.some(sign=>SIGNS[sign]?.unicode_name==="MYANMAR SIGN ANUSVARA"));
  const evidenceIncomplete=unsupportedStructure||unsupportedRime;
  sy.ipa=isolatedBare||evidenceIncomplete?null:deriveIpa(sy);
  if(!sy.ipa&&sy.status==="ESTABLISHED")sy.status=evidenceIncomplete?"ANALYSIS_DEPENDENT":"NOT_ESTABLISHED";
  // Separate onset-only preview: never derive Ukrainian directly from Myanmar
  // graphemes and never guess the vowel, coda, medial, kinzi or tone.
  if(!sy.ipa&&withholdBareInherent&&sy.onset&&ONSETS[sy.onset]?.ipa){
    const hint=ONSETS[sy.onset].ipa;
    const adapted=renderUkrainian(hint);
    if(adapted.text){
      sy.provisionalIpa=hint;
      sy.provisionalUk=adapted.text+"?";
      sy.provisionalStatus="PROVISIONAL";
      sy.provisionalRuleId="BURMESE-PREVIEW-ONSET-IPA-V1";
      sy.provisionalPosition="onset";
      sy.provisionalUnresolved=Array.from(raw).slice(1);
      sy.provisionalUnresolvedFeatures=["inherent_vowel"];
    }
  }
  return sy;
}

function deriveIpa(sy){
  const onset=ONSETS[sy.onset];
  // The canonical browser IPA path must obey the same source-registry evidence
  // gate as Python. A graphemic sign can be established orthographically while
  // its phonetic realization remains analysis-dependent.
  if(!onset)return null;
  if(onset.status!=="established"){sy.status="ANALYSIS_DEPENDENT";return null;}
  const vowelIdsByName={
    "MYANMAR VOWEL SIGN E":"e",
    "MYANMAR VOWEL SIGN I":"i",
    "MYANMAR VOWEL SIGN II":"ii",
    "MYANMAR VOWEL SIGN AI":"ai",
    "MYANMAR VOWEL SIGN U":"u",
    "MYANMAR VOWEL SIGN UU":"uu",
    "MYANMAR VOWEL SIGN TALL AA":"tall_aa",
    "MYANMAR VOWEL SIGN AA":"aa",
    "MYANMAR SIGN ANUSVARA":"anusvara",
  };
  if(sy.vowels.some(sign=>{
    const name=SIGNS[sign]?.unicode_name;
    const id=vowelIdsByName[name];
    return !id||VOWELS[id]?.status!=="established";
  })){sy.status="ANALYSIS_DEPENDENT";return null;}
  // The browser parser can recognize anusvara structurally, but its contextual
  // nasal/coda realization is not yet adjudicated. Match the Python adapter's
  // fail-closed boundary rather than mapping the sign to a bare vowel.
  if(sy.vowels.some(sign=>SIGNS[sign]?.unicode_name==="MYANMAR SIGN ANUSVARA"))return null;
  let initial=onset.ipa;const parts=[];
  if(sy.kinzi)parts.push("ŋ");
  const ids=sy.medials.map(m=>MEDIALS[m]?.id).filter(Boolean);
  const has=key=>ids.includes(key);
  const coda=sy.coda;
  // In common Burmese spellings, ည် after a ya/ra-medial onset represents
  // an /ɪ/-like rime rather than a nasal coda. Likewise, ယ် after the E
  // vowel sign is part of the rime in forms such as စွယ်, not a final /j/.
  const iCodaVowel=coda==="ည"&&sy.asat&&(has("medial_ya")||has("medial_ra"))&&!sy.vowels.length;
  const eYatRime=coda==="ယ"&&sy.asat&&(sy.vowels.some(v=>SIGNS[v]?.unicode_name==="MYANMAR VOWEL SIGN E")||(has("medial_wa")&&!sy.vowels.length));
  const awVowel=sy.asat&&!coda&&sy.vowels.some(v=>SIGNS[v]?.unicode_name==="MYANMAR VOWEL SIGN E")&&sy.vowels.some(v=>["MYANMAR VOWEL SIGN AA","MYANMAR VOWEL SIGN TALL AA"].includes(SIGNS[v]?.unicode_name));
  const nasalCoda=!!coda&&NASAL_CODAS.has(coda)&&!iCodaVowel;
  const checkedCoda=!!coda&&CHECKED_CODAS.has(coda);
  if(has("medial_ya")||has("medial_ra")){
    if(initial==="k")initial="tɕ";
    else if(initial==="kʰ")initial="tɕʰ";
    else if(initial==="ɡ")initial="dʑ";
    else if(initial==="ŋ"&&has("medial_ra"))initial="ɲ";
    else if(initial!=="j"&&initial!=="r")initial+="j";
  }
  if(has("medial_ha")){
    const devoiced={m:"m̥",n:"n̥","ŋ":"ŋ̊","ɲ":"ɲ̥",l:"l̥",w:"ʍ"};
    if(initial==="j"||initial==="r")initial="ʃ";
    else if(devoiced[initial])initial=devoiced[initial];
    else return null;
  }
  if(has("medial_wa"))initial+="w";
  parts.push(initial);
  const wa=has("medial_wa");
  const vowelIds=sy.vowels.map(sign=>SIGNS[sign]?.unicode_name).filter(Boolean);
  const hasV=id=>vowelIds.includes(id);
  const closed=!!coda||(sy.asat&&!awVowel&&!eYatRime&&!iCodaVowel);
  let vowel=null;
  if(iCodaVowel){
    vowel="ɪ";
  }else if(eYatRime&&!sy.vowels.length){
    vowel="ɛ";
  }else if(hasV("MYANMAR VOWEL SIGN E")&&(hasV("MYANMAR VOWEL SIGN AA")||hasV("MYANMAR VOWEL SIGN TALL AA"))){
    // ော် is a conventional vowel spelling; its final asat is not a
    // productive checked coda in this pattern.
    vowel=awVowel?"ɔ":closed?(nasalCoda||checkedCoda?"aʊ":null):"ɔ";
  }else if(hasV("MYANMAR VOWEL SIGN E")){
    if(eYatRime)vowel="ɛ";
    else if(wa&&closed)vowel=nasalCoda||checkedCoda?"ɛ":null;
    else vowel="e";
  }else if(hasV("MYANMAR VOWEL SIGN I")&&hasV("MYANMAR VOWEL SIGN U")){
    vowel=closed?"aɪ":"o";
  }else if(hasV("MYANMAR VOWEL SIGN I")){
    if(wa&&closed)vowel=nasalCoda?"ʊ":checkedCoda?"ɛ":null;
    else if(checkedCoda)vowel="eɪ";
    else if(nasalCoda)vowel="ɪ";
    else vowel="i";
  }else if(hasV("MYANMAR VOWEL SIGN II")){
    vowel=closed?"i":"iː";
  }else if(hasV("MYANMAR VOWEL SIGN U")){
    if(wa&&closed)vowel="ʊ";
    else if(closed)vowel="oʊ";
    else vowel="u";
  }else if(hasV("MYANMAR VOWEL SIGN UU")){
    vowel=closed?"oʊ":"uː";
  }else if(hasV("MYANMAR VOWEL SIGN AI")){
    vowel="ɛ";
  }else if(hasV("MYANMAR VOWEL SIGN TALL AA")||hasV("MYANMAR VOWEL SIGN AA")){
    if(wa&&closed)vowel=nasalCoda?"ʊ":checkedCoda?"ɛ":null;
    else vowel="a";
  }else if(hasV("MYANMAR SIGN ANUSVARA")){
    vowel=nasalCoda?"ɪ":"a";
  }
  if(!vowel){
    if(!sy.vowels.length&&wa&&nasalCoda)vowel="ʊ";
    else if(!sy.vowels.length&&wa&&checkedCoda)vowel="ɛ";
    else if(!sy.vowels.length&&!sy.coda&&!sy.asat)vowel="a";
    else if(sy.kinziCoda&&!sy.vowels.length)vowel="ɪ";
    else if(!sy.vowels.length&&nasalCoda&&(has("medial_ya")||has("medial_ra")))vowel="a";
    else if(!sy.vowels.length&&checkedCoda)vowel="a";
    else if(!sy.vowels.length&&nasalCoda)vowel="ɪ";
    else return null;
  }
  parts.push(vowel);
  if(coda&&!iCodaVowel&&!eYatRime){
    if(nasalCoda)parts.push("ɴ");
    else if(checkedCoda)parts.push("ʔ");
    else if(coda==="ယ"||coda==="ရ")parts.push("j");
    else if(coda==="လ")parts.push("l");
    else if(coda==="ဝ")parts.push("w");
    else return null;
  }
  return parts.join("");
}

function isStandaloneBareConsonant(segments,index){
  const current=segments[index];
  if(current.nonMyanmar)return false;
  const chars=Array.from(current.raw);
  if(chars.length!==1||!BASE.has(chars[0]))return false;
  const previous=segments[index-1],next=segments[index+1];
  // Do not apply the single-token guard to adjacent Myanmar clusters: those
  // remain on the existing contextual path until separately adjudicated.
  // Unsupported controls are preserved as explicit invalid segments, but
  // they are still boundaries (not Myanmar phonological neighbours), matching
  // Python's _is_myanmar_phonological_char() check.
  const leftBoundary=!previous||previous.nonMyanmar||previous.unsupportedControl;
  const rightBoundary=!next||next.nonMyanmar||next.unsupportedControl;
  return leftBoundary&&rightBoundary;
}
function convert(text){
  const normalized=normalize(text),segments=segment(normalized);
  const parsed=segments.map((s,index)=>s.nonMyanmar?s:parseCluster(s.raw,isStandaloneBareConsonant(segments,index)));
  return{input:text,normalized,segments:parsed};
}

function render(){
  const text=source.value;count.textContent=[...text].length+" символів";
  if(!text){empty.hidden=false;results.hidden=true;issues.hidden=true;return;}
  const r=convert(text);const hybrid=analyzeHybrid(r.segments,googleWfstModel);empty.hidden=true;results.hidden=false;uk.textContent=hybrid.uk||"—";ipa.textContent=hybrid.ipa||"—";
  romanization.textContent=typeof window.mya2rom==="function" ? romanizeTextPreservingNonMyanmar(text,window.mya2rom) : "Романізатор не завантажився; результат не сформовано.";
  const uaRomanized=typeof window.mya2rom==="function"
    ? renderMlctsText(text,window.mya2rom,segment,char=>ROMANIZATION_SUPPORTED_CHARS.has(char))
    : {text:"⟦MLCTS НЕ ДОСТУПНИЙ⟧",status:"UNSUPPORTED",mapped:0,unsupported:1};
  uaRomanization.textContent=uaRomanized.text||"—";
  uaRomanizationStatus.textContent=uaRomanized.status==="PROPOSED"
    ? "PROPOSED · усі розпізнані склади зіставлено за MLCTS; джерельний інвентар рим походить із Mya2Rom і має статус EVIDENCE_LIMITED."
    : uaRomanized.status==="PARTIAL"
      ? "PARTIAL · зіставлено "+uaRomanized.mapped+" склад(и/ів); непідтримані MLCTS-послідовності позначено ⟦…⟧ і не вгадано. Джерельний інвентар рим має статус EVIDENCE_LIMITED."
      : uaRomanized.status==="UNSUPPORTED"
        ? "UNSUPPORTED · для цього вводу не знайдено достатніх MLCTS відповідників; оригінальні послідовності залишено видимими."
        : "PASSTHROUGH · аналізованих бірманських складів немає; сторонній текст збережено.";
  ukStatus.textContent="Загальний статус: "+hybrid.status+" · IPA: "+hybrid.ipaStatus+" · українська передача: "+hybrid.ukrainianStatus+" · IPA-first гібридний оркестратор: активний.";
  const hasExternalCandidates=hybrid.records.some(item=>!item.passthrough&&item.externalCandidates.length>0);
  const hasSegmentalOnly=hybrid.records.some(item=>!item.passthrough&&item.phoneticCompleteness==="SEGMENTAL_ONLY");
  ipaStatus.textContent=hasSegmentalOnly?"Сегментний IPA-кандидат є, але тон/фонація/довгота або діалектний профіль не встановлені; тому він не стає канонічним. Українська форма показується лише як PROVISIONAL-кандидат через IPA-адаптер.":hasExternalCandidates?"Канонічне IPA формується лише за встановленої сегментної, просодичної та профільної основи; зовнішні кандидати показані окремо. Тональні розбіжності відділено від сегментних.":"Канонічний IPA не встановлено для частини сегментів; невизначеність не замінюється зовнішніми здогадками.";
  hybridProviderResults.replaceChildren();
  const providerIntro=document.createElement("p");providerIntro.className="status-line";providerIntro.textContent="Усі провайдери виконуються локально в браузері. Результати не надсилаються на сервер і не голосують між собою.";hybridProviderResults.append(providerIntro);
  const providerStatus=document.createElement("p");providerStatus.className="status-line";providerStatus.textContent="Наш рушій: "+hybrid.providers.project+" · Epitran: "+hybrid.providers.epitran+" · Google WFST: "+hybrid.providers.google;hybridProviderResults.append(providerStatus);
  hybrid.records.forEach((item)=>{if(item.passthrough)return;const row=document.createElement("div");row.className="syllable";const head=document.createElement("strong");head.textContent=item.segment.raw+" · канонічний вибір: "+item.selectedSource;const detail=document.createElement("span");const ukrainianCandidates=item.candidateAdaptations.map(candidate=>candidate.provider+" → "+(candidate.ukrainian.text||"—")+" [PROVISIONAL]").join(" · ");detail.textContent="Наші правила: "+(item.deterministicIpa||"не встановлено")+" · Epitran: "+(item.epitranCandidate||"немає повного кандидата")+" · Google WFST: "+(item.googleCandidate||item.googleRunCandidate||item.google.status)+" · повнота: "+item.phoneticCompleteness+" · просодія: "+item.prosodyStatus+" · причина вибору: "+item.selectionReason+" · порівняння: "+item.agreement+(item.comparison?.prosody&&item.comparison.prosody!=="NOT_COMPARABLE"?" ("+item.comparison.prosody+")":"")+" · профіль: "+item.comparisonScope+(ukrainianCandidates?" · українські кандидати: "+ukrainianCandidates:"")+" · "+item.promotionPolicy;row.append(head,detail);hybridProviderResults.append(row);});
  syllables.replaceChildren();
  let syllableNumber=0;
  r.segments.forEach(s=>{const row=document.createElement("div");row.className="syllable";
    if(s.nonMyanmar){
      // Preserve separators for source reconstruction, but never count them as
      // linguistic syllables. Make whitespace-only runs explicit in the UI.
      const whitespaceOnly=s.raw.length>0&&/^\s+$/u.test(s.raw);
      row.textContent=s.raw+(whitespaceOnly?" · пробіл/перенесення рядка збережено без змін":" · збережено без змін");
      syllables.append(row);return;
    }
    syllableNumber+=1;
    row.dataset.structure=JSON.stringify(s.structure);
    const hybridRecord=hybrid.records.find(item=>item.segment===s);
    const head=document.createElement("strong");head.textContent=String(syllableNumber).padStart(2,"0")+"  "+s.raw;
    const detail=document.createElement("span");detail.textContent=(hybridRecord?.selectedIpa||"IPA не встановлено")+" → "+(hybridRecord?.selectedAdaptation?.text||"—")+" · IPA: "+(hybridRecord?.ipaStatus||s.status)+" / передача: "+(hybridRecord?.ukrainianStatus||"NOT_ESTABLISHED");row.append(head,detail);
    if(hybridRecord?.externalCandidates.length){const candidates=document.createElement("small");candidates.textContent="Зовнішні IPA-кандидати (не просунуті): "+hybridRecord.externalCandidates.map(candidate=>candidate.provider+": "+candidate.ipa).join(" · ");row.append(candidates);}
    if(s.provisionalIpa){const preview=document.createElement("small");preview.textContent="Попередня підказка: "+s.provisionalIpa+" → "+s.provisionalUk+" [PROVISIONAL]";row.append(preview);}
    if(s.notes.length){const note=document.createElement("small");note.textContent=s.notes.join(" ");row.append(note);}syllables.append(row);
  });
  const problems=hybrid.records.filter(item=>!item.passthrough&&(!item.selectedIpa||["UNCERTAIN","NOT_ESTABLISHED","ANALYSIS_DEPENDENT","UNSUPPORTED"].includes(item.ipaStatus)||["NOT_ESTABLISHED","ANALYSIS_DEPENDENT","UNSUPPORTED","UNCERTAIN"].includes(item.ukrainianStatus)));
  const preserved=r.segments.some(s=>s.nonMyanmar&&s.raw.trim()!=="");issues.hidden=problems.length===0&&!preserved;
  const hasProsody=r.segments.some(s=>!s.nonMyanmar&&s.prosodyMarks?.length);
  issueText.textContent=[problems.length?"Для "+problems.length+" сегмент"+(problems.length===1?"а":"ів")+" результат містить запропоновану або неповністю встановлену відповідність; сервіс не подає її як доведену.":"",preserved?"Латинський текст, цифри, пробіли та пунктуацію збережено без змін; аналізуються лише сегменти Myanmar.":"",hasProsody?"Просодичні знаки збережено в аналітичному шарі; вони не перетворюються автоматично на український наголос.":""].filter(Boolean).join(" ");
  live.textContent="Конвертацію завершено. Статус: "+hybrid.status+"; IPA-first гібридні провайдери виконано.";
}
modePhonetic.addEventListener("click",()=>setOutputMode("phonetic"));
modeRomanization.addEventListener("click",()=>setOutputMode("romanization"));
setOutputMode("phonetic");
source.addEventListener("input",render);
document.querySelector("#example").addEventListener("click",()=>{source.value="ကာ မြန်မာ";render();source.focus();});
document.querySelector("#clear").addEventListener("click",()=>{source.value="";render();source.focus();});
document.querySelectorAll("[data-copy]").forEach(btn=>btn.addEventListener("click",async()=>{const value=document.querySelector("#"+btn.dataset.copy).textContent;try{await navigator.clipboard.writeText(value);btn.textContent="Скопійовано";setTimeout(()=>btn.textContent="Копіювати",1200);}catch{btn.textContent="Не вдалося";}}));
render();
fetch("./models/google-burmese-wfst.json").then(response=>response.ok?response.json():null).then(model=>{if(model?.available===true){googleWfstModel=model;render();}}).catch(()=>{});

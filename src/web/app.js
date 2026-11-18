import { ONSETS, SIGNS, MEDIALS, ROMANIZATION_SUPPORTED, ROMANIZATION_BASES } from "./generated/data.js";
import { renderUkrainian } from "./ukrainian-adapter.js";
import { renderMlctsText } from "./romanization-ukrainian.js";
import { analyzeHybrid } from "./hybrid-engine.js";
import { phonologizeSyllable } from "./phonology.js";

const source=document.querySelector("#source"), results=document.querySelector("#results"), empty=document.querySelector("#empty");
const issues=document.querySelector("#issues"), issueText=document.querySelector("#issue-text"), count=document.querySelector("#count");
const uk=document.querySelector("#uk"), ipa=document.querySelector("#ipa"), romanization=document.querySelector("#romanization"), syllables=document.querySelector("#syllables");
const ukStatus=document.querySelector("#uk-status"), ipaStatus=document.querySelector("#ipa-status"), live=document.querySelector("#live");
const uaRomanization=document.querySelector("#ua-romanization-result"), uaRomanizationStatus=document.querySelector("#ua-romanization-status");
const modePhonetic=document.querySelector("#mode-phonetic"), modeRomanization=document.querySelector("#mode-romanization"), outputMethodNote=document.querySelector("#output-method-note");
const hybridProviderResults=document.querySelector("#hybrid-provider-results");
const hybridCandidatePreviews=document.querySelector("#hybrid-candidate-previews");
const hybridCandidatePreviewList=document.querySelector("#hybrid-candidate-preview-list");
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
  sy.phonology=phonologizeSyllable(sy);
  if(isolatedBare){
    sy.phonology.ipa=null;
    sy.phonology.status="NOT_ESTABLISHED";
    sy.phonology.unresolved_features.unshift("isolated_bare_consonant");
  }
  sy.ipa=sy.phonology.ipa;
  if(!sy.ipa&&sy.status==="ESTABLISHED")sy.status=sy.structureStatus!=="established"?"UNCERTAIN":"ANALYSIS_DEPENDENT";
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
  if(!text){empty.hidden=false;results.hidden=true;issues.hidden=true;hybridCandidatePreviews.hidden=true;hybridCandidatePreviewList.replaceChildren();return;}
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
  ukStatus.textContent="Графеміка: "+hybrid.graphemicStatus+" · фонологія: "+hybrid.phonologyStatus+" · IPA: "+hybrid.ipaStatus+" · українська передача: "+hybrid.ukrainianStatus+" · загальний статус: "+hybrid.status+" · IPA-first гібридний оркестратор: активний.";
  const hasExternalCandidates=hybrid.records.some(item=>!item.passthrough&&item.externalCandidates.length>0);
  const hasSegmentalOnly=hybrid.records.some(item=>!item.passthrough&&item.phoneticCompleteness==="SEGMENTAL_ONLY");
  ipaStatus.textContent=hasSegmentalOnly?"Сегментний IPA-кандидат є, але тон/фонація/довгота або діалектний профіль не встановлені; тому він не стає канонічним. Українська форма показується лише як PROVISIONAL-кандидат через IPA-адаптер.":hasExternalCandidates?"Канонічне IPA не встановлено без сегментної, просодичної та профільної основи; зовнішні кандидати показані окремо. Тональні розбіжності відділено від сегментних.":"Канонічний IPA не встановлено для частини сегментів; невизначеність не замінюється зовнішніми здогадками.";
  hybridProviderResults.replaceChildren();
  const providerIntro=document.createElement("p");providerIntro.className="status-line";providerIntro.textContent="Усі провайдери виконуються локально в браузері. Результати не надсилаються на сервер і не голосують між собою.";hybridProviderResults.append(providerIntro);
  const providerStatus=document.createElement("p");providerStatus.className="status-line";providerStatus.textContent="Наш рушій: "+hybrid.providers.project+" · Epitran: "+hybrid.providers.epitran+" · Google WFST: "+hybrid.providers.google;hybridProviderResults.append(providerStatus);
  hybrid.records.forEach((item)=>{if(item.passthrough)return;const row=document.createElement("div");row.className="syllable";const head=document.createElement("strong");const selectionLabel=item.selectedSource==="PROJECT_RULES_SEGMENTAL_PREVIEW"?"сегментний кандидат":"канонічний вибір";head.textContent=item.segment.raw+" · "+selectionLabel+": "+item.selectedSource;const detail=document.createElement("span");const ukrainianCandidates=item.candidateAdaptations.map(candidate=>candidate.provider+" → "+(candidate.ukrainian.text||"—")+" [PROVISIONAL]").join(" · ");detail.textContent="Наші правила: "+(item.deterministicIpa||"не встановлено")+" · Epitran: "+(item.epitranCandidate||"немає повного кандидата")+" · Google WFST: "+(item.googleCandidate||item.googleRunCandidate||item.google.status)+" · повнота: "+item.phoneticCompleteness+" · просодія: "+item.prosodyStatus+" · причина вибору: "+item.selectionReason+" · порівняння: "+item.agreement+(item.comparison?.prosody&&item.comparison.prosody!=="NOT_COMPARABLE"?" ("+item.comparison.prosody+")":"")+" · профіль: "+item.comparisonScope+(ukrainianCandidates?" · українські кандидати: "+ukrainianCandidates:"")+" · "+item.promotionPolicy;row.append(head,detail);hybridProviderResults.append(row);});
  const previewProviders=["PROJECT_RULES_SEGMENTAL","EPITRAN_PORT","GOOGLE_WFST"];
  const previewRecords=hybrid.records.filter(item=>!item.passthrough);
  const availablePreviewProviders=previewProviders.filter(provider=>previewRecords.some(item=>item.candidateAdaptations.some(candidate=>candidate.provider===provider)));
  hybridCandidatePreviewList.replaceChildren();
  availablePreviewProviders.forEach(provider=>{
    const row=document.createElement("div");row.className="candidate-preview";
    const heading=document.createElement("strong");heading.textContent=provider+" · PROVISIONAL";
    const value=document.createElement("p");value.className="candidate-preview-value";
    value.lang="uk";value.textContent=r.segments.map(segment=>{
      if(segment.nonMyanmar)return segment.raw;
      const record=hybrid.records.find(item=>item.segment===segment);
      if(!record)return "⟦"+segment.raw+"⟧";
      const candidate=record.candidateAdaptations.find(item=>item.provider===provider);
      const adaptation=candidate?.ukrainian||(provider==="PROJECT_RULES_SEGMENTAL"?record.selectedAdaptation:null);
      return adaptation?.text||"⟦"+segment.raw+"⟧";
    }).join("");
    const note=document.createElement("small");note.textContent="Показано лише там, де цей провайдер повернув адаптований IPA-кандидат; ⟦…⟧ означає відсутність придатного кандидата.";
    row.append(heading,value,note);hybridCandidatePreviewList.append(row);
  });
  hybridCandidatePreviews.hidden=availablePreviewProviders.length===0;
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
    row.dataset.phonology=JSON.stringify(s.phonology);
    const hybridRecord=hybrid.records.find(item=>item.segment===s);
    const head=document.createElement("strong");head.textContent=String(syllableNumber).padStart(2,"0")+"  "+s.raw;
    const detail=document.createElement("span");detail.textContent=(hybridRecord?.selectedIpa||hybridRecord?.deterministicIpa||"IPA не встановлено")+" → "+(hybridRecord?.selectedAdaptation?.text||hybridRecord?.provisionalAdaptation?.text||"—")+" · IPA: "+(hybridRecord?.ipaStatus||s.status)+" / передача: "+(hybridRecord?.ukrainianStatus||"NOT_ESTABLISHED");row.append(head,detail);
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

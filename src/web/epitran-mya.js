/**
 * Browser port of Epitran 1.35.3 SimpleEpitran for mya-Mymr.
 * Source mapping: dmort27/epitran@2387d95820d6d9b8f459c35141e6239f4de5dbfb
 * Mapping file SHA-256 recorded by the repository's pinned benchmark:
 * de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4
 *
 * This is a narrow port of the Burmese mapping + greedy matcher + post-rules,
 * not a port of Epitran's Python/PanPhon framework. Unknown Myanmar characters
 * are reported and never silently treated as a valid IPA transcription.
 */
const MAP = `Orth,Phon
က,kə
ခ,kʰə
ဂ,ɡə
ဃ,ɡə
င,ŋə
စ,sə
ဆ,sʰə
ဇ,zə
ဈ,zə
ဉ,ɲə
ည,ɲə
ဋ,tə
ဌ,tʰə
ဍ,də
ဎ,də
ဏ,nə
တ,tə
ထ,tʰə
ဒ,də
ဓ,də
န,nə
ပ,pə
ဖ,pʰə
ဗ,bə
ဘ,bə
မ,mə
ယ,jə
ရ,jə
လ,lə
ဝ,wə
သ,θə
ဟ,hə
ဠ,lə
ကျ,t͡ɕə
ချ,t͡ɕʰə
ဂျ,d͡ʑə
ကြ,t͡ɕə
ခြ,t͡ɕʰə
ဂြ,d͡ʑə
ငြ,d͡ʑə
ငှ,ŋ̥ə
ညှ,ɲ̥ə
ဉှ,ɲ̥ə
နှ,n̥ə
မှ,m̥ə
လှ,ɬə
ဝှ,ʍə
ယှ,ʃə
ရှ,ʃə
အ,ʔə
ဣ,ʔi
ဤ,ʔi
ဥ,ʔu
ဦ,ʔu
ဧ,ʔe
ဩ,ʔɔ
ဪ,ʔɔ
ာ,a
ား,a
်,ɛʔ
င်,ɪɴ
င့်,ɪɴ
င်း,ɪɴ
စ်,ɪʔ
ည်,i
ဉ်,ɪɴ
ည့်,i
ဉ့်,ɪɴ
ည်း,i
ဉ်း,ɪɴ
တ်,aʔ
န်,aɴ
န့်,aɴ
န်း,aɴ
ပ်,aʔ
မ်,aɴ
မ့်,aɴ
မ်း,aɴ
ယ်,ɛ
ံ,aɴ
ံ့,aɴ
ံး,aɴ
ိ,i
ိတ်,eɪʔ
ိန်,eɪɴ
ိန့်,eɪɴ
ိန်း,eɪɴ
ိပ်,eɪʔ
ိမ်,eɪɴ
ိမ့်,eɪɴ
ိမ်း,eɪɴ
ိံ,eɪɴ
ိံ့,eɪɴ
ိံး,eɪɴ
ီ,i
ီး,i
ု,u
ုတ်,oʊʔ
ုန်,oʊɴ
ုန့်,oʊɴ
ုန်း,oʊɴ
ုပ်,oʊʔ
ုမ်,oʊɴ
ုမ့်,oʊɴ
ုမ်း,oʊɴ
ုံ,oʊɴ
ုံ့,oʊɴ
ုံး,oʊɴ
ူ,u
ူး,u
ေ,e
ေ့,e
ေး,e
ဲ,ɛ
ဲ့,ɛ
ော,ɔ
ော်,aʊʔ
ောင်,aʊɴ
ောင့်,aʊɴ
ောင်း,aʊɴ
ော့,ɔ
ို,o
ို်,aɪʔ
ိုင်,aɪɴ
ိုင့်,aɪɴ
ိုင်း,aɪɴ
ို့,o
ိုး,o
ွတ်,ʊʔ
ွန်,ʊɴ
ွန့်,ʊɴ
ွန်း,ʊɴ
ွပ်,ʊʔ
ွမ်,ʊɴ
ွမ့်,ʊɴ
ွမ်း,ʊɴ`;

const mapping = new Map();
for (const line of MAP.split("\n").slice(1)) {
  if (!line) continue;
  const separator = line.indexOf(",");
  mapping.set(line.slice(0, separator).normalize("NFD"), line.slice(separator + 1).normalize("NFD"));
}
const graphemes = [...mapping.keys()].sort((a, b) => Array.from(b).length - Array.from(a).length);
const MEDIAL_RE = /(?:ျွှ|ျွ|ျှ|ျ|ြွှ|ြွ|ြှ|ြ|ွှ|ွ)/gu;
const MEDIAL_TO_IPA = new Map([
  ["ျ", "j"], ["ျှ", "j"], ["ျွ", "w"], ["ျွှ", "w"],
  ["ြ", "j"], ["ြှ", "j"], ["ြွ", "w"], ["ြွှ", "w"],
  ["ွ", "w"], ["ွှ", "w"],
]);
const VOWELS = new Set(["a", "e", "ɛ", "i", "ɪ", "o", "ɔ", "u", "ʊ"]);
const TONE_CONTOURS = /[˩˨˧˦˥]/gu;
const MYANMAR_RE = /[\u1000-\u109f\ua9e0-\ua9ff\uaa60-\uaa7f\u{116d0}-\u{116ff}]/u;

function isMyanmar(char) {
  return MYANMAR_RE.test(char);
}

/** Narrow, inspectable port of Epitran's greedy map and mya-Mymr post-rules. */
export function epitranMya(text, { tones = true } = {}) {
  const source = String(text).normalize("NFD");
  let cursor = 0;
  let raw = "";
  const unknown = [];
  const consumed = [];

  while (cursor < source.length) {
    let matched = null;
    for (const grapheme of graphemes) {
      if (source.startsWith(grapheme, cursor)) {
        matched = grapheme;
        break;
      }
    }
    if (matched !== null) {
      raw += mapping.get(matched);
      consumed.push(matched);
      cursor += matched.length;
      continue;
    }
    const char = String.fromCodePoint(source.codePointAt(cursor));
    if (MEDIAL_TO_IPA.has(char)) {
      raw += char;
      consumed.push(char);
    } else {
      raw += char;
      if (isMyanmar(char)) unknown.push(char);
    }
    cursor += char.length;
  }

  // Epitran mya-Mymr postprocessor: move medial symbols before an /a/,
  // insert /j/ or /w/, then delete schwa before a vowel or at word end.
  let ipa = raw.replace(/(a)(ျွှ|ျွ|ျှ|ျ|ြွှ|ြွ|ြှ|ြ|ွှ|ွ)/gu, "$2$1");
  ipa = ipa.replace(MEDIAL_RE, (medial) => MEDIAL_TO_IPA.get(medial) || medial);
  ipa = ipa.replace(/ə(?=[aeɛiɪoɔuʊ])/gu, "");
  ipa = ipa.replace(/ə$/u, "");
  if (!tones) ipa = ipa.replace(TONE_CONTOURS, "");

  return {
    ipa: ipa.normalize("NFC"),
    raw: raw.normalize("NFC"),
    complete: unknown.length === 0 && !MYANMAR_RE.test(ipa),
    unknown: [...new Set(unknown)],
    consumed,
    provider: "epitran-mya-port",
    version: "1.35.3",
    provenance: {
      upstream: "https://github.com/dmort27/epitran",
      revision: "2387d95820d6d9b8f459c35141e6239f4de5dbfb",
      mapping: "epitran/data/map/mya-Mymr.csv",
      mapping_sha256: "de8660a0cdccb4192993d423342ad775a59ade19b8081829eb70da18f291dfe4",
      postprocessor: "epitran/data/post/mya-Mymr.txt",
      preprocessor_sha256: "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
      postprocessor_sha256: "0eac185c50b19b7c2682d1395afad97a7662a5ff22e2344195eb0d3ffcbed7af",
      license: "MIT",
      profile_match: "NOT_INDEPENDENTLY_ADJUDICATED",
    },
  };
}

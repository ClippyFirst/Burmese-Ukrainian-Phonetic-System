/**
 * Port of the input alphabet used by Google's thrax_g2p UnicodeLabelMaker.
 * The compiled G2P FST accepts Unicode codepoints; my/codepoint.syms names
 * those input labels. UTF8_TO_GRAPHEME is an internal transducer in the grammar,
 * not the FST's external input symbol table.
 * Source: google/language-resources@a90601024f07ab7e96c911243324e0adeb16da96
 */
const CODEPOINT_TO_SYMBOL = new Map([
  [0x1000,"ka"],[0x1001,"kha"],[0x1002,"ga"],[0x1003,"gha"],[0x1004,"nga"],
  [0x1005,"ca"],[0x1006,"cha"],[0x1007,"ja"],[0x1008,"jha"],[0x1009,"nya"],
  [0x100a,"nnya"],[0x100b,"tta"],[0x100c,"ttha"],[0x100d,"dda"],[0x100e,"ddha"],
  [0x100f,"nna"],[0x1010,"ta"],[0x1011,"tha"],[0x1012,"da"],[0x1013,"dha"],
  [0x1014,"na"],[0x1015,"pa"],[0x1016,"pha"],[0x1017,"ba"],[0x1018,"bha"],
  [0x1019,"ma"],[0x101a,"ya"],[0x101b,"ra"],[0x101c,"la"],[0x101d,"wa"],
  [0x101e,"sa"],[0x101f,"ha"],[0x1020,"lla"],[0x1021,"'a"],[0x1022,"1022"],
  [0x1023,"'i"],[0x1024,"'ii"],[0x1025,"'u"],[0x1026,"'uu"],[0x1027,"'e"],
  [0x1028,"1028"],[0x1029,"'o"],[0x102a,"'au"],[0x102b,"-AA"],[0x102c,"-aa"],
  [0x102d,"-i"],[0x102e,"-ii"],[0x102f,"-u"],[0x1030,"-uu"],[0x1031,"-e"],
  [0x1032,"-ai"],[0x1033,"1033"],[0x1034,"1034"],[0x1035,"1035"],[0x1036,"anusvara"],
  [0x1037,"dot"],[0x1038,"visarga"],[0x1039,"1039"],[0x103a,"103A"],
  [0x103b,"103B"],[0x103c,"103C"],[0x103d,"103D"],[0x103e,"103E"],[0x103f,"103F"],
  [0x1040,"my0"],[0x1041,"my1"],[0x1042,"my2"],[0x1043,"my3"],[0x1044,"my4"],
  [0x1045,"my5"],[0x1046,"my6"],[0x1047,"my7"],[0x1048,"my8"],[0x1049,"my9"],
  [0x104a,"little_section"],[0x104b,"section"],[0x104c,"hnaik"],[0x104d,"rwe."],
  [0x104e,"lagaun:"],[0x104f,"'i."],[0x1050,"1050"],[0x1051,"1051"],
  [0x1052,"1052"],[0x1053,"1053"],[0x1054,"1054"],[0x1055,"1055"],
  [0x1056,"1056"],[0x1057,"1057"],[0x1058,"1058"],[0x1059,"1059"],
]);

const HEX_CODEPOINT_RANGES = [
  [0x105a, 0x109f], [0xa9e0, 0xa9ff], [0xaa60, 0xaa7f],
];

function symbolForCodePoint(codePoint) {
  const explicit = CODEPOINT_TO_SYMBOL.get(codePoint);
  if (explicit) return explicit;
  if (HEX_CODEPOINT_RANGES.some(([start, end]) => codePoint >= start && codePoint <= end)) {
    return codePoint.toString(16).toUpperCase();
  }
  return null;
}

export function googleInputSymbols(text) {
  const symbols = [];
  const unsupported = [];
  for (const char of String(text).normalize("NFC")) {
    const symbol = symbolForCodePoint(char.codePointAt(0));
    if (symbol) symbols.push(symbol);
    else unsupported.push(char);
  }
  return { symbols, unsupported, complete: unsupported.length === 0 };
}

export function transduceGoogleBurmese(text, model, transduce) {
  if (!model || model.available !== true) {
    return { status: "MODEL_NOT_DEPLOYED", ipa: null, unsupported: [] };
  }
  const encoded = googleInputSymbols(text);
  if (!encoded.complete) {
    return { status: "UNSUPPORTED", ipa: null, unsupported: encoded.unsupported };
  }
  const result = transduce(encoded.symbols, model);
  return { ...result, input_symbols: encoded.symbols };
}

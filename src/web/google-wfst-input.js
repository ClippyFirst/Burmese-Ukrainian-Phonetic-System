/**
 * Port of Google's Burmese UTF8_TO_GRAPHEME transducer from
 * google/language-resources@a90601024f07ab7e96c911243324e0adeb16da96
 * (my/burmese.grm + my/grapheme.syms). The WFST input alphabet is the grammar's
 * grapheme-symbol table, not the separate n-gram codepoint.syms table.
 */
const CODEPOINT_TO_GRAPHEME = new Map([
  [0x1000,"ka"],[0x1001,"kha"],[0x1002,"ga"],[0x1003,"gha"],[0x1004,"nga"],
  [0x1005,"ca"],[0x1006,"cha"],[0x1007,"ja"],[0x1008,"jha"],[0x1009,"nya"],
  [0x100a,"nnya"],[0x100b,"tta"],[0x100c,"ttha"],[0x100d,"dda"],[0x100e,"ddha"],
  [0x100f,"nna"],[0x1010,"ta"],[0x1011,"tha"],[0x1012,"da"],[0x1013,"dha"],
  [0x1014,"na"],[0x1015,"pa"],[0x1016,"pha"],[0x1017,"ba"],[0x1018,"bha"],
  [0x1019,"ma"],[0x101a,"ya"],[0x101b,"ra"],[0x101c,"la"],[0x101d,"wa"],
  [0x101e,"sa"],[0x101f,"ha"],[0x1020,"lla"],[0x1021,"a"],[0x1022,"shan_a"],
  [0x1023,"i"],[0x1024,"ii"],[0x1025,"u"],[0x1026,"uu"],[0x1027,"e"],
  [0x1028,"mon_e"],[0x1029,"o"],[0x102a,"au"],[0x102b,"-AA"],[0x102c,"-aa"],
  [0x102d,"-i"],[0x102e,"-ii"],[0x102f,"-u"],[0x1030,"-uu"],[0x1031,"-e"],
  [0x1032,"-ai"],[0x1033,"-mon_ii"],[0x1034,"-mon_o"],[0x1035,"-e_above"],
  [0x1036,"anusvara"],[0x1037,"dot"],[0x1038,"visarga"],[0x1039,"virama"],
  [0x103a,"asat"],[0x103b,"-y"],[0x103c,"-r"],[0x103d,"-w"],[0x103e,"-h"],
  [0x103f,"great_sa"],[0x1040,"0"],[0x1041,"1"],[0x1042,"2"],[0x1043,"3"],
  [0x1044,"4"],[0x1045,"5"],[0x1046,"6"],[0x1047,"7"],[0x1048,"8"],[0x1049,"9"],
  [0x104a,"little_section"],[0x104b,"section"],[0x104c,"locative"],
  [0x104d,"completed"],[0x104e,"aforementioned"],[0x104f,"genitive"],
  [0x1050,"sha"],[0x1051,"ssa"],[0x1052,"ri"],[0x1053,"rri"],[0x1054,"li"],
  [0x1055,"lli"],[0x1056,"-ri"],[0x1057,"-rri"],[0x1058,"-li"],[0x1059,"-lli"],
]);

export function googleInputSymbols(text) {
  const symbols = [];
  const unsupported = [];
  for (const char of String(text).normalize("NFC")) {
    const symbol = CODEPOINT_TO_GRAPHEME.get(char.codePointAt(0));
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

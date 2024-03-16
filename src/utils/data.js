const isStorageExist = content => {
  if (!navigator.cookieEnabled) {
    alert(content)
    return false
  } else {
    return true
  }
}

const extractIdzharCharacters = () => [
  'ن اَ', 'نْ اَ', '\u064B \u0627\u064E', '\u064C \u0627\u064E', '\u064D \u0627\u064E', '\u064B \u0627 \u0627\u064E',
  'ن اُ', 'نْ اُ', '\u064B \u0627\u064F', '\u064C \u0627\u064F', '\u064D \u0627\u064F', '\u064B \u0627 \u0627\u064F',
  'ن اِ', 'نْ اِ', '\u064B \u0627\u0650', '\u064C \u0627\u0650', '\u064D \u0627\u0650', '\u064B \u0627 \u0627\u0650',
  'ن ع', 'نْ ع', '\u064B \u0639', '\u064C \u0639', '\u064D \u0639', '\u064B \u0627 \u0639',
  'ن غ', 'نْ غ', '\u064B \u063A', '\u064C \u063A', '\u064D \u063A', '\u064B \u0627 \u063A',
  'ن ح', 'نْ ح', '\u064B \u062D', '\u064C \u062D', '\u064D \u062D', '\u064B \u0627 \u062D',
  'ن خ', 'نْ خ', '\u064B \u062E', '\u064C \u062E', '\u064D \u062E', '\u064B \u0627 \u062E',
  'ن ه', 'نْ ه', '\u064B \u0647', '\u064C \u0647', '\u064D \u0647', '\u064B \u0627 \u0647',
  'نا', 'نْا', '\u064B\u0627', '\u064C\u0627', '\u064D\u0627', '\u064B\u0627\u0627',
  'نع', 'نْع', '\u064B\u0639', '\u064C\u0639', '\u064D\u0639', '\u064B\u0627\u0639',
  'نغ', 'نْغ', '\u064B\u063A', '\u064C\u063A', '\u064D\u063A', '\u064B\u0627\u063A',
  'نح', 'نْح', '\u064B\u062D', '\u064C\u062D', '\u064D\u062D', '\u064B\u0627\u062D',
  'نخ', 'نْخ', '\u064B\u062E', '\u064C\u062E', '\u064D\u062E', '\u064B\u0627\u062E',
  'نه', 'نْه', '\u064B\u0647', '\u064C\u0647', '\u064D\u0647', '\u064B\u0627\u0647'
]

const extractIdghamBigunnahCharacters = () => [
  'ن ي', 'نْ ي', '\u064B \u064A', '\u064C \u064A', '\u064D \u064A', '\u064B \u0627 \u064A', '\u064D \u0627 \u064A',
  'ن ن', 'نْ ن', '\u064B \u0646', '\u064C \u0646', '\u064D \u0646', '\u064B \u0627 \u0646', '\u064D \u0627 \u0646',
  'ن م', 'نْ م', '\u064B \u0645', '\u064C \u0645', '\u064D \u0645', '\u064B \u0627 \u0645', '\u064D \u0627 \u0645',
  'ن و', 'نْ و', '\u064B \u0648', '\u064C \u0648', '\u064D \u0648', '\u064B \u0627 \u0648', '\u064D \u0627 \u0648',
  'ني', 'نْي', '\u064B\u064A', '\u064C\u064A', '\u064D\u064A', '\u064B\u0627\u064A', '\u064D\u0627\u064A',
  'نن', 'نْن', '\u064B\u0646', '\u064C\u0646', '\u064D\u0646', '\u064B\u0627\u0646', '\u064D\u0627\u0646',
  'نم', 'نْم', '\u064B\u0645', '\u064C\u0645', '\u064D\u0645', '\u064B\u0627\u0645', '\u064D\u0627\u0645',
  'نو', 'نْو', '\u064B\u0648', '\u064C\u0648', '\u064D\u0648', '\u064B\u0627\u0648', '\u064D\u0627\u0648'
]

const extractIdghamBilagunnahCharacters = () => [
  'ن ل', 'نْ ل', '\u064B \u0644', '\u064C \u0644', '\u064D \u0644', '\u064B \u0627 \u0644',
  'ن ر', 'نْ ر', '\u064B \u0631', '\u064C \u0631', '\u064D \u0631', '\u064B \u0627 \u0631',
  'نل', 'نْل', '\u064B\u0644', '\u064C\u0644', '\u064D\u0644', '\u064B\u0627\u0644',
  'نر', 'نْر', '\u064B\u0631', '\u064C\u0631', '\u064D\u0631', '\u064B\u0627\u0631'
]

const extractIqlabCharacters = () => ['ن ب', 'نْ ب', 'نب', 'نْب', '\u064B \u0628', '\u064C \u0628', '\u064D \u0628', '\u064B\u0628', '\u064C\u0628', '\u064D\u0628']

const extractIkhfaCharacters = () => [
  'نْة', 'نْ ة', '\u064B \u0629', '\u064C \u0629', '\u064D \u0629', '\u064B\u0627\u0629', '\u064C\u0627\u0629', '\u064D\u0627\u0629', '\u064B\u0627 \u0629', '\u064C\u0627 \u0629', '\u064D\u0627 \u0629', '\u064B \u0627 \u0629', '\u064C \u0627 \u0629', '\u064D \u0627 \u0629',
  'نْت', 'نْ ت', '\u064B \u062A', '\u064C \u062A', '\u064D \u062A', '\u064B\u0627\u062A', '\u064C\u0627\u062A', '\u064D\u0627\u062A', '\u064B\u0627 \u062A', '\u064C\u0627 \u062A', '\u064D\u0627 \u062A', '\u064B \u0627 \u062A', '\u064C \u0627 \u062A', '\u064D \u0627 \u062A',
  'نْث', 'نْ ث', '\u064B \u062B', '\u064C \u062B', '\u064D \u062B', '\u064B\u0627\u062B', '\u064C\u0627\u062B', '\u064D\u0627\u062B', '\u064B\u0627 \u062B', '\u064C\u0627 \u062B', '\u064D\u0627 \u062B', '\u064B \u0627 \u062B', '\u064C \u0627 \u062B', '\u064D \u0627 \u062B',
  'نْج', 'نْ ج', '\u064B \u062C', '\u064C \u062C', '\u064D \u062C', '\u064B\u0627\u062C', '\u064C\u0627\u062C', '\u064D\u0627\u062C', '\u064B\u0627 \u062C', '\u064C\u0627 \u062C', '\u064D\u0627 \u062C', '\u064B \u0627 \u062C', '\u064C \u0627 \u062C', '\u064D \u0627 \u062C',
  'نْد', 'نْ د', '\u064B \u062F', '\u064C \u062F', '\u064D \u062F', '\u064B\u0627\u062F', '\u064C\u0627\u062F', '\u064D\u0627\u062F', '\u064B\u0627 \u062F', '\u064C\u0627 \u062F', '\u064D\u0627 \u062F', '\u064B \u0627 \u062F', '\u064C \u0627 \u062F', '\u064D \u0627 \u062F',
  'نْذ', 'نْ ذ', '\u064B \u0630', '\u064C \u0630', '\u064D \u0630', '\u064B\u0627\u0630', '\u064C\u0627\u0630', '\u064D\u0627\u0630', '\u064B\u0627 \u0630', '\u064C\u0627 \u0630', '\u064D\u0627 \u0630', '\u064B \u0627 \u0630', '\u064C \u0627 \u0630', '\u064D \u0627 \u0630',
  'نْز', 'نْ ز', '\u064B \u0632', '\u064C \u0632', '\u064D \u0632', '\u064B\u0627\u0632', '\u064C\u0627\u0632', '\u064D\u0627\u0632', '\u064B\u0627 \u0632', '\u064C\u0627 \u0632', '\u064D\u0627 \u0632', '\u064B \u0627 \u0632', '\u064C \u0627 \u0632', '\u064D \u0627 \u0632',
  'نْس', 'نْ س', '\u064B \u0633', '\u064C \u0633', '\u064D \u0633', '\u064B\u0627\u0633', '\u064C\u0627\u0633', '\u064D\u0627\u0633', '\u064B\u0627 \u0633', '\u064C\u0627 \u0633', '\u064D\u0627 \u0633', '\u064B \u0627 \u0633', '\u064C \u0627 \u0633', '\u064D \u0627 \u0633',
  'نْش', 'نْ ش', '\u064B \u0634', '\u064C \u0634', '\u064D \u0634', '\u064B\u0627\u0634', '\u064C\u0627\u0634', '\u064D\u0627\u0634', '\u064B\u0627 \u0634', '\u064C\u0627 \u0634', '\u064D\u0627 \u0634', '\u064B \u0627 \u0634', '\u064C \u0627 \u0634', '\u064D \u0627 \u0634',
  'نْص', 'نْ ص', '\u064B \u0635', '\u064C \u0635', '\u064D \u0635', '\u064B\u0627\u0635', '\u064C\u0627\u0635', '\u064D\u0627\u0635', '\u064B\u0627 \u0635', '\u064C\u0627 \u0635', '\u064D\u0627 \u0635', '\u064B \u0627 \u0635', '\u064C \u0627 \u0635', '\u064D \u0627 \u0635',
  'نْض', 'نْ ض', '\u064B \u0636', '\u064C \u0636', '\u064D \u0636', '\u064B\u0627\u0636', '\u064C\u0627\u0636', '\u064D\u0627\u0636', '\u064B\u0627 \u0636', '\u064C\u0627 \u0636', '\u064D\u0627 \u0636', '\u064B \u0627 \u0636', '\u064C \u0627 \u0636', '\u064D \u0627 \u0636',
  'نْط', 'نْ ط', '\u064B \u0637', '\u064C \u0637', '\u064D \u0637', '\u064B\u0627\u0637', '\u064C\u0627\u0637', '\u064D\u0627\u0637', '\u064B\u0627 \u0637', '\u064C\u0627 \u0637', '\u064D\u0627 \u0637', '\u064B \u0627 \u0637', '\u064C \u0627 \u0637', '\u064D \u0627 \u0637',
  'نْظ', 'نْ ظ', '\u064B \u0638', '\u064C \u0638', '\u064D \u0638', '\u064B\u0627\u0638', '\u064C\u0627\u0638', '\u064D\u0627\u0638', '\u064B\u0627 \u0638', '\u064C\u0627 \u0638', '\u064D\u0627 \u0638', '\u064B \u0627 \u0638', '\u064C \u0627 \u0638', '\u064D \u0627 \u0638',
  'نْف', 'نْ ف', '\u064B \u0641', '\u064C \u0641', '\u064D \u0641', '\u064B\u0627\u0641', '\u064C\u0627\u0641', '\u064D\u0627\u0641', '\u064B\u0627 \u0641', '\u064C\u0627 \u0641', '\u064D\u0627 \u0641', '\u064B \u0627 \u0641', '\u064C \u0627 \u0641', '\u064D \u0627 \u0641',
  'نْق', 'نْ ق', '\u064B \u0642', '\u064C \u0642', '\u064D \u0642', '\u064B\u0627\u0642', '\u064C\u0627\u0642', '\u064D\u0627\u0642', '\u064B\u0627 \u0642', '\u064C\u0627 \u0642', '\u064D\u0627 \u0642', '\u064B \u0627 \u0642', '\u064C \u0627 \u0642', '\u064D \u0627 \u0642',
  'نْك', 'نْ ك', '\u064B \u0643', '\u064C \u0643', '\u064D \u0643', '\u064B\u0627\u0643', '\u064C\u0627\u0643', '\u064D\u0627\u0643', '\u064B\u0627 \u0643', '\u064C\u0627 \u0643', '\u064D\u0627 \u0643', '\u064B \u0627 \u0643', '\u064C \u0627 \u0643', '\u064D \u0627 \u0643',
  'نْک', 'نْ ک', '\u064B \u06A9', '\u064C \u06A9', '\u064D \u06A9', '\u064B\u0627\u06A9', '\u064C\u0627\u06A9', '\u064D\u0627\u06A9', '\u064B\u0627 \u06A9', '\u064C\u0627 \u06A9', '\u064D\u0627 \u06A9', '\u064B \u0627 \u06A9', '\u064C \u0627 \u06A9', '\u064D \u0627 \u06A9'
]

const extractIdzharSyafawiCharacters = () => [/م (?!([مب]))/gm, /مْ (?!([مب]))/gm, /مْ(?!([مب]))/gm]

const extractIkhfaSyafawiCharacters = () => ['م ب', 'مْ ب', 'مب', 'مْب']

const extractIdghamMimiCharacters = () => ['م م', 'مْ م', 'مم', 'مْم']

const extractIdghamMutamasilainCharacters = () => [
  [...extractIdghamMimiCharacters()],
  'تْ ت', 'تْت',
  'دْ د', 'دْد',
  'فْ ف', 'فْف',
  'بْ ب', 'بْب',
  'لْ ل', 'لْل'
]

const extractIdghamMutajaanisainCharacters = () => [
  'ﺕْط', 'ﺕْ ط', 'ﺕْد', 'ﺕْ د', 'دْﺕ', 'دْ ﺕ', 'ذْﻅ', 'ذْ ﻅ', 'طْﺕ', 'طْ ﺕ', 'لْر', 'لْ ر'
]

const extractIdghamMutaqooribainCharacters = () => ['بْم', 'بْ م', 'ﺕْﺙ', 'ﺕْ ﺙ', 'ﺙْذ', 'ﺙْ ذ', 'ﻕْك', 'ﻕْ ك']

const extractGunnahCharacters = () => ['نّ', 'نَّ', 'نِّ', 'نُّ', 'مّ', 'مَّ', 'مِّ', 'مُّ']

const extractIdzharQamariyahCharacters = () => [
  'الع', 'الب', 'الج', 'الح', 'الخ', 'الع', 'الغ',
  'الْع', 'الْب', 'الْج', 'الْح', 'الْخ', 'الْع', 'الْغ',
  'الف', 'الق', 'الك', 'الم', 'الو', 'اله', 'الي',
  'الْف', 'الْق', 'الْك', 'الْم', 'الْو', 'الْه', 'الْي',
  'االع', 'االب', 'االج', 'االح', 'االخ', 'االع', 'االغ',
  'االْع', 'االْب', 'االْج', 'االْح', 'االْخ', 'االْع', 'االْغ',
  'االف', 'االق', 'االك', 'االم', 'االو', 'االه', 'االي',
  'االْف', 'االْق', 'االْك', 'االْم', 'االْو', 'االْه', 'االْي'
]

const extractIdghamSyamsiyahCharacters = () => [
  'الت', 'الث', 'الد', 'الذ', 'الر', 'الز', 'الس', 'الش', 'الص', 'الض', 'الط', 'الظ', 'الل', 'الن',
  'الْت', 'الْث', 'الْد', 'الْذ', 'الْر', 'الْز', 'الْس', 'الْش', 'الْص', 'الْض', 'الْط', 'الْظ', 'الْل', 'الْن',
  'االت', 'االث', 'االد', 'االذ', 'االر', 'االز', 'االس', 'االش', 'االص', 'االض', 'االط', 'االظ', 'االل', 'االن',
  'االْت', 'االْث', 'االْد', 'االْذ', 'االْر', 'االْز', 'االْس', 'االْش', 'االْص', 'االْض', 'االْط', 'االْظ', 'االْل', 'االْن'
]

const extractQalqalahSughraCharacters = () => [
  'بْ', 'جْ', 'دْ', 'طْ', 'قْ',
  // 'ب', 'ج', 'د', 'ط', 'ق'
]

const extractQalqalahKubraCharacters = () => [
  '\u0628\u0651[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C\u0651[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F\u0651[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637\u0651[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642\u0651[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5',
  '\u0628\u0651[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C\u0651[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F\u0651[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637\u0651[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642\u0651[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5',
  '\u0628\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5',
  '\u0628\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5',
  '\u0628\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642\u06DF[\u06D6-\u06DB]|\u0660|\u06F0|\u06E5',
  '\u0628\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642\u06DF [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5',
  '\u0628[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642[\u064E-\u0650][\u06D6-\u06DB]|\u0660|\u06F0|\u06E5',
  '\u0628[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062C[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u062F[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0637[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5', '\u0642[\u064E-\u0650] [\u06D6-\u06DB]|\u0660|\u06F0|\u06E5'
]

const extractMadThabiiCharacters = () => [
  /\u064E\u0627(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u064E \u0627(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm,
  /\u064F\u0648\u0652(?![\u0621-\u0627])/gm, /\u064F \u0648\u0652 (?![\u0621-\u0627])/gm, /\u064F\u0648\u06DF/gm, /\u064F \u0648\u06DF/gm,
  /\u064F\u0648(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u064F \u0648(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm, /\u064F\u0648(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u064F \u0648(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm,
  /\u0650\u064A\u0652(?![\u0621-\u0627])/gm, /\u0650 \u064A\u0652 (?![\u0621-\u0627])/gm, /\u0650\u064A\u06DF/gm, /\u0650 \u064A\u06DF/gm,
  /\u0650\u064A(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u0650 \u064A(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm, /\u0650\u064A(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u0650 \u064A(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm,
  /\u0656(?![\u0621-\u0627])/gm, /\u0670(?![\u0621-\u0627])/gm, /\u0657(?![\u0621-\u0627])/gm,
  /(?![\u0625\u0627\u0647])\u0656(?![\u0653\u06E4])/gm, /(?![\u0623\u0627\u0647])\u0670(?![\u0653\u06E4])/gm, /(?![\u0623\u0627\u0647])\u0657(?![\u0653\u06E4])/gm,
  /لاَ(?![\u0653\u06E4])/gm, /لله/gm
]

const madThabiiChars = [
  /\u064E\u0627(?![\u064B-\u065F])/gm, /\u064E \u0627(?![\u064B-\u065F]) /gm,
/\u064F\u0648\u0652/gm, /\u064F \u0648\u0652 /gm, /\u064F\u0648\u06DF/gm, /\u064F \u0648\u06DF/gm,
/\u064F\u0648(?![\u064B-\u065F])/gm, /\u064F \u0648(?![\u064B-\u065F]) /gm, /\u064F\u0648(?![\u064B-\u065F])/gm, /\u064F \u0648(?![\u064B-\u065F]) /gm,
/\u0650\u064A\u0652/gm, /\u0650 \u064A\u0652 /gm, /\u0650\u064A\u06DF/gm, /\u0650 \u064A\u06DF/gm,
/\u0650\u064A(?![\u064B-\u065F])/gm, /\u0650 \u064A(?![\u064B-\u065F]) /gm, /\u0650\u064A(?![\u064B-\u065F])/gm, /\u0650 \u064A(?![\u064B-\u065F]) /gm,
/\u0656/gm, /\u0670/gm, /\u0657/gm,
/\u0656/gm, /\u0670/gm, /\u0657/gm,
/لاَ/gm
]

const extractMadWajibCharacters = () => {
  const madWajibTrimmed = madThabiiChars.map(regex => new RegExp(`${regex.source}\u0621`, 'gm'))
  const madWajib = madThabiiChars.map(regex => new RegExp(`${regex.source} \u0621`, 'gm'))
  const madWajibDiacriticTrimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605').replace('\u0648', '\u0648\u0605').replace('\u064A', '\u064A\u0605')}\u0621`, 'gm'))
  const madWajibDiacritic = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605').replace('\u0648', '\u0648\u0605').replace('\u064A', '\u064A\u0605')} \u0621`, 'gm'))
  const madWajibDiacritic2Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0653').replace('\u0648', '\u0648\u0653').replace('\u064A', '\u064A\u0653')}\u0621`, 'gm'))
  const madWajibDiacritic2 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0653').replace('\u0648', '\u0648\u0653').replace('\u064A', '\u064A\u0653')} \u0621`, 'gm'))
  const madWajibDiacritic3Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0622').replace('\u0648', '\u0648\u0622').replace('\u064A', '\u064A\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic3 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0622').replace('\u0648', '\u0648\u0622').replace('\u064A', '\u064A\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic4Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u0652', '\u0648\u0652\u0605').replace('\u0648\u0652', '\u0648\u0652\u0653').replace('\u0648\u0652', '\u0648\u0652\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic4 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u0652', '\u0648\u0652\u0605').replace('\u0648\u0652', '\u0648\u0652\u0653').replace('\u0648\u0652', '\u0648\u0652\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic5Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u06DF', '\u0648\u06DF\u0605').replace('\u0648\u06DF', '\u0648\u06DF\u0653').replace('\u0648\u06DF', '\u0648\u06DF\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic5 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u06DF', '\u0648\u06DF\u0605').replace('\u0648\u06DF', '\u0648\u06DF\u0653').replace('\u0648\u06DF', '\u0648\u06DF\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic6Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u0652', '\u064A\u0652\u0605').replace('\u064A\u0652', '\u064A\u0652\u0653').replace('\u064A\u0652', '\u064A\u0652\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic6 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u0652', '\u064A\u0652\u0605').replace('\u064A\u0652', '\u064A\u0652\u0653').replace('\u064A\u0652', '\u064A\u0652\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic7Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u06DF', '\u064A\u06DF\u0605').replace('\u064A\u06DF', '\u064A\u06DF\u0653').replace('\u064A\u06DF', '\u064A\u06DF\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic7 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u06DF', '\u064A\u06DF\u0605').replace('\u064A\u06DF', '\u064A\u06DF\u0653').replace('\u064A\u06DF', '\u064A\u06DF\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic8Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u06E4').replace('\u0648', '\u0648\u06E4').replace('\u064A', '\u064A\u06E4')}\u0621`, 'gm'))
  const madWajibDiacritic8 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u06E4').replace('\u0648', '\u0648\u06E4').replace('\u064A', '\u064A\u06E4')} \u0621`, 'gm'))
  const madWajibDiacritic9Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0622').replace('\u0648', '\u0648\u0622').replace('\u064A', '\u064A\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic9 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0622').replace('\u0648', '\u0648\u0622').replace('\u064A', '\u064A\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic10Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u0652', '\u0648\u0652\u0605').replace('\u0648\u0652', '\u0648\u0652\u06E4').replace('\u0648\u0652', '\u0648\u0652\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic10 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u0652', '\u0648\u0652\u0605').replace('\u0648\u0652', '\u0648\u0652\u06E4').replace('\u0648\u0652', '\u0648\u0652\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic11Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u06DF', '\u0648\u06DF\u0605').replace('\u0648\u06DF', '\u0648\u06DF\u06E4').replace('\u0648\u06DF', '\u0648\u06DF\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic11 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0648\u06DF', '\u0648\u06DF\u0605').replace('\u0648\u06DF', '\u0648\u06DF\u06E4').replace('\u0648\u06DF', '\u0648\u06DF\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic12Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u0652', '\u064A\u0652\u0605').replace('\u064A\u0652', '\u064A\u0652\u06E4').replace('\u064A\u0652', '\u064A\u0652\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic12 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u0652', '\u064A\u0652\u0605').replace('\u064A\u0652', '\u064A\u0652\u06E4').replace('\u064A\u0652', '\u064A\u0652\u0622')} \u0621`, 'gm'))
  const madWajibDiacritic13Trimmed = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u06DF', '\u064A\u06DF\u0605').replace('\u064A\u06DF', '\u064A\u06DF\u06E4').replace('\u064A\u06DF', '\u064A\u06DF\u0622')}\u0621`, 'gm'))
  const madWajibDiacritic13 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u064A\u06DF', '\u064A\u06DF\u0605').replace('\u064A\u06DF', '\u064A\u06DF\u06E4').replace('\u064A\u06DF', '\u064A\u06DF\u0622')} \u0621`, 'gm'))
  const hamzahDiacritics = [
    /\u0670\u0653\u0649\u0655/gm, /\u0670\u06E4\u0649\u0655/gm, /\u0670\u0653\u0648\u0654/gm, /\u0670\u06E4\u0648\u0654/gm, /\u0670\u0653\u0624/gm, /\u0670\u06E4\u0624/gm,
    /\u0656\u0653\u0649\u0655/gm, /\u0656\u06E4\u0649\u0655/gm, /\u0656\u0653\u0648\u0654/gm, /\u0656\u06E4\u0648\u0654/gm, /\u0656\u0653\u0624/gm, /\u0656\u06E4\u0624/gm,
    /\u0657\u0653\u0649\u0655/gm, /\u0657\u06E4\u0649\u0655/gm, /\u0657\u0653\u0648\u0654/gm, /\u0657\u06E4\u0648\u0654/gm, /\u0657\u0653\u0624/gm, /\u0657\u06E4\u0624/gm
  ]
  const alif = [/\u0622\u0621/gm, /\u0622 \u0621/gm]
  const lam = [/\u0644\u0622\u0621/gm, /\u0644\u0622 \u0621/gm, /لآَء/gm, /لآَء/gm, /لآَء/gm, /لآَ ء/gm, /لآَ ء/gm, /لآَ ء/gm]
  return [
    ...madWajibTrimmed,
    ...madWajib,
    ...madWajibDiacriticTrimmed,
    ...madWajibDiacritic,
    ...madWajibDiacritic2Trimmed,
    ...madWajibDiacritic2,
    ...madWajibDiacritic3Trimmed,
    ...madWajibDiacritic3,
    ...madWajibDiacritic4Trimmed,
    ...madWajibDiacritic4,
    ...madWajibDiacritic5Trimmed,
    ...madWajibDiacritic5,
    ...madWajibDiacritic6Trimmed,
    ...madWajibDiacritic6,
    ...madWajibDiacritic7Trimmed,
    ...madWajibDiacritic7,
    ...madWajibDiacritic8Trimmed,
    ...madWajibDiacritic8,
    ...madWajibDiacritic9Trimmed,
    ...madWajibDiacritic9,
    ...madWajibDiacritic10Trimmed,
    ...madWajibDiacritic10,
    ...madWajibDiacritic11Trimmed,
    ...madWajibDiacritic11,
    ...madWajibDiacritic12Trimmed,
    ...madWajibDiacritic12,
    ...madWajibDiacritic13Trimmed,
    ...madWajibDiacritic13,
    ...hamzahDiacritics,
    ...alif,
    ...lam
  ]
}

const extractMadJaizCharacters = () => {
  const madJaizVar1 = madThabiiChars.map(regex => new RegExp(`${regex.source} \u0623`, 'gm'))
  const madJaizVar2 = madThabiiChars.map(regex => new RegExp(`${regex.source} \u0625`, 'gm'))
  const madJaizVar3 = madThabiiChars.map(regex => new RegExp(regex.source + ' \\u0627\\u064E|\\u0627\\u064F|\\u0627\\u0650', 'gm'))
  const madJaizTrimmedVar1 = madThabiiChars.map(regex => new RegExp(`${regex.source}\u0623`, 'gm'))
  const madJaizTrimmedVar2 = madThabiiChars.map(regex => new RegExp(`${regex.source}\u0625`, 'gm'))
  const madJaizTrimmedVar3 = madThabiiChars.map(regex => new RegExp(regex.source + '\\u0627\\u064E|\\u0627\\u064F|\\u0627\\u0650', 'gm'))
  const madJaizDiacriticVar1 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605')} \u0623`, 'gm'))
  const madJaizDiacriticVar2 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605')} \u0625`, 'gm'))
  const madJaizDiacriticVar3 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605')} \u0627`, 'gm'))
  const madJaizDiacriticTrimmedVar1 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605')}\u0623`, 'gm'))
  const madJaizDiacriticTrimmedVar2 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605')}\u0625`, 'gm'))
  const madJaizDiacriticTrimmedVar3 = madThabiiChars.map(regex => new RegExp(`${regex.source.replace('\u0627', '\u0627\u0605')}\u0627`, 'gm'))
  const alif = [/\u0622\u0623/gm, /\u0622 \u0623/gm, /\u0622\u0625/gm, /\u0622 \u0625/gm, /\u0622\u0627/gm, /\u0622 \u0627/gm]
  const lam = [
    /\u0644\u0622\u0623/gm, /\u0644\u0622\u0625/gm, /\u0644\u0622\u0627/gm,
    /\u0644\u0622 \u0623/gm, /\u0644\u0622 \u0625/gm, /\u0644\u0622 \u0627/gm,
    /لآَأ/gm, /لآَﺇ/gm, /لآَا/gm, /لآَ أ/gm, /لآَ ﺇ/gm, /لآَ ا/gm
  ]
  return [
    ...madJaizVar1,
    ...madJaizVar2,
    ...madJaizVar3,
    ...madJaizTrimmedVar1,
    ...madJaizTrimmedVar2,
    ...madJaizTrimmedVar3,
    ...madJaizDiacriticVar1,
    ...madJaizDiacriticVar2,
    ...madJaizDiacriticVar3,
    ...madJaizDiacriticTrimmedVar1,
    ...madJaizDiacriticTrimmedVar2,
    ...madJaizDiacriticTrimmedVar3,
    ...alif,
    ...lam
  ]
}

const extractMadLazimMutsaqqalKilmiCharacters = () => {
  const madLazimMutsaqqalKilmi = madThabiiChars.map(regex => new RegExp(`^${regex.source} .*\\u0651$`, 'gm'))
  const madLazimMutsaqqalKilmiTrimmed = madThabiiChars.map(regex => new RegExp(`^${regex.source}.*\\u0651$`, 'gm'))
  const madLazimMutsaqqalKilmi2 = madThabiiChars.map(regex => new RegExp(`^${regex.source} .*\\u0605\\u0651$`, 'gm'))
  const madLazimMutsaqqalKilmiTrimmed2 = madThabiiChars.map(regex => new RegExp(`^${regex.source}.*\\u0605\\u0651$`, 'gm'))
  const madLazimMutsaqqalKilmi3 = madThabiiChars.map(regex => new RegExp(`^${regex.source} .*\\u0653\\u0651$`, 'gm'))
  const madLazimMutsaqqalKilmiTrimmed3 = madThabiiChars.map(regex => new RegExp(`^${regex.source}.*\\u0653\\u0651$`, 'gm'))
  const madLazimMutsaqqalKilmi4 = madThabiiChars.map(regex => new RegExp(`^${regex.source} .*\\u06E4\\u0651$`, 'gm'))
  const madLazimMutsaqqalKilmiTrimmed4 = madThabiiChars.map(regex => new RegExp(`^${regex.source}.*\\u06E4\\u0651$`, 'gm'))
  return [
    ...madLazimMutsaqqalKilmi,
    ...madLazimMutsaqqalKilmiTrimmed,
    ...madLazimMutsaqqalKilmi2,
    ...madLazimMutsaqqalKilmiTrimmed2,
    ...madLazimMutsaqqalKilmi3,
    ...madLazimMutsaqqalKilmiTrimmed3,
    ...madLazimMutsaqqalKilmi4,
    ...madLazimMutsaqqalKilmiTrimmed4
  ]
}

const extractMadLazimMukhaffafKilmiCharacters = () => {
  const madLazimMukhaffafKilmi = madThabiiChars.map(regex => new RegExp(`^${regex.source} .*\\u0652$`, 'gm'))
  const madLazimMukhaffafKilmiTrimmed = madThabiiChars.map(regex => new RegExp(`^${regex.source}.*\\u0652$`, 'gm'))
  const madLazimMukhaffafKilmi2 = madThabiiChars.map(regex => new RegExp(`^${regex.source} .*\\u0605\\u0652$`, 'gm'))
  const madLazimMukhaffafKilmiTrimmed2 = madThabiiChars.map(regex => new RegExp(`^${regex.source}.*\\u0605\\u0652$`, 'gm'))
  const madLazimMukhaffafKilmi3 = madThabiiChars.map(regex => new RegExp(`^${regex.source} .*\\u0653\\u0652$`, 'gm'))
  const madLazimMukhaffafKilmiTrimmed3 = madThabiiChars.map(regex => new RegExp(`^${regex.source}.*\\u0653\\u0652$`, 'gm'))
  return [
    ...madLazimMukhaffafKilmi,
    ...madLazimMukhaffafKilmiTrimmed,
    ...madLazimMukhaffafKilmi2,
    ...madLazimMukhaffafKilmiTrimmed2,
    ...madLazimMukhaffafKilmi3,
    ...madLazimMukhaffafKilmiTrimmed3
  ]
}

const extractMadLayyinCharacters = () => [
  /(?:\u064E\u0648\u0652|\u064E\u064A\u0652|\u064E \u0648\u0652|\u064E \u064A\u0652|\u064E\u0648\u06DF|\u064E\u064A\u06DF|\u064E \u0648\u06DF|\u064E \u064A\u06DF)/gm,
  /(?:\u064E\u0648(?![\u064B-\u065F])|\u064E\u064A(?![\u064B-\u065F])|\u064E \u0648(?![\u064B-\u065F])|\u064E \u064A(?![\u064B-\u065F])|\u064E\u0648(?![\u064B-\u065F])|\u064E\u064A(?![\u064B-\u065F])|\u064E \u0648(?![\u064B-\u065F])|\u064E \u064A(?![\u064B-\u065F]))/gm
]

const extractMadAridLissukunCharacters = () => {
  const dataCopy = [...extractMadThabiiCharacters()]
  dataCopy.splice(-2)
  const madAridLissukun = dataCopy.map(regex => new RegExp(`^${regex.source} .*\\u06E5|\\u0660|\\u06F0|[\\u06D6-\\u06DB]$`, 'gm'))
  const madAridLissukunTrimmed = dataCopy.map(regex => new RegExp(`^${regex.source}.*\\u06E5|\\u0660|\\u06F0|[\\u06D6-\\u06DB]$`, 'gm'))
  return [...madAridLissukun, ...madAridLissukunTrimmed]
}

const extractMadShilahQashirahCharacters = () => [
  '(\\u064B|\\u064C|\\u064D|\\u064E|\\u064F|\\u0650|\\u0651\\u064B|\\u0651\\u064C|\\u0651\\u064D|\\u0651\\u064E|\\u0651\\u064F|\\u0651\\u0650)\u0647\u0656',
  '(\\u064B|\\u064C|\\u064D|\\u064E|\\u064F|\\u0650|\\u0651\\u064B|\\u0651\\u064C|\\u0651\\u064D|\\u0651\\u064E|\\u0651\\u064F|\\u0651\\u0650) \u0647\u0656',
  '(\\u064B|\\u064C|\\u064D|\\u064E|\\u064F|\\u0650|\\u0651\\u064B|\\u0651\\u064C|\\u0651\\u064D|\\u0651\\u064E|\\u0651\\u064F|\\u0651\\u0650)\u0647\u0657',
  '(\\u064B|\\u064C|\\u064D|\\u064E|\\u064F|\\u0650|\\u0651\\u064B|\\u0651\\u064C|\\u0651\\u064D|\\u0651\\u064E|\\u0651\\u064F|\\u0651\\u0650) \u0647\u0657'
]

const extractMadShilahThawilahCharacters = () => {
  const dataCopy = [...extractMadShilahQashirahCharacters()]
  const madShilahThawilah = dataCopy.map(char => `${char} (\\u0621|\\u0623|\\u0625)`)
  const madShilahThawilahTrimmed = dataCopy.map(char => `${char}(\\u0621|\\u0623|\\u0625)`)
  return [...madShilahThawilah, ...madShilahThawilahTrimmed]
}

const extractMadIwadCharacters = () => [
  '\\u064B\\u0627[\\u06D6-\\u06DB]', '\\u064B\\u0627 [\\u06D6-\\u06DB]', '\\u064B \\u0627 [\\u06D6-\\u06DB]',
  '\\u064B\\u0627\\u0660', '\\u064B\\u0627 \\u0660', '\\u064B \\u0627 \\u0660',
  '\\u064B\\u0627\\u06F0', '\\u064B\\u0627 \\u06F0', '\\u064B \\u0627 \\u06F0',
  '\\u064B\\u0627\\u06E5', '\\u064B\\u0627 \\u06E5', '\\u064B \\u0627 \\u06E5',
  'لًا[\\u06D6-\\u06DB]', 'لًا\u0660', 'لًا\u06F0', 'لًا\u06E5'
]

const extractMadBadalCharacters = () => [
  '\u0627\u0670', '\u0627\u0656',
  '\u0621\u064E\u0627', '\u0621\u064F\u0648', '\u0621\u0650\u064A',
  '\u0623\u064F\u0648', '\u0623\u064F\u0648\u0652', '\u0623\u064F\u0648\u06DF',
  '\u0623\u064F \u0648', '\u0623\u064F \u0648\u0652', '\u0623\u064F \u0648\u06DF',
  '\u0625\u0650\u064A', '\u0625\u0650\u064A\u0652', '\u0625\u0650\u064A\u06DF',
  '\u0625\u0650 \u064A', '\u0625\u0650 \u064A\u0652', '\u0625\u0650 \u064A\u06DF'
]

const idzharTajweed = extractIdzharCharacters()
const idghamBigunnahTajweed = extractIdghamBigunnahCharacters()
const idghamBilagunnahTajweed = extractIdghamBilagunnahCharacters()
const iqlabTajweed = extractIqlabCharacters()
const ikhfaTajweed = extractIkhfaCharacters()
const idzharSyafawiTajweed = extractIdzharSyafawiCharacters()
const ikhfaSyafawiTajweed = extractIkhfaSyafawiCharacters()
const idghamMimiTajweed = extractIdghamMimiCharacters()
const idghamMutamasilainTajweed = extractIdghamMutamasilainCharacters()
const idghamMutajaanisainTajweed = extractIdghamMutajaanisainCharacters()
const idghamMutaqooribainTajweed = extractIdghamMutaqooribainCharacters()
const gunnahTajweed = extractGunnahCharacters()
const idzharQamariyahTajweed = extractIdzharQamariyahCharacters()
const idghamSyamsiyahTajweed = extractIdghamSyamsiyahCharacters()
const qalqalahSughraTajweed = extractQalqalahSughraCharacters()
const qalqalahKubraTajweed = extractQalqalahKubraCharacters()
const madThabiiTajweed = extractMadThabiiCharacters()
const madWajibTajweed = extractMadWajibCharacters()
const madJaizTajweed = extractMadJaizCharacters()
const madLazimMutsaqqalKilmiTajweed = extractMadLazimMutsaqqalKilmiCharacters()
const madLazimMukhaffafKilmiTajweed = extractMadLazimMukhaffafKilmiCharacters()
const madLayyinTajweed = extractMadLayyinCharacters()
const madAridLissukunTajweed = extractMadAridLissukunCharacters()
const madShilahQashirahTajweed = extractMadShilahQashirahCharacters()
const madShilahThawilahTajweed = extractMadShilahThawilahCharacters()
const madIwadTajweed = extractMadIwadCharacters()
const madBadalTajweed = extractMadBadalCharacters()

const tajweedLaws = () => [
  {
    id: 5,
    name: 'Ikhfa',
    color: '#00d5ef',
    rules: ikhfaTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 4,
    name: 'Iqlab',
    color: '#bdb9d8',
    rules: iqlabTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 2,
    name: 'Idgham Bigunnah',
    color: '#4ecab6',
    rules: idghamBigunnahTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 3,
    name: 'Idgham Bilagunnah',
    color: '#ff0000',
    rules: idghamBilagunnahTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 10,
    name: 'Idgham Mutamasilain',
    color: '#ff0040',
    rules: idghamMutamasilainTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 11,
    name: 'Idgham Mutajaanisain',
    color: '#ff8000',
    rules: idghamMutajaanisainTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 12,
    name: 'Idgham Mutaqooribain',
    color: '#ffbf00',
    rules: idghamMutaqooribainTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 8,
    name: 'Idgham Mimi',
    color: '#e5ea9f',
    rules: idghamMimiTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 9,
    name: 'Gunnah',
    color: '#ffcc8e',
    rules: gunnahTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 7,
    name: 'Ikhfa Syafawi',
    color: '#ffd9e2',
    rules: ikhfaSyafawiTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 6,
    name: 'Idzhar Syafawi',
    color: '#6b7280',
    rules: idzharSyafawiTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 13,
    name: 'Idzhar Qamariyah',
    color: '#80ff00',
    rules: idzharQamariyahTajweed,
    group: 'Lam Ta\'rif',
    detailPage: '/detail?tajweed='
  },
  {
    id: 14,
    name: 'Idgham Syamsiyah',
    color: '#0000ff',
    rules: idghamSyamsiyahTajweed,
    group: 'Lam Ta\'rif',
    detailPage: '/detail?tajweed='
  },
  {
    id: 21,
    name: 'Qalqalah Sughra',
    color: '#ff8d83',
    rules: qalqalahSughraTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 22,
    name: 'Qalqalah Kubra',
    color: '#FF4500',
    rules: qalqalahKubraTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
  {
    id: 25,
    name: 'Mad Wajib Muttasil',
    color: '#00bfff',
    rules: madWajibTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 26,
    name: 'Mad Jaiz Munfassil',
    color: '#00ff80',
    rules: madJaizTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 30,
    name: 'Mad Arid Lissukun',
    color: '#ff00ff',
    rules: madAridLissukunTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 31,
    name: 'Mad Shilah Qashirah',
    color: '#40ff00',
    rules: madShilahQashirahTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 32,
    name: 'Mad Shilah Thawilah',
    color: '#0080ff',
    rules: madShilahThawilahTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 33,
    name: 'Mad Iwad',
    color: '#00ffbf',
    rules: madIwadTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 27,
    name: 'Mad Lazim Mutsaqqal Kilmi',
    color: '#ff00bf',
    rules: madLazimMutsaqqalKilmiTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 28,
    name: 'Mad Lazim Mukhaffaf Kilmi',
    color: '#ff0080',
    rules: madLazimMukhaffafKilmiTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 34,
    name: 'Mad Badal',
    color: '#00ff40',
    rules: madBadalTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 24,
    name: 'Mad Thabii',
    color: '#00ff00',
    rules: madThabiiTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 29,
    name: 'Mad Layyin',
    color: '#bfff00',
    rules: madLayyinTajweed,
    group: 'Ahkämul-madd',
    detailPage: '/detail?tajweed='
  },
  {
    id: 1,
    name: 'Idzhar',
    color: '#6b7280',
    rules: idzharTajweed,
    group: 'Ahkämul Al-hurüf',
    detailPage: '/detail?tajweed='
  },
]

const sources = [
  'https://tashih.kemenag.go.id/uploads/1/2019-08/buku_pedoman_tajwid_sistem_warna.pdf',
  'https://ia803106.us.archive.org/22/items/etaoin/Ilmu%20Tajwid%20Lengkap.pdf',
  'https://www.gramedia.com/literasi/hukum-tajwid-dan-contohnya'
]

const twTextSizes = () => ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', '3rem', '3.75rem', '4.5rem', '6rem', '8rem']

export { isStorageExist, twTextSizes, tajweedLaws, sources }
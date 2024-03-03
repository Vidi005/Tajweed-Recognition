const isStorageExist = content => {
  if (!navigator.cookieEnabled) {
    alert(content)
    return false
  } else {
    return true
  }
}

const extractIdzharCharacters = () => [
  'ن ا', 'نْ ا', '\u064B \u0627', '\u064C \u0627', '\u064D \u0627', '\u064B \u0627 \u0627',
  'ن ع', 'نْ ع', '\u064B \u0641', '\u064C \u0641', '\u064D \u0641', '\u064B \u0627 \u0641',
  'ن غ', 'نْ غ', '\u064B \u063A', '\u064C \u063A', '\u064D \u063A', '\u064B \u0627 \u063A',
  'ن ح', 'نْ ح', '\u064B \u062F', '\u064C \u062F', '\u064D \u062F', '\u064B \u0627 \u062F',
  'ن خ', 'نْ خ', '\u064B \u062E', '\u064C \u062E', '\u064D \u062E', '\u064B \u0627 \u062E',
  'ن ه', 'نْ ه', '\u064B \u0647', '\u064C \u0647', '\u064D \u0647', '\u064B \u0627 \u0647',
  'نا', 'نْا', '\u064B\u0627', '\u064C\u0627', '\u064D\u0627', '\u064B\u0627\u0627',
  'نع', 'نْع', '\u064B\u0641', '\u064C\u0641', '\u064D\u0641', '\u064B\u0627\u0641',
  'نغ', 'نْغ', '\u064B\u063A', '\u064C\u063A', '\u064D\u063A', '\u064B\u0627\u063A',
  'نح', 'نْح', '\u064B\u062F', '\u064C\u062F', '\u064D\u062F', '\u064B\u0627\u062F',
  'نخ', 'نْخ', '\u064B\u062E', '\u064C\u062E', '\u064D\u062E', '\u064B\u0627\u062E',
  'نه', 'نْه', '\u064B\u0647', '\u064C\u0647', '\u064D\u0647', '\u064B\u0627\u0647'
]

const extractIdghamBigunnahCharacters = () => [
  'ن ي', 'نْ ي', '\u064B \u064A', '\u064C \u064A', '\u064D \u064A', '\u064B \u0627 \u064A',
  'ن ن', 'نْ ن', '\u064B \u064E', '\u064C \u064E', '\u064D \u064E', '\u064B \u0627 \u064E',
  'ن م', 'نْ م', '\u064B \u0645', '\u064C \u0645', '\u064D \u0645', '\u064B \u0627 \u0645',
  'ن و', 'نْ و', '\u064B \u0648', '\u064C \u0648', '\u064D \u0648', '\u064B \u0627 \u0648',
  'ني', 'نْي', '\u064B\u064A', '\u064C\u064A', '\u064D\u064A', '\u064B\u0627\u064A',
  'نن', 'نْن', '\u064B\u064E', '\u064C\u064E', '\u064D\u064E', '\u064B\u0627\u064E',
  'نم', 'نْم', '\u064B\u0645', '\u064C\u0645', '\u064D\u0645', '\u064B\u0627\u0645',
  'نو', 'نْو', '\u064B\u0648', '\u064C\u0648', '\u064D\u0648', '\u064B\u0627\u0648'
]

const extractIdghamBilagunnahCharacters = () => [
  'ن ل', 'نْ ل', '\u064B \u0644', '\u064C \u0644', '\u064D \u0644', '\u064B \u0627 \u0644',
  'ن ر', 'نْ ر', '\u064B \u0631', '\u064C \u0631', '\u064D \u0631', '\u064B \u0627 \u0631',
  'نل', 'نْل', '\u064B\u0644', '\u064C\u0644', '\u064D\u0644', '\u064B\u0627\u0644',
  'نر', 'نْر', '\u064B\u0631', '\u064C\u0631', '\u064D\u0631', '\u064B\u0627\u0631'
]

const extractIqlabCharacters = () => ['ن ب', 'نْ ب', 'نب', 'نْب', '\u064B \u0628', '\u064C \u0628', '\u064D \u0628', '\u064B\u0628', '\u064C\u0628', '\u064D\u0628']

const extractIkhfaCharacters = () => [
  'نت', 'نْت', 'ن ت', 'نْ ت', '\u064B \u062A', '\u064C \u062A', '\u064D \u062A', '\u064B\u0627 \u062A', '\u064C\u0627 \u062A', '\u064D\u0627 \u062A', '\u064B \u0627 \u062A', '\u064C \u0627 \u062A', '\u064D \u0627 \u062A',
  'نث', 'نْث', 'ن ث', 'نْ ث', '\u064B \u062B', '\u064C \u062B', '\u064D \u062B', '\u064B\u0627 \u062B', '\u064C\u0627 \u062B', '\u064D\u0627 \u062B', '\u064B \u0627 \u062B', '\u064C \u0627 \u062B', '\u064D \u0627 \u062B',
  'نج', 'نْج', 'ن ج', 'نْ ج', '\u064B \u062C', '\u064C \u062C', '\u064D \u062C', '\u064B\u0627 \u062C', '\u064C\u0627 \u062C', '\u064D\u0627 \u062C', '\u064B \u0627 \u062C', '\u064C \u0627 \u062C', '\u064D \u0627 \u062C',
  'ند', 'نْد', 'ن د', 'نْ د', '\u064B \u062F', '\u064C \u062F', '\u064D \u062F', '\u064B\u0627 \u062F', '\u064C\u0627 \u062F', '\u064D\u0627 \u062F', '\u064B \u0627 \u062F', '\u064C \u0627 \u062F', '\u064D \u0627 \u062F',
  'نذ', 'نْذ', 'ن ذ', 'نْ ذ', '\u064B \u0630', '\u064C \u0630', '\u064D \u0630', '\u064B\u0627 \u0630', '\u064C\u0627 \u0630', '\u064D\u0627 \u0630', '\u064B \u0627 \u0630', '\u064C \u0627 \u0630', '\u064D \u0627 \u0630',
  'نز', 'نْز', 'ن ز', 'نْ ز', '\u064B \u0632', '\u064C \u0632', '\u064D \u0632', '\u064B\u0627 \u0632', '\u064C\u0627 \u0632', '\u064D\u0627 \u0632', '\u064B \u0627 \u0632', '\u064C \u0627 \u0632', '\u064D \u0627 \u0632',
  'نس', 'نْس', 'ن س', 'نْ س', '\u064B \u0633', '\u064C \u0633', '\u064D \u0633', '\u064B\u0627 \u0633', '\u064C\u0627 \u0633', '\u064D\u0627 \u0633', '\u064B \u0627 \u0633', '\u064C \u0627 \u0633', '\u064D \u0627 \u0633',
  'نش', 'نْش', 'ن ش', 'نْ ش', '\u064B \u0634', '\u064C \u0634', '\u064D \u0634', '\u064B\u0627 \u0634', '\u064C\u0627 \u0634', '\u064D\u0627 \u0634', '\u064B \u0627 \u0634', '\u064C \u0627 \u0634', '\u064D \u0627 \u0634',
  'نص', 'نْص', 'ن ص', 'نْ ص', '\u064B \u0635', '\u064C \u0635', '\u064D \u0635', '\u064B\u0627 \u0635', '\u064C\u0627 \u0635', '\u064D\u0627 \u0635', '\u064B \u0627 \u0635', '\u064C \u0627 \u0635', '\u064D \u0627 \u0635',
  'نض', 'نْض', 'ن ض', 'نْ ض', '\u064B \u0636', '\u064C \u0636', '\u064D \u0636', '\u064B\u0627 \u0636', '\u064C\u0627 \u0636', '\u064D\u0627 \u0636', '\u064B \u0627 \u0636', '\u064C \u0627 \u0636', '\u064D \u0627 \u0636',
  'نط', 'نْط', 'ن ط', 'نْ ط', '\u064B \u0637', '\u064C \u0637', '\u064D \u0637', '\u064B\u0627 \u0637', '\u064C\u0627 \u0637', '\u064D\u0627 \u0637', '\u064B \u0627 \u0637', '\u064C \u0627 \u0637', '\u064D \u0627 \u0637',
  'نظ', 'نْظ', 'ن ظ', 'نْ ظ', '\u064B \u0638', '\u064C \u0638', '\u064D \u0638', '\u064B\u0627 \u0638', '\u064C\u0627 \u0638', '\u064D\u0627 \u0638', '\u064B \u0627 \u0638', '\u064C \u0627 \u0638', '\u064D \u0627 \u0638',
  'نف', 'نْف', 'ن ف', 'نْ ف', '\u064B \u0641', '\u064C \u0641', '\u064D \u0641', '\u064B\u0627 \u0641', '\u064C\u0627 \u0641', '\u064D\u0627 \u0641', '\u064B \u0627 \u0641', '\u064C \u0627 \u0641', '\u064D \u0627 \u0641',
  'نق', 'نْق', 'ن ق', 'نْ ق', '\u064B \u0642', '\u064C \u0642', '\u064D \u0642', '\u064B\u0627 \u0642', '\u064C\u0627 \u0642', '\u064D\u0627 \u0642', '\u064B \u0627 \u0642', '\u064C \u0627 \u0642', '\u064D \u0627 \u0642',
  'نك', 'نْك', 'ن ك', 'نْ ك', '\u064B \u0643', '\u064C \u0643', '\u064D \u0643', '\u064B\u0627 \u0643', '\u064C\u0627 \u0643', '\u064D\u0627 \u0643', '\u064B \u0627 \u0643', '\u064C \u0627 \u0643', '\u064D \u0627 \u0643'
]

const extractIdzharSyafawiCharacters = () => [/م (?!([مب]))/gm, /مْ (?!([مب]))/gm]

const extractIkhfaSyafawiCharacters = () => ['م ب', 'مْ ب', 'مب', 'مْب']

const extractIdghamMimiCharacters = () => ['م م', 'مْ م', 'مم', 'مْم']

const extractGunnahCharacters = () => ['نّ', 'نَّ', 'نِّ', 'نُّ', 'مّ', 'مَّ', 'مِّ', 'مُّ']

const extractIdzharQamariyahCharacters = () => [
  'الع', 'الب', 'الج', 'الح', 'الخ', 'الع', 'الغ',
  'الْع', 'الْب', 'الْج', 'الْح', 'الْخ', 'الْع', 'الْغ',
  'الف', 'الق', 'الك', 'الم', 'الو', 'اله', 'الي',
  'الْف', 'الْق', 'الْك', 'الْم', 'الْو', 'الْه', 'الْي'
]

const extractIdghamSyamsiyahCharacters = () => [
  'الت', 'الث', 'الد', 'الذ', 'الر', 'الز', 'الس', 'الش', 'الص', 'الض', 'الط', 'الظ', 'الل', 'الن',
  'الْت', 'الْث', 'الْد', 'الْذ', 'الْر', 'الْز', 'الْس', 'الْش', 'الْص', 'الْض', 'الْط', 'الْظ', 'الْل', 'الْن'
]

const extractQalqalahSughraCharacters = () => [
  'بْ', 'جْ', 'دْ', 'طْ', 'قْ',
  // 'ب', 'ج', 'د', 'ط', 'ق'
]

const extractMadThabiiCharacters = () => [
  '\u064E\u0627', '\u064E \u0627',
  '\u064F\u0648', '\u064F \u0648', '\u064F\u0648[\u0652|\u06DF]', '\u064F \u0648[\u0652|\u06DF]',
  '\u0650\u064A', '\u0650 \u064A', '\u0650\u064A[\u0652|\u06DF]', '\u0650 \u064A[\u0652|\u06DF]',
  '\u0656', '\u0670', 'لاَ' // Kurang dammah لآ
]

const extractMadWajibCharacters = () => {
  const dataCopy = [...extractMadThabiiCharacters()]
  const madWajibTrimmed = dataCopy.map(char => `${char}\u0621`)
  const madWajib = dataCopy.map(char => `${char} \u0621`)
  const madWajibDiacriticTrimmed = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605').replace('\u0648', '\u0648\u0605').replace('\u064A', '\u064A\u0605')}\u0621`)
  const madWajibDiacritic = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605').replace('\u0648', '\u0648\u0605').replace('\u064A', '\u064A\u0605')} \u0621`)
  const madWajibDiacritic2Trimmed = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0653').replace('\u0648', '\u0648\u0653').replace('\u064A', '\u064A\u0653')}\u0621`)
  const madWajibDiacritic2 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0653').replace('\u0648', '\u0648\u0653').replace('\u064A', '\u064A\u0653')} \u0621`)
  const madWajibDiacritic3Trimmed = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0622').replace('\u0648', '\u0648\u0622').replace('\u064A', '\u064A\u0622')}\u0621`)
  const madWajibDiacritic3 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0622').replace('\u0648', '\u0648\u0622').replace('\u064A', '\u064A\u0622')} \u0621`)
  const madWajibDiacritic4Trimmed = dataCopy.map(char => `${char.replace('\u0670', '\u0670\u0623').replace('\u0656', '\u0656\u0623')}\u0621`)
  const madWajibDiacritic4 = dataCopy.map(char => `${char.replace('\u0670', '\u0670\u0623').replace('\u0656', '\u0656\u0623')} \u0621`)
  const madWajibDiacritic5Trimmed = dataCopy.map(char => `${char.replace('\u0648', '\u0648\u0652\u0605').replace('\u0648', '\u0648\u0652\u0653').replace('\u0648', '\u0648\u0652\u0622')}\u0621`)
  const madWajibDiacritic5 = dataCopy.map(char => `${char.replace('\u0648', '\u0648\u0652\u0605').replace('\u0648', '\u0648\u0652\u0653').replace('\u0648', '\u0648\u0652\u0622')} \u0621`)
  const madWajibDiacritic6Trimmed = dataCopy.map(char => `${char.replace('\u0648', '\u0648\u06DF\u0605').replace('\u0648', '\u0648\u06DF\u0653').replace('\u0648', '\u0648\u06DF\u0622')}\u0621`)
  const madWajibDiacritic6 = dataCopy.map(char => `${char.replace('\u0648', '\u0648\u06DF\u0605').replace('\u0648', '\u0648\u06DF\u0653').replace('\u0648', '\u0648\u06DF\u0622')} \u0621`)
  const madWajibDiacritic7Trimmed = dataCopy.map(char => `${char.replace('\u064A', '\u064A\u0652\u0605').replace('\u064A', '\u064A\u0652\u0653').replace('\u064A', '\u064A\u0652\u0622')}\u0621`)
  const madWajibDiacritic7 = dataCopy.map(char => `${char.replace('\u064A', '\u064A\u0652\u0605').replace('\u064A', '\u064A\u0652\u0653').replace('\u064A', '\u064A\u0652\u0622')} \u0621`)
  const lam = ['\u0644\u0622\u0621', '\u0644\u0622 \u0621', 'لآَع', 'لآَع', 'لآَع', 'لآَ ع', 'لآَ ع', 'لآَ ع']
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
    ...lam
  ]
}

const extractMadJaizCharacters = () => {
  const dataCopy = [...extractMadThabiiCharacters()]
  const madJaizVar1 = dataCopy.map(char => `${char} \u0623`)
  const madJaizVar2 = dataCopy.map(char => `${char} \u0625`)
  const madJaizVar3 = dataCopy.map(char => `${char} \u0627`)
  const madJaizTrimmedVar1 = dataCopy.map(char => `${char}\u0623`)
  const madJaizTrimmedVar2 = dataCopy.map(char => `${char}\u0625`)
  const madJaizTrimmedVar3 = dataCopy.map(char => `${char}\u0627`)
  const madJaizDiacriticVar1 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605')} \u0623`)
  const madJaizDiacriticVar2 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605')} \u0625`)
  const madJaizDiacriticVar3 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605')} \u0627`)
  const madJaizDiacriticTrimmedVar1 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605')}\u0623`)
  const madJaizDiacriticTrimmedVar2 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605')}\u0625`)
  const madJaizDiacriticTrimmedVar3 = dataCopy.map(char => `${char.replace('\u0627', '\u0627\u0605')}\u0627`)
  const lam = [
    '\u0644\u0622\u0623', '\u0644\u0622\u0625', '\u0644\u0622\u0627',
    '\u0644\u0622 \u0623', '\u0644\u0622 \u0625', '\u0644\u0622 \u0627',
    'لآَأ', 'لآَﺇ', 'لآَا', 'لآَ أ', 'لآَ ﺇ', 'لآَ ا'
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
    ...lam
  ]
}

const extractMadLazimMutsaqqalKilmiCharacters = () => {
  const dataCopy = [...extractMadThabiiCharacters()]
  const madLazimMutsaqqalKilmi = dataCopy.map(char => new RegExp(`^${char} .*\\u0651$`))
  const madLazimMutsaqqalKilmiTrimmed = dataCopy.map(char => new RegExp(`^${char}.*\\u0651$`))
  const madLazimMutsaqqalKilmi2 = dataCopy.map(char => new RegExp(`^${char} .*\\u0605\\u0651$`))
  const madLazimMutsaqqalKilmiTrimmed2 = dataCopy.map(char => new RegExp(`^${char}.*\\u0605\\u0651$`))
  const madLazimMutsaqqalKilmi3 = dataCopy.map(char => new RegExp(`^${char} .*\\u0653\\u0651$`))
  const madLazimMutsaqqalKilmiTrimmed3 = dataCopy.map(char => new RegExp(`^${char}.*\\u0653\\u0651$`))
  return [
    ...madLazimMutsaqqalKilmi,
    ...madLazimMutsaqqalKilmiTrimmed,
    ...madLazimMutsaqqalKilmi2,
    ...madLazimMutsaqqalKilmiTrimmed2,
    ...madLazimMutsaqqalKilmi3,
    ...madLazimMutsaqqalKilmiTrimmed3
  ]
}

const extractMadLazimMukhaffafKilmiCharacters = () => {
  const dataCopy = [...extractMadThabiiCharacters()]
  const madLazimMukhaffafKilmi = dataCopy.map(char => new RegExp(`^${char} .*\\u0652$`))
  const madLazimMukhaffafKilmiTrimmed = dataCopy.map(char => new RegExp(`^${char}.*\\u0652$`))
  const madLazimMukhaffafKilmi2 = dataCopy.map(char => new RegExp(`^${char} .*\\u0605\\u0652$`))
  const madLazimMukhaffafKilmiTrimmed2 = dataCopy.map(char => new RegExp(`^${char}.*\\u0605\\u0652$`))
  const madLazimMukhaffafKilmi3 = dataCopy.map(char => new RegExp(`^${char} .*\\u0653\\u0652$`))
  const madLazimMukhaffafKilmiTrimmed3 = dataCopy.map(char => new RegExp(`^${char}.*\\u0653\\u0652$`))
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
  '\u064E\u0648', '\u064E\u0649', '\u064E \u0648', '\u064E \u0649',
  '\u064E\u0648\u0652', '\u064E\u0649\u0652', '\u064E \u0648\u0652', '\u064E \u0649\u0652'
]

const extractMadAridLissukunCharacters = () => {
  const dataCopy = [...extractMadThabiiCharacters()]
  const madAridLissukun = dataCopy.map(char => new RegExp(`^${char} .*\\u0660|\\u06F0|[\\u06D6-\\u06DB]$`))
  const madAridLissukunTrimmed = dataCopy.map(char => new RegExp(`^${char}.*\\u0660|\\u06F0|[\\u06D6-\\u06DB]$`))
  return [...madAridLissukun, ...madAridLissukunTrimmed]
}

const extractMadShilahQashirahCharacters = () => [
  '[\u064B-\u0650]\u0655\u064F', '[\u064B-\u0650] \u0655\u064F',
  // '[\u064B-\u0650]\u0655\u0657', '[\u064B-\u0650] \u0655\u0657' kurang dammah
]

const extractMadShilahThawilahCharacters = () => {
  const dataCopy = [...extractMadShilahQashirahCharacters()]
  const madShilahThawilah = dataCopy.map(char => `${char} (\\u0621|\\u0623|\\u0625)`)
  const madShilahThawilahTrimmed = dataCopy.map(char => `${char}(\\u0621|\\u0623|\\u0625)`)
  return [...madShilahThawilah, ...madShilahThawilahTrimmed]
}

const extractMadIwadCharacters = () => [
  '\u064B\u0627[\u06D6-\u06DB]', '\u064B\u0627 [\u06D6-\u06DB]', '\u064B \u0627 [\u06D6-\u06DB]',
  '\u064B\u0627\u0660', '\u064B\u0627 \u0660', '\u064B \u0627 \u0660',
  '\u064B\u0627\u06F0', '\u064B\u0627 \u06F0', '\u064B \u0627 \u06F0'
]

const extractMadBadalCharacters = () => [
  '\u0622', '\u0627\u0653', '\u0627\u0670', 'آ',
  '\u0623\u064F\u0648', '\u0623\u064F\u0648\u0652', '\u0623\u064F\u0648\u06DF',
  '\u0623\u064F \u0648', '\u0623\u064F \u0648\u0652', '\u0623\u064F \u0648\u06DF',
  '\u0623\u0650\u064A', '\u0623\u0650\u064A\u0652', '\u0623\u0650\u064A\u06DF',
  '\u0623\u0650 \u064A', '\u0623\u0650 \u064A\u0652', '\u0623\u0650 \u064A\u06DF'
]

const twTextSizes = () => ['0.75rem', '0.875rem', '1rem', '1.125rem', '1.25rem', '1.5rem', '1.875rem', '2.25rem', '3rem', '3.75rem', '4.5rem', '6rem', '8rem']

export { isStorageExist, twTextSizes, extractIdzharCharacters, extractIdghamBigunnahCharacters, extractIdghamBilagunnahCharacters, extractIqlabCharacters, extractIkhfaCharacters, extractIdzharSyafawiCharacters, extractIkhfaSyafawiCharacters, extractIdghamMimiCharacters, extractGunnahCharacters, extractIdzharQamariyahCharacters, extractIdghamSyamsiyahCharacters, extractQalqalahSughraCharacters, extractMadThabiiCharacters, extractMadWajibCharacters, extractMadJaizCharacters, extractMadLazimMutsaqqalKilmiCharacters, extractMadLazimMukhaffafKilmiCharacters, extractMadLayyinCharacters, extractMadAridLissukunCharacters, extractMadShilahQashirahCharacters, extractMadShilahThawilahCharacters, extractMadIwadCharacters, extractMadBadalCharacters }
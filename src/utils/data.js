const isStorageExist = content => {
  if (!navigator.cookieEnabled) {
    alert(content)
    return false
  } else {
    return true
  }
}

const extractIdzharCharacters = () => [
  // Alif
  /\u0646(?![\u064B-\u065F]) \u0627(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0627(?:[\u064B-\u065F])/gm, /\u064B \u0627(?:[\u064B-\u065F])/gm, /\u064C \u0627(?:[\u064B-\u065F])/gm, /\u064D \u0627(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0627(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0627(?:[\u064B-\u065F])/gm,
  // ha
  /\u0646(?![\u064B-\u065F]) \u062D(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u062D(?:[\u064B-\u065F])/gm, /\u064B \u062D(?:[\u064B-\u065F])/gm, /\u064C \u062D(?:[\u064B-\u065F])/gm, /\u064D \u062D(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u062D(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u062D(?:[\u064B-\u065F])/gm,
  // Ha
  /\u0646(?![\u064B-\u065F]) \u0647(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0647(?:[\u064B-\u065F])/gm, /\u064B \u0647(?:[\u064B-\u065F])/gm, /\u064C \u0647(?:[\u064B-\u065F])/gm, /\u064D \u0647(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0647(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0647(?:[\u064B-\u065F])/gm,
  // Kho
  /\u0646(?![\u064B-\u065F]) \u062E(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u062E(?:[\u064B-\u065F])/gm, /\u064B \u062E(?:[\u064B-\u065F])/gm, /\u064C \u062E(?:[\u064B-\u065F])/gm, /\u064D \u062E(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u062E(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u062E(?:[\u064B-\u065F])/gm,
  // 'Ain
  /\u0646(?![\u064B-\u065F]) \u0639(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0639(?:[\u064B-\u065F])/gm, /\u064B \u0639(?:[\u064B-\u065F])/gm, /\u064C \u0639(?:[\u064B-\u065F])/gm, /\u064D \u0639(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0639(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0639(?:[\u064B-\u065F])/gm,
  // Gho
  /\u0646(?![\u064B-\u065F]) \u063A(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u063A(?:[\u064B-\u065F])/gm, /\u064B \u063A(?:[\u064B-\u065F])/gm, /\u064C \u063A(?:[\u064B-\u065F])/gm, /\u064D \u063A(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u063A(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u063A(?:[\u064B-\u065F])/gm,
  // Alif
  /\u0646(?![\u064B-\u065F])\u0627(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0627(?:[\u064B-\u065F])/gm, /\u064B\u0627(?:[\u064B-\u065F])/gm, /\u064C\u0627(?:[\u064B-\u065F])/gm, /\u064D\u0627(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0627(?:[\u064B-\u065F])/gm,
  // ha
  /\u0646(?![\u064B-\u065F])\u062D(?:[\u064B-\u065F])/gm, /\u0646\u0652\u062D(?:[\u064B-\u065F])/gm, /\u064B\u062D(?:[\u064B-\u065F])/gm, /\u064C\u062D(?:[\u064B-\u065F])/gm, /\u064D\u062D(?:[\u064B-\u065F])/gm, /\u064B\u0627\u062D(?:[\u064B-\u065F])/gm,
  // Ha
  /\u0646(?![\u064B-\u065F])\u0647(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0647(?:[\u064B-\u065F])/gm, /\u064B\u0647(?:[\u064B-\u065F])/gm, /\u064C\u0647(?:[\u064B-\u065F])/gm, /\u064D\u0647(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0647(?:[\u064B-\u065F])/gm,
  // Kho
  /\u0646(?![\u064B-\u065F])\u062E(?:[\u064B-\u065F])/gm, /\u0646\u0652\u062E(?:[\u064B-\u065F])/gm, /\u064B\u062E(?:[\u064B-\u065F])/gm, /\u064C\u062E(?:[\u064B-\u065F])/gm, /\u064D\u062E(?:[\u064B-\u065F])/gm, /\u064B\u0627\u062E(?:[\u064B-\u065F])/gm,
  // 'Ain
  /\u0646(?![\u064B-\u065F])\u0639(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0639(?:[\u064B-\u065F])/gm, /\u064B\u0639(?:[\u064B-\u065F])/gm, /\u064C\u0639(?:[\u064B-\u065F])/gm, /\u064D\u0639(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0639(?:[\u064B-\u065F])/gm,
  // Gho
  /\u0646(?![\u064B-\u065F])\u063A(?:[\u064B-\u065F])/gm, /\u0646\u0652\u063A(?:[\u064B-\u065F])/gm, /\u064B\u063A(?:[\u064B-\u065F])/gm, /\u064C\u063A(?:[\u064B-\u065F])/gm, /\u064D\u063A(?:[\u064B-\u065F])/gm, /\u064B\u0627\u063A(?:[\u064B-\u065F])/gm
]

const extractIdghamBigunnahCharacters = () => [
  // Ya
  /\u0646(?![\u064B-\u065F]) \u064A(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u064A(?:[\u064B-\u065F])/gm, /\u064B \u064A(?:[\u064B-\u065F])/gm, /\u064C \u064A(?:[\u064B-\u065F])/gm, /\u064D \u064A(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u064A(?:[\u064B-\u065F])/gm,
  // Nun
  /\u0646(?![\u064B-\u065F]) \u0646(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0646(?:[\u064B-\u065F])/gm, /\u064B \u0646(?:[\u064B-\u065F])/gm, /\u064C \u0646(?:[\u064B-\u065F])/gm, /\u064D \u0646(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0646(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0646(?:[\u064B-\u065F])/gm,
  // Mim
  /\u0646(?![\u064B-\u065F]) \u0645(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0645(?:[\u064B-\u065F])/gm, /\u064B \u0645(?:[\u064B-\u065F])/gm, /\u064C \u0645(?:[\u064B-\u065F])/gm, /\u064D \u0645(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0645(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0645(?:[\u064B-\u065F])/gm,
  // Wau
  /\u0646(?![\u064B-\u065F]) \u0648(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0648(?:[\u064B-\u065F])/gm, /\u064B \u0648(?:[\u064B-\u065F])/gm, /\u064C \u0648(?:[\u064B-\u065F])/gm, /\u064D \u0648(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0648(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0648(?:[\u064B-\u065F])/gm,
  // Ya
  /\u0646(?![\u064B-\u065F])\u064A(?:[\u064B-\u065F])/gm, /\u0646\u0652\u064A(?:[\u064B-\u065F])/gm, /\u064B\u064A(?:[\u064B-\u065F])/gm, /\u064C\u064A(?:[\u064B-\u065F])/gm, /\u064D\u064A(?:[\u064B-\u065F])/gm, /\u064B\u0627\u064A(?:[\u064B-\u065F])/gm,
  // Nun
  /\u0646(?![\u064B-\u065F])\u0646(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0646(?:[\u064B-\u065F])/gm, /\u064B\u0646(?:[\u064B-\u065F])/gm, /\u064C\u0646(?:[\u064B-\u065F])/gm, /\u064D\u0646(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0646(?:[\u064B-\u065F])/gm,
  // Mim
  /\u0646(?![\u064B-\u065F])\u0645(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0645(?:[\u064B-\u065F])/gm, /\u064B\u0645(?:[\u064B-\u065F])/gm, /\u064C\u0645(?:[\u064B-\u065F])/gm, /\u064D\u0645(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0645(?:[\u064B-\u065F])/gm,
  // Wau
  /\u0646(?![\u064B-\u065F])\u0648(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0648(?:[\u064B-\u065F])/gm, /\u064B\u0648(?:[\u064B-\u065F])/gm, /\u064C\u0648(?:[\u064B-\u065F])/gm, /\u064D\u0648(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0648(?:[\u064B-\u065F])/gm
]

const extractIdghamBilagunnahCharacters = () => [
  // Lam
  /\u0646(?![\u064B-\u065F]) \u0644(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0644(?:[\u064B-\u065F])/gm, /\u064B \u0644(?:[\u064B-\u065F])/gm, /\u064C \u0644(?:[\u064B-\u065F])/gm, /\u064D \u0644(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0644(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0644(?:[\u064B-\u065F])/gm,
  // Rho
  /\u0646(?![\u064B-\u065F]) \u0631(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0631(?:[\u064B-\u065F])/gm, /\u064B \u0631(?:[\u064B-\u065F])/gm, /\u064C \u0631(?:[\u064B-\u065F])/gm, /\u064D \u0631(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0631(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0631(?:[\u064B-\u065F])/gm,
  // Lam
  /\u0646(?![\u064B-\u065F])\u0644(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0644(?:[\u064B-\u065F])/gm, /\u064B\u0644(?:[\u064B-\u065F])/gm, /\u064C\u0644(?:[\u064B-\u065F])/gm, /\u064D\u0644(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0644(?:[\u064B-\u065F])/gm,
  // Rho
  /\u0646(?![\u064B-\u065F])\u0631(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0631(?:[\u064B-\u065F])/gm, /\u064B\u0631(?:[\u064B-\u065F])/gm, /\u064C\u0631(?:[\u064B-\u065F])/gm, /\u064D\u0631(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0631(?:[\u064B-\u065F])/gm
]

const extractIqlabCharacters = () => [
  // Ba
  /\u0646(?![\u064B-\u065F]) \u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u0646\u0652 \u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064B \u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064C \u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064D \u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064B \u0627 \u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064B\u0627 \u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm,
  // Ba
  /\u0646(?![\u064B-\u065F])\u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u0646\u0652\u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064B\u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064C\u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064D\u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm, /\u064B\u0627\u0628(?:[\u064B-\u065F\u06E2\u06ED])/gm
]

const extractIkhfaCharacters = () => [
  // Tha
  /\u0646(?![\u064B-\u065F]) \u0629(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0629(?:[\u064B-\u065F])/gm, /\u064B \u0629(?:[\u064B-\u065F])/gm, /\u064C \u0629(?:[\u064B-\u065F])/gm, /\u064D \u0629(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0629(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0629(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0629(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0629(?:[\u064B-\u065F])/gm, /\u064B\u0629(?:[\u064B-\u065F])/gm, /\u064C\u0629(?:[\u064B-\u065F])/gm, /\u064D\u0629(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0629(?:[\u064B-\u065F])/gm,
  // Ta
  /\u0646(?![\u064B-\u065F]) \u062A(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u062A(?:[\u064B-\u065F])/gm, /\u064B \u062A(?:[\u064B-\u065F])/gm, /\u064C \u062A(?:[\u064B-\u065F])/gm, /\u064D \u062A(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u062A(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u062A(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u062A(?:[\u064B-\u065F])/gm, /\u0646\u0652\u062A(?:[\u064B-\u065F])/gm, /\u064B\u062A(?:[\u064B-\u065F])/gm, /\u064C\u062A(?:[\u064B-\u065F])/gm, /\u064D\u062A(?:[\u064B-\u065F])/gm, /\u064B\u0627\u062A(?:[\u064B-\u065F])/gm,
  // Tsa
  /\u0646(?![\u064B-\u065F]) \u062B(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u062B(?:[\u064B-\u065F])/gm, /\u064B \u062B(?:[\u064B-\u065F])/gm, /\u064C \u062B(?:[\u064B-\u065F])/gm, /\u064D \u062B(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u062B(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u062B(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u062B(?:[\u064B-\u065F])/gm, /\u0646\u0652\u062B(?:[\u064B-\u065F])/gm, /\u064B\u062B(?:[\u064B-\u065F])/gm, /\u064C\u062B(?:[\u064B-\u065F])/gm, /\u064D\u062B(?:[\u064B-\u065F])/gm, /\u064B\u0627\u062B(?:[\u064B-\u065F])/gm,
  // Ja
  /\u0646(?![\u064B-\u065F]) \u062C(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u062C(?:[\u064B-\u065F])/gm, /\u064B \u062C(?:[\u064B-\u065F])/gm, /\u064C \u062C(?:[\u064B-\u065F])/gm, /\u064D \u062C(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u062C(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u062C(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u062C(?:[\u064B-\u065F])/gm, /\u0646\u0652\u062C(?:[\u064B-\u065F])/gm, /\u064B\u062C(?:[\u064B-\u065F])/gm, /\u064C\u062C(?:[\u064B-\u065F])/gm, /\u064D\u062C(?:[\u064B-\u065F])/gm, /\u064B\u0627\u062C(?:[\u064B-\u065F])/gm,
  // Da
  /\u0646(?![\u064B-\u065F]) \u062F(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u062F(?:[\u064B-\u065F])/gm, /\u064B \u062F(?:[\u064B-\u065F])/gm, /\u064C \u062F(?:[\u064B-\u065F])/gm, /\u064D \u062F(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u062F(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u062F(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u062F(?:[\u064B-\u065F])/gm, /\u0646\u0652\u062F(?:[\u064B-\u065F])/gm, /\u064B\u062F(?:[\u064B-\u065F])/gm, /\u064C\u062F(?:[\u064B-\u065F])/gm, /\u064D\u062F(?:[\u064B-\u065F])/gm, /\u064B\u0627\u062F(?:[\u064B-\u065F])/gm,
  // Dzal
  /\u0646(?![\u064B-\u065F]) \u0630(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0630(?:[\u064B-\u065F])/gm, /\u064B \u0630(?:[\u064B-\u065F])/gm, /\u064C \u0630(?:[\u064B-\u065F])/gm, /\u064D \u0630(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0630(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0630(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0630(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0630(?:[\u064B-\u065F])/gm, /\u064B\u0630(?:[\u064B-\u065F])/gm, /\u064C\u0630(?:[\u064B-\u065F])/gm, /\u064D\u0630(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0630(?:[\u064B-\u065F])/gm,
  // Za
  /\u0646(?![\u064B-\u065F]) \u0632(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0632(?:[\u064B-\u065F])/gm, /\u064B \u0632(?:[\u064B-\u065F])/gm, /\u064C \u0632(?:[\u064B-\u065F])/gm, /\u064D \u0632(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0632(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0632(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0632(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0632(?:[\u064B-\u065F])/gm, /\u064B\u0632(?:[\u064B-\u065F])/gm, /\u064C\u0632(?:[\u064B-\u065F])/gm, /\u064D\u0632(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0632(?:[\u064B-\u065F])/gm,
  // Sa
  /\u0646(?![\u064B-\u065F]) \u0633(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0633(?:[\u064B-\u065F])/gm, /\u064B \u0633(?:[\u064B-\u065F])/gm, /\u064C \u0633(?:[\u064B-\u065F])/gm, /\u064D \u0633(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0633(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0633(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0633(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0633(?:[\u064B-\u065F])/gm, /\u064B\u0633(?:[\u064B-\u065F])/gm, /\u064C\u0633(?:[\u064B-\u065F])/gm, /\u064D\u0633(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0633(?:[\u064B-\u065F])/gm,
  // Syin
  /\u0646(?![\u064B-\u065F]) \u0634(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0634(?:[\u064B-\u065F])/gm, /\u064B \u0634(?:[\u064B-\u065F])/gm, /\u064C \u0634(?:[\u064B-\u065F])/gm, /\u064D \u0634(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0634(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0634(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0634(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0634(?:[\u064B-\u065F])/gm, /\u064B\u0634(?:[\u064B-\u065F])/gm, /\u064C\u0634(?:[\u064B-\u065F])/gm, /\u064D\u0634(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0634(?:[\u064B-\u065F])/gm,
  // Shod
  /\u0646(?![\u064B-\u065F]) \u0635(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0635(?:[\u064B-\u065F])/gm, /\u064B \u0635(?:[\u064B-\u065F])/gm, /\u064C \u0635(?:[\u064B-\u065F])/gm, /\u064D \u0635(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0635(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0635(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0635(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0635(?:[\u064B-\u065F])/gm, /\u064B\u0635(?:[\u064B-\u065F])/gm, /\u064C\u0635(?:[\u064B-\u065F])/gm, /\u064D\u0635(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0635(?:[\u064B-\u065F])/gm,
  // Dhod
  /\u0646(?![\u064B-\u065F]) \u0636(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0636(?:[\u064B-\u065F])/gm, /\u064B \u0636(?:[\u064B-\u065F])/gm, /\u064C \u0636(?:[\u064B-\u065F])/gm, /\u064D \u0636(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0636(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0636(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0636(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0636(?:[\u064B-\u065F])/gm, /\u064B\u0636(?:[\u064B-\u065F])/gm, /\u064C\u0636(?:[\u064B-\u065F])/gm, /\u064D\u0636(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0636(?:[\u064B-\u065F])/gm,
  // Tho
  /\u0646(?![\u064B-\u065F]) \u0637(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0637(?:[\u064B-\u065F])/gm, /\u064B \u0637(?:[\u064B-\u065F])/gm, /\u064C \u0637(?:[\u064B-\u065F])/gm, /\u064D \u0637(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0637(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0637(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0637(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0637(?:[\u064B-\u065F])/gm, /\u064B\u0637(?:[\u064B-\u065F])/gm, /\u064C\u0637(?:[\u064B-\u065F])/gm, /\u064D\u0637(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0637(?:[\u064B-\u065F])/gm,
  // Dzho
  /\u0646(?![\u064B-\u065F]) \u0638(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0638(?:[\u064B-\u065F])/gm, /\u064B \u0638(?:[\u064B-\u065F])/gm, /\u064C \u0638(?:[\u064B-\u065F])/gm, /\u064D \u0638(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0638(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0638(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0638(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0638(?:[\u064B-\u065F])/gm, /\u064B\u0638(?:[\u064B-\u065F])/gm, /\u064C\u0638(?:[\u064B-\u065F])/gm, /\u064D\u0638(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0638(?:[\u064B-\u065F])/gm,
  // Fa
  /\u0646(?![\u064B-\u065F]) \u0641(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0641(?:[\u064B-\u065F])/gm, /\u064B \u0641(?:[\u064B-\u065F])/gm, /\u064C \u0641(?:[\u064B-\u065F])/gm, /\u064D \u0641(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0641(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0641(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0641(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0641(?:[\u064B-\u065F])/gm, /\u064B\u0641(?:[\u064B-\u065F])/gm, /\u064C\u0641(?:[\u064B-\u065F])/gm, /\u064D\u0641(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0641(?:[\u064B-\u065F])/gm,
  // Qaf
  /\u0646(?![\u064B-\u065F]) \u0642(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0642(?:[\u064B-\u065F])/gm, /\u064B \u0642(?:[\u064B-\u065F])/gm, /\u064C \u0642(?:[\u064B-\u065F])/gm, /\u064D \u0642(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0642(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0642(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0642(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0642(?:[\u064B-\u065F])/gm, /\u064B\u0642(?:[\u064B-\u065F])/gm, /\u064C\u0642(?:[\u064B-\u065F])/gm, /\u064D\u0642(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0642(?:[\u064B-\u065F])/gm,
  // Ka
  /\u0646(?![\u064B-\u065F]) \u0643(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u0643(?:[\u064B-\u065F])/gm, /\u064B \u0643(?:[\u064B-\u065F])/gm, /\u064C \u0643(?:[\u064B-\u065F])/gm, /\u064D \u0643(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u0643(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u0643(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u0643(?:[\u064B-\u065F])/gm, /\u0646\u0652\u0643(?:[\u064B-\u065F])/gm, /\u064B\u0643(?:[\u064B-\u065F])/gm, /\u064C\u0643(?:[\u064B-\u065F])/gm, /\u064D\u0643(?:[\u064B-\u065F])/gm, /\u064B\u0627\u0643(?:[\u064B-\u065F])/gm,
  // Kaf
  /\u0646(?![\u064B-\u065F]) \u06A9(?:[\u064B-\u065F])/gm, /\u0646\u0652 \u06A9(?:[\u064B-\u065F])/gm, /\u064B \u06A9(?:[\u064B-\u065F])/gm, /\u064C \u06A9(?:[\u064B-\u065F])/gm, /\u064D \u06A9(?:[\u064B-\u065F])/gm, /\u064B \u0627 \u06A9(?:[\u064B-\u065F])/gm, /\u064B\u0627 \u06A9(?:[\u064B-\u065F])/gm,
  /\u0646(?![\u064B-\u065F])\u06A9(?:[\u064B-\u065F])/gm, /\u0646\u0652\u06A9(?:[\u064B-\u065F])/gm, /\u064B\u06A9(?:[\u064B-\u065F])/gm, /\u064C\u06A9(?:[\u064B-\u065F])/gm, /\u064D\u06A9(?:[\u064B-\u065F])/gm, /\u064B\u0627\u06A9(?:[\u064B-\u065F])/gm
]

const extractIdzharSyafawiCharacters = () => [
  // Neither Mim nor Ba
  /\u0645(?![\u064B-\u065F]) (?![مب])(?:[\u064B-\u065F])/gm,
  /\u0645(?![\u064B-\u065F])(?![مب])(?:[\u064B-\u065F])/gm, /مْ (?![مب])/gm, /مْ(?![مب])/gm]

const extractIkhfaSyafawiCharacters = () => [
  /\u0645(?![\u064B-\u065F]) \u0628(?:[\u064B-\u065F])/gm, /مْ ب/gm,
  /\u0645(?![\u064B-\u065F])\u0628(?:[\u064B-\u065F])/gm, /مْب/gm
]

const extractIdghamMimiCharacters = () => [
  // Mim only of Idgham Mutamasilain
  /\u0645(?![\u064B-\u065F]) \u0645(?:[\u064B-\u065F])/gm, /مْ م/gm,
  /\u0645(?![\u064B-\u065F])\u0645(?:[\u064B-\u065F])/gm, /مْم/gm
]

const extractIdghamMutamasilainCharacters = () => [
  [...extractIdghamMimiCharacters()],
  // Ta
  /تْ ت/gm, /تْت/gm,
  /\u062A(?![\u064B-\u065F]) \u062A(?:[\u064B-\u065F])/gm,
  /\u062A(?![\u064B-\u065F])\u062A(?:[\u064B-\u065F])/gm,
  // Da
  /دْ د/gm, /دْد/gm,
  /\u062F(?![\u064B-\u065F]) \u062F(?:[\u064B-\u065F])/gm,
  /\u062F(?![\u064B-\u065F])\u062F(?:[\u064B-\u065F])/gm,
  // Fa
  /فْ ف/gm, /فْف/gm,
  /\u0641(?![\u064B-\u065F]) \u0641(?:[\u064B-\u065F])/gm,
  /\u0641(?![\u064B-\u065F])\u0641(?:[\u064B-\u065F])/gm,
  // Ba
  /بْ ب/gm, /بْب/gm,
  /\u0628(?![\u064B-\u065F]) \u0628(?:[\u064B-\u065F])/gm,
  /\u0628(?![\u064B-\u065F])\u0628(?:[\u064B-\u065F])/gm,
  // Lam
  /لْ ل/gm, /لْل/gm,
  /\u0644(?![\u064B-\u065F]) \u0644(?:[\u064B-\u065F])/gm,
  /\u0644(?![\u064B-\u065F])\u0644(?:[\u064B-\u065F])/gm
]

const extractIdghamMutajaanisainCharacters = () => [
  // Ta, Tho
  'تْط', 'تْ ط',
  // Ta, Dal
  'تْد', 'تْ د',
  // Dal, Ta
  'دْت', 'دْ ت',
  // Dzal, Dzho
  'ذْظ', 'ذْ ظ',
  // Tho, Ta
  'طْت', 'طْ ت',
  // Lam, Rho
  'لْر', 'لْ ر'
]

const extractIdghamMutaqooribainCharacters = () => ['بْم', 'بْ م', 'تْث', 'تْ ث', 'ثْذ', 'ثْ ذ', 'قْك', 'قْ ك']

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
  // Ba
  /\u0628\u0652(?![\u0628])(?![\u064B-\u065F])/gm, /\u0628\u0652 (?![\u0628])(?![\u064B-\u065F])/gm,
  // Ja
  /\u062C\u0652(?![\u062C])(?![\u064B-\u065F])/gm, /\u062C\u0652 (?![\u062C])(?![\u064B-\u065F])/gm,
  // Dal
  /\u062F\u0652(?![\u062F])(?![\u064B-\u065F])/gm, /\u062F\u0652 (?![\u062F])(?![\u064B-\u065F])/gm,
  // Tho
  /\u0637\u0652(?![\u0637])(?![\u064B-\u065F])/gm, /\u0637\u0652 (?![\u0637])(?![\u064B-\u065F])/gm,
  // Qaf
  /\u0642\u0652(?![\u0642])(?![\u064B-\u065F])/gm, /\u0642\u0652 (?![\u0642])(?![\u064B-\u065F])/gm,
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
  // Alif
  /\u064E\u0627(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u064E \u0627(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm, /\u064E\u0627(?![\u064B-\u065F])\u0627(?![\u064B-\u065F])/gm, /\u064E \u0627(?![\u064B-\u065F]) \u0627(?![\u064B-\u065F])/gm,
  // Wau
  /\u064F\u0648\u0652(?![\u0621-\u0627])/gm, /\u064F \u0648\u0652 (?![\u0621-\u0627])/gm, /\u064F\u0648\u06DF/gm, /\u064F \u0648\u06DF/gm,
  /\u064F\u0648(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u064F \u0648(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm, /\u064F\u0648(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u064F \u0648(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm,
  // Ya
  /\u0650\u064A\u0652(?![\u0621-\u0627])/gm, /\u0650 \u064A\u0652 (?![\u0621-\u0627])/gm, /\u0650\u064A\u06DF/gm, /\u0650 \u064A\u06DF/gm,
  /\u0650\u064A(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u0650 \u064A(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm, /\u0650\u064A(?![\u064B-\u065F])(?![\u0621-\u0627])/gm, /\u0650 \u064A(?![\u064B-\u065F]) (?![\u0621-\u0627])/gm,
  /(?:[\u0628-\u0646])\u0656(?![\u0621-\u0627])/gm, /(?:[\u0628-\u0646])\u0670(?![\u0621-\u0627])/gm, /(?:[\u0628-\u0646])\u0657(?![\u0621-\u0627])/gm,
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
    color: '#0040ff',
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
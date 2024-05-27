import { buildRegExp } from "./data"

const createTooltipWorker = () => {
  const workerScript = `
    const buildRegExp = ${buildRegExp.toString()}
    self.onmessage = function(event) {
      const { tajweedData, innerHTML } = event.data
      const matchedTajweed = tajweedData.filter(tajweedLaw => {
        const regex = buildRegExp(tajweedLaw.rules)
        return regex.test(innerHTML)
      })
      self.postMessage(matchedTajweed)
    }
  `
  const blob = new Blob([workerScript], { type: 'application/javascript' })
  return new Worker(URL.createObjectURL(blob))
}

const createColorizationWorker = () => {
  const workerScript = `
    self.onmessage = function(event) {
      const { recognizedText, tajweedLaws, waqfMuanaqohContinuityTajweedLaws, isOddPosition } = event.data
      let colorizedChars = recognizedText.replace(/\\u0627\\u0653(?!\\s*[\\u0621-\\u0627]|\\s*[\\u0648\\u0649][\\u0654\\u0655])/gm, '\\u0627\\u06E4')
      if (colorizedChars.includes('\\u06DB')) {
        const applyOptionalColor = (part, regex, id, color) => {
          return part.replace(regex, match => '<span class="tajweed-' + id + '" style="color: ' + color + '; cursor: pointer;">' + match + '</span>')
        }
        const parts = colorizedChars.split('\\u06DB')
        const waqfTajweedLaws = waqfMuanaqohContinuityTajweedLaws
        colorizedChars = parts.map((part, i) => {
          let relevantLaws = (i % 2 === 0) ? waqfTajweedLaws : tajweedLaws
          isOddPosition ? relevantLaws = (i % 2 !== 0) ? waqfTajweedLaws : tajweedLaws : relevantLaws = (i % 2 === 0) ? waqfTajweedLaws : tajweedLaws
          relevantLaws.forEach(tajweedLaw => {
            tajweedLaw.rules.forEach(rule => {
              const regex = (typeof rule === 'string') ? new RegExp('(' + rule + ')', 'gm') : rule
              part = applyOptionalColor(i >= parts.length - 1 ? part : part + '\\u06DB', regex, tajweedLaw.id, tajweedLaw.color)
            })
          })
          return part.replace(/\\u06DB+/gm, '\\u06DB')
        }).join('')
      } else {
        const applyColor = (regex, id, color) => {
          colorizedChars = colorizedChars.replace(regex, match => '<span class="tajweed-' + id + '" style="color: ' + color + '; cursor: pointer;">' + match + '</span>')
        }
        tajweedLaws.forEach(tajweedLaw => {
          tajweedLaw.rules.forEach(rule => {
            const regex = (typeof rule === 'string') ? new RegExp('(' + rule + ')', 'gm') : rule
            applyColor(regex, tajweedLaw.id, tajweedLaw.color)
          })
        })
      }
      self.postMessage(colorizedChars)
    }
  `
  const blob = new Blob([workerScript], { type: 'application/javascript' })
  return new Worker(URL.createObjectURL(blob))
}


export { createTooltipWorker, createColorizationWorker }
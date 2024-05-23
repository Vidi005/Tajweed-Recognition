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
      const { recognizedText, tajweedLaws } = event.data
      let colorizedChars = recognizedText.replace(/\\u0627\\u0653(?!\\s*[\\u0621-\\u0627]|\\s*[\\u0648\\u0649][\\u0654\\u0655])/gm, '\\u0627\\u06E4')
      const applyColor = (regex, id, color) => {
        colorizedChars = colorizedChars.replace(regex, (match) => {
          return '<span class="tajweed-' + id + '" style="color: ' + color + '; cursor: pointer;">' + match + '</span>'
        })
      }
      tajweedLaws.forEach(tajweedLaw => {
        tajweedLaw.rules.forEach(rule => {
          if (typeof rule === 'string') {
            const regex = new RegExp('(' + rule + ')', 'gm')
            applyColor(regex, tajweedLaw.id, tajweedLaw.color)
          } else applyColor(rule, tajweedLaw.id, tajweedLaw.color)
        })
      })
      self.postMessage(colorizedChars)
    }
  `
  const blob = new Blob([workerScript], { type: 'application/javascript' })
  return new Worker(URL.createObjectURL(blob))
}

export { createTooltipWorker, createColorizationWorker }
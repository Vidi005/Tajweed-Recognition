import React from "react"
import Swal from "sweetalert2"
import { extractGunnahCharacters, extractIdghamBigunnahCharacters, extractIdghamBilagunnahCharacters, extractIdghamMimiCharacters, extractIdghamSyamsiyahCharacters, extractIdzharCharacters, extractIdzharQamariyahCharacters, extractIdzharSyafawiCharacters, extractIkhfaCharacters, extractIkhfaSyafawiCharacters, extractIqlabCharacters, extractMadAridLissukunCharacters, extractMadBadalCharacters, extractMadIwadCharacters, extractMadJaizCharacters, extractMadLayyinCharacters, extractMadLazimMukhaffafKilmiCharacters, extractMadLazimMutsaqqalKilmiCharacters, extractMadShilahQashirahCharacters, extractMadShilahThawilahCharacters, extractMadThabiiCharacters, extractMadWajibCharacters, extractQalqalahSughraCharacters, isStorageExist, twTextSizes } from "../../../../../utils/data"
import Tesseract from "tesseract.js"
import ResultContainer from "./import_mode/ResultContainer"

class RecognitionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.cameraRef = React.createRef()
    this.stream = null
    this.state = {
      CONTENT_DARK_STORAGE_KEY: 'CONTENT_DARK_STORE_KEY',
      facingMode: 'environment',
      recognizedText: '',
      twTextSize: '1.5rem',
      coloredTajweeds: [],
      isCameraModeSelected: false,
      isScreenSharingModeSelected: false,
      isCameraPermissionGranted: false,
      isBtnCaptureClicked: false,
      isRecognizing: false,
      isIncreaseTextDisabled: false,
      isDecreaseTextDisabled: false,
      isEditMode: false,
      isContentDarkMode: false,
      isResultClosed: true
    }
  }

  componentDidMount() {
    this.checkLocalStorage()
    addEventListener('beforeunload', this.onUnloadPage)
  }

  componentDidUpdate() {
    if (this.state.isRecognizing || !this.state.isResultClosed) {
      document.body.style.overflow = 'hidden'
    } else document.body.style.overflow = 'auto'
  }

  componentWillUnmount () {
    removeEventListener('beforeunload', this.onUnloadPage)
  }

  checkLocalStorage() {
    isStorageExist('Your browser does not support Local Storage/Cookies!\nPlease enable cookies in your browser settings or disable incognito mode.\nThank you.')
    if (isStorageExist('')) {
      this.checkContentDisplayMode()
    }
  }

  checkContentDisplayMode() {
    const getContentDisplayModeFromLocal = localStorage.getItem(this.state.CONTENT_DARK_STORAGE_KEY)
    try {
      const parsedContentDisplayMode = JSON.parse(getContentDisplayModeFromLocal)
      if (parsedContentDisplayMode !== undefined || parsedContentDisplayMode !== null) {
        this.setState({ isContentDarkMode: parsedContentDisplayMode })
      }
    } catch (error) {
      localStorage.removeItem(this.state.CONTENT_DARK_STORAGE_KEY)
      alert(`Error: ${error.message}\nPlease reload the page.`)
    }
  }

  increaseTextSize() {
    const currentIndex = twTextSizes().indexOf(this.state.twTextSize)
    if (currentIndex < twTextSizes().length - 1) {
      this.setState({ twTextSize: twTextSizes()[currentIndex + 1], isDecreaseTextDisabled: false })
    } else this.setState({ isIncreaseTextDisabled: true })
  }

  decreaseTextSize() {
    const currentIndex = twTextSizes().indexOf(this.state.twTextSize)
    if (currentIndex > 0) {
      this.setState({ twTextSize: twTextSizes()[currentIndex - 1], isIncreaseTextDisabled: false })
    } else this.setState({ isDecreaseTextDisabled: true })
  }

  handleTextEditor() {
    this.setState(prevState => ({ isEditMode: !prevState.isEditMode }), () => {
      scrollTo(0, 0)
      if (!this.state.isEditMode) this.setState({ coloredTajweeds: this.colorizeChars(this.state.recognizedText) })
    })
  }

  onContentChangeEventHandler(event) {
    this.setState(prevState => ({
      ...prevState,
      recognizedText: event.target.value
    }))
  }

  setContentDisplayMode() {
    this.setState(prevState => ({
      isContentDarkMode: !prevState.isContentDarkMode
    }), () => this.saveContentDisplayMode(this.state.isContentDarkMode))
  }

  saveContentDisplayMode(selectedDisplayMode) {
    if (isStorageExist('Your browser does not support Local Storage/Cookies!\nPlease enable cookies in your browser settings or disable incognito mode.\nThank you.')) {
      localStorage.setItem(this.state.CONTENT_DARK_STORAGE_KEY, JSON.stringify(selectedDisplayMode))
    }
  }

  pickImage = (event) => {
    if (event.target.files.length === 0) return
    this.setState({
      isRecognizing: true
    }, () => {
      const file = event.target.files[0]
      const validImageExtensions = ['jpeg', 'jpg', 'png', 'webp', 'bmp', 'heic', 'svg']
      const fileExtension = file.name.split('.').pop().toLowerCase()
      if (!validImageExtensions.includes(fileExtension)) {
        this.setState({
          isRecognizing: false
        }, () => {
          Swal.fire({
            icon: 'error',
            title: 'Unsupported File Type!',
            text: 'Please select an image file.'
          })
        })
        return
      }
      if (file) {
        const maxSize = 5 * 1024 * 1024
        if (file.size > maxSize) {
          this.setState({ isRecognizing: false }, () => {
            Swal.fire({
              icon: 'error',
              title: 'File Size Exceeded!',
              text: 'Please select an image file less than 5MB.'
            })
          })
          return
        }
        this.recognizeImage(file)
      }
    })
  }

  async recognizeImage(file) {
    try {
      const { data } = await Tesseract.recognize(file, 'ara', {
        recognize_character: true,
        deskew: true,
        invert: true,
        psm: 6
      })
      if (data && data.text.length > 0) {
        this.setState({
          isRecognizing: false,
          recognizedText: data.text.split('\n').join(' ').trim().replace(/\s+/g, ' '),
          coloredTajweeds: this.colorizeChars(data.text.trim()),
          isResultClosed: false })
      } else {
        this.setState({ isRecognizing: false })
        Swal.fire({
          title: 'There was no Arabic text found!',
          text: 'Please try other contained Arabic Characters image.',
          icon: 'error',
          confirmButtonColor: 'green'
        })
      }
    } catch (error) {
      this.setState({ isRecognizing: false })
      Swal.fire({
        icon: 'error',
        title: 'Failed to Recognize Text!',
        text: error.message
      })
    }
  }

  onUnloadPage (event) {
    event.preventDefault()
    event.returnValue = 'Are you sure want to close this result?'
  }
  
  colorizeChars(recognizedText) {
    const idzharTajweed = extractIdzharCharacters()
    const idghamBigunnahTajweed = extractIdghamBigunnahCharacters()
    const idghamBilagunnahTajweed = extractIdghamBilagunnahCharacters()
    const iqlabTajweed = extractIqlabCharacters()
    const ikhfaTajweed = extractIkhfaCharacters()
    const idzharSyafawiTajweed = extractIdzharSyafawiCharacters()
    const ikhfaSyafawiTajweed = extractIkhfaSyafawiCharacters()
    const idghamMimiTajweed = extractIdghamMimiCharacters()
    const gunnahTajweed = extractGunnahCharacters()
    const idzharQamariyahTajweed = extractIdzharQamariyahCharacters()
    const idghamSyamsiyahTajweed = extractIdghamSyamsiyahCharacters()
    const qalqalahSughraTajweed = extractQalqalahSughraCharacters()
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

    let colorizedChars = recognizedText
    // const shouldSkip = (currentRule, nextRule) => {
    //   // Define rules that should be skipped based on the presence of another rule
    //   const skipRules = {
    //     'madTabiiTajweed': ['madWajibTajweed', 'madJaizTajweed', 'madAridLissukunTajweed', 'madShilahQashirahTajweed', 'madShilahThawilahTajweed', 'madIwadTajweed', 'madBadalTajweed']
    //   }
    //   return skipRules[currentRule] && skipRules[currentRule].includes(nextRule)
    // }

    // const applyColor = (regex, color) => {
    //   colorizedChars = colorizedChars.replace(regex, (match) => `<span style="color: ${color}">${match}</span>`)
    // }

    // const applyColorIfNotSkipped = (currentRule, regex, color) => {
    //   const nextRuleMatch = colorizedChars.match(/\b\w+\b/gm) // Get the next word
    //   const nextRule = nextRuleMatch && nextRuleMatch[0]

    //   if (!nextRule || !shouldSkip(currentRule, nextRule)) {
    //     applyColor(regex, color)
    //   }
    // }
    const isInsideSpan = (startIdx, endIdx) => {
      const spanRegex = /<span\b[^>]*>(.*?)<\/span>/g
      let match
      while ((match = spanRegex.exec(colorizedChars)) !== null) {
        const spanStart = match.index
        const spanEnd = spanStart + match[0].length
        if (startIdx >= spanStart && endIdx <= spanEnd) {
          return true
        }
      }
      return false
    }
    const applyColor = (regex, color) => {
      colorizedChars = colorizedChars.replace(regex, (match, startIdx, endIdx) => {
        if (!isInsideSpan(startIdx, endIdx)) {
          return `<span style="color: ${color}">${match}</span>`
        } else {
          return match
        }
      })
    }

    idzharTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ff0000">$1</span>')
    })
    idghamBigunnahTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ff8000">$1</span>')
    })
    idghamBilagunnahTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ffbf00">$1</span>')
    })
    iqlabTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ffff00">$1</span>')
    })
    ikhfaTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #bfff00">$1</span>')
    })
    idzharSyafawiTajweed.forEach(regex => {
      colorizedChars = colorizedChars.replace(regex, (match) => `<span style="color: #80ff00">${match}</span>`)
    })
    ikhfaSyafawiTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #40ff00">$1</span>')
    })
    idghamMimiTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #00ff00">$1</span>')
    })
    gunnahTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #00ff40">$1</span>')
    })
    idzharQamariyahTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #00ff80">$1</span>')
    })
    idghamSyamsiyahTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #00ffbf">$1</span>')
    })
    qalqalahSughraTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #00ffff">$1</span>')
    })
    madWajibTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #0080ff">$1</span>')
    })
    madJaizTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #0040ff">$1</span>')
    })
    madAridLissukunTajweed.forEach(regex => {
      colorizedChars = colorizedChars.replace(regex, match => `<span style="color: #bf00ff">${match}</span>`)
    })
    madShilahQashirahTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ff00ff">$1</span>')
    })
    madShilahThawilahTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ff00bf">$1</span>')
    })
    madBadalTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ff0040">$1</span>')
    })
    madIwadTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #ff0080">$1</span>')
    })
    madThabiiTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      applyColor(regex, '#00bfff')
      // colorizedChars = colorizedChars.replace(regex, '<span style="color: #00bfff">$1</span>')
    })
    madLazimMutsaqqalKilmiTajweed.forEach(regex => {
      colorizedChars = colorizedChars.replace(regex, match => `<span style="color: #0000ff">${match}</span>`)
    })
    // const applyMadLazimMutsaqqalColor = (match, _, nextChars) => {
    //   return this.extractAndColorizeMadLazimMutsaqqalKilmi(match, nextChars)
    // }
    // madLazimMutsaqqalKilmiTajweed.forEach(regex => {
    //   colorizedChars = colorizedChars.replace(regex, applyMadLazimMutsaqqalColor)
    // })
    madLazimMukhaffafKilmiTajweed.forEach(regex => {
      colorizedChars = colorizedChars.replace(regex, match => `<span style="color: #4000ff">${match}</span>`)
    })
    madLayyinTajweed.forEach(string => {
      const regex = new RegExp(`(${string})`, 'gm')
      colorizedChars = colorizedChars.replace(regex, '<span style="color: #8000ff">$1</span>')
    })
    return colorizedChars
  }

  // extractAndColorizeMadLazimMutsaqqalKilmi = (colorizedChars, nextChars) => {
  //   // Regular expression to match "Mad Lazim Mutsaqqal Kilmi"
  //   const regex = /(\\u064E[\\u0627\\u0648\\u0649]\s?)([\\u0651\\u0605\\u0653]?)/
  
  //   const match = nextChars.match(regex)
  
  //   if (match !== null && match[0].length === nextChars.length) {
  //     return `<span style="color: #0000ff">${colorizedChars}</span>`
  //   }
  
  //   return colorizedChars
  // }

  closeResult () {
    this.setState({ isResultClosed: true })
  }

  render() {
    return (
      <React.Fragment>
        <h2>Recognize Tajweed</h2>
        <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quod, dolore enim velit repellendus eius distinctio repellat, dicta ducimus blanditiis beatae deserunt consequuntur aspernatur magnam aperiam fuga temporibus rem libero!</p>
        <div className="btn-container grid grid-flow-row gap-4 items-center justify-center">
          <button className="btn-capture flex items-center px-4 py-2 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50">
            <img className="h-7 mr-2" src="images/camera-icon.svg" alt="Capture Image" />
            <h5>Capture Image</h5>
          </button>
          <label htmlFor="image-picker" className="btn-import flex items-center px-4 py-2 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 cursor-pointer">
            <input type="file" id="image-picker" className="hidden" accept="image/*" onChange={this.pickImage.bind(this)} />
            <img className="h-7 mr-2" src="images/import-icon.svg" alt="Select an Image" />
            <h5>Select Image</h5>
          </label>
          <button className="btn-capture flex items-center px-4 py-2 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50">
            <img className="h-7 mr-2" src="images/share-screen-icon.svg" alt="Screen Capture" />
            <h5>Screen Capture</h5>
          </button>
        </div>
        <br />
        <h5>Tajweed Recognition @ 2024</h5>
        {this.state.isRecognizing && (
          <div className="fixed inset-0 w-screen h-full flex items-center justify-center bg-black/50 backdrop-blur-sm duration-200 animate__animated animate__fadeIn">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-8 h-8 aspect-square border-t-2 border-r-2 border-t-white border-r-white rounded-full bg-transparent animate-spin"></span>
              <span className="text-white text-xl">Recognizing...</span>
            </div>
          </div>
    )}
        <ResultContainer
          props={this.props}
          isResultClosed={this.state.isResultClosed}
          twTextSize={this.state.twTextSize}
          isIncreaseTextDisabled={this.state.isIncreaseTextDisabled}
          isDecreaseTextDisabled={this.state.isDecreaseTextDisabled}
          isEditMode={this.state.isEditMode}
          isContentDarkMode={this.state.isContentDarkMode}
          closeResult={this.closeResult.bind(this)}
          increaseTextSize={this.increaseTextSize.bind(this)}
          decreaseTextSize={this.decreaseTextSize.bind(this)}
          handleTextEditor={this.handleTextEditor.bind(this)}
          onContentChangeHandler={this.onContentChangeEventHandler.bind(this)}
          setContentDisplayMode={this.setContentDisplayMode.bind(this)}
          coloredTajweeds={this.state.coloredTajweeds}
          recognizedText={this.state.recognizedText}
        />
      </React.Fragment>
    )
  }
}

export default RecognitionContainer
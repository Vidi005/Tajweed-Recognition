import React from "react"
import Swal from "sweetalert2"
import { isStorageExist, tajweedLaws, twTextSizes } from "../../../../../utils/data"
import Tesseract from "tesseract.js"
import ResultContainer from "./ResultContainer"
import DropZoneContainer from "./import_mode/DropZoneContainer"

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
      tooltipContent: '',
      tooltipColor: '',
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
      // isHovered: false,
      // hoveredTajweed: null,
      isResultClosed: true
    }
    this.tooltipRef = React.createRef()
    this.contentContainerRef = React.createRef()
    // this.hoveredElementRef = React.createRef()
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

  pickImage = (files) => {
    if (files.length === 0) return
    this.setState({
      isRecognizing: true
    }, () => {
      const file = files[0]
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
      const spanRegex = /<span\b[^>]*>(.*?)<\/span>/gm
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
    tajweedLaws().forEach(tajweedLaw => {
      tajweedLaw.rules.forEach(rule => {
        if (typeof rule === 'string') {
          const regex = new RegExp(`(${rule})`, 'gm')
          applyColor(regex, tajweedLaw.color)
        } else {
          applyColor(rule, tajweedLaw.color)
        }
      })
    })
    return colorizedChars
  }

  showTooltip(event) {
    const matchedTajweed = tajweedLaws().find(tajweedLaw => {
      const regex = this.buildRegExp(tajweedLaw.rules)
      return regex.test(event.target.innerHTML)
    })
    if (matchedTajweed) {
      const tooltipColor = matchedTajweed.color
      this.setState({
        tooltipContent: matchedTajweed.name || '',
        tooltipColor: tooltipColor,
      })
      const contentContainerRect = this.contentContainerRef.current.getBoundingClientRect()
      const tooltip = this.tooltipRef.current
      const tooltipWidth = tooltip.offsetWidth
      const tooltipHeight = tooltip.offsetHeight
      const containerHalfWidth = contentContainerRect.width / 2
      const leftPosition = event.clientX
      if (leftPosition < containerHalfWidth) {
        tooltip.style.left = `${leftPosition}px`
        tooltip.style.right = 'auto'
      } else {
        tooltip.style.left = `${leftPosition - tooltipWidth}px`
        tooltip.style.right = 'auto'
      }
      tooltip.style.top = `${event.clientY - tooltipHeight - 10}px`
      tooltip.style.backgroundColor = tooltipColor
    }
  }

  buildRegExp(rules) {
    const isRegexArray = rules.every(rule => rule instanceof RegExp)
    if (isRegexArray) {
      return new RegExp(`${rules.map(regex => regex.source).join('|')}`, 'gm')
    } else {
      return new RegExp(`(${rules.join('|')})`, 'gm')
    }
  }

  hideTooltip() {
    this.setState({
      tooltipContent: '',
      tooltipColor: ''
    })
  }

  // handleMouseEnter(tajweedLaw) {
  //   const rect = this.hoveredElementRef.current.getBoundingClientRect()
  //   const isCursorHalfPos = window.innerWidth / 2 < rect.right
  //   const adjustedPos = isCursorHalfPos ? rect.left : rect.right
  //   this.setState({
  //     isHovered: true,
  //     hoveredTajweed: tajweedLaw,
  //     popUpPos: {
  //       top: rect.bottom,
  //       left: adjustedPos
  //     }})
  // }

  // handleMouseLeave() {
  //   this.setState({ isHovered: false, hoveredTajweed: null })
  // }

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
        <DropZoneContainer pickImage={this.pickImage.bind(this)}/>
        <h2>Recognize Tajweed</h2>
        <p className="relative text-justify md:mx-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo quod, dolore enim velit repellendus eius distinctio repellat, dicta ducimus blanditiis beatae deserunt consequuntur aspernatur magnam aperiam fuga temporibus rem libero!</p>
        <div className="btn-container relative flex flex-wrap items-center justify-center">
          <button className="btn-capture grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 duration-200">
            <img className="h-8 md:h-12 mr-2" src="images/camera-icon.svg" alt="Capture Image" />
            <h5 className="md:text-lg whitespace-nowrap">Capture Image</h5>
          </button>
          <label htmlFor="image-picker" className="btn-import grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 cursor-pointer duration-200">
            <input type="file" id="image-picker" className="hidden" accept="image/*" onChange={e => this.pickImage(e.target.files)} />
            <img className="h-8 md:h-12 mr-2" src="images/import-icon.svg" alt="Select an Image" />
            <h5 className="md:text-lg flex-nowrap">Select Image</h5>
          </label>
          <button className="btn-capture grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 duration-200">
            <img className="h-8 md:h-12 mr-2" src="images/share-screen-icon.svg" alt="Screen Capture" />
            <h5 className="md:text-lg whitespace-nowrap">Screen Capture</h5>
          </button>
          <button className="btn-manual-input grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 duration-200">
            <img className="h-8 md:h-12 mr-2" src="images/input-text-icon.svg" alt="Manual Input" />
            <h5 className="md:text-lg whitespace-nowrap">Input Manually</h5>
          </button>
        </div>
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
          coloredTajweeds={this.state.coloredTajweeds}
          recognizedText={this.state.recognizedText}
          contentContainerRef={this.contentContainerRef}
          tooltipRef={this.tooltipRef}
          tooltipContent={this.state.tooltipContent}
          closeResult={this.closeResult.bind(this)}
          increaseTextSize={this.increaseTextSize.bind(this)}
          decreaseTextSize={this.decreaseTextSize.bind(this)}
          handleTextEditor={this.handleTextEditor.bind(this)}
          onContentChangeHandler={this.onContentChangeEventHandler.bind(this)}
          setContentDisplayMode={this.setContentDisplayMode.bind(this)}
          showTooltip={this.showTooltip.bind(this)}
          hideTooltip={this.hideTooltip.bind(this)}
        />
      </React.Fragment>
    )
  }
}

export default RecognitionContainer
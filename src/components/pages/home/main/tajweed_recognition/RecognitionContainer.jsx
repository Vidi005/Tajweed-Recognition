import React from "react"
import Swal from "sweetalert2"
import { isStorageExist, tajweedLaws, twTextSizes } from "../../../../../utils/data"
import Tesseract from "tesseract.js"
import ResultContainer from "./ResultContainer"
import DropZoneContainer from "./import_mode/DropZoneContainer"
import { withTranslation } from "react-i18next"
import en from "../../../../../locales/en.json"
import TajweedPreview from "./pop_up/TajweedPreview"

class RecognitionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.cameraRef = React.createRef()
    this.stream = null
    this.state = {
      CONTENT_DARK_STORAGE_KEY: 'CONTENT_DARK_STORE_KEY',
      RESULT_CONTENT_STORAGE_KEY: 'RESULT_CONTENT_STORE_KEY',
      facingMode: 'environment',
      recognizedText: '',
      twTextSize: '1.5rem',
      tooltipContent: '',
      tooltipColor: '',
      linesColor: '',
      selectedTajweed: {},
      coloredTajweeds: [],
      filteredTajweeds: [],
      lines: [],
      selectedTajweedIds: [],
      selectedTajweedLaws: [],
      isCameraModeSelected: false,
      isScreenSharingModeSelected: false,
      isCameraPermissionGranted: false,
      isBtnCaptureClicked: false,
      isRecognizing: false,
      isIncreaseTextDisabled: false,
      isDecreaseTextDisabled: false,
      isEditMode: false,
      isContentDarkMode: false,
      isResultClosed: true,
      isCarouselItemHovered: false,
      isModalOpened: false
    }
    this.tooltipRef = React.createRef()
    this.contentContainerRef = React.createRef()
    this.carouselItemsRefs = {}
    tajweedLaws().forEach(tajweedLaw => {
      this.carouselItemsRefs[`tajweed-${tajweedLaw.id}`] = React.createRef()
    })
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
    this.saveTempContentResultData()
  }

  checkLocalStorage() {
    isStorageExist(this.props.t('browser_warning'))
    if (isStorageExist('')) {
      this.checkContentDisplayMode()
      this.checkResultContentState()
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
      alert(`${this.props.t('error_alert')}: ${error.message}\n${this.props.t('error_solution')}.`)
    }
  }

  checkResultContentState() {
    const getResultContentTempData = sessionStorage.getItem(this.state.RESULT_CONTENT_STORAGE_KEY)
    if (getResultContentTempData) {
      const {
        recognizedText,
        twTextSize,
        coloredTajweeds,
        filteredTajweeds,
        selectedTajweedIds,
        selectedTajweedLaws,
        isResultClosed
      } = JSON.parse(getResultContentTempData)
      this.setState({
        recognizedText,
        twTextSize,
        coloredTajweeds,
        filteredTajweeds,
        selectedTajweedIds,
        selectedTajweedLaws,
        isResultClosed
      })
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
      if (!this.state.isEditMode) {
        this.setState({ coloredTajweeds: this.colorizeChars(this.state.recognizedText, tajweedLaws()) }, () => {
          this.filterColorizedTajweeds(this.state.coloredTajweeds)
        })
      }
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
    if (isStorageExist(this.props.t('browser_warning'))) {
      localStorage.setItem(this.state.CONTENT_DARK_STORAGE_KEY, JSON.stringify(selectedDisplayMode))
    }
  }

  saveTempContentResultData() {
    if (isStorageExist(this.props.t('browser_warning')) && this.state.coloredTajweeds.length > 0) {
      sessionStorage.setItem(this.state.RESULT_CONTENT_STORAGE_KEY, JSON.stringify({
        recognizedText: this.state.recognizedText,
        twTextSize: this.state.twTextSize,
        coloredTajweeds: this.state.coloredTajweeds,
        filteredTajweeds: this.state.filteredTajweeds,
        selectedTajweedIds: this.state.selectedTajweedIds,
        selectedTajweedLaws: this.state.selectedTajweedLaws,
        isResultClosed: this.state.isResultClosed
      }))
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
            title: this.props.t('invalid_file.0'),
            text: this.props.t('invalid_file.1')
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
              title: this.props.t('file_size_limit.0'),
              text: this.props.t('file_size_limit.1')
            })
          })
          return
        }
        this.recognizeImage(file)
      }
    })
  }

  takeScreenCapture = async() => {
    try {
      this.setState({ isRecognizing: true })
      const captureStream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: false
      })
      const videoElement = document.createElement('video')
      videoElement.srcObject = captureStream
      videoElement.autoplay = true
      await new Promise(resolve => {
        videoElement.onloadedmetadata = () => {
          videoElement.width = videoElement.videoWidth
          videoElement.height = videoElement.videoHeight
          resolve()
        }
      })
      const canvas = document.createElement('canvas')
      canvas.width = videoElement.videoWidth
      canvas.height = videoElement.videoHeight
      const ctx = canvas.getContext('2d')
      ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height)
      const imageUrl = canvas.toDataURL()
      this.setState({ isRecognizing: true }, () => this.recognizeImage(imageUrl))
      captureStream.getVideoTracks().forEach(track => track.stop())
    } catch (error) {
      this.setState({ isRecognizing: false })
      Swal.fire({
        title: this.props.t('capture_error'),
        text: error.message,
        icon: 'error',
        confirmButtonColor: 'green'
      })
    }
  }

  editTextInput() {
    this.setState({ isResultClosed: false, isEditMode: true })
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
          isEditMode: false,
          recognizedText: this.removeNonArabic(data.text.split('\n').join(' ').trim().replace(/\s+/g, ' ')),
          coloredTajweeds: this.colorizeChars(this.removeNonArabic(data.text.trim()), tajweedLaws()),
          isResultClosed: false }, () => this.filterColorizedTajweeds(this.state.coloredTajweeds))
      } else {
        this.setState({ isRecognizing: false })
        Swal.fire({
          title: this.props.t('empty_arabic_text.0'),
          text: this.props.t('empty_arabic_text.1'),
          icon: 'error',
          confirmButtonColor: 'green'
        })
      }
    } catch (error) {
      this.setState({ isRecognizing: false })
      Swal.fire({
        icon: 'error',
        title: this.props.t('recognition_failed'),
        text: error.message
      })
    }
  }

  removeNonArabic(text) {
    const arabicRegex = /[\u0600-\u06FF]/gm
    if (arabicRegex.test(text)) {
      return text.replace(/[^\u0600-\u06FF\s]/gm, '')
    } else {
      return ''
    }
  }

  onUnloadPage (event) {
    event.preventDefault()
    event.returnValue = this.props.t('unsaved_warning')
  }
  
  colorizeChars(recognizedText, tajweedLaws) {
    let colorizedChars = recognizedText
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
    const applyColor = (regex, id, color) => {
      colorizedChars = colorizedChars.replace(regex, (match, startIdx, endIdx) => {
        // if (!isInsideSpan(startIdx, endIdx)) {
        //   return `<span class="tajweed-${id}" style="color: ${color}; cursor: pointer;">${match}</span>`
        // } else {
        //   return match
        // }
        return `<span class="tajweed-${id}" style="color: ${color}; cursor: pointer;">${match}</span>`
      })
    }
    tajweedLaws.forEach(tajweedLaw => {
      tajweedLaw.rules.forEach(rule => {
        if (typeof rule === 'string') {
          const regex = new RegExp(`(${rule})`, 'gm')
          applyColor(regex, tajweedLaw.id, tajweedLaw.color)
        } else {
          applyColor(rule, tajweedLaw.id, tajweedLaw.color)
        }
      })
    })
    return colorizedChars
  }

  showTooltip(event) {
    const matchedTajweed = tajweedLaws().filter(tajweedLaw => {
      const regex = this.buildRegExp(tajweedLaw.rules)
      return regex.test(event.target.innerHTML)
    })
    if (matchedTajweed.length === 1) {
      const tooltipColor = `${matchedTajweed[0].color}80`
      this.setState({
        tooltipContent: matchedTajweed[0].name,
        tooltipColor: tooltipColor,
      })
      setTimeout(() => {
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
      }, 10)
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

  checkParamEvent(idParam) {
    if (typeof idParam !== 'number') {
      const event = idParam
      const matchedTajweed = tajweedLaws().filter(tajweedLaw => {
        const regex = this.buildRegExp(tajweedLaw.rules)
        return regex.test(event.target.innerHTML)
      })
      if (matchedTajweed.length === 1) {
        return matchedTajweed
      }
    } else {
      const tajweedId = idParam
      return tajweedLaws().filter(tajweedLaw => tajweedLaw.id === tajweedId) || []
    }
  }

  showSummaryModal(idParam) {
    if (this.checkParamEvent(idParam)?.length > 0) {
      const tajweedName = this.checkParamEvent(idParam)[0].name
      const summary = this.props.t(`tajweed_laws.${en.tajweed_laws.findIndex(tajweedLaw => tajweedLaw.id === this.checkParamEvent(idParam)[0].id)}.summary`)
      const detailPage = this.props.t(`tajweed_laws.${en.tajweed_laws.findIndex(tajweedLaw => tajweedLaw.id === this.checkParamEvent(idParam)[0].id)}.page`)
      this.setState({ isModalOpened: true, selectedTajweed: { tajweedName, summary, detailPage } })
    }
  }

  filterColorizedTajweeds(coloredTajweeds) {
    const colorizedTajweeds = tajweedLaws().filter(tajweedLaw => {
      const styleRegex = new RegExp(`class="tajweed-${tajweedLaw.id}"`)
      return styleRegex.test(coloredTajweeds)
    }).sort((a, b) => a.id - b.id)
    this.setState({
      filteredTajweeds: colorizedTajweeds,
      selectedTajweedLaws: colorizedTajweeds,
      selectedTajweedIds: colorizedTajweeds.map(tajweedLaw => tajweedLaw.id)
    })
  }

  calculateLines(classNames, isHovered, dataIdx, color) {
    const elements = document.querySelectorAll(`.${classNames}`)
    const lines = []
    elements.forEach(element => {
      const rect1 = element.getBoundingClientRect()
      const activeSlides = document.querySelectorAll('.slick-active')
      const rect2 = activeSlides[dataIdx > activeSlides?.length ? dataIdx % activeSlides?.length : dataIdx]?.getBoundingClientRect()
      const x1 = rect1.left + rect1.width / 2
      const x2 = rect2?.left + rect2?.width / 2
      const y1 = rect1.bottom - rect1.height / 4
      const y2 = rect2?.top
      lines.push({ x1, x2, y1, y2 })
    })
    this.setState({ isCarouselItemHovered: isHovered, lines: lines, linesColor: color })
  }

  changeSelectOptions() {
    const filteredTajweeds = [...this.state.filteredTajweeds]
    this.setState({
      selectedTajweedLaws: filteredTajweeds.filter(tajweedLaw => this.state.selectedTajweedIds.includes(tajweedLaw.id)),
      coloredTajweeds: this.colorizeChars(this.state.recognizedText, filteredTajweeds.filter(tajweedLaw => this.state.selectedTajweedIds.includes(tajweedLaw.id)))
    })
  }

  toggleOption(optionId) {
    const { selectedTajweedIds } = this.state
    if (selectedTajweedIds.includes(optionId)) {
      this.setState({ selectedTajweedIds: selectedTajweedIds.filter(id => id !== optionId) }, () => {
        this.changeSelectOptions()
      })
    } else {
      this.setState({ selectedTajweedIds: [...selectedTajweedIds, optionId] }, () => {
        this.changeSelectOptions()
      })
    }
  }

  toggleSelectAllGroup(group) {
    const { selectedTajweedIds } = this.state
    const { filteredTajweeds } = this.state
    const groupOptions = filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === group).map(tajweedLaw => tajweedLaw.id)
    if (selectedTajweedIds.some(optionId => groupOptions.includes(optionId))) {
      this.setState({selectedTajweedIds: selectedTajweedIds.filter(optionId => !groupOptions.includes(optionId))}, () => {
        this.changeSelectOptions()
      })
    } else this.setState({ selectedTajweedIds: [...selectedTajweedIds, ...groupOptions] }, () => this.changeSelectOptions())
  }

  onCloseSummaryModal() {
    this.setState({ isModalOpened: false })
  }

  closeResult () {
    this.setState({ isResultClosed: true, coloredTajweeds: [] })
    if (isStorageExist(this.props.t('browser_warning'))) sessionStorage.clear()
  }

  render() {
    return (
      <React.Fragment>
        <DropZoneContainer props={this.props} pickImage={this.pickImage.bind(this)}/>
        <h2>Recognize Tajweed</h2>
        <p className="relative text-justify lg:text-lg lg:text-center md:mx-8 lg:mx-16">{this.props.t('app_description')}</p>
        <div className="btn-container relative flex flex-wrap items-center justify-center">
          <button className="btn-capture grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 duration-200">
            <img className="h-8 md:h-12 mr-2" src="images/camera-icon.svg" alt="Capture Image" />
            <h5 className="md:text-lg whitespace-nowrap">{this.props.t('capture_image')}</h5>
          </button>
          <label htmlFor="image-picker" className="btn-import grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 cursor-pointer duration-200">
            <input type="file" id="image-picker" className="hidden" accept="image/*" onChange={e => this.pickImage(e.target.files)} />
            <img className="h-8 md:h-12 mr-2" src="images/import-icon.svg" alt="Select an Image" />
            <h5 className="md:text-lg flex-nowrap">{this.props.t('select_image')}</h5>
          </label>
          <button className="btn-screenshot grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 duration-200" onClick={this.takeScreenCapture.bind(this)}>
            <img className="h-8 md:h-12 mr-2" src="images/share-screen-icon.svg" alt="Screen Capture" />
            <h5 className="md:text-lg whitespace-nowrap">{this.props.t('screen_capture')}</h5>
          </button>
          <button className="btn-manual-input grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 duration-200" onClick={this.editTextInput.bind(this)}>
            <img className="h-8 md:h-12 mr-2" src="images/input-text-icon.svg" alt="Manual Input" />
            <h5 className="md:text-lg whitespace-nowrap">{this.props.t('manual_input')}</h5>
          </button>
        </div>
        <h5>Tajweed Recognition @ {new Date().getFullYear()}</h5>
        {this.state.isRecognizing && (
          <div className="fixed inset-0 w-screen h-full flex items-center justify-center bg-black/50 backdrop-blur-sm duration-200 animate__animated animate__fadeIn">
            <div className="flex items-center justify-center space-x-2">
              <span className="w-8 h-8 aspect-square border-t-2 border-r-2 border-t-white border-r-white rounded-full bg-transparent animate-spin"></span>
              <span className="text-white text-xl">{this.props.t('recognizing')}</span>
            </div>
          </div>
        )}
        <ResultContainer
          props={this.props}
          state={this.state}
          contentContainerRef={this.contentContainerRef}
          tooltipRef={this.tooltipRef}
          carouselItemsRefs={this.carouselItemsRefs}
          closeResult={this.closeResult.bind(this)}
          increaseTextSize={this.increaseTextSize.bind(this)}
          decreaseTextSize={this.decreaseTextSize.bind(this)}
          handleTextEditor={this.handleTextEditor.bind(this)}
          onContentChangeHandler={this.onContentChangeEventHandler.bind(this)}
          setContentDisplayMode={this.setContentDisplayMode.bind(this)}
          showTooltip={this.showTooltip.bind(this)}
          showSummaryModal={this.showSummaryModal.bind(this)}
          hideTooltip={this.hideTooltip.bind(this)}
          calculateLines={this.calculateLines.bind(this)}
          toggleOption={this.toggleOption.bind(this)}
          toggleSelectAllGroup={this.toggleSelectAllGroup.bind(this)}
        />
        <TajweedPreview
          props={this.props}
          isModalOpened={this.state.isModalOpened}
          selectedTajweed={this.state.selectedTajweed}
          onCloseSummaryModal={this.onCloseSummaryModal.bind(this)}
        />
      </React.Fragment>
    )
  }
}

export default withTranslation()(RecognitionContainer)
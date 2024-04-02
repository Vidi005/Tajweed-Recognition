import React from "react"
import Swal from "sweetalert2"
import { buildRegExp, checkParamEvent, colorizeChars, isStorageExist, loadFileAsArrayBuffer, removeNonArabic, tajweedLaws, twTextSizes } from "../../../../../utils/data"
import Tesseract from "tesseract.js"
import ResultContainer from "./ResultContainer"
import DropZoneContainer from "./import_mode/DropZoneContainer"
import { withTranslation } from "react-i18next"
import en from "../../../../../locales/en.json"
import TajweedPreview from "./pop_up/TajweedPreview"
import PdfSettingPrompt from "./pop_up/PdfSettingPrompt"
import { pdfjs } from "react-pdf"
import CameraContainer from "./camera_mode/CameraContainer"
import { Dialog } from "@headlessui/react"

if (import.meta && import.meta.url) {
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    'pdfjs-dist/build/pdf.worker.min.js',
    import.meta.url,
  ).toString()
} else {
  pdfjs.GlobalWorkerOptions.workerSrc = 'pdfjs-dist/legacy/build/pdf.worker.min.js'
}

class RecognitionContainer extends React.Component {
  constructor(props) {
    super(props)
    this.cameraRef = React.createRef()
    this.canvasRef = React.createRef()
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
      dataFile: null,
      selectedTajweed: {},
      coloredTajweeds: [],
      filteredTajweeds: [],
      lines: [],
      selectedTajweedIds: [],
      selectedTajweedLaws: [],
      isPromptOpened: false,
      isOCREnabled: false,
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
        this.setState({ coloredTajweeds: colorizeChars(this.state.recognizedText, tajweedLaws()) }, () => {
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

  setUpCamera = async () => {
    if (location.protocol.startsWith('https') || location.hostname === 'localhost') {
      this.setState({ isCameraModeSelected: true })
      let idealAspectRatio = 1
      if (window.innerHeight > window.innerWidth) idealAspectRatio = 4 / 3
      else idealAspectRatio = 3 / 4
      const constraints = {
        audio: false,
        video: {
          facingMode: { exact: this.state.facingMode },
          aspectRatio: { ideal: idealAspectRatio }
        }
      }
      try {
        this.stream = await navigator.mediaDevices.getUserMedia(constraints)
        this.setState({ isCameraPermissionGranted: true }, () => {
          this.cameraRef.current.srcObject = this.stream
        })
      } catch (error) {
        this.setState(() => ({ isCameraPermissionGranted: false }))
        Swal.fire({
          icon: 'error',
          title: this.props.t('camera_title_alert.0'),
          text: `${error.message}`
        })
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: this.props.t('camera_title_alert.1'),
        text: this.props.t('camera_text_alert.1')
      })
    }
  }

  switchCamera () {
    this.stopCamera()
    this.setState(prevState => ({
      facingMode: prevState.facingMode === 'environment' ? 'user' : 'environment'
    }), () => this.setUpCamera())
  }

  captureImage () {
    if (this.stream) {
      this.setState(prevState => ({
        isBtnCaptureClicked: !prevState.isBtnCaptureClicked,
        isRecognizing: true
      }))
      const canvas = this.canvasRef.current
      const video = this.cameraRef.current
      if (canvas) {
        canvas.width = video.clientWidth
        canvas.height = video.clientHeight
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
        this.recognizeImage(canvas.toDataURL())
        this.onCloseCamera()
      } else {
        this.setState({ isRecognizing: false })
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: this.props.t('canvas_is_null')
        })
      }
    } else {
      Swal.fire({
        icon: 'error',
        title: this.props.t('camera_title_alert.2'),
        text: this.props.t('camera_text_alert.2')
      })
    }
  }

  stopCamera () {
    if (this.stream) {
      const tracks = this.stream.getTracks()
      tracks.forEach(track => track.stop())
    }
  }

  pickFile = (files) => {
    if (files.length === 0) return
    this.setState({
      isRecognizing: true
    }, async () => {
      const file = files[0]
      const validImageExtensions = ['jpeg', 'jpg', 'png', 'webp', 'bmp', 'heic', 'svg']
      const validPdfExtension = ['pdf']
      const fileExtension = file.name.split('.').pop().toLowerCase()
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
        if (validPdfExtension.includes(fileExtension)) {
          this.setState({ isPromptOpened: true, dataFile: file })
        } else if (validImageExtensions.includes(fileExtension)) {
          this.recognizeImage(file)
        } else {
          this.setState({
            isRecognizing: false
          }, () => {
            Swal.fire({
              icon: 'error',
              title: this.props.t('invalid_file.0'),
              text: this.props.t('invalid_file.1')
            })
          })
        }
      }
    })
  }

  enableOCRMode() {
    this.setState(prevState => ({ isOCREnabled: !prevState.isOCREnabled }))
  }

  confirmSetting() {
    this.setState({ isPromptOpened: false }, () => {
      if (this.state.isOCREnabled) {
        this.extractImageTextFromPDF(this.state.dataFile)
      } else {
        this.extractTextFromPDF(this.state.dataFile)
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
          recognizedText: removeNonArabic(data.text.split('\n').join(' ').trim().replace(/\s+/g, ' ')),
          coloredTajweeds: colorizeChars(removeNonArabic(data.text.trim()), tajweedLaws()),
          isResultClosed: false }, () => this.filterColorizedTajweeds(this.state.coloredTajweeds))
      } else {
        this.setState({ isRecognizing: false }, () => {
          Swal.fire({
            title: this.props.t('empty_arabic_text.0'),
            text: this.props.t('empty_arabic_text.1'),
            icon: 'error',
            confirmButtonColor: 'green'
          })
        }, 100)
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

  async extractImageTextFromPDF(file) {
    try {
      const pdf = await pdfjs.getDocument({ url: URL.createObjectURL(file) }).promise
      const maxPages = pdf.numPages
      const firstPage = await pdf.getPage(1)
      const firstPageViewport = firstPage.getViewport({ scale: 1.0 })
      const combinedCanvas = document.createElement('canvas')
      const combinedContext = combinedCanvas.getContext('2d')
      combinedCanvas.height = firstPageViewport.height * maxPages
      combinedCanvas.width = firstPageViewport.width
      let yOffset = 0
      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const page = await pdf.getPage(pageNum)
        const viewport = page.getViewport({ scale: 1.0 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')
        canvas.height = viewport.height
        canvas.width = viewport.width
        const renderContext = {
          canvasContext: context,
          viewport: viewport
        }
        page.render(renderContext)
        combinedContext.drawImage(canvas, 0, yOffset)
        yOffset += viewport.height
      }
      const combinedImageData = combinedCanvas.toDataURL()
      this.recognizeImage(combinedImageData)
    } catch (error) {
      this.setState({ isRecognizing: false, dataFile: null })
      Swal.fire({
        icon: 'error',
        title: this.props.t('recognition_failed'),
        text: error.message
      })
    }
  }

  async extractTextFromPDF(file) {
    try {
      const arrayBuffer = await loadFileAsArrayBuffer(file)
      const pdf = await pdfjs.getDocument(arrayBuffer).promise
      const maxPages = pdf.numPages
      let text = ''
      const getPageText = async (pageNum) => {
        const page = await pdf.getPage(pageNum)
        const textContent = await page.getTextContent()
        if (textContent.items.length === 0) {
          this.setState({ isRecognizing: false })
          Swal.fire({
            icon: 'error',
            title: this.props.t('empty_text.0'),
            text: this.props.t('empty_text.1')
          })
          return
        } else {
          const strings = textContent.items.map(item => item.str)
          text += strings.join(' ')
        }
      }
      for (let pageNum = 1; pageNum <= maxPages; pageNum++) {
        const pageText = await getPageText(pageNum)
        text += pageText
      }
      this.setState({
        recognizedText: removeNonArabic(text.trim()),
        coloredTajweeds: colorizeChars(removeNonArabic(text.trim()), tajweedLaws()),
        isRecognizing: false,
        isResultClosed: false,
        dataFile: null
      }, () => this.filterColorizedTajweeds(this.state.coloredTajweeds))
    } catch (error) {
      this.setState({ isRecognizing: false, dataFile: null })
      Swal.fire({
        icon: 'error',
        title: this.props.t('recognition_failed'),
        text: error.message
      })
    }
  }

  onUnloadPage (event) {
    event.preventDefault()
    event.returnValue = this.props.t('unsaved_warning')
  }

  showTooltip(event) {
    const matchedTajweed = tajweedLaws().filter(tajweedLaw => {
      const regex = buildRegExp(tajweedLaw.rules)
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
        const tooltipWidth = tooltip?.offsetWidth
        const tooltipHeight = tooltip?.offsetHeight
        const containerHalfWidth = contentContainerRect.width / 2
        const leftPosition = event.clientX
        if (tooltip) {
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
      }, 10)
    }
  }

  hideTooltip() {
    this.setState({
      tooltipContent: '',
      tooltipColor: ''
    })
  }

  showSummaryModal(idParam) {
    if (checkParamEvent(idParam)?.length > 0) {
      const tajweedName = checkParamEvent(idParam)[0].name
      const summary = this.props.t(`tajweed_laws.${en.tajweed_laws.findIndex(tajweedLaw => tajweedLaw.id === checkParamEvent(idParam)[0].id)}.summary`)
      const detailPage = this.props.t(`tajweed_laws.${en.tajweed_laws.findIndex(tajweedLaw => tajweedLaw.id === checkParamEvent(idParam)[0].id)}.page`)
      this.setState({ isModalOpened: true, selectedTajweed: { tajweedName, summary, detailPage } })
    }
  }

  filterColorizedTajweeds(coloredTajweeds) {
    const colorizedTajweeds = tajweedLaws().filter(tajweedLaw => {
      const styleRegex = new RegExp(`class="tajweed-${tajweedLaw.id}" `)
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
    const contentContainerY1 = this.contentContainerRef.current.getBoundingClientRect().top
    elements.forEach(element => {
      const rect1 = element.getBoundingClientRect()
      const activeSlides = document.querySelectorAll('.slick-active')
      const rect2 = activeSlides[dataIdx > activeSlides?.length ? dataIdx % activeSlides?.length : dataIdx]?.getBoundingClientRect()
      const x1 = rect1.left + rect1.width / 2
      const x2 = rect2?.left + rect2?.width / 2
      const y1 = rect1.bottom - rect1.height / 4
      const y2 = rect2?.top
      if (y1 > contentContainerY1 && y1 !== 0) {
        lines.push({ x1, x2, y1, y2 })
      }
    })
    this.setState({ isCarouselItemHovered: isHovered, lines: lines, linesColor: color })
  }

  changeSelectOptions() {
    const filteredTajweeds = [...this.state.filteredTajweeds]
    this.setState({
      selectedTajweedLaws: filteredTajweeds.filter(tajweedLaw => this.state.selectedTajweedIds.some(selectedTajweedId => selectedTajweedId === tajweedLaw.id)),
      coloredTajweeds: colorizeChars(this.state.recognizedText, filteredTajweeds.filter(tajweedLaw => this.state.selectedTajweedIds.some(selectedTajweedId => selectedTajweedId === tajweedLaw.id)))
    })
  }

  toggleOption(optionId) {
    const { selectedTajweedIds } = this.state
    if (selectedTajweedIds.some(selectedTajweedId => selectedTajweedId === optionId)) {
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
    if (selectedTajweedIds.some(optionId => groupOptions.some(groupOption => groupOption === optionId))) {
      this.setState({selectedTajweedIds: selectedTajweedIds.filter(optionId => !groupOptions.some(groupOption => groupOption === optionId))}, () => {
        this.changeSelectOptions()
      })
    } else this.setState({ selectedTajweedIds: [...selectedTajweedIds, ...groupOptions] }, () => this.changeSelectOptions())
  }

  onCloseCamera() {
    this.stopCamera()
    this.setState({ isCameraModeSelected: false })
  }

  cancelRecognition() {
    this.setState({ isPromptOpened: false, isRecognizing: false, dataFile: null })
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
        <DropZoneContainer props={this.props} pickFile={this.pickFile.bind(this)}/>
        <h2>Recognize Tajweed</h2>
        <p className="relative text-justify lg:text-lg lg:text-center md:mx-8 lg:mx-16">{this.props.t('app_description')}</p>
        <div className="btn-container relative flex flex-wrap items-center justify-center">
          <button className="btn-capture grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 duration-200" onClick={this.setUpCamera.bind(this)}>
            <img className="h-8 md:h-12 mr-2" src="images/camera-icon.svg" alt="Capture Image" />
            <h5 className="md:text-lg whitespace-nowrap">{this.props.t('capture_image')}</h5>
          </button>
          <label htmlFor="file-picker" className="btn-import grow-[9999] basis-52 my-2 mx-16 md:m-4 flex items-center px-4 md:px-6 py-2 md:py-3 bg-green-800 dark:bg-green-700 hover:bg-green-900 dark:hover:bg-green-600 text-white rounded-lg shadow-lg dark:shadow-white/50 cursor-pointer duration-200">
            <input type="file" id="file-picker" className="hidden" accept="image/*, application/pdf" onChange={e => this.pickFile(e.target.files)} />
            <img className="h-8 md:h-12 mr-2" src="images/import-icon.svg" alt="Select a File" />
            <h5 className="md:text-lg whitespace-nowrap">{this.props.t('select_file')}</h5>
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
        <Dialog open={this.state.isRecognizing} onClose={this.cancelRecognition.bind(this)} className="fixed inset-0 w-screen h-full flex items-center justify-center bg-black/50 backdrop-blur-sm duration-200 animate__animated animate__fadeIn">
          <div className="flex items-center justify-center space-x-2">
            <span className="w-8 h-8 aspect-square border-t-2 border-r-2 border-t-white border-r-white rounded-full bg-transparent animate-spin"></span>
            <span className="text-white text-xl">{this.props.t('recognizing')}</span>
          </div>
        </Dialog>
        {this.state.isCameraModeSelected && (
          <CameraContainer
            props={this.props}
            cameraRef={this.cameraRef}
            canvasRef={this.canvasRef}
            isCameraPermissionGranted={this.state.isCameraPermissionGranted}
            isCameraReady={this.stream}
            setUpCamera={this.setUpCamera.bind(this)}
            onCloseCamera={this.onCloseCamera.bind(this)}
            captureImage={this.captureImage.bind(this)}
            switchCamera={this.switchCamera.bind(this)}
          />
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
        <PdfSettingPrompt
          props={this.props}
          isPromptOpened={this.state.isPromptOpened}
          isOCREnabled={this.state.isOCREnabled}
          cancelRecognition={this.cancelRecognition.bind(this)}
          enableOCRMode={this.enableOCRMode.bind(this)}
          confirmSetting={this.confirmSetting.bind(this)}
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
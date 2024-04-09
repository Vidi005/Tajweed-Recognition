import React from 'react'
import { Helmet } from 'react-helmet'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import NoPage from './pages/empty/NoPage'
import i18n from '../utils/localization'
import DetailTajweedPage from './pages/detail/DetailTajweedPage'
import DetailTajweedContent from './pages/home/main/tajweed_list/DetailTajweedContent'
import { getSelectedTabByUrl, isStorageExist } from '../utils/data'
import RecognitionMain from './pages/home/main/RecognitionMain'
import ListMain from './pages/home/main/ListMain'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      LANGUAGE_STORAGE_KEY: 'LANG_STORE_KEY',
      DARK_MODE_STORAGE_KEY: 'DARK_STORE_KEY',
      selectedLanguage: 'en',
      selectedTabIndex: getSelectedTabByUrl(),
      isDarkMode: false
    }
  }

  componentDidMount() {
    this.checkLocalStorage()
  }

  componentDidUpdate() {
    document.body.classList.toggle('dark', this.state.isDarkMode)
  }

  checkLocalStorage () {
    isStorageExist(i18n.t('browser_warning'))
    if (isStorageExist('')) {
      this.checkDisplayMode()
      this.checkLanguageData()
    }
  }

  checkDisplayMode () {
    const getDisplayModeFromLocal = localStorage.getItem(this.state.DARK_MODE_STORAGE_KEY)
    try {
      const parsedDisplayMode = JSON.parse(getDisplayModeFromLocal)
      if (parsedDisplayMode !== undefined || parsedDisplayMode !== null) {
        this.setState({ isDarkMode: parsedDisplayMode })
      }
    } catch (error) {
      localStorage.removeItem(this.state.DARK_MODE_STORAGE_KEY)
      alert(`${i18n.t('error_alert')}: ${error.message}\n${i18n.t('error_solution')}.`)
    }
  }

  checkLanguageData () {
    const getLanguageFromLocal = localStorage.getItem(this.state.LANGUAGE_STORAGE_KEY)
    try {
      const parsedLanguage = JSON.parse(getLanguageFromLocal)
      if (parsedLanguage !== undefined || parsedLanguage !== null) {
        this.setState({ selectedLanguage: parsedLanguage }, () => this.changeLanguage(parsedLanguage))
      } else this.changeLanguage(this.state.selectedLanguage)
    } catch (error) {
      localStorage.removeItem(this.state.LANGUAGE_STORAGE_KEY)
      alert(`${i18n.t('error_alert')}: ${error.message}\n${i18n.t('error_solution')}.`)
    }
  }

  setDisplayMode () {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode
    }), () => this.saveDisplayMode(this.state.isDarkMode))
  }

  changeLanguage (lang) {
    i18n.changeLanguage(lang)
    this.setState({ selectedLanguage: lang }, () => {
      this.saveLanguageData(lang)
    })
  }

  saveDisplayMode (selectedDisplayMode) {
    if (isStorageExist(i18n.t('browser_warning'))) {
      localStorage.setItem(this.state.DARK_MODE_STORAGE_KEY, JSON.stringify(selectedDisplayMode))
    }
  }

  saveLanguageData (selectedLanguage) {
    if (isStorageExist(i18n.t('browser_warning'))) {
      localStorage.setItem(this.state.LANGUAGE_STORAGE_KEY, JSON.stringify(selectedLanguage))
    }
  }

  setSelectedTabIndex (index) {
    this.setState({ selectedTabIndex: index })
  }
  render() {
    const shouldRedirectToRecognition = location.pathname === '/' || location.pathname === ''
    return (
      <React.Fragment>
        <Helmet>
          <title className="font-ramadhan-start">{i18n.t('app_name')}</title>
          <meta name="description" content={i18n.t('app_description')} />
          <meta name="google-site-verification" content="ThFmvf3VSJhWEhuU_8zz0txPahlU9ErT4z4ixbyUJn8" />
          <link rel="canonical" href={location.toString()} />
        </Helmet>
        <Routes>
          {innerWidth < 1024
            ? (
              <>
                <Route path='/' element={
                  <HomePage
                    t={i18n.t}
                    isDarkMode={this.state.isDarkMode}
                    selectedTabIndex={this.state.selectedTabIndex}
                    setSelectedTabIndex={this.setSelectedTabIndex.bind(this)}
                    setDisplayMode={this.setDisplayMode.bind(this)}
                    changeLanguage={this.changeLanguage.bind(this)}
                  />
                }/>
                <Route path='/recognition' element={
                  <HomePage
                    t={i18n.t}
                    isDarkMode={this.state.isDarkMode}
                    selectedTabIndex={this.state.selectedTabIndex}
                    setSelectedTabIndex={this.setSelectedTabIndex.bind(this)}
                    setDisplayMode={this.setDisplayMode.bind(this)}
                    changeLanguage={this.changeLanguage.bind(this)}
                  />
                }/>
                <Route path='/tajweed-list' element={
                  <HomePage
                    t={i18n.t}
                    isDarkMode={this.state.isDarkMode}
                    selectedTabIndex={this.state.selectedTabIndex}
                    setSelectedTabIndex={this.setSelectedTabIndex.bind(this)}
                    setDisplayMode={this.setDisplayMode.bind(this)}
                    changeLanguage={this.changeLanguage.bind(this)}
                  />
                }/>
                <Route path='/tajweed-list/detail/:tajweed' element={<DetailTajweedPage t={i18n.t}/>}/>
              </>
              )
            : (
              <Route path='/' element={
                shouldRedirectToRecognition
                  ? <Navigate to={'/recognition'} />
                  : (
                      <HomePage
                        t={i18n.t}
                        isDarkMode={this.state.isDarkMode}
                        selectedTabIndex={this.state.selectedTabIndex}
                        setSelectedTabIndex={this.setSelectedTabIndex.bind(this)}
                        setDisplayMode={this.setDisplayMode.bind(this)}
                        changeLanguage={this.changeLanguage.bind(this)}
                      />
                    ) 
              }>
                <Route path='/recognition' element={
                  <RecognitionMain 
                    t={i18n.t}
                    />
                }/>
                <Route path='/tajweed-list' element={
                  <ListMain
                    t={i18n.t}
                  />
                }>
                  <Route path='detail/:tajweed' element={<DetailTajweedContent t={i18n.t}/>}/>
                </Route>
              </Route>
              )
          }
          <Route path='*' element={<NoPage t={i18n.t}/>}/>
        </Routes>
      </React.Fragment>
    )
  }
}

export default App
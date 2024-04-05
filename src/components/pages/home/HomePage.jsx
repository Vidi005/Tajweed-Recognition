import React from 'react'
import { getSelectedTabByUrl, isStorageExist } from '../../../utils/data'
import { Helmet } from 'react-helmet'
import { withTranslation } from 'react-i18next'
import HeaderContainer from './header/HeaderContainer'
import BottomBarContainer from './footer/BottomBarContainer'
import { Tab } from '@headlessui/react'
import MainContainer from './main/MainContainer'

class HomePage extends React.Component {
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
    isStorageExist(this.props.t('browser_warning'))
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
      alert(`${this.props.t('error_alert')}: ${error.message}\n${this.props.t('error_solution')}.`)
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
      alert(`${this.props.t('error_alert')}: ${error.message}\n${this.props.t('error_solution')}.`)
    }
  }

  setDisplayMode () {
    this.setState(prevState => ({
      isDarkMode: !prevState.isDarkMode
    }), () => this.saveDisplayMode(this.state.isDarkMode))
  }

  changeLanguage (lang) {
    const { i18n } = this.props
    this.setState({ selectedLanguage: lang }, () => {
      i18n.changeLanguage(this.state.selectedLanguage)
      this.saveLanguageData(lang)
    })
  }

  saveDisplayMode (selectedDisplayMode) {
    if (isStorageExist(this.props.t('browser_warning'))) {
      localStorage.setItem(this.state.DARK_MODE_STORAGE_KEY, JSON.stringify(selectedDisplayMode))
    }
  }

  saveLanguageData (selectedLanguage) {
    if (isStorageExist(this.props.t('browser_warning'))) {
      localStorage.setItem(this.state.LANGUAGE_STORAGE_KEY, JSON.stringify(selectedLanguage))
    }
  }

  setSelectedTabIndex (index) {
    this.setState({ selectedTabIndex: index })
  }

  render () {
    return (
      <div className="home-page h-screen w-full flex flex-col bg-green-100 dark:bg-black animate__animated animate__fadeIn">
        <Helmet>
          <meta name="keywords" content="Recognize Tajweed" />
        </Helmet>
        <HeaderContainer
          headerTitle={this.props.t('app_name')}
          changeLanguage={this.changeLanguage.bind(this)}
          setDisplayMode={this.setDisplayMode.bind(this)}
          isDarkMode={this.state.isDarkMode}
        />
        <Tab.Group
          as={"section"}
          className={"app__tab-group grow flex flex-col bg-green-100 dark:bg-black duration-200"}
          selectedIndex={this.state.selectedTabIndex}
          onChange={this.setSelectedTabIndex.bind(this)}
        >
          <MainContainer t={this.props.t}/>
          <BottomBarContainer t={this.props.t}/>
        </Tab.Group>
      </div>
    )
  }
}

export default withTranslation()(HomePage)
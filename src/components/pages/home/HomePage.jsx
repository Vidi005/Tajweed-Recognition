import React from 'react'
import { Helmet } from 'react-helmet'
import HeaderContainer from './header/HeaderContainer'
import BottomBarContainer from './footer/BottomBarContainer'
import { Tab } from '@headlessui/react'
import MainContainer from './main/MainContainer'

const HomePage = ({ t, isDarkMode, selectedTabIndex, setSelectedTabIndex, changeLanguage, setDisplayMode }) => (
  <div className="home-page h-screen w-full flex flex-col bg-green-100 dark:bg-black animate__animated animate__fadeIn">
    <Helmet>
      <meta name="keywords" content="Recognize Tajweed" />
    </Helmet>
    <HeaderContainer
      headerTitle={t('app_name')}
      changeLanguage={changeLanguage}
      setDisplayMode={setDisplayMode}
      isDarkMode={isDarkMode}
    />
    <Tab.Group
      as={"section"}
      className={"app__tab-group grow flex flex-col bg-green-100 dark:bg-black duration-200"}
      selectedIndex={selectedTabIndex}
      onChange={setSelectedTabIndex}
    >
      <MainContainer t={t}/>
      <BottomBarContainer t={t}/>
    </Tab.Group>
  </div>
)

export default HomePage
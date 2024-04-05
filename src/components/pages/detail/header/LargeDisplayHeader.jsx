import React from "react"
import HeaderContainer from "../../home/header/HeaderContainer"

const LargeDisplayHeader = ({ headerTitle, changeLanguage, setDisplayMode, isDarkMode }) => {
  if (window.innerWidth >= 1024) {
    return <HeaderContainer headerTitle={headerTitle} changeLanguage={changeLanguage} setDisplayMode={setDisplayMode} isDarkMode={isDarkMode}/>
  }
}

export default LargeDisplayHeader
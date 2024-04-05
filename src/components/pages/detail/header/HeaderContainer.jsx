import React from "react"
import MobileDisplayHeader from "./MobileDisplayHeader"
import LargeDisplayHeader from "./LargeDisplayHeader"

const HeaderContainer = ({ t, headerTitle, changeLanguage, setDisplayMode, isDarkMode }) => (
  <React.Fragment>
    <MobileDisplayHeader t={t}/>
    <LargeDisplayHeader headerTitle={headerTitle} changeLanguage={changeLanguage} setDisplayMode={setDisplayMode} isDarkMode={isDarkMode}/>
  </React.Fragment>
)

export default HeaderContainer
import React from "react"
import MobileDisplayItem from "./MobileDisplayItem"
import LargeDisplayContainer from "./LargeDisplayContainer"

const MainContainer = ({ t, searchItems, getFilteredTajweeds }) => (
  <React.Fragment>
    <MobileDisplayItem t={t}/>
    <LargeDisplayContainer t={t} searchItems={searchItems} getFilteredTajweeds={getFilteredTajweeds}/>
  </React.Fragment>
)

export default MainContainer
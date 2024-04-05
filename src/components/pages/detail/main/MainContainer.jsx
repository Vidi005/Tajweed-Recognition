import React from "react"
import MobileDisplayItem from "./MobileDisplayItem"
import LargeDisplayContainer from "./LargeDisplayContainer"

const MainContainer = ({ t, searchitem, getFilteredTajweeds }) => (
  <React.Fragment>
    <MobileDisplayItem t={t}/>
    <LargeDisplayContainer t={t} searchitem={searchitem} getFilteredTajweeds={getFilteredTajweeds}/>
  </React.Fragment>
)

export default MainContainer
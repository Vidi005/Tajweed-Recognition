import { Tab } from "@headlessui/react"
import React, { Fragment } from "react"
import { Outlet } from "react-router-dom"
import RecognitionMain from "./RecognitionMain"
import ListMain from "./ListMain"

const MainContainer = ({ t }) => (
  <Tab.Panels as={Fragment}>
    {innerWidth < 1024
      ? <React.Fragment>
          <RecognitionMain t={t}/>
          <ListMain t={t}/>
        </React.Fragment>
      : <React.Fragment>
          <Outlet/>
          <Outlet/>
        </React.Fragment>
    }
  </Tab.Panels>
)

export default MainContainer
import { Tab } from "@headlessui/react"
import React, { Fragment } from "react"
import RecognitionContainer from "./tajweed_recognition/RecognitionContainer"
import ListContainer from "./tajweed_list/ListContainer"

const MainContainer = ({ t }) => (
  <Tab.Panels as={Fragment}>
    <Tab.Panel as="main" className={"relative flex flex-col items-center justify-evenly grow p-2 text-green-900 dark:text-white animate__animated animate__fadeIn overflow-y-auto"}>
      <RecognitionContainer t={t}/>
    </Tab.Panel>
    <Tab.Panel as="main" className={"max-h-screen grow overflow-y-auto overflow-x-hidden animate__animated animate__fadeIn"}>
      <ListContainer t={t}/>
    </Tab.Panel>
  </Tab.Panels>
)

export default MainContainer
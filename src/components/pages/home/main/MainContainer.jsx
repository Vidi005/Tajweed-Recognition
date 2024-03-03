import { Tab } from "@headlessui/react"
import React from "react"
import RecognitionContainer from "./tajweed_recognition/RecognitionContainer"

const MainContainer = ({ t }) => (
  <Tab.Panels as="main" className={"app-main grow"}>
    <Tab.Panel className={"relative flex flex-col items-center justify-evenly gap-1 h-full p-2 text-green-900 dark:text-white animate__animated animate__fadeIn overflow-y-auto z-10"}>
      <RecognitionContainer/>
    </Tab.Panel>
    <Tab.Panel className={"overflow-y-auto overflow-x-hidden animate__animated animate__fadeIn"}>
      Tajweed List
    </Tab.Panel>
  </Tab.Panels>
)

export default MainContainer
import { Tab } from "@headlessui/react"
import React from "react"
import RecognitionContainer from "./tajweed_recognition/RecognitionContainer"
import ListContainer from "./tajweed_list/ListContainer"

const MainContainer = ({ props }) => (
  <Tab.Panels as="main" className={"app-main grow relative z-10"}>
    <Tab.Panel className={"flex flex-col items-center justify-evenly h-full p-2 text-green-900 dark:text-white animate__animated animate__fadeIn overflow-y-auto"}>
      <RecognitionContainer props={props}/>
    </Tab.Panel>
    <Tab.Panel className={"max-h-screen overflow-y-auto overflow-x-hidden animate__animated animate__fadeIn"}>
      <ListContainer props={props}/>
    </Tab.Panel>
  </Tab.Panels>
)

export default MainContainer
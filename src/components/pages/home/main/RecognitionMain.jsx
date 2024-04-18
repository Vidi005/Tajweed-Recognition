import { Tab } from "@headlessui/react"
import React from "react"
import RecognitionContainer from "./tajweed_recognition/RecognitionContainer"

const RecognitionMain = ({ t }) => (
  <Tab.Panel as="main" className={"relative flex flex-col items-center justify-evenly grow gap-4 md:gap-0 p-2 text-green-900 dark:text-white animate__animated animate__fadeIn overflow-y-auto"}>
    <RecognitionContainer t={t}/>
  </Tab.Panel>
)

export default RecognitionMain
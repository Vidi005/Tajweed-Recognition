import { Tab } from "@headlessui/react"
import React from "react"
import RecognitionContainer from "./tajweed_recognition/RecognitionContainer"

const RecognitionMain = ({ t }) => (
  <Tab.Panel as="main" className={"relative flex flex-col items-center justify-evenly grow gap-4 md:gap-0 p-2 text-green-900 dark:text-white animate__animated animate__fadeIn overflow-y-auto overflow-x-hidden"}>
    <h5 className="absolute px-8 py-0.5 bg-blue-500 text-center text-white top-0 right-0 translate-x-1/4 translate-y-1/2 rotate-45 duration-200 shadow-md dark:shadow-white/50 z-10">Preview</h5>
    <RecognitionContainer t={t}/>
  </Tab.Panel>
)

export default RecognitionMain
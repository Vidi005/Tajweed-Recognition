/* eslint-disable react/no-danger-with-children */
import React, { Fragment } from "react"
import Swal from "sweetalert2"
import { withTranslation } from "react-i18next"
import { Menu, Transition } from "@headlessui/react"

const ResultContainer = ({ props, isResultClosed, twTextSize, isIncreaseTextDisabled, isDecreaseTextDisabled, isEditMode, isContentDarkMode, increaseTextSize, decreaseTextSize, handleTextEditor, onContentChangeHandler, setContentDisplayMode, coloredTajweeds, recognizedText, closeResult }) => (
  !isResultClosed && (
    <Transition
      appear
      show={!isResultClosed}
      as={Fragment}
      enter="ease-out duration-500"
      enterFrom="opacity-0 translate-y-full scale-50"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="ease-in duration-500"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-full"
    >
      <div className="result-container fixed inset-0 flex flex-col bg-green-100 dark:bg-black">
        <div className="menu-bar__container flex flex-nowrap items-center w-full p-1 bg-green-50 dark:bg-gray-700 shadow-lg">
          <h3 className="title-bar flex-1 pl-2 text-green-900 dark:text-white">Result</h3>
          <Menu as={"menu"} className={"menu-btn flex-none inline-block h-10"}>
            <Menu.Button className={"p-2 hover:bg-green-300 dark:hover:bg-gray-500 active:bg-green-500 dark:active:bg-gray-300 duration-200 rounded-md"}>
              <img className="dark:hidden h-full duration-200" src="images/tajweed-menu-icon.svg" alt="Tajweed Settings" />
              <img className="hidden dark:block h-full duration-200" src="images/tajweed-menu-icon-dark.svg" alt="Tajweed Settings" />
            </Menu.Button>
          </Menu>
          <button className="discard-btn flex-none h-10 p-2 hover:bg-green-300 dark:hover:bg-gray-500 active:bg-green-500 dark:active:bg-gray-300 duration-200 rounded-md" onClick={() => {
            Swal.fire({
              title: "Are you sure want to close this result?",
              text: "The result data will be removed.",
              icon: "warning",
              confirmButtonColor: "green",
              showCancelButton: true,
              cancelButtonColor: "red"
            }).then(result => {
              if (result.isConfirmed) closeResult()
            })
          }}>
            <img className="dark:hidden h-full duration-200" src="images/close-icon.svg" alt="Close" />
            <img className="hidden dark:block h-full duration-200" src="images/close-icon-dark.svg" alt="Close" />
          </button>
        </div>
        <div className={`result-container grow flex flex-col m-2 px-2 ${isContentDarkMode ? "bg-gray-800" : "bg-green-100"} rounded-md shadow-md dark:shadow-white/50 duration-200`}>
          <div className={`content-menu flex items-center justify-end border-b ${isContentDarkMode ? "border-b-white" : "border-b-black"}`}>
            <button className={`border ${isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 my-2 p-1 rounded duration-200 overflow-hidden`} onClick={increaseTextSize} disabled={isIncreaseTextDisabled}>
              <img className={`${isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-increase-icon.svg" alt="Increase" />
            </button>
            <button className={`border ${isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={decreaseTextSize} disabled={isDecreaseTextDisabled}>
              <img className={`${isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-decrease-icon.svg" alt="Decrease" />
            </button>
            {!isEditMode && (
              <button className={`border ${isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`}>
                <img className={`${isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/edit-icon.svg" alt="Edit" onClick={handleTextEditor}/>
              </button>
            )}
            <button className={`border ${isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={setContentDisplayMode}>
              <img className={`${isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src={`${isContentDarkMode ? "images/light-mode-icon.svg" : "images/dark-mode-icon.svg"}`} alt="Dark Mode" />
            </button>
          </div>
          {isEditMode
            ? (
              <React.Fragment>
                <textarea dir="rtl" className={`border-4 border-double grow w-full p-1 font-lpmq-isep-misbah ${isContentDarkMode ? "border-white bg-black text-white" : "border-green-900 bg-white text-black"} overflow-y-auto rounded-md duration-200`} placeholder="Enter an arabic text here" style={{ fontSize: `${twTextSize}` }} onChange={onContentChangeHandler}>{recognizedText}</textarea>
                <button className="generate-btn flex items-center justify-center mx-auto my-2 py-1 px-3 border border-green-900 bg-green-800 hover:bg-green-900 active:bg-green-700  dark:hover:bg-green-700 dark:active:bg-green-500 text-center text-lg text-white shadow dark:shadow-white/50 duration-300 rounded-md" onClick={handleTextEditor}>Generate</button>
              </React.Fragment>
              )
            : (
              <p dangerouslySetInnerHTML={{ __html: coloredTajweeds }} dir="rtl" className={`flex-auto h-0 w-full my-2 p-2 font-lpmq-isep-misbah ${isContentDarkMode ? "text-white bg-black" : "text-black bg-white"} overflow-y-auto rounded-md duration-200`} style={{ fontSize: `${twTextSize}` }}></p>
              )
          }
        </div>
      </div>
    </Transition>
  )
)

export default withTranslation()(ResultContainer)
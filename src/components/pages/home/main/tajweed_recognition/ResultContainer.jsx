/* eslint-disable react/no-danger-with-children */
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"
import { Transition } from "@headlessui/react"
import MenuBarContainer from "./MenuBarContainer"
import SliderContainer from "./SliderContainer"

const ResultContainer = ({ props, state, increaseTextSize, contentContainerRef, tooltipRef, decreaseTextSize, handleTextEditor, onContentChangeHandler, setContentDisplayMode, showTooltip, hideTooltip, carouselItemsRefs, calculateLines, closeResult }) => (
  !state.isResultClosed && (
    <Transition
      appear
      show={!state.isResultClosed}
      as={Fragment}
      enter="ease-out duration-500"
      enterFrom="opacity-0 translate-y-full scale-50"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="ease-in duration-500"
      leaveFrom="opacity-100 translate-y-0"
      leaveTo="opacity-0 translate-y-full"
    >
      <div className="result-container fixed inset-0 flex flex-col bg-green-100 dark:bg-black">
        <MenuBarContainer props={props} isEditMode={state.isEditMode} closeResult={closeResult}/>
        <div className={`content-container grow flex flex-col m-2 px-2 ${state.isContentDarkMode ? "bg-gray-800" : "bg-green-100"} rounded-md shadow-md dark:shadow-white/50 duration-200`}>
          <div className={`content-menu flex items-center justify-end border-b ${state.isContentDarkMode ? "border-b-white" : "border-b-black"}`}>
            <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 my-2 p-1 rounded duration-200 overflow-hidden`} onClick={increaseTextSize} disabled={state.isIncreaseTextDisabled}>
              <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-increase-icon.svg" alt="Increase" />
            </button>
            <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={decreaseTextSize} disabled={state.isDecreaseTextDisabled}>
              <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-decrease-icon.svg" alt="Decrease" />
            </button>
            {!state.isEditMode && (
              <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`}>
                <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/edit-icon.svg" alt="Edit" onClick={handleTextEditor}/>
              </button>
            )}
            <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={setContentDisplayMode}>
              <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src={`${state.isContentDarkMode ? "images/light-mode-icon.svg" : "images/dark-mode-icon.svg"}`} alt="Dark Mode" />
            </button>
          </div>
          {state.isEditMode
            ? (
              <React.Fragment>
                <textarea dir="rtl" className={`border-4 border-double grow w-full p-1 font-lpmq-isep-misbah ${state.isContentDarkMode ? "border-white bg-black text-white" : "border-green-900 bg-white text-black"} overflow-y-auto rounded-md duration-200`} placeholder="Enter an arabic text here" style={{ fontSize: `${state.twTextSize}` }} onChange={onContentChangeHandler}>{state.recognizedText}</textarea>
                <button className="generate-btn flex items-center justify-center mx-auto my-2 py-1 px-3 border border-green-900 bg-green-800 hover:bg-green-900 active:bg-green-700  dark:hover:bg-green-700 dark:active:bg-green-500 text-center text-lg text-white shadow dark:shadow-white/50 duration-300 rounded-md" onClick={handleTextEditor}>{props.t('generate')}</button>
              </React.Fragment>
              )
            : (
              <div ref={contentContainerRef} className={`flex-auto h-0 w-full my-2 p-2 font-lpmq-isep-misbah ${state.isContentDarkMode ? "text-white bg-black" : "text-black bg-white"} overflow-y-auto rounded-md`} onMouseOut={hideTooltip}>
                <p dangerouslySetInnerHTML={{ __html: state.coloredTajweeds }} dir="rtl" className="duration-200" style={{ fontSize: `${state.twTextSize}` }} onMouseMove={e => showTooltip(e)}></p>
                {state.tooltipContent && (
                  <span
                    ref={tooltipRef}
                    className={`absolute p-2 ${state.isContentDarkMode ? "text-white shadow-white/50" : "text-black"} backdrop-blur-sm bg-opacity-25 rounded shadow-md z-10`}
                  >
                    {state.tooltipContent}
                  </span>
                )}
              </div>
              )
          }
        </div>
        {state.isCarouselItemHovered && (
          <svg className="absolute w-full h-full top-0 left-0 duration-300">
            {state.lines.map((line, index) => (
              <line
                key={index}
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={`${state.isContentDarkMode ? "white" : "#14532d"}`}
                strokeWidth="2"
              />
            ))}
          </svg>
        )}
        <SliderContainer
          colorizedTajweeds={state.filteredTajweeds}
          carouselItemsRefs={carouselItemsRefs}
          calculateLines={calculateLines}
        />
      </div>
    </Transition>
  )
)

export default withTranslation()(ResultContainer)
/* eslint-disable react/no-danger-with-children */
import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import MenuBarContainer from "./MenuBarContainer"
import SliderContainer from "./SliderContainer"
import TajweedGuidelines from "./TajweedGuidelines"
import SidebarContainer from "./SidebarContainer"

const ResultContainer = ({ t, state, increaseLineHeight, increaseTextSize, contentContainerRef, tooltipRef, decreaseLineHeight, decreaseTextSize, handleTextEditor, onContentChangeHandler, setContentDisplayMode, showTooltip, showSummaryModal, hideTooltip, carouselItemsRefs, calculateLines, toggleOption, toggleSelectAllGroup, closeResult }) => (
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
      <Dialog className="result-container fixed inset-0 flex flex-col bg-green-100 dark:bg-black" onClose={hideTooltip}>
        <MenuBarContainer
          t={t}
          isEditMode={state.isEditMode}
          filteredTajweeds={state.filteredTajweeds}
          selectedTajweedIds={state.selectedTajweedIds}
          toggleOption={toggleOption}
          toggleSelectAllGroup={toggleSelectAllGroup}
          closeResult={closeResult}
        />
        <main className="flex-auto h-0 flex flex-nowrap w-full">
          <SidebarContainer
            t={t}
            filteredTajweeds={state.filteredTajweeds}
            selectedTajweedIds={state.selectedTajweedIds}
            toggleOption={toggleOption}
            toggleSelectAllGroup={toggleSelectAllGroup}
          />
          <article className="flex flex-col w-full lg:w-3/4">
            <section className={`content-container grow flex flex-col m-2 px-2 ${state.isContentDarkMode ? "bg-gray-800" : "bg-green-700/25"} rounded-md shadow-md dark:shadow-white/50 duration-200`}>
              <div className={`content-menu flex items-center justify-end border-b ${state.isContentDarkMode ? "border-b-white" : "border-b-black"}`}>
                <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 my-2 p-1 rounded duration-200 overflow-hidden`} onClick={increaseLineHeight} disabled={state.isIncreaseLineHeightDisabled}>
                  <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/line-height-increase-icon.svg" alt="Increase Space" />
                </button>
                <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={decreaseLineHeight} disabled={state.isDecreaseLineHeightDisabled}>
                  <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/line-height-decrease-icon.svg" alt="Decrease Space" />
                </button>
                <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 lead p-1 rounded duration-200 overflow-hidden`} onClick={increaseTextSize} disabled={state.isIncreaseTextDisabled}>
                  <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-increase-icon.svg" alt="Increase Text" />
                </button>
                <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={decreaseTextSize} disabled={state.isDecreaseTextDisabled}>
                  <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-decrease-icon.svg" alt="Decrease Text" />
                </button>
                {!state.isEditMode && (
                  <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={handleTextEditor}>
                    <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/edit-icon.svg" alt="Edit"/>
                  </button>
                )}
                <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} onClick={setContentDisplayMode}>
                  <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src={`${state.isContentDarkMode ? "images/light-mode-icon.svg" : "images/dark-mode-icon.svg"}`} alt="Dark Mode" />
                </button>
              </div>
              {state.isEditMode
                ? (
                  <React.Fragment>
                    <textarea dir="rtl" className={`border-4 border-double grow w-full p-1 font-lpmq-isep-misbah ${state.isContentDarkMode ? "border-white bg-black text-white" : "border-green-900 bg-white text-black"} overflow-y-auto rounded-md duration-200`} placeholder="Enter an arabic text here" style={{ lineHeight: `${state.twLineHeight}`, fontSize: `${state.twTextSize}` }} onChange={onContentChangeHandler}>{state.recognizedText}</textarea>
                    <button className="generate-btn flex items-center justify-center mx-auto my-2 py-1 px-3 border border-green-900 bg-green-800 hover:bg-green-900 active:bg-green-700  dark:hover:bg-green-700 dark:active:bg-green-500 text-center text-lg text-white shadow dark:shadow-white/50 duration-300 rounded-md" onClick={handleTextEditor}>{t('generate')}</button>
                  </React.Fragment>
                  )
                : (
                  <div ref={contentContainerRef} className={`flex-auto h-0 w-full my-2 p-2 font-lpmq-isep-misbah ${state.isContentDarkMode ? "text-white bg-black" : "text-black bg-white"} overflow-y-auto rounded-md`} onMouseOut={hideTooltip}>
                    <p dangerouslySetInnerHTML={{ __html: state.coloredTajweeds }} dir="rtl" className="duration-200" style={{ lineHeight: `${state.twLineHeight}`, fontSize: `${state.twTextSize}` }} onMouseMove={e => showTooltip(e)} onClick={e => showSummaryModal(e)}></p>
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
            </section>
            <TajweedGuidelines
              isCarouselItemHovered={state.isCarouselItemHovered}
              lines={state.lines}
              linesColor={state.linesColor}
            />
            <SliderContainer
              colorizedTajweeds={state.selectedTajweedLaws}
              carouselItemsRefs={carouselItemsRefs}
              calculateLines={calculateLines}
              showSummaryModal={showSummaryModal}
            />
          </article>
        </main>
      </Dialog>
    </Transition>
  )
)

export default ResultContainer
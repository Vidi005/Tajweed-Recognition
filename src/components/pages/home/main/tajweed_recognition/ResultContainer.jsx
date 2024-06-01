/* eslint-disable react/no-danger-with-children */
import React, { Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"
import MenuBarContainer from "./MenuBarContainer"
import SliderContainer from "./SliderContainer"
import TajweedGuidelines from "./TajweedGuidelines"
import SidebarContainer from "./SidebarContainer"
import { getTajweedLaws } from "../../../../../utils/data"

const ResultContainer = ({ t, state, downloadResult, increaseLineHeight, increaseTextSize, waqfSettingInfoRef, contentContainerRef, tooltipRef, decreaseLineHeight, decreaseTextSize, handleTextEditor, onContentChangeHandler, setContentDisplayMode, showWaqfSettingInfo, showTooltip, showSummaryModal, hideTooltip, carouselItemsRefs, calculateLines, handleDisclosurePanels, handleAllColorization, changeWaqfMuanaqohStops, selectWaqf, toggleOption, toggleSelectAllGroup, closeResult }) => {
  const loadTajweedData = () => {
    const tajweedData = []
    getTajweedLaws().sort((a, b) => a.id - b.id).forEach((tajweedLaw, index) => {
      tajweedData.push({
        id: t(`tajweed_laws.${index}.id`),
        name: t(`tajweed_laws.${index}.name`),
        color: tajweedLaw.color,
        category: t(`tajweed_laws.${index}.category`)
      })
    })
    return tajweedData
  }
  return (
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
            isOddPosition={state.isOddPosition}
            waqfMuanaqohContent={state.waqfMuanaqohContent}
            filteredWaqfs={state.filteredWaqfs}
            coloredTajweeds={state.coloredTajweeds}
            filteredTajweeds={state.filteredTajweeds}
            selectedWaqfIds={state.selectedWaqfIds}
            selectedTajweedIds={state.selectedTajweedIds}
            handleAllColorization={handleAllColorization}
            changeWaqfMuanaqohStops={changeWaqfMuanaqohStops}
            selectWaqf={selectWaqf}
            toggleOption={toggleOption}
            toggleSelectAllGroup={toggleSelectAllGroup}
            closeResult={closeResult} />
          <main className="flex-auto h-0 flex flex-nowrap w-full">
            <SidebarContainer
              t={t}
              areAllPanelsExpanded={state.areAllPanelsExpanded}
              waqfSettingInfoRef={waqfSettingInfoRef}
              isOddPosition={state.isOddPosition}
              waqfMuanaqohContent={state.waqfMuanaqohContent}
              filteredWaqfs={state.filteredWaqfs}
              coloredTajweeds={state.coloredTajweeds}
              filteredTajweeds={state.filteredTajweeds}
              showWaqfSettingInfo={showWaqfSettingInfo}
              selectedWaqfIds={state.selectedWaqfIds}
              selectedTajweedIds={state.selectedTajweedIds}
              handleDisclosurePanels={handleDisclosurePanels}
              handleAllColorization={handleAllColorization}
              changeWaqfMuanaqohStops={changeWaqfMuanaqohStops}
              selectWaqf={selectWaqf}
              toggleOption={toggleOption}
              toggleSelectAllGroup={toggleSelectAllGroup} />
            <article className="flex flex-col w-full lg:w-3/4 overflow-hidden">
              <section className={`content-container grow flex flex-col m-2 px-2 ${state.isContentDarkMode ? "bg-gray-800" : "bg-green-700/25"} rounded-md shadow-md dark:shadow-white/50 duration-200`}>
                <div className={`content-menu flex items-center justify-end border-b ${state.isContentDarkMode ? "border-b-white" : "border-b-black"}`}>
                  <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 my-2 p-1 rounded duration-200 overflow-hidden`} title="Download Result" onClick={downloadResult} disabled={(!state.coloredTajweeds?.includes('style="color: #') && state.selectedTajweedIds.length === 0) || state.isEditMode}>
                    <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/download-icon.svg" alt="Download Result" />
                  </button>
                  <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} title="Increase Line Height" onClick={increaseLineHeight} disabled={state.isIncreaseLineHeightDisabled}>
                    <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/line-height-increase-icon.svg" alt="Increase Space" />
                  </button>
                  <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} title="Decrease Line Height" onClick={decreaseLineHeight} disabled={state.isDecreaseLineHeightDisabled}>
                    <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/line-height-decrease-icon.svg" alt="Decrease Space" />
                  </button>
                  <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 lead p-1 rounded duration-200 overflow-hidden`} title="Increase Text Size" onClick={increaseTextSize} disabled={state.isIncreaseTextDisabled}>
                    <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-increase-icon.svg" alt="Increase Text" />
                  </button>
                  <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} title="Decrease Text Size" onClick={decreaseTextSize} disabled={state.isDecreaseTextDisabled}>
                    <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/text-decrease-icon.svg" alt="Decrease Text" />
                  </button>
                  {!state.isEditMode && (
                    <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} title="Edit Text" onClick={handleTextEditor}>
                      <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src="images/edit-icon.svg" alt="Edit" />
                    </button>
                  )}
                  <button className={`border ${state.isContentDarkMode ? "border-white bg-gray-700" : "border-black bg-gray-200"} hover:bg-gray-400 active:bg-gray-500 ml-2 p-1 rounded duration-200 overflow-hidden`} title="Dark Mode" onClick={setContentDisplayMode}>
                    <img className={`${state.isContentDarkMode ? "invert-0" : "invert"} h-5 duration-200`} src={`${state.isContentDarkMode ? "images/light-mode-icon.svg" : "images/dark-mode-icon.svg"}`} alt="Dark Mode" />
                  </button>
                </div>
                {state.isEditMode
                  ? (
                    <React.Fragment>
                      <textarea dir="rtl" className={`border-4 border-double grow w-full p-1 font-lpmq-isep-misbah ${state.isContentDarkMode ? "border-white bg-black text-white" : "border-green-900 bg-white text-black"} overflow-y-auto rounded-md duration-200`} placeholder="Enter an arabic text here" style={{ lineHeight: `${state.twLineHeight}`, fontSize: `${state.twTextSize}` }} required onChange={onContentChangeHandler}>{state.recognizedText}</textarea>
                      <button className="generate-btn flex items-center justify-center mx-auto my-2 py-1 pl-2 pr-3 border border-green-900 bg-green-800 hover:bg-green-900 active:bg-green-700  dark:hover:bg-green-700 dark:active:bg-green-500 text-center text-lg text-white shadow dark:shadow-white/50 duration-300 rounded-md" onClick={handleTextEditor} disabled={state.recognizedText.length === 0}>
                        <img className="h-7 mr-2 object-contain" src="images/generate-icon.svg" alt="Generate Result" />
                        {t('generate')}
                      </button>
                    </React.Fragment>
                  )
                : (
                  <div ref={contentContainerRef} className={`flex-auto h-0 w-full my-2 p-2 ${state.isContentDarkMode ? "text-white bg-black" : "text-black bg-white"} overflow-y-auto rounded-md`} onMouseOut={hideTooltip}>
                    <p dangerouslySetInnerHTML={{ __html: state.coloredTajweeds }} dir="rtl" className="font-lpmq-isep-misbah duration-200" style={{ lineHeight: `${state.twLineHeight}`, fontSize: `${state.twTextSize}` }} onMouseMove={e => showTooltip(e)} onClick={e => showSummaryModal(e)}></p>
                    {state.tooltipContent && (
                      <span
                        ref={tooltipRef}
                        className={`absolute p-2 ${state.isContentDarkMode ? "text-white shadow-white/50" : "text-black"} backdrop-blur-sm bg-opacity-25 rounded shadow-md z-10`}
                      >
                        {state.tooltipContent}
                      </span>
                    )}
                    <article className="colored-tajweeds-doc-bismillah hidden">
                      <h1 style={{ fontFamily: "'Times New Roman', 'Serif'", fontSize: "14pt", textAlign: "center" }}>{t('color_index')}</h1>
                      <p style={{ width: "100%", textAlign: "center" }}>
                        <a style={{ fontFamily: "'Helvetica', 'Arial'", fontSize: "10pt" }} href={location.origin.toString()}>{location.origin.toString()}</a>
                      </p>
                      <ul>
                        {loadTajweedData().map(tajweedLaw => (
                          <li key={tajweedLaw.id} style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "4px" }}>
                            <span style={{ border: "1px solid black", fontSize: "12pt", color: tajweedLaw.color, backgroundColor: tajweedLaw.color }}>_____</span>&emsp;&emsp;:&emsp;
                            <span style={{ flexGrow: 1, fontSize: "12pt", fontFamily: "'Times New Roman', 'Serif'", textAlign: "justify" }}>{tajweedLaw.name}&emsp;<i>({tajweedLaw.category})</i></span>
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <h1 style={{ fontFamily: "'Times New Roman', 'Serif'", fontSize: "14pt", fontWeight: "bold", textAlign: "center" }}>{state.docTitle}</h1>
                      <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", direction: "rtl", fontFamily: "'LPMQ Isep Misbah', 'Times New Roman', 'Arial'", fontSize: `${Number(state.twTextSize.replace('rem', '')) * 12}pt`, lineHeight: `${Number(state.twLineHeight.replace('rem', '')) * 12}pt`, textAlign: "center", width: "100%" }}>بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>
                      <p dangerouslySetInnerHTML={{ __html: state.coloredTajweeds }} style={{ direction: "rtl", width: "100%", fontFamily: "'LPMQ Isep Misbah', 'Times New Roman', 'Arial'", fontSize: `${Number(state.twTextSize.replace('rem', '')) * 12}pt`, textAlign: "right", lineHeight: `${Number(state.twLineHeight.replace('rem', '')) * 12}pt` }}></p>
                    </article>
                    <article className="colored-tajweeds-doc hidden">
                      <h1 style={{ fontFamily: "'Times New Roman', 'Serif'", fontSize: "14pt", textAlign: "center" }}>{t('color_index')}</h1>
                      <p style={{ width: "100%", textAlign: "center" }}>
                        <a style={{ fontFamily: "'Helvetica', 'Arial'", fontSize: "10pt" }} href={location.origin.toString()}>{location.origin.toString()}</a>
                      </p>
                      <ul>
                        {loadTajweedData().map(tajweedLaw => (
                          <li key={tajweedLaw.id} style={{ display: "flex", alignItems: "center", width: "100%", marginBottom: "4px" }}>
                            <span style={{ border: "1px solid black", fontSize: "12pt", color: tajweedLaw.color, backgroundColor: tajweedLaw.color }}>_____</span>&emsp;&emsp;:&emsp;
                            <span style={{ flexGrow: 1, fontSize: "12pt", fontFamily: "'Times New Roman', 'Serif'", textAlign: "justify" }}>{tajweedLaw.name}&emsp;<i>({tajweedLaw.category})</i></span>
                          </li>
                        ))}
                      </ul>
                      <hr />
                      <h1 style={{ fontFamily: "'Times New Roman', 'Serif'", fontSize: "14pt", fontWeight: "bold", textAlign: "center" }}>{state.docTitle}</h1>
                      <p dangerouslySetInnerHTML={{ __html: state.coloredTajweeds }} style={{ direction: "rtl", width: "100%", textAlign: "right", fontFamily: "'LPMQ Isep Misbah', 'Times New Roman', 'Arial'", fontSize: `${Number(state.twTextSize.replace('rem', '')) * 12}pt`, lineHeight: `${Number(state.twLineHeight.replace('rem', '')) * 12}pt` }}></p>
                    </article>
                    <article className="colored-tajweeds-pdf hidden w-[595.28px] font-amiri-regular text-black text-xl" dir="rtl">
                      {state.isBismillahAdded && <h2 className="text-xl text-center w-full leading-[4rem]">بِسْمِ اللّٰهِ الرَّحْمٰنِ الرَّحِيْمِ</h2>}
                      <p dangerouslySetInnerHTML={{ __html: state.coloredTajweeds }} dir="rtl" className="w-full text-right leading-[4rem]"></p>
                    </article>
                  </div>
                )}
              </section>
              <TajweedGuidelines
                isCarouselItemHovered={state.isCarouselItemHovered}
                lines={state.lines}
                linesColor={state.linesColor} />
              <SliderContainer
                colorizedTajweeds={state.selectedTajweedLaws}
                carouselItemsRefs={carouselItemsRefs}
                calculateLines={calculateLines}
                showSummaryModal={showSummaryModal} />
              {state.isLoading &&
                <section className="absolute top-0 right-0 w-full lg:w-3/4 h-full flex items-center justify-center bg-black/50 backdrop-blur-sm duration-75 animate__animated animate__fadeIn">
                  <div className="flex items-center justify-center space-x-2">
                    <span className="w-8 h-8 aspect-square border-t-2 border-r-2 border-t-white border-r-white rounded-full bg-transparent animate-spin"></span>
                    <span className="text-white text-xl">{t('loading')}</span>
                  </div>
                </section>
              }
            </article>
          </main>
        </Dialog>
      </Transition>
    )
  )
}

export default ResultContainer
import { Disclosure, Listbox, RadioGroup, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const SidebarContainer = ({ t, areAllPanelsExpanded, waqfSettingInfoRef, waqfSettingContentInfoRef, isOddPosition, waqfMuanaqohContent, selectedWaqfIds, selectedTajweedIds, filteredWaqfs, filteredTajweeds, showWaqfSettingInfo, handleDisclosurePanels, handleAllColorization, changeWaqfMuanaqohStops, selectWaqf, toggleOption, toggleSelectAllGroup }) => (
  <aside className="hidden w-0 lg:inline-block lg:w-1/4 bg-green-50 dark:bg-gray-700 shadow-lg dark:shadow-white/50 overflow-y-auto">
    <h4 className="px-3 py-2 text-green-900 dark:text-white">{t("sidebar_title")}</h4>
    <h5 className={filteredWaqfs.length > 0 ? "flex items-center justify-between px-3 py-0.5 text-green-700 dark:text-gray-200" : "hidden"}>
      <span>{t("waqf_setting")}:</span>
      <img
        ref={waqfSettingInfoRef}
        className="dark:hidden max-h-7 mr-1 p-1 object-contain object-center hover:bg-green-800/25 dark:hover:bg-gray-500 duration-200 rounded-full overflow-hidden"
        src="images/info-icon.svg"
        alt="Info"
        onMouseEnter={event => showWaqfSettingInfo(event, true)}
        onMouseLeave={event => showWaqfSettingInfo(event, false)}
      />
      <img
        ref={waqfSettingInfoRef}
        className="hidden dark:inline-flex max-h-7 mr-1 p-1 object-contain object-center hover:bg-green-800/25 dark:hover:bg-gray-500 duration-200 rounded-full overflow-hidden"
        src="images/info-icon-dark.svg"
        alt="Info"
        onMouseEnter={event => showWaqfSettingInfo(event, true)}
        onMouseLeave={event => showWaqfSettingInfo(event, false)}
      />
    </h5>
    <p
      ref={waqfSettingContentInfoRef}
      className="hidden absolute border-2 border-green-900 dark:border-white w-1/5 p-1.5 text-sm text-white dark:shadow-white/50 backdrop-blur-sm bg-green-700/50 dark:bg-gray-500/50 rounded-md shadow z-20 animate__animated animate__fadeIn animate__faster"
    >{t("waqf_setting_info")}</p>
    <RadioGroup value={isOddPosition} onChange={changeWaqfMuanaqohStops} className={waqfMuanaqohContent?.id === 44 ? "mx-3" : "hidden"}>
      <RadioGroup.Description className="flex items-center flex-nowrap px-1">
        <span className="text-base brightness-100 dark:brightness-200" style={{ color: waqfMuanaqohContent.color }}>{waqfMuanaqohContent.name}</span>
        <span className="grow pl-3 font-lpmq-isep-misbah text-3xl brightness-100 dark:brightness-200" style={{ color: waqfMuanaqohContent.color }}>{waqfMuanaqohContent.unicode} ‾ {waqfMuanaqohContent.unicode}</span>
      </RadioGroup.Description>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <RadioGroup.Option value={true} className={({ active, checked }) => `${active ? 'ring-2 ring-red-300 rounded-lg' : ''} ${checked ? 'border border-red-900 dark:border-red-400 text-white rounded-lg' : 'border bg-green-200/50 dark:bg-gray-700 rounded-lg'} border-red-900 dark:border-red-400 text-red-900 dark:text-white hover:-translate-y-1 shadow-md dark:shadow-white/50 cursor-pointer duration-200`}>
          {({ checked }) => (
            checked ? (
              <div className="flex items-center flex-nowrap p-2 cursor-pointer rounded-lg duration-300" style={{ backgroundColor: waqfMuanaqohContent.color }}>
                <input
                  type="radio"
                  id="odd-pos"
                  className="form-radio h-5 w-5 mr-4 cursor-pointer duration-300"
                  style={{ accentColor: waqfMuanaqohContent.color }}
                  checked={isOddPosition}
                />
                <RadioGroup.Label htmlFor="odd-pos" className="cursor-pointer">{t("odd_position")}</RadioGroup.Label>
              </div>
            ) : (
              <div className="flex items-center flex-nowrap p-2 cursor-pointer rounded-lg duration-300">
                <input
                  type="radio"
                  id="odd-pos"
                  className="form-radio h-5 w-5 mr-4 cursor-pointer duration-300"
                  style={{ accentColor: waqfMuanaqohContent.color }}
                  checked={isOddPosition}
                />
                <RadioGroup.Label htmlFor="odd-pos" className="cursor-pointer">{t("odd_position")}</RadioGroup.Label>
              </div>
            )
          )}
        </RadioGroup.Option>
        <RadioGroup.Option value={false} className={({ active, checked }) => `${active ? 'ring-2 ring-red-300 rounded-lg' : ''} ${checked ? 'border border-red-900 dark:border-red-400 text-white rounded-lg' : 'border bg-green-200/50 dark:bg-gray-700 rounded-lg'} border-red-900 dark:border-red-400 text-red-900 dark:text-white hover:-translate-y-1 shadow-md dark:shadow-white/50 cursor-pointer duration-200`}>
          {({ checked }) => (
            checked ? (
              <div className="flex items-center flex-nowrap p-2 cursor-pointer rounded-lg duration-300" style={{ backgroundColor: waqfMuanaqohContent.color }}>
                <input
                  type="radio"
                  id="even-pos"
                  className="form-radio h-5 w-5 mr-4 cursor-pointer duration-300"
                  style={{ accentColor: waqfMuanaqohContent.color }}
                  checked={!isOddPosition}
                />
                <RadioGroup.Label htmlFor="even-pos" className="cursor-pointer">{t("even_position")}</RadioGroup.Label>
              </div>
            ) : (
              <div className="flex items-center flex-nowrap p-2 cursor-pointer rounded-lg duration-300">
                <input
                  type="radio"
                  id="even-pos"
                  className="form-radio h-5 w-5 mr-4 cursor-pointer duration-300"
                  style={{ accentColor: waqfMuanaqohContent.color }}
                  checked={!isOddPosition}
                />
                <RadioGroup.Label htmlFor="even-pos" className="cursor-pointer">{t("even_position")}</RadioGroup.Label>
              </div>
            )
          )}
        </RadioGroup.Option>
      </div>
    </RadioGroup>
    <Listbox value={selectedWaqfIds} multiple>
      <Listbox.Options static className={filteredWaqfs.length > 0 ? "border border-green-900 dark:border-white bg-green-700/50 dark:bg-gray-800 mx-3 my-2 rounded-lg shadow-md dark:shadow-white/50 overflow-hidden" : "hidden"}>
        {filteredWaqfs.sort((a, b) => b.id - a.id).map(waqf => (
          <Listbox.Label key={waqf.id} className="flex items-center flex-nowrap cursor-pointer px-3 hover:translate-x-2 duration-300">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 mr-4 duration-200"
              style={{ accentColor: waqf.color }}
              checked={selectedWaqfIds.includes(waqf.id)}
              onChange={() => selectWaqf(waqf.id)} />
            <span className="text-base brightness-150 dark:brightness-100" style={{ color: waqf.color }}>{waqf.name}</span>
            <span className="grow pl-3 text-4xl brightness-150 dark:brightness-100" style={{ color: waqf.color }}>{waqf.unicode}</span>
          </Listbox.Label>
        ))}
      </Listbox.Options>
    </Listbox>
    <h5 className={filteredTajweeds.length > 0 ? "px-3 py-1 text-green-700 dark:text-gray-200" : "hidden"}>{t("tajweed_setting")}:</h5>
    <div className={filteredTajweeds.length > 0 ? "p-2 grid grid-cols-2 items-center gap-2 text-xs" : "hidden"}>
      <button className="flex items-center justify-center border border-green-900 dark:border-white px-2 py-1 bg-green-800 dark:bg-gray-700 hover:bg-green-600 dark:hover:bg-gray-500 text-white rounded-lg shadow-md dark:shadow-white/50 duration-200" onClick={handleDisclosurePanels} title="Panels Configuration">
        <img src="images/expand-all-icon.svg" className={areAllPanelsExpanded ? "hidden" : "inline-flex max-h-6 mr-1 object-contain object-center animate__animated animate__flipInX"} alt="Expand All" />
        <img src="images/collapse-all-icon.svg" className={areAllPanelsExpanded ? "inline-flex max-h-6 mr-1 object-contain object-center animate__animated animate__flipInX" : "hidden"} alt="Collapse All" />
        <span className={areAllPanelsExpanded ? "hidden" : "inline-flex animate__animated animate__fadeIn"}>{t("expand_all")}</span>
        <span className={areAllPanelsExpanded ? "inline-flex animate__animated animate__fadeIn" : "hidden"}>{t("collapse_all")}</span>
      </button>
      <button className="flex items-center justify-center border border-green-900 dark:border-white px-2 py-1 bg-green-800 dark:bg-gray-700 hover:bg-green-600 dark:hover:bg-gray-500 text-white rounded-lg shadow-md dark:shadow-white/50 duration-200" onClick={handleAllColorization} title="Colorization">
        <img src="images/clear-all-icon.svg" className={selectedTajweedIds.length === filteredTajweeds.length ? "inline-flex max-h-6 mr-1 object-contain object-center animate__animated animate__flipInY" : "hidden"} alt="Clear All" />
        <img src="images/colorize-all-icon.svg" className={selectedTajweedIds.length !== filteredTajweeds.length ? "inline-flex max-h-6 mr-1 object-contain object-center animate__animated animate__flipInY" : "hidden"} alt="Colorize All" />
        <span className={selectedTajweedIds.length === filteredTajweeds.length ? "inline-flex animate__animated animate__fadeIn" : "hidden"}>{t("clear_all")}</span>
        <span className={selectedTajweedIds.length !== filteredTajweeds.length ? "inline-flex animate__animated animate__fadeIn" : "hidden"}>{t("colorize_all")}</span>
      </button>
    </div>
    {Array.from(new Set(filteredTajweeds.map(tajweedLaw => tajweedLaw.category))).map(category => (
      <Disclosure as={"menu"} key={category} className={"px-2"} defaultOpen={areAllPanelsExpanded}>
        {({ open }) => (
          <>
            <Disclosure.Button className={"flex w-full items-center justify-between border border-green-100 dark:border-white m-1 px-3 py-2 bg-green-800/75 hover:bg-green-700 dark:bg-black dark:hover:bg-gray-500 text-white rounded-lg shadow-md dark:shadow-white/50 duration-200"}>
              <span>{category}</span>
              <img className={`${open ? "-rotate-180 duration-200" : "duration-200"} max-h-8 p-1`} src="images/expand-icon.svg" alt="Expand" />
            </Disclosure.Button>
            <Transition as={Fragment} appear show={open}>
              <Disclosure.Panel className={"max-w-full mx-1 overflow-hidden"}>
                <Transition.Child
                  enter="ease-out duration-300"
                  enterFrom="opacity-50 -translate-y-1/2"
                  enterTo="opacity-100 translate-y-0"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-50 -translate-y-1/2"
                >
                  <label className="flex items-center flex-nowrap cursor-pointer px-3 py-2 bg-green-700/50 dark:bg-gray-800 text-white hover:translate-x-2 duration-300 rounded-md" htmlFor={category}>
                    <input
                      type="checkbox"
                      name={category}
                      id={category}
                      className="form-checkbox accent-green-600 dark:accent-gray-600 h-5 w-5 mr-4 duration-200"
                      checked={filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).every(tajweedLaw => selectedTajweedIds.some(selectedTajweedId => selectedTajweedId === tajweedLaw.id))}
                      onChange={() => toggleSelectAllGroup(category)} />
                    <span className="grow text-base">{t('select_all')}</span>
                  </label>
                  {filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).map(tajweedLaw => (
                    <label className="flex items-center flex-nowrap cursor-pointer px-3 py-2 hover:translate-x-2 duration-300" key={tajweedLaw.id} htmlFor={tajweedLaw.id}>
                      <input
                        name={tajweedLaw.id}
                        type="checkbox"
                        id={tajweedLaw.id}
                        className="form-checkbox h-5 w-5 ml-6 mr-3 duration-200"
                        style={{ accentColor: tajweedLaw.color }}
                        checked={selectedTajweedIds.some(selectedTajweedId => selectedTajweedId === tajweedLaw.id)}
                        onChange={() => toggleOption(tajweedLaw.id)} />
                      <span className="grow text-base brightness-75 dark:brightness-110" style={{ color: tajweedLaw.color }}>{tajweedLaw.name}</span>
                    </label>
                  ))}
                </Transition.Child>
              </Disclosure.Panel>
            </Transition>
          </>
        )}
      </Disclosure>
    ))}
  </aside>
)

export default SidebarContainer
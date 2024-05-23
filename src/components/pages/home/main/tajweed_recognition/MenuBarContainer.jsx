import { Listbox, Popover, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import Swal from "sweetalert2"

const MenuBarContainer = ({ t, isEditMode, selectedWaqfIds, selectedTajweedIds, filteredWaqfs, filteredTajweeds, selectWaqf, toggleOption, handleAllColorization, toggleSelectAllGroup, closeResult }) => (
  <header className="menu-bar__container flex flex-nowrap items-center w-full p-1 bg-green-50 dark:bg-gray-700 shadow-lg z-10">
    <h3 className="title-bar flex-1 pl-2 text-green-900 dark:text-white">{isEditMode ? t('container_title.0') : t('container_title.1')}</h3>
    <Popover className={"menu-btn flex-none inline-block lg:hidden h-10"}>
      <Popover.Button className={"p-2 hover:bg-green-800/25 dark:hover:bg-gray-500 active:bg-green-800/40 dark:active:bg-gray-300 duration-200 rounded-md"} title="Tajweed Settings" disabled={filteredTajweeds.length === 0}>
        <img className="dark:hidden h-full duration-200" src="images/tajweed-menu-icon.svg" alt="Tajweed Settings" />
        <img className="hidden dark:block h-full duration-200" src="images/tajweed-menu-icon-dark.svg" alt="Tajweed Settings" />
      </Popover.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-300"
        enterFrom="transform opacity-0 scale-95 -translate-y-1/4"
        enterTo="transform opacity-100 scale-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="transform opacity-100 scale-100 translate-y-0"
        leaveTo="transform opacity-0 scale-95 -translate-y-1/4"
      >
        <Popover.Panel className={"absolute right-2 mt-2 max-w-full w-max max-h-[83%] p-2 origin-top-right bg-green-50 dark:bg-gray-700 shadow-xl dark:shadow-md dark:shadow-white/50 rounded-lg overflow-x-hidden z-10"}>
          <h5 className={filteredWaqfs.length > 0 ? "p-2 text-green-700 dark:text-gray-200 animate__animated animate__fadeInRight animate__faster" : "hidden"}>{t("waqf_setting")}:</h5>
          <Listbox value={selectedWaqfIds} multiple>
            <Listbox.Options static className={filteredWaqfs.length > 0 ? "border border-green-900 dark:border-white bg-green-700/50 dark:bg-gray-800 m-1 rounded-lg shadow-md dark:shadow-white/50 overflow-hidden animate__animated animate__fadeInRight animate__faster" : "hidden"}>
              {filteredWaqfs.sort((a, b) => b.id - a.id).map(waqf => (
                <Listbox.Label key={waqf.id} className="flex items-center flex-nowrap cursor-pointer px-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-5 w-5 mr-4 duration-200"
                    style={{ accentColor: waqf.color }}
                    checked={selectedWaqfIds.includes(waqf.id)}
                    onChange={() => selectWaqf(waqf.id)}
                  />
                  <span className="text-sm md:text-base brightness-150 dark:brightness-100" style={{ color: waqf.color }}>{waqf.name}</span>
                  <span className="grow pl-3 text-3xl md:text-4xl brightness-150 dark:brightness-100" style={{ color: waqf.color }}>{waqf.unicode}</span>
                </Listbox.Label>
              ))}
            </Listbox.Options>
          </Listbox>
          <h5 className={filteredTajweeds.length > 0 ? "p-2 text-green-700 dark:text-gray-200 animate__animated animate__fadeInRight animate__faster" : "hidden"}>{t("tajweed_setting")}:</h5>
          <button className={filteredTajweeds.length === 0 ? "hidden" : "flex items-center justify-center border border-green-900 dark:border-white w-full mb-2 px-2 py-1 bg-green-800 dark:bg-gray-700 hover:bg-green-600 dark:hover:bg-gray-500 text-sm text-white rounded-lg shadow-md dark:shadow-white/50 duration-200 animate__animated animate__fadeInRight animate__faster"} onClick={handleAllColorization} title="Colorization">
            <img src="images/clear-all-icon.svg" className={selectedTajweedIds.length === filteredTajweeds.length ? "inline-flex max-h-6 mr-1 object-contain object-center animate__animated animate__flipInY" : "hidden"} alt="Clear All" />
            <img src="images/colorize-all-icon.svg" className={selectedTajweedIds.length !== filteredTajweeds.length ? "inline-flex max-h-6 mr-1 object-contain object-center animate__animated animate__flipInY" : "hidden"} alt="Colorize All" />
            <span className={selectedTajweedIds.length === filteredTajweeds.length ? "inline-flex animate__animated animate__fadeIn" : "hidden"}>{t("clear_all")}</span>
            <span className={selectedTajweedIds.length !== filteredTajweeds.length ? "inline-flex animate__animated animate__fadeIn" : "hidden"}>{t("colorize_all")}</span>
          </button>
          <Listbox value={selectedTajweedIds} multiple>
            <Listbox.Options static className={"menu-list max-h-full overflow-y-auto"}>
            {Array.from(new Set(filteredTajweeds.map(tajweedLaw => tajweedLaw.category))).map(category => (
              <React.Fragment key={category}>
                <Listbox.Option as="label" className="flex items-center flex-nowrap cursor-pointer px-2 py-3 bg-green-800/75 dark:bg-black text-white rounded-md animate__animated animate__fadeInRight animate__faster">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-green-600 dark:accent-gray-600 h-5 w-5 mr-4 duration-200"
                    checked={filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).every(tajweedLaw => selectedTajweedIds.some(selectedTajweedId => selectedTajweedId === tajweedLaw.id))}
                    onChange={() => toggleSelectAllGroup(category)}
                  />
                  <span className="grow text-sm md:text-base"><strong>{category}</strong></span>
                </Listbox.Option>
                {filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).map(tajweedLaw => (
                  <Listbox.Label className={"flex items-center flex-nowrap cursor-pointer p-2 text-green-900 dark:text-gray-50 animate__animated animate__fadeInRight animate__faster"} key={tajweedLaw.id} value={tajweedLaw.id}>
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5 ml-6 mr-3 duration-200"
                      style={{ accentColor: tajweedLaw.color }}
                      checked={selectedTajweedIds.some(selectedTajweedId => selectedTajweedId === tajweedLaw.id)}
                      onChange={() => toggleOption(tajweedLaw.id)}
                    />
                    <span className="grow text-sm md:text-base brightness-75 dark:brightness-110" style={{ color: tajweedLaw.color }}>{tajweedLaw.name}</span>
                  </Listbox.Label>
                ))}
              </React.Fragment>
            ))}
            </Listbox.Options>
          </Listbox>
        </Popover.Panel>
      </Transition>
    </Popover>
    <button className="discard-btn flex-none h-10 p-2 hover:bg-green-800/25 dark:hover:bg-gray-500 active:bg-green-800/40 dark:active:bg-gray-300 duration-200 rounded-md" title="Close" onClick={() => {
      Swal.fire({
        title: t('close_result_prompt.0'),
        text: t('close_result_prompt.1'),
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
  </header>
)

export default MenuBarContainer
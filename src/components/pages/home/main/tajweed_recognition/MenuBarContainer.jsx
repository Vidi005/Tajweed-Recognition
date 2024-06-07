import { Listbox, Popover, RadioGroup, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import Swal from "sweetalert2"

const MenuBarContainer = ({ t, isEditMode, waqfSettingInfoRef, waqfSettingContentInfoRef, colorizationMode, isOddPosition, waqfMuanaqohContent, selectedWaqfIds, showWaqfSettingInfo, selectedTajweedIds, filteredWaqfs, filteredTajweeds, changeColorizationMode, changeWaqfMuanaqohStops, selectWaqf, toggleOption, handleAllColorization, toggleSelectAllGroup, closeResult }) => (
  <header className="menu-bar__container relative flex flex-nowrap items-center w-full p-1 bg-green-50 dark:bg-gray-700 shadow-lg z-10">
    <section className="absolute inset-0 flex flex-nowrap items-center justify-between overflow-hidden">
      <img className={`block dark:hidden object-contain object-left origin-left w-full h-full animate__animated animate__fadeInLeft`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture.svg`} alt="Background Image" />
      <img className={`hidden dark:block object-contain object-left origin-left w-full h-full animate__animated animate__fadeInRight`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture-dark.svg`} alt="Background Image" />
      <img className={`block dark:hidden object-contain object-center origin-center w-full h-full animate__animated animate__fadeInLeft`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture.svg`} alt="Background Image" />
      <img className={`hidden dark:block object-contain object-center origin-center w-full h-full animate__animated animate__fadeInRight`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture-dark.svg`} alt="Background Image" />
      <img className={`block dark:hidden object-contain object-center origin-center w-full h-full animate__animated animate__fadeInLeft`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture.svg`} alt="Background Image" />
      <img className={`hidden dark:block object-contain object-center origin-center w-full h-full animate__animated animate__fadeInRight`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture-dark.svg`} alt="Background Image" />
      <img className={`block dark:hidden object-contain object-center origin-center w-full h-full animate__animated animate__fadeInLeft`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture.svg`} alt="Background Image" />
      <img className={`hidden dark:block object-contain object-center origin-center w-full h-full animate__animated animate__fadeInRight`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture-dark.svg`} alt="Background Image" />
      <img className={`block dark:hidden object-contain object-center origin-center w-full h-full animate__animated animate__fadeInLeft`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture.svg`} alt="Background Image" />
      <img className={`hidden dark:block object-contain object-center origin-center w-full h-full animate__animated animate__fadeInRight`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture-dark.svg`} alt="Background Image" />
      <img className={`block dark:hidden object-contain object-right origin-right w-full h-full animate__animated animate__fadeInLeft`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture.svg`} alt="Background Image" />
      <img className={`hidden dark:block object-contain object-right origin-right w-full h-full animate__animated animate__fadeInRight`} src={`${import.meta.env.BASE_URL}images/bottom-nav-picture-dark.svg`} alt="Background Image" />
      <span className="absolute w-full h-1/6 bottom-0 bg-gradient-to-t from-green-50 dark:from-gray-700"></span>
      <span className="absolute w-full h-1/6 top-0 bg-gradient-to-b from-green-50 dark:from-gray-700"></span>
      <span className="absolute w-1/12 h-full left-0 bg-gradient-to-r from-green-50 dark:from-gray-700 via-transparent"></span>
      <span className="absolute w-1/12 h-full right-0 bg-gradient-to-l from-green-50 dark:from-gray-700 via-transparent"></span>
    </section>
    <h3 className="title-bar flex-1 pl-2 text-green-900 dark:text-white z-10">{isEditMode ? t('container_title.0') : t('container_title.1')}</h3>
    <Popover className={"menu-btn flex-none inline-block lg:hidden h-10 z-10"}>
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
        <Popover.Panel className={"fixed right-2 mt-2 max-w-full w-max max-h-[83%] p-2 origin-top-right bg-green-50 dark:bg-gray-700 shadow-xl dark:shadow-md dark:shadow-white/50 rounded-lg overflow-x-hidden z-10"}>
          <h5 className={"p-2 text-green-700 dark:text-gray-200 animate__animated animate__fadeInRight animate__faster"}>{t("colorization_setting")}:</h5>
          <RadioGroup value={colorizationMode} onChange={changeColorizationMode} className={"grid grid-cols-2 gap-2 mx-1 mb-2 text-xs md:text-sm animate__animated animate__fadeInRight animate__faster"}>
            <RadioGroup.Option value={"Text Color"} className={({ active, checked }) => `${active ? 'ring-2 ring-green-300 rounded-lg' : ''} ${checked ? 'border border-green-900 dark:border-green-400 text-white rounded-lg' : 'border bg-green-200/50 dark:bg-gray-700 rounded-lg'} border-green-900 dark:border-green-400 text-green-900 dark:text-white shadow-md dark:shadow-white/50 cursor-pointer duration-200`}>
              {({ checked }) => (
                checked ? (
                  <div className="flex items-center flex-nowrap bg-green-800 dark:bg-green-600 p-2 cursor-pointer rounded-lg duration-300">
                    <img className="max-h-4 mr-2 object-contain object-center" src="images/text-color-icon.svg" alt="Text Color" />
                    <RadioGroup.Label className="cursor-pointer">{t("text_color")}</RadioGroup.Label>
                  </div>
                ) : (
                  <div className="flex items-center flex-nowrap p-2 cursor-pointer rounded-lg duration-300">
                    <img className="hidden dark:inline-block max-h-4 mr-2 object-contain object-center" src="images/text-color-icon.svg" alt="Text Color" />
                    <img className="dark:hidden max-h-4 mr-2 object-contain object-center" src="images/text-color-icon-dark.svg" alt="Text Color" />
                    <RadioGroup.Label className="cursor-pointer">{t("text_color")}</RadioGroup.Label>
                  </div>
                )
              )}
            </RadioGroup.Option>
            <RadioGroup.Option value={"Background Color"} className={({ active, checked }) => `${active ? 'ring-2 ring-green-300 rounded-lg' : ''} ${checked ? 'border border-green-900 dark:border-green-400 text-white rounded-lg' : 'border bg-green-200/50 dark:bg-gray-700 rounded-lg'} border-green-900 dark:border-green-400 text-green-900 dark:text-white shadow-md dark:shadow-white/50 cursor-pointer duration-200`}>
              {({ checked }) => (
                checked ? (
                  <div className="flex items-center flex-nowrap bg-green-800 dark:bg-green-600 p-2 cursor-pointer rounded-lg duration-300">
                    <img className="max-h-4 mr-2 object-contain object-center" src="images/background-color-icon.svg" alt="Background Color" />
                    <RadioGroup.Label className="cursor-pointer">{t("background_color")}</RadioGroup.Label>
                  </div>
                ) : (
                  <div className="flex items-center flex-nowrap p-2 cursor-pointer rounded-lg duration-300">
                    <img className="hidden dark:inline-block max-h-4 mr-2 object-contain object-center" src="images/background-color-icon.svg" alt="Background Color" />
                    <img className="dark:hidden max-h-4 mr-2 object-contain object-center" src="images/background-color-icon-dark.svg" alt="Background Color" />
                    <RadioGroup.Label className="cursor-pointer">{t("background_color")}</RadioGroup.Label>
                  </div>
                )
              )}
            </RadioGroup.Option>
          </RadioGroup>
          <h5 className={filteredWaqfs.length > 0 ? "flex items-center justify-between p-2 text-green-700 dark:text-gray-200 animate__animated animate__fadeInRight animate__faster" : "hidden"}>
            <span>{t("waqf_setting")}:</span>
            <img
              ref={waqfSettingInfoRef}
              className="dark:hidden max-h-6 mr-1 p-0.5 object-contain object-center hover:bg-green-800/25 dark:hover:bg-gray-500 duration-200 rounded-full overflow-hidden"
              src="images/info-icon.svg"
              alt="Info"
              onMouseEnter={event => showWaqfSettingInfo(event, true)}
              onMouseLeave={event => showWaqfSettingInfo(event, false)}
            />
            <img
              ref={waqfSettingInfoRef}
              className="invisible dark:visible max-h-6 mr-1 p-0.5 object-contain object-center hover:bg-green-800/25 dark:hover:bg-gray-500 duration-200 rounded-full overflow-hidden"
              src="images/info-icon-dark.svg"
              alt="Info"
              onMouseEnter={event => showWaqfSettingInfo(event, true)}
              onMouseLeave={event => showWaqfSettingInfo(event, false)}
            />
          </h5>
          <p
            ref={waqfSettingContentInfoRef}
            className="hidden absolute border border-green-900 dark:border-white w-11/12 p-1 text-xs md:text-sm text-white dark:shadow-white/50 backdrop-blur-sm bg-green-700/50 dark:bg-gray-500/50 rounded-md shadow z-10 animate__animated animate__fadeIn animate__faster"
          >{t("waqf_setting_info")}
          </p>
          <RadioGroup value={isOddPosition} onChange={changeWaqfMuanaqohStops} className={waqfMuanaqohContent?.id === 44 ? "mx-1 mb-2 animate__animated animate__fadeInRight animate__faster" : "hidden"}>
            <RadioGroup.Description className="flex items-center flex-nowrap px-1">
              <span className="text-sm md:text-base brightness-100 dark:brightness-200 drop-shadow" style={{ color: waqfMuanaqohContent.color }}>{waqfMuanaqohContent.name}</span>
              <span className="grow pl-3 font-lpmq-isep-misbah text-2xl md:text-3xl brightness-100 dark:brightness-200 drop-shadow" style={{ color: waqfMuanaqohContent.color }}>{waqfMuanaqohContent.unicode} ‾ {waqfMuanaqohContent.unicode}</span>
            </RadioGroup.Description>
            <div className="grid grid-cols-2 gap-2 text-xs md:text-sm">
              <RadioGroup.Option value={true} className={({ active, checked }) => `${active ? 'ring-2 ring-red-300 rounded-lg' : ''} ${checked ? 'border border-red-900 dark:border-red-400 text-white rounded-lg' : 'border bg-green-200/50 dark:bg-gray-700 rounded-lg'} border-red-900 dark:border-red-400 text-red-900 dark:text-white shadow-md dark:shadow-white/50 cursor-pointer duration-200`}>
                {({ checked }) => (
                  checked ? (
                    <div className="flex items-center flex-nowrap p-1.5 cursor-pointer rounded-lg duration-300" style={{ backgroundColor: waqfMuanaqohContent.color }}>
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
                    <div className="flex items-center flex-nowrap p-1.5 cursor-pointer rounded-lg duration-300">
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
              <RadioGroup.Option value={false} className={({ active, checked }) => `${active ? 'ring-2 ring-red-300 rounded-lg' : ''} ${checked ? 'border border-red-900 dark:border-red-400 text-white rounded-lg' : 'border bg-green-200/50 dark:bg-gray-700 rounded-lg'} border-red-900 dark:border-red-400 text-red-900 dark:text-white shadow-md dark:shadow-white/50 cursor-pointer duration-200`}>
                {({ checked }) => (
                  checked ? (
                    <div className="flex items-center flex-nowrap p-1.5 cursor-pointer rounded-lg duration-300" style={{ backgroundColor: waqfMuanaqohContent.color }}>
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
                    <div className="flex items-center flex-nowrap p-1.5 cursor-pointer rounded-lg duration-300">
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
                  <span className="text-sm md:text-base brightness-150 dark:brightness-100 drop-shadow" style={{ color: waqf.color }}>{waqf.name}</span>
                  <span className="grow pl-3 text-3xl md:text-4xl brightness-150 dark:brightness-100 drop-shadow" style={{ color: waqf.color }}>{waqf.unicode}</span>
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
                  <span className="grow text-sm md:text-base drop-shadow"><strong>{category}</strong></span>
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
                    <span className="grow text-sm md:text-base brightness-75 dark:brightness-110 drop-shadow" style={{ color: tajweedLaw.color }}>{tajweedLaw.name}</span>
                  </Listbox.Label>
                ))}
              </React.Fragment>
            ))}
            </Listbox.Options>
          </Listbox>
        </Popover.Panel>
      </Transition>
    </Popover>
    <button className="discard-btn flex-none h-10 p-2 hover:bg-green-800/25 dark:hover:bg-gray-500 active:bg-green-800/40 dark:active:bg-gray-300 duration-200 rounded-md z-10" title="Close" onClick={() => {
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
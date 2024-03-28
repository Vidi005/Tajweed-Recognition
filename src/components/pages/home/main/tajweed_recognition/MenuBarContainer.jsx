import { Listbox, Popover, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import Swal from "sweetalert2"

const MenuBarContainer = ({ isEditMode, selectedTajweedIds, filteredTajweeds, toggleOption, toggleSelectAllGroup, closeResult }) => (
  <div className="menu-bar__container flex flex-nowrap items-center w-full p-1 bg-green-50 dark:bg-gray-700 shadow-lg">
    <h3 className="title-bar flex-1 pl-2 text-green-900 dark:text-white">{isEditMode ? "Editor" : "Result"}</h3>
    <Popover className={"menu-btn flex-none inline-block md:hidden h-10"}>
      <Popover.Button className={"p-2 hover:bg-green-800/25 dark:hover:bg-gray-500 active:bg-green-800/40 dark:active:bg-gray-300 duration-200 rounded-md"} disabled={filteredTajweeds.length === 0}>
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
        <Popover.Panel className={"absolute right-2 mt-2 max-w-full w-max h-5/6 p-2 origin-top-right bg-green-50 dark:bg-gray-700 shadow-xl dark:shadow-md dark:shadow-white/50 rounded-lg overflow-x-hidden z-10"}>
          <Listbox value={selectedTajweedIds} multiple>
            <Listbox.Options static className={"menu-list max-h-full overflow-y-auto"}>
            {Array.from(new Set(filteredTajweeds.map(tajweedLaw => tajweedLaw.category))).map(category => (
              <React.Fragment key={category}>
                <Listbox.Option as="label" className="flex items-center flex-nowrap cursor-pointer px-2 py-3 bg-green-800/75 dark:bg-black text-white rounded-md animate__animated animate__fadeInRight animate__faster">
                  <input
                    type="checkbox"
                    className="form-checkbox accent-green-600 dark:accent-gray-600 h-5 w-5 mr-4 duration-200"
                    checked={filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).every(tajweedLaw => selectedTajweedIds.includes(tajweedLaw.id))}
                    onChange={() => toggleSelectAllGroup(category)}
                  />
                  <span className="grow text-sm md:text-base"><strong>{category}</strong></span>
                </Listbox.Option>
                {filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).map(tajweedLaw => (
                  <Listbox.Label className={"flex items-center flex-nowrap cursor-pointer p-2 text-green-900 dark:text-gray-50 animate__animated animate__fadeInRight animate__faster"} key={tajweedLaw.id} value={tajweedLaw.id}>
                    <input
                      type="checkbox"
                      className="form-checkbox accent-green-700 dark:accent-gray-500 h-5 w-5 ml-6 mr-3 duration-200"
                      checked={selectedTajweedIds.includes(tajweedLaw.id)}
                      onChange={() => toggleOption(tajweedLaw.id)}
                    />
                    <span className="grow text-sm md:text-base">{tajweedLaw.name}</span>
                  </Listbox.Label>
                ))}
              </React.Fragment>
            ))}
            </Listbox.Options>
          </Listbox>
        </Popover.Panel>
      </Transition>
    </Popover>
    <button className="discard-btn flex-none h-10 p-2 hover:bg-green-800/25 dark:hover:bg-gray-500 active:bg-green-800/40 dark:active:bg-gray-300 duration-200 rounded-md" onClick={() => {
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
)

export default MenuBarContainer
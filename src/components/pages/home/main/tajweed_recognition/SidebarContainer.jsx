import { Disclosure, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import { withTranslation } from "react-i18next"

const SidebarContainer = ({ props, selectedTajweedIds, filteredTajweeds, toggleOption, toggleSelectAllGroup }) => (
  <aside className="hidden w-0 lg:inline-block lg:w-1/4 bg-green-50 dark:bg-gray-700 overflow-y-auto">
    <h4 className="px-3 py-2">{props.t("sidebar_title")}</h4>
    {Array.from(new Set(filteredTajweeds.map(tajweedLaw => tajweedLaw.category))).map(category => (
      <Disclosure as={"menu"} key={category} className={"px-2"}>
        {({ open }) => (
          <>
            <Disclosure.Button className={"flex w-full items-center justify-between border border-green-100 dark:border-white m-1 px-3 py-2 bg-green-800/75 hover:bg-green-700 dark:bg-black dark:hover:bg-gray-500 text-white rounded-lg duration-200"}>
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
                  <label className="flex items-center flex-nowrap cursor-pointer px-3 py-2 bg-green-800/75 dark:bg-gray-800 text-white rounded-md" htmlFor="select-all">
                    <input
                      type="checkbox"
                      id="select-all"
                      className="form-checkbox accent-green-600 dark:accent-gray-600 h-5 w-5 mr-4 duration-200"
                      checked={filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).every(tajweedLaw => selectedTajweedIds.includes(tajweedLaw.id))}
                      onChange={() => toggleSelectAllGroup(category)}
                    />
                    <span className="grow text-base xl:text-lg"><strong>{props.t('select_all')}</strong></span>
                  </label>
                  {filteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).map(tajweedLaw => (
                    <label className="flex items-center flex-nowrap cursor-pointer p-3 text-green-900 dark:text-gray-50" key={tajweedLaw.id} htmlFor={tajweedLaw.id}>
                      <input
                        type="checkbox"
                        id={tajweedLaw.id}
                        className="form-checkbox accent-green-700 dark:accent-gray-500 h-5 w-5 ml-6 mr-3 duration-200"
                        checked={selectedTajweedIds.includes(tajweedLaw.id)}
                        onChange={() => toggleOption(tajweedLaw.id)}
                      />
                      <span className="grow text-base xl:text-lg">{tajweedLaw.name}</span>
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

export default withTranslation()(SidebarContainer)
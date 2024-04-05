import React, { Fragment } from "react"
import SearchBar from "./SearchBar"
import { Disclosure, Transition } from "@headlessui/react"
import { withTranslation } from "react-i18next"

const SidebarContainer = ({ t, searchitem, getFilteredTajweeds }) => (
  <aside className="hidden lg:inline-block lg:w-1/4 bg-green-50 dark:bg-gray-700 shadow-lg dark:shadow-white/50 overflow-y-auto">
    <h4 className="p-2 text-green-900 dark:text-white">Tajweed List</h4>
    <SearchBar t={t} searchItems={searchitem}/>
    {
      getFilteredTajweeds?.length > 0
        ? <>
          {Array.from(new Set(getFilteredTajweeds.map(tajweedLaw => tajweedLaw.category))).map(category => (
            <Disclosure as={"menu"} key={category} className={"px-2"}>
              {({ open }) => (
                <>
                  <Disclosure.Button className={"flex w-full items-center m-1 p-2 text-green-900 dark:text-gray-100 hover:text-green-800/75 dark:hover:text-white duration-200"}>
                    <img className={`${open ? "-rotate-180 duration-200" : "duration-200"} max-h-8`} src="images/expand-icon.svg" alt="Expand" />
                    <span>{category}</span>
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
                        <li>
                          {getFilteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).map(tajweedLaw => <ul className="p-2 text-base text-green-800 dark:text-gray-200 hover:text-green-700/75 dark:hover:text-gray-50 hover:translate-x-2 duration-300" key={tajweedLaw.id}>
                            {tajweedLaw.name}
                          </ul>)}
                        </li>
                      </Transition.Child>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          ))}
          </>
        : (
          <article className="nav-product-list__content min-h-full lg:hidden font-bold text-center text-green-900 dark:text-white dark:bg-gray-900">
            <p className="border border-green-800 dark:border-gray-300 m-1 p-4 bg-green-50 dark:bg-gray-800 rounded-lg">{t('empty_list')}</p>
          </article>
          )
    }
  </aside>
)

export default SidebarContainer
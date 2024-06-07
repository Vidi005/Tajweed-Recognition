import React, { Fragment } from "react"
import SearchBar from "./SearchBar"
import { Disclosure, Transition } from "@headlessui/react"
import { tajweedLaws } from "../../../../../utils/data"

const SidebarContainer = ({ t, searchItems, getFilteredTajweeds }) => {
  const currentUrlPath = location.pathname.split("/").slice(2).join("/")
  return (
    <aside className="hidden max-h-full p-2 lg:inline-block lg:w-1/4 bg-green-100 dark:bg-gray-700 shadow-lg dark:shadow-white/50 duration-200 overflow-y-auto overflow-x-hidden">
      <div className="fixed dark:hidden bottom-0 w-1/6">
        <img className="w-full object-contain origin-bottom-left opacity-25 animate__animated animate__slideInUp" src={`${import.meta.env.BASE_URL}images/sidebar-tajweed-list-picture.svg`} alt="Background Image" />
        <span className="absolute w-full h-full inset-0 bg-gradient-to-bl from-green-100"></span>
      </div>
      <div className="hidden dark:block fixed bottom-0 w-1/6">
        <img className="w-full object-contain origin-bottom-left opacity-25 animate__animated animate__slideInUp" src={`${import.meta.env.BASE_URL}images/sidebar-tajweed-list-picture-dark.svg`} alt="Background Image" />
        <span className="absolute w-full h-full inset-0 bg-gradient-to-bl from-gray-700"></span>
      </div>
      <h3 className="m-1 p-2 text-green-900 dark:text-white z-10">{t('tajweed_list')}</h3>
      <SearchBar t={t} searchItems={searchItems} />
      {getFilteredTajweeds?.length > 0
        ? <>
          {Array.from(new Set(getFilteredTajweeds.map(tajweedLaw => tajweedLaw.category))).map(category => {
            const filteredCategory = getFilteredTajweeds.some(tajweedLaw => tajweedLaw.category === category && tajweedLaw.page === `/${currentUrlPath}`)
            return (
              <Disclosure defaultOpen={filteredCategory} as={"menu"} key={category} className={"relative px-2 animate__animated animate__slideInLeft"}>
                {({ open }) => (
                  <>
                    <Disclosure.Button className={"flex w-full items-center my-1 py-2 font-bold text-green-900 dark:text-gray-100 group hover:text-green-800/75 dark:hover:text-white duration-200"}>
                      <img className={`${open ? "duration-200" : "-rotate-90 duration-200"} max-h-8 invert dark:invert-0`} src={`${import.meta.env.BASE_URL}images/expand-icon.svg`} alt="Expand" />
                      <span className="group-hover:underline duration-200 drop-shadow-md">{category}</span>
                    </Disclosure.Button>
                    <Transition as={Fragment} appear show={open}>
                      <Disclosure.Panel className={"max-w-full overflow-hidden"}>
                        <Transition.Child
                          enter="ease-out duration-300"
                          enterFrom="opacity-50 -translate-y-1/2"
                          enterTo="opacity-100 translate-y-0"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-50 -translate-y-1/2"
                        >
                          <ul>
                            {getFilteredTajweeds.filter(tajweedLaw => tajweedLaw.category === category).map(tajweedLaw => <li className={`max-w-full my-1 ml-4 px-2 py-1 text-base ${location.toString().includes(tajweedLaw.page) ? "font-bold border-l-8" : "hover:border-l-8"} text-green-800 dark:text-gray-200 hover:text-green-700/75 dark:hover:text-gray-50 hover:underline hover:translate-x-2 cursor-pointer duration-300 drop-shadow-md`} key={tajweedLaw.id} style={{ borderLeftColor: tajweedLaws().find(tajweed => tajweed.id === tajweedLaw.id).color }}>
                              <a className="drop-shadow-md" href={`/tajweed-list${tajweedLaw.page}`}>{tajweedLaw.name}</a>
                            </li>)}
                          </ul>
                        </Transition.Child>
                      </Disclosure.Panel>
                    </Transition>
                  </>
                )}
              </Disclosure>
            )
          })}
        </>
        : (
          <article className="nav-product-list__content max-h-full lg:hidden font-bold text-center text-green-900 dark:text-white dark:bg-gray-900 z-10">
            <p className="border border-green-800 dark:border-gray-300 m-1 p-4 bg-green-100 dark:bg-gray-800 rounded-lg">{t('empty_list')}</p>
          </article>
        )}
    </aside>
  )
}

export default SidebarContainer
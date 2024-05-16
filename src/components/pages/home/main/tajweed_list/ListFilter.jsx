import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import en from "../../../../../locales/en.json"

const ListFilter = ({ t, filterBy, filterItems }) => (
  <Menu as={"menu"} className={"list-filter relative inline-block z-10"}>
    <Menu.Button className={"bg-green-100 dark:bg-gray-300 md:mx-1 p-1 hover:bg-green-800/40 dark:hover:bg-gray-50 rounded-lg shadow dark:shadow-white/50 duration-200"}>
      {filterBy === t('filter_tajweeds.0')
        ? <img className="h-7 aspect-square" src="images/filter-inactive-icon.svg" alt="Unfiltered" />
        : <img className="h-7 aspect-square" src="images/filter-active-icon.svg" alt="Filtered" />
      }
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 scale-90 -translate-y-1/3"
      enterTo="transform opacity-100 scale-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="transform opacity-100 scale-100 translate-y-0"
      leaveTo="transform opacity-0 scale-90 -translate-y-1/3"
    >
      <Menu.Items className={"absolute -right-1 mt-2 w-max px-2 py-1 origin-top-right grid grid-flow-row gap-1 items-center bg-green-100 dark:bg-gray-800 text-sm text-center shadow-lg dark:shadow-md dark:shadow-white/50 rounded-lg overflow-hidden"}>
        {en.filter_tajweeds.map((_, index) => (
          <Menu.Item
            key={index}
            as={"span"}
            className={"text-green-900 dark:text-white bg-green-100 dark:bg-gray-800 hover:text-white dark:hover:text-green-900 hover:bg-green-800 dark:hover:bg-gray-50 hover:underline p-2 duration-200 cursor-pointer rounded-md animate__animated animate__fadeInRight animate__faster"}
            onClick={() => filterItems(t(`filter_tajweeds.${index}`))}
          >
            {t(`filter_tajweeds.${index}`)}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
)

export default ListFilter
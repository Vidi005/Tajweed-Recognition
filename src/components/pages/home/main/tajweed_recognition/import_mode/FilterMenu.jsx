import { Menu, Transition } from "@headlessui/react"
import React, { Fragment } from "react"
import en from "../../../../../../locales/en.json"
import { withTranslation } from "react-i18next"

const FilterMenu = ({ t, filterImage }) => (
  <Menu as={"menu"} className={"filter-btn relative"}>
    <Menu.Button className={"inline-flex flex-col w-full group items-center justify-center p-2 hover:bg-green-700 dark:hover:bg-green-600 active:bg-green-800 dark:active:bg-green-700 duration-200 rounded-md"}>
      <img className="dark:hidden h-7 duration-200" src="images/change-color-icon.svg" alt="Filter Icon" />
      <img className="hidden dark:block h-7 duration-200" src="images/change-color-icon-dark.svg" alt="Filter Icon" />
      <p className="text-sm text-green-900 dark:text-white">Change Color</p>
    </Menu.Button>
    <Transition
      as={Fragment}
      enter="transition ease-out duration-300"
      enterFrom="transform opacity-0 scale-95 translate-y-1/4"
      enterTo="transform opacity-100 scale-100 translate-y-0"
      leave="transition ease-in duration-200"
      leaveFrom="transform opacity-100 scale-100 translate-y-0"
      leaveTo="transform opacity-0 scale-95 translate-y-1/4"
    >
      <Menu.Items className={"absolute left-1 w-max p-1 origin-bottom-left divide-y divide-white rounded-md bg-black/25 backdrop-blur-sm shadow-inner text-base"}>
        {en.color_changer.map((color, index) => (
          <Menu.Item as={"span"} key={index} className={"bg-black/25 hover:bg-black/50 cursor-pointer px-4 py-2 duration-200 animate__animated animate__fadeInBottomLeft animate__faster"} onClick={() => filterImage(color)}>
            {t(`color_changer.${index}`)}
          </Menu.Item>
        ))}
      </Menu.Items>
    </Transition>
  </Menu>
)

export default withTranslation()(FilterMenu)
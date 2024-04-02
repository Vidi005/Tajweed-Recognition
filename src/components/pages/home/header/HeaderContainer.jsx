import { Menu, Switch, Transition } from "@headlessui/react"
import React, { Fragment } from "react"

const HeaderContainer = ({ headerTitle, changeLanguage, setDisplayMode, isDarkMode }) => (
  <header className="app-header sticky top-0 flex flex-nowrap items-center justify-between bg-green-800 w-full p-1 shadow-xl z-10">
    <section className="header-title grow flex items-center p-1">
      <h2 className="grow font-ramadhan-start text-white">{headerTitle}</h2>
    </section>
    <section className="w-fit flex items-center pl-1">
      <Switch
        checked={isDarkMode}
        onChange={setDisplayMode}
        className={`${
          isDarkMode
            ? "bg-green-900"
            : "bg-green-700"
        } relative inline-flex h-6 w-12 px-1 items-center cursor-pointer transition-colors duration-300 focus:outline-none focus:ring-1 focus:ring-white focus:ring-offset-1 rounded-full`}
      >
        <span className="sr-only">Enable Dark Mode</span>
        <span className={`${isDarkMode ? "translate-x-6" : "translate-x-0"} inline-block h-4 w-4 transform rounded-full bg-white transition duration-300`}></span>
      </Switch>
      <Menu as={"menu"} className={"inline-block h-10 pl-2"}>
        <Menu.Button className={"inline-flex w-full items-center justify-center h-full p-2 hover:bg-black/50 focus-visible:ring-2 focus-visible:ring-white/75 duration-200 rounded-md"}>
          <img className="h-full object-contain" src="images/lang-icon.svg" alt="Languages" />
          <img className="h-full object-contain" src="images/expand-icon.svg" alt="Expand" />
        </Menu.Button>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95 -translate-y-1/2"
          enterTo="transform opacity-100 scale-100 translate-y-0"
          leave="transition ease-in duration-200"
          leaveFrom="transform opacity-100 scale-100 translate-y-0"
          leaveTo="transform opacity-0 scale-95 -translate-y-1/2"
        >
          <Menu.Items className="absolute grid grid-flow-row gap-1 right-1 mt-2 w-40 origin-top-right divide-y divide-green-100 rounded-lg bg-green-800 shadow-lg ring-1 ring-green-100 ring-opacity-5 focus:outline-none text-base z-20 overflow-hidden">
            <Menu.Item as={"span"} className={"text-white hover:bg-green-300 hover:text-green-900 cursor-pointer p-2 duration-200 rounded-md animate__animated animate__fadeInRight animate__faster"} onClick={() => changeLanguage("en")}>English</Menu.Item>
            <Menu.Item as={"span"} className={"text-white hover:bg-green-300 hover:text-green-900 cursor-pointer p-2 duration-200 rounded-md animate__animated animate__fadeInRight animate__faster"} onClick={() => changeLanguage("id")}>Indonesian</Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </section>
  </header>
)

export default HeaderContainer
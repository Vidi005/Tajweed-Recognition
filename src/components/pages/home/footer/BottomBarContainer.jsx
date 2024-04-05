import { Tab } from "@headlessui/react"
import React from "react"
import en from "../../../../locales/en.json"
import { Link } from "react-router-dom"

const BottomBarContainer = ({ t }) => (
  <Tab.List as="footer" className="app-footer sticky bottom-0 grid grid-cols-2 bg-green-50 dark:bg-gray-800 font-medium text-base shadow-inner">
    {en.tab_list.map((tab, index) => (
      <Tab
        key={tab.tab_name}
        as={Link}
        to={tab.tab_path}
        className={({ selected }) => 
          selected
            ? "bg-green-800 dark:bg-green-700 text-white outline-none duration-200"
            : "bg-none text-green-900 dark:text-gray-200 outline-none duration-200"
        }
      >
        {({ selected }) => (
          <span className="flex flex-col items-center justify-center p-1 cursor-pointer">
            <img className={`dark:hidden h-8 ${selected ? "animate__animated animate__flipInX" : ""}`} src={selected ? en.tab_icons_dark[index] : en.tab_icons[index]} alt={selected ? "Active Icon" : "Inactive Icon"} />
            <img className={`hidden dark:block h-8 ${selected ? "animate__animated animate__flipInX" : ""}`} src={en.tab_icons_dark[index]} alt="Icon" />
            <p className="text-sm">{t(`tab_list.${index}.tab_name`)}</p>
          </span>
        )}
      </Tab>
    ))}
  </Tab.List>
)

export default BottomBarContainer
import React from "react"
import SidebarContainer from "./SidebarContainer"
import { Link, Outlet } from "react-router-dom"
import { tajweedLaws } from "../../../../../utils/data"

const LargeDisplayList = ({ t, searchItems, getFilteredTajweeds }) => (
  <React.Fragment>
    <SidebarContainer
      t={t}
      searchItems={searchItems}
      getFilteredTajweeds={getFilteredTajweeds} />
    {
      location.toString().includes('/detail') 
      ? <Outlet/>
      : (
        <article className="tajweed-desc hidden lg:flex flex-col items-center justify-between max-h-full w-3/4 px-16 text-xl bg-green-100 text-green-900 text-justify dark:bg-gray-800 dark:text-white duration-200 overflow-y-auto">
            <br />
            <h2>{t('tajweed_desc')}</h2>
            <p>{t('tajweed_content_desc')}</p>
            <br />
            <a href={`/tajweed-list${tajweedLaws().sort((a, b) => a.id - b.id)[0].detailPage}`}>
              <button className="border border-green-900 dark:border-white bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-600 active:bg-green-500 px-4 py-3 text-white duration-200 rounded-lg shadow-md dark:shadow-white/50">{t('learn_tajweed')}</button>
            </a>
            <br />
          </article>
        )
    }
  </React.Fragment>
)

export default LargeDisplayList
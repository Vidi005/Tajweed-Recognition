import React from "react"
import SidebarContainer from "./SidebarContainer"
import { Outlet } from "react-router-dom"
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
            <article className="tajweed-desc hidden relative lg:flex flex-col items-center justify-between max-h-full w-3/4 px-16 text-xl bg-green-100 text-green-900 text-justify dark:bg-gray-800 dark:text-white duration-200 overflow-x-hidden overflow-y-auto">
              <div className="fixed dark:hidden bottom-0 right-4 md:w-1/3 w-3/5">
                <img className="w-full origin-bottom-right object-contain opacity-25 animate__animated animate__slideInUp" src={`${import.meta.env.BASE_URL}images/detail-tajweed-picture.svg`} alt="Background Image" />
                <span className="absolute w-full h-full inset-0 bg-gradient-to-br from-green-50"></span>
              </div>
              <div className="fixed hidden dark:block bottom-0 right-4 md:w-1/3 w-3/5">
                <img className="w-full origin-bottom-right object-contain opacity-25 animate__animated animate__slideInUp" src={`${import.meta.env.BASE_URL}images/detail-tajweed-picture-dark.svg`} alt="Background Image" />
                <span className="absolute w-full h-full inset-0 bg-gradient-to-br from-gray-800"></span>
              </div>
              <h5 className="absolute px-8 py-0.5 bg-blue-500 text-center text-white top-0 right-0 translate-x-1/4 translate-y-1/2 rotate-45 duration-200 shadow-md dark:shadow-white/50 z-10">Preview</h5>
              <br />
              <h2 className="z-10">{t('tajweed_desc')}</h2>
              <p className="z-10">{t('tajweed_content_desc')}</p>
              <br />
              <a className="z-10" href={`/tajweed-list${tajweedLaws().sort((a, b) => a.id - b.id)[0].detailPage}`}>
                <button className="border border-green-900 dark:border-white bg-green-800 hover:bg-green-900 dark:bg-green-700 dark:hover:bg-green-600 active:bg-green-500 px-4 py-3 text-white duration-200 rounded-lg shadow-md dark:shadow-white/50">{t('learn_tajweed')}</button>
              </a>
              <br />
            </article>
          )
    }
  </React.Fragment>
)

export default LargeDisplayList
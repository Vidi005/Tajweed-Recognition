import React from "react"
import { getDetailTajweed, tajweedLaws } from "../../../../utils/data"
import en from "../../../../locales/en.json"
import FooterContainer from "../footer/FooterContainer"

const MainContainer = ({ t }) => {
  const findTajweedLaw = () => {
    const getDetailPage = tajweedLaws().find(tajweedLaw => `${tajweedLaw.detailPage}` === `${getDetailTajweed()}`)
    if (getDetailPage !== undefined) {
      const getLocaleIndex = en.tajweed_laws.findIndex(tajweedLaw => tajweedLaw.page === getDetailPage.detailPage)
      const examplesArray = en.tajweed_laws[getLocaleIndex].examples.map((_, index) => t(`tajweed_laws.${getLocaleIndex}.examples.${index}`))
      const foundTajweedLaw = {
        id: t(`tajweed_laws.${getLocaleIndex}.id`),
        name: t(`tajweed_laws.${getLocaleIndex}.name`),
        group: t(`tajweed_laws.${getLocaleIndex}.group`),
        category: t(`tajweed_laws.${getLocaleIndex}.category`),
        summary: t(`tajweed_laws.${getLocaleIndex}.summary`),
        detail: t(`tajweed_laws.${getLocaleIndex}.detail`),
        examples: examplesArray
      }
      return foundTajweedLaw
    } else {
      return ''
    }
  }
  if (findTajweedLaw() === '') {
    return (
      <main className="no-tajweed-found grid items-center justify-center grow w-full font-black text-xl bg-green-100 text-green-900 dark:bg-gray-800 dark:text-white">{t('no_tajweed_found')}</main>
    )
  } else {
    return (
      <React.Fragment>
        <main className="detail-tajweed-main lg:hidden grow w-full bg-green-100 dark:bg-gray-800 p-2 overflow-y-auto">
          <h1 className="border-b-4 border-double border-b-green-800 dark:border-b-white p-2 text-green-900 dark:text-white"><strong>{findTajweedLaw().name}</strong></h1>
          <ul className="flex flex-wrap items-center my-4 list-none text-sm md:text-base">
            <li className="border border-green-900 dark:border-white mr-4 bg-green-800 dark:bg-gray-500 px-2 py-1 text-white rounded-md shadow dark:shadow-white/50">{findTajweedLaw().category}</li>
            <li className="border border-green-900 dark:border-white bg-green-800 dark:bg-gray-500 px-2 py-1 text-white rounded-md shadow dark:shadow-white/50">{findTajweedLaw().group}</li>
          </ul>
          <article className="p-1 text-justify text-green-900 dark:text-gray-50">{findTajweedLaw().summary}</article>
          <article className="p-1 text-justify text-green-800 dark:text-gray-100">{findTajweedLaw().detail}</article>
          <article className="border-t border-t-green-700 dark:border-t-gray-200 p-2 text-green-700 dark:text-gray-200">
            <h4>{t('examples')}</h4>
            <table className="table-auto">
              <tbody>
                {findTajweedLaw().examples.map((example, idx) => (
                  <tr key={idx}>
                    <td className="pr-2 align-top">•</td>
                    <td>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <FooterContainer t={t}/>
        </main>
      </React.Fragment>
    )
  }
}

export default MainContainer
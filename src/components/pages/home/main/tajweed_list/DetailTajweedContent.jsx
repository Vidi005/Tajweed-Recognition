import React from "react"
import { findNextTajweedLaw, findPreviousTajweedLaw, getDetailTajweed, tajweedLaws } from "../../../../../utils/data"
import en from "../../../../../locales/en.json"
import { Link } from "react-router-dom"
import FooterContainer from "../../../detail/footer/FooterContainer"

const DetailTajweedContent = ({ t }) => {
  const findCurrentTajweedLaw = () => {
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
  if (findCurrentTajweedLaw() === '') {
    return (
      <article className="no-tajweed-found hidden lg:grid items-center justify-center max-h-full w-3/4 font-black text-xl bg-green-50 text-green-900 dark:bg-gray-800 dark:text-white duration-200">{t('no_tajweed_found')}</article>
    )
  } else {
    return (
      <article className="detail-tajweed-content hidden lg:inline-flex flex-col justify-between max-h-full w-3/4 bg-green-50 dark:bg-gray-800 p-2 duration-200 overflow-y-auto">
        <section>
          <h1 className="border-b-4 border-double border-b-green-800 dark:border-b-white p-2 text-green-900 dark:text-white"><strong>{findCurrentTajweedLaw().name}</strong></h1>
          <ul className="flex flex-wrap items-center my-4 list-none text-sm md:text-base">
            <li className="border border-green-900 dark:border-white mr-4 bg-green-800 dark:bg-gray-500 px-2 py-1 text-white rounded-md shadow dark:shadow-white/50">{findCurrentTajweedLaw().category}</li>
            <li className="border border-green-900 dark:border-white bg-green-800 dark:bg-gray-500 px-2 py-1 text-white rounded-md shadow dark:shadow-white/50">{findCurrentTajweedLaw().group}</li>
          </ul>
          <article className="p-1 text-justify text-green-900 dark:text-gray-50">{findCurrentTajweedLaw().summary}</article>
          <article className="p-1 text-justify text-green-800 dark:text-gray-100">{findCurrentTajweedLaw().detail}</article>
          <article className="border-t border-t-green-700 dark:border-t-gray-200 p-2 text-green-700 dark:text-gray-200">
            <h4>{t('examples')}</h4>
            <table className="table-auto">
              <tbody>
                {findCurrentTajweedLaw().examples.map((example, idx) => (
                  <tr key={idx}>
                    <td className="pr-2 align-top">•</td>
                    <td>{example}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>
          <FooterContainer t={t} />
        </section>
        <section className="grid grid-cols-3 items-center justify-between w-full p-2 gap-2">
          {findPreviousTajweedLaw() ? (
            <a href={`/tajweed-list${findPreviousTajweedLaw().prevPage}`}>
              <button className="flex items-center border border-green-900 dark:border-white hover:bg-green-800/25 dark:hover:bg-gray-100/25 px-4 py-2 text-green-900 hover:text-green-700 dark:text-white dark:hover:text-gray-200 hover:underline rounded-lg shadow-lg dark:shadow-white/50 duration-300">
                <img className="max-h-8 mr-2 invert dark:invert-0" src={`${import.meta.env.BASE_URL}images/backward-icon.svg`} alt="Prev Page" />
                <h4 className="font-normal">{findPreviousTajweedLaw().prevName}</h4>
              </button>
            </a>
          ): <button disabled></button>}
          <h4 className="text-green-900 dark:text-white text-center">{findCurrentTajweedLaw().name}</h4>
          {findNextTajweedLaw() ? (
            <a href={`/tajweed-list${findNextTajweedLaw().nextPage}`}>
              <button className="flex items-center ml-auto border border-green-900 dark:border-white hover:bg-green-800/25 dark:hover:bg-gray-100/25 px-4 py-2 text-green-900 hover:text-green-700 dark:text-white dark:hover:text-gray-200 hover:underline rounded-lg shadow-lg dark:shadow-white/50 duration-300">
                <h4 className="font-normal">{findNextTajweedLaw().nextName}</h4>
                <img className="max-h-8 ml-2 invert dark:invert-0 scale-[-1]" src={`${import.meta.env.BASE_URL}images/backward-icon.svg`} alt="Next Page" />
              </button>
            </a>
          ): <button disabled></button>}
        </section>
      </article>
    )
  }
}

export default DetailTajweedContent
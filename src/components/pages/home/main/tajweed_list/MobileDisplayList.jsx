import React from "react"
import { withTranslation } from "react-i18next"
import TajweedItemContent from "./TajweedItemContent"

const MobileDisplayList = ({ t, getFilteredTajweeds }) => getFilteredTajweeds?.length > 0
  ? (
    <article className="nav-product-list__content min-h-full lg:hidden">
      {getFilteredTajweeds.map((tajweedLaw, index) => (
        <TajweedItemContent
          key={index}
          t={t}
          index={index}
          id={tajweedLaw.id}
          name={tajweedLaw.name}
          group={tajweedLaw.group}
          category={tajweedLaw.category}
          page={tajweedLaw.page}
        />
      ))}
    </article>
    )
  : (
    <article className="nav-product-list__content min-h-full lg:hidden font-bold text-center text-green-900 dark:text-white dark:bg-gray-900">
      <p className="border border-green-800 dark:border-gray-300 m-1 p-4 bg-green-50 dark:bg-gray-800 rounded-lg">{t('empty_list')}</p>
    </article>
    )

export default withTranslation()(MobileDisplayList)
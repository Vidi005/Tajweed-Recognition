import React from "react"
import { tajweedLaws } from "../../../../../utils/data"
import { Link } from "react-router-dom"
import { withTranslation } from "react-i18next"

const TajweedItemContent = ({ t, index, id, name, group, category, page }) => index % 2 === 0
  ? (
    <Link to={page}>
      <li className="content__tajweed-item relative list-none leading-normal m-2 p-1 bg-green-200 dark:bg-gray-700 text-green-900 dark:text-white rounded-lg duration-300 shadow dark:shadow-white active:bg-green-800/30 dark:active:bg-green-700 cursor-pointer overflow-hidden">
        <h3 className="p-1 leading-tight"><strong>{name}</strong></h3>
        <p className="p-1 leading-tight">{t('group')}: {group}</p>
        <p className="p-1 leading-tight">{t('category')}: {category}</p>
        <span className="tag-item absolute top-0 right-0 h-1/4 w-1/12 aspect-square" style={{ backgroundColor: `${tajweedLaws().find(tajweedLaw => tajweedLaw.id === id)?.color}` }}></span>
      </li>
    </Link>
    )
  : (
    <Link to={page}>
      <li className="content__tajweed-item relative list-none leading-normal m-2 p-1 bg-green-50 dark:bg-black text-green-900 dark:text-white rounded-lg duration-300 shadow dark:shadow-white/75 active:bg-green-200/50 dark:active:bg-green-700 cursor-pointer overflow-hidden">
        <h3 className="p-1 leading-tight"><strong>{name}</strong></h3>
        <p className="p-1 leading-tight">{t('group')}: {group}</p>
        <p className="p-1 leading-tight">{t('category')}: {category}</p>
        <span className="tag-item absolute top-0 right-0 h-1/4 w-1/12 aspect-square" style={{ backgroundColor: `${tajweedLaws().find(tajweedLaw => tajweedLaw.id === id)?.color}` }}></span>
      </li>
    </Link>
    )

export default withTranslation()(TajweedItemContent)
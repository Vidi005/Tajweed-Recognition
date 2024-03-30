import React from "react"
import { sources } from "../../../../utils/data"
import { withTranslation } from "react-i18next"

const FooterContainer = ({ t }) => (
  <footer className="p-2">
    <h4 className="my-2 text-green-700 dark:text-gray-200">{t('sources')}</h4>
    <ul className="grid grid-flow-row gap-2">
    {sources.map((source, idx) =>
      (
        <li key={idx}>
          <a href={source} className="flex items-center text-sm md:text-base  text-blue-700 dark:text-blue-300 hover:text-blue-900 dark:hover:text-blue-50 active:text-violet-700 break-all">{source}</a>
        </li>
      ))}
    </ul>
  </footer>
)

export default withTranslation()(FooterContainer)
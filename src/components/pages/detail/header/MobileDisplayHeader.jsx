import React from "react"
import { Link } from "react-router-dom"

const MobileDisplayHeader = ({ t }) => (
  <header className="detail-page__header lg:hidden sticky top-0 flex items-center w-full bg-green-800 text-white shadow-xl">
    <Link to={"/tajweed-list"}>
      <img className="m-1.5 p-1 h-10 aspect-square" src={`${import.meta.env.BASE_URL}images/backward-icon.svg`} alt="Previous Page" />
    </Link>
    <h2>{t('detail_page_title')}</h2>
  </header>
)

export default MobileDisplayHeader
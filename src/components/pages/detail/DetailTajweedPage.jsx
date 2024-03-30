import React from 'react'
import { Helmet } from 'react-helmet'
import HeaderContainer from './header/HeaderContainer'
import MainContainer from './main/MainContainer'

const DetailTajweedPage = ({ t }) => (
  <div className="detail-page h-screen w-full bg-green-100 dark:bg-black overflow-hidden">
    <div className="flex flex-col max-h-screen h-full animate__animated animate__fadeInRight animate__faster">
      <Helmet>
        <title>{t('detail_page_title')}</title>
        <meta name="keywords" content="Detail Tajweed" />
        <meta name="description" content="Detail Tajweed Descriptions."/>
        <link rel="canonical" href="https://tajweed-recognition.vercel.app/detail"/>
      </Helmet>
      <HeaderContainer t={t}/>
      <MainContainer t={t}/>
    </div>
  </div>
)

export default DetailTajweedPage
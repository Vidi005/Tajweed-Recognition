import React from 'react'
import { Helmet } from 'react-helmet'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/HomePage'
import NoPage from './pages/empty/NoPage'
import i18n from '../utils/localization'
import DetailTajweedPage from './pages/detail/DetailTajweedPage'

const App = () => (
  <React.Fragment>
    <Helmet>
      <title className="font-ramadhan-start">{i18n.t('app_name')}</title>
      <meta name="description" content={i18n.t('app_description')} />
      <meta name="google-site-verification" content="ThFmvf3VSJhWEhuU_8zz0txPahlU9ErT4z4ixbyUJn8" />
      <link rel="canonical" href="https://tajweed-recognition.vercel.app" />
    </Helmet>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/detail' element={<DetailTajweedPage t={i18n.t}/>}/>
      <Route path='*' element={<NoPage t={i18n.t}/>}/>
    </Routes>
  </React.Fragment>
)

export default App

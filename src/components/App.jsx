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
      <title>Tajweed Recognition</title>
    </Helmet>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/detail-tajweed' element={<DetailTajweedPage t={i18n.t}/>}/>
      <Route path='*' element={<NoPage t={i18n.t}/>}/>
    </Routes>
  </React.Fragment>
)

export default App

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import PeopleListFnc from './pages/PeopleList'
import PeopleDetailFnc from './pages/PeopleDetail'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' exact element={<PeopleListFnc />} />
      <Route path='/people/:id' element={<PeopleDetailFnc />} />
    </Routes>
  </BrowserRouter>
)

import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import HomePage from './components/HomePage/Homepage'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        
        <Route path='/register' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<HomePage />}/>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
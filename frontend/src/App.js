import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'

import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import HomePage from './components/HomePage/Homepage'
import RoleSelection from './components/Roleselection/RoleSelection'
import Clientdashboard from './components/Clientdashboard/Clientdashboard'
import JobSeekerDashboard from './components/JobSeekerDashboard/JobSeekerDashboard'
import Layout from './Layout/Footer/Layout'

function App() {

  return (
    <BrowserRouter>
    
      <Routes>

       { <Route path="/roleselection" element={< RoleSelection/>} /> }
        <Route path='/register' element={<Signup/>}/>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<HomePage />}/>
        <Route path='/login' element={<Login/>}/>
        <Route path="/client-dashboard" element={<Clientdashboard />} />
        <Route path="/freelancer-dashboard" element={<JobSeekerDashboard />} />
        
      </Routes>
   
    </BrowserRouter>
  )
}

export default App
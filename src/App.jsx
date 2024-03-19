import React from 'react'
import { Link,Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Contact from './pages/Contact'
import About from './pages/About'
export default function App() {
  return (
    <div className='w-screen min-h-screen bg-richblack-900 flex-col flex font-inter'  >
       <Routes>
         <Route path='/' element={<Home></Home>}></Route>
         <Route path='/contact' element={<Contact/>}></Route>
         <Route path='/about' element={<About/>}></Route>
         <Route path='/signup' element={<Signup/>}></Route>
         <Route path='/login' element={<Login/>}></Route>
       </Routes>
    </div>
  )
}

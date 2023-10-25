import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../Pages/Home/Home'
import Details from '../Pages/Details/Details'
import Template from '../Pages/Template/Template'

const AllRoutes = () => {
  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/details/*' element={<Details/>} />
            <Route path='/details/resumes' element={<Template/>}/>
        </Routes>
    </div>
  )
}

export default AllRoutes

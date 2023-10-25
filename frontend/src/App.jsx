import { useState } from 'react'
import Home from './Pages/Home/Home'
import { Box } from '@chakra-ui/react'
import Navbar from './Components/Navbar'
import AllRoutes from './Components/AllRoutes'
import { useLocation } from 'react-router-dom'

function App() {
  const location=useLocation()

  return (
    <>
    <Box display={location.pathname=="/details/resumes"?"none":"block"} position={"fixed"} w={"100%"} zIndex={2}>
      <Navbar/>
    </Box>
    <Box display={location.pathname=="/details/resumes"?"none":"block"} pt={"80px"}></Box>
    <Box w={{xl:"80%",lg:"80%",md:"85%",sm:"90%",base:"90%"}} m={"auto"}>
     <AllRoutes/>
    </Box>
    </>
  )
}

export default App

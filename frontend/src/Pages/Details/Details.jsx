import { Box, Heading } from '@chakra-ui/react'
import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Personal from './Personal'
import Education from './Education'
import Experience from './Experience'
import Projects from './Projects'
import Skills from './Skills'

const Details = () => {
  return (
    <div>
      <Box>
        <Heading textAlign={"center"}>Input Your Information</Heading>
        <br />
        <Box borderTop={"5px solid #aa00ff"}
        borderRadius={"10px"}
        boxShadow={"rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px"} p={"20px"}
        >
        <Routes>
            <Route path='/' element={<Personal/>}/>
            <Route path='/education' element={<Education/>}/>
            <Route path='/experience' element={<Experience/>}/>
            <Route path='/project' element={<Projects/>}/>
            <Route path='/skills' element={<Skills/>}/>
        </Routes>
        </Box>
      </Box>
      <br />
      <br />
    </div>
  )
}

export default Details

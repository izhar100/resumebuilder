import { Box, Button, Heading } from '@chakra-ui/react'
import React, { useState } from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import Resume from './Resume'

const Template = () => {
  return (
    <div>
      <Box>
      <Resume/>
      </Box>
    </div>
  )
}

export default Template

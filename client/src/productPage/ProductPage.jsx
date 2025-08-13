import React from 'react'

import Box from '@mui/material/Box'
import TopView from './TopView'
import RoomsDetails from './RoomsDeatails'
import CommonAminities from './CommonAminities'

const ProductPage = () => {
  return (
    <>
    <Box sx={{padding:"40px",bgcolor:"#0D0D0D"}}>
       <TopView/>
    </Box>

    <Box sx={{backgroundColor:"#525252"}}>
        <Box >
          <RoomsDetails/>
        </Box>

        <Box sx={{padding:"40px"}}>
           <CommonAminities/>
        </Box>
    </Box>
    {/* single room detail */}
    
    </>
  )
}

export default ProductPage
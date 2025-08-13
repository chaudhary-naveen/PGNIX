import Card from '@mui/material/Card'
import React from 'react'
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import ShieldIcon from '@mui/icons-material/Shield';
import WifiIcon from '@mui/icons-material/Wifi';
import SoapIcon from '@mui/icons-material/Soap';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

const data = [
    {
        name:"Laundry",
        icon:<LocalLaundryServiceIcon/>
    },
    {
        name:"wifi",
        icon:<WifiIcon/>
    },
    {
        name:"cleaning",
        icon:<SoapIcon/>
    },
    {
        name:"cooking",
        icon:<OutdoorGrillIcon/>
    }
]
const CommonAminities = () => {
  return (
    <>
    <div className='container' style={{outline:"1px solid gray",borderRadius:"10px",padding:"20px",color:"white",backgroundColor:"#242424"}}>
        <h4>Commom Amenities</h4>

        <Stack direction="row" spacing={1} sx={{display:"flex"}}>
            {
                data.map((amenity)=>{
                return <Chip label={amenity.name} variant="outlined" sx={{color:'black',bgcolor:"#ADADAD"}} />
                  
            })
            }

        </Stack>

    </div>
    </>
  )
}

export default CommonAminities
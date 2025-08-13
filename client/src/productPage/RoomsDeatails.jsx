import React from 'react'
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
const Rooms = [
  {
    title:"Single Room Details",
    para: "Rent For Single Occupancy",
    cost: "30000/M",
    security_money:"10000"
  },
  {
    title:"Double Room Details",
    para: "Rent For Double Occupancy",
    cost: "15000/M",
    security_money:"10000"
  },
  {
    title:"Triple Room Details",
    para: "Rent For Triple Occupancy",
    cost: "10000/M",
    security_money:"10000"
  }
]

const RoomsDetails = () => {
  return (
    <Box className='container' sx={{paddingTop:"70px"}} >
    {
      Rooms.map((room)=>{
        return <Box className="row" sx={{paddingTop:"20px",paddingBottom:"20px"}}>
          <div className="col">
            <Card sx={{padding:"20px"}} elevation={2}>
          {/* heading */}
          <Box sx={{fontSize:"2rem", fontWeight:700}}>
            <p>{room.title}</p>
          </Box>
          <Box  sx={{display:"flex",justifyContent:'space-between',width:"100%" , alignItems:"center"}}>
            <div style={{opacity:0.4}}>{room.para}</div>
            <div>₹{room.cost}</div>
            <Box sx={{display:"flex",justifyContent:"space-between", width:"40%"}}>
              <p>Security Deposit</p>
              <p>₹{room.security_money}</p>
            </Box>
          </Box>
        </Card>
          </div>
        </Box>
      })
    }
    
    </Box>
      

  )
}

export default RoomsDetails
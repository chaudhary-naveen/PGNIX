import React from 'react'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PersonIcon from '@mui/icons-material/Person';
import CarRepairIcon from '@mui/icons-material/CarRepair';
import FoodBankIcon from '@mui/icons-material/FoodBank';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const description = [
  {
    title: "Preferred Tenant",
    desc: "Bachelors",
    logo: <PersonIcon fontSize="large" />
  },
  {
    title: "Parking",
    desc: "Car and Bike",
    logo: <CarRepairIcon fontSize="large" />
  },
  {
    title: "All Meals",
    desc: "Food Facility",
    logo: <FoodBankIcon fontSize="large" />
  },
  {
    title: "Full AC rooms",
    desc: "24 hr electricity",
    logo: <ElectricBoltIcon fontSize="large" />
  }
]

const TopviewDesc = () => {
  return (
    <Card sx={{ minWidth: 275, padding: 2,backgroundColor:"#C4C4C4"}} elevation={2}>
      <CardContent>
        <Typography gutterBottom sx={{ fontSize:"2rem", textAlign:"center", mb: 3 ,fontWeight:700}}>
          PG Description
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 ,overflowY:"scroll"}}>
          {description.map((item, index) => (
            <Card key={index} variant="outlined" sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
            
              <Box>
                <Typography variant="h6">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.desc}
                </Typography>
              </Box>
            </Card>
          ))}
        </Box>
      </CardContent>
    </Card>
  )
}

export default TopviewDesc;

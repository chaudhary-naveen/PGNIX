import React, { useEffect , useState} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TopView from './TopView';
import RoomsDetails from './RoomsDeatails';
import CommonAminities from './CommonAminities';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';
import axios from 'axios';
import path from './../path';
import { useSearchParams } from 'react-router-dom';

const ProductPage = () => {
  const [searchParams] = useSearchParams(); 
  const property_id = searchParams.get('id');
  
  const [data,setData] = useState({});
  const theme = useTheme();

  const getPropertyData = async ()=>{
    try{
      const response = await axios.get(`${path}/api/v1/pg/${property_id}`);
      if(response.status == 200){
          setData(response.data.property)
      }
    }catch(err){
      console.log(err);
    }
  };

  // useEffect(()=>{
  //   console.log(data);
  // },[data]);

  useEffect(()=>{
    getPropertyData();
  },[property_id]);
  
  return (
    <>
      {/* Page Heading */}
      <Box
        sx={{
          padding: '40px',
          bgcolor: theme.palette.background.default,
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h4"
          sx={{
            color: "white",
            fontWeight: 600,
            fontFamily: theme.typography.fontFamily,
            mb: 0,
          }}
        >
          {data ? data.propertyName : "Loading..."}
        </Typography>

        <Typography
          variant="h7"
          sx={{
            color: "white",
            fontWeight: 200,
            fontFamily: theme.typography.fontFamily,
            mb: 5,
          }}
        >
          {data ? data.location : "Loading..."}
        </Typography>

        <TopView data={data} />
      </Box>

      {/* Details Section */}
      <Box sx={{ backgroundColor: theme.palette.background.paper }}>
        <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontFamily: theme.typography.fontFamily,
            p: 4,
          }}
        >
          More Information
        </Typography>

        <Box sx={{ padding: '40px' }}>
          <CommonAminities />
        </Box>

        <Divider
          sx={{
            width: "100%", // set your custom width
            borderColor: "#E0E1DD", // theme secondary.main
            borderWidth: "1.5px",
            borderRadius: "2px",
            opacity: 0.6
          }}
        />
         <Typography
          variant="h5"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontFamily: theme.typography.fontFamily,
            p: 4,
          }}
        >
          Book PG Rooms or Schedule a Visit
        </Typography>
        <Box>
          <RoomsDetails />
        </Box>
      </Box>
    </>
  );
};

export default ProductPage;

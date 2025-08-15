import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TopView from './TopView';
import RoomsDetails from './RoomsDeatails';
import CommonAminities from './CommonAminities';
import { useTheme } from '@mui/material/styles';
import Divider from '@mui/material/Divider';

const ProductPage = () => {
  const theme = useTheme();

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
            color: theme.palette.primary.main,
            fontWeight: 600,
            fontFamily: theme.typography.fontFamily,
            mb: 4,
          }}
        >
          GENZ Premium PG - Sector 62, Noida
        </Typography>
        <TopView />
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

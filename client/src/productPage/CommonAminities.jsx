import Card from '@mui/material/Card';
import React from 'react';
import LocalLaundryServiceIcon from '@mui/icons-material/LocalLaundryService';
import WifiIcon from '@mui/icons-material/Wifi';
import SoapIcon from '@mui/icons-material/Soap';
import OutdoorGrillIcon from '@mui/icons-material/OutdoorGrill';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const data = [
  { name: 'Laundry', icon: <LocalLaundryServiceIcon sx={{ color: 'black' }} /> },
  { name: 'Wi-Fi', icon: <WifiIcon sx={{ color: 'black' }} /> },
  { name: 'Cleaning', icon: <SoapIcon sx={{ color: 'black' }} /> },
  { name: 'Cooking', icon: <OutdoorGrillIcon sx={{ color: 'black' }} /> },
];

const CommonAminities = () => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: '10px',
        padding: '20px',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.secondary.main,
        boxShadow: 2,
      }}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
          mb: 2,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        Common Amenities
      </Typography>

      {/* Amenities list */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {data.map((amenity) => (
          <Chip
            key={amenity.name}
            label={amenity.name}
            icon={amenity.icon}
            sx={{
              color: 'black',
              backgroundColor: theme.palette.primary.main,
              fontWeight: 500,
              '&:hover': {
                backgroundColor: '#32465C', // slightly darker primary
              },
            }}
          />
        ))}
      </Stack>
    </Card>
  );
};

export default CommonAminities;

import Card from '@mui/material/Card';
import React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

const CommonAminities = ({ data }) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        borderRadius: '14px',
        padding: '20px',
        border:"1px solid white",
        background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
        boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
          transform: 'translateY(-2px)',
        },
      }}
      elevation={0}
    >
      {/* Heading */}
      <Typography
        variant="h6"
        sx={{
          fontWeight: 700,
          mb: 2,
          color: theme.palette.text.primary,
          fontFamily: theme.typography.fontFamily,
        }}
      >
        Common Amenities
      </Typography>

      {/* Amenities list */}
      <Stack direction="row" spacing={1} flexWrap="wrap">
        {data?.map((amenity) => (
          <Chip
            key={amenity}
            label={amenity}
            variant="outlined"
            sx={{
              backgroundColor: '#f8f9fa',
              fontWeight: 500,
              fontSize: '0.8rem',
              borderRadius: '8px',
              color:"#0D1B2A",
              borderColor: '#e0e0e0',
              // color: theme.palette.text.primary,
              '&:hover': { backgroundColor: '#eceff1' },
            }}
          />
        ))}
      </Stack>
    </Card>
  );
};

export default CommonAminities;

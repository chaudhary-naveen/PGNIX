import React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';

const Rooms = [
  {
    title: 'Single Room Details',
    para: 'Rent For Single Occupancy',
    cost: '30000/M',
    security_money: '10000',
    amenities: ['WiFi', 'Air Conditioner', 'Geyser'],
  },
  {
    title: 'Double Room Details',
    para: 'Rent For Double Occupancy',
    cost: '15000/M',
    security_money: '10000',
    amenities: ['Balcony', 'Parking', 'Laundry'],
  },
  {
    title: 'Triple Room Details',
    para: 'Rent For Triple Occupancy',
    cost: '10000/M',
    security_money: '10000',
    amenities: ['TV', 'Common Kitchen', 'RO Water'],
  },
];

const RoomsDetails = () => {
  const theme = useTheme();

  return (
    <Box className="container" sx={{ paddingTop: '20px' }}>
      <Box className="row" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {Rooms.map((room, index) => (
          <Box
            key={index}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' }, // 2 per row on sm+
              display: 'flex',
            }}
          >
            <Card
              sx={{
                flexGrow: 1,
                padding: '20px',
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.primary.main,
              }}
              elevation={2}
            >
              {/* Heading */}
              <Box
                sx={{
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  mb: 1,
                  color: theme.palette.primary.main,
                }}
              >
                {room.title}
              </Box>

              {/* Rate Section */}
              <Box sx={{ mb: 1 }}>
                <p style={{ margin: 0, opacity: 0.8 }}>{room.para}</p>
                <p
                  style={{
                    margin: 0,
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700,
                  }}
                >
                  ₹{room.cost}
                </p>
              </Box>

              {/* Security Deposit */}
              <Box sx={{ mb: 2 }}>
                <p style={{ margin: 0 }}>Security Deposit</p>
                <p style={{ margin: 0, color: "white" }}>₹{room.security_money}</p>
              </Box>

              {/* Special Amenities */}
              <Box sx={{ mb: 2 }}>
                <p style={{ marginBottom: 6 }}>Special Amenities:</p>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {room.amenities.map((amenity, idx) => (
                    <Chip
                      key={idx}
                      label={amenity}
                      variant="filled"
                      sx={{
                        backgroundColor: '#e6e6e6ff',
                        color: '#303030ff',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: '#bcbabaff',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Box>

              {/* Buttons */}
              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => alert(`Booking ${room.title}`)}
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    color: '#fff',
                    fontWeight: 600,
                    borderRadius: '12px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#2f4256',
                    },
                  }}
                >
                  Book Now
                </Button>

                <Button
                  variant="contained"
                  onClick={() => alert(`Scheduling appointment for ${room.title}`)}
                  sx={{
                    backgroundColor: theme.palette.secondary.main,
                    color: '#000',
                    fontWeight: 600,
                    borderRadius: '12px',
                    px: 3,
                    '&:hover': {
                      backgroundColor: '#C6C7C4',
                    },
                  }}
                >
                  Schedule Appointment
                </Button>
              </Box>
            </Card>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default RoomsDetails;

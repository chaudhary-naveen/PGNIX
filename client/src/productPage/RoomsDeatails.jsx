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

const RoomCard = ({
  title,
  para,
  rent,
  security_money,
  amenities,
  totalRooms,
  vacantRooms
}) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 16px)' },
        display: 'flex',
      }}
    >
      <Card
        sx={{
          flexGrow: 1,
          p: 3,
          borderRadius: '14px',
          background: `linear-gradient(145deg, ${theme.palette.background.paper}, ${theme.palette.background.default})`,
          color: theme.palette.text.primary,
          boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(0,0,0,0.12)',
            transform: 'translateY(-2px)',
          },
        }}
        elevation={0}
      >
        {/* Title */}
        <Box sx={{ fontSize: '1.4rem', fontWeight: 700, mb: 1 }}>
          {title}
        </Box>

        {/* Occupied Badge */}
        {vacantRooms === 0 && (
          <Box
            component="span"
            sx={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #ff5f6d, #ffc371)',
              px: 2,
              py: 0.5,
              fontSize: '0.75rem',
              fontWeight: 600,
              color: '#fff',
              borderRadius: '20px',
              mb: 2,
              boxShadow: '0 2px 6px rgba(255,95,109,0.3)',
            }}
          >
            Fully Occupied
          </Box>
        )}

        {/* Description & Rent */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ color: theme.palette.text.secondary, fontSize: '0.95rem', mb: 0.5 }}>
            {para}
          </Box>
          <Box sx={{ fontSize: '1.6rem', fontWeight: 700, color: theme.palette.primary.main }}>
            ₹{rent}
          </Box>
        </Box>

        {/* Security Deposit */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ fontWeight: 500, fontSize: '0.9rem' }}>Security Deposit</Box>
          <Box sx={{ color: theme.palette.text.primary }}>₹{security_money}</Box>
        </Box>

        {/* Occupancy */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ fontWeight: 500, fontSize: '0.9rem' }}>Occupancy</Box>
          <Box sx={{ color: theme.palette.text.primary }}>
            {totalRooms} Total, {vacantRooms} Vacant
          </Box>
        </Box>

        {/* Amenities */}
        <Box sx={{ mb: 2 }}>
          <Box sx={{ mb: 1, fontWeight: 500, fontSize: '0.9rem' }}>Special Amenities:</Box>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {amenities?.map((amenity, idx) => (
              <Chip
                key={idx}
                label={amenity}
                variant="outlined"
                sx={{
                  backgroundColor: '#f8f9fa',
                  fontWeight: 500,
                  borderRadius: '8px',
                  color:"Black",
                  fontSize: '0.8rem',
                  borderColor: '#e0e0e0',
                  '&:hover': { backgroundColor: '#eceff1' },
                }}
              />
            ))}
          </Box>
        </Box>

        {/* Buttons */}
        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            onClick={() => alert(`Booking ${title}`)}
            sx={{
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              fontWeight: 600,
              borderRadius: '10px',
              px: 2.5,
              textTransform: 'none',
              '&:hover': {
                background: `linear-gradient(135deg, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
              },
            }}
            disabled={vacantRooms === 0}
          >
            Book Now
          </Button>

          <Button
            variant="outlined"
            onClick={() => alert(`Scheduling appointment for ${title}`)}
            sx={{
              borderColor: theme.palette.primary.main,
              color: theme.palette.primary.main,
              fontWeight: 600,
              borderRadius: '10px',
              px: 2.5,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: theme.palette.primary.light,
                borderColor: theme.palette.primary.main,
              },
            }}
            disabled={vacantRooms === 0}
          >
            Schedule Appointment
          </Button>
        </Box>
      </Card>
    </Box>
  );
};



const RoomsDetails = ({ data }) => {
  const [roomData, setRoomData] = React.useState(Rooms);


  return (
    <Box className="container" sx={{ paddingTop: '20px' }}>
      <Box className="row" sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>

        <RoomCard title={"Single Room Details"} para={"Details of Single Room Occupancy"} rent={data.single_rent} security_money={data.single_room_security} amenities={data.single_amenities} totalRooms={data.single_total_rooms} vacantRooms={data.single_vacant_rooms}></RoomCard>
        <RoomCard title={"Double Room Details"} para={"Details of Double Room Occupancy"} rent={data.double_rent} security_money={data.double_room_security} amenities={data.double_amenities} totalRooms={data.double_total_rooms} vacantRooms={data.double_vacant_rooms}></RoomCard>
        <RoomCard title={"Triple Room Details"} para={"Details of Triple Room Occupancy"} rent={data.triple_rent} security_money={data.triple_room_security} amenities={data.triple_amenities} totalRooms={data.triple_total_rooms} vacantRooms={data.triple_vacant_rooms}></RoomCard>
      </Box>
    </Box>
  );
};

export default RoomsDetails;

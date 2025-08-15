import React from 'react';
import Slider from 'react-slick';
import Box from '@mui/material/Box';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const itemData = [
  { img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e', title: 'Breakfast' },
  { img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d', title: 'Burger' },
  { img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45', title: 'Camera' },
  { img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c', title: 'Coffee' },
  { img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8', title: 'Hats' },
  { img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62', title: 'Honey' },
];

const TopImageContainer = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 900, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } }
    ]
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden', p: 2, bgcolor: 'background.paper' }}>
      <Slider {...settings}>
        {itemData.map((item, index) => (
          <Box key={index} sx={{ px: 1 }}>
            <img
              src={`${item.img}?w=500&auto=format`}
              alt={item.title}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '10px',
                border: '2px solid #415A77' // matches your primary color
              }}
            />
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default TopImageContainer;

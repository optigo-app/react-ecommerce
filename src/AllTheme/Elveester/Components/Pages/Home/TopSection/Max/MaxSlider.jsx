import React, { useState } from 'react';
import { Box, Typography, Button, IconButton, useTheme, useMediaQuery } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import BrandsTitle from './BrandsTitle';
import MaxHeader from './Header';

const collections = [
  {
    id: 1,
    title: 'Peacock',
    subtitle: 'A Timeless Heritage for The Modern Bride',
    img: 'https://www.candere.com/media/home_page_images/featured_collection/Peacock.jpg',
  },
  {
    id: 2,
    title: 'Aruna',
    subtitle: 'Tuned to Timeless Tastes',
    img: 'https://www.candere.com/media/home_page_images/featured_collection/Aruna.jpg',
  },
  {
    id: 3,
    title: 'Evil Eye',
    subtitle: 'Your Style Must-Have',
    img: 'https://www.candere.com/media/home_page_images/featured_collection/Evil-Eye.jpg',
  },
  {
    id: 4,
    title: 'Honey Bee',
    subtitle: 'For the Queen in Every Woman',
    img: 'https://www.candere.com/media/home_page_images/featured_collection/Honey-Bee.jpg',
  },
  {
    id: 5,
    title: 'Glo',
    subtitle: 'By Tanishq',
    img: 'https://www.candere.com/media/home_page_images/featured_collection/Glo.jpg',
  },
];

const CARD_WIDTH = 320; // Base width of a card
const CARD_HEIGHT = 450; // Base height

const CustomCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const length = collections.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  };

  const getCardStyle = (index) => {
    let offset = (index - activeIndex);
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;
    const isActive = offset === 0;
    const isNext = offset === 1;
    const isPrev = offset === -1;
    let styles = {
      // opacity: 0,
      zIndex: 0,
      transform: `translateX(0px) scale(0.5)`,
      // filter: 'blur(5px)',
      visibility: 'hidden'
    };

    const spacing = isMobile ? 225 : 355;

    if (isActive) {
      styles = {
        // opacity: 1,
        zIndex: 10,
        transform: `translateX(0px) scale(1.2)`, // Center pops out
        // filter: 'blur(0px)',
        visibility: 'visible',
        boxShadow: '0px 20px 50px rgba(0,0,0,0.6)'
      };
    } else if (isPrev) {
      styles = {
        // opacity: 0.6,
        zIndex: 5,
        transform: `translateX(-${spacing}px) scale(0.95)`,
        // filter: 'blur(1px)',
        visibility: 'visible'
      };
    } else if (isNext) {
      styles = {
        // opacity: 0.6,
        zIndex: 5,
        transform: `translateX(${spacing}px) scale(0.95)`,
        // filter: 'blur(1px)',
        visibility: 'visible'
      };
    } else if (offset === -2) {
      // Far Left (visible but very small/dim)
      styles = {
        // opacity: 0.3,
        zIndex: 1,
        transform: `translateX(-${spacing * 1.80}px) scale(0.75)`,
        // filter: 'blur(3px)',
        visibility: 'visible'
      };
    } else if (offset === 2) {
      // Far Right (visible but very small/dim)
      styles = {
        // opacity: 0.3,
        zIndex: 1,
        transform: `translateX(${spacing * 1.80}px) scale(0.75)`,
        // filter: 'blur(3px)',
        visibility: 'visible'
      };
    }

    return styles;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        py: 5,
        width: {
          xs: "100%",
          md: '95%'
        },
        borderRadius: {
          xs: 0,
          md: 5
        },

      }}
    >
      {/* Header */}
      {/* <Box textAlign="center" mb={6} zIndex={20}>
        <BrandsTitle
          title={"Collections You'll Love"}
          subtitle={"Let's take a glimpse at our featured collections before diving in!"}
          Align='center'
        />
      </Box> */}
      <Box textAlign="center" mb={5}>
       <MaxHeader 
       title={"Iconic Collection"}
          subtitle={"Let's take a glimpse at our featured collections before diving in!"}
       alignment="center"  />
        </Box> 
      {/* Carousel Container */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: isMobile ? '350px' : '500px', // Container height
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          perspective: '1000px',
        }}
      >
        {collections?.map((item, i) => {
          const styles = getCardStyle(i);
          return (
            <Box
              key={item.id}
              sx={{
                position: 'absolute',
                width: isMobile ? 200 : CARD_WIDTH,
                height: isMobile ? 280 : CARD_HEIGHT,
                borderRadius: '20px',
                background: `url(${item.img})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                transition: 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)',
                ...styles
              }}
              onClick={() => setActiveIndex(i)}
            >
            </Box>
          );
        })}
      </Box>

      {/* Controls */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mt: 8, zIndex: 20 }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            p: 1.5,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            transition: 'all 0.25s ease',

            '&:hover': {
              background: 'rgba(255, 255, 255, 0.22)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              transform: 'scale(1.05)',
            },

            '&:active': {
              transform: 'scale(0.95)',
            }
          }}
        >
          <ArrowBackIosNewIcon
            fontSize="small"
          />
        </IconButton>


        <Button
          variant="contained"
          onClick={() => console.log('Shop Now Clicked')}
          sx={{
            borderRadius: '30px',
            bgcolor: '#2b3a67',
            border: '1px solid #444',
            px: 4,
            py: 1.5,
            fontWeight: 'bold',
            letterSpacing: '1px',
            boxShadow: '0 0 15px rgba(255,255,255,1)',
            '&:hover': { bgcolor: '#333' }
          }}
        >
          SHOP NOW!
        </Button>

        <IconButton
          onClick={handleNext}
          sx={{
            p: 1.5,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
            transition: 'all 0.25s ease',

            '&:hover': {
              background: 'rgba(255, 255, 255, 0.22)',
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)',
              transform: 'scale(1.05)',
            },

            '&:active': {
              transform: 'scale(0.95)',
            }
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CustomCarousel;

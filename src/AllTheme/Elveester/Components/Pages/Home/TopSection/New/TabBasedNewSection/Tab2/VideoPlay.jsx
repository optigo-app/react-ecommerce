import React, { useRef, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  IconButton, 
  Container, 
  Grid,
  Stack 
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrowRounded';
import PauseIcon from '@mui/icons-material/PauseRounded';
import ChevronRightIcon from '@mui/icons-material/ChevronRightRounded';

const TanishqVideoSection = ({video}) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Handle Play/Pause Toggle
  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <Box sx={{ width: '100%', overflow: 'hidden' }}>
      
      {/* --- VIDEO AREA --- */}
      <Box sx={{ position: 'relative', height: { xs: '600px', md: '700px' }, width: '100%', backgroundColor: '#000' }}>
        
        {/* HTML5 Video Element */}
        <Box
          component="video"
          ref={videoRef}
          loop
          playsInline
          // Using a placeholder luxury jewelry video for demonstration
          src={video}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'filter 0.5s ease',
            // THE BLUR EFFECT: Blur when paused, sharp when playing
            filter: isPlaying ? 'brightness(0.7)' : 'blur(4px) brightness(0.5)',
          }}
        />

        {/* Overlay Content (Centered Buttons) */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          {/* Play Button */}
          <IconButton
            onClick={handlePlayPause}
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              width: 80,
              height: 80,
              mb: 3,
              border: '1px solid rgba(255,255,255,0.4)',
              color: '#fff',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.3)',
                transform: 'scale(1.1)',
              },
              transition: 'all 0.3s ease',
              // Hide play button slightly when playing to remove distraction, or keep it visible
              opacity: isPlaying ? 0.9 : 1, 
              pointerEvents: isPlaying ? 'auto' : 'auto' // Click video to pause instead?
            }}
          >
            {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon sx={{ fontSize: 40 }} />}
          </IconButton>

          {/* Explore Button */}
          <Button
            variant="contained"
            endIcon={<ChevronRightIcon />}
            sx={{
              backgroundColor: '#fff',
              color: '#4a3b32', // Dark brownish text like image
              borderRadius: '50px',
              padding: '10px 30px',
              textTransform: 'none',
              fontSize: '1rem',
              fontWeight: 600,
              opacity: isPlaying ? 0.8 : 1,
              transition: 'opacity 0.3s ease',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
            }}
          >
            Explore Now
          </Button>
        </Box>

        {/* Bottom Text Overlay (We exchange old gold...) */}
        <Box
          sx={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: '100%',
            textAlign: 'center',
            zIndex: 3,
            padding: '0 20px',
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: '#fff',
              fontFamily: '"Playfair Display", serif', // Use a serif font
              fontWeight: 400,
              letterSpacing: '1px',
              textShadow: '0px 2px 4px rgba(0,0,0,0.5)',
              fontSize: { xs: '1.8rem', md: '3rem' }
            }}
          >
            We exchange old gold
          </Typography>
          <Typography
              variant="subtitle1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontStyle: 'italic',
                color: '#8b786d',
                fontSize: '1.2rem',
              }}
            >
              Trust us to be part of your precious moments and to deliver jewellery that you'll cherish forever.
            </Typography>
        </Box>

        {/* Click Overlay to Pause when playing */}
        {isPlaying && (
          <Box 
            onClick={handlePlayPause}
            sx={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1, cursor: 'pointer' }}
          />
        )}
      </Box>
    </Box>
  );
};

export default TanishqVideoSection;
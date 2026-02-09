import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import MaxHeader from '../TopSection/Max/Header'

/* ---------- Styled Components ---------- */

const SectionHeader = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(() => ({
  fontWeight: 600,
  textTransform: "capitalize",
  fontFamily: "inherit",
  color: "rgba(29, 50, 88, 0.8)",
}));

const VideoCard = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: 14,
  overflow: "hidden",
  background: theme.palette.background.paper,
  cursor: "pointer",
  transition: "transform 0.25s ease",

  "&:hover": {
    transform: "translateY(-2px)",
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(1.5),
  left: theme.spacing(1.5),
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(6px)",
  borderRadius: "50%",
  padding: 10,
  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
  zIndex: 2,
}));

/* ---------- Main Component ---------- */

export default function SocialMediaVideoSection({ videoData = [] }) {
  const videoRefs = useRef([]);

  const handleMouseEnter = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  const handleMouseLeave = (index) => {
    const video = videoRefs.current[index];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  return (
    <Box name="mainSocialMediaConatinerID" sx={{ width: "100%", px: { xs: 2, sm: 3, md: 4 }, mb: 5 }}>
      {/* <SectionHeader>
        <SectionTitle
          sx={{
            fontSize: {
              xs: "19px",
              sm: "21px",
              md: "28px",
            },
          }}
        >
          Social Media Videos
        </SectionTitle>
      </SectionHeader> */}
      <MaxHeader
      // title="Social Media Videos"
      title="Curated moments"
      alignment="center"
      />

      <Swiper
        loop
        spaceBetween={16}
        modules={[Pagination]}
        breakpoints={{
          0: { slidesPerView: 1 },
          640: { slidesPerView: 1.3 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 4 },
        }}
      >
        {videoData?.map((item, index) => (
          <SwiperSlide key={index}>
            <Link to={item.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <VideoCard onMouseEnter={() => handleMouseEnter(index)} onMouseLeave={() => handleMouseLeave(index)}>
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  src={item.demoVideo}
                  muted
                  playsInline
                  preload="metadata"
                  style={{
                    width: "100%",
                    height: "100%",
                    display: "block",
                    objectFit: "cover",
                  }}
                />

                <IconWrapper>
                  <img src={item.icon} alt="social" height={22} width={22} />
                </IconWrapper>
              </VideoCard>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

import React from "react";
import "./SocialMediaSection.modul.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Link } from "react-router-dom";
import { Box, Typography, styled } from "@mui/material";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import { IsSetupFor } from "../../../Recoil/atom";
import SocialMediaVideoSection from "./VideoSection";

const sliderData = [
  {
    imageUrl: "/images/HomePage/SocialMedia/common_img.png",
    link: "https://www.instagram.com/",
    icon: `${storImagePath()}/images/HomePage/SocialLinks/instagram.png`,
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/common_img.png",
    link: "https://in.pinterest.com/",
    icon: `${storImagePath()}/images/HomePage/SocialLinks/pinterest.png`,
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/common_img.png",
    link: "https://www.facebook.com/",
    icon: `${storImagePath()}/images/HomePage/SocialLinks/facebook.png`,
  },
  {
    imageUrl: "/images/HomePage/SocialMedia/common_img.png",
    link: "https://www.linkedin.com/",
    icon: `${storImagePath()}/images/HomePage/SocialLinks/linkedin.png`,
  },
];

// ------- Styled Components -------
const SectionHeader = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  letterSpacing: "1.5px",
  textTransform: "uppercase",
  color: "#2E2E2E",
}));

const SlideWrapper = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  borderRadius: "14px",
  overflow: "hidden",
  background: theme.palette.background.paper,
  transition: "scale 0.3s ease",
  cursor: "pointer",

  img: {
    width: "100%",
    objectFit: "cover",
    display: "block",
    transition: "scale 0.3s ease",
    "&:hover": {
      scale: 1.02,
    },
  },
}));

const IconWrapper = styled(Box)(({ theme }) => ({
  position: "absolute",
  bottom: theme.spacing(1.5),
  left: theme.spacing(1.5),
  background: "rgba(255,255,255,0.9)",
  backdropFilter: "blur(4px)",
  borderRadius: "50%",
  padding: "10px",
  boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
}));

// ------- Main Component -------
export default function SocialMediaSection({ banner, demoVideo }) {
  const updatedSlides = sliderData.map((item, i) => ({
    ...item,
    imageUrl: storImagePath() + item.imageUrl,
    ...(IsSetupFor && demoVideo?.[i] ? { demoVideo: demoVideo[i] } : {}),
  }));

  if (IsSetupFor) {
    return (
      <>
        <SocialMediaVideoSection videoData={updatedSlides} />
      </>
    );
  }

  return (
    <Box name="mainSocialMediaConatinerID" className="mainSocialMediaConatiner" sx={{ width: "100%", px: { xs: 2, sm: 3, md: 4 } }}>
      <SectionHeader>
        <SectionTitle>Social Media</SectionTitle>
      </SectionHeader>

      <Swiper
        loop
        spaceBetween={16}
        modules={[Pagination]}
        className="social_mySwiper"
        breakpoints={{
          0: { slidesPerView: 1 }, // mobile
          640: { slidesPerView: 1.3 }, // better feel
          768: { slidesPerView: 2 }, // 2-grid layout
          1024: { slidesPerView: 4 }, // full grid layout
          1280: { slidesPerView: 4 },
        }}
      >
        {updatedSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Link to={slide.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <SlideWrapper>
                <img loading="lazy" src={slide.imageUrl} alt={`Slide-${index}`} />

                <IconWrapper>
                  <img src={slide.icon} alt="social" height={22} width={22} style={{ display: "block" }} />
                </IconWrapper>
              </SlideWrapper>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
}

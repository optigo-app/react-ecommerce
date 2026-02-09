import React from "react";
import { Box, Typography } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const MaxAffiliation = ({ banner }) => {
  return (
    <Box
      sx={{
        width: "100%",
        bgcolor: "#fff",
        py: { xs: 6, md: 6 },
        px: { xs: 2, sm: 3, md: 4 },
        overflow: "hidden",
      }}
    >
      {/* Title */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            color: "rgba(29, 50, 88, 0.8)",
            fontSize: { xs: 23, sm: 26, md: 28 },
            fontWeight: 600,
            mb: 1,
          }}
        >
          Affiliation
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 13, sm: 14, md: 15 },
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#666",
          }}
        >
          Partnering for Excellence and Trust.
        </Typography>
      </Box>

      {/* Slider */}
      <Swiper
        modules={[Autoplay]}
        loop
        speed={900}
        autoplay={{
          delay: 2200,
          disableOnInteraction: false,
        }}
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 3,
          },
          900: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
        }}
      >
        {banner?.image?.map((img, index) => (
          <SwiperSlide key={index}>
            <Box
              sx={{
                height: 150,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 2,
                bgcolor: "#fafafa",
                transition: "all 0.3s ease",
                "&:hover img": {
                  transform: "scale(1.3)",
                },
              }}
            >
              <Box
                component="img"
                src={img}
                alt={`Affiliation ${index + 1}`}
                loading="lazy"
                sx={{
                  maxWidth: 140,
                  maxHeight: 56,
                  objectFit: "contain",
                  opacity: 0.9,
                  transition: "all 0.3s ease",
                }}
              />
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default MaxAffiliation;

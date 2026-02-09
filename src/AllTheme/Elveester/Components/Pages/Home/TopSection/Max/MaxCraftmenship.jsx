import React, { useRef } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

import "swiper/css";

const MaxCraftmenship = ({ banner }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box
      id="craftmenshipId"
      name="craftmenshipId"
      sx={{
        width: "100%",
        bgcolor: "#fff",
        overflow: "hidden",
        px: { xs: 2, sm: 3, md: 4 },
        position: "relative",
      }}
    >
      {/* Title */}
      <Box sx={{ mb: 3 }}>
        <Typography
          sx={{
            color: "rgba(29, 50, 88, 0.8)",
            fontSize: { xs: 23, sm: 26, md: 28 },
            fontWeight: 600,
            mb: 1,
          }}
        >
          Our Craftmenship
        </Typography>

        <Typography
          sx={{
            fontSize: { xs: 13, sm: 14, md: 15 },
            letterSpacing: 1,
            textTransform: "uppercase",
            color: "#666",
          }}
        >
          Crafting Timeless Elegance with Precision
        </Typography>
      </Box>

      {/* Slider Wrapper */}
      <Box sx={{ position: "relative" }}>
        {/* Left Button */}
        <IconButton
          ref={prevRef}
          sx={{
            position: "absolute",
            top: "50%",
            left: { xs: 8, md: 16 },
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",

            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          <ArrowBackIosNewRoundedIcon fontSize="small" />
        </IconButton>

        {/* Right Button */}
        <IconButton
          ref={nextRef}
          sx={{
            position: "absolute",
            top: "50%",
            right: { xs: 8, md: 16 },
            transform: "translateY(-50%)",
            zIndex: 10,
            bgcolor: "rgba(255,255,255,0.9)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",

            "&:hover": {
              bgcolor: "#fff",
            },
          }}
        >
          <ArrowForwardIosRoundedIcon fontSize="small" />
        </IconButton>

        {/* Swiper */}
        <Swiper
          modules={[Navigation]}
          loop
          slidesPerView={1}
          onBeforeInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {banner?.image?.slice(0, 3)?.map((img, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={img}
                alt={`Craftmenship ${index + 1}`}
                loading="lazy"
                sx={{
                  width: "100%",
                  height: { xs: "45vh", md: "70vh" },
                  objectFit: "cover",
                  borderRadius: "16px",
                  display: "block",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Box>
  );
};

export default MaxCraftmenship;

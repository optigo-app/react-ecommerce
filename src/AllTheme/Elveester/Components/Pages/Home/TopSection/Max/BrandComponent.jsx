import React from "react";
import { Box } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import BrandsTitle from "./BrandsTitle";

import "swiper/css";



const MaxBrandsComponent = ({ banner }) => {
  return (
    <Box
      id="brandsComponentID"
      name="brandsComponentID"
      sx={{
        width: "100%",
        px: { xs: 2, sm: 3, md: 4 },
        overflow: "hidden",
      }}
    >
      <BrandsTitle title="Introducing Our Exclusive Brands" />

      <BrandsSlider banner={banner} />
    </Box>
  );
};

export default MaxBrandsComponent;




const BrandsSlider = ({ banner }) => {
  return (
    <Box
      sx={{
        width: "100%",
        py: { xs: 2, md: 4 },
      }}
    >
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        loop
        speed={900}
        spaceBetween={32}
        breakpoints={{
          0: {
            slidesPerView: 3,
          },
          600: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 5,
          },
          1200: {
            slidesPerView: 6,
          },
          1440: {
            slidesPerView: 7,
          },
        }}
      >
        {[...banner?.image, ...banner?.image]?.map((image, index) => (
          <SwiperSlide key={index}>
            <Box
              component="img"
              src={image}
              alt={`brand-${index + 1}`}
              loading="lazy"
              sx={{
                width: "100%",
                maxHeight: 70,
                objectFit: "contain",
                opacity: 0.85,
                transition: "all 0.3s ease",
                filter: "grayscale(100%)",

                "&:hover": {
                  opacity: 1,
                  filter: "grayscale(0%)",
                },
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};


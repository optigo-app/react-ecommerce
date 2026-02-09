import { useState } from "react";
import { Box, IconButton, Stack, alpha } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectFade, Keyboard, Mousewheel } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-creative";
import TanishqVideoSection from "./VideoPlay";
import GivaLandingPage from "./More";
import CollectionSlider from "./SwiperSlider";
import { video } from "../../../../../../Assets";

const Tab2 = ({ carousel }) => {
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          mb: 6,
        }}
      >
        <Box
          sx={{
            width: { xs: "95%", md: "98%", lg: "98%" },
            height: { xs: "85%", md: "90%" },
            position: "relative",
            zIndex: 1,
          }}
        >
          <Swiper
            onSwiper={setSwiperInstance}
            onSlideChange={handleSlideChange}
            modules={[EffectFade, Keyboard, Mousewheel]}
            speed={800} // Slower, smoother transition
            spaceBetween={20}
            slidesPerView={1}
            loop
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            keyboard={{ enabled: true }}
            style={{ width: "100%", height: "100%", borderRadius: "32px" }}
          >
            {carousel?.map((slide, index) => (
              <SwiperSlide key={slide.id} style={{ borderRadius: "32px", overflow: "hidden" }}>
                <Box
                  sx={{
                    width: "100%",
                    height: { xs: "55vh", sm: "70vh", md: "90vh" },
                  }}
                >
                  <Box
                    component="img"
                    src={slide}
                    alt={slide || `slide-${index}`}
                    onError={(e) => {
                      e.target.src = "/fallback.jpg";
                    }}
                    sx={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 5s ease",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                </Box>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: { xs: "30px", md: "30px" },
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            bgcolor: alpha("#000", 0.65),
            backdropFilter: "blur(16px)",
            borderRadius: "50px",
            padding: "6px 8px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            border: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            alignItems: "center",
            gap: 1,
            transition: "all 0.3s ease",
          }}
        >
          {/* Prev Button */}
          <IconButton
            onClick={() => swiperInstance?.slidePrev()}
            disabled={activeIndex === 0}
            size="small"
            sx={{
              color: "white",
              "&.Mui-disabled": { opacity: 0.3, color: "white" },
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ArrowBack fontSize="small" />
          </IconButton>

          {/* Pagination Dots */}
          <Stack direction="row" spacing={1} sx={{ px: 1 }}>
            {carousel?.map((_, index) => (
              <Box
                key={index}
                onClick={() => swiperInstance?.slideTo(index)}
                sx={{
                  width: activeIndex === index ? "24px" : "8px", // Expand active dot
                  height: "8px",
                  borderRadius: "4px",
                  bgcolor: activeIndex === index ? "white" : "rgba(255,255,255,0.3)",
                  cursor: "pointer",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&:hover": {
                    bgcolor: activeIndex === index ? "white" : "rgba(255,255,255,0.6)",
                  },
                }}
              />
            ))}
          </Stack>

          {/* Next Button */}
          <IconButton
            onClick={() => swiperInstance?.slideNext()}
            disabled={activeIndex === carousel?.length - 1}
            size="small"
            sx={{
              color: "white",
              "&.Mui-disabled": { opacity: 0.3, color: "white" },
              "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
            }}
          >
            <ArrowForward fontSize="small" />
          </IconButton>
        </Box>
      </Box>
      <GivaLandingPage />
      <CollectionSlider />
      <TanishqVideoSection video={video} />
    </>
  );
};

export default Tab2;

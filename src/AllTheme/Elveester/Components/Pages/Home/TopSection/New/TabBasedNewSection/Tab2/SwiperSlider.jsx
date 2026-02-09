import React, { useRef } from "react";
import { Box, Typography, Container, Grid, IconButton, useTheme, useMediaQuery, Button } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation, Pagination } from "swiper/modules";
import {
  col1,
  col2,
  img1,
  img2,
  img3,
  img4,
  img5,
  b1,
  b2,
  b3,
  c1,
  c2,
  d1,
  d2,
  d3,
  j1,
  j2,
  video
} from "../../../../../../Assets";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";
import "swiper/css/pagination";

// --- Mock Data based on the image ---
const collections = [
  {
    id: 1,
    title: "AETERNA",
    image: img1,
    link: "#explore-aeterna",
  },
  {
    id: 2,
    title: "ROUGE",
    image: img2,
    link: "#explore-rouge",
  },
  {
    id: 3,
    title: "LUMIERE",
    image: img3,
    link: "#explore-lumiere",
  },
  {
    id: 4,
    title: "CELESTE",
    image: img4,
    link: "#explore-celeste",
  },
  {
    id: 5,
    title: "ZOYA",
    image: img5,
    link: "#explore-celeste",
  },
];

const CollectionSlider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // Refs for custom navigation buttons
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        // bgcolor: '#fff',
        overflow: "hidden",
        py: 8,
        display: "flex",
        alignItems: "center",
        px: 5,
      }}
    >
      <Box
        sx={{
background: "linear-gradient(135deg, #FFF9EB 0%, #FDF3D8 45%, #F6E6C3 100%)" ,
          width: "100%",
          overflow:'hidden' ,
          py:4 ,
          borderRadius:8
        }}
      >
        <Container maxWidth="xl" sx={{}}>
          <Grid container spacing={4} alignItems="center">
            {/* --- Left Side: Static Text --- */}
            <Grid item xs={12} md={3}>
              <Box sx={{ pl: { md: 4 } }}>
                <Typography
                  variant="h2"
                  component="h1"
                  sx={{
                    fontWeight: 400,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    color: "#1a1a1a",
                    lineHeight: 1.2,
                    mb: 2,
                    zIndex: 50,
                    position: "relative",
                  }}
                >
                  Our
                  <br />
                  Collections
                </Typography>
              </Box>
            </Grid>

            {/* --- Right Side: Perspective Swiper --- */}
            <Grid item xs={12} md={9}>
              <Box sx={{ position: "relative", width: "100%", zIndex: 1 }}>
                <Swiper
                  effect={"coverflow"}
                  grabCursor={true}
                  centeredSlides={true}
                  loop={true}
                  slidesPerView={"auto"} // Critical for the "peek" effect
                  spaceBetween={0}
                  coverflowEffect={{
                    rotate: 0, // Keep images flat, don't rotate like a cube
                    stretch: 0, // Space between slides
                    depth: 150, // Perspective depth (higher = smaller back slides)
                    modifier: 2.5, // Intensity of the effect
                    slideShadows: false, // Turn off shadows for a cleaner look
                  }}
                  pagination={{
                    clickable: true,
                    el: ".custom-pagination",
                    type: "bullets",
                  }}
                  navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                  }}
                  onBeforeInit={(swiper) => {
                    swiper.params.navigation.prevEl = prevRef.current;
                    swiper.params.navigation.nextEl = nextRef.current;
                  }}
                  modules={[EffectCoverflow, Pagination, Navigation]}
                  style={{ width: "100%", paddingBottom: "60px", paddingTop: "20px" }}
                  className="zoya-swiper"
                >
                  {collections.map((item) => (
                    <SwiperSlide key={item.id} style={{ width: isMobile ? "80%" : "500px", height: "400px" }}>
                      {({ isActive }) => (
                        <Box
                          sx={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            transition: "all 0.5s ease",
                            opacity: isActive ? 1 : 0.5, // Fade out side items
                          }}
                        >
                          {/* Image */}
                          <Box
                            component="img"
                            src={item.image}
                            alt={item.title}
                            sx={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                              display: "block",
                            }}
                          />

                          {/* Text Overlay (Only visible on active) */}
                          <Box
                            sx={{
                              position: "absolute",
                              bottom: 30,
                              left: 30,
                              color: "#fff",
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? "translateY(0)" : "translateY(20px)",
                              transition: "all 0.6s ease 0.3s", // Delayed fade in
                              textShadow: "0px 2px 10px rgba(0,0,0,0.3)",
                            }}
                          >
                            <Typography variant="h5" sx={{ fontFamily: "serif", fontWeight: 600, letterSpacing: 1 }}>
                              {item.title}
                            </Typography>
                            <Button
                              variant="text"
                              sx={{
                                color: "#fff",
                                p: 0,
                                mt: 1,
                                textTransform: "none",
                                fontSize: "0.9rem",
                                "&:hover": { textDecoration: "underline" },
                              }}
                            >
                              Explore
                            </Button>
                          </Box>
                        </Box>
                      )}
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* --- Custom Controls (Bottom) --- */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    mt: 2,
                    gap: 4,
                  }}
                >
                  {/* Prev Arrow */}
                  <IconButton ref={prevRef} sx={{ color: "#888", "&:hover": { color: "#000" } }}>
                    <ArrowBackIosNew fontSize="small" />
                  </IconButton>

                  {/* Pagination Lines Container */}
                  <Box className="custom-pagination" sx={{ width: "auto !important", display: "flex", gap: "8px" }} />

                  {/* Next Arrow */}
                  <IconButton ref={nextRef} sx={{ color: "#888", "&:hover": { color: "#000" } }}>
                    <ArrowForwardIos fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
      {/* Global CSS overrides for specific Swiper styling */}
      <style jsx global>{`
        .zoya-swiper {
          overflow: visible !important; /* Allows side slides to peek out of container if needed */
          position: relative !important;
          z-index: 2 !important;
        }

        /* Custom Pagination Styling to match the lines in the image */
        .swiper-pagination-bullet {
          width: 30px !important;
          height: 2px !important;
          border-radius: 0 !important;
          background: #ccc !important;
          opacity: 1 !important;
          margin: 0 4px !important;
          transition: all 0.3s ease;
        }
        .swiper-pagination-bullet-active {
          background: #d4a373 !important; /* Gold/Brown accent color */
          height: 3px !important;
        }
      `}</style>
    </Box>
  );
};

export default CollectionSlider;

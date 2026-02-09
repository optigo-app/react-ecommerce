import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";

const HeroMediaSlider = ({ media = [], isSingleVideo = false }) => {
  if (isSingleVideo) {
    const videoSrc = media?.[0]?.src || "";
    const poster = media?.[0]?.poster || "";

    return (
      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "55vh", sm: "70vh", md: "104vh" },
          overflow: "hidden",
          bgcolor: "#000",
        }}
      >
        {videoSrc ? (
          <Box
            component="video"
            src={videoSrc}
            muted
            autoPlay
            loop
            playsInline
            poster={poster}
            onError={(e) => {
              console.warn("Video failed to load:", e);
              e.target.style.display = "none";
            }}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <Box
            component="img"
            src={poster || "/fallback.jpg"}
            alt="fallback"
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "brightness(0.6)",
            }}
          />
        )}
      </Box>
    );
  }
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: "55vh", sm: "70vh", md: "104vh" },
        overflow: "hidden",
        bgcolor: "#000",
      }}
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        loop
        autoplay={{
          delay: 3500,
          disableOnInteraction: false,
        }}
        // pagination={{
        //   clickable: true,
        //   dynamicBullets: true,
          
        // }}
        effect="fade"
        style={{ width: "100%", height: "100%" }}
      >
        {media?.map((item, index) => (
          <SwiperSlide key={index}>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              {item.type === "video" ? (
                <Box
                  component="video"
                  src={item.src}
                  muted
                  autoPlay
                  loop
                  playsInline
                  poster={item.poster || ""}
                  onError={(e) => {
                    e.target.style.display = "none";
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Box
                  component="img"
                  src={item.src }
                  alt={item.alt || `slide-${index}`}
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
              )}
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default HeroMediaSlider;

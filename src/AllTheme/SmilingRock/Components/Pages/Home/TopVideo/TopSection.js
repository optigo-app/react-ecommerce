import React, { useEffect, useRef, useState } from "react";
import { storImagePath } from "../../../../../../utils/Glob_Functions/GlobalFunction";
import "./TopSection.modul.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { CurrentSonasonsTheme } from "../../../Recoil/atom";
import { useRecoilValue } from "recoil";

const TopSection = ({ data }) => {
  const [loading, setLoading] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);
  const videoRef = useRef(null);
  const [localData, setLocalData] = useState();
  const theme = useRecoilValue(CurrentSonasonsTheme);

  useEffect(() => {
    let localData = JSON.parse(sessionStorage.getItem("storeInit"));
    if (localData) {
      setLocalData(localData);
    }
  }, []);

  const handleVideoLoad = () => {
    setLoading(false);
    setTimeout(() => {}, 0);
    if (videoRef.current) {
      videoRef.current.controls = false;
    }
  };

  const handleVideoPlay = () => {
    setVideoStarted(true);
  };

  return (
    <div
      className="smr_topVideoMain"
      style={{ minHeight: "550px" }}
      onContextMenu={(e) => {
        e.preventDefault();
      }}
    >
      {theme === "demo" ? (
        <video ref={videoRef} width="500" autoPlay muted controls={false} loop style={{ height: "auto", width: "100%" }} onLoadedData={handleVideoLoad} onPlay={handleVideoPlay} loading="lazy" poster={`${storImagePath()}/Banner/homepageVideoPoster.webp`}>
          <source src={data?.video[0].replace(".mp4", ".webm")} type="video/webm" />
        </video>
      ) : (
        <>
          <Slider media={data?.image} />
        </>
      )}

      {/* {localData?.Blockno === 2 && (
        <div>
          <img
            src={`${storImagePath()}/images/HomePage/Banner/HomeBanner.png`}
            style={{ width: "100%" }}
          />
        </div>
      )}

      {localData?.Blockno === 1 &&
        <video
          ref={videoRef}
          width="500"
          autoPlay
          muted
          controls={!videoStarted}
          loop
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/HomepageMainBannerVideo.mp4`}
            type="video/mp4"
          />
        </video>
      } */}
      {/* 
{localData?.Blockno === 1 && storeInit?.IsPLW == 1 ? (
        <div>
          <img
            src={`${storImagePath()}/images/HomePage/MainBanner/mainTopBanner2.webp`}
            style={{ width: "100%" }}
          />
        </div>
      ) : (
        <video
          ref={videoRef}
          width="500"
          autoPlay
          muted
          controls={!videoStarted}
          loop
          style={{ height: "auto", width: "100%" }}
          onLoadedData={handleVideoLoad}
          onPlay={handleVideoPlay}
        >
          <source
            src={`${storImagePath()}/images/HomePage/TopSection/HomepageMainBannerVideo.mp4`}
            type="video/mp4"
          />
        </video>
      )} */}
    </div>
  );
};

export default TopSection;

const Slider = ({ media }) => {
  return (
    <>
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
          {media?.slice(0, 3)?.map((item, index) => (
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
                {/* {item.type === "video" ? (
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
              ) : ( */}
                <Box
                  component="img"
                  src={item}
                  alt={item.alt || `slide-${index}`}
                  onError={(e) => {
                    e.target = "/fallback.jpg";
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 5s ease",
                    "&:hover": { transform: "scale(1.05)" },
                  }}
                />
                {/* )} */}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </>
  );
};

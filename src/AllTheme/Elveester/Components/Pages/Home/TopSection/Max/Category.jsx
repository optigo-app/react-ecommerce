import React, { useRef, useState } from "react";
import { Box, Typography, IconButton, Container, useTheme, useMediaQuery, Fade } from "@mui/material";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, FreeMode } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import BrandsTitle from "./BrandsTitle";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import MaxHeader from "./Header";
import { useNavigate } from "react-router-dom";

// 1. Fixed Data: Ensure IDs are unique to prevent React rendering errors
// "Pendant set": `${storImagePath()}/images/Category/PendantSet.webp`,

const categories = [
  { id: 101, label: "Bangal", slug: "", image: `${storImagePath()}/Category/new-image/bangal.jpg` },
  { id: 102, label: "Bangals", slug: "Bangles", image: `${storImagePath()}/Category/new-image/Bangals1.png` },
  { id: 103, label: "Bracelate", slug: "Bracelet", image: `${storImagePath()}/Category/new-image/BRACELATE2.jpg` },
  { id: 105, label: "Earings", slug: "EARING", image: `${storImagePath()}/Category/new-image/Earings1.png` },
  { id: 106, label: "Mangalsutra", slug: "Mangalsutra", image: `${storImagePath()}/Category/new-image/Mangalsutra1.jpg` },
  { id: 107, label: "Men's Bracelate", slug: "", image: `${storImagePath()}/Category/new-image/Men's Bracelate.jpg` },
  { id: 108, label: "Men's chain", slug: "Men's chain", image: `${storImagePath()}/Category/new-image/Mens'chain.jpg` },
  { id: 101, label: "Necklaces", slug: "NACKLACE ", image: `${storImagePath()}/Category/new-image/NECKLACE1.jpg` },
  { id: 102, label: "Ring", slug: "Ring", image: `${storImagePath()}/Category/new-image/RING1.jpg` },
  { id: 103, label: "Pendant", slug: "Pendants", image: `${storImagePath()}/Category/new-image/pendent_or.jpg` },
];

// http://elvee.web/WebSiteStaticImage/Category/pendants.webp
// http://elvee.web/WebSiteStaticImage/images/Category/earrings.webp


const CategorySlider = () => {
  const theme = useTheme();
  // We use state for navigation refs to ensure Swiper picks them up after render
  const [prevEl, setPrevEl] = useState(null);
  const [nextEl, setNextEl] = useState(null);

  return (
    <Box
      component="section"
      sx={{
        width: {
          xs: "100%",
          sm: "100%",
          md: "100%",
          lg: "90%",
          xl: "80%",
        },
        bgcolor: "#ffffff",
        position: "relative",
        overflow: "hidden",
        pb: 2,
      }}
    >
      <Container
        maxWidth={false}
        sx={{
          padding: "0 !important",
        }}
      >
        {/* <BrandsTitle title={"Essence of Style"} Align="center" /> */}
        <MaxHeader
          title={"Essence of Style"}
          alignment="center" />

        <Box sx={{ position: "relative", px: { xs: 0, sm: 0, md: 4 } }}>
          <NavButton direction="left" ref={setPrevEl} />
          <NavButton direction="right" ref={setNextEl} />
          <Swiper
            modules={[Navigation, Autoplay, FreeMode]}
            navigation={{ prevEl, nextEl }}
            loop={true}
            speed={600}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            freeMode={true}
            breakpoints={{
              0: { slidesPerView: 2.2, spaceBetween: 15 },
              480: { slidesPerView: 3.2, spaceBetween: 40 },
              768: { slidesPerView: 4.2, spaceBetween: 30, freeMode: false },
              1024: { slidesPerView: 6, spaceBetween: 60, freeMode: false },
            }}
            style={{
              paddingTop: "10px",
              paddingBottom: "40px",
              paddingLeft: "10px",
              paddingRight: "10px",
            }}
          >
            {categories.map((cat) => (
              <SwiperSlide key={cat.id} style={{ height: "auto" }}>
                <CategoryCard item={cat} />
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      </Container>
    </Box>
  );
};

const CategoryCard = ({ item }) => {
  const navigate = useNavigate();
  const handleNavigate = (name) => {
    let finalData = {
      menuname: name,
      FilterKey: "Collection",
      FilterVal: name,
      FilterKey1: "",
      FilterVal1: "",
      FilterKey2: "",
      FilterVal2: "",
    };
    sessionStorage.setItem("menuparams", JSON.stringify(finalData));
    const queryParameters1 = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`].filter(Boolean).join("/");
    const queryParameters = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`]
      .join(",");
    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => value)
      .filter(Boolean)
      .join(",");
    const paginationParam = [`page=${finalData.page ?? 1}`, `size=${finalData.size ?? 50}`].join("&");
    let menuEncoded = `${queryParameters}/${otherparamUrl}`;
    const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
    navigate(url);
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        cursor: "pointer",
        group: "true",
      }}
    onClick={() => handleNavigate(item.slug)}
    >
      <Box
        className="img-container"
        sx={{
          width: "100%",
          aspectRatio: "1 / 1",
          borderRadius: "50%",
          overflow: "hidden",
          mb: 2,
          border: "2px solid transparent",
          transition: "all 0.4s ease",
          boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
          position: "relative",
          bgcolor: "#f5f5f5",
        }}
      >
        <img
          src={item.image}
          alt={item.label}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            transition: "transform 0.6s ease",
          }}
        />
      </Box>

      <Typography
        className="cat-label"
        variant="body2"
        sx={{
          fontSize: { xs: "0.8rem", md: "0.9rem" },
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color: "#333",
          fontWeight: 600,
          transition: "color 0.3s ease",
          textAlign: "center",
        }}
      >
        {item.label}
      </Typography>
    </Box>
  );
};

const NavButton = React.forwardRef(({ direction }, ref) => {
  const isLeft = direction === "left";
  return (
    <IconButton
      ref={ref}
      disableRipple
      sx={{
        position: "absolute",
        top: "40%",
        [isLeft ? "left" : "right"]: { xs: 0, md: 20, lg: 20 },
        transform: "translateY(-50%)",
        zIndex: 20,
        bgcolor: "rgba(255, 255, 255, 0.8)", // Glassmorphism
        backdropFilter: "blur(4px)",
        border: "1px solid rgba(0,0,0,0.05)",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        width: { xs: 28, md: 44 },
        height: { xs: 28, md: 44 },
        color: "#111",
        transition: "all 0.3s ease",
        display: { xs: "none", md: "flex" },
        "&.swiper-button-disabled": {
          opacity: 0,
          cursor: "default",
        },
      }}
    >
      {isLeft ? <KeyboardArrowLeftIcon /> : <KeyboardArrowRightIcon />}
    </IconButton>
  );
});

export default CategorySlider;

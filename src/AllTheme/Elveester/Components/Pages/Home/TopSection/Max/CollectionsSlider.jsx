import React, { useState } from "react";
import { Box, Typography, Button, IconButton, useTheme, useMediaQuery ,Skeleton } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import BrandsTitle from "./BrandsTitle";
import MaxHeader from "./Header";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { useNavigate } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Everyday wear",
    slug: "Everyday Wear",
    subtitle: "A Timeless Heritage for The Modern Bride",
    img: `${storImagePath()}/Banner/iconicCollection/Everyday wear.png`,
  },
  {
    id: 2,
    title: "Gen-z drops",
    slug: "Gen-z drops",
    subtitle: "Tuned to Timeless Tastes",
    img: `${storImagePath()}/Banner/iconicCollection/Gen-z drops.png`,
  },
  {
    id: 3,
    title: "Night Out Glam",
    slug: "Night Out Glam",
    subtitle: "Your Style Must-Have",
    img: `${storImagePath()}/Banner/iconicCollection/Night out glam.png`,
  },
  {
    id: 4,
    title: "Shopping All",
    slug: "Shopping All",
    subtitle: "For the Queen in Every Woman",
    img: `${storImagePath()}/Banner/iconicCollection/Shop all.png`,
  },
  {
    id: 5,
    title: "Wedding Collection",
    slug: "Wedding Collection",
    subtitle: "By Tanishq",
    img: `${storImagePath()}/Banner/iconicCollection/wedding collection.png`,
  },
];

const CARD_WIDTH = 320; // Base width of a card
const CARD_HEIGHT = 450; // Base height

const CollectionsSlider = ({ SectionData, IsLoading }) => {
  const [activeIndex, setActiveIndex] = useState(2);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const length = collections.length;

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  };

  const getCardStyle = (index) => {
    let offset = index - activeIndex;
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;
    const isActive = offset === 0;
    const isNext = offset === 1;
    const isPrev = offset === -1;
    let styles = {
      // opacity: 0,
      zIndex: 0,
      transform: `translateX(0px) scale(0.5)`,
      // filter: 'blur(5px)',
      visibility: "hidden",
    };

    const spacing = isMobile ? 225 : 355;

    if (isActive) {
      styles = {
        // opacity: 1,
        zIndex: 10,
        transform: `translateX(0px) scale(1.2)`, // Center pops out
        // filter: 'blur(0px)',
        visibility: "visible",
        boxShadow: "0px 20px 50px rgba(0,0,0,0.6)",
      };
    } else if (isPrev) {
      styles = {
        // opacity: 0.6,
        zIndex: 5,
        transform: `translateX(-${spacing}px) scale(0.95)`,
        // filter: 'blur(1px)',
        visibility: "visible",
      };
    } else if (isNext) {
      styles = {
        // opacity: 0.6,
        zIndex: 5,
        transform: `translateX(${spacing}px) scale(0.95)`,
        // filter: 'blur(1px)',
        visibility: "visible",
      };
    } else if (offset === -2) {
      // Far Left (visible but very small/dim)
      styles = {
        // opacity: 0.3,
        zIndex: 1,
        transform: `translateX(-${spacing * 1.8}px) scale(0.75)`,
        // filter: 'blur(3px)',
        visibility: "visible",
      };
    } else if (offset === 2) {
      // Far Right (visible but very small/dim)
      styles = {
        // opacity: 0.3,
        zIndex: 1,
        transform: `translateX(${spacing * 1.8}px) scale(0.75)`,
        // filter: 'blur(3px)',
        visibility: "visible",
      };
    }

    return styles;
  };

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
    const queryParameters = [finalData?.FilterKey && `${finalData.FilterVal}`, finalData?.FilterKey1 && `${finalData.FilterVal1}`, finalData?.FilterKey2 && `${finalData.FilterVal2}`].join(",");
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

  const buildNormalizedMap = (obj) => {
    const map = {};
    Object.entries(obj).forEach(([key, value]) => {
      map[normalizeKey(key)] = value;
    });
    return map;
  };
  const normalizeKey = (key) => key?.toString().trim().toLowerCase();

  const getImage = (map, key) => {
    const normalized = normalizeKey(key);
    return map[normalized] || `/fallback-image.jpg`;
  };

  const ImagesDemo = {
    CollectionImages: buildNormalizedMap({
      "Everyday Wear": `${storImagePath()}/Banner/iconicCollection/Everyday wear.png`,
      "Gen-z drops": `${storImagePath()}/Banner/iconicCollection/Gen-z drops.png`,
      "Night Out Glam": `${storImagePath()}/Banner/iconicCollection/Night out glam.png`,
      "Shopping All": `${storImagePath()}/Banner/iconicCollection/Shop all.png`,
      "Wedding Collection": `${storImagePath()}/Banner/iconicCollection/wedding collection.png`,
    }),
  };

//   {
//     "Status": "200",
//     "Message": "Success",
//     "Data": {
//         "rd": [
//             {
//                 "CollectionName": "Everyday Wear"
//             },
//             {
//                 "CollectionName": "Gen-z drops"
//             },
//             {
//                 "CollectionName": "Night Out Glam"
//             },
//             {
//                 "CollectionName": "Shopping All"
//             },
//             {
//                 "CollectionName": "Wedding Collection"
//             }
//         ]
//     }
// }

  const FilterData = SectionData?.filter((cat) => ImagesDemo?.CollectionImages[normalizeKey(cat?.CollectionName)]) || [];

  if (IsLoading) {
    return (
      <CollectionSkeleton isMobile={isMobile} />
    );
  }

  if (FilterData?.length === 0) {
    return
  }
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        py: 5,
        width: {
          xs: "100%",
          md: "95%",
        },
        borderRadius: {
          xs: 0,
          md: 5,
        },
      }}
    >
      <Box textAlign="center" mb={5}>
        <MaxHeader title={"Iconic Collection"} subtitle={"Let's take a glimpse at our featured collections before diving in!"} alignment="center" />
      </Box>
      {/* Carousel Container */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: isMobile ? "350px" : "500px", // Container height
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1000px",
        }}
      >
        {FilterData?.map((item, i) => {
          const styles = getCardStyle(i);
          const Image = getImage(ImagesDemo.CollectionImages, item?.CollectionName);
          return (
            <Box
              key={i}
              sx={{
                position: "absolute",
                cursor: "pointer",
                width: isMobile ? 200 : CARD_WIDTH,
                height: isMobile ? 280 : CARD_HEIGHT,
                borderRadius: "20px",
                background: `url("${Image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
                ...styles,
              }}
              onClick={() => (activeIndex == i ? handleNavigate(item.CollectionName) : setActiveIndex(i))}
            ></Box>
          );
        })}
      </Box>

      {/* Controls */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4, mt: 8, zIndex: 20 }}>
        <IconButton
          onClick={handlePrev}
          sx={{
            p: 1.5,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            transition: "all 0.25s ease",

            "&:hover": {
              background: "rgba(255, 255, 255, 0.22)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              transform: "scale(1.05)",
            },

            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>
        {/* shop now! btn */}
        <Button
          variant="outlined"
          size="large"
          sx={{
            px: { xs: 6, sm: 10, md: 12 },
            py: { xs: 1.5, sm: 2 },
            fontSize: { xs: "0.8rem", sm: "0.9rem" },
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.15rem",
            color: "#333",
            boxShadow: "0 4px 40px 0 rgba(0,0,0,0.1)",
            display: "block",
            borderColor: "#333",
            mx: "auto",
            "&:hover": {
              backgroundColor: "#333",
              color: "#fff",
            },
          }}
        >
          Shop Now!
        </Button>
        <IconButton
          onClick={handleNext}
          sx={{
            p: 1.5,
            borderRadius: "50%",
            background: "rgba(255, 255, 255, 0.12)",
            backdropFilter: "blur(12px) saturate(180%)",
            WebkitBackdropFilter: "blur(12px) saturate(180%)",
            border: "1px solid rgba(255, 255, 255, 0.25)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            transition: "all 0.25s ease",

            "&:hover": {
              background: "rgba(255, 255, 255, 0.22)",
              boxShadow: "0 12px 30px rgba(0,0,0,0.25)",
              transform: "scale(1.05)",
            },

            "&:active": {
              transform: "scale(0.95)",
            },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CollectionsSlider;

const CollectionSkeleton = ({ isMobile }) => {
  const CARD_WIDTH = isMobile ? 200 : 320;
  const CARD_HEIGHT = isMobile ? 280 : 450;
  const spacing = isMobile ? 225 : 355;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        py: 5,
        width: { xs: "100%", md: "95%" },
      }}
    >
      {/* Header Skeleton */}
      <Skeleton
        variant="text"
        width="35%"
        height={50}
        sx={{ mb: 5 }}
        animation="wave"
      />

      {/* Same Carousel Layout */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: isMobile ? "350px" : "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Center */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            borderRadius: "20px",
            transform: "scale(1.2)",
            zIndex: 10,
          }}
        />

        {/* Left */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            borderRadius: "20px",
            transform: `translateX(-${spacing}px) scale(0.95)`,
            zIndex: 5,
          }}
        />

        {/* Right */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            borderRadius: "20px",
            transform: `translateX(${spacing}px) scale(0.95)`,
            zIndex: 5,
          }}
        />
      </Box>

      {/* Controls Skeleton */}
      <Box sx={{ display: "flex", gap: 4, mt: 8 }}>
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
        <Skeleton variant="rectangular" width={180} height={45} animation="wave" />
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
      </Box>
    </Box>
  );
};

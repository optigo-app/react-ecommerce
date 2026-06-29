import React, { useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Skeleton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MaxHeader from "./Header";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { useNavigate } from "react-router-dom";
import { InTheSpotlight } from "./ui/HeaderJ";

// ---------------------------------------------------------------------------
// Card dimensions — same as CollectionsSlider
// ---------------------------------------------------------------------------
const CARD_WIDTH = 320;
const CARD_HEIGHT = 450;

// ---------------------------------------------------------------------------
// ProductTypeSlider
// ---------------------------------------------------------------------------
// Props:
//   SectionData  — Array from API: [{ ProductTypeName: "..." }, ...]
//   IsLoading    — Boolean, shows skeleton while fetching
// ---------------------------------------------------------------------------
const ProductTypeSlider = ({ SectionData, IsLoading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  // ── Helpers ──────────────────────────────────────────────────────────────
  const normalizeKey = (key) => key?.toString().trim().toLowerCase();

  const buildNormalizedMap = (obj) => {
    const map = {};
    Object.entries(obj).forEach(([key, value]) => {
      map[normalizeKey(key)] = value;
    });
    return map;
  };

  const getImage = (map, key) => {
    const normalized = normalizeKey(key);
    return map[normalized] || `/fallback-image.jpg`;
  };

  // ── Image map — add / update paths once the user provides the images ─────
  const ImagesDemo = {
    ProductTypeImages: buildNormalizedMap({
      "DIAMOND JEWELLERY": `${storImagePath()}/Banner/productType/diamond.jpeg`,
      "Diamond Jewellery": `${storImagePath()}/Banner/productType/diamond.jpeg`,
      "Gold Jewellery": `${storImagePath()}/Banner/productType/gold.jpeg`,
      "GOLD JEWELLERY": `${storImagePath()}/Banner/productType/gold.jpeg`,
      "POLKI JEWELLERY": `${storImagePath()}/Banner/productType/polki.jpeg`,
      "Polki Jewellery": `${storImagePath()}/Banner/productType/polki.jpeg`,
    }),
  };

  // Filter only items that have a mapped image
  const FilterData =
    SectionData?.filter(
      (cat) =>
        ImagesDemo?.ProductTypeImages[normalizeKey(cat?.ProductTypeName)]
    ) || [];

  const length = FilterData.length;

  // ── Navigation ───────────────────────────────────────────────────────────
  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + length) % length);
  };

  // ── Card positioning — MAX 3 cards (prev · active · next) ─────────────
  // Only offset -1, 0, +1 are visible; everything else is hidden.
  const getCardStyle = (index) => {
    let offset = index - activeIndex;
    // Wrap offset for circular navigation
    if (offset > length / 2) offset -= length;
    if (offset < -length / 2) offset += length;

    const spacing = isMobile ? 225 : 355;

    // Default — hidden
    let styles = {
      zIndex: 0,
      transform: `translateX(0px) scale(0.5)`,
      visibility: "hidden",
      pointerEvents: "none",
    };

    if (offset === 0) {
      // Active — centre card pops out
      styles = {
        zIndex: 10,
        transform: `translateX(0px) scale(1.2)`,
        visibility: "visible",
        boxShadow: "0px 20px 50px rgba(0,0,0,0.6)",
        pointerEvents: "auto",
      };
    } else if (offset === -1) {
      // Previous card — left side
      styles = {
        zIndex: 5,
        transform: `translateX(-${spacing}px) scale(0.95)`,
        visibility: "visible",
        pointerEvents: "auto",
      };
    } else if (offset === 1) {
      // Next card — right side
      styles = {
        zIndex: 5,
        transform: `translateX(${spacing}px) scale(0.95)`,
        visibility: "visible",
        pointerEvents: "auto",
      };
    }

    return styles;
  };

  // ── Navigation handler (same logic as CollectionsSlider) ─────────────────
  const handleNavigate = (name) => {
    let finalData = {
      menuname: name,
      FilterKey: "product_type",
      FilterVal: name,
      FilterKey1: "",
      FilterVal1: "",
      FilterKey2: "",
      FilterVal2: "",
    };
    sessionStorage.setItem("menuparams", JSON.stringify(finalData));
    const queryParameters1 = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ]
      .filter(Boolean)
      .join("/");
    const queryParameters = [
      finalData?.FilterKey && `${finalData.FilterVal}`,
      finalData?.FilterKey1 && `${finalData.FilterVal1}`,
      finalData?.FilterKey2 && `${finalData.FilterVal2}`,
    ].join(",");
    const otherparamUrl = Object.entries({
      b: finalData?.FilterKey,
      g: finalData?.FilterKey1,
      c: finalData?.FilterKey2,
    })
      .filter(([, value]) => value !== undefined)
      .map(([, value]) => value)
      .filter(Boolean)
      .join(",");
    let menuEncoded = `${queryParameters}/${otherparamUrl}`;
    const url = `/p/${finalData?.menuname}/${queryParameters1}/?M=${btoa(menuEncoded)}`;
    navigate(url);
  };

  // ── Early returns ─────────────────────────────────────────────────────────
  if (IsLoading) {
    return <ProductTypeSkeleton isMobile={isMobile} />;
  }

  if (FilterData?.length === 0) {
    return null;
  }

  // ── Render ────────────────────────────────────────────────────────────────
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
        borderRadius: { xs: 0, md: 5 },
      }}
    >
      {/* Section Header */}
      <Box textAlign="center" mb={5}>
        {/* <MaxHeader
          title={"Shop By Type"}
          subtitle={"Explore our curated product categories crafted for every occasion!"}
          alignment="center"
        /> */}
        <InTheSpotlight
          title=" Designed Around You"
          subtitle="Explore timeless essentials and statement pieces."
        />
      </Box>

      {/* Carousel — max 3 cards */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: isMobile ? "350px" : "500px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          perspective: "1000px",
        }}
      >
        {FilterData?.map((item, i) => {
          const styles = getCardStyle(i);
          const image = getImage(
            ImagesDemo.ProductTypeImages,
            item?.ProductTypeName
          );
          return (
            <Box
              key={i}
              sx={{
                position: "absolute",
                cursor: "pointer",
                width: isMobile ? 200 : CARD_WIDTH,
                height: isMobile ? 280 : CARD_HEIGHT,
                borderRadius: "20px",
                background: `url("${image}")`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                transition: "all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
                ...styles,
              }}
              onClick={() =>
                activeIndex === i
                  ? handleNavigate(item.ProductTypeName)
                  : setActiveIndex(i)
              }
            />
          );
        })}
      </Box>

      {/* Controls — same glassmorphic style as CollectionsSlider */}
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 4, mt: 8, zIndex: 20 }}
      >
        {/* Prev */}
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
            "&:active": { transform: "scale(0.95)" },
          }}
        >
          <ArrowBackIosNewIcon fontSize="small" />
        </IconButton>

        {/* Shop Now */}
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
          onClick={() =>
            handleNavigate(FilterData[activeIndex]?.ProductTypeName)
          }
        >
          Shop Now!
        </Button>

        {/* Next */}
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
            "&:active": { transform: "scale(0.95)" },
          }}
        >
          <ArrowForwardIosIcon fontSize="small" />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ProductTypeSlider;

// ---------------------------------------------------------------------------
// Skeleton — matches the 3-card layout (left · center · right only)
// ---------------------------------------------------------------------------
const ProductTypeSkeleton = ({ isMobile }) => {
  const cardW = isMobile ? 200 : CARD_WIDTH;
  const cardH = isMobile ? 280 : CARD_HEIGHT;
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
      {/* Header skeleton */}
      <Skeleton
        variant="text"
        width="35%"
        height={50}
        sx={{ mb: 5 }}
        animation="wave"
      />

      {/* 3-card carousel skeleton */}
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
        {/* Left */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            width: cardW,
            height: cardH,
            borderRadius: "20px",
            transform: `translateX(-${spacing}px) scale(0.95)`,
            zIndex: 5,
          }}
        />
        {/* Center */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            width: cardW,
            height: cardH,
            borderRadius: "20px",
            transform: "scale(1.2)",
            zIndex: 10,
          }}
        />
        {/* Right */}
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{
            position: "absolute",
            width: cardW,
            height: cardH,
            borderRadius: "20px",
            transform: `translateX(${spacing}px) scale(0.95)`,
            zIndex: 5,
          }}
        />
      </Box>

      {/* Controls skeleton */}
      <Box sx={{ display: "flex", gap: 4, mt: 8 }}>
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
        <Skeleton
          variant="rectangular"
          width={180}
          height={45}
          animation="wave"
        />
        <Skeleton variant="circular" width={40} height={40} animation="wave" />
      </Box>
    </Box>
  );
};
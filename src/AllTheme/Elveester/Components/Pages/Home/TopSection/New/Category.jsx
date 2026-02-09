import React, { useRef } from "react";
import {
  Box,
  Typography,
  Card,
  useTheme,
  useMediaQuery,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { storImagePath } from "../../../../../../../utils/Glob_Functions/GlobalFunction";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react"; // using lucide icons
import { IsSetupFor } from "../../../../Recoil/atom";


// Styled Components
const StyledCard = styled(Card)(({ theme }) => ({
  position: "relative",
  overflow: "hidden",
  borderRadius: "0px",
  backgroundColor: "transparent",
  boxShadow: "none",
  cursor: "pointer",
}));

const CategoryImageWrapper = styled(Box)({
  width: "100%",
});

const CategoryImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  borderRadius: 4,
});

const CategoryLabel = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  marginTop: theme.spacing(2),
  fontSize: "0.875rem",
  fontWeight: 500,
  letterSpacing: "0.5px",
  textTransform: "uppercase",
  color: "#1a1a1a",
}));

const SectionHeader = styled(Box)(({ theme }) => ({
  paddingBlock: theme.spacing(2),
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  fontSize: "26px",
  fontWeight: 400,
  letterSpacing: "2px",
  textTransform: "uppercase",
  color: "#2E2E2E",
}));

const NavButton = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  zIndex: 10,
  backgroundColor: "rgba(255,255,255,0.9)",
  border: "1px solid rgba(0,0,0,0.1)",
  backdropFilter: "blur(6px)",
  "&:hover": {
    backgroundColor: "rgba(255,255,255,1)",
  },
  [theme.breakpoints.down("sm")]: {
    display: "none", // hide on mobile
  },
}));

const JewelryShowcase = ({ data }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const swiperRef = useRef(null);
  const categoryPrevRef = useRef(null);
  const categoryNextRef = useRef(null);
  const collectionPrevRef = useRef(null);
  const collectionNextRef = useRef(null);

  const handleNavigate = (name, type) => {
    let finalData = {
      menuname: name,
      FilterKey: type === "ct" ? "Category" : "Collection",
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


  const images = {
    collectionImages: buildNormalizedMap({
      Duometrik: `${storImagePath()}/images/Collection/Duometrik.jpg`,
      "Inner Glow": `${storImagePath()}/images/Collection/Inner Glow.jpg`,
      Kalon: `${storImagePath()}/images/Collection/Kalon.jpg`,
      Kendall: `${storImagePath()}/images/Collection/Kendall.jpg`,
      Pristine: `${storImagePath()}/images/Collection/Pristine.jpg`,
      Jewelrush: `${storImagePath()}/images/Collection/Jewelrush.webp`,
      Moodust: `${storImagePath()}/images/Collection/Moodust.webp`,
      Petalush: `${storImagePath()}/images/Collection/Petalush.webp`,
      Petalyn: `${storImagePath()}/images/Collection/Petalyn.webp`,
      Velar: `${storImagePath()}/images/Collection/Velar.webp`,
    }),

    categoryImages: buildNormalizedMap({
      Necklace: `${storImagePath()}/images/Category/Necklace.jpg`,
      Pendant: `${storImagePath()}/images/Category/Pendant.jpg`,
      Earring: `${storImagePath()}/images/Category/Earring.jpg`,
      Bracelet: `${storImagePath()}/images/Category/Bracelet.jpg`,
      Ring: `${storImagePath()}/images/Category/Ring.jpg`,
      Cufflink: `${storImagePath()}/images/Category/Cufflink.webp`,
      Mangalsutra: `${storImagePath()}/images/Category/Mangalsutra.webp`,
      "Mangalsutra Set": `${storImagePath()}/images/Category/MangalsutraSet.webp`,
      "Pendant set": `${storImagePath()}/images/Category/PendantSet.webp`,
      "Pendant Set": `${storImagePath()}/images/Category/PendantSet.webp`,
      "Pendant set": `${storImagePath()}/images/Category/PendantSet.webp`,
      Bangle: `${storImagePath()}/images/Category/Bangle.webp`,
      "Necklace Set": `${storImagePath()}/images/Category/NecklaceSet.webp`,
    }),
  };

  const ImagesDemo = {
    collectionImages: buildNormalizedMap({
      Glossy: `${storImagePath()}/images/Collection/Glossy.webp`,
      arista: `${storImagePath()}/images/Collection/arista.webp`,
      Artifact: `${storImagePath()}/images/Collection/Artifact.webp`,
      Bellucci: `${storImagePath()}/images/Collection/Bellucci.webp`,
      Claire: `${storImagePath()}/images/Collection/Claire.webp`,
      Euclid: `${storImagePath()}/images/Collection/Euclid.webp`,
    }),
    categoryImages: buildNormalizedMap({
      Ring: `${storImagePath()}/images/Category/Ring.webp`,
      Bracelet: `${storImagePath()}/images/Category/Bracelet.webp`,
      Earring: `${storImagePath()}/images/Category/Earring.webp`,
      Necklace: `${storImagePath()}/images/Category/Necklace.webp`,
      Mangalsutra: `${storImagePath()}/images/Category/Mangalsutra.webp`,
      Pendant: `${storImagePath()}/images/Category/Pendant.webp`,
    }),
  }

  const ImgesPick = IsSetupFor ? ImagesDemo : images;




  // Swiper config shared for both
  const swiperConfig = {
    onSwiper: (swiper) => (swiperRef.current = swiper),
    modules: [Navigation],
    spaceBetween: 24,
    slidesPerView: 1,
    navigation: true,
    grabCursor: true,
    breakpoints: {
      480: { slidesPerView: 2, spaceBetween: 16 },
      768: { slidesPerView: 3, spaceBetween: 20 },
      1024: { slidesPerView: 4, spaceBetween: 24 },
      1280: { slidesPerView: 5, spaceBetween: 24 },
    },
    navigation: true,
    style: { paddingBottom: "30px", paddingTop: "10px" },
  };

  return (
    <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh", width: "100%" }}>
      {data?.category?.length > 0 && (
        <Box sx={{ px: { xs: 2, sm: 3, md: 4 }, pt: 4, position: "relative" }}>
          <SectionHeader>
            <SectionTitle>Shop by Category</SectionTitle>
          </SectionHeader>
          <NavButton ref={categoryPrevRef} sx={{ left: 14 }}>
            <ChevronLeft size={20} />
          </NavButton>
          <NavButton ref={categoryNextRef} sx={{ right: 14 }}>
            <ChevronRight size={20} />
          </NavButton>

          <Swiper {...swiperConfig}
            style={{
              paddingBottom: '10px'
            }}
            navigation={{
              prevEl: categoryPrevRef.current,
              nextEl: categoryNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = categoryPrevRef.current;
              swiper.params.navigation.nextEl = categoryNextRef.current;
            }}
          >
            {data?.category?.map((category) => (
              <SwiperSlide key={category.id}>
                <StyledCard
                  onClick={() => handleNavigate(category?.CategoryName, "ct")}
                >
                  <CategoryImageWrapper>
                    <CategoryImage
                      // src={images?.categoryImages[category?.CategoryName]}
                      src={getImage(ImgesPick.categoryImages, category?.CategoryName)}
                      alt={category?.CategoryName}
                    />
                  </CategoryImageWrapper>
                  <CategoryLabel>{category?.CategoryName}</CategoryLabel>
                </StyledCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}

      {data?.collection?.length > 0 && (
        <Box
          sx={{
            px: { xs: 2, sm: 3, md: 4 },
            bgcolor: "#e4e4e445",
            mt: "42px",
            pb: 4,
            position: "relative",
          }}
        >
          <SectionHeader>
            <SectionTitle>Collections</SectionTitle>
          </SectionHeader>
          <NavButton ref={collectionPrevRef} sx={{ left: 14 }}>
            <ChevronLeft size={20} />
          </NavButton>
          <NavButton ref={collectionNextRef} sx={{ right: 14 }}>
            <ChevronRight size={20} />
          </NavButton>

          <Swiper {...swiperConfig}
            navigation={{
              prevEl: collectionPrevRef.current,
              nextEl: collectionNextRef.current,
            }}
            onBeforeInit={(swiper) => {
              swiper.params.navigation.prevEl = collectionPrevRef.current;
              swiper.params.navigation.nextEl = collectionNextRef.current;
            }}
          >
            {data?.collection?.map((collection) => (
              <SwiperSlide key={collection.id}>
                <StyledCard
                  onClick={() =>
                    handleNavigate(collection?.CollectionName, "c")
                  }
                >
                  <CategoryImageWrapper>
                    <CategoryImage
                      sx={{ borderRadius: 0 }}
                      // src={
                      //   images?.collectionImages[collection?.CollectionName]
                      // }
                      src={getImage(ImgesPick.collectionImages, collection?.CollectionName)}
                      alt={collection?.CollectionName}
                    />
                  </CategoryImageWrapper>
                </StyledCard>
              </SwiperSlide>
            ))}
          </Swiper>
        </Box>
      )}
    </Box>
  );
};

export default JewelryShowcase;

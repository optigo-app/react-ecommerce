import React from "react";
import { Box, Container, Grid, Typography, Button, Card, Stack, IconButton, Chip } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import DiamondOutlinedIcon from "@mui/icons-material/DiamondOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
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

const Category = [
  { label: "RINGS", img: b1 },
  { label: "PENDANTS", img: b2 },
  { label: "EARRINGS", img: b3 },
  { label: "BRACELETS", img: img1 }, // Reusing for demo
  { label: "CHAINS", img: img2 },
  { label: "BROOCH", img: img3 },
];

// --- CONFIGURATION & DATA ---

const COLORS = {
  gradient: "linear-gradient(135deg, #F1FFF7 0%, #E2F7ED 45%, #CFF2DF 100%)",
  text: "#2A6F56",
  accent: "#b4e4cc",
  white: "#FFFFFF",
  glass: "rgba(255, 255, 255, 0.6)",
};

const PRODUCTS = [
  {
    title: "The Eternal Oval",
    price: "₹ 1,250",
    img: d1,
  },
  {
    title: "Radiant Cut Halo",
    price: "₹ 2,100",
    img: d2,
  },
  {
    title: "Toi et Moi Pear",
    price: "₹ 3,400",
    img: d3,
  },
];

// --- STYLED COMPONENTS (Internal) ---

const SectionHeader = ({ title, subtitle }) => (
  <Box sx={{ mb: 6, textAlign: "center" }}>
    <Typography
      variant="overline"
      sx={{
        color: COLORS.text,
        letterSpacing: "3px",
        fontWeight: 700,
        borderBottom: `1px solid ${COLORS.text}`,
        pb: 0.5,
      }}
    >
      {subtitle}
    </Typography>
    <Typography
      variant="h3"
      sx={{
        fontFamily: '"Playfair Display", serif',
        color: COLORS.text,
        mt: 2,
        fontWeight: 500,
      }}
    >
      {title}
    </Typography>
  </Box>
);

const Tab3 = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        color: COLORS.text,
        fontFamily: '"Montserrat", sans-serif',
      }}
    >
      {/* 1. HERO SECTION */}
      <Box
        sx={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          px: 10,
        }}
      >
        <Grid
          container
          alignItems="center"
          sx={{
            background: COLORS.gradient,
            borderRadius: 10,
            p: 4,
          }}
        >
          {/* Text Content */}
          <Grid item xs={12} md={5} sx={{ zIndex: 2 }}>
            <Chip
              icon={<DiamondOutlinedIcon sx={{ fontSize: 16, color: COLORS.text }} />}
              label="100% CONFLICT FREE"
              variant="outlined"
              sx={{
                borderColor: COLORS.text,
                color: COLORS.text,
                fontWeight: 600,
                mb: 3,
                backgroundColor: "rgba(255,255,255,0.3)",
              }}
            />
            <Typography
              variant="h1"
              sx={{
                fontFamily: '"Playfair Display", serif',
                fontWeight: 600,
                fontSize: { xs: "3rem", md: "4.5rem" },
                lineHeight: 1.1,
                mb: 3,
                background: `linear-gradient(45deg, ${COLORS.text}, #1a4a39)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Ethical Luxury,
              <br /> Creates Future.
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 300, mb: 5, maxWidth: "450px", lineHeight: 1.6 }}>
              Discover our curated collection of lab-grown diamonds. Identical to mined diamonds in every way, except origin.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: COLORS.text,
                  color: "#fff",
                  borderRadius: "50px",
                  px: 5,
                  py: 1.5,
                  textTransform: "none",
                  fontSize: "1.1rem",
                  boxShadow: "0 10px 20px rgba(42, 111, 86, 0.2)",
                  "&:hover": { backgroundColor: "#1e523f" },
                }}
              >
                Shop Collection
              </Button>
              <IconButton
                sx={{
                  border: `1px solid ${COLORS.text}`,
                  color: COLORS.text,
                  width: 56,
                  height: 56,
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Hero Image */}
          <Grid item xs={12} md={7} sx={{ position: "relative" }}>
            <Box
              sx={{
                position: "relative",
                height: { xs: "400px", md: "700px" },
                width: "100%",
                borderRadius: 8, // Unique modern shape
                overflow: "hidden",
                boxShadow: "20px 20px 60px rgba(42, 111, 86, 0.1)",
              }}
            >
              <img src="https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1200&auto=format&fit=crop" alt="Diamond Ring Model" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              {/* Floating Element */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  left: 40,
                  backgroundColor: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(10px)",
                  padding: "20px",
                  borderRadius: "16px",
                  maxWidth: "220px",
                  border: `1px solid ${COLORS.white}`,
                }}
              >
                <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
                  Sustainable Choice
                </Typography>
                <Typography variant="caption">Saving 100 gallons of water per carat.</Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>

      <CategoryGrid />
      {/* 2. CATEGORIES (SHOP BY SHAPE) */}
      <Container maxWidth="false" sx={{ py: 8, px: 4 }}>
        <SectionHeader title="Design Your Sparkle" subtitle="SHOP BY CATEGORY" />

        <Grid container spacing={3}>
          {Category?.map((cat, idx) => (
            <Grid item xs={6} md={2} key={idx}>
              <Card
                sx={{
                  borderRadius: "24px",
                  boxShadow: "none",
                  backgroundColor: "transparent",
                  position: "relative",
                  overflow: "visible",
                  transition: "transform 0.3s ease",
                  cursor: "pointer",
                }}
              >
                <Box
                  sx={{
                    height: "320px",
                    borderRadius: "24px",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.95 }} />
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                    }}
                  />
                  <Box sx={{ position: "absolute", bottom: 20, left: 0, right: 0, textAlign: "center", color: "#fff" }}>
                    <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif' }}>
                      {cat.label}
                    </Typography>
                    <Typography variant="caption" sx={{ letterSpacing: 1, opacity: 0.8 }}>
                      EXPLORE
                    </Typography>
                  </Box>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. FEATURED COLLECTION */}
      <Container maxWidth="xl" sx={{}}>
        <Box
          sx={{
            backgroundColor: COLORS.white,
            borderRadius: { xs: "24px", md: "40px" },
            p: { xs: 4, md: 8 },
          }}
        >
          <SectionHeader title="Trending Solitaires" subtitle="Handpicked by our gemologists for brilliance and fire." />

          <Grid container spacing={4}>
            {PRODUCTS.map((prod, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Box
                  sx={{
                    borderRadius: "20px",
                    p: 2,
                    backgroundColor: "#f9fcfb",
                    transition: "all 0.3s",
                    "&:hover": { boxShadow: "0 10px 30px rgba(0,0,0,0.05)", backgroundColor: "#fff" },
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: "16px",
                      overflow: "hidden",
                      mb: 2,
                      position: "relative",
                      backgroundColor: "#fff",
                    }}
                  >
                    <img src={prod.img} alt={prod.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                    <IconButton
                      sx={{
                        position: "absolute",
                        top: 10,
                        right: 10,
                        backgroundColor: "rgba(255,255,255,0.8)",
                        "&:hover": { backgroundColor: "#fff" },
                      }}
                    >
                      <ShoppingBagOutlinedIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <Box>
                      <Typography variant="h6" sx={{ fontFamily: '"Playfair Display", serif', color: "#1a1a1a" }}>
                        {prod.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888", fontWeight: 500 }}>
                        {prod.carat}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ color: COLORS.text, fontWeight: 700 }}>
                      {prod.price}
                    </Typography>
                  </Stack>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default Tab3;

const CATEGORIES = [
  {
    id: 1,
    title: "All Collection",
    img: j1,
    link: "#",
  },
  {
    id: 2,
    title: "Diamond Ring",
    img: j2,
    link: "#",
  },
];

const CategoryGrid = () => {
  return (
    <Box sx={{ width: "100%", py: 4, mt: 2, backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          {CATEGORIES.map((cat, i) => (
            <Grid item xs={12} md={6} key={cat.id}>
              <Box
                sx={{
                  position: "relative",
                  height: { xs: "300px", md: "450px" }, // Fluid fixed height
                  borderRadius: "24px", // The distinct rounded look
                  overflow: "hidden",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                  group: "true", // Marker for hover targeting
                  "&:hover .zoom-image": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                {/* Background Image with Zoom Effect */}
                <Box
                  className="zoom-image"
                  component="img"
                  src={cat.img}
                  alt={cat.title}
                  sx={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
                    display: "block",
                  }}
                />

                {/* Gradient Overlay for Text Readability */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "50%",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)",
                    zIndex: 1,
                  }}
                />

                {/* Text Label */}
                <Box
                  sx={{
                    position: "absolute",
                    bottom: 30,
                    left: 0,
                    width: "100%",
                    textAlign: "center",
                    zIndex: 2,
                  }}
                >
                  <Typography
                    variant="h3"
                    component="h3"
                    sx={{
                      color: "#fff",
                      fontFamily: '"Playfair Display", serif',
                      fontWeight: 500,
                      letterSpacing: "0.5px",
                      fontSize: { xs: "2rem", md: "2.5rem" },
                      textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                    }}
                  >
                    {cat.title}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

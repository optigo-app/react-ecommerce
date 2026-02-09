import React from "react";
import { Box, Container, Grid, Typography, Button, Card, CardContent, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import NewTopSection from "../../NewTopSection";
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

// --- Styled Components for Custom Look ---

// The main teal hero container
const HeroContainer = styled(Box)(({ theme }) => ({
  borderRadius: "30px",
  overflow: "hidden",
  position: "relative",
  color: "#fff",
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(6),
  display: "flex",
  alignItems: "center",
  minHeight: "400px",
}));

// The Model Image
const ModelImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
  minHeight: "300px", // Fallback height for mobile
  borderRadius: "30px",
});

// Category Image Card
const CategoryCard = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "30px",
  overflow: "hidden",
  height: "350px",
  cursor: "pointer",
  transition: "transform 0.3s ease",
  "&:hover": {
    transform: "translateY(-5px)",
  },
  "&:hover img": {
    transform: "scale(1.05)",
  },
}));

const CategoryImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.5s ease",
});

// reusable style for the image containers
const itemStyles = {
  width: "100%",
  height: "100%",
  borderRadius: "30px", // Modern rounded corners
  overflow: "hidden", // Ensures image stays inside rounded corners
  position: "relative",
};

const imageStyles = {
  width: "100%",
  height: "100%",
  objectFit: "cover", // Ensures image fills the box without stretching
  display: "block",
};

// --- Mock Data ---
const CATEGORIES = [
  { id: 1, title: "Rings", img: img1 },
  { id: 2, title: "Solitaires", img: img2 },
  { id: 3, title: "All Jewellery", img: img3 },
];

const Tab1 = ({ carousel, isLogin, socialMediaBanner, banner }) => {
  return (
    <Box>
      {/* --- 1. THE HERO BANNER --- */}
      <Box
        sx={{
          width: {
            md: "86%",
            sm: "90%",
            xs: "98%",
          },
          mx: "auto",
          mb: 6,
        }}
      >
        <HeroContainer>
          <Grid container alignItems="center">
            <ModelImage src="https://shayn.in/cdn/shop/files/Artboard_2.webp?v=1763555138&width=1920" alt="Model" />
            <Grid item xs={12} md={4} sx={{ height: "100%" }}></Grid>
          </Grid>
        </HeroContainer>

        {/* --- 2. THE 2x2 COLUMN GRID (Requested Logic) --- */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ mb: 3, width: "100%" }}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#3a2e23",
                letterSpacing: "-0.5px",
                mb: 1,
              }}
            >
              Discover Our Top Selling Category
            </Typography>

            <Typography
              variant="subtitle1"
              sx={{
                color: "#6b5a48",
                fontWeight: 400,
                lineHeight: 1.2,
                whiteSpace: "nowrap", // ⬅ forces single line
                overflow: "hidden", // optional: hide overflow
                textOverflow: "ellipsis", // optional: show "..."
              }}
            >
              Explore our most loved collections crafted with precision and elegance.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {CATEGORIES.map((item) => (
              <Grid item xs={12} md={4} key={item.id}>
                <CategoryCard>
                  <CategoryImage src={item.img} alt={item.title} />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      width: "100%",
                      background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                      p: 3,
                      textAlign: "left",
                    }}
                  >
                    <Typography variant="h6" sx={{ color: "white", fontWeight: 600 }}>
                      {item.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.8)" }}>
                      Explore Collection →
                    </Typography>
                  </Box>
                </CategoryCard>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Grid container spacing={2} sx={{ height: { md: "600px", xs: "auto" } }}>
          {/* =======================
          LEFT COLUMN (BIG TILE) 
         ======================= */}
          <Grid item xs={12} md={6} sx={{ height: "100%" }}>
            <Box
              sx={{
                ...itemStyles,
                height: "100%", // Full height of the grid item
              }}
            >
              <img src={col1} alt="Left Large Item" style={imageStyles} />
            </Box>
          </Grid>

          {/* =======================
          RIGHT COLUMN
         ======================= */}
          <Grid
            item
            xs={12}
            md={6}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              height: "100%",
            }}
          >
            {/* RIGHT TOP: 1 Full Width Tile */}
            <Box
              sx={{
                ...itemStyles,
                flex: 1,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                p: 4,
                background: "linear-gradient(135deg, #FFF5F8 0%, #FDECF2 40%, #F8DDE7 100%)", // soft beige premium look
              }}
            >
              <Typography
                sx={{
                  fontSize: 32,
                  fontWeight: 700,
                  color: "#3a2e23",
                  letterSpacing: "-0.5px",
                  lineHeight: 1.2,
                  mb: 1,
                }}
              >
                Diamond Jewellery
              </Typography>

              <Typography
                sx={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: 22,
                  fontStyle: "italic",
                  color: "#7b6650",
                  mb: 2,
                }}
              >
                Elegance that shines.
              </Typography>

              <Typography
                sx={{
                  fontSize: 14,
                  color: "#6b5a48",
                  lineHeight: 1.5,
                }}
              >
                Discover graceful pieces crafted to perfection, designed to celebrate life’s finest moments.
              </Typography>
            </Box>

            {/* RIGHT BOTTOM: Split into 2 Side-by-Side Tiles */}
            <Box
              sx={{
                display: "flex",
                gap: 2,
                flex: 1, // Takes up the remaining height
              }}
            >
              {/* Bottom Sub-Grid Left */}
              <Box sx={{ ...itemStyles, flex: 1 }}>
                <img src={img4} alt="Bottom Right Left" style={imageStyles} />
              </Box>

              {/* Bottom Sub-Grid Right */}
              <Box sx={{ ...itemStyles, flex: 1 }}>
                <img src={img5} alt="Bottom Right Right" style={imageStyles} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      {/* <NewTopSection carousel={carousel} isLogin={isLogin} socialMediaBanner={socialMediaBanner} banner={banner} /> */}
      </Box>
    </Box>
  );
};

export default Tab1;

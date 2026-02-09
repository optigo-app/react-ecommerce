import React from "react";
import { Box, Container, Grid, Typography, Button, Card, CardMedia, CardContent, Stack, IconButton, useTheme, useMediaQuery } from "@mui/material";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
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

const MENS_CATEGORIES = [
  { label: "RINGS", img: b1 },
  { label: "PENDANTS", img: b2 },
  { label: "EARRINGS", img: b3 },
  { label: "BRACELETS", img: img1 }, // Reusing for demo
  { label: "CHAINS", img: img2 },
  { label: "BROOCH", img: img3 },
];

const LATEST_COLLECTIONS = [
  {
    title: "Earring Muse",
    sub: "Graceful styles to elevate your look",
    img: c1,
    color: "#fbeceb",
  },
  {
    title: "Ring Atelier",
    sub: "Timeless pieces crafted to shine",
    img: c2,
    color: "#fcf6f0",
  },
];

const SectionTitle = ({ children }) => (
  <Typography
    variant="h4"
    component="h2"
    sx={{
      textAlign: "center",
      fontFamily: '"Playfair Display", serif',
      color: "#333",
      mb: 4,
      fontWeight: 600,
    }}
  >
    {children}
  </Typography>
);

const GivaLandingPage = () => {
  return (
    <Box sx={{ backgroundColor: "#fff", width: "100%", overflowX: "hidden" }}>
      <Box sx={{ mt: 2, px: { xs: 2, md: 5 }, mb: 8, borderRadius: 10 }}>
        <SectionTitle>Discover Our Top Selling Category</SectionTitle>

        <Grid item xs={12} md={7}>
          <Box
            sx={{
              display: "flex",
              gap: 3,
              alignItems: "stretch",
              overflow: "hidden",
              height: { xs: "240px", md: "350px" },

              "&:hover .card": {
                flex: 0.4,
              },

              // Hovered card expands
              "&:hover .card:hover": {
                flex: 1.3,
              },
            }}
          >
            {MENS_CATEGORIES.map((item, idx) => (
              <Box
                key={idx}
                className="card"
                sx={{
                  flex: idx === 0 ? 1.2 : 0.5,
                  minWidth: 0,
                  borderRadius: "20px",
                  overflow: "hidden",
                  cursor: "pointer",
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "flex-end",
                  transition: "flex 0.55s cubic-bezier(.22,.61,.36,1), box-shadow 0.45s ease, transform 0.45s ease",
                  border: "none",
                  outline: "none",
                }}
              >
                {/* IMAGE */}
                <Box
                  sx={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                    transition: "all 0.6s cubic-bezier(.22,.61,.36,1)",
                  }}
                >
                  <img
                    src={item.img}
                    alt={item.label}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "all 0.6s cubic-bezier(.22,.61,.36,1)",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>
        </Grid>
      </Box>

      <Container maxWidth="xl" sx={{ mb: 8 }}>
        <SectionTitle>Latest Collections</SectionTitle>
        <Grid container spacing={3}>
          {LATEST_COLLECTIONS.map((col, idx) => (
            <Grid item xs={12} md={6} key={idx}>
              <Box
                sx={{
                  backgroundColor: col.color,
                  borderRadius: "24px",
                  display: "flex",
                  flexDirection: { xs: "column-reverse", sm: "row" },
                  overflow: "hidden",
                  height: { sm: "300px" },
                }}
              >
                <Box
                  sx={{
                    p: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    width: { sm: "50%" },
                  }}
                >
                  {/* Custom script font simulation */}
                  <Typography
                    variant="h4"
                    sx={{
                      mb: 1,
                      fontStyle: "italic",
                    }}
                  >
                    {col.title}
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3, color: "#555" }}>
                    {col.sub}
                  </Typography>
                </Box>
                <Box sx={{ width: { sm: "50%" }, height: "100%" }}>
                  <img src={col.img} alt={col.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GivaLandingPage;

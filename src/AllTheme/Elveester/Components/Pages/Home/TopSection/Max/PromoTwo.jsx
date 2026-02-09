import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const BrandsStorySlider = ({ banner }) => {
  const BrandsContent = [
       {
        "title": "Beyond Basic ",
        "description": "The brand that champions ethical luxury and eco-conscious elegance. It all begins with cutting-edge technology that replicates the natural diamond-growing process, creating exquisite gems with the same chemical composition, physical properties, and captivating sparkle as their mined counterparts."
    },
    {
        "title": "Storyst",
        "description": "In the enchanting world of love and matrimony, where dreams are spun from whispers and promises, there exists a realm where beauty knows no bounds. This is the story of 'Ethereal Elegance,' a prestigious bridal jewelry brand that weaves tales of romance and timeless sophistication."
    },
    {
        "title": "Nuera",
        "description": "This is the story of Minimal & Shiny Gold Jewelry, a brand born from the desire to celebrate the beauty of simplicity and the allure of gold. Each piece tells a unique story, a tale of grace and sophistication, designed for those who find joy in the subtle, the refined, and the timeless."
    },
    {
        "title": "Promise",
        "description": "This is the world of Modern Diamond Jewelry, a brand that embodies the perfect fusion of cutting-edge design and the everlasting brilliance of diamonds. minimalist diamond-studded jewelleries that symbolize everlasting love, to avant-garde statement pieces that capture the essence of bold individuality, the collection is a celebration of the diversity and versatility of modern aesthetics"
    },
    {
        "title": "Diament",
        "description": "In the world of hip-hop, where trends come and go like the beat of a drum, 'Bling Dynasty' remains an immutable force, a testament to the enduring power of self-expression. As long as there are dreams to chase and stories to tell, the legacy of 'Bling Dynasty' will shine on, a symbol of resilience, creativity, and the unbreakable bond between music and culture."
    },
    {
        "title": "Lovent",
        "description": "In the dazzling world of high fashion, where style is the ultimate form of self-expression and luxury is a way of life, there exists a realm of unparalleled opulence and exquisite glamour. This is the domain of High Fashion Diamond Jewelry, a brand that epitomizes the union of haute couture and the eternal allure of diamonds."
    }
  ].map((item, index) => ({
    ...item,
    image: banner?.image?.[index],
  }));

  return (
    <Box
      sx={{
        width: "100%",
        overflow: "hidden",        // ✅ critical
        bgcolor: "#fff",
        py: { xs: 6, md: 6 },
      }}
    >
      <Swiper
        modules={[Autoplay]}
        loop
        speed={800}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        slidesPerView={1}
        style={{ overflow: "hidden" }} // ✅ Swiper overflow fix
      >
        {BrandsContent.map((item, index) => (
          <SwiperSlide key={index}>
            <Container maxWidth="false">
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: {
                    xs: "1fr",
                    md: "1fr 1fr",
                  },
                  alignItems: "center",
                  gap: { xs: 4, md: 8 },
                  minHeight: { xs: "auto", md: 420 }, // ✅ prevents jump
                }}
              >
                {/* LEFT — TEXT */}
                <Box sx={{
                    textAlign:'center',
                }}>
                  <Typography
                    sx={{
                      fontSize: { xs: 26, md: 32 },
                      fontWeight: 600,
                      color: "#2b3a67",
                      mb: 2,
                    }}
                  >
                    {item.title}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: 16,
                      lineHeight: 1.5,
                      color: "#5b6b8c",
                    }}
                  >
                    {item.description}
                  </Typography>
                </Box>

                {/* RIGHT — IMAGE */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: { xs: "center", md: "flex-end" },
                  }}
                >
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    sx={{
                      width: "100%",
                      objectFit: "cover",
                      borderRadius: 3,
                      boxShadow: "0 24px 60px rgba(0,0,0,0.08)",
                    }}
                  />
                </Box>
              </Box>
            </Container>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default BrandsStorySlider;
